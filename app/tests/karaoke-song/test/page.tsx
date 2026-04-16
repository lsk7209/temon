"use client"

/**
 * Component: KaraokeSongTest
 * 노래방 곡 테스트 페이지
 * @example <KaraokeSongTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "노래방에서 곡을 고를 때",
    a1: { text: "항상 같은 곡이나 단골 곡을 선택한다", tags: ["J"] },
    a2: { text: "그때그때 다른 곡을 다양하게 선택한다", tags: ["P"] },
  },
  {
    id: 2,
    q: "노래방에서 노래를 부를 때",
    a1: { text: "열정적으로 목소리를 크게 낸다", tags: ["E"] },
    a2: { text: "조용히 부드럽게 부른다", tags: ["I"] },
  },
  {
    id: 3,
    q: "노래방에 가기 전에 곡을 정할 때",
    a1: { text: "미리 정해두고 준비한다", tags: ["J"] },
    a2: { text: "그때그때 즉흥적으로 결정한다", tags: ["P"] },
  },
  {
    id: 4,
    q: "노래방에서 분위기가 시끄러울 때",
    a1: { text: "분위기를 띄우고 모두와 함께 즐긴다", tags: ["E"] },
    a2: { text: "조용히 혼자만의 시간을 즐긴다", tags: ["I"] },
  },
  {
    id: 5,
    q: "노래방에서 장르를 선택할 때",
    a1: { text: "항상 같은 장르를 안정적으로 선택한다", tags: ["S"] },
    a2: { text: "다양한 장르를 새로운 시도로 선택한다", tags: ["N"] },
  },
  {
    id: 6,
    q: "노래방에서 노래를 부르고 정말 재미있을 때",
    a1: { text: "즉시 후기를 공유하고 경험을 나눈다", tags: ["E"] },
    a2: { text: "조용히 혼자만의 추억으로 간직한다", tags: ["I"] },
  },
  {
    id: 7,
    q: "노래방에서 곡을 선택할 때",
    a1: { text: "인기곡이나 트렌드를 따라 선택한다", tags: ["S"] },
    a2: { text: "나만의 취향이나 특별한 곡을 선택한다", tags: ["N"] },
  },
  {
    id: 8,
    q: "노래방에서 노래를 부를 때",
    a1: { text: "감정을 표현해서 감성적으로 부른다", tags: ["F"] },
    a2: { text: "기술 중심으로 실력을 향상시킨다", tags: ["T"] },
  },
  {
    id: 9,
    q: "노래방에서 노래 순서를 정할 때",
    a1: { text: "미리 계획하고 순서를 정한다", tags: ["J"] },
    a2: { text: "즉흥적으로 그때그때 부른다", tags: ["P"] },
  },
  {
    id: 10,
    q: "노래방에서 노래를 부를 때",
    a1: { text: "사람들과 함께 분위기를 띄운다", tags: ["E"] },
    a2: { text: "혼자 조용히 부른다", tags: ["I"] },
  },
  {
    id: 11,
    q: "노래방에서 곡을 선택할 때 이유를 생각할 때",
    a1: { text: "기억에 남는 곡이나 추억 때문에 선택한다", tags: ["F"] },
    a2: { text: "실력 향상이나 도전 때문에 선택한다", tags: ["T"] },
  },
  {
    id: 12,
    q: "노래방에서 노래를 부르는 목적을 생각할 때",
    a1: { text: "즐거움과 힐링을 위해 부른다", tags: ["F"] },
    a2: { text: "실력 향상과 목표 달성을 위해 부른다", tags: ["T"] },
  },
]

export default function KaraokeSongTest() {
  const quizLogic = useQuizLogic({
    testId: "karaoke-song",
    questions,
    resultPath: "/tests/karaoke-song/test/result",
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
