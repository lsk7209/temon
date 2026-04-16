"use client"

/**
 * Component: MorningRushTest
 * 아침 바쁨 테스트 페이지
 * @example <MorningRushTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "아침에 늦었을 때",
    a1: { text: "빠르게 준비하고 나간다", tags: ["T", "J"] },
    a2: { text: "여유롭게 준비한다", tags: ["F", "P"] },
  },
  {
    id: 2,
    q: "준비할 시간이 부족할 때",
    a1: { text: "필수적인 것만 준비한다", tags: ["T", "J"] },
    a2: { text: "모든 것을 준비한다", tags: ["F", "P"] },
  },
  {
    id: 3,
    q: "아침에 바쁠 때",
    a1: { text: "계획을 세우고 체계적으로 한다", tags: ["J", "S"] },
    a2: { text: "즉흥적으로 대처한다", tags: ["P", "N"] },
  },
  {
    id: 4,
    q: "아침에 스트레스를 받을 때",
    a1: { text: "참고 견딘다", tags: ["T", "J"] },
    a2: { text: "휴식을 취한다", tags: ["F", "P"] },
  },
  {
    id: 5,
    q: "아침에 시간이 부족할 때",
    a1: { text: "효율적으로 처리한다", tags: ["T", "J"] },
    a2: { text: "여유롭게 처리한다", tags: ["F", "P"] },
  },
  {
    id: 6,
    q: "아침에 바쁠 때 대처 방식",
    a1: { text: "계획과 실행을 중시한다", tags: ["T", "J"] },
    a2: { text: "유연성과 적응을 중시한다", tags: ["F", "P"] },
  },
  {
    id: 7,
    q: "아침에 여러 일을 동시에 해야 할 때",
    a1: { text: "우선순위를 정하고 하나씩 한다", tags: ["J", "S"] },
    a2: { text: "여러 일을 동시에 한다", tags: ["P", "N"] },
  },
  {
    id: 8,
    q: "아침에 예상치 못한 일이 생겼을 때",
    a1: { text: "계획을 수정하고 대처한다", tags: ["J", "S"] },
    a2: { text: "즉흥적으로 대처한다", tags: ["P", "N"] },
  },
  {
    id: 9,
    q: "아침에 바쁠 때 사람들과 소통할 때",
    a1: { text: "빠르게 효율적으로 소통한다", tags: ["E", "T"] },
    a2: { text: "여유롭게 소통한다", tags: ["I", "F"] },
  },
  {
    id: 10,
    q: "아침에 바쁠 때 마음을 정리할 때",
    a1: { text: "즉시 할 일을 시작한다", tags: ["E", "J"] },
    a2: { text: "잠시 더 여유롭게 준비한다", tags: ["I", "P"] },
  },
  {
    id: 11,
    q: "아침에 바쁠 때 대처하는 이유",
    a1: { text: "효율성과 생산성을 위해", tags: ["T", "S"] },
    a2: { text: "기분과 컨디션을 위해", tags: ["F", "N"] },
  },
  {
    id: 12,
    q: "아침에 바쁠 때 대처하는 환경",
    a1: { text: "조용하고 집중할 수 있는 곳", tags: ["I", "S"] },
    a2: { text: "활기차고 사람들이 있는 곳", tags: ["E", "N"] },
  },
]

export default function MorningRushTest() {
  const quizLogic = useQuizLogic({
    testId: "morning-rush",
    questions,
    resultPath: "/tests/morning-rush/test/result",
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
      colorClasses={getQuizColorScheme("red-pink")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
