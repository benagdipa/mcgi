# Create a PowerShell script that runs a single SSH command to execute a series of commands on the server
$commands = "cd mcgi && ls -la && echo 'PHP Version:' && php -v && echo 'Composer Version:' && composer -V"

# Run the SSH command
Write-Host "Connecting to the server..."
ssh -p 18765 u34-ob8hks3ieetu@ssh.mcgi.org.au $commands 