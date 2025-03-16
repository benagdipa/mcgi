$bashCommands = @"
cd mcgi
ls -la
# Create .env file from example if it exists
if [ -f .env.example ]; then
  cp .env.example .env
  echo ".env file created from example"
else
  echo ".env.example file not found"
fi
# Check PHP version
echo "PHP Version:"
php -v
# Check Composer version
echo "Composer Version:"
composer -V
# Check if Node.js is available
echo "Node.js Version:"
which node || echo "Node.js not found"
# Check if npm is available
echo "npm Version:"
which npm || echo "npm not found"
"@

# Escape the bash commands for PowerShell
$escapedCommands = $bashCommands -replace '"', '\"'

# Use bash to execute the commands
$sshProcess = Start-Process -FilePath "ssh" -ArgumentList "-p 18765 u34-ob8hks3ieetu@ssh.mcgi.org.au 'bash -c ""$escapedCommands""'" -NoNewWindow -PassThru
$sshProcess.WaitForExit()
Write-Host "SSH command completed with exit code: $($sshProcess.ExitCode)" 