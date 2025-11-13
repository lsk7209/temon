/**
 * Cloudflare D1 Database Client
 * Cloudflare Pages Functions 환경에서 사용
 */

import { drizzle } from 'drizzle-orm/d1'
import * as schema from './schema'
import type { TestResult, TestStats, AggregatedStats } from './types'
import type { D1Database } from '@cloudflare/workers-types'

// D1Database 타입을 @cloudflare/workers-types에서 재export
export type { D1Database } from '@cloudflare/workers-types'

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
  // D1Database 타입을 직접 전달 (타입 호환성 보장)
  return drizzle(env.DB as any, { schema })
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

  /**
   * 날짜 범위별 통계 조회
   */
  async getStatsByDateRange(
    testId: string,
    fromDate: string,
    toDate: string
  ): Promise<AggregatedStats | null> {
    const stmt = this.db.prepare(
      `SELECT 
        SUM(started_count) as total_started,
        SUM(completed_count) as total_completed,
        GROUP_CONCAT(result_counts) as all_result_counts
      FROM test_stats 
      WHERE test_id = ? AND date >= ? AND date <= ?`
    )

    const result = await stmt.bind(testId, fromDate, toDate).first<{
      total_started: number | null
      total_completed: number | null
      all_result_counts: string | null
    }>()

    if (!result || result.total_started === null) {
      return null
    }

    // 모든 날짜의 result_counts를 합산
    const resultDistribution: Record<string, number> = {}
    if (result.all_result_counts) {
      const countsArray = result.all_result_counts.split(',')
      countsArray.forEach((countStr) => {
        try {
          const counts = JSON.parse(countStr)
          Object.keys(counts).forEach((key) => {
            resultDistribution[key] = (resultDistribution[key] || 0) + counts[key]
          })
        } catch {
          // JSON 파싱 실패 시 무시
        }
      })
    }

    const totalStarted = result.total_started || 0
    const totalCompleted = result.total_completed || 0
    const completionRate = totalStarted > 0 ? totalCompleted / totalStarted : 0

    return {
      testId,
      totalStarted,
      totalCompleted,
      completionRate,
      resultDistribution,
      dateRange: {
        from: fromDate,
        to: toDate,
      },
    }
  }
}
