"use client"

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  { id: 1, q: "💬 AI에게 연애 고민을 처음 보낼 때", a1: { text: "상황 타임라인부터 정리한다", tags: ['I', 'J'] }, a2: { text: "핵심 감정 한 줄부터 털어놓는다", tags: ['E', 'P'] } },
  { id: 2, q: "상대의 말이 헷갈리면", a1: { text: "문장별 의미를 나눠 해석한다", tags: ['T', 'S'] }, a2: { text: "맥락과 분위기를 먼저 읽는다", tags: ['F', 'N'] } },
  { id: 3, q: "프롬프트를 쓸 때", a1: { text: "질문 목표를 번호로 쪼갠다", tags: ['J', 'T'] }, a2: { text: "자연스럽게 대화하듯 입력한다", tags: ['P', 'F'] } },
  { id: 4, q: "조언이 여러 개 나오면", a1: { text: "실행 난이도 기준으로 고른다", tags: ['S', 'J'] }, a2: { text: "내 마음이 움직이는 답을 고른다", tags: ['N', 'F'] } },
  { id: 5, q: "답변 톤이 차갑게 느껴지면", a1: { text: "조건을 더 구체화해 재질문한다", tags: ['T', 'J'] }, a2: { text: "공감형 말투를 요청해 바꾼다", tags: ['F', 'P'] } },
  { id: 6, q: "재회/정리 같은 큰 결정 앞에서", a1: { text: "기간·리스크를 표로 비교한다", tags: ['I', 'T'] }, a2: { text: "현재 감정의 방향을 최우선으로 본다", tags: ['E', 'F'] } },
  { id: 7, q: "상대에게 보낼 메시지 초안은", a1: { text: "문장 길이와 의도를 다듬는다", tags: ['I', 'J'] }, a2: { text: "읽는 순간의 온도를 살린다", tags: ['E', 'P'] } },
  { id: 8, q: "친구 조언과 AI 조언이 다르면", a1: { text: "근거가 더 명확한 쪽을 따른다", tags: ['S', 'T'] }, a2: { text: "내 관계 맥락에 맞는 쪽을 택한다", tags: ['N', 'F'] } },
  { id: 9, q: "갈등 후 복기할 때", a1: { text: "트리거 상황을 체크리스트로 만든다", tags: ['J', 'S'] }, a2: { text: "감정 흐름 그래프를 그려본다", tags: ['P', 'N'] } },
  { id: 10, q: "연락 텀 전략을 세울 때", a1: { text: "패턴을 분석해 규칙을 정한다", tags: ['T', 'J'] }, a2: { text: "상대 반응에 맞춰 유동적으로 간다", tags: ['F', 'P'] } },
  { id: 11, q: "AI 답변을 저장하는 방식은", a1: { text: "케이스별 폴더로 아카이브한다", tags: ['I', 'S'] }, a2: { text: "중요 문장만 캡처해 모아둔다", tags: ['E', 'N'] } },
  { id: 12, q: "다음 상담을 시작할 때", a1: { text: "이전 대화 요약을 먼저 붙인다", tags: ['I', 'J'] }, a2: { text: "새로운 감정 상태부터 업데이트한다", tags: ['E', 'P'] } },
]

export default function TestPage() {
  const quizLogic = useQuizLogic({ testId: "ai-love-counsel-style", questions, resultPath: "/tests/ai-love-counsel-style/test/result" })
  return <QuizContainer {...{ currentQuestion: quizLogic.currentQuestion, currentQ: quizLogic.currentQ, selectedChoice: quizLogic.selectedChoice, isProcessing: quizLogic.isProcessing, isSaving: quizLogic.isSaving, progress: quizLogic.progress, questionsLength: quizLogic.questionsLength, colorClasses: getQuizColorScheme("pink"), onChoiceSelect: quizLogic.handleChoiceSelect, onPrevious: quizLogic.handlePrevious } } />
}
