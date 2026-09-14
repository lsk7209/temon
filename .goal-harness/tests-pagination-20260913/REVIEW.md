# Review

## Independent read-only findings

- Spark exploration failed from quota; the identical bounded assignment was retried once with Luna(max).
- Luna confirmed the root cause: the server ignored `searchParams`, the client always initialized page 1, and pagination controls had no URLs.
- It identified three material regression risks: filter state loss, server/client dedupe mismatch, and page-2 JSON-LD remaining fixed to page 1.

## Resolution

- Active filters intercept pagination links and retain client-side filtering; changing a filter from a paged URL replaces the stale page query with `/tests#tests-list`.
- Server last-page calculation and schema use dynamic-first href deduplication matching the client ordering contract.
- JSON-LD now slices the same normalized requested page and uses 12 items.
- Invalid and oversized pages share the same normalized page across cards, current-page state, title, canonical, and schema.

## Final review

- Scope remains limited to listing pagination, its focused test, harness, and handoff.
- No new dependency or external mutation was introduced.
- No unresolved P0/P1/P2 correctness issue remains in the selected local slice.
