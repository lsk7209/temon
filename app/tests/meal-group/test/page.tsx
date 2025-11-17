"use client"

/**
 * Component: MealGroupTest
 * 단체 식사 테스트 페이지
 * @example <MealGroupTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "단체 식사하다가 메뉴를 고르기 어려울 때",
    a1: { text: "즉흥적으로 선택한다", tags: ["E", "P"] },
    a2: { text: "리뷰를 확인하고 신중하게 선택한다", tags: ["I", "J"] },
  },
  {
    id: 2,
    q: "단체 식사하다가 음식이 너무 많아서 다 못 먹을 때",
    a1: { text: "포장해서 가져간다", tags: ["J", "S"] },
    a2: { text: "그냥 남긴다", tags: ["P", "N"] },
  },
  {
    id: 3,
    q: "단체 식사하다가 친구들이 시끄러울 때",
    a1: { text: "신경 쓰지 않고 먹는다", tags: ["E", "P"] },
    a2: { text: "조용한 곳으로 이동한다", tags: ["I", "J"] },
  },
  {
    id: 4,
    q: "단체 식사하다가 음식이 맛없을 때",
    a1: { text: "직원에게 말하거나 반응한다", tags: ["E", "F"] },
    a2: { text: "조용히 먹고 나간다", tags: ["I", "T"] },
  },
  {
    id: 5,
    q: "단체 식사하다가 계산할 때",
    a1: { text: "빨리 계산하고 나간다", tags: ["E", "P"] },
    a2: { text: "여유롭게 계산하고 나간다", tags: ["I", "J"] },
  },
  {
    id: 6,
    q: "단체 식사하다가 새로운 메뉴를 발견했을 때",
    a1: { text: "즉시 시도해본다", tags: ["E", "N"] },
    a2: { text: "리뷰를 확인하고 신중하게 선택한다", tags: ["I", "S"] },
  },
  {
    id: 7,
    q: "단체 식사하다가 음식이 너무 뜨거울 때",
    a1: { text: "바로 먹으려고 시도한다", tags: ["E", "P"] },
    a2: { text: "식을 때까지 기다린다", tags: ["I", "J"] },
  },
  {
    id: 8,
    q: "단체 식사하다가 음식이 너무 매울 때",
    a1: { text: "물을 많이 마시거나 반응한다", tags: ["E", "F"] },
    a2: { text: "조용히 참고 먹는다", tags: ["I", "T"] },
  },
  {
    id: 9,
    q: "단체 식사하다가 음식이 너무 짤 때",
    a1: { text: "물을 많이 마시거나 반응한다", tags: ["E", "F"] },
    a2: { text: "조용히 참고 먹는다", tags: ["I", "T"] },
  },
  {
    id: 10,
    q: "단체 식사하다가 음식이 너무 달 때",
    a1: { text: "반응하거나 물을 마신다", tags: ["E", "F"] },
    a2: { text: "조용히 먹는다", tags: ["I", "T"] },
  },
  {
    id: 11,
    q: "단체 식사하다가 핸드폰이 울렸을 때",
    a1: { text: "바로 받고 먹는다", tags: ["E", "F"] },
    a2: { text: "식사가 끝날 때까지 무시한다", tags: ["I", "T"] },
  },
  {
    id: 12,
    q: "단체 식사하다가 혼자 먹는 게 부끄러울 때",
    a1: { text: "신경 쓰지 않고 먹는다", tags: ["E", "F"] },
    a2: { text: "조용한 곳을 선택한다", tags: ["I", "T"] },
  },
]

export default function MealGroupTest() {
  const quizLogic = useQuizLogic({
    testId: "meal-group",
    questions,
    resultPath: "/tests/meal-group/test/result",
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
      colorClasses={getQuizColorScheme("violet-purple-fuchsia")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
