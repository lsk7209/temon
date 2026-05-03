# 통합 최적화 실행 플랜 (사이트 / SEO / 콘텐츠)

- **기준일**: 2026-05-03
- **대상**: temon.kr (Next.js 14.2.35 + Vercel + Turso, App Router)
- **현재 브랜치**: `claude/seo-optimization-planning-OWUud`
- **선행 문서**: `STATUS.md`, `PATCH_PLAN_v2.md`, `CONTENT_AUDIT.md`, `SAVE_LIST_EXPANSION.md`, `NEW_QUIZ_ROADMAP.md`
- **이 문서의 위치**: 위 5개 문서를 6주 실행 일정으로 통합. 작업이 끝나면 STATUS.md 업데이트 후 본 문서 deprecate.

---

## 0. 현재 상태 진단 (2026-05-03 기준)

### 진척
- ✅ Tier 0 보안/PIPA: admin "1234" 제거, IP 해시, 쿠키 배너 PIPA 준수, "1.5만+" 과장 제거
- ✅ noindex 중앙관리(`lib/noindex-tests.ts`) — meal-* 17개 + food-scooping noindex
- ✅ 308 redirect 정리 — `cooking-shared→cooking-share`, `food-temperature-preference→food-temperature`
- ✅ sitemap fs 스캔 제거(Vercel fallback 버그 수정), IndexNow API 연동
- ✅ 신규 퀴즈 인프라(`publishAt` 드립 공개) + 샘플 1개(`commute-style`)

### 미해결 (이 플랜의 작업 범위)
| 영역 | 상태 |
|---|---|
| Vercel 도메인 Primary | `temon.kr` 미전환 (현재 www→non-www 307) |
| 신규 퀴즈 30개 | 1/30 완료, 29개 작성 대기 (4-24 출발 일정 9일 슬립) |
| Save List 본문 확장 | 2/15 완료(ntrp-test, coffee-mbti), 13개 대기 |
| 132개 thin content (<300자) | 미착수 — Scaled Abuse 잔존 |
| GSC 사이트맵 재제출 | 배포 후 미수행 |
| Naver/Daum 웹마스터 등록 | 미수행 |
| ai-index.json | 일부 항목만 반영, 전체 재생성 필요 |
| AdSense 재심사 | 6~8주 대기 중 |

---

## 1. 전략 요약

> **Scaled Content Abuse 시그널 해소 → Topical Authority 회복 → AdSense 재심사 통과**

3축으로 병렬 진행하되, 각 축에서 **AdSense 정책 위반 신호**를 먼저 제거한다.

1. **사이트 최적화** — 인프라/성능/접근성. 적은 일감, 큰 영향.
2. **SEO 최적화** — 색인 위생(thin/dup 정리) + 외부 채널(GSC, Naver, Daum, IndexNow).
3. **콘텐츠 추가** — Save List 13개 본문 확장 + 신규 퀴즈 29개 드립 발행 + thin 132개 점진 보강.

콘텐츠는 **속도보다 일관성**이 중요. 하루 2~3개 한도, 같은 카테고리 연속 발행 금지.

---

## 2. 6주 실행 일정 (Week 1 = 2026-05-04부터)

### Week 1 — 인프라 위생 + 발행 재개

**사이트 최적화**
- [ ] T3-1 Vercel 도메인 Primary `temon.kr` 전환 (5분, MANUAL)
- [ ] api-client.ts www 폴백 → non-www (`scripts/`로 일괄 grep 후 fix, 2분)
- [ ] `/analytics.js` 제거 — gtag와 중복 (2분)
- [ ] AdSense Script `afterInteractive` → `lazyOnload` (`components/adsense-script.tsx`, 2분)
- [ ] head 메타 정리 — Naver/Daum/geo/revisit 중 legacy 제거 (10분)
- [ ] 모든 test landing에 `export const revalidate = 86400` 일괄 적용 (배치 스크립트, `app/tests/[testId]/page.tsx` 1곳 수정 가능한지 먼저 검토)

