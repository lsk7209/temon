# Acceptance

| Criterion | Status | Evidence |
|---|---|---|
| Current live representative `/results/*` pages are proven indexable before the fix | Pass | HTTP audit: 2/2 returned `index, follow` and failed as expected |
| Top-level `/results` metadata enforces `index: false`, `follow: true` | Pass | `app/results/layout.tsx` |
| Representative static result routes emit `noindex` in a local production build | Pass | 212/212 static routes plus one dynamic entry passed |
| Existing application build and focused audits pass | Pass | lint, typecheck, build, `audit:results` static 212/212 |
| Exact pushed SHA passes relevant GitHub checks and Git-connected deployment | Pass | SEO Safeguard, Hosting Cost Guard, and Vercel status succeeded for `a2357d5` |
| Live representative result routes emit `noindex` after deployment | Pass | 4/4 strict HTTP routes passed |
| Non-result indexability and result UX are unchanged | Pass | five non-result HTTP controls remained 200/indexable; result pages remained 200 |
