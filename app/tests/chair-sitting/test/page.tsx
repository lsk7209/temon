"use client"

/**
 * Component: ChairSittingTest
 * 의자 앉는 스타일 테스트 페이지
 * @example <ChairSittingTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "카페에 가서 의자에 앉을 때",
    a1: { text: "정해진 자세로 체계적으로 앉는다", tags: ["J"] },
    a2: { text: "그때그때 유연하게 앉는다", tags: ["P"] },
  },
  {
    id: 2,
    q: "의자에 앉을 때 자세를 정할 때",
    a1: { text: "똑바로 정돈되게 앉는다", tags: ["T"] },
    a2: { text: "편하게 자연스럽게 앉는다", tags: ["F"] },
  },
  {
    id: 3,
    q: "의자에 앉을 때 속도를 정할 때",
    a1: { text: "천천히 꼼꼼하게 앉는다", tags: ["F"] },
    a2: { text: "빠르게 실용적으로 앉는다", tags: ["T"] },
  },
  {
    id: 4,
    q: "의자에 앉기 전에 계획을 세울 때",
    a1: { text: "미리 계획하고 목표를 정한다", tags: ["J"] },
    a2: { text: "즉흥적으로 그때그때 앉는다", tags: ["P"] },
  },
  {
    id: 5,
    q: "의자에 앉고 나서 확인할 때",
    a1: { text: "확인하고 꼼꼼하게 체크한다", tags: ["F"] },
    a2: { text: "그냥 가고 실용적으로 처리한다", tags: ["T"] },
  },
  {
    id: 6,
    q: "의자에 앉을 때 친구가 와서 '나도 같이 앉고 싶어!'라고 할 때",
    a1: { text: "즉시 함께 앉는다", tags: ["E"] },
    a2: { text: "혼자 조용히 앉는다", tags: ["I"] },
  },
  {
    id: 7,
    q: "친구가 '왜 그 의자에 앉아?'라고 물어볼 때",
    a1: { text: "실용성과 효율 때문에 앉는다고 말한다", tags: ["S"] },
    a2: { text: "의미와 특별함 때문에 앉는다고 말한다", tags: ["N"] },
  },
  {
    id: 8,
    q: "의자에 앉을 때 방식을 정할 때",
    a1: { text: "정해진 순서로 체계적으로 앉는다", tags: ["J"] },
    a2: { text: "자연스럽고 유연하게 앉는다", tags: ["P"] },
  },
  {
    id: 9,
    q: "의자에 앉고 나서 기분이 좋을 때",
    a1: { text: "평온함과 차분함을 느낀다", tags: ["I"] },
    a2: { text: "즐거움과 기쁨을 느낀다", tags: ["E"] },
  },
  {
    id: 10,
    q: "의자를 선택할 때 기준을 정할 때",
    a1: { text: "감성과 의미를 기준으로 선택한다", tags: ["F"] },
    a2: { text: "효율과 실용을 기준으로 선택한다", tags: ["T"] },
  },
  {
    id: 11,
    q: "의자에 앉고 나서 친구에게 공유하고 싶을 때",
    a1: { text: "즉시 공유하고 경험을 나눈다", tags: ["E"] },
    a2: { text: "조용히 혼자만 즐긴다", tags: ["I"] },
  },
  {
    id: 12,
    q: "의자에 앉는 이유를 생각할 때",
    a1: { text: "의미와 특별함을 위해 앉는다", tags: ["N"] },
    a2: { text: "실용성과 효율을 위해 앉는다", tags: ["S"] },
  },
]

export default function ChairSittingTest() {
  const quizLogic = useQuizLogic({
    testId: "chair-sitting",
    questions,
    resultPath: "/tests/chair-sitting/test/result",
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
      colorClasses={getQuizColorScheme("green-emerald")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}

