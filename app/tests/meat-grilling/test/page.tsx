"use client"

/**
 * Component: MeatGrillingTest
 * 고기 굽기 테스트 페이지
 * @example <MeatGrillingTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "고기를 굽다가 안 익었는데 친구들이 먹자고 할 때",
    a1: { text: "일단 먹게 해주고 나중에 더 굽는다", tags: ["P"] },
    a2: { text: "익을 때까지 기다리게 한다", tags: ["J"] },
  },
  {
    id: 2,
    q: "고기를 굽다가 불이 너무 세서 타기 시작할 때",
    a1: { text: "당황해서 바로 뒤집는다", tags: ["P"] },
    a2: { text: "침착하게 불을 조절한다", tags: ["J"] },
  },
  {
    id: 3,
    q: "고기를 굽다가 여러 개를 동시에 구워야 할 때",
    a1: { text: "그때그때 편한 대로 굽는다", tags: ["P"] },
    a2: { text: "정해진 순서대로 체계적으로 굽는다", tags: ["J"] },
  },
  {
    id: 4,
    q: "고기집에서 고기를 고를 때",
    a1: { text: "부드러운 고기를 선택한다", tags: ["F"] },
    a2: { text: "쫄깃한 고기를 선택한다", tags: ["T"] },
  },
  {
    id: 5,
    q: "고기를 굽다가 친구들이 와서 같이 굽자고 할 때",
    a1: { text: "기쁘게 함께 굽는다", tags: ["E"] },
    a2: { text: "혼자 굽는 게 편하다고 거절한다", tags: ["I"] },
  },
  {
    id: 6,
    q: "고기를 먹다가 너무 커서 자를 때",
    a1: { text: "작게 예쁘게 자른다", tags: ["F"] },
    a2: { text: "크게 실용적으로 자른다", tags: ["T"] },
  },
  {
    id: 7,
    q: "고기집에서 메뉴를 고를 때",
    a1: { text: "인기 메뉴나 기본 메뉴를 선택한다", tags: ["S"] },
    a2: { text: "특별한 메뉴나 새로운 메뉴를 선택한다", tags: ["N"] },
  },
  {
    id: 8,
    q: "고기를 굽기 전에 계획을 세울 때",
    a1: { text: "미리 계획하고 목표를 정한다", tags: ["J"] },
    a2: { text: "즉흥적으로 그때그때 굽는다", tags: ["P"] },
  },
  {
    id: 9,
    q: "고기를 먹다가 정말 맛있어서 기분이 좋을 때",
    a1: { text: "즐거워서 친구들에게 알려준다", tags: ["E"] },
    a2: { text: "평온하게 조용히 즐긴다", tags: ["I"] },
  },
  {
    id: 10,
    q: "고기를 선택할 때 이유를 생각할 때",
    a1: { text: "감성과 의미 때문에 선택한다", tags: ["F"] },
    a2: { text: "효율과 실용 때문에 선택한다", tags: ["T"] },
  },
  {
    id: 11,
    q: "고기를 굽는 방법을 선택할 때",
    a1: { text: "전통 방식이나 기본 방식을 선택한다", tags: ["S"] },
    a2: { text: "특별한 방식이나 새로운 방식을 선택한다", tags: ["N"] },
  },
  {
    id: 12,
    q: "고기를 먹고 정말 맛있어서 공유하고 싶을 때",
    a1: { text: "즉시 후기를 공유하고 경험을 나눈다", tags: ["E"] },
    a2: { text: "조용히 혼자만의 맛집으로 간직한다", tags: ["I"] },
  },
]

export default function MeatGrillingTest() {
  const quizLogic = useQuizLogic({
    testId: "meat-grilling",
    questions,
    resultPath: "/tests/meat-grilling/test/result",
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

