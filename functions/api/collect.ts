/**
 * 인제스트 API
 * 이벤트 수집 엔드포인트
 * 
 * 파일 기반 라우팅: functions/api/collect.ts → /api/collect
 */

import type { PagesFunction } from '@cloudflare/workers-types'
import { Hono } from 'hono'
import { drizzle } from 'drizzle-orm/d1'
import { eq } from 'drizzle-orm'
import * as schema from '../../lib/drizzle/schema'

type Env = {
  DB: D1Database
  SESSIONS?: KVNamespace // 선택사항: 없어도 작동함 (D1에 직접 저장)
}

const app = new Hono<{ Bindings: Env }>()

// Bot UA 필터
const BOT_PATTERNS = [
  /bot/i,
  /crawler/i,
  /spider/i,
  /scraper/i,
  /curl/i,
  /wget/i,
  /python/i,
  /go-http/i,
  /java/i,
]

function isBot(userAgent: string | null): boolean {
  if (!userAgent) return false
  return BOT_PATTERNS.some((pattern) => pattern.test(userAgent))
}

// 세션 타임아웃 (30분)
const SESSION_TIMEOUT = 30 * 60 * 1000

// 세션 생성/갱신
async function getOrCreateSession(
  env: Env,
  sessionId: string,
  anonymousId: string,
  request: Request
): Promise<string> {
  const db = drizzle(env.DB as any, { schema })

  // KV에서 세션 확인 (KV가 설정된 경우에만)
  if (env.SESSIONS) {
    const cached = await env.SESSIONS.get(sessionId)
    if (cached) {
      const sessionData = JSON.parse(cached)
      const lastActivity = sessionData.lastActivity || 0
      const now = Date.now()

      // 30분 이내 활동이면 기존 세션 유지
      if (now - lastActivity < SESSION_TIMEOUT) {
        await env.SESSIONS.put(sessionId, JSON.stringify({ ...sessionData, lastActivity: now }))
        return sessionId
      }
    }
  }

  // 새 세션 생성
  const cf = (request as any).cf as {
    country?: string
    region?: string
    city?: string
    device?: { type?: string }
    os?: string
    browser?: string
  } | undefined
  const newSession: schema.NewSession = {
    sessionId,
    anonymousId,
    startedAt: Date.now(),
    device: cf?.device?.type || null,
    os: cf?.os || null,
    browser: cf?.browser || null,
    browserVer: null, // CF에서 제공하지 않음
    viewportW: null,
    viewportH: null,
    country: cf?.country || null,
    region: cf?.region || null,
    city: cf?.city || null,
  }

  await db.insert(schema.session).values(newSession)
  
  // KV에 세션 캐시 저장 (KV가 설정된 경우에만)
  if (env.SESSIONS) {
    await env.SESSIONS.put(sessionId, JSON.stringify({ lastActivity: Date.now(), utm: {} }))
  }

  return sessionId
}

// UTM 파라미터 추출
function extractUTM(url: string): {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
} {
  try {
    const urlObj = new URL(url)
    const params = urlObj.searchParams
    return {
      utm_source: params.get('utm_source') || undefined,
      utm_medium: params.get('utm_medium') || undefined,
      utm_campaign: params.get('utm_campaign') || undefined,
      utm_term: params.get('utm_term') || undefined,
      utm_content: params.get('utm_content') || undefined,
    }
  } catch {
    return {}
  }
}

// Referrer 파싱
function parseReferrer(referrer: string | null): { host?: string; path?: string } {
  if (!referrer) return {}
  try {
    const url = new URL(referrer)
    return {
      host: url.hostname,
      path: url.pathname,
    }
  } catch {
    return {}
  }
}

