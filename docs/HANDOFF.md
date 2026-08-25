# Current handoff — 2026-08-19

## User goal

After the confirmed mobile Better Ads review pass, re-enable AdSense delivery for `temon.kr` and deploy it safely.

## Current state

Production delivery is enabled through the Vercel Production environment value `NEXT_PUBLIC_ADSENSE_DELIVERY_ENABLED=true`. GitHub `main` commit `988acfa` is deployed as Vercel deployment `dpl_75zwWNaugWXj7cjHnjYVduZfbUg8` (`https://temon-vercel-8of54bpjb-limsubs-projects.vercel.app`) and is aliased to `https://temon.kr` and `https://www.temon.kr`.

## Completed work

- Kept the existing explicit production gate in both global and blog AdSense loaders.
- Restored the global loader render in `app/layout.tsx`; it only runs when the production flag is exactly `true` and the route is eligible and indexable.
- Pushed `cc17a04` (`fix: gate AdSense reactivation after review`) and `988acfa` (`fix: restore gated AdSense loader`) to `main`.
- Preserved the prior Coupang banner removal; no affiliate/sticky banner was restored.

## Validation evidence

- Local `NEXT_PUBLIC_ADSENSE_DELIVERY_ENABLED=true npm run build` completed successfully.
- Vercel completed the production build for commit `988acfa` with status `Ready` and the `temon.kr` aliases attached.
- Fresh 390×844 rendered browser check on `https://temon.kr/` found `#adsense-loader` present and loaded `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3050601904412736` plus Google managed ads code. Browser result: 0 errors; one non-blocking AdSense `data-nscript` warning.
- The same rendered check found no `쿠팡` text. Public `https://temon.kr/ads.txt` returned HTTP 200 and the expected Google seller record.
- User-provided console evidence for this decision: mobile Web Tools status `통과`; AdSense Policy Center states there is currently no policy violation stopping or limiting serving. Desktop Web Tools remains `검토되지 않음`, not failed.

## Side effects and rollback

- Google Auto Ads can now load on eligible, indexable desktop and mobile routes. Ad creative fill remains Google/auction dependent and may not appear on every immediate page view.
- Fast rollback: set Vercel Production `NEXT_PUBLIC_ADSENSE_DELIVERY_ENABLED=false` and redeploy, or roll back to the preceding no-root-loader deployment `dpl_9MKepCFhzfyrnt1MmRuYGMGkyy7R`.

## Blockers / risks

- The red AdSense `ads.txt` banner shown by the user was not tied to a named site in the screenshot. `temon.kr/ads.txt` itself is valid in the public check; investigate the banner target separately if it persists after selecting “지금 해결하기”.

## Single next step

Monitor AdSense reporting and the Policy Center for normal serving/fill over the next several hours; do not resubmit or cancel any review unless a new site-specific issue appears.

## Deliberately not run or sent

- No new Google review request, Policy Center appeal, account change, or cache purge was submitted.
