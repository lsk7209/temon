"use client"

/**
 * Component: MorningCommuteTest
 * 아침 출근길 테스트 페이지
 * @example <MorningCommuteTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "지하철에서 자리가 보였을 때",
    a1: { text: "바로 앉는다", tags: ["T", "J"] },
    a2: { text: "다른 사람에게 양보한다", tags: ["F", "P"] },
  },
  {
    id: 2,
    q: "버스가 지나갔을 때",
    a1: { text: "다음 버스를 기다린다", tags: ["S", "J"] },
    a2: { text: "다른 방법을 찾는다", tags: ["N", "P"] },
  },
  {
    id: 3,
    q: "출근길에 지각할 것 같을 때",
    a1: { text: "빠르게 이동한다", tags: ["T", "J"] },
    a2: { text: "여유롭게 간다", tags: ["F", "P"] },
  },
  {
    id: 4,
    q: "출근길에 할 일을 정할 때",
    a1: { text: "미리 계획한다", tags: ["J", "S"] },
    a2: { text: "그때그때 한다", tags: ["P", "N"] },
  },
  {
    id: 5,
    q: "출근길에 사람이 많을 때",
    a1: { text: "조용히 기다린다", tags: ["I", "S"] },
    a2: { text: "다른 곳으로 이동한다", tags: ["E", "N"] },
  },
  {
    id: 6,
    q: "출근길에 시간이 남을 때",
    a1: { text: "일을 하거나 계획을 세운다", tags: ["T", "J"] },
    a2: { text: "여유롭게 쉰다", tags: ["F", "P"] },
  },
  {
    id: 7,
    q: "출근길에 핸드폰을 사용할 때",
    a1: { text: "일을 하거나 메시지를 확인한다", tags: ["T", "E"] },
    a2: { text: "음악을 듣거나 여유롭게 즐긴다", tags: ["F", "I"] },
  },
  {
    id: 8,
    q: "출근길에 새로운 경로를 발견했을 때",
    a1: { text: "신중하게 검토 후 시도한다", tags: ["S", "I"] },
    a2: { text: "바로 시도해본다", tags: ["N", "E"] },
  },
  {
    id: 9,
    q: "출근길에 교통이 막혔을 때",
    a1: { text: "참고 기다린다", tags: ["J", "S"] },
    a2: { text: "다른 경로를 찾는다", tags: ["P", "N"] },
  },
  {
    id: 10,
    q: "출근길에 만난 사람과 대화할 때",
    a1: { text: "즐겁게 대화한다", tags: ["E", "F"] },
    a2: { text: "조용히 혼자만의 시간을 즐긴다", tags: ["I", "T"] },
  },
  {
    id: 11,
    q: "출근길에 스트레스를 받을 때",
    a1: { text: "참고 견딘다", tags: ["T", "S"] },
    a2: { text: "기분 전환을 한다", tags: ["F", "N"] },
  },
  {
    id: 12,
    q: "출근길에 도착했을 때",
    a1: { text: "즉시 할 일을 시작한다", tags: ["E", "J"] },
    a2: { text: "잠시 더 여유롭게 준비한다", tags: ["I", "P"] },
  },
]

export default function MorningCommuteTest() {
  const quizLogic = useQuizLogic({
    testId: "morning-commute",
    questions,
    resultPath: "/tests/morning-commute/test/result",
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
      colorClasses={getQuizColorScheme("blue-indigo")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
