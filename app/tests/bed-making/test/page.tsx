"use client"

/**
 * Component: BedMakingTest
 * 침대 정리 테스트 페이지
 * @example <BedMakingTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "아침에 일어나서 침대가 엉망인데 출근 시간이 10분 남았을 때",
    a1: { text: "매일 정리하는 습관이라 빠르게 정리한다", tags: ["J"] },
    a2: { text: "가끔 정리하니까 그냥 나간다", tags: ["P"] },
  },
  {
    id: 2,
    q: "침대를 정리하다가 베개가 3개나 있는데 어떻게 배치할지 고민될 때",
    a1: { text: "정돈된 배치로 체계적으로 정리한다", tags: ["J"] },
    a2: { text: "자연스럽게 편한 대로 둔다", tags: ["P"] },
  },
  {
    id: 3,
    q: "침대를 정리할 때 이불부터 정리할지 베개부터 정리할지 고민될 때",
    a1: { text: "정해진 순서대로 체계적으로 정리한다", tags: ["J"] },
    a2: { text: "그때그때 편한 대로 정리한다", tags: ["P"] },
  },
  {
    id: 4,
    q: "침대를 정리하다가 이불이 완벽하게 펴지지 않을 때",
    a1: { text: "완벽하게 꼼꼼하게 다시 정리한다", tags: ["F"] },
    a2: { text: "적당히 실용적으로 그만둔다", tags: ["T"] },
  },
  {
    id: 5,
    q: "침대를 정리할 시간을 정해야 할 때",
    a1: { text: "아침에 일찍 정리하는 시간을 정한다", tags: ["J"] },
    a2: { text: "저녁에 그때그때 정리한다", tags: ["P"] },
  },
  {
    id: 6,
    q: "친구가 '왜 침대를 정리해?'라고 물어볼 때",
    a1: { text: "습관이고 루틴이라서 정리한다고 말한다", tags: ["J"] },
    a2: { text: "필요할 때 그때그때 정리한다고 말한다", tags: ["P"] },
  },
  {
    id: 7,
    q: "침대를 정리할 때 가족이나 룸메이트가 함께 있을 때",
    a1: { text: "혼자 조용히 정리한다", tags: ["I"] },
    a2: { text: "사람들과 함께 정리한다", tags: ["E"] },
  },
  {
    id: 8,
    q: "침대 정리 방법을 선택할 때",
    a1: { text: "실용적이고 효율적인 방법을 선택한다", tags: ["S"] },
    a2: { text: "의미 있고 특별한 방법을 선택한다", tags: ["N"] },
  },
  {
    id: 9,
    q: "침대 정리 계획을 세울 때",
    a1: { text: "미리 계획하고 목표를 정한다", tags: ["J"] },
    a2: { text: "즉흥적으로 그때그때 정리한다", tags: ["P"] },
  },
  {
    id: 10,
    q: "침대를 정리하고 나서 기분이 좋을 때",
    a1: { text: "즐거움과 기쁨을 느낀다", tags: ["E"] },
    a2: { text: "평온하고 차분한 기분을 느낀다", tags: ["I"] },
  },
  {
    id: 11,
    q: "침대를 정리하는 이유를 생각할 때",
    a1: { text: "감성적이고 의미 있는 이유로 정리한다", tags: ["F"] },
    a2: { text: "효율적이고 실용적인 이유로 정리한다", tags: ["T"] },
  },
  {
    id: 12,
    q: "침대를 정리하고 나서 친구에게 후기를 공유하고 싶을 때",
    a1: { text: "즉시 후기를 공유하고 경험을 나눈다", tags: ["E"] },
    a2: { text: "조용히 혼자만 즐긴다", tags: ["I"] },
  },
]

export default function BedMakingTest() {
  const quizLogic = useQuizLogic({
    testId: "bed-making",
    questions,
    resultPath: "/tests/bed-making/test/result",
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
      colorClasses={getQuizColorScheme("blue-indigo")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
