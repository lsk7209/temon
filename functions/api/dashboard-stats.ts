/**
 * 집계 API (대시보드 데이터)
 * /api/reports가 광고 차단기에 의해 차단되는 문제를 해결하기 위한 대체 엔드포인트
 * 
 * 파일 기반 라우팅: functions/api/dashboard-stats.ts → /api/dashboard-stats
 */

import type { PagesFunction } from '@cloudflare/workers-types'
import { Hono } from 'hono'
import { getDrizzleDB, getTodayFunnel, getChannelPerformance, getBrowserConversion, getTopKeywords, getGeoStats, getTimeHeatmap, getWebVitalsStats, getSearchEngineStats, getSearchKeywords, getTrafficSource } from '../../lib/drizzle/queries'

type Env = {
    DB: D1Database
    ADMIN_TOKEN: string
}

const app = new Hono<{ Bindings: Env }>()

// 관리자 토큰 검증
function verifyAdminToken(c: any): boolean {
    const token = c.req.header('Authorization')?.replace('Bearer ', '')
    return token === c.env.ADMIN_TOKEN
}

// GET /api/dashboard-stats
app.get('/', async (c) => {
    if (!verifyAdminToken(c)) {
        return c.json({ error: 'Unauthorized' }, 401)
    }

    try {
        // DB 연결 확인
        if (!c.env.DB) {
            return c.json({
                error: 'Database not configured',
                message: 'D1 데이터베이스가 설정되지 않았습니다. Cloudflare Dashboard에서 D1 데이터베이스를 바인딩해주세요.',
                dbConnected: false
            }, 503)
        }

        const db = getDrizzleDB(c.env)

        // 쿼리 파라미터
        const startDate = parseInt(c.req.query('startDate') || '0')
        const endDate = parseInt(c.req.query('endDate') || Date.now().toString())

        // 기본 날짜 범위 (오늘)
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        const todayStart = today.getTime()
        const todayEnd = todayStart + 24 * 60 * 60 * 1000

        const finalStartDate = startDate || todayStart
        const finalEndDate = endDate || todayEnd

        // KPI (날짜 범위 적용)
        const funnel = await getTodayFunnel(db, finalStartDate, finalEndDate)
        const completionRate = funnel.started > 0 ? funnel.completed / funnel.started : 0
        const abandonRate = funnel.started > 0 ? funnel.abandoned / funnel.started : 0

        // 평균 소요 시간 (P50)
        const avgDurationP50 = 0 // TODO: 계산 로직 추가

        const kpi = {
            sessions: funnel.views,
            attempts_started: funnel.started,
            completed: funnel.completed,
            abandoned: funnel.abandoned,
            completion_rate: completionRate,
            abandon_rate: abandonRate,
            avg_duration_p50: avgDurationP50,
        }

        // 퍼널
        const funnelData = {
            visit: funnel.views,
            start: funnel.started,
            firstPage: funnel.started, // 첫 페이지는 시작과 동일
            complete: funnel.completed,
        }

        // 채널/캠페인
        const channels = await getChannelPerformance(db, finalStartDate, finalEndDate)

        // 키워드 Top 10
        const keywords = await getTopKeywords(db, finalStartDate, finalEndDate)

        // 브라우저별 전환율
        const browser = await getBrowserConversion(db, finalStartDate, finalEndDate)

        // 지역별 통계
        const geo = await getGeoStats(db, finalStartDate, finalEndDate)

        // 시간대 히트맵
        const timeHeatmap = await getTimeHeatmap(db, finalStartDate, finalEndDate)

        // Web Vitals
        const perf = await getWebVitalsStats(db, finalStartDate, finalEndDate)

        // 검색 엔진별 유입 통계
        const searchEngines = await getSearchEngineStats(db, finalStartDate, finalEndDate)

        // 검색 엔진별 키워드 분석
        const searchKeywords = await getSearchKeywords(db, finalStartDate, finalEndDate)

        // 유입 경로 분류
        const trafficSource = await getTrafficSource(db, finalStartDate, finalEndDate)

        return c.json({
            kpi,
            funnel: funnelData,
            channels,
            keywords,
            browser,
            geo,
            timeHeatmap,
            perf,
            searchEngines,
            searchKeywords,
            trafficSource,
            dbConnected: true,
        })
    } catch (error) {
        console.error('Dashboard stats error:', error)

        // DB 연결 오류인지 확인
        const errorMessage = error instanceof Error ? error.message : String(error)
        const isDbError = errorMessage.includes('database') ||
            errorMessage.includes('D1') ||
            errorMessage.includes('binding') ||
            errorMessage.includes('SQL')

        if (isDbError) {
            return c.json({
                error: 'Database connection error',
                message: '데이터베이스 연결에 실패했습니다. D1 데이터베이스가 올바르게 설정되었는지 확인해주세요.',
                dbConnected: false,
                details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
            }, 503)
        }

        return c.json({
            error: 'Internal server error',
            message: '서버 오류가 발생했습니다.',
            dbConnected: true
        }, 500)
    }
})

// Cloudflare Pages Functions는 onRequest export를 선호합니다
export const onRequest: PagesFunction<Env> = async (context) => {
    return app.fetch(context.request as any, context.env, context) as any
}
