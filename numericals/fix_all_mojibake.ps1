$file = 'd:\jeetphysics\numericals\exam-data.js'
$questionsFile = 'd:\jeetphysics\numericals\questions.txt'

$content = Get-Content $file -Raw -Encoding UTF8
$bytes = [System.Text.Encoding]::GetEncoding(1252).GetBytes($content)
$decodedContent = [System.Text.Encoding]::UTF8.GetString($bytes)

$questions = Get-Content $questionsFile -Raw -Encoding UTF8

$decodedContent = $decodedContent -replace "'jee-advanced':\s*\[[\s\S]*?\],\s*// ===== NEET", "$questions,`n`n    // ===== NEET"

$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText($file, $decodedContent, $utf8NoBom)

Write-Output "Successfully decoded all mojibake!"
