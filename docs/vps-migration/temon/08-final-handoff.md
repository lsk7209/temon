# Temon OVH migration — production cutover in progress

Status: CUTOVER_IN_PROGRESS (user approved full production migration on 2026-10-12).
Original/Vercel/GitHub baseline: 1b924c2ef8ba77f8ac4d759446b3dfd34b0f47c5. Original E:/web/temon preserved. Migration isolated branch migration/ovh-staging-20261012; main release commit is pending final review.

VPS /opt/temon-production, dedicated Compose, initial image temon-ovh:production-20261012-v1 is healthy through trusted existing Caddy HTTPS. DNS UI saved A51.79.206.71/www CNAMEtemon.kr; TCP authoritative nameservers show new IP, public resolvers still show old IP at this checkpoint. Valid manual TLS protects early arrivals; Caddy managed certificate warmup underway.

Vercel Cron disabledAt1791780854343 and Git automatic deployments disabled, GOOGLE_API_KEY removed. VPS Gemini generation false, no Gemini keys or scheduler. Publisher timer installed but not yet activated. Dedicated health and daily read-only backup timers active and actual runs PASS. New runtime main image and final global DNS/cron/rollback checks remain.

Security review repairs: initial publisher claim checks original quality metadata and schedule; missing/invalid secret or owner fails before DB; strict runner rejects malformed200; safe failure diagnostics. No DB migrations or synthetic writes to production. Existing659 results and36 attempts preserved; 9-table snapshot restored integrity/foreign-key/count checks PASS. Other production sites200, no container restarts by this migration; existing shared ingress received only Temon routes/network declaration.

Remaining checks: final reviewed main commit/image deployment, llms1008 runtime parity, managed TLS completion, public DNS propagation, publisher ownership/job proof, automatic deployment and final handoff. Costs UNMEASURED; npm audit8 build-chain findings remain, packages absent in actual standalone runtime. Coolify integration not used because existing instance API disabled; dedicated Compose/systemd fallback is documented. Daily offsite backup upload and external failure notifications remain operational follow-ups.

See 01–07 for full source/env, backup, architecture, test and rollback records. This file is the single migration progress record; no completion claim until actual DNS and production checks finish.
