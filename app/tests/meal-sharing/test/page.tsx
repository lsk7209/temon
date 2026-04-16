"use client"

/**
 * Component: MealSharingTest
 * 식사 공유 테스트 페이지
 * @example <MealSharingTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "맛있는 음식을 먹을 때",
    a1: { text: "즉시 친구들에게 공유하고 싶다", tags: ["E", "F"] },
    a2: { text: "혼자만 즐기고 싶다", tags: ["I", "T"] },
  },
  {
    id: 2,
    q: "음식을 공유할 때",
    a1: { text: "사진을 찍어 SNS에 올린다", tags: ["E", "P"] },
    a2: { text: "직접 나눠 먹거나 선물한다", tags: ["I", "J"] },
  },
  {
    id: 3,
    q: "음식 공유 방식",
    a1: { text: "즉흥적으로 공유한다", tags: ["P", "F"] },
    a2: { text: "계획적으로 공유한다", tags: ["J", "T"] },
  },
  {
    id: 4,
    q: "음식 공유 이유",
    a1: { text: "다른 사람의 반응이 좋아서", tags: ["E", "F"] },
    a2: { text: "정보나 레시피를 알려주기 위해", tags: ["I", "T"] },
  },
  {
    id: 5,
    q: "음식 공유 대상",
    a1: { text: "많은 사람과 공유한다", tags: ["E", "F"] },
    a2: { text: "가까운 사람과만 공유한다", tags: ["I", "T"] },
  },
  {
    id: 6,
    q: "음식 공유 준비",
    a1: { text: "미리 사진과 설명을 준비한다", tags: ["J", "S"] },
    a2: { text: "그때그때 즉흥적으로 공유한다", tags: ["P", "N"] },
  },
  {
    id: 7,
    q: "음식 공유 후",
    a1: { text: "댓글이나 반응을 확인하며 즐긴다", tags: ["E", "F"] },
    a2: { text: "공유만 하고 다른 일을 한다", tags: ["I", "T"] },
  },
  {
    id: 8,
    q: "음식 공유 패턴",
    a1: { text: "새로운 플랫폼이나 방법을 시도한다", tags: ["N", "P"] },
    a2: { text: "익숙한 방법으로 꾸준히 공유한다", tags: ["S", "J"] },
  },
  {
    id: 9,
    q: "음식 공유 기록",
    a1: { text: "공유한 음식을 기록하고 관리한다", tags: ["J", "S"] },
    a2: { text: "기록하지 않고 그때그때 공유한다", tags: ["P", "N"] },
  },
  {
    id: 10,
    q: "음식 공유 완성도",
    a1: { text: "완벽한 사진과 설명으로 공유한다", tags: ["J", "T"] },
    a2: { text: "대략적으로만 공유한다", tags: ["P", "F"] },
  },
  {
    id: 11,
    q: "음식 공유 스트레스",
    a1: { text: "공유하는 게 즐겁다", tags: ["E", "F"] },
    a2: { text: "공유하는 게 부담스럽다", tags: ["I", "T"] },
  },
  {
    id: 12,
    q: "음식 공유 스타일",
    a1: { text: "계획적이고 체계적으로 공유한다", tags: ["J", "T"] },
    a2: { text: "즉흥적이고 감성적으로 공유한다", tags: ["P", "F"] },
  },
]

export default function MealSharingTest() {
  const quizLogic = useQuizLogic({
    testId: "meal-sharing",
    questions,
    resultPath: "/tests/meal-sharing/test/result",
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
      colorClasses={getQuizColorScheme("green-teal")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
