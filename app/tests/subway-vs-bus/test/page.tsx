"use client"

/**
 * Component: SubwayVsBusTest
 * 지하철 vs 버스 테스트 페이지
 * @example <SubwayVsBusTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "출근길에 지하철과 버스 중 선택할 때",
    a1: { text: "지하철로 빠르고 정확하게 간다", tags: ["J"] },
    a2: { text: "버스로 유연하고 편하게 간다", tags: ["P"] },
  },
  {
    id: 2,
    q: "친구가 '왜 그걸 탔어?'라고 물어볼 때",
    a1: { text: "속도와 효율 때문에 탔다고 말한다", tags: ["T"] },
    a2: { text: "편의성과 감성 때문에 탔다고 말한다", tags: ["F"] },
  },
  {
    id: 3,
    q: "대중교통에 탈 때 승차 방식을 정할 때",
    a1: { text: "정해진 위치에서 체계적으로 탄다", tags: ["J"] },
    a2: { text: "그때그때 유연하게 탄다", tags: ["P"] },
  },
  {
    id: 4,
    q: "대중교통에 탈 때 좌석을 선택할 때",
    a1: { text: "창가의 조용한 곳을 선택한다", tags: ["I"] },
    a2: { text: "복도의 사람들과 함께 있는 곳을 선택한다", tags: ["E"] },
  },
  {
    id: 5,
    q: "대중교통을 타기 전에 계획을 세울 때",
    a1: { text: "미리 계획하고 목표를 정한다", tags: ["J"] },
    a2: { text: "즉흥적으로 그때그때 탄다", tags: ["P"] },
  },
  {
    id: 6,
    q: "대중교통에 타고 나서 확인할 때",
    a1: { text: "확인하고 꼼꼼하게 체크한다", tags: ["F"] },
    a2: { text: "그냥 가고 실용적으로 처리한다", tags: ["T"] },
  },
  {
    id: 7,
    q: "대중교통에 탈 때 친구가 와서 '나도 같이 타고 싶어!'라고 할 때",
    a1: { text: "즉시 함께 탄다", tags: ["E"] },
    a2: { text: "혼자 조용히 탄다", tags: ["I"] },
  },
  {
    id: 8,
    q: "대중교통을 선택할 때 이유를 생각할 때",
    a1: { text: "실용성과 효율 때문에 선택한다", tags: ["S"] },
    a2: { text: "의미와 특별함 때문에 선택한다", tags: ["N"] },
  },
  {
    id: 9,
    q: "대중교통을 타기 전에 계획을 세울 때",
    a1: { text: "미리 계획하고 목표를 정한다", tags: ["J"] },
    a2: { text: "즉흥적으로 그때그때 탄다", tags: ["P"] },
  },
  {
    id: 10,
    q: "대중교통에 타고 나서 기분이 좋을 때",
    a1: { text: "평온함과 차분함을 느낀다", tags: ["I"] },
    a2: { text: "즐거움과 기쁨을 느낀다", tags: ["E"] },
  },
  {
    id: 11,
    q: "대중교통을 선택할 때 이유를 생각할 때",
    a1: { text: "감성과 의미 때문에 선택한다", tags: ["F"] },
    a2: { text: "효율과 실용 때문에 선택한다", tags: ["T"] },
  },
  {
    id: 12,
    q: "대중교통에 타고 나서 친구에게 공유하고 싶을 때",
    a1: { text: "즉시 공유하고 경험을 나눈다", tags: ["E"] },
    a2: { text: "조용히 혼자만 즐긴다", tags: ["I"] },
  },
]

export default function SubwayVsBusTest() {
  const quizLogic = useQuizLogic({
    testId: "subway-vs-bus",
    questions,
    resultPath: "/tests/subway-vs-bus/test/result",
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

