# Status | 마지막: 2026-08-26

## 현재 작업
결과 페이지 URL 재구조화 + AdSense 결과 페이지 광고 재개 **완료**. 다음 며칠 실채움률/수익 지켜보기만 남음.

## 최근 변경 (최근 5개만)
- 08-26: AdSense 콘솔에 `temon.kr/results/`(URL 접두사, 이 섹션의 모든 페이지) 제외 규칙 등록 → 슬롯 재개 → 배포 → 라이브 재검증 성공. 결과 페이지는 수동 유닛 1개만 노출(Auto Ads 추가분은 unfilled/hidden 처리됨), vignette 0개, 다른 페이지는 Auto Ads 정상 유지. **3번째 시도 만에 성공.**
- 08-26: 결과 페이지 URL을 `/tests/{slug}/test/result...` → `/results/{slug}...`로 재구조화(236개 파일 git mv + redirect 2건 + canonical/공유링크/robots/감사스크립트 갱신). 이게 있었기에 위 URL 제외 규칙이 접두사 하나로 표현 가능해짐. 부수 발견: 레거시 결과 페이지 ~198개의 공유 링크가 기존에 `/result/result` 이중 경로로 깨져 있던 버그도 함께 수정.
- 08-26: Auto Ads URL 제외 1·2차 시도(`temon.kr/tests/*/test/result/*`) 모두 실패 확인 → 재구조화로 근본 해결.
- 08-26: Next.js 14→16, drizzle-orm 0.29→0.45 업그레이드 조사 리포트 2건(Codex 병렬 워커) — 조사만, 코드 무변경.
- 08-25: `hono` 미사용 의존성 제거 + `npm audit fix`로 취약점 18→10건.

## TODO
- [ ] 며칠 지켜보고 결과 페이지 광고 실채움률/수익 확인 (재개 직후라 일시적 unfilled 있었음).
- [ ] (착수 시 별도 요청) Next.js 16 / drizzle-orm 0.45 업그레이드 — 리포트만 완료, 실행은 보류.

## 결정사항
- 결과 페이지 URL을 `/results/` 단일 접두사로 통일 → AdSense Auto Ads URL 제외를 접두사 매칭 하나로 확실히 적용 가능해짐(2026-08-26 확정, 라이브 검증 완료).
- 구 URL(`/tests/{slug}/test/result...`, `/tests/{testId}/test/result/{resultId}`)은 전부 `next.config.mjs` redirects로 308 처리 — 212개 질문 흐름 페이지의 하드코딩된 `router.push`는 의도적으로 손대지 않음.
- 결과 페이지는 `robots: noindex`가 의도적(세션별 resultId URL 중복 방지)이며 재구조화 후에도 동일 정책 유지.
- `NEXT_PUBLIC_ADSENSE_RESULT_SLOT_ID=9293409342`가 Vercel Production env에 다시 설정되어 있음(수동 유닛 1개, `ResultAdUnit` 컴포넌트).

## 주의
- `.bkit`, `.omc`, `.omx`, `local.db` 변경은 로컬 상태/cache로 보고 작업 대상에서 제외.
- Vercel CLI가 `lsk7209` 계정으로 로컬에 로그인되어 있어 `vercel env`/`vercel --prod`로 직접 배포 가능.
- 결과 페이지 광고 관련 라이브 검증 시 chrome-devtools MCP 연결이 끊겨서 이번엔 playwright(`npm install --no-save`, 검증 후 제거)로 대체함 — 다음에도 MCP 없으면 같은 방식 사용 가능.
