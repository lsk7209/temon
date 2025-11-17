"use client"

/**
 * Component: ShowerHabitTest
 * 샤워 습관 테스트 페이지
 * @example <ShowerHabitTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "샤워를 시작할 때 시간을 생각할 때",
    a1: { text: "빠르게 5-10분 효율적으로 한다", tags: ["J"] },
    a2: { text: "여유롭게 20-30분 힐링 타임으로 한다", tags: ["P"] },
  },
  {
    id: 2,
    q: "샤워할 때 순서를 정할 때",
    a1: { text: "항상 정해진 순서대로 한다", tags: ["J"] },
    a2: { text: "그때그때 달라진다", tags: ["P"] },
  },
  {
    id: 3,
    q: "샤워할 때 물 온도를 조절할 때",
    a1: { text: "따뜻한 물로 몸을 따뜻하게 한다", tags: ["F"] },
    a2: { text: "시원한 물로 상쾌하게 한다", tags: ["T"] },
  },
  {
    id: 4,
    q: "샤워 제품을 고를 때",
    a1: { text: "같은 제품을 고정해서 안정적으로 사용한다", tags: ["S"] },
    a2: { text: "새로운 제품을 시도해서 다양하게 사용한다", tags: ["N"] },
  },
  {
    id: 5,
    q: "샤워 중에 생각이 떠오를 때",
    a1: { text: "아무 생각 없이 편안하게 즐긴다", tags: ["S"] },
    a2: { text: "여러 생각과 아이디어가 떠오른다", tags: ["N"] },
  },
  {
    id: 6,
    q: "샤워를 마치고 나서 루틴을 정할 때",
    a1: { text: "정해진 루틴을 체계적으로 한다", tags: ["J"] },
    a2: { text: "그때그때 유연하게 한다", tags: ["P"] },
  },
  {
    id: 7,
    q: "샤워할 때 노래를 부를 때",
    a1: { text: "노래를 부르며 즐겁게 한다", tags: ["E"] },
    a2: { text: "조용히 혼자만의 시간을 즐긴다", tags: ["I"] },
  },
  {
    id: 8,
    q: "샤워 중에 물을 사용할 때",
    a1: { text: "물을 아끼며 효율적으로 사용한다", tags: ["T"] },
    a2: { text: "충분히 사용하며 편안하게 즐긴다", tags: ["F"] },
  },
  {
    id: 9,
    q: "샤워를 마치고 나서 느낄 때",
    a1: { text: "상쾌하고 에너지가 충만하다", tags: ["E"] },
    a2: { text: "편안하고 평온함을 느낀다", tags: ["I"] },
  },
  {
    id: 10,
    q: "샤워를 할 때 빈도를 생각할 때",
    a1: { text: "매일 정해진 시간에 한다", tags: ["J"] },
    a2: { text: "필요할 때 유연하게 한다", tags: ["P"] },
  },
  {
    id: 11,
    q: "샤워 중에 스트레스를 해소할 때",
    a1: { text: "샤워로 스트레스를 해소한다", tags: ["F"] },
    a2: { text: "샤워는 단순히 청결 목적이라고 생각한다", tags: ["T"] },
  },
  {
    id: 12,
    q: "샤워를 마치고 나서 준비할 때",
    a1: { text: "빠르게 준비하고 효율적으로 한다", tags: ["E"] },
    a2: { text: "여유롭게 준비하고 천천히 한다", tags: ["I"] },
  },
]

export default function ShowerHabitTest() {
  const quizLogic = useQuizLogic({
    testId: "shower-habit",
    questions,
    resultPath: "/tests/shower-habit/test/result",
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

