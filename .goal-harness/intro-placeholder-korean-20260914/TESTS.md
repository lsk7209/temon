# Tests

- Focused exact-title and English-prop absence contract.
- TypeScript no-emit check.
- ESLint.
- Production build.
- Hydrated browser text on all eight landing pages.

## Results

- `npm run test:intro-placeholder-korean`: PASS (8/8)
- `npx tsc --noEmit`: PASS
- `npm run lint`: PASS
- `npm run build`: PASS, 1,103/1,103 static pages
- Playwright: PASS, 8/8 support-title pages plus 3/3 fallback/badge assertions
