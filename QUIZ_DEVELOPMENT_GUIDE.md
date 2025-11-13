# 📚 퀴즈 개발 가이드

> **목적**: 새로운 퀴즈 개발 시 참고할 구조, 패턴, 베스트 프랙티스 가이드  
> **업데이트**: 2025-11-14

---

## 📁 디렉토리 구조

```
app/tests/{quiz-id}/
├── page.tsx              # 퀴즈 소개 페이지 (인트로)
├── test/
│   ├── page.tsx          # 퀴즈 진행 페이지 (질문/답변)
│   └── result/
│       └── page.tsx      # 결과 페이지
lib/
├── data/
│   ├── {quiz-id}-questions.ts    # 질문 데이터 (선택사항)
│   └── {quiz-id}-results.ts      # 결과 데이터 (선택사항)
└── utils/
    └── {quiz-id}-scorer.ts        # 점수 계산 로직 (선택사항)
```

---

## 🎯 퀴즈 개발 패턴

### 패턴 1: 인라인 질문 (간단한 퀴즈)

**예시**: `coffee-mbti`, `chicken-style`

- 질문 데이터를 테스트 페이지에 직접 정의
- 별도 데이터 파일 불필요
- 빠른 개발 가능

```typescript
// app/tests/{quiz-id}/test/page.tsx
const questions = [
  {
    id: 1,
    text: "질문 내용",
    choices: [
      { id: "a", text: "선택지 1", tags: ["E"] },
      { id: "b", text: "선택지 2", tags: ["I"] },
    ],
  },
  // ...
]
```

### 패턴 2: 외부 데이터 파일 (복잡한 퀴즈)

**예시**: `spending-style`, `phone-usage`

- 질문 데이터를 별도 파일로 분리
- 재사용성 및 유지보수 용이
- 타입 안정성 보장

```typescript
// lib/data/{quiz-id}-questions.ts
export interface Question {
  id: number
  text: string
  options: { label: string; tag: OptionTag }[]
}

export const QUIZ_QUESTIONS: Question[] = [...]
```

---

## 📄 페이지 구조

### 1. 인트로 페이지 (`page.tsx`)

**위치**: `app/tests/{quiz-id}/page.tsx`

**기능**:
- 퀴즈 소개 및 설명
- SEO 메타데이터 설정
- 테스트 시작 버튼

**필수 요소**:
- `Metadata` export (SEO)
- 제목, 설명, 키워드
- `/tests/{quiz-id}/test` 링크

**예시 구조**:
```typescript
export const metadata: Metadata = {
  title: "퀴즈 제목 - 무료 성격 테스트 | 테몬",
  description: "퀴즈 설명...",
  keywords: "키워드1, 키워드2, ...",
  alternates: { canonical: "/tests/{quiz-id}" },
  openGraph: { ... },
}

export default function QuizIntro() {
  return (
    <div>
      {/* 제목, 설명 */}
      {/* 테스트 소개 */}
      {/* 통계 (소요시간, 문항수) */}
      <Link href="/tests/{quiz-id}/test">
        <Button>테스트 시작하기</Button>
      </Link>
    </div>
  )
}
```

---

### 2. 테스트 페이지 (`test/page.tsx`)

**위치**: `app/tests/{quiz-id}/test/page.tsx`

**기능**:
- 질문 표시 및 답변 수집
- 진행률 표시
- 결과 계산 및 저장
- 자동 다음 질문 이동

**필수 요소**:
- `"use client"` 지시어
- `useTestResult` 훅 사용
- 진행률 표시 (Progress 컴포넌트)
- 답변 상태 관리
- 결과 계산 함수

**핵심 패턴**:

