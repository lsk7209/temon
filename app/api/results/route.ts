/**
 * 테스트 결과 API
 * POST /api/results - 결과 저장
 * GET /api/results?id={id} - 결과 조회
 * 
 * 주의: output: 'export' 사용 시 API 라우트는 빌드에서 제외됩니다.
 * 실제 API는 Cloudflare Pages Functions에서 처리됩니다.
 */

// export const dynamic = 'force-dynamic' // output: 'export'와 호환되지 않음
// export const revalidate = 0 // 캐싱 비활성화
// export const runtime = 'edge' // Edge Runtime 사용 (Cloudflare 호환)

import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/db/client'
import { initDatabase } from '@/lib/db/client'
import type { D1Database } from '@/lib/db/client'

/**
 * Cloudflare Workers/Pages Functions 환경에서 D1 데이터베이스 가져오기
 * 
 * 주의: Next.js API Routes는 Cloudflare Pages에서 자동으로 Functions로 변환됩니다.
 * 하지만 context 객체에 직접 접근하기 어려우므로, 이 방식은 제한적입니다.
 * 
 * 대안:
 * 1. functions/ 디렉토리에 별도 API를 만들어 사용
 * 2. Cloudflare Pages Functions의 onRequest 핸들러 사용
 * 3. 환경 변수로 데이터베이스 연결 정보 전달
 */
function getD1Database(): D1Database | undefined {
  // Cloudflare Pages Functions 환경 확인
  if (typeof globalThis !== 'undefined' && 'process' in globalThis) {
    // Node.js 개발 환경 (로컬 개발 시)
    return undefined
  }
  
  // Cloudflare Workers/Pages Functions 환경
  // 실제로는 context.env.DB를 통해 접근해야 하지만,
  // Next.js Route Handler에서는 직접 접근이 어려움
  return (globalThis as any).env?.DB || (globalThis as any).__env?.DB
}

/**
 * CORS 헤더 설정
 */
function getCorsHeaders() {
  return {
    'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_APP_URL || '*',
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

/**
 * OPTIONS 핸들러 (CORS preflight)
 */
export async function OPTIONS() {
  return NextResponse.json({}, { headers: getCorsHeaders() })
}

/**
 * POST /api/results - 테스트 결과 저장
 */
export async function POST(request: NextRequest) {
  try {
    // 데이터베이스 초기화
    const db = getD1Database()
    if (db) {
      initDatabase(db)
    }
    const database = getDatabase()

    // 요청 본문 파싱 및 검증
    let body: unknown
    try {
      body = await request.json()
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400, headers: getCorsHeaders() }
      )
    }

    const validated = validateTestResult(body)
    if (!validated) {
      return NextResponse.json(
        { error: 'Missing or invalid required fields: testId, resultType, answers' },
        { status: 400, headers: getCorsHeaders() }
      )
    }

    const { testId, resultType, answers } = validated

    // 클라이언트 정보 추출
    const userAgent = request.headers.get('user-agent') || undefined
    const ipAddress =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      undefined

    // 결과 저장
    const resultId = await database.saveTestResult({
      testId,
      resultType,
      answers,
      userAgent,
      ipAddress,
    })

    return NextResponse.json(
      { id: resultId, success: true },
      { status: 201, headers: getCorsHeaders() }
    )
  } catch (error) {
    console.error('Error saving test result:', error)
    
    // 에러 타입별 처리
    if (error instanceof Error && error.message.includes('Database not initialized')) {
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 503, headers: getCorsHeaders() }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: getCorsHeaders() }
    )
  }
}

/**
 * GET /api/results?id={id} - 테스트 결과 조회
 */
export async function GET(request: NextRequest) {
  try {
    // 데이터베이스 초기화
    const db = getD1Database()
    if (db) {
      initDatabase(db)
    }
    const database = getDatabase()

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id || id.trim().length === 0) {
      return NextResponse.json(
        { error: 'Missing or empty id parameter' },
        { status: 400, headers: getCorsHeaders() }
      )
    }

    // UUID 형식 검증 (간단한 검증)
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
      return NextResponse.json(
        { error: 'Invalid id format' },
        { status: 400, headers: getCorsHeaders() }
      )
    }

    const result = await database.getTestResult(id)

    if (!result) {
      return NextResponse.json(
        { error: 'Result not found' },
        { status: 404, headers: getCorsHeaders() }
      )
    }

    return NextResponse.json(result, { headers: getCorsHeaders() })
  } catch (error) {
    console.error('Error fetching test result:', error)

    if (error instanceof Error && error.message.includes('Database not initialized')) {
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 503, headers: getCorsHeaders() }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: getCorsHeaders() }
    )
  }
}

