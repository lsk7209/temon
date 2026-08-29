# Current handoff — 2026-08-30 (Temon result-route SEO repair complete)

## User goal

Audit and safely optimize `temon.kr` as one checkpoint in the multi-dashboard fleet SEO program,
using fresh public evidence and GitHub-first handling.

## Exact current state

- Work is isolated in `D:\web\seo-worktrees\temon-seo-20260830` from GitHub `main` commit
  `d9b0d4c695513a5dc2d1dc521d81b9bfa161fd8e`.
- The original `D:\web\temon` checkout has unrelated user/runtime changes and was not modified.
- Implementation commit `a2357d536438b9eebd5c58c073bf0beb54cc2917` is on GitHub `main` and its
  Git-connected Vercel deployment completed successfully.
- Production result routes now emit strict `noindex, follow`; the pre-fix `index, follow` defect is
  no longer present on the four live controls.
- The scoped fix adds `noindex, follow` at the top-level `app/results/layout.tsx` boundary, covering
  static and dynamic result routes without changing content, URLs, AdSense, DB data, or other pages.

## Completed work and changed files

- `app/results/layout.tsx`: route-boundary robots metadata.
- `scripts/audit-result-indexability.mjs`: reusable strict HTTP regression audit.
- `package.json`: `audit:result-indexability` command.
- `.goal-harness/temon-result-noindex-20260830/*`: scoped goal, plan, status, evidence, acceptance,
  and risk record.
- This handoff section.

## Fresh validation evidence

- `npm run lint`, `npx tsc --noEmit`, and `npm run build`: PASS.
- Existing static result audit: 212/212 PASS; DB subsection unavailable in the credential-free
  clone and not required by the metadata-only repair.
- Local `next start`: 212/212 static results plus a dynamic entry control emit strict
  `noindex, follow`; five non-result controls remain HTTP 200 and indexable.
- Independent verifier passed the inheritance model. Spark quota exhaustion triggered the single
  allowed Luna/max fallback; its audit-hardening findings were implemented and rerun.
- Exact implementation-SHA SEO Safeguard and Hosting Cost Guard runs passed; GitHub's Vercel status
  completed successfully.
- Post-deploy strict HTTP audit passed on four result routes; five non-result controls remained
  indexable. Playwright desktop/mobile verification passed 4/4 with no overflow, page errors, or
  same-origin console errors.

## Side effects, rollback, blockers, and risks

- GitHub `main` and the Git-connected Vercel production deployment changed only through the scoped
  commits. AdSense, GSC, databases, environment variables, and Vercel account state were untouched.
- Rollback after push is one commit reverting the scoped metadata/audit files.
- Existing `npm ci` audit baseline is 10 findings (4 moderate, 6 high); dependency work is out of
  scope and no package version changed.
- No broad test-page content, canonical, sitemap, or noindex operation was attempted.
- A non-required external `Cloudflare Pages` check failed. No Cloudflare/Wrangler repo artifact
  exists; disconnecting the stale external integration requires a separate account/repository
  settings action and was deliberately not attempted.

## Single concrete next step

Return to `D:\web\multi-dashboard`, record checkpoint 013 in the fleet harness/ledger, and select
the next site from fresh dashboard evidence.

## Deliberately not run or sent

- No Vercel CLI/API mutation, environment change, GSC submission, content publication, DB write,
  AdSense change, or broad noindex/deletion operation.

---

# Previous handoff — 2026-08-25 (updated after live rollback)

## User goal

Revenue improvement review for `temon.kr` after the mobile Better Ads review pass and AdSense
reactivation: fix low-hanging CTR/content issues, and cautiously extend monetization to the
result-page traffic that previously had no ads at all.

## Current state — ROLLED BACK, result-page ads are OFF again

