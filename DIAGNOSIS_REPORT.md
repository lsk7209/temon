# AdSense 최적화 진단 리포트

- **사이트**: temon.kr (테몬 MBTI)
- **진단일**: 2026-04-23
- **스택**: Next.js 14.2.35 (App Router) + Vercel + Turso
- **언어**: 한국어 (ko-KR)
- **퍼블리시 페이지 수**: 213개 테스트 랜딩 + 213개 테스트 실행 + 기타 (≈ 500+)

## Executive Summary

| 카테고리 | 점수 | 판정 |
|---|---|---|
| 1. 필수 페이지 | 2/4 | ❌ CRITICAL (About/Contact 없음) |
| 2. 콘텐츠 품질 | 8/15 | ⚠️ WARNING (랜딩 얇음 + pSEO 대량 양산 리스크) |
| 3. 사이트 구조 | 4/6 | ⚠️ WARNING (헤더 네비 빈약) |
| 4. 기술 SEO | 7/8 | ✅ 양호 (robots 중복만 정리) |
| 5. E-E-A-T | 2/6 | ❌ CRITICAL (저자/전문성 시그널 부재) |
| 6. YMYL & 정책 | 4/5 | ⚠️ WARNING (Scaled Abuse 시그널 강함) |
| 7. 광고 설정 | 5/5 | ✅ PASS |

**종합 판정**: 현 상태로는 애드센스 심사 통과 가능성 낮음. **[AUTO] 필수 페이지 + E-E-A-T 시그널** 보강 후 Scaled Abuse 리스크 때문에 **최소 30일 대기 후 신청**을 권장합니다.

---

## 카테고리 1: 필수 페이지

| # | 항목 | 판정 | 비고 |
|---|---|---|---|
| 1.1 | About | ❌ CRITICAL | `/about` 페이지 없음. 운영자·사이트 목적·연혁 없음 |
| 1.2 | Contact | ❌ CRITICAL | `/contact` 페이지 없음. `mailto:contact@temon.kr`만 footer에 존재 |
| 1.3 | Privacy Policy | ✅ PASS | `/privacy` 존재, AdSense·Google Analytics·Clarity 명시됨 |
| 1.4 | Terms | ✅ PASS | `/terms` 존재, 면책조항 포함 |

## 카테고리 2: 콘텐츠 품질

- 전체 글 수: **213개 테스트 랜딩** (대량 pSEO)
- 샘플링: `coffee-mbti`, `food-sweetness` 분석
- 랜딩 본문 분량: 평균 300~500자 — **애드센스 권장 1,500자 이상 미달**
- 구조 다양성: 거의 동일 템플릿 (헤더 → 소개 → 문항수/시간 → CTA → FAQ)
- 1인칭 경험 표현: 없음
- 구체 수치/출처: 약함 (Wikipedia 링크 1개만)

| # | 항목 | 판정 | 비고 |
|---|---|---|---|
| 2.1 | 분량 | ⚠️ WARNING | 랜딩 평균 <500자, 1500자 기준 미달 |
| 2.2 | AI 패턴 | ⚠️ WARNING | 템플릿 반복, AI 특유 나열형 문장 감지 |
| 2.3 | 독창성 | ⚠️ WARNING | 테스트 주제 간 본문이 매우 유사 |
| 2.4 | 주제 일관성 | ✅ PASS | MBTI/성격 테스트로 일관됨 |
| 2.5 | 깊이 | ⚠️ WARNING | FAQ는 있으나 심리학적 근거·해석 부족 |
| 2.6 | 이미지 | ⚠️ WARNING | 이모지만 있음, 실제 이미지/도표 없음 |
| 2.7 | 맞춤법 | ✅ PASS | 한글 맞춤법 양호 |
| 2.8 | 광고성 비중 | ✅ PASS | 제휴·쿠팡 링크 없음 |

## 카테고리 3: 사이트 구조

| # | 항목 | 판정 | 비고 |
|---|---|---|---|
| 3.1 | 메인 네비 | ⚠️ WARNING | 헤더에 `홈 / 테스트` 2개뿐. About/Contact 없음 |
| 3.2 | 카테고리 | ⚠️ WARNING | 213개 테스트가 flat — 카테고리(음식/습관/취향 등) 분류 권장 |
| 3.3 | 내부 링크 | ✅ PASS | `RelatedTestsSection` 각 페이지 존재 |
| 3.4 | 사이트맵 | ✅ PASS | `/sitemap.xml`, `/sitemap-index.xml` route 존재 |
| 3.5 | 검색 | ⚠️ WARNING | 213개인데 검색 기능 없음 (URL 쿼리 `?q=`만 구현) |
| 3.6 | 404 | ⚠️ 미확인 | custom `not-found.tsx` 존재 여부 확인 필요 |

