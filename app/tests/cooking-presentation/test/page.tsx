"use client"

/**
 * Component: CookingPresentationTest
 * 요리 플레이팅 테스트 페이지
 * @example <CookingPresentationTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "요리한 음식이 예쁘지 않게 나왔을 때",
    a1: { text: "다시 예쁘게 플레이팅한다", tags: ["J", "F"] },
    a2: { text: "그냥 먹는다", tags: ["P", "T"] },
  },
  {
    id: 2,
    q: "요리한 음식을 사진 찍으려는데 맛이 없을 때",
    a1: { text: "예쁘게 플레이팅해서 사진만 찍는다", tags: ["E", "F"] },
    a2: { text: "맛을 개선하는 게 우선이다", tags: ["I", "T"] },
  },
  {
    id: 3,
    q: "요리한 음식을 친구에게 보여줬는데 반응이 없을 때",
    a1: { text: "플레이팅을 더 예쁘게 해본다", tags: ["E", "F"] },
    a2: { text: "맛에 집중한다", tags: ["I", "T"] },
  },
  {
    id: 4,
    q: "요리한 음식이 너무 예뻐서 먹기 아까울 때",
    a1: { text: "사진을 많이 찍고 나중에 먹는다", tags: ["E", "F"] },
    a2: { text: "바로 먹는다", tags: ["I", "T"] },
  },
  {
    id: 5,
    q: "요리한 음식을 인스타에 올리려는데 사진이 안 나올 때",
    a1: { text: "플레이팅을 다시 해서 찍는다", tags: ["E", "P"] },
    a2: { text: "그냥 먹는다", tags: ["I", "J"] },
  },
  {
    id: 6,
    q: "요리한 음식이 예쁜데 접시가 안 맞을 때",
    a1: { text: "다른 접시를 찾아서 바꾼다", tags: ["E", "N"] },
    a2: { text: "그냥 그 접시에 담는다", tags: ["I", "S"] },
  },
  {
    id: 7,
    q: "요리한 음식을 플레이팅하다가 시간이 오래 걸릴 때",
    a1: { text: "계속 예쁘게 만든다", tags: ["J", "F"] },
    a2: { text: "대충 하고 먹는다", tags: ["P", "T"] },
  },
  {
    id: 8,
    q: "요리한 음식을 플레이팅하다가 배가 고파질 때",
    a1: { text: "빨리 끝내고 먹는다", tags: ["E", "P"] },
    a2: { text: "완성될 때까지 기다린다", tags: ["I", "J"] },
  },
  {
    id: 9,
    q: "요리한 음식을 플레이팅하다가 실수로 망쳤을 때",
    a1: { text: "다시 처음부터 한다", tags: ["J", "F"] },
    a2: { text: "그냥 먹는다", tags: ["P", "T"] },
  },
  {
    id: 10,
    q: "요리한 음식을 플레이팅하다가 재료가 부족할 때",
    a1: { text: "다른 재료로 대체해서 만든다", tags: ["P", "N"] },
    a2: { text: "그냥 간단하게 담는다", tags: ["J", "S"] },
  },
  {
    id: 11,
    q: "요리한 음식을 플레이팅하다가 친구가 와서 먹자고 할 때",
    a1: { text: "빨리 끝내고 함께 먹는다", tags: ["E", "F"] },
    a2: { text: "완성될 때까지 기다리게 한다", tags: ["I", "T"] },
  },
  {
    id: 12,
    q: "요리한 음식을 플레이팅하다가 맛이 식어갈 때",
    a1: { text: "빨리 끝내고 먹는다", tags: ["E", "P"] },
    a2: { text: "완성될 때까지 기다린다", tags: ["I", "J"] },
  },
]

export default function CookingPresentationTest() {
  const quizLogic = useQuizLogic({
    testId: "cooking-presentation",
    questions,
    resultPath: "/tests/cooking-presentation/test/result",
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
      colorClasses={getQuizColorScheme("indigo-purple")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
