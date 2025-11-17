"use client"

/**
 * Component: EveningSocialTest
 * 저녁 모임 테스트 페이지
 * @example <EveningSocialTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "저녁 약속이 생겼을 때",
    a1: { text: "즉시 계획을 세운다", tags: ["J", "T"] },
    a2: { text: "그때그때 대처한다", tags: ["P", "F"] },
  },
  {
    id: 2,
    q: "저녁 약속을 취소해야 할 때",
    a1: { text: "미리 알려준다", tags: ["J", "T"] },
    a2: { text: "상황에 따라 결정한다", tags: ["P", "F"] },
  },
  {
    id: 3,
    q: "저녁 약속 장소를 정할 때",
    a1: { text: "정해진 장소를 제안한다", tags: ["S", "J"] },
    a2: { text: "다양한 장소를 제안한다", tags: ["N", "P"] },
  },
  {
    id: 4,
    q: "저녁 약속에 참석할 때",
    a1: { text: "정해진 시간에 정확히 간다", tags: ["J", "S"] },
    a2: { text: "유연하게 간다", tags: ["P", "N"] },
  },
  {
    id: 5,
    q: "저녁 약속에서 대화할 때",
    a1: { text: "주제를 정해두고 대화한다", tags: ["T", "J"] },
    a2: { text: "자유롭게 대화한다", tags: ["F", "P"] },
  },
  {
    id: 6,
    q: "저녁 약속 후 기분",
    a1: { text: "에너지를 얻는다", tags: ["E", "N"] },
    a2: { text: "에너지를 소모한다", tags: ["I", "S"] },
  },
  {
    id: 7,
    q: "저녁 약속에 초대받았을 때",
    a1: { text: "즉시 수락한다", tags: ["E", "F"] },
    a2: { text: "신중하게 고려한다", tags: ["I", "T"] },
  },
  {
    id: 8,
    q: "저녁 약속에서 사람들과 만날 때",
    a1: { text: "많은 사람들과 만난다", tags: ["E", "N"] },
    a2: { text: "소수의 사람들과 만난다", tags: ["I", "S"] },
  },
  {
    id: 9,
    q: "저녁 약속에서 시간을 보낼 때",
    a1: { text: "정해진 시간에 끝낸다", tags: ["J", "T"] },
    a2: { text: "기분에 따라 시간이 달라진다", tags: ["P", "F"] },
  },
  {
    id: 10,
    q: "저녁 약속 후 할 일",
    a1: { text: "즉시 할 일을 시작한다", tags: ["E", "J"] },
    a2: { text: "잠시 더 여유롭게 즐긴다", tags: ["I", "P"] },
  },
  {
    id: 11,
    q: "저녁 약속을 선택하는 기준",
    a1: { text: "목표와 계획을 위해", tags: ["T", "J"] },
    a2: { text: "기분과 관계를 위해", tags: ["F", "P"] },
  },
  {
    id: 12,
    q: "저녁 약속에서 대화하는 방식",
    a1: { text: "논리적이고 체계적으로", tags: ["T", "S"] },
    a2: { text: "감성적이고 자유롭게", tags: ["F", "N"] },
  },
]

export default function EveningSocialTest() {
  const quizLogic = useQuizLogic({
    testId: "evening-social",
    questions,
    resultPath: "/tests/evening-social/test/result",
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
      colorClasses={getQuizColorScheme("blue-cyan")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}

