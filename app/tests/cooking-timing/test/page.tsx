"use client"

/**
 * Component: CookingTimingTest
 * 요리 시간 테스트 페이지
 * @example <CookingTimingTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "요리 시간을 정할 때",
    a1: { text: "정해진 시간에 요리한다", tags: ["J", "S"] },
    a2: { text: "기분이나 상황에 따라 요리한다", tags: ["P", "N"] },
  },
  {
    id: 2,
    q: "요리 타이머 사용",
    a1: { text: "타이머를 사용해서 정확히 시간을 맞춘다", tags: ["J", "T"] },
    a2: { text: "느낌으로 시간을 판단한다", tags: ["P", "F"] },
  },
  {
    id: 3,
    q: "요리 시간이 부족할 때",
    a1: { text: "시간에 맞춰 빠르게 요리한다", tags: ["J", "T"] },
    a2: { text: "시간을 조정하거나 다른 요리를 선택한다", tags: ["P", "F"] },
  },
  {
    id: 4,
    q: "요리 시간 계획",
    a1: { text: "미리 시간을 계산하고 계획한다", tags: ["J", "S"] },
    a2: { text: "그때그때 시간을 확인한다", tags: ["P", "N"] },
  },
  {
    id: 5,
    q: "요리 시간 공유",
    a1: { text: "다른 사람과 함께 시간을 맞춰 요리한다", tags: ["E", "F"] },
    a2: { text: "혼자 시간을 관리하며 요리한다", tags: ["I", "T"] },
  },
  {
    id: 6,
    q: "요리 시간 패턴",
    a1: { text: "같은 시간에 요리하는 게 편하다", tags: ["S", "J"] },
    a2: { text: "다양한 시간에 요리하는 게 좋다", tags: ["N", "P"] },
  },
  {
    id: 7,
    q: "요리 시간 실수",
    a1: { text: "시간을 정확히 확인하고 다시 시작한다", tags: ["J", "S"] },
    a2: { text: "대략적으로 시간을 맞춘다", tags: ["P", "N"] },
  },
  {
    id: 8,
    q: "요리 시간 기록",
    a1: { text: "요리 시간을 기록하고 관리한다", tags: ["J", "T"] },
    a2: { text: "시간을 기록하지 않는다", tags: ["P", "F"] },
  },
  {
    id: 9,
    q: "요리 시간 준비",
    a1: { text: "미리 시간을 확인하고 준비한다", tags: ["J", "S"] },
    a2: { text: "그때그때 시간을 확인한다", tags: ["P", "N"] },
  },
  {
    id: 10,
    q: "요리 시간 완성도",
    a1: { text: "정확한 시간에 완성하는 게 중요하다", tags: ["J", "T"] },
    a2: { text: "시간보다 맛이 중요하다", tags: ["P", "F"] },
  },
  {
    id: 11,
    q: "요리 시간 스트레스",
    a1: { text: "시간에 맞춰 요리하는 게 스트레스다", tags: ["P", "F"] },
    a2: { text: "시간을 관리하는 게 편하다", tags: ["J", "T"] },
  },
  {
    id: 12,
    q: "요리 타이밍 스타일",
    a1: { text: "계획적이고 체계적으로 시간을 관리한다", tags: ["J", "T"] },
    a2: { text: "유연하고 자유롭게 시간을 관리한다", tags: ["P", "F"] },
  },
]

export default function CookingTimingTest() {
  const quizLogic = useQuizLogic({
    testId: "cooking-timing",
    questions,
    resultPath: "/tests/cooking-timing/test/result",
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
      colorClasses={getQuizColorScheme("orange-amber-yellow")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
