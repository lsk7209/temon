"use client"

/**
 * Component: SoupEatingTest
 * 국물 요리 먹기 테스트 페이지
 * @example <SoupEatingTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "국물 요리를 먹을 때 국물을 마시는 방식을 정할 때",
    a1: { text: "천천히 꼼꼼하게 마신다", tags: ["F"] },
    a2: { text: "빠르고 효율적으로 마신다", tags: ["T"] },
  },
  {
    id: 2,
    q: "국물 요리를 먹을 때 국물을 마시는 양을 정할 때",
    a1: { text: "조금씩 꾸준히 마신다", tags: ["S"] },
    a2: { text: "많이 한 번에 마신다", tags: ["N"] },
  },
  {
    id: 3,
    q: "국물 요리를 먹을 때 국물을 마시는 타이밍을 정할 때",
    a1: { text: "처음부터 계획적으로 마신다", tags: ["J"] },
    a2: { text: "그때그때 즉흥적으로 마신다", tags: ["P"] },
  },
  {
    id: 4,
    q: "국물 요리를 먹을 때 국물을 마시는 방법을 선택할 때",
    a1: { text: "숟가락으로 체계적으로 마신다", tags: ["J"] },
    a2: { text: "그릇으로 자연스럽게 마신다", tags: ["P"] },
  },
  {
    id: 5,
    q: "국물 요리를 주문할 때 국물 종류를 선택할 때",
    a1: { text: "진한 국물로 풍부한 맛을 선택한다", tags: ["E"] },
    a2: { text: "맑은 국물로 깔끔한 맛을 선택한다", tags: ["I"] },
  },
  {
    id: 6,
    q: "친구가 '왜 국물을 마셔?'라고 물어볼 때",
    a1: { text: "감성과 의미를 위해 마신다고 말한다", tags: ["F"] },
    a2: { text: "실용과 효율을 위해 마신다고 말한다", tags: ["T"] },
  },
  {
    id: 7,
    q: "국물 요리를 먹을 때 친구가 와서 '나도 같이 먹고 싶어!'라고 할 때",
    a1: { text: "즉시 함께 먹는다", tags: ["E"] },
    a2: { text: "혼자 조용히 먹는다", tags: ["I"] },
  },
  {
    id: 8,
    q: "국물 요리를 먹고 나서 기분이 좋을 때",
    a1: { text: "즐거움과 기쁨을 느낀다", tags: ["E"] },
    a2: { text: "평온함과 차분함을 느낀다", tags: ["I"] },
  },
  {
    id: 9,
    q: "국물 요리를 주문할 때 국물 종류를 선택할 때",
    a1: { text: "익숙한 국물이나 기본 국물을 선택한다", tags: ["S"] },
    a2: { text: "새로운 국물이나 특별한 국물을 선택한다", tags: ["N"] },
  },
  {
    id: 10,
    q: "국물 요리를 먹기 전에 계획을 세울 때",
    a1: { text: "미리 계획하고 체계적으로 마신다", tags: ["J"] },
    a2: { text: "그때그때 즉흥적으로 마신다", tags: ["P"] },
  },
  {
    id: 11,
    q: "국물 요리를 먹고 나서 친구에게 공유하고 싶을 때",
    a1: { text: "즉시 공유하고 이야기한다", tags: ["E"] },
    a2: { text: "조용히 혼자만 즐긴다", tags: ["I"] },
  },
  {
    id: 12,
    q: "국물 요리를 선택할 때 이유를 생각할 때",
    a1: { text: "의미와 특별함 때문에 선택한다", tags: ["N"] },
    a2: { text: "실용성과 효율 때문에 선택한다", tags: ["S"] },
  },
]

export default function SoupEatingTest() {
  const quizLogic = useQuizLogic({
    testId: "soup-eating",
    questions,
    resultPath: "/tests/soup-eating/test/result",
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
