# RULES

1. Do not declare completion without tests or equivalent validation.
2. Do not break existing working behavior.
3. Do not make unrequested broad rewrites.
4. Do not leave temporary code, dummy logic, or TODO-only work as final.
5. Do not expose `.env`, API keys, tokens, credentials, or secrets.
6. Do not change production DBs, live servers, deploy targets, URL/index rules, or ad settings without explicit approval.
7. Do not add dependencies unless explicitly requested and justified.
8. Do not stash, reset, clean, overwrite, or otherwise disturb existing dirty work.
9. Do not hide failed tests or turn missing evidence into PASS.
10. Record meaningful changes in `CHANGELOG.md` and evidence in `EVIDENCE.md`.
11. Run regression tests before modifying behavior when coverage is missing.
12. Keep implementation complete, local, reversible, and separated from external deployment.
