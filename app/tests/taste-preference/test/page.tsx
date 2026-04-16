"use client"

/**
 * Component: TastePreferenceTest
 * 맛 선호도 테스트 페이지
 * @example <TastePreferenceTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "식당에서 메뉴를 고를 때 '단맛'과 '쓴맛' 중 선택할 때",
    a1: { text: "단맛으로 달콤한 것을 선택한다", tags: ["F"] },
    a2: { text: "쓴맛으로 깊은 맛을 선택한다", tags: ["T"] },
  },
  {
    id: 2,
    q: "음식을 선택할 때 맛을 고를 때",
    a1: { text: "익숙한 맛이나 기본 맛을 선택한다", tags: ["S"] },
    a2: { text: "새로운 맛이나 특별한 맛을 선택한다", tags: ["N"] },
  },
  {
    id: 3,
    q: "음식을 먹을 때 맛을 경험하는 방식",
    a1: { text: "천천히 꼼꼼하게 맛을 본다", tags: ["F"] },
    a2: { text: "빠르고 효율적으로 맛을 본다", tags: ["T"] },
  },
  {
    id: 4,
    q: "맛있는 음식을 발견했을 때 친구에게 공유하고 싶을 때",
    a1: { text: "즉시 함께 즐긴다", tags: ["E"] },
    a2: { text: "혼자 조용히 즐긴다", tags: ["I"] },
  },
  {
    id: 5,
    q: "친구가 '왜 그 맛을 골랐어?'라고 물어볼 때",
    a1: { text: "감성과 의미 때문에 선택했다고 말한다", tags: ["F"] },
    a2: { text: "실용과 효율 때문에 선택했다고 말한다", tags: ["T"] },
  },
  {
    id: 6,
    q: "음식의 맛을 기억할 때",
    a1: { text: "자세하고 상세하게 기억한다", tags: ["S"] },
    a2: { text: "간단하고 전체적으로 기억한다", tags: ["N"] },
  },
  {
    id: 7,
    q: "새로운 맛을 탐험할 때",
    a1: { text: "계획적이고 체계적으로 탐험한다", tags: ["J"] },
    a2: { text: "즉흥적이고 유연하게 탐험한다", tags: ["P"] },
  },
  {
    id: 8,
    q: "맛있는 음식을 먹고 나서 기분이 좋을 때",
    a1: { text: "즐거움과 기쁨을 느낀다", tags: ["E"] },
    a2: { text: "평온함과 차분함을 느낀다", tags: ["I"] },
  },
  {
    id: 9,
    q: "음식의 맛을 조합할 때",
    a1: { text: "단순한 조합을 선호한다", tags: ["S"] },
    a2: { text: "복잡한 조합을 선호한다", tags: ["N"] },
  },
  {
    id: 10,
    q: "음식의 맛을 선택하기 전에 계획을 세울 때",
    a1: { text: "미리 계획하고 체계적으로 선택한다", tags: ["J"] },
    a2: { text: "그때그때 즉흥적으로 선택한다", tags: ["P"] },
  },
  {
    id: 11,
    q: "맛있는 음식을 경험하고 나서 친구에게 공유하고 싶을 때",
    a1: { text: "즉시 공유하고 이야기한다", tags: ["E"] },
    a2: { text: "조용히 혼자만 즐긴다", tags: ["I"] },
  },
  {
    id: 12,
    q: "음식의 맛을 선택할 때 기준을 정할 때",
    a1: { text: "의미와 특별함을 기준으로 선택한다", tags: ["N"] },
    a2: { text: "실용성과 효율을 기준으로 선택한다", tags: ["S"] },
  },
]

export default function TastePreferenceTest() {
  const quizLogic = useQuizLogic({
    testId: "taste-preference",
    questions,
    resultPath: "/tests/taste-preference/test/result",
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
