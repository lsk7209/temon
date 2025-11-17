"use client"

/**
 * Component: CstoreRoutineTest
 * 편의점 루틴 테스트 페이지
 * @example <CstoreRoutineTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "편의점에 들어가면 첫 동선",
    a1: { text: "목표 코너로 직행한다", tags: ["J"] },
    a2: { text: "한 바퀴 돌며 구경한다", tags: ["P"] },
  },
  {
    id: 2,
    q: "편의점에서 음료를 선택할 때",
    a1: { text: "늘 마시는 고정 픽을 선택한다", tags: ["S"] },
    a2: { text: "신제품 라벨이 보이면 시도한다", tags: ["N"] },
  },
  {
    id: 3,
    q: "함께 온 친구가 추천하면?",
    a1: { text: "바로 시도해본다", tags: ["E"] },
    a2: { text: "내 취향과 비교 후 결정", tags: ["I"] },
  },
  {
    id: 4,
    q: "도시락 vs 간편식 고를 때?",
    a1: { text: "영양성분·가격 먼저 확인", tags: ["T"] },
    a2: { text: "맛 후기·기분을 우선", tags: ["F"] },
  },
  {
    id: 5,
    q: "결제 전에 장바구니를 보면?",
    a1: { text: "불필요한 건 정리해 뺀다", tags: ["J"] },
    a2: { text: "기분 따라 하나 더 담는다", tags: ["P"] },
  },
  {
    id: 6,
    q: "원플러스원 딜을 만나면?",
    a1: { text: "진짜 필요하면만 구매", tags: ["T"] },
    a2: { text: "지금 즐거움이면 충분", tags: ["F"] },
  },
  {
    id: 7,
    q: "편의점 신상 코너에서 상품을 고를 때",
    a1: { text: "성분과 원재료를 꼼꼼히 체크한다", tags: ["S"] },
    a2: { text: "컨셉과 조합을 상상하며 선택한다", tags: ["N"] },
  },
  {
    id: 8,
    q: "편의점에서 점원과 소통할 때",
    a1: { text: "필요 사항만 짧고 명확히 말한다", tags: ["I"] },
    a2: { text: "가볍게 대화하며 정보를 수집한다", tags: ["E"] },
  },
  {
    id: 9,
    q: "핫도그 하나 남았을 때?",
    a1: { text: "선착순 원칙대로 내가 산다", tags: ["T"] },
    a2: { text: "동행이 원하면 양보", tags: ["F"] },
  },
  {
    id: 10,
    q: "편의점 계산대 앞 유혹 상품을 볼 때",
    a1: { text: "미리 정한 리스트만 결제한다", tags: ["J"] },
    a2: { text: "순간 끌리면 소소하게 추가한다", tags: ["P"] },
  },
  {
    id: 11,
    q: "편의점 커피를 고를 때?",
    a1: { text: "용량·추출방식·단가 비교", tags: ["S"] },
    a2: { text: "향·라벨 스토리로 결정", tags: ["N"] },
  },
  {
    id: 12,
    q: "포인트 적립 문제로 대기 발생 시?",
    a1: { text: "규정대로 신속 해결 요청", tags: ["E"] },
    a2: { text: "조용히 기다리며 다음 선택 정리", tags: ["I"] },
  },
]

export default function CstoreRoutineTest() {
  const quizLogic = useQuizLogic({
    testId: "cstore-routine",
    questions,
    resultPath: "/tests/cstore-routine/test/result",
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
      colorClasses={getQuizColorScheme("blue-cyan")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}

