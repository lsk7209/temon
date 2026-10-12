# Cost analysis

Temon historical project cost7/30days: UNMEASURED. Usage invocations/CPU/memory/ISR/CDN/network and cron history: UNMEASURED. No numeric saving estimate. Existing VPS already purchased; marginal CPU/RAM/disk use is not a measured currency saving. Turso/Gemini/other account charges remain separate. Gemini VPS calls0 by disabled scheduler, omitted keys and blocked egress; provider billing dashboard not queried.

Static audit passed and reports both24/day Vercel cron paths; this is schedule arithmetic, not billing or actual invocation proof. Preserve live-cost-watch/hosting-cost-guard and portfolio monitoring; none deleted or edited. Separate Temon VPS observations in next reporting slice.

Record same UTC windows/project IDs before/after: Vercel bill/export/project usage, VPS cgroup sampled CPU/memory peak/OOM/restarts/disk/network, Turso reads/writes/storage, AI calls/billing (generation disabled), backup/monitor storage/transfer. Run7days and30days before claiming savings. Before cutover Vercel remains active, so savings have not begun.

## 2026-10-12 비용 계측 상태
실제 Temon Vercel 프로젝트별7/30일 비용은 미측정. 절감액/절감률 추정 금지. Cron 중지 및 Git 자동 배포 중지, DNS 전환으로 Temon 웹 트래픽을 VPS로 이동한다. Vercel 기존 성공 배포는 rollback용으로 보존하고 최종 DNS 확인 후 pause 여부를 handoff에 기록한다.
VPS 기존 월 요금은 고정 공동 비용이며 추가 청구액을 확인하지 않았다. Temon 운영 cap1536MiB/CPU1.5, 실제 초기 메모리 약140MiB. 빌드 cap5GiB/CPU3. 디스크 잔여20GiB 안팎; 다른 병행 작업이 있어 전체 증감을 Temon 비용으로 귀속하지 않는다. 기본 Turso 유지, Gemini키 제거/생성스케줄 없음. GSC/IndexNow 외부 연동 유지.
단일 Temon health job의 container CPU/memory/OOM/restart, host memory/disk를 journal에 기록. Vercel 대시보드 프로젝트 사용량, Turso 대시보드 호출/저장, OVH 메트릭/청구를 같은 기간으로 비교해야 금전 절감 확정이 가능하다. 기존 포트폴리오 비용 감시 GitHub Actions는 삭제하지 않았다. 소스 비용 audit는 Vercel Cron 정의2개를 계속 경고하지만 실제 scheduler는 disabled이다.

## 최종 운영 확인 — 2026-10-12 17:08 KST
상태 PRODUCTION_ON_OVH / CUTOVER_COMPLETE. DNS 4개 authoritative 서버 A51.79.206.71/www CNAMEtemon.kr 일치. 공개 HTTPS health와 최신 main18c397c098e8f3499af66764889aaa4dee67e386 일치. Caddy apex/www 자동 인증서 발급 완료, Temon 수동 tls 두 줄만 제거하여 기존 공용 Caddy에 자동 갱신 설정 영속화; 다른 앱 블록 바이트 동일, 프록시 재시작 없음. Temon 수동 certbot renewal 파일은 전용 recovery로 보존 이동, 다른 인증서와 timer 변경 없음. www308 유지. VPS publisher 06/07/08UTC 실제 hourly 실행 HTTP200 idle 성공, Vercel Cron/Git 배포 비활성 재확인. Gemini env 없음/생성 비활성. Temon healthy restart0 OOMfalse, TodayPharm/LocalGEO HTTP200. Vercel 배포는 rollback standby로 보존, 프로젝트 삭제/정지 없음. 비용 절감액 미측정. 매일 offsite 백업/외부 장애 알림, 장시간 부하 시험 및 build-chain audit8 후속 개선은 미완료이며 기능 전환 완료와 구분한다.
