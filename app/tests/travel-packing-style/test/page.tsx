"use client"

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "여행 준비 시작 시점은?",
    a1: { text: "상황을 기준으로 체계적으로 선택한다", tags: ["E"] },
    a2: { text: "감각/직관을 믿고 유연하게 선택한다", tags: ["I"] },
  },
  {
    id: 2,
    q: "짐 리스트를 만드는 편인가?",
    a1: { text: "상황을 기준으로 체계적으로 선택한다", tags: ["S"] },
    a2: { text: "감각/직관을 믿고 유연하게 선택한다", tags: ["N"] },
  },
  {
    id: 3,
    q: "옷 선택 기준은?",
    a1: { text: "상황을 기준으로 체계적으로 선택한다", tags: ["T"] },
    a2: { text: "감각/직관을 믿고 유연하게 선택한다", tags: ["F"] },
  },
  {
    id: 4,
    q: "비상약/상비품 준비 정도는?",
    a1: { text: "상황을 기준으로 체계적으로 선택한다", tags: ["J"] },
    a2: { text: "감각/직관을 믿고 유연하게 선택한다", tags: ["P"] },
  },
  {
    id: 5,
    q: "짐이 많아질 때 우선 포기하는 것은?",
    a1: { text: "상황을 기준으로 체계적으로 선택한다", tags: ["E"] },
    a2: { text: "감각/직관을 믿고 유연하게 선택한다", tags: ["I"] },
  },
  {
    id: 6,
    q: "전자기기/충전기 챙기는 방식은?",
    a1: { text: "상황을 기준으로 체계적으로 선택한다", tags: ["S"] },
    a2: { text: "감각/직관을 믿고 유연하게 선택한다", tags: ["N"] },
  },
  {
    id: 7,
    q: "기내용/위탁 수하물 전략은?",
    a1: { text: "상황을 기준으로 체계적으로 선택한다", tags: ["T"] },
    a2: { text: "감각/직관을 믿고 유연하게 선택한다", tags: ["F"] },
  },
  {
    id: 8,
    q: "현지 날씨 변수 대응은?",
    a1: { text: "상황을 기준으로 체계적으로 선택한다", tags: ["J"] },
    a2: { text: "감각/직관을 믿고 유연하게 선택한다", tags: ["P"] },
  },
  {
    id: 9,
    q: "기념품 공간을 미리 비워두는가?",
    a1: { text: "상황을 기준으로 체계적으로 선택한다", tags: ["E"] },
    a2: { text: "감각/직관을 믿고 유연하게 선택한다", tags: ["I"] },
  },
  {
    id: 10,
    q: "공항 도착 전 체크하는 것 1순위는?",
    a1: { text: "상황을 기준으로 체계적으로 선택한다", tags: ["S"] },
    a2: { text: "감각/직관을 믿고 유연하게 선택한다", tags: ["N"] },
  },
  {
    id: 11,
    q: "동행인 짐싸기에 개입하는가?",
    a1: { text: "상황을 기준으로 체계적으로 선택한다", tags: ["T"] },
    a2: { text: "감각/직관을 믿고 유연하게 선택한다", tags: ["F"] },
  },
  {
    id: 12,
    q: "내 짐싸기 한 줄 설명은?",
    a1: { text: "상황을 기준으로 체계적으로 선택한다", tags: ["J"] },
    a2: { text: "감각/직관을 믿고 유연하게 선택한다", tags: ["P"] },
  }
]

export default function TravelPackingStyleTestPage() {
  const quizLogic = useQuizLogic({
    testId: "travel-packing-style",
    questions,
    resultPath: "/tests/travel-packing-style/test/result",
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
      colorClasses={getQuizColorScheme("pink-rose-red")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
