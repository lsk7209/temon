"use client"

/**
 * Component: KpopIdolTest
 * K-POP 아이돌 테스트 페이지
 * @example <KpopIdolTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "팀 회의 중 분위기가 싸해졌다!",
    a1: { text: "리더답게 중재하며 정리한다", tags: ["leader"] },
    a2: { text: '"에라 모르겠다" 하며 농담 던져 분위기 바꾼다', tags: ["maknae"] },
  },
  {
    id: 2,
    q: "안무 연습 중 실수했다!",
    a1: { text: "완벽할 때까지 끝까지 연습한다", tags: ["dancer"] },
    a2: { text: "대충 웃고 넘어간다", tags: ["maknae"] },
  },
  {
    id: 3,
    q: "무대 올라가기 전, 당신은?",
    a1: { text: "거울 보며 헤어/메이크업 체크", tags: ["visual"] },
    a2: { text: '"파이팅~!" 하며 에너지 뿜는다', tags: ["leader"] },
  },
  {
    id: 4,
    q: '팬이 "최애예요"라고 말한다!',
    a1: { text: "쑥스럽게 고개 숙이며 미소", tags: ["visual"] },
    a2: { text: '크게 하트 날리며 "사랑해요!"', tags: ["maknae"] },
  },
  {
    id: 5,
    q: "새 앨범 콘셉트 정할 때?",
    a1: { text: '"이번엔 진지하게 가자"', tags: ["leader"] },
    a2: { text: '"병맛 컨셉 어때?"', tags: ["maknae"] },
  },
  {
    id: 6,
    q: "스케줄 끝나고 숙소에 들어왔다!",
    a1: { text: "제일 먼저 방에 들어가 공부/연습", tags: ["vocal"] },
    a2: { text: "간식 챙기고 게임 킨다", tags: ["maknae"] },
  },
  {
    id: 7,
    q: "팬사인회에서 가장 많이 듣는 말은?",
    a1: { text: '"리더 같아요~ 든든해요!"', tags: ["leader"] },
    a2: { text: '"막내 같아요~ 귀여워요!"', tags: ["maknae"] },
  },
  {
    id: 8,
    q: "무대에서 당신은?",
    a1: { text: "카리스마 있게 중심을 잡는다", tags: ["dancer"] },
    a2: { text: "감정 담아 노래에 집중한다", tags: ["vocal"] },
  },
]

// Custom result calculation for kpop-idol test
const calculateKpopIdolResult = (answers: string[][]): string => {
  const scores: Record<string, number> = {
    leader: 0,
    vocal: 0,
    dancer: 0,
    visual: 0,
    maknae: 0,
  }

  // Sum up tags from all answers
  answers.forEach((answerTags) => {
    answerTags.forEach((tag) => {
      if (scores.hasOwnProperty(tag)) {
        scores[tag]++
      }
    })
  })

  // Find the type with the highest score
  return Object.entries(scores).reduce((a, b) => (scores[a[0]] > scores[b[0]] ? a : b))[0]
}

export default function KpopIdolTest() {
  const quizLogic = useQuizLogic({
    testId: "kpop-idol",
    questions,
    resultPath: "/tests/kpop-idol/test/result",
    calculateResult: calculateKpopIdolResult,
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
      colorClasses={getQuizColorScheme("purple-pink")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
