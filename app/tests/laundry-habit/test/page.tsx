"use client"

/**
 * Component: LaundryHabitTest
 * 세탁 습관 테스트 페이지
 * @example <LaundryHabitTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "세탁을 하다가 세탁물이 산더미처럼 쌓였을 때",
    a1: { text: "정해진 순서대로 체계적으로 정리한다", tags: ["J"] },
    a2: { text: "그때그때 필요한 것만 빨리 한다", tags: ["P"] },
  },
  {
    id: 2,
    q: "세탁을 하다가 옷을 분류할 때",
    a1: { text: "색깔, 재질, 온도별로 논리적으로 분류한다", tags: ["T"] },
    a2: { text: "느낌이나 기분에 따라 의미 있게 분류한다", tags: ["F"] },
  },
  {
    id: 3,
    q: "세탁을 하다가 시간이 부족해서 급할 때",
    a1: { text: "천천히 꼼꼼하게 끝까지 한다", tags: ["F"] },
    a2: { text: "빨리 중요한 것만 하고 끝낸다", tags: ["T"] },
  },
  {
    id: 4,
    q: "세탁을 하기 전에 계획을 세울 때",
    a1: { text: "미리 언제 무엇을 어떻게 할지 계획한다", tags: ["J"] },
    a2: { text: "그때그때 즉흥적으로 한다", tags: ["P"] },
  },
  {
    id: 5,
    q: "세탁을 끝내고 나가다가 세탁물이 제대로 되었는지 불안할 때",
    a1: { text: "다시 돌아가서 확인한다", tags: ["F"] },
    a2: { text: "그냥 가고 신경 안 쓴다", tags: ["T"] },
  },
  {
    id: 6,
    q: "세탁을 하다가 가족이나 친구들이 함께 있을 때",
    a1: { text: "혼자 조용히 한다", tags: ["I"] },
    a2: { text: "함께 하면서 대화한다", tags: ["E"] },
  },
  {
    id: 7,
    q: "세탁을 하다가 세탁 방법이나 제품을 선택할 때",
    a1: { text: "실용적이고 효율적인 걸 선택한다", tags: ["S"] },
    a2: { text: "특별하고 의미 있는 걸 선택한다", tags: ["N"] },
  },
  {
    id: 8,
    q: "세탁을 하다가 여러 옷을 세탁해야 할 때",
    a1: { text: "정해진 순서대로 체계적으로 한다", tags: ["J"] },
    a2: { text: "자연스럽게 편한 대로 한다", tags: ["P"] },
  },
  {
    id: 9,
    q: "세탁을 하다가 세탁하는 게 재미있고 즐거울 때",
    a1: { text: "조용히 혼자 즐긴다", tags: ["I"] },
    a2: { text: "친구들에게 공유하고 함께 즐긴다", tags: ["E"] },
  },
  {
    id: 10,
    q: "세탁을 하다가 세탁 기준이나 원칙을 정할 때",
    a1: { text: "감성적이고 의미 있는 기준을 정한다", tags: ["F"] },
    a2: { text: "실용적이고 효율적인 기준만 정한다", tags: ["T"] },
  },
  {
    id: 11,
    q: "세탁을 끝내고 세탁 경험이 특별해서 공유하고 싶을 때",
    a1: { text: "즉시 친구들에게 경험을 공유한다", tags: ["E"] },
    a2: { text: "혼자만의 특별한 경험으로 간직한다", tags: ["I"] },
  },
  {
    id: 12,
    q: "세탁을 하다가 세탁하는 이유나 의미를 생각할 때",
    a1: { text: "특별한 의미나 목적을 부여한다", tags: ["N"] },
    a2: { text: "단순히 옷이 더러워서 한다", tags: ["S"] },
  },
]

export default function LaundryHabitTest() {
  const quizLogic = useQuizLogic({
    testId: "laundry-habit",
    questions,
    resultPath: "/tests/laundry-habit/test/result",
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
      colorClasses={getQuizColorScheme("cyan-blue")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
