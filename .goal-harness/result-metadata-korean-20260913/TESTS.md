# Tests

- `npm run test:result-metadata-korean`
- `npx tsc --noEmit`
- `npm run lint`
- `npm run build`
- Local production GET for all eight `/results/{slug}` routes: 200, expected Korean title/description/canonical, no old English metadata.
- `git diff --check`; smoke-server ownership and shutdown check.
