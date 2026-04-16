"use client"

/**
 * Component: ChickenVsJjimdakTest
 * 치킨 vs 찜닭 테스트 페이지
 * @example <ChickenVsJjimdakTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "배가 고파서 '찜닭'과 '치킨' 중 하나를 선택해야 할 때",
    a1: { text: "따뜻한 국물이 있는 찜닭을 선택한다", tags: ["F"] },
    a2: { text: "바삭한 맛의 치킨을 선택한다", tags: ["T"] },
  },
  {
    id: 2,
    q: "찜닭을 먹다가 국물이 너무 뜨거워서 입 안이 데일 것 같을 때",
    a1: { text: "국물을 불어가면서 천천히 마신다", tags: ["F"] },
    a2: { text: "치킨처럼 바삭한 부분만 먹는다", tags: ["T"] },
  },
  {
    id: 3,
    q: "힘든 하루를 보내고 위로가 필요할 때",
    a1: { text: "따뜻한 찜닭으로 위로받는다", tags: ["F"] },
    a2: { text: "바삭한 치킨으로 스트레스를 푼다", tags: ["T"] },
  },
  {
    id: 4,
    q: "찜닭이나 치킨을 먹을 때 함께 먹고 싶은 음식이 있을 때",
    a1: { text: "밥과 함께 따뜻하게 먹는다", tags: ["F"] },
    a2: { text: "맥주와 함께 상쾌하게 먹는다", tags: ["T"] },
  },
  {
    id: 5,
    q: "찜닭이나 치킨을 주문할 때 매운 정도를 선택할 때",
    a1: { text: "매운맛을 선택해서 자극을 받는다", tags: ["E"] },
    a2: { text: "순한맛을 선택해서 편안하게 먹는다", tags: ["I"] },
  },
  {
    id: 6,
    q: "찜닭을 먹다가 따뜻한 국물이 너무 좋아서 감동받을 때",
    a1: { text: "따뜻함과 위로를 느낀다", tags: ["F"] },
    a2: { text: "상쾌하고 즐거운 느낌을 받는다", tags: ["T"] },
  },
  {
    id: 7,
    q: "찜닭이나 치킨을 먹을 때 함께 먹고 싶은 사람이 있을 때",
    a1: { text: "혼자 조용히 먹는다", tags: ["I"] },
    a2: { text: "친구들과 함께 먹는다", tags: ["E"] },
  },
  {
    id: 8,
    q: "찜닭이나 치킨을 먹기 전에 계획을 세울 때",
    a1: { text: "미리 언제 어디서 먹을지 계획한다", tags: ["J"] },
    a2: { text: "그때그때 즉흥적으로 결정한다", tags: ["P"] },
  },
  {
    id: 9,
    q: "찜닭이나 치킨을 선택할 때 메뉴를 고를 때",
    a1: { text: "인기 메뉴나 트렌드를 따라 선택한다", tags: ["S"] },
    a2: { text: "나만의 특별한 취향으로 선택한다", tags: ["N"] },
  },
  {
    id: 10,
    q: "찜닭이나 치킨을 먹고 맛있어서 공유하고 싶을 때",
    a1: { text: "즉시 친구들에게 후기를 공유한다", tags: ["E"] },
    a2: { text: "조용히 혼자만의 맛집으로 간직한다", tags: ["I"] },
  },
  {
    id: 11,
    q: "찜닭이나 치킨을 선택할 때 선택하는 이유를 생각할 때",
    a1: { text: "감성적이고 위로받는 이유로 선택한다", tags: ["F"] },
    a2: { text: "효율적이고 실용적인 이유로 선택한다", tags: ["T"] },
  },
  {
    id: 12,
    q: "찜닭이나 치킨을 먹을 때 먹는 순서가 있을 때",
    a1: { text: "정해진 순서대로 체계적으로 먹는다", tags: ["J"] },
    a2: { text: "그때그때 편한 대로 먹는다", tags: ["P"] },
  },
]

export default function ChickenVsJjimdakTest() {
  const quizLogic = useQuizLogic({
    testId: "chicken-vs-jjimdak",
    questions,
    resultPath: "/tests/chicken-vs-jjimdak/test/result",
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
      colorClasses={getQuizColorScheme("orange-red")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
