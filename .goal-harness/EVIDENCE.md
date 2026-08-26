# EVIDENCE

## Validation Level

Level: 0

## Commands Run

| Command | Result | Notes |
|---|---|---|
| harness-init.py | PASS | size=medium, domain=web, created=2026-08-26T06:02:54+09:00 |
| npm dependency inventory | PASS | ORM 0.29.5, Kit 0.31.10, libSQL client 0.17.2 |
| npm audit diagnostic | PASS | GHSA confirmed below ORM 0.45.2 |
| repository DB-pattern search | PASS | No dynamic identifier; one static alias; three deprecated schema callbacks |
| official documentation review | PASS | Relevant releases and GHSA reviewed |

## Test Results

| Test | Result | Notes |
|---|---|---|

## Failed Checks

## Fixes Applied

## Completion Evidence

- Drizzle report contains every requested section and official source URLs.

## 2026-08-26 Next.js 14.2.35 to 16.x research milestone

| Check | Result | Evidence |
|---|---|---|
| Required report exists | PASS | `reports/nextjs-upgrade-research-2026-08-26.md`, 11 major sections |
| User-requested topics covered | PASS | 14 to 15, 15 to 16, project priorities, codemods, effort/risk, defer reasons |
| Official-source review | PASS | Current Next.js 15/16 upgrade guides, codemods, scripts, image, metadata, and caching docs |
| Local pattern inventory | PASS | 9 async-prop candidates, 10 revalidate files, 10 next/script files, 0 next/image files, middleware `request.ip`, Drizzle/libSQL integration |
| Code/package mutation | PASS | No application source, dependency, lockfile, deployment, environment, or live-system changes made |
| Subagent fallback | INFO | Spark exploration failed due quota; identical read-only lane retried once with Luna/max, then interrupted after no timely result; main agent completed bounded verification |

## 2026-08-26 결과 페이지 URL 재구조화 (/results/*)

| Check | Result | Evidence |
|---|---|---|
| git mv rename integrity | PASS | `git status --porcelain` 239 R, `git diff --cached --stat` app/tests+app/results 242 files changed, 181(+)/164(-) — 순수 rename 233개 + 콘텐츠 수정 6개(canonical/testPath/redirect 대상 파일)만 diff 발생 |
| npm run build | PASS | exit 0, 에러 0건, `/results/*` 라우트 214개 생성(레거시 212 + [testId] 2) |
| npm run audit:results | PASS | static 212/212 Pass, thinOrBroken 0, DB published/draft 전부 Pass |
| 신규 URL 직접 접근 (dev, curl) | PASS | `/results/cooking-cleanup` 200, `/results/{testId}/{resultId}`(실제 published 테스트) 200, canonical/og:url이 있는 14개 슬러그 중 alarm-habit 확인 시 `/results/alarm-habit` 정확히 반영 |
| 구 URL → 신 URL 리다이렉트 (dev, curl) | PASS | `/tests/cooking-cleanup/test/result?type=ENFP` → 308 → `/results/cooking-cleanup?type=ENFP`(쿼리 보존); `/tests/{testId}/test/result/{resultId}` → 308 → `/results/{testId}/{resultId}` |
| 질문 흐름 페이지 무변경 확인 | PASS | intro(`/tests/cooking-cleanup`) 200, question(`/tests/cooking-cleanup/test`) 200 — 212개 test/page.tsx 파일 미수정 |
| 전체 리포 stale 참조 스캔 | PASS | `grep -rl "test/result"` 잔여 항목 전부 검토 — 의도적 미수정(212개 질문흐름 hardcoded router.push, app/{alarm-habit 등 9개}/test/result 죽은 코드), 고아 스크립트(audit-quiz-flows.js·generate-robots.js, package.json 미등록), 죽은 코드(lib/sitemap-utils.ts generateTestRoutes 미호출) 뿐임을 확인 |
| 부수 버그 발견/수정 | INFO | 레거시 결과 페이지 ~198개가 ShareButtons testPath로 자기 자신 구 경로(`/tests/{slug}/test/result`)를 넘겨 공유 링크가 `.../result/result`로 깨져 있던 기존 버그 발견, `/tests/{slug}/test`로 정정 |
| 커밋 | PASS | 2건 생성(파일 이동+콘텐츠 수정 / 리다이렉트+연관 로직), origin push는 미실행(사용자 확인 대기) |
