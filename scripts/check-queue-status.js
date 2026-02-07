
const { createClient } = require('@libsql/client');
const dotenv = require('dotenv');
const path = require('path');

// Load env
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

if (!process.env.TURSO_DATABASE_URL) {
    console.error('TURSO_DATABASE_URL missing');
    process.exit(1);
}

const client = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
});

async function main() {
    console.log('Checking Test Queue Status...');

    try {
        const rs = await client.execute("SELECT * FROM test_queue ORDER BY created_at DESC LIMIT 20");
        console.table(rs.rows);

        const countPending = await client.execute("SELECT COUNT(*) as count FROM test_queue WHERE status = 'pending'");
        const countProcessing = await client.execute("SELECT COUNT(*) as count FROM test_queue WHERE status = 'processing'");
        const countCompleted = await client.execute("SELECT COUNT(*) as count FROM test_queue WHERE status = 'completed'");
        const countFailed = await client.execute("SELECT COUNT(*) as count FROM test_queue WHERE status = 'failed'");

        console.log('\nSummary:');
        console.log(`- Pending: ${countPending.rows[0].count}`);
        console.log(`- Processing: ${countProcessing.rows[0].count}`);
        console.log(`- Completed: ${countCompleted.rows[0].count}`);
        console.log(`- Failed: ${countFailed.rows[0].count}`);

        // Check for potential duplicates within the queue
        const dups = await client.execute(`
      SELECT keyword, COUNT(*) as count 
      FROM test_queue 
      GROUP BY keyword 
      HAVING count > 1
    `);

        if (dups.rows.length > 0) {
            console.log('\nPotential Keyword Duplicates in Queue:');
            console.table(dups.rows);
        } else {
            console.log('\nNo keyword duplicates found in queue.');
        }

    } catch (e) {
        console.error(e);
    }
}

main();
