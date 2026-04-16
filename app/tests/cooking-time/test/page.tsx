"use client"

/**
 * Component: CookingTimeTest
 * 요리 시간 테스트 페이지
 * @example <CookingTimeTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "요리 중 타이머가 울렸는데 아직 안 익었을 때",
    a1: { text: "타이머를 다시 맞추고 기다린다", tags: ["J", "S"] },
    a2: { text: "느낌으로 익을 때까지 계속 본다", tags: ["P", "N"] },
  },
  {
    id: 2,
    q: "요리 중 친구가 와서 맛보자고 할 때",
    a1: { text: "즉시 맛보게 해주고 피드백을 받는다", tags: ["E", "F"] },
    a2: { text: "완성될 때까지 기다리게 한다", tags: ["I", "T"] },
  },
  {
    id: 3,
    q: "요리 중 재료를 깜빡 잊고 안 넣었을 때",
    a1: { text: "당황해서 바로 넣고 시간을 조정한다", tags: ["E", "P"] },
    a2: { text: "침착하게 시간을 다시 계산한다", tags: ["I", "J"] },
  },
  {
    id: 4,
    q: "요리 중 불이 꺼졌는데 재료는 다 넣었을 때",
    a1: { text: "당황해서 다시 켜고 시간을 늘린다", tags: ["E", "P"] },
    a2: { text: "침착하게 시간을 다시 측정한다", tags: ["I", "J"] },
  },
  {
    id: 5,
    q: "요리 중 옆집에서 이상한 냄새가 날 때",
    a1: { text: "궁금해서 확인하거나 반응한다", tags: ["E", "N"] },
    a2: { text: "무시하고 요리에 집중한다", tags: ["I", "S"] },
  },
  {
    id: 6,
    q: "요리 중 타이머를 깜빡 잊고 안 맞췄을 때",
    a1: { text: "대충 시간을 맞춰서 한다", tags: ["P", "N"] },
    a2: { text: "정확한 시간을 다시 계산한다", tags: ["J", "S"] },
  },
  {
    id: 7,
    q: "요리 중 배가 고파서 참을 수 없을 때",
    a1: { text: "시간을 단축해서 빨리 만든다", tags: ["E", "P"] },
    a2: { text: "정해진 시간대로 만든다", tags: ["I", "J"] },
  },
  {
    id: 8,
    q: "요리 중 핸드폰이 울렸을 때",
    a1: { text: "바로 받고 요리를 멈춘다", tags: ["E", "F"] },
    a2: { text: "요리가 끝날 때까지 무시한다", tags: ["I", "T"] },
  },
  {
    id: 9,
    q: "요리 중 재료가 예상보다 빨리 익었을 때",
    a1: { text: "당황해서 다른 재료를 급하게 넣는다", tags: ["E", "P"] },
    a2: { text: "침착하게 다음 단계를 진행한다", tags: ["I", "J"] },
  },
  {
    id: 10,
    q: "요리 중 타이머가 여러 개 필요할 때",
    a1: { text: "핸드폰이나 다른 방법을 찾는다", tags: ["P", "N"] },
    a2: { text: "순서대로 하나씩 시간을 관리한다", tags: ["J", "S"] },
  },
  {
    id: 11,
    q: "요리 중 시간이 부족해서 서두를 때",
    a1: { text: "모든 것을 빠르게 처리한다", tags: ["E", "P"] },
    a2: { text: "중요한 것만 선택해서 한다", tags: ["I", "J"] },
  },
  {
    id: 12,
    q: "요리 중 타이머 소리가 너무 시끄러울 때",
    a1: { text: "소리를 줄이거나 끈다", tags: ["E", "F"] },
    a2: { text: "그대로 두고 집중한다", tags: ["I", "T"] },
  },
]

export default function CookingTimeTest() {
  const quizLogic = useQuizLogic({
    testId: "cooking-time",
    questions,
    resultPath: "/tests/cooking-time/test/result",
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
      colorClasses={getQuizColorScheme("blue-indigo")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
