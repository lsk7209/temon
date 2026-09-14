# Goal

## Final Deliverable
Replace English placeholder quiz titles passed to shared intro support sections on eight scoped test landing pages with their established Korean titles.

## User Value
Korean landing pages no longer render English generator-style test names inside Korean guidance content.

## Required Features
- Korean `quizTitle` values for every scoped `AnswerEngineSection` and `LandingConversionSection` call.
- Preserve existing topic-specific helper routing and all quiz behavior.
- Keep participant/rating values unchanged and separately evidence-gated.

## Non-Goals
- No question, scoring, result-route, metadata, canonical, participant/rating, push, or deployment changes.

## Done Conditions
- Failing-first focused contract, typecheck, lint, build, and hydrated browser smoke pass.

