$sshCommand = "git clone https://github.com/benagdipa/mcgi.git"
$sshProcess = Start-Process -FilePath "ssh" -ArgumentList "-p 18765 u34-ob8hks3ieetu@ssh.mcgi.org.au $sshCommand" -NoNewWindow -PassThru
$sshProcess.WaitForExit()
Write-Host "SSH command completed with exit code: $($sshProcess.ExitCode)"

# Alternative approach using echo to provide input
# echo "git clone https://github.com/benagdipa/mcgi.git" | ssh -p 18765 u34-ob8hks3ieetu@ssh.mcgi.org.au 