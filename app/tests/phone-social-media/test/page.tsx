"use client"

/**
 * Component: PhoneSocialMediaTest
 * 폰 소셜미디어 습관 테스트 페이지
 * @example <PhoneSocialMediaTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "인스타에 올릴 사진을 고를 때",
    a1: { text: "즉시 선택한다", tags: ["E", "J"] },
    a2: { text: "신중하게 선택한다", tags: ["I", "P"] },
  },
  {
    id: 2,
    q: "SNS 피드를 스크롤할 때",
    a1: { text: "빠르게 스크롤한다", tags: ["J", "T"] },
    a2: { text: "하나씩 자세히 본다", tags: ["P", "F"] },
  },
  {
    id: 3,
    q: "친구들과 SNS를 볼 때",
    a1: { text: "혼자 조용히 본다", tags: ["I", "S"] },
    a2: { text: "함께 이야기하며 본다", tags: ["E", "N"] },
  },
  {
    id: 4,
    q: "SNS를 확인하는 시간",
    a1: { text: "정해진 시간에 본다", tags: ["J", "S"] },
    a2: { text: "그때그때 본다", tags: ["P", "N"] },
  },
  {
    id: 5,
    q: "SNS 게시물을 올릴 때",
    a1: { text: "목표에 맞게 올린다", tags: ["T", "J"] },
    a2: { text: "기분에 맞게 올린다", tags: ["F", "P"] },
  },
  {
    id: 6,
    q: "좋아요를 누를 때",
    a1: { text: "효율적으로 빠르게 누른다", tags: ["T", "J"] },
    a2: { text: "재미있게 하나씩 누른다", tags: ["F", "P"] },
  },
  {
    id: 7,
    q: "댓글을 달 때",
    a1: { text: "체계적으로 짧게 답한다", tags: ["J", "T"] },
    a2: { text: "하나씩 재미있게 답한다", tags: ["P", "F"] },
  },
  {
    id: 8,
    q: "새로운 SNS 기능을 발견했을 때",
    a1: { text: "리뷰를 보고 신중하게 시도한다", tags: ["S", "I"] },
    a2: { text: "바로 시도해본다", tags: ["N", "E"] },
  },
  {
    id: 9,
    q: "SNS 사용 시간을 조절할 때",
    a1: { text: "정해진 시간만 사용한다", tags: ["J", "T"] },
    a2: { text: "기분에 따라 시간이 달라진다", tags: ["P", "F"] },
  },
  {
    id: 10,
    q: "SNS를 본 후",
    a1: { text: "즉시 할 일을 시작한다", tags: ["E", "J"] },
    a2: { text: "잠시 더 여유롭게 즐긴다", tags: ["I", "P"] },
  },
  {
    id: 11,
    q: "SNS 사용을 마무리할 때",
    a1: { text: "정해진 시간에 끝낸다", tags: ["J", "T"] },
    a2: { text: "만족할 때까지 본다", tags: ["P", "F"] },
  },
  {
    id: 12,
    q: "SNS를 사용하는 환경",
    a1: { text: "조용하고 집중할 수 있는 곳", tags: ["I", "S"] },
    a2: { text: "활기차고 사람들이 있는 곳", tags: ["E", "N"] },
  },
]

export default function PhoneSocialMediaTest() {
  const quizLogic = useQuizLogic({
    testId: "phone-social-media",
    questions,
    resultPath: "/tests/phone-social-media/test/result",
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


