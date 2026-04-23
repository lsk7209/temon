# Save List 본문 확장 가이드

- **대상**: `CONTENT_AUDIT.md` Save List Top 15 테스트
- **목표**: 각 테스트 랜딩 페이지에 800~1,200자의 고유 심층 본문 추가
- **배경**: 5인 팀 감사 결과 132개 페이지가 본문 <300자 → AdSense "Thin Content" 리스크
- **접근**: 인프라는 이미 구축(`lib/extended-content.ts` + `<TestExpandedIntro />`), 사람이 본문만 채우면 자동 반영

---

## 🏗 인프라 구조 (이미 완성됨)

```
lib/extended-content.ts         ← EXTENDED_CONTENT 객체에 slug별 본문 정의
components/test-expanded-intro.tsx ← 데이터 있으면 자동 섹션 렌더 + Article JSON-LD
app/tests/{slug}/page.tsx       ← <TestExpandedIntro testId="{slug}" /> 한 줄만 삽입
```

**EXTENDED_CONTENT[slug]에 데이터가 없으면 컴포넌트는 `null` 반환** → 기존 페이지에 영향 없음.

---

## ✅ 완성된 샘플 (참고용)

- `ntrp-test` — 테니스 NTRP 등급 설명 + 한계 명시 (참고: `lib/extended-content.ts`)
- `coffee-mbti` — 커피 선호와 성격의 연결 + MBTI 공식 검사 아님을 투명하게 명시

이 2개 페이지를 먼저 배포해서 Google이 "업데이트되는 사이트"로 인식하기 시작.

---

## 📝 나머지 13개 Save List

| 우선순위 | Slug | 권장 접근 |
|---:|---|---|
| 1 | `kdrama-character` | K-드라마 캐릭터 유형이 관계에 주는 영향. 실제 드라마 예시 2~3개 인용 |
| 2 | `lunch-decider` | 점심 메뉴 결정 장애 현상 + 직장인 스트레스 연구 인용 |
| 3 | `bungeoppang` | 붕어빵 취향(팥/슈크림/슈팥반반) 심리적 의미 + 계절성 맥락 |
| 4 | `ott-habits` | 넷플릭스·웨이브 시청 패턴이 보여주는 일상 리듬 |
| 5 | `weekend-food` | 주말 식사 유형(배달/외식/홈쿡)별 에너지 소비 패턴 |
| 6 | `weekend-balance` | 주말을 성취/휴식 어느 쪽에 쓰는지의 의미 |
| 7 | `weekend-hobby` | 혼자형/소셜형 취미 선호가 주는 사회적 에너지 신호 |
| 8 | `morning-mood` | 아침 기분을 다루는 방식 — 정서 조절 유형 |
| 9 | `morning-phone` | 아침 스마트폰 체크가 하루에 미치는 영향 (디지털 웰빙 연구 인용) |
| 10 | `evening-meal` | 저녁 식사 스타일이 수면과 대사에 주는 영향 |
| 11 | `love-reaction` | 연애 갈등 반응 유형 (애착 이론 간단 소개) |
| 12 | `evening-reflection` | 하루 돌아보기 습관이 자기 인식에 주는 효과 |
| 13 | `kdrama-mbti` | K-드라마 클리셰 선호와 MBTI 간 상관 |

---

## ✍️ 본문 작성 템플릿

`lib/extended-content.ts` 파일에 아래 형식으로 slug별 객체 추가:

```ts
"kdrama-character": {
  intro: "KKK~",             // 200~250자. "이 테스트가 무엇인지"
  whyItMatters: "~~~",       // 250~350자. "왜 의미있는 신호인가"
  useCases: [                // 3~4개. 각 60~100자
    "친구와 비교하며 ~",
    "실제 관계 갈등을 해석할 때 ~",
    "드라마 시청 취향을 설명할 때 ~",
  ],
  limitations: "~~~",        // 150~250자. "한계·주의사항" (AdSense 투명성)
  extraFaqs: [               // 선택, 2~3개
    { question: "~?", answer: "~" },
  ],
  lastUpdated: "2026-05-01", // 작성 완료일
},
```

---

## ❌ 작성 시 금지 사항 (Scaled Abuse 회피)

1. **템플릿 복사 금지** — 각 slug별 고유 맥락으로 작성. "~~로 알아보는 나의 성격" 같은 공통 문구 X
2. **과장·확정 금지** — "반드시", "100%", "정확한 진단" 대신 "가능성", "경향", "참고용"
3. **LLM 원시 출력 그대로 붙여넣기 금지** — 최소한 1인칭 표현 2~3개 추가, 이모지 과다 사용 제거
4. **출처 없는 수치 금지** — "80%의 사람들이..." 같은 무출처 통계 X. 인용하려면 공신력 있는 링크 달기
5. **같은 날 13개 동시 추가 금지** — 주 단위로 2~3개씩 드립 권장

---

## 🚀 실행 순서 (권장)

### 주 1
- 샘플 2개 (`ntrp-test`, `coffee-mbti`) 이미 완성 → **배포**
- Google Search Console에서 두 URL 수동 색인 요청

### 주 2~6
- 주당 2~3개씩 13개 slug에 본문 추가
- 각 추가 후 `lastUpdated` 필드 현재 날짜로 기입
- 커밋 메시지에 "확장 slug"를 명시 (예: `feat(content): kdrama-character 심층 본문 추가`)

### 주 6 이후
- 15개 Save List 완성 시 GSC에서 색인 상태 점검
- `/tests/` 카테고리 전체 랭킹 변화 관찰
- 안정적이면 **AdSense 재심사 신청** 고려

---

## 🔄 페이지에 컴포넌트 연결하기

본문 데이터만 추가해도 자동 반영되지 않음. **해당 테스트의 `app/tests/{slug}/page.tsx`에 한 줄 삽입 필요**:

```tsx
import { TestExpandedIntro } from "@/components/test-expanded-intro"

// ... 렌더 함수 내부, <AnswerEngineSection /> 바로 위에:
<TestExpandedIntro testId="kdrama-character" />
```

샘플 파일 참고: `app/tests/ntrp-test/page.tsx`, `app/tests/coffee-mbti/page.tsx`.

---

## 📊 진행 체크리스트

- [x] `ntrp-test` 심층 본문
- [x] `coffee-mbti` 심층 본문
- [ ] `kdrama-character`
- [ ] `lunch-decider`
- [ ] `bungeoppang`
- [ ] `ott-habits`
- [ ] `weekend-food`
- [ ] `weekend-balance`
- [ ] `weekend-hobby`
- [ ] `morning-mood`
- [ ] `morning-phone`
- [ ] `evening-meal`
- [ ] `love-reaction`
- [ ] `evening-reflection`
- [ ] `kdrama-mbti`

---

## 💡 드립 공개 (자동)

신규 퀴즈 드립은 **이미 자동화되어 있음**:
- `app/api/cron/publish/route.ts` — DB `tests` 테이블에서 `status='draft'`인 테스트를 1개씩 `published`로 전환
- `vercel.json` cron `0 8,20 * * *` — 매일 8시/20시 실행
- `submitUrlsToIndexNow()`로 Bing/Naver/Yandex 자동 색인 요청

새 퀴즈는 DB에 draft로 insert만 하면 **하루 2개씩 자동 공개**됩니다.
Save List 본문 확장은 이 시스템과 별개로 기존 페이지를 보강하는 작업.
