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
