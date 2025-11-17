"use client"

/**
 * Component: FoodReheatingTest
 * 음식 데우기 테스트 페이지
 * @example <FoodReheatingTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "남은 음식을 데울 때 '전자레인지'와 '가스레인지' 중 선택할 때",
    a1: { text: "전자레인지를 사용해서 빠르게 데운다", tags: ["T"] },
    a2: { text: "가스레인지를 사용해서 맛을 중시하며 데운다", tags: ["F"] },
  },
  {
    id: 2,
    q: "전자레인지로 음식을 데울 때 시간을 설정할 때",
    a1: { text: "정확히 측정하고 시간을 설정한다", tags: ["J"] },
    a2: { text: "대략적으로 감으로 시간을 설정한다", tags: ["P"] },
  },
  {
    id: 3,
    q: "음식을 데울 때 한 번에 다 데울지 여러 번 나눠서 데울지 고민될 때",
    a1: { text: "한 번에 완벽하게 데운다", tags: ["J"] },
    a2: { text: "여러 번 나눠서 데운다", tags: ["P"] },
  },
  {
    id: 4,
    q: "음식을 데우기 전에 준비할 때",
    a1: { text: "미리 준비하고 계획해서 데운다", tags: ["J"] },
    a2: { text: "바로 데우고 즉흥적으로 데운다", tags: ["P"] },
  },
  {
    id: 5,
    q: "음식을 데우고 나서 먹기 전에 확인할 때",
    a1: { text: "확인한 후 신중하게 먹는다", tags: ["I"] },
    a2: { text: "바로 즉시 먹는다", tags: ["E"] },
  },
  {
    id: 6,
    q: "친구가 '왜 그렇게 데워?'라고 물어볼 때",
    a1: { text: "효율성과 시간 절약을 위해 데웠다고 말한다", tags: ["T"] },
    a2: { text: "맛과 감성을 위해 데웠다고 말한다", tags: ["F"] },
  },
  {
    id: 7,
    q: "음식을 데울 때 방법을 선택할 때",
    a1: { text: "익숙한 방법으로 기본적으로 데운다", tags: ["S"] },
    a2: { text: "새로운 방법으로 실험적으로 데운다", tags: ["N"] },
  },
  {
    id: 8,
    q: "음식을 데울 때 친구가 와서 '나도 데우고 싶어!'라고 할 때",
    a1: { text: "즉시 함께 데운다", tags: ["E"] },
    a2: { text: "혼자만 데운다", tags: ["I"] },
  },
  {
    id: 9,
    q: "음식을 데울 때 온도를 설정할 때",
    a1: { text: "정확한 온도를 설정해서 데운다", tags: ["S"] },
    a2: { text: "대략적으로 느낌으로 데운다", tags: ["N"] },
  },
  {
    id: 10,
    q: "음식을 데우기 전에 계획을 세울 때",
    a1: { text: "미리 계획하고 데운다", tags: ["J"] },
    a2: { text: "그때그때 즉흥적으로 데운다", tags: ["P"] },
  },
  {
    id: 11,
    q: "음식을 데우고 나서 기분이 좋을 때",
    a1: { text: "만족감과 성취감을 느낀다", tags: ["E"] },
    a2: { text: "평온함과 차분함을 느낀다", tags: ["I"] },
  },
  {
    id: 12,
    q: "음식을 데울 때 선택 기준을 생각할 때",
    a1: { text: "실용성과 효율성을 기준으로 데운다", tags: ["T"] },
    a2: { text: "감성과 맛을 기준으로 데운다", tags: ["F"] },
  },
]

export default function FoodReheatingTest() {
  const quizLogic = useQuizLogic({
    testId: "food-reheating",
    questions,
    resultPath: "/tests/food-reheating/test/result",
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
      colorClasses={getQuizColorScheme("orange-red")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
