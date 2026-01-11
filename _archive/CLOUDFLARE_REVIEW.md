# Cloudflare 환경 코드 검토 리포트

## 📋 검토 개요

이 문서는 테몬 MBTI 플랫폼의 Cloudflare Pages, D1 데이터베이스, Workers 크론 환경에 대한 코드 검토 결과를 정리합니다.

## ✅ 수정 완료 사항

### 1. Next.js 설정 수정
- **파일**: `next.config.mjs`
- **문제**: `output: 'standalone'` 설정이 Cloudflare Pages와 호환되지 않음
- **수정**: standalone 출력 설정 제거
- **이유**: Cloudflare Pages는 정적 파일과 Functions를 사용하므로 standalone 빌드가 불필요

### 2. SQL 쿼리 수정
- **파일**: `workers/cron-stats.ts`
- **문제**: SQLite의 DATE 함수 사용 방식이 잘못됨
- **수정**: 
  - `DATE(started_at, "unixepoch")` → `date(datetime(started_at/1000, 'unixepoch'))`
  - `DATE(created_at, "unixepoch")` → `date(datetime(created_at/1000, 'unixepoch'))`
- **이유**: SQLite에서 밀리초 타임스탬프를 날짜로 변환하려면 먼저 초 단위로 변환 후 datetime 함수 사용 필요

### 3. D1 데이터베이스 접근 방식 개선
- **파일**: `app/api/results/route.ts`, `app/api/stats/route.ts`, `app/api/dashboard/route.ts`
- **문제**: Cloudflare Pages Functions 환경에서 D1 접근 방식이 불명확
- **수정**: 주석 추가 및 접근 방식 개선
- **주의**: Next.js API Routes는 Cloudflare Pages에서 Functions로 변환되지만, context 객체 접근이 제한적임

### 4. wrangler.toml 데이터베이스 설정 명확화
- **파일**: `wrangler.toml`
- **문제**: 데이터베이스 이름 불일치 (README: temon-mbti-db, wrangler.toml: temon-analytics)
- **수정**: 주석 추가하여 두 데이터베이스의 용도 명시
- **권장**: 필요에 따라 두 데이터베이스를 통합하거나 별도로 관리

## ⚠️ 주의 사항 및 권장 사항

### 1. Next.js API Routes vs Cloudflare Functions

**현재 구조:**
- Next.js API Routes (`app/api/*`) - 자동으로 Functions로 변환
- Cloudflare Functions (`functions/*`) - 명시적 Functions 정의

**문제점:**
- Next.js API Routes에서는 Cloudflare의 context 객체에 직접 접근하기 어려움
- `globalThis.env?.DB` 방식은 Cloudflare Pages 환경에서 작동하지 않을 수 있음

**권장 해결책:**
1. **옵션 A**: 모든 API를 `functions/` 디렉토리로 이동
   - 장점: 명시적인 context 접근 가능
   - 단점: Next.js API Routes의 편의성 손실
   
2. **옵션 B**: Hybrid 접근
   - Next.js API Routes는 클라이언트 역할만 수행
   - 실제 로직은 `functions/` 디렉토리의 Functions에서 처리
   - 현재 `app/api/reports/route.ts`가 이 방식 사용 중

3. **옵션 C**: Cloudflare Pages Functions 미들웨어 사용
   - `functions/_middleware.ts`에서 D1 초기화
   - 요청 컨텍스트에 주입

### 2. 크론 작업 구조

**현재 구조:**
- `functions/cron.ts` - HTTP GET 요청으로 호출 가능한 크론 핸들러
- `workers/cron-stats.ts` - Cloudflare Workers scheduled 이벤트 핸들러

**문제점:**
- `wrangler.toml`의 `triggers.crons`는 `functions/index.ts`와 연동되지 않음
- 크론 트리거는 별도 Worker에 설정되어야 함

**권장 해결책:**
1. **별도 Worker로 크론 배포**:
   ```bash
   wrangler deploy workers/cron-stats.ts --name cron-stats
   ```

