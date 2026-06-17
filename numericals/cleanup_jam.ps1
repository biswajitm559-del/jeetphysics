$file = "d:\jeetphysics\numericals\exam-data.js"
$lines = Get-Content $file -Encoding UTF8

# Remove lines 1252 to 1338 (0-indexed: 1251 to 1337)
# These are the leftover original 5 jam-physics problems
$newLines = @()
for ($i = 0; $i -lt $lines.Count; $i++) {
    if ($i -ge 1251 -and $i -le 1337) {
        continue
    }
    $newLines += $lines[$i]
}

$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllLines($file, $newLines, $utf8NoBom)
Write-Output "Cleaned up! Total lines now: $($newLines.Count)"
