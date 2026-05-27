# GSC Page Boost Report | 2026-05-27

## Scope
- Source: `D:\tools\gsc\data.json`, `D:\tools\gsc\issues.json`
- Target site: `sc-domain:temon.kr`
- Page focus: low CTR or zero-click individual test pages.

## Priority Pages Found
- `/tests/spending-style`: 55 impressions, 1 click
- `/tests/sleep-chronotype`: 36 impressions, 0 clicks
- `/tests/zombie-survival`: 28 impressions, 1 click
- `/tests/ramen-mbti`: 27 impressions on non-www plus 21 impressions on www variant

## Applied
- Added `GscLandingBoost` shared section with:
  - table of contents
  - search intent answer block
  - three practical guide cards
  - related internal links
- Applied to:
  - `app/tests/ramen-mbti/page.tsx`
  - `app/tests/spending-style/page.tsx`
  - `app/tests/sleep-chronotype/page.tsx`
  - `app/tests/zombie-survival/page.tsx`
- Removed duplicate guidance block from `sleep-chronotype`.

## Verification
- `npm run lint`: pass
- `npx tsc --noEmit`: pass
- `npm run build`: pass
- Local HTTP 200:
  - `/tests/ramen-mbti`
  - `/tests/spending-style`
  - `/tests/sleep-chronotype`
  - `/tests/zombie-survival`
- Chrome mobile verification:
  - all four pages have exactly one `h1`
  - all four pages render 3 TOC links
  - all four pages include the search intent section
  - all four pages have no detected horizontal overflow

## Next Candidates
- `/tests/perfection-balance-1xQC`

## Batch 2 Applied
- GSC zero-click/low-CTR pages:
  - `/tests/phone-photo`: 24 impressions, 0 clicks
  - `/tests/bed-making`: 21 impressions, 0 clicks
  - `/tests/gift-choosing`: 18 impressions, 0 clicks
  - `/tests/lunch-decider`: 16+ impressions, 0 clicks
  - `/tests/phone-search`: 16 impressions, 0 clicks
- Added `GscLandingBoost` to each static landing page with:
  - page-specific TOC labels
  - direct search intent summary
  - three guide cards
  - related internal links to nearby tests
- Normalized `/tests/phone-search` Korean SEO surface:
  - metadata title/description
  - FAQ topic label
  - schema title
  - visible heading copy
- Adjusted decorative icon layout on the five pages to avoid mobile horizontal overflow.

## Batch 2 Verification
- `npm run lint`: pass
- `npx tsc --noEmit`: pass
- `npm run build`: pass
- Local HTTP 200 and content checks:
  - `/tests/phone-photo`: TOC, search intent, related links present
  - `/tests/phone-search`: TOC, search intent, related links present; no `phone search` visible text
  - `/tests/bed-making`: TOC, search intent, related links present
  - `/tests/gift-choosing`: TOC, search intent, related links present
  - `/tests/lunch-decider`: TOC, search intent, related links present
- Chrome mobile verification:
  - all five pages have exactly one `h1`
  - all five pages render 3 TOC links
  - all five pages include the search intent section
  - all five pages have no detected horizontal overflow

## Batch 3 Applied
- Dynamic low-CTR page:
  - `/tests/perfection-balance-1xQC`: 85 impressions, 1 click
- Confirmed DB row:
  - title: `완벽주의 성향 테스트`
  - status: `published`
  - questions: 12
  - result types: 16
- Added dedicated extended landing content in `lib/extended-content.ts`:
  - perfectionism-specific intro
  - why the signal matters
  - four practical use cases
  - limitations/transparency section
  - three additional FAQs
- Updated dynamic page plumbing:
  - `app/tests/[testId]/page.tsx` now passes `test.title` into `TestExpandedIntro`
  - `components/test-expanded-intro.tsx` uses the real test title in Article JSON-LD headline

## Batch 3 Verification
- `npm run lint`: pass
- `npx tsc --noEmit`: pass
- `npm run build`: pass
- Local HTTP 200:
  - `/tests/perfection-balance-1xQC`
- HTML checks:
  - title present
  - extended guide present
  - perfectionism-specific body copy present
  - article FAQ present
  - Article schema headline uses `완벽주의 성향 테스트 심층 가이드`
- Chrome mobile verification:
  - exactly one `h1`
  - 11 TOC links across intro and extended guide
  - no detected horizontal overflow

## Remaining Candidates
- No currently listed GSC low-CTR landing candidate remains from this report batch.
