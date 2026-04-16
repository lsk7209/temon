"use client"

/**
 * Component: FoodPhotographyTest
 * 음식 사진 테스트 페이지
 * @example <FoodPhotographyTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "맛집에서 음식 사진을 찍을 때",
    a1: { text: "계획적으로 구도를 고민해서 찍는다", tags: ["J"] },
    a2: { text: "즉흥적으로 자연스럽게 찍는다", tags: ["P"] },
  },
  {
    id: 2,
    q: "음식 사진을 찍을 때 구도를 선택할 때",
    a1: { text: "정확히 규칙대로 구도를 잡는다", tags: ["S"] },
    a2: { text: "감각적이고 창의적으로 구도를 잡는다", tags: ["N"] },
  },
  {
    id: 3,
    q: "친구가 '왜 음식 사진을 찍어?'라고 물어볼 때",
    a1: { text: "감성과 예쁨을 위해 찍는다고 말한다", tags: ["F"] },
    a2: { text: "기록과 정보를 위해 찍는다고 말한다", tags: ["T"] },
  },
  {
    id: 4,
    q: "음식 사진을 찍고 나서 SNS에 올리고 싶을 때",
    a1: { text: "적극적으로 올린다", tags: ["E"] },
    a2: { text: "조용히 보관한다", tags: ["I"] },
  },
  {
    id: 5,
    q: "음식 사진을 편집할 때",
    a1: { text: "원본 그대로 자연스럽게 둔다", tags: ["S"] },
    a2: { text: "편집해서 창의적으로 만든다", tags: ["N"] },
  },
  {
    id: 6,
    q: "음식이 나왔을 때 사진을 찍을 시점을 정할 때",
    a1: { text: "먹기 전에 바로 찍는다", tags: ["J"] },
    a2: { text: "생각날 때 찍는다", tags: ["P"] },
  },
  {
    id: 7,
    q: "음식 사진을 찍고 나서 기분이 좋을 때",
    a1: { text: "즐거움과 뿌듯함을 느낀다", tags: ["F"] },
    a2: { text: "만족감과 완성도를 느낀다", tags: ["T"] },
  },
  {
    id: 8,
    q: "음식 사진을 찍고 나서 다음 활동을 할 때",
    a1: { text: "즉시 공유하고 소통한다", tags: ["E"] },
    a2: { text: "조용히 감상한다", tags: ["I"] },
  },
  {
    id: 9,
    q: "음식 사진을 찍을 때 몇 장을 찍을지 정할 때",
    a1: { text: "정해진 수만큼 몇 장만 찍는다", tags: ["J"] },
    a2: { text: "많이 여러 각도로 찍는다", tags: ["P"] },
  },
  {
    id: 10,
    q: "음식 사진을 찍을 때 스타일을 선택할 때",
    a1: { text: "전통적이고 클래식한 스타일로 찍는다", tags: ["S"] },
    a2: { text: "실험적이고 트렌디한 스타일로 찍는다", tags: ["N"] },
  },
  {
    id: 11,
    q: "음식 사진을 찍는 동기를 생각할 때",
    a1: { text: "감성과 아름다움을 위해 찍는다", tags: ["F"] },
    a2: { text: "논리와 완성도를 위해 찍는다", tags: ["T"] },
  },
  {
    id: 12,
    q: "음식 사진을 찍고 나서 정리할 때",
    a1: { text: "즉시 체계적으로 정리한다", tags: ["E"] },
    a2: { text: "나중에 편하게 정리한다", tags: ["I"] },
  },
]

export default function FoodPhotographyTest() {
  const quizLogic = useQuizLogic({
    testId: "food-photography",
    questions,
    resultPath: "/tests/food-photography/test/result",
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
      colorClasses={getQuizColorScheme("pink-rose")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
