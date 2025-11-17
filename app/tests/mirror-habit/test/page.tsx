"use client"

/**
 * Component: MirrorHabitTest
 * 거울 보는 습관 테스트 페이지
 * @example <MirrorHabitTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "화장실이나 거울 앞에 있을 때 거울을 볼 때",
    a1: { text: "정해진 시간에 체계적으로 본다", tags: ["J"] },
    a2: { text: "그때그때 유연하게 본다", tags: ["P"] },
  },
  {
    id: 2,
    q: "거울을 볼 때 보는 시간을 정할 때",
    a1: { text: "오래 꼼꼼하게 본다", tags: ["F"] },
    a2: { text: "짧게 실용적으로 본다", tags: ["T"] },
  },
  {
    id: 3,
    q: "친구가 '왜 거울을 봐?'라고 물어볼 때",
    a1: { text: "확인과 실용성을 위해 본다고 말한다", tags: ["S"] },
    a2: { text: "감상과 의미를 위해 본다고 말한다", tags: ["N"] },
  },
  {
    id: 4,
    q: "거울을 보기 전에 계획을 세울 때",
    a1: { text: "미리 계획하고 목표를 정한다", tags: ["J"] },
    a2: { text: "즉흥적으로 그때그때 본다", tags: ["P"] },
  },
  {
    id: 5,
    q: "거울을 보고 나서 확인할 때",
    a1: { text: "확인하고 꼼꼼하게 체크한다", tags: ["F"] },
    a2: { text: "그냥 가고 실용적으로 처리한다", tags: ["T"] },
  },
  {
    id: 6,
    q: "거울을 볼 때 친구가 와서 '나도 같이 보고 싶어!'라고 할 때",
    a1: { text: "즉시 함께 본다", tags: ["E"] },
    a2: { text: "혼자 조용히 본다", tags: ["I"] },
  },
  {
    id: 7,
    q: "거울을 보는 이유를 생각할 때",
    a1: { text: "실용성과 효율을 위해 본다", tags: ["S"] },
    a2: { text: "의미와 특별함을 위해 본다", tags: ["N"] },
  },
  {
    id: 8,
    q: "거울을 볼 때 보는 방식을 정할 때",
    a1: { text: "정해진 순서로 체계적으로 본다", tags: ["J"] },
    a2: { text: "자연스럽고 유연하게 본다", tags: ["P"] },
  },
  {
    id: 9,
    q: "거울을 보고 나서 기분이 좋을 때",
    a1: { text: "평온함과 차분함을 느낀다", tags: ["I"] },
    a2: { text: "즐거움과 기쁨을 느낀다", tags: ["E"] },
  },
  {
    id: 10,
    q: "거울을 볼 때 기준을 정할 때",
    a1: { text: "감성과 의미를 기준으로 본다", tags: ["F"] },
    a2: { text: "효율과 실용을 기준으로 본다", tags: ["T"] },
  },
  {
    id: 11,
    q: "거울을 보고 나서 친구에게 공유하고 싶을 때",
    a1: { text: "즉시 공유하고 경험을 나눈다", tags: ["E"] },
    a2: { text: "조용히 혼자만 즐긴다", tags: ["I"] },
  },
  {
    id: 12,
    q: "거울을 보는 이유를 생각할 때",
    a1: { text: "의미와 특별함을 위해 본다", tags: ["N"] },
    a2: { text: "실용성과 효율을 위해 본다", tags: ["S"] },
  },
]

export default function MirrorHabitTest() {
  const quizLogic = useQuizLogic({
    testId: "mirror-habit",
    questions,
    resultPath: "/tests/mirror-habit/test/result",
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

