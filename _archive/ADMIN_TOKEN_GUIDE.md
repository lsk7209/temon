# ADMIN_TOKEN 설정 가이드

## 📋 ADMIN_TOKEN이란?

`ADMIN_TOKEN`은 관리자 대시보드 API(`/api/reports`)에 접근하기 위한 **인증 토큰**입니다.

### 사용 목적
- `/api/reports` 엔드포인트 보호
- 통계 데이터 무단 접근 방지
- 관리자만 대시보드 데이터 조회 가능

---

## 🔑 ADMIN_TOKEN 생성 방법

### 방법 1: 랜덤 문자열 생성 (권장)

#### 온라인 도구 사용
- https://www.random.org/strings/ 접속
- Length: 32-64자
- Character set: Alphanumeric
- Generate 버튼 클릭

#### 터미널에서 생성 (Mac/Linux)
```bash
openssl rand -hex 32
```

#### 터미널에서 생성 (Windows PowerShell)
```powershell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_})
```

#### Node.js로 생성
```javascript
require('crypto').randomBytes(32).toString('hex')
```

### 방법 2: 간단한 비밀번호 (개발용, 비권장)

프로덕션에서는 사용하지 마세요:
- 예: `my-admin-secret-2024`
- 예: `temon-analytics-token-12345`

---

## ✅ 권장 ADMIN_TOKEN 예시

**안전한 토큰 예시:**
```
a3f8b9c2d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2
```

또는

```
TemonAdmin2024!SecureToken#Analytics@Dashboard$SecretKey
```

**요구사항:**
- 최소 32자 이상 권장
- 영문, 숫자, 특수문자 조합
- 예측하기 어려운 랜덤 문자열

---

## 🔧 ADMIN_TOKEN 설정 방법

### 1. Cloudflare Pages Dashboard에서 설정 (프로덕션)

1. **Cloudflare Dashboard 접속**
   - https://dash.cloudflare.com 접속
   - 로그인

2. **Pages 프로젝트 설정**
   - **Workers & Pages** > **Pages**
   - `temon` 프로젝트 선택

3. **Settings 탭 클릭**

4. **Environment Variables 섹션으로 스크롤**

5. **Production 환경 변수 추가**
   - **Variable name**: `ADMIN_TOKEN`
   - **Value**: 생성한 토큰 값 입력
   - **Save** 버튼 클릭

### 2. wrangler.toml에 설정 (로컬 개발용)

```toml
[vars]
ADMIN_TOKEN = "your-generated-token-here"
NODE_ENV = "production"
```

**주의**: wrangler.toml은 Git에 커밋되므로, 실제 프로덕션 토큰을 넣지 마세요. 개발용 토큰만 사용하세요.

---

## 🔐 ADMIN_TOKEN 사용 흐름

### 1. 관리자 로그인
- `/admin` 페이지에서 비밀번호 입력 (현재: `1234`)
- 로그인 성공 시 localStorage에 토큰 저장

### 2. 대시보드 접근
- `/dashboard` 페이지 접속
- localStorage에서 `admin_token` 읽기
- API 호출 시 `Authorization: Bearer {token}` 헤더로 전송

### 3. API 검증
- `/api/reports` 엔드포인트에서 토큰 검증
- `c.env.ADMIN_TOKEN`과 비교
- 일치하면 데이터 반환, 불일치하면 401 오류

---

## ⚠️ 보안 주의사항

### ❌ 하지 말아야 할 것
- Git에 실제 ADMIN_TOKEN 커밋
- 공개 저장소에 토큰 노출
- 짧거나 예측 가능한 토큰 사용
- 여러 환경에서 동일한 토큰 사용

### ✅ 해야 할 것
- Cloudflare Dashboard에서만 설정
- 강력한 랜덤 토큰 사용
- 정기적으로 토큰 변경
- 환경별로 다른 토큰 사용

---

## 🔄 ADMIN_TOKEN 변경 방법

1. **새 토큰 생성**
   - 위의 방법으로 새 토큰 생성

2. **Cloudflare Dashboard에서 업데이트**
   - Pages 프로젝트 > Settings > Environment Variables
   - `ADMIN_TOKEN` 변수 편집
   - 새 토큰 값 입력
   - Save

3. **기존 세션 정리**
   - 브라우저에서 localStorage의 `admin_token` 삭제
   - `/admin` 페이지에서 다시 로그인

---

## 🧪 ADMIN_TOKEN 테스트

### 브라우저 콘솔에서 테스트

```javascript
// 1. 토큰 설정
localStorage.setItem('admin_token', 'your-admin-token-here')

// 2. API 호출 테스트
fetch('/api/reports', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
  }
})
.then(res => res.json())
.then(data => console.log('Success:', data))
.catch(err => console.error('Error:', err))
```

### 성공 응답
```json
{
  "kpi": { ... },
  "funnel": { ... },
  ...
}
```

### 실패 응답 (401)
```json
{
  "error": "Unauthorized"
}
```

---

## 📝 현재 설정 상태

현재 `wrangler.toml`에는 빈 문자열로 설정되어 있습니다:
```toml
ADMIN_TOKEN = "" # 배포 시 설정 필요
```

**다음 단계:**
1. 위의 방법으로 ADMIN_TOKEN 생성
2. Cloudflare Dashboard에서 환경 변수로 설정
3. 대시보드 접속하여 확인

---

## 🔗 관련 문서

- [D1 설정 가이드](./D1_SETUP_INSTRUCTIONS.md)
- [대시보드 설정 가이드](./DASHBOARD_SETUP_GUIDE.md)
- [상태 확인 가이드](./STATUS_CHECK.md)

