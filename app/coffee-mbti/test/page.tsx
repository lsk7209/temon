"use client"

/**
 * Component: CoffeeMBTITest
 * 커피 MBTI 테스트 페이지
 * @example <CoffeeMBTITest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "카페 도착 후 주문 순서?",
    a1: { text: "메뉴판 미리 정해둠", tags: ["J"] },
    a2: { text: "줄 서서 즉흥 선택", tags: ["P"] },
  },
  {
    id: 2,
    q: "첫 모닝커피?",
    a1: { text: "따뜻한 아메리카노", tags: ["S"] },
    a2: { text: "오늘 신메뉴 콜드폼!", tags: ["N"] },
  },
  {
    id: 3,
    q: '"시럽 넣어 드릴까요?"',
    a1: { text: "단맛 NO, 본연 맛", tags: ["T"] },
    a2: { text: "당 충전이 행복♥", tags: ["F"] },
  },
  {
    id: 4,
    q: "바쁜 아침 대기줄 발견했을 때",
    a1: { text: "다른 지점 즉시 이동", tags: ["E"] },
    a2: { text: "앱 주문으로 해결", tags: ["I"] },
  },
  {
    id: 5,
    q: "커피 온도 선택",
    a1: { text: "뜨거워야 제맛", tags: ["J"] },
    a2: { text: "얼음 가득", tags: ["P"] },
  },
  {
    id: 6,
    q: "원두 고를 때",
    a1: { text: "로스팅·산미표 참고", tags: ["S"] },
    a2: { text: "바리스타 추천 수용", tags: ["N"] },
  },
  {
    id: 7,
    q: "테이크아웃 컵 VS 머그컵",
    a1: { text: "일회용 컵 실용적", tags: ["T"] },
    a2: { text: "머그컵 분위기 중요", tags: ["F"] },
  },
  {
    id: 8,
    q: "첫 모금 후 맛이 기대와 다르면?",
    a1: { text: "바로 리메이크 요청", tags: ["E"] },
    a2: { text: "그냥 마시며 적응", tags: ["I"] },
  },
  {
    id: 9,
    q: "회의 중 커피가 식었다!",
    a1: { text: "새로 뽑아옴", tags: ["J"] },
    a2: { text: "얼음 넣어 아이스로", tags: ["P"] },
  },
  {
    id: 10,
    q: "디카페인 옵션",
    a1: { text: "카페인은 필수", tags: ["S"] },
    a2: { text: "밤엔 디카페인", tags: ["N"] },
  },
  {
    id: 11,
    q: "친구가 주문 못 정할 때",
    a1: { text: "추천 메뉴 콕 집어줌", tags: ["E"] },
    a2: { text: "기다리며 앱 구경", tags: ["I"] },
  },
  {
    id: 12,
    q: "커피 한 잔과 어울리는 순간?",
    a1: { text: "할 일 리스트 작성", tags: ["T"] },
    a2: { text: "음악·풍경 감상", tags: ["F"] },
  },
]

export default function CoffeeMBTITest() {
  const quizLogic = useQuizLogic({
    testId: "coffee-mbti",
    questions,
    resultPath: "/coffee-mbti/test/result",
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
      colorClasses={getQuizColorScheme("amber-brown")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
