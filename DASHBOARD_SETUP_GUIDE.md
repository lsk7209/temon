# 관리자 대시보드 설정 가이드 (Cloudflare 환경)

## 📊 현재 상태 검토

### ✅ 정상 작동하는 부분
1. **대시보드 UI**: 모든 차트와 테이블이 정상적으로 렌더링됨
2. **API 엔드포인트**: `/api/reports` 엔드포인트가 정상 작동
3. **쿼리 로직**: Drizzle ORM 쿼리가 올바르게 작성됨
4. **날짜 범위 필터**: 오늘/7일/30일/커스텀 필터 작동

### ⚠️ 문제점 및 개선 필요 사항

#### 1. 데이터 수집 문제
- **현재**: `lib/analytics.ts`는 Google Analytics만 추적
- **필요**: D1 데이터베이스에 저장하려면 `/api/collect` 호출 필요
- **해결**: `public/analytics.js`가 제대로 로드되고 있는지 확인 필요

#### 2. 평균 소요 시간 계산 미구현
- **위치**: `functions/api/reports.ts` 55번째 줄
- **현재**: `avgDurationP50 = 0` (TODO 상태)
- **필요**: `attempt` 테이블에서 `completed_at - started_at` 계산 로직 추가

#### 3. D1 데이터베이스 바인딩 미설정
- **위치**: `wrangler.toml` 16-20번째 줄
- **현재**: 주석 처리되어 있음
- **필요**: Cloudflare Dashboard에서 D1 바인딩 설정 필요

#### 4. KV 네임스페이스 바인딩 미설정
- **위치**: `wrangler.toml` 30-32번째 줄
- **현재**: 주석 처리되어 있음
- **필요**: 세션 캐싱을 위한 KV 네임스페이스 설정 필요

#### 5. ADMIN_TOKEN 미설정
- **위치**: `wrangler.toml` 36번째 줄
- **현재**: 빈 문자열
- **필요**: 보안을 위한 강력한 토큰 설정 필요

---

## 🔧 Cloudflare 설정 단계별 가이드

### 1단계: D1 데이터베이스 생성 및 바인딩

#### 1-1. D1 데이터베이스 생성

1. **Cloudflare Dashboard 접속**
   - https://dash.cloudflare.com 접속
   - 로그인

2. **Workers & Pages → D1 메뉴로 이동**
   - 왼쪽 사이드바: **Workers & Pages** → **D1**

3. **데이터베이스 생성**
   - **Create database** 버튼 클릭
   - **Database name**: `temon-analytics`
   - **Region**: `apac` (아시아 태평양) 또는 가장 가까운 리전
   - **Create** 클릭

