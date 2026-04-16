# D1 데이터베이스 설정 완료 가이드

## ✅ 제공된 정보

- **데이터베이스 이름**: `temon-db`
- **Database ID**: `b78fdac5-09b7-43b8-86db-133f5cd4c768`

---

## 🔧 다음 단계

### 1단계: 스키마 생성 (필수)

D1 데이터베이스에 테이블을 생성해야 합니다.

#### 방법 1: Cloudflare Dashboard에서 실행 (권장)

1. **Cloudflare Dashboard 접속**
   - https://dash.cloudflare.com 접속
   - 로그인

2. **D1 데이터베이스 페이지로 이동**
   - 왼쪽 사이드바 > **Workers & Pages** > **D1**
   - `temon-db` 데이터베이스 클릭

3. **SQL Editor 열기**
   - 상단 탭에서 **SQL Editor** 클릭

4. **스키마 실행**
   - 아래 SQL을 복사하여 SQL Editor에 붙여넣기
   - **Run** 버튼 클릭

```sql
-- Cloudflare D1 Analytics 스키마 초기화

CREATE TABLE IF NOT EXISTS session (
  session_id TEXT PRIMARY KEY,
  anonymous_id TEXT,
  started_at INTEGER NOT NULL,
  ended_at INTEGER,
  device TEXT,
  os TEXT,
  browser TEXT,
  browser_ver TEXT,
  viewport_w INTEGER,
  viewport_h INTEGER,
  country TEXT,
  region TEXT,
  city TEXT
);

CREATE TABLE IF NOT EXISTS page_view (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT NOT NULL,
  occurred_at INTEGER NOT NULL,
  path TEXT,
  referrer_host TEXT,
  referrer_path TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,
  FOREIGN KEY(session_id) REFERENCES session(session_id)
);

CREATE TABLE IF NOT EXISTS attempt (
  attempt_id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL,
  quiz_id TEXT,
  started_at INTEGER NOT NULL,
  completed_at INTEGER,
  abandoned_at INTEGER,
  abandon_reason TEXT,
  FOREIGN KEY(session_id) REFERENCES session(session_id)
);

CREATE TABLE IF NOT EXISTS attempt_section (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  attempt_id TEXT NOT NULL,
  section_index INTEGER NOT NULL,
  entered_at INTEGER NOT NULL,
  left_at INTEGER,
  FOREIGN KEY(attempt_id) REFERENCES attempt(attempt_id)
);

CREATE TABLE IF NOT EXISTS web_vitals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT,
  occurred_at INTEGER NOT NULL,
  lcp REAL,
  fid REAL,
  cls REAL,
  ttfb REAL
);

CREATE TABLE IF NOT EXISTS http_error (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  occurred_at INTEGER NOT NULL,
  path TEXT,
  status INTEGER,
  latency_ms INTEGER
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_pv_time ON page_view(occurred_at);
CREATE INDEX IF NOT EXISTS idx_attempt_started ON attempt(started_at);
CREATE INDEX IF NOT EXISTS idx_attempt_completed ON attempt(completed_at);
CREATE INDEX IF NOT EXISTS idx_attempt_abandoned ON attempt(abandoned_at);
CREATE INDEX IF NOT EXISTS idx_session_browser ON session(browser, browser_ver);
CREATE INDEX IF NOT EXISTS idx_pv_utm ON page_view(utm_source, utm_medium, utm_campaign);
CREATE INDEX IF NOT EXISTS idx_attempt_quiz ON attempt(quiz_id);
CREATE INDEX IF NOT EXISTS idx_session_country ON session(country);
```

#### 방법 2: Wrangler CLI 사용 (선택사항)

```bash
# 로컬에서 실행 (개발용)
wrangler d1 execute temon-db --local --file=./migrations/000_init.sql

# 프로덕션에 실행
wrangler d1 execute temon-db --file=./migrations/000_init.sql
```

---