```typescript
"use client"

import { useState, useEffect } from "react"
import { useTestResult } from "@/hooks/use-test-result"
import { trackTestStart, trackTestProgress } from "@/lib/analytics"

export default function QuizTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const router = useRouter()
  
  const { saveResult, isSaving } = useTestResult({
    testId: '{quiz-id}',
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/{quiz-id}/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      router.push(`/tests/{quiz-id}/test/result?type=${resultType}`)
    },
  })

  // 테스트 시작 추적
  useEffect(() => {
    trackTestStart('{quiz-id}')
  }, [])

  // 진행률 추적
  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress('{quiz-id}', currentQuestion + 1, questions.length)
    }
  }, [currentQuestion])

  const handleChoiceSelect = async (choiceId: string) => {
    setSelectedChoice(choiceId)
    
    setTimeout(async () => {
      const newAnswers = { ...answers, [currentQuestion]: choiceId }
      setAnswers(newAnswers)

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedChoice("")
      } else {
        // 결과 계산 및 저장
        const result = calculateResult(newAnswers)
        await saveResult(result, newAnswers)
      }
    }, 500)
  }

  const calculateResult = (answers: Record<number, string>): string => {
    // MBTI 계산 로직 또는 커스텀 로직
    // ...
    return "ENFP" // 또는 다른 결과 타입
  }

  return (
    <div>
      {/* 진행률 바 */}
      <Progress value={progress} />
      
      {/* 질문 카드 */}
      <Card>
        <h1>{currentQ.text}</h1>
        {currentQ.choices.map(choice => (
          <button onClick={() => handleChoiceSelect(choice.id)}>
            {choice.text}
          </button>
        ))}
      </Card>
    </div>
  )
}
```

**답변 형식**:

1. **Record<number, string>** (기본)
   ```typescript
   const answers: Record<number, string> = { 0: "a", 1: "b" }
   ```

2. **string[][]** (태그 배열)
   ```typescript
   const answers: string[][] = [["E"], ["S"], ["T"]]
   // convertAnswersToRecord() 사용 필요
   ```

---

### 3. 결과 페이지 (`test/result/page.tsx`)

**위치**: `app/tests/{quiz-id}/test/result/page.tsx`

**기능**:
- 결과 타입 표시
- 결과 상세 설명
- 공유 기능
- 다시 테스트 버튼
- 관련 퀴즈 추천

**필수 요소**:
- `"use client"` 지시어
- `useSearchParams`로 결과 타입 받기
- `Suspense`로 감싸기
- `ShareButtons` 컴포넌트
- 결과 데이터 객체

**핵심 패턴**:

```typescript
"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { ShareButtons } from "@/components/share-buttons"
import { getTestResult } from "@/lib/api-client"

const resultTypes = {
  ENFP: {
    name: "유형 이름",
    emoji: "🎉",
    summary: "한 줄 요약",
    description: ["설명 1", "설명 2"],
    // ... 기타 속성
  },
  // ... 16개 유형
}

function ResultContent() {
  const searchParams = useSearchParams()
  const resultType = searchParams.get("type") as keyof typeof resultTypes
  const resultId = searchParams.get("id")
  
  const result = resultTypes[resultType]

  return (
    <div>
      {/* 결과 카드 */}
      <Card>
        <div className="text-8xl">{result.emoji}</div>
        <h1>{result.name}</h1>
        <p>{result.summary}</p>
        <ShareButtons
          testId="{quiz-id}"
          testPath="/tests/{quiz-id}/test"
          resultType={resultType}
          resultId={resultId}
          title={`나는 ${result.name}!`}
          description={result.summary}
        />
      </Card>

      {/* 상세 설명 */}
      <Card>
        {result.description.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </Card>

      {/* 다시 테스트 */}
      <Link href="/tests/{quiz-id}/test">
        <Button>다시 테스트</Button>
      </Link>
    </div>
  )
}

export default function QuizResult() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  )
}
```

---

## 🔧 핵심 유틸리티

### 1. `useTestResult` 훅

**위치**: `hooks/use-test-result.ts`

**사용법**:
```typescript
const { saveResult, isSaving } = useTestResult({
  testId: 'quiz-id',
  onSuccess: (resultId, resultType) => {
    router.push(`/tests/quiz-id/test/result?type=${resultType}&id=${resultId}`)
  },
  onError: (error, resultType) => {
    router.push(`/tests/quiz-id/test/result?type=${resultType}`)
  },
})

// 결과 저장
await saveResult(resultType, answers)
```

