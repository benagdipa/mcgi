# PowerShell script for handling database migrations and seeding
param (
    [switch]$force = $false,
    [switch]$seed = $false,
    [switch]$refresh = $false
)

function Write-Step {
    param (
        [string]$message
    )
    Write-Host "`n=== $message ===" -ForegroundColor Cyan
}

function Backup-Database {
    Write-Step "Creating database backup"
    
    $timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
    $backupPath = "database/backups"
    
    if (-not (Test-Path $backupPath)) {
        New-Item -ItemType Directory -Path $backupPath | Out-Null
    }
    
    $backupFile = "$backupPath/db_backup_$timestamp.sql"
    
    try {
        php artisan db:backup --path=$backupFile
        if ($LASTEXITCODE -eq 0) {
            Write-Host "Database backup created successfully: $backupFile" -ForegroundColor Green
            return $true
        }
    }
    catch {
        Write-Host "Error creating backup: $_" -ForegroundColor Red
        return $false
    }
    return $false
}

function Run-Migrations {
    Write-Step "Running migrations in correct sequence"
    
    # 1. System Tables (no dependencies)
    Write-Host "1. Creating system tables..." -ForegroundColor Yellow
    php artisan migrate --path=database/migrations/2019_08_19_000000_create_system_tables.php
    if ($LASTEXITCODE -ne 0) { return $false }
    
    # 2. Users Table (depends on system tables)
    Write-Host "2. Creating users table..." -ForegroundColor Yellow
    php artisan migrate --path=database/migrations/2014_10_12_000000_create_users_table.php
    php artisan migrate --path=database/migrations/2014_10_12_100000_create_password_reset_tokens_table.php
    if ($LASTEXITCODE -ne 0) { return $false }
    
    # 3. Permission Tables (depends on users)
    Write-Host "3. Creating permission tables..." -ForegroundColor Yellow
    php artisan migrate --path=database/migrations/2024_03_21_000000_create_permission_tables.php
    if ($LASTEXITCODE -ne 0) { return $false }
    
    # 4. Categories Table (depends on users)
    Write-Host "4. Creating categories table..." -ForegroundColor Yellow
    php artisan migrate --path=database/migrations/2024_03_29_000000_create_categories_table.php
    if ($LASTEXITCODE -ne 0) { return $false }
    
    # 5. Events Tables (depends on users and categories)
    Write-Host "5. Creating events tables..." -ForegroundColor Yellow
    php artisan migrate --path=database/migrations/2024_04_08_000001_create_event_attendances_table.php
    php artisan migrate --path=database/migrations/2024_04_08_000002_create_events_options_table.php
    if ($LASTEXITCODE -ne 0) { return $false }
    
    # 6. Gallery Tables (depends on users and categories)
    Write-Host "6. Creating gallery tables..." -ForegroundColor Yellow
    php artisan migrate --path=database/migrations/2024_04_18_000000_create_gallery_tables.php
    if ($LASTEXITCODE -ne 0) { return $false }
    
    return $true
}

function Run-Seeders {
    Write-Step "Running seeders in correct sequence"
    
    # 1. Roles and Permissions (no dependencies)
    Write-Host "1. Seeding roles and permissions..." -ForegroundColor Yellow
    php artisan db:seed --class=RoleAndPermissionSeeder
    if ($LASTEXITCODE -ne 0) { return $false }
    
    # 2. Super Admin (depends on roles)
    Write-Host "2. Seeding super admin..." -ForegroundColor Yellow
    php artisan db:seed --class=SuperAdminSeeder
    if ($LASTEXITCODE -ne 0) { return $false }
    
    # 3. Locales (system data)
    Write-Host "3. Seeding locales..." -ForegroundColor Yellow
    php artisan db:seed --class=LocaleSeeder
    if ($LASTEXITCODE -ne 0) { return $false }
    
    # 4. Categories
    Write-Host "4. Seeding categories..." -ForegroundColor Yellow
    php artisan db:seed --class=CategorySeeder
    if ($LASTEXITCODE -ne 0) { return $false }
    
    # 5. Locations (depends on locales)
    Write-Host "5. Seeding locations..." -ForegroundColor Yellow
    php artisan db:seed --class=LocationSeeder
    if ($LASTEXITCODE -ne 0) { return $false }
    
    # 6. Events Options
    Write-Host "6. Seeding events options..." -ForegroundColor Yellow
    php artisan db:seed --class=EventsOptionsSeeder
    if ($LASTEXITCODE -ne 0) { return $false }
    
    # 7. Sample Content
    Write-Host "7. Seeding sample content..." -ForegroundColor Yellow
    php artisan db:seed --class=PostSeeder
    php artisan db:seed --class=BannerTablesSeeder
    if ($LASTEXITCODE -ne 0) { return $false }
    
    return $true
}

# Main execution flow
if (-not $force) {
    Write-Warning "This script will modify your database. Make sure you have a backup."
    $confirmation = Read-Host "Do you want to continue? (y/n)"
    if ($confirmation -ne "y") {
        Write-Host "Operation cancelled." -ForegroundColor Yellow
        exit 0
    }
}

# Create backup if not forced
if (-not $force) {
    $backupSuccess = Backup-Database
    if (-not $backupSuccess) {
        Write-Host "Failed to create backup. Use -force to skip backup." -ForegroundColor Red
        exit 1
    }
}

# Handle refresh flag
if ($refresh) {
    Write-Step "Refreshing database"
    php artisan migrate:reset
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Failed to reset database" -ForegroundColor Red
        exit 1
    }
}

# Run migrations
$migrationsSuccess = Run-Migrations
if (-not $migrationsSuccess) {
    Write-Host "Migration failed. Please check the error messages above." -ForegroundColor Red
    exit 1
}
Write-Host "Migrations completed successfully." -ForegroundColor Green

# Run seeders if requested
if ($seed) {
    $seedingSuccess = Run-Seeders
    if (-not $seedingSuccess) {
        Write-Host "Seeding failed. Please check the error messages above." -ForegroundColor Red
        exit 1
    }
    Write-Host "Seeding completed successfully." -ForegroundColor Green
}

Write-Host "`nDatabase setup completed successfully!" -ForegroundColor Green 