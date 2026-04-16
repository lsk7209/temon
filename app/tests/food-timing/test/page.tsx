"use client"

/**
 * Component: FoodTimingTest
 * 식사 시간 테스트 페이지
 * @example <FoodTimingTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "아침에 일어나서 아침 식사를 할 시간을 정할 때",
    a1: { text: "규칙적으로 정해진 시간에 식사한다", tags: ["J"] },
    a2: { text: "유연하게 그때그때 식사한다", tags: ["P"] },
  },
  {
    id: 2,
    q: "점심시간에 점심 식사를 할 시간을 정할 때",
    a1: { text: "정해진 시간에 계획적으로 식사한다", tags: ["J"] },
    a2: { text: "그때그때 즉흥적으로 식사한다", tags: ["P"] },
  },
  {
    id: 3,
    q: "저녁에 저녁 식사를 할 시간을 정할 때",
    a1: { text: "계획적으로 일정대로 식사한다", tags: ["J"] },
    a2: { text: "즉흥적으로 상황에 맞게 식사한다", tags: ["P"] },
  },
  {
    id: 4,
    q: "친구가 '왜 그 시간에 먹어?'라고 물어볼 때",
    a1: { text: "감성과 기분에 따라 먹는다고 말한다", tags: ["F"] },
    a2: { text: "실용과 효율에 따라 먹는다고 말한다", tags: ["T"] },
  },
  {
    id: 5,
    q: "식사 시간에 대한 경험을 친구에게 공유하고 싶을 때",
    a1: { text: "적극적으로 공유한다", tags: ["E"] },
    a2: { text: "조용히 혼자만 즐긴다", tags: ["I"] },
  },
  {
    id: 6,
    q: "예정된 식사 시간이 변경되었을 때",
    a1: { text: "즉시 대응해서 계획을 수정한다", tags: ["J"] },
    a2: { text: "유연하게 대응한다", tags: ["P"] },
  },
  {
    id: 7,
    q: "식사 시간을 정하기 전에 계획을 세울 때",
    a1: { text: "미리 계획한다", tags: ["J"] },
    a2: { text: "그때그때 결정한다", tags: ["P"] },
  },
  {
    id: 8,
    q: "식사를 마치고 나서 기분이 좋을 때",
    a1: { text: "즐거움과 뿌듯함을 느낀다", tags: ["F"] },
    a2: { text: "만족감과 효율성을 느낀다", tags: ["T"] },
  },
  {
    id: 9,
    q: "식사 시간을 선호하는 이유를 생각할 때",
    a1: { text: "감성적인 이유로 선호한다", tags: ["F"] },
    a2: { text: "논리적인 이유로 선호한다", tags: ["T"] },
  },
  {
    id: 10,
    q: "식사 시간 스타일을 선택할 때",
    a1: { text: "전통적이고 익숙한 스타일을 선택한다", tags: ["S"] },
    a2: { text: "창의적이고 새로운 스타일을 선택한다", tags: ["N"] },
  },
  {
    id: 11,
    q: "식사 시간 경험을 친구에게 공유하고 싶을 때",
    a1: { text: "즐겁게 공유한다", tags: ["E"] },
    a2: { text: "조용히 혼자만 즐긴다", tags: ["I"] },
  },
  {
    id: 12,
    q: "식사 시간을 관리할 때",
    a1: { text: "체계적으로 관리한다", tags: ["J"] },
    a2: { text: "자유롭게 즐긴다", tags: ["P"] },
  },
]

export default function FoodTimingTest() {
  const quizLogic = useQuizLogic({
    testId: "food-timing",
    questions,
    resultPath: "/tests/food-timing/test/result",
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
