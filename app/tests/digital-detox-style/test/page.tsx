"use client"

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "디지털 피로를 느끼는 순간은?",
    a1: { text: "상황을 기준으로 체계적으로 선택한다", tags: ["E"] },
    a2: { text: "감각/직관을 믿고 유연하게 선택한다", tags: ["I"] },
  },
  {
    id: 2,
    q: "알림 설정을 관리하는 방식은?",
    a1: { text: "상황을 기준으로 체계적으로 선택한다", tags: ["S"] },
    a2: { text: "감각/직관을 믿고 유연하게 선택한다", tags: ["N"] },
  },
  {
    id: 3,
    q: "SNS 휴식이 필요할 때 행동은?",
    a1: { text: "상황을 기준으로 체계적으로 선택한다", tags: ["T"] },
    a2: { text: "감각/직관을 믿고 유연하게 선택한다", tags: ["F"] },
  },
  {
    id: 4,
    q: "잠들기 전 디바이스 사용 습관은?",
    a1: { text: "상황을 기준으로 체계적으로 선택한다", tags: ["J"] },
    a2: { text: "감각/직관을 믿고 유연하게 선택한다", tags: ["P"] },
  },
  {
    id: 5,
    q: "집중 시간에 폰을 두는 위치는?",
    a1: { text: "상황을 기준으로 체계적으로 선택한다", tags: ["E"] },
    a2: { text: "감각/직관을 믿고 유연하게 선택한다", tags: ["I"] },
  },
  {
    id: 6,
    q: "디톡스 실패 원인을 분석하는가?",
    a1: { text: "상황을 기준으로 체계적으로 선택한다", tags: ["S"] },
    a2: { text: "감각/직관을 믿고 유연하게 선택한다", tags: ["N"] },
  },
  {
    id: 7,
    q: "주말 디지털 사용 계획을 세우는가?",
    a1: { text: "상황을 기준으로 체계적으로 선택한다", tags: ["T"] },
    a2: { text: "감각/직관을 믿고 유연하게 선택한다", tags: ["F"] },
  },
  {
    id: 8,
    q: "대체 활동 전환 방식은?",
    a1: { text: "상황을 기준으로 체계적으로 선택한다", tags: ["J"] },
    a2: { text: "감각/직관을 믿고 유연하게 선택한다", tags: ["P"] },
  },
  {
    id: 9,
    q: "주변에 디톡스 의지를 공유하는가?",
    a1: { text: "상황을 기준으로 체계적으로 선택한다", tags: ["E"] },
    a2: { text: "감각/직관을 믿고 유연하게 선택한다", tags: ["I"] },
  },
  {
    id: 10,
    q: "재발 방지를 위한 규칙은?",
    a1: { text: "상황을 기준으로 체계적으로 선택한다", tags: ["S"] },
    a2: { text: "감각/직관을 믿고 유연하게 선택한다", tags: ["N"] },
  },
  {
    id: 11,
    q: "앱 삭제/재설치 기준은?",
    a1: { text: "상황을 기준으로 체계적으로 선택한다", tags: ["T"] },
    a2: { text: "감각/직관을 믿고 유연하게 선택한다", tags: ["F"] },
  },
  {
    id: 12,
    q: "내게 건강한 디지털 밸런스란?",
    a1: { text: "상황을 기준으로 체계적으로 선택한다", tags: ["J"] },
    a2: { text: "감각/직관을 믿고 유연하게 선택한다", tags: ["P"] },
  }
]

export default function DigitalDetoxStyleTestPage() {
  const quizLogic = useQuizLogic({
    testId: "digital-detox-style",
    questions,
    resultPath: "/tests/digital-detox-style/test/result",
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
