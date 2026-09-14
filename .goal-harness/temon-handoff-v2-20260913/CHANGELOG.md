# CHANGELOG

| File | Change | Reason |
|---|---|---|
| `docs/temon_codex_handoff_v2/tools/validate_package.py` | normalize manifest coverage paths with `as_posix()` | make package validation cross-platform on Windows |
| `docs/temon_codex_handoff_v2/specs/package-manifest.json` | update validator bytes and SHA-256 | preserve integrity verification after repair |
| `.goal-harness/temon-handoff-v2-20260913/*` | create scoped durable goal harness | isolate this improvement run from older harness state |
| `scripts/audit-quiz-flow.js` | inspect static result pages and shared layout under `app/results` | eliminate false P0 reports after route migration |
| `scripts/test-audit-quiz-flow-paths.cjs` | add 212-route behavioral regression test | prevent stale audit paths from returning |
| `package.json` | add `test:audit-quiz-flow-paths` command | make the regression check repeatable |
| `app/tests/alarm-habit/page.tsx` | align metadata/schema/UI with 12 engine questions; remove unsupported accuracy wording | fix confirmed EV03/T007 inconsistency |
| `scripts/test-alarm-habit-question-count.cjs` | add engine-to-display count contract | prevent count drift |
| `package.json` | add `test:alarm-habit-question-count` | expose focused regression command |
| `scripts/test-static-question-count-audit.cjs` | verify current route inventory, 212 detected counts, representative parser fixtures and zero mismatches | provide reusable T007 contract independent of fixed inventory size |
| `app/tests/kdrama-mbti/page.tsx` | correct advertised count 10→12 | align with engine |
| `app/tests/kpop-idol/page.tsx` | correct advertised count 8→12 | align with engine |
| `app/tests/snowwhite-mbti/page.tsx` | correct advertised count 10→12 | align with engine |
