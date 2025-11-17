"use client"

/**
 * Component: SockWearingTest
 * 양말 신기 테스트 페이지
 * @example <SockWearingTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "아침에 양말을 선택할 때",
    a1: { text: "기본 양말이나 전통 양말을 선택한다", tags: ["S"] },
    a2: { text: "특별한 양말이나 새로운 양말을 선택한다", tags: ["N"] },
  },
  {
    id: 2,
    q: "양말을 신을 때 순서를 정할 때",
    a1: { text: "정해진 순서로 체계적으로 신는다", tags: ["J"] },
    a2: { text: "그때그때 유연하게 신는다", tags: ["P"] },
  },
  {
    id: 3,
    q: "양말을 매칭할 때",
    a1: { text: "정확히 매칭하고 꼼꼼하게 확인한다", tags: ["F"] },
    a2: { text: "대충 매칭하고 실용적으로 신는다", tags: ["T"] },
  },
  {
    id: 4,
    q: "양말 색상을 선택할 때",
    a1: { text: "기본 색상이나 전통 색상을 선택한다", tags: ["S"] },
    a2: { text: "특별한 색상이나 새로운 색상을 선택한다", tags: ["N"] },
  },
  {
    id: 5,
    q: "양말을 신는 빈도를 생각할 때",
    a1: { text: "필요할 때 그때그때 신는다", tags: ["P"] },
    a2: { text: "습관처럼 루틴으로 신는다", tags: ["J"] },
  },
  {
    id: 6,
    q: "양말을 정리할 때",
    a1: { text: "정돈되고 체계적으로 정리한다", tags: ["J"] },
    a2: { text: "자연스럽고 유연하게 정리한다", tags: ["P"] },
  },
  {
    id: 7,
    q: "양말을 신을 때 친구가 와서 '나도 같이 신고 싶어!'라고 할 때",
    a1: { text: "즉시 함께 신는다", tags: ["E"] },
    a2: { text: "혼자 조용히 신는다", tags: ["I"] },
  },
  {
    id: 8,
    q: "친구가 '왜 그 양말을 골랐어?'라고 물어볼 때",
    a1: { text: "실용성과 효율 때문에 선택했다고 말한다", tags: ["S"] },
    a2: { text: "의미와 특별함 때문에 선택했다고 말한다", tags: ["N"] },
  },
  {
    id: 9,
    q: "양말을 신기 전에 계획을 세울 때",
    a1: { text: "미리 계획하고 목표를 정한다", tags: ["J"] },
    a2: { text: "즉흥적으로 그때그때 신는다", tags: ["P"] },
  },
  {
    id: 10,
    q: "양말을 신고 나서 기분이 좋을 때",
    a1: { text: "평온함과 차분함을 느낀다", tags: ["I"] },
    a2: { text: "즐거움과 기쁨을 느낀다", tags: ["E"] },
  },
  {
    id: 11,
    q: "양말을 선택할 때 이유를 생각할 때",
    a1: { text: "감성과 의미 때문에 선택한다", tags: ["F"] },
    a2: { text: "효율과 실용 때문에 선택한다", tags: ["T"] },
  },
  {
    id: 12,
    q: "양말을 신고 나서 친구에게 공유하고 싶을 때",
    a1: { text: "즉시 공유하고 경험을 나눈다", tags: ["E"] },
    a2: { text: "조용히 혼자만 즐긴다", tags: ["I"] },
  },
]

export default function SockWearingTest() {
  const quizLogic = useQuizLogic({
    testId: "sock-wearing",
    questions,
    resultPath: "/tests/sock-wearing/test/result",
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
      colorClasses={getQuizColorScheme("yellow-orange")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
