
const { createClient } = require('@libsql/client');
const { drizzle } = require('drizzle-orm/libsql');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load env
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

if (!process.env.TURSO_DATABASE_URL) {
    console.error('TURSO_DATABASE_URL not found');
    process.exit(1);
}

const client = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
});

async function main() {
    console.log('Verifying Quiz Database...');

    try {
        const rsTests = await client.execute('SELECT * FROM tests ORDER BY created_at DESC LIMIT 5');
        console.log(`Found ${rsTests.rows.length} recent tests.`);

        for (const test of rsTests.rows) {
            // Count questions
            const rsQ = await client.execute({ sql: 'SELECT COUNT(*) as count FROM questions WHERE test_id = ?', args: [test.id] });
            const qCount = rsQ.rows[0].count; // or rsQ.rows[0][0] depending on driver version, usually rows is objects if keys configured, but here standard client might return array of objects

            // Count results
            const rsR = await client.execute({ sql: 'SELECT COUNT(*) as count FROM result_types WHERE test_id = ?', args: [test.id] });
            const rCount = rsR.rows[0].count;

            console.log(`[${test.status}] ${test.title} (ID: ${test.id})`);
            console.log(`  - Questions: ${qCount} (Expected: ${test.question_count})`);
            console.log(`  - Results: ${rCount} (Expected: ${test.result_type_count})`);
        }

        console.log('\nChecking Queue...');
        const rsQueue = await client.execute('SELECT * FROM test_queue ORDER BY created_at DESC LIMIT 5');
        if (rsQueue.rows.length === 0) {
            console.log('Queue is empty.');
        } else {
            for (const item of rsQueue.rows) {
                console.log(`[${item.status}] ${item.keyword} (ID: ${item.id}) - Created: ${new Date(item.created_at).toISOString()}`);
                if (item.logs) console.log(`  Logs: ${item.logs}`);
            }
        }

    } catch (e) {
        console.error('Error:', e);
    }
}

main();
