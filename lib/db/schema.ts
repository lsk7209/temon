/**
 * Cloudflare D1 Database Schema
 * Drizzle ORM을 사용한 테스트 플랫폼 스키마
 */

import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'

// 테스트 메타데이터
export const tests = sqliteTable('tests', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  subtitle: text('subtitle'),
  description: text('description'),
  category: text('category'), // 'food', 'lifestyle', 'entertainment', etc.
  status: text('status').notNull().default('draft'), // 'draft', 'published', 'archived'
  publishedAt: integer('published_at', { mode: 'timestamp' }), // Scheduled publish time
  questionCount: integer('question_count').notNull().default(12),
  avgMinutes: integer('avg_minutes').notNull().default(3),
  resultTypeCount: integer('result_type_count').notNull().default(16),
  metadata: text('metadata', { mode: 'json' }), // SEO, OG tags, etc.
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
})

// 생성 대기열 (자동화)
export const testQueue = sqliteTable('test_queue', {
  id: text('id').primaryKey(),
  keyword: text('keyword').notNull(),
  status: text('status').notNull().default('pending'), // 'pending', 'processing', 'completed', 'failed'
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
  processedAt: integer('processed_at', { mode: 'timestamp' }),
  logs: text('logs'), // Error logs or success details
})

// 질문 데이터
export const questions = sqliteTable('questions', {
  id: text('id').primaryKey(),
  testId: text('test_id').notNull().references(() => tests.id, { onDelete: 'cascade' }),
  questionOrder: integer('question_order').notNull(),
  questionText: text('question_text').notNull(),
  choice1Text: text('choice_1_text').notNull(),
  choice1Tags: text('choice_1_tags').notNull(), // JSON array: ["E", "S"]
  choice2Text: text('choice_2_text').notNull(),
  choice2Tags: text('choice_2_tags').notNull(),
})

// 결과 타입 데이터
export const resultTypes = sqliteTable('result_types', {
  id: text('id').primaryKey(),
  testId: text('test_id').notNull().references(() => tests.id, { onDelete: 'cascade' }),
  typeCode: text('type_code').notNull(), // 'ENFP', 'INFP', etc.
  label: text('label').notNull(),
  summary: text('summary'),
  traits: text('traits', { mode: 'json' }), // JSON array
  picks: text('picks', { mode: 'json' }), // JSON array (optional)
  tips: text('tips', { mode: 'json' }), // JSON array
  matchTypes: text('match_types'), // JSON array or comma-separated
  emoji: text('emoji'),
})

// 테스트 결과 저장
export const testResults = sqliteTable('test_results', {
  id: text('id').primaryKey(),
  testId: text('test_id').notNull().references(() => tests.id),
  resultType: text('result_type').notNull(),
  answers: text('answers', { mode: 'json' }).notNull(), // JSON array
  userIp: text('user_ip'),
  userAgent: text('user_agent'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
})

// 통계 집계 (크론으로 주기적 업데이트)
export const testStats = sqliteTable('test_stats', {
  testId: text('test_id').primaryKey().references(() => tests.id),
  totalCompletions: integer('total_completions').notNull().default(0),
  typeDistribution: text('type_distribution', { mode: 'json' }), // JSON: {"ENFP": 100, "INFP": 80, ...}
  avgCompletionTime: real('avg_completion_time'),
  lastUpdated: integer('last_updated', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
})

// 페이지 방문 기록
export const pageVisits = sqliteTable('page_visits', {
  id: text('id').primaryKey(),
  path: text('path').notNull(),
  referrer: text('referrer'),
  searchKeyword: text('search_keyword'),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  deviceType: text('device_type'), // mobile, desktop, tablet
  browser: text('browser'),
  os: text('os'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
})

// 테스트 시작 기록
export const testStarts = sqliteTable('test_starts', {
  id: text('id').primaryKey(),
  testId: text('test_id').notNull().references(() => tests.id),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
})

// 인덱스
export const indexes = {
  testsSlug: 'idx_tests_slug',
  testsStatus: 'idx_tests_status',
  testsCategory: 'idx_tests_category',
  questionsTestId: 'idx_questions_test_id',
  resultTypesTestId: 'idx_result_types_test_id',
  resultTypesTypeCode: 'idx_result_types_type_code',
  testResultsTestId: 'idx_test_results_test_id',
  testResultsCreatedAt: 'idx_test_results_created_at',
}

