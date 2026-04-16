"use client"

/**
 * Component: KimbapIngredientTest
 * 김밥 재료 테스트 페이지
 * @example <KimbapIngredientTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "김밥 재료를 고를 때",
    a1: { text: "전통적인 재료나 기본 재료를 선택한다", tags: ["S"] },
    a2: { text: "특별한 재료나 새로운 재료를 선택한다", tags: ["N"] },
  },
  {
    id: 2,
    q: "김밥을 만들 때 재료 조합을 정할 때",
    a1: { text: "고정된 조합으로 항상 같게 만든다", tags: ["J"] },
    a2: { text: "매번 다르게 다양하게 만든다", tags: ["P"] },
  },
  {
    id: 3,
    q: "김밥에 재료를 넣을 때 양을 정할 때",
    a1: { text: "적당히 균형 있게 넣는다", tags: ["F"] },
    a2: { text: "많이 풍부하게 넣는다", tags: ["T"] },
  },
  {
    id: 4,
    q: "김밥에 재료를 배치할 때",
    a1: { text: "정돈된 배치로 체계적으로 배치한다", tags: ["J"] },
    a2: { text: "자연스럽게 유연하게 배치한다", tags: ["P"] },
  },
  {
    id: 5,
    q: "김밥을 만들 때 순서를 정할 때",
    a1: { text: "정해진 순서로 체계적으로 만든다", tags: ["J"] },
    a2: { text: "그때그때 유연하게 만든다", tags: ["P"] },
  },
  {
    id: 6,
    q: "김밥을 먹을 때 자를 때",
    a1: { text: "작게 예쁘게 자른다", tags: ["F"] },
    a2: { text: "크게 실용적으로 자른다", tags: ["T"] },
  },
  {
    id: 7,
    q: "김밥을 만들 때",
    a1: { text: "혼자 조용히 만든다", tags: ["I"] },
    a2: { text: "사람들과 함께 만든다", tags: ["E"] },
  },
  {
    id: 8,
    q: "재료를 선택할 때 이유를 생각할 때",
    a1: { text: "맛과 실용성 때문에 선택한다", tags: ["S"] },
    a2: { text: "의미와 특별함 때문에 선택한다", tags: ["N"] },
  },
  {
    id: 9,
    q: "김밥을 만들기 전에 계획을 세울 때",
    a1: { text: "미리 계획하고 목표를 정한다", tags: ["J"] },
    a2: { text: "즉흥적으로 그때그때 만든다", tags: ["P"] },
  },
  {
    id: 10,
    q: "김밥을 만들다가 정말 재미있어서 기분이 좋을 때",
    a1: { text: "즐거워서 친구들에게 알려준다", tags: ["E"] },
    a2: { text: "평온하게 조용히 즐긴다", tags: ["I"] },
  },
  {
    id: 11,
    q: "재료를 선택할 때 이유를 생각할 때",
    a1: { text: "감성과 의미 때문에 선택한다", tags: ["F"] },
    a2: { text: "효율과 실용 때문에 선택한다", tags: ["T"] },
  },
  {
    id: 12,
    q: "김밥을 만들고 정말 맛있어서 공유하고 싶을 때",
    a1: { text: "즉시 후기를 공유하고 경험을 나눈다", tags: ["E"] },
    a2: { text: "조용히 혼자만의 레시피로 간직한다", tags: ["I"] },
  },
]

export default function KimbapIngredientTest() {
  const quizLogic = useQuizLogic({
    testId: "kimbap-ingredient",
    questions,
    resultPath: "/tests/kimbap-ingredient/test/result",
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

