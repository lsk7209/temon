"use client"

/**
 * Component: FoodWasteTest
 * 음식 낭비 테스트 페이지
 * @example <FoodWasteTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "식사를 마치고 음식이 남았을 때",
    a1: { text: "보관하거나 재활용한다", tags: ["J"] },
    a2: { text: "버리거나 즉시 처리한다", tags: ["P"] },
  },
  {
    id: 2,
    q: "음식 낭비를 예방하려고 할 때",
    a1: { text: "계획적으로 미리 예방한다", tags: ["J"] },
    a2: { text: "즉흥적으로 그때그때 대처한다", tags: ["P"] },
  },
  {
    id: 3,
    q: "친구가 '왜 음식 낭비를 줄여?'라고 물어볼 때",
    a1: { text: "감성과 환경을 위해 줄인다고 말한다", tags: ["F"] },
    a2: { text: "실용과 효율을 위해 줄인다고 말한다", tags: ["T"] },
  },
  {
    id: 4,
    q: "음식 낭비를 줄이는 방법을 친구에게 공유하고 싶을 때",
    a1: { text: "적극적으로 공유한다", tags: ["E"] },
    a2: { text: "조용히 실천한다", tags: ["I"] },
  },
  {
    id: 5,
    q: "음식 낭비를 대처할 때 대처 스타일을 선택할 때",
    a1: { text: "전통적이고 익숙한 방식으로 대처한다", tags: ["S"] },
    a2: { text: "창의적이고 새로운 방식으로 대처한다", tags: ["N"] },
  },
  {
    id: 6,
    q: "음식 낭비를 줄이고 나서 기분이 좋을 때",
    a1: { text: "뿌듯함과 만족감을 느낀다", tags: ["F"] },
    a2: { text: "효율성과 실용성을 느낀다", tags: ["T"] },
  },
  {
    id: 7,
    q: "음식 낭비를 대처할 때 시간이 부족할 때",
    a1: { text: "여유롭게 천천히 대처한다", tags: ["F"] },
    a2: { text: "빠르고 효율적으로 대처한다", tags: ["T"] },
  },
  {
    id: 8,
    q: "음식 낭비를 줄이고 나서 친구에게 이야기하고 싶을 때",
    a1: { text: "즉시 공유하고 소통한다", tags: ["E"] },
    a2: { text: "조용히 실천한다", tags: ["I"] },
  },
  {
    id: 9,
    q: "음식 낭비를 대처하기 전에 계획을 세울 때",
    a1: { text: "미리 계획한다", tags: ["J"] },
    a2: { text: "그때그때 대처한다", tags: ["P"] },
  },
  {
    id: 10,
    q: "음식 낭비를 대처할 때 대처 방식을 선택할 때",
    a1: { text: "정해진 방식대로 대처한다", tags: ["S"] },
    a2: { text: "상황에 맞게 응용해서 대처한다", tags: ["N"] },
  },
  {
    id: 11,
    q: "음식 낭비를 대처하는 동기를 생각할 때",
    a1: { text: "감성과 환경을 위해 대처한다", tags: ["F"] },
    a2: { text: "논리와 효율을 위해 대처한다", tags: ["T"] },
  },
  {
    id: 12,
    q: "음식 낭비를 대처하고 나서 정리할 때",
    a1: { text: "즉시 체계적으로 정리한다", tags: ["E"] },
    a2: { text: "나중에 편하게 정리한다", tags: ["I"] },
  },
]

export default function FoodWasteTest() {
  const quizLogic = useQuizLogic({
    testId: "food-waste",
    questions,
    resultPath: "/tests/food-waste/test/result",
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
