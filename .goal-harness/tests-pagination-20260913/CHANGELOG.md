# Changelog

| File | Change | Reason |
|---|---|---|
| `.goal-harness/tests-pagination-20260913/*` | Created scoped durable harness | Preserve execution and verification state |
| `app/tests/page.tsx` | Added query parsing, server clamp, cached listing load, page metadata, and page-aligned JSON-LD | Make pagination addressable and internally consistent |
| `app/tests/tests-page-client.tsx` | Initialized/synchronized page state from server, added real pagination links, preserved active filters | Keep direct URLs and existing interaction behavior working |
| `scripts/test-tests-pagination.cjs` | Added focused pagination regression | Lock the server/query/link/filter/schema contract |
| `package.json` | Added `test:tests-pagination` | Make the regression repeatable |
| `docs/HANDOFF.md` | Recorded current completion and external boundary | Durable continuation |
