# Status | 마지막: 2026-04-16

## 현재 작업
GSC 연동 + 한국어 SEO 최적화 완료

## 최근 변경 (최근 5개)
- 04-16: 전체 영어 UI 한국어화 (AnswerEngineSection, LandingConversionSection, tests/page 메타데이터·본문)
- 04-16: RelatedTestsSection 영어 title prop 225개 제거 (기본값 한국어 사용)
- 04-16: tsconfig.json _archive 제외, faqSchema 중복 Script 블록 4개 파일 제거
- 04-16: .gsc-domain www→non-www 수정 (canonical 통일), og-tests.png→동적OG 교체
- 04-16: SEO/GEO 최적화 (robots.txt AI 크롤러, llms.txt/full/ai-index.json 생성)

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
