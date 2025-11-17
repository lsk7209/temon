"use client"

/**
 * Component: CookingFollowTest
 * 요리 따라하기 테스트 페이지
 * @example <CookingFollowTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "레시피를 처음 따라할 때",
    a1: { text: "레시피를 정확히 그대로 따른다", tags: ["S", "J"] },
    a2: { text: "레시피를 참고만 하고 자유롭게 만든다", tags: ["N", "P"] },
  },
  {
    id: 2,
    q: "레시피 계량",
    a1: { text: "정확한 계량을 사용한다", tags: ["S", "J"] },
    a2: { text: "대략적인 계량으로 만든다", tags: ["N", "P"] },
  },
  {
    id: 3,
    q: "레시피 순서",
    a1: { text: "레시피 순서를 정확히 따른다", tags: ["J", "S"] },
    a2: { text: "순서를 바꿔도 괜찮다고 생각한다", tags: ["P", "N"] },
  },
  {
    id: 4,
    q: "레시피에 없는 재료가 있을 때",
    a1: { text: "재료를 사러 가거나 레시피를 바꾼다", tags: ["J", "S"] },
    a2: { text: "비슷한 재료로 대체해서 만든다", tags: ["P", "N"] },
  },
  {
    id: 5,
    q: "레시피를 따라 요리할 때",
    a1: { text: "다른 사람과 함께 따라하며 즐긴다", tags: ["E", "F"] },
    a2: { text: "혼자 집중해서 따라한다", tags: ["I", "T"] },
  },
  {
    id: 6,
    q: "레시피 선택",
    a1: { text: "검증된 익숙한 레시피를 선택한다", tags: ["S", "J"] },
    a2: { text: "새로운 레시피를 시도한다", tags: ["N", "P"] },
  },
  {
    id: 7,
    q: "레시피 실패",
    a1: { text: "레시피를 다시 확인하고 정확히 따른다", tags: ["S", "J"] },
    a2: { text: "레시피를 수정하거나 다른 방법을 시도한다", tags: ["N", "P"] },
  },
  {
    id: 8,
    q: "레시피 기록",
    a1: { text: "레시피를 정확히 기록하고 보관한다", tags: ["J", "S"] },
    a2: { text: "대략적으로만 기억하거나 기록하지 않는다", tags: ["P", "N"] },
  },
  {
    id: 9,
    q: "레시피 준비",
    a1: { text: "미리 재료를 준비하고 레시피를 읽는다", tags: ["J", "S"] },
    a2: { text: "그때그때 레시피를 보며 만든다", tags: ["P", "N"] },
  },
  {
    id: 10,
    q: "레시피 완성도",
    a1: { text: "레시피대로 완벽하게 만드는 게 중요하다", tags: ["J", "T"] },
    a2: { text: "맛있으면 레시피와 다르더라도 괜찮다", tags: ["P", "F"] },
  },
  {
    id: 11,
    q: "레시피 공유",
    a1: { text: "레시피를 정확히 공유한다", tags: ["J", "T"] },
    a2: { text: "대략적으로만 공유하거나 공유하지 않는다", tags: ["P", "F"] },
  },
  {
    id: 12,
    q: "레시피 따르기 스타일",
    a1: { text: "정확하고 체계적으로 레시피를 따른다", tags: ["J", "S"] },
    a2: { text: "유연하고 자유롭게 레시피를 따른다", tags: ["P", "N"] },
  },
]

export default function CookingFollowTest() {
  const quizLogic = useQuizLogic({
    testId: "cooking-follow",
    questions,
    resultPath: "/tests/cooking-follow/test/result",
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
      colorClasses={getQuizColorScheme("violet-purple-fuchsia")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
