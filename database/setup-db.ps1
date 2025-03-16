# Simple PowerShell script for database setup
param (
    [switch]$force = $false
)

# Clear any existing tables and run all migrations
Write-Host "Running migrations..." -ForegroundColor Yellow
php artisan migrate:fresh --force

if ($LASTEXITCODE -eq 0) {
    Write-Host "Migrations completed successfully." -ForegroundColor Green
    
    # Run all seeders
    Write-Host "`nRunning seeders..." -ForegroundColor Yellow
    php artisan db:seed --force
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Seeding completed successfully." -ForegroundColor Green
    } else {
        Write-Host "Error running seeders." -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "Error running migrations." -ForegroundColor Red
    exit 1
}

Write-Host "`nDatabase setup completed!" -ForegroundColor Green 