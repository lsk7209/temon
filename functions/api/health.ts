/**
 * 헬스 체크 API
 * 데이터베이스 연결 상태 확인
 * 
 * 파일 기반 라우팅: functions/api/health.ts → /api/health
 */

import type { PagesFunction } from '@cloudflare/workers-types'
import { Hono } from 'hono'

type Env = {
  DB: D1Database
  ADMIN_TOKEN: string
}

const app = new Hono<{ Bindings: Env }>()

// GET /api/health
app.get('/', async (c) => {
  try {
    // DB 연결 확인
    if (!c.env.DB) {
      return c.json({
        status: 'unhealthy',
        db: {
          connected: false,
          message: 'D1 데이터베이스가 바인딩되지 않았습니다.',
        },
        timestamp: new Date().toISOString(),
      }, 503)
    }

    // 간단한 쿼리로 DB 연결 테스트
    try {
      const result = await c.env.DB.prepare('SELECT 1 as test').first()
      if (result && (result as any).test === 1) {
        return c.json({
          status: 'healthy',
          db: {
            connected: true,
            message: '데이터베이스 연결 정상',
          },
          timestamp: new Date().toISOString(),
        })
      } else {
        return c.json({
          status: 'unhealthy',
          db: {
            connected: false,
            message: '데이터베이스 쿼리 실패',
          },
          timestamp: new Date().toISOString(),
        }, 503)
      }
    } catch (dbError) {
      return c.json({
        status: 'unhealthy',
        db: {
          connected: false,
          message: '데이터베이스 쿼리 오류',
          error: dbError instanceof Error ? dbError.message : String(dbError),
        },
        timestamp: new Date().toISOString(),
      }, 503)
    }
  } catch (error) {
    return c.json({
      status: 'error',
      message: '헬스 체크 실패',
      error: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString(),
    }, 500)
  }
})

// Cloudflare Pages Functions는 onRequest export를 선호합니다
export const onRequest: PagesFunction<Env> = async (context) => {
  return app.fetch(context.request as any, context.env, context) as any
}

