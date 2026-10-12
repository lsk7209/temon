# Security and environment inventory

Actual code references, names only. Public NEXT_PUBLIC values are compiled at build and must match approved production configuration; other app settings are runtime unless a top-level constant is build-traced. Never copy secret values to images/docs.

| Name | Phase | Staging policy |
|---|---|---|
| ADMIN_PASSWORD | runtime/tool | omit production value; isolated mock only |
| ADMIN_TOKEN | runtime/tool | omit production value; isolated mock only |
| APP_REVISION | runtime/tool | explicit allowlist |
| CRON_SECRET | runtime/tool | omit production value; isolated mock only |
| DAUM_SITE_VERIFICATION | runtime/tool | explicit allowlist |
| GITHUB_ACTIONS | runtime/tool | explicit allowlist |
| GITHUB_STEP_SUMMARY | runtime/tool | explicit allowlist |
| GOOGLE_API_KEY | runtime/tool | omit; generation disabled |
| GOOGLE_APPLICATION_CREDENTIALS | runtime/tool | omit production value; isolated mock only |
| GOOGLE_GENERATIVE_AI_KEY | runtime/tool | omit; generation disabled |
| GOOGLE_SERVICE_ACCOUNT_JSON | runtime/tool | omit production value; isolated mock only |
| GOOGLE_SERVICE_ACCOUNT_JSON_BASE64 | runtime/tool | omit production value; isolated mock only |
| GOOGLE_SERVICE_ACCOUNT_PATH | runtime/tool | omit production value; isolated mock only |
| GOOGLE_SITE_VERIFICATION | runtime/tool | explicit allowlist |
| GSC_INDEXING_API_ENABLED | runtime/tool | omit production value; isolated mock only |
| GSC_PROPERTY_URL | runtime/tool | omit production value; isolated mock only |
| GSC_SITE_URL | runtime/tool | omit production value; isolated mock only |
| GSC_SITEMAP_URL | runtime/tool | omit production value; isolated mock only |
| INDEXNOW_KEY | runtime/tool | omit production value; isolated mock only |
| IP_HASH_SALT | runtime/tool | explicit allowlist |
| NAVER_SITE_VERIFICATION | runtime/tool | explicit allowlist |
| NEXT_PUBLIC_ADSENSE_CLIENT_ID | build/public | explicit allowlist |
| NEXT_PUBLIC_ADSENSE_DELIVERY_ENABLED | build/public | explicit allowlist |
| NEXT_PUBLIC_ADSENSE_PUB_ID | build/public | explicit allowlist |
| NEXT_PUBLIC_ADSENSE_RESULT_SLOT_ID | build/public | explicit allowlist |
| NEXT_PUBLIC_ANALYTICS_CONSENT_MODE | build/public | explicit allowlist |
| NEXT_PUBLIC_API_URL | build/public | explicit allowlist |
| NEXT_PUBLIC_APP_URL | build/public | explicit allowlist |
| NEXT_PUBLIC_CLARITY_ID | build/public | explicit allowlist |
| NEXT_PUBLIC_GA_MEASUREMENT_ID | build/public | explicit allowlist |
| NEXT_PUBLIC_TEMON_STAGING | build/public | explicit allowlist |
| NODE_ENV | runtime/tool | explicit allowlist |
| QUIZ_AUDIT_BASE_URL | runtime/tool | explicit allowlist |
| QUIZ_AUDIT_CONCURRENCY | runtime/tool | explicit allowlist |
| QUIZ_AUDIT_REPORT_DIR | runtime/tool | explicit allowlist |
| QUIZ_AUDIT_TIMEOUT_MS | runtime/tool | explicit allowlist |
| REQUIRE_LIVE_COST_SECRETS | runtime/tool | omit production value; isolated mock only |
| RUN_TURSO_LIVE_CHECK | runtime/tool | explicit allowlist |
| RUN_VERCEL_LIVE_CHECK | runtime/tool | do not emulate Vercel |
| SEARCH_SUBMISSION_RETRY_BATCH_SIZE | runtime/tool | explicit allowlist |
| SEARCH_SUBMISSION_RETRY_SCAN_LIMIT | runtime/tool | explicit allowlist |
| TEMON_CRON_ENABLED | runtime/tool | explicit allowlist |
| TEMON_GENERATION_ENABLED | runtime/tool | explicit allowlist |
| TEMON_STAGING | runtime/tool | explicit allowlist |
| TEMON_TRUST_PROXY | runtime/tool | explicit allowlist |
| TURSO_API_TOKEN | runtime/tool | omit production value; isolated mock only |
| TURSO_AUTH_TOKEN | runtime/tool | omit production value; isolated mock only |
| TURSO_DATABASE_URL | runtime/tool | explicit allowlist |
| TURSO_DATABASES | runtime/tool | explicit allowlist |
| TURSO_EXPECTED | runtime/tool | explicit allowlist |
| TURSO_ORG_SLUG | runtime/tool | explicit allowlist |
| VERCEL | runtime/tool | do not emulate Vercel |
| VERCEL_SCOPE | runtime/tool | do not emulate Vercel |
| VERCEL_TEAM_ID | runtime/tool | do not emulate Vercel |
| VERCEL_TOKEN | runtime/tool | omit production value; isolated mock only |

