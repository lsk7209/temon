
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(process.cwd(), 'lib/data');

function extractArrayLength(content, arrayName) {
    const regex = new RegExp(`export const ${arrayName}.*?=`, 's');
    if (!regex.test(content)) return 0;

    // Naive counting of objects in array: count occurrences of "{" inside the array block? 
    // Or just regex for `id: ...` or `question: ...`
    const matches = content.match(/id:\s*['"`]/g) || [];
    return matches.length;
}

function extractStrings(content, key) {
    // Extract values for a specific key like 'question:' or 'label:'
    // Key regex: key: "value" or key: 'value'
    const regex = new RegExp(`${key}:\\s*['"\`](.*?)['"\`]`, 'g');
    const matches = [];
    let match;
    while ((match = regex.exec(content)) !== null) {
        matches.push(match[1]);
    }
    return matches;
}

function analyzeFilePair(name) {
    const qPath = path.join(DATA_DIR, `${name}-questions.ts`);
    const rPath = path.join(DATA_DIR, `${name}-results.ts`);

    if (!fs.existsSync(qPath) || !fs.existsSync(rPath)) return null;

    const qContent = fs.readFileSync(qPath, 'utf8');
    const rContent = fs.readFileSync(rPath, 'utf8');

    // Questions Analysis (Key is 'text')
    const questions = extractStrings(qContent, 'text');
    const avgQLen = questions.reduce((sum, q) => sum + q.length, 0) / (questions.length || 1);

    // Choices Analysis (assuming 2 choices per question usually)
    const choices = extractStrings(qContent, 'text'); // choice text usually under 'text' key in choices array? Need to verify file structure.
    // Actually, looking at previous files, structure is often `question: "...", A: "...", B: "..."` or similar? 
    // Let's assume standardized format based on user request context.

    // Results Analysis
    // Let's check result structure. Usually check for prominent string fields like 'label', 'name', 'title'.
    // results files often have `label` or `name`.
    let results = extractStrings(rContent, 'label');
    if (results.length === 0) results = extractStrings(rContent, 'name'); // Fallback

    // Emoji Usage
    const emojiCount = (qContent + rContent).match(/[\u{1F300}-\u{1F9FF}]/u)?.length || 0;

    return {
        name,
        questionCount: questions.length,
        avgQuestionLength: Math.round(avgQLen),
        resultCount: results.length,
        emojiCount,
        sampleQuestion: questions[0] || '',
        sampleResult: results[0] || ''
    };
}

function main() {
    const files = fs.readdirSync(DATA_DIR);
    const topics = new Set(files.map(f => f.replace('-questions.ts', '').replace('-results.ts', '')));

    console.log('# Quiz Pattern Analysis Report\n');
    console.log('| Topic | Questions | Avg Q Len | Results | Emojis | Sample |');
    console.log('|-------|-----------|-----------|---------|--------|--------|');

    let totalQ = 0;
    let totalR = 0;
    let totalLen = 0;
    let count = 0;

    for (const topic of topics) {
        const stats = analyzeFilePair(topic);
        if (stats) {
            console.log(`| ${topic} | ${stats.questionCount} | ${stats.avgQuestionLength} | ${stats.resultCount} | ${stats.emojiCount} | ${stats.sampleQuestion.substring(0, 20)}... |`);

            totalQ += stats.questionCount;
            totalR += stats.resultCount;
            totalLen += stats.avgQuestionLength;
            count++;
        }
    }

    console.log('\n## Averages');
    console.log(`- Questions per Quiz: ${Math.round(totalQ / count)}`);
    console.log(`- Results per Quiz: ${Math.round(totalR / count)}`);
    console.log(`- Question Length: ${Math.round(totalLen / count)} chars`);
}

main();
