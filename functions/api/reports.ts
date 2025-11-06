/**
 * 집계 API
 * 대시보드 데이터 제공
 * 
 * 파일 기반 라우팅: functions/api/reports.ts → /api/reports
 */

import type { PagesFunction } from '@cloudflare/workers-types'
import { Hono } from 'hono'
import { getDrizzleDB, getTodayFunnel, getChannelPerformance, getBrowserConversion, getTopKeywords, getGeoStats, getTimeHeatmap, getWebVitalsStats } from '@/lib/drizzle/queries'

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

// GET /api/reports
app.get('/', async (c) => {
  if (!verifyAdminToken(c)) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  try {
    const db = getDrizzleDB(c.env)

    // 쿼리 파라미터
    const startDate = parseInt(c.req.query('startDate') || '0')
    const endDate = parseInt(c.req.query('endDate') || Date.now().toString())
    const quizId = c.req.query('quizId')

    // 기본 날짜 범위 (오늘)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todayStart = today.getTime()
    const todayEnd = todayStart + 24 * 60 * 60 * 1000

    const finalStartDate = startDate || todayStart
    const finalEndDate = endDate || todayEnd

    // KPI
    const funnel = await getTodayFunnel(db)
    const completionRate = funnel.started > 0 ? funnel.completed / funnel.started : 0
    const abandonRate = funnel.started > 0 ? funnel.abandoned / funnel.started : 0

    // 평균 소요 시간 (P50)
    // 실제로는 attempt 테이블에서 completed_at - started_at 계산 필요
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

    return c.json({
      kpi,
      funnel: funnelData,
      channels,
      keywords,
      browser,
      geo,
      timeHeatmap,
      perf,
    })
  } catch (error) {
    console.error('Reports error:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// Cloudflare Pages Functions는 onRequest export를 선호합니다
import type { PagesFunction } from '@cloudflare/workers-types'

export const onRequest: PagesFunction<Env> = async (context) => {
  return app.fetch(context.request, context.env, context)
}

