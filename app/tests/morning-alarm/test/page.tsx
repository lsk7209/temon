"use client"

/**
 * Component: MorningAlarmTest
 * 아침 알람 테스트 페이지
 * @example <MorningAlarmTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "아침 알람이 울렸을 때",
    a1: { text: "바로 일어나서 끈다", tags: ["J"] },
    a2: { text: "스누즈를 누르고 다시 잔다", tags: ["P"] },
  },
  {
    id: 2,
    q: "알람을 여러 개 맞췄을 때",
    a1: { text: "첫 알람에 일어난다", tags: ["J", "T"] },
    a2: { text: "마지막 알람까지 기다린다", tags: ["P", "F"] },
  },
  {
    id: 3,
    q: "알람 소리가 너무 시끄러울 때",
    a1: { text: "바로 끄고 조용한 소리로 바꾼다", tags: ["T", "J"] },
    a2: { text: "조금 더 듣고 기분이 좋아진다", tags: ["F", "P"] },
  },
  {
    id: 4,
    q: "알람을 깜빡 잊고 안 맞췄을 때",
    a1: { text: "다음 날 더 일찍 맞춘다", tags: ["J", "S"] },
    a2: { text: "자연스럽게 깬다", tags: ["P", "N"] },
  },
  {
    id: 5,
    q: "알람이 울렸는데 아직 졸릴 때",
    a1: { text: "억지로라도 일어난다", tags: ["T", "J"] },
    a2: { text: "조금 더 잔다", tags: ["F", "P"] },
  },
  {
    id: 6,
    q: "알람 시간을 정할 때",
    a1: { text: "정확한 시간으로 맞춘다", tags: ["S", "J"] },
    a2: { text: "여유 있게 맞춘다", tags: ["N", "P"] },
  },
  {
    id: 7,
    q: "알람이 울리기 전에 깨어났을 때",
    a1: { text: "알람을 끄고 일어난다", tags: ["J", "T"] },
    a2: { text: "알람이 울릴 때까지 기다린다", tags: ["P", "F"] },
  },
  {
    id: 8,
    q: "알람 소리를 선택할 때",
    a1: { text: "같은 소리를 계속 사용한다", tags: ["S", "I"] },
    a2: { text: "자주 바꿔서 신선하게 한다", tags: ["N", "E"] },
  },
  {
    id: 9,
    q: "알람이 울렸는데 핸드폰이 멀리 있을 때",
    a1: { text: "바로 가서 끈다", tags: ["E", "J"] },
    a2: { text: "조금 더 누워있다가 간다", tags: ["I", "P"] },
  },
  {
    id: 10,
    q: "알람을 끄고 나서",
    a1: { text: "즉시 일어나서 준비한다", tags: ["E", "J"] },
    a2: { text: "잠시 더 누워있다가 일어난다", tags: ["I", "P"] },
  },
  {
    id: 11,
    q: "주말에도 알람을 맞출 때",
    a1: { text: "평일과 같은 시간으로 맞춘다", tags: ["S", "J"] },
    a2: { text: "늦게 맞추거나 안 맞춘다", tags: ["N", "P"] },
  },
  {
    id: 12,
    q: "알람이 울렸는데 날씨가 안 좋을 때",
    a1: { text: "그래도 일어난다", tags: ["T", "J"] },
    a2: { text: "조금 더 쉰다", tags: ["F", "P"] },
  },
]

export default function MorningAlarmTest() {
  const quizLogic = useQuizLogic({
    testId: "morning-alarm",
    questions,
    resultPath: "/tests/morning-alarm/test/result",
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
      colorClasses={getQuizColorScheme("orange-red")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
