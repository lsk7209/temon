"use client"

/**
 * Component: PhoneStorageTest
 * 폰 저장공간 관리 습관 테스트 페이지
 * @example <PhoneStorageTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "저장공간이 부족할 때",
    a1: { text: "즉시 정리한다", tags: ["E", "J"] },
    a2: { text: "나중에 정리한다", tags: ["I", "P"] },
  },
  {
    id: 2,
    q: "사진을 정리해야 할 때",
    a1: { text: "계획대로 정리한다", tags: ["J", "T"] },
    a2: { text: "상황에 따라 정리한다", tags: ["P", "F"] },
  },
  {
    id: 3,
    q: "저장공간을 관리하는 방식",
    a1: { text: "혼자 조용히 관리한다", tags: ["I", "S"] },
    a2: { text: "사람들과 함께 관리한다", tags: ["E", "N"] },
  },
  {
    id: 4,
    q: "저장공간을 정리하는 시간",
    a1: { text: "정해진 시간에 정리한다", tags: ["J", "S"] },
    a2: { text: "그때그때 정리한다", tags: ["P", "N"] },
  },
  {
    id: 5,
    q: "저장공간을 관리하는 이유",
    a1: { text: "목표와 효율을 위해", tags: ["T", "J"] },
    a2: { text: "기분과 컨디션을 위해", tags: ["F", "P"] },
  },
  {
    id: 6,
    q: "저장공간을 선택하는 기준",
    a1: { text: "효율성과 목표를 위해", tags: ["T", "J"] },
    a2: { text: "기분과 컨디션을 위해", tags: ["F", "P"] },
  },
  {
    id: 7,
    q: "저장공간 관리 목록이 쌓였을 때",
    a1: { text: "체계적으로 정리한다", tags: ["J", "T"] },
    a2: { text: "하나씩 처리한다", tags: ["P", "F"] },
  },
  {
    id: 8,
    q: "새로운 저장공간 관리 방법을 시도할 때",
    a1: { text: "리뷰를 보고 신중하게 선택한다", tags: ["S", "I"] },
    a2: { text: "바로 시도해본다", tags: ["N", "E"] },
  },
  {
    id: 9,
    q: "저장공간을 관리하는 강도",
    a1: { text: "정해진 강도만 관리한다", tags: ["J", "T"] },
    a2: { text: "기분에 따라 강도가 달라진다", tags: ["P", "F"] },
  },
  {
    id: 10,
    q: "저장공간 정리 후 할 일",
    a1: { text: "즉시 할 일을 시작한다", tags: ["E", "J"] },
    a2: { text: "잠시 더 여유롭게 즐긴다", tags: ["I", "P"] },
  },
  {
    id: 11,
    q: "저장공간을 마무리할 때",
    a1: { text: "정해진 시간에 끝낸다", tags: ["J", "T"] },
    a2: { text: "완료할 때까지 관리한다", tags: ["P", "F"] },
  },
  {
    id: 12,
    q: "저장공간을 관리하는 환경",
    a1: { text: "조용하고 집중할 수 있는 곳", tags: ["I", "S"] },
    a2: { text: "활기차고 사람들이 있는 곳", tags: ["E", "N"] },
  },
]

export default function PhoneStorageTest() {
  const quizLogic = useQuizLogic({
    testId: "phone-storage",
    questions,
    resultPath: "/tests/phone-storage/test/result",
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


