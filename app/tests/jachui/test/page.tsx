"use client"

/**
 * Component: JachuiTest
 * 자취 MBTI 테스트 페이지
 * @example <JachuiTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "냉장고를 열었을 때",
    a1: { text: "재료가 정리되어 있다", tags: ["J"] },
    a2: { text: "반쯤 비어있고 배달 쿠폰만", tags: ["P"] },
  },
  {
    id: 2,
    q: "밥 먹기 전 고민은",
    a1: { text: "반찬 구성과 영양", tags: ["T"] },
    a2: { text: "메뉴 맛과 기분", tags: ["F"] },
  },
  {
    id: 3,
    q: "식사 시간은",
    a1: { text: "일정하게 맞춘다", tags: ["J"] },
    a2: { text: "배고프면 먹는다", tags: ["P"] },
  },
  {
    id: 4,
    q: "조리 도구 정리는",
    a1: { text: "다 쓰면 바로 씻기", tags: ["S"] },
    a2: { text: "내일 아침에 하지 뭐", tags: ["N"] },
  },
  {
    id: 5,
    q: "배달앱을 켰을 때",
    a1: { text: "평점/후기부터 본다", tags: ["S"] },
    a2: { text: "썸네일/사진 맛집부터 본다", tags: ["N"] },
  },
  {
    id: 6,
    q: "친구가 집에 온다면",
    a1: { text: "한상 차림 준비!", tags: ["E"] },
    a2: { text: "배달 시키자고 제안", tags: ["I"] },
  },
  {
    id: 7,
    q: "냉장고에 남은 김치로",
    a1: { text: "김치볶음밥 만든다", tags: ["J"] },
    a2: { text: "그냥 컵라면 먹는다", tags: ["P"] },
  },
  {
    id: 8,
    q: "밥 먹을 때",
    a1: { text: "영상 or 음악 틀어놓는다", tags: ["I"] },
    a2: { text: "친구에게 사진 보낸다", tags: ["E"] },
  },
  {
    id: 9,
    q: "요리 레시피는",
    a1: { text: "정확히 계량한다", tags: ["T"] },
    a2: { text: "감으로 맞춘다", tags: ["F"] },
  },
  {
    id: 10,
    q: "야식 생각날 때",
    a1: { text: "물 마시며 참는다", tags: ["T"] },
    a2: { text: "배달앱을 킨다", tags: ["F"] },
  },
  {
    id: 11,
    q: "장보기 습관은",
    a1: { text: "필요한 것만 사서 채운다", tags: ["S"] },
    a2: { text: "할인/신상 위주로 산다", tags: ["N"] },
  },
  {
    id: 12,
    q: "설거지를 앞에 두고",
    a1: { text: "바로 처리한다", tags: ["J"] },
    a2: { text: "내일의 내가 한다", tags: ["P"] },
  },
]

export default function JachuiTest() {
  const quizLogic = useQuizLogic({
    testId: "jachui",
    questions,
    resultPath: "/tests/jachui/test/result",
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
      colorClasses={getQuizColorScheme("orange-amber-yellow")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
