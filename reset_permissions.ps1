# Reset permissions script

Write-Host "Resetting permissions in the database..." -ForegroundColor Cyan

# Run the artisan command to reset permissions
php artisan permissions:reset

Write-Host "`nPermissions have been reset successfully!" -ForegroundColor Green
Write-Host "The super-admin role now has all required permissions, and Benedick has been granted the super-admin role." -ForegroundColor Green
Write-Host "`nIf you need to assign super-admin to a different user, run:" -ForegroundColor Yellow
Write-Host "php artisan permissions:reset user@example.com" -ForegroundColor Yellow

# Clear Laravel cache
Write-Host "`nClearing Laravel cache..." -ForegroundColor Cyan
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

Write-Host "`nDone! You can now log in as super-admin with all permissions." -ForegroundColor Green 