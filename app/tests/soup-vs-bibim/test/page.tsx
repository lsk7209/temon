"use client"

/**
 * Component: SoupVsBibimTest
 * 국물 vs 비빔밥 테스트 페이지
 * @example <SoupVsBibimTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "국물 있는 음식을 먹다가 국물이 너무 뜨거워서 입 안이 데일 것 같을 때",
    a1: { text: "불어가면서 천천히 마신다", tags: ["F", "J"] },
    a2: { text: "국물은 건너뛰고 밥만 먹는다", tags: ["T", "P"] },
  },
  {
    id: 2,
    q: "비빔밥을 먹다가 재료들이 완전히 뒤섞여서 어지러울 때",
    a1: { text: "더 골고루 비벼서 완전히 섞는다", tags: ["N", "P"] },
    a2: { text: "한 가지씩 정돈해서 따로따로 먹는다", tags: ["S", "J"] },
  },
  {
    id: 3,
    q: "식당에서 '된장찌개'와 '비빔밥' 중 하나를 선택해야 할 때",
    a1: { text: "따뜻한 된장찌개를 선택한다", tags: ["F", "N"] },
    a2: { text: "간편한 비빔밥을 선택한다", tags: ["T", "S"] },
  },
  {
    id: 4,
    q: "국물 있는 음식을 먹다가 국물이 다 떨어져서 밥만 남았을 때",
    a1: { text: "직원에게 국물을 더 달라고 요청한다", tags: ["E", "F"] },
    a2: { text: "그냥 남은 밥만 먹는다", tags: ["I", "T"] },
  },
  {
    id: 5,
    q: "비빔밥을 먹다가 맛을 보니 완전히 밋밋하고 재미없을 때",
    a1: { text: "고추장이나 양념을 더 넣어본다", tags: ["E", "P"] },
    a2: { text: "그냥 먹거나 포장한다", tags: ["I", "J"] },
  },
  {
    id: 6,
    q: "국물 있는 음식을 먹다가 국물이 너무 짜서 바다물 같을 때",
    a1: { text: "물을 넣거나 국물을 덜 마신다", tags: ["E", "F"] },
    a2: { text: "그냥 참고 먹는다", tags: ["I", "T"] },
  },
  {
    id: 7,
    q: "비빔밥을 먹다가 너무 매워서 입 안이 불타오를 것 같을 때",
    a1: { text: "밥을 더 넣어서 매운맛을 완화시킨다", tags: ["E", "F"] },
    a2: { text: "그냥 참고 먹거나 포장한다", tags: ["I", "T"] },
  },
  {
    id: 8,
    q: "국물 있는 음식을 먹다가 친구가 와서 '나도 먹고 싶어! 나눠줘!'라고 할 때",
    a1: { text: "즉시 국물을 나눠주고 함께 먹는다", tags: ["E", "F"] },
    a2: { text: "지금은 혼자 먹고 싶다고 말한다", tags: ["I", "T"] },
  },
  {
    id: 9,
    q: "비빔밥을 먹다가 양이 너무 많아서 절반도 못 먹었을 때",
    a1: { text: "포장해서 집에 가져간다", tags: ["J", "S"] },
    a2: { text: "그냥 남기고 나간다", tags: ["P", "N"] },
  },
  {
    id: 10,
    q: "국물 있는 음식을 먹다가 국물이 너무 차가워서 맛이 없을 때",
    a1: { text: "따뜻한 국물을 더 달라고 요청한다", tags: ["E", "F"] },
    a2: { text: "그냥 먹는다", tags: ["I", "T"] },
  },
  {
    id: 11,
    q: "비빔밥을 먹다가 너무 달아서 당뇨 걸릴 것 같을 때",
    a1: { text: "고춧가루나 매운 양념을 넣어서 조정한다", tags: ["E", "F"] },
    a2: { text: "그냥 먹는다", tags: ["I", "T"] },
  },
  {
    id: 12,
    q: "점심시간에 '김치찌개'와 '돌솥비빔밥' 중 하나를 선택해야 할 때",
    a1: { text: "따뜻한 김치찌개를 선택한다", tags: ["F", "N"] },
    a2: { text: "간편한 돌솥비빔밥을 선택한다", tags: ["T", "S"] },
  },
]

export default function SoupVsBibimTest() {
  const quizLogic = useQuizLogic({
    testId: "soup-vs-bibim",
    questions,
    resultPath: "/tests/soup-vs-bibim/test/result",
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
      colorClasses={getQuizColorScheme("green-blue")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
