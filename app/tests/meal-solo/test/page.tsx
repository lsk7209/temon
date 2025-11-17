"use client"

/**
 * Component: MealSoloTest
 * 혼밥 테스트 페이지
 * @example <MealSoloTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "혼밥하다가 친구가 갑자기 와서 '야 나도 배고파! 같이 먹자!'라고 할 때",
    a1: { text: "즉시 자리를 옮기고 함께 먹는다", tags: ["E", "F"] },
    a2: { text: "지금은 혼자 먹고 싶다고 말한다", tags: ["I", "T"] },
  },
  {
    id: 2,
    q: "혼밥하다가 옆 테이블에서 커플이 너무 달달해서 눈치가 보일 때",
    a1: { text: "신경 안 쓰고 내 음식에 집중한다", tags: ["E", "P"] },
    a2: { text: "조용한 구석자리로 이동한다", tags: ["I", "J"] },
  },
  {
    id: 3,
    q: "혼밥하다가 메뉴판을 10분째 들여다봐도 결정이 안 될 때",
    a1: { text: "대충 맛있어 보이는 걸 선택한다", tags: ["E", "P"] },
    a2: { text: "핸드폰으로 리뷰를 검색해서 결정한다", tags: ["I", "J"] },
  },
  {
    id: 4,
    q: "혼밥하다가 주문한 음식이 생각보다 3배는 더 나왔을 때",
    a1: { text: "포장해서 집에 가져간다", tags: ["J", "S"] },
    a2: { text: "대충 먹고 남긴다", tags: ["P", "N"] },
  },
  {
    id: 5,
    q: "혼밥하다가 유튜브 영상을 보다가 음식이 식어갈 때",
    a1: { text: "영상 보면서 계속 먹는다", tags: ["E", "P"] },
    a2: { text: "영상을 멈추고 음식에 집중한다", tags: ["I", "J"] },
  },
  {
    id: 6,
    q: "혼밥하다가 이 식당이 진짜 맛있어서 놀랐을 때",
    a1: { text: "즉시 친구들에게 카톡을 보낸다", tags: ["E", "F"] },
    a2: { text: "혼자만의 맛집으로 비밀로 간직한다", tags: ["I", "T"] },
  },
  {
    id: 7,
    q: "혼밥하다가 배가 너무 고파서 메뉴 고르는 시간이 아까울 때",
    a1: { text: "첫 번째 메뉴를 바로 주문한다", tags: ["E", "P"] },
    a2: { text: "메뉴를 꼼꼼히 보고 결정한다", tags: ["I", "J"] },
  },
  {
    id: 8,
    q: "혼밥하다가 주문한 음식이 완전히 맛없고 실망스러울 때",
    a1: { text: "직원에게 맛이 이상하다고 말한다", tags: ["E", "F"] },
    a2: { text: "조용히 먹고 나간다", tags: ["I", "T"] },
  },
  {
    id: 9,
    q: "혼밥하다가 계산할 때 계산대에 사람이 많을 때",
    a1: { text: "빨리 계산하고 나간다", tags: ["E", "P"] },
    a2: { text: "여유롭게 줄을 서서 기다린다", tags: ["I", "J"] },
  },
  {
    id: 10,
    q: "혼밥하다가 메뉴판에 '신메뉴'라고 써있는 걸 발견했을 때",
    a1: { text: "호기심에 바로 주문해본다", tags: ["E", "N"] },
    a2: { text: "리뷰를 먼저 확인하고 주문한다", tags: ["I", "S"] },
  },
  {
    id: 11,
    q: "혼밥하다가 음식이 너무 뜨거워서 입 안이 데일 것 같을 때",
    a1: { text: "대충 불어서 바로 먹으려고 한다", tags: ["E", "P"] },
    a2: { text: "식을 때까지 기다린다", tags: ["I", "J"] },
  },
  {
    id: 12,
    q: "혼밥하다가 주변 사람들이 모두 단체로 와서 혼자만 혼자일 때",
    a1: { text: "신경 안 쓰고 내 할 일 한다", tags: ["E", "F"] },
    a2: { text: "벽 쪽 구석자리로 이동한다", tags: ["I", "T"] },
  },
]

export default function MealSoloTest() {
  const quizLogic = useQuizLogic({
    testId: "meal-solo",
    questions,
    resultPath: "/tests/meal-solo/test/result",
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
      colorClasses={getQuizColorScheme("slate-gray")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
