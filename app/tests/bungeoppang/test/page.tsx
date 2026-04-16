"use client"

/**
 * Component: BungeoppangTest
 * 붕어빵 테스트 페이지
 * @example <BungeoppangTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "붕어빵 가게에서 가장 먼저 떠오르는 선택",
    a1: { text: "늘 먹던 맛이 최고", tags: ["S"] },
    a2: { text: "신메뉴부터 도전", tags: ["N"] },
  },
  {
    id: 2,
    q: "붕어빵을 살 때 몇 개 살지 정할 때",
    a1: { text: "가다가도 수량을 미리 정한다", tags: ["J"] },
    a2: { text: "가서 보고 즉흥적으로 결정한다", tags: ["P"] },
  },
  {
    id: 3,
    q: "붕어빵 가게 앞에서 분위기를 느낄 때",
    a1: { text: "사장님과 한두 마디 나눈다", tags: ["E"] },
    a2: { text: "조용히 주문하고 기다린다", tags: ["I"] },
  },
  {
    id: 4,
    q: "가격과 구성은 어떻게 보나?",
    a1: { text: "가성비와 구성 먼저 체크", tags: ["T"] },
    a2: { text: "지금 내 기분이 더 중요", tags: ["F"] },
  },
  {
    id: 5,
    q: "붕어빵을 고를 때 굽기와 식감을 생각할 때",
    a1: { text: "바삭도가 일정해야 만족한다", tags: ["S"] },
    a2: { text: "한 입마다 다른 느낌도 재미있다", tags: ["N"] },
  },
  {
    id: 6,
    q: "막 구운 붕어빵을 받았다면?",
    a1: { text: "살짝 식혀가며 먹는다", tags: ["J"] },
    a2: { text: "뜨거워도 한 입부터", tags: ["P"] },
  },
  {
    id: 7,
    q: "붕어빵을 같이 있는 사람과 먹을 때",
    a1: { text: "나눠 먹자고 먼저 제안한다", tags: ["E"] },
    a2: { text: "내 페이스로 조용히 먹는다", tags: ["I"] },
  },
  {
    id: 8,
    q: "붕어빵을 계산할 때",
    a1: { text: "금액을 정확히 나누자고 제안한다", tags: ["T"] },
    a2: { text: "오늘은 내가 쏜다고 말한다", tags: ["F"] },
  },
  {
    id: 9,
    q: "붕어빵 속재료를 선호할 때",
    a1: { text: "전통 팥이 진리", tags: ["S"] },
    a2: { text: "치즈나 고구마 같은 변형도 환영한다", tags: ["N"] },
  },
  {
    id: 10,
    q: "붕어빵을 사게 되는 계기?",
    a1: { text: "동선에 맞춰 일부러 들름", tags: ["J"] },
    a2: { text: "지나가다 향 맡고 즉흥 구매", tags: ["P"] },
  },
  {
    id: 11,
    q: "어느 줄에 설지 고를 때?",
    a1: { text: "속도·재고를 보고 합리 선택", tags: ["T"] },
    a2: { text: "친근한 표정·분위기 있는 곳", tags: ["F"] },
  },
  {
    id: 12,
    q: "붕어빵을 다 먹고 난 뒤",
    a1: { text: "다음엔 어느 가게 갈지 기록한다", tags: ["E", "J"] },
    a2: { text: "오늘의 작은 행복으로 남겨둔다", tags: ["I", "P"] },
  },
]

export default function BungeoppangTest() {
  const quizLogic = useQuizLogic({
    testId: "bungeoppang",
    questions,
    resultPath: "/tests/bungeoppang/test/result",
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

