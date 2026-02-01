
const { createClient } = require('@libsql/client');
const { drizzle } = require('drizzle-orm/libsql');
require('dotenv').config({ path: '.env.local' });

async function verify() {
    const client = createClient({
        url: process.env.TURSO_DATABASE_URL,
        authToken: process.env.TURSO_AUTH_TOKEN,
    });

    const result = await client.execute("SELECT id, title, slug, status FROM tests ORDER BY created_at DESC LIMIT 5");

    console.log("--- Recent Tests ---");
    console.table(result.rows);
}

verify().catch(console.error);
