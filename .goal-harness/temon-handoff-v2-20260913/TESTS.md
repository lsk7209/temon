# TESTS

## Required Checks

- Package: validator and 14 unit tests.
- Static: TypeScript no-emit/type validation when supported.
- Lint: project lint command or documented framework incompatibility.
- Content: `npm run audit:content` and relevant focused audits.
- SEO: `npm run audit:result-indexability` plus representative sitemap/robots/canonical probes.
- Build: `npm run build` after local application changes.
- Smoke: representative home, list, intro, question and result routes without live ad clicks.
- Privacy/ads: static identifiers, SDK loading gates, payload allowlists and CMP state inspection.

## Error And Edge Cases

- Missing DB credentials must be recorded rather than silently using empty data.
- Invalid/draft/private routes must not be treated as public indexable success.
- Missing/no-fill ads must not break layout; do not click live ads.
- Existing dirty files must remain unchanged unless explicitly owned by this goal.

## Completion Checklist

- [ ] Available checks run or marked N/A with reason.
- [ ] Failed checks repaired or documented.
- [ ] M0 acceptance criteria have matching evidence.
- [ ] M1 changed behavior has a regression test.
- [ ] Build and diff checks pass after application edits.