**SEO 최적화**
- [ ] `node scripts/generate-sitemap-urls.js && node scripts/generate-robots.js` 재실행
- [ ] `public/ai-index.json` 전체 213개 재생성 (전용 스크립트 또는 수기)
- [ ] GSC sitemap-index.xml 재제출 + About/Contact/Save List 2개 URL 색인 요청 (MANUAL)
- [ ] Naver Search Advisor + Daum 웹마스터 도구 등록 (MANUAL, 30분)
- [ ] IndexNow 키 발급 후 `lib/indexnow.ts` 호출 경로 점검

**콘텐츠 추가**
- [ ] 신규 퀴즈 #2 `workday-energy` 작성 → 2026-05-04 23:59 publishAt
- [ ] 신규 퀴즈 #3 `first-date-nerves` 작성 → 2026-05-06 23:59 publishAt
- [ ] Save List #1 `kdrama-character` 본문 800자+ 추가 → `lib/extended-content.ts`
- [ ] Save List #2 `bungeoppang` 본문 800자+ 추가

**검증**
- [ ] `npx tsc --noEmit` 통과
- [ ] `node scripts/validate-new-slugs.js` 통과
- [ ] 로컬 `npm run dev`에서 신규 2개 + 확장 2개 페이지 육안 확인

### Week 2 — 신규 퀴즈 가속 + thin 1차

**콘텐츠**
- [ ] 신규 퀴즈 #4~#7 작성 (`worknight-recovery`, `friend-distance`, `office-snack-habit`, `sns-reaction-style`)
- [ ] Save List #3~#5 (`lunch-decider`, `ott-habits`, `weekend-food`)
- [ ] thin 132개 중 **상위 20개**(`food-aroma`, `food-portion`, `food-color-preference` 등 클러스터 대표) 본문 250자+ → 350자+ 보강

**SEO**
- [ ] GSC Coverage 리포트 점검 — `Indexed but blocked` / `Discovered—currently not indexed` 수 확인
- [ ] Naver Search Advisor 색인 누락 페이지 수동 제출 (Top 30)

### Week 3 — 신규 퀴즈 중반 + 중복 클러스터 정리

**콘텐츠**
- [ ] 신규 퀴즈 #8~#13 작성
- [ ] Save List #6~#8

**SEO/콘텐츠 위생**
- [ ] CONTENT_AUDIT 중복 페어(score≥0.55) 69쌍 검토 → **추가 합치기 후보 5~10개** 결정
- [ ] 결정된 합치기 → `next.config.mjs`에 308 redirect 추가 + `lib/noindex-tests.ts`에서 폐기 항목 제거(이미 redirect되므로)
- [ ] 합치기 페이지의 본문은 살린 쪽으로 통합 보강

### Week 4 — 신규 퀴즈 후반 + thin 2차

**콘텐츠**
- [ ] 신규 퀴즈 #14~#20 작성
- [ ] Save List #9~#11
- [ ] thin 추가 30개 본문 보강 (누적 50/132)

**성능**
- [ ] `bundle-analyzer` 1회 실행 → 50KB+ 미사용 모듈 제거
- [ ] dayjs ↔ date-fns 중복 라이브러리 통일 (1개로)
- [ ] LCP 후보 이미지 `priority` 속성 + AVIF/WebP 확인
- [ ] PageSpeed Insights 모바일/데스크톱 측정 → 베이스라인 기록

### Week 5 — 신규 퀴즈 마감 + Save List 마감

**콘텐츠**
- [ ] 신규 퀴즈 #21~#30 작성
- [ ] Save List #12~#13
- [ ] thin 추가 30개 (누적 80/132)

**SEO**
- [ ] 사이트맵 재생성 + GSC 재제출
- [ ] IndexNow에 신규/수정 URL 일괄 핑

### Week 6 — 안정화 + 재심사 준비

- [ ] thin 추가 30개 (누적 110/132). 미보강 22개는 noindex 유지 또는 추가 redirect
- [ ] 30일 변경 없음 구간 1주 두기 (Google "stable" 평가용)
- [ ] AdSense 재심사 신청 전 체크리스트 통과 확인 (§7 참조)
- [ ] STATUS.md 갱신, 본 문서 _archive/ 이동

---

## 3. 사이트 최적화 (기술/성능/접근성)

