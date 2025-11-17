"use client"

/**
 * Component: WaterDrinkingTest
 * 물 마시는 습관 테스트 페이지
 * @example <WaterDrinkingTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "물을 마시다가 목이 너무 말라서 참을 수 없을 때",
    a1: { text: "정해진 시간까지 기다린다", tags: ["J"] },
    a2: { text: "그때그때 바로 마신다", tags: ["P"] },
  },
  {
    id: 2,
    q: "물을 마시다가 물이 너무 차가워서 목이 아플 것 같을 때",
    a1: { text: "조금씩 천천히 마신다", tags: ["F"] },
    a2: { text: "빨리 마시고 끝낸다", tags: ["T"] },
  },
  {
    id: 3,
    q: "물을 마시다가 물이 너무 많아서 다 못 마실 것 같을 때",
    a1: { text: "조금씩 나눠서 마신다", tags: ["S"] },
    a2: { text: "한 번에 다 마시려고 한다", tags: ["N"] },
  },
  {
    id: 4,
    q: "물을 마시다가 하루 물 섭취량 목표가 있을 때",
    a1: { text: "시간표를 세워서 체계적으로 마신다", tags: ["J"] },
    a2: { text: "그때그때 목이 마르면 마신다", tags: ["P"] },
  },
  {
    id: 5,
    q: "물을 마시다가 물맛이 이상하거나 맛없을 때",
    a1: { text: "물맛을 확인하고 다른 물을 찾는다", tags: ["F"] },
    a2: { text: "그냥 마시고 끝낸다", tags: ["T"] },
  },
  {
    id: 6,
    q: "물을 마시다가 친구들이 와서 '우리도 마시고 싶어!'라고 할 때",
    a1: { text: "혼자 조용히 마신다", tags: ["I"] },
    a2: { text: "함께 물을 나눠 마신다", tags: ["E"] },
  },
  {
    id: 7,
    q: "생일이나 기념일 같은 특별한 날에 물을 마실 때",
    a1: { text: "평범하게 그냥 마신다", tags: ["S"] },
    a2: { text: "특별한 물이나 의미를 부여해서 마신다", tags: ["N"] },
  },
  {
    id: 8,
    q: "건강 앱에서 '아침에 물 2잔, 점심에 물 1잔' 같은 순서를 알려줄 때",
    a1: { text: "정해진 순서대로 체계적으로 마신다", tags: ["J"] },
    a2: { text: "자연스럽게 편한 대로 마신다", tags: ["P"] },
  },
  {
    id: 9,
    q: "물을 마시다가 정말 맛있고 시원해서 기분이 좋아질 때",
    a1: { text: "조용히 혼자 즐긴다", tags: ["I"] },
    a2: { text: "친구들에게 공유하고 함께 즐긴다", tags: ["E"] },
  },
  {
    id: 10,
    q: "편의점에서 물을 고르다가 '일반 물'과 '미네랄 워터' 중 선택할 때",
    a1: { text: "감성적으로 맛이나 느낌으로 선택한다", tags: ["F"] },
    a2: { text: "실용적으로 효율적인 걸 선택한다", tags: ["T"] },
  },
  {
    id: 11,
    q: "여행지에서 정말 맛있는 물을 발견했을 때",
    a1: { text: "즉시 친구들에게 추천한다", tags: ["E"] },
    a2: { text: "혼자만의 비밀로 간직한다", tags: ["I"] },
  },
  {
    id: 12,
    q: "친구가 '왜 물을 마셔?'라고 물어볼 때",
    a1: { text: "특별한 의미나 목적이 있다고 설명한다", tags: ["N"] },
    a2: { text: "단순히 목마르니까 마신다고 말한다", tags: ["S"] },
  },
]

export default function WaterDrinkingTest() {
  const quizLogic = useQuizLogic({
    testId: "water-drinking",
    questions,
    resultPath: "/tests/water-drinking/test/result",
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
      colorClasses={getQuizColorScheme("blue-cyan")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}

