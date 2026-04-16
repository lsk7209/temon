"use client"

/**
 * Component: CookingSoloTest
 * 혼자 요리 테스트 페이지
 * @example <CookingSoloTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "혼자 요리를 선택할 때",
    a1: { text: "혼자 요리하는 게 편하고 좋다", tags: ["I", "J"] },
    a2: { text: "다른 사람과 함께 요리하는 게 좋다", tags: ["E", "P"] },
  },
  {
    id: 2,
    q: "혼자 요리할 때",
    a1: { text: "계획을 세우고 체계적으로 요리한다", tags: ["J", "T"] },
    a2: { text: "즉흥적으로 자유롭게 요리한다", tags: ["P", "F"] },
  },
  {
    id: 3,
    q: "혼자 요리 중 집중",
    a1: { text: "완전히 집중해서 요리한다", tags: ["I", "S"] },
    a2: { text: "TV나 음악을 보며 요리한다", tags: ["E", "N"] },
  },
  {
    id: 4,
    q: "혼자 요리 중 실수",
    a1: { text: "신중하게 확인하고 진행한다", tags: ["I", "J"] },
    a2: { text: "빠르게 수정하고 계속 진행한다", tags: ["E", "P"] },
  },
  {
    id: 5,
    q: "혼자 요리 후",
    a1: { text: "혼자만의 시간을 즐긴다", tags: ["I", "F"] },
    a2: { text: "사진을 찍어 공유하거나 친구를 부른다", tags: ["E", "P"] },
  },
  {
    id: 6,
    q: "혼자 요리 레시피",
    a1: { text: "익숙한 레시피를 반복한다", tags: ["S", "J"] },
    a2: { text: "새로운 레시피를 시도한다", tags: ["N", "P"] },
  },
  {
    id: 7,
    q: "혼자 요리 분량",
    a1: { text: "정확한 분량만 만든다", tags: ["J", "T"] },
    a2: { text: "많이 만들어서 나눠 먹는다", tags: ["P", "F"] },
  },
  {
    id: 8,
    q: "혼자 요리 시간",
    a1: { text: "정해진 시간에 요리한다", tags: ["J", "S"] },
    a2: { text: "기분에 따라 요리한다", tags: ["P", "N"] },
  },
  {
    id: 9,
    q: "혼자 요리 준비",
    a1: { text: "미리 재료와 계획을 준비한다", tags: ["J", "S"] },
    a2: { text: "그때그때 있는 재료로 만든다", tags: ["P", "N"] },
  },
  {
    id: 10,
    q: "혼자 요리 이유",
    a1: { text: "집중하고 편안하게 요리하기 위해", tags: ["I", "T"] },
    a2: { text: "자유롭고 창의적으로 요리하기 위해", tags: ["E", "F"] },
  },
  {
    id: 11,
    q: "혼자 요리 스타일",
    a1: { text: "체계적이고 계획적으로 요리한다", tags: ["J", "T"] },
    a2: { text: "자유롭고 즉흥적으로 요리한다", tags: ["P", "F"] },
  },
  {
    id: 12,
    q: "혼자 요리 만족도",
    a1: { text: "혼자 요리하는 게 만족스럽다", tags: ["I", "S"] },
    a2: { text: "다른 사람과 함께하는 게 더 좋다", tags: ["E", "N"] },
  },
]

export default function CookingSoloTest() {
  const quizLogic = useQuizLogic({
    testId: "cooking-solo",
    questions,
    resultPath: "/tests/cooking-solo/test/result",
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
