"use client"

/**
 * Component: CookingRecipeTest
 * 요리 레시피 테스트 페이지
 * @example <CookingRecipeTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "레시피를 따라 요리하다가 '달걀 2개'라고 했는데 냉장고에 달걀이 하나만 있을 때",
    a1: { text: "대충 다른 걸로 대체하고 계속 만든다", tags: ["P", "N"] },
    a2: { text: "레시피를 중단하고 달걀을 사러 간다", tags: ["J", "S"] },
  },
  {
    id: 2,
    q: "레시피대로 만들었는데 맛이 레시피 사진과 완전히 다를 때",
    a1: { text: "재미있어 보이니 양념을 더 넣어본다", tags: ["P", "F"] },
    a2: { text: "레시피를 다시 꼼꼼히 읽어본다", tags: ["J", "T"] },
  },
  {
    id: 3,
    q: "레시피에 '30분 푹 끓이기'라고 했는데 10분 후에 배가 고파서 참을 수 없을 때",
    a1: { text: "대충 끓인 것 같으니 그냥 먹는다", tags: ["E", "P"] },
    a2: { text: "레시피대로 30분을 기다린다", tags: ["I", "J"] },
  },
  {
    id: 4,
    q: "레시피를 따라 요리하는 중에 친구가 와서 '뭐 만드는 거야? 나도 먹고 싶어!'라고 할 때",
    a1: { text: "즉시 양을 늘려서 함께 만든다", tags: ["E", "F"] },
    a2: { text: "지금은 레시피대로 만들어야 한다고 말한다", tags: ["I", "T"] },
  },
  {
    id: 5,
    q: "레시피대로 만들다가 실수로 설탕 대신 소금을 넣었을 때",
    a1: { text: "당황해서 처음부터 다시 만든다", tags: ["E", "F"] },
    a2: { text: "레시피를 확인하고 어떻게 수정할지 생각한다", tags: ["I", "T"] },
  },
  {
    id: 6,
    q: "레시피에 '프랑스어로 된 요리 용어'가 나와서 이해가 안 될 때",
    a1: { text: "대충 비슷한 걸로 이해하고 만든다", tags: ["E", "P"] },
    a2: { text: "인터넷에서 정확한 뜻을 찾아본다", tags: ["I", "J"] },
  },
  {
    id: 7,
    q: "레시피대로 만들었는데 맛이 너무 밋밋하고 재미없을 때",
    a1: { text: "즉시 고춧가루나 양념을 추가한다", tags: ["E", "F"] },
    a2: { text: "레시피가 맞는지 다시 확인한다", tags: ["I", "T"] },
  },
  {
    id: 8,
    q: "레시피에 '15단계'가 있는데 5단계만 해도 벌써 복잡할 때",
    a1: { text: "대충 중요한 것만 하고 끝낸다", tags: ["E", "P"] },
    a2: { text: "레시피를 끝까지 정확히 따라간다", tags: ["I", "J"] },
  },
  {
    id: 9,
    q: "레시피대로 만들었는데 결과물이 레시피 사진과 색깔이 완전히 다를 때",
    a1: { text: "오히려 재미있어 보이니 그대로 둔다", tags: ["P", "N"] },
    a2: { text: "레시피를 다시 확인하고 뭐가 잘못됐는지 찾는다", tags: ["J", "S"] },
  },
  {
    id: 10,
    q: "레시피에 '트러플 오일'이 필요한데 가격이 너무 비쌀 때",
    a1: { text: "대체 재료로 만들거나 생략한다", tags: ["E", "F"] },
    a2: { text: "레시피대로 구매하거나 다른 레시피를 찾는다", tags: ["I", "T"] },
  },
  {
    id: 11,
    q: "레시피에 '하루 종일 재워두기'라고 했는데 당장 먹고 싶을 때",
    a1: { text: "대충 1시간만 재워두고 먹는다", tags: ["E", "P"] },
    a2: { text: "레시피대로 하루를 기다린다", tags: ["I", "J"] },
  },
  {
    id: 12,
    q: "레시피를 따라 요리하는 중에 냄새가 너무 좋아서 참을 수 없을 때",
    a1: { text: "대충 익은 것 같으니 바로 먹는다", tags: ["E", "P"] },
    a2: { text: "레시피대로 완성될 때까지 기다린다", tags: ["I", "J"] },
  },
]

export default function CookingRecipeTest() {
  const quizLogic = useQuizLogic({
    testId: "cooking-recipe",
    questions,
    resultPath: "/tests/cooking-recipe/test/result",
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
      colorClasses={getQuizColorScheme("green-emerald")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
