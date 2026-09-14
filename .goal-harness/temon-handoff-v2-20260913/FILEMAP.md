# FILEMAP

## Known Control Files

| Path | Role |
|---|---|
| `package.json` | Next.js scripts and dependencies |
| `next.config.mjs` | redirects, headers and Next configuration |
| `middleware.ts` | request controls and route behavior |
| `app/` | App Router pages, layouts and APIs |
| `components/` | shared UI, result, ad and analytics components |
| `lib/` | DB, scoring, API, SEO and shared logic |
| `drizzle/`, `migrations/` | schema/migration history |
| `scripts/` | audits, generators, GSC and Git helpers |
| `docs/temon_codex_handoff_v2/` | improvement specification and acceptance contracts |

## Pending Mapping

- content sources and publish state
- scoring engine and version compatibility
- DB read/write boundaries and cache behavior
- analytics, SDK, consent and logging flow
- deployment/rollback path and representative route matrix

## Confirmed Baseline

- Application: Next.js 14.2.35 App Router, React 18, TypeScript 5.
- Static test inventory: `app/tests/{slug}` intro/question; result pages live under `app/results/{slug}`.
- DB test inventory: `app/tests/[testId]`, `app/results/[testId]/[resultId]`, queries under `lib/db/queries`.
- Content audits: `scripts/audit-result-pages.js`, `scripts/audit-quiz-flow.js`, static description/polish checks.
- Production build: 1,103 statically generated pages plus dynamic App Router/API routes.

## Architecture And Data Lineage

- Static scoring: `hooks/use-quiz-logic.ts` → `lib/utils/mbti-calculator.ts` → `hooks/use-test-result.ts` → `POST /api/results`; several custom tests use `lib/data/*` and specialized scorers.
- Dynamic scoring: `app/api/tests/[testId]/submit`; published DB test/questions/result types; stores `test_results`.
- Data: active Drizzle schema under `lib/db/schema.ts` and `drizzle/`; older `lib/db/schema.sql` and `migrations/000_init.sql` conflict and are not safe migration sources.
- Analytics: `lib/analytics.ts`, `app/api/analytics/track/route.ts`, Vercel Analytics/Speed Insights, optional GA4/Clarity; no CMP gate found.
- Scheduled writes: `app/api/cron/generate`, `app/api/cron/publish`, `vercel.json`; production-sensitive scripts include queue/wave DB apply flows.
- Cache: dynamic test/result DB pages; 300-second stats/sitemap; 3600-second feed/AI files; long-lived OG/static assets.
- Legacy gap: `README.md` still describes Cloudflare D1/Pages while current architecture is Vercel + Turso/libSQL + Drizzle.

## Public SEO Baseline

- `/`, `/tests`, sample tests, `/blog`, `/privacy`, `/llms.txt`, `/robots.txt`, `/sitemap.xml`, `/ads.txt`: 200; nonexistent probe: 404.
- `/tests?page=2` is byte-identical to `/tests`; pagination is not server-addressable.
- Result routes are noindex; sitemap has 903 URLs and no result URLs; llms.txt reports 870 tests and 25 posts.
- robots disallows `/api/`, `/admin`, `/results/*`; ads.txt publisher matches current components.
