
const { createClient } = require('@libsql/client');
const dotenv = require('dotenv');
const path = require('path');

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
    console.log('Cleaning up duplicate queue items...');

    try {
        // 1. Delete items that already have a generated test (matching by title/keyword)
        // We'll select them first to log what we're deleting
        const duplicatesInTests = await client.execute(`
      SELECT tq.id, tq.keyword, t.title 
      FROM test_queue tq 
      JOIN tests t ON t.title LIKE '%' || tq.keyword || '%'
      WHERE tq.status = 'pending'
    `);

        if (duplicatesInTests.rows.length > 0) {
            console.log('Found queue items that already exist as Tests:');
            console.table(duplicatesInTests.rows);

            for (const row of duplicatesInTests.rows) {
                await client.execute({
                    sql: "DELETE FROM test_queue WHERE id = ?",
                    args: [row.id]
                });
                console.log(`Deleted queue item: ${row.keyword} (${row.id})`);
            }
        } else {
            console.log('No queue items found that already exist in Tests.');
        }

        // 2. Delete internal duplicates in Queue (keep the earliest one)
        // This query finds IDs that are NOT the minimum ID for their keyword group
        // Note: SQLite/Turso dialect
        const internalDuplicates = await client.execute(`
       SELECT id, keyword, created_at
       FROM test_queue
       WHERE id NOT IN (
         SELECT id
         FROM test_queue
         WHERE (keyword, created_at) IN (
           SELECT keyword, MIN(created_at)
           FROM test_queue
           GROUP BY keyword
         )
       )
       AND status = 'pending'
    `);

        if (internalDuplicates.rows.length > 0) {
            console.log('\nFound internal duplicates in Queue (keeping oldest):');
            console.table(internalDuplicates.rows);

            for (const row of internalDuplicates.rows) {
                await client.execute({
                    sql: "DELETE FROM test_queue WHERE id = ?",
                    args: [row.id]
                });
                console.log(`Deleted duplicate queue item: ${row.keyword} (${row.id})`);
            }
        } else {
            console.log('\nNo internal duplicates found in Queue.');
        }

        console.log('\nCleanup complete.');

    } catch (e) {
        console.error('Error during cleanup:', e);
    }
}

main();
