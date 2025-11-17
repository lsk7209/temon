"use client"

/**
 * Component: CookingShareTest
 * 요리 공유 테스트 페이지
 * @example <CookingShareTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "맛있는 요리를 만들었을 때",
    a1: { text: "즉시 사진을 찍어 SNS에 올린다", tags: ["E", "P"] },
    a2: { text: "먼저 맛을 보고 나중에 공유한다", tags: ["I", "J"] },
  },
  {
    id: 2,
    q: "요리 레시피를 공유할 때",
    a1: { text: "친구들에게 직접 설명하고 알려준다", tags: ["E", "F"] },
    a2: { text: "레시피를 정리해서 메시지로 보낸다", tags: ["I", "T"] },
  },
  {
    id: 3,
    q: "요리를 함께 만들 때",
    a1: { text: "다른 사람과 함께 요리하는 게 즐겁다", tags: ["E", "F"] },
    a2: { text: "혼자 요리하는 게 편하다", tags: ["I", "T"] },
  },
  {
    id: 4,
    q: "요리 사진을 올릴 때",
    a1: { text: "즉흥적으로 찍어서 올린다", tags: ["P", "N"] },
    a2: { text: "각도와 조명을 신경 써서 올린다", tags: ["J", "S"] },
  },
  {
    id: 5,
    q: "요리를 선물할 때",
    a1: { text: "즉시 만들어서 전달한다", tags: ["E", "P"] },
    a2: { text: "계획을 세워서 특별한 날에 전달한다", tags: ["I", "J"] },
  },
  {
    id: 6,
    q: "요리 공유 방식",
    a1: { text: "새로운 플랫폼이나 방법을 시도한다", tags: ["N", "P"] },
    a2: { text: "익숙한 방법으로 꾸준히 공유한다", tags: ["S", "J"] },
  },
  {
    id: 7,
    q: "요리 피드백을 받을 때",
    a1: { text: "즉시 반영하고 개선한다", tags: ["E", "P"] },
    a2: { text: "신중하게 검토하고 적용한다", tags: ["I", "J"] },
  },
  {
    id: 8,
    q: "요리를 공유하는 이유",
    a1: { text: "다른 사람의 반응이 좋아서 기쁘다", tags: ["E", "F"] },
    a2: { text: "레시피를 기록하고 보관하기 위해", tags: ["I", "T"] },
  },
  {
    id: 9,
    q: "요리 공유 준비",
    a1: { text: "미리 사진과 설명을 준비한다", tags: ["J", "S"] },
    a2: { text: "그때그때 즉흥적으로 공유한다", tags: ["P", "N"] },
  },
  {
    id: 10,
    q: "요리 공유 후",
    a1: { text: "댓글이나 반응을 확인하며 즐긴다", tags: ["E", "F"] },
    a2: { text: "공유만 하고 다른 일을 한다", tags: ["I", "T"] },
  },
  {
    id: 11,
    q: "요리를 공유하지 않을 때",
    a1: { text: "특별한 요리만 선별해서 공유한다", tags: ["J", "T"] },
    a2: { text: "모든 요리를 공유하고 싶다", tags: ["P", "F"] },
  },
  {
    id: 12,
    q: "요리 공유 스타일",
    a1: { text: "계획적이고 체계적으로 공유한다", tags: ["J", "T"] },
    a2: { text: "즉흥적이고 감성적으로 공유한다", tags: ["P", "F"] },
  },
]

export default function CookingShareTest() {
  const quizLogic = useQuizLogic({
    testId: "cooking-share",
    questions,
    resultPath: "/tests/cooking-share/test/result",
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
      colorClasses={getQuizColorScheme("cyan-blue-indigo")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
