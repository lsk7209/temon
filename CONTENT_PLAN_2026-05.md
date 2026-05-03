# 컨텐츠 추가 계획 — 2026년 5월

기준일: 2026-05-03 | 작성: Claude  
대상 브랜치: `claude/seo-optimization-planning-OWUud`

---

## 현황 요약

| 항목 | 완료 | 잔여 |
|------|------|------|
| 신규 퀴즈 (30개 로드맵) | 3개 (commute-style, workday-energy, first-date-nerves) | **27개** |
| Save List 확장 (extended-content) | 7개 (ntrp-test, coffee-mbti, commute-style, workday-energy, first-date-nerves, kdrama-character, bungeoppang) | **11개** |
| Thin 페이지 부스트 (food/cooking/meal) | 0개 | **79개** |

---

## 세 가지 작업 축

### 축 A — 신규 퀴즈 27개

매주 5–6개씩 drip 발행. publishAt KST 00:00 = UTC 전날 15:00.  
모든 퀴즈는 동일 템플릿: `lib/data/{slug}-questions.ts` + `lib/data/{slug}-results.ts` + `app/tests/{slug}/` 4-file set + `lib/tests-config.ts` 등록 + `lib/extended-content.ts` 슬롯.

#### 직장/커리어 (3개)
| slug | 제목 | publishAt (KST) |
|------|------|-----------------|
| worknight-recovery | 퇴근 후 회복 방식 테스트 | 2026-05-07 |
| office-snack-habit | 사무실 간식 습관 테스트 | 2026-05-09 |
| wfh-focus-type | 재택근무 집중 유형 테스트 | 2026-05-11 |

#### 연애/관계 (4개)
| slug | 제목 | publishAt (KST) |
|------|------|-----------------|
| friend-distance | 친구 간 거리 조절 스타일 | 2026-05-13 |
| sns-reaction-style | SNS 반응 스타일 테스트 | 2026-05-15 |
| parent-comm-style | 부모와 소통 방식 테스트 | 2026-05-17 |
| breakup-recovery-speed | 이별 회복 속도 테스트 | 2026-05-19 |

#### 자기계발/학습 (4개)
| slug | 제목 | publishAt (KST) |
|------|------|-----------------|
| goal-persistence | 목표 지속력 테스트 | 2026-05-21 |
| reading-focus | 독서 집중도 유형 테스트 | 2026-05-23 |
| course-completion | 온라인 강의 완주율 테스트 | 2026-05-25 |
| language-learner-type | 외국어 학습 스타일 테스트 | 2026-05-27 |

#### 여행/외출 (4개)
| slug | 제목 | publishAt (KST) |
|------|------|-----------------|
| packing-style | 여행 짐 싸기 스타일 테스트 | 2026-05-29 |
| airport-wait-type | 공항 대기 유형 테스트 | 2026-05-31 |
| map-dependency | 지도앱 의존도 테스트 | 2026-06-02 |
| trip-planning-style | 여행 계획 스타일 테스트 | 2026-06-04 |

#### 쇼핑/소비 (4개)
| slug | 제목 | publishAt (KST) |
|------|------|-----------------|
| sale-reaction | 세일 반응 유형 테스트 | 2026-06-06 |
| subscription-audit | 구독 서비스 정리 습관 테스트 | 2026-06-08 |
| comparison-shopping | 비교 쇼핑 스타일 테스트 | 2026-06-10 |
| membership-usage | 멤버십 활용도 테스트 | 2026-06-12 |

#### 건강/운동 (4개)
| slug | 제목 | publishAt (KST) |
|------|------|-----------------|
| stress-relief-type | 스트레스 해소 유형 테스트 | 2026-06-14 |
| workout-consistency | 운동 지속 스타일 테스트 | 2026-06-16 |
| hydration-habit | 수분 섭취 습관 테스트 | 2026-06-18 |
| diet-approach | 다이어트 접근 방식 테스트 | 2026-06-20 |

