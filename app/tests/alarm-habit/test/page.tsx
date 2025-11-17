"use client"

/**
 * Component: AlarmHabitTest
 * 알람 습관 테스트 페이지
 * @example <AlarmHabitTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "알람은 몇 개나 맞춰두시나요?",
    a1: { text: "하나만 맞춰두고 바로 일어난다", tags: ["J"] },
    a2: { text: "여러 개 맞춰두고 스누즈 활용", tags: ["P"] },
  },
  {
    id: 2,
    q: "알람이 울리면 가장 먼저 하는 행동은?",
    a1: { text: "핸드폰을 확인한다", tags: ["E"] },
    a2: { text: "잠시 멍하니 있는다", tags: ["I"] },
  },
  {
    id: 3,
    q: "기상 후 가장 중요하게 생각하는 것은?",
    a1: { text: "정해진 루틴을 따르는 것", tags: ["S"] },
    a2: { text: "그날의 기분과 컨디션", tags: ["N"] },
  },
  {
    id: 4,
    q: "일어나기 힘든 날 어떻게 대처하나요?",
    a1: { text: "억지로라도 일어나야 한다고 생각", tags: ["T"] },
    a2: { text: "몸이 힘들면 조금 더 쉰다", tags: ["F"] },
  },
  {
    id: 5,
    q: "잠자리에 드는 시간은?",
    a1: { text: "매일 비슷한 시간에", tags: ["J"] },
    a2: { text: "그날그날 다르게", tags: ["P"] },
  },
  {
    id: 6,
    q: "아침에 일어나서 하고 싶은 활동은?",
    a1: { text: "사람들과 대화하거나 소식 확인", tags: ["E"] },
    a2: { text: "조용히 혼자만의 시간 갖기", tags: ["I"] },
  },
  {
    id: 7,
    q: "기상 시간을 정하는 기준은?",
    a1: { text: "해야 할 일들을 고려해서", tags: ["S"] },
    a2: { text: "이상적인 하루를 상상해서", tags: ["N"] },
  },
  {
    id: 8,
    q: "늦잠을 잤을 때 반응은?",
    a1: { text: "계획이 틀어져서 스트레스", tags: ["T"] },
    a2: { text: "어쩔 수 없다며 받아들임", tags: ["F"] },
  },
  {
    id: 9,
    q: "주말 기상 시간은?",
    a1: { text: "평일과 비슷하게 규칙적으로", tags: ["J"] },
    a2: { text: "자연스럽게 깰 때까지", tags: ["P"] },
  },
  {
    id: 10,
    q: "아침 준비는 어떻게 하나요?",
    a1: { text: "빠르게 효율적으로", tags: ["E"] },
    a2: { text: "천천히 여유롭게", tags: ["I"] },
  },
  {
    id: 11,
    q: "알람 소리는 어떤 걸 선호하나요?",
    a1: { text: "익숙하고 확실한 소리", tags: ["S"] },
    a2: { text: "새롭고 특별한 소리", tags: ["N"] },
  },
  {
    id: 12,
    q: "잠들기 전 마지막에 하는 일은?",
    a1: { text: "내일 할 일을 정리한다", tags: ["T"] },
    a2: { text: "편안한 마음으로 휴식한다", tags: ["F"] },
  },
]

export default function AlarmHabitTest() {
  const quizLogic = useQuizLogic({
    testId: "alarm-habit",
    questions,
    resultPath: "/tests/alarm-habit/test/result",
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
