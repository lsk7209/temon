/**
 * 관리자 대시보드 API
 * GET /api/dashboard - 대시보드 통계 데이터 조회
 * 
 * Vercel Edge Runtime 최적화
 */

// Vercel Edge Runtime 사용 (최저 지연시간)
export const runtime = 'edge'

// 동적 렌더링 (실시간 데이터)
export const dynamic = 'force-dynamic'

// 캐싱 비활성화 (실시간 대시보드)
export const revalidate = 0

import { NextRequest, NextResponse } from 'next/server'
import { initDatabase } from '@/lib/db/client'
import type { D1Database } from '@/lib/db/client'

/**
 * Cloudflare Workers/Pages Functions 환경에서 D1 데이터베이스 가져오기
 * 
 * 주의: 프로덕션 환경에서는 functions/ 디렉토리의 Functions API 사용을 권장합니다.
 */
function getD1Database(): D1Database | undefined {
  // Cloudflare Pages Functions 환경 확인
  if (typeof globalThis !== 'undefined' && 'process' in globalThis) {
    // Node.js 개발 환경
    return undefined
  }
  
  // Cloudflare Workers/Pages Functions 환경
  return (globalThis as any).env?.DB || (globalThis as any).__env?.DB
}

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
    const db = getD1Database()
    
    if (!db) {
      // 개발 환경: 모의 데이터 반환
      return NextResponse.json(
        {
          totalVisits: 0,
          totalTestsStarted: 0,
          totalTestsCompleted: 0,
          lastVisit: Date.now(),
          testStats: {},
          message: 'Database not available in development',
        },
        { headers: getCorsHeaders() }
      )
    }

    initDatabase(db)

    // 전체 통계 조회
    const today = new Date().toISOString().split('T')[0]
    
    // 총 방문 수 (페이지 방문 테이블)
    const visitsResult = await db.prepare(
      'SELECT COUNT(*) as count FROM page_visits'
    ).first<{ count: number }>()

    // 총 테스트 시작 수
    const startsResult = await db.prepare(
      'SELECT COUNT(*) as count FROM test_starts'
    ).first<{ count: number }>()

    // 총 테스트 완료 수
    const resultsResult = await db.prepare(
      'SELECT COUNT(*) as count FROM test_results'
    ).first<{ count: number }>()

    // 마지막 방문 시간
    const lastVisitResult = await db.prepare(
      'SELECT MAX(created_at) as last_visit FROM page_visits'
    ).first<{ last_visit: number }>()

    // 테스트별 통계
    const testStatsResult = await db.prepare(`
      SELECT 
        test_id,
        COUNT(*) as started
      FROM test_starts
      GROUP BY test_id
    `).all<{ test_id: string; started: number }>()

    const completedStatsResult = await db.prepare(`
      SELECT 
        test_id,
        COUNT(*) as completed
      FROM test_results
      GROUP BY test_id
    `).all<{ test_id: string; completed: number }>()

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

    return NextResponse.json(
      {
        totalVisits: visitsResult?.count || 0,
        totalTestsStarted: startsResult?.count || 0,
        totalTestsCompleted: resultsResult?.count || 0,
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

