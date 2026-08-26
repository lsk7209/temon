"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, Heart, Sparkles } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { ShareButtons } from "@/components/share-buttons"
import { getTestResult } from "@/lib/api-client"

const loveTypes = {
  ENFP: {
    label: "분위기 메이커",
    summary: "연락에 생기를 불어넣는 타입",
    traits: ["가벼운 농담·밈", "제안 활발", "호응 빠름"],
    tips: ["핵심 결론 먼저", "일정·예산 명시", "과열 시 쿨다운"],
    match: "ISTJ, ISFJ",
    emoji: "💕",
  },
  INFP: {
    label: "감성 스토리텔러",
    summary: "여운과 진심으로 관계를 깊게",
    traits: ["장문 서사", "섬세한 공감", "간헐적 몰입"],
    tips: ["한줄 요약 추가", "답장 예상시간 안내", "요청은 명확히"],
    match: "ENTJ, ESTJ",
    emoji: "🌙",
  },
  ENFJ: {
    label: "따뜻한 조율가",
    summary: "온도와 합의를 동시에 챙김",
    traits: ["의견 수렴", "상대 리듬 맞춤", "합의 마무리"],
    tips: ["결정 시점 고정", "거절 문구 템플릿", "과잉배려 경계"],
    match: "INTP, ISTP",
    emoji: "🤝",
  },
  INFJ: {
    label: "맥락 설계자",
    summary: "오해를 줄이는 구조적 소통",
    traits: ["배경 설명", "의도 명시", "톤 안정"],
    tips: ["길이 축소", "결론을 상단 배치", "요청 체크박스화"],
    match: "ENFP, ESFP",
    emoji: "📖",
  },
  ENTP: {
    label: "스파크 플래너",
    summary: "아이디어와 변주로 텐션 업",
    traits: ["새 제안 다수", "주제 전환 빠름", "즉흥 통화"],
    tips: ["결정권 명시", "토론 시간 제한", "요약 라벨"],
    match: "ISFJ, ISTJ",
    emoji: "💡",
  },
  INTP: {
    label: "분석 컨시어지",
    summary: "정보 밀도로 신뢰를 만든다",
    traits: ["링크·근거", "간결한 톤", "감정 최소"],
    tips: ["감사 한줄", "확인 요청 문구", "감정 신호 포착"],
    match: "ENFJ, ESFJ",
    emoji: "🔬",
  },
  ENTJ: {
    label: "드라이브 캡틴",
    summary: "목표 중심으로 리드",
    traits: ["일정 고정", "담당 배정", "결정 명확"],
    tips: ["부드러운 완충", "예외 시나리오", "휴먼터치 확보"],
    match: "ISFP, INFP",
    emoji: "🎯",
  },
  INTJ: {
    label: "전략 오케스트라",
    summary: "템플릿과 리듬으로 안정화",
    traits: ["고정 포맷", "리마인드", "로그 관리"],
    tips: ["즉흥 제안 수용칸", "온도 표현", "정기 점검"],
    match: "ESFP, ENFP",
    emoji: "📐",
  },
  ESFJ: {
    label: "케어 매니저",
    summary: "챙김과 정리로 편안함 제공",
    traits: ["공지형 메시지", "리액션 풍부", "평탄화"],
    tips: ["결정권자 확인", "스레드 분리", "요약 카드"],
    match: "INTP, ISTP",
    emoji: "😊",
  },
  ISFJ: {
    label: "세심 기록가",
    summary: "히스토리로 신뢰를 축적",
    traits: ["재확인", "일지형 소통", "상대 배려"],
    tips: ["지연 알림", "과잉 사과 축소", "요청 명확화"],
    match: "ENTP, ENFP",
    emoji: "🧸",
  },
  ESFP: {
    label: "라이브 리액터",
    summary: "현장감과 속도로 끌어올림",
    traits: ["짧은 호응", "사진·음성", "즉흥 만남"],
    tips: ["업무·사적 채널 분리", "핵심 우선", "예산·시간 표기"],
    match: "INTJ, INFJ",
    emoji: "🎉",
  },
  ISFP: {
    label: "미니멀 리스너",
    summary: "부드럽고 단정한 단문",
    traits: ["톤 온화", "선택적 공유", "휴식 중요"],
    tips: ["배경 한줄", "대안 1개", "읽음 대체문구"],
    match: "ENTJ, ESTJ",
    emoji: "🌿",
  },
  ESTJ: {
    label: "프로세스 매니저",
    summary: "룰·체크로 혼선을 최소화",
    traits: ["요청 포맷", "마감 우선", "책임 명확"],
    tips: ["감정 한줄", "피드백 타임", "예외 처리안"],
    match: "INFP, ISFP",
    emoji: "📋",
  },
  ISTJ: {
    label: "정석 커뮤니케이터",
    summary: "일관된 규칙과 시간 관리",
    traits: ["응답 규칙", "기록 집착", "오해 최소"],
    tips: ["즉흥 슬롯 허용", "감사 표현", "완벽주의 완화"],
    match: "ENFP, ESFP",
    emoji: "📦",
  },
  ESTP: {
    label: "즉응 해결사",
    summary: "빠르게 결론을 내는 기동형",
    traits: ["행동 중심", "통보형 결정", "후속 피드백"],
    tips: ["근거 한줄", "합의 로그", "부드러운 마감"],
    match: "INFJ, INTP",
    emoji: "⚡",
  },
  ISTP: {
    label: "실용 정리자",
    summary: "필요한 정보만 남기는 효율",
    traits: ["체크리스트", "질문 선호", "감정 최소"],
    tips: ["배경 컨텍스트", "기한 표기", "상대 톤 매칭"],
    match: "ESFJ, ENFJ",
    emoji: "🛠",
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const mbtiType = (searchParams.get("type") as keyof typeof loveTypes) || "ENFP"
  const resultId = searchParams.get("id") || undefined
  const character = loveTypes[mbtiType]
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
                  className="mb-4 bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200"
                >
                  {mbtiType}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{character.label}</h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium">"{character.summary}"</p>
              </div>

              {/* Share Buttons */}
              <div className="flex flex-col items-center space-y-4">
                <ShareButtons
                  testId="love-texting-style"
                  testPath="/tests/love-texting-style/test"
                  resultType={mbtiType}
                  resultId={loadedResult?.id || resultId}
                  title={`나는 💕 ${character.label}(${mbtiType})! 너는 어떤 연락러야?`}
                  description={character.summary}
                />
                <Button variant="outline" size="lg" asChild>
                  <Link href="/tests/love-texting-style/test">
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
              <span>💕</span>
              <span>당신의 연락 특징</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.traits.map((trait, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950 dark:to-rose-950 rounded-lg"
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
              <span>추천 팁</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3">
              {character.tips.map((tip, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="text-pink-500 font-bold">{index + 1}.</span>
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
              <span>잘 맞는 궁합</span>
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
              <Sparkles className="h-6 w-6 text-rose-500" />
              <span>다른 재미있는 테스트도 해보세요!</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  slug: "kakao-reply-style",
                  title: "카톡 답장 스타일",
                  emoji: "💬",
                  description: "답장 습관으로 알아보는 성격",
                  participants: "0",
                },
                {
                  slug: "sleep-chronotype",
                  title: "수면 크로노타입",
                  emoji: "😴",
                  description: "수면 패턴으로 알아보는 성격",
                  participants: "0",
                },
                {
                  slug: "shopping-style",
                  title: "소비 성향",
                  emoji: "🛍️",
                  description: "소비 습관으로 알아보는 성격",
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
              className="border-2 border-pink-300 hover:bg-pink-50 font-medium py-6 px-8 bg-transparent"
            >
              다른 테스트하기
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default function LoveTextingStyleResult() {
  return (
    <Suspense fallback={<div>결과를 불러오는 중...</div>}>
      <ResultContent />
    </Suspense>
  )
}

