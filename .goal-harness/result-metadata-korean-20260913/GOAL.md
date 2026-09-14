# Goal

## Final Deliverable
Replace English metadata in eight static result layouts with accurate Korean titles and descriptions aligned to each existing quiz.

## User Value
Korean users and search engines see understandable, topic-correct result metadata instead of English generator residue.

## Required Features
- Korean `quizTitle`, `title`, and `description` in all eight scoped layouts.
- Preserve each canonical, metadata helper, child rendering, and route.

## Non-Goals
- No result-content/scoring change, bulk layout refactor, participant/rating change, index-policy change, push, or deployment.

## Done Conditions
- Focused eight-file regression, typecheck, lint, build, and representative/all-route HTTP metadata smoke pass.

## User-Visible Result
The eight result pages expose Korean browser/search metadata matching their test topics.
