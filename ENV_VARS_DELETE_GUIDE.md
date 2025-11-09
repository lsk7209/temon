# Cloudflare Pages 환경 변수 삭제 가이드

## 🔍 문제 상황

Dashboard에서 환경 변수를 삭제할 수 없는 경우가 있습니다.

## ✅ 해결 방법

### 방법 1: 변수 편집하여 빈 값으로 만들기

1. **Cloudflare Dashboard 접속**
   - Pages > temon 프로젝트 > Settings > Environment Variables

2. **변수 편집**
   - `ADMIN_TOKEN` 옆 연필 아이콘(편집) 클릭
   - 값을 빈 문자열(`""`)로 변경
   - 저장

3. **NODE_ENV도 동일하게 처리**
   - `NODE_ENV` 옆 연필 아이콘 클릭
   - 값을 빈 문자열로 변경
   - 저장

### 방법 2: wrangler.toml 값 사용 (권장)

Dashboard에서 삭제할 수 없어도, `wrangler.toml`의 값이 사용됩니다:

1. **wrangler.toml 확인**
   ```toml
   [vars]
   ADMIN_TOKEN = "02aa3c5ef24829dd7efd3660008e9584443d755d975fd32c6fbdb228c9a76322"
   NODE_ENV = "production"
   ```

2. **Dashboard 변수는 무시**
   - Dashboard의 변수가 있더라도, `wrangler.toml`의 값이 우선 적용됩니다
   - 또는 Dashboard 변수를 빈 값으로 설정

### 방법 3: ADMIN_TOKEN을 암호로 추가 (기존 변수 유지)

1. **새 암호 변수 추가**
   - "+ 추가" 버튼 클릭
   - **유형**: "암호" (Encrypted) 선택
   - **이름**: `ADMIN_TOKEN` (동일한 이름)
   - **값**: `02aa3c5ef24829dd7efd3660008e9584443d755d975fd32c6fbdb228c9a76322`
   - 저장

2. **우선순위 확인**
   - 암호 타입 변수가 일반 텍스트보다 우선 적용됩니다
   - 기존 일반 텍스트 변수는 그대로 두어도 됩니다

### 방법 4: Cloudflare API 사용 (고급)

Dashboard에서 삭제가 안 되는 경우, Cloudflare API를 사용할 수 있습니다:

```bash
# Cloudflare API 토큰 필요
curl -X DELETE \
  "https://api.cloudflare.com/client/v4/accounts/{account_id}/pages/projects/{project_name}/vars/{variable_name}" \
  -H "Authorization: Bearer {api_token}" \
  -H "Content-Type: application/json"
```

## 📋 현재 설정 권장사항

### 옵션 A: Dashboard 변수 유지 + wrangler.toml 사용

1. **Dashboard 변수는 그대로 두기**
   - `ADMIN_TOKEN` (일반 텍스트) - 그대로 유지
   - `NODE_ENV` (일반 텍스트) - 그대로 유지

2. **wrangler.toml 확인**
   - `[vars]` 섹션에 변수가 설정되어 있는지 확인
   - Dashboard 변수와 동일한 값이면 문제없음

3. **우선순위**
   - Dashboard 변수가 있으면 Dashboard 값 사용
   - Dashboard 변수가 없으면 wrangler.toml 값 사용

### 옵션 B: ADMIN_TOKEN만 암호로 추가

1. **새 암호 변수 추가**
   - "+ 추가" > 유형: "암호" > 이름: `ADMIN_TOKEN`
   - 값 입력 후 저장

2. **기존 일반 텍스트 변수**
   - 그대로 두거나 빈 값으로 편집

3. **우선순위**
   - 암호 타입 변수가 가장 높은 우선순위
   - 일반 텍스트 변수는 무시됨

## 🔧 Functions 404 오류 해결

환경 변수 설정과 관계없이 Functions가 404를 반환하는 경우:

1. **D1 Database 바인딩 확인**
   - Settings > Functions > D1 Database bindings
   - `DB` → `temon-db` 확인

2. **Functions 활성화 확인**
   - Settings > Functions
   - Functions 디렉토리: `functions` 확인

3. **재배포**
   - 새 커밋 푸시 또는 수동 재배포

## ✅ 최종 권장 설정

### Dashboard 설정
- `ADMIN_TOKEN` (암호) - 새로 추가
- 기존 `ADMIN_TOKEN` (일반 텍스트) - 그대로 두거나 빈 값으로 편집
- `NODE_ENV` (일반 텍스트) - 그대로 두거나 빈 값으로 편집

### wrangler.toml 설정
```toml
[vars]
ADMIN_TOKEN = "02aa3c5ef24829dd7efd3660008e9584443d755d975fd32c6fbdb228c9a76322"
NODE_ENV = "production"
```

이렇게 설정하면:
- 프로덕션: Dashboard의 암호 변수 사용
- 로컬 개발: wrangler.toml의 변수 사용

## 🚀 다음 단계

1. Dashboard에서 `ADMIN_TOKEN`을 암호로 추가
2. 기존 변수는 그대로 두거나 빈 값으로 편집
3. 재배포
4. `/api/health` 엔드포인트로 테스트

