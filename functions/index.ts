/**
 * Cloudflare Functions 진입점
 * Hono 라우터로 API 라우팅
 * 
 * 주의: Cloudflare Pages Functions는 파일 기반 라우팅을 사용합니다.
 * _worker.ts 파일을 통해 이 앱을 export합니다.
 */

import { Hono } from 'hono'
import { cors } from 'hono/cors'
import collect from './api/collect'
import reports from './api/reports'
import cron from './cron'

type Env = {
  DB: D1Database
  SESSIONS: KVNamespace
  ADMIN_TOKEN: string
}

const app = new Hono<{ Bindings: Env }>()

// CORS 설정
app.use('/*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}))

// API 라우트
app.route('/api/collect', collect)
app.route('/api/reports', reports)

// Cron 핸들러
app.get('/cron', cron)

export default app

