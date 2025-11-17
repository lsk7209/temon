"use client"

/**
 * Component: CookingSharedTest
 * 함께 요리 테스트 페이지
 * @example <CookingSharedTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "다른 사람과 함께 요리할 때",
    a1: { text: "즐겁고 활기차다", tags: ["E", "F"] },
    a2: { text: "불편하고 집중이 안 된다", tags: ["I", "T"] },
  },
  {
    id: 2,
    q: "함께 요리할 때 역할 분담",
    a1: { text: "역할을 정하고 체계적으로 진행한다", tags: ["J", "T"] },
    a2: { text: "즉흥적으로 협력하며 진행한다", tags: ["P", "F"] },
  },
  {
    id: 3,
    q: "함께 요리할 때 의견 충돌",
    a1: { text: "즉시 대화로 해결한다", tags: ["E", "F"] },
    a2: { text: "신중하게 논리적으로 해결한다", tags: ["I", "T"] },
  },
  {
    id: 4,
    q: "함께 요리할 때 소통",
    a1: { text: "적극적으로 대화하며 요리한다", tags: ["E", "F"] },
    a2: { text: "필요할 때만 최소한으로 소통한다", tags: ["I", "T"] },
  },
  {
    id: 5,
    q: "함께 요리할 때 계획",
    a1: { text: "미리 메뉴와 역할을 계획한다", tags: ["J", "S"] },
    a2: { text: "그때그때 즉흥적으로 결정한다", tags: ["P", "N"] },
  },
  {
    id: 6,
    q: "함께 요리할 때 실수",
    a1: { text: "즐겁게 웃으며 넘어간다", tags: ["E", "F"] },
    a2: { text: "원인을 분석하고 수정한다", tags: ["I", "T"] },
  },
  {
    id: 7,
    q: "함께 요리할 때 레시피",
    a1: { text: "새로운 레시피를 함께 시도한다", tags: ["N", "P"] },
    a2: { text: "익숙한 레시피를 함께 만든다", tags: ["S", "J"] },
  },
  {
    id: 8,
    q: "함께 요리할 때 분위기",
    a1: { text: "활기차고 즐거운 분위기를 만든다", tags: ["E", "F"] },
    a2: { text: "조용하고 집중하는 분위기를 선호한다", tags: ["I", "T"] },
  },
  {
    id: 9,
    q: "함께 요리할 때 준비",
    a1: { text: "미리 재료와 역할을 준비한다", tags: ["J", "S"] },
    a2: { text: "그때그때 함께 준비한다", tags: ["P", "N"] },
  },
  {
    id: 10,
    q: "함께 요리할 때 완성",
    a1: { text: "즉시 함께 먹으며 즐긴다", tags: ["E", "F"] },
    a2: { text: "완성도를 확인하고 나서 먹는다", tags: ["I", "T"] },
  },
  {
    id: 11,
    q: "함께 요리할 때 스타일",
    a1: { text: "계획적이고 체계적으로 협력한다", tags: ["J", "T"] },
    a2: { text: "자유롭고 즉흥적으로 협력한다", tags: ["P", "F"] },
  },
  {
    id: 12,
    q: "함께 요리할 때 만족도",
    a1: { text: "다른 사람과 함께하는 게 더 좋다", tags: ["E", "F"] },
    a2: { text: "혼자 요리하는 게 더 편하다", tags: ["I", "T"] },
  },
]

export default function CookingSharedTest() {
  const quizLogic = useQuizLogic({
    testId: "cooking-shared",
    questions,
    resultPath: "/tests/cooking-shared/test/result",
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
      colorClasses={getQuizColorScheme("cyan-blue")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
