# API Metrics Report | 2026-05-27

## Scope
- Site: `https://temon.kr`
- GSC property: `sc-domain:temon.kr`
- GA4 property: `properties/516369797` (`테몬_temon.kr`)
- AdSense account: `accounts/pub-3050601904412736`

## GSC
- API: Search Console Search Analytics
- Range: 2026-04-27..2026-05-24
- Top page rows returned: 10

| Page | Clicks | Impressions | CTR | Avg position |
|---|---:|---:|---:|---:|
| `https://temon.kr/` | 51 | 1367 | 3.73% | 11.05 |
| `https://www.temon.kr/tests/music-taste` | 17 | 104 | 16.35% | 6.03 |
| `https://temon.kr/tests` | 13 | 635 | 2.05% | 14.66 |
| `https://temon.kr/tests/kpop-idol` | 12 | 156 | 7.69% | 6.21 |
| `https://temon.kr/tests/breakup-style` | 9 | 63 | 14.29% | 4.92 |
| `https://www.temon.kr/tests/kpop-idol` | 7 | 116 | 6.03% | 4.89 |
| `https://temon.kr/tests/ramen-mbti` | 5 | 27 | 18.52% | 3.85 |
| `https://temon.kr/tests/kdrama-mbti` | 4 | 36 | 11.11% | 6.97 |
| `https://www.temon.kr/tests/ramen-mbti` | 4 | 21 | 19.05% | 6.24 |
| `https://temon.kr/tests/food-spiciness` | 3 | 10 | 30.00% | 3.30 |

## GA4
- API: Google Analytics Data API
- Range: 2026-04-29..2026-05-26

| Metric | Value |
|---|---:|
| Active users | 818 |
| Sessions | 918 |
| Page views | 5495 |
| Event count | 25078 |
| Engaged sessions | 725 |

Top pages by views:

| Page path | Views | Active users | Engaged sessions |
|---|---:|---:|---:|
| `/tests/ntrp-test` | 838 | 220 | 214 |
| `/` | 634 | 215 | 177 |
| `/tests/spending-style` | 386 | 94 | 93 |
| `/tests` | 347 | 136 | 131 |
| `/tests/ntrp-test/test` | 328 | 178 | 185 |
| `/tests/ramen-mbti` | 326 | 54 | 59 |
| `/tests/music-taste` | 287 | 60 | 55 |
| `/tests/ntrp-test/test/result` | 265 | 172 | 178 |
| `/tests/spending-style/test` | 154 | 89 | 89 |
| `/tests/music-taste/test/result` | 135 | 66 | 64 |

Top events:

| Event | Count | Active users |
|---|---:|---:|
| `page_view` | 5495 | 807 |
| `TTFB` | 2814 | 807 |
| `FCP` | 2647 | 797 |
| `LCP` | 2250 | 693 |
| `FID` | 2175 | 601 |
| `test_progress` | 2136 | 447 |
| `INP` | 1982 | 540 |
| `CLS` | 1671 | 497 |
| `test_start` | 947 | 485 |
| `session_start` | 914 | 815 |

## AdSense
- API: AdSense Management API
- Range: `LAST_30_DAYS`

| Metric | Value |
|---|---:|
| Estimated earnings | 55.67 |
| Page views | 11553 |
| Impressions | 66916 |
| Clicks | 1756 |
| Page views RPM | 4.82 |
| Impressions RPM | 0.83 |

## Decisions
- GSC confirms `/tests` has high impressions but low CTR, so the already-applied `/tests` and individual landing improvements are aligned.
- GA4 confirms test landing and result pages are collecting `page_view`, Web Vitals, and test progression events.
- AdSense API access is valid and confirms account-level revenue/RPM can be monitored.

## Remaining
- Production PSI/Lighthouse comparison should be run after deployment because current code changes are verified locally but not proven on production.
