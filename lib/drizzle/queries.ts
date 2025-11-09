/**
 * Drizzle ORM 쿼리 헬퍼 함수
 */

import { eq, and, gte, lte, sql, desc, count, sum, avg } from 'drizzle-orm'
import type { D1Database } from '@cloudflare/workers-types'
import { drizzle } from 'drizzle-orm/d1'
import * as schema from './schema'

export function getDrizzleDB(env: { DB: D1Database }) {
  return drizzle(env.DB, { schema })
}

/**
 * 퍼널 데이터 (날짜 범위 지정 가능)
 */
export async function getTodayFunnel(
  db: ReturnType<typeof getDrizzleDB>,
  startDate?: number,
  endDate?: number
) {
  // 날짜 범위가 지정되지 않으면 오늘로 설정
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todayStart = startDate || today.getTime()
  const todayEnd = endDate || (todayStart + 24 * 60 * 60 * 1000)

  const views = await db
    .select({ count: count() })
    .from(schema.pageView)
    .where(and(gte(schema.pageView.occurredAt, todayStart), lte(schema.pageView.occurredAt, todayEnd)))

  const started = await db
    .select({ count: count() })
    .from(schema.attempt)
    .where(and(gte(schema.attempt.startedAt, todayStart), lte(schema.attempt.startedAt, todayEnd)))

  const completed = await db
    .select({ count: count() })
    .from(schema.attempt)
    .where(
      and(
        gte(schema.attempt.completedAt, todayStart),
        lte(schema.attempt.completedAt, todayEnd),
        sql`${schema.attempt.completedAt} IS NOT NULL`
      )
    )

  const abandoned = await db
    .select({ count: count() })
    .from(schema.attempt)
    .where(
      and(
        gte(schema.attempt.abandonedAt, todayStart),
        lte(schema.attempt.abandonedAt, todayEnd),
        sql`${schema.attempt.abandonedAt} IS NOT NULL`
      )
    )

  return {
    views: views[0]?.count || 0,
    started: started[0]?.count || 0,
    completed: completed[0]?.count || 0,
    abandoned: abandoned[0]?.count || 0,
  }
}

/**
 * 채널/캠페인 성과
 */
export async function getChannelPerformance(
  db: ReturnType<typeof getDrizzleDB>,
  startDate: number,
  endDate: number
) {
  const result = await db
    .select({
      source: sql<string>`COALESCE(${schema.pageView.utmSource}, '(none)')`.as('source'),
      medium: sql<string>`COALESCE(${schema.pageView.utmMedium}, '(none)')`.as('medium'),
      campaign: sql<string>`COALESCE(${schema.pageView.utmCampaign}, '(none)')`.as('campaign'),
      sessions: sql<number>`COUNT(DISTINCT ${schema.pageView.sessionId})`.as('sessions'),
      attempts: sql<number>`COUNT(DISTINCT ${schema.attempt.attemptId})`.as('attempts'),
      completes: sql<number>`SUM(CASE WHEN ${schema.attempt.completedAt} IS NOT NULL THEN 1 ELSE 0 END)`.as('completes'),
    })
    .from(schema.pageView)
    .leftJoin(schema.attempt, eq(schema.pageView.sessionId, schema.attempt.sessionId))
    .where(and(gte(schema.pageView.occurredAt, startDate), lte(schema.pageView.occurredAt, endDate)))
    .groupBy(schema.pageView.utmSource, schema.pageView.utmMedium, schema.pageView.utmCampaign)
    .orderBy(desc(sql`completes`))

  return result.map((row) => ({
    ...row,
    convRate: row.attempts > 0 ? row.completes / row.attempts : 0,
  }))
}

/**
 * 브라우저별 전환율
 */