// POST /api/collect
app.post('/', async (c) => {
  try {
    const body = await c.req.json()
    const { type, sessionId, anonymousId, ...eventData } = body

    // Bot 필터링
    const userAgent = c.req.header('user-agent') || null
    if (isBot(userAgent)) {
      return c.json({ success: true, message: 'Bot filtered' }, 200)
    }

    // Rate limiting (간단한 버전)
    const ip = c.req.header('cf-connecting-ip') || 'unknown'
    // 실제로는 KV나 Durable Objects 사용 권장

    // DB 연결 확인
    if (!c.env.DB) {
      console.error('D1 Database not configured - data will not be saved')
      return c.json({ 
        success: false, 
        message: 'Database not configured',
        error: 'D1 데이터베이스가 설정되지 않았습니다. 데이터가 저장되지 않습니다.'
      }, 503)
    }

    const db = drizzle(c.env.DB as any, { schema })

    // 세션 관리
    const finalSessionId = await getOrCreateSession(c.env, sessionId, anonymousId, c.req.raw)

    // 이벤트 타입별 처리
    switch (type) {
      case 'page_view': {
        const { path, referrer, ...utm } = eventData
        const referrerData = parseReferrer(referrer)
        const utmParams = extractUTM(referrer || '')
        const pageView: schema.NewPageView = {
          sessionId: finalSessionId,
          occurredAt: Date.now(),
          path: path || null,
          referrerHost: referrerData.host || null,
          referrerPath: referrerData.path || null,
          utmSource: utm.utm_source || utmParams.utm_source || null,
          utmMedium: utm.utm_medium || utmParams.utm_medium || null,
          utmCampaign: utm.utm_campaign || utmParams.utm_campaign || null,
          utmTerm: utm.utm_term || utmParams.utm_term || null,
          utmContent: utm.utm_content || utmParams.utm_content || null,
        }
        await db.insert(schema.pageView).values(pageView)
        break
      }
      case 'quiz_start_click':
      case 'attempt_started': {
        const { quiz_id } = eventData
        const attempt: schema.NewAttempt = {
          attemptId: `attempt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          sessionId: finalSessionId,
          quizId: quiz_id || null,
          startedAt: Date.now(),
        }
        await db.insert(schema.attempt).values(attempt)
        break
      }
      case 'attempt_completed': {
        const { attempt_id } = eventData
        if (attempt_id) {
          await db
            .update(schema.attempt)
            .set({ completedAt: Date.now() })
            .where(eq(schema.attempt.attemptId, attempt_id))
        }
        break
      }
      case 'attempt_abandoned': {
        const { attempt_id, reason } = eventData
        if (attempt_id) {
          await db
            .update(schema.attempt)
            .set({ abandonedAt: Date.now(), abandonReason: reason || null })
            .where(eq(schema.attempt.attemptId, attempt_id))
        }
        break
      }
      case 'section_entered': {
        const { attempt_id, section_index } = eventData
        if (attempt_id) {
          const section: schema.NewAttemptSection = {
            attemptId: attempt_id,
            sectionIndex: section_index || 0,
            enteredAt: Date.now(),
          }
          await db.insert(schema.attemptSection).values(section)
        }
        break
      }
      case 'perf_web_vitals': {
        const { lcp, fid, cls, ttfb } = eventData
        const vitals: schema.NewWebVitals = {
          sessionId: finalSessionId,
          occurredAt: Date.now(),
          lcp: lcp || null,
          fid: fid || null,
          cls: cls || null,
          ttfb: ttfb || null,
        }
        await db.insert(schema.webVitals).values(vitals)
        break
      }
      case 'error_http': {
        const { path, status, latency_ms } = eventData
        const error: schema.NewHttpError = {
          occurredAt: Date.now(),
          path: path || null,
          status: status || null,
          latencyMs: latency_ms || null,
        }
        await db.insert(schema.httpError).values(error)
        break
      }
    }
    return c.json({ success: true }, 200)
  } catch (error) {
    console.error('Collect error:', error)
    
    // DB 관련 오류인지 확인
    const errorMessage = error instanceof Error ? error.message : String(error)
    const isDbError = errorMessage.includes('database') || 
                      errorMessage.includes('D1') || 
                      errorMessage.includes('binding') ||
                      errorMessage.includes('SQL') ||
                      errorMessage.includes('no such table')
    
    if (isDbError) {
      return c.json({ 
        success: false, 
        error: 'Database error',
        message: '데이터베이스 오류가 발생했습니다. D1 데이터베이스가 올바르게 설정되었는지 확인해주세요.',
        dbConnected: false
      }, 503)
    }
    
    return c.json({ success: false, error: 'Internal server error' }, 500)
  }
})

// Cloudflare Pages Functions는 onRequest export를 선호합니다
export const onRequest: PagesFunction<Env> = async (context) => {
  return app.fetch(context.request as any, context.env, context) as any
}
