"use client"

/**
 * Component: CookingImproviseTest
 * 즉흥 요리 테스트 페이지
 * @example <CookingImproviseTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "냉장고를 열어보니 계란, 양파, 당근만 있는데 배가 너무 고플 때",
    a1: { text: "즉흥적으로 조합해서 볶음밥을 만든다", tags: ["P", "N"] },
    a2: { text: "기존 레시피를 참고해서 만든다", tags: ["J", "S"] },
  },
  {
    id: 2,
    q: "즉흥 요리를 시작하려고 하는데 뭘 만들지 정해지지 않았을 때",
    a1: { text: "계획 없이 바로 시작한다", tags: ["P", "F"] },
    a2: { text: "대략적인 계획을 세운다", tags: ["J", "T"] },
  },
  {
    id: 3,
    q: "즉흥 요리 중에 '고춧가루'가 필요한데 집에 없을 때",
    a1: { text: "다른 매운 양념으로 대체해서 계속한다", tags: ["P", "N"] },
    a2: { text: "고춧가루를 사러 가거나 중단한다", tags: ["J", "S"] },
  },
  {
    id: 4,
    q: "즉흥 요리를 하다가 맛을 보니 너무 밋밋할 때",
    a1: { text: "느낌으로 간을 맞춘다", tags: ["F", "P"] },
    a2: { text: "계량을 하거나 비율을 고려한다", tags: ["T", "J"] },
  },
  {
    id: 5,
    q: "즉흥 요리를 완성했는데 정말 맛있어서 놀랐을 때",
    a1: { text: "즉시 친구들에게 알려준다", tags: ["E", "F"] },
    a2: { text: "혼자 먹고 다음에 개선한다", tags: ["I", "T"] },
  },
  {
    id: 6,
    q: "즉흥 요리를 했는데 완전히 실패해서 맛이 이상할 때",
    a1: { text: "그냥 먹거나 버린다", tags: ["P", "F"] },
    a2: { text: "원인을 분석하고 다시 시도한다", tags: ["J", "T"] },
  },
  {
    id: 7,
    q: "즉흥 요리를 완성하고 나서 친구가 '레시피 알려줘!'라고 할 때",
    a1: { text: "대략적으로만 기억해서 설명한다", tags: ["P", "N"] },
    a2: { text: "레시피를 정리해서 기록해서 준다", tags: ["J", "S"] },
  },
  {
    id: 8,
    q: "즉흥 요리를 할 때 친구가 와서 '나도 같이 만들고 싶어!'라고 할 때",
    a1: { text: "즉시 함께 즉흥 요리를 즐긴다", tags: ["E", "F"] },
    a2: { text: "혼자 집중해서 즉흥 요리를 한다", tags: ["I", "T"] },
  },
  {
    id: 9,
    q: "친구가 '즉흥 요리를 얼마나 자주 해?'라고 물어볼 때",
    a1: { text: "자주 즉흥 요리를 한다고 말한다", tags: ["P", "N"] },
    a2: { text: "가끔만 즉흥 요리를 한다고 말한다", tags: ["J", "S"] },
  },
  {
    id: 10,
    q: "즉흥 요리를 할 때 새로운 아이디어가 떠오를 때",
    a1: { text: "새로운 조합과 아이디어를 시도한다", tags: ["N", "P"] },
    a2: { text: "과거 경험을 바탕으로 만든다", tags: ["S", "J"] },
  },
  {
    id: 11,
    q: "즉흥 요리를 할 때 요리 스타일을 선택할 때",
    a1: { text: "자유롭고 창의적으로 요리한다", tags: ["P", "N"] },
    a2: { text: "기본 원리는 지키며 요리한다", tags: ["J", "S"] },
  },
  {
    id: 12,
    q: "친구가 '왜 즉흥 요리를 해?'라고 물어볼 때",
    a1: { text: "재미와 새로운 경험을 위해 한다고 말한다", tags: ["P", "F"] },
    a2: { text: "효율적이고 실용적인 식사를 위해 한다고 말한다", tags: ["J", "T"] },
  },
]

export default function CookingImproviseTest() {
  const quizLogic = useQuizLogic({
    testId: "cooking-improvise",
    questions,
    resultPath: "/tests/cooking-improvise/test/result",
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
