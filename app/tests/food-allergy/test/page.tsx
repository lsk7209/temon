"use client"

/**
 * Component: FoodAllergyTest
 * 음식 알레르기 테스트 페이지
 * @example <FoodAllergyTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "알레르기가 있는 음식이 메뉴에 있을 때",
    a1: { text: "철저히 피하고 안전을 우선한다", tags: ["J"] },
    a2: { text: "주의하며 먹고 유연하게 대처한다", tags: ["P"] },
  },
  {
    id: 2,
    q: "식당에서 메뉴를 고를 때 알레르기 성분을 확인할 때",
    a1: { text: "계획적으로 미리 체크한다", tags: ["J"] },
    a2: { text: "즉흥적으로 그때그때 확인한다", tags: ["P"] },
  },
  {
    id: 3,
    q: "친구가 '왜 알레르기 음식을 피해?'라고 물어볼 때",
    a1: { text: "감성과 건강을 위해 피한다고 말한다", tags: ["F"] },
    a2: { text: "실용과 효율을 위해 피한다고 말한다", tags: ["T"] },
  },
  {
    id: 4,
    q: "알레르기 정보를 친구에게 공유하고 싶을 때",
    a1: { text: "적극적으로 공유한다", tags: ["E"] },
    a2: { text: "조용히 관리한다", tags: ["I"] },
  },
  {
    id: 5,
    q: "알레르기 음식을 대처할 때 대처 스타일을 선택할 때",
    a1: { text: "전통적이고 익숙한 방식으로 대처한다", tags: ["S"] },
    a2: { text: "창의적이고 새로운 방식으로 대처한다", tags: ["N"] },
  },
  {
    id: 6,
    q: "알레르기 음식을 피하고 나서 기분이 좋을 때",
    a1: { text: "안심과 뿌듯함을 느낀다", tags: ["F"] },
    a2: { text: "효율성과 실용성을 느낀다", tags: ["T"] },
  },
  {
    id: 7,
    q: "알레르기 음식을 대처할 때 시간이 부족할 때",
    a1: { text: "여유롭게 천천히 대처한다", tags: ["F"] },
    a2: { text: "빠르고 효율적으로 대처한다", tags: ["T"] },
  },
  {
    id: 8,
    q: "알레르기 음식을 대처하고 나서 친구에게 이야기하고 싶을 때",
    a1: { text: "즉시 공유하고 소통한다", tags: ["E"] },
    a2: { text: "조용히 관리한다", tags: ["I"] },
  },
  {
    id: 9,
    q: "알레르기 음식을 대처하기 전에 계획을 세울 때",
    a1: { text: "미리 계획한다", tags: ["J"] },
    a2: { text: "그때그때 대처한다", tags: ["P"] },
  },
  {
    id: 10,
    q: "알레르기 음식을 대처할 때 대처 방식을 선택할 때",
    a1: { text: "정해진 방식대로 대처한다", tags: ["S"] },
    a2: { text: "상황에 맞게 응용해서 대처한다", tags: ["N"] },
  },
  {
    id: 11,
    q: "알레르기 음식을 대처하는 동기를 생각할 때",
    a1: { text: "감성과 건강을 위해 대처한다", tags: ["F"] },
    a2: { text: "논리와 효율을 위해 대처한다", tags: ["T"] },
  },
  {
    id: 12,
    q: "알레르기 음식을 대처하고 나서 정리할 때",
    a1: { text: "즉시 체계적으로 정리한다", tags: ["E"] },
    a2: { text: "나중에 편하게 정리한다", tags: ["I"] },
  },
]

export default function FoodAllergyTest() {
  const quizLogic = useQuizLogic({
    testId: "food-allergy",
    questions,
    resultPath: "/tests/food-allergy/test/result",
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
      colorClasses={getQuizColorScheme("yellow-orange")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
