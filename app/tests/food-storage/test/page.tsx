"use client"

/**
 * Component: FoodStorageTest
 * 음식 보관 테스트 페이지
 * @example <FoodStorageTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "냉장고를 정리할 때 정리 빈도를 생각할 때",
    a1: { text: "정기적으로 체계적으로 정리한다", tags: ["J"] },
    a2: { text: "필요할 때만 자유롭게 정리한다", tags: ["P"] },
  },
  {
    id: 2,
    q: "음식을 냉장고에 보관할 때 보관 방식을 정할 때",
    a1: { text: "카테고리별로 체계적으로 보관한다", tags: ["S"] },
    a2: { text: "사용 빈도에 따라 직관적으로 보관한다", tags: ["N"] },
  },
  {
    id: 3,
    q: "음식을 냉장고에 보관할 때 용기를 사용할지 고민될 때",
    a1: { text: "용기를 사용해서 정리 정돈한다", tags: ["J"] },
    a2: { text: "그대로 자연스럽게 보관한다", tags: ["P"] },
  },
  {
    id: 4,
    q: "냉장고에 음식을 보관할 때 유통기한을 확인할 때",
    a1: { text: "정확히 확인하고 관리한다", tags: ["T"] },
    a2: { text: "대략적으로 느낌으로 확인한다", tags: ["F"] },
  },
  {
    id: 5,
    q: "냉장고 보관 공간을 활용할 때",
    a1: { text: "최대한 활용해서 효율적으로 보관한다", tags: ["T"] },
    a2: { text: "여유롭게 편하게 보관한다", tags: ["F"] },
  },
  {
    id: 6,
    q: "냉장고를 정리할 시간을 정할 때",
    a1: { text: "계획된 시간에 정리한다", tags: ["J"] },
    a2: { text: "그때그때 즉흥적으로 정리한다", tags: ["P"] },
  },
  {
    id: 7,
    q: "냉장고를 정리할 때 정리 방식을 선택할 때",
    a1: { text: "모든 것을 꺼내서 정리한다", tags: ["E"] },
    a2: { text: "조용히 하나씩 정리한다", tags: ["I"] },
  },
  {
    id: 8,
    q: "음식을 냉장고에 보관할 때 보관 기준을 정할 때",
    a1: { text: "실용성과 효율성을 기준으로 보관한다", tags: ["T"] },
    a2: { text: "감성과 보기 좋음을 기준으로 보관한다", tags: ["F"] },
  },
  {
    id: 9,
    q: "냉장고를 정리하고 나서 기분이 좋을 때",
    a1: { text: "만족감과 성취감을 느낀다", tags: ["E"] },
    a2: { text: "평온함과 차분함을 느낀다", tags: ["I"] },
  },
  {
    id: 10,
    q: "음식을 냉장고에 보관하기 전에 계획을 세울 때",
    a1: { text: "미리 계획하고 보관한다", tags: ["J"] },
    a2: { text: "그때그때 유연하게 보관한다", tags: ["P"] },
  },
  {
    id: 11,
    q: "냉장고를 확인할 때 확인 방식을 선택할 때",
    a1: { text: "정기적으로 확인한다", tags: ["S"] },
    a2: { text: "필요할 때만 확인한다", tags: ["N"] },
  },
  {
    id: 12,
    q: "냉장고 보관 정보를 친구에게 공유하고 싶을 때",
    a1: { text: "즉시 다른 사람과 공유한다", tags: ["E"] },
    a2: { text: "혼자만 관리한다", tags: ["I"] },
  },
]

export default function FoodStorageTest() {
  const quizLogic = useQuizLogic({
    testId: "food-storage",
    questions,
    resultPath: "/tests/food-storage/test/result",
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
      colorClasses={getQuizColorScheme("cyan-blue")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
