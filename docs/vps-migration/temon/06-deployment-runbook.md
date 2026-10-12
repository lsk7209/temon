# Deployment and recovery runbook

## Private access
ssh -F C:/Users/dlatj/.ssh/ovh1_config ovh1 (pinned identity). Inspect ONLY Temon network IP with docker inspect formatted NetworkSettings.Networks. Forward local127.0.0.1:18176 to that IP:3000; recreate tunnel after container replacement. No DNS or public ports. Apply Compose only with -p temon-staging -f /opt/temon-staging/compose.staging.yaml; never generic prune/down -v or shared ingress change.

## Reproducible deployment
Use isolated apps/temon-ovh branch. npm ci/lint/tsc/test/build and focused result tests; Gemini/Turso production secrets absent. .dockerignore excludes secrets, Git metadata, DB files and evidence. Copy reviewed source archive, compare SHA256, syntax/check Compose, serialize builds with portfolio coordinator (Temon-only flock is not a global lock). Pin base-image digest and resulting image digest; retain old Temon image. Deploy only Temon compose service and --wait, then run scripts/staging-smoke.mjs against direct tunnel. Health200 proves process, synthetic result save/read proves DB; both required.

## Recovery
Reapply prior retained Temon image tag to same isolated project; do not remove volume. Synthetic DB can be rebuilt only into a NEW staging.db path using seed-staging-db.py (refuses existing DB). Test restart/recreation retains saved ID. Production Turso backup/export, remote offsite consistency and complete new-host restore are not proven by this staging SQLite test.

## Pending production configuration
Register dedicated Coolify app with reviewed source/image, auto-deploy initially off, explicit env name allowlist, separate cache/volume, protected ingress overwriting X-Forwarded-For/X-Real-IP and X-Forwarded-Proto. TEMON_TRUST_PROXY stays unset until that ingress is validated. Public port3000 prohibited. Preserve www308/apex, TLS and originals. Supply ADMIN_TOKEN/ADMIN_PASSWORD/IP_HASH_SALT safely at runtime; never put secrets in build args/image/logs. Compile public IDs/consent flags into a distinct production image (staging flag must be false). Confirm DNS TTL, cert issuance and rollback before requesting specific cutover approval.

Do not run npm run deploy or git push main. Do not alter existing Vercel cron, project, production settings, existing site container, backup, or notifications.

Private staging initialization: scripts/staging-test-env.py creates only /opt/temon-staging/.env.staging with random synthetic credentials, mode0600 and exclusive creation. Never print file contents. Compose consumes it at runtime. Cache mount uses temon-staging_temon-staging-cache; inspect its resolved Mountpoint first and set only that volume root uid/gid1000 before launch. No recursive/shared-volume ownership changes. Both data and cache persistence checked after recreation. SSH/private access remains required.

## 2026-10-12 승인 후 실제 운영 절차 (이전 미승인 금지사항 대체)
전용 /opt/temon-production/compose.production.yaml, project temon-production, 서비스 web만 변경한다. 다른 앱/공유 ingress 재시작 및 docker prune 금지. main 자동 배포는 공개 GitHub main polling, marker auto-deploy-enabled가 있어야 실행한다. Vercel Git 배포는 disabled를 유지한다. 새 SHA별 이미지/캐시 빌드, publisher 락 획득, compose up --no-deps --wait web, health revision 일치 확인; 실패 시 이전 .env/image 복원. 이전 이미지와 cache는 삭제하지 않는다.
DNS: A @=51.79.206.71, CNAME www=temon.kr, TTL180; 기존 Google TXT 보존. 복구용 원본 A216.150.1.1 / www a276fe699a3cdd47.vercel-dns-017.com. TLS는 수동 인증서로 먼저 검증, DNS 전파 완료 후 기존 Caddy 자동 인증서 관리로 넘긴다. 전환 중 유효한 기존 인증서는 유지한다. 다른 사이트 블록 byte-prefix 보존.
발행 타이머: sudo systemctl stop temon-publish.timer 로 먼저 중지, 진행 작업/DB marker 확인 후 Vercel Cron을 재개한다. Gemini 생성은 재개하지 않는다. DNS 복구 시 Vercel 프로젝트가 paused라면 official unpause 후 DNS 복구, VPS 발행 중지 선행. 프로젝트/배포/DB 삭제 없음.
앱 복구: /opt/temon-production/.env의 이전 TEMON_IMAGE/APP_REVISION/CACHE_REVISION을 복구용 파일에서 가져와 sudo docker compose -p temon-production -f compose.production.yaml up -d --no-deps --wait web. 운영 DB를 과거 snapshot으로 덮어쓰지 않는다. DB 복구는 새 격리 DB로 복원/검증하여 데이터 일관성과 실제 사용자 입력을 보호한 뒤 별도 판단한다.
매일02:30 UTC temon-backup.timer는 일관된 read-only Turso snapshot과 manifest SHA256을 보호 디렉터리에 저장, 자기 이름의 dated pair7개만 보존. 최초 전환 backup은 PC에도 저장했다. 매일 offsite 업로드/알림 서비스는 아직 미구성이다.
