# Evidence

## Baseline

- 2026-09-13: prior live read-only comparison found `/tests?page=2` body-identical to `/tests` because pagination existed only in client state initialized to page 1.
- 2026-09-13: Git divergence is 0 ahead / 0 behind; unrelated dirty work is intentionally preserved.

## Failing-first regression

- `npm run test:tests-pagination` initially failed with `server page must consume ?page`, proving the test detected the client-only baseline.

## Final validation

- `npm run test:tests-pagination`: PASS.
- `npx tsc --noEmit`: PASS.
- `npm run lint`: PASS with no warnings or errors.
- `npm run build`: PASS; 1,103 static pages generated. Existing edge-runtime static-generation warning remained non-fatal.
- Local production smoke on scoped port 3128: all sampled requests returned 200.
- `/tests`: current page 1, first card `/tests/career-meeting-seat-wave5`, canonical `https://temon.kr/tests`.
- `/tests?page=2`: current page 2, first card `/tests/career-lunch-pick-wave5`, 12 cards, title `성격 성향 테스트 모음 2페이지 | 테몬`, canonical `https://temon.kr/tests?page=2`.
- Initial response hashes differed (`5C7774D6DDF487AB` vs `778A626887CBD290`).
- `page=abc` and negative values normalized to page 1. `page=999999` clamped to live local last page 76 and canonicalized to `?page=76`.
- Page 2 exposed crawlable previous `/tests#tests-list` and next `/tests?page=3#tests-list` links.
- Scoped smoke server was ownership-checked and stopped; port 3128 was left clear.
- `git diff --check`: no whitespace errors; line-ending warnings only.
- `git rev-list --left-right --count HEAD...origin/main`: `0 0`.