4. **Database ID 확인**
   - 생성된 데이터베이스 클릭
   - 상단에 표시된 **Database ID** 복사
   - 예: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`

#### 1-2. 스키마 마이그레이션 실행

**방법 A: Cloudflare Dashboard에서 실행 (권장)**

1. 생성한 데이터베이스 페이지에서 **SQL Editor** 탭 클릭
2. `migrations/000_init.sql` 파일의 내용을 복사하여 붙여넣기
3. **Run** 버튼 클릭

**방법 B: Wrangler CLI로 실행**

```bash
# 로컬에서 실행 (Cloudflare 인증 필요)
wrangler d1 migrations apply temon-analytics --remote
```

#### 1-3. Pages 프로젝트에 D1 바인딩

1. **Cloudflare Dashboard → Workers & Pages → Pages**
2. `temon` 프로젝트 클릭
3. **Settings** 탭 클릭
4. **Functions** 섹션으로 스크롤
5. **D1 Database bindings** 섹션에서:
   - **Variable name**: `DB`
   - **Database**: `temon-analytics` 선택
   - **Save** 클릭

---

### 2단계: KV 네임스페이스 생성 및 바인딩

#### 2-1. KV 네임스페이스 생성

1. **Workers & Pages → KV** 메뉴로 이동
2. **Create a namespace** 클릭
3. **Namespace name**: `SESSIONS`
4. **Add** 클릭
5. 생성된 **Namespace ID** 복사

#### 2-2. Pages 프로젝트에 KV 바인딩

1. **Pages 프로젝트 → Settings → Functions**
2. **KV Namespace bindings** 섹션에서:
   - **Variable name**: `SESSIONS`
   - **KV namespace**: `SESSIONS` 선택
   - **Save** 클릭

---

### 3단계: 환경 변수 설정

#### 3-1. ADMIN_TOKEN 생성

강력한 랜덤 토큰 생성:

```bash
# 방법 1: Node.js로 생성
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# 방법 2: OpenSSL로 생성
openssl rand -hex 32
```

#### 3-2. Pages 프로젝트에 환경 변수 추가

1. **Pages 프로젝트 → Settings → Environment variables**
2. **Production** 환경에서:
   - **Variable name**: `ADMIN_TOKEN`
   - **Value**: 위에서 생성한 토큰 입력
   - **Encrypt** 체크 (권장)
   - **Save** 클릭

3. **Preview** 환경에도 동일하게 설정 (선택사항)

---

### 4단계: 데이터 수집 확인

#### 4-1. analytics.js 로드 확인

`app/layout.tsx`에서 이미 로드되고 있는지 확인:

```tsx
<Script src="/analytics.js" strategy="afterInteractive" />
```

✅ 이미 설정되어 있음

#### 4-2. 이벤트 전송 확인

브라우저 개발자 도구에서 확인:

1. **Network** 탭 열기
2. 페이지 방문 또는 테스트 시작
3. `/api/collect` 요청이 전송되는지 확인
4. 응답이 `200 OK`인지 확인

#### 4-3. 데이터베이스 확인

Cloudflare Dashboard에서:

1. **D1 → temon-analytics → SQL Editor**
2. 다음 쿼리로 데이터 확인:

```sql
-- 세션 수 확인
SELECT COUNT(*) as total_sessions FROM session;

-- 페이지 뷰 수 확인
SELECT COUNT(*) as total_views FROM page_view;

-- 테스트 시도 수 확인
SELECT COUNT(*) as total_attempts FROM attempt;

-- 최근 페이지 뷰 확인
SELECT * FROM page_view ORDER BY occurred_at DESC LIMIT 10;
```

---

### 5단계: 크론 작업 설정 (선택사항)

Cloudflare Pages에서는 크론 트리거가 제한적입니다.

**대안 1: 외부 크론 서비스 사용**
- GitHub Actions
- Vercel Cron
- 외부 서비스에서 `/cron?type=5min` 호출

**대안 2: Cloudflare Workers로 별도 배포**
- `wrangler-cron.toml` 사용
- 별도 Worker로 크론 작업 실행

---

## 📋 체크리스트

### 필수 설정 (데이터 수집을 위해 반드시 필요)

- [ ] D1 데이터베이스 생성 (`temon-analytics`)
- [ ] D1 스키마 마이그레이션 실행 (`migrations/000_init.sql`)
- [ ] Pages 프로젝트에 D1 바인딩 (`DB`)
- [ ] KV 네임스페이스 생성 (`SESSIONS`)
- [ ] Pages 프로젝트에 KV 바인딩 (`SESSIONS`)
- [ ] ADMIN_TOKEN 환경 변수 설정
- [ ] `analytics.js`가 정상 로드되는지 확인
- [ ] `/api/collect` 엔드포인트가 정상 작동하는지 확인

### 선택 설정 (성능 최적화)

- [ ] 크론 작업 설정 (5분/1시간/1일 집계)
- [ ] 평균 소요 시간 계산 로직 구현
- [ ] 인덱스 최적화 확인

---

## 🔍 데이터 정확성 검증 방법

### 1. 실시간 데이터 확인

```sql
-- 최근 1시간 내 페이지 뷰
SELECT COUNT(*) 
FROM page_view 
WHERE occurred_at > (strftime('%s', 'now') - 3600) * 1000;

