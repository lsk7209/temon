"use client"

/**
 * Component: FoodReviewTest
 * 음식 리뷰 테스트 페이지
 * @example <FoodReviewTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "맛집에서 식사를 마치고 나서 리뷰를 작성할 때",
    a1: { text: "자주 작성하고 적극적으로 리뷰를 남긴다", tags: ["E"] },
    a2: { text: "가끔 작성하고 신중하게 리뷰를 남긴다", tags: ["I"] },
  },
  {
    id: 2,
    q: "리뷰를 작성할 때 내용을 쓸 때",
    a1: { text: "자세하고 상세하게 리뷰를 작성한다", tags: ["J"] },
    a2: { text: "간단히 핵심만 리뷰를 작성한다", tags: ["P"] },
  },
  {
    id: 3,
    q: "리뷰를 작성할 때 내용을 선택할 때",
    a1: { text: "객관적이고 사실 중심으로 작성한다", tags: ["T"] },
    a2: { text: "주관적이고 감성 중심으로 작성한다", tags: ["F"] },
  },
  {
    id: 4,
    q: "식사를 마치고 나서 리뷰를 작성할 때",
    a1: { text: "즉시 바로 리뷰를 작성한다", tags: ["E"] },
    a2: { text: "나중에 신중하게 리뷰를 작성한다", tags: ["I"] },
  },
  {
    id: 5,
    q: "리뷰를 작성하고 나서 친구들에게 공유할 때",
    a1: { text: "적극적으로 공유한다", tags: ["E"] },
    a2: { text: "조용히 혼자만 간직한다", tags: ["I"] },
  },
  {
    id: 6,
    q: "리뷰를 작성할 때 평가 기준을 정할 때",
    a1: { text: "논리적이고 객관적인 기준으로 평가한다", tags: ["T"] },
    a2: { text: "감성적이고 주관적인 기준으로 평가한다", tags: ["F"] },
  },
  {
    id: 7,
    q: "리뷰를 작성할 때 스타일을 선택할 때",
    a1: { text: "익숙한 스타일로 기본적으로 작성한다", tags: ["S"] },
    a2: { text: "새로운 스타일로 창의적으로 작성한다", tags: ["N"] },
  },
  {
    id: 8,
    q: "리뷰를 작성하기 전에 준비할 때",
    a1: { text: "미리 준비하고 계획해서 작성한다", tags: ["J"] },
    a2: { text: "그때그때 즉흥적으로 작성한다", tags: ["P"] },
  },
  {
    id: 9,
    q: "리뷰를 작성하고 나서 기분이 좋을 때",
    a1: { text: "만족감과 성취감을 느낀다", tags: ["E"] },
    a2: { text: "평온함과 차분함을 느낀다", tags: ["I"] },
  },
  {
    id: 10,
    q: "친구가 '왜 리뷰를 써?'라고 물어볼 때",
    a1: { text: "다른 사람에게 도움이 되고 실용적이라서 쓴다고 말한다", tags: ["T"] },
    a2: { text: "경험을 공유하고 감성을 나누기 위해 쓴다고 말한다", tags: ["F"] },
  },
  {
    id: 11,
    q: "리뷰를 작성할 때 방식을 선택할 때",
    a1: { text: "전통적인 방식으로 기본적으로 작성한다", tags: ["S"] },
    a2: { text: "새로운 방식으로 혁신적으로 작성한다", tags: ["N"] },
  },
  {
    id: 12,
    q: "리뷰를 작성할 때 평가 기준을 생각할 때",
    a1: { text: "실용성과 효율성을 기준으로 평가한다", tags: ["T"] },
    a2: { text: "감성과 의미를 기준으로 평가한다", tags: ["F"] },
  },
]

export default function FoodReviewTest() {
  const quizLogic = useQuizLogic({
    testId: "food-review",
    questions,
    resultPath: "/tests/food-review/test/result",
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
      colorClasses={getQuizColorScheme("amber-yellow")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
