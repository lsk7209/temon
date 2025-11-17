"use client"

/**
 * Component: PhonePhotoTest
 * 폰 사진 습관 테스트 페이지
 * @example <PhonePhotoTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "카페에서 예쁜 음료를 받았을 때",
    a1: { text: "즉시 사진을 찍는다", tags: ["E", "J"] },
    a2: { text: "먹다가 나중에 찍는다", tags: ["I", "P"] },
  },
  {
    id: 2,
    q: "여행지에서 사진을 찍을 때",
    a1: { text: "계획한 장소만 찍는다", tags: ["J", "T"] },
    a2: { text: "보이는 대로 찍는다", tags: ["P", "F"] },
  },
  {
    id: 3,
    q: "맛집에서 음식을 받았을 때",
    a1: { text: "혼자 조용히 찍는다", tags: ["I", "S"] },
    a2: { text: "친구들과 함께 찍는다", tags: ["E", "N"] },
  },
  {
    id: 4,
    q: "일출을 보러 갔을 때",
    a1: { text: "정해진 시간에 찍는다", tags: ["J", "S"] },
    a2: { text: "보이는 대로 찍는다", tags: ["P", "N"] },
  },
  {
    id: 5,
    q: "SNS에 올릴 사진을 고를 때",
    a1: { text: "목표에 맞게 선택한다", tags: ["T", "J"] },
    a2: { text: "기분에 맞게 선택한다", tags: ["F", "P"] },
  },
  {
    id: 6,
    q: "친구들과 단체 사진을 찍을 때",
    a1: { text: "효율적으로 빠르게 찍는다", tags: ["T", "J"] },
    a2: { text: "재미있게 여러 장 찍는다", tags: ["F", "P"] },
  },
  {
    id: 7,
    q: "사진 찍을 곳이 많을 때",
    a1: { text: "체계적으로 순서대로 찍는다", tags: ["J", "T"] },
    a2: { text: "하나씩 재미있게 찍는다", tags: ["P", "F"] },
  },
  {
    id: 8,
    q: "새로운 필터를 발견했을 때",
    a1: { text: "리뷰를 보고 신중하게 선택한다", tags: ["S", "I"] },
    a2: { text: "바로 시도해본다", tags: ["N", "E"] },
  },
  {
    id: 9,
    q: "같은 장소를 여러 번 찍을 때",
    a1: { text: "정해진 각도만 찍는다", tags: ["J", "T"] },
    a2: { text: "기분에 따라 각도가 달라진다", tags: ["P", "F"] },
  },
  {
    id: 10,
    q: "사진을 찍은 후",
    a1: { text: "즉시 다음 장소로 이동한다", tags: ["E", "J"] },
    a2: { text: "잠시 더 구경한다", tags: ["I", "P"] },
  },
  {
    id: 11,
    q: "사진 촬영을 마무리할 때",
    a1: { text: "정해진 시간에 끝낸다", tags: ["J", "T"] },
    a2: { text: "만족할 때까지 찍는다", tags: ["P", "F"] },
  },
  {
    id: 12,
    q: "사진을 찍기 좋은 장소를 찾을 때",
    a1: { text: "조용하고 한적한 곳", tags: ["I", "S"] },
    a2: { text: "활기차고 사람 많은 곳", tags: ["E", "N"] },
  },
]

export default function PhonePhotoTest() {
  const quizLogic = useQuizLogic({
    testId: "phone-photo",
    questions,
    resultPath: "/tests/phone-photo/test/result",
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
      colorClasses={getQuizColorScheme("blue-purple")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}

