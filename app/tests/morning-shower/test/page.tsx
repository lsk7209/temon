"use client"

/**
 * Component: MorningShowerTest
 * 아침 샤워 테스트 페이지
 * @example <MorningShowerTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "아침에 샤워할 때",
    a1: { text: "빠르게 5-10분 효율적으로 한다", tags: ["J", "T"] },
    a2: { text: "여유롭게 20-30분 힐링 타임으로 한다", tags: ["P", "F"] },
  },
  {
    id: 2,
    q: "샤워 중에 생각이 떠올랐을 때",
    a1: { text: "아무 생각 없이 편안하게 즐긴다", tags: ["S", "I"] },
    a2: { text: "여러 생각과 아이디어가 떠오른다", tags: ["N", "E"] },
  },
  {
    id: 3,
    q: "샤워 제품을 고를 때",
    a1: { text: "같은 제품을 고정해서 안정적으로 사용한다", tags: ["S", "J"] },
    a2: { text: "새로운 제품을 시도해서 다양하게 사용한다", tags: ["N", "P"] },
  },
  {
    id: 4,
    q: "샤워할 때 물 온도를 조절할 때",
    a1: { text: "따뜻한 물로 몸을 따뜻하게 한다", tags: ["F"] },
    a2: { text: "시원한 물로 상쾌하게 한다", tags: ["T"] },
  },
  {
    id: 5,
    q: "샤워를 마치고 나서 루틴을 정할 때",
    a1: { text: "정해진 루틴을 체계적으로 한다", tags: ["J", "S"] },
    a2: { text: "그때그때 유연하게 한다", tags: ["P", "N"] },
  },
  {
    id: 6,
    q: "샤워 시간을 정할 때",
    a1: { text: "정해진 시간에 규칙적으로 한다", tags: ["J", "S"] },
    a2: { text: "그때그때 기분에 따라 다르게 한다", tags: ["P", "N"] },
  },
  {
    id: 7,
    q: "샤워 중에 노래를 부를 때",
    a1: { text: "노래를 부르며 즐겁게 한다", tags: ["E", "F"] },
    a2: { text: "조용히 혼자만의 시간을 즐긴다", tags: ["I", "T"] },
  },
  {
    id: 8,
    q: "샤워 중에 물을 사용할 때",
    a1: { text: "물을 아끼며 효율적으로 사용한다", tags: ["T", "J"] },
    a2: { text: "충분히 사용하며 편안하게 즐긴다", tags: ["F", "P"] },
  },
  {
    id: 9,
    q: "샤워를 마치고 나서 느낄 때",
    a1: { text: "상쾌하고 에너지가 충만하다", tags: ["E", "T"] },
    a2: { text: "편안하고 평온함을 느낀다", tags: ["I", "F"] },
  },
  {
    id: 10,
    q: "샤워를 할 때 빈도를 생각할 때",
    a1: { text: "매일 정해진 시간에 한다", tags: ["J", "S"] },
    a2: { text: "필요할 때 유연하게 한다", tags: ["P", "N"] },
  },
  {
    id: 11,
    q: "샤워 중에 스트레스를 해소할 때",
    a1: { text: "샤워로 스트레스를 해소한다", tags: ["F", "E"] },
    a2: { text: "샤워는 단순히 청결 목적이라고 생각한다", tags: ["T", "I"] },
  },
  {
    id: 12,
    q: "샤워를 마치고 나서 준비할 때",
    a1: { text: "빠르게 준비하고 효율적으로 한다", tags: ["E", "J"] },
    a2: { text: "여유롭게 준비하고 천천히 한다", tags: ["I", "P"] },
  },
]

export default function MorningShowerTest() {
  const quizLogic = useQuizLogic({
    testId: "morning-shower",
    questions,
    resultPath: "/tests/morning-shower/test/result",
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
