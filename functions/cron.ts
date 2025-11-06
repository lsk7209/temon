/**
 * Cron 작업 핸들러
 * 5분/1시간/1일 주기 집계 작업
 * 
 * 파일 기반 라우팅: functions/cron.ts → /cron
 */

import type { PagesFunction } from '@cloudflare/workers-types'
import { Hono } from 'hono'
import { getDrizzleDB } from '@/lib/drizzle/queries'

type Env = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Env }>()

// GET /cron
app.get('/', async (c) => {
  try {
    const db = getDrizzleDB(c.env)
    const cronType = c.req.query('type') || '5min'

    switch (cronType) {
      case '5min':
        // KPI 카운터 캐시 (집계용 뷰 테이블 생성 가능)
        // 실제로는 KV에 캐시 저장
        console.log('5분 KPI 캐시 업데이트')
        break

      case '1hour':
        // 섹션 이탈률/브라우저 전환률 리프레시
        console.log('1시간 집계 리프레시')
        break

      case '1day':
        // 키워드 Top, 리텐션 코호트, 성능-전환 상관 리포트
        console.log('1일 집계 리포트 생성')
        break
    }

    return c.json({ success: true, cronType })
  } catch (error) {
    console.error('Cron error:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// Cloudflare Pages Functions는 fetch handler를 기대합니다
export const onRequest: PagesFunction = async (context) => {
  return app.fetch(context.request, context.env, context)
}

// 또는 default export
export default {
  fetch: (request: Request, env: any, ctx: ExecutionContext) => {
    return app.fetch(request, env, ctx)
  }
}

