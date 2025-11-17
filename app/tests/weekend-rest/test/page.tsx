"use client"

/**
 * Component: WeekendRestTest
 * 주말 휴식 테스트 페이지
 * @example <WeekendRestTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "주말에 에너지를 충전할 때",
    a1: { text: "미리 계획을 세운다", tags: ["J", "S"] },
    a2: { text: "그때그때 결정한다", tags: ["P", "N"] },
  },
  {
    id: 2,
    q: "주말에 완전히 쉬고 싶을 때",
    a1: { text: "계획대로 쉰다", tags: ["J", "T"] },
    a2: { text: "상황에 따라 조정한다", tags: ["P", "F"] },
  },
  {
    id: 3,
    q: "주말에 충전을 하는 방식",
    a1: { text: "혼자 조용히 충전한다", tags: ["I", "S"] },
    a2: { text: "사람들과 함께 충전한다", tags: ["E", "N"] },
  },
  {
    id: 4,
    q: "주말에 충전을 하는 시간",
    a1: { text: "정해진 시간에 충전한다", tags: ["J", "S"] },
    a2: { text: "그때그때 충전한다", tags: ["P", "N"] },
  },
  {
    id: 5,
    q: "주말에 충전을 하는 이유",
    a1: { text: "목표와 계획을 위해", tags: ["T", "J"] },
    a2: { text: "기분과 컨디션을 위해", tags: ["F", "P"] },
  },
  {
    id: 6,
    q: "주말에 충전 방식을 선택하는 기준",
    a1: { text: "효율성과 목표를 위해", tags: ["T", "J"] },
    a2: { text: "기분과 컨디션을 위해", tags: ["F", "P"] },
  },
  {
    id: 7,
    q: "주말 충전 목록이 쌓였을 때",
    a1: { text: "체계적으로 정리한다", tags: ["J", "T"] },
    a2: { text: "하나씩 처리한다", tags: ["P", "F"] },
  },
  {
    id: 8,
    q: "새로운 충전 방식을 시도할 때",
    a1: { text: "리뷰를 보고 신중하게 선택한다", tags: ["S", "I"] },
    a2: { text: "바로 시도해본다", tags: ["N", "E"] },
  },
  {
    id: 9,
    q: "주말에 충전을 하는 강도",
    a1: { text: "정해진 강도만 충전한다", tags: ["J", "T"] },
    a2: { text: "기분에 따라 강도가 달라진다", tags: ["P", "F"] },
  },
  {
    id: 10,
    q: "주말 충전 후 할 일",
    a1: { text: "즉시 할 일을 시작한다", tags: ["E", "J"] },
    a2: { text: "잠시 더 여유롭게 즐긴다", tags: ["I", "P"] },
  },
  {
    id: 11,
    q: "주말에 충전을 마무리할 때",
    a1: { text: "정해진 시간에 끝낸다", tags: ["J", "T"] },
    a2: { text: "완료할 때까지 충전한다", tags: ["P", "F"] },
  },
  {
    id: 12,
    q: "주말에 충전을 하는 환경",
    a1: { text: "조용하고 집중할 수 있는 곳", tags: ["I", "S"] },
    a2: { text: "활기차고 사람들이 있는 곳", tags: ["E", "N"] },
  },
]

export default function WeekendRestTest() {
  const quizLogic = useQuizLogic({
    testId: "weekend-rest",
    questions,
    resultPath: "/tests/weekend-rest/test/result",
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
      colorClasses={getQuizColorScheme("blue-purple")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}


