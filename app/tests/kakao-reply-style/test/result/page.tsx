"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, MessageSquare, Sparkles } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { ShareButtons } from "@/components/share-buttons"
import { getTestResult } from "@/lib/api-client"

const replyTypes = {
  ENFP: {
    label: "분위기 전파자",
    summary: "대화를 살리고 참여를 끌어낸다",
    traits: ["빠른 호응", "밈·이모티콘 적극", "제안 활발"],
    tips: ["핵심 한 줄 요약", "업무 방에서는 밈 절제", "결정 마감 명시"],
    match: "ISTJ, ISFJ",
    emoji: "⚡",
  },
  INFP: {
    label: "감성 큐레이터",
    summary: "진심 담긴 장문으로 신뢰를 만든다",
    traits: ["공감 중심", "세심한 표현", "읽씹 부담"],
    tips: ["핵심 먼저, 감정은 뒤로", "문단 구분", "대기 시간 안내"],
    match: "ENTJ, ESTJ",
    emoji: "🌙",
  },
  ENFJ: {
    label: "조율 리더",
    summary: "사람과 일의 균형을 잡는다",
    traits: ["요약→배려", "의견 수렴", "합의 이끎"],
    tips: ["결정 시점 명확화", "액션아이템 체크", "과잉 배려 경계"],
    match: "INTP, ISTP",
    emoji: "🤝",
  },
  INFJ: {
    label: "맥락 설계자",
    summary: "의도와 흐름을 챙겨 오해를 줄인다",
    traits: ["사전 설명", "근거 링크", "톤 안정"],
    tips: ["과한 길이 축소", "결론을 위로", "요청은 체크박스화"],
    match: "ENFP, ESFP",
    emoji: "📖",
  },
  ENTP: {
    label: "아이디어 스파크",
    summary: "대화에서 실험과 토론을 즐긴다",
    traits: ["빠른 전환", "대안 제시", "농담 섞임"],
    tips: ["결정권자 명시", "논쟁 길이 제한", "요약 라벨"],
    match: "ISFJ, ISTJ",
    emoji: "💡",
  },
  INTP: {
    label: "분석 답장가",
    summary: "정보 밀도를 높여 효율을 추구",
    traits: ["근거 중심", "링크·코드 선호", "감정 최소"],
    tips: ["한줄 결론", "톤 중화", "확인 이모티콘 대체문구"],
    match: "ENFJ, ESFJ",
    emoji: "🔬",
  },
  ENTJ: {
    label: "드라이브 추진자",
    summary: "목표와 기한으로 대화를 정렬",
    traits: ["결정 주도", "담당 배정", "불필요 제거"],
    tips: ["감사 한줄 추가", "예외 시나리오", "휴먼터치 확보"],
    match: "ISFP, INFP",
    emoji: "🎯",
  },
  INTJ: {
    label: "전략 컴파일러",
    summary: "규칙·템플릿로 일관성 유지",
    traits: ["고정 포맷", "화이트리스트", "로그 보존"],
    tips: ["즉흥 제안 수용칸", "온도 표현 한줄", "주기 점검"],
    match: "ESFP, ENFP",
    emoji: "📐",
  },
  ESFJ: {
    label: "분위기 매니저",
    summary: "모두의 이해를 맞추고 챙긴다",
    traits: ["공지 정리", "알림 태깅", "평탄화"],
    tips: ["결정권 확인", "스레드 분리", "요약 카드"],
    match: "INTP, ISTP",
    emoji: "😊",
  },
  ISFJ: {
    label: "세심 기록가",
    summary: "히스토리로 안정적인 협업을 만든다",
    traits: ["회의록 링크", "재확인", "상대 배려"],
    tips: ["지연 시 알림", "과잉 사과 축소", "결정 체크"],
    match: "ENTP, ENFP",
    emoji: "🧸",
  },
  ESFP: {
    label: "현장 반응가",
    summary: "속도·리액션으로 흐름을 살린다",
    traits: ["짧은 호응", "사진·짤 활용", "즉흥 제안"],
    tips: ["업무 채널 분리", "핵심 먼저", "예산·기한 표시"],
    match: "INTJ, INFJ",
    emoji: "🎉",
  },
  ISFP: {
    label: "미니멀 리스너",
    summary: "짧고 부드럽게 의사표현",
    traits: ["단문 선호", "톤 온화", "숨고르기"],
    tips: ["배경 한줄", "대안 1개", "읽음 표시 대체문구"],
    match: "ENTJ, ESTJ",
    emoji: "🌿",
  },
  ESTJ: {
    label: "프로세스 매니저",
    summary: "규칙과 체크리스트로 정돈",
    traits: ["요청 포맷", "마감 우선", "책임 명확"],
    tips: ["감정 한줄", "피드백 타임", "예외 처리안"],
    match: "INFP, ISFP",
    emoji: "📋",
  },
  ISTJ: {
    label: "정석 커뮤니케이터",
    summary: "일관된 템플릿과 시간 관리",
    traits: ["응답 규칙", "기록 집착", "오해 최소"],
    tips: ["즉흥 슬롯 허용", "완벽주의 완화", "감사 표현"],
    match: "ENFP, ESFP",
    emoji: "📦",
  },
  ESTP: {
    label: "즉응 해결사",
    summary: "빠르게 결론을 만들고 이동",
    traits: ["행동 중심", "결정 통보", "후속 피드백"],
    tips: ["근거 한줄", "합의 로그", "부드러운 마감"],
    match: "INFJ, INTP",
    emoji: "⚡",
  },
  ISTP: {
    label: "실용 정리자",
    summary: "필요한 정보만 남기는 효율형",
    traits: ["스크린샷·체크박스", "질문 선호", "감정 최소"],
    tips: ["배경 컨텍스트", "기한 표기", "상대 톤 매칭"],
    match: "ESFJ, ENFJ",
    emoji: "🛠",
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const mbtiType = (searchParams.get("type") as keyof typeof replyTypes) || "ENFP"
  const resultId = searchParams.get("id") || undefined
  const character = replyTypes[mbtiType]
  const [loadedResult, setLoadedResult] = useState<{ id: string; testId: string } | null>(null)

  // 결과 ID가 있으면 결과 정보 로드
  useEffect(() => {
    if (resultId) {
      getTestResult(resultId)
        .then((result) => {
          setLoadedResult({ id: result.id, testId: result.testId })
        })
        .catch((error) => {
          void error
        })
    }
  }, [resultId])

  return (
    <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950">
      {/* Main Result */}
      <main className="container max-w-[720px] mx-auto px-4 py-8">
        {/* Character Card */}
        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur mb-8">
          <CardContent className="p-8 text-center">
            <div className="space-y-6">
              <div className="text-8xl mb-4">{character.emoji}</div>

              <div>
                <Badge
                  variant="secondary"
                  className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                >
                  {mbtiType}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{character.label}</h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium">"{character.summary}"</p>
              </div>

              {/* Share Buttons */}
              <div className="flex flex-col items-center space-y-4">
                <ShareButtons
                  testId="kakao-reply-style"
                  testPath="/tests/kakao-reply-style/test"
                  resultType={mbtiType}
                  resultId={loadedResult?.id || resultId}
                  title={`나는 💬 ${character.label}(${mbtiType})! 너는 어떤 답장러야?`}
                  description={character.summary}
                />
                <Button variant="outline" size="lg" asChild>
                  <Link href="/tests/kakao-reply-style/test">
                    <RotateCcw className="h-5 w-5 mr-2" />
                    다시 테스트
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Traits */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <span>💬</span>
              <span>당신의 메시지 특징</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.traits.map((trait, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-lg"
                >
                  <p className="font-medium text-center">{trait}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <span>💡</span>
              <span>추천 답장 팁</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3">
              {character.tips.map((tip, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="text-blue-500 font-bold">{index + 1}.</span>
                  <p className="text-lg leading-relaxed text-muted-foreground flex-1">{tip}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Match */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <span>❤️</span>
              <span>잘 맞는 상대 유형</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg leading-relaxed text-muted-foreground">{character.match}</p>
          </CardContent>
        </Card>

        {/* Other Tests */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-indigo-500" />
              <span>다른 재미있는 테스트도 해보세요!</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  slug: "phone-style",
                  title: "스마트폰 사용 스타일",
                  emoji: "📱",
                  description: "스마트폰 사용 습관으로 알아보는 성격",
                  participants: "0",
                },
                {
                  slug: "clean-style",
                  title: "방 청소 스타일",
                  emoji: "🧹",
                  description: "청소 습관으로 알아보는 성격",
                  participants: "0",
                },
                {
                  slug: "evening-routine",
                  title: "퇴근 후 루틴",
                  emoji: "🌙",
                  description: "저녁 루틴으로 알아보는 성격",
                  participants: "0",
                },
              ].map((test) => (
                <Card key={test.slug} className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{test.emoji}</div>
                    <h3 className="font-bold mb-2">{test.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{test.description}</p>
                    <p className="text-xs text-muted-foreground mb-4">{test.participants}명 참여</p>
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/tests/${test.slug}`}>테스트 하기</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 다른 테스트하기 버튼 */}
        <div className="mt-8 text-center">
          <Link href="/tests">
            <Button
              variant="outline"
              className="border-2 border-blue-300 hover:bg-blue-50 font-medium py-6 px-8 bg-transparent"
            >
              다른 테스트하기
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default function KakaoReplyStyleResult() {
  return (
    <Suspense fallback={<div>결과를 불러오는 중...</div>}>
      <ResultContent />
    </Suspense>
  )
}

