"use client"

/**
 * Component: FoodSeasoningTest
 * 음식 양념 테스트 페이지
 * @example <FoodSeasoningTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "요리에 양념을 넣을 때 양념 사용량을 정할 때",
    a1: { text: "적게 절제적으로 양념을 넣는다", tags: ["T"] },
    a2: { text: "많이 풍부하게 양념을 넣는다", tags: ["F"] },
  },
  {
    id: 2,
    q: "요리에 양념을 선택할 때",
    a1: { text: "레시피를 따라 정확하게 양념을 선택한다", tags: ["S"] },
    a2: { text: "감으로 직관적으로 양념을 선택한다", tags: ["N"] },
  },
  {
    id: 3,
    q: "새로운 양념을 시도할 때",
    a1: { text: "익숙한 양념이나 기본 양념을 선택한다", tags: ["S"] },
    a2: { text: "새로운 양념을 실험적으로 시도한다", tags: ["N"] },
  },
  {
    id: 4,
    q: "요리를 시작하기 전에 양념을 준비할 때",
    a1: { text: "미리 준비하고 계획해서 양념을 준비한다", tags: ["J"] },
    a2: { text: "그때그때 즉흥적으로 양념을 준비한다", tags: ["P"] },
  },
  {
    id: 5,
    q: "여러 양념을 조합할 때",
    a1: { text: "정해진 조합으로 체계적으로 조합한다", tags: ["J"] },
    a2: { text: "즉흥 조합으로 자유롭게 조합한다", tags: ["P"] },
  },
  {
    id: 6,
    q: "친구가 '왜 그 양념을 써?'라고 물어볼 때",
    a1: { text: "맛과 감성을 위해 사용한다고 말한다", tags: ["F"] },
    a2: { text: "건강과 실용을 위해 사용한다고 말한다", tags: ["T"] },
  },
  {
    id: 7,
    q: "양념을 넣을 때 양념을 측정할 때",
    a1: { text: "정확히 측정해서 양념을 넣는다", tags: ["J"] },
    a2: { text: "대략적으로 감으로 양념을 넣는다", tags: ["P"] },
  },
  {
    id: 8,
    q: "양념을 사용할 때 친구가 와서 '나도 써보고 싶어!'라고 할 때",
    a1: { text: "즉시 함께 양념을 공유한다", tags: ["E"] },
    a2: { text: "혼자만 사용한다", tags: ["I"] },
  },
  {
    id: 9,
    q: "양념을 저장할 때",
    a1: { text: "체계적으로 정리해서 저장한다", tags: ["J"] },
    a2: { text: "자유롭게 보관한다", tags: ["P"] },
  },
  {
    id: 10,
    q: "새로운 양념을 시도할 때 빈도를 생각할 때",
    a1: { text: "자주 시도하고 적극적으로 시도한다", tags: ["E"] },
    a2: { text: "가끔 시도하고 신중하게 시도한다", tags: ["I"] },
  },
  {
    id: 11,
    q: "양념을 선택할 때 양념 종류를 고를 때",
    a1: { text: "전통 양념이나 기본 양념을 선택한다", tags: ["S"] },
    a2: { text: "퓨전 양념이나 창의 양념을 선택한다", tags: ["N"] },
  },
  {
    id: 12,
    q: "양념을 사용하고 나서 기분이 좋을 때",
    a1: { text: "만족감과 성취감을 느낀다", tags: ["E"] },
    a2: { text: "평온함과 차분함을 느낀다", tags: ["I"] },
  },
]

export default function FoodSeasoningTest() {
  const quizLogic = useQuizLogic({
    testId: "food-seasoning",
    questions,
    resultPath: "/tests/food-seasoning/test/result",
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
