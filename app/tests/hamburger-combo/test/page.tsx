"use client"

/**
 * Component: HamburgerComboTest
 * 햄버거 콤보 테스트 페이지
 * @example <HamburgerComboTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "햄버거집에서 패티를 고를 때",
    a1: { text: "항상 소고기 패티로 고정한다", tags: ["J"] },
    a2: { text: "그때그때 치킨이나 새우 등 다양하게 선택한다", tags: ["P"] },
  },
  {
    id: 2,
    q: "햄버거집에서 빵을 선택할 때",
    a1: { text: "클래식 번을 선택한다", tags: ["S"] },
    a2: { text: "브리오슈나 통밀 등 특별한 빵을 선호한다", tags: ["N"] },
  },
  {
    id: 3,
    q: "햄버거에 야채를 넣을 때",
    a1: { text: "기본 야채만 간단하게 넣는다", tags: ["T"] },
    a2: { text: "추가 야채까지 가득 넣는다", tags: ["F"] },
  },
  {
    id: 4,
    q: "햄버거에 소스를 선택할 때",
    a1: { text: "케첩이나 머스타드 같은 기본만 선택한다", tags: ["S"] },
    a2: { text: "특제 소스 여러 개를 조합한다", tags: ["N"] },
  },
  {
    id: 5,
    q: "햄버거에 치즈를 추가할 때",
    a1: { text: "치즈 없으면 못 먹는다", tags: ["F"] },
    a2: { text: "치즈 빼도 OK, 맛이 더 깔끔하다", tags: ["T"] },
  },
  {
    id: 6,
    q: "햄버거집에서 주문할 때",
    a1: { text: "메뉴판을 미리 정해둔다", tags: ["J"] },
    a2: { text: "줄 서서 그때그때 결정한다", tags: ["P"] },
  },
  {
    id: 7,
    q: "햄버거와 함께 사이드 메뉴를 선택할 때",
    a1: { text: "감자튀김만 간단하게 선택한다", tags: ["I"] },
    a2: { text: "감자튀김+콜라+디저트 세트를 선택한다", tags: ["E"] },
  },
  {
    id: 8,
    q: "햄버거를 먹을 때",
    a1: { text: "한 입씩 차근차근 먹는다", tags: ["J"] },
    a2: { text: "먹다 보니 어느새 다 먹는다", tags: ["P"] },
  },
  {
    id: 9,
    q: "햄버거를 먹기 전에 사진을 찍을 때",
    a1: { text: "사진을 찍고 바로 먹기 시작한다", tags: ["E"] },
    a2: { text: "조용히 맛에 집중한다", tags: ["I"] },
  },
  {
    id: 10,
    q: "햄버거를 먹다가 무너졌을 때",
    a1: { text: "포기하고 포크로 먹는다", tags: ["T"] },
    a2: { text: "다시 조립해서 도전한다", tags: ["F"] },
  },
  {
    id: 11,
    q: "햄버거를 선택할 때 무엇을 중시할 때",
    a1: { text: "가격, 칼로리, 영양 정보를 중시한다", tags: ["T"] },
    a2: { text: "맛, 인기, 추천 메뉴를 중시한다", tags: ["F"] },
  },
  {
    id: 12,
    q: "햄버거를 먹고 정말 맛있어서 공유하고 싶을 때",
    a1: { text: "즉시 후기를 작성하고 공유한다", tags: ["E"] },
    a2: { text: "조용히 소화하며 만족한다", tags: ["I"] },
  },
]

export default function HamburgerComboTest() {
  const quizLogic = useQuizLogic({
    testId: "hamburger-combo",
    questions,
    resultPath: "/tests/hamburger-combo/test/result",
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
