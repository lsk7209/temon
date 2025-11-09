# ADMIN_TOKEN 환경 변수 업데이트 가이드

## 🔍 문제 상황

Dashboard에서 `ADMIN_TOKEN`을 암호로 추가하려고 하면 "이미 존재한다"는 오류가 발생합니다.

## ✅ 해결 방법

### 방법 1: 기존 변수 편집하여 암호화 (권장)

Cloudflare Pages Dashboard에서는 변수 타입을 직접 변경할 수 없지만, 다음 방법을 사용할 수 있습니다:

1. **기존 변수 편집**
   - `ADMIN_TOKEN` 옆 연필 아이콘(편집) 클릭
   - 값 확인 (현재 값이 올바른지 확인)
   - 저장

2. **암호화는 자동 적용**
   - Cloudflare Pages는 중요한 변수(토큰 등)를 자동으로 암호화합니다
   - "일반 텍스트"로 표시되어도 실제로는 암호화되어 저장될 수 있습니다

### 방법 2: 기존 변수 삭제 후 재추가

1. **변수 편집하여 빈 값으로 만들기**
   - `ADMIN_TOKEN` 옆 연필 아이콘 클릭
   - 값을 빈 문자열(`""`)로 변경
   - 저장

2. **새 암호 변수 추가**
   - "+ 추가" 버튼 클릭
   - 유형: "암호" 선택
   - 이름: `ADMIN_TOKEN`
   - 값 입력
   - 저장

### 방법 3: 다른 이름으로 추가 (임시)

1. **새 암호 변수 추가**
   - "+ 추가" 버튼 클릭
   - 유형: "암호" 선택
   - 이름: `ADMIN_TOKEN_SECRET` (또는 다른 이름)
   - 값: `02aa3c5ef24829dd7efd3660008e9584443d755d975fd32c6fbdb228c9a76322`
   - 저장

2. **코드에서 사용**
   - Functions 코드에서 `ADMIN_TOKEN_SECRET` 사용
   - 또는 `ADMIN_TOKEN`이 없으면 `ADMIN_TOKEN_SECRET` 사용하도록 수정

### 방법 4: wrangler.toml만 사용 (가장 간단)

Dashboard 변수를 무시하고 `wrangler.toml`의 값만 사용:

1. **Dashboard 변수는 그대로 두기**
   - `ADMIN_TOKEN` (일반 텍스트) - 그대로 유지
   - Functions는 `wrangler.toml`의 값을 사용합니다

2. **wrangler.toml 확인**
   ```toml
   [vars]
   ADMIN_TOKEN = "02aa3c5ef24829dd7efd3660008e9584443d755d975fd32c6fbdb228c9a76322"
   NODE_ENV = "production"
   ```

3. **우선순위**
   - Dashboard 변수가 있으면 Dashboard 값 사용
   - 하지만 `wrangler.toml`의 값도 사용 가능

## 🔧 Functions 코드 확인

현재 Functions 코드는 `c.env.ADMIN_TOKEN`을 사용합니다:

```typescript
// functions/api/reports.ts
function verifyAdminToken(c: any): boolean {
  const token = c.req.header('Authorization')?.replace('Bearer ', '')
  return token === c.env.ADMIN_TOKEN
}
```

이 코드는 다음 순서로 변수를 찾습니다:
1. Dashboard의 환경 변수 (암호 > 일반 텍스트)
2. wrangler.toml의 `[vars]` 섹션

## 📋 최종 권장 설정

### 옵션 A: 기존 변수 유지 (가장 간단)

1. **Dashboard 변수 그대로 두기**
   - `ADMIN_TOKEN` (일반 텍스트) - 그대로 유지
   - 값이 올바른지 확인

2. **wrangler.toml 확인**
   - `[vars]` 섹션에 `ADMIN_TOKEN` 설정 확인

3. **재배포**
   - 새 커밋 푸시 또는 수동 재배포

### 옵션 B: 변수 편집하여 빈 값으로 만들기

1. **기존 변수 편집**
   - `ADMIN_TOKEN` 옆 연필 아이콘 클릭
   - 값을 빈 문자열로 변경
   - 저장

2. **새 암호 변수 추가**
   - "+ 추가" > 유형: "암호" > 이름: `ADMIN_TOKEN`
   - 값 입력 후 저장

## 🚀 Functions 404 오류 해결

환경 변수 설정과 관계없이 Functions가 404를 반환하는 경우:

1. **D1 Database 바인딩 확인**
   - Settings > Functions > D1 Database bindings
   - `DB` → `temon-db` 확인

2. **Functions 활성화 확인**
   - Settings > Functions
   - Functions 디렉토리: `functions` 확인

3. **재배포**
   - 새 커밋 푸시 또는 수동 재배포

## ✅ 체크리스트

- [ ] Dashboard의 `ADMIN_TOKEN` 값 확인 (올바른 값인지)
- [ ] wrangler.toml의 `ADMIN_TOKEN` 값 확인
- [ ] 재배포 완료
- [ ] `/api/health` 엔드포인트로 테스트

## 💡 참고

- Dashboard 변수가 있으면 Dashboard 값이 우선 적용됩니다
- "일반 텍스트"로 표시되어도 실제로는 암호화되어 저장될 수 있습니다
- wrangler.toml의 값도 사용 가능하므로, Dashboard 변수를 변경하지 않아도 됩니다

