/**
 * Drizzle ORM 스키마 정의
 * Cloudflare D1 (SQLite)용
 */

import { sqliteTable, text, integer, real, index } from 'drizzle-orm/sqlite-core'

// 세션 테이블
export const session = sqliteTable(
  'session',
  {
    sessionId: text('session_id').primaryKey(),
    anonymousId: text('anonymous_id'),
    startedAt: integer('started_at').notNull(),
    endedAt: integer('ended_at'),
    device: text('device'),
    os: text('os'),
    browser: text('browser'),
    browserVer: text('browser_ver'),
    viewportW: integer('viewport_w'),
    viewportH: integer('viewport_h'),
    country: text('country'),
    region: text('region'),
    city: text('city'),
  },
  (table) => ({
    browserIdx: index('idx_session_browser').on(table.browser, table.browserVer),
    countryIdx: index('idx_session_country').on(table.country),
  })
)

// 페이지 뷰 테이블
export const pageView = sqliteTable(
  'page_view',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    sessionId: text('session_id').notNull().references(() => session.sessionId),
    occurredAt: integer('occurred_at').notNull(),
    path: text('path'),
    referrerHost: text('referrer_host'),
    referrerPath: text('referrer_path'),
    utmSource: text('utm_source'),
    utmMedium: text('utm_medium'),
    utmCampaign: text('utm_campaign'),
    utmTerm: text('utm_term'),
    utmContent: text('utm_content'),
  },
  (table) => ({
    timeIdx: index('idx_pv_time').on(table.occurredAt),
    utmIdx: index('idx_pv_utm').on(table.utmSource, table.utmMedium, table.utmCampaign),
  })
)

// 테스트 시도 테이블
export const attempt = sqliteTable(
  'attempt',
  {
    attemptId: text('attempt_id').primaryKey(),
    sessionId: text('session_id').notNull().references(() => session.sessionId),
    quizId: text('quiz_id'),
    startedAt: integer('started_at').notNull(),
    completedAt: integer('completed_at'),
    abandonedAt: integer('abandoned_at'),
    abandonReason: text('abandon_reason'),
  },
  (table) => ({
    startedIdx: index('idx_attempt_started').on(table.startedAt),
    completedIdx: index('idx_attempt_completed').on(table.completedAt),
    abandonedIdx: index('idx_attempt_abandoned').on(table.abandonedAt),
    quizIdx: index('idx_attempt_quiz').on(table.quizId),
  })
)

// 섹션 진입 테이블
export const attemptSection = sqliteTable('attempt_section', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  attemptId: text('attempt_id').notNull().references(() => attempt.attemptId),
  sectionIndex: integer('section_index').notNull(),
  enteredAt: integer('entered_at').notNull(),
  leftAt: integer('left_at'),
})

// Web Vitals 테이블
export const webVitals = sqliteTable('web_vitals', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  sessionId: text('session_id').references(() => session.sessionId),
  occurredAt: integer('occurred_at').notNull(),
  lcp: real('lcp'),
  fid: real('fid'),
  cls: real('cls'),
  ttfb: real('ttfb'),
})

// HTTP 에러 테이블
export const httpError = sqliteTable('http_error', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  occurredAt: integer('occurred_at').notNull(),
  path: text('path'),
  status: integer('status'),
  latencyMs: integer('latency_ms'),
})

// 타입 추출
export type Session = typeof session.$inferSelect
export type PageView = typeof pageView.$inferSelect
export type Attempt = typeof attempt.$inferSelect
export type AttemptSection = typeof attemptSection.$inferSelect
export type WebVitals = typeof webVitals.$inferSelect
export type HttpError = typeof httpError.$inferSelect

export type NewSession = typeof session.$inferInsert
export type NewPageView = typeof pageView.$inferInsert
export type NewAttempt = typeof attempt.$inferInsert
export type NewAttemptSection = typeof attemptSection.$inferInsert
export type NewWebVitals = typeof webVitals.$inferInsert
export type NewHttpError = typeof httpError.$inferInsert