### 3.1 즉시 가능한 자동 패치
| ID | 항목 | 위치 | 효과 |
|---|---|---|---|
| S-1 | AdSense Script lazyOnload | `components/adsense-script.tsx` | LCP -200~400ms |
| S-2 | `/public/analytics.js` 삭제 | `public/analytics.js` | TBT -50ms |
| S-3 | api-client baseUrl `temon.kr` 통일 | `lib/api-client.ts` | dual-canonical 해소 |
| S-4 | head 메타 legacy 제거 | `app/layout.tsx` | HTML payload 축소 |
| S-5 | revalidate=86400 (ISR) | `app/tests/[testId]/page.tsx` | TTFB 안정화 |
| S-6 | dayjs ↔ date-fns 통일 | 전역 | 번들 -20~30KB |

### 3.2 디자인/UX 미해결
- T2-9 Privacy/Terms TOC + 앵커 링크 (PIPA 가독성)
- T2-8 Footer 면책 고지 강화 (text-xs→sm)
- 모바일 헤더 뒤로가기 결과 페이지 노출 (T1-7 재검증)

### 3.3 측정/관측
- Vercel Speed Insights + Web Vitals(`components/web-vitals.tsx`) → GA4로 흘림(이미 적용). Week 4에 베이스라인 기록.
- Sentry/Logtail 미연동. Free tier로 1회 실험만 권장. 필수 아님.

---

## 4. SEO 최적화

### 4.1 색인 위생 (Indexability Hygiene)
- **noindex** — 본문 <150자 22개 중 19개 적용 완료. Week 4까지 보강 못 한 페이지는 noindex 추가.
- **canonical** — 모든 테스트 페이지 `lib/quiz-seo-utils.ts:generateQuizMetadata` 통과 확인. 신규 퀴즈에 누락 없는지 점검.
- **사이트맵** — `getIndexableTests()` 사용 (drip + noindex 제외). 신규 퀴즈 publishAt 도달 시 자동 노출.
- **robots.ts** — AI 크롤러 허용, Bytespider 차단, Naver/Daum crawl-delay 1. 변경 없음.
- **구조화 데이터** — Home/ItemList, Test/Quiz, Article(Save List), FAQ, Organization, BreadcrumbList. `lib/seo-utils.ts`에 통합.

### 4.2 외부 채널
| 채널 | 작업 | 빈도 |
|---|---|---|
| Google Search Console | sitemap-index.xml 재제출 + URL Inspection | 주 1회 |
| Naver Search Advisor | sitemap 등록 + Top URL 수동 색인 | Week 1 + 주 1 |
| Daum 웹마스터 | sitemap 등록 | Week 1 1회 |
| IndexNow (Bing/Yandex) | 신규/수정 URL 자동 핑 | 발행 시마다 |
| RSS/Atom | `app/rss.xml`, `app/feed.xml` — 최신 20개 | 자동 |
| `/llms.txt`, `/llms-full.txt` | AI 크롤러용 인덱스 | 발행 시 갱신 |
| `/ai-index.json` | 213개 재생성 | Week 1 1회 |

### 4.3 키워드/토픽 전략
현재는 "무료 MBTI 테스트 + 일상 행동" 롱테일이 주력. AdSense 통과까지는 신규 키워드 확장보다 **기존 토픽 군의 권위(authority)** 강화가 우선.

- **클러스터 헤드**: `coffee-mbti`, `ramen-mbti`, `pet-mbti`, `study-mbti`, `kdrama-mbti`, `kpop-idol`, `snowwhite-mbti`, `ntrp-test` — 카테고리 진입 페이지 역할. Save List 우선 보강 대상.
- **롱테일**: 신규 퀴즈 30개는 헤드 클러스터를 보완하는 위치 (직장/연애/자기계발/여행/쇼핑/건강/디지털 7개 신규 카테고리).
- **내부 링크**: `lib/related-tests.ts` 카테고리/태그 기반 추천. 헤드 ↔ 롱테일 양방향 링크 누락 점검 (Week 3).

### 4.4 소셜/AEO/GEO
- OG 이미지 동적 생성 (`app/api/og/route.tsx`, edge runtime) 정상.
- AI 답변(GEO): `llms.txt` + `ai-index.json` + 본문 내 명시적 Q&A 블록(`<TestExpandedIntro />`의 extraFaqs).
- 카카오톡/네이버 미리보기: OG description 80자 이내 유지. 홈은 80자 단축 description 별도 정의됨.

