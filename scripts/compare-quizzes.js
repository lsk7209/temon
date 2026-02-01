
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
        // Fetch last 3 tests to capture the 'old' one and the 2 'new' ones
        const rs = await client.execute("SELECT * FROM tests ORDER BY created_at DESC LIMIT 3");

        console.log('--- Comparison Report ---');

        for (const test of rs.rows) {
            console.log(`\n[${test.title}] (ID: ${test.id})`);
            console.log(`Slug: ${test.slug}`);
            console.log(`Created: ${new Date(test.created_at * 1000).toISOString()}`);

            // Check Nanoid issue in ID?
            if (test.id.includes('undefined')) {
                console.log(`❌ CRITICAL: ID contains 'undefined'. Nanoid Generation Failed.`);
            }
            if (test.slug.includes('undefined')) {
                console.log(`❌ CRITICAL: Slug contains 'undefined'. Nanoid Generation Failed.`);
            }

            // Check Content
            const qs = await client.execute({ sql: "SELECT * FROM questions WHERE test_id = ? ORDER BY question_order ASC LIMIT 1", args: [test.id] });
            if (qs.rows.length > 0) {
                const q = qs.rows[0];
                console.log(`Sample Question: ${q.question_text}`);
                console.log(`Choices: ${q.choice_1_text} / ${q.choice_2_text}`);
            } else {
                console.log(`❌ NO QUESTIONS FOUND`);
            }

            const rts = await client.execute({ sql: "SELECT * FROM result_types WHERE test_id = ? LIMIT 1", args: [test.id] });
            if (rts.rows.length > 0) {
                const r = rts.rows[0];
                console.log(`Sample Result: ${r.label} (${r.type_code})`);
            } else {
                console.log(`❌ NO RESULTS FOUND`);
            }
        }

    } catch (e) {
        console.error(e);
    }
}
main();
