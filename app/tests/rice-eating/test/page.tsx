"use client"

/**
 * Component: RiceEatingTest
 * 밥 먹기 테스트 페이지
 * @example <RiceEatingTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "식사를 할 때 밥을 먹는 속도를 정할 때",
    a1: { text: "천천히 꼼꼼하게 먹는다", tags: ["F"] },
    a2: { text: "빠르고 효율적으로 먹는다", tags: ["T"] },
  },
  {
    id: 2,
    q: "식사를 할 때 밥과 반찬을 조합할 때",
    a1: { text: "계획적이고 체계적으로 조합한다", tags: ["J"] },
    a2: { text: "그때그때 즉흥적으로 조합한다", tags: ["P"] },
  },
  {
    id: 3,
    q: "식사를 할 때 밥을 먹는 양을 정할 때",
    a1: { text: "조금씩 꾸준히 먹는다", tags: ["S"] },
    a2: { text: "많이 한 번에 먹는다", tags: ["N"] },
  },
  {
    id: 4,
    q: "식사를 할 때 반찬을 선택할 때",
    a1: { text: "익숙한 반찬이나 기본 반찬을 선택한다", tags: ["S"] },
    a2: { text: "새로운 반찬이나 특별한 반찬을 선택한다", tags: ["N"] },
  },
  {
    id: 5,
    q: "식사를 할 때 친구가 와서 '나도 같이 먹고 싶어!'라고 할 때",
    a1: { text: "즉시 함께 먹는다", tags: ["E"] },
    a2: { text: "혼자 조용히 먹는다", tags: ["I"] },
  },
  {
    id: 6,
    q: "친구가 '왜 밥을 먹어?'라고 물어볼 때",
    a1: { text: "감성과 의미를 위해 먹는다고 말한다", tags: ["F"] },
    a2: { text: "실용과 효율을 위해 먹는다고 말한다", tags: ["T"] },
  },
  {
    id: 7,
    q: "식사를 할 때 반찬을 접시에 배치할 때",
    a1: { text: "정돈되고 체계적으로 배치한다", tags: ["J"] },
    a2: { text: "자연스럽고 유연하게 배치한다", tags: ["P"] },
  },
  {
    id: 8,
    q: "식사를 마치고 나서 기분이 좋을 때",
    a1: { text: "즐거움과 기쁨을 느낀다", tags: ["E"] },
    a2: { text: "평온함과 차분함을 느낀다", tags: ["I"] },
  },
  {
    id: 9,
    q: "식사를 할 때 반찬을 선택할 때 기준을 정할 때",
    a1: { text: "실용성과 효율을 기준으로 선택한다", tags: ["S"] },
    a2: { text: "의미와 특별함을 기준으로 선택한다", tags: ["N"] },
  },
  {
    id: 10,
    q: "식사를 시작하기 전에 계획을 세울 때",
    a1: { text: "미리 계획하고 체계적으로 먹는다", tags: ["J"] },
    a2: { text: "그때그때 즉흥적으로 먹는다", tags: ["P"] },
  },
  {
    id: 11,
    q: "식사를 마치고 나서 친구에게 공유하고 싶을 때",
    a1: { text: "즉시 공유하고 이야기한다", tags: ["E"] },
    a2: { text: "조용히 혼자만 즐긴다", tags: ["I"] },
  },
  {
    id: 12,
    q: "식사를 할 때 반찬을 선택할 때 이유를 생각할 때",
    a1: { text: "의미와 특별함 때문에 선택한다", tags: ["N"] },
    a2: { text: "실용성과 효율 때문에 선택한다", tags: ["S"] },
  },
]

export default function RiceEatingTest() {
  const quizLogic = useQuizLogic({
    testId: "rice-eating",
    questions,
    resultPath: "/tests/rice-eating/test/result",
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
      colorClasses={getQuizColorScheme("yellow-amber")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}

