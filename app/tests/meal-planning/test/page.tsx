"use client"

/**
 * Component: MealPlanningTest
 * 식사 계획 테스트 페이지
 * @example <MealPlanningTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "식사 계획을 세울 때",
    a1: { text: "일주일 단위로 미리 계획한다", tags: ["J", "S"] },
    a2: { text: "그날그날 계획하거나 계획하지 않는다", tags: ["P", "N"] },
  },
  {
    id: 2,
    q: "식사 계획 방식",
    a1: { text: "메뉴, 재료, 시간을 정확히 계획한다", tags: ["J", "T"] },
    a2: { text: "대략적으로만 생각한다", tags: ["P", "F"] },
  },
  {
    id: 3,
    q: "식사 계획 기준",
    a1: { text: "영양, 비용, 시간 등을 고려한다", tags: ["T", "S"] },
    a2: { text: "기분과 취향으로 결정한다", tags: ["F", "N"] },
  },
  {
    id: 4,
    q: "식사 계획 변경",
    a1: { text: "계획을 지키려고 노력한다", tags: ["J", "S"] },
    a2: { text: "상황에 따라 쉽게 변경한다", tags: ["P", "N"] },
  },
  {
    id: 5,
    q: "식사 계획 공유",
    a1: { text: "가족이나 친구와 함께 계획한다", tags: ["E", "F"] },
    a2: { text: "혼자 계획한다", tags: ["I", "T"] },
  },
  {
    id: 6,
    q: "식사 계획 기록",
    a1: { text: "계획을 기록하고 관리한다", tags: ["J", "S"] },
    a2: { text: "기록하지 않고 기억에만 의존한다", tags: ["P", "N"] },
  },
  {
    id: 7,
    q: "식사 계획 준비",
    a1: { text: "미리 재료를 준비하고 계획한다", tags: ["J", "S"] },
    a2: { text: "그때그때 준비한다", tags: ["P", "N"] },
  },
  {
    id: 8,
    q: "식사 계획 실패",
    a1: { text: "계획을 다시 세우고 수정한다", tags: ["J", "T"] },
    a2: { text: "그냥 다른 음식을 먹는다", tags: ["P", "F"] },
  },
  {
    id: 9,
    q: "식사 계획 패턴",
    a1: { text: "같은 패턴을 반복한다", tags: ["S", "J"] },
    a2: { text: "다양한 패턴을 시도한다", tags: ["N", "P"] },
  },
  {
    id: 10,
    q: "식사 계획 완성도",
    a1: { text: "계획대로 실행하는 게 중요하다", tags: ["J", "T"] },
    a2: { text: "계획은 참고용일 뿐이다", tags: ["P", "F"] },
  },
  {
    id: 11,
    q: "식사 계획 스트레스",
    a1: { text: "계획을 세우는 게 편하다", tags: ["J", "S"] },
    a2: { text: "계획을 세우는 게 부담스럽다", tags: ["P", "N"] },
  },
  {
    id: 12,
    q: "식사 계획 스타일",
    a1: { text: "체계적이고 계획적으로 식사한다", tags: ["J", "T"] },
    a2: { text: "즉흥적이고 유연하게 식사한다", tags: ["P", "F"] },
  },
]

export default function MealPlanningTest() {
  const quizLogic = useQuizLogic({
    testId: "meal-planning",
    questions,
    resultPath: "/tests/meal-planning/test/result",
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
      colorClasses={getQuizColorScheme("blue-indigo-purple")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
