# Status | 마지막: 2026-09-26

## 현재 작업
9/26 종합 운영 진단(검색 하락·계측·콘텐츠 품질·개인정보) 반영 중. GSC/GA4 라이브 연결이 이 세션엔 없어 코드 레벨로 확인·수정 가능한 항목 위주로 진행. 검색 손실 원인은 유력 후보만 특정된 상태.

## 최근 변경 (최근 5개만, 09-26 작업은 STATUS.md 하단 "09-26 전체 변경" 참조)
- 09-26: `middleware.ts`의 admin API 인증 체크(Authorization 헤더만 확인)가 쿠키
  기반으로 정상 로그인한 관리자 요청까지 라우트 핸들러 도달 전에 401로 막고
  있던 것을 **운영자 승인 후** 제거. 각 `/api/admin/*` 라우트가 이미
  `verifyAdminToken()`(쿠키 우선 + 헤더 폴백)으로 자체 인증하므로 보호 공백 없음.
- 09-26: `/api/results`(POST, DB 기반 테스트의 실제 결과 저장 경로 — 라이브 트래픽에서 매 완료마다 호출됨)가 원본 IP를 해시 없이 그대로 `testResults.userIp`에 저장하던 것을 확인. 같은 계정의 `/api/analytics/track`은 이미 SHA-256+salt 해시 적용 중이었는데 이 경로만 빠져 있었음. 개인정보처리방침이 "테스트 결과에 개인 식별 정보 없음"이라 명시한 것과 실제 구현이 불일치했던 것 — `lib/hash-ip.ts` 공용 유틸로 추출해 두 경로 모두 적용.
- 09-26: 근거 없는 "N명 참여" 참여수 표시를 236개 파일에서 전면 제거. DB 스키마에 참여자 수 집계 컬럼이 없고 전부 파일별 하드코딩 리터럴(예: "17,346명 참여", "25.8K")이었음을 확인 후 조치. `test_stats.total_completions`에 실제 완료 수 컬럼은 존재하므로, 추후 실제 집계로 재도입하는 것은 검토 가능.
- 09-26: phone-battery/meal-cleanup/travel-style 3개 테스트의 문항-태그 설계 결함 수정. 전체 222개 테스트를 스크립트로 스캔해 meal-cleanup(S/N 축 0문항)·travel-style(E/I 축 0문항)에서 결과 유형 절반이 도달 불가능하던 것을 발견·재설계(축당 3문항 균형).
- 09-26: `components/share-buttons.tsx` 클립보드 복사 실패 오집계 버그, `lib/analytics.ts` `cta_click`/`cta_clicked` 중복 발행, `/api/dashboard-stats` 인증 누락, 운영자향 CRO 문구 노출 등 — 상세는 이전 커밋 로그 참조.

## TODO
- [ ] (승인 필요) `lib/db/migrations/0003_result_attempts.sql`을 Turso에 백업 후 적용 — 결과 저장 재시도 중복 방지 활성화. 미적용 상태에서도 코드는 기존 방식으로 저장됨(09-29 로컬 검증).
- [ ] (결정 필요) 운영 `NEXT_PUBLIC_ANALYTICS_CONSENT_MODE=opt-in` 설정 여부와 개인정보처리방침 문구 정합성(법무 검토). 미설정 시 기존 측정 유지 + 푸터 거부만 제공. AdSense 동의는 이번 범위 밖.
- [ ] 며칠 지켜보고 결과 페이지 광고 실채움률/수익 확인 (재개 직후라 일시적 unfilled 있었음).
- [ ] (착수 시 별도 요청) Next.js 16 / drizzle-orm 0.45 업그레이드 — 리포트만 완료, 실행은 보류.
- [ ] GSC URL 검사로 홈·`/tests/music-taste`·`/tests/pet-mbti`·`/tests/breakup-style`의 마지막 크롤링·색인 상태·Google 선택 canonical 확인 (8/26 재구조화가 실제 원인인지 검증). 코드 레벨로는 이 4개 페이지의 noindex·canonical·홈페이지 내부링크(`getHomePageTests`, 8월 이후 미변경)·`lib/noindex-tests.ts` 목록(4개 페이지 모두 미포함)을 확인했고 이상 없음 — 남은 건 라이브 GSC 확인뿐.
- [ ] `cta_clicked` 제거 후 GA4에서 실제 중복 해소 확인(1160/1160 → cta_click만 남는지).
- [ ] 과거에 이미 원본 IP로 저장된 `test_results.user_ip` 기존 행 처리(백필/삭제) 여부 결정 필요 — 이번 수정은 신규 저장분부터만 해시 적용됨.
- [ ] phone-battery처럼 "관리하는 방식/이유/기준/강도/환경" 템플릿 패턴을 쓰는 다른 자동 생성 테스트가 더 있는지 전수 확인(문항 품질은 스크립트로 자동 판별하기 어려워 사람 검수 필요).
- [x] 나머지 콘텐츠 전수 grep 스캔(운영/분석 용어 키워드 기준) 완료 — `components/answer-engine-section.tsx`의 "세션 이어가기" 문구 1건 추가 수정. `lib/ntrpResultConfig.ts`의 "KPI"는 테니스 실력 지표를 뜻하는 정상 콘텐츠로 확인(오탐), `lib/extended-content.ts`/`result-ad-unit.tsx`의 AdSense 언급은 코드 주석이라 렌더링되지 않음 확인.

## 결정사항
- 결과 페이지 URL을 `/results/` 단일 접두사로 통일 → AdSense Auto Ads URL 제외를 접두사 매칭 하나로 확실히 적용 가능해짐(2026-08-26 확정, 라이브 검증 완료).
- 구 URL(`/tests/{slug}/test/result...`, `/tests/{testId}/test/result/{resultId}`)은 전부 `next.config.mjs` redirects로 308 처리 — 212개 질문 흐름 페이지의 하드코딩된 `router.push`는 의도적으로 손대지 않음.
- 결과 페이지는 `robots: noindex`가 의도적(세션별 resultId URL 중복 방지)이며 재구조화 후에도 동일 정책 유지.
- `NEXT_PUBLIC_ADSENSE_RESULT_SLOT_ID=9293409342`가 Vercel Production env에 다시 설정되어 있음(수동 유닛 1개, `ResultAdUnit` 컴포넌트).

## 주의
- `.bkit`, `.omc`, `.omx`, `local.db` 변경은 로컬 상태/cache로 보고 작업 대상에서 제외.
- Vercel CLI가 `lsk7209` 계정으로 로컬에 로그인되어 있어 `vercel env`/`vercel --prod`로 직접 배포 가능.
- 결과 페이지 광고 관련 라이브 검증 시 chrome-devtools MCP 연결이 끊겨서 이번엔 playwright(`npm install --no-save`, 검증 후 제거)로 대체함 — 다음에도 MCP 없으면 같은 방식 사용 가능.
