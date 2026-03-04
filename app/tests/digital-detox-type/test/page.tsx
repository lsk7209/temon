"use client"

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  { id: 1, q: "아침에 눈 뜨자마자", a1: { text: "휴대폰부터 확인한다", tags: ["E", "P"] }, a2: { text: "루틴 후 확인한다", tags: ["I", "J"] } },
  { id: 2, q: "알림 설정은", a1: { text: "필요한 앱만 최소화한다", tags: ["J", "T"] }, a2: { text: "중요 알림은 다 켜둔다", tags: ["P", "F"] } },
  { id: 3, q: "집중할 때", a1: { text: "방해금지 모드를 켠다", tags: ["I", "S"] }, a2: { text: "필요 시만 수동 조절한다", tags: ["E", "N"] } },
  { id: 4, q: "스크린타임이 늘면", a1: { text: "원인을 기록하고 줄인다", tags: ["T", "J"] }, a2: { text: "기분 전환 후 다시 조절", tags: ["F", "P"] } },
  { id: 5, q: "잠들기 전", a1: { text: "디지털 기기 사용을 끊는다", tags: ["I", "J"] }, a2: { text: "짧게라도 콘텐츠를 본다", tags: ["E", "P"] } },
  { id: 6, q: "주말 디톡스 계획", a1: { text: "시간대를 정해 실천", tags: ["S", "J"] }, a2: { text: "그날 컨디션에 맞춘다", tags: ["N", "P"] } },
  { id: 7, q: "SNS 피드가 피곤하면", a1: { text: "팔로우 정리를 한다", tags: ["T", "S"] }, a2: { text: "잠시 앱을 쉬었다 온다", tags: ["F", "N"] } },
  { id: 8, q: "집중 음악/앱 사용", a1: { text: "정해둔 툴을 반복 사용", tags: ["I", "S"] }, a2: { text: "상황별로 바꿔 사용", tags: ["E", "N"] } },
  { id: 9, q: "업무 메시지 응답", a1: { text: "정해진 시간에 몰아서", tags: ["I", "J"] }, a2: { text: "보는 즉시 빠르게", tags: ["E", "P"] } },
  { id: 10, q: "디지털 휴식은", a1: { text: "산책/독서 같은 오프라인", tags: ["F", "N"] }, a2: { text: "가벼운 영상/게임", tags: ["T", "S"] } },
  { id: 11, q: "새 앱을 도입할 때", a1: { text: "효용을 비교 후 선택", tags: ["T", "J"] }, a2: { text: "일단 써보고 판단", tags: ["F", "P"] } },
  { id: 12, q: "디톡스 실패 후", a1: { text: "규칙을 다시 설계한다", tags: ["I", "J"] }, a2: { text: "부담 줄이고 재시작", tags: ["E", "P"] } },
]

export default function DigitalDetoxTypeTestPage() {
  const quizLogic = useQuizLogic({ testId: "digital-detox-type", questions, resultPath: "/tests/digital-detox-type/test/result" })
  return <QuizContainer {...{ currentQuestion: quizLogic.currentQuestion, currentQ: quizLogic.currentQ, selectedChoice: quizLogic.selectedChoice, isProcessing: quizLogic.isProcessing, isSaving: quizLogic.isSaving, progress: quizLogic.progress, questionsLength: quizLogic.questionsLength, colorClasses: getQuizColorScheme("green"), onChoiceSelect: quizLogic.handleChoiceSelect, onPrevious: quizLogic.handlePrevious }} />
}
