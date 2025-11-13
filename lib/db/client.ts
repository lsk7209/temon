/**
 * Cloudflare D1 Database Client
 * Cloudflare Pages Functions 환경에서 사용
 */

import { drizzle } from 'drizzle-orm/d1'
import * as schema from './schema'

export function getDb(env: { DB: D1Database }) {
  return drizzle(env.DB, { schema })
}

export type Db = ReturnType<typeof getDb>
