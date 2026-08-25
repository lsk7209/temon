# Current handoff — 2026-08-25 (updated after live rollback)

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

## Single next step (requires account-side action, not code)

1. In the AdSense console → Ads → Auto ads → URL exclusions, add `temon.kr/tests/*/test/result/*`
   (covers both legacy and DB-driven result paths) so Auto Ads stops placing extra ads/vignettes
   there.
2. Only after that's confirmed active, set `NEXT_PUBLIC_ADSENSE_RESULT_SLOT_ID=9293409342` in Vercel
   Production again and redeploy (Claude can do this step once told the exclusion is live).
3. Re-verify live with a real browser check (not just build/local) before considering it done —
   local testing with a placeholder slot ID cannot reproduce Auto Ads' real placement behavior.
4. After it's confirmed clean, watch AdSense Policy Center for a few days and re-run the CWV check.

## Deliberately not run or sent

- No AdSense console changes (Auto Ads URL exclusion) — account access needed, must happen first.
- No further GSC page/query title rewrites beyond the two clearest mismatches.

## Addendum — 2026-08-26 dependency upgrade research (Codex, research-only)

Ran two Codex-routed research reports (`omc ask codex`) in parallel, no code/package changes:

- `reports/nextjs-upgrade-research-2026-08-26.md` — Next.js 14.2.35 → 16.x. Recommends a two-step
  `14 → latest 15.x → pinned 16.x` path, not a direct jump. P0 items: async `params`/`searchParams`
  (9 candidate files), removed `NextRequest.ip` in `middleware.ts`, React 18 → 19. Est. 15–30 files,
  2–4 engineering days, medium-high risk. Explicitly recommends **not** starting this now — do it in
  its own window, never combined with the AdSense result-page re-enable.
- `reports/drizzle-orm-upgrade-research-2026-08-26.md` — drizzle-orm 0.29.5 → 0.45.2 (the GHSA-fixed
  minimum, not 0.45.0/0.45.1). Static-code check found no `sql.identifier()` / dynamic `.as()` usage,
  so the SQL-injection advisory doesn't look exploitable in this codebase today. Small scope (schema
  extra-config callbacks object→array, `$dynamic()` cleanup), ~0.5 day code + 1–2 days safe
  verification (non-production Turso smoke test before any `drizzle-kit push`). Lower risk than the
  Next.js upgrade and not blocked on it — could go first if either is picked up.

Both reports end with an explicit "why not to start today" section; see the reports for full detail.
No production code changed as part of this research pass.
# Current handoff — 2026-08-26 Next.js upgrade research complete

## User goal

Produce a Korean, official-source-backed research report for upgrading temon.kr from
`next@14.2.35` to Next.js 16.x. Research only; no code, dependency, deployment, environment, or
live-system changes.

## Exact current state

- Report completed: `reports/nextjs-upgrade-research-2026-08-26.md`.
- Recommended path: 14.2.35 -> a verified latest 15.x -> pinned 16.x; do not combine the upgrade
  with Cache Components adoption or AdSense result-page reactivation.
- Highest-impact confirmed hotspots: synchronous App Router request props, removed
  `NextRequest.ip`, React 19, route-handler/fetch cache defaults, Turbopack default builds, and
  `middleware.ts` to `proxy.ts` migration.
- No implementation was performed.

## Completed work

- Reviewed current package/config/middleware/layout/AdSense/Drizzle patterns and bounded counts.
- Reviewed current official Next.js 15/16 upgrade and related reference documentation.
- Documented codemods, limits, estimated 15-30 directly changed files, medium-high risk, and defer reasons.

## Changed files

- `reports/nextjs-upgrade-research-2026-08-26.md` — requested report.
- `.goal-harness/EVIDENCE.md` — research completion evidence only.
- `docs/HANDOFF.md` — this recovery record.

## Fresh validation evidence

- Report exists and contains all 11 planned sections.
- Local inventory: 9 synchronous dynamic-prop candidate files, 10 `revalidate` files, 10
  `next/script` files, 0 `next/image` imports, and direct `request.ip` use in `middleware.ts`.
- `npm view next version` returned `16.3.3` on 2026-08-26; re-check before implementation.

## Side effects and rollback

- Documentation-only changes; no package, application source, deployment, environment, or live-system mutation.

## Blockers or risks

- React 19 compatibility and actual error count require a future isolated branch and fresh build.
- Vercel/CI Node runtime must be confirmed at implementation time.
- Existing result-page AdSense rollback remains in force.

## Single concrete next step

When implementation is explicitly requested, create an isolated branch and establish the current
14.2.35 build/route baseline before running any codemod or package update.

## Deliberately not run or sent

- No install, codemod, lint, typecheck, build, deploy, git push, Vercel mutation, AdSense change,
  or database request.

---
