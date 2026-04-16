# Cloudflare Pages 환경 변수 설정 가이드

## 📋 Cloudflare Pages 환경 변수 정책

Cloudflare Pages는 다음과 같은 정책을 따릅니다:

1. **일반 환경 변수**: `wrangler.toml`의 `[vars]` 섹션에서 관리
2. **암호화된 변수 (암호)**: Dashboard에서만 관리 가능

## 🔧 현재 설정 상태

### wrangler.toml에 설정된 변수

```toml
[vars]
ADMIN_TOKEN = "02aa3c5ef24829dd7efd3660008e9584443d755d975fd32c6fbdb228c9a76322"
NODE_ENV = "production"
```

### Dashboard에 설정된 변수

- `ADMIN_TOKEN` (일반 텍스트) ❌ → 암호로 변경 필요
- `NODE_ENV` (일반 텍스트) ❌ → wrangler.toml에서 관리해야 함

## ✅ 올바른 설정 방법

### 1. Dashboard에서 환경 변수 정리

1. **Cloudflare Dashboard 접속**
   - Pages > temon 프로젝트 > Settings > Environment Variables

2. **기존 변수 삭제**
   - `ADMIN_TOKEN` (일반 텍스트) 삭제
   - `NODE_ENV` 삭제

3. **ADMIN_TOKEN을 암호로 추가**
   - "+ 추가" 버튼 클릭
   - **유형**: "암호" (Encrypted) 선택
   - **이름**: `ADMIN_TOKEN`
   - **값**: `02aa3c5ef24829dd7efd3660008e9584443d755d975fd32c6fbdb228c9a76322`
   - 저장

### 2. wrangler.toml 확인

`wrangler.toml`의 `[vars]` 섹션은 그대로 유지:

```toml
[vars]
ADMIN_TOKEN = "02aa3c5ef24829dd7efd3660008e9584443d755d975fd32c6fbdb228c9a76322"
NODE_ENV = "production"
```

**참고**: 
- `wrangler.toml`의 변수는 로컬 개발 및 빌드 시 사용됩니다
- Dashboard의 암호는 프로덕션 환경에서 우선적으로 사용됩니다
- Dashboard에 암호가 설정되어 있으면, Dashboard 값이 우선 적용됩니다

## 🔐 ADMIN_TOKEN 관리 방법

### 옵션 1: Dashboard에서만 관리 (권장)

1. **Dashboard에서 암호로 설정**
   - Settings > Environment Variables
   - "+ 추가" > 유형: "암호" 선택
   - 이름: `ADMIN_TOKEN`
   - 값 입력 후 저장

2. **wrangler.toml에서 제거 (선택사항)**
   - 보안을 위해 `wrangler.toml`에서 `ADMIN_TOKEN` 제거 가능
   - 로컬 개발 시에는 별도 `.dev.vars` 파일 사용

### 옵션 2: wrangler.toml에서만 관리

1. **Dashboard에서 삭제**
   - Settings > Environment Variables
   - `ADMIN_TOKEN` 삭제

2. **wrangler.toml 유지**
   - 현재 설정 그대로 유지

**주의**: `wrangler.toml`은 Git에 커밋되므로, 실제 프로덕션 토큰을 넣지 마세요.

## 📝 NODE_ENV 설정

`NODE_ENV`는 `wrangler.toml`에서 관리하는 것이 좋습니다:

```toml
[vars]
NODE_ENV = "production"
```

Dashboard에서 `NODE_ENV`를 삭제하고, `wrangler.toml`에서만 관리하세요.

## 🚀 재배포

환경 변수 설정을 변경한 후:

1. **GitHub에 커밋 푸시** (자동 재배포)
2. **또는 Cloudflare Dashboard에서 수동 재배포**
   - Deployments > 최신 배포 > Retry deployment

## ✅ 체크리스트

- [ ] Dashboard에서 `ADMIN_TOKEN`을 "암호" 타입으로 설정
- [ ] Dashboard에서 `NODE_ENV` 삭제 (wrangler.toml에서 관리)
- [ ] wrangler.toml의 `[vars]` 섹션 확인
- [ ] 재배포 완료
- [ ] `/api/health` 엔드포인트로 Functions 테스트

## 🔍 Functions 404 오류 해결

환경 변수 설정 후에도 Functions가 404를 반환하는 경우:

1. **D1 Database 바인딩 확인**
   - Settings > Functions > D1 Database bindings
   - `DB` → `temon-db` 확인

2. **Functions 활성화 확인**
   - Settings > Functions
   - Functions 디렉토리: `functions` 확인

3. **재배포**
   - 새 커밋 푸시 또는 수동 재배포

## 📚 참고 자료

- [Cloudflare Pages Environment Variables](https://developers.cloudflare.com/pages/platform/build-configuration/#environment-variables)
- [Wrangler Configuration](https://developers.cloudflare.com/workers/wrangler/configuration/)

