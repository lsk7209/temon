
const { createClient } = require('@libsql/client');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const client = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
});

async function main() {
    try {
        const testId = 'PwaFA0Dg00H46-k2S83dX';
        console.log(`Inspecting Test: ${testId}`);

        const test = await client.execute({ sql: "SELECT * FROM tests WHERE id = ?", args: [testId] });
        console.log('Test Metadata:', test.rows[0]);

        const questions = await client.execute({ sql: "SELECT * FROM questions WHERE test_id = ?", args: [testId] });
        console.log(`Questions (${questions.rows.length}):`);
        questions.rows.forEach(q => console.log(`- Q${q.question_order}: ${q.question_text}`));

        const results = await client.execute({ sql: "SELECT * FROM result_types WHERE test_id = ?", args: [testId] });
        console.log(`Results (${results.rows.length}):`);
        results.rows.forEach(r => console.log(`- ${r.type_code}: ${r.label}`));

    } catch (e) {
        console.error(e);
    }
}

main();
