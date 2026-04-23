# 신규 퀴즈 30개 로드맵 (Scaled Abuse 회피 드립 공개)

- **계획 승인일**: 2026-04-24
- **승인 Plan**: `C:/Users/dlatj/.claude/plans/shimmying-wondering-crescent.md`
- **중복 검증**: `scripts/validate-new-slugs.js` 통과 (30/30 자카드 <0.3)

---

## ✅ 완료 (Phase A + B 1개 샘플)

- `lib/tests-config.ts` Test 인터페이스에 `publishAt?: string` 추가
- `lib/visible-tests.ts` — getVisibleTests / getIndexableTests
- `app/sitemap.xml`, 홈, related-tests 전부 드립 필터 적용
- `scripts/validate-new-slugs.js` — 기존 ALL_TESTS와 자카드 검증
- **`commute-style` 완전 샘플 1개 구축** — publishAt 미지정 → 즉시 공개
  - `lib/data/commute-style-{questions,results}.ts`
  - `app/tests/commute-style/{page, test/page, test/result/page, test/layout, test/result/layout, test/result/loading}.tsx`
  - `lib/extended-content.ts`에 commute-style slot 완성 (약 1,000자)
  - `lib/tests-config.ts` ALL_TESTS 맨 앞에 등록

## 🔄 남은 29개 (사용자 작성 대기)

각 퀴즈당 필요 파일 세트:
```
lib/data/{slug}-questions.ts      # 12문항
lib/data/{slug}-results.ts        # 16 MBTI 결과
app/tests/{slug}/page.tsx         # 랜딩
app/tests/{slug}/test/layout.tsx
app/tests/{slug}/test/page.tsx    # 진행
app/tests/{slug}/test/result/layout.tsx
app/tests/{slug}/test/result/loading.tsx
app/tests/{slug}/test/result/page.tsx
lib/extended-content.ts           # slug slot 추가
lib/tests-config.ts               # ALL_TESTS 등록 + publishAt
```

**복제 템플릿**: `app/tests/commute-style/` 폴더 전체를 복사한 뒤 slug·title·icon·color만 교체하는 방식이 가장 빠르고 안전합니다.

---

## 📅 드립 공개 스케줄 (권장)

하루 2개씩 15일에 분산. `publishAt` 필드에 ISO 날짜 지정.

| 날짜 | 퀴즈 | 카테고리 |
|---|---|---|
| D+0 (오늘) | ✅ `commute-style` | 직장 |
| D+1 | `workday-energy` / `first-date-nerves` | 직장 / 연애 |
| D+2 | `worknight-recovery` / `friend-distance` | 직장 / 연애 |
| D+3 | `office-snack-habit` / `sns-reaction-style` | 직장 / 연애 |
| D+4 | `wfh-focus-type` / `parent-comm-style` | 직장 / 연애 |
| D+5 | `breakup-recovery-speed` / `goal-persistence` | 연애 / 자기계발 |
| D+6 | `reading-focus` / `course-completion` | 자기계발 |
| D+7 | `language-learner-type` / `packing-style` | 자기계발 / 여행 |
| D+8 | `airport-wait-type` / `map-dependency` | 여행 |
| D+9 | `trip-planning-style` / `sale-reaction` | 여행 / 쇼핑 |
| D+10 | `subscription-audit` / `comparison-shopping` | 쇼핑 |
| D+11 | `membership-usage` / `stress-relief-type` | 쇼핑 / 건강 |
| D+12 | `workout-consistency` / `hydration-habit` | 건강 |
| D+13 | `diet-approach` / `notification-control` | 건강 / 디지털 |
| D+14 | `focus-mode-usage` / `ai-chatbot-style` | 디지털 |
| D+15 | `screentime-reaction` | 디지털 |

**실제 `publishAt` 포맷**:
```ts
{
  id: "workday-energy",
  // ...
  publishAt: "2026-04-25T00:00:00Z",  // D+1 자정 (UTC)
}
```

미래 날짜이면 sitemap·홈·tests 인덱스에 자동으로 숨겨지고, 날짜 도달 시 자동 노출됩니다.

---

## ✍️ 신규 퀴즈 작성 체크리스트 (1개당)

1. `scripts/validate-new-slugs.js`에서 기존 ALL_TESTS와 자카드 <0.3 재확인
2. `app/tests/commute-style/` 폴더 복사 → `app/tests/{slug}/`로 이름 변경
3. 복사한 파일 내의 모든 `commute-style`/`커피`/`COMMUTE_STYLE` 문자열을 신규 slug로 교체
4. `lib/data/{slug}-questions.ts` 12문항 MBTI 축 3문항씩 배분 (E/I, S/N, T/F, J/P)
5. `lib/data/{slug}-results.ts` 16 MBTI 결과. 각 name 고유, summary 한 줄, traits 3개, presets status/recovery/warning
6. `lib/extended-content.ts` EXTENDED_CONTENT에 slug 객체 추가 (intro + whyItMatters + useCases + limitations + extraFaqs + lastUpdated) **각 800자+**
7. `lib/tests-config.ts` ALL_TESTS에 객체 추가. `publishAt` 스케줄 반영
8. `npx tsc --noEmit` 통과 확인
9. `node scripts/validate-new-slugs.js` 재실행
10. 로컬 `npm run dev`로 해당 URL 접속 확인

---

## ❌ 절대 금지 사항

1. **LLM 원시 출력 그대로 발행**: 반드시 사람이 읽고 개성 주입 후 발행
2. **15일 일정을 앞당기는 대량 발행**: publishAt 조작해 하루 3개+ 발행 시 Scaled Abuse 시그널 강화
3. **템플릿 문구 반복**: "~로 알아보는 나의 성격", "12문항 3분 무료" 같은 공통 문구는 extended content에선 쓰지 않을 것
4. **기존 slug 변형(`cooking-shared`→`cooking-share2`)**: 검증 스크립트가 차단

---

## 🎯 최종 목표 (6주 후)

- 30 신규 퀴즈 전부 공개 + extended content 각 800자+
- 기존 Save List 15개 본문 확장 병행 (`SAVE_LIST_EXPANSION.md`)
- 132개 얇은 페이지 중 50개 이상 300자+로 보강
- 이후 30일 추가 대기 → GSC 색인 안정화 확인 → **AdSense 재심사 신청**