The result-page ad unit went live in production briefly (deployment `dpl_9uVa3zvHDEkneZdLnGGCTuKuyyXC`)
with a real slot ID (`9293409342`), then was rolled back within minutes
(deployment `dpl_5a7nJ5oyJcPadE7U5beuc3pkkgm4`, currently live) after live testing showed the
account's Auto Ads produced far more than the intended "1 unit": **7 `<ins class="adsbygoogle">`
elements on a single result page**, including one Auto Ads inserted *inside* the FAQ section
(`class="google-auto-placed"`, splitting FAQ content), plus a full-screen interstitial
(`#google_vignette` in the URL after a scroll interaction). This is exactly the ad pattern Better
Ads Standards penalize, and it appeared right after the site's mobile review passed — too risky to
leave live without the AdSense-console-side Auto Ads exclusion in place first.

**Current live state**: `NEXT_PUBLIC_ADSENSE_RESULT_SLOT_ID` is unset in Vercel Production again.
Verified on live `temon.kr`: 0 `adsbygoogle` script tags and 0 `<ins>` elements on
`/tests/ntrp-test/test/result`; homepage's normal ad loader (`#adsense-loader`) still present and
unaffected. The code (`ResultAdUnit`, `LegacyResultAdSlot`) is unchanged and still ships safely
inert without the env var — this was an env-var-only rollback, no code revert needed.

## Completed work

- Synced local `main` with `origin/main` (was 25 commits behind, 2 diverged) before starting; no
  history was force-pushed, divergent local commits were superseded by equivalent upstream ones.
- Shipped result-page engagement measurement (`ResultEngagementTracker`, CTA click tracking).
- Fixed two low-CTR DB test titles/descriptions (`perfection-balance-1xQC`, `daily-umbrella-check-wave4`).
- Verified the 18 published-description defects flagged on 2026-06-02 were already repaired.
- Added `components/redesign/result-ad-unit.tsx` (DB-driven result route) and
  `components/legacy-result-ad-slot.tsx` (212 legacy static result routes, via `app/tests/layout.tsx`
  — legacy pages get ~94% of result-page traffic per a `page_visits` DB query, vs ~6% DB-driven).
- Removed unused `hono` dependency, ran `npm audit fix` (no `--force`): 18 → 10 vulnerabilities.
- **Set `NEXT_PUBLIC_ADSENSE_RESULT_SLOT_ID=9293409342` in Vercel Production, deployed, verified live
  behavior was unacceptable (see above), then removed the env var and redeployed to roll back.**

## Validation evidence

- `npm run build` passed (default env, no ad flags) after all changes.
- Local `next start` with a fake slot ID: clean single `<ins>`, no console errors, correct
  path-based gating (renders on result pages only, not intro/question pages, no double-render).
- **Live production test with the real slot ID exposed the Auto Ads density problem** — this is the
  reason for the rollback; local testing with a fake/unapproved slot ID could not have caught it
  because Auto Ads didn't have real inventory to place in that environment.
- Post-rollback: confirmed live `temon.kr` result pages load zero AdSense script/ins elements again.

## Side effects and rollback

- Result pages currently have **no ads**, same as before this session (net revenue-neutral for now).
- If re-attempting: the Auto Ads URL exclusion (see next step) must be configured in the AdSense
  console **before** setting the slot ID again, not after — this time, verify with a real slot ID in
  a low-traffic controlled window, not by relying on local/fake-slot-ID testing alone.
- The ad unit **`9293409342`** itself is still created in the AdSense console (harmless to leave
  unused) — it can be reused once the exclusion is in place.

## Second live attempt (2026-08-26) — Auto Ads URL exclusion does NOT work here, confirmed empirically

The user added an AdSense "페이지 제외" (page exclusion) rule: mode "이 섹션의 모든 페이지" (prefix
match), URL `temon.kr/tests/*/test/result/*`. Before trusting it, checked Google's own documentation
(`support.google.com/adsense/answer/9262311`): Auto ads page exclusion only has two modes — exact
URL match, or prefix match on a literal path (official example: entering `example.com/sports`
excludes `example.com/sports` and `example.com/sports/team`, i.e. no glob/wildcard character syntax
is documented). Since temon's result URLs have the variable test slug **before** the literal
`/test/result` suffix (`/tests/{slug}/test/result`), a left-anchored prefix rule structurally cannot
express "any slug, then this suffix" — so the `*` characters in the exclusion were very likely just
literal/ignored, not a working wildcard.

