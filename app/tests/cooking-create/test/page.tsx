"use client"

/**
 * Component: CookingCreateTest
 * 요리 창조 테스트 페이지
 * @example <CookingCreateTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "새로운 레시피를 만들 때",
    a1: { text: "완전히 새로운 조합을 시도한다", tags: ["N", "P"] },
    a2: { text: "기존 레시피를 변형해서 만든다", tags: ["S", "J"] },
  },
  {
    id: 2,
    q: "레시피를 창조하는 방식",
    a1: { text: "느낌과 직감으로 재료를 선택한다", tags: ["F", "N"] },
    a2: { text: "과학적 원리와 비율을 고려한다", tags: ["T", "S"] },
  },
  {
    id: 3,
    q: "레시피를 기록할 때",
    a1: { text: "대략적으로만 기억하거나 기록한다", tags: ["P", "N"] },
    a2: { text: "정확한 계량과 순서를 기록한다", tags: ["J", "S"] },
  },
  {
    id: 4,
    q: "레시피가 실패했을 때",
    a1: { text: "즉시 다른 방법을 시도한다", tags: ["E", "P"] },
    a2: { text: "원인을 분석하고 다시 계획한다", tags: ["I", "J"] },
  },
  {
    id: 5,
    q: "레시피를 공유할 때",
    a1: { text: "즉시 친구들에게 알려준다", tags: ["E", "F"] },
    a2: { text: "완성도가 높아지면 공유한다", tags: ["I", "T"] },
  },
  {
    id: 6,
    q: "레시피 창조 영감",
    a1: { text: "새로운 음식이나 트렌드에서 얻는다", tags: ["N", "P"] },
    a2: { text: "과거 경험과 전통에서 얻는다", tags: ["S", "J"] },
  },
  {
    id: 7,
    q: "레시피를 개선할 때",
    a1: { text: "여러 번 시도하며 점진적으로 개선한다", tags: ["S", "J"] },
    a2: { text: "큰 변화를 주며 실험한다", tags: ["N", "P"] },
  },
  {
    id: 8,
    q: "레시피 창조 환경",
    a1: { text: "다른 사람과 함께 만들며 아이디어를 나눈다", tags: ["E", "F"] },
    a2: { text: "혼자 집중해서 만든다", tags: ["I", "T"] },
  },
  {
    id: 9,
    q: "레시피 준비",
    a1: { text: "미리 재료와 계획을 세운다", tags: ["J", "S"] },
    a2: { text: "그때그때 있는 재료로 만든다", tags: ["P", "N"] },
  },
  {
    id: 10,
    q: "레시피 완성 후",
    a1: { text: "즉시 다음 레시피를 생각한다", tags: ["E", "N"] },
    a2: { text: "이 레시피를 완벽하게 다듬는다", tags: ["I", "S"] },
  },
  {
    id: 11,
    q: "레시피 창조 목적",
    a1: { text: "새로운 경험과 재미를 위해", tags: ["N", "F"] },
    a2: { text: "실용적이고 효율적인 레시피를 위해", tags: ["S", "T"] },
  },
  {
    id: 12,
    q: "레시피 창조 스타일",
    a1: { text: "자유롭고 유연하게 창조한다", tags: ["P", "N"] },
    a2: { text: "체계적이고 계획적으로 창조한다", tags: ["J", "S"] },
  },
]

export default function CookingCreateTest() {
  const quizLogic = useQuizLogic({
    testId: "cooking-create",
    questions,
    resultPath: "/tests/cooking-create/test/result",
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
      colorClasses={getQuizColorScheme("red-orange-yellow")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
