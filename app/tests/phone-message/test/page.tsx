"use client"

/**
 * Component: PhoneMessageTest
 * 폰 메시지 습관 테스트 페이지
 * @example <PhoneMessageTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "친구가 메시지를 보냈을 때",
    a1: { text: "즉시 답장한다", tags: ["E", "J"] },
    a2: { text: "나중에 답장한다", tags: ["I", "P"] },
  },
  {
    id: 2,
    q: "읽씹을 당했을 때",
    a1: { text: "신경 쓰인다", tags: ["J", "T"] },
    a2: { text: "신경 쓰이지 않는다", tags: ["P", "F"] },
  },
  {
    id: 3,
    q: "메시지를 답장할 때",
    a1: { text: "짧게 답장한다", tags: ["I", "S"] },
    a2: { text: "길게 답장한다", tags: ["E", "N"] },
  },
  {
    id: 4,
    q: "메시지를 확인하는 시간",
    a1: { text: "정해진 시간에 확인한다", tags: ["J", "S"] },
    a2: { text: "그때그때 확인한다", tags: ["P", "N"] },
  },
  {
    id: 5,
    q: "메시지를 답장하는 이유",
    a1: { text: "목표와 효율을 위해", tags: ["T", "J"] },
    a2: { text: "기분과 컨디션을 위해", tags: ["F", "P"] },
  },
  {
    id: 6,
    q: "여러 메시지가 쌓였을 때",
    a1: { text: "효율적으로 빠르게 답장한다", tags: ["T", "J"] },
    a2: { text: "하나씩 재미있게 답장한다", tags: ["F", "P"] },
  },
  {
    id: 7,
    q: "중요한 메시지를 받았을 때",
    a1: { text: "체계적으로 짧게 답장한다", tags: ["J", "T"] },
    a2: { text: "하나씩 자세히 답장한다", tags: ["P", "F"] },
  },
  {
    id: 8,
    q: "새로운 메시지 앱을 사용할 때",
    a1: { text: "리뷰를 보고 신중하게 시도한다", tags: ["S", "I"] },
    a2: { text: "바로 시도해본다", tags: ["N", "E"] },
  },
  {
    id: 9,
    q: "메시지 답장 시간을 조절할 때",
    a1: { text: "정해진 시간만 답장한다", tags: ["J", "T"] },
    a2: { text: "기분에 따라 시간이 달라진다", tags: ["P", "F"] },
  },
  {
    id: 10,
    q: "메시지를 답장한 후",
    a1: { text: "즉시 할 일을 시작한다", tags: ["E", "J"] },
    a2: { text: "잠시 더 여유롭게 즐긴다", tags: ["I", "P"] },
  },
  {
    id: 11,
    q: "메시지 답장을 마무리할 때",
    a1: { text: "정해진 시간에 끝낸다", tags: ["J", "T"] },
    a2: { text: "만족할 때까지 답장한다", tags: ["P", "F"] },
  },
  {
    id: 12,
    q: "메시지를 답장하는 환경",
    a1: { text: "조용하고 집중할 수 있는 곳", tags: ["I", "S"] },
    a2: { text: "활기차고 사람들이 있는 곳", tags: ["E", "N"] },
  },
]

export default function PhoneMessageTest() {
  const quizLogic = useQuizLogic({
    testId: "phone-message",
    questions,
    resultPath: "/tests/phone-message/test/result",
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


