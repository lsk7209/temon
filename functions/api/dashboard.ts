/**
 * 관리자 대시보드 API
 * GET /api/dashboard - 대시보드 통계 데이터 조회
 * 
 * Cloudflare Pages Functions 환경에서 실행됩니다.
 */

import type { PagesFunction } from '@cloudflare/workers-types'
import { Hono } from 'hono'
import { initDatabase } from '@/lib/db/client'
import type { D1Database } from '@cloudflare/workers-types'

type Env = {
  DB: D1Database
  ADMIN_TOKEN?: string
}

const app = new Hono<{ Bindings: Env }>()

/**
 * CORS 헤더 설정
 */
function getCorsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  }
}

// OPTIONS 핸들러 (CORS preflight)
app.options('*', (c) => {
  return c.json({}, 200, getCorsHeaders())
})

// GET /api/dashboard - 대시보드 통계 조회
app.get('/', async (c) => {
  try {
    // DB 연결 확인
    if (!c.env.DB) {
      // 개발 환경: 모의 데이터 반환
      return c.json(
        {
          totalVisits: 0,
          totalTestsStarted: 0,
          totalTestsCompleted: 0,
          lastVisit: Date.now(),
          testStats: {},
          message: 'Database not available in development',
        },
        200,
        getCorsHeaders()
      )
    }

    // 데이터베이스 초기화
    initDatabase(c.env.DB)
    const db = c.env.DB

    // 전체 통계 조회
    const today = new Date().toISOString().split('T')[0]

    // 총 방문 수 (페이지 방문 테이블)
    const visitsResult = await db
      .prepare('SELECT COUNT(*) as count FROM page_visits')
      .first<{ count: number }>()

    // 총 테스트 시작 수
    const startsResult = await db
      .prepare('SELECT COUNT(*) as count FROM test_starts')
      .first<{ count: number }>()

    // 총 테스트 완료 수
    const resultsResult = await db
      .prepare('SELECT COUNT(*) as count FROM test_results')
      .first<{ count: number }>()

    // 마지막 방문 시간
    const lastVisitResult = await db
      .prepare('SELECT MAX(created_at) as last_visit FROM page_visits')
      .first<{ last_visit: number }>()

    // 테스트별 통계
    const testStatsResult = await db
      .prepare(
        `SELECT 
        test_id,
        COUNT(*) as started
      FROM test_starts
      GROUP BY test_id`
      )
      .all<{ test_id: string; started: number }>()

    const completedStatsResult = await db
      .prepare(
        `SELECT 
        test_id,
        COUNT(*) as completed
      FROM test_results
      GROUP BY test_id`
      )
      .all<{ test_id: string; completed: number }>()

    // 통계 조합
    const testStats: Record<string, { started: number; completed: number }> = {}

    testStatsResult.results?.forEach((row) => {
      testStats[row.test_id] = {
        started: row.started,
        completed: 0,
      }
    })

    completedStatsResult.results?.forEach((row) => {
      if (!testStats[row.test_id]) {
        testStats[row.test_id] = { started: 0, completed: 0 }
      }
      testStats[row.test_id].completed = row.completed
    })

    return c.json(
      {
        totalVisits: visitsResult?.count || 0,
        totalTestsStarted: startsResult?.count || 0,
        totalTestsCompleted: resultsResult?.count || 0,
        lastVisit: lastVisitResult?.last_visit || Date.now(),
        testStats,
      },
      200,
      getCorsHeaders()
    )
  } catch (error) {
    console.error('Dashboard API error:', error)

    // DB 관련 오류인지 확인
    const errorMessage = error instanceof Error ? error.message : String(error)
    const isDbError =
      errorMessage.includes('database') ||
      errorMessage.includes('D1') ||
      errorMessage.includes('binding') ||
      errorMessage.includes('SQL') ||
      errorMessage.includes('no such table')

    if (isDbError) {
      return c.json(
        {
          error: 'Database connection error',
          message: '데이터베이스 연결에 실패했습니다. D1 데이터베이스가 올바르게 설정되었는지 확인해주세요.',
          dbConnected: false,
        },
        503,
        getCorsHeaders()
      )
    }

    return c.json(
      { error: 'Failed to fetch dashboard stats' },
      500,
      getCorsHeaders()
    )
  }
})

// Cloudflare Pages Functions는 onRequest export를 선호합니다
export const onRequest: PagesFunction<Env> = async (context) => {
  return app.fetch(context.request as any, context.env, context) as any
}

