"use client"

/**
 * Component: SnowWhiteMBTITest
 * 백설공주 MBTI 테스트 페이지
 * @example <SnowWhiteMBTITest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "낯선 아줌마가 '유기농 사과야~' 하며 건넨다면? 🍎",
    a1: { text: "와 맛있겠다! 칼로리도 0 같아!", tags: ["egen"] },
    a2: { text: "원산지랑 성분표 확인했어?", tags: ["teto"] },
  },
  {
    id: 2,
    q: "난장이 집에 들어갔더니 양말 냄새가 진동한다. 🧦",
    a1: { text: "얘들아 귀엽네~ 내가 치워줄게!", tags: ["egen"] },
    a2: { text: "집합! 양말 담당 정하자. 시스템 필요해.", tags: ["teto"] },
  },
  {
    id: 3,
    q: "거울이 오늘따라 '넌 별로야'라고 한다. 🪞",
    a1: { text: "내 마음은 예쁘니까 괜찮아~", tags: ["egen"] },
    a2: { text: "근거 있어? 데이터 정확해?", tags: ["teto"] },
  },
  {
    id: 4,
    q: "숲속에서 길을 잃었다. 🌲",
    a1: { text: "앗싸 캠핑! 노래나 부르자~", tags: ["egen"] },
    a2: { text: "나무에 화살표 남기고 길 찾는다.", tags: ["teto"] },
  },
  {
    id: 5,
    q: "난장이들이 밥그릇 때문에 싸운다. 🍚",
    a1: { text: "같이 먹으면 더 맛있어~", tags: ["egen"] },
    a2: { text: "안건 정리하고 투표하자.", tags: ["teto"] },
  },
  {
    id: 6,
    q: "여왕이 독사과를 들고 협박한다. 👑",
    a1: { text: "언니 화났구나? 속 얘기 들어줄까?", tags: ["egen"] },
    a2: { text: "조건 말해, 협상하자.", tags: ["teto"] },
  },
  {
    id: 7,
    q: "난장이들이 깜짝 파티를 열었다. 🎉",
    a1: { text: "감동이야! 울어도 돼?", tags: ["egen"] },
    a2: { text: "예산은 누가 짰어? 재사용 가능해?", tags: ["teto"] },
  },
  {
    id: 8,
    q: "왕자가 말을 타고 나타나 구해주겠다 한다. 🐴",
    a1: { text: "오빠… 내 마음도 가져가…", tags: ["egen"] },
    a2: { text: "보험은 들어놨어? 책임 한도 확인해야지.", tags: ["teto"] },
  },
  {
    id: 9,
    q: "집에서 모두 다른 생활 패턴으로 산다. 🏠",
    a1: { text: "달라도 괜찮아~ 사랑해~", tags: ["egen"] },
    a2: { text: "생활 규칙표 만든다. 기상·취침 통일.", tags: ["teto"] },
  },
  {
    id: 10,
    q: "인생의 중요한 선택이 왔다. ⚖️",
    a1: { text: "심장이 뛰면 그게 정답이야!", tags: ["egen"] },
    a2: { text: "실현 가능한 길부터 고른다.", tags: ["teto"] },
  },
]

// Custom result calculation for snowwhite-mbti
const calculateSnowWhiteResult = (answers: string[][]): string => {
  let egenScore = 0
  let tetoScore = 0
  let princessScore = 0 // 공주/왕자 vs 여왕/난장이
  let leaderScore = 0 // 리더십 점수

  answers.forEach((answerTags, questionIndex) => {
    const question = questions[questionIndex]
    if (answerTags.includes("egen")) {
      egenScore++
      // 에겐 답변 중 특정 패턴으로 공주/왕자 구분
      if (questionIndex === 0 || questionIndex === 2 || questionIndex === 9) {
        princessScore++
      }
    } else if (answerTags.includes("teto")) {
      tetoScore++
      // 테토 답변 중 리더십 패턴으로 여왕/난장이 구분
      if (questionIndex === 1 || questionIndex === 4 || questionIndex === 5) {
        leaderScore++
      }
    }
  })

  // 4가지 유형 결정
  if (egenScore > tetoScore) {
    // 에겐 성향
    return princessScore >= 2 ? "princess" : "prince"
  } else {
    // 테토 성향
    return leaderScore >= 2 ? "queen" : "dwarf"
  }
}

export default function SnowWhiteMBTITest() {
  const quizLogic = useQuizLogic({
    testId: "snowwhite-mbti",
    questions,
    resultPath: "/snowwhite-mbti/test/result",
    calculateResult: calculateSnowWhiteResult,
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
      colorClasses={getQuizColorScheme("pink-purple")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
