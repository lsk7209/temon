"use client"

/**
 * Component: FoodSharingTest
 * 음식 나눔 테스트 페이지
 * @example <FoodSharingTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "맛있는 음식을 친구들과 나눌 때",
    a1: { text: "계획적이고 체계적으로 나눈다", tags: ["J"] },
    a2: { text: "즉흥적이고 자연스럽게 나눈다", tags: ["P"] },
  },
  {
    id: 2,
    q: "음식을 나눌 때 누구에게 나눌지 정할 때",
    a1: { text: "모두에게 골고루 나눈다", tags: ["E"] },
    a2: { text: "가까운 사람 중심으로 나눈다", tags: ["I"] },
  },
  {
    id: 3,
    q: "친구가 '왜 음식을 나눠?'라고 물어볼 때",
    a1: { text: "감성과 즐거움을 위해 나눈다고 말한다", tags: ["F"] },
    a2: { text: "실용과 합리성을 위해 나눈다고 말한다", tags: ["T"] },
  },
  {
    id: 4,
    q: "음식을 나눌 때 양을 정할 때",
    a1: { text: "정확히 균등하게 나눈다", tags: ["S"] },
    a2: { text: "여유있게 넉넉히 나눈다", tags: ["N"] },
  },
  {
    id: 5,
    q: "음식을 나눌 때 분위기를 만들 때",
    a1: { text: "활발하고 즐겁게 나눈다", tags: ["E"] },
    a2: { text: "조용하고 차분하게 나눈다", tags: ["I"] },
  },
  {
    id: 6,
    q: "음식을 나누고 나서 기분이 좋을 때",
    a1: { text: "즐거움과 뿌듯함을 느낀다", tags: ["F"] },
    a2: { text: "만족감과 효율성을 느낀다", tags: ["T"] },
  },
  {
    id: 7,
    q: "음식을 나눌 때 스타일을 선택할 때",
    a1: { text: "전통적이고 익숙한 방식으로 나눈다", tags: ["S"] },
    a2: { text: "창의적이고 새로운 방식으로 나눈다", tags: ["N"] },
  },
  {
    id: 8,
    q: "음식을 나누기 전에 준비할 때",
    a1: { text: "미리 계획한다", tags: ["J"] },
    a2: { text: "그때그때 결정한다", tags: ["P"] },
  },
  {
    id: 9,
    q: "음식을 나누고 나서 다음 활동을 할 때",
    a1: { text: "함께 즐긴다", tags: ["E"] },
    a2: { text: "조용히 쉰다", tags: ["I"] },
  },
  {
    id: 10,
    q: "음식을 나눌 때 선택 기준을 정할 때",
    a1: { text: "감성적으로 마음 가는 대로 나눈다", tags: ["F"] },
    a2: { text: "논리적으로 합리적으로 나눈다", tags: ["T"] },
  },
  {
    id: 11,
    q: "음식을 나눌 때 방법을 선택할 때",
    a1: { text: "정해진 방식대로 나눈다", tags: ["S"] },
    a2: { text: "상황에 맞게 응용해서 나눈다", tags: ["N"] },
  },
  {
    id: 12,
    q: "음식을 나누고 나서 마무리할 때",
    a1: { text: "체계적으로 정리한다", tags: ["J"] },
    a2: { text: "자연스럽게 마무리한다", tags: ["P"] },
  },
]

export default function FoodSharingTest() {
  const quizLogic = useQuizLogic({
    testId: "food-sharing",
    questions,
    resultPath: "/tests/food-sharing/test/result",
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
      colorClasses={getQuizColorScheme("green-emerald")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
