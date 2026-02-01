
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
        const rs = await client.execute("DELETE FROM test_queue WHERE status = 'pending'");
        console.log(`Deleted ${rs.rowsAffected} pending items.`);
    } catch (e) {
        console.error(e);
    }
}
main();
