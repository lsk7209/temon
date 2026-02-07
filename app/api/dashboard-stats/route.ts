import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db/client'
import { pageVisits, testStarts, testResults } from '@/lib/db/schema'
import { sql, and, gte, lte } from 'drizzle-orm'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

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
        const { searchParams } = new URL(request.url)
        const startDateParam = searchParams.get('startDate')
        const endDateParam = searchParams.get('endDate')

        // 기본 날짜 범위 (오늘)
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        const todayStart = today.getTime()
        const todayEnd = todayStart + 24 * 60 * 60 * 1000

        const startDate = startDateParam ? new Date(parseInt(startDateParam)) : new Date(todayStart)
        const endDate = endDateParam ? new Date(parseInt(endDateParam)) : new Date(todayEnd)

        const db = getDb()

        // KPI 데이터 조회
        // 1. 방문자 수
        const visitsResult = await db.select({ count: sql<number>`count(*)` })
            .from(pageVisits)
            .where(and(
                gte(pageVisits.createdAt, startDate),
                lte(pageVisits.createdAt, endDate)
            ))
            .get()

        // 2. 시작 수
        const startsResult = await db.select({ count: sql<number>`count(*)` })
            .from(testStarts)
            .where(and(
                gte(testStarts.createdAt, startDate),
                lte(testStarts.createdAt, endDate)
            ))
            .get()

        // 3. 완료 수
        let completedCount = 0
        try {
            const result = await db.select({ count: sql<number>`count(*)` })
                .from(testResults)
                .where(and(
                    gte(testResults.createdAt, startDate),
                    lte(testResults.createdAt, endDate)
                ))
                .get()
            completedCount = result?.count || 0
        } catch (e) {
            console.warn('testResults query failed', e)
        }

        const sessions = visitsResult?.count || 0
        const started = startsResult?.count || 0
        const abandoned = Math.max(0, started - completedCount)

        return NextResponse.json({
            kpi: {
                sessions,
                attempts_started: started,
                completed: completedCount,
                abandoned,
                completion_rate: started > 0 ? completedCount / started : 0,
                abandon_rate: started > 0 ? abandoned / started : 0,
                avg_duration_p50: 0,
            },
            funnel: {
                visit: sessions,
                start: started,
                firstPage: started,
                complete: completedCount,
            },
            channels: [],
            keywords: [],
            browser: [],
            geo: [],
            timeHeatmap: [],
            perf: { lcp: null, fid: null, cls: null, ttfb: null },
            dbConnected: true,
            source: 'nextjs-edge'
        }, { headers: getCorsHeaders() })

    } catch (error) {
        console.error('Dashboard stats api error:', error)
        return NextResponse.json(
            { error: 'Internal server error', message: '데이터를 불러오는 중 오류가 발생했습니다.' },
            { status: 500, headers: getCorsHeaders() }
        )
    }
}
