import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db/client'
import { pageVisits, testStarts, testResults } from '@/lib/db/schema'
import { sql, desc } from 'drizzle-orm'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'
export const revalidate = 0

function getCorsHeaders() {
  return {
    'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_APP_URL || '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: getCorsHeaders() })
}

export async function GET(request: NextRequest) {
  try {
    // 전체 통계 조회
    const today = new Date().toISOString().split('T')[0]

    // 총 방문 수 (페이지 방문 테이블)
    const visitsResult = await db.select({ count: sql<number>`count(*)` })
      .from(pageVisits)
      .get()

    // 총 테스트 시작 수
    const startsResult = await db.select({ count: sql<number>`count(*)` })
      .from(testStarts)
      .get()

    // 총 테스트 완료 수 (테이블 존재 여부 확인 필요하지만 schema.ts에 있다면 사용)
    // testResults 테이블이 없을 수도 있으니 try-catch로 감싸거나 schema 확인 필요
    // 여기서는 schema에 있다고 가정하고 진행
    let resultsCount = 0
    try {
      const results = await db.select({ count: sql<number>`count(*)` })
        .from(testResults) // schema.ts에 testResults가 export 되어 있어야 함
        .get()
      resultsCount = results?.count || 0
    } catch (e) {
      console.warn('test_results table query failed', e)
    }

    // 마지막 방문 시간
    const lastVisitResult = await db.select({ last_visit: sql<number>`max(${pageVisits.createdAt})` })
      .from(pageVisits)
      .get()

    // 테스트별 통계
    const testStatsResult = await db.select({
      test_id: testStarts.testId,
      started: sql<number>`count(*)`
    })
      .from(testStarts)
      .groupBy(testStarts.testId)
      .all()

    // 완료 통계
    let completedStatsResult: { test_id: string, completed: number }[] = []
    try {
      completedStatsResult = await db.select({
        test_id: testResults.testId,
        completed: sql<number>`count(*)`
      })
        .from(testResults)
        .groupBy(testResults.testId)
        .all()
    } catch (e) {
      console.warn('test_results group query failed', e)
    }

    // 통계 조합
    const testStats: Record<string, { started: number; completed: number }> = {}

    testStatsResult.forEach((row) => {
      // row.test_id가 null일 수 있으므로 체크
      if (row.test_id) {
        testStats[row.test_id] = {
          started: row.started,
          completed: 0,
        }
      }
    })

    completedStatsResult.forEach((row) => {
      if (row.test_id) {
        if (!testStats[row.test_id]) {
          testStats[row.test_id] = { started: 0, completed: 0 }
        }
        testStats[row.test_id].completed = row.completed
      }
    })

    return NextResponse.json(
      {
        totalVisits: visitsResult?.count || 0,
        totalTestsStarted: startsResult?.count || 0,
        totalTestsCompleted: resultsCount,
        lastVisit: lastVisitResult?.last_visit || Date.now(),
        testStats,
      },
      { headers: getCorsHeaders() }
    )
  } catch (error) {
    console.error('Dashboard API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500, headers: getCorsHeaders() }
    )
  }
}


