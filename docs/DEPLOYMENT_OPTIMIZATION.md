# 배포 최적화 가이드

## 최적화 완료 사항

### 1. Analytics 404 에러 처리
- `/api/collect` 엔드포인트가 Cloudflare Functions로 배포되지 않은 경우 404 에러가 발생하지만, 이제 조용히 무시됩니다.
- `public/analytics.js`와 `hooks/use-test-result.ts`에서 404 에러를 조용히 처리하도록 수정했습니다.

### 2. 빌드 최적화
- `next.config.mjs`에서 이미 최적화 설정이 적용되어 있습니다:
  - `output: 'export'` - 정적 사이트 생성 (SSG)
  - `images.unoptimized: true` - Cloudflare Pages 호환성
  - `outputFileTracingExcludes` - 불필요한 파일 제외
  - Webpack 최적화 설정

### 3. 성능 최적화
- 이미 적용된 최적화:
  - React.memo를 사용한 컴포넌트 메모이제이션
  - useCallback, useMemo를 사용한 훅 최적화
  - 동적 import를 사용한 코드 스플리팅
  - 이미지 최적화 (unoptimized: true로 Cloudflare Pages 호환)

## 확인 사항

### Cloudflare Functions 배포
`/api/collect` 엔드포인트를 사용하려면 Cloudflare Functions를 배포해야 합니다:

1. `functions/api/collect.ts` 파일이 존재합니다.
2. Cloudflare Pages Dashboard에서 Functions가 활성화되어 있는지 확인하세요.
3. D1 데이터베이스가 바인딩되어 있는지 확인하세요.

### 퀴즈 노출 확인
새로 개발한 퀴즈들(`food-spiciness`, `food-sweetness` 등)이 `lib/tests-config.ts`에 등록되어 있는지 확인하세요.

## 다음 단계

1. Cloudflare Functions 배포 확인
2. D1 데이터베이스 바인딩 확인
3. 빌드 및 배포 테스트

