"use client"

/**
 * Component: FoodPresentationTest
 * 음식 플레이팅 테스트 페이지
 * @example <FoodPresentationTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "음식을 접시에 담을 때 플레이팅을 할 때",
    a1: { text: "예쁘게 정성스럽게 플레이팅한다", tags: ["F"] },
    a2: { text: "간단하게 실용적으로 플레이팅한다", tags: ["T"] },
  },
  {
    id: 2,
    q: "음식을 접시에 배치할 때",
    a1: { text: "계획적이고 체계적으로 배치한다", tags: ["J"] },
    a2: { text: "자연스럽고 즉흥적으로 배치한다", tags: ["P"] },
  },
  {
    id: 3,
    q: "친구가 '왜 플레이팅을 해?'라고 물어볼 때",
    a1: { text: "감성과 예쁨을 위해 플레이팅한다고 말한다", tags: ["F"] },
    a2: { text: "실용과 효율을 위해 플레이팅한다고 말한다", tags: ["T"] },
  },
  {
    id: 4,
    q: "플레이팅을 완성하고 나서 친구에게 보여주고 싶을 때",
    a1: { text: "적극적으로 공유한다", tags: ["E"] },
    a2: { text: "조용히 혼자만 즐긴다", tags: ["I"] },
  },
  {
    id: 5,
    q: "플레이팅을 할 때 스타일을 선택할 때",
    a1: { text: "전통적이고 익숙한 스타일로 플레이팅한다", tags: ["S"] },
    a2: { text: "창의적이고 새로운 스타일로 플레이팅한다", tags: ["N"] },
  },
  {
    id: 6,
    q: "플레이팅을 완성하고 나서 기분이 좋을 때",
    a1: { text: "즐거움과 뿌듯함을 느낀다", tags: ["F"] },
    a2: { text: "만족감과 완성도를 느낀다", tags: ["T"] },
  },
  {
    id: 7,
    q: "플레이팅을 할 때 시간이 부족할 때",
    a1: { text: "여유롭게 천천히 플레이팅한다", tags: ["F"] },
    a2: { text: "빠르고 효율적으로 플레이팅한다", tags: ["T"] },
  },
  {
    id: 8,
    q: "플레이팅을 완성하고 나서 다음 활동을 할 때",
    a1: { text: "즉시 공유하고 소통한다", tags: ["E"] },
    a2: { text: "조용히 감상한다", tags: ["I"] },
  },
  {
    id: 9,
    q: "플레이팅을 하기 전에 계획을 세울 때",
    a1: { text: "미리 계획한다", tags: ["J"] },
    a2: { text: "그때그때 즉흥적으로 플레이팅한다", tags: ["P"] },
  },
  {
    id: 10,
    q: "플레이팅을 할 때 방식을 선택할 때",
    a1: { text: "정해진 방식대로 플레이팅한다", tags: ["S"] },
    a2: { text: "상황에 맞게 응용해서 플레이팅한다", tags: ["N"] },
  },
  {
    id: 11,
    q: "플레이팅을 하는 동기를 생각할 때",
    a1: { text: "감성과 아름다움을 위해 플레이팅한다", tags: ["F"] },
    a2: { text: "논리와 완성도를 위해 플레이팅한다", tags: ["T"] },
  },
  {
    id: 12,
    q: "플레이팅을 마치고 나서 정리할 때",
    a1: { text: "즉시 체계적으로 정리한다", tags: ["E"] },
    a2: { text: "나중에 편하게 정리한다", tags: ["I"] },
  },
]

export default function FoodPresentationTest() {
  const quizLogic = useQuizLogic({
    testId: "food-presentation",
    questions,
    resultPath: "/tests/food-presentation/test/result",
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
