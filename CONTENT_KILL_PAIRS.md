# 콘텐츠 Kill/Merge 결정 리스트

- 기반: `CONTENT_AUDIT.md` v2 (prose 기준 211 페이지 전수 조사)
- 분류 원칙: **사람 판단이 필요한 항목은 자동 처리 금지**

---

## A. SAFE_301 — 자동 적용 완료 ✅

| From | To | 사유 |
|---|---|---|
| `food-temperature-preference` | `food-temperature` | "음식 온도 세밀 선호도" = "음식 온도 선호도" — 동어반복. 제목·설명·slug 모두 파생형 |

**적용된 변경**
- `lib/tests-config.ts` — ALL_TESTS에서 `food-temperature-preference` 블록 제거 (sitemap 자동 제외)
- `next.config.mjs` — `/tests/food-temperature-preference` → `/tests/food-temperature` 308 permanent redirect

> 파일 `app/tests/food-temperature-preference/page.tsx` 자체는 남아있지만 redirect가 먼저 매칭되므로 접근 불가. 배포 후 30일 지나면 디렉토리 삭제 권장.

---

## B. REVIEW_MERGE — 사용자 판단 필요 ⚠️

| A | B | 유사도 | 추천 조치 |
|---|---|---|---|
| `cooking-share` (요리 공유) | `cooking-shared` (공동 요리) | desc 0.91 | "공유"와 "공동"은 미묘한 차이. **합칠지 유지할지는 사용자 결정.** 합친다면 `cooking-shared` → `cooking-share`가 자연스러움 |
| `food-dipping` (찍어 먹기) | `food-scooping` (떠 먹기) | desc 0.96 | 주제는 다르지만 설명 템플릿이 거의 동일. 본문 고유화 우선, 제거는 비권장 |
| `food-layering` (쌓아 먹기) | `food-mixing` (섞어 먹기) | desc 0.89 | 주제는 반대 개념. 본문 고유화로 해결 |
| `breakfast-preference` | `dinner-preference`, `lunch-preference` | desc 0.91 | 시간대가 다르므로 실제로 다른 주제. **본문에서 시간대 차별성 강조** |

---

## C. NOINDEX_KILL — 본문 너무 얇음 (< 150자) — 22개 🔴

이 목록은 **즉시 `noindex` 처리 권장**. redirect는 대체할 canonical이 없어 부적합.

| id | title | 본문 |
|---|---|---:|
| meal-frequency | 식사 빈도 테스트 | 115 |
| meal-pacing | 식사 속도 테스트 | 115 |
| meal-order | 식사 순서 테스트 | 116 |
| meal-balance | 식사 균형 테스트 | 117 |
| meal-duration | 식사 시간 테스트 | 117 |
| meal-planning | 식사 계획 스타일 테스트 | 132 |
| meal-sharing | 음식 공유 스타일 테스트 | 132 |
| meal-preparation | 식사 준비 스타일 테스트 | 135 |
| meal-serving | 음식 나누기 스타일 테스트 | 137 |
| meal-social | 식사 사회성 테스트 | 137 |
| food-scooping | 떠 먹기 스타일 테스트 | 139 |
| cooking-shared | 공동 요리 스타일 테스트 | 140 |
| _나머지 10개는 `CONTENT_AUDIT.md` Kill List 참조_ | | |

**권장 조치 (사용자)**:
1. 각 `page.tsx`의 `generateQuizMetadata` 호출에 `robots: { index: false, follow: true }` 추가
2. 또는 본문을 300자 이상으로 확장 후 색인 유지

**패턴**: `meal-*` 클러스터 16개 중 15개가 본문 <150자. 이 클러스터 전체 재설계가 가장 효율적.

---

## D. EXPAND_SAVE — 본문 확장 1순위 ✅

`CONTENT_AUDIT.md`의 Save List Top 15 — 이미 600~750자 수준. **300자만 추가**하면 AdSense 기준 충족:
- kdrama-character, lunch-decider, kdrama-mbti, bungeoppang, ott-habits
- weekend-food, weekend-balance, weekend-hobby, morning-mood, morning-phone
- evening-meal, love-reaction, evening-reflection, phone-battery, chicken-style

---

## E. 전체 중복 페어 69개

세부 페어 리스트는 `CONTENT_AUDIT.md` 상위 30 페어 참조. 대부분 description 템플릿 공유가 원인이므로 **각 페이지 description 고유화**가 근본 해법.

---

## 요약 통계

| 분류 | 개수 | 자동 처리 |
|---|---:|---|
| A. SAFE_301 | 1 | ✅ 완료 |
| B. REVIEW_MERGE | 4+ | ⚠️ 사용자 결정 |
| C. NOINDEX_KILL | 22 | ⚠️ 사용자 결정 (일괄 스크립트 가능) |
| D. EXPAND_SAVE | 15 | 사람이 써야 함 |
| E. 얇음(<300자) | 132 | 사람이 써야 함 |

**결론**: 자동 처리 한도는 여기까지. 나머지는 사용자가 1주 단위로 분산 작업하면 Scaled Abuse 위험 최소화하면서 AdSense 기준 충족 가능.
