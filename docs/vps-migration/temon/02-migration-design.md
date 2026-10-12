# Migration design

Visitor -> existing domain/CDN -> approved HTTPS ingress -> dedicated single Temon Next standalone container -> existing Turso. Database migration is excluded.

## Implemented private staging
Dedicated /opt/temon-staging; Compose project temon-staging; node uid1000; internal isolated Docker network; port3000 exposed internally only. SSH tunnel forwards operator loopback18176 to inspected container IP:3000. Never publish host port;18086 is owned by another application. RAM768MiB/CPU1/PIDs128, no-new-privileges, all capabilities dropped, bounded5MiB x2logs, health every30s, unless-stopped restart. Synthetic SQLite volume only; remote DB URL/token causes startup rejection. No Gemini keys, no scheduler, no search credentials, no production admin cookies.

## Coolify integration gap
Coolify4.4.6 is healthy but API globally disabled and current applications use heterogeneous Compose deployments. Existing public ingress is TodayPharm-owned Caddy, Coolify proxy stopped. Private staging uses Docker/Compose directly. No global API setting or shared proxy was changed. Coolify-managed temon-staging/production registration and Git-based automatic deployment remain NOT IMPLEMENTED; source branch is deliberately unpushed. Never point Coolify main at an unreviewed migration revision.

## Cache and deployment
One Node process only. Current image contains prerendered static pages and writable node-owned .next/cache; a dedicated node-owned cache volume now persists a marker through forced container recreation. Full ISR/tag invalidation semantics remain unverified. Production needs revision-scoped cache volume and cold/warm/tag invalidation tests before readiness. Do not reuse HTML cache across incompatible revisions or add Redis without evidence. Deploy immutable source/image hashes. Build memory flags used with BuildKit may not enforce actual cgroup limits; actual sampling and a shared build coordinator remain needed. Initial overlap with foreign TodayPharm build observed; preserve foreign jobs.

Official references: https://nextjs.org/docs/app/guides/self-hosting and https://nextjs.org/docs/app/api-reference/config/next-config-js/output ; Coolify https://coolify.io/docs/applications/builds/docker-compose .


## 2026-10-12 승인 후 운영 설계 확정
기존 Caddy HTTPS → temon_runtime의 temon-web:3000 → standalone Node22/Next16.3.8 → 기존 Turso. 새 프록시/Redis/DB를 설치하지 않았다. 호스트 포트3000 공개 없음. UID1000, cap_drop ALL, no-new-privileges, CPU1.5/RAM1536MiB/PID128, 로그5MiB×3, health30초, restart unless-stopped.
배포별 temon-production-cache-{revision} 볼륨으로 빌드 간 캐시를 분리한다. 단일 인스턴스, 앱 상태는 Turso에 유지. staging 데이터/캐시는 별도이다. 기존 공유 ingress에는 Temon 호스트 라우트와 외부 네트워크 선언만 추가했고 다른 앱 재시작/볼륨/환경변수 변경은 없다.
3GiB 빌드가 TypeScript에서 OOM137로 실패하여, 가용8.6GiB 확인 후 빌드 한도5GiB/CPU3으로 성공. 자동 배포는 RAM8GiB/디스크12GiB 여유가 없으면 거부한다. 포트폴리오 전체 빌드 락은 없으므로 동시 다른 앱 빌드가 시작되면 다음 실행으로 보류해야 한다.
Coolify API 전역 활성화는 하지 않는다. 전용 systemd main polling 배포/health/backup/publish를 사용한다. 배포 전용 락과 publisher 락을 공유하여 교체와 발행을 직렬화한다.

## 최종 운영 확인 — 2026-10-12 17:08 KST
상태 PRODUCTION_ON_OVH / CUTOVER_COMPLETE. DNS 4개 authoritative 서버 A51.79.206.71/www CNAMEtemon.kr 일치. 공개 HTTPS health와 최신 main18c397c098e8f3499af66764889aaa4dee67e386 일치. Caddy apex/www 자동 인증서 발급 완료, Temon 수동 tls 두 줄만 제거하여 기존 공용 Caddy에 자동 갱신 설정 영속화; 다른 앱 블록 바이트 동일, 프록시 재시작 없음. Temon 수동 certbot renewal 파일은 전용 recovery로 보존 이동, 다른 인증서와 timer 변경 없음. www308 유지. VPS publisher 06/07/08UTC 실제 hourly 실행 HTTP200 idle 성공, Vercel Cron/Git 배포 비활성 재확인. Gemini env 없음/생성 비활성. Temon healthy restart0 OOMfalse, TodayPharm/LocalGEO HTTP200. Vercel 배포는 rollback standby로 보존, 프로젝트 삭제/정지 없음. 비용 절감액 미측정. 매일 offsite 백업/외부 장애 알림, 장시간 부하 시험 및 build-chain audit8 후속 개선은 미완료이며 기능 전환 완료와 구분한다.
