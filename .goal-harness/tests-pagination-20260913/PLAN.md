# Plan

## Phase 1 — Lock regression
- Add a focused source-contract test that fails against the client-only implementation.
- Files: `scripts/test-tests-pagination.cjs`, `package.json`.
- Complete when the old implementation fails for the intended reason.
- Rollback: remove only the new script entry and test.

## Phase 2 — Implement
- Parse and normalize the server query, generate page-aware metadata, and connect real pagination links to synchronized client state.
- Files: `app/tests/page.tsx`, `app/tests/tests-page-client.tsx`.
- Complete when the focused regression passes.
- Rollback: revert only these bounded pagination changes.

## Phase 3 — Verify and review
- Run focused test, typecheck, lint, build, and production HTTP comparison.
- Update evidence, acceptance, review, status, and handoff.
- Complete when initial response card sets differ and all local checks pass.
