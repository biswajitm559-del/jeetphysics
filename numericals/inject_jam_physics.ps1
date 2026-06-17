$file = "d:\jeetphysics\numericals\exam-data.js"
$qFile = "d:\jeetphysics\numericals\jam_physics_questions.txt"

$content = Get-Content $file -Raw -Encoding UTF8
$questions = Get-Content $qFile -Raw -Encoding UTF8

# Use regex to replace the entire jam-physics array block
$pattern = "(?s)    // ===== IIT JAM PHYSICS.*?'jam-physics': \[.*?\],"
$replacement = $questions + ","

$content = [System.Text.RegularExpressions.Regex]::Replace($content, $pattern, $replacement)

$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText($file, $content, $utf8NoBom)
Write-Output "Done! File size: $((Get-Item $file).Length) bytes"
