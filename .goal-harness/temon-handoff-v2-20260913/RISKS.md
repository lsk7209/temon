# RISKS

| Risk | Impact | Likelihood | Mitigation | Status |
|---|---|---|---|---|
| Dirty work overwritten | High | Low | no stash/reset/clean; path ownership and before/after status | Controlled |
| Stale handoff claims | Medium | Medium | rerun drift-prone Git, HTTP and test checks | Active |
| Live ads/privacy side effects | High | Low | no ad clicks/account mutation; static/local checks first | Controlled |
| Missing DB/API credentials | Medium | Medium | mark unknown/skipped; do not fabricate zero or pass | Active |
| Broad M1 scope | High | Medium | choose one P0 R1 slice with regression test | Controlled |
| URL/index/scoring semantic changes | High | Low | preparation only unless explicitly approved | Controlled |
