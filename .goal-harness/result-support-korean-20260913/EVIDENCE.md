# Evidence

- Failing-first: `npm run test:result-support-korean` failed on the first English alarm-habit helper title before source edits.
- Focused regression: `result support Korean contract: PASS (8/8)`.
- TypeScript: `npx tsc --noEmit` exited 0.
- Lint: `next lint` reported no warnings or errors.
- Build: Next.js production build compiled and generated 1,103/1,103 static pages.
- HTTP: all eight scoped `/results/{slug}` routes returned 200.
- Browser: Playwright found the Korean FAQ title on 8/8 hydrated pages and representative translated support paragraphs on K-drama, K-pop, and phone-usage pages.
- Remote reconciliation: `HEAD...origin/main` is `0 0`; no push or deployment was performed.
