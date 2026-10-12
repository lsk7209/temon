# Test results — 2026-10-12

## Passing evidence
- npm ci clean isolated clone (initial local ignore-scripts; Linux Docker npm ci runs scripts) exit0.
- Before patch28unit/22regression PASS; after16.3.8 and cron/IP changes37unit/22regression PASS. npm lint and tsc PASS. git diff-check PASS. Focused result idempotency/contracts/attempt PASS in memory incl concurrent replay/conflict/missing-table legacy behavior.
- Local standalone build16.3.8 exit0,1106static pages; VPS Docker builds successful. Initial filesystem tracing warning fixed with turbopackIgnore for runtime-mounted service account paths; no credentials ever in source/build context.
- Real private VPS initial image healthy, node user,768MiB/1CPU/128PID,0restarts/OOMfalse; internal egress probe blocked, no secret env names. Staging startup guard forbids remote DB URL/token.
- scripts/staging-smoke.mjs PASS: home/list/test/results/robots/sitemap/ads200 and noindex; missing-secret cron401; synthetic result201, replay200same ID,5concurrent replays same ID, retrieval, invalid result422, admin401.
- Real Playwright browser12coffee answers -> /results/coffee-mbti?type=ESTJ. Inspected390x844mobile and1440x900desktop screenshots: no horizontal overflow, result rendered. External script URLs empty; browser error console0. First image still sent local analytics endpoint requests (no remote token/no production DB); final image additionally disables central consent collection. Fresh final-image browser check required after replacement.
- Live vs staging nine URL HTTP statuses all200; robots body identical. ads.txt normalized publisher row identical pub-3050601904412736. HTML/sitemap/llms bodies differ (staging isolated DB, framework version/build IDs and runtime generation); full production DB-backed content parity NOT claimed. Legacy result route308 to /results/coffee-mbti.
- Production SELECT inventory table existence verified1221tests/659results/36attempts/260queue, no INSERT/UPDATE/migration. This proves access/schema snapshot, not a backup or all-row checksum.
- Independent native code review found0issues in private staging scope; focused12tests/lint/typecheck/syntax PASS.

## Explicitly incomplete
- Full production content snapshot/build equivalence, existing private saved-result URL sampling, all test categories/search/pagination interactive paths.
- Public www308/TLS/forged-forwarding ingress, persistent ISR cache/tag invalidation/revision compatibility.
- Coolify-managed Git automatic deployment; host-wide build serialization; durable search outbox/crosshost exactly-once; crash processing recovery.
- Real external submission/paid Gemini/GA/AdSense tests deliberately NOT RUN. No ad clicks or external publication.
- npm audit after patch9findings(6high2moderate1low) remains FAIL; no forced major dependency changes. Final image traced dependency audit not yet certified.
- Turso consistent backup + independent full recovery, long7/30day monitor and bills, production cutover are NOT RUN.

Preserve baseline and failure evidence; HTTP200 and container healthy are not full migration approval.

## Final deployed checkpoint — 2026-10-12 11:13 KST
- Final running image temon-ovh:staging-release-20261012, digest sha256:95a2e2f30b75e2b72054ab0559432b4fe1349d5ce8d21741b56a29dc914d7745.
- Linux Docker build exit0. Source archive SHA256769b483b77c69d043529cde69a50dcb92cb65a6878b36d8411e08ceb2c159ebe matched PC/VPS. Source is base SHA plus uncommitted migration changes; archive excludes secrets/DB/evidence. Compose image tag updated after archive to final release; do not represent archive as a Git commit.
- Final staging smoke PASS; final browser12question coffee flow PASS to ESTJ result, no overflow/external scripts. Saved synthetic ID survived image replacement.
- Rollback to previously tested temon-ovh:staging-20261012: saved synthetic result retrieval200; restored final release healthy and repeated smoke PASS. This is isolated same-host image/volume rollback, not full independent disaster recovery.
- All13running containers healthy where health defined; other-site HTTP200. TodayPharm production restarted by another concurrent workflow, not this task. No attribution of performance changes without before/after timing baseline.
- Temon113MiB/768MiB,CPU0.03%, restart0/OOMfalse/node. Host available8739MiB, disk19GiB/81%; Localgeo momentarily104%CPU(one core equivalent), so do not claim zero contention or long-term performance safety.

