"use client"

/**
 * Component: StewVsSoupTest
 * 찌개 vs 국 테스트 페이지
 * @example <StewVsSoupTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "식당에서 찌개를 고를 때",
    a1: { text: "된장찌개, 김치찌개 같은 전통 찌개를 선택한다", tags: ["S"] },
    a2: { text: "부대찌개나 특별한 찌개를 선택한다", tags: ["N"] },
  },
  {
    id: 2,
    q: "찌개를 먹다가 국물을 마실 때",
    a1: { text: "많이 풍부하게 마신다", tags: ["T"] },
    a2: { text: "적게 적당히 마신다", tags: ["F"] },
  },
  {
    id: 3,
    q: "찌개를 끓일 때 시간을 정할 때",
    a1: { text: "오래 끓여서 체계적으로 만든다", tags: ["J"] },
    a2: { text: "빨리 끓여서 유연하게 만든다", tags: ["P"] },
  },
  {
    id: 4,
    q: "찌개 재료를 고를 때",
    a1: { text: "전통 재료나 기본 재료를 선택한다", tags: ["S"] },
    a2: { text: "특별한 재료나 새로운 재료를 선택한다", tags: ["N"] },
  },
  {
    id: 5,
    q: "찌개를 먹을 때 순서를 정할 때",
    a1: { text: "정해진 순서로 체계적으로 먹는다", tags: ["J"] },
    a2: { text: "그때그때 유연하게 먹는다", tags: ["P"] },
  },
  {
    id: 6,
    q: "찌개를 나눠 먹을 때",
    a1: { text: "기쁘게 함께 나눠 먹는다", tags: ["E"] },
    a2: { text: "혼자 조용히 먹는다", tags: ["I"] },
  },
  {
    id: 7,
    q: "찌개를 끓일 때",
    a1: { text: "혼자 조용히 끓인다", tags: ["I"] },
    a2: { text: "사람들과 함께 끓인다", tags: ["E"] },
  },
  {
    id: 8,
    q: "찌개를 선택할 때 이유를 생각할 때",
    a1: { text: "맛과 실용성 때문에 선택한다", tags: ["S"] },
    a2: { text: "의미와 특별함 때문에 선택한다", tags: ["N"] },
  },
  {
    id: 9,
    q: "찌개를 끓이기 전에 계획을 세울 때",
    a1: { text: "미리 계획하고 목표를 정한다", tags: ["J"] },
    a2: { text: "즉흥적으로 그때그때 끓인다", tags: ["P"] },
  },
  {
    id: 10,
    q: "찌개를 먹다가 정말 맛있어서 기분이 좋을 때",
    a1: { text: "즐거워서 친구들에게 알려준다", tags: ["E"] },
    a2: { text: "평온하게 조용히 즐긴다", tags: ["I"] },
  },
  {
    id: 11,
    q: "찌개를 선택할 때 이유를 생각할 때",
    a1: { text: "감성과 의미 때문에 선택한다", tags: ["F"] },
    a2: { text: "효율과 실용 때문에 선택한다", tags: ["T"] },
  },
  {
    id: 12,
    q: "찌개를 먹고 정말 맛있어서 공유하고 싶을 때",
    a1: { text: "즉시 후기를 공유하고 경험을 나눈다", tags: ["E"] },
    a2: { text: "조용히 혼자만의 맛집으로 간직한다", tags: ["I"] },
  },
]

export default function StewVsSoupTest() {
  const quizLogic = useQuizLogic({
    testId: "stew-vs-soup",
    questions,
    resultPath: "/tests/stew-vs-soup/test/result",
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