Verified live: re-enabled `NEXT_PUBLIC_ADSENSE_RESULT_SLOT_ID=9293409342`, deployed
(`dpl_Hxdn73iePQvkiwzYg4n73AiSgucT`), browser-checked `https://temon.kr/tests/ntrp-test/test/result`
after scrolling to trigger lazy placements: **still 7 `<ins class="adsbygoogle">` elements**,
identical to the first attempt (Auto Ads inside the FAQ section, multiple stray placements). The
exclusion rule had no effect. Rolled back immediately (env var removed, redeployed
`dpl_3PBRCowQCwbcWjhKM1yJGoGkqMSw`), confirmed 0 ad script/ins on the result page again.

**Conclusion: the "manual result-page ad unit while excluding Auto Ads via console URL rule"
approach is not achievable with the current URL structure.** Auto Ads' page exclusion tool cannot
express a rule for a variable-slug-then-fixed-suffix path. Do not retry this exact approach a third
time without one of the structural changes below.

## Real remaining options for result-page monetization (none attempted yet)

1. **Restructure result URLs under one fixed prefix** (e.g. `/results/{slug}` instead of
   `/tests/{slug}/test/result`) so a single Auto Ads prefix exclusion (`temon.kr/results/`) actually
   works. Real code/routing change, redirects needed for any indexed legacy links (low SEO risk since
   these are noindex), meaningful effort — not attempted.
2. **Exact-match exclusion per legacy test** (`이 페이지만`) for the ~212 static legacy result paths
   only (they have deterministic URLs, unlike DB-driven results which get a unique `resultId` per
   submission and can never be enumerated). Extremely tedious to enter manually one by one in the
   AdSense console; DB-driven results still couldn't be covered this way.
3. **Disable Auto Ads site-wide** and rebuild every current ad placement (home/tests/blog) as manual
   units too. Large scope change, out of proportion to today's work.
4. **Leave result pages without ads** (current state) — zero incremental risk, zero incremental
   revenue from this surface. Recommended default until one of the above is deliberately scoped.

## Deliberately not run or sent

- No further AdSense console changes attempted after the second rollback.
- No further GSC page/query title rewrites beyond the two clearest mismatches.

## Addendum — 2026-08-26 dependency upgrade research (Codex, research-only)

Ran two Codex-routed research reports (`omc ask codex`, document-specialist role, parallel
background processes — `omc-teams`/tmux isn't available on this Windows host) with no code or
package changes:

- `reports/nextjs-upgrade-research-2026-08-26.md` — Next.js 14.2.35 → 16.x. Recommends a two-step
  `14 → latest 15.x → pinned 16.x` path, not a direct jump. P0 items: async `params`/`searchParams`
  (9 candidate files), removed `NextRequest.ip` in `middleware.ts`, React 18 → 19. Est. 15–30 files,
  2–4 engineering days, medium-high risk. Explicitly recommends **not** starting this now, and to
  never combine it with the AdSense result-page re-enable so regressions can be attributed cleanly.
  Local inventory backing the estimate: 9 sync dynamic-prop candidates, 10 `revalidate` files, 10
  `next/script` files, 0 `next/image` imports, direct `request.ip` use in `middleware.ts`.
  `npm view next version` was `16.3.3` on 2026-08-26 — re-check before any implementation.
- `reports/drizzle-orm-upgrade-research-2026-08-26.md` — drizzle-orm 0.29.5 → 0.45.2 (the GHSA-fixed
  minimum, not 0.45.0/0.45.1). Static-code check found no `sql.identifier()` / dynamic `.as()` usage,
  so the SQL-injection advisory doesn't look exploitable in this codebase today. Small scope (schema
  extra-config callbacks object→array, `$dynamic()` cleanup), ~0.5 day code + 1–2 days safe
  verification (non-production Turso smoke test before any `drizzle-kit push`). Lower risk than the
  Next.js upgrade and not blocked on it — could go first if either is picked up.

Both reports end with an explicit "why not to start today" section; see the reports for full detail.
No production code, dependency, lockfile, environment, deployment, or AdSense setting changed as
part of this research pass. Single next step if either upgrade is explicitly requested later: create
an isolated branch, capture the current build/route baseline, then apply codemods/version bumps
there — not directly on `main`.
