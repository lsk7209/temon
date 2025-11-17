"use client"

/**
 * Component: MovieTheaterStyleTest
 * 영화관 스타일 테스트 페이지
 * @example <MovieTheaterStyleTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "예매할 때 선호는?",
    a1: { text: "개봉 전 미리 예매", tags: ["J"] },
    a2: { text: "당일/즉흥 예매", tags: ["P"] },
  },
  {
    id: 2,
    q: "좌석을 고를 때?",
    a1: { text: "가운데·황금좌석 규칙대로", tags: ["S"] },
    a2: { text: "화면/사운드 감으로 선택", tags: ["N"] },
  },
  {
    id: 3,
    q: "동행과의 대화템?",
    a1: { text: "영화관람 전부터 떠들썩", tags: ["E"] },
    a2: { text: "상영 전 집중 모드", tags: ["I"] },
  },
  {
    id: 4,
    q: "팝콘 사이즈 논쟁!",
    a1: { text: "데이터: 가성비 계산 후 결정", tags: ["T"] },
    a2: { text: "취향: 맛/기분이 먼저", tags: ["F"] },
  },
  {
    id: 5,
    q: "트레일러(예고편) 시간은?",
    a1: { text: "제시간 맞춰 예고편 포함", tags: ["J"] },
    a2: { text: "시작 직전에 들어감", tags: ["P"] },
  },
  {
    id: 6,
    q: "신작 선택 기준은?",
    a1: { text: "평점/리뷰/수상 여부", tags: ["S"] },
    a2: { text: "감독·장르 실험/신선함", tags: ["N"] },
  },
  {
    id: 7,
    q: "단체 관람에서의 나는?",
    a1: { text: "모두가 즐길 무난작 추천", tags: ["E"] },
    a2: { text: "내가 보고 싶은 작품 우선", tags: ["I"] },
  },
  {
    id: 8,
    q: "스포일러를 만났다면?",
    a1: { text: "감정 배제, 정보로 정리", tags: ["T"] },
    a2: { text: "기분 상함, 몰입이 깨짐", tags: ["F"] },
  },
  {
    id: 9,
    q: "상영 중 관람 태도는?",
    a1: { text: "음료 소리·폰 밝기 철저 관리", tags: ["S"] },
    a2: { text: "감정이입 과다, 리액션 큼", tags: ["N"] },
  },
  {
    id: 10,
    q: "엔딩크레딧은?",
    a1: { text: "쿠키·크레딧 확인 후 퇴장", tags: ["J"] },
    a2: { text: "분위기 따라 바로 나감", tags: ["P"] },
  },
  {
    id: 11,
    q: "굿즈 구매 기준은?",
    a1: { text: "활용도·가격 먼저", tags: ["T"] },
    a2: { text: "디자인·영감·소장가치", tags: ["F"] },
  },
  {
    id: 12,
    q: "영화관 선택 기준은?",
    a1: { text: "접근성·좌석·음향 스펙", tags: ["S"] },
    a2: { text: "상영관 무드·브랜드 경험", tags: ["N"] },
  },
]

export default function MovieTheaterStyleTest() {
  const quizLogic = useQuizLogic({
    testId: "movie-theater-style",
    questions,
    resultPath: "/tests/movie-theater-style/test/result",
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
      colorClasses={getQuizColorScheme("indigo-purple-pink")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
