"use client"

/**
 * Component: PhoneBatteryTest
 * 폰 배터리 관리 습관 테스트 페이지
 * @example <PhoneBatteryTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "외출 전 배터리 상태를 보면",
    a1: { text: "일단 100%까지 채우고 나간다", tags: ["J"] },
    a2: { text: "남은 만큼만 들고 그냥 나간다", tags: ["P"] },
  },
  {
    id: 2,
    q: "배터리 잔량을 확인할 때",
    a1: { text: "정확한 숫자(%)로 확인한다", tags: ["S"] },
    a2: { text: "아이콘 색으로 대충 감을 잡는다", tags: ["N"] },
  },
  {
    id: 3,
    q: "배터리가 갑자기 빨리 닳을 때",
    a1: { text: "설정에 들어가 원인 앱부터 찾는다", tags: ["T"] },
    a2: { text: "일단 불안해지고 신경이 쓰인다", tags: ["F"] },
  },
  {
    id: 4,
    q: "카페에서 배터리가 간당간당할 때",
    a1: { text: "옆자리에 콘센트 같이 쓰자고 말한다", tags: ["E"] },
    a2: { text: "조용히 혼자 콘센트 자리로 옮긴다", tags: ["I"] },
  },
  {
    id: 5,
    q: "충전하는 타이밍은",
    a1: { text: "자기 전 등 정해둔 시간에 한다", tags: ["J"] },
    a2: { text: "생각날 때, 급할 때 한다", tags: ["P"] },
  },
  {
    id: 6,
    q: "새 폰의 배터리 성능을 볼 때",
    a1: { text: "실사용 시간·mAh 스펙을 비교한다", tags: ["S"] },
    a2: { text: "써본 사람들 후기 느낌으로 판단한다", tags: ["N"] },
  },
  {
    id: 7,
    q: "친구 폰 배터리가 없다고 할 때",
    a1: { text: "내 배터리 상황부터 계산해본다", tags: ["T"] },
    a2: { text: "일단 걱정되고 빌려주고 싶어진다", tags: ["F"] },
  },
  {
    id: 8,
    q: "충전기를 쓰는 방식은",
    a1: { text: "여러 곳에 두고 편한 걸 아무거나 쓴다", tags: ["E"] },
    a2: { text: "내 자리에 하나만 정해두고 쓴다", tags: ["I"] },
  },
  {
    id: 9,
    q: "저전력 모드는 언제 켜는 편인가요",
    a1: { text: "20%가 되기 전에 미리 켜둔다", tags: ["J"] },
    a2: { text: "부족 알림이 뜨면 그때 켠다", tags: ["P"] },
  },
  {
    id: 10,
    q: "배터리를 오래 쓰는 방법으로",
    a1: { text: "밝기·백그라운드 앱 설정을 하나씩 조정한다", tags: ["S"] },
    a2: { text: "그냥 적당히 아껴 쓰면 된다고 생각한다", tags: ["N"] },
  },
  {
    id: 11,
    q: "배터리가 유독 빨리 닳는 앱을 발견하면",
    a1: { text: "바로 삭제하거나 백그라운드를 차단한다", tags: ["T"] },
    a2: { text: "찜찜하지만 계속 쓰던 대로 쓴다", tags: ["F"] },
  },
  {
    id: 12,
    q: "배터리 부족 알림이 떴을 때",
    a1: { text: "주변 사람들한테 먼저 말하고 충전하러 간다", tags: ["E"] },
    a2: { text: "조용히 혼자 해결하고 자리로 돌아온다", tags: ["I"] },
  },
]

export default function PhoneBatteryTest() {
  const quizLogic = useQuizLogic({
    testId: "phone-battery",
    questions,
    resultPath: "/tests/phone-battery/test/result",
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


