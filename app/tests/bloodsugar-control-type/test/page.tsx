"use client"

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  { id: 1, q: "📉 혈당 관리 스타일 테스트 상황에서 나는", a1: { text: "먼저 계획과 기준을 세운다", tags: ["I", "J"] }, a2: { text: "빠르게 실행하며 조정한다", tags: ["E", "P"] } },
  { id: 2, q: "새로운 선택지를 만나면", a1: { text: "검증된 방법을 우선", tags: ["S", "T"] }, a2: { text: "새로운 가능성을 탐색", tags: ["N", "F"] } },
  { id: 3, q: "협업 상황에서", a1: { text: "역할 분담을 명확히 한다", tags: ["J", "T"] }, a2: { text: "유연하게 같이 맞춰간다", tags: ["P", "F"] } },
  { id: 4, q: "문제가 생기면", a1: { text: "원인을 분석해 해결한다", tags: ["T", "S"] }, a2: { text: "감각적으로 대안을 찾는다", tags: ["F", "N"] } },
  { id: 5, q: "시간이 부족할 때", a1: { text: "핵심 우선순위를 정한다", tags: ["I", "J"] }, a2: { text: "속도감 있게 밀어붙인다", tags: ["E", "P"] } },
  { id: 6, q: "결과를 평가할 때", a1: { text: "숫자/근거로 판단한다", tags: ["T", "J"] }, a2: { text: "느낌/반응으로 판단한다", tags: ["F", "P"] } },
  { id: 7, q: "반복 작업은", a1: { text: "표준화해 효율화한다", tags: ["S", "J"] }, a2: { text: "상황마다 다르게 한다", tags: ["N", "P"] } },
  { id: 8, q: "아이디어를 고를 때", a1: { text: "현실 가능성을 본다", tags: ["S", "T"] }, a2: { text: "확장 가능성을 본다", tags: ["N", "F"] } },
  { id: 9, q: "커뮤니케이션은", a1: { text: "핵심만 간결하게", tags: ["T", "I"] }, a2: { text: "맥락을 충분히 공유", tags: ["F", "E"] } },
  { id: 10, q: "준비 단계에서는", a1: { text: "체크리스트를 만든다", tags: ["J", "S"] }, a2: { text: "핵심만 잡고 시작", tags: ["P", "N"] } },
  { id: 11, q: "피드백을 받으면", a1: { text: "즉시 반영 계획 수립", tags: ["J", "T"] }, a2: { text: "실험적으로 여러 시도", tags: ["P", "F"] } },
  { id: 12, q: "마무리 직전", a1: { text: "꼼꼼히 검수 후 제출", tags: ["I", "J"] }, a2: { text: "감각으로 최종 조정", tags: ["E", "P"] } },
]

export default function TestPage() {
  const quizLogic = useQuizLogic({ testId: "bloodsugar-control-type", questions, resultPath: "/tests/bloodsugar-control-type/test/result" })
  return <QuizContainer {...{ currentQuestion: quizLogic.currentQuestion, currentQ: quizLogic.currentQ, selectedChoice: quizLogic.selectedChoice, isProcessing: quizLogic.isProcessing, isSaving: quizLogic.isSaving, progress: quizLogic.progress, questionsLength: quizLogic.questionsLength, colorClasses: getQuizColorScheme("red"), onChoiceSelect: quizLogic.handleChoiceSelect, onPrevious: quizLogic.handlePrevious }} />
}
