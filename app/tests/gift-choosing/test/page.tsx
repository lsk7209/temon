"use client"

/**
 * Component: GiftChoosingTest
 * 선물 고르기 테스트 페이지
 * @example <GiftChoosingTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "친구 생일 선물을 고르다가 '실용적인 물건'과 '의미 있는 물건' 중 고민될 때",
    a1: { text: "친구가 필요로 하는 실용적인 선물을 선택한다", tags: ["T"] },
    a2: { text: "친구에게 의미 있는 감성적인 선물을 선택한다", tags: ["F"] },
  },
  {
    id: 2,
    q: "선물을 포장하다가 포장지가 너무 예쁘거나 복잡할 때",
    a1: { text: "예쁘게 정성스럽게 포장한다", tags: ["F"] },
    a2: { text: "간단하고 효율적으로 포장한다", tags: ["T"] },
  },
  {
    id: 3,
    q: "선물을 준비하다가 생일이 내일인데 아직 선물을 안 샀을 때",
    a1: { text: "미리 계획해서 준비했어야 한다고 후회한다", tags: ["J"] },
    a2: { text: "당일 구매해도 괜찮다고 생각한다", tags: ["P"] },
  },
  {
    id: 4,
    q: "선물을 선택하다가 여러 가지 옵션이 있을 때",
    a1: { text: "리스트를 작성해서 계획적으로 선택한다", tags: ["J"] },
    a2: { text: "그때그때 느낌으로 즉흥적으로 선택한다", tags: ["P"] },
  },
  {
    id: 5,
    q: "선물을 고르다가 예산보다 비싼 선물이 마음에 들 때",
    a1: { text: "예산 내에서 합리적인 선물을 선택한다", tags: ["T"] },
    a2: { text: "의미가 중요해서 가격은 부차적이라고 생각한다", tags: ["F"] },
  },
  {
    id: 6,
    q: "선물을 주기 전에 친구가 반응을 기대할 때",
    a1: { text: "기대감에 설레는 마음으로 준다", tags: ["E"] },
    a2: { text: "평온하고 차분하게 준다", tags: ["I"] },
  },
  {
    id: 7,
    q: "선물을 선택할 때 메뉴판이나 카탈로그를 볼 때",
    a1: { text: "인기 선물이나 트렌드를 따라 선택한다", tags: ["S"] },
    a2: { text: "특별하고 독특한 선물을 선택한다", tags: ["N"] },
  },
  {
    id: 8,
    q: "선물을 줄 때 함께 줄 사람이 있을 때",
    a1: { text: "혼자 조용히 준다", tags: ["I"] },
    a2: { text: "친구들과 함께 준다", tags: ["E"] },
  },
  {
    id: 9,
    q: "선물을 준비하기 전에 계획을 세울 때",
    a1: { text: "미리 언제 무엇을 어떻게 준비할지 계획한다", tags: ["J"] },
    a2: { text: "그때그때 즉흥적으로 준비한다", tags: ["P"] },
  },
  {
    id: 10,
    q: "선물을 선택할 때 선택하는 이유를 생각할 때",
    a1: { text: "필요하고 실용적인 이유로 선택한다", tags: ["T"] },
    a2: { text: "의미 있고 감성적인 이유로 선택한다", tags: ["F"] },
  },
  {
    id: 11,
    q: "선물을 주고 친구가 좋아하는 모습을 볼 때",
    a1: { text: "즉시 친구들에게 경험을 공유한다", tags: ["E"] },
    a2: { text: "조용히 혼자만의 특별한 경험으로 간직한다", tags: ["I"] },
  },
  {
    id: 12,
    q: "선물을 포장하다가 포장 스타일을 선택할 때",
    a1: { text: "예쁘고 정성스러운 스타일로 포장한다", tags: ["F"] },
    a2: { text: "간단하고 효율적인 스타일로 포장한다", tags: ["T"] },
  },
]

export default function GiftChoosingTest() {
  const quizLogic = useQuizLogic({
    testId: "gift-choosing",
    questions,
    resultPath: "/tests/gift-choosing/test/result",
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
