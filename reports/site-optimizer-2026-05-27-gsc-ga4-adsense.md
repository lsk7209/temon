# Site Optimizer Report | 2026-05-27

## Scope
- Site: `https://temon.kr`
- Focus: GSC low CTR/rank-drop surface, GA4 collection stability, AdSense loading, RSS/AI index discoverability, `/blog` and `/tests` responsive verification.

## Evidence Checked
- GSC adapter: `D:\tools\gsc\issues.json`
- Local env: `.env.local`
- Routes verified on dev server `http://localhost:3001`
- Browser verified with Chrome DevTools for `/blog` and `/tests`

## Findings
- GSC has `sc-domain:temon.kr` low CTR and rank-drop queries around `테스트 모음`, `mbti 테스트 모음`, `재밌는 테스트`, `라면 테스트`, `소비성향 테스트`, `크로노타입 테스트`.
- GA4 measurement id exists and gtag loads on `/blog` and `/tests`.
- AdSense publisher id exists, `ads.txt` is present, and AdSense loader script is inserted outside admin/dashboard routes.
- RSS/Atom feeds, robots, sitemap, llms, and AI index all return HTTP 200 locally.

## Applied
- Added a gtag readiness queue so SPA `page_view` events are retried if GA4 is not ready at first hydration.
- Updated `/feed.xml` and `/rss.xml` cache headers to `max-age=3600, s-maxage=3600`.
- Added `/blog` to `ai-index.json`, `llms.txt`, and `llms-full.txt`.
- Aligned `ai-index.json` `/tests` title with current `/tests` metadata.

## Verification
- `npm run lint`: pass
- `npx tsc --noEmit`: pass
- `npm run build`: pass
- `/blog`: H1 1, TOC 4, cards 48, GA4 script present, AdSense script present, mobile overflow 0.
- `/tests`: H1 1, TOC 4, GSC keyword guide present, GA4 script present, AdSense script present, mobile overflow 0.
- `/feed.xml`, `/rss.xml`, `/ai-index.json`, `/llms.txt`, `/robots.txt`, `/sitemap.xml`: HTTP 200 locally.

## Remaining
- GSC and GA4 API-side metric comparison still needs OAuth/API property access confirmation.
- Individual low CTR test pages still need page-level title/description/body optimization.
- Static result page source files still contain some legacy logs/strings to audit.
