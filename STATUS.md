# Status | 마지막: 2026-08-26

## 현재 작업
결과 페이지 URL 재구조화(옵션 1) **로컬 구현·검증 완료, origin push는 사용자 확인 대기**. push 후 AdSense 재시도(별도 요청)로 이어질 예정.

## 최근 변경 (최근 5개만)
- 08-26: 결과 페이지 URL을 `/tests/{slug}/test/result...` → `/results/{slug}...`로 재구조화. 236개 파일 git mv + next.config 리다이렉트 2건 + canonical/공유링크/robots/감사스크립트 갱신. 빌드·audit:results·dev 서버 curl 검증 통과, 커밋 2건(미푸시). 부수 발견: 레거시 결과 페이지 ~198개의 공유 링크가 기존에 `/result/result` 이중 경로로 깨져 있던 버그도 함께 수정.
- 08-26: Auto Ads URL 제외(`temon.kr/tests/*/test/result/*`) 재검증 라이브 테스트 → 여전히 효과 없음 확인 → 재구조화로 근본 해결 착수.
- 08-26: Next.js 14→16, drizzle-orm 0.29→0.45 업그레이드 조사 리포트 2건(Codex 병렬 워커) — 조사만, 코드 무변경.
- 08-25: 결과 페이지 광고 슬롯 1차 라이브 시도 → 광고 7개+vignette 확인 → 롤백.
- 08-25: `hono` 미사용 의존성 제거 + `npm audit fix`로 취약점 18→10건.

## TODO
- [ ] 사용자에게 재구조화 결과 보고 → 승인되면 `git push`, 배포 후 라이브 재확인.
- [ ] (별도 후속 요청) AdSense 슬롯 재활성화 + Auto Ads URL 제외를 `temon.kr/results/` 접두사로 재설정.
- [ ] (착수 시 별도 요청) Next.js 16 / drizzle-orm 0.45 업그레이드 — 리포트만 완료, 실행은 보류.

## 결정사항
- 결과 페이지 URL을 `/results/` 단일 접두사로 통일 — AdSense Auto Ads URL 제외가 접두사 매칭만 지원해서(가변 슬러그가 중간에 낀 구 구조에서는 표현 불가) 재구조화가 유일한 근본 해결책이었음(2026-08-26 확정).
- 구 URL(`/tests/{slug}/test/result...`, `/tests/{testId}/test/result/{resultId}`)은 전부 `next.config.mjs` redirects로 308 처리 — 212개 질문 흐름 페이지의 하드코딩된 `router.push`는 의도적으로 손대지 않음(`cooking-shared` 통합 리다이렉트로 이미 검증된 패턴 재사용).
- 결과 페이지는 `robots: noindex`가 의도적(세션별 resultId URL 중복 방지)이며 재구조화 후에도 동일 정책 유지.

## 주의
- `.bkit`, `.omc`, `.omx`, `local.db` 변경은 로컬 상태/cache로 보고 작업 대상에서 제외.
- Vercel CLI가 `lsk7209` 계정으로 로컬에 로그인되어 있어 `vercel env`/`vercel --prod`로 직접 배포 가능.
- 오늘 이미 AdSense 라이브 인시던트가 2번 있었으므로, 결과 페이지 광고를 다시 만지기 전에는 반드시 사용자 확인 후 진행할 것.
