# Status | 마지막: 2026-04-23

## 현재 작업
애드센스 심사 최적화 1차 적용 완료 → 재심사 전 30일 대기 + 인기 테스트 본문 확장 남음

## 최근 변경 (최근 5개)
- 04-23: GSC/GA4 최적화 — Web Vitals→GA4 전송, IndexNow 자동 제출 API, sitemap에 about/contact 추가, test_progress 마일스톤화
- 04-23: 애드센스 최적화 — About/Contact 페이지, Organization founder 스키마, 쿠키 동의 배너, robots 단일화
- 04-22: 테스트 인트로 영어→한국어 전환 + '검색 의도 매칭' 내부 섹션 제거
- 04-22: Next.js 14.2.35 CVE 보안 패치 머지 (14.2.16→14.2.35)
- 04-22: tests/[testId]/test/result 결과 진입 라우트 추가 (404 방지)

## TODO
- [ ] 인기 테스트 상위 20개 랜딩 본문 800~1200자로 확장 (Scaled Abuse 회피 위해 전체 동시 확장 금지)
- [ ] GSC `site:temon.kr` 색인 현황 확인 + 주요 URL 수동 색인 요청
- [ ] PageSpeed Insights 모바일 측정 (LCP/INP/CLS)
- [ ] AdSense 재신청: 30일 대기 후 위 작업 완료 시 진행
- [ ] dayjs vs date-fns 중복 라이브러리 통일 (선택)

## 결정사항
- robots.ts: AI 크롤러(GPTBot, PerplexityBot, ClaudeBot 등) 명시 허용
- public/robots.txt: 정적 파일 우선 적용됨 → robots.ts와 동일하게 유지
- lib/drizzle: Cloudflare D1 레거시 → _archive/ (현재 Vercel + Turso 사용)
- 구 라우트(/coffee-mbti 등): 삭제 대신 next.config.mjs에 308 리다이렉트

## 주의
- og/route.tsx는 edge runtime 유지 (ImageResponse 전용, 정상)
- calendar 컴포넌트는 react-day-picker 의존, 유지
- robots 단일 소스: `app/robots.ts` (public/robots.txt 삭제됨, 04-23)
- GSC 파이프라인: Anthropic API 크레딧 필요 (부족 시 개선안 생성 불가)
- 애드센스: 213개 대량 pSEO → Scaled Abuse 시그널 강함, 재심사 전 30일 대기 필수
