"use client"

/**
 * Component: FoodCombinationTest
 * 음식 조합 테스트 페이지
 * @example <FoodCombinationTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "식사를 할 때 밥과 반찬을 어떻게 먹을지 고민될 때",
    a1: { text: "밥과 반찬을 섞어서 먹는다", tags: ["P"] },
    a2: { text: "밥과 반찬을 따로따로 먹는다", tags: ["J"] },
  },
  {
    id: 2,
    q: "국물이 있는 음식을 먹을 때 국물과 밥을 어떻게 먹을지 고민될 때",
    a1: { text: "국물과 밥을 섞어서 먹는다", tags: ["P"] },
    a2: { text: "국물과 밥을 따로따로 먹는다", tags: ["J"] },
  },
  {
    id: 3,
    q: "친구가 '왜 그렇게 조합해?'라고 물어볼 때",
    a1: { text: "감성과 기분에 따라 조합했다고 말한다", tags: ["F"] },
    a2: { text: "실용과 효율에 따라 조합했다고 말한다", tags: ["T"] },
  },
  {
    id: 4,
    q: "새로운 음식 조합을 시도할 때",
    a1: { text: "익숙한 조합을 선택한다", tags: ["S"] },
    a2: { text: "새로운 조합을 시도해본다", tags: ["N"] },
  },
  {
    id: 5,
    q: "맛있는 음식 조합을 발견했을 때 친구에게 공유하고 싶을 때",
    a1: { text: "즉시 적극적으로 공유한다", tags: ["E"] },
    a2: { text: "조용히 혼자만 즐긴다", tags: ["I"] },
  },
  {
    id: 6,
    q: "음식 조합을 즐길 때",
    a1: { text: "즉시 바로 즐긴다", tags: ["E"] },
    a2: { text: "천천히 여유롭게 즐긴다", tags: ["I"] },
  },
  {
    id: 7,
    q: "음식 조합을 하기 전에 계획을 세울 때",
    a1: { text: "미리 계획한다", tags: ["J"] },
    a2: { text: "그때그때 즉흥적으로 조합한다", tags: ["P"] },
  },
  {
    id: 8,
    q: "음식 조합을 경험하고 나서 기분이 좋을 때",
    a1: { text: "즐거움과 뿌듯함을 느낀다", tags: ["F"] },
    a2: { text: "만족감과 효율성을 느낀다", tags: ["T"] },
  },
  {
    id: 9,
    q: "음식 조합을 선호하는 이유를 생각할 때",
    a1: { text: "감성적인 이유로 선호한다", tags: ["F"] },
    a2: { text: "논리적인 이유로 선호한다", tags: ["T"] },
  },
  {
    id: 10,
    q: "음식 조합이 예상과 다르게 나왔을 때",
    a1: { text: "즉시 대응해서 조정한다", tags: ["J"] },
    a2: { text: "유연하게 대응한다", tags: ["P"] },
  },
  {
    id: 11,
    q: "음식 조합을 선택할 때 스타일을 고를 때",
    a1: { text: "전통적이고 익숙한 조합을 선택한다", tags: ["S"] },
    a2: { text: "창의적이고 새로운 조합을 선택한다", tags: ["N"] },
  },
  {
    id: 12,
    q: "음식 조합 경험을 친구에게 공유하고 싶을 때",
    a1: { text: "즐겁게 공유한다", tags: ["E"] },
    a2: { text: "조용히 혼자만 즐긴다", tags: ["I"] },
  },
]

export default function FoodCombinationTest() {
  const quizLogic = useQuizLogic({
    testId: "food-combination",
    questions,
    resultPath: "/tests/food-combination/test/result",
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
      colorClasses={getQuizColorScheme("teal-cyan")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
