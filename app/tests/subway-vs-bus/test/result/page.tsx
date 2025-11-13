"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, Train, Sparkles } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { ShareButtons } from "@/components/share-buttons"
import { getTestResult } from "@/lib/api-client"

const transportTypes = {
  ENFP: {
    label: "즉흥 버스형",
    summary: "버스를 즉흥적으로 선택하는 활발한 타입",
    description: [
      "버스를 즉흥적으로 선택하는 당신! 유연하고 편한 버스를 좋아하고, 그때그때 마음에 드는 버스를 선택해요.",
      "사람들과 함께 승차하며, 즐거운 시간을 만들어요. 복도 좌석을 좋아하고, 자연스러운 방식을 선호해요.",
      "승차 후기도 공유하고, 경험을 나누며, 모두가 행복해하는 것을 좋아해요.",
    ],
    traits: ["버스 선호", "즉흥적 선택", "함께 즐기기"],
    picks: ["버스", "유연한 방식", "복도 좌석"],
    tips: ["승차 계획", "좌석 선택", "나눠 승차"],
    match: "ISTJ, INTJ",
    emoji: "✨",
  },
  INFP: {
    label: "감성 버스형",
    summary: "버스를 조용히 선택하는 감성형",
    description: [
      "버스를 조용히 선택하는 당신! 편의성과 감성을 중시하며, 특별한 의미가 있는 버스를 좋아해요.",
      "혼자 조용히 승차하며, 그 순간의 의미를 생각하고 감성적으로 느껴요.",
      "창가 좌석을 좋아하고, 확인하기를 좋아하며, 그 순간을 소중히 여기는 것을 좋아해요.",
    ],
    traits: ["버스 선호", "조용히 선택하기", "감성 중시"],
    picks: ["버스", "의미 있는 방식", "창가 좌석"],
    tips: ["승차 계획", "좌석 선택", "나눠 승차"],
    match: "ENTJ, ESTJ",
    emoji: "🌙",
  },
  ENFJ: {
    label: "배려 조화형",
    summary: "모두가 좋아하는 대중교통으로 조화롭게 선택하는 리더형",
    description: [
      "모두가 좋아하는 대중교통으로 조화롭게 선택하는 당신! 모두가 만족할 수 있도록 교통수단을 선택해요.",
      "사람들과 함께 승차할 때는 체계적으로 관리하고 모두가 함께 즐거워하는 모습을 만들어요.",
      "균형 잡힌 선택을 좋아하고, 모두가 행복해하는 것을 좋아해요.",
    ],
    traits: ["배려 중시", "모두가 즐거워", "조화로운 선택"],
    picks: ["균형 잡힌 선택", "즐거운 방식", "적당한 좌석"],
    tips: ["승차 계획", "좌석 선택", "나눠 승차"],
    match: "INTP, ISTP",
    emoji: "🤝",
  },
  INFJ: {
    label: "완벽 의미형",
    summary: "완벽한 의미를 가진 대중교통을 선택하는 큐레이터형",
    description: [
      "완벽한 의미를 가진 대중교통을 선택하는 당신! 단순히 교통수단이 아니라, 그 선택의 의미를 중요하게 생각해요.",
      "혼자 조용히 승차하며, 그 순간의 의미를 생각하고 감성적으로 느껴요.",
      "창가 좌석을 좋아하고, 그 순간을 소중히 여기는 것을 좋아해요.",
    ],
    traits: ["완벽한 의미", "깊이 있는 선택", "감성 전달"],
    picks: ["완벽한 선택", "의미 있는 방식", "감성적인 좌석"],
    tips: ["승차 계획", "좌석 선택", "나눠 승차"],
    match: "ENFP, ESFP",
    emoji: "📖",
  },
  ENTP: {
    label: "실험 조합형",
    summary: "다양한 대중교통을 실험적으로 조합하는 탐구형",
    description: [
      "다양한 대중교통을 실험적으로 조합하는 당신! 지하철과 버스를 다양하게 시도하고, 새로운 방법을 탐구해요.",
      "사람들과 함께 승차할 때는 새로운 방법을 제안하며, 모두가 즐거워하는 모습을 만들어요.",
      "유연한 방식을 좋아하고, 실험적으로 즐기는 것을 좋아해요.",
    ],
    traits: ["실험적 조합", "다양한 시도", "탐구 정신"],
    picks: ["다양한 선택", "새로운 방법", "실험적 방식"],
    tips: ["승차 계획", "좌석 선택", "나눠 승차"],
    match: "ISFJ, ISTJ",
    emoji: "💡",
  },
  INTP: {
    label: "분석 효율형",
    summary: "분석하여 효율적인 대중교통을 선택하는 분석가형",
    description: [
      "분석하여 효율적인 대중교통을 선택하는 당신! 속도와 효율을 고려하며 선택해요.",
      "혼자 조용히 승차하며, 논리적으로 분석하고 효율적으로 선택해요.",
      "지하철을 선호하고, 효율적으로 즐기는 것을 좋아해요.",
    ],
    traits: ["분석적 선택", "효율 중시", "논리적 판단"],
    picks: ["지하철", "효율적인 방식", "간단한 방법"],
    tips: ["승차 계획", "좌석 선택", "나눠 승차"],
    match: "ENFJ, ESFJ",
    emoji: "🔬",
  },
  ENTJ: {
    label: "전략 지하철형",
    summary: "전략적으로 계획하여 효율적으로 선택하는 리더형",
    description: [
      "전략적으로 계획하여 지하철을 선택하는 당신! 목적에 맞는 선택을 미리 정해두고 실행해요.",
      "사람들과 함께 승차할 때는 체계적으로 관리하고, 효율적으로 선택해요.",
      "지하철을 선호하고, 목표를 달성하는 것을 좋아해요.",
    ],
    traits: ["전략적 선택", "효율적 관리", "목표 달성"],
    picks: ["지하철", "효율적인 방식", "목표 좌석"],
    tips: ["승차 계획", "좌석 선택", "나눠 승차"],
    match: "ISFP, INFP",
    emoji: "🎯",
  },
  INTJ: {
    label: "완벽 지하철형",
    summary: "완벽하게 조합하여 최적의 선택을 만드는 큐레이터형",
    description: [
      "완벽하게 조합하여 지하철을 선택하는 당신! 모든 요소를 고려하여 최적의 선택을 만들어요.",
      "혼자 조용히 승차하며, 완벽한 선택을 찾아서 실행해요.",
      "지하철을 선호하고, 완벽한 경험을 만드는 것을 목표로 해요.",
    ],
    traits: ["완벽 선택", "최적 경험", "품질 중시"],
    picks: ["지하철", "최적의 방식", "품질 있는 좌석"],
    tips: ["승차 계획", "좌석 선택", "나눠 승차"],
    match: "ESFP, ENFP",
    emoji: "📐",
  },
  ESFJ: {
    label: "따뜻한 조합형",
    summary: "따뜻하게 조합하여 모두가 즐거워하는 배려형",
    description: [
      "따뜻하게 조합하여 대중교통을 선택하는 당신! 모두가 즐거워할 수 있도록 교통수단을 선택해요.",
      "사람들과 함께 승차할 때는 따뜻한 마음으로 준비하고 모두가 함께 즐거워하는 모습을 만들어요.",
      "균형 잡힌 선택을 좋아하고, 모두가 행복해하는 것을 좋아해요.",
    ],
    traits: ["따뜻한 선택", "모두가 즐거워", "배려 중시"],
    picks: ["따뜻한 선택", "즐거운 방식", "적당한 좌석"],
    tips: ["승차 계획", "좌석 선택", "나눠 승차"],
    match: "INTP, ISTP",
    emoji: "😊",
  },
  ISFJ: {
    label: "안정 지하철형",
    summary: "안정적으로 지하철을 유지하는 수호자형",
    description: [
      "안정적으로 지하철을 유지하는 당신! 항상 같은 방식으로 루틴을 유지해요.",
      "혼자 조용히 승차하며, 안정적인 느낌을 즐겨요.",
      "지하철을 선호하고, 그 순간의 평온함을 느끼는 것을 소중히 여겨요.",
    ],
    traits: ["안정적 선택", "루틴 유지", "일관성"],
    picks: ["지하철", "고정된 방식", "안정적인 좌석"],
    tips: ["승차 계획", "좌석 선택", "나눠 승차"],
    match: "ENTP, ENFP",
    emoji: "🧸",
  },
  ESFP: {
    label: "즉흥 즐거움형",
    summary: "즉흥적으로 즐거운 버스로 분위기를 띄우는 에너지형",
    description: [
      "즉흥적으로 즐거운 버스를 선택하는 당신! 그때그때 마음에 드는 버스를 선택하고, 즐거운 시간을 만들어요.",
      "사람들과 함께 승차할 때는 즐거운 시간으로 만들고 모두가 즐거워하는 모습을 만들어요.",
      "버스를 선호하고, 풍부하게 즐기는 것을 좋아해요.",
    ],
    traits: ["즉흥적 선택", "즐거운 버스", "에너지 넘침"],
    picks: ["버스", "즐거운 방식", "복도 좌석"],
    tips: ["승차 계획", "좌석 선택", "나눠 승차"],
    match: "INTJ, INFJ",
    emoji: "🎉",
  },
  ISFP: {
    label: "조용한 버스형",
    summary: "조용히 나만의 취향으로 감성적인 버스를 선택하는 미니멀형",
    description: [
      "조용히 나만의 취향으로 감성적인 버스를 선택하는 당신! 특별한 의미가 있는 버스, 감성적인 버스를 좋아해요.",
      "혼자 조용히 승차하며, 그 순간을 즐기고 감성적으로 느껴요.",
      "버스를 선호하고, 창가 좌석을 좋아하며, 그 순간의 평온함을 느끼는 것을 좋아해요.",
    ],
    traits: ["조용한 선택", "나만의 취향", "감성 몰입"],
    picks: ["버스", "감성적인 방식", "창가 좌석"],
    tips: ["승차 계획", "좌석 선택", "나눠 승차"],
    match: "ENTJ, ESTJ",
    emoji: "🌿",
  },
  ESTJ: {
    label: "계획 지하철형",
    summary: "계획적으로 효율적인 선택을 만드는 매니저형",
    description: [
      "계획적으로 효율적인 지하철을 선택하는 당신! 목적에 맞는 선택을 미리 정해두고 실행해요.",
      "사람들과 함께 승차할 때는 체계적으로 관리하고, 효율적으로 선택해요.",
      "지하철을 선호하고, 효율적으로 처리하는 것을 좋아해요.",
    ],
    traits: ["계획적 선택", "효율적 관리", "목표 달성"],
    picks: ["지하철", "효율적인 방식", "목표 좌석"],
    tips: ["승차 계획", "좌석 선택", "나눠 승차"],
    match: "INFP, ISFP",
    emoji: "📋",
  },
  ISTJ: {
    label: "루틴 지하철형",
    summary: "정해진 루틴으로 지하철을 유지하는 수호자형",
    description: [
      "정해진 루틴으로 지하철을 유지하는 당신! 항상 같은 방식으로 루틴을 유지해요.",
      "혼자 조용히 승차하며, 안정적인 느낌을 즐겨요.",
      "지하철을 선호하고, 그 순간의 평온함을 느끼는 것을 소중히 여겨요.",
    ],
    traits: ["정해진 루틴", "안정적 선택", "일관성"],
    picks: ["지하철", "고정된 방식", "안정적인 좌석"],
    tips: ["승차 계획", "좌석 선택", "나눠 승차"],
    match: "ENFP, ESFP",
    emoji: "📦",
  },
  ESTP: {
    label: "즉흥 효율형",
    summary: "즉흥적으로 빠르게 선택하여 효율적으로 즐기는 액션형",
    description: [
      "즉흥적으로 빠르게 대중교통을 선택하는 당신! 그때그때 마음에 드는 교통수단을 선택하고, 빠르게 처리해요.",
      "사람들과 함께 승차할 때는 분위기를 띄우며, 모두가 즐거워하는 모습을 만들어요.",
      "유연한 방식을 좋아하고, 효율적으로 즐기는 것을 좋아해요.",
    ],
    traits: ["즉흥적 선택", "빠른 처리", "효율적 즐김"],
    picks: ["즉흥적 선택", "빠른 방식", "자연스러운 좌석"],
    tips: ["승차 계획", "좌석 선택", "나눠 승차"],
    match: "INFJ, INTP",
    emoji: "⚡",
  },
  ISTP: {
    label: "실용 지하철형",
    summary: "실용적으로 필요한 지하철만 선택하여 효율적으로 즐기는 실용가형",
    description: [
      "실용적으로 필요한 지하철만 선택하는 당신! 효율적으로 즐기는 것을 좋아해요.",
      "혼자 조용히 승차하며, 효율적으로 처리하는 것을 목표로 해요.",
      "지하철을 선호하고, 실용적으로 즐기는 것을 좋아해요.",
    ],
    traits: ["실용적 선택", "효율적 처리", "목적 지향"],
    picks: ["지하철", "효율적인 방식", "간단한 방법"],
    tips: ["승차 계획", "좌석 선택", "나눠 승차"],
    match: "ESFJ, ENFJ",
    emoji: "🛠",
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const mbtiType = (searchParams.get("type") as keyof typeof transportTypes) || "ENFP"
  const resultId = searchParams.get("id") || undefined
  const character = transportTypes[mbtiType]
  const [loadedResult, setLoadedResult] = useState<{ id: string; testId: string } | null>(null)

  useEffect(() => {
    if (resultId) {
      getTestResult(resultId)
        .then((result) => {
          setLoadedResult({ id: result.id, testId: result.testId })
        })
        .catch((error) => {
          console.error("결과 로드 실패:", error)
        })
    }
  }, [resultId])

  return (
    <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950">
      <main className="container max-w-[720px] mx-auto px-4 py-8">
        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur mb-8">
          <CardContent className="p-8 text-center">
            <div className="space-y-6">
              <div className="text-8xl mb-4">{character.emoji}</div>

              <div>
                <Badge
                  variant="secondary"
                  className="mb-4 bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200"
                >
                  {mbtiType}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{character.label}</h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium">"{character.summary}"</p>
              </div>

              <div className="flex flex-col items-center space-y-4">
                <ShareButtons
                  testId="subway-vs-bus"
                  testPath="/tests/subway-vs-bus/test"
                  resultType={mbtiType}
                  resultId={loadedResult?.id || resultId}
                  title={`나는 🚇 ${character.label}(${mbtiType})! 너는 어떤 대중교통러야?`}
                  description={character.summary}
                />
                <Button variant="outline" size="lg" asChild>
                  <Link href="/tests/subway-vs-bus/test">
                    <RotateCcw className="h-5 w-5 mr-2" />
                    다시 테스트
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <span>🚇</span>
              <span>당신의 대중교통 스타일</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {character.description.map((paragraph, index) => (
              <p key={index} className="text-lg leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </CardContent>
        </Card>

        {/* Traits */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <span>🚌</span>
              <span>당신의 선택 특징</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.traits.map((trait, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-950 dark:to-blue-950 rounded-lg"
                >
                  <p className="font-medium text-center">{trait}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Picks */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <span>🎫</span>
              <span>추천 선택 스타일</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.picks.map((pick, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-950 dark:to-blue-950 rounded-lg"
                >
                  <p className="font-medium text-center">{pick}</p>
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
              <span>대중교통 팁</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3">
              {character.tips.map((tip, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="text-sky-500 font-bold">{index + 1}.</span>
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
              <Sparkles className="h-6 w-6 text-sky-500" />
              <span>다른 재미있는 테스트도 해보세요!</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  slug: "clothing-order",
                  title: "옷 입는 순서",
                  emoji: "👔",
                  description: "옷 입는 순서로 알아보는 성격",
                  participants: "0",
                },
                {
                  slug: "sock-wearing",
                  title: "양말 신는 스타일",
                  emoji: "🧦",
                  description: "양말 선택으로 알아보는 성격",
                  participants: "0",
                },
                {
                  slug: "door-closing",
                  title: "문 닫는 스타일",
                  emoji: "🚪",
                  description: "문 닫는 방식으로 알아보는 성격",
                  participants: "0",
                },
                {
                  slug: "coffee-mbti",
                  title: "커피 MBTI",
                  emoji: "☕",
                  description: "커피 취향으로 알아보는 성격",
                  participants: "12.5K",
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

        <div className="mt-8 text-center">
          <Link href="/tests">
            <Button
              variant="outline"
              className="border-2 border-sky-300 hover:bg-sky-50 font-medium py-6 px-8 bg-transparent"
            >
              다른 테스트하기
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default function SubwayVsBusResult() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  )
}

