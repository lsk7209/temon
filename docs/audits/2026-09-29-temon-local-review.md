# Temon local improvement review (T00-T12)

## Current state and interpretation

T00 aligned the local checkout with production source SHA `09d4a31b71f0c1ce01401bf158d026286f7c0ebb`. All edits in this report are local and undeployed. The observed production `/api/results` FK error remains an operational incident until a deployed fix and fresh post-deploy logs confirm it has stopped. Its exact failing test ID and rate are unknown.

## Local changes and scope

| Package | State | Evidence / limit |
| --- | --- | --- |
| T00 | VERIFIED_LOCAL | Git and read-only Vercel deployment SHA matched after fast-forward; dirty files preserved. |
| T01-T02 | VERIFIED_LOCAL | Isolated in-memory libsql fixture reproduces raw-slug FK failure, then verifies canonical ID, 4xx errors, strict input and public DTO. Static definitions without DB parents return explicit errors; production parent inventory unknown. |
| T03-T04 | VERIFIED_LOCAL for covered flows | Attempt/start/progress/complete/save events and failed-save notice tested for static/NTRP and dynamic runner paths. Durable idempotency and actual browser network/StrictMode remain UNVERIFIED. |
| T05 | FIXED_LOCAL | Results retain noindex; robots allows crawlers to fetch them while limiting `/api/` except public `/api/og`. Actual bot fetch/reindex pending deployment. |
| T06 | FIXED_LOCAL | Static URLs omit unsupported lastmod, XML locations escape special characters, DB failure gives 503. Healthy DB-backed XML runtime check remains UNVERIFIED. |
| T07-T08 | VERIFIED_LOCAL for source/contract and search smoke | q/category/page and ItemList share filtering; filtered URLs noindex; DB card invented metrics removed, static card metrics suppressed in listing. Local browser search for `음악` displayed three matching cards. Browser back/IME/mobile viewport check remains UNVERIFIED. |
| T09 | PARTIAL | Source-derived music-taste audit covers 12 binary questions and 4,096 combinations; 16 types reachable, E 3,072 and T 2,816 under an equal-choice model. It is not user behavior or psychometric validation. All-test tag/weight/editorial review remains UNVERIFIED. |
| T10 | DIAGNOSED, no search experiment | Read-only GSC page report for final 2026-08-29 to 2026-09-25 is the pre-deployment baseline; row limit 100 and not exhaustive. GSC URL Inspection fields for `/`, `/tests/music-taste`, `/tests/pet-mbti`, `/tests/breakup-style` are unavailable through the connected tool. No ranking recovery claim. |
| T11 | PARTIAL | CI runs new result/attempt tests; README labels old Cloudflare instructions and push-bearing deploy command. Local build is separate from field CWV, DB/region latency, ad fill and revenue. |
| T12 | AUDITED, approval work pending | Current `test_results` schema stores answers, userIp, userAgent. New `/api/results` uses `hashIp`, which returns `anonymous` without salt; dynamic submit uses `anonymous`. Existing historic row content, salt configuration, retention period, and deletion schedule were not queried. Privacy page says test results may be retained indefinitely; policy alignment needs operational and legal review. |

## Approval-gated work package

1. **DB parent inventory and repair, dry-run first.** Query counts grouped by test ID/slug and state, never export answer/IP/UA values. Compare current public static IDs with `tests.id` and `tests.slug`, prepare a migration only for intended stored results, back up, document rollback, then seek separate approval before any production row/schema change.
2. **Persistent save idempotency.** Define a server-validated key tied to attempt and payload digest, a unique DB constraint, same-key/same-payload replay, and same-key/different-payload conflict. Test with local fixture and concurrent calls. Production migration and activation require approval. Until then, client timeout and manual retry can still result in duplicate rows after a late commit.
3. **Historic data retention.** Dry-run only aggregate count/date ranges of rows with possible raw IP, document controlled backup access and deletion/backfill plan, then request approval for production changes. Do not infer that raw IP rows currently exist.
4. **External release.** Review intended diff, then separately authorize Git push/PR and Vercel deployment. After deployment, inspect fresh `/api/results` error logs and representative noindex/robots/listing responses. Neither release nor post-release verification has happened here.

## Follow-up gap audit

