# Draft Quality Gate Report | 2026-05-27

## Scope
- Target: due draft quizzes in Turso DB.
- Goal: decide whether thin draft results can be allowed into publishing.

## Current Gate
- `app/api/cron/publish/route.ts` requires `metadata.quality.score >= 90`.
- The publisher skips blocked due drafts and publishes the first due draft that passes the quality gate.

## Applied
- Ran `node scripts/score-due-drafts.js --apply`.
- Updated metadata quality scores for due draft tests.

## Result
- Due drafts scored: 65
- Publishable: 64
- Blocked: 1
- Minimum score: 0
- Blocked slug:
  - `jjimdak-vs-chicken-mbti-test-KN2X`
- Main issues on blocked draft:
  - missing/short metadata
  - declared question/result counts invalid
  - actual question/result counts invalid
  - mixed MBTI axes
  - short result summaries

## Decision
- Do not bulk-publish or auto-fix the blocked draft in this pass.
- Keep the quality gate active. The blocked draft remains draft-only and will not be selected as publishable until it is regenerated or repaired.
- The previously noted draft thin-result risk is handled at the publishing boundary for due drafts; non-due drafts should be scored again as they become due.

## Verification
- `node scripts/score-due-drafts.js`: dry-run showed 64 publishable and 1 blocked.
- `node scripts/score-due-drafts.js --apply`: applied the same scores to DB metadata and reported `OK: scored 65 due drafts`.
- No publishing endpoint was invoked, so no draft was released by this verification.
