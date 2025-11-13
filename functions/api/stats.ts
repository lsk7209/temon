/**
 * 테스트 통계 API
 * GET /api/stats?testId=xxx - 테스트 통계 조회
 * 
 * Cloudflare Pages Functions 환경에서 실행됩니다.
 */

import type { PagesFunction } from '@cloudflare/workers-types'
import { Hono } from 'hono'
import { getDatabase, initDatabase } from '@/lib/db/client'
import type { D1Database } from '@cloudflare/workers-types'

type Env = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Env }>()

/**
 * CORS 헤더 설정
 */
function getCorsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
}

/**
 * 날짜 형식 검증 (YYYY-MM-DD)
 */
function isValidDate(dateString: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2}$/
  if (!regex.test(dateString)) {
    return false
  }
  const date = new Date(dateString)
  return date instanceof Date && !isNaN(date.getTime())
}

// OPTIONS 핸들러 (CORS preflight)
app.options('*', (c) => {
  return c.json({}, 200, getCorsHeaders())
})

// GET /api/stats - 테스트 통계 조회
app.get('/', async (c) => {
  try {
    // DB 연결 확인
    if (!c.env.DB) {
      return c.json(
        {
          error: 'Database not configured',
          message: 'D1 데이터베이스가 설정되지 않았습니다.',
        },
        503,
        getCorsHeaders()
      )
    }

    // 데이터베이스 초기화
    initDatabase(c.env.DB)
    const database = getDatabase()

    const testId = c.req.query('testId')
    const date = c.req.query('date') || new Date().toISOString().split('T')[0]
    const fromDate = c.req.query('fromDate')
    const toDate = c.req.query('toDate')

    if (!testId || testId.trim().length === 0) {
      return c.json(
        { error: 'Missing or empty testId parameter' },
        400,
        getCorsHeaders()
      )
    }

    // 날짜 형식 검증
    if (fromDate && !isValidDate(fromDate)) {
      return c.json(
        { error: 'Invalid fromDate format. Use YYYY-MM-DD' },
        400,
        getCorsHeaders()
      )
    }

    if (toDate && !isValidDate(toDate)) {
      return c.json(
        { error: 'Invalid toDate format. Use YYYY-MM-DD' },
        400,
        getCorsHeaders()
      )
    }

    if (!isValidDate(date)) {
      return c.json(
        { error: 'Invalid date format. Use YYYY-MM-DD' },
        400,
        getCorsHeaders()
      )
    }

    if (fromDate && toDate) {
      // 날짜 범위 조회
      if (fromDate > toDate) {
        return c.json(
          { error: 'fromDate must be before or equal to toDate' },
          400,
          getCorsHeaders()
        )
      }

      const stats = await database.getStatsByDateRange(testId, fromDate, toDate)
      return c.json({ stats }, 200, getCorsHeaders())
    } else {
      // 특정 날짜 조회
      const stats = await database.getTestStats(testId, date)
      if (!stats) {
        return c.json(
          { stats: null, message: 'No stats found for this date' },
          200,
          getCorsHeaders()
        )
      }
      return c.json({ stats }, 200, getCorsHeaders())
    }
  } catch (error) {
    console.error('Error fetching stats:', error)

    if (error instanceof Error && error.message.includes('Database not initialized')) {
      return c.json(
        { error: 'Database connection failed' },
        503,
        getCorsHeaders()
      )
    }

    return c.json(
      { error: 'Internal server error' },
      500,
      getCorsHeaders()
    )
  }
})

// Cloudflare Pages Functions는 onRequest export를 선호합니다
export const onRequest: PagesFunction<Env> = async (context) => {
  return app.fetch(context.request as any, context.env, context) as any
}

