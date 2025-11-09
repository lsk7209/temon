# Functions 404 오류 해결 가이드

## 🔍 문제 상황

`/api/collect`와 `/api/reports` 엔드포인트가 404 오류를 반환하고 있습니다.

## ✅ 확인 사항

### 1. Cloudflare Pages Dashboard에서 Functions 활성화 확인

1. **Cloudflare Dashboard 접속**
   - Pages > temon 프로젝트 선택

2. **Settings > Functions 확인**
   - Functions가 활성화되어 있는지 확인
   - Functions 디렉토리가 인식되고 있는지 확인

3. **Functions 바인딩 확인**
   - D1 Database 바인딩: `DB` → `temon-db`
   - Environment Variables: `ADMIN_TOKEN` 설정 확인

### 2. Functions 파일 구조 확인

현재 Functions 파일 구조:
```
functions/
├── api/
│   ├── collect.ts    → /api/collect
│   ├── reports.ts    → /api/reports
│   └── health.ts     → /api/health
└── cron.ts           → /cron
```

모든 파일이 `onRequest` export를 사용하고 있습니다.

### 3. 배포 로그 확인

배포 로그에서 다음 메시지가 보여야 합니다:
```
Found Functions directory at /functions. Uploading.
✨ Compiled Worker successfully
```

## 🔧 해결 방법

### 방법 1: Cloudflare Dashboard에서 Functions 설정 확인

1. **Pages 프로젝트 > Settings > Functions**
   - Functions가 활성화되어 있는지 확인
   - Functions 디렉토리 경로: `functions` 확인

2. **D1 Database 바인딩 확인**
   - Settings > Functions > D1 Database bindings
   - `DB` → `temon-db` (ID: `b78fdac5-09b7-43b8-86db-133f5cd4c768`) 확인

3. **Environment Variables 확인**
   - Settings > Environment Variables
   - `ADMIN_TOKEN` 값 확인

### 방법 2: Functions 테스트

`/api/health` 엔드포인트로 Functions가 작동하는지 테스트:

```bash
curl https://temon.kr/api/health
```

예상 응답:
```json
{
  "status": "healthy",
  "db": {
    "connected": true,
    "message": "데이터베이스 연결 정상"
  },
  "timestamp": "2025-11-09T14:55:50.854Z"
}
```

### 방법 3: 재배포

Functions 설정을 변경한 후 재배포:

1. **GitHub에 새 커밋 푸시** (빈 커밋도 가능)
2. **또는 Cloudflare Dashboard에서 수동 재배포**
   - Deployments > 최신 배포 > Retry deployment

## 📋 체크리스트

- [ ] Cloudflare Pages Dashboard에서 Functions 활성화 확인
- [ ] D1 Database 바인딩 확인 (`DB` → `temon-db`)
- [ ] Environment Variables 확인 (`ADMIN_TOKEN`)
- [ ] `/api/health` 엔드포인트 테스트
- [ ] 재배포 완료

## 🚨 추가 문제 해결

### Functions가 여전히 404를 반환하는 경우

1. **Functions 디렉토리 확인**
   - `functions/` 디렉토리가 프로젝트 루트에 있는지 확인
   - Git에 커밋되어 있는지 확인

2. **wrangler.toml 확인**
   - `pages_build_output_dir = "out"` 설정 확인
   - D1 Database 바인딩 설정 확인

3. **Cloudflare Support 문의**
   - Functions가 활성화되어 있지만 작동하지 않는 경우
   - Cloudflare Support에 문의

## 📝 참고

- Cloudflare Pages Functions는 파일 기반 라우팅을 사용합니다
- `functions/api/collect.ts` → `/api/collect`
- `functions/api/reports.ts` → `/api/reports`
- `output: 'export'`를 사용해도 Functions는 별도로 작동합니다

