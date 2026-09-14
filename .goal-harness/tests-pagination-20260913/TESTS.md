# Tests

- `npm run test:tests-pagination`
- `npx tsc --noEmit`
- `npm run lint`
- `npm run build`
- Start the production build locally and compare `/tests` with `/tests?page=2` initial HTML/card links and metadata.
- Check invalid and oversized page values normalize safely.
- Run `git diff --check` and verify Git divergence remains understood.
