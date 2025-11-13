/**
 * Cloudflare D1 Database Client
 * Cloudflare Pages Functions 환경에서 사용
 */

import { drizzle } from 'drizzle-orm/d1'
import * as schema from './schema'
import type { TestResult, TestStats } from './types'

// Cloudflare D1 Database 타입
export interface D1Database {
  prepare(query: string): D1PreparedStatement
  exec(query: string): Promise<D1ExecResult>
  batch<T = unknown>(statements: D1PreparedStatement[]): Promise<D1Result<T>[]>
}

export interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement
  first<T = unknown>(colName?: string): Promise<T | null>
  run(): Promise<D1Result>
  all<T = unknown>(): Promise<D1Result<T>>
}

export interface D1Result<T = unknown> {
  success: boolean
  meta: {
    duration: number
    size_after: number
    rows_read: number
    rows_written: number
  }
  results?: T[]
}

export interface D1ExecResult {
  count: number
  duration: number
}

// 데이터베이스 인스턴스 (싱글톤)
let dbInstance: D1Database | null = null
let database: Database | null = null

/**
 * 데이터베이스 초기화
 */
export function initDatabase(db: D1Database) {
  dbInstance = db
  database = new Database(db)
}

/**
 * 데이터베이스 인스턴스 가져오기
 */
export function getDatabase(): Database {
  if (!database) {
    throw new Error('Database not initialized. Call initDatabase() first.')
  }
  return database
}

/**
 * Drizzle ORM 데이터베이스 가져오기 (새로운 스키마용)
 */
export function getDb(env: { DB: D1Database }) {
  return drizzle(env.DB, { schema })
}

export type Db = ReturnType<typeof getDb>

/**
 * 데이터베이스 래퍼 클래스
 * 기존 API 라우트와의 호환성을 위한 래퍼
 */
class Database {
  private db: D1Database

  constructor(db: D1Database) {
    this.db = db
  }

  /**
   * 테스트 결과 저장
   */
  async saveTestResult(data: {
    testId: string
    resultType: string
    answers: Record<number, string>
    userAgent?: string
    ipAddress?: string
  }): Promise<string> {
    const id = `result_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const answersJson = JSON.stringify(data.answers)
    const createdAt = Math.floor(Date.now() / 1000)

    const stmt = this.db.prepare(
      `INSERT INTO test_results (id, test_id, result_type, answers, user_agent, ip_address, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    )

    await stmt
      .bind(
        id,
        data.testId,
        data.resultType,
        answersJson,
        data.userAgent || null,
        data.ipAddress || null,
        createdAt
      )
      .run()

    return id
  }

  /**
   * 테스트 결과 조회
   */
  async getTestResult(id: string): Promise<TestResult | null> {
    const stmt = this.db.prepare('SELECT * FROM test_results WHERE id = ?')
    const result = await stmt.bind(id).first<{
      id: string
      test_id: string
      result_type: string
      answers: string
      user_agent: string | null
      ip_address: string | null
      created_at: number
    }>()

    if (!result) {
      return null
    }

    return {
      id: result.id,
      testId: result.test_id,
      resultType: result.result_type,
      answers: JSON.parse(result.answers),
      userAgent: result.user_agent || undefined,
      ipAddress: result.ip_address || undefined,
      createdAt: result.created_at,
    }
  }

  /**
   * 테스트 통계 조회
   */
  async getTestStats(
    testId: string,
    date?: string
  ): Promise<TestStats | null> {
    const targetDate = date || new Date().toISOString().split('T')[0]
    const stmt = this.db.prepare(
      'SELECT * FROM test_stats WHERE test_id = ? AND date = ?'
    )
    const result = await stmt.bind(testId, targetDate).first<{
      id: number
      test_id: string
      date: string
      started_count: number
      completed_count: number
      result_counts: string
      created_at: number
      updated_at: number
    }>()

    if (!result) {
      return null
    }

    return {
      id: result.id,
      testId: result.test_id,
      date: result.date,
      startedCount: result.started_count,
      completedCount: result.completed_count,
      resultCounts: JSON.parse(result.result_counts || '{}'),
      createdAt: result.created_at,
      updatedAt: result.updated_at,
    }
  }
}
