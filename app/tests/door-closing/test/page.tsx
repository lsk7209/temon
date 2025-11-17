"use client"

/**
 * Component: DoorClosingTest
 * 문 닫기 테스트 페이지
 * @example <DoorClosingTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "집에 들어가다가 문을 닫을 때 옆집에서 시끄러운 소리가 들릴 때",
    a1: { text: "조용히 천천히 닫는다", tags: ["I"] },
    a2: { text: "빠르게 확실하게 닫는다", tags: ["E"] },
  },
  {
    id: 2,
    q: "집을 나가다가 문을 잠글지 말지 고민될 때",
    a1: { text: "항상 잠그는 습관이 있어서 잠근다", tags: ["J"] },
    a2: { text: "상황에 따라 가끔 안 잠근다", tags: ["P"] },
  },
  {
    id: 3,
    q: "여러 개의 문을 닫아야 할 때",
    a1: { text: "정해진 순서대로 체계적으로 닫는다", tags: ["J"] },
    a2: { text: "그때그때 편한 대로 닫는다", tags: ["P"] },
  },
  {
    id: 4,
    q: "문을 닫다가 친구가 와서 '문 열어줘!'라고 외칠 때",
    a1: { text: "문 닫는 루틴을 끝내고 연다", tags: ["J"] },
    a2: { text: "즉시 문을 다시 연다", tags: ["P"] },
  },
  {
    id: 5,
    q: "문을 닫다가 문이 삐걱거리거나 이상한 소리가 날 때",
    a1: { text: "조용히 확인하고 천천히 닫는다", tags: ["I"] },
    a2: { text: "당황해서 빠르게 닫는다", tags: ["E"] },
  },
  {
    id: 6,
    q: "문을 닫고 나가다가 문이 제대로 잠겼는지 불안할 때",
    a1: { text: "다시 돌아가서 확인한다", tags: ["F"] },
    a2: { text: "그냥 가고 신경 안 쓴다", tags: ["T"] },
  },
  {
    id: 7,
    q: "문을 닫다가 가족이나 친구들이 함께 있을 때",
    a1: { text: "혼자 조용히 닫는다", tags: ["I"] },
    a2: { text: "함께 닫으면서 대화한다", tags: ["E"] },
  },
  {
    id: 8,
    q: "문을 닫다가 문 종류나 스타일을 선택할 수 있을 때",
    a1: { text: "실용적이고 효율적인 걸 선택한다", tags: ["S"] },
    a2: { text: "특별하고 의미 있는 걸 선택한다", tags: ["N"] },
  },
  {
    id: 9,
    q: "문을 닫기 전에 계획을 세울 수 있을 때",
    a1: { text: "미리 언제 어떻게 닫을지 계획한다", tags: ["J"] },
    a2: { text: "그때그때 즉흥적으로 닫는다", tags: ["P"] },
  },
  {
    id: 10,
    q: "문을 닫다가 문 닫는 게 재미있고 즐거울 때",
    a1: { text: "조용히 혼자 즐긴다", tags: ["I"] },
    a2: { text: "친구들에게 공유하고 함께 즐긴다", tags: ["E"] },
  },
  {
    id: 11,
    q: "문을 닫다가 문 닫는 이유나 의미를 생각할 때",
    a1: { text: "감성적이고 의미 있는 이유를 생각한다", tags: ["F"] },
    a2: { text: "실용적이고 효율적인 이유만 생각한다", tags: ["T"] },
  },
  {
    id: 12,
    q: "문을 닫다가 문 닫는 경험이 특별해서 공유하고 싶을 때",
    a1: { text: "즉시 친구들에게 경험을 공유한다", tags: ["E"] },
    a2: { text: "혼자만의 특별한 경험으로 간직한다", tags: ["I"] },
  },
]

export default function DoorClosingTest() {
  const quizLogic = useQuizLogic({
    testId: "door-closing",
    questions,
    resultPath: "/tests/door-closing/test/result",
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
      colorClasses={getQuizColorScheme("purple-pink")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
