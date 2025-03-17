# Deploy script for MCGI website
Write-Host "Starting deployment to MCGI.org.au..." -ForegroundColor Green

# SSH connection details
$sshHost = "ssh.mcgi.org.au"
$sshUser = "u34-ob8hks3ieetu"
$sshPort = "18765"

# Remote paths
$remoteBuildPath = "/home/customer/www/mcgi.org.au/public_html/build"
$backupPath = "/home/customer/www/mcgi.org.au/public_html/build_backup_$(Get-Date -Format 'yyyyMMdd_HHmmss')"

# First create a backup of the current build
Write-Host "Creating backup of current build..." -ForegroundColor Yellow
ssh -p $sshPort "$($sshUser)@$($sshHost)" "if [ -d $remoteBuildPath ]; then cp -r $remoteBuildPath $backupPath; fi"

# First sync manifest.json to avoid "file not found" issues during deployment
Write-Host "Uploading manifest.json..." -ForegroundColor Yellow
scp -P $sshPort public/build/manifest.json "$($sshUser)@$($sshHost):$remoteBuildPath/"

# Then upload all assets
Write-Host "Uploading assets..." -ForegroundColor Yellow
scp -r -P $sshPort public/build/assets/* "$($sshUser)@$($sshHost):$remoteBuildPath/assets/"

# Clear Laravel cache
Write-Host "Clearing cache..." -ForegroundColor Yellow
ssh -p $sshPort "$($sshUser)@$($sshHost)" "cd /home/customer/mcgi && php artisan optimize:clear"

Write-Host "Deployment completed successfully!" -ForegroundColor Green 