---

## 5. 콘텐츠 추가/생성 계획

### 5.1 우선순위 (총 예상 본문 분량)

| 트랙 | 건수 | 본문 분량 | 마감 | 상태 |
|---|---|---|---|---|
| Save List 확장 | 13개 | 각 800~1,200자 | Week 5 끝 | 0/13 |
| 신규 퀴즈 (드립) | 29개 | 각 페이지 본문 600자+ + extended 800자+ | Week 5 끝 | 0/29 (인프라 완료) |
| thin 본문 보강 | 132개 중 80~110개 | 각 250자→350~500자 | Week 6 끝 | 0/132 |
| 정책/About/Contact | 1회 | 각 +200자 신뢰 보강 | Week 1 | 미정 |

### 5.2 Save List 확장 (13개)
원문: `SAVE_LIST_EXPANSION.md`. 우선순위 1~13 그대로 진행. 각 항목에 다음 6개 키 모두 채움:
- `intro` 200~250자
- `whyItMatters` 250~350자 (저자 관점 1~2문장 포함)
- `useCases` 3~4개 (각 60~100자)
- `limitations` 150~250자 (오락용 명시)
- `extraFaqs` 2~3개 (Q&A 명확)
- `lastUpdated` ISO 날짜

**금지**:
1. 템플릿 복사 (각 slug 고유 맥락)
2. 무출처 통계 ("80%가...")
3. 같은 날 5개+ 동시 추가
4. LLM 원시 출력 그대로 — 1인칭 표현 2~3개 + 이모지 톤다운 필수

### 5.3 신규 퀴즈 29개 (드립 일정 재조정)
원래 D+1=04-25 ~ D+15=05-09 였으나 9일 슬립. **새 일정 제안**: 2026-05-04 ~ 2026-06-07 (5주, 하루 평균 1개).

| 주차 | 퀴즈 | 카테고리 |
|---|---|---|
| W1 (5/4~5/10) | workday-energy, first-date-nerves, worknight-recovery, friend-distance | 직장/연애 |
| W2 (5/11~5/17) | office-snack-habit, sns-reaction-style, wfh-focus-type, parent-comm-style, breakup-recovery-speed, goal-persistence | 직장/연애/자기계발 |
| W3 (5/18~5/24) | reading-focus, course-completion, language-learner-type, packing-style, airport-wait-type, map-dependency | 자기계발/여행 |
| W4 (5/25~5/31) | trip-planning-style, sale-reaction, subscription-audit, comparison-shopping, membership-usage, stress-relief-type | 여행/쇼핑/건강 |
| W5 (6/1~6/7) | workout-consistency, hydration-habit, diet-approach, notification-control, focus-mode-usage, ai-chatbot-style, screentime-reaction | 건강/디지털 |

각 퀴즈 작성 절차는 `NEW_QUIZ_ROADMAP.md` "신규 퀴즈 작성 체크리스트 1개당" 그대로.

### 5.4 thin 페이지 132개 보강 전략
- **클러스터별 1개를 헤드로 만들고 나머지를 본문 250→350자로** (예: `food-aroma` 헤드, `food-color-preference`/`food-portion`/`food-garnishing-style` 보조).
- 보조는 헤드를 internal link로 가리키며 차별화 포인트 1~2 단락 추가 (관능 차원 1개에 집중하는 식).
- 헤드는 Save List 우선순위 결정과 연동 (예: food-aroma는 향후 Save List 추가 후보).
- 주 30개 한도 (Scaled Abuse 회피).

### 5.5 콘텐츠 품질 체크리스트 (PR/배포 전 자동화 권장)
- [ ] 본문(prose) 300자 이상
- [ ] meta description 130~160자
- [ ] H1 1개, H2 2~4개
- [ ] Article/FAQ JSON-LD 자동 주입 확인
- [ ] 다른 페이지와 자카드 유사도 < 0.5 (`scripts/validate-new-slugs.js`)
- [ ] 한계/면책 문구 1줄 이상 ("재미용", "공식 진단 아님")
- [ ] 1인칭 표현 또는 사람 손 흔적 1곳 이상 (Scaled Abuse 회피)

