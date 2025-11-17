"use client"

/**
 * Component: LeftoverHandlingTest
 * 남은 음식 처리 테스트 페이지
 * @example <LeftoverHandlingTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "식사를 마치고 남은 음식을 처리할 때",
    a1: { text: "계획적이고 체계적으로 처리한다", tags: ["J"] },
    a2: { text: "즉흥적으로 그때그때 처리한다", tags: ["P"] },
  },
  {
    id: 2,
    q: "남은 음식을 냉장고에 보관할 때",
    a1: { text: "정확히 라벨을 붙여서 보관한다", tags: ["S"] },
    a2: { text: "대충 편하게 보관한다", tags: ["N"] },
  },
  {
    id: 3,
    q: "친구가 '왜 남은 음식을 보관해?'라고 물어볼 때",
    a1: { text: "감성과 아까운 마음 때문에 보관한다고 말한다", tags: ["F"] },
    a2: { text: "실용과 효율성 때문에 보관한다고 말한다", tags: ["T"] },
  },
  {
    id: 4,
    q: "남은 음식을 친구에게 나눠주고 싶을 때",
    a1: { text: "적극적으로 나눠준다", tags: ["E"] },
    a2: { text: "조용히 처리한다", tags: ["I"] },
  },
  {
    id: 5,
    q: "남은 음식을 활용할 때",
    a1: { text: "그대로 먹는다", tags: ["S"] },
    a2: { text: "창의적으로 변형해서 먹는다", tags: ["N"] },
  },
  {
    id: 6,
    q: "남은 음식을 처리할 시점을 정할 때",
    a1: { text: "즉시 바로 처리한다", tags: ["J"] },
    a2: { text: "나중에 여유있게 처리한다", tags: ["P"] },
  },
  {
    id: 7,
    q: "남은 음식을 처리하고 나서 기분이 좋을 때",
    a1: { text: "뿌듯함과 만족감을 느낀다", tags: ["F"] },
    a2: { text: "효율성과 합리성을 느낀다", tags: ["T"] },
  },
  {
    id: 8,
    q: "남은 음식을 처리하고 나서 다음 활동을 할 때",
    a1: { text: "즉시 공유한다", tags: ["E"] },
    a2: { text: "조용히 쉰다", tags: ["I"] },
  },
  {
    id: 9,
    q: "남은 음식을 냉장고에 보관할 때 공간을 정할 때",
    a1: { text: "정해진 자리에 보관한다", tags: ["J"] },
    a2: { text: "빈 곳 아무데나 보관한다", tags: ["P"] },
  },
  {
    id: 10,
    q: "남은 음식을 처리할 때 스타일을 선택할 때",
    a1: { text: "전통적이고 익숙한 방식으로 처리한다", tags: ["S"] },
    a2: { text: "실험적이고 새로운 방식으로 처리한다", tags: ["N"] },
  },
  {
    id: 11,
    q: "남은 음식을 처리하는 동기를 생각할 때",
    a1: { text: "감성과 아까운 마음 때문에 처리한다", tags: ["F"] },
    a2: { text: "논리와 효율 때문에 처리한다", tags: ["T"] },
  },
  {
    id: 12,
    q: "남은 음식을 처리하고 나서 정리할 때",
    a1: { text: "깨끗이 정리한다", tags: ["E"] },
    a2: { text: "최소한으로 정리한다", tags: ["I"] },
  },
]

export default function LeftoverHandlingTest() {
  const quizLogic = useQuizLogic({
    testId: "leftover-handling",
    questions,
    resultPath: "/tests/leftover-handling/test/result",
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
