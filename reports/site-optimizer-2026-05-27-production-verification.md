# Site Optimizer Production Verification | 2026-05-27

## 배포
- 최종 운영 배포 ID: `dpl_5z3Aa6xaGPxmcsDVSce5JSohdxwz`
- 운영 도메인: `https://temon.kr`
- 배포 결과: Vercel production `READY`, alias `https://temon.kr` 연결 완료

## 적용 변경
- `components/adsense-script.tsx`: AdSense 초기 로딩을 사용자 입력 또는 8초 지연 후 로드로 변경.
- `app/layout.tsx`: GA4 외부 스크립트를 `lazyOnload`로 변경. 인라인 `gtag` 큐는 유지.
- `.vercelignore`: 로컬 상태/리포트/DB/로그 업로드 제외.

## 운영 HTTP 확인
모두 `200 OK` 확인.

- `/`
- `/tests`
- `/blog`
- `/tests/ntrp-test`
- `/tests/phone-search/test/result?type=ENFP`
- `/feed.xml`
- `/rss.xml`
- `/ai-index.json`
- `/llms.txt`
- `/robots.txt`
- `/sitemap.xml`

## 브라우저 확인
- `/blog`: H1 1개, 목차 노출, 카드 48개, GA4/AdSense 스크립트 확인, 모바일 가로 넘침 0.
- `/tests`: H1 1개, 목차 노출, 테스트 카드 노출, GA4/AdSense 확인, 모바일 가로 넘침 0.
- `/tests/perfection-balance-1xQC`: H1 1개, 목차/FAQ 노출, GA4/AdSense 확인, 모바일 가로 넘침 0.
- `/tests/phone-search/test/result?type=ENFP`: H1 1개, 목차 노출, GA4/AdSense 확인, 모바일 가로 넘침 0.
- `/tests/ntrp-test`: AdSense 본체 로딩이 약 9.8초 시점으로 지연됨. H1 1개, 수동 목차 1개, 모바일 가로 넘침 0.

## 최종 PageSpeed Insights
원본: `reports/site-optimizer-2026-05-27-production-psi-final.raw.jsonl`
요약: `reports/site-optimizer-2026-05-27-production-psi-final-summary.json`

| URL | 기기 | 성능 | 접근성 | Best Practices | SEO | LCP | TBT | CLS |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| `/` | mobile | 96 | 96 | 100 | 92 | 2.1s | 150ms | 0 |
| `/` | desktop | 95 | 96 | 100 | 92 | 0.7s | 180ms | 0 |
| `/tests` | mobile | 95 | 92 | 100 | 100 | 2.6s | 100ms | 0 |
| `/tests` | desktop | 96 | - | - | 100 | 0.5s | 150ms | 0 |
| `/blog` | mobile | 95 | 96 | 100 | 100 | 2.6s | 50ms | 0 |
| `/blog` | desktop | 96 | 96 | 100 | 100 | 0.6s | 170ms | 0 |
| `/tests/ntrp-test` | mobile | 85 | 92 | 100 | 100 | 2.3s | 510ms | 0 |
| `/tests/ntrp-test` | desktop | 95 | 91 | 100 | 100 | 0.5s | 180ms | 0 |

`/tests` desktop 1회 측정 63점은 단발 변동으로 판단. 재측정 2회 모두 성능 96, TBT 150ms, CLS 0.

## 외부 API 확인 요약
- GSC: `sc-domain:temon.kr`, 2026-04-27..2026-05-24 조회 완료.
- GA4: property `516369797`, Measurement ID `G-L167CCPS8E`, 2026-04-29..2026-05-26 active users 818, page views 5495, events 25078.
- AdSense: account `pub-3050601904412736`, 최근 30일 estimated earnings 55.67, page views 11553, impressions 66916, clicks 1756, page views RPM 4.82.

## 남은 관찰점
- 홈(`/`) SEO 92는 전역 메타 일부 개선 여지가 남아 있음. 주요 랜딩 `/tests`, `/blog`, 대표 테스트는 SEO 100 확인.
- `/tests/ntrp-test` 모바일 TBT 510ms는 통과 가능 범위로 개선됐지만, 추가로 95점 이상을 목표로 하면 애니메이션/클라이언트 JS 축소 작업을 별도 진행.
