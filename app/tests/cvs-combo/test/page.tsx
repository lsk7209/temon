"use client"

/**
 * Component: CvsComboTest
 * 편의점 조합 테스트 페이지
 * @example <CvsComboTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "편의점에 들어서자마자",
    a1: { text: "살 것만 빠르게 담고 계산한다", tags: ["J"] },
    a2: { text: "한 바퀴 돌며 신상품부터 훑어본다", tags: ["P"] },
  },
  {
    id: 2,
    q: "시즌 한정 신상품을 보면?",
    a1: { text: "기본 메뉴부터 확인", tags: ["S"] },
    a2: { text: "바로 시도해봄", tags: ["N"] },
  },
  {
    id: 3,
    q: "동행과 함께라면?",
    a1: { text: "대화하며 서로 추천·공유", tags: ["E"] },
    a2: { text: "각자 조용히 장바구니 채움", tags: ["I"] },
  },
  {
    id: 4,
    q: "편의점에서 결제할 때",
    a1: { text: "정확한 금액과 영수증을 기준으로 계산한다", tags: ["T"] },
    a2: { text: "상황을 봐서 내가 조금 더 부담한다", tags: ["F"] },
  },
  {
    id: 5,
    q: "편의점에서 장바구니를 채울 때",
    a1: { text: "리스트대로 차례대로 담는다", tags: ["J"] },
    a2: { text: "발견한 것들을 즉흥적으로 조합한다", tags: ["P"] },
  },
  {
    id: 6,
    q: "라벨을 볼 때 무엇을 중시하나?",
    a1: { text: "원재료·칼로리·당류 같은 객관 정보", tags: ["S"] },
    a2: { text: "브랜드 스토리·패키지 컨셉", tags: ["N"] },
  },
  {
    id: 7,
    q: "맛있는 조합을 찾았을 때?",
    a1: { text: "단톡방에 바로 공유", tags: ["E"] },
    a2: { text: "개인 기록으로만 남김", tags: ["I"] },
  },
  {
    id: 8,
    q: "편의점에서 품절 상황에 대처할 때",
    a1: { text: "가격, 중량, 성분을 비교해 대체품을 선택한다", tags: ["T"] },
    a2: { text: "직원에게 문의하고 추천받는다", tags: ["F"] },
  },
  {
    id: 9,
    q: "야식 타임에 편의점 간다면?",
    a1: { text: "정해둔 시간·양만 구매", tags: ["J"] },
    a2: { text: "그때 느낌대로 담음", tags: ["P"] },
  },
  {
    id: 10,
    q: "편의점에서 컵라면 물 높이를 정할 때",
    a1: { text: "표시선에 정확히 맞춘다", tags: ["S"] },
    a2: { text: "상황과 식감에 따라 감으로 조절한다", tags: ["N"] },
  },
  {
    id: 11,
    q: "편의점에서 포인트와 쿠폰을 관리할 때",
    a1: { text: "최대 적립과 할인을 최적화한다", tags: ["T"] },
    a2: { text: "귀찮으면 넘기고 기분이 더 중요하다", tags: ["F"] },
  },
  {
    id: 12,
    q: "편의점에서 혼밥이나 혼스낵 루틴을 정할 때",
    a1: { text: "늘 먹는 안정 조합을 고정한다", tags: ["S"] },
    a2: { text: "무드에 따라 조합을 바꾼다", tags: ["N"] },
  },
]

export default function CvsComboTest() {
  const quizLogic = useQuizLogic({
    testId: "cvs-combo",
    questions,
    resultPath: "/tests/cvs-combo/test/result",
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