export async function getBrowserConversion(
  db: ReturnType<typeof getDrizzleDB>,
  startDate: number,
  endDate: number
) {
  const result = await db
    .select({
      browser: schema.session.browser,
      browserVer: schema.session.browserVer,
      sessions: sql<number>`COUNT(DISTINCT ${schema.session.sessionId})`.as('sessions'),
      attempts: sql<number>`COUNT(DISTINCT ${schema.attempt.attemptId})`.as('attempts'),
      completes: sql<number>`SUM(CASE WHEN ${schema.attempt.completedAt} IS NOT NULL THEN 1 ELSE 0 END)`.as('completes'),
    })
    .from(schema.session)
    .leftJoin(schema.attempt, eq(schema.session.sessionId, schema.attempt.sessionId))
    .where(and(gte(schema.session.startedAt, startDate), lte(schema.session.startedAt, endDate)))
    .groupBy(schema.session.browser, schema.session.browserVer)
    .orderBy(sql`conv_rate ASC, sessions DESC`)

  return result.map((row) => ({
    ...row,
    convRate: row.attempts > 0 ? row.completes / row.attempts : 0,
  }))
}

/**
 * 키워드 Top 10
 */
export async function getTopKeywords(
  db: ReturnType<typeof getDrizzleDB>,
  startDate: number,
  endDate: number
) {
  const result = await db
    .select({
      keyword: sql<string>`LOWER(${schema.pageView.utmTerm})`.as('keyword'),
      sessions: sql<number>`COUNT(*)`.as('sessions'),
    })
    .from(schema.pageView)
    .where(
      and(
        gte(schema.pageView.occurredAt, startDate),
        lte(schema.pageView.occurredAt, endDate),
        sql`${schema.pageView.utmTerm} IS NOT NULL AND TRIM(${schema.pageView.utmTerm}) <> ''`
      )
    )
    .groupBy(schema.pageView.utmTerm)
    .orderBy(desc(sql`sessions`))
    .limit(10)

  return result
}

/**
 * 지역별 통계
 */
export async function getGeoStats(
  db: ReturnType<typeof getDrizzleDB>,
  startDate: number,
  endDate: number
) {
  const result = await db
    .select({
      country: schema.session.country,
      city: schema.session.city,
      sessions: sql<number>`COUNT(DISTINCT ${schema.session.sessionId})`.as('sessions'),
      attempts: sql<number>`COUNT(DISTINCT ${schema.attempt.attemptId})`.as('attempts'),
      completes: sql<number>`SUM(CASE WHEN ${schema.attempt.completedAt} IS NOT NULL THEN 1 ELSE 0 END)`.as('completes'),
    })
    .from(schema.session)
    .leftJoin(schema.attempt, eq(schema.session.sessionId, schema.attempt.sessionId))
    .where(and(gte(schema.session.startedAt, startDate), lte(schema.session.startedAt, endDate)))
    .groupBy(schema.session.country, schema.session.city)
    .orderBy(desc(sql`sessions`))

  return result.map((row) => ({
    ...row,
    convRate: row.attempts > 0 ? row.completes / row.attempts : 0,
  }))
}

/**
 * 시간대 히트맵 (요일 × 시간)
 */
export async function getTimeHeatmap(
  db: ReturnType<typeof getDrizzleDB>,
  startDate: number,
  endDate: number
) {
  const result = await db
    .select({
      dayOfWeek: sql<number>`CAST(strftime('%w', datetime(${schema.pageView.occurredAt}/1000, 'unixepoch')) AS INTEGER)`.as('dayOfWeek'),
      hour: sql<number>`CAST(strftime('%H', datetime(${schema.pageView.occurredAt}/1000, 'unixepoch')) AS INTEGER)`.as('hour'),
      views: sql<number>`COUNT(*)`.as('views'),
    })
    .from(schema.pageView)
    .where(and(gte(schema.pageView.occurredAt, startDate), lte(schema.pageView.occurredAt, endDate)))
    .groupBy(sql`dayOfWeek`, sql`hour`)

  return result
}

/**
 * Web Vitals 통계
 */
export async function getWebVitalsStats(
  db: ReturnType<typeof getDrizzleDB>,
  startDate: number,
  endDate: number
) {
  const result = await db
    .select({
      lcp: avg(schema.webVitals.lcp),
      fid: avg(schema.webVitals.fid),
      cls: avg(schema.webVitals.cls),
      ttfb: avg(schema.webVitals.ttfb),
    })
    .from(schema.webVitals)
    .where(and(gte(schema.webVitals.occurredAt, startDate), lte(schema.webVitals.occurredAt, endDate)))

  return result[0] || { lcp: null, fid: null, cls: null, ttfb: null }
}

