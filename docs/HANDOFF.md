# Current handoff — 2026-08-17

## User goal

Recover `temon.kr` from the mobile Chrome / AdSense Better Ads Standards enforcement notice dated 2026-08-15.

## Current state

The remediation is deployed to production. The Coupang affiliate banner has been removed. The current main branch keeps the AdSense loader out of the root layout and blocks mobile delivery in the loader component until the Better Ads review passes.

## Completed work

- Removed the Coupang affiliate banner component and its root-layout render path.
- Retained the latest main-branch mobile AdSense pause instead of re-enabling delivery before Google review.
- Recorded the evidence boundary and review blockers in `reports/2026-08-17-adsense-diagnose.json`.

## Validation evidence

- `npm run build` passed on 2026-08-17.
- Next.js compiled, type-checked, and generated 1,094 routes.
- Static source scan confirmed no Coupang banner component, render path, or banner-management reference remains in `app/` or `components/`.
- Live `https://temon.kr/ads.txt` returned HTTP 200 with `google.com, pub-3050601904412736, DIRECT, f08c47fec0942fa0`.
- Production deployment `dpl_7jAL8ikGMEdJuzCis6L2THzobuVV` was `Ready` and aliased to `https://temon.kr` on 2026-08-17.
- A fresh production homepage fetch returned HTTP 200 with no `banner-management` / `coupang-inline` reference and no `adsbygoogle.js` loader.

## Side effects and rollback

- After deployment, the Coupang affiliate banner is absent. Google Auto ads remain paused for mobile until the Google review passes and a follow-up, explicitly approved re-enable change is deployed.
- No Google review request, AdSense-console change, or account action was performed.

## Blockers / risks

- The supplied notices do not include the exact URL/creative findings from the Ad Experience Report, so those must be checked in the authenticated report before resubmission.
- Chrome/AdSense approval is an external state and remains unverified.

## Single next step

Open the mobile Ad Experience Report, map each shown URL/video to this deployed remediation, and submit the Google review request; do not re-enable AdSense until the report passes.
