# Current handoff — 2026-08-25

## User goal

Revenue improvement review for `temon.kr` after the mobile Better Ads review pass and AdSense
reactivation: fix low-hanging CTR/content issues, and cautiously extend monetization to the
result-page traffic that previously had no ads at all.

## Current state

AdSense delivery remains gated by `NEXT_PUBLIC_ADSENSE_DELIVERY_ENABLED=true` in Vercel Production
(unchanged from the 2026-08-19 handoff). This round adds one new, currently-inert monetization
surface: a manual display ad unit on quiz result pages, gated separately by
`NEXT_PUBLIC_ADSENSE_RESULT_SLOT_ID` (unset in production today, so it renders nothing).

## Completed work

- Synced local `main` with `origin/main` (was 25 commits behind, 2 diverged) before starting; no
  history was force-pushed, divergent local commits were superseded by equivalent upstream ones.
- Shipped result-page engagement measurement (`ResultEngagementTracker`, CTA click tracking) that
  was already in flight locally — merged onto the fresh base and pushed as `bf6d9c5`.
- Fixed two low-CTR DB test titles/descriptions (`perfection-balance-1xQC`, `daily-umbrella-check-wave4`)
  to better match their target GSC queries. Backup: `reports/low-ctr-title-backup-2026-08-25T*.json`.
- Verified the 18 published-description defects flagged on 2026-06-02 were already repaired by a
  prior session (`scripts/repair-published-descriptions.js` dry-run: `badBefore: 0`).
- Added `components/redesign/result-ad-unit.tsx`: a single manual AdSense display unit rendered
  inside `RedesignedResultPage` (used by every DB-driven result page,
  `/tests/{testId}/test/result/{resultId}`), between the FAQ section and the footer CTAs.
  - Gated by `NEXT_PUBLIC_ADSENSE_DELIVERY_ENABLED` AND a new `NEXT_PUBLIC_ADSENSE_RESULT_SLOT_ID`
    env var — with the slot ID unset, the component renders nothing, so it ships safely inert.
  - Does **not** attempt to disable Google Auto Ads on this page. An earlier version tried to push
    `enable_page_level_ads: false`, but a real `adsbygoogle.js` test against the live client ID
    (`ca-pub-3050601904412736`, which already has Auto Ads enabled at the account level) showed the
    script self-initializes page-level ads on load and throws `Only one 'enable_page_level_ads'
    allowed per page` when the app also pushes it. Full control over "exactly one ad on this page"
    requires an AdSense-console-side Auto Ads URL exclusion for `/tests/*/test/result/*` — outside
    what code can do. This was surfaced to and accepted by the user before shipping.
  - Result pages intentionally carry `robots: { index: false }` (per-session `resultId` URLs, not a
    quality signal), so this component does not gate on indexability the way `adsense-script.tsx` does.
- Re-ran `npm run audit:content` (static-polish, static-descriptions, results, quiz-flow): all Pass,
  0 defects — no regressions from this round's changes.
- Refreshed Core Web Vitals via PageSpeed Insights (mobile): `reports/cwv-check-2026-08-25.md`. The
  sampled result page is currently pristine (CLS 0, perf 98) since the ad slot isn't live yet —
  **re-run this check once a real slot ID is set** to confirm the reserved `min-h-[250px]` wrapper
  keeps CLS low after the ad actually renders.

## Validation evidence

- `npm run build` passed (default env, no ad flags) after all changes.
- `npm run build` + `next start` also verified with `NEXT_PUBLIC_ADSENSE_DELIVERY_ENABLED=true` and a
  fake `NEXT_PUBLIC_ADSENSE_RESULT_SLOT_ID` locally: browser check on a real DB result page found no
  console errors, ad wrapper renders inline without breaking layout.
- `node scripts/audit-result-monetization-measurement.mjs`: 5/5 PASS.

## Side effects and rollback

- No production behavior changes until someone sets `NEXT_PUBLIC_ADSENSE_RESULT_SLOT_ID` in Vercel.
- To roll back after it's set: unset the env var (or set delivery flag to `false`) and redeploy.

## Single next step (requires account-side action, not code)

1. In the AdSense console, create a new **Display ad** unit for `temon.kr` and copy its slot ID.
2. Set `NEXT_PUBLIC_ADSENSE_RESULT_SLOT_ID` in Vercel Production to that slot ID and redeploy.
3. Optional but recommended for true "1 unit only" control: in AdSense console → Ads → Auto ads →
   URL exclusions, add `temon.kr/tests/*/test/result/*` so Auto Ads doesn't also place ads there.
4. After it's live, watch AdSense Policy Center for a few days (same caution as the earlier Better
   Ads recovery) and re-run the CWV check on a sample result page.

## Deliberately not run or sent

- No AdSense console changes (ad unit creation, Auto Ads exclusions) — account access needed.
- No further GSC page/query title rewrites beyond the two clearest mismatches — most other flagged
  "0% CTR" items already had well-matched titles/descriptions on inspection, so the 0% reading is
  most likely low-volume statistical noise (e.g. 0/36 impressions), not a fixable defect.
