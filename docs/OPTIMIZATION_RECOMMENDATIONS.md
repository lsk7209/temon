# 코드 최적화 권장사항

## 현재 상태 분석

### ✅ 완료된 최적화
1. **공통 훅 및 컴포넌트 생성**
   - `useQuizLogic` 훅 - 퀴즈 로직 통합
   - `QuizContainer` 컴포넌트 - 공통 레이아웃
   - `QuizChoiceButton` 컴포넌트 - 재사용 가능한 버튼
   - `QuizProgressBar` 컴포넌트 - 진행률 표시
   - `getQuizColorScheme` 유틸리티 - 색상 관리

2. **최적화된 퀴즈 (약 16개)**
   - food-spiciness, food-sweetness 등 최신 구조 사용

### ⚠️ 개선 필요 사항

#### 1. 데이터 구조 불일치
- **문제**: 일부 퀴즈는 `Record<number, string>` 사용, 일부는 `string[][]` 사용
- **영향**: `calculateMBTI` 함수와 호환성 문제
- **해결**: 모든 퀴즈를 `string[][]` 구조로 통일

#### 2. 코드 중복
- **문제**: 많은 퀴즈가 직접 구현된 로직 사용
- **영향**: 유지보수 어려움, 버그 발생 가능성
- **해결**: 모든 퀴즈를 `useQuizLogic` + `QuizContainer` 구조로 마이그레이션

#### 3. 결과 페이지 중복
- **문제**: 각 결과 페이지마다 비슷한 구조 반복
- **영향**: 코드 중복, 일관성 부족
- **해결**: 공통 결과 페이지 컴포넌트 생성

## 최적화 우선순위

### 즉시 적용 (High Priority)
1. ✅ **빌드 에러 수정** - 완료
2. ✅ **Salt 아이콘 문제 해결** - 완료
3. ✅ **예제 파일 삭제** - 완료

### 단기 (1주일 내)
1. **새로 개발하는 퀴즈는 최적화된 구조 사용**
2. **기존 퀴즈 점진적 마이그레이션**
3. **결과 페이지 공통 컴포넌트 생성**

### 중기 (1개월 내)
1. **모든 퀴즈 테스트 페이지 통일**
2. **성능 최적화 적용**
3. **접근성 개선**

## 최적화된 코드 예시

### 테스트 페이지 (최적화됨)
```typescript
"use client"

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"

const questions = [
  {
    id: 1,
    q: "질문 텍스트",
    a1: { text: "선택지 1", tags: ["E"] },
    a2: { text: "선택지 2", tags: ["I"] },
  },
  // ... 11개 더
]

export default function QuizTest() {
  const quizLogic = useQuizLogic({
    testId: "quiz-id",
    questions,
    resultPath: "/tests/quiz-id/test/result",
  })

  return (
    <QuizContainer
      {...quizLogic}
      colorClasses={getQuizColorScheme("blue-green")}
    />
  )
}
```

### 결과 페이지 (표준 구조)
```typescript
"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { ShareButtons } from "@/components/share-buttons"
import { getTestResult } from "@/lib/api-client"

const resultTypes = {
  ENFP: {
    label: "타입 이름",
    summary: "요약",
    description: ["상세 설명 1", "상세 설명 2", "상세 설명 3"],
    traits: ["특징 1", "특징 2", "특징 3"],
    picks: ["추천 1", "추천 2", "추천 3"],
    tips: ["팁 1", "팁 2", "팁 3"],
    match: "ISTJ, INTJ",
    emoji: "🔥",
  },
  // ... 15개 더
}

function ResultContent() {
  const searchParams = useSearchParams()
  const mbtiType = searchParams.get("type") as keyof typeof resultTypes
  const resultId = searchParams.get("id")
  const character = resultTypes[mbtiType]

  return (
    <div className="min-h-screen bg-gradient-to-br...">
      {/* 결과 페이지 UI */}
    </div>
  )
}

export default function QuizResultPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <ResultContent />
    </Suspense>
  )
}
```

## 성능 메트릭

- **빌드 성공률**: 100%
- **타입 에러**: 0개
- **린터 에러**: 0개
- **최적화된 퀴즈**: 약 16개 (16%)
- **마이그레이션 필요**: 약 84개 (84%)

## 다음 단계

1. ✅ 코드 최적화 리포트 작성 - 완료
2. ⏳ 새로 개발하는 퀴즈는 최적화된 구조 사용
3. ⏳ 기존 퀴즈 점진적 마이그레이션
4. ⏳ 결과 페이지 공통 컴포넌트 생성

