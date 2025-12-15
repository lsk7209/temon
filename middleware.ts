import { NextRequest, NextResponse } from 'next/server'

/**
 * Vercel Edge Middleware
 * - 요청 로깅
 * - Rate Limiting (간단한 버전)
 * - 보안 헤더 추가
 * 
 * Vercel Edge Runtime에서 실행되므로 빠른 응답 시간 보장
 */

// 간단한 Rate Limiting (메모리 기반)
// 프로덕션에서는 Vercel KV 또는 Redis 사용 권장
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT = 100 // 1분당 최대 요청 수
const RATE_LIMIT_WINDOW = 60 * 1000 // 1분

function getRateLimitKey(request: NextRequest): string {
  // IP 주소 기반 (Vercel에서는 x-forwarded-for 헤더 사용)
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
             request.headers.get('x-real-ip') || 
             request.ip || 
             'unknown'
  return ip
}

function checkRateLimit(key: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(key)

  if (!record || now > record.resetTime) {
    // 새로운 윈도우 시작
    rateLimitMap.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return true
  }

  if (record.count >= RATE_LIMIT) {
    return false
  }

  record.count++
  return true
}

// 오래된 레코드 정리 (메모리 누수 방지)
function cleanupRateLimitMap() {
  const now = Date.now()
  for (const [key, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      rateLimitMap.delete(key)
    }
  }
}

export function middleware(request: NextRequest) {
  // Vercel Edge Runtime에서 실행
  // 관리자 대시보드 접근 제어는 클라이언트 사이드에서 처리
  // (dashboard-client.tsx에서 localStorage 확인 후 리다이렉트)

  // 주의: www <-> non-www 리다이렉트는 Vercel 도메인 설정에서 처리
  // middleware에서 리다이렉트를 하면 Vercel 도메인 설정과 충돌하여 무한 루프 발생 가능

  // Rate Limit 체크 (API 엔드포인트만)
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const key = getRateLimitKey(request)
    
    // 주기적으로 오래된 레코드 정리 (Edge Runtime 최적화)
    if (Math.random() < 0.1) {
      cleanupRateLimitMap()
    }

    if (!checkRateLimit(key)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { 
          status: 429,
          headers: {
            'Retry-After': '60',
          }
        }
      )
    }
  }

  // 보안 헤더 추가 (Vercel에서 자동으로 일부 헤더 추가되지만 명시적으로 설정)
  const response = NextResponse.next()
  
  // XSS 방지
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  
  // Referrer Policy
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  // Permissions Policy
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  
  // Content Security Policy (필요시 조정)
  // Vercel Analytics와 AdSense를 위해 CSP는 선택적으로 설정
  // response.headers.set(
  //   'Content-Security-Policy',
  //   "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://pagead2.googlesyndication.com https://vercel.live;"
  // )

  // 개발 환경에서만 요청 로깅
  if (process.env.NODE_ENV === 'development') {
    console.log(`[${request.method}] ${request.nextUrl.pathname}`, {
      ip: getRateLimitKey(request),
      userAgent: request.headers.get('user-agent'),
    })
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

