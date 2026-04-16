"use client"

/**
 * Component: MorningCoffeeTest
 * 아침 커피 테스트 페이지
 * @example <MorningCoffeeTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "아침에 커피를 마실 때",
    a1: { text: "바로 뜨거운 상태로 마신다", tags: ["J", "T"] },
    a2: { text: "조금 식혀서 마신다", tags: ["P", "F"] },
  },
  {
    id: 2,
    q: "커피가 식었을 때",
    a1: { text: "다시 데워서 마신다", tags: ["J", "S"] },
    a2: { text: "그냥 차갑게 마신다", tags: ["P", "N"] },
  },
  {
    id: 3,
    q: "커피를 만들 때",
    a1: { text: "정해진 방법으로 똑같이 만든다", tags: ["S", "J"] },
    a2: { text: "그때그때 다르게 실험한다", tags: ["N", "P"] },
  },
  {
    id: 4,
    q: "아침에 커피를 마시는 장소를 고를 때",
    a1: { text: "카페에서 사람들과 함께 마신다", tags: ["E"] },
    a2: { text: "집에서 혼자 조용히 마신다", tags: ["I"] },
  },
  {
    id: 5,
    q: "커피를 마시는 시간을 정할 때",
    a1: { text: "정해진 시간에 규칙적으로 마신다", tags: ["J", "S"] },
    a2: { text: "그때그때 기분에 따라 마신다", tags: ["P", "N"] },
  },
  {
    id: 6,
    q: "커피를 마시면서 할 일",
    a1: { text: "일을 하거나 계획을 세운다", tags: ["T", "J"] },
    a2: { text: "여유롭게 즐기며 쉰다", tags: ["F", "P"] },
  },
  {
    id: 7,
    q: "커피 맛이 이상할 때",
    a1: { text: "원인을 찾아서 해결한다", tags: ["T", "S"] },
    a2: { text: "그냥 마시거나 버린다", tags: ["F", "N"] },
  },
  {
    id: 8,
    q: "새로운 커피를 시도할 때",
    a1: { text: "리뷰를 보고 신중하게 선택한다", tags: ["S", "I"] },
    a2: { text: "바로 시도해본다", tags: ["N", "E"] },
  },
  {
    id: 9,
    q: "커피를 마시는 양을 정할 때",
    a1: { text: "정해진 양만 마신다", tags: ["J", "T"] },
    a2: { text: "기분에 따라 양이 달라진다", tags: ["P", "F"] },
  },
  {
    id: 10,
    q: "커피를 마시고 나서",
    a1: { text: "즉시 할 일을 시작한다", tags: ["E", "J"] },
    a2: { text: "잠시 더 여유롭게 즐긴다", tags: ["I", "P"] },
  },
  {
    id: 11,
    q: "커피를 마시는 이유를 생각할 때",
    a1: { text: "각성 효과와 효율성을 위해", tags: ["T", "S"] },
    a2: { text: "기분 전환과 즐거움을 위해", tags: ["F", "N"] },
  },
  {
    id: 12,
    q: "커피를 마시는 환경을 고를 때",
    a1: { text: "조용하고 집중할 수 있는 곳", tags: ["I", "S"] },
    a2: { text: "활기차고 사람들이 있는 곳", tags: ["E", "N"] },
  },
]

export default function MorningCoffeeTest() {
  const quizLogic = useQuizLogic({
    testId: "morning-coffee",
    questions,
    resultPath: "/tests/morning-coffee/test/result",
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
      colorClasses={getQuizColorScheme("amber-orange")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
