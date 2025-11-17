"use client"

/**
 * Component: SaladDressingTest
 * 샐러드 드레싱 테스트 페이지
 * @example <SaladDressingTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "샐러드바에서 드레싱을 고를 때",
    a1: { text: "올리브오일, 발사믹 같은 기본 드레싱을 선택한다", tags: ["S"] },
    a2: { text: "시저나 특별한 드레싱을 선택한다", tags: ["N"] },
  },
  {
    id: 2,
    q: "샐러드에 드레싱을 뿌릴 때",
    a1: { text: "많이 풍부하게 뿌린다", tags: ["T"] },
    a2: { text: "적게 적당히 뿌린다", tags: ["F"] },
  },
  {
    id: 3,
    q: "드레싱을 선택할 때 기준을 정할 때",
    a1: { text: "맛과 실용성을 기준으로 선택한다", tags: ["S"] },
    a2: { text: "건강과 의미를 기준으로 선택한다", tags: ["N"] },
  },
  {
    id: 4,
    q: "샐러드 재료를 고를 때",
    a1: { text: "기본 재료나 전통 재료를 선택한다", tags: ["S"] },
    a2: { text: "특별한 재료나 새로운 재료를 선택한다", tags: ["N"] },
  },
  {
    id: 5,
    q: "샐러드를 먹을 때 순서를 정할 때",
    a1: { text: "정해진 순서로 체계적으로 먹는다", tags: ["J"] },
    a2: { text: "그때그때 유연하게 먹는다", tags: ["P"] },
  },
  {
    id: 6,
    q: "샐러드를 나눠 먹을 때",
    a1: { text: "기쁘게 함께 나눠 먹는다", tags: ["E"] },
    a2: { text: "혼자 조용히 먹는다", tags: ["I"] },
  },
  {
    id: 7,
    q: "샐러드를 만들 때",
    a1: { text: "혼자 조용히 만든다", tags: ["I"] },
    a2: { text: "사람들과 함께 만든다", tags: ["E"] },
  },
  {
    id: 8,
    q: "샐러드를 선택할 때 이유를 생각할 때",
    a1: { text: "맛과 실용성 때문에 선택한다", tags: ["S"] },
    a2: { text: "건강과 의미 때문에 선택한다", tags: ["N"] },
  },
  {
    id: 9,
    q: "샐러드를 만들기 전에 계획을 세울 때",
    a1: { text: "미리 계획하고 목표를 정한다", tags: ["J"] },
    a2: { text: "즉흥적으로 그때그때 만든다", tags: ["P"] },
  },
  {
    id: 10,
    q: "샐러드를 먹다가 정말 맛있어서 기분이 좋을 때",
    a1: { text: "즐거워서 친구들에게 알려준다", tags: ["E"] },
    a2: { text: "평온하게 조용히 즐긴다", tags: ["I"] },
  },
  {
    id: 11,
    q: "드레싱을 선택할 때 이유를 생각할 때",
    a1: { text: "감성과 의미 때문에 선택한다", tags: ["F"] },
    a2: { text: "효율과 실용 때문에 선택한다", tags: ["T"] },
  },
  {
    id: 12,
    q: "샐러드를 먹고 정말 맛있어서 공유하고 싶을 때",
    a1: { text: "즉시 후기를 공유하고 경험을 나눈다", tags: ["E"] },
    a2: { text: "조용히 혼자만의 맛집으로 간직한다", tags: ["I"] },
  },
]

export default function SaladDressingTest() {
  const quizLogic = useQuizLogic({
    testId: "salad-dressing",
    questions,
    resultPath: "/tests/salad-dressing/test/result",
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
