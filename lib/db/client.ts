import { drizzle } from 'drizzle-orm/libsql';
import { createClient, Client } from '@libsql/client';
import * as schema from './schema';

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;
const globalForDbWarning = globalThis as typeof globalThis & {
  __temonDbWarningShown?: boolean;
};

// Build-time safe: don't create client if URL is missing
let client: Client | null = null;
let db: ReturnType<typeof drizzle<typeof schema>> | null = null;

if (url) {
  client = createClient({
    url,
    authToken,
  });
  db = drizzle(client, { schema });
} else {
  if (!globalForDbWarning.__temonDbWarningShown) {
    console.warn('TURSO_DATABASE_URL is not defined. DB operations will fail at runtime.');
    globalForDbWarning.__temonDbWarningShown = true;
  }
}

export function isDbAvailable() {
  return db !== null;
}

// Helper to get DB with runtime check
export function getDb() {
  if (!db) {
    throw new Error('Database not initialized. TURSO_DATABASE_URL is missing.');
  }
  return db;
}

// Export for backward compatibility (may be null during build)
export { client, db };

// Export type for use in other files if needed
export type Database = NonNullable<typeof db>;

