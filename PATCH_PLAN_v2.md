# 통합 사이트 최적화 PATCH_PLAN v2

- **생성일**: 2026-04-23
- **방식**: 5인 전문가 팀 병렬 감사 (UX/CRO, 성능, 보안, 콘텐츠, SEO)
- **사이트**: temon.kr (Next.js 14.2.35 + Vercel, 213 test pages)

## 전체 위험 평가

| 영역 | 현재 점수 | 리스크 |
|---|---|---|
| **보안/프라이버시** | ⚠️ **위험** | admin "1234", IP raw 저장 → **법적 리스크 + 서비스 탈취 가능** |
| **콘텐츠 품질** | ⚠️ **심각** | 92% 보일러플레이트, Scaled Abuse **수동조치 35-50%** |
| **AdSense 승인 가능성** | ❌ **매우 낮음** | Consent Mode V2 없음 + 과장광고 "1.5만+" + 얇은 콘텐츠 |
| **성능** | ⚠️ 중간 | 중복 트래킹, force-dynamic → PageSpeed 최대 +25점 여지 |
| **SEO 구조** | ✅ 양호 | sitemap 수정 완료, ai-index만 업데이트 필요 |

---

## 🚨 Tier 0 — 지금 즉시 (법적/서비스 탈취)

| # | 항목 | 분류 | 출처 | 소요 |
|---|---|---|---|---|
| T0-1 | **admin 비번 "1234" 하드코딩 제거** + UI 힌트 제거, localStorage → httpOnly 쿠키, 만료 설정 | [AUTO] | 보안 Critical #1 | 15분 |
| T0-2 | **IP 해시 저장** (SHA-256 + salt) + 보유기간 90일로 변경 | [AUTO] | 보안 Critical #2 | 20분 |
| T0-3 | **쿠키 배너 X버튼 로직** — 동의 저장 제거, Accept만 저장 | [AUTO] | UX Critical #2 | 5분 |
| T0-4 | **"1.5만+" 과장 표기 제거** 또는 실제 숫자로 교체 | [AUTO] | UX Warning (AdSense Misleading 위반 소지) | 5분 |

## 🔴 Tier 1 — 이번 주 (AdSense 통과 차단 요소)

| # | 항목 | 분류 | 출처 | 소요 |
|---|---|---|---|---|
| T1-1 | **Consent Mode V2** — GA/Clarity/AdSense 사전 동의 차단 | [AUTO] | 보안 Critical #4 | 30분 |
| T1-2 | **CSP + HSTS** — `next.config.mjs` 헤더 추가 | [AUTO] | 보안 Critical #3 | 15분 |
| T1-3 | **Privacy Policy PIPA 보강** — DPO, 국외이전, 열람/수정/삭제 절차, "무기한 보관" 제거 | [AUTO] | 보안 Warning #6 | 20분 |
| T1-4 | **`/api/analytics/track` 비활성화 또는 샘플링** — GA4와 중복. 유지 시 rate limit + IP 해시 | [AUTO] | 보안 #5 + 성능 #1 | 20분 |
| T1-5 | **중복 테스트 301 합치기** — cooking-shared, food-temperature-preference, breakfast-style, dessert-style | [AUTO] | 콘텐츠 #1 | 10분 |
| T1-6 | **테스트 결과 페이지 404 처리** — `app/tests/[testId]/not-found.tsx` 또는 잘못된 id guard | [AUTO] | UX Critical #4 | 15분 |
| T1-7 | **헤더 뒤로가기 로직 수정** — 결과 페이지에서도 보이도록 | [AUTO] | UX Critical #1 | 5분 |

## 🟠 Tier 2 — 2주 내 (성능·SEO 개선)

