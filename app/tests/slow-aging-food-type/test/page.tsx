"use client"

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  { id: 1, q: "🥗 저속노화 식습관 성향 테스트에서 나는", a1: { text: "계획과 기준을 먼저 세운다", tags: ["I", "J"] }, a2: { text: "일단 실행 후 조정한다", tags: ["E", "P"] } },
  { id: 2, q: "새로운 선택지를 보면", a1: { text: "검증된 방법 우선", tags: ["S", "T"] }, a2: { text: "새로운 가능성 우선", tags: ["N", "F"] } },
  { id: 3, q: "문제 상황에서는", a1: { text: "원인 분석 후 해결", tags: ["T", "J"] }, a2: { text: "유연한 대안 즉시 시도", tags: ["F", "P"] } },
  { id: 4, q: "피드백을 받을 때", a1: { text: "데이터 중심 해석", tags: ["T", "S"] }, a2: { text: "사용자 맥락 중심 해석", tags: ["F", "N"] } },
  { id: 5, q: "시간이 부족하면", a1: { text: "핵심 우선순위로 압축", tags: ["I", "J"] }, a2: { text: "속도감 있게 완료", tags: ["E", "P"] } },
  { id: 6, q: "협업할 때", a1: { text: "역할/일정을 명확히", tags: ["J", "T"] }, a2: { text: "상황 맞춰 유연 조율", tags: ["P", "F"] } },
  { id: 7, q: "반복 작업은", a1: { text: "표준화해 효율화", tags: ["S", "J"] }, a2: { text: "상황마다 다르게", tags: ["N", "P"] } },
  { id: 8, q: "아이디어를 고를 때", a1: { text: "현실성/실행성 우선", tags: ["S", "T"] }, a2: { text: "확장성/새로움 우선", tags: ["N", "F"] } },
  { id: 9, q: "커뮤니케이션은", a1: { text: "핵심만 간결하게", tags: ["I", "T"] }, a2: { text: "맥락을 충분히 설명", tags: ["E", "F"] } },
  { id: 10, q: "준비 단계에서는", a1: { text: "체크리스트 작성", tags: ["J", "S"] }, a2: { text: "핵심만 잡고 출발", tags: ["P", "N"] } },
  { id: 11, q: "최종 검수 시", a1: { text: "기준표로 꼼꼼히", tags: ["I", "J"] }, a2: { text: "전체 흐름으로 최종", tags: ["E", "P"] } },
  { id: 12, q: "다음 사이클은", a1: { text: "회고 문서로 정리", tags: ["I", "J"] }, a2: { text: "바로 다음 실험", tags: ["E", "P"] } },
]

export default function TestPage() {
  const quizLogic = useQuizLogic({ testId: "slow-aging-food-type", questions, resultPath: "/tests/slow-aging-food-type/test/result" })
  return <QuizContainer {...{ currentQuestion: quizLogic.currentQuestion, currentQ: quizLogic.currentQ, selectedChoice: quizLogic.selectedChoice, isProcessing: quizLogic.isProcessing, isSaving: quizLogic.isSaving, progress: quizLogic.progress, questionsLength: quizLogic.questionsLength, colorClasses: getQuizColorScheme("green"), onChoiceSelect: quizLogic.handleChoiceSelect, onPrevious: quizLogic.handlePrevious }} />
}