**기능**:
- 결과 저장 (API 호출)
- 분석 이벤트 추적
- 에러 처리
- 성공/실패 콜백

---

### 2. 답변 변환 유틸

**위치**: `lib/utils/test-answers.ts`

**함수들**:

```typescript
// string[][] → Record<number, string>
convertAnswersToRecord(answers: string[][]): Record<number, string>

// string[] → Record<number, string>
convertStringArrayToRecord(answers: string[]): Record<number, string>
```

**사용 예시**:
```typescript
import { convertAnswersToRecord } from "@/lib/utils/test-answers"

const answers: string[][] = [["E"], ["S"], ["T"]]
const answersRecord = convertAnswersToRecord(answers)
await saveResult(result, answersRecord)
```

---

### 3. 분석 추적

**위치**: `lib/analytics.ts`

**함수들**:
```typescript
trackTestStart(testId: string)
trackTestProgress(testId: string, current: number, total: number)
trackTestComplete(testId: string, resultType: string)
```

**사용 예시**:
```typescript
import { trackTestStart, trackTestProgress } from "@/lib/analytics"

useEffect(() => {
  trackTestStart('quiz-id')
}, [])

useEffect(() => {
  if (currentQuestion > 0) {
    trackTestProgress('quiz-id', currentQuestion + 1, questions.length)
  }
}, [currentQuestion])
```

---

## 📊 결과 계산 패턴

### MBTI 16유형 계산

```typescript
const calculateMBTI = (answers: Record<number, string>): string => {
  const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 }

  Object.entries(answers).forEach(([questionIndex, choiceId]) => {
    const question = questions[Number.parseInt(questionIndex)]
    const choice = question.choices.find((c) => c.id === choiceId)
    if (choice) {
      choice.tags.forEach((tag) => {
        scores[tag as keyof typeof scores]++
      })
    }
  })

  const result =
    (scores.E > scores.I ? "E" : "I") +
    (scores.S > scores.N ? "S" : "N") +
    (scores.T > scores.F ? "T" : "F") +
    (scores.J > scores.P ? "J" : "P")

  return result
}
```

### 태그 배열 기반 계산

```typescript
const calculateMBTI = (answers: string[][]): string => {
  const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 }

  answers.forEach((tags) => {
    tags.forEach((tag) => {
      if (tag in scores) {
        scores[tag as keyof typeof scores]++
      }
    })
  })

  const result =
    (scores.E >= scores.I ? "E" : "I") +
    (scores.S >= scores.N ? "S" : "N") +
    (scores.T >= scores.F ? "T" : "F") +
    (scores.J >= scores.P ? "J" : "P")

  return result
}
```

---

## 🎨 UI 컴포넌트 패턴

### 진행률 바

```typescript
<Progress value={progress} className="flex-1" />
```

### 질문 카드

```typescript
<Card className="border-0 shadow-2xl bg-white/90 backdrop-blur">
  <CardContent className="p-8">
    <div className="text-center mb-8">
      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-{color}-400 to-{color}-500">
        <span className="text-white font-bold text-2xl">{currentQuestion + 1}</span>
      </div>
      <h1 className="text-2xl md:text-3xl font-bold">{currentQ.text}</h1>
    </div>
    
    <div className="space-y-4">
      {currentQ.choices.map((choice) => (
        <button
          onClick={() => handleChoiceSelect(choice.id)}
          className={`w-full p-6 rounded-2xl border-2 ${
            selectedChoice === choice.id
              ? "border-{color}-500 bg-gradient-to-r from-{color}-50"
              : "border-gray-200 hover:border-{color}-300"
          }`}
        >
          {choice.text}
        </button>
      ))}
    </div>
  </CardContent>
</Card>
```

### 결과 카드

