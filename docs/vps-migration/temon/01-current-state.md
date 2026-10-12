# Temon current state — 2026-10-12

## Verified baseline
- Original E:/web/temon clean; local and GitHub main SHA 1b924c2ef8ba77f8ac4d759446b3dfd34b0f47c5. Isolated branch migration/ovh-staging-20261012 in apps/temon-ovh. No push.
- Vercel temon-vercel project prj_1VWadkwaHjY6J7BCdlwPk3hsLRuS; production dpl_J7Ze2CnCHUaeKm5XRWEaGvd787nq READY, October 3; temon.kr/www aliases; Node22.x. Official deployment API verified production SHA1b924c2ef8ba77f8ac4d759446b3dfd34b0f47c5, branch main; both hourly crons present. Example Function 2048MiB/300s/iad1. Source SHA equivalence verified (environment/rendered data remain separate).
- Production env names queried without values: TURSO_DATABASE_URL, TURSO_AUTH_TOKEN, GOOGLE_API_KEY, CRON_SECRET, INDEXNOW_KEY, NEXT_PUBLIC_APP_URL, NEXT_PUBLIC_ADSENSE_PUB_ID, NEXT_PUBLIC_ADSENSE_DELIVERY_ENABLED, NEXT_PUBLIC_ADSENSE_RESULT_SLOT_ID, GSC_SITE_URL, GSC_SITEMAP_URL, GOOGLE_SERVICE_ACCOUNT_JSON. ADMIN_TOKEN/ADMIN_PASSWORD/IP_HASH_SALT not listed: configuration gap, no values fetched.
- VPS identity vps-ce781f0f, ubuntu, pinned SSH config; 6CPU, RAM11676MiB/available9224MiB, root96GiB/free31GiB/68%. Coolify4.4.6 healthy/private; API disabled. Existing public80/443 owned by TodayPharm Caddy. Do not replace or modify shared ingress.
- Twelve existing running containers; TodayPharm and Localgeo production plus isolated validation apps healthy. Public todaypharm.kr/localgeo.app HTTP200. No failed systemd units.
- Another TodayPharm build started during Temon build; do not stop foreign work. Observed available RAM6463MiB during overlap, no OOM evidence. Future build must coordinate a shared serial lock.

## Source discrepancies and gates
- result_attempts migration application claims conflict across STATUS and September29 audit. Read-only SELECT verified tables tests/test_results/result_attempts/test_queue; counts1221/659/36/260, queue222completed/38failed. No production migrations run.
- Gemini key omitted from all new deployment/test inputs per user; generation disabled. Existing Vercel env and cron unchanged.
- Costs/7day/30day usage/cron execution history not yet retrieved: unmeasured, never estimate savings.
- Existing hostname redirect is Vercel-managed; VPS cutover must preserve308 www-to-apex explicitly.

## 2026-10-12 승인 후 운영 전환 기록 (이전 미승인 상태를 대체)
사용자가 전체 이전 완료와 자율 실행을 명시적으로 승인했다. 원본/GitHub/Vercel 기준 SHA는 1b924c2ef8ba77f8ac4d759446b3dfd34b0f47c5. 실제 프로젝트 temon-vercel / prj_1VWadkwaHjY6J7BCdlwPk3hsLRuS, 성공 배포 dpl_J7Ze2CnCHUaeKm5XRWEaGvd787nq, Node22. Vercel Cron disabledAt=1791780854343; Git 자동 배포 disabled. Production GOOGLE_API_KEY 제거, 기존 배포는 보존.
VPS 6vCPU/11676MiB RAM/96GiB root disk, Coolify4.4.6 API 비활성. 기존 Caddy를 재사용하는 전용 Compose fallback으로 /opt/temon-production에 운영 앱 배치. 검증 앱 /opt/temon-staging은 격리 SQLite와 내부 네트워크를 유지한다.
운영 최초 이미지 temon-ovh:production-20261012-v1, digest sha256:ee3a787489af528915ed897a579fac2d70dc70986059789fa40b69e5dfe6e940. 직접 VPS HTTPS health 정상; 운영 main commit 배포와 전역 DNS 검증은 진행 중.
