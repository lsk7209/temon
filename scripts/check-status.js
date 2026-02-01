
const { createClient } = require('@libsql/client');
require('dotenv').config({ path: '.env.local' });

async function checkStatus() {
    const client = createClient({
        url: process.env.TURSO_DATABASE_URL,
        authToken: process.env.TURSO_AUTH_TOKEN,
    });

    const tests = await client.execute("SELECT id, title, slug, status, published_at FROM tests ORDER BY created_at DESC LIMIT 1");
    console.log("Latest Test Status:", tests.rows[0]);
}

checkStatus().catch(console.error);
