// SELECT only. Credentials stay in memory and are never printed or copied.
import { config } from 'dotenv';
import { createClient } from '@libsql/client';
config({ path: process.argv[2], quiet: true });
const client = createClient({url:process.env.TURSO_DATABASE_URL,authToken:process.env.TURSO_AUTH_TOKEN});
try {
  const tables = await client.execute("SELECT name FROM sqlite_master WHERE type='table' AND name IN ('tests','test_results','result_attempts','test_queue') ORDER BY name");
  console.log('TABLES',JSON.stringify(tables.rows.map(r=>r.name)));
  for (const table of ['tests','test_results','result_attempts','test_queue']) {
    if (tables.rows.some(r=>r.name===table)) {
      const count = await client.execute(`SELECT count(*) AS count FROM ${table}`);
      console.log('COUNT',table,Number(count.rows[0].count));
    }
  }
  const queue = await client.execute('SELECT status,count(*) AS count FROM test_queue GROUP BY status');
  console.log('QUEUE_STATUS_COUNTS',JSON.stringify(queue.rows));
} catch { console.error('READ_ONLY_DATABASE_CHECK_FAILED'); process.exitCode=1; }
finally {client.close();}
