"use client"

/**
 * Component: GiftWrappingTest
 * 선물 포장지 테스트 페이지
 * @example <GiftWrappingTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "선물 포장지를 뜯을 때",
    a1: { text: "조심스럽게 천천히 뜯는다", tags: ["J"] },
    a2: { text: "한 번에 빠르게 찢는다", tags: ["P"] },
  },
  {
    id: 2,
    q: "포장지를 뜯고 나서 포장지를 처리할 때",
    a1: { text: "깔끔하게 접어서 보관한다", tags: ["J"] },
    a2: { text: "바로 버린다", tags: ["P"] },
  },
  {
    id: 3,
    q: "선물 포장지를 뜯을 때 속도를 정할 때",
    a1: { text: "천천히 포장지를 아끼며 뜯는다", tags: ["F"] },
    a2: { text: "빠르게 내용물이 궁금해서 뜯는다", tags: ["T"] },
  },
  {
    id: 4,
    q: "포장지를 뜯을 때 도구를 선택할 때",
    a1: { text: "손으로만 자연스럽게 뜯는다", tags: ["S"] },
    a2: { text: "가위나 칼을 사용해서 정확하게 뜯는다", tags: ["N"] },
  },
  {
    id: 5,
    q: "포장지를 뜯고 나서 포장지를 정리할 때",
    a1: { text: "깔끔하게 정리하고 재활용을 고려한다", tags: ["F"] },
    a2: { text: "그냥 버리고 효율적으로 처리한다", tags: ["T"] },
  },
  {
    id: 6,
    q: "선물 포장지를 뜯을 때 기분이 좋을 때",
    a1: { text: "기대감에 설레는 마음으로 뜯는다", tags: ["E"] },
    a2: { text: "평온하게 차분하게 뜯는다", tags: ["I"] },
  },
  {
    id: 7,
    q: "포장지를 뜯을 때 방법을 정할 때",
    a1: { text: "한 곳에서 시작해서 체계적으로 뜯는다", tags: ["J"] },
    a2: { text: "여러 곳에서 즉흥적으로 뜯는다", tags: ["P"] },
  },
  {
    id: 8,
    q: "포장지를 뜯을 때 포장지 상태를 생각할 때",
    a1: { text: "깔끔하게 뜯어서 포장지를 보존한다", tags: ["S"] },
    a2: { text: "찢어지게 뜯어서 내용물 중심으로 뜯는다", tags: ["N"] },
  },
  {
    id: 9,
    q: "선물 포장지를 뜯을 때",
    a1: { text: "혼자 조용히 뜯는다", tags: ["I"] },
    a2: { text: "사람들과 함께 분위기를 띄운다", tags: ["E"] },
  },
  {
    id: 10,
    q: "포장지를 뜯기 전에 계획을 세울 때",
    a1: { text: "미리 계획하고 순서를 정한다", tags: ["J"] },
    a2: { text: "즉흥적으로 그때그때 뜯는다", tags: ["P"] },
  },
  {
    id: 11,
    q: "포장지를 뜯을 때 이유를 생각할 때",
    a1: { text: "내용물을 확인하기 위해 실용적으로 뜯는다", tags: ["T"] },
    a2: { text: "포장지도 예쁘다고 생각해서 감성적으로 뜯는다", tags: ["F"] },
  },
  {
    id: 12,
    q: "선물 포장지를 뜯고 정말 좋아서 공유하고 싶을 때",
    a1: { text: "즉시 후기를 공유하고 경험을 나눈다", tags: ["E"] },
    a2: { text: "조용히 혼자만의 특별한 순간으로 간직한다", tags: ["I"] },
  },
]

export default function GiftWrappingTest() {
  const quizLogic = useQuizLogic({
    testId: "gift-wrapping",
    questions,
    resultPath: "/tests/gift-wrapping/test/result",
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
