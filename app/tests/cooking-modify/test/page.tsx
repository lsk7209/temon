"use client"

/**
 * Component: CookingModifyTest
 * 요리 수정 테스트 페이지
 * @example <CookingModifyTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "레시피를 따라 요리할 때",
    a1: { text: "레시피를 그대로 정확히 따른다", tags: ["S", "J"] },
    a2: { text: "레시피를 참고만 하고 자유롭게 수정한다", tags: ["N", "P"] },
  },
  {
    id: 2,
    q: "레시피 수정 이유",
    a1: { text: "맛을 개선하거나 취향에 맞추기 위해", tags: ["F", "S"] },
    a2: { text: "새로운 시도를 하거나 실험하기 위해", tags: ["T", "N"] },
  },
  {
    id: 3,
    q: "레시피를 수정할 때",
    a1: { text: "한 가지씩 조금씩 수정한다", tags: ["S", "J"] },
    a2: { text: "여러 가지를 한 번에 바꾼다", tags: ["N", "P"] },
  },
  {
    id: 4,
    q: "레시피 수정 결과",
    a1: { text: "수정한 내용을 기록하고 비교한다", tags: ["T", "J"] },
    a2: { text: "느낌으로 판단하고 기록하지 않는다", tags: ["F", "P"] },
  },
  {
    id: 5,
    q: "레시피 수정을 공유할 때",
    a1: { text: "즉시 다른 사람에게 알려준다", tags: ["E", "F"] },
    a2: { text: "혼자만 수정하고 공유하지 않는다", tags: ["I", "T"] },
  },
  {
    id: 6,
    q: "레시피 수정 기준",
    a1: { text: "과거 경험과 검증된 방법을 사용한다", tags: ["S", "J"] },
    a2: { text: "직감과 새로운 아이디어를 시도한다", tags: ["N", "P"] },
  },
  {
    id: 7,
    q: "레시피 수정이 실패했을 때",
    a1: { text: "원래 레시피로 돌아간다", tags: ["S", "J"] },
    a2: { text: "다른 방법을 계속 시도한다", tags: ["N", "P"] },
  },
  {
    id: 8,
    q: "레시피 수정 빈도",
    a1: { text: "같은 레시피를 여러 번 수정한다", tags: ["P", "N"] },
    a2: { text: "한 번 수정하면 그대로 유지한다", tags: ["J", "S"] },
  },
  {
    id: 9,
    q: "레시피 수정 계획",
    a1: { text: "미리 어떤 부분을 수정할지 계획한다", tags: ["J", "T"] },
    a2: { text: "요리하면서 즉흥적으로 수정한다", tags: ["P", "F"] },
  },
  {
    id: 10,
    q: "레시피 수정 후",
    a1: { text: "수정한 레시피를 정리하고 저장한다", tags: ["J", "S"] },
    a2: { text: "그냥 기억에만 남긴다", tags: ["P", "N"] },
  },
  {
    id: 11,
    q: "레시피 수정 스타일",
    a1: { text: "조금씩 신중하게 수정한다", tags: ["S", "J"] },
    a2: { text: "대담하게 크게 수정한다", tags: ["N", "P"] },
  },
  {
    id: 12,
    q: "레시피 수정 목적",
    a1: { text: "완벽한 레시피를 만들기 위해", tags: ["J", "T"] },
    a2: { text: "재미와 다양성을 위해", tags: ["P", "F"] },
  },
]

export default function CookingModifyTest() {
  const quizLogic = useQuizLogic({
    testId: "cooking-modify",
    questions,
    resultPath: "/tests/cooking-modify/test/result",
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
      colorClasses={getQuizColorScheme("emerald-teal")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
