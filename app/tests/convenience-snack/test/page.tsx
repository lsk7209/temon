"use client"

/**
 * Component: ConvenienceSnackTest
 * 편의점 간식 테스트 페이지
 * @example <ConvenienceSnackTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "편의점에 갈 때 가장 큰 이유를 생각할 때",
    a1: { text: "필요한 것만 빠르게 사기 위해서 간다", tags: ["S", "T"] },
    a2: { text: "새로운 조합을 찾고 기분 전환을 위해서 간다", tags: ["N", "F"] },
  },
  {
    id: 2,
    q: "편의점에서 신상품을 봤을 때",
    a1: { text: "후기와 행사 여부를 보고 결정한다", tags: ["S", "J"] },
    a2: { text: "바로 한 번 시도해본다", tags: ["N", "P"] },
  },
  {
    id: 3,
    q: "편의점에 둘이 갈 때 메뉴를 고를 때",
    a1: { text: "상대 취향을 묻고 투표로 정한다", tags: ["E", "J"] },
    a2: { text: "조용히 추천 몇 개만 던진다", tags: ["I", "P"] },
  },
  {
    id: 4,
    q: "편의점에서 1+1이나 2+1 행사를 만났을 때",
    a1: { text: "실속과 단가를 계산한 후 선택한다", tags: ["T", "J"] },
    a2: { text: "오늘 즐거우면 충분하다고 생각한다", tags: ["F", "P"] },
  },
  {
    id: 5,
    q: "편의점에서 대표 간식 루틴을 정할 때",
    a1: { text: "늘 먹던 빵이나 우유 등 고정 메뉴를 선택한다", tags: ["S", "I"] },
    a2: { text: "상황에 따라 즉흥적으로 조합한다", tags: ["N", "E"] },
  },
  {
    id: 6,
    q: "편의점에서 전자레인지나 핫바를 고를 때",
    a1: { text: "성분, 중량, 가격 등을 먼저 본다", tags: ["S", "T"] },
    a2: { text: "향과 식감을 상상하고 그때의 욕구를 따른다", tags: ["N", "F"] },
  },
  {
    id: 7,
    q: "편의점에서 음료를 선택할 때",
    a1: { text: "기본 탄산이나 커피로 루틴을 유지한다", tags: ["S", "J"] },
    a2: { text: "이색 맛이나 한정 제품을 탐색한다", tags: ["N", "P"] },
  },
  {
    id: 8,
    q: "야식 시간에 편의점에 갈 때",
    a1: { text: "과하게 사지 않도록 리스트를 작성한다", tags: ["I", "J"] },
    a2: { text: "그때 그 분위기에 맞게 선택한다", tags: ["E", "P"] },
  },
  {
    id: 9,
    q: "편의점에서 품절을 마주했을 때",
    a1: { text: "대체 메뉴를 빠르게 찾는다", tags: ["T", "J"] },
    a2: { text: "기분이 식어서 다른 날 재도전한다", tags: ["F", "P"] },
  },
  {
    id: 10,
    q: "편의점에서 결제 직전에 점검할 때",
    a1: { text: "영수증, 포인트, 유통기한을 체크한다", tags: ["S", "J"] },
    a2: { text: "전체 조합 밸런스를 상상한다", tags: ["N", "F"] },
  },
  {
    id: 11,
    q: "편의점에 갈 때 혼자 vs 함께를 선택할 때",
    a1: { text: "혼자 빠르게 다녀온다", tags: ["I", "T"] },
    a2: { text: "같이 가서 고르는 재미를 즐긴다", tags: ["E", "F"] },
  },
  {
    id: 12,
    q: "편의점에서 재구매를 판단할 때",
    a1: { text: "가격 대비 만족도와 일관성을 기준으로 판단한다", tags: ["T", "S"] },
    a2: { text: "그날의 감정과 상황과의 궁합을 기준으로 판단한다", tags: ["F", "N"] },
  },
]

export default function ConvenienceSnackTest() {
  const quizLogic = useQuizLogic({
    testId: "convenience-snack",
    questions,
    resultPath: "/tests/convenience-snack/test/result",
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
      colorClasses={getQuizColorScheme("green-emerald")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}

