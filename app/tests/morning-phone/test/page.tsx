"use client"

/**
 * Component: MorningPhoneTest
 * 아침 핸드폰 테스트 페이지
 * @example <MorningPhoneTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "아침에 일어나서 첫 번째로 할 일",
    a1: { text: "핸드폰을 바로 확인한다", tags: ["E", "J"] },
    a2: { text: "다른 일을 먼저 한다", tags: ["I", "P"] },
  },
  {
    id: 2,
    q: "읽지 않은 메시지가 많을 때",
    a1: { text: "바로 모두 확인한다", tags: ["T", "J"] },
    a2: { text: "천천히 확인한다", tags: ["F", "P"] },
  },
  {
    id: 3,
    q: "아침에 알림이 많이 올 때",
    a1: { text: "즉시 처리한다", tags: ["T", "J"] },
    a2: { text: "나중에 처리한다", tags: ["F", "P"] },
  },
  {
    id: 4,
    q: "아침에 핸드폰을 사용하는 시간",
    a1: { text: "정해진 시간에 사용한다", tags: ["J", "S"] },
    a2: { text: "그때그때 사용한다", tags: ["P", "N"] },
  },
  {
    id: 5,
    q: "아침에 핸드폰을 볼 때",
    a1: { text: "일을 하거나 계획을 세운다", tags: ["T", "J"] },
    a2: { text: "여유롭게 즐기며 쉰다", tags: ["F", "P"] },
  },
  {
    id: 6,
    q: "아침에 핸드폰을 사용하는 이유",
    a1: { text: "필요와 효율성을 위해", tags: ["T", "S"] },
    a2: { text: "기분 전환과 즐거움을 위해", tags: ["F", "N"] },
  },
  {
    id: 7,
    q: "아침에 핸드폰을 사용하는 장소",
    a1: { text: "조용하고 집중할 수 있는 곳", tags: ["I", "S"] },
    a2: { text: "활기차고 사람들이 있는 곳", tags: ["E", "N"] },
  },
  {
    id: 8,
    q: "아침에 핸드폰 앱을 사용할 때",
    a1: { text: "정해진 앱만 사용한다", tags: ["S", "J"] },
    a2: { text: "다양한 앱을 시도한다", tags: ["N", "P"] },
  },
  {
    id: 9,
    q: "아침에 핸드폰을 사용하는 빈도",
    a1: { text: "정해진 시간에 규칙적으로 사용한다", tags: ["J", "S"] },
    a2: { text: "그때그때 기분에 따라 사용한다", tags: ["P", "N"] },
  },
  {
    id: 10,
    q: "아침에 핸드폰을 사용하고 나서",
    a1: { text: "즉시 할 일을 시작한다", tags: ["E", "J"] },
    a2: { text: "잠시 더 여유롭게 즐긴다", tags: ["I", "P"] },
  },
  {
    id: 11,
    q: "아침에 핸드폰을 사용하는 방식",
    a1: { text: "효율적으로 빠르게 사용한다", tags: ["T", "J"] },
    a2: { text: "여유롭게 천천히 사용한다", tags: ["F", "P"] },
  },
  {
    id: 12,
    q: "아침에 핸드폰을 사용하는 환경",
    a1: { text: "조용하고 집중할 수 있는 곳", tags: ["I", "S"] },
    a2: { text: "활기차고 사람들이 있는 곳", tags: ["E", "N"] },
  },
]

export default function MorningPhoneTest() {
  const quizLogic = useQuizLogic({
    testId: "morning-phone",
    questions,
    resultPath: "/tests/morning-phone/test/result",
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
      colorClasses={getQuizColorScheme("pink-purple")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
