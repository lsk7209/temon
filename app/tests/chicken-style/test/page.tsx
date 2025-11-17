"use client"

/**
 * Component: ChickenStyleTest
 * 치킨 스타일 테스트 페이지
 * @example <ChickenStyleTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "치킨을 시키기 전에 메뉴를 정할 때",
    a1: { text: "항상 먹던 메뉴로 바로 결정한다", tags: ["J"] },
    a2: { text: "앱 할인과 리뷰를 보며 그때그때 결정한다", tags: ["P"] },
  },
  {
    id: 2,
    q: "신메뉴가 나왔다면?",
    a1: { text: "시그니처부터 확인", tags: ["S"] },
    a2: { text: "신메뉴 먼저 도전", tags: ["N"] },
  },
  {
    id: 3,
    q: "치킨 주문 인원을 모집할 때",
    a1: { text: "단톡에 먼저 모집 글을 올린다", tags: ["E"] },
    a2: { text: "조용히 혼자 주문한다", tags: ["I"] },
  },
  {
    id: 4,
    q: "치킨을 여러 명이 먹고 정산할 때",
    a1: { text: "원가 기준으로 정확히 N분의 1로 계산한다", tags: ["T"] },
    a2: { text: "상황을 보고 조금 더 내거나 배려한다", tags: ["F"] },
  },
  {
    id: 5,
    q: "배달 오기 전 무엇을 하나요?",
    a1: { text: "소스·음료·접시 미리 세팅", tags: ["J"] },
    a2: { text: "오면 그때 상황 보고 준비", tags: ["P"] },
  },
  {
    id: 6,
    q: "치킨을 주문할 때 후라이드와 양념 중 선택할 때",
    a1: { text: "기본의 맛과 식감을 우선한다", tags: ["S"] },
    a2: { text: "소스 조합과 변주를 우선한다", tags: ["N"] },
  },
  {
    id: 7,
    q: "치킨이 도착했을 때",
    a1: { text: "사진과 후기를 실시간으로 공유한다", tags: ["E"] },
    a2: { text: "조용히 첫 조각에 집중한다", tags: ["I"] },
  },
  {
    id: 8,
    q: "뼈 vs 순살 논쟁이 벌어지면?",
    a1: { text: "가격·중량·식감 근거로 설득", tags: ["T"] },
    a2: { text: "서로 맞추는 타협안 제안", tags: ["F"] },
  },
  {
    id: 9,
    q: "치킨과 함께 사이드 메뉴를 선택할 때",
    a1: { text: "콜라나 치킨무 등 기본만 계획대로 선택한다", tags: ["J"] },
    a2: { text: "치즈볼이나 웨지감자 등을 현장에서 추가한다", tags: ["P"] },
  },
  {
    id: 10,
    q: "리뷰를 볼 때 무엇을 중시하나?",
    a1: { text: "평균 평점·사진의 객관 정보", tags: ["S"] },
    a2: { text: "최근 트렌드·신메뉴 평판 흐름", tags: ["N"] },
  },
  {
    id: 11,
    q: "치킨을 같이 먹을 때",
    a1: { text: "한 조각씩 나눠 먹자고 제안한다", tags: ["E"] },
    a2: { text: "각자 접시에 조용히 담는다", tags: ["I"] },
  },
  {
    id: 12,
    q: "남은 치킨을 처리할 때",
    a1: { text: "밀폐와 재가열 가이드대로 보관한다", tags: ["T"] },
    a2: { text: "이웃이나 동료에게 기분 좋게 나눠준다", tags: ["F"] },
  },
]

export default function ChickenStyleTest() {
  const quizLogic = useQuizLogic({
    testId: "chicken-style",
    questions,
    resultPath: "/tests/chicken-style/test/result",
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
