# Goal

## Final Deliverable
Make `/tests?page=N` render the corresponding test-card page from the requested URL, with safe page normalization and crawlable pagination links.

## User Value
Visitors and crawlers can open, share, refresh, and navigate directly to a specific tests-list page.

## Required Features
- Parse `page` on the server and pass the normalized value into the list UI.
- Render page-specific cards in the initial HTML.
- Use real links for previous, next, and numbered pagination.
- Reset to page 1 when search or category filters change.
- Keep page 1 canonical at `/tests` and give later pages self-referencing metadata.

## Non-Goals
- No production deploy, Git push, DB write, content rewrite, AdSense change, or index-console mutation.
- No redesign of cards, search, categories, or unrelated routes.

## Done Conditions
- Regression test passes for server/query/link/reset contracts.
- Typecheck, lint, build, and local production HTTP smoke pass.
- `/tests` and `/tests?page=2` expose different card sets in initial responses.

## User-Visible Result
Pagination URLs remain meaningful after refresh and can be copied or crawled.
