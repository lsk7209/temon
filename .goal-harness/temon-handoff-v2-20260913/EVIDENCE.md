# EVIDENCE

## Validation Level

Current level: 4 — production build and local HTTP smoke passed.

## Commands Run

| Command | Result | Notes |
|---|---|---|
| `python docs/temon_codex_handoff_v2/tools/validate_package.py` | PASS | package structure/references/safety contracts only |
| `python -m unittest discover -s docs/temon_codex_handoff_v2/tools -p test_*.py -v` | PASS | 14/14 after Windows separator repair |
| `git rev-list --left-right --count HEAD...origin/main` | PASS | 0/0 at goal start |
| `npm run audit:content` | PARTIAL then PASS | result/content checks pass; quiz-flow exposed 212 stale-path false P0s before repair |
| `npm run test:audit-quiz-flow-paths` | PASS | all 212 static result routes resolved under `app/results` |
| `npm run audit:quiz-flow` | PASS | 212 static + 1,221 DB records, 1,433 Pass, P0-P3 all zero |
| `npx tsc --noEmit` | PASS | exit 0, no output |
| `npm run lint` | PASS | no warnings or errors |
| `npm run build` | PASS | Next.js 14.2.35; compiled/typechecked; 1,103 static pages generated |
| live read-only GET baseline | PASS/PARTIAL | home/tests/blog/privacy/llms/robots/sitemap/ads all 200; missing route 404; account state not checked |
| `/tests` vs `/tests?page=2` body hash | FAIL finding | identical response confirms query pagination is ignored server-side |
| `npm run test:alarm-habit-question-count` | FAIL then PASS | metadata/visible 8 vs engine 12 reproduced; corrected to 12 |
| `npm run test:static-question-count-audit` | FAIL then PASS | detected K-drama 10/12, K-pop 8/12, Snow White 10/12; all 212 now aligned |
| local `next start -p 3011` GET smoke | PASS | four corrected intro routes returned 200, contained 12문항 and no stale 8/10문항 |
| independent diff review | PASS after repair | no P0/P1; all P2/P3 test-quality findings addressed |

## Failed Checks And Fixes

- Initial package validation failed because Windows `Path` strings used backslashes while manifest paths use POSIX separators.
- Fixed with `Path.relative_to(root).as_posix()` and updated the validator manifest entry.
- Quiz-flow audit initially marked all 212 static tests P0 because it still looked under `app/tests/{slug}/test/result` after result routes moved to `app/results/{slug}`.
- Added a behavioral regression test and updated result page/layout/global enhancement lookup; rerun reports all 1,433 records Pass.
- Alarm-habit metadata/schema/UI advertised 8 questions while the engine defines 12. Added a contract test, corrected both metadata counts and visible copy, and removed the unsupported word `정확하게`.
- The expanded audit found three more verified mismatches: K-drama 10→12, K-pop 8→12, Snow White 10→12. All were corrected without changing questions or scoring.
- Review repairs: advertised-count regex accepts spacing, inventory derives from the route tree and includes static+database overlap, independent representative source fixtures guard the parser, alarm stale copy is asserted absent, and wrapper tests write only to verified OS temp directories.

## M0 Observation Classification

- EV01: public total changed from historical 879; current source/count contract still requires reconciliation.
- EV02: live llms.txt now reports 870 tests and 25 posts; source consistency remains a follow-up.
- EV03: CONFIRMED and first instance repaired — alarm-habit actual 12 vs displayed 8.
- EV04: CONFIRMED — internal English title is visible in phone-social-media metadata; content/title change routed out of site-optimizer automatic scope.
- EV05: PARTIAL — generic 16-type structure overlaps, but identical scoring is not proved.
- EV06: CONFIRMED — category/page controls are client-only buttons; `/tests?page=2` equals `/tests`.
- EV07: PARTIAL — fixed/fallback participant and rating values exist; fabrication is not established.
- EV08: CONFIRMED technical gap — analytics/results can store/send URL/search/answers/IP/UA without a discovered CMP consent gate; legal status UNKNOWN.
- EV09: STALE — robots, sitemap and ads.txt now return 200.
- EV10: UNCONFIRMED — historical claims not reproduced.

## Completion Evidence

- Application M0 and M1 evidence is not yet complete.
