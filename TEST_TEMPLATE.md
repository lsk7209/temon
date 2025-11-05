# 테스트 페이지 표준 템플릿

## 📋 목적
모든 테스트 페이지가 동일한 구조와 패턴을 따르도록 표준화하여, 추가 개발 시 일관성과 유지보수성을 확보합니다.

---

## 🏗️ 표준 구조

### 1. Import 섹션
```typescript
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useTestResult } from "@/hooks/use-test-result"
import { trackTestStart, trackTestProgress } from "@/lib/analytics"
```

### 2. Questions 데이터 구조
```typescript
interface Question {
  id: number
  text: string // 또는 question
  choices: {
    id: string
    text: string
    tags?: string[] // MBTI 타입 등
  }[]
}

const questions: Question[] = [
  // 질문 데이터
]
```

### 3. 컴포넌트 구조
```typescript
export default function TestPageName() {
  // === 상태 변수 (표준화) ===
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  
  // === Router & Hooks ===
  const router = useRouter()
  const { saveResult } = useTestResult({
    testId: 'test-id',
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/test-id/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error('결과 저장 실패:', error)
      router.push(`/tests/test-id/test/result?type=${resultType}`)
    },
  })

  // === Progress 계산 ===
  const progress = ((currentQuestion + 1) / questions.length) * 100

  // === Analytics 추적 ===
  useEffect(() => {
    trackTestStart('test-id')
  }, [])

  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress('test-id', currentQuestion + 1, questions.length)
    }
  }, [currentQuestion])

  // === 핸들러 함수 (표준화) ===
  const handleChoiceSelect = async (choiceId: string) => {
    setSelectedChoice(choiceId)
    const currentQuestionIndex = currentQuestion // 클로저 문제 방지

    // Auto-advance after a short delay to show selection
    setTimeout(async () => {
      const newAnswers = { ...answers, [currentQuestionIndex]: choiceId }
      setAnswers(newAnswers)

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestion(currentQuestionIndex + 1)
        setSelectedChoice("")
      } else {
        // 모든 질문 완료 - 결과 계산 및 저장
        const result = calculateResult(newAnswers)
        await saveResult(result, newAnswers)
      }
    }, 500) // 0.5초 딜레이로 선택 확인 후 자동 이동
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedChoice(answers[currentQuestion - 1] || "")
    }
  }

  // === 결과 계산 함수 ===
  const calculateResult = (answers: Record<number, string>): string => {
    // 테스트별 로직 구현
  }

  // === 렌더링 ===
  const question = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[color]-50 to-[color]-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              질문 {currentQuestion + 1} / {questions.length}
            </span>
            <span className="text-sm font-medium text-[color]-600">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="p-8 md:p-12 shadow-xl border-2 border-[color]-200 bg-white/90 backdrop-blur">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              {question.text}
            </h2>
          </div>

          {/* Choices */}
          <div className="space-y-4">
            {question.choices.map((choice) => (
              <Button
                key={choice.id}
                onClick={() => handleChoiceSelect(choice.id)}
                disabled={selectedChoice !== ""}
                variant={selectedChoice === choice.id ? "default" : "outline"}
                className={`w-full h-auto p-6 text-left justify-start ${
                  selectedChoice === choice.id
                    ? "bg-[color]-500 text-white border-[color]-500"
                    : "border-gray-300 hover:border-[color]-300"
                }`}
              >
                {choice.text}
              </Button>
            ))}
          </div>

          {/* Previous Button (Optional) */}
          {currentQuestion > 0 && (
            <div className="mt-6">
              <Button
                variant="outline"
                onClick={handlePrevious}
                className="w-full"
              >
                이전 질문
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
```

---

## ✅ 표준 규칙

### 1. 함수 이름
- ✅ **핸들러**: `handleChoiceSelect` (통일)
- ❌ `handleAnswer`, `handleClick` 등 사용 금지

### 2. 상태 변수
- ✅ `currentQuestion`: 현재 질문 인덱스 (number)
- ✅ `answers`: `Record<number, string>` 형식
- ✅ `selectedChoice`: 선택된 답변 ID (string)
- ❌ `selectedOption`, `selectedIndex` 등 사용 금지

### 3. 답변 저장 형식
- ✅ **표준**: `Record<number, string>`
- ✅ `answers[0] = "a"` 형태
- ❌ `string[]`, `Record<string, number>` 등 사용 금지

### 4. 클로저 문제 방지
- ✅ `setTimeout` 내부에서 `currentQuestion` 직접 사용 금지
- ✅ `const currentQuestionIndex = currentQuestion` 미리 저장

### 5. Analytics 추적
- ✅ `trackTestStart`: 컴포넌트 마운트 시 (useEffect)
- ✅ `trackTestProgress`: `currentQuestion` 변경 시 (useEffect)
- ❌ 핸들러 함수 내부에서 직접 호출 금지 (ntrp-test 제외 - 특수 케이스)

### 6. 자동 이동 딜레이
- ✅ **통일**: 500ms
- ✅ 모든 테스트 동일한 딜레이 사용

### 7. 이전 질문 기능
- ✅ `handlePrevious` 함수 구현 (선택 사항)
- ✅ 모든 테스트에서 동일한 로직

---

## 🔄 변환 가이드

### 기존 테스트를 표준 템플릿으로 변환

#### 1. `handleAnswer` → `handleChoiceSelect`
```typescript
// Before
const handleAnswer = async (optionIndex: number) => { ... }

// After
const handleChoiceSelect = async (choiceId: string) => { ... }
```

#### 2. `selectedOption` → `selectedChoice`
```typescript
// Before
const [selectedOption, setSelectedOption] = useState<number | null>(null)

// After
const [selectedChoice, setSelectedChoice] = useState<string>("")
```

#### 3. `string[]` → `Record<number, string>`
```typescript
// Before
const [answers, setAnswers] = useState<string[]>([])
const newAnswers = [...answers, questions[currentQuestion].options[optionIndex].type]

// After
const [answers, setAnswers] = useState<Record<number, string>>({})
const newAnswers = { ...answers, [currentQuestionIndex]: choiceId }
```

#### 4. 클로저 문제 수정
```typescript
// Before
setTimeout(async () => {
  if (currentQuestion < questions.length - 1) { ... }
}, 500)

// After
const currentQuestionIndex = currentQuestion
setTimeout(async () => {
  if (currentQuestionIndex < questions.length - 1) { ... }
}, 500)
```

---

## 📝 체크리스트

새로운 테스트를 추가하거나 기존 테스트를 수정할 때 확인:

- [ ] `handleChoiceSelect` 함수 사용
- [ ] `selectedChoice` 상태 변수 사용
- [ ] `answers`는 `Record<number, string>` 형식
- [ ] 클로저 문제 방지 (`currentQuestionIndex` 사용)
- [ ] Analytics 추적은 `useEffect`에서
- [ ] 자동 이동 딜레이 500ms
- [ ] `handlePrevious` 함수 구현 (선택)
- [ ] Progress 바 표시
- [ ] 결과 계산 함수 구현
- [ ] `useTestResult` 훅 사용

---

**작성일**: 2024년 12월  
**목적**: 테스트 페이지 표준화 및 일관성 확보

