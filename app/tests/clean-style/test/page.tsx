"use client"

/**
 * Component: CleanStyleTest
 * 청소 스타일 테스트 페이지
 * @example <CleanStyleTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "청소 시작 전 마음가짐은?",
    a1: { text: "계획부터 세운다", tags: ["J"] },
    a2: { text: "일단 손부터 움직인다", tags: ["P"] },
  },
  {
    id: 2,
    q: "책상 위 먼지를 보면?",
    a1: { text: "당장 닦는다", tags: ["S"] },
    a2: { text: "'나중에 해야지' 하고 넘긴다", tags: ["N"] },
  },
  {
    id: 3,
    q: "청소할 때 음악은?",
    a1: { text: "없으면 안 된다", tags: ["E"] },
    a2: { text: "조용히 집중한다", tags: ["I"] },
  },
  {
    id: 4,
    q: "버릴까 말까 고민될 때",
    a1: { text: "과감히 버림", tags: ["T"] },
    a2: { text: "추억 생각나서 보관", tags: ["F"] },
  },
  {
    id: 5,
    q: "방 구조가 바뀌면?",
    a1: { text: "새로 배치 시도!", tags: ["N"] },
    a2: { text: "원래대로가 편함", tags: ["S"] },
  },
  {
    id: 6,
    q: "먼지 청소 중 예상보다 많을 때",
    a1: { text: "현실 직시 후 다시 계획", tags: ["J"] },
    a2: { text: "그냥 대충 끝냄", tags: ["P"] },
  },
  {
    id: 7,
    q: "정리할 때 기준은?",
    a1: { text: "필요/불필요", tags: ["T"] },
    a2: { text: "예쁨/감성", tags: ["F"] },
  },
  {
    id: 8,
    q: "청소 중 연락 오면?",
    a1: { text: '"청소 끝나고 보자!"', tags: ["I"] },
    a2: { text: "통화하며 청소", tags: ["E"] },
  },
  {
    id: 9,
    q: "대청소 빈도는?",
    a1: { text: "주기적으로 함", tags: ["J"] },
    a2: { text: "스트레스 쌓일 때만 함", tags: ["P"] },
  },
  {
    id: 10,
    q: "청소 도구 구매 시",
    a1: { text: "기능/가격 비교", tags: ["T"] },
    a2: { text: "색감·디자인 중심", tags: ["F"] },
  },
  {
    id: 11,
    q: "갑자기 친구가 놀러 온다 하면?",
    a1: { text: "바로 청소 모드 ON", tags: ["J"] },
    a2: { text: "일단 문 닫고 수습", tags: ["P"] },
  },
  {
    id: 12,
    q: "청소 끝난 후 기분은?",
    a1: { text: "성취감 최고!", tags: ["S"] },
    a2: { text: "나름 감성 충전됨", tags: ["N"] },
  },
]

export default function CleanStyleTest() {
  const quizLogic = useQuizLogic({
    testId: "clean-style",
    questions,
    resultPath: "/tests/clean-style/test/result",
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
