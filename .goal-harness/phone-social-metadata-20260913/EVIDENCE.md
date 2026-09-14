# Evidence

- Baseline EV04: `phone social media` appears in description, metadata title, schema title, FAQ topic/title; `Phone Social Media Test` appears in two support components.
- Canonical Korean source label: `lib/tests-config.ts` uses `📱 SNS 사용 습관`.

## Failing-first and final checks

- Initial `npm run test:phone-social-metadata`: FAIL at `English placeholder must be removed`.
- Final `npm run test:phone-social-metadata`: PASS.
- `npx tsc --noEmit`: PASS.
- `npm run lint`: PASS, no warnings or errors.
- `npm run build`: PASS, 1,103 static pages generated; existing non-fatal edge-runtime warning unchanged.
- Local production GET on port 3129: 200; title `SNS 사용 습관 테스트 | 무료 성격 테스트 - 테몬`; Korean description and expected canonical present; English placeholder and `13,612명` absent.
- Ownership-checked smoke server stopped and port 3129 left clear.
