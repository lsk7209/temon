"use client"

/**
 * Component: CookingStyleTest
 * 요리 스타일 테스트 페이지
 * @example <CookingStyleTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "요리를 시작하기 전에 준비할 때",
    a1: { text: "계획적이고 체계적으로 준비한다", tags: ["J"] },
    a2: { text: "즉흥적이고 유연하게 준비한다", tags: ["P"] },
  },
  {
    id: 2,
    q: "레시피를 보면서 요리할 때",
    a1: { text: "정확히 레시피를 따른다", tags: ["S"] },
    a2: { text: "응용하고 변형해서 만든다", tags: ["N"] },
  },
  {
    id: 3,
    q: "요리를 할 때 시간이 부족할 때",
    a1: { text: "여유롭게 천천히 만든다", tags: ["F"] },
    a2: { text: "빠르고 효율적으로 만든다", tags: ["T"] },
  },
  {
    id: 4,
    q: "요리를 할 때 친구가 와서 '나도 같이 만들고 싶어!'라고 할 때",
    a1: { text: "즉시 함께 만든다", tags: ["E"] },
    a2: { text: "혼자 조용히 만든다", tags: ["I"] },
  },
  {
    id: 5,
    q: "친구가 '왜 요리를 해?'라고 물어볼 때",
    a1: { text: "감성과 즐거움을 위해 만든다고 말한다", tags: ["F"] },
    a2: { text: "실용과 효율을 위해 만든다고 말한다", tags: ["T"] },
  },
  {
    id: 6,
    q: "요리를 마치고 나서 정리할 때",
    a1: { text: "즉시 바로바로 정리한다", tags: ["J"] },
    a2: { text: "나중에 여유있게 정리한다", tags: ["P"] },
  },
  {
    id: 7,
    q: "요리를 할 때 스타일을 선택할 때",
    a1: { text: "전통적이고 기본적인 스타일로 만든다", tags: ["S"] },
    a2: { text: "창의적이고 실험적인 스타일로 만든다", tags: ["N"] },
  },
  {
    id: 8,
    q: "요리를 완성하고 나서 기분이 좋을 때",
    a1: { text: "즐거움과 뿌듯함을 느낀다", tags: ["E"] },
    a2: { text: "평온함과 차분함을 느낀다", tags: ["I"] },
  },
  {
    id: 9,
    q: "요리를 할 때 재료를 선택할 때",
    a1: { text: "익숙한 재료를 선택한다", tags: ["S"] },
    a2: { text: "새로운 재료를 선택한다", tags: ["N"] },
  },
  {
    id: 10,
    q: "요리를 시작하기 전에 계획을 세울 때",
    a1: { text: "미리 계획한다", tags: ["J"] },
    a2: { text: "그때그때 결정한다", tags: ["P"] },
  },
  {
    id: 11,
    q: "요리를 완성하고 나서 친구에게 대접하고 싶을 때",
    a1: { text: "즉시 공유하고 대접한다", tags: ["E"] },
    a2: { text: "조용히 혼자만 즐긴다", tags: ["I"] },
  },
  {
    id: 12,
    q: "요리를 할 때 방식을 선택할 때",
    a1: { text: "감성적이고 즐겁게 만든다", tags: ["F"] },
    a2: { text: "효율적이고 빠르게 만든다", tags: ["T"] },
  },
]

export default function CookingStyleTest() {
  const quizLogic = useQuizLogic({
    testId: "cooking-style",
    questions,
    resultPath: "/tests/cooking-style/test/result",
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
      colorClasses={getQuizColorScheme("orange-red")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
