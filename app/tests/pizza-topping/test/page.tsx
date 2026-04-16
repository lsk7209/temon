"use client"

/**
 * Component: PizzaToppingTest
 * 피자 토핑 테스트 페이지
 * @example <PizzaToppingTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "피자 토핑을 고를 때",
    a1: { text: "항상 페퍼로니로 고정한다", tags: ["J"] },
    a2: { text: "그때그때 다양한 토핑을 시도한다", tags: ["P"] },
  },
  {
    id: 2,
    q: "치즈는 필수인가요?",
    a1: { text: "치즈 더블 필수", tags: ["F"] },
    a2: { text: "기본 치즈만, 과하면 느끼해", tags: ["T"] },
  },
  {
    id: 3,
    q: "피자에 야채 토핑을 추가할 때",
    a1: { text: "야채는 빼고 고기만 선택한다", tags: ["T"] },
    a2: { text: "야채를 가득 넣고 영양을 고려한다", tags: ["F"] },
  },
  {
    id: 4,
    q: "피자를 주문할 때",
    a1: { text: "메뉴를 미리 정해둔다", tags: ["J"] },
    a2: { text: "그때그때 결정한다", tags: ["P"] },
  },
  {
    id: 5,
    q: "피자 조각을 선택할 때",
    a1: { text: "가장 큰 조각을 선택한다", tags: ["S"] },
    a2: { text: "토핑이 많은 조각을 선택한다", tags: ["N"] },
  },
  {
    id: 6,
    q: "피자를 먹을 때 순서를 정할 때",
    a1: { text: "가장자리부터 차근차근 먹는다", tags: ["J"] },
    a2: { text: "가운데부터 가장 맛있는 부분을 먹는다", tags: ["P"] },
  },
  {
    id: 7,
    q: "피자 사진을 찍을 때?",
    a1: { text: "사진 찍고 바로 먹기 시작", tags: ["E"] },
    a2: { text: "조용히 맛에 집중", tags: ["I"] },
  },
  {
    id: 8,
    q: "피자 조각이 떨어졌을 때?",
    a1: { text: "포기하고 포크로 먹기", tags: ["T"] },
    a2: { text: "다시 올려서 도전", tags: ["F"] },
  },
  {
    id: 9,
    q: "피자를 고를 때 무엇을 중시하나요?",
    a1: { text: "가격·칼로리·영양 정보", tags: ["T"] },
    a2: { text: "맛·인기·추천 메뉴", tags: ["F"] },
  },
  {
    id: 10,
    q: "피자 토핑 조합을 정할 때",
    a1: { text: "클래식 조합만 선택한다", tags: ["S"] },
    a2: { text: "신기한 조합을 시도한다", tags: ["N"] },
  },
  {
    id: 11,
    q: "피자를 먹고 난 후?",
    a1: { text: "후기 바로 작성", tags: ["E"] },
    a2: { text: "조용히 소화하며 만족", tags: ["I"] },
  },
  {
    id: 12,
    q: "피자 나눠 먹을 때?",
    a1: { text: "한 조각씩 나눠 먹자고 제안", tags: ["E"] },
    a2: { text: "각자 접시에 조용히 담음", tags: ["I"] },
  },
]

export default function PizzaToppingTest() {
  const quizLogic = useQuizLogic({
    testId: "pizza-topping",
    questions,
    resultPath: "/tests/pizza-topping/test/result",
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
      colorClasses={getQuizColorScheme("orange-red")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}