-- 최근 1시간 내 테스트 시작
SELECT COUNT(*) 
FROM attempt 
WHERE started_at > (strftime('%s', 'now') - 3600) * 1000;
```

### 2. 대시보드와 데이터베이스 비교

1. 대시보드에서 "오늘" 데이터 확인
2. D1 SQL Editor에서 동일한 날짜 범위 쿼리 실행
3. 숫자가 일치하는지 확인

### 3. 이벤트 수집 로그 확인

Cloudflare Dashboard → Workers & Pages → Pages → `temon` → **Logs** 탭**에서:
- `/api/collect` 요청이 들어오는지 확인
- 에러가 발생하는지 확인
- 응답 시간 확인

---

## 🐛 문제 해결

### 문제 1: 대시보드에 데이터가 0으로 표시됨

**원인**: 데이터 수집이 되지 않음

**해결**:
1. `analytics.js`가 로드되는지 확인 (브라우저 콘솔)
2. `/api/collect` 요청이 전송되는지 확인 (Network 탭)
3. D1 데이터베이스에 데이터가 있는지 확인 (SQL Editor)
4. Functions 로그에서 에러 확인

### 문제 2: 401 Unauthorized 에러

**원인**: ADMIN_TOKEN이 설정되지 않았거나 잘못됨

**해결**:
1. Pages 프로젝트 → Settings → Environment variables 확인
2. `ADMIN_TOKEN`이 설정되어 있는지 확인
3. 관리자 페이지에서 올바른 토큰을 입력했는지 확인
4. localStorage에 `admin_token`이 저장되어 있는지 확인

### 문제 3: D1 쿼리 에러

**원인**: D1 바인딩이 설정되지 않았거나 스키마가 없음

**해결**:
1. Pages 프로젝트 → Settings → Functions → D1 Database bindings 확인
2. `migrations/000_init.sql` 실행 여부 확인
3. 테이블이 생성되었는지 확인: `SELECT name FROM sqlite_master WHERE type='table';`

### 문제 4: KV 에러

**원인**: KV 네임스페이스 바인딩이 설정되지 않음

**해결**:
1. Pages 프로젝트 → Settings → Functions → KV Namespace bindings 확인
2. `SESSIONS` 바인딩이 설정되어 있는지 확인

---

## 📊 데이터 수집 흐름

```
사용자 방문
  ↓
analytics.js 로드 (app/layout.tsx)
  ↓
페이지 뷰 이벤트 → /api/collect (POST)
  ↓
functions/api/collect.ts
  ↓
D1 데이터베이스 저장 (session, page_view 테이블)
  ↓
테스트 시작 → /api/collect (POST)
  ↓
D1 데이터베이스 저장 (attempt 테이블)
  ↓
테스트 완료 → /api/collect (POST)
  ↓
D1 데이터베이스 업데이트 (attempt.completed_at)
  ↓
대시보드 조회 → /api/reports (GET)
  ↓
functions/api/reports.ts
  ↓
D1 데이터베이스 조회 (쿼리)
  ↓
대시보드에 표시
```

---

## 🎯 다음 단계

1. **즉시 설정 필요**:
   - D1 데이터베이스 생성 및 바인딩
   - KV 네임스페이스 생성 및 바인딩
   - ADMIN_TOKEN 설정
   - 스키마 마이그레이션 실행

2. **데이터 수집 확인**:
   - 실제 사용자 트래픽으로 데이터 수집 테스트
   - 대시보드에서 데이터 확인

3. **개선 사항**:
   - 평균 소요 시간 계산 로직 구현
   - 크론 작업 설정 (선택사항)

---

## 📝 참고 자료

- [Cloudflare D1 문서](https://developers.cloudflare.com/d1/)
- [Cloudflare KV 문서](https://developers.cloudflare.com/kv/)
- [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/platform/functions/)
- [Drizzle ORM 문서](https://orm.drizzle.team/)

