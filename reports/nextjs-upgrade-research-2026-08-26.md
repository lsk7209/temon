# temon.kr Next.js 14.2.35 → 16.x 업그레이드 조사 리포트

- 조사일: 2026-08-26 (KST)
- 대상 저장소: `D:/web/temon`
- 현재 버전: `next@14.2.35`, `react@18`, `react-dom@18`
- 조사 시점 npm 최신 안정판: `next@16.3.3`
- 범위: 조사 및 계획 수립만 수행. 패키지·애플리케이션 코드·배포 설정은 변경하지 않음.

## 1. 결론 요약

이 프로젝트는 Next.js 16으로 올릴 수 있지만, **14에서 16으로 한 번에 패키지만 교체하는 방식은 권장하지 않는다.** `14 → 15 → 16` 순서로 나누어 각 단계의 빌드와 핵심 경로를 검증해야 한다.

가장 큰 실제 작업은 다음 네 가지다.

1. App Router 동적 라우트의 `params`·`searchParams`를 Promise 기반 비동기 API로 전환한다. Next.js 15에서는 동기 접근이 임시 허용되지만, 16에서는 제거된다.
2. `middleware.ts`가 사용하는 `NextRequest.ip`를 제거하거나 Vercel의 `ipAddress()`로 교체한다. 이 속성은 Next.js 15에서 제거되었다.
3. React 18에서 React 19 계열로 올리고, 820개 TSX 파일 가운데 주요 클라이언트 테스트 흐름과 서드파티 컴포넌트 호환성을 검증한다.
4. Next.js 16의 기본 빌더인 Turbopack에서 Drizzle/libSQL 서버 번들, 폰트, 동적 라우트, AdSense/GA 스크립트가 정상 동작하는지 검증한다.

현재 저장소의 명시적 `export const revalidate`는 10개 파일에 있다. **Next.js 16으로 올린다는 이유만으로 이를 `use cache`로 바꿀 필요는 없다.** `cacheComponents`는 opt-in이며, 활성화하지 않으면 기존 캐시 모델과 `revalidate`를 계속 사용할 수 있다. 이번 업그레이드와 Cache Components 도입은 분리하는 편이 안전하다.

## 2. 공식 요구사항과 목표 버전

Next.js 16의 공식 최소 요구사항은 Node.js 20.9+, TypeScript 5.1+, Chrome/Edge 111+, Firefox 111+, Safari 16.4+다. 현재 조사 환경의 Node.js는 `v24.12.0`, TypeScript 의존성은 `^5`이므로 로컬 최소 요건은 충족하지만, Vercel과 CI의 Node 버전은 실제 업그레이드 전에 별도로 고정·확인해야 한다.

Next.js 15부터 App Router의 최소 React/React DOM 버전은 19다. 따라서 `next`, `react`, `react-dom`, `eslint-config-next`, `@types/react`, `@types/react-dom`을 한 세트로 다뤄야 한다.

공식 출처:

