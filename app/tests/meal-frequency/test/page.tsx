"use client"

/**
 * Component: MealFrequencyTest
 * 식사 빈도 테스트 페이지
 * @example <MealFrequencyTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "아침에 일어나서 배가 고픈데 점심시간까지 3시간 남았을 때",
    a1: { text: "규칙적으로 3끼를 먹기 위해 참고 기다린다", tags: ["J", "S"] },
    a2: { text: "기분에 따라 간단히 먹고 나중에 다시 먹는다", tags: ["P", "N"] },
  },
  {
    id: 2,
    q: "점심시간이 12시인데 11시 30분에 배가 너무 고파서 참을 수 없을 때",
    a1: { text: "정해진 시간인 12시까지 기다린다", tags: ["J", "S"] },
    a2: { text: "배고플 때 바로 먹는다", tags: ["P", "N"] },
  },
  {
    id: 3,
    q: "평소 아침 8시에 먹는데 주말에 늦잠을 자서 10시에 일어났을 때",
    a1: { text: "일정한 패턴을 유지하기 위해 아침식사를 건너뛴다", tags: ["S", "J"] },
    a2: { text: "상황에 맞춰 늦은 아침식사를 한다", tags: ["N", "P"] },
  },
  {
    id: 4,
    q: "다음 주 식사 일정을 친구가 '언제 먹을 거야?'라고 물어볼 때",
    a1: { text: "미리 식사 계획을 세워서 알려준다", tags: ["J", "T"] },
    a2: { text: "그때그때 결정한다고 말한다", tags: ["P", "F"] },
  },
  {
    id: 5,
    q: "친구가 '왜 그렇게 규칙적으로 먹어?'라고 물어볼 때",
    a1: { text: "건강과 규칙성을 위해 먹는다고 설명한다", tags: ["T", "J"] },
    a2: { text: "기분과 상황에 맞춰 먹는다고 설명한다", tags: ["F", "P"] },
  },
  {
    id: 6,
    q: "식사 앱에서 식사 시간을 기록하라고 할 때",
    a1: { text: "식사 빈도를 기록하고 관리한다", tags: ["J", "S"] },
    a2: { text: "기록하지 않고 느낌으로 판단한다", tags: ["P", "N"] },
  },
  {
    id: 7,
    q: "식사 시간에 친구가 와서 '나도 배고파! 같이 먹자!'라고 할 때",
    a1: { text: "즉시 함께 식사한다", tags: ["E", "F"] },
    a2: { text: "혼자 식사하는 게 편하다고 말한다", tags: ["I", "T"] },
  },
  {
    id: 8,
    q: "평소 아침식사를 안 먹는데 오늘은 먹고 싶을 때",
    a1: { text: "같은 패턴을 유지하기 위해 안 먹는다", tags: ["S", "J"] },
    a2: { text: "다양한 패턴을 시도해서 먹어본다", tags: ["N", "P"] },
  },
  {
    id: 9,
    q: "내일 중요한 일이 있어서 식사 시간을 미리 정해야 할 때",
    a1: { text: "미리 식사 시간을 준비하고 계획한다", tags: ["J", "S"] },
    a2: { text: "그때그때 상황에 맞춰 준비한다", tags: ["P", "N"] },
  },
  {
    id: 10,
    q: "친구가 '규칙적으로 먹는 게 중요해?'라고 물어볼 때",
    a1: { text: "규칙적으로 먹는 게 중요하다고 말한다", tags: ["J", "T"] },
    a2: { text: "유연하게 먹는 게 좋다고 말한다", tags: ["P", "F"] },
  },
  {
    id: 11,
    q: "규칙적으로 먹으려고 하는데 스케줄이 너무 바빠서 부담스러울 때",
    a1: { text: "규칙적으로 먹는 게 편하다고 생각한다", tags: ["J", "S"] },
    a2: { text: "규칙적으로 먹는 게 부담스럽다고 생각한다", tags: ["P", "N"] },
  },
  {
    id: 12,
    q: "식사 스타일에 대해 설명할 때",
    a1: { text: "계획적이고 체계적으로 식사한다고 설명한다", tags: ["J", "T"] },
    a2: { text: "즉흥적이고 유연하게 식사한다고 설명한다", tags: ["P", "F"] },
  },
]

export default function MealFrequencyTest() {
  const quizLogic = useQuizLogic({
    testId: "meal-frequency",
    questions,
    resultPath: "/tests/meal-frequency/test/result",
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
