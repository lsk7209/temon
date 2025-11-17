"use client"

/**
 * Component: WeekendSocialTest
 * 주말 모임 테스트 페이지
 * @example <WeekendSocialTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "주말 모임에 갈 때",
    a1: { text: "미리 계획을 세운다", tags: ["J", "S"] },
    a2: { text: "그때그때 결정한다", tags: ["P", "N"] },
  },
  {
    id: 2,
    q: "주말 모임에서 시간이 지날 때",
    a1: { text: "정해진 시간에 떠난다", tags: ["J", "T"] },
    a2: { text: "분위기에 따라 남는다", tags: ["P", "F"] },
  },
  {
    id: 3,
    q: "주말 모임에서 대화할 때",
    a1: { text: "정해진 주제로 대화한다", tags: ["S", "J"] },
    a2: { text: "자유롭게 대화한다", tags: ["N", "P"] },
  },
  {
    id: 4,
    q: "주말 모임에 참여하는 방식",
    a1: { text: "혼자 조용히 참여한다", tags: ["I", "S"] },
    a2: { text: "적극적으로 참여한다", tags: ["E", "N"] },
  },
  {
    id: 5,
    q: "주말 모임에 가는 시간",
    a1: { text: "정해진 시간에 간다", tags: ["J", "S"] },
    a2: { text: "그때그때 간다", tags: ["P", "N"] },
  },
  {
    id: 6,
    q: "주말 모임에 가는 이유",
    a1: { text: "목표와 계획을 위해", tags: ["T", "J"] },
    a2: { text: "기분과 컨디션을 위해", tags: ["F", "P"] },
  },
  {
    id: 7,
    q: "주말 모임에서 새로운 사람을 만날 때",
    a1: { text: "신중하게 접근한다", tags: ["S", "I"] },
    a2: { text: "즉시 친해진다", tags: ["N", "E"] },
  },
  {
    id: 8,
    q: "주말 모임에서 갑자기 계획이 바뀔 때",
    a1: { text: "계획대로 진행하려 한다", tags: ["J", "S"] },
    a2: { text: "유연하게 대처한다", tags: ["P", "N"] },
  },
  {
    id: 9,
    q: "주말 모임에서 참여하는 강도",
    a1: { text: "정해진 강도만 참여한다", tags: ["J", "T"] },
    a2: { text: "기분에 따라 강도가 달라진다", tags: ["P", "F"] },
  },
  {
    id: 10,
    q: "주말 모임 후 할 일",
    a1: { text: "즉시 할 일을 시작한다", tags: ["E", "J"] },
    a2: { text: "잠시 더 여유롭게 즐긴다", tags: ["I", "P"] },
  },
  {
    id: 11,
    q: "주말 모임을 선택하는 기준",
    a1: { text: "효율성과 목표를 위해", tags: ["T", "J"] },
    a2: { text: "기분과 컨디션을 위해", tags: ["F", "P"] },
  },
  {
    id: 12,
    q: "주말 모임에 가는 환경",
    a1: { text: "조용하고 집중할 수 있는 곳", tags: ["I", "S"] },
    a2: { text: "활기차고 사람들이 많은 곳", tags: ["E", "N"] },
  },
]

export default function WeekendSocialTest() {
  const quizLogic = useQuizLogic({
    testId: "weekend-social",
    questions,
    resultPath: "/tests/weekend-social/test/result",
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
      colorClasses={getQuizColorScheme("blue-cyan")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