## Final isolated runtime checks
- Private synthetic admin login/session/logout PASS; HttpOnly/Secure/SameSite=lax/Path=/ and eight-hour expiry verified. Correct cron bearer still503 for both disabled jobs; no Gemini/Turso token.
- Browser PNG download1237251bytes; NTRP v2 level3.5 PDF download36490bytes, download failure=null. Saved result page rendered. Existing recommended /travel-mbti route404 observed; broader navigation parity remains open.
- Dedicated cache volume marker survives forced recreation PASS. Initial root ownership repaired only on the inspected Temon cache volume to uid/gid1000; dropped-capability app could not chown it. This proves persistence, not ISR invalidation/revision compatibility.
- Latest smoke PASS after env/cache recreation. Healthy, restart0, OOMfalse; host RAMavailable8919MiB, disk19GiB free81%used; existing todaypharm/localgeo HTTPS200.
- Final runtime manifest/testing scripts were updated after the release source archive. Application image digest remains unchanged; testing scripts copied separately, not baked into image.

## 2026-10-12 추가 운영 검증
최초 Linux 운영 Docker build: Next16.3.8/TSC/1106 정적 페이지 PASS, 비밀 없는 빌드. 3GiB OOM 원인 확인 후 5GiB 재시도 PASS. llms.txt/llms-full.txt/ai-index.json이 빌드 시 fallback158개에 고정되는 실제 차이를 발견하여 force-dynamic으로 수정했고 DB 없는 빌드에서 동적 경로 표시 PASS. 새 운영 이미지의1008개 목록 재검증은 final handoff 참조.
기존 Vercel/VPS GET 비교: 홈/커피/페이지2/food 카테고리/실제 DB 테스트의 title/canonical/robots/JSON-LD 일치, 기존 저장 결과 API JSON 일치, 결과 noindex 일치. robots/ads.txt/sitemap 정상; ads.txt의 Windows CRLF는 내용 정규화, sitemap-index의 생성시각은 정규화 후 비교한다. 광고는 자사 JS asset 설정만 검사하며 외부 광고 로딩/클릭하지 않는다.
기존 격리 검증: 결과 저장/재시도/경쟁 멱등성, coffee12문항 ESTJ, 관리자 cookie/login/logout, PNG1237251bytes/PDF36490bytes, cache persistence, retained-result rollback PASS. 실제 운영 결과 POST, 실제 Gemini 생성, 실제 광고 클릭/측정 수익, 장기24시간 부하 시험은 미실행.
Turso 전환 전 snapshot64542398bytes를 PC/VPS 별도 격리 SQLite에 복원: integrity_check=ok, foreign_key_check=0,9테이블 행 수 모두일치. 테스트 결과659/attempt36 보존; 운영 마이그레이션 재실행 없음. 일일 read-only 백업 실제 실행도 checksum PASS.

## 최종 운영 확인 — 2026-10-12 17:08 KST
상태 PRODUCTION_ON_OVH / CUTOVER_COMPLETE. DNS 4개 authoritative 서버 A51.79.206.71/www CNAMEtemon.kr 일치. 공개 HTTPS health와 최신 main18c397c098e8f3499af66764889aaa4dee67e386 일치. Caddy apex/www 자동 인증서 발급 완료, Temon 수동 tls 두 줄만 제거하여 기존 공용 Caddy에 자동 갱신 설정 영속화; 다른 앱 블록 바이트 동일, 프록시 재시작 없음. Temon 수동 certbot renewal 파일은 전용 recovery로 보존 이동, 다른 인증서와 timer 변경 없음. www308 유지. VPS publisher 06/07/08UTC 실제 hourly 실행 HTTP200 idle 성공, Vercel Cron/Git 배포 비활성 재확인. Gemini env 없음/생성 비활성. Temon healthy restart0 OOMfalse, TodayPharm/LocalGEO HTTP200. Vercel 배포는 rollback standby로 보존, 프로젝트 삭제/정지 없음. 비용 절감액 미측정. 매일 offsite 백업/외부 장애 알림, 장시간 부하 시험 및 build-chain audit8 후속 개선은 미완료이며 기능 전환 완료와 구분한다.
