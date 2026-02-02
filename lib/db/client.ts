import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schema';

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url) {
  console.warn('TURSO_DATABASE_URL is not defined in environment variables. DB operations will fail at runtime.');
}

// Create a dummy client if url is missing, to allow build to proceed
export const client = url ? createClient({
  url,
  authToken,
}) : createClient({
  url: 'file:dummy.db',
});

export const db = drizzle(client, { schema });

// Export type for use in other files if needed
export type Database = typeof db;
