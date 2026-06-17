$text = 'ðŸ”¥'
$bytes = [System.Text.Encoding]::GetEncoding(1252).GetBytes($text)
$original = [System.Text.Encoding]::UTF8.GetString($bytes)
Write-Output $original
