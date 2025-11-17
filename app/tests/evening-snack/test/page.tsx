"use client"

/**
 * Component: EveningSnackTest
 * 저녁 간식 테스트 페이지
 * @example <EveningSnackTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "저녁에 배가 고플 때",
    a1: { text: "미리 정해둔 간식을 먹는다", tags: ["J", "S"] },
    a2: { text: "그때그때 선택한다", tags: ["P", "N"] },
  },
  {
    id: 2,
    q: "저녁 간식을 고를 때",
    a1: { text: "정해진 간식을 선택한다", tags: ["S", "J"] },
    a2: { text: "새로운 간식을 시도한다", tags: ["N", "P"] },
  },
  {
    id: 3,
    q: "저녁에 간식을 먹을 때",
    a1: { text: "정해진 양만 먹는다", tags: ["J", "T"] },
    a2: { text: "기분에 따라 양이 달라진다", tags: ["P", "F"] },
  },
  {
    id: 4,
    q: "저녁에 간식을 먹는 장소",
    a1: { text: "집에서 혼자 먹는다", tags: ["I", "S"] },
    a2: { text: "밖에서 사람들과 먹는다", tags: ["E", "N"] },
  },
  {
    id: 5,
    q: "저녁에 간식을 먹는 시간",
    a1: { text: "정해진 시간에 먹는다", tags: ["J", "S"] },
    a2: { text: "그때그때 먹는다", tags: ["P", "N"] },
  },
  {
    id: 6,
    q: "저녁에 간식을 먹는 이유",
    a1: { text: "에너지 충전을 위해", tags: ["T", "S"] },
    a2: { text: "기분 전환을 위해", tags: ["F", "N"] },
  },
  {
    id: 7,
    q: "저녁에 간식이 마음에 안 들 때",
    a1: { text: "그냥 먹는다", tags: ["S", "T"] },
    a2: { text: "다른 간식을 찾는다", tags: ["N", "F"] },
  },
  {
    id: 8,
    q: "새로운 저녁 간식을 시도할 때",
    a1: { text: "리뷰를 보고 신중하게 선택한다", tags: ["S", "I"] },
    a2: { text: "바로 시도해본다", tags: ["N", "E"] },
  },
  {
    id: 9,
    q: "저녁에 간식을 먹는 방식",
    a1: { text: "같은 간식을 반복해서 먹는다", tags: ["S", "I"] },
    a2: { text: "다양한 간식을 시도한다", tags: ["N", "E"] },
  },
  {
    id: 10,
    q: "저녁 간식 후 할 일",
    a1: { text: "즉시 할 일을 시작한다", tags: ["E", "J"] },
    a2: { text: "잠시 더 여유롭게 즐긴다", tags: ["I", "P"] },
  },
  {
    id: 11,
    q: "저녁에 간식을 선택하는 기준",
    a1: { text: "영양과 효율을 위해", tags: ["T", "J"] },
    a2: { text: "기분과 맛을 위해", tags: ["F", "P"] },
  },
  {
    id: 12,
    q: "저녁에 간식을 먹는 환경",
    a1: { text: "조용하고 집중할 수 있는 곳", tags: ["I", "S"] },
    a2: { text: "활기차고 사람들이 있는 곳", tags: ["E", "N"] },
  },
]

export default function EveningSnackTest() {
  const quizLogic = useQuizLogic({
    testId: "evening-snack",
    questions,
    resultPath: "/tests/evening-snack/test/result",
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
      colorClasses={getQuizColorScheme("yellow-amber")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
