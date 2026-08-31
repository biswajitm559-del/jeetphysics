const fs = require('fs');

function processString(str) {
    if (typeof str !== 'string') return str;
    
    // Replace _{text} with <sub>text</sub>
    let res = str.replace(/_\{([^}]+)\}/g, '<sub>$1</sub>');
    
    // Replace _word with <sub>word</sub>. 
    // It stops at the first non-alphanumeric character.
    res = res.replace(/_([a-zA-Z0-9]+)/g, '<sub>$1</sub>');
    
    // Also let's fix ^{text} and ^word for superscripts if any exist in plain text
    res = res.replace(/\^\{([^}]+)\}/g, '<sup>$1</sup>');
    // For single char superscripts without braces like ^2
    res = res.replace(/\^([a-zA-Z0-9])/g, '<sup>$1</sup>');
    
    return res;
}

function fixFile(filePath, isExamData) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // We only want to replace inside the string literals for question, given, steps, answer, notes.
    // Since doing this safely via regex on source code is risky, let's use a replacer that only runs inside specific keys.
    // For script.js it's in the NUMERICALS array.
    // For exam-data.js it's in EXAM_PROBLEMS.
    
    const keysToFix = ['question', 'given', 'answer', 'notes', 'required'];
    
    // We can just find all matches of these keys, and then fix the string that follows.
    // Alternatively, we can use a regex that matches the key: 'value' pattern.
    
    for (let key of keysToFix) {
        // Match key: '... string ...'
        // Need to handle escaped quotes and arrays (for steps)
        const regex = new RegExp(key + '\\s*:\\s*(["\\`\\'])(.*?)(?<!\\\\)\\1', 'gs');
        content = content.replace(regex, (match, quote, innerStr) => {
            return key + ': ' + quote + processString(innerStr) + quote;
        });
    }

    // Now handle 'steps' which is an array of strings
    const stepsRegex = /steps\s*:\s*\[(.*?)\]/gs;
    content = content.replace(stepsRegex, (match, innerArray) => {
        // innerArray is a comma-separated list of strings. We can replace strings inside it.
        const stringRegex = /(["\'\`])(.*?)(?<!\\\\)\1/gs;
        const fixedArray = innerArray.replace(stringRegex, (m, quote, innerStr) => {
            return quote + processString(innerStr) + quote;
        });
        return 'steps: [' + fixedArray + ']';
    });
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Fixed " + filePath);
}

fixFile('d:/jeetphysics/script.js', false);
fixFile('d:/jeetphysics/numericals/exam-data.js', true);
