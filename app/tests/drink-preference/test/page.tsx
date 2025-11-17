"use client"

/**
 * Component: DrinkPreferenceTest
 * 음료 선호도 테스트 페이지
 * @example <DrinkPreferenceTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "카페에서 음료를 주문할 때",
    a1: { text: "미리 정하고 계획적으로 주문한다", tags: ["J"] },
    a2: { text: "그때그때 즉흥적으로 주문한다", tags: ["P"] },
  },
  {
    id: 2,
    q: "카페 메뉴판을 보다가 음료를 선택할 때",
    a1: { text: "익숙한 음료나 기본 음료를 선택한다", tags: ["S"] },
    a2: { text: "새로운 음료나 특별한 음료를 선택한다", tags: ["N"] },
  },
  {
    id: 3,
    q: "음료를 선택할 때 시간이 부족할 때",
    a1: { text: "여유롭게 천천히 선택한다", tags: ["F"] },
    a2: { text: "빠르고 효율적으로 선택한다", tags: ["T"] },
  },
  {
    id: 4,
    q: "음료를 마실 때 친구가 와서 '나도 같이 마시고 싶어!'라고 할 때",
    a1: { text: "즉시 함께 마신다", tags: ["E"] },
    a2: { text: "혼자 조용히 마신다", tags: ["I"] },
  },
  {
    id: 5,
    q: "친구가 '왜 그 음료를 골랐어?'라고 물어볼 때",
    a1: { text: "감성과 의미 때문에 선택했다고 말한다", tags: ["F"] },
    a2: { text: "실용과 효율 때문에 선택했다고 말한다", tags: ["T"] },
  },
  {
    id: 6,
    q: "음료를 마실 때",
    a1: { text: "천천히 꼼꼼하게 마신다", tags: ["F"] },
    a2: { text: "빠르고 효율적으로 마신다", tags: ["T"] },
  },
  {
    id: 7,
    q: "음료를 선택하기 전에 계획을 세울 때",
    a1: { text: "미리 계획하고 체계적으로 선택한다", tags: ["J"] },
    a2: { text: "그때그때 즉흥적으로 선택한다", tags: ["P"] },
  },
  {
    id: 8,
    q: "음료를 마시고 나서 기분이 좋을 때",
    a1: { text: "즐거움과 기쁨을 느낀다", tags: ["E"] },
    a2: { text: "평온함과 차분함을 느낀다", tags: ["I"] },
  },
  {
    id: 9,
    q: "음료를 선택할 때 기준을 정할 때",
    a1: { text: "실용성과 효율을 기준으로 선택한다", tags: ["S"] },
    a2: { text: "의미와 특별함을 기준으로 선택한다", tags: ["N"] },
  },
  {
    id: 10,
    q: "음료를 선택할 때 이유를 생각할 때",
    a1: { text: "의미와 특별함 때문에 선택한다", tags: ["N"] },
    a2: { text: "실용성과 효율 때문에 선택한다", tags: ["S"] },
  },
  {
    id: 11,
    q: "음료를 마시고 나서 친구에게 공유하고 싶을 때",
    a1: { text: "즉시 공유하고 이야기한다", tags: ["E"] },
    a2: { text: "조용히 혼자만 즐긴다", tags: ["I"] },
  },
  {
    id: 12,
    q: "음료를 선택할 때 방식을 정할 때",
    a1: { text: "계획적이고 체계적으로 선택한다", tags: ["J"] },
    a2: { text: "즉흥적이고 유연하게 선택한다", tags: ["P"] },
  },
]

export default function DrinkPreferenceTest() {
  const quizLogic = useQuizLogic({
    testId: "drink-preference",
    questions,
    resultPath: "/tests/drink-preference/test/result",
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
