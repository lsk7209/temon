"use client"

/**
 * Component: RamenMBTITest
 * 라면 MBTI 테스트 페이지
 * @example <RamenMBTITest />
 */

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "라면을 끓일 때 물의 양은?",
    a1: { text: "정확히 측정해서 넣는다", tags: ["J"] },
    a2: { text: "대충 눈대중으로 넣는다", tags: ["P"] },
  },
  {
    id: 2,
    q: "라면 스프는 언제 넣나요?",
    a1: { text: "물이 끓기 시작할 때 바로", tags: ["E"] },
    a2: { text: "면이 어느 정도 익었을 때", tags: ["I"] },
  },
  {
    id: 3,
    q: "라면에 추가 재료를 넣는다면?",
    a1: { text: "계란, 파 등 기본적인 재료", tags: ["S"] },
    a2: { text: "치즈, 김치 등 특별한 재료", tags: ["N"] },
  },
  {
    id: 4,
    q: "면의 익힘 정도는?",
    a1: { text: "꼬들꼬들하게 덜 익혀서", tags: ["T"] },
    a2: { text: "부드럽게 충분히 익혀서", tags: ["F"] },
  },
  {
    id: 5,
    q: "라면을 끓이는 동안 뭘 하나요?",
    a1: { text: "타이머 맞춰두고 다른 일", tags: ["J"] },
    a2: { text: "계속 지켜보면서 조절", tags: ["P"] },
  },
  {
    id: 6,
    q: "라면은 어디서 먹나요?",
    a1: { text: "식탁에서 정식으로", tags: ["E"] },
    a2: { text: "방에서 혼자 조용히", tags: ["I"] },
  },
  {
    id: 7,
    q: "새로운 라면 제품을 고를 때",
    a1: { text: "익숙한 브랜드 위주로", tags: ["S"] },
    a2: { text: "새로운 맛에 도전", tags: ["N"] },
  },
  {
    id: 8,
    q: "라면을 다 먹고 난 후",
    a1: { text: "그릇을 바로 설거지", tags: ["T"] },
    a2: { text: "잠시 쉬었다가 나중에", tags: ["F"] },
  },
  {
    id: 9,
    q: "라면 요리법을 정할 때",
    a1: { text: "미리 계획하고 준비", tags: ["J"] },
    a2: { text: "그때그때 즉흥적으로", tags: ["P"] },
  },
  {
    id: 10,
    q: "라면을 먹는 이유는?",
    a1: { text: "간편하고 빠르게 해결", tags: ["E"] },
    a2: { text: "혼자만의 시간을 즐기며", tags: ["I"] },
  },
  {
    id: 11,
    q: "라면 맛을 평가할 때",
    a1: { text: "맛, 면발 등 구체적으로", tags: ["S"] },
    a2: { text: "전체적인 느낌으로", tags: ["N"] },
  },
  {
    id: 12,
    q: "좋아하는 라면을 못 먹게 되면",
    a1: { text: "다른 대안을 찾는다", tags: ["T"] },
    a2: { text: "아쉬워하며 포기한다", tags: ["F"] },
  },
]

export default function RamenMBTITest() {
  const [isStarted, setIsStarted] = useState(false)
  const quizLogic = useQuizLogic({
    testId: "ramen-mbti",
    questions,
    resultPath: "/ramen-mbti/test/result",
  })

  if (!isStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="text-6xl mb-4">🍜</div>
            <CardTitle className="text-2xl">라면 MBTI 테스트</CardTitle>
            <CardDescription>당신의 라면 취향으로 알아보는 성격 유형</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground mb-6">12개의 질문을 통해 당신의 라면 성향을 분석합니다</p>
            <Button onClick={() => setIsStarted(true)} className="w-full">
              테스트 시작하기
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <QuizContainer
      currentQuestion={quizLogic.currentQuestion}
      currentQ={quizLogic.currentQ}
      selectedChoice={quizLogic.selectedChoice}
      isProcessing={quizLogic.isProcessing}
      isSaving={quizLogic.isSaving}
      progress={quizLogic.progress}
      questionsLength={quizLogic.questionsLength}
      colorClasses={getQuizColorScheme("orange-red")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
