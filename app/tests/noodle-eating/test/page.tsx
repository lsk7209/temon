"use client"

/**
 * Component: NoodleEatingTest
 * 면 요리 먹기 테스트 페이지
 * @example <NoodleEatingTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "면 요리를 먹을 때 먹는 속도를 정할 때",
    a1: { text: "천천히 꼼꼼하게 먹는다", tags: ["F"] },
    a2: { text: "빠르고 효율적으로 먹는다", tags: ["T"] },
  },
  {
    id: 2,
    q: "면 요리를 먹을 때 먹는 방식을 정할 때",
    a1: { text: "꼼꼼하고 체계적으로 먹는다", tags: ["J"] },
    a2: { text: "자연스럽고 유연하게 먹는다", tags: ["P"] },
  },
  {
    id: 3,
    q: "면 요리를 먹을 때 먹는 양을 정할 때",
    a1: { text: "조금씩 꾸준히 먹는다", tags: ["S"] },
    a2: { text: "많이 한 번에 먹는다", tags: ["N"] },
  },
  {
    id: 4,
    q: "면 요리를 먹을 때 먹는 타이밍을 정할 때",
    a1: { text: "처음부터 계획적으로 먹는다", tags: ["J"] },
    a2: { text: "그때그때 즉흥적으로 먹는다", tags: ["P"] },
  },
  {
    id: 5,
    q: "면 요리를 먹을 때 도구를 선택할 때",
    a1: { text: "젓가락으로 전통적으로 먹는다", tags: ["S"] },
    a2: { text: "숟가락으로 실용적으로 먹는다", tags: ["N"] },
  },
  {
    id: 6,
    q: "친구가 '왜 면을 먹어?'라고 물어볼 때",
    a1: { text: "감성과 의미를 위해 먹는다고 말한다", tags: ["F"] },
    a2: { text: "실용과 효율을 위해 먹는다고 말한다", tags: ["T"] },
  },
  {
    id: 7,
    q: "면 요리를 먹을 때 친구가 와서 '나도 같이 먹고 싶어!'라고 할 때",
    a1: { text: "즉시 함께 먹는다", tags: ["E"] },
    a2: { text: "혼자 조용히 먹는다", tags: ["I"] },
  },
  {
    id: 8,
    q: "면 요리를 먹고 나서 기분이 좋을 때",
    a1: { text: "즐거움과 기쁨을 느낀다", tags: ["E"] },
    a2: { text: "평온함과 차분함을 느낀다", tags: ["I"] },
  },
  {
    id: 9,
    q: "면 요리를 주문할 때 면 종류를 선택할 때",
    a1: { text: "익숙한 면이나 기본 면을 선택한다", tags: ["S"] },
    a2: { text: "새로운 면이나 특별한 면을 선택한다", tags: ["N"] },
  },
  {
    id: 10,
    q: "면 요리를 먹기 전에 계획을 세울 때",
    a1: { text: "미리 계획하고 체계적으로 먹는다", tags: ["J"] },
    a2: { text: "그때그때 즉흥적으로 먹는다", tags: ["P"] },
  },
  {
    id: 11,
    q: "면 요리를 먹고 나서 친구에게 공유하고 싶을 때",
    a1: { text: "즉시 공유하고 이야기한다", tags: ["E"] },
    a2: { text: "조용히 혼자만 즐긴다", tags: ["I"] },
  },
  {
    id: 12,
    q: "면 요리를 선택할 때 이유를 생각할 때",
    a1: { text: "의미와 특별함 때문에 선택한다", tags: ["N"] },
    a2: { text: "실용성과 효율 때문에 선택한다", tags: ["S"] },
  },
]

export default function NoodleEatingTest() {
  const quizLogic = useQuizLogic({
    testId: "noodle-eating",
    questions,
    resultPath: "/tests/noodle-eating/test/result",
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
      colorClasses={getQuizColorScheme("red-pink")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
