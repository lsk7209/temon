"use client"

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  { id: 1, q: "메뉴에 '아주 매움' 표시가 있다면?", a1: { text: "도전해본다", tags: ["E", "N"] }, a2: { text: "안전한 맛으로 간다", tags: ["I", "S"] } },
  { id: 2, q: "매운 음식을 먹고 땀이 나면?", a1: { text: "끝까지 먹는다", tags: ["T", "J"] }, a2: { text: "바로 쉬면서 조절한다", tags: ["F", "P"] } },
  { id: 3, q: "새로운 매운 소스를 보면?", a1: { text: "바로 맛본다", tags: ["N", "P"] }, a2: { text: "후기부터 확인한다", tags: ["S", "J"] } },
  { id: 4, q: "친구가 엄청 매운 집을 추천하면?", a1: { text: "함께 가자고 한다", tags: ["E", "F"] }, a2: { text: "내 기준 맵기부터 물어본다", tags: ["I", "T"] } },
  { id: 5, q: "매운맛을 고르는 이유는?", a1: { text: "짜릿한 자극이 좋아서", tags: ["N", "T"] }, a2: { text: "적당히 맛있게 먹고 싶어서", tags: ["S", "F"] } },
  { id: 6, q: "매운맛 실패 경험이 있어도?", a1: { text: "다시 도전한다", tags: ["P", "E"] }, a2: { text: "검증된 메뉴로 간다", tags: ["J", "I"] } },
  { id: 7, q: "라면에 고추를 넣을 때", a1: { text: "계량 없이 감으로", tags: ["P", "N"] }, a2: { text: "정해진 양으로", tags: ["J", "S"] } },
  { id: 8, q: "매운 음식을 먹는 분위기", a1: { text: "여럿이 함께 도전", tags: ["E", "F"] }, a2: { text: "혼자 집중해서 먹기", tags: ["I", "T"] } },
  { id: 9, q: "맵기 단계를 고를 때", a1: { text: "중간 이상으로", tags: ["N", "E"] }, a2: { text: "기본 단계로", tags: ["S", "I"] } },
  { id: 10, q: "매운 메뉴를 추천할 때", a1: { text: "맛 포인트를 강조", tags: ["F", "N"] }, a2: { text: "맵기 수치부터 설명", tags: ["T", "S"] } },
  { id: 11, q: "속이 쓰릴 것 같다면", a1: { text: "괜찮다며 밀어붙임", tags: ["T", "P"] }, a2: { text: "미리 대비한다", tags: ["F", "J"] } },
  { id: 12, q: "다음에도 매운맛을 먹을까?", a1: { text: "컨디션 좋으면 먹는다", tags: ["P", "N"] }, a2: { text: "상황 보고 신중히", tags: ["J", "S"] } },
]

export default function SpiceToleranceTestPage() {
  const quizLogic = useQuizLogic({
    testId: "spice-tolerance",
    questions,
    resultPath: "/tests/spice-tolerance/test/result",
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
      colorClasses={getQuizColorScheme("red")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
