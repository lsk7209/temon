"use client"

/**
 * Component: FoodGarnishingTest
 * 음식 장식 테스트 페이지
 * @example <FoodGarnishingTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "음식에 장식을 할 때 '화려하게 꾸미기'와 '심플하게 간단히' 중 선택할 때",
    a1: { text: "꾸미기를 좋아해서 화려하게 장식한다", tags: ["F"] },
    a2: { text: "심플을 선호해서 간단하게 장식한다", tags: ["T"] },
  },
  {
    id: 2,
    q: "음식에 장식을 할 때 장식 방법을 정할 때",
    a1: { text: "계획적이고 체계적으로 장식한다", tags: ["J"] },
    a2: { text: "즉흥적이고 자유롭게 장식한다", tags: ["P"] },
  },
  {
    id: 3,
    q: "음식에 장식을 할 때 장식 기준을 정할 때",
    a1: { text: "보기 좋고 감성적인 기준으로 장식한다", tags: ["F"] },
    a2: { text: "맛과 실용적인 기준으로 장식한다", tags: ["T"] },
  },
  {
    id: 4,
    q: "음식에 장식을 할 때 시간이 부족할 때",
    a1: { text: "충분히 시간을 들여서 장식한다", tags: ["I"] },
    a2: { text: "빠르고 효율적으로 장식한다", tags: ["E"] },
  },
  {
    id: 5,
    q: "음식에 장식을 완성하고 나서 친구에게 보여주고 싶을 때",
    a1: { text: "사진을 찍어서 공유한다", tags: ["E"] },
    a2: { text: "그냥 먹고 조용히 즐긴다", tags: ["I"] },
  },
  {
    id: 6,
    q: "친구가 '왜 장식을 해?'라고 물어볼 때",
    a1: { text: "감성과 예술을 위해 장식한다고 말한다", tags: ["F"] },
    a2: { text: "실용과 효율을 위해 장식한다고 말한다", tags: ["T"] },
  },
  {
    id: 7,
    q: "음식에 장식을 할 때 스타일을 선택할 때",
    a1: { text: "익숙한 스타일로 기본적으로 장식한다", tags: ["S"] },
    a2: { text: "새로운 스타일로 창의적으로 장식한다", tags: ["N"] },
  },
  {
    id: 8,
    q: "음식에 장식을 하기 전에 준비할 때",
    a1: { text: "미리 준비하고 계획해서 장식한다", tags: ["J"] },
    a2: { text: "그때그때 즉흥적으로 장식한다", tags: ["P"] },
  },
  {
    id: 9,
    q: "음식에 장식을 완성하고 나서 기분이 좋을 때",
    a1: { text: "만족감과 성취감을 느낀다", tags: ["E"] },
    a2: { text: "평온함과 차분함을 느낀다", tags: ["I"] },
  },
  {
    id: 10,
    q: "음식에 장식을 할 때 빈도를 생각할 때",
    a1: { text: "자주 장식하고 적극적으로 장식한다", tags: ["E"] },
    a2: { text: "가끔 장식하고 신중하게 장식한다", tags: ["I"] },
  },
  {
    id: 11,
    q: "음식에 장식을 할 때 장식 종류를 선택할 때",
    a1: { text: "전통적인 장식으로 기본적으로 장식한다", tags: ["S"] },
    a2: { text: "퓨전 장식으로 창의적으로 장식한다", tags: ["N"] },
  },
  {
    id: 12,
    q: "음식에 장식을 할 때 장식 기준을 생각할 때",
    a1: { text: "감성과 예술성을 기준으로 장식한다", tags: ["F"] },
    a2: { text: "실용성과 효율성을 기준으로 장식한다", tags: ["T"] },
  },
]

export default function FoodGarnishingTest() {
  const quizLogic = useQuizLogic({
    testId: "food-garnishing",
    questions,
    resultPath: "/tests/food-garnishing/test/result",
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
