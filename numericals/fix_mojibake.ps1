$file = 'd:\jeetphysics\numericals\exam-data.js'
$content = Get-Content $file -Raw -Encoding UTF8

$replacements = @{
    'ðŸŽ¯' = '🎯'
    'ðŸ †' = '🏆'
    'ðŸ©º' = '🩺'
    'ðŸ”¬' = '🔬'
    'âš—ï¸ ' = '⚗️'
    'ðŸ“œ' = '📜'
    'ðŸ —ï¸ ' = '🏗️'
    'ðŸ”¥ Popular' = '🔥 Popular'
    'ðŸ•  Recently' = '🕒 Recently'
    'ðŸ“¥ Downloads' = '📥 Downloads'
    'ðŸ” ' = '🔍'
    'ðŸ“‹ Given' = '📋 Given'
    'ðŸŽ¯ Required' = '🎯 Required'
    'ðŸ“  Formula' = '📐 Formula'
    'ðŸ“  Step-by-Step' = '📝 Step-by-Step'
    'ðŸ’¡ Notes' = '💡 Notes'
    'ðŸ“š Chapter' = '📚 Chapter'
    'ðŸ“Š Difficulty' = '📊 Difficulty'
    'âš¡ Quick' = '⚡ Quick'
    'â€”' = '—'
}

foreach ($key in $replacements.Keys) {
    $content = $content.Replace($key, $replacements[$key])
}

# Fix cuet-science specifically if it uses the same mojibake as one of the above
$content = $content.Replace("icon: 'ðŸ“ '", "icon: '📝'")

$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText($file, $content, $utf8NoBom)

Write-Output "Successfully replaced mojibake emojis!"
