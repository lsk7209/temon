# Analytics 시스템 배포 가이드

## 개요

Cloudflare 기반 Analytics 관리자 대시보드 시스템입니다.

## 사전 준비

### 1. Cloudflare D1 데이터베이스 생성

```bash
# D1 데이터베이스 생성
wrangler d1 create temon-analytics

# 생성된 database_id를 wrangler.toml에 반영
# [[d1_databases]]
# binding = "DB"
# database_name = "temon-analytics"
# database_id = "여기에_생성된_ID_입력"
```

### 2. KV 네임스페이스 생성

```bash
# KV 네임스페이스 생성
wrangler kv:namespace create "SESSIONS"

# 생성된 id를 wrangler.toml에 반영
# [[kv_namespaces]]
# binding = "SESSIONS"
# id = "여기에_생성된_ID_입력"
```

### 3. 관리자 토큰 설정

```bash
# 환경 변수에 ADMIN_TOKEN 설정
# wrangler.toml의 [vars] 섹션에 추가하거나
# Cloudflare Dashboard에서 환경 변수로 설정
```

### 4. 마이그레이션 실행

```bash
# 마이그레이션 적용
wrangler d1 migrations apply temon-analytics
```

## 패키지 설치

```bash
npm install drizzle-orm hono @cloudflare/workers-types
```

## 배포

### Cloudflare Pages 배포

```bash
# 빌드
npm run build

# 배포
wrangler pages deploy .next
```

### Functions 배포

Functions는 Cloudflare Pages Functions로 자동 배포됩니다.

## 수집 스니펫 설치

### HTML에 추가

```html
<!-- 페이지 상단에 추가 -->
<script src="/analytics.js"></script>
```

또는 Next.js Layout에 추가:

```tsx
// app/layout.tsx
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script src="/analytics.js" strategy="afterInteractive" />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

## 사용법

### 대시보드 접근

1. `/admin` 페이지에서 관리자 토큰 입력
2. 토큰이 localStorage에 저장됨
3. `/dashboard`로 자동 리다이렉트

### API 사용

#### 인제스트 API

```javascript
// 클라이언트에서 이벤트 전송
fetch('/api/collect', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    type: 'page_view',
    sessionId: 'sess_123',
    path: '/tests/coffee-mbti',
    referrer: 'https://google.com',
    utm_source: 'google',
  }),
})
```

#### 집계 API

```javascript
// 관리자만 접근 가능
fetch('/api/reports?startDate=1234567890&endDate=1234567890', {
  headers: {
    Authorization: `Bearer ${ADMIN_TOKEN}`,
  },
})
```

## 환경 변수

필수 환경 변수:

- `ADMIN_TOKEN`: 관리자 인증 토큰
- `CLOUDFLARE_FUNCTIONS_URL`: Cloudflare Functions URL (선택)

## Cron 작업

wrangler.toml에 정의된 Cron 작업:

- `*/5 * * * *`: 5분마다 KPI 캐시 업데이트
- `0 * * * *`: 1시간마다 섹션 이탈률/브라우저 전환률 리프레시
- `0 0 * * *`: 1일마다 키워드 Top, 리텐션 코호트 리포트 생성

## 보안

- PII 비수집 (이메일/전화번호 등 수집 안 함)
- Bot UA 필터링
- Rate Limiting (API 엔드포인트)
- 관리자 토큰 검증 (Bearer Token)

## 트러블슈팅

### 데이터가 수집되지 않음

1. `/api/collect` 엔드포인트가 정상 작동하는지 확인
2. 브라우저 콘솔에서 에러 확인
3. Cloudflare Functions 로그 확인

### 대시보드 접근 불가

1. `ADMIN_TOKEN` 환경 변수 확인
2. 토큰이 localStorage에 저장되었는지 확인
3. 미들웨어 로그 확인

### Functions 에러

1. `wrangler dev`로 로컬 테스트
2. Cloudflare Dashboard의 Functions 로그 확인
3. D1 데이터베이스 연결 확인

## 데이터 구조

### 주요 테이블

- `session`: 세션 정보
- `page_view`: 페이지 뷰
- `attempt`: 테스트 시도
- `attempt_section`: 섹션 진입
- `web_vitals`: Web Vitals 성능 지표
- `http_error`: HTTP 에러

## 참고 자료

- [Cloudflare D1 문서](https://developers.cloudflare.com/d1/)
- [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/platform/functions/)
- [Drizzle ORM 문서](https://orm.drizzle.team/)
- [Hono 문서](https://hono.dev/)

