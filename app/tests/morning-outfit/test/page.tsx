"use client"

/**
 * Component: MorningOutfitTest
 * 아침 옷 고르기 테스트 페이지
 * @example <MorningOutfitTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "아침에 옷을 고를 때",
    a1: { text: "미리 정해둔 옷으로 바로 입는다", tags: ["J", "S"] },
    a2: { text: "그때그때 기분에 따라 고른다", tags: ["P", "N"] },
  },
  {
    id: 2,
    q: "옷이 다 빨래통에 있을 때",
    a1: { text: "빨래를 먼저 하고 깨끗한 옷을 입는다", tags: ["J", "T"] },
    a2: { text: "다른 옷을 찾거나 임시로 입는다", tags: ["P", "F"] },
  },
  {
    id: 3,
    q: "옷을 입고 나서 마음에 안 들 때",
    a1: { text: "바로 갈아입고 더 나은 옷을 찾는다", tags: ["T", "J"] },
    a2: { text: "그냥 입고 간다", tags: ["F", "P"] },
  },
  {
    id: 4,
    q: "옷을 조합할 때",
    a1: { text: "정해진 조합으로 체계적으로 입는다", tags: ["S", "J"] },
    a2: { text: "그때그때 다르게 실험한다", tags: ["N", "P"] },
  },
  {
    id: 5,
    q: "옷을 고르는 시간이 부족할 때",
    a1: { text: "빠르게 기본 옷으로 입는다", tags: ["T", "J"] },
    a2: { text: "시간을 내서 고른다", tags: ["F", "P"] },
  },
  {
    id: 6,
    q: "옷을 고를 때 기준",
    a1: { text: "편안함과 실용성을 우선한다", tags: ["S", "T"] },
    a2: { text: "스타일과 멋을 우선한다", tags: ["N", "F"] },
  },
  {
    id: 7,
    q: "새로운 옷을 살 때",
    a1: { text: "신중하게 계획하고 구매한다", tags: ["S", "J"] },
    a2: { text: "즉흥적으로 구매한다", tags: ["N", "P"] },
  },
  {
    id: 8,
    q: "옷을 고를 때 날씨를 고려할 때",
    a1: { text: "날씨에 맞춰 실용적으로 고른다", tags: ["S", "T"] },
    a2: { text: "스타일을 우선하고 날씨는 차순위다", tags: ["N", "F"] },
  },
  {
    id: 9,
    q: "옷을 입고 나서 확인할 때",
    a1: { text: "거울을 보며 꼼꼼히 체크한다", tags: ["F", "I"] },
    a2: { text: "빠르게 확인하고 나간다", tags: ["T", "E"] },
  },
  {
    id: 10,
    q: "옷을 고르는 방식",
    a1: { text: "같은 스타일을 반복한다", tags: ["S", "I"] },
    a2: { text: "다양한 스타일을 시도한다", tags: ["N", "E"] },
  },
  {
    id: 11,
    q: "옷을 고를 때 사람들의 반응을 생각할 때",
    a1: { text: "사람들의 반응을 중시한다", tags: ["F", "E"] },
    a2: { text: "자신의 취향을 우선한다", tags: ["T", "I"] },
  },
  {
    id: 12,
    q: "옷을 고르는 이유",
    a1: { text: "필요와 실용성을 위해", tags: ["T", "S"] },
    a2: { text: "기분과 자기표현을 위해", tags: ["F", "N"] },
  },
]

export default function MorningOutfitTest() {
  const quizLogic = useQuizLogic({
    testId: "morning-outfit",
    questions,
    resultPath: "/tests/morning-outfit/test/result",
  })

  return (
    <QuizContainer
      currentQuestion={quizLogic.currentQuestion}
      currentQ={quizLogic.currentQ}
      selectedChoice={quizLogic.selectedChoice}
      isProcessing={quizLogic.isProcessing}
      isSaving={quizLogic.isSaving}
      progress={quizLogic.progress}
      questionsLength={quizLogic.questionsLength}
      colorClasses={getQuizColorScheme("pink-purple")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
