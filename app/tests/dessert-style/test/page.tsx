"use client"

/**
 * Component: DessertStyleTest
 * 디저트 스타일 테스트 페이지
 * @example <DessertStyleTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "카페에서 메뉴 고를 때",
    a1: { text: "늘 먹는 메뉴", tags: ["S"] },
    a2: { text: "오늘은 새로운 메뉴!", tags: ["N"] },
  },
  {
    id: 2,
    q: "디저트 취향",
    a1: { text: "달콤·진한 맛", tags: ["F"] },
    a2: { text: "담백·깔끔한 맛", tags: ["T"] },
  },
  {
    id: 3,
    q: "카페 자리를 고를 때",
    a1: { text: "창가 자리 필수", tags: ["I"] },
    a2: { text: "아무 자리나 상관없음", tags: ["E"] },
  },
  {
    id: 4,
    q: "사진 찍을 때",
    a1: { text: "음식 중심 구도", tags: ["S"] },
    a2: { text: "감성 분위기 중심", tags: ["N"] },
  },
  {
    id: 5,
    q: "케이크 고를 때",
    a1: { text: "생크림 고전파", tags: ["J"] },
    a2: { text: "무스·티라미수 등 신메뉴", tags: ["P"] },
  },
  {
    id: 6,
    q: "친구가 고른 디저트가 더 맛있을 때",
    a1: { text: "나도 그걸 시킬 걸 후회", tags: ["F"] },
    a2: { text: "그냥 참고 내 것 먹음", tags: ["T"] },
  },
  {
    id: 7,
    q: "디저트 카페 고를 때",
    a1: { text: "후기를 꼼꼼히 확인", tags: ["J"] },
    a2: { text: "즉흥적으로 들어감", tags: ["P"] },
  },
  {
    id: 8,
    q: "쿠키 2개 중 1개를 고른다면",
    a1: { text: "초코칩 쿠키", tags: ["S"] },
    a2: { text: "말차 쿠키", tags: ["N"] },
  },
  {
    id: 9,
    q: "빵집에서 고를 때",
    a1: { text: "식사빵 위주", tags: ["T"] },
    a2: { text: "달달한 디저트빵 위주", tags: ["F"] },
  },
  {
    id: 10,
    q: "디저트 먹는 속도",
    a1: { text: "천천히 음미", tags: ["I"] },
    a2: { text: "빠르게 흡입", tags: ["E"] },
  },
  {
    id: 11,
    q: "다이어트 중 디저트 제안받으면",
    a1: { text: "미련 없이 거절", tags: ["T"] },
    a2: { text: '"오늘만 괜찮겠지?"', tags: ["F"] },
  },
  {
    id: 12,
    q: "디저트를 고르는 기준",
    a1: { text: "가성비", tags: ["S"] },
    a2: { text: "감성비", tags: ["N"] },
  },
]

export default function DessertStyleTest() {
  const quizLogic = useQuizLogic({
    testId: "dessert-style",
    questions,
    resultPath: "/tests/dessert-style/test/result",
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
      colorClasses={getQuizColorScheme("orange-amber-yellow")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
