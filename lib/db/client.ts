/**
 * 데이터베이스 클라이언트
 * Cloudflare D1 또는 로컬 SQLite 사용
 */

import type { TestResult, TestStats, PageVisit, TestStart } from './types'

/**
 * D1 데이터베이스 인터페이스 (Cloudflare Workers 환경)
 */
export interface D1Database {
  prepare(query: string): D1PreparedStatement
  exec(query: string): Promise<D1ExecResult>
  batch(statements: D1PreparedStatement[]): Promise<D1Result[]>
}

/**
 * Cloudflare Workers 환경 변수 타입
 */
export interface Env {
  DB: D1Database
  [key: string]: unknown
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
    changes: number
    last_row_id: number
    rows_read: number
    rows_written: number
  }
  results?: T[]
  error?: string
}

export interface D1ExecResult {
  duration: number
  count: number
}

/**
 * 데이터베이스 클라이언트 클래스
 */
export class DatabaseClient {
  private db: D1Database | null = null

  constructor(db?: D1Database) {
    this.db = db || null
  }

  /**
   * 테스트 결과 저장
   */
  async saveTestResult(result: Omit<TestResult, 'id' | 'createdAt'>): Promise<string> {
    if (!this.db) {
      throw new Error('Database not initialized')
    }

    const id = crypto.randomUUID()
    const createdAt = Date.now()
    const answersJson = JSON.stringify(result.answers)

    await this.db
      .prepare(
        `INSERT INTO test_results (id, test_id, result_type, answers, user_agent, ip_address, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(id, result.testId, result.resultType, answersJson, result.userAgent || null, result.ipAddress || null, createdAt)
      .run()

    return id
  }

  /**
   * 테스트 결과 조회
   */
  async getTestResult(id: string): Promise<TestResult | null> {
    if (!this.db) {
      throw new Error('Database not initialized')
    }

    const result = await this.db
      .prepare('SELECT * FROM test_results WHERE id = ?')
      .bind(id)
      .first<TestResult>()

    if (!result) {
      return null
    }

    return {
      ...result,
      answers: JSON.parse(result.answers as unknown as string) as Record<number, string>,
    }
  }

  /**
   * 테스트 시작 로그 저장
   */
  async logTestStart(testId: string, sessionId?: string): Promise<void> {
    if (!this.db) {
      return // 로컬 환경에서는 무시
    }

    await this.db
      .prepare('INSERT INTO test_starts (test_id, session_id, started_at) VALUES (?, ?, ?)')
      .bind(testId, sessionId || null, Date.now())
      .run()
  }

  /**
   * 페이지 방문 로그 저장
   */
  async logPageVisit(visit: Omit<PageVisit, 'id' | 'visitedAt'>): Promise<void> {
    if (!this.db) {
      return // 로컬 환경에서는 무시
    }

    await this.db
      .prepare('INSERT INTO page_visits (pathname, user_agent, referrer, ip_address, visited_at) VALUES (?, ?, ?, ?, ?)')
      .bind(visit.pathname, visit.userAgent || null, visit.referrer || null, visit.ipAddress || null, Date.now())
      .run()
  }

  /**
   * 테스트 통계 조회
   */
  async getTestStats(testId: string, date: string): Promise<TestStats | null> {
    if (!this.db) {
      return null
    }

    const result = await this.db
      .prepare('SELECT * FROM test_stats WHERE test_id = ? AND date = ?')
      .bind(testId, date)
      .first<TestStats>()

    if (!result) {
      return null
    }

    return {
      ...result,
      resultCounts: JSON.parse(result.resultCounts as unknown as string) as Record<string, number>,
    }
  }

  /**
   * 테스트 통계 업데이트/생성
   */
  async upsertTestStats(stats: Omit<TestStats, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> {
    if (!this.db) {
      return
    }

    const resultCountsJson = JSON.stringify(stats.resultCounts)
    const now = Date.now()

    await this.db
      .prepare(
        `INSERT INTO test_stats (test_id, date, started_count, completed_count, result_counts, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?)
         ON CONFLICT(test_id, date) DO UPDATE SET
           started_count = started_count + ?,
           completed_count = completed_count + ?,
           result_counts = ?,
           updated_at = ?`
      )
      .bind(
        stats.testId,
        stats.date,
        stats.startedCount,
        stats.completedCount,
        resultCountsJson,
        now,
        now,
        stats.startedCount,
        stats.completedCount,
        resultCountsJson,
        now
      )
      .run()
  }

  /**
   * 날짜 범위별 통계 조회
   */
  async getStatsByDateRange(testId: string, fromDate: string, toDate: string): Promise<TestStats[]> {
    if (!this.db) {
      return []
    }

    const results = await this.db
      .prepare('SELECT * FROM test_stats WHERE test_id = ? AND date >= ? AND date <= ? ORDER BY date DESC')
      .bind(testId, fromDate, toDate)
      .all<TestStats>()

    return (
      results.results?.map((r) => ({
        ...r,
        resultCounts: JSON.parse(r.resultCounts as unknown as string) as Record<string, number>,
      })) || []
    )
  }
}

/**
 * 싱글톤 인스턴스 (환경에 따라 초기화)
 */
let dbClient: DatabaseClient | null = null

/**
 * 데이터베이스 클라이언트 초기화
 */
export function initDatabase(db: D1Database): DatabaseClient {
  dbClient = new DatabaseClient(db)
  return dbClient
}

/**
 * 데이터베이스 클라이언트 가져오기
 */
export function getDatabase(): DatabaseClient {
  if (!dbClient) {
    // 로컬 환경에서는 null 반환 (옵셔널)
    dbClient = new DatabaseClient()
  }
  return dbClient
}

