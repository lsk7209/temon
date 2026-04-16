# 퀴즈 코드 최적화 가이드

## 개요

퀴즈 테스트 페이지의 중복 코드를 제거하고 재사용 가능한 컴포넌트와 훅으로 최적화했습니다.

## 최적화 내용

### 1. 커스텀 훅: `useQuizLogic`

**위치**: `hooks/use-quiz-logic.ts`

**기능**:
- 퀴즈 상태 관리 (currentQuestion, answers, selectedChoice, isProcessing)
- 진행률 계산
- 분석 추적 (trackTestStart, trackTestProgress)
- 선택지 처리 및 자동 진행
- 결과 저장 및 라우팅

**사용 예시**:
```typescript
import { useQuizLogic } from "@/hooks/use-quiz-logic"

const { 
  currentQuestion, 
  currentQ, 
  progress, 
  handleChoiceSelect, 
  handlePrevious 
} = useQuizLogic({
  testId: "food-label",
  questions,
  resultPath: "/tests/food-label/test/result",
})
```

### 2. 재사용 가능한 컴포넌트

#### `QuizChoiceButton`
**위치**: `components/quiz/quiz-choice-button.tsx`

**기능**:
- 접근성 지원 (aria-label, aria-pressed, keyboard navigation)
- 성능 최적화 (memo)
- 색상 스키마 커스터마이징
- 비활성화 상태 처리

#### `QuizProgressBar`
**위치**: `components/quiz/quiz-progress-bar.tsx`

**기능**:
- 진행률 표시
- 현재 질문 번호 표시
- 성능 최적화 (memo)

#### `QuizContainer`
**위치**: `components/quiz/quiz-container.tsx`

**기능**:
- 전체 퀴즈 레이아웃
- ProgressBar와 ChoiceButton 통합
- 이전 버튼 및 로딩 상태 표시

## 마이그레이션 가이드

### 기존 코드 (Before)

```typescript
export default function FoodLabelTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()
  const { saveResult, isSaving } = useTestResult({...})
  
  // ... 많은 중복 코드 ...
  
  return (
    <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950">
      {/* ... 중복된 UI 코드 ... */}
    </div>
  )
}
```

### 최적화된 코드 (After)

```typescript
import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"

const questions = [...] // 질문 데이터

export default function FoodLabelTest() {
  const quizLogic = useQuizLogic({
    testId: "food-label",
    questions,
    resultPath: "/tests/food-label/test/result",
  })

  return (
    <QuizContainer
      {...quizLogic}
      colorClasses={getQuizColorScheme("blue-green")}
    />
  )
}
```

### 코드 라인 수 비교

- **기존 코드**: ~290줄
- **최적화된 코드**: ~70줄
- **감소율**: 약 76% 감소

### 색상 스키마 사용법

```typescript
// 사용 가능한 색상 스키마
getQuizColorScheme("blue-green")      // 파란색-초록색
getQuizColorScheme("blue-purple")     // 파란색-보라색
getQuizColorScheme("orange-red")      // 주황색-빨간색
getQuizColorScheme("yellow-orange")   // 노란색-주황색
getQuizColorScheme("green-emerald")   // 초록색-에메랄드
getQuizColorScheme("blue-indigo")     // 파란색-인디고
getQuizColorScheme("amber-yellow")    // 앰버-노란색
```

## 성능 최적화

1. **메모이제이션**: `memo`를 사용하여 불필요한 리렌더링 방지
2. **useCallback**: 핸들러 함수 메모이제이션
3. **useMemo**: 계산된 값 메모이제이션
4. **타임아웃 정리**: cleanup 함수로 메모리 누수 방지

## 접근성 개선

1. **ARIA 속성**: `aria-label`, `aria-pressed`, `role="radiogroup"`
2. **키보드 네비게이션**: Enter/Space 키 지원
3. **포커스 관리**: `focus-visible` 스타일

## 다음 단계

1. 기존 퀴즈들을 새로운 컴포넌트로 마이그레이션
2. 색상 스키마를 테마 시스템으로 통합
3. 테스트 코드 작성
4. Storybook 스토리 추가

## 참고

- [React 최적화 가이드](https://react.dev/learn/render-and-commit)
- [Next.js 성능 최적화](https://nextjs.org/docs/app/building-your-application/optimizing)
