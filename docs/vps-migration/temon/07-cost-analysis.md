# Cost analysis

Temon historical project cost7/30days: UNMEASURED. Usage invocations/CPU/memory/ISR/CDN/network and cron history: UNMEASURED. No numeric saving estimate. Existing VPS already purchased; marginal CPU/RAM/disk use is not a measured currency saving. Turso/Gemini/other account charges remain separate. Gemini VPS calls0 by disabled scheduler, omitted keys and blocked egress; provider billing dashboard not queried.

Static audit passed and reports both24/day Vercel cron paths; this is schedule arithmetic, not billing or actual invocation proof. Preserve live-cost-watch/hosting-cost-guard and portfolio monitoring; none deleted or edited. Separate Temon VPS observations in next reporting slice.

Record same UTC windows/project IDs before/after: Vercel bill/export/project usage, VPS cgroup sampled CPU/memory peak/OOM/restarts/disk/network, Turso reads/writes/storage, AI calls/billing (generation disabled), backup/monitor storage/transfer. Run7days and30days before claiming savings. Before cutover Vercel remains active, so savings have not begun.

## 2026-10-12 비용 계측 상태
실제 Temon Vercel 프로젝트별7/30일 비용은 미측정. 절감액/절감률 추정 금지. Cron 중지 및 Git 자동 배포 중지, DNS 전환으로 Temon 웹 트래픽을 VPS로 이동한다. Vercel 기존 성공 배포는 rollback용으로 보존하고 최종 DNS 확인 후 pause 여부를 handoff에 기록한다.
VPS 기존 월 요금은 고정 공동 비용이며 추가 청구액을 확인하지 않았다. Temon 운영 cap1536MiB/CPU1.5, 실제 초기 메모리 약140MiB. 빌드 cap5GiB/CPU3. 디스크 잔여20GiB 안팎; 다른 병행 작업이 있어 전체 증감을 Temon 비용으로 귀속하지 않는다. 기본 Turso 유지, Gemini키 제거/생성스케줄 없음. GSC/IndexNow 외부 연동 유지.
단일 Temon health job의 container CPU/memory/OOM/restart, host memory/disk를 journal에 기록. Vercel 대시보드 프로젝트 사용량, Turso 대시보드 호출/저장, OVH 메트릭/청구를 같은 기간으로 비교해야 금전 절감 확정이 가능하다. 기존 포트폴리오 비용 감시 GitHub Actions는 삭제하지 않았다. 소스 비용 audit는 Vercel Cron 정의2개를 계속 경고하지만 실제 scheduler는 disabled이다.
