"use client"

/**
 * Component: LunchDeciderTest
 * 점심 결정 테스트 페이지
 * @example <LunchDeciderTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "점심 30분 전에 점심을 준비할 때",
    a1: { text: "동료 일정을 확인하고 후보를 미리 정리한다", tags: ["J"] },
    a2: { text: "그때 상황을 보고 즉흥적으로 정한다", tags: ["P"] },
  },
  {
    id: 2,
    q: "회사 근처에 새 식당이 생겼을 때",
    a1: { text: "검증된 단골집으로 간다", tags: ["S"] },
    a2: { text: "신규 식당을 먼저 시도한다", tags: ["N"] },
  },
  {
    id: 3,
    q: "점심 멤버를 정할 때",
    a1: { text: "누가 갈지 먼저 물어보고 맞춘다", tags: ["E"] },
    a2: { text: "혼밥도 괜찮고 조용히 움직인다", tags: ["I"] },
  },
  {
    id: 4,
    q: "점심 메뉴를 선택할 때 1순위로 생각하는 것",
    a1: { text: "가성비와 영양, 업무 집중에 도움", tags: ["T"] },
    a2: { text: "오늘 기분과 위로, 만족감", tags: ["F"] },
  },
  {
    id: 5,
    q: "줄이 길다. 어떻게 할까?",
    a1: { text: "대기 허용 시간을 정하고 안 되면 다른 곳", tags: ["J"] },
    a2: { text: "메뉴 바꾸거나 포장으로 유연 대응", tags: ["P"] },
  },
  {
    id: 6,
    q: "점심 메뉴에서 처음 보는 메뉴를 고를 때",
    a1: { text: "후기, 사진, 성분을 확인한다", tags: ["S"] },
    a2: { text: "조합을 상상하며 새롭게 시도한다", tags: ["N"] },
  },
  {
    id: 7,
    q: "팀 점심 약속이 잦아졌을 때",
    a1: { text: "함께 먹는 자리를 즐기고 대화를 이끈다", tags: ["E"] },
    a2: { text: "가끔만 참여하고 컨디션을 우선한다", tags: ["I"] },
  },
  {
    id: 8,
    q: "계산 방식에 의견 차이가 났다.",
    a1: { text: "원칙대로 N분의 1을 제안한다", tags: ["T"] },
    a2: { text: "상황에 맞게 조율해 마음 상하지 않게", tags: ["F"] },
  },
  {
    id: 9,
    q: "업무가 바쁠 때 점심을 정할 때",
    a1: { text: "시간을 고정하고 가까운 곳으로 신속히 간다", tags: ["J"] },
    a2: { text: "배달이나 간편식을 상황에 따라 선택한다", tags: ["P"] },
  },
  {
    id: 10,
    q: "색다른 조합 제안이 나왔다.",
    a1: { text: "검증된 조합을 선호한다", tags: ["S"] },
    a2: { text: "하나쯤 실험해보자고 제안한다", tags: ["N"] },
  },
  {
    id: 11,
    q: "혼밥과 팀밥 중 더 편한 것을 선택할 때",
    a1: { text: "팀밥. 함께 고르는 과정이 즐겁다", tags: ["E"] },
    a2: { text: "혼밥. 빠르고 조용하게 해결한다", tags: ["I"] },
  },
  {
    id: 12,
    q: "식후에 커피나 디저트를 추가할 때",
    a1: { text: "예산과 시간을 보고 합리적으로 결정한다", tags: ["T"] },
    a2: { text: "컨디션과 기분이 좋으면 추가한다", tags: ["F"] },
  },
]

export default function LunchDeciderTest() {
  const quizLogic = useQuizLogic({
    testId: "lunch-decider",
    questions,
    resultPath: "/tests/lunch-decider/test/result",
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
      colorClasses={getQuizColorScheme("amber-yellow")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}

