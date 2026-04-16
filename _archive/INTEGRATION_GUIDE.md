# 테스트 결과 저장 통합 가이드

## 📋 개요

모든 테스트 페이지에 결과 저장 기능을 연결하는 방법을 안내합니다.

---

## 🔧 통합 방법

### 1. 필요한 Import 추가

```typescript
import { useTestResult } from "@/hooks/use-test-result"
import { trackTestStart, trackTestProgress } from "@/lib/analytics"
import { useEffect } from "react"
```

### 2. 훅 초기화

```typescript
const { saveResult, isSaving } = useTestResult({
  testId: 'your-test-id', // 예: 'coffee-mbti', 'ramen-mbti' 등
  onSuccess: (resultId) => {
    // 저장 성공 시 결과 페이지로 이동
    const result = calculateMBTI(answers)
    router.push(`/your-test/test/result?type=${result}&id=${resultId}`)
  },
  onError: (error) => {
    // 저장 실패해도 테스트는 계속 진행 (결과만 URL로 전달)
    console.error('결과 저장 실패:', error)
    const result = calculateMBTI(answers)
    router.push(`/your-test/test/result?type=${result}`)
  },
})
```

### 3. Analytics 추적 추가

```typescript
// 테스트 시작 추적
useEffect(() => {
  trackTestStart('your-test-id')
}, [])

// 진행률 추적
useEffect(() => {
  if (currentQuestion > 0) {
    trackTestProgress('your-test-id', currentQuestion + 1, questions.length)
  }
}, [currentQuestion])
```

### 4. 테스트 완료 시 결과 저장

기존 코드:
```typescript
// Calculate MBTI result and redirect
const result = calculateMBTI(newAnswers)
router.push(`/your-test/test/result?type=${result}`)
```

변경 후:
```typescript
// 모든 질문 완료 - 결과 계산 및 저장
const result = calculateMBTI(newAnswers)
await saveResult(result, newAnswers)
```

---

## 📝 테스트별 통합 예시

### 커피 MBTI (`app/coffee-mbti/test/page.tsx`)
✅ **이미 통합 완료** - 참고용

### 라면 MBTI (`app/ramen-mbti/test/page.tsx`)
```typescript
const { saveResult } = useTestResult({
  testId: 'ramen-mbti',
  onSuccess: (resultId) => {
    const result = calculateMBTI(answers)
    router.push(`/ramen-mbti/test/result?type=${result}&id=${resultId}`)
  },
  onError: (error) => {
    const result = calculateMBTI(answers)
    router.push(`/ramen-mbti/test/result?type=${result}`)
  },
})
```

### 반려동물 MBTI (`app/pet-mbti/test/page.tsx`)
```typescript
const { saveResult } = useTestResult({
  testId: 'pet-mbti',
  onSuccess: (resultId) => {
    const result = calculateMBTI(answers)
    router.push(`/pet-mbti/test/result?type=${result}&id=${resultId}`)
  },
  onError: (error) => {
    const result = calculateMBTI(answers)
    router.push(`/pet-mbti/test/result?type=${result}`)
  },
})
```

### 공부 MBTI (`app/study-mbti/test/page.tsx`)
```typescript
const { saveResult } = useTestResult({
  testId: 'study-mbti',
  onSuccess: (resultId) => {
    const result = calculateMBTI(answers)
    router.push(`/study-mbti/test/result?type=${result}&id=${resultId}`)
  },
  onError: (error) => {
    const result = calculateMBTI(answers)
    router.push(`/study-mbti/test/result?type=${result}`)
  },
})
```

### 알람 습관 (`app/alarm-habit/test/page.tsx`)
```typescript
const { saveResult } = useTestResult({
  testId: 'alarm-habit',
  onSuccess: (resultId) => {
    const result = calculateResult(answers)
    router.push(`/alarm-habit/test/result?type=${result}&id=${resultId}`)
  },
  onError: (error) => {
    const result = calculateResult(answers)
    router.push(`/alarm-habit/test/result?type=${result}`)
  },
})
```

### NTRP 테스트 (`app/ntrp-test/test/page.tsx`)
```typescript
const { saveResult } = useTestResult({
  testId: 'ntrp-test',
  onSuccess: (resultId) => {
    const level = calculateNTRPLevel(answers)
    router.push(`/ntrp-test/test/result?level=${level}&id=${resultId}`)
  },
  onError: (error) => {
    const level = calculateNTRPLevel(answers)
    router.push(`/ntrp-test/test/result?level=${level}`)
  },
})
```

---

## ⚠️ 주의사항

### 1. 비동기 처리
`saveResult`는 `async` 함수이므로 `await`를 사용해야 합니다:
```typescript
// ✅ 올바른 사용
await saveResult(result, newAnswers)

// ❌ 잘못된 사용
saveResult(result, newAnswers) // 결과 저장 전에 페이지 이동 가능
```

### 2. 에러 처리
저장 실패해도 테스트는 계속 진행되어야 합니다. `onError`에서 결과 페이지로 이동하세요.

### 3. 테스트 ID
각 테스트의 고유 ID를 정확히 입력하세요:
- `coffee-mbti`
- `ramen-mbti`
- `pet-mbti`
- `study-mbti`
- `alarm-habit`
- `ntrp-test`
- `kdrama-mbti`
- `snowwhite-mbti`
- `kpop-idol`

---

## 🔍 결과 페이지에서 저장된 결과 사용

결과 페이지에서 저장된 결과 ID를 사용할 수 있습니다:

```typescript
// app/coffee-mbti/test/result/page.tsx
import { useSearchParams } from 'next/navigation'
import { getTestResult } from '@/lib/api-client'

const searchParams = useSearchParams()
const resultId = searchParams.get('id')

if (resultId) {
  // 저장된 결과 조회 가능
  const savedResult = await getTestResult(resultId)
  // 결과 공유 시 사용
}
```

---

## ✅ 체크리스트

각 테스트 페이지 통합 시 확인사항:

- [ ] `useTestResult` 훅 import 및 초기화
- [ ] `trackTestStart` 호출 (테스트 시작 시)
- [ ] `trackTestProgress` 호출 (질문 변경 시)
- [ ] 테스트 완료 시 `await saveResult(result, answers)` 호출
- [ ] `onSuccess`에서 결과 페이지로 이동
- [ ] `onError`에서도 결과 페이지로 이동 (fallback)
- [ ] 테스트 ID 정확히 입력

---

**마지막 업데이트**: 2024년 12월

