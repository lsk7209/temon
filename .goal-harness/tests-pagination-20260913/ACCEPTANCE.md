# Acceptance

- [x] `/tests?page=2` renders page-two cards in the initial server response.
- [x] Page 1 and page 2 have different visible test-card links.
- [x] Pagination controls are crawlable links with correct previous/next destinations.
- [x] Missing, invalid, negative, and oversized pages resolve safely.
- [x] Search and category changes reset pagination to page 1.
- [x] Page-aware canonical/title metadata is present.
- [x] Page-specific JSON-LD matches the server-selected listing slice.
- [x] Focused test, typecheck, lint, build, and HTTP smoke pass.
- [x] No push, deploy, DB write, advertising, or index-console mutation occurs.
