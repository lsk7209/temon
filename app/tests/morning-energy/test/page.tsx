"use client"

/**
 * Component: MorningEnergyTest
 * 아침 에너지 테스트 페이지
 * @example <MorningEnergyTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "아침에 피곤할 때",
    a1: { text: "에너지를 충전하기 위해 무언가를 한다", tags: ["E", "T"] },
    a2: { text: "그냥 쉰다", tags: ["I", "F"] },
  },
  {
    id: 2,
    q: "아침에 에너지가 넘칠 때",
    a1: { text: "바로 할 일을 시작한다", tags: ["T", "J"] },
    a2: { text: "여유롭게 즐긴다", tags: ["F", "P"] },
  },
  {
    id: 3,
    q: "아침에 에너지를 관리할 때",
    a1: { text: "정해진 방법으로 관리한다", tags: ["S", "J"] },
    a2: { text: "그때그때 다르게 관리한다", tags: ["N", "P"] },
  },
  {
    id: 4,
    q: "아침에 에너지를 충전할 때",
    a1: { text: "운동이나 활동을 한다", tags: ["E", "T"] },
    a2: { text: "휴식이나 명상을 한다", tags: ["I", "F"] },
  },
  {
    id: 5,
    q: "아침에 에너지를 사용할 때",
    a1: { text: "효율적으로 사용한다", tags: ["T", "J"] },
    a2: { text: "여유롭게 사용한다", tags: ["F", "P"] },
  },
  {
    id: 6,
    q: "아침에 에너지를 관리하는 이유",
    a1: { text: "효율성과 생산성을 위해", tags: ["T", "S"] },
    a2: { text: "기분과 컨디션을 위해", tags: ["F", "N"] },
  },
  {
    id: 7,
    q: "아침에 에너지가 부족할 때",
    a1: { text: "참고 견딘다", tags: ["T", "J"] },
    a2: { text: "휴식을 취한다", tags: ["F", "P"] },
  },
  {
    id: 8,
    q: "아침에 에너지를 관리하는 시간",
    a1: { text: "정해진 시간에 관리한다", tags: ["J", "S"] },
    a2: { text: "그때그때 관리한다", tags: ["P", "N"] },
  },
  {
    id: 9,
    q: "아침에 에너지를 관리하는 방식",
    a1: { text: "같은 방법을 반복한다", tags: ["S", "I"] },
    a2: { text: "다양한 방법을 시도한다", tags: ["N", "E"] },
  },
  {
    id: 10,
    q: "아침에 에너지를 관리하고 나서",
    a1: { text: "즉시 할 일을 시작한다", tags: ["E", "J"] },
    a2: { text: "잠시 더 여유롭게 즐긴다", tags: ["I", "P"] },
  },
  {
    id: 11,
    q: "아침에 에너지를 관리하는 환경",
    a1: { text: "조용하고 집중할 수 있는 곳", tags: ["I", "S"] },
    a2: { text: "활기차고 사람들이 있는 곳", tags: ["E", "N"] },
  },
  {
    id: 12,
    q: "아침에 에너지를 관리하는 기준",
    a1: { text: "목표와 계획을 위해", tags: ["T", "J"] },
    a2: { text: "기분과 컨디션을 위해", tags: ["F", "P"] },
  },
]

export default function MorningEnergyTest() {
  const quizLogic = useQuizLogic({
    testId: "morning-energy",
    questions,
    resultPath: "/tests/morning-energy/test/result",
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
      colorClasses={getQuizColorScheme("yellow-orange")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
