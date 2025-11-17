"use client"

/**
 * Component: CookingMultitaskTest
 * 요리 멀티태스킹 테스트 페이지
 * @example <CookingMultitaskTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "요리하면서 다른 일을 할 때",
    a1: { text: "여러 일을 동시에 하는 게 효율적이다", tags: ["E", "P"] },
    a2: { text: "요리에만 집중하는 게 좋다", tags: ["I", "J"] },
  },
  {
    id: 2,
    q: "요리 중 다른 일 계획",
    a1: { text: "미리 계획해서 동시에 처리한다", tags: ["J", "T"] },
    a2: { text: "그때그때 필요하면 한다", tags: ["P", "F"] },
  },
  {
    id: 3,
    q: "요리 중 전화나 메시지",
    a1: { text: "즉시 받고 대화한다", tags: ["E", "P"] },
    a2: { text: "요리가 끝난 후 확인한다", tags: ["I", "J"] },
  },
  {
    id: 4,
    q: "요리 중 청소나 정리",
    a1: { text: "요리하면서 동시에 정리한다", tags: ["E", "J"] },
    a2: { text: "요리 후에 정리한다", tags: ["I", "P"] },
  },
  {
    id: 5,
    q: "요리 중 TV나 음악",
    a1: { text: "TV를 보거나 음악을 들으며 요리한다", tags: ["E", "P"] },
    a2: { text: "조용히 집중해서 요리한다", tags: ["I", "J"] },
  },
  {
    id: 6,
    q: "요리 중 다른 요리 준비",
    a1: { text: "여러 요리를 동시에 준비한다", tags: ["E", "N"] },
    a2: { text: "하나씩 순서대로 준비한다", tags: ["I", "S"] },
  },
  {
    id: 7,
    q: "요리 중 실수",
    a1: { text: "빠르게 수정하고 계속 진행한다", tags: ["E", "P"] },
    a2: { text: "신중하게 확인하고 진행한다", tags: ["I", "J"] },
  },
  {
    id: 8,
    q: "요리 중 대화",
    a1: { text: "다른 사람과 대화하며 요리한다", tags: ["E", "F"] },
    a2: { text: "조용히 혼자 요리한다", tags: ["I", "T"] },
  },
  {
    id: 9,
    q: "요리 중 시간 관리",
    a1: { text: "여러 일을 하면서 시간을 효율적으로 쓴다", tags: ["J", "T"] },
    a2: { text: "자연스럽게 흘러가게 둔다", tags: ["P", "F"] },
  },
  {
    id: 10,
    q: "요리 중 집중도",
    a1: { text: "여러 일을 해도 집중할 수 있다", tags: ["E", "N"] },
    a2: { text: "한 가지에 집중해야 한다", tags: ["I", "S"] },
  },
  {
    id: 11,
    q: "요리 중 스트레스",
    a1: { text: "여러 일을 하면서도 즐겁다", tags: ["E", "P"] },
    a2: { text: "여러 일을 하면 스트레스다", tags: ["I", "J"] },
  },
  {
    id: 12,
    q: "요리 멀티태스킹 스타일",
    a1: { text: "자유롭게 여러 일을 동시에 한다", tags: ["P", "E"] },
    a2: { text: "계획적으로 순서를 정해 처리한다", tags: ["J", "I"] },
  },
]

export default function CookingMultitaskTest() {
  const quizLogic = useQuizLogic({
    testId: "cooking-multitask",
    questions,
    resultPath: "/tests/cooking-multitask/test/result",
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
      colorClasses={getQuizColorScheme("cyan-blue-indigo")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