#### 디지털/AI (4개)
| slug | 제목 | publishAt (KST) |
|------|------|-----------------|
| notification-control | 알림 관리 스타일 테스트 | 2026-06-22 |
| focus-mode-usage | 집중 모드 활용 테스트 | 2026-06-24 |
| ai-chatbot-style | AI 챗봇 활용 유형 테스트 | 2026-06-26 |
| screentime-reaction | 스크린 타임 반응 테스트 | 2026-06-28 |

---

### 축 B — Save List 확장 11개 (extended-content)

목표: 각 슬롯 800–1,200자 한국어 산문. `lib/extended-content.ts`에 추가 후 해당 page.tsx에 `<TestExpandedIntro>` 삽입.

| 순서 | testId | 주제 키워드 | 목표 발행 주차 |
|------|--------|------------|---------------|
| 1 | lunch-decider | 점심 메뉴 결정 장애, 직장인 스트레스, 의사결정 피로 | Week 2 |
| 2 | kdrama-mbti | K-드라마 MBTI, 드라마 시청 성향, 감정 이입 | Week 2 |
| 3 | ott-habits | OTT 플랫폼 시청 패턴, 넷플릭스, 콘텐츠 소비 습관 | Week 2 |
| 4 | weekend-food | 주말 식사 패턴, 배달·외식·홈쿡 에너지 | Week 3 |
| 5 | weekend-balance | 주말 휴식 vs 활동 균형, 재충전 스타일 | Week 3 |
| 6 | weekend-hobby | 주말 취미 몰입도, 혼자 vs 함께 | Week 3 |
| 7 | morning-mood | 아침 루틴, 모닝 에너지, 기상 후 감정 | Week 4 |
| 8 | morning-phone | 기상 직후 폰 사용 패턴, 디지털 습관 | Week 4 |
| 9 | evening-meal | 저녁 식사 의사결정, 혼밥·같이 먹기 | Week 4 |
| 10 | love-reaction | 연애 감정 표현 방식, 애착 유형 | Week 5 |
| 11 | evening-reflection | 하루 마감 루틴, 취침 전 생각 정리 | Week 5 |

---

### 축 C — Thin 페이지 부스트 79개

**전략**: `lib/extended-content.ts`에 슬롯 추가 + 해당 `page.tsx`에 `<TestExpandedIntro>` 삽입.  
각 슬롯 500–800자 (신규 퀴즈보다 짧게). 클러스터별 공통 도입부 재활용 가능.

#### 클러스터 1 — food 감각 (12개) → Week 2 처리
food-aroma, food-bitterness, food-chewy, food-creamy, food-crispy, food-crunchy,  
food-saltiness, food-sourness, food-spiciness, food-sweetness, food-texture, food-umami

공통 프레임: "음식의 [감각] 선호도가 성격과 어떻게 연결되는가" + 각 슬롯에 해당 감각 특화 내용 1–2문단

#### 클러스터 2 — food 행동 (15개) → Week 3 처리
food-budget, food-brand, food-combination, food-delivery, food-dipping,  
food-label, food-layering, food-mixing, food-new, food-ordering,  
food-photography, food-portion, food-scooping, food-sharing, food-storage

공통 프레임: "음식 관련 [행동]이 드러내는 의사결정·소비 성향"

#### 클러스터 3 — food 기타 + cooking (22개) → Week 4 처리
food-allergy, food-garnishing, food-garnishing-style, food-plating, food-presentation,  
food-reheating, food-review, food-sale, food-seasoning, food-temperature,  
food-temperature-preference, food-timing, food-waste  
cooking-cleanup, cooking-complexity, cooking-create, cooking-experiment, cooking-follow,  
cooking-garnishing, cooking-improvise, cooking-measurement, cooking-method

공통 프레임 (food): "음식 [주제]에서 드러나는 완벽주의 vs 실용주의"  
공통 프레임 (cooking): "요리 [스타일]이 드러내는 창의성·규칙 지향 성향"

