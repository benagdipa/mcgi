# PowerShell script for deploying fixed migrations
# Usage: ./deploy-migrations.ps1 [--backup] [--force]

param (
    [switch]$backup = $false,
    [switch]$force = $false
)

# Check if we're in the Laravel root directory
if (-not (Test-Path "artisan")) {
    Write-Host "Error: This script must be run from the Laravel project root directory" -ForegroundColor Red
    exit 1
}

# Function for database backup
function Backup-Database {
    Write-Host "Creating database backup..." -ForegroundColor Yellow
    
    # Get database configuration from .env
    $envContent = Get-Content ".env" -ErrorAction SilentlyContinue
    if (-not $envContent) {
        Write-Host "Error: .env file not found" -ForegroundColor Red
        exit 1
    }
    
    $dbConnection = ($envContent | Select-String "DB_CONNECTION=(.*)").Matches.Groups[1].Value
    $dbHost = ($envContent | Select-String "DB_HOST=(.*)").Matches.Groups[1].Value
    $dbPort = ($envContent | Select-String "DB_PORT=(.*)").Matches.Groups[1].Value
    $dbName = ($envContent | Select-String "DB_DATABASE=(.*)").Matches.Groups[1].Value
    $dbUser = ($envContent | Select-String "DB_USERNAME=(.*)").Matches.Groups[1].Value
    $dbPassword = ($envContent | Select-String "DB_PASSWORD=(.*)").Matches.Groups[1].Value
    
    if ($dbConnection -ne "mysql") {
        Write-Host "Warning: Database connection is not MySQL. Backup might not work correctly." -ForegroundColor Yellow
    }
    
    $timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
    $backupPath = "database/backups"
    
    # Create backups directory if it doesn't exist
    if (-not (Test-Path $backupPath)) {
        New-Item -ItemType Directory -Path $backupPath | Out-Null
    }
    
    $backupFile = "$backupPath/db_backup_$timestamp.sql"
    
    # Create the backup using mysqldump
    try {
        $env:MYSQL_PWD = $dbPassword
        mysqldump --host=$dbHost --port=$dbPort --user=$dbUser --databases $dbName > $backupFile
        $env:MYSQL_PWD = ""
        
        if (Test-Path $backupFile) {
            Write-Host "Database backup created successfully: $backupFile" -ForegroundColor Green
            return $true
        } else {
            Write-Host "Error: Failed to create database backup" -ForegroundColor Red
            return $false
        }
    }
    catch {
        Write-Host "Error: $_" -ForegroundColor Red
        return $false
    }
}

# Check for --backup flag
if ($backup) {
    $backupSuccess = Backup-Database
    if (-not $backupSuccess -and -not $force) {
        Write-Host "Backup failed. Use --force to continue anyway." -ForegroundColor Yellow
        exit 1
    }
}

# Confirm before proceeding
if (-not $force) {
    $confirmation = Read-Host "This will replace all your migrations. Are you sure you want to continue? (y/n)"
    if ($confirmation -ne "y") {
        Write-Host "Operation cancelled." -ForegroundColor Yellow
        exit 0
    }
}

# Create temp directory
Write-Host "Setting up temporary migration directory..." -ForegroundColor Yellow
if (Test-Path "database/temp_migrations") {
    Remove-Item -Path "database/temp_migrations" -Recurse -Force
}
New-Item -ItemType Directory -Path "database/temp_migrations" | Out-Null

# Copy fixed migrations to temp directory
Write-Host "Copying fixed migrations..." -ForegroundColor Yellow
Copy-Item -Path "fixed_migrations/*.php" -Destination "database/temp_migrations/"

# Replace existing migrations
Write-Host "Replacing existing migrations..." -ForegroundColor Yellow
if (Test-Path "database/migrations/*.php") {
    Remove-Item -Path "database/migrations/*.php" -Force
}
Copy-Item -Path "database/temp_migrations/*.php" -Destination "database/migrations/"
Remove-Item -Path "database/temp_migrations" -Recurse -Force

# Run the migrations
Write-Host "Running migrations..." -ForegroundColor Yellow
php artisan migrate:status
Write-Host ""
$migrateConfirmation = Read-Host "Do you want to run the migrations now? (y/n)"
if ($migrateConfirmation -eq "y") {
    php artisan migrate --force
    Write-Host "Migrations completed successfully." -ForegroundColor Green
} else {
    Write-Host "Migrations not run. You can run them manually with 'php artisan migrate'." -ForegroundColor Yellow
}

Write-Host "Migration deployment completed." -ForegroundColor Green 