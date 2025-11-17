"use client"

/**
 * Component: EveningEntertainmentTest
 * 저녁 오락 테스트 페이지
 * @example <EveningEntertainmentTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "저녁에 뭐 볼지 고민될 때",
    a1: { text: "미리 정해둔 작품을 본다", tags: ["J", "S"] },
    a2: { text: "그때그때 선택한다", tags: ["P", "N"] },
  },
  {
    id: 2,
    q: "드라마가 끝났을 때",
    a1: { text: "다음 작품을 바로 찾는다", tags: ["T", "J"] },
    a2: { text: "잠시 쉰다", tags: ["F", "P"] },
  },
  {
    id: 3,
    q: "저녁에 오락을 선택할 때",
    a1: { text: "정해진 장르를 선택한다", tags: ["S", "J"] },
    a2: { text: "다양한 장르를 시도한다", tags: ["N", "P"] },
  },
  {
    id: 4,
    q: "저녁에 오락을 볼 때",
    a1: { text: "혼자 조용히 본다", tags: ["I", "S"] },
    a2: { text: "사람들과 함께 본다", tags: ["E", "N"] },
  },
  {
    id: 5,
    q: "저녁에 오락을 보는 시간",
    a1: { text: "정해진 시간에 본다", tags: ["J", "S"] },
    a2: { text: "그때그때 본다", tags: ["P", "N"] },
  },
  {
    id: 6,
    q: "저녁에 오락을 보는 이유",
    a1: { text: "정보와 학습을 위해", tags: ["T", "S"] },
    a2: { text: "기분 전환과 즐거움을 위해", tags: ["F", "N"] },
  },
  {
    id: 7,
    q: "저녁에 오락이 재미없을 때",
    a1: { text: "그냥 본다", tags: ["S", "T"] },
    a2: { text: "다른 작품을 찾는다", tags: ["N", "F"] },
  },
  {
    id: 8,
    q: "새로운 오락을 시도할 때",
    a1: { text: "리뷰를 보고 신중하게 선택한다", tags: ["S", "I"] },
    a2: { text: "바로 시도해본다", tags: ["N", "E"] },
  },
  {
    id: 9,
    q: "저녁에 오락을 보는 방식",
    a1: { text: "같은 작품을 반복해서 본다", tags: ["S", "I"] },
    a2: { text: "다양한 작품을 시도한다", tags: ["N", "E"] },
  },
  {
    id: 10,
    q: "저녁에 오락을 보고 나서",
    a1: { text: "즉시 할 일을 시작한다", tags: ["E", "J"] },
    a2: { text: "잠시 더 여유롭게 즐긴다", tags: ["I", "P"] },
  },
  {
    id: 11,
    q: "저녁에 오락을 보는 환경",
    a1: { text: "조용하고 집중할 수 있는 곳", tags: ["I", "S"] },
    a2: { text: "활기차고 사람들이 있는 곳", tags: ["E", "N"] },
  },
  {
    id: 12,
    q: "저녁에 오락을 보는 기준",
    a1: { text: "목표와 계획을 위해", tags: ["T", "J"] },
    a2: { text: "기분과 컨디션을 위해", tags: ["F", "P"] },
  },
]

export default function EveningEntertainmentTest() {
  const quizLogic = useQuizLogic({
    testId: "evening-entertainment",
    questions,
    resultPath: "/tests/evening-entertainment/test/result",
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
      colorClasses={getQuizColorScheme("blue-purple")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}

