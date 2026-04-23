# Status | 마지막: 2026-04-23

## 현재 작업
5인 팀 감사 + Tier 0 보안/PIPA 수정 + 211개 콘텐츠 전수조사 + noindex/301 적용 완료 → 배포 대기

## 최근 변경 (최근 5개)
- 04-23: meal-* 17개 noindex 중앙관리(lib/noindex-tests.ts) + cooking-shared→cooking-share 308
- 04-23: 211개 테스트 전수조사 + food-temperature-preference→food-temperature 308, CONTENT_AUDIT.md·CONTENT_KILL_PAIRS.md 생성
- 04-23: Tier 0 보안 — admin "1234" 제거 + httpOnly 쿠키, IP 해시 저장, 쿠키 배너 PIPA 준수, "1.5만+" 과장 제거
- 04-23: sitemap.xml fs 스캔 제거(Vercel fallback 버그 수정), GSC/GA4 최적화 — Web Vitals→GA4, IndexNow API, test_progress 마일스톤화
- 04-23: 애드센스 최적화 — About/Contact 페이지, Organization founder 스키마, 쿠키 동의 배너, robots 단일화

## TODO (배포 직후 사용자 수동 작업)
- [ ] **Vercel Env 추가**: ADMIN_PASSWORD, IP_HASH_SALT, CRON_SECRET, GOOGLE/NAVER_SITE_VERIFICATION 값 기입 후 Redeploy
- [ ] **Vercel 도메인**: temon.kr Primary 전환 (현재 www 쪽으로 307 redirect 중, 코드 baseUrl과 불일치)
- [ ] **GSC**: sitemap-index.xml 재제출 + About/Contact 수동 색인 요청
- [ ] **재심사 전 6~8주 대기** + Save List 15개 본문 확장 (300자+ 추가)
- [ ] 132개 <300자 페이지 점진 확장 (주 10~20개, Scaled Abuse 회피)
- [ ] Naver Search Advisor + Daum 웹마스터 등록
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
- noindex 테스트는 lib/noindex-tests.ts 한 곳에서 중앙 관리 (ALL_TESTS 그대로, robots+sitemap만 제외)
- admin 인증: httpOnly 쿠키 `admin_session` + Bearer 헤더 병행 (lib/admin-auth.ts)
- 애드센스: 132개 본문 <300자 → Scaled Abuse 시그널, 재심사 전 6~8주 + Save List 확장 필수
- 콘텐츠 점검 재실행: `node scripts/content-audit.js` → CONTENT_AUDIT.md 갱신
