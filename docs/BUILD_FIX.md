# 빌드 오류 해결 가이드

## 문제
Cloudflare Pages Functions 빌드 시 의존성 해결 실패:
- `ERROR: Could not resolve "hono"`
- `ERROR: Could not resolve "drizzle-orm/d1"`
- `ERROR: Could not resolve "../../../lib/drizzle/schema"`

## 원인
1. Functions 빌드 시점에 `node_modules`가 없음
2. Cloudflare Pages가 Functions를 별도로 빌드하는데 의존성을 찾지 못함
3. 빌드 명령에 `npm install`이 포함되지 않음

## 해결 방법

### 1. Cloudflare Dashboard 빌드 설정 (필수)

**Settings > Builds & deployments**에서 다음 설정:

```
Framework preset: Next.js
Build command: npm install && npm run build
Build output directory: out
Root directory: / (기본값)
```

**중요**: `npm install`을 반드시 포함해야 합니다!

### 2. 환경 변수 설정

**Settings > Environment Variables**에서:

```
NODE_VERSION=20
NODE_ENV=production
```

### 3. Functions 바인딩 설정

**Settings > Functions**에서:

- **D1 Database**:
  - Binding name: `DB`
  - Database: `temon-db` (또는 생성한 데이터베이스 이름)

- **KV Namespace** (선택사항):
  - Binding name: `SESSIONS`
  - Namespace: 생성한 KV 네임스페이스

### 4. 대안: Functions 최소화

만약 위 방법으로도 해결되지 않으면, Functions를 최소한으로 유지하고 Next.js API Routes를 사용할 수 있습니다.

## 확인 사항

1. ✅ `package.json`에 `hono`, `drizzle-orm` 포함 확인
2. ✅ `functions/` 디렉토리 구조 확인
3. ✅ `wrangler.toml` 설정 확인
4. ✅ Cloudflare Dashboard 빌드 설정 확인

## 참고

- Cloudflare Pages는 자동으로 `npm install`을 실행하지만, Functions 빌드 시점에 문제가 있을 수 있습니다
- 빌드 명령에 명시적으로 `npm install`을 포함하는 것이 안전합니다
- Functions는 런타임에 번들링되므로, 모든 의존성이 `package.json`에 있어야 합니다

