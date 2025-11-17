"use client"

/**
 * Component: SnackTimeTest
 * 간식 시간 테스트 페이지
 * @example <SnackTimeTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "간식을 먹을 때 시간대를 정할 때",
    a1: { text: "정해진 시간에 규칙적으로 먹는다", tags: ["J"] },
    a2: { text: "그때그때 유연하게 먹는다", tags: ["P"] },
  },
  {
    id: 2,
    q: "간식을 선택할 때 선택 방식을 정할 때",
    a1: { text: "미리 계획하고 체계적으로 선택한다", tags: ["J"] },
    a2: { text: "그때그때 즉흥적으로 선택한다", tags: ["P"] },
  },
  {
    id: 3,
    q: "간식을 먹을 때 먹는 양을 정할 때",
    a1: { text: "조금씩 꾸준히 먹는다", tags: ["S"] },
    a2: { text: "많이 한 번에 먹는다", tags: ["N"] },
  },
  {
    id: 4,
    q: "간식을 선택할 때 종류를 고를 때",
    a1: { text: "익숙한 간식이나 기본 간식을 선택한다", tags: ["S"] },
    a2: { text: "새로운 간식이나 특별한 간식을 선택한다", tags: ["N"] },
  },
  {
    id: 5,
    q: "간식을 먹을 때 친구가 와서 '나도 같이 먹고 싶어!'라고 할 때",
    a1: { text: "즉시 함께 먹는다", tags: ["E"] },
    a2: { text: "혼자 조용히 먹는다", tags: ["I"] },
  },
  {
    id: 6,
    q: "친구가 '왜 그 간식을 골랐어?'라고 물어볼 때",
    a1: { text: "맛과 감성 때문에 선택했다고 말한다", tags: ["F"] },
    a2: { text: "건강과 영양 때문에 선택했다고 말한다", tags: ["T"] },
  },
  {
    id: 7,
    q: "간식을 먹을 때 먹는 속도를 정할 때",
    a1: { text: "천천히 꼼꼼하게 먹는다", tags: ["F"] },
    a2: { text: "빠르고 효율적으로 먹는다", tags: ["T"] },
  },
  {
    id: 8,
    q: "간식을 준비할 때 준비 방식을 정할 때",
    a1: { text: "미리 준비하고 계획적으로 만든다", tags: ["J"] },
    a2: { text: "그때그때 즉흥적으로 만든다", tags: ["P"] },
  },
  {
    id: 9,
    q: "친구가 '왜 간식을 먹어?'라고 물어볼 때",
    a1: { text: "에너지 충전과 활기를 위해 먹는다고 말한다", tags: ["E"] },
    a2: { text: "평온함과 휴식을 위해 먹는다고 말한다", tags: ["I"] },
  },
  {
    id: 10,
    q: "간식을 선택할 때 기준을 정할 때",
    a1: { text: "실용성과 효율을 기준으로 선택한다", tags: ["S"] },
    a2: { text: "의미와 특별함을 기준으로 선택한다", tags: ["N"] },
  },
  {
    id: 11,
    q: "간식을 먹고 나서 기분이 좋을 때",
    a1: { text: "즐거움과 기쁨을 느낀다", tags: ["E"] },
    a2: { text: "평온함과 차분함을 느낀다", tags: ["I"] },
  },
  {
    id: 12,
    q: "간식을 선택할 때 이유를 생각할 때",
    a1: { text: "감성과 의미 때문에 선택한다", tags: ["F"] },
    a2: { text: "효율과 실용 때문에 선택한다", tags: ["T"] },
  },
]

export default function SnackTimeTest() {
  const quizLogic = useQuizLogic({
    testId: "snack-time",
    questions,
    resultPath: "/tests/snack-time/test/result",
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
      colorClasses={getQuizColorScheme("pink-rose")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}

