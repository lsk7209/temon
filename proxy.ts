import { NextRequest, NextResponse } from 'next/server'

/**
 * Next.js Proxy (구 Middleware)
 * - Rate Limiting (간단한 메모리 기반)
 * - 보안 헤더 추가
 *
 * Next.js 16에서 `middleware` 파일 규약이 `proxy`로 변경되었고 Node.js 런타임에서
 * 실행된다. 아래 rate limiter는 인스턴스별 메모리 기반이라 전역 제한을 보장하지
 * 않는 기존 설계 그대로이며(프로덕션에서 엄격한 제한이 필요하면 KV/Redis 권장),
 * 런타임 변경(Edge→Node)이 이 동작의 정확성을 바꾸지 않는다.
 */

// 간단한 Rate Limiting (메모리 기반)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT = 1000 // 1분당 최대 요청 수
const RATE_LIMIT_WINDOW = 60 * 1000 // 1분

function getRateLimitKey(request: NextRequest): string {
  // IP 주소 기반 (Vercel에서는 x-forwarded-for / x-real-ip 헤더 사용).
  // NextRequest.ip는 Next.js 15에서 제거되어 헤더만 사용한다.
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
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

export function proxy(request: NextRequest) {
  // 관리자 대시보드 접근 제어는 클라이언트 사이드에서 처리
  // (dashboard-client.tsx에서 localStorage 확인 후 리다이렉트)

  // 주의: www <-> non-www 리다이렉트는 Vercel 도메인 설정에서 처리
  // (여기서 리다이렉트하면 Vercel 도메인 설정과 충돌해 무한 루프 가능)

  // Admin API 인증은 각 라우트의 verifyAdminToken()(lib/admin-auth.ts)에서 처리한다.
  // (httpOnly admin_session 쿠키 우선 + Authorization 헤더 폴백)

  // Rate Limit 체크 (API 엔드포인트만)
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const key = getRateLimitKey(request)

    // 주기적으로 오래된 레코드 정리
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

  // 보안 헤더 추가
  const response = NextResponse.next()

  // XSS 방지
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')

  // Referrer Policy
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  // Permissions Policy
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')

  // HSTS
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')

  // Content Security Policy (GA, AdSense 호환)
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: https:; font-src 'self' https:; connect-src 'self' https:; frame-src 'self' https:;"
  )

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
