"use client"

/**
 * Component: FoodOrderingTest
 * 음식 주문 테스트 페이지
 * @example <FoodOrderingTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "식당에서 주문할 때 '앱으로 주문'과 '직접 주문' 중 선택할 때",
    a1: { text: "앱 주문으로 편리하게 주문한다", tags: ["T"] },
    a2: { text: "직접 주문으로 소통하며 주문한다", tags: ["F"] },
  },
  {
    id: 2,
    q: "주문하기 전에 메뉴를 정할 때",
    a1: { text: "미리 준비하고 계획해서 주문한다", tags: ["J"] },
    a2: { text: "그때그때 즉흥적으로 주문한다", tags: ["P"] },
  },
  {
    id: 3,
    q: "메뉴판을 보다가 주문할 메뉴를 선택할 때",
    a1: { text: "신중하게 고민한 후 주문한다", tags: ["I"] },
    a2: { text: "즉시 결정하고 주문한다", tags: ["E"] },
  },
  {
    id: 4,
    q: "친구가 '왜 그렇게 주문해?'라고 물어볼 때",
    a1: { text: "편의성과 효율성 때문에 주문했다고 말한다", tags: ["T"] },
    a2: { text: "소통과 감성 때문에 주문했다고 말한다", tags: ["F"] },
  },
  {
    id: 5,
    q: "주문할 때 친구가 와서 '나도 같이 주문하고 싶어!'라고 할 때",
    a1: { text: "즉시 함께 주문한다", tags: ["E"] },
    a2: { text: "혼자만 주문한다", tags: ["I"] },
  },
  {
    id: 6,
    q: "주문할 때 메뉴를 선택하는 기준을 정할 때",
    a1: { text: "효율성과 실용성을 기준으로 선택한다", tags: ["T"] },
    a2: { text: "감성과 분위기를 기준으로 선택한다", tags: ["F"] },
  },
  {
    id: 7,
    q: "주문 방법을 선택할 때",
    a1: { text: "익숙한 방법으로 기본적으로 주문한다", tags: ["S"] },
    a2: { text: "새로운 방법으로 실험적으로 주문한다", tags: ["N"] },
  },
  {
    id: 8,
    q: "주문할 때 시간이 부족할 때",
    a1: { text: "여유롭게 천천히 주문한다", tags: ["F"] },
    a2: { text: "빠르게 효율적으로 주문한다", tags: ["T"] },
  },
  {
    id: 9,
    q: "주문을 완료하고 나서 기분이 좋을 때",
    a1: { text: "만족감과 성취감을 느낀다", tags: ["E"] },
    a2: { text: "평온함과 차분함을 느낀다", tags: ["I"] },
  },
  {
    id: 10,
    q: "주문하기 전에 계획을 세울 때",
    a1: { text: "미리 계획하고 주문한다", tags: ["J"] },
    a2: { text: "그때그때 즉흥적으로 주문한다", tags: ["P"] },
  },
  {
    id: 11,
    q: "주문 방식을 선택할 때",
    a1: { text: "전통적인 방식으로 기본적으로 주문한다", tags: ["S"] },
    a2: { text: "새로운 방식으로 혁신적으로 주문한다", tags: ["N"] },
  },
  {
    id: 12,
    q: "주문할 때 선택 기준을 생각할 때",
    a1: { text: "실용성과 효율성을 기준으로 선택한다", tags: ["T"] },
    a2: { text: "감성과 의미를 기준으로 선택한다", tags: ["F"] },
  },
]

export default function FoodOrderingTest() {
  const quizLogic = useQuizLogic({
    testId: "food-ordering",
    questions,
    resultPath: "/tests/food-ordering/test/result",
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
