"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, Soup, Sparkles } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { ShareButtons } from "@/components/share-buttons"
import { getTestResult } from "@/lib/api-client"

const soupTypes = {
  ENFP: {
    label: "즉흥 국물형",
    summary: "즉흥적으로 다양한 국물을 즐기는 활발한 타입",
    description: [
      "즉흥적으로 다양한 국물을 즐기는 당신! 새로운 국물, 특별한 조합을 시도하고, 다양한 스타일을 탐구해요.",
      "사람들과 함께 국물을 마시며, 즐거운 시간을 만들어요. 자연스러운 마시기를 좋아하고, 풍부한 국물을 선호해요.",
      "국물 마시는 후에도 에너지가 넘치고, 활기차게 공유하는 것을 좋아해요.",
    ],
    traits: ["즉흥적 마시기", "다양한 시도", "함께 즐기기"],
    picks: ["새로운 국물", "특별한 조합", "풍부한 국물"],
    tips: ["국물 마시기 계획", "마시기 방법", "함께 즐기기"],
    match: "ISTJ, INTJ",
    emoji: "✨",
  },
  INFP: {
    label: "감성 국물형",
    summary: "의미 있는 국물로 감성적으로 즐기는 감성형",
    description: [
      "의미 있는 국물로 즐거움을 느끼는 당신! 특별한 의미가 있는 국물, 감성적인 선택을 좋아해요.",
      "혼자 조용히 국물을 마시며, 그 순간의 의미를 생각하고 감성적으로 느껴요.",
      "천천히 마시고, 그 순간을 소중히 여기며, 평온하게 즐기는 것을 좋아해요.",
    ],
    traits: ["의미 있는 마시기", "조용히 즐기기", "감성 중시"],
    picks: ["감성적인 국물", "특별한 의미", "평온한 분위기"],
    tips: ["국물 마시기 계획", "마시기 방법", "혼자 즐기기"],
    match: "ENTJ, ESTJ",
    emoji: "🌙",
  },
  ENFJ: {
    label: "배려 국물형",
    summary: "모두가 좋아하는 국물로 조화롭게 즐기는 리더형",
    description: [
      "모두가 좋아하는 국물로 즐거움을 나누는 당신! 함께 마시는 사람들이 만족할 수 있도록 국물을 선택해요.",
      "사람들과 함께 국물을 마실 때는 체계적으로 준비하고 모두가 함께 즐거워하는 모습을 만들어요.",
      "정돈된 국물 마시기를 좋아하고, 모두가 행복해하는 것을 좋아해요.",
    ],
    traits: ["배려 중시", "모두가 즐거워", "조화로운 경험"],
    picks: ["균형 잡힌 국물", "즐거운 분위기", "정돈된 마시기"],
    tips: ["국물 마시기 계획", "마시기 방법", "함께 즐기기"],
    match: "INTP, ISTP",
    emoji: "🤝",
  },
  INFJ: {
    label: "완벽 국물형",
    summary: "완벽한 국물로 의미 있게 즐기는 큐레이터형",
    description: [
      "완벽한 국물로 즐거움을 느끼는 당신! 단순히 마시는 것이 아니라, 그 국물의 의미를 중요하게 생각해요.",
      "혼자 조용히 국물을 마시며, 완벽한 조합을 찾아서 실행해요.",
      "정돈된 국물 마시기를 좋아하고, 그 순간을 소중히 여기며, 최고의 경험을 만드는 것을 목표로 해요.",
    ],
    traits: ["완벽한 마시기", "깊이 있는 즐김", "의미 전달"],
    picks: ["완벽한 조합", "의미 있는 국물", "감성적인 경험"],
    tips: ["국물 마시기 계획", "마시기 방법", "혼자 즐기기"],
    match: "ENFP, ESFP",
    emoji: "📖",
  },
  ENTP: {
    label: "실험 국물형",
    summary: "다양한 국물을 실험적으로 시도하는 탐구형",
    description: [
      "다양한 국물을 실험적으로 시도하는 당신! 새로운 국물과 조합을 시도하고, 다양한 스타일을 탐구해요.",
      "사람들과 함께 국물을 마실 때는 새로운 국물을 제안하며, 모두가 즐거워하는 모습을 만들어요.",
      "자연스러운 마시기를 좋아하고, 실험적으로 즐기는 것을 좋아해요.",
    ],
    traits: ["실험적 시도", "다양한 조합", "탐구 정신"],
    picks: ["새로운 국물", "특이한 조합", "실험적 방식"],
    tips: ["국물 마시기 계획", "마시기 방법", "함께 즐기기"],
    match: "ISFJ, ISTJ",
    emoji: "💡",
  },
  INTP: {
    label: "분석 국물형",
    summary: "분석하여 효율적인 국물을 선택하는 분석가형",
    description: [
      "분석하여 효율적인 국물을 선택하는 당신! 국물의 구성과 효율을 고려하며 선택해요.",
      "혼자 조용히 국물을 마시며, 논리적으로 분석하고 효율적으로 마셔요.",
      "빠르게 마시고, 효율적으로 즐기며, 실용적인 선택을 좋아해요.",
    ],
    traits: ["분석적 선택", "효율 중시", "논리적 판단"],
    picks: ["효율적인 국물", "실용적 선택", "간단한 방식"],
    tips: ["국물 마시기 계획", "마시기 방법", "혼자 즐기기"],
    match: "ENFJ, ESFJ",
    emoji: "🔬",
  },
  ENTJ: {
    label: "전략 국물형",
    summary: "전략적으로 계획하여 효율적으로 마시는 리더형",
    description: [
      "전략적으로 계획하여 국물을 마시는 당신! 목적에 맞는 국물을 미리 정해두고 실행해요.",
      "사람들과 함께 국물을 마실 때는 체계적으로 관리하고, 효율적으로 마셔요.",
      "정돈된 국물 마시기를 좋아하고, 목표를 달성하는 것을 좋아해요.",
    ],
    traits: ["전략적 마시기", "효율적 관리", "목표 달성"],
    picks: ["전략적 국물", "효율적 선택", "목표 방식"],
    tips: ["국물 마시기 계획", "마시기 방법", "함께 즐기기"],
    match: "ISFP, INFP",
    emoji: "🎯",
  },
  INTJ: {
    label: "완벽 전략형",
    summary: "완벽하게 조합하여 최적의 국물을 만드는 큐레이터형",
    description: [
      "완벽하게 조합하여 국물을 즐기는 당신! 모든 요소를 고려하여 최적의 국물을 만들어요.",
      "혼자 조용히 국물을 마시며, 완벽한 조합을 찾아서 실행해요.",
      "완벽한 국물을 만들어서, 최고의 경험을 만드는 것을 목표로 해요.",
    ],
    traits: ["완벽 마시기", "최적 조합", "품질 중시"],
    picks: ["완벽한 국물", "최적의 조합", "품질 있는 선택"],
    tips: ["국물 마시기 계획", "마시기 방법", "혼자 즐기기"],
    match: "ESFP, ENFP",
    emoji: "📐",
  },
  ESFJ: {
    label: "따뜻한 국물형",
    summary: "따뜻하게 준비하여 모두가 즐거워하는 배려형",
    description: [
      "따뜻하게 준비하여 모두가 즐거워하는 당신! 함께 마시는 사람들이 만족할 수 있도록 국물을 선택해요.",
      "사람들과 함께 국물을 마실 때는 따뜻한 마음으로 준비하고 모두가 함께 즐거워하는 모습을 만들어요.",
      "정돈된 국물 마시기를 좋아하고, 모두가 행복해하는 것을 좋아해요.",
    ],
    traits: ["따뜻한 준비", "모두가 즐거워", "배려 중시"],
    picks: ["따뜻한 국물", "즐거운 분위기", "정돈된 마시기"],
    tips: ["국물 마시기 계획", "마시기 방법", "함께 즐기기"],
    match: "INTP, ISTP",
    emoji: "😊",
  },
  ISFJ: {
    label: "안정 루틴형",
    summary: "안정적으로 루틴을 유지하는 수호자형",
    description: [
      "안정적으로 루틴을 유지하여 국물을 마시는 당신! 항상 같은 방식으로 루틴을 유지해요.",
      "혼자 조용히 국물을 마시며, 안정적인 느낌을 즐겨요.",
      "정해진 국물로 마시고, 그 순간의 평온함을 느끼는 것을 소중히 여겨요.",
    ],
    traits: ["안정적 마시기", "루틴 유지", "일관성"],
    picks: ["기본 국물", "고정된 선택", "안정적인 방식"],
    tips: ["국물 마시기 계획", "마시기 방법", "혼자 즐기기"],
    match: "ENTP, ENFP",
    emoji: "🧸",
  },
  ESFP: {
    label: "즉흥 즐거움형",
    summary: "즉흥적으로 즐거운 국물로 분위기를 띄우는 에너지형",
    description: [
      "즉흥적으로 즐거운 국물로 즐거움을 느끼는 당신! 그때그때 마음에 드는 국물을 선택하고, 즐거운 시간을 만들어요.",
      "사람들과 함께 국물을 마실 때는 즐거운 시간으로 만들고 모두가 즐거워하는 모습을 만들어요.",
      "자연스러운 마시기를 좋아하고, 풍부하게 즐기는 것을 좋아해요.",
    ],
    traits: ["즉흥적 마시기", "즐거운 방법", "에너지 넘침"],
    picks: ["즐거운 국물", "풍부한 선택", "자연스러운 방식"],
    tips: ["국물 마시기 계획", "마시기 방법", "함께 즐기기"],
    match: "INTJ, INFJ",
    emoji: "🎉",
  },
  ISFP: {
    label: "조용한 취향형",
    summary: "조용히 나만의 취향으로 감성적인 국물을 즐기는 미니멀형",
    description: [
      "조용히 나만의 취향으로 감성적인 국물을 즐기는 당신! 특별한 의미가 있는 국물, 감성적인 선택을 좋아해요.",
      "혼자 조용히 국물을 마시며, 그 순간을 즐기고 감성적으로 느껴요.",
      "천천히 마시고, 그 순간의 평온함을 느끼는 것을 좋아해요.",
    ],
    traits: ["조용한 마시기", "나만의 취향", "감성 몰입"],
    picks: ["감성적인 국물", "심플한 선택", "깔끔한 방식"],
    tips: ["국물 마시기 계획", "마시기 방법", "혼자 즐기기"],
    match: "ENTJ, ESTJ",
    emoji: "🌿",
  },
  ESTJ: {
    label: "계획 효율형",
    summary: "계획적으로 효율적인 국물을 선택하는 매니저형",
    description: [
      "계획적으로 효율적인 국물을 선택하는 당신! 목적에 맞는 국물을 미리 정해두고 실행해요.",
      "사람들과 함께 국물을 마실 때는 체계적으로 관리하고, 효율적으로 마셔요.",
      "정돈된 국물 마시기를 좋아하고, 효율적으로 처리하는 것을 좋아해요.",
    ],
    traits: ["계획적 마시기", "효율적 관리", "목표 달성"],
    picks: ["효율적인 국물", "계획된 선택", "목표 방식"],
    tips: ["국물 마시기 계획", "마시기 방법", "함께 즐기기"],
    match: "INFP, ISFP",
    emoji: "📋",
  },
  ISTJ: {
    label: "루틴 전통형",
    summary: "정해진 루틴으로 전통 방식을 유지하는 수호자형",
    description: [
      "정해진 루틴으로 전통 방식으로 국물을 마시는 당신! 항상 같은 방식으로 루틴을 유지해요.",
      "혼자 조용히 국물을 마시며, 안정적인 느낌을 즐겨요.",
      "정해진 국물로 마시고, 그 순간의 평온함을 느끼는 것을 소중히 여겨요.",
    ],
    traits: ["정해진 루틴", "안정적 마시기", "일관성"],
    picks: ["기본 국물", "고정된 선택", "안정적인 방식"],
    tips: ["국물 마시기 계획", "마시기 방법", "혼자 즐기기"],
    match: "ENFP, ESFP",
    emoji: "📦",
  },
  ESTP: {
    label: "즉흥 효율형",
    summary: "즉흥적으로 빠르게 마셔서 효율적으로 즐기는 액션형",
    description: [
      "즉흥적으로 빠르게 국물을 마시는 당신! 그때그때 마음에 드는 국물을 선택하고, 빠르게 처리해요.",
      "사람들과 함께 국물을 마실 때는 분위기를 띄우며, 모두가 즐거워하는 모습을 만들어요.",
      "자연스러운 마시기를 좋아하고, 효율적으로 즐기는 것을 좋아해요.",
    ],
    traits: ["즉흥적 마시기", "빠른 처리", "효율적 즐김"],
    picks: ["즉흥적 국물", "빠른 선택", "자연스러운 방식"],
    tips: ["국물 마시기 계획", "마시기 방법", "함께 즐기기"],
    match: "INFJ, INTP",
    emoji: "⚡",
  },
  ISTP: {
    label: "실용 효율형",
    summary: "실용적으로 필요한 만큼만 마셔서 효율적으로 즐기는 실용가형",
    description: [
      "실용적으로 필요한 만큼만 국물을 마시는 당신! 효율적으로 즐기는 것을 좋아해요.",
      "혼자 조용히 국물을 마시며, 효율적으로 처리하는 것을 목표로 해요.",
      "빠르게 마시고, 실용적으로 즐기며, 간단한 선택을 좋아해요.",
    ],
    traits: ["실용적 마시기", "효율적 처리", "목적 지향"],
    picks: ["실용적인 국물", "효율적인 선택", "간단한 방식"],
    tips: ["국물 마시기 계획", "마시기 방법", "혼자 즐기기"],
    match: "ESFJ, ENFJ",
    emoji: "🛠",
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const mbtiType = (searchParams.get("type") as keyof typeof soupTypes) || "ENFP"
  const resultId = searchParams.get("id") || undefined
  const character = soupTypes[mbtiType]
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
                  className="mb-4 bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                >
                  {mbtiType}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{character.label}</h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium">"{character.summary}"</p>
              </div>

              <div className="flex flex-col items-center space-y-4">
                <ShareButtons
                  testId="soup-eating"
                  testPath="/tests/soup-eating/test"
                  resultType={mbtiType}
                  resultId={loadedResult?.id || resultId}
                  title={`나는 🍲 ${character.label}(${mbtiType})! 너는 어떤 국물러야?`}
                  description={character.summary}
                />
                <Button variant="outline" size="lg" asChild>
                  <Link href="/tests/soup-eating/test">
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
              <span>🍲</span>
              <span>당신의 국물 마시기 스타일</span>
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
              <span>🥣</span>
              <span>당신의 마시기 특징</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.traits.map((trait, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 rounded-lg"
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
              <span>🍜</span>
              <span>추천 국물 스타일</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.picks.map((pick, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 rounded-lg"
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
              <span>국물 마시기 팁</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3">
              {character.tips.map((tip, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="text-orange-500 font-bold">{index + 1}.</span>
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
              <Sparkles className="h-6 w-6 text-orange-500" />
              <span>다른 재미있는 테스트도 해보세요!</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  slug: "breakfast-style",
                  title: "아침식사 스타일",
                  emoji: "🥐",
                  description: "아침식사 선택으로 알아보는 성격",
                  participants: "0",
                },
                {
                  slug: "snack-time",
                  title: "간식 시간대",
                  emoji: "🍪",
                  description: "간식 선택으로 알아보는 성격",
                  participants: "0",
                },
                {
                  slug: "meal-prep",
                  title: "밀프렙 스타일",
                  emoji: "🍱",
                  description: "식사 준비로 알아보는 성격",
                  participants: "0",
                },
                {
                  slug: "taste-preference",
                  title: "맛 선호도",
                  emoji: "🍬",
                  description: "맛 선택으로 알아보는 성격",
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

        <div className="mt-8 text-center">
          <Link href="/tests">
            <Button
              variant="outline"
              className="border-2 border-orange-300 hover:bg-orange-50 font-medium py-6 px-8 bg-transparent"
            >
              다른 테스트하기
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default function SoupEatingResult() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  )
}

