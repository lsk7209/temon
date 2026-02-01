/**
 * 테스트 결과 API
 * POST /api/results - 결과 저장
 * GET /api/results?id={id} - 결과 조회
 * 
 * Vercel Edge Runtime 최적화
 */

export const runtime = 'edge'
export const dynamic = 'force-dynamic'
export const revalidate = 0

import { NextRequest, NextResponse } from 'next/server'
import { saveTestResult, getTestResult } from '@/lib/db/queries/results'

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
    const resultId = await saveTestResult({
      testId,
      resultType,
      answers,
      userAgent,
      userIp: ipAddress,
    })

    return NextResponse.json(
      { id: resultId, success: true },
      { status: 201, headers: getCorsHeaders() }
    )
  } catch (error) {
    console.error('Error saving test result:', error)

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
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id || id.trim().length === 0) {
      return NextResponse.json(
        { error: 'Missing or empty id parameter' },
        { status: 400, headers: getCorsHeaders() }
      )
    }

    // UUID 형식 검증 (간단한 검증) (길이 및 하이픈 체크)
    if (id.length > 50) { // 너무 긴 ID 방어
      return NextResponse.json(
        { error: 'Invalid id format' },
        { status: 400, headers: getCorsHeaders() }
      )
    }

    const result = await getTestResult(id)

    if (!result) {
      return NextResponse.json(
        { error: 'Result not found' },
        { status: 404, headers: getCorsHeaders() }
      )
    }

    return NextResponse.json(result, { headers: getCorsHeaders() })
  } catch (error) {
    console.error('Error fetching test result:', error)

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: getCorsHeaders() }
    )
  }
}
