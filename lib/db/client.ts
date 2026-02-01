import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schema';

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url) {
  throw new Error('TURSO_DATABASE_URL is not defined in environment variables');
}

export const client = createClient({
  url,
  authToken,
});

export const db = drizzle(client, { schema });

// Export type for use in other files if needed
export type Database = typeof db;
