"use client"

/**
 * Component: BathroomHabitTest
 * 화장실 습관 테스트 페이지
 * @example <BathroomHabitTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "화장실에서 핸드폰을 떨어뜨렸을 때",
    a1: { text: "당황해서 바로 주워서 확인한다", tags: ["E", "P"] },
    a2: { text: "침착하게 상황을 파악하고 처리한다", tags: ["I", "J"] },
  },
  {
    id: 2,
    q: "화장실 휴지가 다 떨어졌을 때",
    a1: { text: "당황해서 주변을 둘러본다", tags: ["E", "P"] },
    a2: { text: "침착하게 대안을 찾는다", tags: ["I", "J"] },
  },
  {
    id: 3,
    q: "화장실 문이 잠겨있는데 급할 때",
    a1: { text: "문을 두드리거나 소리를 낸다", tags: ["E", "F"] },
    a2: { text: "조용히 기다리거나 다른 곳을 찾는다", tags: ["I", "T"] },
  },
  {
    id: 4,
    q: "화장실에서 이상한 소리가 들릴 때",
    a1: { text: "궁금해서 무슨 일인지 확인한다", tags: ["E", "N"] },
    a2: { text: "무시하고 빨리 나간다", tags: ["I", "S"] },
  },
  {
    id: 5,
    q: "화장실에서 옆 칸 사람이 이상한 소리를 낼 때",
    a1: { text: "웃음이 나오거나 반응한다", tags: ["E", "F"] },
    a2: { text: "무시하고 집중한다", tags: ["I", "T"] },
  },
  {
    id: 6,
    q: "화장실에서 핸드폰 알림이 울렸을 때",
    a1: { text: "바로 확인하고 답장한다", tags: ["E", "P"] },
    a2: { text: "나중에 확인한다", tags: ["I", "J"] },
  },
  {
    id: 7,
    q: "화장실에서 거울을 보다가 시간 가는 줄 모를 때",
    a1: { text: "계속 보고 있다가 깨닫는다", tags: ["E", "P"] },
    a2: { text: "시간을 체크하며 빠르게 한다", tags: ["I", "J"] },
  },
  {
    id: 8,
    q: "화장실에서 손을 씻다가 물이 튈 때",
    a1: { text: "신경 쓰지 않고 그냥 간다", tags: ["P", "N"] },
    a2: { text: "다시 씻거나 닦는다", tags: ["J", "S"] },
  },
  {
    id: 9,
    q: "화장실에서 친구가 문 밖에서 기다리고 있을 때",
    a1: { text: "빨리 나가려고 서두른다", tags: ["E", "F"] },
    a2: { text: "여유롭게 마무리한다", tags: ["I", "T"] },
  },
  {
    id: 10,
    q: "화장실에서 냄새가 이상할 때",
    a1: { text: "궁금해서 원인을 찾아본다", tags: ["E", "N"] },
    a2: { text: "빨리 나간다", tags: ["I", "S"] },
  },
  {
    id: 11,
    q: "화장실에서 물이 안 나올 때",
    a1: { text: "당황해서 여러 번 시도한다", tags: ["E", "P"] },
    a2: { text: "침착하게 다른 방법을 찾는다", tags: ["I", "J"] },
  },
  {
    id: 12,
    q: "화장실에서 실수로 문을 안 잠갔을 때",
    a1: { text: "당황해서 바로 잠근다", tags: ["E", "F"] },
    a2: { text: "침착하게 잠그고 계속한다", tags: ["I", "T"] },
  },
]

export default function BathroomHabitTest() {
  const quizLogic = useQuizLogic({
    testId: "bathroom-habit",
    questions,
    resultPath: "/tests/bathroom-habit/test/result",
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
      colorClasses={getQuizColorScheme("cyan-blue")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
