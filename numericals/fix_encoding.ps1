$file = 'd:\jeetphysics\numericals\exam-data.js'
$questionsFile = 'd:\jeetphysics\numericals\questions.txt'

$content = Get-Content $file -Raw -Encoding UTF8
$questions = Get-Content $questionsFile -Raw -Encoding UTF8

# Replace the block
$content = $content -replace "'jee-advanced':\s*\[[\s\S]*?\],\s*// ===== NEET", "$questions`n`n    // ===== NEET"

# Write out using UTF8 without BOM
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText($file, $content, $utf8NoBom)

Write-Output "Successfully replaced block with exact UTF8 encoding!"