- [Next.js 15 업그레이드 가이드](https://nextjs.org/docs/app/guides/upgrading/version-15)
- [Next.js 16 업그레이드 가이드](https://nextjs.org/docs/app/guides/upgrading/version-16)
- [공식 Codemods 가이드](https://nextjs.org/docs/app/guides/upgrading/codemods)
- [Next.js 16 릴리스 공지](https://nextjs.org/blog/next-16)

## 3. 14 → 15 breaking changes

### 3.1 P0: Async Request APIs 도입

Next.js 15에서 다음 API가 비동기로 바뀌었다.

- `cookies()`, `headers()`, `draftMode()`
- App Router `page`, `layout`, `route`, `default`, 이미지 메타데이터 파일의 `params`
- `page`의 `searchParams`

15에는 동기 호환 계층이 있어 경고와 함께 동작할 수 있지만, 16에서는 동기 접근이 완전히 제거된다. 따라서 15 단계에서 모두 수정하고 경고를 제거해야 한다.

temon 영향:

- 정적 검색에서 동기식 `params: { ... }` 후보가 9개 파일에서 확인됐다.
- 우선 확인 파일: `app/tests/[testId]/page.tsx`, `app/tests/[testId]/test/page.tsx`, `app/tests/[testId]/test/layout.tsx`, `app/tests/[testId]/test/result/page.tsx`, `app/tests/[testId]/test/result/layout.tsx`, `app/tests/[testId]/test/result/[resultId]/page.tsx`, `app/test/[slug]/page.tsx`, `app/blog/[slug]/page.tsx`, `app/api/tests/[testId]/submit/route.ts`.
- `generateMetadata`도 동일한 Promise형 `params`를 받도록 바꿔야 하므로 페이지 함수만 고치면 끝나지 않는다.
- `lib/admin-auth.ts`와 `app/api/admin/login/route.ts`의 `cookies()`/`headers()`는 이미 `await`를 사용해 상대적으로 안전하다.

권장 형태:

```tsx
export default async function Page(props: PageProps<'/tests/[testId]'>) {
  const { testId } = await props.params
  // ...
}
```

Next.js 15.5 이상에서는 `npx next typegen`으로 `PageProps`, `LayoutProps`, `RouteContext` 전역 타입을 생성할 수 있다.

### 3.2 P0: `NextRequest.ip`와 `NextRequest.geo` 제거

Next.js 15는 `NextRequest.ip`와 `NextRequest.geo`를 제거했다. Vercel에서는 `@vercel/functions`의 `ipAddress()` 및 `geolocation()`을 사용할 수 있다.

temon의 `middleware.ts`는 현재 `request.ip`를 rate-limit 키의 fallback으로 직접 사용한다. 이 파일은 15 업그레이드 시 타입 오류 또는 동작 차이가 발생할 가능성이 높다. 이미 `x-forwarded-for`, `x-real-ip`를 우선 사용하므로 선택지는 다음과 같다.

- 헤더 기반 처리만 남기고 `request.ip` fallback을 제거한다.
- Vercel 공식 `ipAddress(request)`로 교체한다. 이 경우 `@vercel/functions` 의존성 및 로컬/비-Vercel 동작을 함께 검증한다.

참고로 현재 메모리 기반 rate limiter는 Edge/Node 인스턴스 간 전역 제한을 보장하지 않는다. 이는 기존 설계 문제이며, 프레임워크 업그레이드 범위에서 Redis/KV로 확대하지 않는 것이 좋다.

### 3.3 P0/P1: React 19 전환

Next.js 15 App Router는 React 19를 요구한다. React 19 자체의 변경과 타입 변경 때문에 다음을 확인해야 한다.

- React/React DOM 및 타입 패키지 동시 업그레이드
- `useFormState` 사용 시 `useActionState` 전환 검토
- ref callback 반환값, JSX 타입, Context provider 등 React 19 타입 변경
- Radix UI, `react-day-picker`, `recharts`, `react-hook-form`, `embla-carousel-react`, `sonner`, `vaul` 등 UI 의존성의 React 19 peer 호환성

temon은 TSX 파일이 약 820개이고 정적 퀴즈 페이지가 대량 복제된 구조다. 실제 breaking 패턴이 공통 템플릿에 집중돼 있더라도 전체 타입체크/빌드에서 노출되는 오류 수가 많을 수 있다.

### 3.4 P1: 캐싱 기본값 변경

Next.js 15에서 다음 기본값이 바뀌었다.

- 서버 `fetch()`는 기본 캐시되지 않는다. 필요한 호출은 `{ cache: 'force-cache' }`, `next: { revalidate: n }` 또는 세그먼트 `fetchCache`를 명시해야 한다.
- Route Handler의 `GET`은 기본 캐시되지 않는다. 정적 캐시가 필요한 handler는 `dynamic = 'force-static'` 등으로 opt-in한다.
- 클라이언트 Router Cache에서 page segment는 기본 재사용되지 않는다. 레이아웃과 loading state, 뒤로/앞으로 탐색은 별도 동작을 유지한다.

temon 영향:

- `export const revalidate`가 10개 파일에서 확인됐다. 예: `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`, `app/api/stats/route.ts`, `app/feed.xml/route.ts`, `app/llms.txt/route.ts`.
- 특히 `GET` Route Handler에 `revalidate`만 둔 경우, 15의 “GET 기본 미캐시”와 실제 기대가 일치하는지 빌드 산출물 및 응답 헤더로 검증해야 한다. 필요하면 `dynamic = 'force-static'`을 명시한다.
- Drizzle/libSQL 쿼리는 `fetch()`가 아니므로 `fetch` 캐시 기본값 변화가 자동 적용되지 않는다. DB 조회 캐시가 필요하면 기존 route-level ISR 동작을 확인하거나 `unstable_cache`/캐시 API를 명시적으로 설계해야 한다.

### 3.5 P2: 기타 15 변경

- `experimental-edge` runtime 값은 오류가 되며 `edge`를 써야 한다. 현재 정적 검색에서는 해당 설정이 확인되지 않았다.
- `experimental.serverComponentsExternalPackages`는 `serverExternalPackages`로, `experimental.bundlePagesExternals`는 `bundlePagesRouterDependencies`로 이동했다. 현재 `next.config.mjs`에는 둘 다 없다.
- Speed Insights 자동 계측이 제거됐지만, temon은 `@vercel/speed-insights/next`의 `<SpeedInsights />`를 직접 렌더링하므로 영향이 제한적이다.
- `next/image`의 `contentDispositionType` 기본값이 `attachment`로 바뀌었다. temon은 현재 `next/image` import가 0개여서 직접 영향이 거의 없다.
- Next.js 15.2부터 `generateMetadata` 스트리밍이 도입됐다. Googlebot에는 일반적으로 문제가 없지만, 공유 카드·검색 미리보기 경로는 HTML 제한 봇 동작까지 확인해야 한다. [공식 generateMetadata 문서](https://nextjs.org/docs/15/app/api-reference/functions/generate-metadata)

## 4. 15 → 16 breaking changes

### 4.1 P0: 동기 Request API 호환 완전 제거

15에서 경고만 내던 동기 `params`, `searchParams`, `cookies`, `headers`, `draftMode` 접근은 16에서 더 이상 허용되지 않는다. 15 단계에서 미완료된 항목이 있으면 16 빌드가 막힌다.

또한 동적 `opengraph-image`, `twitter-image`, `icon`, `apple-icon` 생성 함수의 `params` 및 이미지 `id`, 분할 sitemap의 `id`도 Promise가 된다. 현재 temon의 `app/api/og/route.tsx`는 일반 Route Handler이며 해당 파일 규약은 쓰지 않지만, 향후 추가된 파일이 없는지 업그레이드 직전 재검색해야 한다.

### 4.2 P0/P1: Turbopack이 dev/build 기본값

Next.js 16은 `next dev`와 `next build`에서 Turbopack을 기본 사용한다. custom webpack 설정이 있으면 빌드가 실패할 수 있으며, 필요하면 임시로 `next build --webpack`으로 opt-out할 수 있다.

temon의 `next.config.mjs`에는 custom `webpack` 함수가 없으므로 명백한 차단 요소는 없다. 다만 다음을 검증해야 한다.

- `drizzle-orm/libsql` 및 `@libsql/client`의 서버 전용 번들
- `next/font/google`의 Inter 빌드
- 경로 alias와 대량의 App Router 페이지
- 빌드 시 DB 환경변수가 없을 때 `lib/db/client.ts`가 안전하게 null을 유지하는지
- Vercel 빌드와 로컬 빌드 결과 차이

문제 발생 시 16 전환을 취소할 필요는 없고, 먼저 `next build --webpack`으로 프레임워크 breaking change와 bundler 문제를 분리할 수 있다.

### 4.3 P1: `middleware.ts` → `proxy.ts` 전환

Next.js 16에서 `middleware` 파일 규약은 deprecated이고 `proxy`로 이름이 바뀌었다. 공식 codemod는 파일명, export 함수명, 관련 config flag를 바꿀 수 있다.

중요한 런타임 차이:

- `proxy`는 Node.js runtime이며 Edge runtime을 지원하지 않는다.
- Edge runtime을 꼭 유지해야 하면 당분간 deprecated `middleware`를 유지할 수 있다.

temon의 `middleware.ts`는 주석상 Edge를 전제로 하고, 모듈 전역 `Map` rate limiter를 사용한다. Node proxy로 바꾸면 문법상 큰 문제는 없을 가능성이 높지만 인스턴스 수명·메모리·IP 처리 의미를 다시 검증해야 한다. **15 단계에서 먼저 `request.ip`를 해결하고, 16 단계에서 proxy 전환을 별도 커밋으로 분리**하는 것이 좋다.

### 4.4 P1: `next/image` 기본값 및 보안 변경

Next.js 16의 실제 변경은 다음과 같다.

- 로컬 이미지 URL에 query string이 있으면 `images.localPatterns.search` 허용 설정 필요
- 기본 `minimumCacheTTL`: 60초 → 4시간
- 기본 `imageSizes`에서 16 제거
- 허용 quality 기본값이 모든 값 → `[75]`
- 로컬 IP 이미지 최적화 기본 차단
- 이미지 redirect 기본 최대 3회
- `next/legacy/image`, `images.domains` deprecated

temon은 `next/image` import가 없고 `next.config.mjs`에서 `minimumCacheTTL: 86400`을 이미 명시한다. 따라서 TTL 기본값 변화는 적용되지 않으며, 이미지 관련 직접 코드 수정 가능성은 낮다. 다만 향후 `<Image>` 도입을 고려해 `qualities`와 `remotePatterns`를 명시할지는 별도 최적화 과제로 두면 된다.

### 4.5 P1/P2: 캐시 API와 Cache Components

- `cacheLife`, `cacheTag`가 stable이 되고 `unstable_` prefix 제거 codemod가 제공된다.
- `revalidateTag`의 권장 signature가 cache-life profile 두 번째 인자를 받는 형태로 바뀌었다.
- `cacheComponents`는 opt-in이다. 켜면 기존 `dynamic`, `revalidate`, `fetchCache` 세그먼트 설정을 `use cache`와 `cacheLife` 중심으로 재설계해야 한다.
- `experimental.dynamicIO`와 기존 experimental PPR 설정은 제거·대체된다.

temon은 현재 `cacheComponents`를 사용하지 않는다. 따라서 **16 업그레이드 시 이를 활성화하지 말 것**을 권장한다. 10개 `revalidate` 파일과 DB 기반 페이지의 캐싱 의미를 한 번에 바꾸면 업그레이드 원인과 캐시 설계 원인을 분리하기 어렵다. [기존 캐시 모델 문서](https://nextjs.org/docs/app/guides/caching-without-cache-components), [Cache Components 마이그레이션](https://nextjs.org/docs/app/guides/migrating-to-cache-components)

### 4.6 P2: 제거된 기능과 도구

- `next lint` 명령이 제거되고 `next build`도 lint를 실행하지 않는다. temon의 `package.json`은 현재 `"lint": "next lint"`이므로 반드시 ESLint CLI로 바꿔야 한다.
- Next config의 `eslint` 옵션, AMP 지원, `serverRuntimeConfig`/`publicRuntimeConfig`, 일부 `devIndicators` 옵션, `unstable_rootParams`가 제거됐다. 현재 저장소 정적 점검에서는 사용이 확인되지 않았다.
- Node.js 18 지원이 제거되고 Node 20.9+가 필요하다.

## 5. temon 실제 패턴별 우선순위

| 우선순위 | 패턴 | 로컬 근거 | 예상 대응 |
|---|---|---|---|
| P0 | 동기 `params`/`searchParams` | 후보 9개 파일, 동적 test/blog/API 라우트 | Promise 타입, `await`, `generateMetadata` 동시 수정; codemod 후 수동 검토 |
| P0 | 제거된 `NextRequest.ip` | `middleware.ts` | 헤더 fallback 또는 Vercel `ipAddress()`로 교체 |
| P0 | React 19 | 현재 `react@18`, TSX 약 820개 | 패키지/타입 동시 업그레이드, 전체 build 및 대표 UI 회귀 |
| P1 | ISR/Route Handler 캐시 | `revalidate` 10개 파일 | 15 기본값 기준 응답/빌드 확인, 필요한 GET만 명시적 static cache |
| P1 | Drizzle/libSQL | 관련 import 22개 파일, `lib/db/client.ts` | Turbopack 서버 번들, build-time env 부재, 런타임 DB smoke test |
| P1 | `next/script` AdSense/GA | import 10개 파일, `components/adsense-script.tsx`, `app/layout.tsx` | API breaking은 없음. React 19/Turbopack 후 script 1회 로드, 경로 gating, CSP, 광고 비활성 기본값 검증 |
| P1 | middleware → proxy | `middleware.ts` 1개 | 16 codemod 가능; Node runtime 의미 검증 후 별도 변경 |
| P2 | Metadata API | 동적 `generateMetadata` 후보 6개 이상 | async params 수정, head/OG/canonical 및 HTML-limited bot 검증 |
| P2 | `next/image` | import 0개, TTL 86400 명시 | 직접 수정 거의 없음; config만 호환 확인 |
| P2 | lint CLI | `npm run lint = next lint` | ESLint CLI 및 설정 파일로 마이그레이션 |

### AdSense/`next/script` 판단

14→16 공식 업그레이드 문서에는 `next/script` 컴포넌트 자체의 별도 breaking change가 없다. 현재 방식처럼 inline script에 `id`를 주고, root layout 또는 대상 컴포넌트에서 로드하는 것은 16 문서에도 유효하다. [공식 Scripts 가이드](https://nextjs.org/docs/app/guides/scripts)

다만 temon의 광고는 기술적 정상 로드만으로 완료 판단하면 안 된다.

- `NEXT_PUBLIC_ADSENSE_DELIVERY_ENABLED`가 false일 때 계속 fail-closed인지
- 적격 경로에서 `#adsense-loader`가 정확히 한 번만 생성되는지
- 비적격/`noindex`/결과 페이지에서 현재 gating 정책이 유지되는지
- Auto Ads가 콘텐츠 내부에 추가 삽입되지 않는지

기존 handoff에는 실제 프로덕션에서 결과 페이지에 7개 광고와 vignette가 나타나 롤백한 기록이 있다. 따라서 프레임워크 업그레이드 검증 중 **결과 페이지 광고 env를 다시 켜거나 AdSense 설정을 변경해서는 안 된다.**

## 6. 공식 codemod 사용 가능 여부

사용 가능하다. 공식 권장 상위 명령은 다음이다.

```bash
npx @next/codemod@canary upgrade latest
```

조사 시점 공식 문서는 16 업그레이드에 `@next/codemod@canary`를 권장한다. 일반 codemod 문서에서는 안정판 변환에 `@latest`도 제공한다. 실제 실행 전 브랜치와 lockfile을 보존하고 dry review가 가능하도록 작은 단계로 나누는 편이 좋다.

관련 개별 codemod:

```bash
npx @next/codemod@latest next-async-request-api .
npx @next/codemod@latest middleware-to-proxy .
npx @next/codemod@latest next-lint-to-eslint-cli .
```

16용 upgrade codemod는 다음을 자동화할 수 있다.

- Next config의 Turbopack 설정 이동
- `next lint` → ESLint CLI
- `middleware` → `proxy`
- stabilized API의 `unstable_` prefix 제거
- experimental PPR segment config 제거

한계:

- async codemod가 자동 변환하지 못한 곳에는 typecast 또는 수동 검토 주석을 남길 수 있다.
- DB 캐시 의도, Route Handler가 정적이어야 하는지, AdSense gating, proxy의 런타임 의미는 codemod가 판단할 수 없다.
- 따라서 codemod 실행 성공은 업그레이드 완료 증거가 아니다.

## 7. 예상 작업 규모와 위험도

### 현실적 추정

- 직접 변경 예상: **15~30개 파일**
- 추가 검증 대상: **대표 경로 및 구성 파일 15~25개**, 전체 build는 약 766개 `app/` 파일을 포함
- 예상 엔지니어링 시간: **2~4 작업일**
  - 14→15 코드/의존성 마이그레이션: 0.5~1.5일
  - 15 안정화 및 캐시/라우트 검증: 0.5~1일
  - 15→16, proxy/lint/Turbopack: 0.5~1일
  - 회귀·프로덕션 전 검증: 0.5~1일
- 종합 위험도: **중상(High-Medium)**

파일 수가 15~30개로 추정되는 이유:

- 동적 request props 후보 9개
- middleware/proxy 1개
- package/lock/eslint/config 4~6개
- cache/revalidate 판단 대상 중 실제 수정 가능 파일 일부
- React 19 타입 오류가 발생하는 UI 파일 수는 codemod/임시 브랜치 빌드 전에는 확정 불가

위험의 중심은 코드 양보다 동작 의미다. 정적 퀴즈가 많아 한 공통 오류가 수백 경로에 전파될 수 있고, DB 기반 동적 페이지와 ISR/Route Handler 캐시가 섞여 있으며, 광고 로더는 정책·수익 영향이 있다.

## 8. 권장 실행 순서

1. 별도 업그레이드 브랜치에서 현재 14.2.35 build와 대표 route baseline을 저장한다.
2. Node/CI/Vercel runtime을 20.9+로 확인하고 React 19 호환 의존성 표를 확정한다.
3. 14→15만 수행한다. async request API codemod 후 9개 후보와 metadata/route handler를 수동 점검한다.
4. `request.ip`를 해결하고, `next lint`는 아직 15에서 ESLint CLI로 선행 전환한다.
5. 15 build와 대표 경로를 통과시키고 캐시/ISR 응답을 확인한다.
6. 15→16을 수행한다. 먼저 Webpack opt-out 가능성을 유지한 채 framework 변경을 검증한다.
7. Turbopack build를 통과시키고 Drizzle/libSQL 및 font/script 번들을 확인한다.
8. `middleware-to-proxy`는 별도 변경으로 수행하고 인증, rate limit, CSP, API matcher를 검증한다.
9. Cache Components는 활성화하지 않는다. 별도 프로젝트로 평가한다.
10. 광고 delivery는 현재 운영 env 상태를 유지한 채 script 존재/부재만 검증한다. 결과 페이지 광고 재활성화는 업그레이드 범위 밖이다.

필수 회귀 경로 예시:

- `/`, `/tests`, `/blog`, `/blog/[slug]`
- `/tests/[testId]`, `/tests/[testId]/test`, 결과 페이지 2종
- `/api/stats`, `/api/results`, `/api/tests/[testId]/submit`
- `/rss.xml`, `/feed.xml`, `/sitemap.xml`, `/llms.txt`
- `/admin` 및 `/api/admin/*` 인증 거부/허용
- AdSense 적격 페이지와 비적격/결과 페이지의 loader 개수

## 9. 지금 당장 하지 말아야 할 이유

**오늘 바로 production 업그레이드를 시작하지 않는 것이 타당하다.** 이유는 다음과 같다.

1. 현재 저장소는 AdSense 결과 페이지 롤백 직후이며, handoff에 별도 계정-side Auto Ads exclusion이 선행돼야 한다고 기록돼 있다. 프레임워크 업그레이드와 광고 동작 변화를 동시에 섞으면 원인 분리가 어렵다.
2. 현재 `request.ip`라는 확정 breaking point와 동기 route props 후보가 남아 있어 패키지 버전만 바꾸면 실패 가능성이 높다.
3. React 19 전환은 Next.js만의 변경이 아니며, 다수 UI 패키지와 820개 TSX 파일의 타입·런타임 회귀 범위를 동반한다.
4. Next.js 16은 Turbopack을 build 기본값으로 바꾸므로, 프레임워크·React·bundler를 한 번에 변경하면 장애 진단 비용이 커진다.
5. 현재 npm 최신 16.x는 16.3.3이지만, 배포 목표 버전은 “최신” 부동값이 아니라 검증한 정확한 patch 버전으로 고정해야 한다.

따라서 보류 사유는 “Next.js 16이 불안정해서”가 아니라, **운영 광고 상태 안정화, baseline 확보, 15 중간 단계 검증 없이 즉시 production에 올리는 것이 불필요하게 위험하기 때문**이다. 보안 패치 또는 플랫폼 지원 종료가 임박했다면 업그레이드 브랜치 조사와 15 단계 작업은 바로 시작할 수 있으나, production 전환은 별도 승인·검증 창에서 해야 한다.

## 10. 최종 권고

- 목표 버전은 조사 시점의 `16.3.3`처럼 **정확한 16.x patch로 고정**한다.
- `14.2.35 → 최신 15.x → 고정 16.x`의 두 단계 변경으로 진행한다.
- codemod는 사용하되, async props·middleware IP·캐시 의도·광고 gating은 수동 리뷰 대상으로 남긴다.
- `cacheComponents`와 광고 재활성화는 이번 프레임워크 업그레이드에서 제외한다.
- 착수 전 최소 조건은 현재 production baseline, Node/Vercel runtime 확인, React 19 dependency 호환성 확인, 대표 route 회귀 목록 확정이다.

## 11. 출처 및 최신성

모든 외부 핵심 판단은 2026-03에 갱신된 Next.js 공식 업그레이드 문서를 우선 사용했다. 2024년 Next.js 15 릴리스 글은 배경 자료로만 사용하고, 현재 동작 판단은 2026년판 공식 가이드를 따랐다.

- [Next.js 15 업그레이드 가이드](https://nextjs.org/docs/app/guides/upgrading/version-15) — React 19, Async Request APIs, cache defaults, `NextRequest.ip/geo`
- [Next.js 16 업그레이드 가이드](https://nextjs.org/docs/app/guides/upgrading/version-16) — runtime 요건, Turbopack, async API 제거, proxy, image, removals
- [Next.js 공식 Codemods](https://nextjs.org/docs/app/guides/upgrading/codemods) — 개별 변환과 자동화 범위
- [Next.js 15 릴리스](https://nextjs.org/blog/next-15) — 15의 breaking-change 배경
- [Next.js 16 릴리스](https://nextjs.org/blog/next-16) — 16 주요 변경 개요
- [Next.js Scripts 가이드](https://nextjs.org/docs/app/guides/scripts) — App Router의 `next/script` 사용법
- [Next.js 15 Image API](https://nextjs.org/docs/15/app/api-reference/components/image) — 15의 image 변경 이력
- [기존 캐시 모델](https://nextjs.org/docs/app/guides/caching-without-cache-components) — 16에서 Cache Components 미사용 시 동작
- [Cache Components 마이그레이션](https://nextjs.org/docs/app/guides/migrating-to-cache-components) — opt-in 시 `revalidate` 등 변경 범위
- [generateMetadata](https://nextjs.org/docs/15/app/api-reference/functions/generate-metadata) — 15.2 streaming metadata 및 bot 동작

