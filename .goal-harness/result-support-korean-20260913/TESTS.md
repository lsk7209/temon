# Tests

- Focused source and helper-behavior regression.
- TypeScript no-emit check.
- ESLint.
- Production build.
- Local HTTP smoke for all eight result routes and rendered Korean support copy.

## Results

- `npm run test:result-support-korean`: PASS (8/8)
- `npx tsc --noEmit`: PASS
- `npm run lint`: PASS
- `npm run build`: PASS, 1,103/1,103 static pages
- HTTP status: PASS (8/8)
- Playwright hydrated text: PASS (8/8 FAQ titles, 3/3 representative body-copy pages)
