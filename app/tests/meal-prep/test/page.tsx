"use client"

/**
 * Component: MealPrepTest
 * 식사 준비 테스트 페이지
 * @example <MealPrepTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "식사를 준비할 때 준비 방식을 정할 때",
    a1: { text: "미리 준비하고 계획적으로 만든다", tags: ["J"] },
    a2: { text: "그때그때 즉흥적으로 만든다", tags: ["P"] },
  },
  {
    id: 2,
    q: "식사 준비를 시작하기 전에 계획을 세울 때",
    a1: { text: "일주일 단위로 체계적으로 계획한다", tags: ["J"] },
    a2: { text: "그때그때 유연하게 계획한다", tags: ["P"] },
  },
  {
    id: 3,
    q: "식사 준비를 할 때 시간이 부족할 때",
    a1: { text: "여유롭게 천천히 만든다", tags: ["F"] },
    a2: { text: "빠르고 효율적으로 만든다", tags: ["T"] },
  },
  {
    id: 4,
    q: "식사 준비를 시작하기 전에 메뉴를 선택할 때",
    a1: { text: "미리 정하고 계획적으로 선택한다", tags: ["J"] },
    a2: { text: "그때그때 즉흥적으로 선택한다", tags: ["P"] },
  },
  {
    id: 5,
    q: "식사 준비를 할 때 친구가 와서 '나도 같이 만들고 싶어!'라고 할 때",
    a1: { text: "즉시 함께 만든다", tags: ["E"] },
    a2: { text: "혼자 조용히 만든다", tags: ["I"] },
  },
  {
    id: 6,
    q: "친구가 '왜 식사를 준비해?'라고 물어볼 때",
    a1: { text: "효율성과 실용을 위해 준비한다고 말한다", tags: ["T"] },
    a2: { text: "감성과 의미를 위해 준비한다고 말한다", tags: ["F"] },
  },
  {
    id: 7,
    q: "식사 준비를 할 때 준비 방법을 선택할 때",
    a1: { text: "정해진 순서로 체계적으로 만든다", tags: ["J"] },
    a2: { text: "자연스럽고 유연하게 만든다", tags: ["P"] },
  },
  {
    id: 8,
    q: "식사 준비를 완성하고 나서 기분이 좋을 때",
    a1: { text: "만족감과 성취감을 느낀다", tags: ["E"] },
    a2: { text: "평온함과 차분함을 느낀다", tags: ["I"] },
  },
  {
    id: 9,
    q: "식사 준비를 할 때 메뉴를 선택할 때",
    a1: { text: "익숙한 메뉴나 기본 메뉴를 선택한다", tags: ["S"] },
    a2: { text: "새로운 메뉴나 특별한 메뉴를 선택한다", tags: ["N"] },
  },
  {
    id: 10,
    q: "식사 준비를 하는 이유를 생각할 때",
    a1: { text: "실용성과 효율을 위해 준비한다", tags: ["S"] },
    a2: { text: "의미와 특별함을 위해 준비한다", tags: ["N"] },
  },
  {
    id: 11,
    q: "식사 준비를 완성하고 나서 활용할 때",
    a1: { text: "계획대로 체계적으로 활용한다", tags: ["J"] },
    a2: { text: "그때그때 유연하게 활용한다", tags: ["P"] },
  },
  {
    id: 12,
    q: "식사 준비를 선택하는 이유를 생각할 때",
    a1: { text: "감성과 의미를 위해 선택한다", tags: ["F"] },
    a2: { text: "효율과 실용을 위해 선택한다", tags: ["T"] },
  },
]

export default function MealPrepTest() {
  const quizLogic = useQuizLogic({
    testId: "meal-prep",
    questions,
    resultPath: "/tests/meal-prep/test/result",
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

