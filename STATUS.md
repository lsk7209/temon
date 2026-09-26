# Status | 마지막: 2026-09-26

## 현재 작업
9/26 종합 운영 진단(검색 하락·계측·콘텐츠 품질) 반영 착수. 이번 세션은 확정된 버그만 최소 수정. 검색 손실 원인은 유력 후보만 특정, 라이브 GSC 재확인은 아직 미완.

## 최근 변경 (최근 5개만)
- 09-26: `lib/analytics.ts` `trackCTAClick()`이 동일 클릭에 `cta_click`/`cta_clicked` 두 이벤트를 중복 발행하던 것을 확인(다른 코드에서 `cta_clicked` 참조 없음, 순수 중복) → `cta_clicked` 발행 제거.
- 09-26: `components/landing-conversion-section.tsx`(전체 테스트 랜딩 공통 컴포넌트)와 `app/tests/page.tsx`, `lib/blog-posts.ts`에 "이탈률이 낮아져요", "완료율이 높아져요", "GSC에서 노출이 확인된 검색어" 등 운영자향 CRO/SEO 문구가 독자용 본문에 그대로 노출되고 있던 것을 발견 → 사용자 관점 문구로 교체.
- 09-26: 검색 손실(GSC 클릭 -67.8%, 8/27~9/23) 원인 조사 — git log 대조 결과 감소 구간 시작 하루 전인 8/26에 결과 페이지 236개 URL 재구조화 + redirect/robots.ts/sitemap 동시 변경이 있었음을 확인. 홈·`/tests` 목록 자체는 코드 변경 이력 없음. **원인 확정 아님, 유력 후보로만 기록** — 라이브 URL 검사(GSC)·크롤링 통계 대조 필요.
- 09-26: `/tests` 페이지네이션(9/13~14, `tests-pagination-20260913`)이 이전엔 `?page=2`가 서버에서 무시되어 1페이지와 본문이 동일했던 것을 이미 수정한 이력 확인 — 검색 손실 원인이 아니라 오히려 기존 결함의 선행 수정으로 판단.
- 09-26: 대표 채점 엔진(`calculateMBTI`) 및 `useQuizLogic` 점검 — 순수 함수·결정적 동점 처리(E/S/T/J 우선)·연속 클릭 가드(`isProcessing`) 확인, 결함 없음.

## TODO
- [ ] 며칠 지켜보고 결과 페이지 광고 실채움률/수익 확인 (재개 직후라 일시적 unfilled 있었음).
- [ ] (착수 시 별도 요청) Next.js 16 / drizzle-orm 0.45 업그레이드 — 리포트만 완료, 실행은 보류.
- [ ] GSC URL 검사로 홈·`/tests/music-taste`·`/tests/pet-mbti`·`/tests/breakup-style`의 마지막 크롤링·색인 상태·Google 선택 canonical 확인 (8/26 재구조화가 실제 원인인지 검증).
- [ ] `cta_clicked` 제거 후 GA4에서 실제 중복 해소 확인(1160/1160 → cta_click만 남는지).
- [x] 나머지 콘텐츠 전수 grep 스캔(운영/분석 용어 키워드 기준) 완료 — `components/answer-engine-section.tsx`의 "세션 이어가기" 문구 1건 추가 수정. `lib/ntrpResultConfig.ts`의 "KPI"는 테니스 실력 지표를 뜻하는 정상 콘텐츠로 확인(오탐), `lib/extended-content.ts`/`result-ad-unit.tsx`의 AdSense 언급은 코드 주석이라 렌더링되지 않음 확인. 키워드 기반 스캔이라 문맥 없이 놓친 표현이 남아있을 가능성은 있음.

## 결정사항
- 결과 페이지 URL을 `/results/` 단일 접두사로 통일 → AdSense Auto Ads URL 제외를 접두사 매칭 하나로 확실히 적용 가능해짐(2026-08-26 확정, 라이브 검증 완료).
- 구 URL(`/tests/{slug}/test/result...`, `/tests/{testId}/test/result/{resultId}`)은 전부 `next.config.mjs` redirects로 308 처리 — 212개 질문 흐름 페이지의 하드코딩된 `router.push`는 의도적으로 손대지 않음.
- 결과 페이지는 `robots: noindex`가 의도적(세션별 resultId URL 중복 방지)이며 재구조화 후에도 동일 정책 유지.
- `NEXT_PUBLIC_ADSENSE_RESULT_SLOT_ID=9293409342`가 Vercel Production env에 다시 설정되어 있음(수동 유닛 1개, `ResultAdUnit` 컴포넌트).

## 주의
- `.bkit`, `.omc`, `.omx`, `local.db` 변경은 로컬 상태/cache로 보고 작업 대상에서 제외.
- Vercel CLI가 `lsk7209` 계정으로 로컬에 로그인되어 있어 `vercel env`/`vercel --prod`로 직접 배포 가능.
- 결과 페이지 광고 관련 라이브 검증 시 chrome-devtools MCP 연결이 끊겨서 이번엔 playwright(`npm install --no-save`, 검증 후 제거)로 대체함 — 다음에도 MCP 없으면 같은 방식 사용 가능.
