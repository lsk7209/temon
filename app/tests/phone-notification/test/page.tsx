"use client"

/**
 * Component: PhoneNotificationTest
 * 폰 알림 습관 테스트 페이지
 * @example <PhoneNotificationTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "알림이 올 때",
    a1: { text: "즉시 확인한다", tags: ["E", "J"] },
    a2: { text: "나중에 확인한다", tags: ["I", "P"] },
  },
  {
    id: 2,
    q: "알림이 너무 많을 때",
    a1: { text: "알림을 정리한다", tags: ["J", "T"] },
    a2: { text: "그대로 둔다", tags: ["P", "F"] },
  },
  {
    id: 3,
    q: "알림을 확인하는 방식",
    a1: { text: "혼자 조용히 확인한다", tags: ["I", "S"] },
    a2: { text: "사람들과 함께 확인한다", tags: ["E", "N"] },
  },
  {
    id: 4,
    q: "알림을 확인하는 시간",
    a1: { text: "정해진 시간에 확인한다", tags: ["J", "S"] },
    a2: { text: "그때그때 확인한다", tags: ["P", "N"] },
  },
  {
    id: 5,
    q: "알림을 확인하는 이유",
    a1: { text: "목표와 효율을 위해", tags: ["T", "J"] },
    a2: { text: "기분과 컨디션을 위해", tags: ["F", "P"] },
  },
  {
    id: 6,
    q: "알림을 선택하는 기준",
    a1: { text: "효율성과 목표를 위해", tags: ["T", "J"] },
    a2: { text: "기분과 컨디션을 위해", tags: ["F", "P"] },
  },
  {
    id: 7,
    q: "읽지 않은 알림이 쌓였을 때",
    a1: { text: "체계적으로 정리한다", tags: ["J", "T"] },
    a2: { text: "하나씩 처리한다", tags: ["P", "F"] },
  },
  {
    id: 8,
    q: "새로운 알림 앱을 시도할 때",
    a1: { text: "리뷰를 보고 신중하게 선택한다", tags: ["S", "I"] },
    a2: { text: "바로 시도해본다", tags: ["N", "E"] },
  },
  {
    id: 9,
    q: "알림을 확인하는 강도",
    a1: { text: "정해진 강도만 확인한다", tags: ["J", "T"] },
    a2: { text: "기분에 따라 강도가 달라진다", tags: ["P", "F"] },
  },
  {
    id: 10,
    q: "알림 확인 후 할 일",
    a1: { text: "즉시 할 일을 시작한다", tags: ["E", "J"] },
    a2: { text: "잠시 더 여유롭게 즐긴다", tags: ["I", "P"] },
  },
  {
    id: 11,
    q: "알림을 마무리할 때",
    a1: { text: "정해진 시간에 끝낸다", tags: ["J", "T"] },
    a2: { text: "완료할 때까지 확인한다", tags: ["P", "F"] },
  },
  {
    id: 12,
    q: "알림을 확인하는 환경",
    a1: { text: "조용하고 집중할 수 있는 곳", tags: ["I", "S"] },
    a2: { text: "활기차고 사람들이 있는 곳", tags: ["E", "N"] },
  },
]

export default function PhoneNotificationTest() {
  const quizLogic = useQuizLogic({
    testId: "phone-notification",
    questions,
    resultPath: "/tests/phone-notification/test/result",
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


