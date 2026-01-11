# Cloudflare D1/KV 바인딩 설정 가이드

## 📋 목차
1. [D1 데이터베이스 생성 및 바인딩](#1-d1-데이터베이스-생성-및-바인딩)
2. [KV 네임스페이스 생성 및 바인딩](#2-kv-네임스페이스-생성-및-바인딩)
3. [환경 변수 설정](#3-환경-변수-설정)
4. [확인 및 테스트](#4-확인-및-테스트)

---

## 1. D1 데이터베이스 생성 및 바인딩

### 1-1. D1 데이터베이스 생성

1. **Cloudflare Dashboard 접속**
   - https://dash.cloudflare.com 접속
   - 로그인

2. **Workers & Pages 메뉴로 이동**
   - 왼쪽 사이드바에서 **Workers & Pages** 클릭
   - 또는 직접 URL: https://dash.cloudflare.com → Workers & Pages

3. **D1 데이터베이스 생성**
   - 왼쪽 사이드바에서 **D1** 클릭
   - **Create database** 버튼 클릭

4. **데이터베이스 정보 입력**
   - **Database name**: `temon-analytics` (또는 원하는 이름)
   - **Region**: 가장 가까운 리전 선택 (예: `apac` - 아시아 태평양)
   - **Create** 버튼 클릭

5. **데이터베이스 ID 확인**
   - 생성된 데이터베이스 클릭
   - 상단에 표시된 **Database ID** 복사 (예: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)

### 1-2. D1 데이터베이스 스키마 생성

1. **SQL 편집기 열기**
   - 생성한 데이터베이스 페이지에서 **SQL Editor** 탭 클릭

2. **스키마 실행**
   - `lib/db/schema.sql` 파일의 내용을 복사하여 SQL 편집기에 붙여넣기
   - 또는 아래 SQL 실행:

```sql
-- Analytics 테이블들
CREATE TABLE IF NOT EXISTS page_views (
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
  utm_content TEXT
);

CREATE TABLE IF NOT EXISTS quiz_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT NOT NULL,
  occurred_at INTEGER NOT NULL,
  event_type TEXT NOT NULL,
  quiz_id TEXT,
  metadata TEXT
);

CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  anonymous_id TEXT,
  created_at INTEGER NOT NULL,
  last_seen_at INTEGER NOT NULL,
  user_agent TEXT,
  ip_address TEXT
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_page_views_session ON page_views(session_id);
CREATE INDEX IF NOT EXISTS idx_page_views_occurred ON page_views(occurred_at);
CREATE INDEX IF NOT EXISTS idx_quiz_events_session ON quiz_events(session_id);
CREATE INDEX IF NOT EXISTS idx_quiz_events_occurred ON quiz_events(occurred_at);
```

3. **Run** 버튼 클릭하여 실행

### 1-3. Pages 프로젝트에 D1 바인딩

1. **Pages 프로젝트로 이동**
   - 왼쪽 사이드바에서 **Pages** 클릭
   - `temon` 프로젝트 클릭

2. **Settings 메뉴**
   - 상단 메뉴에서 **Settings** 클릭

3. **Functions 탭**
   - 왼쪽 메뉴에서 **Functions** 클릭

4. **D1 Database bindings 추가**
   - **D1 Database bindings** 섹션에서 **Add binding** 클릭
   - **Variable name**: `DB` (코드에서 사용하는 이름과 일치해야 함)
   - **D1 Database**: 드롭다운에서 `temon-analytics` 선택
   - **Save** 버튼 클릭

---

## 2. KV 네임스페이스 생성 및 바인딩

### 2-1. KV 네임스페이스 생성

1. **Workers & Pages 메뉴로 이동**
   - 왼쪽 사이드바에서 **Workers & Pages** 클릭

2. **KV 메뉴**
   - 왼쪽 사이드바에서 **KV** 클릭

3. **Create a namespace**
   - **Create a namespace** 버튼 클릭

4. **네임스페이스 정보 입력**
   - **Title**: `SESSIONS` (또는 원하는 이름)
   - **Add** 버튼 클릭

5. **네임스페이스 ID 확인**
   - 생성된 네임스페이스 클릭
   - 상단에 표시된 **Namespace ID** 복사 (예: `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)

### 2-2. Pages 프로젝트에 KV 바인딩

1. **Pages 프로젝트로 이동**
   - 왼쪽 사이드바에서 **Pages** 클릭
   - `temon` 프로젝트 클릭

2. **Settings 메뉴**
   - 상단 메뉴에서 **Settings** 클릭

3. **Functions 탭**
   - 왼쪽 메뉴에서 **Functions** 클릭

4. **KV Namespace bindings 추가**
   - **KV Namespace bindings** 섹션에서 **Add binding** 클릭
   - **Variable name**: `SESSIONS` (코드에서 사용하는 이름과 일치해야 함)
   - **KV Namespace**: 드롭다운에서 생성한 네임스페이스 선택
   - **Save** 버튼 클릭

---

## 3. 환경 변수 설정

### 3-1. Pages 프로젝트 환경 변수 추가

1. **Pages 프로젝트로 이동**
   - 왼쪽 사이드바에서 **Pages** 클릭
   - `temon` 프로젝트 클릭

2. **Settings 메뉴**
   - 상단 메뉴에서 **Settings** 클릭

3. **Environment Variables 탭**
   - 왼쪽 메뉴에서 **Environment Variables** 클릭

4. **환경 변수 추가**
   - **Add variable** 버튼 클릭
   - 다음 변수들을 추가:

| Variable name | Value | 설명 |
|--------------|-------|------|
| `NEXT_PUBLIC_GA_ID` | `G-XXXXXXXXXX` | Google Analytics ID |
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | `ca-pub-XXXXXXXXXX` | Google AdSense Client ID |
| `NEXT_PUBLIC_APP_URL` | `https://your-site.pages.dev` | 배포된 사이트 URL |
| `ADMIN_TOKEN` | `your-secret-token` | 관리자 API 토큰 (임의의 긴 문자열) |
| `NODE_ENV` | `production` | 환경 설정 |

5. **각 변수 저장**
   - 변수 입력 후 **Save** 버튼 클릭
   - **Production**, **Preview**, **Branch preview** 중 필요한 환경 선택

---

## 4. 확인 및 테스트

### 4-1. 바인딩 확인

1. **Pages 프로젝트 → Settings → Functions**
   - D1 Database bindings에 `DB` → `temon-analytics` 확인
   - KV Namespace bindings에 `SESSIONS` → 네임스페이스 확인

### 4-2. 재배포

1. **자동 재배포**
   - 바인딩 추가 후 자동으로 재배포가 시작됩니다
   - 또는 **Deployments** 탭에서 **Retry deployment** 클릭

2. **배포 완료 대기**
   - 배포가 완료될 때까지 대기 (약 2-3분)

### 4-3. API 테스트

1. **D1 데이터베이스 테스트**
   ```bash
   # 브라우저에서 또는 curl로 테스트
   curl https://your-site.pages.dev/api/dashboard \
     -H "Authorization: Bearer your-admin-token"
   ```

2. **KV 네임스페이스 테스트**
   - Functions가 정상 작동하면 자동으로 KV에 세션 데이터 저장

---

## 🔧 문제 해결

### D1 바인딩이 작동하지 않는 경우

1. **Variable name 확인**
   - 코드에서 사용하는 이름과 일치하는지 확인 (`DB`)
   - 대소문자 구분

2. **데이터베이스 ID 확인**
   - D1 데이터베이스가 올바르게 생성되었는지 확인

3. **재배포 확인**
   - 바인딩 추가 후 재배포가 완료되었는지 확인

### KV 바인딩이 작동하지 않는 경우

1. **Variable name 확인**
   - 코드에서 사용하는 이름과 일치하는지 확인 (`SESSIONS`)
   - 대소문자 구분

2. **네임스페이스 ID 확인**
   - KV 네임스페이스가 올바르게 생성되었는지 확인

### 환경 변수가 작동하지 않는 경우

1. **변수 이름 확인**
   - `NEXT_PUBLIC_` 접두사가 필요한 변수는 정확히 입력
   - 대소문자 구분

2. **환경 선택 확인**
   - Production 환경에 변수가 추가되었는지 확인

---

## 📝 참고 사항

### D1 데이터베이스

- **무료 플랜**: 5GB 스토리지, 5백만 읽기/일, 10만 쓰기/일
- **지역**: 데이터베이스 생성 시 선택한 리전에 저장
- **백업**: 자동 백업 제공

### KV 네임스페이스

- **무료 플랜**: 100,000 읽기/일, 1,000 쓰기/일
- **스토리지**: 키당 최대 25MB
- **지역**: 전역 분산 저장

### 바인딩 이름

코드에서 사용하는 바인딩 이름과 Dashboard에서 설정한 이름이 정확히 일치해야 합니다:

- D1: `DB` (functions/api/collect.ts에서 사용)
- KV: `SESSIONS` (functions/api/collect.ts에서 사용)

---

## ✅ 체크리스트

배포 전 확인사항:

- [ ] D1 데이터베이스 생성 완료
- [ ] D1 스키마 실행 완료
- [ ] D1 바인딩 추가 완료 (`DB`)
- [ ] KV 네임스페이스 생성 완료
- [ ] KV 바인딩 추가 완료 (`SESSIONS`)
- [ ] 환경 변수 추가 완료
- [ ] 재배포 완료
- [ ] API 테스트 성공

---

## 🆘 추가 도움말

- **Cloudflare 공식 문서**: https://developers.cloudflare.com/pages/platform/functions/bindings/
- **D1 문서**: https://developers.cloudflare.com/d1/
- **KV 문서**: https://developers.cloudflare.com/kv/

