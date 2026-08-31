$content = Get-Content -Raw -Path "d:\jeetphysics\numericals\exam-data.js" -Encoding UTF8

$lines = $content -split "`r`n"
for ($i = 0; $i -lt $lines.Length; $i++) {
    $line = $lines[$i]
    if ($line -match '^\s*(question|given|required|answer|notes):\s*''' -or $line -match '^\s*''(Step \d+|[a-zA-Z0-9])') {
        # Process this line
        $line = [regex]::Replace($line, '_\{([^}]+)\}', '<sub>$1</sub>')
        $line = [regex]::Replace($line, '_([\p{L}\p{N}]+)', '<sub>$1</sub>')
        $line = [regex]::Replace($line, '\^\{([^}]+)\}', '<sup>$1</sup>')
        $line = [regex]::Replace($line, '\^\(([^)]+)\)', '<sup>$1</sup>')
        $line = [regex]::Replace($line, '\^([\p{L}\p{N}]+)', '<sup>$1</sup>')
        
        $lines[$i] = $line
    }
}

$newContent = $lines -join "`r`n"
Set-Content -Path "d:\jeetphysics\numericals\exam-data.js" -Value $newContent -Encoding UTF8
Write-Host "Done fixing exam-data.js superscripts"