### 2단계: Cloudflare Pages에 D1 바인딩 (필수)

**중요**: Cloudflare Pages는 Dashboard에서 바인딩해야 합니다.

1. **Pages 프로젝트 설정**
   - Cloudflare Dashboard > **Workers & Pages** > **Pages**
   - `temon` 프로젝트 선택

2. **Settings 탭 클릭**

3. **Functions 섹션으로 스크롤**

4. **D1 Database bindings 섹션에서 "Add binding" 클릭**
   - **Variable name**: `DB` (반드시 `DB`로 설정)
   - **Database**: `temon-db` 선택
   - **Save** 버튼 클릭

---

### 3단계: KV 네임스페이스 바인딩 (선택사항, 권장)

세션 관리를 위해 KV 네임스페이스도 바인딩하는 것을 권장합니다.

1. **KV 네임스페이스 생성**
   - **Workers & Pages** > **KV**
   - **Create a namespace** 클릭
   - **Namespace title**: `temon-sessions` 입력
   - **Add** 버튼 클릭

2. **Pages에 KV 바인딩**
   - Pages 프로젝트 > **Settings** > **Functions**
   - **KV Namespace bindings** 섹션에서 **Add binding** 클릭
   - **Variable name**: `SESSIONS`
   - **KV namespace**: `temon-sessions` 선택
   - **Save** 버튼 클릭

---

### 4단계: 환경 변수 설정

1. **Pages 프로젝트 > Settings > Environment Variables**

2. **Production 환경 변수 추가**:
   - `ADMIN_TOKEN`: 관리자 대시보드 접근 토큰
     - **생성 방법**: 임의의 긴 문자열 (최소 32자 이상 권장)
     - **예시**: `a3f8b9c2d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2`
     - **생성 도구**: https://www.random.org/strings/ 또는 `openssl rand -hex 32`
     - **자세한 가이드**: `ADMIN_TOKEN_GUIDE.md` 참고

---

### 5단계: 확인

1. **스키마 확인**
   - D1 데이터베이스 > **Tables** 탭에서 다음 테이블이 생성되었는지 확인:
     - `session`
     - `page_view`
     - `attempt`
     - `attempt_section`
     - `web_vitals`
     - `http_error`

2. **바인딩 확인**
   - Pages 프로젝트 > **Settings** > **Functions**
   - D1 Database bindings에 `DB` → `temon-db`가 표시되는지 확인

3. **데이터 수집 확인**
   - 사이트 방문 후 대시보드(`/dashboard`) 접속
   - 데이터가 표시되는지 확인

---

## ✅ 완료 체크리스트

- [ ] 스키마 생성 완료 (6개 테이블 + 인덱스)
- [ ] Pages에 D1 바인딩 완료 (Variable: `DB`)
- [ ] KV 네임스페이스 바인딩 완료 (선택사항)
- [ ] `ADMIN_TOKEN` 환경 변수 설정 완료
- [ ] 대시보드에서 데이터 확인

---

## 🔍 문제 해결

### 스키마 생성 오류
- SQL 문법 오류 확인
- 테이블이 이미 존재하는 경우 `CREATE TABLE IF NOT EXISTS` 사용

### 바인딩이 작동하지 않음
- Variable name이 정확히 `DB`인지 확인
- 데이터베이스 이름이 `temon-db`인지 확인
- Pages 프로젝트 재배포 필요할 수 있음

### 데이터가 수집되지 않음
- 브라우저 콘솔에서 `/api/collect` 요청 확인
- 네트워크 탭에서 오류 확인
- Functions 로그 확인 (Cloudflare Dashboard > Pages > Logs)

---

## 📚 참고

- [Cloudflare D1 문서](https://developers.cloudflare.com/d1/)
- [Cloudflare Pages Functions 문서](https://developers.cloudflare.com/pages/platform/functions/)
- [프로젝트 설정 가이드](./DB_SETUP_GUIDE.md)

