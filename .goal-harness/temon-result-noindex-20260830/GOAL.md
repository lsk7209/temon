# Goal

Ensure every public `https://temon.kr/results/*` result route emits a `noindex, follow`
robots directive, without changing quiz content, result behavior, advertising settings, or
indexability outside the result-route boundary.

## Done condition

- A reproducible HTTP audit fails against the current live defect and passes against the fix.
- The `/results` route boundary owns a static `noindex, follow` policy.
- Targeted audit, lint, typecheck/build, and local production-mode HTTP probes pass.
- Only the scoped fix, regression audit, and durable handoff evidence are committed.
- The exact pushed Git SHA passes GitHub checks and the live site emits `noindex` on representative
  static result routes.

## Evidence target

- Pre-fix live HTTP response evidence.
- Git diff and targeted audit output.
- Fresh `npm run build` output and local `next start` HTTP audit.
- Exact GitHub commit/check evidence and post-deploy live HTTP audit.

## Stop condition

Stop after live verification succeeds, or before push if validation reveals a regression or a
required external mutation beyond the already-authorized Git-connected deployment path.