2. **별도 wrangler 설정 파일 생성**:
   - `wrangler-cron.toml` 생성
   - 크론 Worker 전용 설정

3. **크론 작업 통합**:
   - `functions/cron.ts`의 로직을 `workers/cron-stats.ts`로 통합
   - 또는 HTTP 엔드포인트로 크론 수동 실행 가능

### 3. 데이터베이스 구조

**현재 상황:**
- `temon-analytics` - Analytics 데이터 (session, pageView, attempt 등)
- `temon-mbti-db` - 테스트 결과 데이터 (test_results, test_stats 등)

**권장 사항:**
1. **단일 데이터베이스 사용**:
   - 두 데이터베이스를 하나로 통합
   - 스키마를 통합하여 관리 용이성 향상

2. **별도 데이터베이스 유지**:
   - Analytics와 테스트 결과를 분리하여 관리
   - 각각 독립적인 확장성 확보

3. **현재 선택**: 프로젝트 요구사항에 따라 결정

### 4. 환경 변수 관리

**Cloudflare Pages 환경 변수:**
- Dashboard에서 설정: `NEXT_PUBLIC_*` 변수
- 자동으로 Functions에 전달됨

**Workers 환경 변수:**
- `wrangler.toml`의 `[vars]` 섹션
- 또는 `wrangler secret put` 명령어로 보안 변수 설정

**주의사항:**
- `ADMIN_TOKEN`, `API_SECRET_KEY` 등은 반드시 `wrangler secret`으로 설정
- `.env.local`은 로컬 개발용이며, 커밋하지 않아야 함

## 🔧 추가 개선 권장 사항

### 1. 에러 처리 개선
- 데이터베이스 연결 실패 시 재시도 로직 추가
- 타임아웃 설정
- 에러 로깅 강화

### 2. 성능 최적화
- D1 쿼리 최적화 (인덱스 활용)
- KV 캐싱 활용 (세션 데이터, 통계 캐시)
- 배치 쿼리 사용 (여러 쿼리를 하나의 batch로 실행)

### 3. 타입 안정성
- Cloudflare Workers 타입 정의 명확화
- D1 데이터베이스 타입 정의 개선

### 4. 테스트
- 로컬 D1 데이터베이스로 테스트
- 크론 작업 테스트
- API 엔드포인트 테스트

## 📝 배포 체크리스트

배포 전 확인사항:

- [ ] D1 데이터베이스 생성 및 스키마 적용
  ```bash
  wrangler d1 create temon-analytics
  wrangler d1 execute temon-analytics --file=./lib/db/schema.sql
  ```

- [ ] KV 네임스페이스 생성
  ```bash
  wrangler kv:namespace create "SESSIONS"
  ```

- [ ] 환경 변수 설정
  - Cloudflare Dashboard에서 Pages 환경 변수 설정
  - `wrangler secret put`로 보안 변수 설정

- [ ] 크론 Worker 배포
  ```bash
  # 방법 1: 설정 파일 사용 (권장)
  wrangler deploy --config wrangler-cron.toml
  
  # 방법 2: 직접 배포
  wrangler deploy workers/cron-stats.ts --name cron-stats --triggers-cron="0 2 * * *"
  ```

- [ ] 크론 트리거 설정 확인
  - `wrangler-cron.toml`의 `[triggers]` 섹션 확인
  - Cloudflare Dashboard에서 Worker의 Triggers 설정 확인

- [ ] 로컬 빌드 테스트
  ```bash
  npm run build
  ```

- [ ] 로컬 Functions 테스트
  ```bash
  wrangler pages dev .next
  ```

## 🔗 참고 문서

- [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/platform/functions/)
- [Cloudflare D1 문서](https://developers.cloudflare.com/d1/)
- [Cloudflare Workers Cron Triggers](https://developers.cloudflare.com/workers/configuration/cron-triggers/)
- [Next.js on Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/nextjs/)

---

**검토일**: 2025년 1월  
**검토자**: AI Assistant  
**상태**: ✅ 주요 이슈 수정 완료, 추가 개선 권장

