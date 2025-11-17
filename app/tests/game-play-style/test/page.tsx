"use client"

/**
 * Component: GamePlayStyleTest
 * 게임 플레이 스타일 테스트 페이지
 * @example <GamePlayStyleTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "새로운 게임을 선택할 때 친구가 '이 게임 인기 많아!'라고 추천할 때",
    a1: { text: "인기 게임이라서 트렌드를 따라 선택한다", tags: ["S"] },
    a2: { text: "나만의 취향에 맞는 특별한 게임을 선택한다", tags: ["N"] },
  },
  {
    id: 2,
    q: "게임을 시작하기 전에 전략을 세울 때",
    a1: { text: "전략적이고 계획적으로 플레이한다", tags: ["J"] },
    a2: { text: "즉흥적이고 그때그때 플레이한다", tags: ["P"] },
  },
  {
    id: 3,
    q: "친구가 '왜 게임을 해?'라고 물어볼 때",
    a1: { text: "승리하고 실력을 향상시키기 위해 한다고 말한다", tags: ["T"] },
    a2: { text: "즐거움과 힐링을 위해 한다고 말한다", tags: ["F"] },
  },
  {
    id: 4,
    q: "게임을 할 시간을 정할 때",
    a1: { text: "계획적으로 시간을 정해서 플레이한다", tags: ["J"] },
    a2: { text: "그때그때 유연하게 플레이한다", tags: ["P"] },
  },
  {
    id: 5,
    q: "게임을 할 때 친구가 와서 '나도 같이 하고 싶어!'라고 할 때",
    a1: { text: "혼자 조용히 플레이한다", tags: ["I"] },
    a2: { text: "사람들과 함께 플레이한다", tags: ["E"] },
  },
  {
    id: 6,
    q: "게임을 끝내고 나서 정말 재미있었을 때",
    a1: { text: "즉시 후기를 공유하고 경험을 나눈다", tags: ["E"] },
    a2: { text: "조용히 혼자만 즐긴다", tags: ["I"] },
  },
  {
    id: 7,
    q: "게임을 선택할 때 장르를 고를 때",
    a1: { text: "항상 같은 장르를 선택한다", tags: ["S"] },
    a2: { text: "다양한 장르를 시도해본다", tags: ["N"] },
  },
  {
    id: 8,
    q: "게임 난이도를 선택할 때",
    a1: { text: "쉬운 난이도를 선택해서 편안하게 플레이한다", tags: ["F"] },
    a2: { text: "어려운 난이도를 선택해서 도전한다", tags: ["T"] },
  },
  {
    id: 9,
    q: "게임을 플레이하기 전에 계획을 세울 때",
    a1: { text: "미리 계획하고 목표를 정한다", tags: ["J"] },
    a2: { text: "즉흥적으로 그때그때 플레이한다", tags: ["P"] },
  },
  {
    id: 10,
    q: "게임을 선택할 때 선택하는 이유를 생각할 때",
    a1: { text: "인기와 트렌드 때문에 선택한다", tags: ["S"] },
    a2: { text: "특별함과 의미 때문에 선택한다", tags: ["N"] },
  },
  {
    id: 11,
    q: "게임을 플레이하고 있을 때 기분이 좋을 때",
    a1: { text: "즐거움과 재미를 느낀다", tags: ["E"] },
    a2: { text: "평온함과 집중을 느낀다", tags: ["I"] },
  },
  {
    id: 12,
    q: "게임에서 실패했을 때",
    a1: { text: "다시 도전해서 실력을 향상시킨다", tags: ["T"] },
    a2: { text: "즐거움을 중시해서 부담 없이 플레이한다", tags: ["F"] },
  },
]

export default function GamePlayStyleTest() {
  const quizLogic = useQuizLogic({
    testId: "game-play-style",
    questions,
    resultPath: "/tests/game-play-style/test/result",
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
      colorClasses={getQuizColorScheme("purple-indigo")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
