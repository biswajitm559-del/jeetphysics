$file = "d:\jeetphysics\numericals\exam-data.js"
$content = Get-Content $file -Raw -Encoding UTF8

# Count formula types
$rawLatex = ([regex]::Matches($content, "formula: '(?!\\\$)[^']*\\\\")).Count
$singleDollar = ([regex]::Matches($content, "formula: '\\\$[^\\\$]")).Count  
$doubleDollar = ([regex]::Matches($content, "formula: '\\$\\$")).Count

Write-Output "Raw LaTeX (no delimiters): $rawLatex"
Write-Output "Single dollar dollar: $singleDollar"
Write-Output "Double dollar dollar: $doubleDollar"
