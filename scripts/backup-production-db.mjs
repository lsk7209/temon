// Read-only consistent snapshot; never prints rows, credentials or URLs.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { createClient } from '@libsql/client';
const [envFile, output] = process.argv.slice(2);
if (!envFile || !output || fs.existsSync(output)) throw new Error('Provide env and a new backup path');
if (envFile !== '-') {
  const { config } = await import('dotenv');
  config({ path: envFile, quiet: true });
}
const client = createClient({ url: process.env.TURSO_DATABASE_URL, authToken: process.env.TURSO_AUTH_TOKEN, intMode: 'bigint' });
const identifier = value => `"${value.replaceAll('"', '""')}"`;
const literal = value => value == null ? 'NULL' : typeof value === 'bigint' || typeof value === 'number' ? String(value) : value instanceof ArrayBuffer || ArrayBuffer.isView(value) ? `X'${Buffer.from(value instanceof ArrayBuffer ? value : value.buffer, value.byteOffset || 0, value.byteLength).toString('hex')}'` : `'${String(value).replaceAll("'", "''")}'`;
let transaction;
let stage = 'open_snapshot';
try {
  transaction = await client.transaction('read');
  stage = 'read_schema_and_rows';
  const schema = await transaction.execute("SELECT type,name,sql FROM sqlite_master WHERE sql IS NOT NULL AND name NOT LIKE 'sqlite_%' ORDER BY CASE type WHEN 'table' THEN 0 ELSE 1 END,name");
  const lines = ['PRAGMA foreign_keys=OFF;', 'BEGIN TRANSACTION;'];
  const counts = {};
  for (const row of schema.rows.filter(row => row.type === 'table')) {
    lines.push(`${row.sql};`);
    const result = await transaction.execute(`SELECT * FROM ${identifier(row.name)}`);
    counts[row.name] = result.rows.length;
    for (const values of result.rows) lines.push(`INSERT INTO ${identifier(row.name)} (${result.columns.map(identifier).join(',')}) VALUES (${result.columns.map(column => literal(values[column])).join(',')});`);
  }
  for (const row of schema.rows.filter(row => row.type !== 'table')) lines.push(`${row.sql};`);
  lines.push('COMMIT;', 'PRAGMA foreign_keys=ON;');
  await transaction.commit();
  stage = 'write_snapshot';
  fs.mkdirSync(path.dirname(output), { recursive: true });
  const data = lines.join('\n');
  fs.writeFileSync(output, data, { flag: 'wx', mode: 0o600 });
  fs.writeFileSync(`${output}.manifest.json`, JSON.stringify({ at: new Date().toISOString(), counts, sha256: crypto.createHash('sha256').update(data).digest('hex') }, null, 2), {flag:'wx',mode:0o600});
  console.log('READ_ONLY_SNAPSHOT_PASS', JSON.stringify(counts), Buffer.byteLength(data));
} catch (error) {
  const safe = value => typeof value === 'string' && /^[A-Za-z0-9_]{1,40}$/.test(value) ? value : 'unknown';
  console.error('READ_ONLY_SNAPSHOT_FAILED', JSON.stringify({stage,category:safe(error?.name),code:safe(error?.code)}));
  process.exitCode = 1;
}
finally { if (transaction && !transaction.closed) await transaction.rollback().catch(() => {}); client.close(); }
