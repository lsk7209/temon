
const { createClient } = require('@libsql/client');
const { drizzle } = require('drizzle-orm/libsql');
require('dotenv').config({ path: '.env.local' });

async function verify() {
    const client = createClient({
        url: process.env.TURSO_DATABASE_URL,
        authToken: process.env.TURSO_AUTH_TOKEN,
    });

    // 1. Get the latest test
    const tests = await client.execute("SELECT id, title, slug FROM tests ORDER BY created_at DESC LIMIT 1");
    const latestTest = tests.rows[0];

    if (!latestTest) {
        console.log("No tests found.");
        return;
    }

    console.log(`Checking questions for: ${latestTest.title} (${latestTest.id})`);

    // 2. Count questions
    const qResult = await client.execute({
        sql: "SELECT count(*) as count FROM questions WHERE test_id = ?",
        args: [latestTest.id]
    });

    console.log(`Question Count: ${qResult.rows[0].count}`);

    if (qResult.rows[0].count > 0) {
        const qs = await client.execute({
            sql: "SELECT question_text FROM questions WHERE test_id = ? LIMIT 3",
            args: [latestTest.id]
        });
        console.log("First 3 questions:", qs.rows);
    }
}

verify().catch(console.error);
