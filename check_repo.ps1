$sshCommand = "ls -la mcgi"
$sshProcess = Start-Process -FilePath "ssh" -ArgumentList "-p 18765 u34-ob8hks3ieetu@ssh.mcgi.org.au $sshCommand" -NoNewWindow -PassThru
$sshProcess.WaitForExit()
Write-Host "SSH command completed with exit code: $($sshProcess.ExitCode)" 