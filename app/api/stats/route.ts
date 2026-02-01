/**
 * 테스트 통계 API
 * GET /api/stats?testId=xxx - 테스트 통계 조회
 * 
 * Vercel Edge Runtime 최적화
 */

export const runtime = 'edge'
export const revalidate = 300 // ISR: 5분
export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getTestStats, getStatsByDateRange } from '@/lib/db/queries/stats'

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

    if (fromDate && toDate) {
      if (fromDate > toDate) {
        return NextResponse.json(
          { error: 'fromDate must be before or equal to toDate' },
          { status: 400, headers: getCorsHeaders() }
        )
      }

      const stats = await getStatsByDateRange(testId, fromDate, toDate)
      return NextResponse.json({ stats }, { headers: getCorsHeaders() })
    } else {
      // 특정 날짜 조회 (또는 전체, stats.ts 구현에 따름)
      const stats = await getTestStats(testId, date)
      if (!stats) {
        return NextResponse.json(
          { stats: null, message: 'No stats found' },
          { headers: getCorsHeaders() }
        )
      }
      return NextResponse.json({ stats }, { headers: getCorsHeaders() })
    }
  } catch (error) {
    console.error('Error fetching stats:', error)

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: getCorsHeaders() }
    )
  }
}