#### 클러스터 4 — cooking 나머지 + meal (27개) → Week 5 처리
cooking-modify, cooking-multitask, cooking-music, cooking-presentation, cooking-recipe,  
cooking-seasoning, cooking-share, cooking-shared, cooking-solo, cooking-style,  
cooking-time, cooking-timing  
meal-balance, meal-cleanup, meal-duration, meal-etiquette, meal-frequency,  
meal-group, meal-leftover, meal-order, meal-pacing, meal-planning,  
meal-prep, meal-preparation, meal-serving, meal-sharing, meal-social, meal-solo

공통 프레임 (cooking): "함께·혼자·효율·즐거움 사이의 주방 성격"  
공통 프레임 (meal): "식사 맥락이 드러내는 사회성·규칙·여유 성향"

---

## 주차별 실행 계획

### Week 2 (5/4–5/10) — 이번 주
- **신규 퀴즈 ×3**: worknight-recovery, office-snack-habit, wfh-focus-type
- **Save List ×3**: lunch-decider, kdrama-mbti, ott-habits
- **Thin 부스트 ×12**: food 감각 클러스터 전체
- publishAt 등록: 위 표 KST 기준 UTC 변환 후 tests-config.ts 추가
- validate-new-slugs.js 실행 → 완료 시 주석 처리

### Week 3 (5/11–5/17)
- **신규 퀴즈 ×4**: friend-distance, sns-reaction-style, parent-comm-style, breakup-recovery-speed
- **Save List ×3**: weekend-food, weekend-balance, weekend-hobby
- **Thin 부스트 ×15**: food 행동 클러스터

### Week 4 (5/18–5/24)
- **신규 퀴즈 ×4**: goal-persistence, reading-focus, course-completion, language-learner-type
- **Save List ×3**: morning-mood, morning-phone, evening-meal
- **Thin 부스트 ×22**: food 기타 + cooking 클러스터

### Week 5 (5/25–5/31)
- **신규 퀴즈 ×4**: packing-style, airport-wait-type, map-dependency, trip-planning-style
- **Save List ×2**: love-reaction, evening-reflection
- **Thin 부스트 ×27**: cooking 나머지 + meal 클러스터
- AdSense 씬 콘텐츠 신호 해소 확인 → 재심사 요청 준비

### Week 6 (6/1–6/14)
- **신규 퀴즈 ×8**: sale-reaction, subscription-audit, comparison-shopping, membership-usage, stress-relief-type, workout-consistency, hydration-habit, diet-approach
- **Thin 부스트**: 잔여 보완

### Week 7 (6/15–6/28)
- **신규 퀴즈 ×4**: notification-control, focus-mode-usage, ai-chatbot-style, screentime-reaction
- AdSense 재심사 제출 (씬 콘텐츠 전수 완료 후)
- ai-index.json 재생성 + IndexNow ping

---

## 퀴즈 생성 체크리스트 (1개당)

```
□ lib/data/{slug}-questions.ts  — 12문항, 4축(E/I·S/N·T/F·J/P)
□ lib/data/{slug}-results.ts    — 16유형, fields: mbti/name/summary/traits/presets/recommend/pitfalls
□ app/tests/{slug}/page.tsx     — 랜딩 (icon·색상·제목 한국어)
□ app/tests/{slug}/test/page.tsx
□ app/tests/{slug}/test/layout.tsx   — meta KO
□ app/tests/{slug}/test/result/page.tsx
□ app/tests/{slug}/test/result/layout.tsx — meta KO
□ lib/tests-config.ts           — ALL_TESTS 항목 + publishAt
□ lib/extended-content.ts       — 800-1200자 슬롯
□ validate-new-slugs.js         — 발행 후 주석 처리
```

---

## 완료 기준 (Definition of Done)

1. `node scripts/validate-new-slugs.js` → 경고 0개 (발행된 slug 주석 처리 포함)
2. `npx tsc --noEmit` → 오류 0개
3. `node scripts/generate-ai-index.js` → indexable count 증가 확인
4. Thin 부스트 완료 시 `<TestExpandedIntro>` 렌더 여부 로컬 빌드 확인
5. 매 주차 커밋 + push → `claude/seo-optimization-planning-OWUud`
