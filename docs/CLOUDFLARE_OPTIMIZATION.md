# Cloudflare Pages 최적화 가이드

## 개요
이 프로젝트는 Cloudflare Pages, D1 데이터베이스, 크론 작업에 최적화되어 있습니다.

## 구조

### 1. 정적 사이트 생성 (SSG)
- `next.config.mjs`에서 `output: 'export'` 설정
- 모든 페이지가 빌드 시 정적으로 생성됨
- API 라우트는 Cloudflare Pages Functions로 처리

### 2. Cloudflare Pages Functions
- 위치: `functions/` 디렉토리
- 파일 기반 라우팅:
  - `functions/api/results.ts` → `/api/results`
  - `functions/api/stats.ts` → `/api/stats`
  - `functions/api/dashboard.ts` → `/api/dashboard`
  - `functions/api/collect.ts` → `/api/collect`
  - `functions/api/reports.ts` → `/api/reports`
  - `functions/api/health.ts` → `/api/health`
  - `functions/cron.ts` → `/cron`

### 3. D1 데이터베이스
- 바인딩 이름: `DB`
- 설정 파일: `wrangler.toml`
- 클라이언트: `lib/db/client.ts`
- 스키마: `lib/db/schema.ts`

### 4. 크론 작업
- 설정 파일: `wrangler-cron.toml`
- 핸들러: `functions/cron.ts`
- 별도 Worker로 배포 필요

## 배포 설정

### Cloudflare Pages Dashboard 설정
1. **프로젝트 연결**: GitHub 저장소 연결
2. **빌드 설정**:
   - Framework preset: `Next.js`
   - Build command: `npm run build`
   - Build output directory: `out`
   - Root directory: `/` (기본값)
3. **환경 변수**:
   - `NODE_ENV`: `production`
   - `ADMIN_TOKEN`: 관리자 토큰 (64자 hex)
4. **D1 데이터베이스 바인딩**:
   - Binding name: `DB`
   - Database: `temon-db` (또는 생성한 데이터베이스 이름)

### 크론 Worker 배포
```bash
# 크론 Worker 배포
wrangler deploy --config wrangler-cron.toml
```

## 최적화 사항

### 1. 빌드 최적화
- `output: 'export'`로 정적 사이트 생성
- 이미지 최적화 비활성화 (`unoptimized: true`)
- Webpack 최적화 설정
- 불필요한 파일 제외 (`outputFileTracingExcludes`)

### 2. Functions 최적화
- Hono 프레임워크 사용 (경량 라우터)
- CORS 헤더 자동 설정
- 에러 핸들링 통일
- 타입 안전성 보장

### 3. 데이터베이스 최적화
- 싱글톤 패턴으로 인스턴스 관리
- Prepared statements 사용
- JSON 직렬화 최적화

## 문제 해결

### 빌드 오류
1. 타입 오류: `@cloudflare/workers-types` 버전 확인
2. D1 바인딩 오류: Dashboard에서 바인딩 확인
3. Functions 오류: `functions/` 디렉토리 구조 확인

### 런타임 오류
1. 데이터베이스 연결 실패: D1 바인딩 확인
2. CORS 오류: Functions에서 CORS 헤더 확인
3. 타입 오류: `D1Database` 타입 import 확인

## 참고 자료
- [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/platform/functions/)
- [Cloudflare D1](https://developers.cloudflare.com/d1/)
- [Cloudflare Workers Cron Triggers](https://developers.cloudflare.com/workers/configuration/cron-triggers/)

