# 🔍 중복 퀴즈 분석 보고서

> **분석 일자**: 2025-11-13  
> **분석 대상**: `lib/tests-config.ts`, `tests-registry.json`, `app/tests/` 디렉토리

---

## ⚠️ 확인된 중복 퀴즈

### 1. 💰 소비 성향 테스트 (2개) - **중복 가능성 매우 높음**

| ID | 제목 | 설명 | 상태 |
|---|---|---|---|
| `spend-style` | 소비 성향 테스트 | 예산 관리, 가격 대비 가치, 충동구매 성향으로 16유형 분석 | ✅ 디렉토리 존재, ❌ tests-config.ts 없음 |
| `spending-style` | 소비 성향 테스트 | 계획 구매부터 즉흥 지출까지, 당신의 소비 패턴을 16유형으로 분석 | ✅ 디렉토리 존재, ✅ tests-config.ts 있음 |

**분석**:
- 둘 다 소비 관련 테스트
- `spend-style`는 `SPEND_STYLE_QUESTIONS` 사용
- `spending-style`는 `SPENDING_STYLE_QUESTIONS` 사용
- 내용이 매우 유사함
- **권장 조치**: `spend-style` 삭제 또는 통합

---

### 2. 🏪 편의점 간식 루틴 테스트 (2개) - **중복 가능성 높음**

| ID | 제목 | 설명 | 상태 |
|---|---|---|---|
| `convenience-snack` | 편의점 간식 루틴 테스트 | 방문 이유부터 조합 습관까지. 사소한 선택이 당신의 성향을 말합니다 | ✅ 디렉토리 존재, ✅ tests-config.ts 있음 |
| `cvs-snack-routine` | 편의점 간식 루틴 테스트 | 행사부터 한정판까지. 작은 간식 루틴이 당신의 의사결정 패턴을 말합니다 | ✅ 디렉토리 존재, ❌ tests-config.ts 없음 |

**분석**:
- 둘 다 편의점 간식 관련 테스트
- 질문 내용이 약간 다르지만 주제가 동일함
- **권장 조치**: `cvs-snack-routine` 삭제 또는 통합

---

### 3. 🏪 편의점 루틴 테스트 (3개) - **중복 가능성 있음**

| ID | 제목 | 설명 | 상태 |
|---|---|---|---|
| `cstore-routine` | 편의점 루틴 테스트 | 편의점 음료·간편식·행사상품 선택 루틴으로 성향을 분석합니다 | ✅ 디렉토리 존재, ✅ tests-config.ts 있음 |
| `cvs-combo` | 편의점 조합 스타일 테스트 | 편의점 선택 습관으로 16유형 성향을 분석합니다 | ✅ 디렉토리 존재, ✅ tests-config.ts 있음 |
| `cvs-snack-routine` | 편의점 간식 루틴 테스트 | 행사부터 한정판까지 | ✅ 디렉토리 존재, ❌ tests-config.ts 없음 |

**분석**:
- 모두 편의점 관련 테스트
- 각각 다른 각도지만 주제가 겹침
- **권장 조치**: 통합 검토 또는 명확한 차별화

---

### 4. 📱 스마트폰 사용 스타일 테스트 (2개) - **중복 가능성 높음**

| ID | 제목 | 설명 | 상태 |
|---|---|---|---|
| `phone-style` | 스마트폰 사용 습관 테스트 | 알림, 홈화면 정리, 배터리 관리 습관으로 16유형 분석 | ✅ 디렉토리 존재, ✅ tests-config.ts 있음 |
| `phone-usage` | 스마트폰 사용 스타일 | 알림 처리, 앱 정리, 집중 방해 요인, 소통 방식으로 16유형 분석 | ✅ 디렉토리 존재, ✅ tests-config.ts 있음 |

**분석**:
- 둘 다 스마트폰 사용 관련 테스트
- 내용이 매우 유사함
- **권장 조치**: 통합 검토

---

### 5. 🎬 K-드라마 테스트 (2개) - **유사하지만 차별화 가능**

| ID | 제목 | 설명 | 상태 |
|---|---|---|---|
| `kdrama-mbti` | K-드라마 클리셰 | 드라마 속 당신은 어떤 캐릭터? | ✅ 디렉토리 존재, ✅ tests-config.ts 있음 |
| `kdrama-character` | K-드라마 인물 매칭 테스트 | 드라마 속 상황 선택으로 내 캐릭터 유형 찾기 | ✅ 디렉토리 존재, ✅ tests-config.ts 있음 |

**분석**:
- 둘 다 드라마 관련이지만 각도가 다름
- `kdrama-mbti`: 클리셰 중심
- `kdrama-character`: 인물 매칭 중심
- **권장 조치**: 차별화가 명확하므로 유지 가능

---

## 🗑️ 삭제된 퀴즈 (레지스트리에만 존재)

### `lunch-style`
- **상태**: ❌ 디렉토리 없음, ❌ tests-config.ts 없음, ✅ tests-registry.json에만 존재
- **대체**: `lunch-decider`로 대체됨
- **권장 조치**: `tests-registry.json`에서 제거

---

## 🔧 이름 불일치

### `bungeoppang` vs `bungeoppang-style`
- **tests-registry.json**: `bungeoppang-style`
- **실제 디렉토리**: `bungeoppang`
- **tests-config.ts**: `bungeoppang`
- **권장 조치**: `tests-registry.json`의 slug를 `bungeoppang`로 수정

---

## 📊 중복 퀴즈 통계

| 카테고리 | 중복 그룹 수 | 총 중복 퀴즈 수 |
|---|---|---|
| 소비 관련 | 1개 그룹 | 2개 |
| 편의점 관련 | 2개 그룹 | 4개 |
| 스마트폰 관련 | 1개 그룹 | 2개 |
| 드라마 관련 | 1개 그룹 | 2개 (차별화 가능) |
| **합계** | **5개 그룹** | **10개** |

---

## ✅ 권장 조치사항

### 즉시 조치 필요 (중복 제거)

1. **`spend-style` 삭제**
   - `spending-style`가 더 완성도 높음
   - 디렉토리: `app/tests/spend-style/` 삭제
   - `tests-registry.json`에서 제거

2. **`cvs-snack-routine` 삭제**
   - `convenience-snack`와 중복
   - 디렉토리: `app/tests/cvs-snack-routine/` 삭제
   - `tests-registry.json`에서 제거

3. **`lunch-style` 레지스트리 정리**
   - `tests-registry.json`에서 제거

4. **`bungeoppang-style` 이름 수정**
   - `tests-registry.json`의 slug를 `bungeoppang`로 수정

### 검토 필요 (통합 또는 차별화)

1. **편의점 관련 3개 퀴즈**
   - `cstore-routine`, `cvs-combo`, `convenience-snack`
   - 통합 검토 또는 명확한 차별화 필요

2. **스마트폰 관련 2개 퀴즈**
   - `phone-style`, `phone-usage`
   - 통합 검토 필요

---

## 📝 참고사항

- `tests-config.ts`에 없는 퀴즈는 메인 목록에 표시되지 않음
- `tests-registry.json`은 SEO/사이트맵용으로 사용됨
- 실제 디렉토리가 있어도 `tests-config.ts`에 없으면 사용자에게 노출되지 않음

