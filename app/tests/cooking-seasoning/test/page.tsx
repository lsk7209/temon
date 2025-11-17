"use client"

/**
 * Component: CookingSeasoningTest
 * 요리 양념 테스트 페이지
 * @example <CookingSeasoningTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "요리에 양념을 넣다가 '소금 한 꼬집'이라고 했는데 손이 미끄러져서 반 통을 쏟았을 때",
    a1: { text: "당황해서 물을 부어서 희석시킨다", tags: ["E", "P"] },
    a2: { text: "침착하게 양념을 다시 계산하고 조정한다", tags: ["I", "J"] },
  },
  {
    id: 2,
    q: "요리에 양념을 넣다가 레시피에 '고춧가루'가 필요한데 집에 없을 때",
    a1: { text: "대충 고추장이나 다른 매운 양념으로 대체한다", tags: ["P", "N"] },
    a2: { text: "양념을 사러 가거나 다른 레시피를 찾는다", tags: ["J", "S"] },
  },
  {
    id: 3,
    q: "요리에 양념을 넣었는데 맛을 보니 완전히 이상하고 맛없을 때",
    a1: { text: "일단 다른 양념을 더 넣어본다", tags: ["E", "P"] },
    a2: { text: "레시피를 다시 확인하고 정확히 다시 만든다", tags: ["I", "J"] },
  },
  {
    id: 4,
    q: "요리에 양념을 넣는 중에 친구가 와서 '나도 맛보고 싶어!'라고 할 때",
    a1: { text: "즉시 맛보게 해주고 '어때?'라고 물어본다", tags: ["E", "F"] },
    a2: { text: "양념이 완성될 때까지 기다리라고 말한다", tags: ["I", "T"] },
  },
  {
    id: 5,
    q: "요리에 양념을 넣다가 실수로 설탕 대신 소금을 넣었을 때",
    a1: { text: "당황해서 처음부터 다시 만든다", tags: ["E", "F"] },
    a2: { text: "양념을 확인하고 어떻게 수정할지 생각한다", tags: ["I", "T"] },
  },
  {
    id: 6,
    q: "요리에 양념을 넣었는데 너무 매워서 입 안이 불타오를 것 같을 때",
    a1: { text: "대충 물을 넣거나 그냥 먹는다", tags: ["E", "P"] },
    a2: { text: "양념 비율을 다시 계산해서 조정한다", tags: ["I", "J"] },
  },
  {
    id: 7,
    q: "요리에 양념을 넣었는데 너무 달아서 당뇨 걸릴 것 같을 때",
    a1: { text: "그래도 먹고 싶어서 그대로 둔다", tags: ["E", "F"] },
    a2: { text: "양념을 다시 확인하고 조정한다", tags: ["I", "T"] },
  },
  {
    id: 8,
    q: "요리에 양념을 넣었는데 너무 짜서 바다물 같을 때",
    a1: { text: "물을 부어서 대충 조정한다", tags: ["E", "P"] },
    a2: { text: "양념을 다시 계산해서 정확히 조정한다", tags: ["I", "J"] },
  },
  {
    id: 9,
    q: "요리에 양념을 넣었는데 레시피 사진과 색깔이 완전히 다를 때",
    a1: { text: "오히려 재미있어 보이니 그대로 둔다", tags: ["P", "N"] },
    a2: { text: "레시피를 다시 확인하고 뭐가 잘못됐는지 찾는다", tags: ["J", "S"] },
  },
  {
    id: 10,
    q: "요리에 양념을 넣다가 레시피에 '트러플 오일'이 필요한데 가격이 너무 비쌀 때",
    a1: { text: "대체 양념으로 만들거나 생략한다", tags: ["E", "F"] },
    a2: { text: "양념을 구매하거나 다른 레시피를 찾는다", tags: ["I", "T"] },
  },
  {
    id: 11,
    q: "요리에 양념을 넣다가 양념을 만드는 게 너무 복잡하고 시간이 오래 걸릴 때",
    a1: { text: "대충 간단하게 만들어서 끝낸다", tags: ["E", "P"] },
    a2: { text: "레시피대로 정확히 만든다", tags: ["I", "J"] },
  },
  {
    id: 12,
    q: "요리에 양념을 넣는 중에 냄새가 너무 좋아서 참을 수 없을 때",
    a1: { text: "대충 익은 것 같으니 바로 먹는다", tags: ["E", "P"] },
    a2: { text: "양념이 완성될 때까지 기다린다", tags: ["I", "J"] },
  },
]

export default function CookingSeasoningTest() {
  const quizLogic = useQuizLogic({
    testId: "cooking-seasoning",
    questions,
    resultPath: "/tests/cooking-seasoning/test/result",
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
      colorClasses={getQuizColorScheme("red-pink")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
