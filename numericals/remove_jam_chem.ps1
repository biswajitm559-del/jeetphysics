$file = "d:\jeetphysics\numericals\exam-data.js"
$lines = Get-Content $file -Encoding UTF8

$newLines = @()
for ($i = 0; $i -lt $lines.Count; $i++) {
    if (($i -ge 69 -and $i -le 82) -or ($i -ge 555 -and $i -le 661)) {
        continue
    }
    $newLines += $lines[$i]
}

$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllLines($file, $newLines, $utf8NoBom)
Write-Output "Successfully removed jam-chemistry lines!"