| # | 항목 | 분류 | 출처 | 소요 |
|---|---|---|---|---|
| T2-1 | **`ai-index.json` 재생성** — 30/197 → 전체 213개 | [AUTO] | SEO Critical #1 | 5분 (스크립트) |
| T2-2 | **api-client.ts www 폴백 → non-www** | [AUTO] | SEO Critical #2 | 2분 |
| T2-3 | **`/analytics.js` 제거** — gtag와 중복 | [AUTO] | 성능 #1 | 2분 |
| T2-4 | **head 메타 정리** — Naver/Daum/geo/revisit 중 중복·legacy 제거 | [AUTO] | 성능 #3 | 10분 |
| T2-5 | **AdSense `afterInteractive` → `lazyOnload`** | [AUTO] | 성능 #4 | 2분 |
| T2-6 | **test landing에 `revalidate = 86400`** — ISR 활성화 | [AUTO] | 성능 #7 | 배치 스크립트 |
| T2-7 | **Legacy `/coffee-mbti` canonical 통일 또는 제거** — dual canonical 해소 | [AUTO] | SEO Warning #5 | 10분 |
| T2-8 | **footer 면책 고지 강화** — text-xs→sm, 적색 폰트 | [AUTO] | UX Warning #7 | 3분 |
| T2-9 | **Privacy/Terms TOC 추가** — 앵커 id + 사이드바 | [AUTO] | UX Warning #8 | 20분 |

## 🟡 Tier 3 — MANUAL (사람이 직접)

| # | 항목 | 분류 | 출처 | 소요 |
|---|---|---|---|---|
| T3-1 | **Vercel 도메인 Primary를 `temon.kr`로 전환** | MANUAL | 미결 구조 이슈 | 5분 |
| T3-2 | **Kill List 실행** — 중복·얇은 test ~25개 noindex 또는 삭제 | MANUAL | 콘텐츠 #Kill List | 1시간 |
| T3-3 | **Save List 5개 본문 확장** — NTRP, Evening Routine, Coffee MBTI, K-pop Idol, Study Style (각 800~1200자) | MANUAL | 콘텐츠 #Save List | 10~15시간 |
| T3-4 | **나머지 ~180개 테스트 점진 확장** — 주 10~20개씩 | MANUAL | Scaled Abuse 회피 | 수주 |
| T3-5 | **GSC 사이트맵 재제출 + URL 색인 요청** | MANUAL | 배포 후 | 10분 |
| T3-6 | **Naver Search Advisor + Daum 웹마스터 등록** | MANUAL | korean-specifics | 30분 |
| T3-7 | **브랜드 팔레트 재검토** — 그라디언트 감축, 이모지 톤다운 | MANUAL | UX Warning #6 | 별도 디자인 |
| T3-8 | **저자 바이오 + 서비스 계정 GSC 연동 데이터 분석** | MANUAL | 콘텐츠 #3 | 수시 |

---

## 📌 추천 순서

1. **오늘** — Tier 0 (4건) 일괄 자동 적용 → 커밋 → 배포
2. **내일~모레** — Tier 1 (7건) 자동 적용 → 배포 검증 + Vercel 도메인 Primary 전환
3. **이번 주 내** — Tier 2 (9건) 적용
4. **이후 6~8주** — Tier 3 수동 작업 진행하며 트래픽·GSC 데이터 수집
5. **재심사** — Tier 3-3/3-4 완료 + 30일 대기 후 AdSense 재신청

## 📊 예상 효과

- PageSpeed 모바일: +15~25점
- AdSense 승인 확률: ~10% → ~60% (콘텐츠 보강 포함 시)
- 법적 리스크: **중→낮음** (PIPA 적합성 확보)
- 보안 사고 리스크: **높음→낮음** (admin 탈취 벡터 제거)

## ⚠️ 안 고치면 생기는 일

- **admin 비번 "1234"** 유지 → 공격자가 어드민 가능, 모든 DB 데이터 노출
- **IP raw 저장** 유지 → 개인정보보호위 민원 시 조사 대상
- **Consent Mode V2** 없이 AdSense 재신청 → 2024-2025 정책상 EU 트래픽 한 번이라도 있으면 거절
- **Scaled Abuse 상태 유지** → 수동조치 + GSC 경고 + 도메인 평판 하락
