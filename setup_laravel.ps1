# Create a PowerShell script that sets up the Laravel environment
$setupCommands = @"
cd mcgi
echo 'Creating .env file...'
cp .env.example .env
echo 'Installing PHP dependencies...'
composer install --no-dev
echo 'Generating application key...'
php artisan key:generate
echo 'Setup complete!'
"@

# Run the SSH command
Write-Host "Connecting to the server and setting up the Laravel environment..."
ssh -p 18765 u34-ob8hks3ieetu@ssh.mcgi.org.au "$setupCommands" 