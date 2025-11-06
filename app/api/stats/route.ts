/**
 * 테스트 통계 API
 * GET /api/stats?testId=xxx - 테스트 통계 조회
 * 
 * Route Segment Config: Next.js 14 베스트 프랙티스
 */
export const dynamic = 'force-dynamic' // 항상 동적 렌더링
export const revalidate = 300 // 5분간 캐싱 (통계 데이터는 자주 변경되지 않음)
export const runtime = 'edge' // Edge Runtime 사용

import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/db/client'
import { initDatabase } from '@/lib/db/client'
import type { D1Database } from '@/lib/db/client'

/**
 * Cloudflare Workers/Pages Functions 환경에서 D1 데이터베이스 가져오기
 * 
 * 주의: Cloudflare Pages에서 Next.js API Routes는 Functions로 변환되지만,
 * context 객체 접근이 제한적입니다. 프로덕션에서는 functions/ 디렉토리 사용 권장.
 */
function getD1Database(): D1Database | undefined {
  // Cloudflare Pages Functions 환경 확인
  if (typeof globalThis !== 'undefined' && 'process' in globalThis) {
    // Node.js 개발 환경
    return undefined
  }
  
  // Cloudflare Workers/Pages Functions 환경
  // @ts-expect-error - Cloudflare 환경 전역 객체
  return (globalThis as any).env?.DB || (globalThis as any).__env?.DB
}

/**
 * CORS 헤더 설정
 */
function getCorsHeaders() {
  return {
    'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_APP_URL || '*',
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

/**
 * OPTIONS 핸들러 (CORS preflight)
 */
export async function OPTIONS() {
  return NextResponse.json({}, { headers: getCorsHeaders() })
}

/**
 * GET /api/stats - 테스트 통계 조회
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
    const testId = searchParams.get('testId')
    const date = searchParams.get('date') || new Date().toISOString().split('T')[0]
    const fromDate = searchParams.get('fromDate')
    const toDate = searchParams.get('toDate')

    if (!testId || testId.trim().length === 0) {
      return NextResponse.json(
        { error: 'Missing or empty testId parameter' },
        { status: 400, headers: getCorsHeaders() }
      )
    }

    // 날짜 형식 검증
    if (fromDate && !isValidDate(fromDate)) {
      return NextResponse.json(
        { error: 'Invalid fromDate format. Use YYYY-MM-DD' },
        { status: 400, headers: getCorsHeaders() }
      )
    }

    if (toDate && !isValidDate(toDate)) {
      return NextResponse.json(
        { error: 'Invalid toDate format. Use YYYY-MM-DD' },
        { status: 400, headers: getCorsHeaders() }
      )
    }

    if (!isValidDate(date)) {
      return NextResponse.json(
        { error: 'Invalid date format. Use YYYY-MM-DD' },
        { status: 400, headers: getCorsHeaders() }
      )
    }

    if (fromDate && toDate) {
      // 날짜 범위 조회
      if (fromDate > toDate) {
        return NextResponse.json(
          { error: 'fromDate must be before or equal to toDate' },
          { status: 400, headers: getCorsHeaders() }
        )
      }

      const stats = await database.getStatsByDateRange(testId, fromDate, toDate)
      return NextResponse.json({ stats }, { headers: getCorsHeaders() })
    } else {
      // 특정 날짜 조회
      const stats = await database.getTestStats(testId, date)
      if (!stats) {
        return NextResponse.json(
          { stats: null, message: 'No stats found for this date' },
          { headers: getCorsHeaders() }
        )
      }
      return NextResponse.json({ stats }, { headers: getCorsHeaders() })
    }
  } catch (error) {
    console.error('Error fetching stats:', error)

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

