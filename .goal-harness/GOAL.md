# GOAL

## Final Deliverable

Next.js 14.2.35 -> 16.x, drizzle-orm 0.29 -> 0.45 메이저 업그레이드 조사 리포트 2건.
코드 변경 없음, 리포트만. AdSense 결과페이지 재개는 사용자가 콘솔에서 Auto Ads URL 제외를
설정한 뒤 별도로 재개 — 이번 harness 범위 밖.

## User Value

- npm audit / GitHub Dependabot이 지적한 나머지 10건(대부분 next, drizzle-orm 계열)의
  실제 위험도와 업그레이드 비용을 파악해, 다음에 착수할지 판단할 근거를 만든다.
- 실제 코드를 바꾸지 않고 조사만 하므로 프로덕션 리스크 0.

## Required Features

1. `reports/nextjs-upgrade-research-2026-08-26.md` — breaking changes, 이 코드베이스에
   영향 줄 항목 우선순위, codemod 가용성, 작업 규모/위험도, 지금 하지 말아야 할 이유.
2. `reports/drizzle-orm-upgrade-research-2026-08-26.md` — breaking changes, 이 코드베이스
   패턴(schema.ts, client.ts, sql`` 사용)에 영향 줄 항목, drizzle-kit 동반 업그레이드 필요
   여부, SQL injection advisory 실제 해당 여부, 작업 규모/위험도.

## Non-Goals

- 실제 `npm install` 버전 교체, 코드 리팩토링, `npm audit fix --force` 실행.
- AdSense 콘솔 작업, 결과페이지 광고 슬롯 재활성화.
- tmux 기반 omc-teams 병렬 세션 — 이 Windows 환경엔 tmux가 없어 `omc ask codex`
  (tmux 불필요한 단건 라우팅)로 대체.

## Done Conditions

- 두 리포트 파일이 생성되고, 각각 최소 breaking-changes 목록·영향 우선순위·작업 규모
  추정·"지금 하지 말아야 할 이유"를 담고 있다.
- 두 리포트 모두 사람이 읽고 다음 액션(업그레이드 착수 여부)을 판단할 수 있는 수준.
- 리포지토리 코드는 무변경(git diff 없음, 이 harness 문서와 reports/ 추가만 커밋 대상).

## User-Visible Result

사용자가 "업그레이드할까?"를 판단할 수 있는 근거 리포트 2개.