## 카테고리 4: 기술 SEO

| # | 항목 | 판정 | 비고 |
|---|---|---|---|
| 4.1 | 메타 title/desc | ✅ PASS | 모든 페이지 유틸로 고유 생성 |
| 4.2 | Schema.org | ✅ PASS | Organization/WebSite/Breadcrumb/FAQ/Quiz/ItemList |
| 4.3 | robots.txt | ⚠️ WARNING | `public/robots.txt`와 `app/robots.ts` 중복 — `public` 우선 (STATUS.md 확인) |
| 4.4 | canonical | ✅ PASS | 모든 페이지 self-canonical |
| 4.5 | 모바일 | ✅ PASS | viewport·반응형 구현 |
| 4.6 | 속도 | ⚠️ 미측정 | PageSpeed Insights로 실측 필요 (Vercel Speed Insights 있음) |
| 4.7 | HTTPS | ✅ PASS | temon.kr SSL 정상 |
| 4.8 | GSC 색인 | ⚠️ 미확인 | Search Console에서 `site:temon.kr` 수동 확인 필요 |

## 카테고리 5: E-E-A-T 시그널 — **가장 약한 영역**

| # | 항목 | 판정 | 비고 |
|---|---|---|---|
| 5.1 | 작성자 이름 | ❌ CRITICAL | 어느 페이지에도 저자 정보 없음 |
| 5.2 | 게시일/수정일 | ⚠️ WARNING | 본문에 표시 없음 (JSON-LD에만) |
| 5.3 | 저자 전문성 | ❌ CRITICAL | 심리학 자격·경력 시그널 전혀 없음 |
| 5.4 | 출처/인용 | ⚠️ WARNING | Wikipedia 링크 1개만 |
| 5.5 | 업데이트 로그 | ⚠️ WARNING | "2026-04 업데이트" 표기 없음 |
| 5.6 | Organization 정보 | ⚠️ WARNING | Privacy에 이메일만, 운영자명/사업자명 누락 |

## 카테고리 6: YMYL & 정책

- YMYL 여부: **NO** (심리 테스트는 엔터테인먼트, 단 Footer disclaimer 이미 존재)

| # | 항목 | 판정 | 비고 |
|---|---|---|---|
| 6.1 | YMYL 여부 | ✅ PASS | 엔터테인먼트, "전문 진단 아님" 명시 |
| 6.2 | Disclaimer | ✅ PASS | Footer + Terms 제4조로 면책 |
| 6.3 | 금지 콘텐츠 | ✅ PASS | 위반 키워드 없음 |
| 6.4 | 오해 소지 | ✅ PASS | "100% 보장" 류 표현 없음 |
| 6.5 | **Scaled Abuse** | ❌ **CRITICAL** | **213개 유사 템플릿 대량 양산 패턴 → 재심사 전 최소 30일 대기** |

## 카테고리 7: 광고 설정

| # | 항목 | 판정 | 비고 |
|---|---|---|---|
| 7.1 | ads.txt | ✅ PASS | `pub-3050601904412736` 정상 등록 |
| 7.2 | AdSense 코드 | ✅ PASS | `components/adsense-script.tsx` 존재, `<head>`에 로드 |
| 7.3 | 광고 위장 | ✅ PASS | 해당 없음 |
| 7.4 | 플러그인 충돌 | ✅ PASS | 타 광고 네트워크 없음 |
| 7.5 | 쿠키 배너 | ⚠️ WARNING | 없음 (한국만 운영 시 필수 아니나 권장) |

## 5-Persona 교차 검증

1. **PM**: 테스트 자체는 재미있지만 **왜 이 사이트를 방문해야 하는지**가 약함. About 부재로 브랜드 스토리 없음.
2. **SEO**: robots/sitemap/메타 구성 매우 우수. Search Console 색인 실측만 남음.
3. **콘텐츠**: **저자가 실재하지 않는 느낌** — 모든 페이지 익명, "admin" 도 아닌 완전 무저자.
4. **QA**: 404 커스텀 페이지 미확인 외 결함 없음.
5. **정책**: Scaled Content Abuse가 가장 큰 리스크. 213개가 짧은 기간에 생성된 것이면 심사관이 "AI 양산"으로 판단할 확률 매우 높음.
