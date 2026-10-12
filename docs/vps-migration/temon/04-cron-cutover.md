# Cron control and cutover

## Current owner
Vercel production SHA1b924c2 retains two0 * * * * UTC crons. No settings changed. VPS has NO scheduler. TEMON_CRON_ENABLED=false, TEMON_GENERATION_ENABLED=false, CRON_SECRET absent; missing/invalid auth401 before DB/provider, authenticated disabled503.

Gemini is unused per user: do not provision GOOGLE_API_KEY or GOOGLE_GENERATIVE_AI_KEY on VPS and do not schedule generation. Source remains compatible but disabled; existing manual scripts are never invoked. Existing Vercel Gemini env removal still needs explicit production-settings scope.

## Implemented safeguards
Constant-time failclosed bearer auth. Existing pending->processing conditional update preserves atomic generation claim; transaction saves draft. Generation is not activated; stale processing recovery remains manual review only, never blindly requeue after uncertain provider success.
Publish keeps >=90 quality and conditional draft->published update. One-process mutex409 rejects concurrent publisher/retry; provider unconfigured or unsuccessful submission is failed/retryable. Published DB row is independent of external submission failure. Mock tests prove behavior without real Gemini, IndexNow/GSC or production DB.

## Limits
No durable crosshost lease/outbox or external provider idempotency key. A crash after external success before recording can resubmit. Retry scanning latest50/batch10 can starve older pending rows; idle-only retry remains. Process mutex does not coordinate Vercel/VPS or multiple replicas. These remain production activation blockers; do not claim exactly-once or zero duplicate Gemini proof.

## Approval sequence
1. Final revision/backup/checks and UTC last-run/job IDs baseline.
2. Explicitly approve DNS/TLS ingress change separately.
3. Disable old Vercel cron owner and prove no in-flight job; no grace interval guesses.
4. Approve VPS publisher-only scheduler (generation stays disabled), hourly UTC with host flock and protected bearer injection, no daemon inside app.
5. Verify DB IDs/state and logs across two consecutive windows; audit duplicate publication/submission. Never overlap owners.
6. On rollback stop new scheduler before restoring Vercel ownership; preserve writes and submitted state. DNS rollback alone is insufficient.

No cron handover occurred.

## 2026-10-12 승인 후 단일 운영 제어권
Vercel 전체 Temon Cron을 disabledAt=1791780854343으로 중지했고 API 재확인했다. 정의2개는 복구용으로 보존. VPS 생성은 TEMON_GENERATION_ENABLED=false이고 Gemini 키 없음. generate 스케줄을 설치하지 않는다.
publish만 UTC 매시 정각 systemd timer, Persistent=false(중단 시간 밀린 작업을 몰아 실행하지 않음), flock /run/temon-publish.lock, 컨테이너 내부 localhost 인증 호출. secret은 컨테이너 환경에만 유지하고 job 출력은 상태/발행 여부만 허용.
초기 draft 선점은 id+draft+원본 metadata+원본 scheduled_at을 비교한다. 품질90 이상 게이트 유지. 선점과 동시에 durable submitting marker를 저장하고, 외부 제출 성공 여부가 모호하면 marker를 유지하여 자동 재제출하지 않는다. 일부 성공/불명확 상태는 수동 검토, 양쪽에 미제출이 확인된 실패만 CAS로 재시도한다. DB 발행은 외부 제출 실패와 분리한다.
격리 mock/실제 in-memory libSQL 회귀로 중복 요청, CAS 경쟁, 품질 변경/일정 변경 경쟁, 외부 실패, 인증 및 missing secret 거부 검증. 운영 큐260개: 완료222/실패38/pending0/processing0; 생성 재처리 없음. VPS 타이머 최종 활성 시각/실제 job 결과는 최종 handoff 참조.

## 최종 운영 확인 — 2026-10-12 17:08 KST
상태 PRODUCTION_ON_OVH / CUTOVER_COMPLETE. DNS 4개 authoritative 서버 A51.79.206.71/www CNAMEtemon.kr 일치. 공개 HTTPS health와 최신 main18c397c098e8f3499af66764889aaa4dee67e386 일치. Caddy apex/www 자동 인증서 발급 완료, Temon 수동 tls 두 줄만 제거하여 기존 공용 Caddy에 자동 갱신 설정 영속화; 다른 앱 블록 바이트 동일, 프록시 재시작 없음. Temon 수동 certbot renewal 파일은 전용 recovery로 보존 이동, 다른 인증서와 timer 변경 없음. www308 유지. VPS publisher 06/07/08UTC 실제 hourly 실행 HTTP200 idle 성공, Vercel Cron/Git 배포 비활성 재확인. Gemini env 없음/생성 비활성. Temon healthy restart0 OOMfalse, TodayPharm/LocalGEO HTTP200. Vercel 배포는 rollback standby로 보존, 프로젝트 삭제/정지 없음. 비용 절감액 미측정. 매일 offsite 백업/외부 장애 알림, 장시간 부하 시험 및 build-chain audit8 후속 개선은 미완료이며 기능 전환 완료와 구분한다.
