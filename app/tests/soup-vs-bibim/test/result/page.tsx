"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, UtensilsCrossed, Sparkles } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { ShareButtons } from "@/components/share-buttons"
import { getTestResult } from "@/lib/api-client"

const soupBibimTypes = {
  ENFP: {
    label: "즉흥 조합형",
    summary: "국물과 비빔을 그때그때 조합하는 활발한 타입",
    description: [
      "국물과 비빔을 그때그때 조합하는 당신! 오늘은 국물, 내일은 비빔으로 다양하게 즐겨요.",
      "음식을 먹을 때도 분위기에 맞춰서 선택하고, 모두가 즐거워하는 메뉴를 골라요.",
      "국물도 좋고 비빔도 좋아서, 상황에 맞게 선택하는 유연한 스타일이에요.",
    ],
    traits: ["유연한 선택", "다양한 조합", "분위기 중시"],
    picks: ["국물 있는 음식", "비빔 음식", "조합 메뉴"],
    tips: ["영양 균형", "다양한 시도", "상황에 맞게"],
    match: "ISTJ, INTJ",
    emoji: "✨",
  },
  INFP: {
    label: "감성 국물형",
    summary: "국물의 따뜻함으로 위로받는 감성형",
    description: [
      "국물 있는 음식을 선호하는 당신! 국물의 따뜻함으로 위로받고, 감성적으로 느껴요.",
      "국물까지 다 마시며, 그 따뜻함을 온전히 느끼는 것을 좋아해요.",
      "혼자 조용히 국물 있는 음식을 먹으며, 그 순간의 평온함을 즐겨요.",
    ],
    traits: ["국물 선호", "따뜻함 중시", "감성적 즐김"],
    picks: ["국물 있는 음식", "따뜻한 국물", "감성적인 메뉴"],
    tips: ["나트륨 관리", "다양한 시도", "영양 균형"],
    match: "ENTJ, ESTJ",
    emoji: "🌙",
  },
  ENFJ: {
    label: "소통 조합형",
    summary: "모두가 즐거워할 메뉴로 소통하는 리더형",
    description: [
      "모두가 즐거워할 메뉴를 선택하는 당신! 국물과 비빔을 조합해서 모두가 만족할 수 있도록 해요.",
      "음식을 먹을 때도 분위기를 띄우고, 모두가 함께 즐길 수 있는 메뉴를 골라요.",
      "국물도 좋고 비빔도 좋아서, 상황에 맞게 선택하는 배려심 있는 스타일이에요.",
    ],
    traits: ["모두가 즐거워", "조합 중시", "소통 활발"],
    picks: ["국물 있는 음식", "비빔 음식", "조합 메뉴"],
    tips: ["영양 균형", "다양한 시도", "상황에 맞게"],
    match: "INTP, ISTP",
    emoji: "🤝",
  },
  INFJ: {
    label: "의미 있는 선택형",
    summary: "의미 있는 메뉴를 선택하여 깊이 있게 즐기는 큐레이터형",
    description: [
      "의미 있는 메뉴를 선택하는 당신! 단순히 맛이 아니라, 그 음식의 의미를 중요하게 생각해요.",
      "국물의 따뜻함이나 비빔의 조합의 재미를 깊이 있게 느끼며, 그 순간을 소중히 여겨요.",
      "혼자 조용히 음식을 먹으며, 그 순간의 감정과 의미를 느끼는 것을 좋아해요.",
    ],
    traits: ["의미 있는 선택", "깊이 있는 즐김", "감성 전달"],
    picks: ["의미 있는 메뉴", "깊이 있는 맛", "감성적인 음식"],
    tips: ["영양 균형", "다양한 시도", "상황에 맞게"],
    match: "ENFP, ESFP",
    emoji: "📖",
  },
  ENTP: {
    label: "실험 조합형",
    summary: "국물과 비빔을 실험적으로 조합하는 탐구형",
    description: [
      "국물과 비빔을 실험적으로 조합하는 당신! 새로운 조합을 시도하고, 다양한 맛을 탐구해요.",
      "음식을 먹을 때도 다양한 방법을 시도하며, 어떤 조합이 가장 맛있는지 탐구해요.",
      "사람들과 함께 있을 때는 새로운 조합을 제안하며, 모두가 즐거워하는 모습을 만들어요.",
    ],
    traits: ["실험적 조합", "다양한 시도", "탐구 정신"],
    picks: ["새로운 조합", "다양한 메뉴", "실험적 방법"],
    tips: ["영양 균형", "다양한 시도", "상황에 맞게"],
    match: "ISFJ, ISTJ",
    emoji: "💡",
  },
  INTP: {
    label: "분석 효율형",
    summary: "효율을 분석하여 최적의 메뉴를 선택하는 분석가형",
    description: [
      "효율을 분석하여 최적의 메뉴를 선택하는 당신! 영양, 가격, 시간을 고려하며 선택해요.",
      "국물과 비빔의 장단점을 분석하고, 상황에 맞는 최적의 선택을 해요.",
      "혼자 조용히 음식을 먹으며, 효율적으로 영양을 섭취하는 것을 좋아해요.",
    ],
    traits: ["효율 분석", "최적 선택", "논리적 판단"],
    picks: ["효율적 메뉴", "최적의 선택", "논리적 조합"],
    tips: ["영양 균형", "다양한 시도", "상황에 맞게"],
    match: "ENFJ, ESFJ",
    emoji: "🔬",
  },
  ENTJ: {
    label: "전략 선택형",
    summary: "전략적으로 계획하여 목표에 맞게 선택하는 리더형",
    description: [
      "전략적으로 계획하여 메뉴를 선택하는 당신! 목적에 맞는 메뉴를 미리 정해두고 선택해요.",
      "국물과 비빔을 목적에 맞게 선택하며, 효율적으로 영양을 섭취해요.",
      "사람들과 함께 있을 때는 모두가 만족할 수 있도록 메뉴를 조율하고, 목표를 달성해요.",
    ],
    traits: ["전략적 선택", "목표 달성", "효율적 관리"],
    picks: ["목적에 맞는 메뉴", "전략적 조합", "효율적 선택"],
    tips: ["영양 균형", "다양한 시도", "상황에 맞게"],
    match: "ISFP, INFP",
    emoji: "🎯",
  },
  INTJ: {
    label: "완벽 선택형",
    summary: "완벽한 메뉴를 선택하여 최적의 경험을 만드는 큐레이터형",
    description: [
      "완벽한 메뉴를 선택하는 당신! 모든 요소를 고려하여 최적의 선택을 해요.",
      "국물과 비빔의 완벽한 조합을 찾아서, 최고의 맛을 만드는 것을 좋아해요.",
      "혼자 조용히 음식을 먹으며, 완벽한 경험을 만드는 것을 목표로 해요.",
    ],
    traits: ["완벽 선택", "최적 조합", "품질 중시"],
    picks: ["완벽한 메뉴", "최적의 조합", "품질 있는 음식"],
    tips: ["영양 균형", "다양한 시도", "상황에 맞게"],
    match: "ESFP, ENFP",
    emoji: "📐",
  },
  ESFJ: {
    label: "따뜻한 조합형",
    summary: "따뜻하게 조합하여 모두가 즐거워하는 배려형",
    description: [
      "따뜻하게 조합하여 메뉴를 선택하는 당신! 모두가 즐거워할 수 있는 메뉴를 골라요.",
      "국물의 따뜻함과 비빔의 재미를 조합해서, 모두가 만족할 수 있도록 해요.",
      "사람들과 함께 있을 때는 모두가 즐거워하는 모습을 만들어요.",
    ],
    traits: ["따뜻한 조합", "모두가 즐거워", "배려 중시"],
    picks: ["따뜻한 메뉴", "조합 메뉴", "즐거운 음식"],
    tips: ["영양 균형", "다양한 시도", "상황에 맞게"],
    match: "INTP, ISTP",
    emoji: "😊",
  },
  ISFJ: {
    label: "안정 국물형",
    summary: "안정적인 국물 음식으로 루틴을 유지하는 수호자형",
    description: [
      "안정적인 국물 음식을 선호하는 당신! 항상 같은 메뉴로 루틴을 유지해요.",
      "국물의 따뜻함으로 위로받고, 안정적인 느낌을 즐겨요.",
      "혼자 조용히 국물 있는 음식을 먹으며, 그 순간의 평온함을 느끼는 것을 소중히 여겨요.",
    ],
    traits: ["안정적 선택", "국물 선호", "루틴 유지"],
    picks: ["국물 있는 음식", "안정적인 메뉴", "따뜻한 음식"],
    tips: ["영양 균형", "다양한 시도", "상황에 맞게"],
    match: "ENTP, ENFP",
    emoji: "🧸",
  },
  ESFP: {
    label: "즉흥 비빔형",
    summary: "즉흥적으로 비빔 음식으로 즐거움을 만드는 에너지형",
    description: [
      "즉흥적으로 비빔 음식을 선택하는 당신! 비빔의 재미와 조합의 즐거움을 좋아해요.",
      "음식을 먹을 때도 분위기를 띄우고, 모두가 즐거워하는 모습을 만들어요.",
      "사람들과 함께 있을 때는 비빔의 재미를 나누며, 모두가 즐거워하는 모습을 만들어요.",
    ],
    traits: ["즉흥적 선택", "비빔 선호", "즐거움 중시"],
    picks: ["비빔 음식", "즐거운 메뉴", "조합의 재미"],
    tips: ["영양 균형", "다양한 시도", "상황에 맞게"],
    match: "INTJ, INFJ",
    emoji: "🎉",
  },
  ISFP: {
    label: "조용한 비빔형",
    summary: "조용히 비빔 음식을 즐기는 미니멀형",
    description: [
      "조용히 비빔 음식을 즐기는 당신! 비빔의 조합의 재미를 혼자 조용히 즐겨요.",
      "음식을 먹을 때도 조용히 즐기며, 그 순간의 감정을 느끼는 것을 소중히 여겨요.",
      "혼자 조용히 비빔 음식을 먹으며, 그 순간의 평온함을 느끼는 것을 좋아해요.",
    ],
    traits: ["조용한 즐김", "비빔 선호", "감성 몰입"],
    picks: ["비빔 음식", "조용한 메뉴", "감성적인 음식"],
    tips: ["영양 균형", "다양한 시도", "상황에 맞게"],
    match: "ENTJ, ESTJ",
    emoji: "🌿",
  },
  ESTJ: {
    label: "계획 효율형",
    summary: "계획적으로 효율적인 메뉴를 선택하는 매니저형",
    description: [
      "계획적으로 효율적인 메뉴를 선택하는 당신! 목적에 맞는 메뉴를 미리 정해두고 선택해요.",
      "국물과 비빔을 효율적으로 선택하며, 목표를 달성하는 것을 좋아해요.",
      "사람들과 함께 있을 때는 모두가 만족할 수 있도록 메뉴를 조율하고, 효율적으로 처리해요.",
    ],
    traits: ["계획적 선택", "효율적 관리", "목표 달성"],
    picks: ["효율적 메뉴", "계획된 선택", "목표 메뉴"],
    tips: ["영양 균형", "다양한 시도", "상황에 맞게"],
    match: "INFP, ISFP",
    emoji: "📋",
  },
  ISTJ: {
    label: "루틴 국물형",
    summary: "정해진 루틴으로 안정적인 국물 음식을 즐기는 수호자형",
    description: [
      "정해진 루틴으로 안정적인 국물 음식을 즐기는 당신! 항상 같은 메뉴로 루틴을 유지해요.",
      "국물의 따뜻함으로 위로받고, 안정적인 느낌을 즐겨요.",
      "혼자 조용히 국물 있는 음식을 먹으며, 그 순간의 평온함을 느끼는 것을 소중히 여겨요.",
    ],
    traits: ["정해진 루틴", "안정적 선택", "일관성"],
    picks: ["국물 있는 음식", "안정적인 메뉴", "따뜻한 음식"],
    tips: ["영양 균형", "다양한 시도", "상황에 맞게"],
    match: "ENFP, ESFP",
    emoji: "📦",
  },
  ESTP: {
    label: "즉흥 효율형",
    summary: "즉흥적으로 빠르게 선택하여 효율적으로 즐기는 액션형",
    description: [
      "즉흥적으로 빠르게 메뉴를 선택하는 당신! 상황에 맞게 빠르게 선택해요.",
      "국물과 비빔을 그때그때 선택하며, 효율적으로 즐기는 것을 좋아해요.",
      "사람들과 함께 있을 때는 분위기를 띄우며, 모두가 즐거워하는 모습을 만들어요.",
    ],
    traits: ["즉흥적 선택", "빠른 처리", "효율적 즐김"],
    picks: ["즉흥적 메뉴", "빠른 선택", "효율적 조합"],
    tips: ["영양 균형", "다양한 시도", "상황에 맞게"],
    match: "INFJ, INTP",
    emoji: "⚡",
  },
  ISTP: {
    label: "실용 선택형",
    summary: "실용적으로 필요한 메뉴만 선택하여 효율적으로 즐기는 실용가형",
    description: [
      "실용적으로 필요한 메뉴만 선택하는 당신! 효율적으로 영양을 섭취하는 것을 좋아해요.",
      "국물과 비빔을 실용적으로 선택하며, 목적에 맞게 즐기는 것을 좋아해요.",
      "혼자 조용히 음식을 먹으며, 효율적으로 처리하는 것을 목표로 해요.",
    ],
    traits: ["실용적 선택", "효율적 처리", "목적 지향"],
    picks: ["실용적 메뉴", "효율적 선택", "목적 메뉴"],
    tips: ["영양 균형", "다양한 시도", "상황에 맞게"],
    match: "ESFJ, ENFJ",
    emoji: "🛠",
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const mbtiType = (searchParams.get("type") as keyof typeof soupBibimTypes) || "ENFP"
  const resultId = searchParams.get("id") || undefined
  const character = soupBibimTypes[mbtiType]
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
                  className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                >
                  {mbtiType}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{character.label}</h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium">"{character.summary}"</p>
              </div>

              <div className="flex flex-col items-center space-y-4">
                <ShareButtons
                  testId="soup-vs-bibim"
                  testPath="/tests/soup-vs-bibim/test"
                  resultType={mbtiType}
                  resultId={loadedResult?.id || resultId}
                  title={`나는 🍜 ${character.label}(${mbtiType})! 너는 국물파야 비빔파야?`}
                  description={character.summary}
                />
                <Button variant="outline" size="lg" asChild>
                  <Link href="/tests/soup-vs-bibim/test">
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
              <span>🍜</span>
              <span>당신의 선호 스타일</span>
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
              <span>🍲</span>
              <span>당신의 선택 특징</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.traits.map((trait, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950 rounded-lg"
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
              <span>🍽️</span>
              <span>추천 메뉴 스타일</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.picks.map((pick, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950 rounded-lg"
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
              <span>선택 팁</span>
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
              <Sparkles className="h-6 w-6 text-blue-500" />
              <span>다른 재미있는 테스트도 해보세요!</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  slug: "karaoke-song",
                  title: "노래방 곡 선택",
                  emoji: "🎤",
                  description: "노래방 곡 선택으로 알아보는 성격",
                  participants: "0",
                },
                {
                  slug: "gift-wrapping",
                  title: "포장지 뜯는 스타일",
                  emoji: "🎁",
                  description: "포장지 뜯는 방식으로 알아보는 성격",
                  participants: "0",
                },
                {
                  slug: "pizza-topping",
                  title: "피자 토핑 선택",
                  emoji: "🍕",
                  description: "피자 토핑으로 알아보는 성격",
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

export default function SoupVsBibimResult() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  )
}

