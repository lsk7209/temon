# Temon OVH migration — final handoff

Status: PRODUCTION_ON_OVH / CUTOVER_COMPLETE.
Verified 2026-10-12 08:08 UTC / 17:08 KST after the requested one-hour check also passed at06:48 UTC.

## Production

https://temon.kr serves OVH51.79.206.71. All4 authoritative DNS servers return the new apex A and www CNAMEtemon.kr. Trusted HTTPS200, www308 and both Caddy managed certificates PASS. Persisted Caddy configuration now uses automatic TLS; only Temon manual TLS directives removed, all preceding other-site blocks byte-identical, no shared ingress restart. Manual certificate and renewal configuration retained in protected recovery for rollback.

Deployed application source:18c397c098e8f3499af66764889aaa4dee67e386, image temon-ovh:production-18c397c098e8f349. Original Vercel/source baseline1b924c2ef8ba77f8ac4d759446b3dfd34b0f47c5 preserved at E:/web/temon. Documentation-only final commit may follow this application revision; report actual deployed revision independently.

Dedicated /opt/temon-production Compose application, nonroot, no host application ports, CPU1.5/RAM1536MiB, private runtime env and revision-specific cache. Container healthy, restart0, OOMfalse. Other sites TodayPharm/LocalGEO HTTP200; no other application container restart by this migration.

## Automation and data

Vercel Cron disabledAt1791780854343, automatic Git deployments disabled, Gemini production env removed; latest API verification PASS. VPS generation disabled, no Gemini key or generation timer. VPS hourly publisher06/07/08UTC returned HTTP200 success with idle:true, no due publication. Owner/secret gates and queue/CAS regression tests protect duplicate side effects. Existing Vercel deployment retained for rollback; project not deleted or paused.

Auto-deploy polling, bounded health recovery, daily read-only Turso backup timers active. Actual auto-deploy PASS. Resource protection previously deferred a build below8GiB available, then retried successfully without affecting serving image. All9-table snapshots restored to isolated SQLite with integrity/foreign-key/count checks PASS:659 results,36 attempts,1221 tests at backup. No production migration replay or synthetic result writes. Production DB remains existing Turso.

## Validation

51 unit assertions and22 regression assertions PASS; npm ci/lint/typecheck/build and hosting-cost audit verified earlier. Linux Next16.3.8 production builds PASS, fresh read-only old/new comparison home/tests/results/metadata/robots/ads/sitemaps/llms1008 entries PASS. Isolated staging result save/read/idempotency, admin cookies, PNG/PDF export, cache persistence and rollback PASS. No Gemini API calls or live advertising clicks/impressions in tests. Requested one-hour check and final live recheck all listed checks PASS.

## Remaining operational follow-ups

Actual Vercel7/30-day project cost and savings remain UNMEASURED. Daily offsite backup upload and external failure notification delivery not configured; initial snapshot is also protected on PC.24-hour/load testing not performed. npm audit retains8 build-chain findings; implicated packages absent from the running standalone image, no major dependency upgrade performed. Coolify API disabled; isolated Compose/systemd fallback used instead of changing shared management settings. Original generated quality/content policies preserved; no redesign or URL changes.

## Recovery

First stop VPS publisher and inspect in-flight markers before restoring Vercel publisher ownership; keep Gemini generation disabled. Restore old DNS A216.150.1.1 and www a276fe699a3cdd47.vercel-dns-017.com when needed; Vercel deployment retained. Restore Temon previous image/env/cache with its dedicated compose service only. Never overwrite current production Turso with an old snapshot; restore into a new isolated DB and reconcile legitimate user writes. See06-deployment-runbook.md and04-cron-cutover.md.

Changed code/config: Dockerfile/.dockerignore/Next standalone, fail-closed cron ownership and publisher CAS, protected health/IP/admin/staging controls, env inventory, isolated compose and systemd deploy/publish/health/backup operations, mock/isolated tests, read-only comparison and all8 migration documents. Full committed changes are visible in the migration commits96f3d244/f89e7e1a/18c397c0. All8 records are under docs/vps-migration/temon.
