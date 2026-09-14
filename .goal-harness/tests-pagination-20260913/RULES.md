# Rules

1. Do not declare completion without fresh tests and HTTP evidence.
2. Preserve existing search, filter, card, analytics, and database behavior.
3. Keep the diff limited to the tests-list pagination slice.
4. Do not add dependencies or temporary production logic.
5. Do not expose secrets or environment values.
6. Do not write production data, deploy, push, or change live configuration.
7. Record failures and their repairs truthfully.
8. Preserve all unrelated dirty work.
