# wrangler.toml 설정 완료 가이드

## ✅ 현재 설정 상태

### D1 데이터베이스 바인딩
```toml
[[d1_databases]]
binding = "DB"
database_name = "temon-db"
database_id = "b78fdac5-09b7-43b8-86db-133f5cd4c768"
```
✅ **설정 완료**

### ADMIN_TOKEN
```toml
ADMIN_TOKEN = "02aa3c5ef24829dd7efd3660008e9584443d755d975fd32c6fbdb228c9a76322"
```
✅ **설정 완료** (64자 랜덤 hex 문자열)

---

## 📋 다음 단계

### 1단계: 스키마 생성 (필수)

D1 데이터베이스에 테이블을 생성해야 합니다.

1. **Cloudflare Dashboard 접속**
   - https://dash.cloudflare.com 접속
   - 로그인

2. **D1 데이터베이스 페이지로 이동**
   - 왼쪽 사이드바 > **Workers & Pages** > **D1**
   - `temon-db` 데이터베이스 클릭

3. **SQL Editor 열기**
   - 상단 탭에서 **SQL Editor** 클릭

4. **스키마 실행**
   - `migrations/000_init.sql` 파일의 내용을 복사하여 SQL Editor에 붙여넣기
   - **Run** 버튼 클릭

---

### 2단계: Cloudflare Pages에 바인딩 확인

**중요**: wrangler.toml에 설정되어 있어도, Cloudflare Pages Dashboard에서도 확인해야 합니다.

1. **Pages 프로젝트 설정**
   - Cloudflare Dashboard > **Workers & Pages** > **Pages**
   - `temon` 프로젝트 선택

2. **Settings 탭 클릭**

3. **Functions 섹션 확인**
   - **D1 Database bindings**에 `DB` → `temon-db`가 표시되는지 확인
   - 없으면 **Add binding** 클릭하여 추가

4. **Environment Variables 확인**
   - `ADMIN_TOKEN`이 설정되어 있는지 확인
   - 없으면 wrangler.toml의 값과 동일하게 설정

---

### 3단계: KV 네임스페이스 설정 (선택사항)

KV 네임스페이스는 세션 캐싱을 위해 사용되지만, 없어도 작동합니다 (D1에 직접 저장).

**설정하려면:**

1. **KV 네임스페이스 생성**
   - **Workers & Pages** > **KV**
   - **Create a namespace** 클릭
   - **Namespace title**: `temon-sessions` 입력
   - **Add** 버튼 클릭
   - 생성된 **Namespace ID** 복사

2. **wrangler.toml에 추가**
   ```toml
   [[kv_namespaces]]
   binding = "SESSIONS"
   id = "복사한-namespace-id"
   ```

3. **Pages에 바인딩**
   - Pages 프로젝트 > **Settings** > **Functions**
   - **KV Namespace bindings**에서 **Add binding** 클릭
   - **Variable name**: `SESSIONS`
   - **KV namespace**: `temon-sessions` 선택
   - **Save** 버튼 클릭

---

## 🔐 ADMIN_TOKEN 사용 방법

### 대시보드 접근

1. **관리자 로그인**
   - `/admin` 페이지 접속
   - 비밀번호 입력 (현재: `1234`)
   - 로그인 성공 시 localStorage에 토큰 저장

2. **대시보드 접근**
   - `/dashboard` 페이지 접속
   - API 호출 시 자동으로 `Authorization: Bearer {token}` 헤더 전송

### ADMIN_TOKEN 값

현재 설정된 토큰:
```
02aa3c5ef24829dd7efd3660008e9584443d755d975fd32c6fbdb228c9a76322
```

**보안 주의:**
- 이 토큰은 wrangler.toml에 저장되어 Git에 커밋됩니다
- 프로덕션에서는 더 강력한 토큰 사용 권장
- 정기적으로 토큰 변경 권장

---

## ✅ 확인 체크리스트

- [ ] D1 데이터베이스 스키마 생성 완료
- [ ] Pages에 D1 바인딩 확인 (`DB` → `temon-db`)
- [ ] Pages에 ADMIN_TOKEN 환경 변수 확인
- [ ] KV 네임스페이스 설정 (선택사항)
- [ ] 대시보드 접속 테스트
- [ ] 데이터 수집 확인

---

## 🔍 문제 해결

### 바인딩이 작동하지 않음
- wrangler.toml에 설정되어 있어도 Pages Dashboard에서도 확인 필요
- Pages 프로젝트 재배포 필요할 수 있음

### ADMIN_TOKEN이 작동하지 않음
- Pages Dashboard의 Environment Variables 확인
- wrangler.toml의 값과 일치하는지 확인
- 브라우저 localStorage의 `admin_token` 확인

### 데이터가 수집되지 않음
- D1 스키마 생성 확인
- 브라우저 콘솔에서 `/api/collect` 요청 확인
- Functions 로그 확인 (Cloudflare Dashboard > Pages > Logs)

---

## 📚 관련 문서

- [D1 설정 가이드](./D1_SETUP_INSTRUCTIONS.md)
- [ADMIN_TOKEN 가이드](./ADMIN_TOKEN_GUIDE.md)
- [상태 확인 가이드](./STATUS_CHECK.md)

