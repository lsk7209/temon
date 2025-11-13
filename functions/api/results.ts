/**
 * 테스트 결과 API
 * POST /api/results - 결과 저장
 * GET /api/results?id={id} - 결과 조회
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
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  }
}

/**
 * 입력 검증
 */
function validateTestResult(body: unknown): {
  testId: string
  resultType: string
  answers: Record<number, string>
} | null {
  if (typeof body !== 'object' || body === null) {
    return null
  }

  const { testId, resultType, answers } = body as Record<string, unknown>

  if (typeof testId !== 'string' || testId.length === 0) {
    return null
  }

  if (typeof resultType !== 'string' || resultType.length === 0) {
    return null
  }

  if (typeof answers !== 'object' || answers === null || Array.isArray(answers)) {
    return null
  }

  return { testId, resultType, answers: answers as Record<number, string> }
}

// OPTIONS 핸들러 (CORS preflight)
app.options('*', (c) => {
  return c.json({}, 200, getCorsHeaders())
})

// POST /api/results - 테스트 결과 저장
app.post('/', async (c) => {
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

    // 요청 본문 파싱 및 검증
    let body: unknown
    try {
      body = await c.req.json()
    } catch {
      return c.json(
        { error: 'Invalid JSON in request body' },
        400,
        getCorsHeaders()
      )
    }

    const validated = validateTestResult(body)
    if (!validated) {
      return c.json(
        { error: 'Missing or invalid required fields: testId, resultType, answers' },
        400,
        getCorsHeaders()
      )
    }

    const { testId, resultType, answers } = validated

    // 클라이언트 정보 추출
    const userAgent = c.req.header('user-agent') || undefined
    const ipAddress = c.req.header('cf-connecting-ip') || undefined

    // 결과 저장
    const resultId = await database.saveTestResult({
      testId,
      resultType,
      answers,
      userAgent,
      ipAddress,
    })

    return c.json(
      { id: resultId, success: true },
      201,
      getCorsHeaders()
    )
  } catch (error) {
    console.error('Error saving test result:', error)

    // 에러 타입별 처리
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

// GET /api/results?id={id} - 테스트 결과 조회
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

    const id = c.req.query('id')

    if (!id || id.trim().length === 0) {
      return c.json(
        { error: 'Missing or empty id parameter' },
        400,
        getCorsHeaders()
      )
    }

    // UUID 형식 검증 (간단한 검증)
    if (!/^result_[0-9]+_[a-z0-9]+$/i.test(id)) {
      return c.json(
        { error: 'Invalid id format' },
        400,
        getCorsHeaders()
      )
    }

    const result = await database.getTestResult(id)

    if (!result) {
      return c.json(
        { error: 'Result not found' },
        404,
        getCorsHeaders()
      )
    }

    return c.json(result, 200, getCorsHeaders())
  } catch (error) {
    console.error('Error fetching test result:', error)

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

