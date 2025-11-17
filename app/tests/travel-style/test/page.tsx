"use client"

/**
 * Component: TravelStyleTest
 * 여행 스타일 테스트 페이지
 * @example <TravelStyleTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "여행 준비를 시작할 때",
    a1: { text: "리스트부터 만든다", tags: ["J"] },
    a2: { text: "짐은 전날 감으로 챙긴다", tags: ["P"] },
  },
  {
    id: 2,
    q: "옷 고를 때",
    a1: { text: "날짜별 코디를 미리 정한다", tags: ["S"] },
    a2: { text: "가서 분위기에 맞춘다", tags: ["N"] },
  },
  {
    id: 3,
    q: "캐리어를 쌀 때",
    a1: { text: "무게 확인 필수", tags: ["T"] },
    a2: { text: "감으로 대충 맞춘다", tags: ["F"] },
  },
  {
    id: 4,
    q: "비상약 챙기기",
    a1: { text: "혹시 몰라 다 넣는다", tags: ["J"] },
    a2: { text: "약국은 어디든 있지", tags: ["P"] },
  },
  {
    id: 5,
    q: "날씨가 갑자기 변한다면",
    a1: { text: "예비 옷을 꺼낸다", tags: ["S"] },
    a2: { text: "그날 쇼핑으로 해결", tags: ["N"] },
  },
  {
    id: 6,
    q: "친구가 늦게 온다면",
    a1: { text: "일정 체크하며 기다림", tags: ["T"] },
    a2: { text: "커피 마시며 여유", tags: ["F"] },
  },
  {
    id: 7,
    q: "짐을 정리할 때",
    a1: { text: "옷, 화장품, 전자기기 구역별 정리", tags: ["J"] },
    a2: { text: "남는 공간에 막 넣는다", tags: ["P"] },
  },
  {
    id: 8,
    q: "기념품은",
    a1: { text: "리스트대로 구매", tags: ["S"] },
    a2: { text: "눈에 띄는 대로 구매", tags: ["N"] },
  },
  {
    id: 9,
    q: "공항 도착 시간",
    a1: { text: "비행 2시간 전 도착", tags: ["J"] },
    a2: { text: "딱 맞춰 가도 됨", tags: ["P"] },
  },
  {
    id: 10,
    q: "여행지에서의 식사",
    a1: { text: "맛집 예약 필수", tags: ["T"] },
    a2: { text: "돌아다니다 끌리는 곳", tags: ["F"] },
  },
  {
    id: 11,
    q: "사진 찍을 때",
    a1: { text: "배경·구도 완벽하게", tags: ["T"] },
    a2: { text: "순간 감성 우선", tags: ["F"] },
  },
  {
    id: 12,
    q: "짐 풀 때",
    a1: { text: "도착하자마자 정리", tags: ["J"] },
    a2: { text: "귀찮으면 내일 하지 뭐", tags: ["P"] },
  },
]

export default function TravelStyleTest() {
  const quizLogic = useQuizLogic({
    testId: "travel-style",
    questions,
    resultPath: "/tests/travel-style/test/result",
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
      colorClasses={getQuizColorScheme("cyan-blue-indigo")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