- **QA13/QA18 duplicate save: OPEN → FIXED_LOCAL (see 2026-09-29 follow-up below).** `app/api/tests/[testId]/submit/route.ts` creates a fresh result ID on each accepted POST; normal result saves likewise create a new UUID. The client prevents simultaneous clicks but cannot distinguish a timed-out commit from a failed request. A persistent attempt key and payload digest need local fixture tests before any proposed production migration. The current UI warns about duplicate retry risk.
- **QA16 consent denial: OPEN → FIXED_LOCAL mechanism, production mode pending (see follow-up below).** `app/layout.tsx` initializes GA without a consent state, and `lib/analytics.ts` also posts first-party tracking requests. No consent gate was found in the app paths reviewed. Adding a default-deny gate would change measurement for every visitor, so the consent contract and UI require a separate decision; a denied-session zero-request test is still needed. Do not describe current tracking as consent-safe.

## Risk notice

Production DB changes, historical data deletion, environment/permission updates, Git push, PR and deployment are outside current authority. Local source/tests/docs and fixture-only DB operations are reversible. No credentials or raw personal data belong in audit artifacts.

## 2026-09-29 follow-up verification incident

A later browser check started `npm run dev` from the working checkout. That process loaded `.env.local`, whose Turso URL points at the production database (host redacted). Opening `/tests?q=음악` displayed nine cards, including DB-backed entries. The local server log recorded one `POST /api/analytics/track 200` initiated by that browser visit. The tracking route can insert a `page_view` when DB credentials are configured, but a remote row was not inspected, so the write outcome is **unverified**. The dev server was stopped immediately. No DB mutation command, data deletion, credential change, Git push, or deployment was run. Further browser/HTTP checks should use a clean environment with the Turso variables absent, rather than the checkout's `.env.local`.

## Final local verification

On 2026-09-29, result contract, attempt state, analytics, save notice, and tests listing scripts passed. The 212 static route and 212 question-count audits passed; TypeScript, ESLint, and `git diff --check` passed. A clean temporary C: staging copy completed `npm ci` and `npm run build` (1,103 pages). E: initially lacked space and returned ENOSPC; no project data was deleted. Local HTTP/browser smoke verified filtered search, noindex, and the failed-save notice. The local server had no Turso configuration, so `/sitemap.xml` returned its intended 503 fallback and DB-backed success was not proven.

The independent follow-up review found two remaining gaps: dynamic quiz completion was recorded only after save, and missing DB configuration could silently hide dynamic tests. Completion now emits before persistence once per attempt; a Vercel runtime without DB configuration now fails the listing instead of serving an incomplete catalog. Targeted analytics/listing scripts, TypeScript, ESLint, diff check, and a final clean staging build (1,103 pages) passed after these edits. This final adjustment has no deployment or production DB proof.


## 2026-09-29 follow-up: QA13/QA18 and QA16 implemented locally

**QA13/QA18 duplicate save: FIXED_LOCAL.** Clients send the attempt ID they already generate (`attempt_<uuid>`) with every save and reuse it on retry. The server computes SHA-256 over canonical `{testId (resolved), resultType, answers}` and, in one libsql write batch, inserts the result only if no `result_attempts` row exists, records the key, and reads it back. Same key + same payload returns the original id (200, `replayed: true`); same key + different payload returns 409 `ATTEMPT_CONFLICT`; malformed keys return 400; requests without a key keep legacy behavior. The migration `lib/db/migrations/0003_result_attempts.sql` is additive (new table + index, `ON DELETE CASCADE` to `test_results`, rollback `DROP TABLE result_attempts`). Until it is applied the code logs once and saves without idempotency, so deploy order is safe. The in-memory fixture shows 8 concurrent identical requests produce exactly one row. Production migration is **not applied**; Turso concurrency under network latency is covered by SQLite write serialization but was not tested against a remote instance.

**QA16 consent denial: FIXED_LOCAL (mechanism); production mode pending decision.** GA and Clarity no longer load from the server-rendered `<head>`; a client loader starts them only when `isAnalyticsAllowed()` is true, and Vercel Analytics/SpeedInsights render inside the same gate. Every GA and `/api/analytics/track` path in `lib/analytics.ts` plus web-vitals checks consent; queued events are dropped on denial; revocation sets `ga-disable-<id>`, sends `gtag('consent','update',{analytics_storage:'denied'})` and `clarity('consent', false)`. A footer control allows refusal/withdrawal at any time; blocked localStorage keeps the choice in memory for the session. `NEXT_PUBLIC_ANALYTICS_CONSENT_MODE=opt-in` turns on default-deny with a bottom banner; unset keeps current measurement until refusal, so deploying this code alone does not reduce measurement. Browser proof with external requests aborted: denied sessions produced zero tracker requests in both builds; unanswered opt-in sessions produced zero until "허용".

Not covered: AdSense (ad personalization consent is a separate contract), whether Korean law requires opt-in for this site, and privacy-policy text alignment (`app/privacy/page.tsx` lists Clarity and indefinite retention). These need operator/legal decisions.
