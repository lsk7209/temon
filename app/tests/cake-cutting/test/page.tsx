"use client"

/**
 * Component: CakeCuttingTest
 * 케이크 자르기 테스트 페이지
 * @example <CakeCuttingTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "생일 케이크를 자를 때",
    a1: { text: "정확하게 균등하게 체계적으로 자른다", tags: ["J"] },
    a2: { text: "대충 자연스럽게 자른다", tags: ["P"] },
  },
  {
    id: 2,
    q: "케이크 조각을 선택할 때",
    a1: { text: "예쁜 조각이나 장식 있는 조각을 선택한다", tags: ["F"] },
    a2: { text: "큰 조각이나 많이 먹을 수 있는 조각을 선택한다", tags: ["T"] },
  },
  {
    id: 3,
    q: "케이크를 여러 조각으로 자를 때",
    a1: { text: "정해진 순서로 체계적으로 자른다", tags: ["J"] },
    a2: { text: "그때그때 유연하게 자른다", tags: ["P"] },
  },
  {
    id: 4,
    q: "케이크를 자르다가 장식이 예쁠 때",
    a1: { text: "장식을 보존해서 예쁘게 자른다", tags: ["F"] },
    a2: { text: "맛 중심으로 효율적으로 자른다", tags: ["T"] },
  },
  {
    id: 5,
    q: "케이크를 여러 명에게 나눠줄 때",
    a1: { text: "공평하게 모두에게 나눠준다", tags: ["F"] },
    a2: { text: "그때그때 자연스럽게 나눠준다", tags: ["T"] },
  },
  {
    id: 6,
    q: "케이크를 먹을 때 순서를 정할 때",
    a1: { text: "정해진 순서로 체계적으로 먹는다", tags: ["J"] },
    a2: { text: "그때그때 유연하게 먹는다", tags: ["P"] },
  },
  {
    id: 7,
    q: "케이크를 자를 때",
    a1: { text: "혼자 조용히 자른다", tags: ["I"] },
    a2: { text: "사람들과 함께 자른다", tags: ["E"] },
  },
  {
    id: 8,
    q: "케이크를 선택할 때",
    a1: { text: "예쁜 케이크나 장식이 많은 케이크를 선택한다", tags: ["S"] },
    a2: { text: "특별한 케이크나 의미 있는 케이크를 선택한다", tags: ["N"] },
  },
  {
    id: 9,
    q: "케이크를 자르기 전에 계획을 세울 때",
    a1: { text: "미리 계획하고 목표를 정한다", tags: ["J"] },
    a2: { text: "즉흥적으로 그때그때 자른다", tags: ["P"] },
  },
  {
    id: 10,
    q: "케이크를 먹다가 정말 맛있어서 기분이 좋을 때",
    a1: { text: "즐거워서 친구들에게 알려준다", tags: ["E"] },
    a2: { text: "평온하게 조용히 즐긴다", tags: ["I"] },
  },
  {
    id: 11,
    q: "케이크를 선택할 때 이유를 생각할 때",
    a1: { text: "감성과 의미 때문에 선택한다", tags: ["F"] },
    a2: { text: "효율과 실용 때문에 선택한다", tags: ["T"] },
  },
  {
    id: 12,
    q: "케이크를 먹고 정말 맛있어서 공유하고 싶을 때",
    a1: { text: "즉시 후기를 공유하고 경험을 나눈다", tags: ["E"] },
    a2: { text: "조용히 혼자만의 맛집으로 간직한다", tags: ["I"] },
  },
]

export default function CakeCuttingTest() {
  const quizLogic = useQuizLogic({
    testId: "cake-cutting",
    questions,
    resultPath: "/tests/cake-cutting/test/result",
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
      colorClasses={getQuizColorScheme("pink-rose")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}

