# Status | 마지막: 2026-04-22

## 현재 작업
GitHub 브랜치 머지 + TypeScript 빌드 에러 수정 완료

## 최근 변경 (최근 5개)
- 04-22: Next.js 14.2.35 CVE 보안 패치 머지 (14.2.16→14.2.35)
- 04-22: tests/[testId]/test/result 결과 진입 라우트 추가 (404 방지)
- 04-22: next.config.mjs 성능 개선 (compress, DNS prefetch, OG 캐시)
- 04-22: TypeScript strict 모드 json() 타입 에러 수정 (7개 파일)
- 04-22: lib/db/schema.ts drizzle-orm 0.29.x 인덱스 문법 수정, scripts/ tsconfig 제외

## TODO
- [ ] GSC 서비스 계정 temon.kr 등록: id-ai-179@cursorai-451704.iam.gserviceaccount.com 소유자 추가
- [ ] TURSO_DATABASE_URL, TURSO_AUTH_TOKEN Vercel 환경변수 설정 확인
- [ ] Google Search Console sitemap 재등록 (sitemap-index.xml 추가됨)
- [ ] 네이버 서치어드바이저 RSS 피드 등록 (/feed.xml)
- [ ] dayjs vs date-fns 중복 라이브러리 통일 (선택)

## 결정사항
- robots.ts: AI 크롤러(GPTBot, PerplexityBot, ClaudeBot 등) 명시 허용
- public/robots.txt: 정적 파일 우선 적용됨 → robots.ts와 동일하게 유지
- lib/drizzle: Cloudflare D1 레거시 → _archive/ (현재 Vercel + Turso 사용)
- 구 라우트(/coffee-mbti 등): 삭제 대신 next.config.mjs에 308 리다이렉트

## 주의
- og/route.tsx는 edge runtime 유지 (ImageResponse 전용, 정상)
- calendar 컴포넌트는 react-day-picker 의존, 유지
- public/robots.txt가 app/robots.ts보다 우선 적용됨 (Next.js static 파일 우선)
- GSC 파이프라인: Anthropic API 크레딧 필요 (부족 시 개선안 생성 불가)
