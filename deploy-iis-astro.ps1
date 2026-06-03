# Runs under Windows PowerShell 5.1 as Administrator
# Deploys the Astro dist/ output to IIS on HTTPS port 11443

$transcript  = "D:\Work\AI\claude-code\Vanikar.Games\deploy-iis-astro.log"
Start-Transcript -Path $transcript -Force

$SiteName    = "VanikarAstro"
$AppPoolName = "VanikarAstro"
$DistPath    = "D:\Work\AI\claude-code\Vanikar.Games\dist"
$PublishPath = "C:\inetpub\vanikar-astro"
$Port        = 11443
$Thumb       = "02E8E6FD6241C68780A6475F100A644D579ED11C"
$AppGuid     = "{4dc3e181-e14b-4a21-b022-59fc669b0915}"

# ── 1. Copy dist to inetpub ────────────────────────────────────────────────────
Write-Host "Copying dist to $PublishPath"
if (Test-Path $PublishPath) { Remove-Item $PublishPath -Recurse -Force }
Copy-Item $DistPath -Destination $PublishPath -Recurse
Write-Host "Copied. Files: $((Get-ChildItem $PublishPath -Recurse -File).Count)"

# ── 2. App pool ────────────────────────────────────────────────────────────────
Import-Module WebAdministration -ErrorAction Stop
Write-Host "WebAdministration loaded"

if (-not (Test-Path "IIS:\AppPools\$AppPoolName")) {
    New-WebAppPool -Name $AppPoolName | Out-Null
    Write-Host "Created app pool"
} else {
    Stop-WebAppPool -Name $AppPoolName -ErrorAction SilentlyContinue
    Write-Host "Stopped existing app pool"
}
Set-ItemProperty "IIS:\AppPools\$AppPoolName" -Name managedRuntimeVersion -Value ""
Write-Host "App pool: no managed runtime"

# ── 3. Website ─────────────────────────────────────────────────────────────────
if (Get-Website -Name $SiteName -ErrorAction SilentlyContinue) {
    Stop-Website  -Name $SiteName -ErrorAction SilentlyContinue
    Start-Sleep 1
    Remove-Website -Name $SiteName
    Write-Host "Removed existing site"
}

New-Website -Name $SiteName -PhysicalPath $PublishPath `
    -ApplicationPool $AppPoolName -Port 8081 | Out-Null
Start-Sleep 1
Remove-WebBinding -Name $SiteName -Protocol http -Port 8081 -IPAddress "*" -ErrorAction SilentlyContinue
New-WebBinding    -Name $SiteName -Protocol https -Port $Port -IPAddress "*" -SslFlags 0
Write-Host "HTTPS binding added on :$Port"

# ── 4. SSL cert (netsh) ────────────────────────────────────────────────────────
netsh http delete sslcert ipport=0.0.0.0:$Port | Out-Null
$result = netsh http add sslcert ipport=0.0.0.0:$Port certhash=$Thumb appid=$AppGuid certstorename=MY
Write-Host "netsh: $result"

# ── 5. Permissions ─────────────────────────────────────────────────────────────
$acl  = Get-Acl $PublishPath
$rule = New-Object System.Security.AccessControl.FileSystemAccessRule(
    "IIS_IUSRS","ReadAndExecute","ContainerInherit,ObjectInherit","None","Allow")
$acl.AddAccessRule($rule)
Set-Acl $PublishPath $acl
Write-Host "IIS_IUSRS ReadAndExecute granted"

# ── 6. Start ───────────────────────────────────────────────────────────────────
Start-WebAppPool -Name $AppPoolName
Start-Website    -Name $SiteName

# ── 6b. Re-add HTTP :11080 (plain, no TLS) ────────────────────────────────────
$httpPort = 11080
Get-WebBinding -Name $SiteName -Protocol http -Port $httpPort -ErrorAction SilentlyContinue |
    Remove-WebBinding -ErrorAction SilentlyContinue
New-WebBinding -Name $SiteName -Protocol http -Port $httpPort -IPAddress '*'
Write-Host "HTTP binding added on :$httpPort"

Write-Host "Site state: $((Get-Website -Name $SiteName).State)"
Write-Host "Done. https://localhost:$Port  |  http://localhost:$httpPort"

Stop-Transcript