Verified Vercel env list did not include ADMIN_TOKEN, ADMIN_PASSWORD or IP_HASH_SALT. Local production database credentials used ONLY for SELECT inventory and never transferred. Production secret configuration/rotation is pending a protected deployment procedure. Staging now uses randomly generated, isolated admin/cron/IP-salt credentials in root-only /opt/temon-staging/.env.staging; no operational secret was copied. Login, cookie lifecycle, protected APIs and authenticated disabled crons PASS. Gemini keys and Turso token remain absent. Cookie HttpOnly/Secure(production)/SameSite=lax/Path=/,8hour expiration; DELETE clears it. Login rate limit10/15min in one bounded process; ordinary API1000/min and bounded10000keys. Trusted forwarding only VERCEL=1 or explicitly TEMON_TRUST_PROXY=true after ingress validation; otherwise unknown/anonymous. No raw IP in development logger migration path should be removed before production tracing.

Next16.3.7 patched to16.3.8 per official September30 release: https://nextjs.org/blog/september-2026-security-release . Future October14 security release announced: recheck before cutover https://nextjs.org/blog . npm audit after patch remains9 findings(6high/2moderate/1low), largely build/transitive tooling; do not force Tailwind major upgrade. Runtime image exposure still requires audit of traced packages. No claim all vulnerabilities eliminated.

Risk scope: authorized isolated app/source/testing only; rollback retained Temon image and synthetic volume. No production DB writes, shared service restart, port/ingress/firewall change, cron/DNS/Git push, messaging or billing mutation. Hardcoded client recovery token code removed locally; operational credential validity not inferred.


## 2026-10-12 운영 보안 구성 확정
기존 Turso/GSC/IndexNow 환경변수만 보호된 allowlist로 런타임 전달. 공개 APP URL/AdSense/동의 설정은 빌드 인자로 전달한다. Gemini 키는 전달하지 않고 생성 flag=false. Vercel의 Production GOOGLE_API_KEY는 제거했다. 원본 운영 IP_HASH_SALT가 없어 기존 익명 저장 정책을 유지한다. 관리자/cron secret은 새 무작위 값으로 생성하고 PC의 .migration-evidence/production-config 및 VPS /opt/temon-production/.env.production에만 보관한다. 비밀값 출력/커밋/이미지 포함 없음.
운영 디렉터리 root0700, secret0600, 실행 코드0644, systemd unit0644. Caddy는 X-Forwarded-For/X-Real-IP를 실제 연결 IP로 덮어쓰며 X-Vercel-Forwarded-For 제거, HTTPS 헤더를 덮어쓴다. 검증 후 TEMON_TRUST_PROXY=true. API 원본 IP 로그 제거, bounded rate limiter 유지.
추가 flag: TEMON_CRON_OWNER=vps, TEMON_CRON_INSTANCE=vps. publish는 인증/owner 확인 전 DB 접근 금지; 생성 비활성. 관리자 HttpOnly/Secure/SameSite=lax/Path=/, 8시간 세션과 logout 삭제 검증.
Next16.3.8 패치 적용. npm audit --omit=dev 잔여8개(5high/2moderate/1low)는 Tailwind3 빌드 도구 의존성으로 major4 강제 변경하지 않았다. 실제 Linux standalone require.resolve로 tailwindcss/braces/chokidar/micromatch/postcss-nested/postcss-selector-parser/source-map-js/fast-glob/esbuild 모두 ABSENT 확인. 완전한 취약점0건 인증은 아니다.

## 최종 운영 확인 — 2026-10-12 17:08 KST
상태 PRODUCTION_ON_OVH / CUTOVER_COMPLETE. DNS 4개 authoritative 서버 A51.79.206.71/www CNAMEtemon.kr 일치. 공개 HTTPS health와 최신 main18c397c098e8f3499af66764889aaa4dee67e386 일치. Caddy apex/www 자동 인증서 발급 완료, Temon 수동 tls 두 줄만 제거하여 기존 공용 Caddy에 자동 갱신 설정 영속화; 다른 앱 블록 바이트 동일, 프록시 재시작 없음. Temon 수동 certbot renewal 파일은 전용 recovery로 보존 이동, 다른 인증서와 timer 변경 없음. www308 유지. VPS publisher 06/07/08UTC 실제 hourly 실행 HTTP200 idle 성공, Vercel Cron/Git 배포 비활성 재확인. Gemini env 없음/생성 비활성. Temon healthy restart0 OOMfalse, TodayPharm/LocalGEO HTTP200. Vercel 배포는 rollback standby로 보존, 프로젝트 삭제/정지 없음. 비용 절감액 미측정. 매일 offsite 백업/외부 장애 알림, 장시간 부하 시험 및 build-chain audit8 후속 개선은 미완료이며 기능 전환 완료와 구분한다.
