"use client"

/**
 * Component: FoodBrandTest
 * 음식 브랜드 테스트 페이지
 * @example <FoodBrandTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "항상 사던 브랜드가 품절되었을 때",
    a1: { text: "다른 매장을 찾아서라도 같은 브랜드를 찾는다", tags: ["J", "S"] },
    a2: { text: "비슷한 다른 브랜드를 시도해본다", tags: ["P", "N"] },
  },
  {
    id: 2,
    q: "새로운 브랜드가 더 저렴할 때",
    a1: { text: "가격 대비 품질을 비교하고 신중하게 결정한다", tags: ["T", "S"] },
    a2: { text: "저렴하니까 한 번 시도해본다", tags: ["F", "N"] },
  },
  {
    id: 3,
    q: "브랜드 이미지와 품질 중 선택할 때",
    a1: { text: "품질을 우선시하고 선택한다", tags: ["T", "S"] },
    a2: { text: "브랜드 이미지와 느낌으로 선택한다", tags: ["F", "N"] },
  },
  {
    id: 4,
    q: "단골 브랜드가 가격을 올렸을 때",
    a1: { text: "여전히 같은 브랜드를 선택한다", tags: ["J", "F"] },
    a2: { text: "다른 브랜드를 찾아본다", tags: ["P", "T"] },
  },
  {
    id: 5,
    q: "브랜드를 선택할 때",
    a1: { text: "친구들과 브랜드에 대해 이야기하며 선택한다", tags: ["E", "F"] },
    a2: { text: "혼자 조용히 비교하고 선택한다", tags: ["I", "T"] },
  },
  {
    id: 6,
    q: "브랜드가 실망스러웠을 때",
    a1: { text: "다른 브랜드를 계속 시도해본다", tags: ["P", "N"] },
    a2: { text: "검증된 브랜드로 돌아간다", tags: ["J", "S"] },
  },
  {
    id: 7,
    q: "브랜드 선택 기준",
    a1: { text: "과거 경험과 검증된 정보를 바탕으로 선택한다", tags: ["S", "J"] },
    a2: { text: "새로운 브랜드와 트렌드를 시도한다", tags: ["N", "P"] },
  },
  {
    id: 8,
    q: "브랜드 충성도",
    a1: { text: "특정 브랜드에 충성하는 편이다", tags: ["J", "F"] },
    a2: { text: "상황에 따라 다양한 브랜드를 선택한다", tags: ["P", "T"] },
  },
  {
    id: 9,
    q: "브랜드 정보를 얻을 때",
    a1: { text: "체계적으로 브랜드 정보를 수집하고 비교한다", tags: ["J", "T"] },
    a2: { text: "우연히 발견하거나 주변에서 듣는다", tags: ["P", "F"] },
  },
  {
    id: 10,
    q: "브랜드를 추천할 때",
    a1: { text: "즉시 친구들에게 추천하고 공유한다", tags: ["E", "F"] },
    a2: { text: "물어보면 알려주거나 기록한다", tags: ["I", "T"] },
  },
  {
    id: 11,
    q: "브랜드 선택 스타일",
    a1: { text: "계획적이고 일관되게 선택한다", tags: ["J", "S"] },
    a2: { text: "즉흥적이고 다양하게 선택한다", tags: ["P", "N"] },
  },
  {
    id: 12,
    q: "브랜드 가치",
    a1: { text: "브랜드 신뢰와 안정성을 중시한다", tags: ["J", "S"] },
    a2: { text: "새로운 경험과 다양성을 중시한다", tags: ["P", "N"] },
  },
]

export default function FoodBrandTest() {
  const quizLogic = useQuizLogic({
    testId: "food-brand",
    questions,
    resultPath: "/tests/food-brand/test/result",
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
      colorClasses={getQuizColorScheme("blue-indigo-purple")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
