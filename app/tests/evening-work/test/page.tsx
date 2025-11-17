"use client"

/**
 * Component: EveningWorkTest
 * 저녁 업무 테스트 페이지
 * @example <EveningWorkTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "저녁에 업무를 해야 할 때",
    a1: { text: "즉시 시작한다", tags: ["E", "J"] },
    a2: { text: "잠시 쉬고 시작한다", tags: ["I", "P"] },
  },
  {
    id: 2,
    q: "저녁 업무를 마무리할 때",
    a1: { text: "정해진 시간에 끝낸다", tags: ["J", "T"] },
    a2: { text: "완료할 때까지 한다", tags: ["P", "F"] },
  },
  {
    id: 3,
    q: "저녁에 업무를 할 때",
    a1: { text: "정해진 순서대로 한다", tags: ["S", "J"] },
    a2: { text: "우선순위에 따라 한다", tags: ["N", "P"] },
  },
  {
    id: 4,
    q: "저녁에 업무를 하는 환경",
    a1: { text: "조용하고 집중할 수 있는 곳", tags: ["I", "S"] },
    a2: { text: "활기차고 사람들이 있는 곳", tags: ["E", "N"] },
  },
  {
    id: 5,
    q: "저녁에 업무를 하는 이유",
    a1: { text: "목표와 계획을 위해", tags: ["T", "J"] },
    a2: { text: "기분과 컨디션을 위해", tags: ["F", "P"] },
  },
  {
    id: 6,
    q: "저녁 업무 후 기분",
    a1: { text: "성취감을 느낀다", tags: ["E", "T"] },
    a2: { text: "피로감을 느낀다", tags: ["I", "F"] },
  },
  {
    id: 7,
    q: "저녁에 업무가 쌓였을 때",
    a1: { text: "체계적으로 정리한다", tags: ["J", "T"] },
    a2: { text: "하나씩 처리한다", tags: ["P", "F"] },
  },
  {
    id: 8,
    q: "저녁에 새로운 업무가 생겼을 때",
    a1: { text: "즉시 시작한다", tags: ["E", "N"] },
    a2: { text: "신중하게 고려한다", tags: ["I", "S"] },
  },
  {
    id: 9,
    q: "저녁에 업무를 하는 시간",
    a1: { text: "정해진 시간에 한다", tags: ["J", "S"] },
    a2: { text: "그때그때 한다", tags: ["P", "N"] },
  },
  {
    id: 10,
    q: "저녁 업무 후 할 일",
    a1: { text: "즉시 할 일을 시작한다", tags: ["E", "J"] },
    a2: { text: "잠시 더 여유롭게 즐긴다", tags: ["I", "P"] },
  },
  {
    id: 11,
    q: "저녁에 업무를 선택하는 기준",
    a1: { text: "효율성과 목표를 위해", tags: ["T", "J"] },
    a2: { text: "기분과 관계를 위해", tags: ["F", "P"] },
  },
  {
    id: 12,
    q: "저녁에 업무를 처리하는 방식",
    a1: { text: "논리적이고 체계적으로", tags: ["T", "S"] },
    a2: { text: "감성적이고 자유롭게", tags: ["F", "N"] },
  },
]

export default function EveningWorkTest() {
  const quizLogic = useQuizLogic({
    testId: "evening-work",
    questions,
    resultPath: "/tests/evening-work/test/result",
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
      colorClasses={getQuizColorScheme("slate-gray")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