---

## 6. 모니터링 & 측정 지표

| 지표 | 도구 | 목표(Week 6) | 베이스라인 측정 |
|---|---|---|---|
| GSC 색인 페이지 수 | GSC Coverage | 180+ | Week 1 |
| GSC Discovered—not indexed | GSC | <40 | Week 1 |
| 평균 CTR (Top 30) | GSC Performance | +20% vs 베이스라인 | Week 1 |
| PageSpeed 모바일 | PSI | 85+ | Week 4 |
| LCP 모바일 | Web Vitals (GA4) | <2.5s p75 | Week 1 |
| Naver 색인 | SearchAdvisor | sitemap 100% 인식 | Week 2 |
| AdSense 정책 신호 | AdSense Console | 위반 0 | Week 6 |

주 1회(금요일) STATUS.md에 "이번 주 발행 N건 / 색인 변동 / 이슈" 1줄 기록.

---

## 7. AdSense 재심사 전 체크리스트 (Week 6 종료 시점)

- [ ] 본문 300자+ 페이지 비율 75% 이상 (현재 38%)
- [ ] 중복/유사 페어 score≥0.6 0건
- [ ] noindex 또는 redirect 처리된 thin/dup만 잔존
- [ ] About/Contact/Privacy/Terms 4종 모두 충실 + 연락처 1개 이상
- [ ] PIPA 적합 — Consent Mode V2 작동, IP 해시, "무기한 보관" 표현 0
- [ ] 광고 슬롯 페이지 본문 위/아래 균형 (광고가 본문보다 많지 않음)
- [ ] AdSense 자동광고/수동광고 정책 위반 신호 0
- [ ] 30일간 신규 변경 없음 → "안정 상태" 확보

---

## 8. 리스크 & 완화

| 리스크 | 가능성 | 영향 | 완화 |
|---|---|---|---|
| 콘텐츠 발행 슬립 (LLM 원시 출력 유혹) | 중 | 높음 (Scaled Abuse 강화) | 주 발행량 상한, 사람 검수 게이트 필수 |
| Vercel 도메인 전환 시 일시적 색인 흔들림 | 낮 | 중 | non-www→non-www 308 항상성 + GSC URL Inspection 즉시 핑 |
| Save List 본문에 무출처 통계 침투 | 중 | 높음 | 체크리스트 (§5.2 금지 항목) + PR 리뷰 |
| dayjs/date-fns 통일 시 기존 포맷 회귀 | 중 | 낮음 | 단계적 치환 + tsc/lint pass |
| AdSense 재심사 거절 | 중 | 높음 | Week 6 체크리스트 미충족 시 +30일 추가 대기 |

---

## 9. 결정 필요 사항 (사용자 입력 요청)

1. **신규 퀴즈 일정**: 위 W1~W5 (5/4~6/7) 일정으로 진행 OK?
2. **Save List 본문 작성자**: 사람 직접 작성 vs LLM 1차 + 사람 편집? (Scaled Abuse 회피상 후자 권장하되 1인칭/이모지/한계 문구는 사람이 손댈 것)
3. **thin 132개 중 어느 클러스터 먼저**? 추천: food-* 42개 → cooking-* 21개 (가장 큰 클러스터부터)
4. **Vercel 도메인 Primary 전환 시점**: Week 1 즉시 vs 콘텐츠 안정 후?

---

## 부록 A. 참고 파일 위치

- 본문 확장 인프라: `lib/extended-content.ts`, `components/test-expanded-intro.tsx`
- 신규 퀴즈 템플릿: `app/tests/commute-style/`, `lib/data/commute-style-{questions,results}.ts`
- 드립 필터: `lib/visible-tests.ts`
- noindex 중앙: `lib/noindex-tests.ts`
- SEO 유틸: `lib/seo-config.ts`, `lib/seo-utils.ts`, `lib/quiz-seo-utils.ts`
- 검증 스크립트: `scripts/validate-new-slugs.js`, `scripts/content-audit.js`
- 사이트맵: `app/sitemap.xml/route.ts`, `app/sitemap-index.xml/route.ts`, `app/robots.ts`
- IndexNow: `lib/indexnow.ts`, `scripts/indexnow-submit.js`
