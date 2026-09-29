# Temon T00 baseline (2026-09-28)

## Scope and source of truth

- Specification: `D:\다운로드\temon_codex_improvement_plan_2026-09-28.md` v2.0.
- Before work, local `main` and `origin/main` were `cb3f12109de6799c762c5a0809d04cfb76cf1896`; the checkout contained unrelated `.bkit`, `.omc`, `.goal-harness`, `reports`, and untracked files. Those files were preserved.
- Read-only Vercel deployment listing showed production `dpl_7ShGY3gvKvYa6x8aDrYVp9f9YBC1` READY at Git SHA `09d4a31b71f0c1ce01401bf158d026286f7c0ebb`. After `git fetch --prune origin`, `main` was fast-forwarded to that SHA without touching the pre-existing dirty files. This aligns local source with the deployed source; it does not prove the deployment's runtime behavior.
- `.vercel/project.json` identifies `temon-vercel` / `prj_1VWadkwaHjY6J7BCdlwPk3hsLRuS`. No Vercel write, production POST, or DB query was performed at T00.

## Local validation boundary

- `package-lock.json` exists and `node_modules` is already installed. Use `npm ci` only if a clean install is needed; do not treat `npm run deploy` as validation because it runs Git push.
- Local tests must use an isolated libsql fixture, never `TURSO_DATABASE_URL` or `TURSO_AUTH_TOKEN` by default. No credential values were read or printed.
- `README.md` still describes Cloudflare D1/Pages; `STATUS.md` and actual Vercel project data take priority for deployment facts.
- Existing `audit:results` and `audit:quiz-flow` write files under `reports/`; `audit:quiz-flow` can read Turso if credentials exist. Do not run those against the dirty default report paths or production credentials. `audit:result-indexability` makes HTTP requests and needs a chosen base URL. Targeted `test:*` scripts and lint/typecheck/build are the initial local checks.
- `.github/workflows/check-build.yml` runs typecheck/build with `npm install`; the separate GitHub Pages workflow uses `npm ci` and is not evidence of current Vercel production behavior.

## Flow inventory and initial classification

| Flow | Source/engine | Result path | Initial status |
| --- | --- | --- | --- |
| Static quiz pages (including music-taste, phone-battery, meal-cleanup, travel-style) | Local question definitions, commonly `useQuizLogic` / `useTestResult` | `/results/{slug}` type result | T01/T03 FOUND: hook can submit a slug to result storage; exact per-page save behavior needs fixture verification. Existing question edits are ALREADY_FIXED and preserved. |
| DB quiz under `app/tests/[testId]/test` | DB test definition and `client-runner.tsx` | `/results/{testId}/{resultId}` stored result | T01/T02 FOUND: input ID and stored parent ID contract needs fixture verification. |
| NTRP and other special engines | Route-specific calculation | Numeric or special result | T04 UNVERIFIED pending focused smoke. |
| Legacy `TestQuestionPage` | Component/hook | Configured result | No JSX consumer found by initial repository search; treat as UNVERIFIED rather than site-wide failure. |

T01 FK failure is supported by the supplied production error observation, but its exact failing `testId`, production denominator, and current production resolution remain UNVERIFIED. T02 public response projection and T03 attempt semantics are FOUND in source inspection and require targeted tests. T05-T12 remain separate packages after priority T01-T04.

## Risk notice / approval boundary

Operational DB schema/row changes, deletion/backfill, permission or environment variable changes, Git push, remote PR, and deployment require separate approval. Local fixture changes and reversible source/tests/docs edits are authorized. Any migration discovered during T01/T03 is a dry-run proposal only; production application is BLOCKED_APPROVAL.
