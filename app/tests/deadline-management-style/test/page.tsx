"use client"

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "마감이 생기면 가장 먼저 하는 일은?",
    a1: { text: "상황을 기준으로 체계적으로 선택한다", tags: ["E"] },
    a2: { text: "감각/직관을 믿고 유연하게 선택한다", tags: ["I"] },
  },
  {
    id: 2,
    q: "작업 분량을 나누는 기준은?",
    a1: { text: "상황을 기준으로 체계적으로 선택한다", tags: ["S"] },
    a2: { text: "감각/직관을 믿고 유연하게 선택한다", tags: ["N"] },
  },
  {
    id: 3,
    q: "예상보다 지연될 때 대처는?",
    a1: { text: "상황을 기준으로 체계적으로 선택한다", tags: ["T"] },
    a2: { text: "감각/직관을 믿고 유연하게 선택한다", tags: ["F"] },
  },
  {
    id: 4,
    q: "집중 시간이 깨질 때 복구 방법은?",
    a1: { text: "상황을 기준으로 체계적으로 선택한다", tags: ["J"] },
    a2: { text: "감각/직관을 믿고 유연하게 선택한다", tags: ["P"] },
  },
  {
    id: 5,
    q: "멀티태스킹 vs 단일태스킹 선호는?",
    a1: { text: "상황을 기준으로 체계적으로 선택한다", tags: ["E"] },
    a2: { text: "감각/직관을 믿고 유연하게 선택한다", tags: ["I"] },
  },
  {
    id: 6,
    q: "중간 점검을 하는 빈도는?",
    a1: { text: "상황을 기준으로 체계적으로 선택한다", tags: ["S"] },
    a2: { text: "감각/직관을 믿고 유연하게 선택한다", tags: ["N"] },
  },
  {
    id: 7,
    q: "막판 품질 점검에 쓰는 시간은?",
    a1: { text: "상황을 기준으로 체계적으로 선택한다", tags: ["T"] },
    a2: { text: "감각/직관을 믿고 유연하게 선택한다", tags: ["F"] },
  },
  {
    id: 8,
    q: "협업 의존 작업에서 내 역할은?",
    a1: { text: "상황을 기준으로 체계적으로 선택한다", tags: ["J"] },
    a2: { text: "감각/직관을 믿고 유연하게 선택한다", tags: ["P"] },
  },
  {
    id: 9,
    q: "리스크를 발견하면 공유 타이밍은?",
    a1: { text: "상황을 기준으로 체계적으로 선택한다", tags: ["E"] },
    a2: { text: "감각/직관을 믿고 유연하게 선택한다", tags: ["I"] },
  },
  {
    id: 10,
    q: "마감 후 회고를 하는가?",
    a1: { text: "상황을 기준으로 체계적으로 선택한다", tags: ["S"] },
    a2: { text: "감각/직관을 믿고 유연하게 선택한다", tags: ["N"] },
  },
  {
    id: 11,
    q: "반복되는 지연 원인 기록 여부는?",
    a1: { text: "상황을 기준으로 체계적으로 선택한다", tags: ["T"] },
    a2: { text: "감각/직관을 믿고 유연하게 선택한다", tags: ["F"] },
  },
  {
    id: 12,
    q: "이상적인 마감 문화는?",
    a1: { text: "상황을 기준으로 체계적으로 선택한다", tags: ["J"] },
    a2: { text: "감각/직관을 믿고 유연하게 선택한다", tags: ["P"] },
  }
]

export default function DeadlineManagementStyleTestPage() {
  const quizLogic = useQuizLogic({
    testId: "deadline-management-style",
    questions,
    resultPath: "/tests/deadline-management-style/test/result",
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
      colorClasses={getQuizColorScheme("green-emerald-teal")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
