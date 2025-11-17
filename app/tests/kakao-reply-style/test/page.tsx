"use client"

/**
 * Component: KakaoReplyStyleTest
 * 카카오톡 답장 스타일 테스트 페이지
 * @example <KakaoReplyStyleTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "카카오톡에서 새 메시지 알림이 왔는데 지금 바쁠 때",
    a1: { text: "바로 열어보고 답장한다", tags: ["E"] },
    a2: { text: "상황 정리 후 천천히 답장한다", tags: ["I"] },
  },
  {
    id: 2,
    q: "친구가 '오늘 뭐했어?'라고 물어봤을 때 답장을 쓸 때",
    a1: { text: "핵심만 짧게 '밥 먹고 집에 있었어'라고 답장한다", tags: ["S"] },
    a2: { text: "맥락과 느낌까지 자세히 '오늘은 좀 피곤해서 집에서 쉬었는데...'라고 답장한다", tags: ["N"] },
  },
  {
    id: 3,
    q: "친구와 의견이 달라서 카톡으로 토론할 때",
    a1: { text: "논리와 근거로 설득한다", tags: ["T"] },
    a2: { text: "상대 감정을 먼저 배려한다", tags: ["F"] },
  },
  {
    id: 4,
    q: "메시지를 읽었는데 답장하기 어려운 상황일 때",
    a1: { text: "읽으면 반드시 답장한다는 원칙을 지킨다", tags: ["J"] },
    a2: { text: "상황에 따라 유연하게 답장한다", tags: ["P"] },
  },
  {
    id: 5,
    q: "단체방에서 대화가 시끄러울 때",
    a1: { text: "적극적으로 주제를 던지고 정리한다", tags: ["E"] },
    a2: { text: "필요할 때만 말한다", tags: ["I"] },
  },
  {
    id: 6,
    q: "카카오톡에 새 이모티콘이나 밈이 나왔을 때",
    a1: { text: "검증된 것만 쓴다", tags: ["S"] },
    a2: { text: "새로운 걸 먼저 시도해본다", tags: ["N"] },
  },
  {
    id: 7,
    q: "업무 연락을 할 때 메시지를 작성할 때",
    a1: { text: "명확한 결론과 할 일을 먼저 적는다", tags: ["T"] },
    a2: { text: "상대의 부담을 줄이는 말부터 적는다", tags: ["F"] },
  },
  {
    id: 8,
    q: "답장이 여러 개 쌓였을 때",
    a1: { text: "정해둔 시간대에 일괄 처리한다", tags: ["J"] },
    a2: { text: "상황과 기분에 따라 즉흥적으로 처리한다", tags: ["P"] },
  },
  {
    id: 9,
    q: "친구와 약속을 잡을 때 카톡으로 조율할 때",
    a1: { text: "날짜와 시간을 먼저 제안한다", tags: ["E"] },
    a2: { text: "상대 의견을 먼저 묻는다", tags: ["I"] },
  },
  {
    id: 10,
    q: "카톡 메시지로 오해가 생겨서 친구가 화났을 때",
    a1: { text: "증거와 사실을 정리해서 설명한다", tags: ["T"] },
    a2: { text: "기분을 달래며 공감부터 한다", tags: ["F"] },
  },
  {
    id: 11,
    q: "친구에게 링크나 자료를 공유할 때",
    a1: { text: "필요한 것만 최소한으로 정확히 공유한다", tags: ["S"] },
    a2: { text: "참고 자료를 넉넉히 제공한다", tags: ["N"] },
  },
  {
    id: 12,
    q: "읽지 못한 메시지가 쌓여서 관리할 때",
    a1: { text: "미리 알림이나 고정핀으로 체계적으로 관리한다", tags: ["J"] },
    a2: { text: "그때그때 스와이프하거나 검색해서 찾는다", tags: ["P"] },
  },
]

export default function KakaoReplyStyleTest() {
  const quizLogic = useQuizLogic({
    testId: "kakao-reply-style",
    questions,
    resultPath: "/tests/kakao-reply-style/test/result",
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
      colorClasses={getQuizColorScheme("blue-indigo")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
