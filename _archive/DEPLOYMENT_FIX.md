# Cloudflare Pages 배포 설정 수정 가이드

## 🔍 발견된 문제

배포 로그에서 다음 문제가 발견되었습니다:

1. ❌ **빌드가 실행되지 않음**: `No build command specified. Skipping build step.`
2. ❌ **Functions 라우트를 찾을 수 없음**: `No routes found when building Functions directory`
3. ⚠️ **wrangler.toml이 제대로 인식되지 않음**

## ✅ 해결 방법

### 방법 1: Cloudflare Pages Dashboard 설정 (권장)

Cloudflare Pages는 Dashboard에서 빌드 설정을 우선적으로 사용합니다.

1. **Cloudflare Dashboard 접속**
   - Pages > Your Project > Settings > Builds & deployments

2. **빌드 설정 추가**
   - Framework preset: `Next.js`
   - Build command: `npm run build`
   - Build output directory: `.next`
   - Root directory: `/` (기본값)

3. **환경 변수 설정**
   - Pages > Settings > Environment Variables
   - 다음 변수 추가:
     - `NEXT_PUBLIC_GA_ID`
     - `NEXT_PUBLIC_ADSENSE_CLIENT_ID`
     - `NEXT_PUBLIC_APP_URL`
     - `NODE_ENV=production`

4. **재배포**
   - Settings > Builds & deployments > Retry deployment
   - 또는 새 커밋을 푸시하여 자동 재배포

### 방법 2: Functions 구조 개선

현재 `functions/index.ts`는 Hono 앱을 export하지만, Cloudflare Pages Functions는 파일 기반 라우팅을 사용합니다.

**해결책**: `functions/_worker.ts` 파일을 생성하여 Hono 앱을 export합니다.

```typescript
// functions/_worker.ts
import app from './index'
export default app
```

또는 `functions/index.ts`를 `functions/_worker.ts`로 이름 변경할 수 있습니다.

### 방법 3: wrangler.toml 개선

`wrangler.toml`은 주로 Workers 배포용이지만, Pages에서도 일부 설정을 읽습니다.

**현재 설정 확인**:
- `pages_build_output_dir`가 올바르게 설정되어 있는지 확인
- Dashboard 설정이 우선되므로, Dashboard에서도 설정해야 함

## 📋 체크리스트

배포 전 확인사항:

- [ ] Cloudflare Pages Dashboard에서 빌드 설정 확인
  - [ ] Framework preset: Next.js
  - [ ] Build command: `npm run build`
  - [ ] Build output directory: `.next`
  
- [ ] 환경 변수 설정 확인
  - [ ] `NEXT_PUBLIC_GA_ID`
  - [ ] `NEXT_PUBLIC_ADSENSE_CLIENT_ID`
  - [ ] `NEXT_PUBLIC_APP_URL`
  - [ ] `NODE_ENV=production`

- [ ] Functions 구조 확인
  - [ ] `functions/_worker.ts` 파일 존재 (또는 `functions/index.ts`)
  - [ ] Hono 앱이 올바르게 export되는지 확인

- [ ] D1 데이터베이스 바인딩 확인
  - [ ] Cloudflare Pages Dashboard > Settings > Functions
  - [ ] D1 데이터베이스 바인딩 설정 확인

- [ ] KV 네임스페이스 바인딩 확인
  - [ ] Cloudflare Pages Dashboard > Settings > Functions
  - [ ] KV 네임스페이스 바인딩 설정 확인

## 🔧 Functions 파일 구조

Cloudflare Pages Functions는 다음 구조를 지원합니다:

```
functions/
├── _worker.ts          # 전역 Worker (모든 요청 처리)
├── api/
│   ├── collect.ts      # /api/collect
│   └── reports.ts      # /api/reports
└── cron.ts             # /cron
```

또는 Hono를 사용하는 경우:

```
functions/
├── _worker.ts          # Hono 앱 export
└── api/
    ├── collect.ts      # Hono 라우터
    └── reports.ts      # Hono 라우터
```

## 🚀 빠른 수정

1. **functions/_worker.ts 생성** (이미 완료됨)
2. **Cloudflare Dashboard에서 빌드 설정 추가**
3. **재배포**

## 📚 참고 자료

- [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/platform/functions/)
- [Cloudflare Pages Build Configuration](https://developers.cloudflare.com/pages/platform/build-configuration/)
- [Next.js on Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/nextjs/)

---

**수정일**: 2025년 1월