```typescript
<Card className="border-0 shadow-2xl bg-white/90 backdrop-blur">
  <CardContent className="p-8 text-center">
    <div className="text-8xl mb-4">{result.emoji}</div>
    <Badge>{resultType}</Badge>
    <h1 className="text-4xl md:text-5xl font-bold">{result.name}</h1>
    <p className="text-xl md:text-2xl">{result.summary}</p>
    <ShareButtons {...shareProps} />
  </CardContent>
</Card>
```

---

## 📝 설정 파일 등록

### 1. `lib/tests-config.ts`에 추가

```typescript
export const ALL_TESTS: Test[] = [
  // ... 기존 퀴즈들
  {
    id: "new-quiz-id",
    title: "🆕 새 퀴즈",
    description: "퀴즈 설명",
    icon: IconComponent,
    href: "/tests/new-quiz-id",
    color: "from-blue-500 to-cyan-600",
    participants: "0",
    rating: 5.0,
    badge: "NEW",
    category: "카테고리",
    tags: ["태그1", "태그2"],
    new: true,
  },
]
```

### 2. `tests-registry.json`에 자동 등록

스크립트 실행 시 자동으로 등록되거나, 수동으로 추가:

```json
{
  "slug": "new-quiz-id",
  "title": "새 퀴즈 - 무료 성격 테스트",
  "description": "퀴즈 설명...",
  "url": "/tests/new-quiz-id",
  "createdAt": "2025-11-14T00:00:00.000Z"
}
```

---

## 🔄 라우팅 구조

```
/tests/{quiz-id}              → 인트로 페이지
/tests/{quiz-id}/test         → 테스트 진행 페이지
/tests/{quiz-id}/test/result → 결과 페이지 (쿼리: ?type=ENFP&id=result-id)
```

---

## ✅ 체크리스트

### 개발 전
- [ ] 퀴즈 ID 결정 (kebab-case)
- [ ] 질문 12개 준비
- [ ] 결과 16개 유형 정의
- [ ] 카테고리 및 태그 결정

### 개발 중
- [ ] 인트로 페이지 생성 (`page.tsx`)
- [ ] 테스트 페이지 생성 (`test/page.tsx`)
- [ ] 결과 페이지 생성 (`test/result/page.tsx`)
- [ ] SEO 메타데이터 설정
- [ ] 분석 추적 코드 추가
- [ ] 결과 계산 로직 구현

### 개발 후
- [ ] `lib/tests-config.ts`에 등록
- [ ] `tests-registry.json` 확인
- [ ] 공유 기능 테스트
- [ ] 모바일 반응형 확인
- [ ] 다크모드 확인

---

## 🎯 베스트 프랙티스

1. **일관된 네이밍**: kebab-case 사용 (`coffee-mbti`, `chicken-style`)
2. **12문항 표준**: 대부분의 퀴즈는 12문항
3. **자동 진행**: 답변 선택 시 0.5초 후 자동 다음 질문
4. **진행률 표시**: 항상 진행률 바 표시
5. **에러 처리**: 저장 실패해도 결과 페이지로 이동
6. **공유 기능**: 모든 결과 페이지에 ShareButtons 포함
7. **다시 테스트**: 결과 페이지에 "다시 테스트" 버튼
8. **관련 퀴즈**: 결과 페이지 하단에 다른 퀴즈 추천

---

## 📚 참고 예시

- **간단한 퀴즈**: `coffee-mbti` (인라인 질문)
- **복잡한 퀴즈**: `spending-style` (외부 데이터 파일)
- **최신 퀴즈**: `chicken-style` (최신 패턴)

---

## 🔗 관련 파일

- `hooks/use-test-result.ts` - 결과 저장 훅
- `lib/utils/test-answers.ts` - 답변 변환 유틸
- `lib/analytics.ts` - 분석 추적
- `components/share-buttons.tsx` - 공유 컴포넌트
- `lib/api-client.ts` - API 클라이언트

---

이 가이드를 따라 새로운 퀴즈를 개발하면 일관된 구조와 패턴을 유지할 수 있습니다! 🚀

