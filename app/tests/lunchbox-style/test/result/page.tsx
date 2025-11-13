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

const lunchboxTypes = {
  ENFP: {
    label: "즉흥 조합형",
    summary: "그때그때 다양한 재료로 조합하는 활발한 타입",
    description: [
      "도시락을 그때그때 다양한 재료로 조합하는 당신! 오늘은 이것, 내일은 저것으로 다양하게 즐겨요.",
      "도시락을 싸는 것도 즐거운 시간으로 만들고, 사진을 찍어서 공유하는 것을 좋아해요.",
      "다양한 재료를 조합해서 새로운 맛을 만들어내는 것을 즐겨요.",
    ],
    traits: ["다양한 조합", "즐거운 준비", "사진 공유"],
    picks: ["다양한 재료", "즐거운 구성", "예쁜 포장"],
    tips: ["영양 균형", "시간 관리", "재료 정리"],
    match: "ISTJ, INTJ",
    emoji: "✨",
  },
  INFP: {
    label: "감성 구성형",
    summary: "나만의 취향으로 조용히 구성하는 감성형",
    description: [
      "도시락을 나만의 취향으로 조용히 구성하는 당신! 특별한 의미가 있는 재료, 감성적인 조합을 좋아해요.",
      "혼자 조용히 도시락을 싸며, 그 순간을 즐기고 감성적으로 느껴요.",
      "도시락을 예쁘게 포장하고, 그 순간을 소중히 여기는 것을 좋아해요.",
    ],
    traits: ["나만의 취향", "감성적 구성", "조용히 즐김"],
    picks: ["감성적인 재료", "예쁜 포장", "특별한 조합"],
    tips: ["영양 균형", "시간 관리", "재료 정리"],
    match: "ENTJ, ESTJ",
    emoji: "🌙",
  },
  ENFJ: {
    label: "체계적 구성형",
    summary: "체계적으로 구성하여 모두가 즐거워하는 리더형",
    description: [
      "도시락을 체계적으로 구성하는 당신! 영양 균형을 고려하고, 모두가 즐거워할 수 있도록 해요.",
      "도시락을 싸는 것도 체계적으로 관리하고, 사진을 찍어서 공유하는 것을 좋아해요.",
      "모두가 만족할 수 있는 구성으로, 배려심 있게 준비해요.",
    ],
    traits: ["체계적 구성", "영양 균형", "배려 중시"],
    picks: ["균형잡힌 구성", "체계적 포장", "예쁜 정리"],
    tips: ["영양 균형", "시간 관리", "재료 정리"],
    match: "INTP, ISTP",
    emoji: "🤝",
  },
  INFJ: {
    label: "의미 있는 구성형",
    summary: "의미 있는 재료로 깊이 있게 구성하는 큐레이터형",
    description: [
      "도시락을 의미 있는 재료로 깊이 있게 구성하는 당신! 단순히 맛이 아니라, 그 재료의 의미를 중요하게 생각해요.",
      "혼자 조용히 도시락을 싸며, 그 순간의 의미를 생각하고 감성적으로 느껴요.",
      "도시락을 예쁘게 포장하고, 그 순간을 소중히 여기는 것을 좋아해요.",
    ],
    traits: ["의미 있는 구성", "깊이 있는 조합", "감성 전달"],
    picks: ["의미 있는 재료", "깊이 있는 조합", "예쁜 포장"],
    tips: ["영양 균형", "시간 관리", "재료 정리"],
    match: "ENFP, ESFP",
    emoji: "📖",
  },
  ENTP: {
    label: "실험 조합형",
    summary: "새로운 재료와 조합을 실험하는 탐구형",
    description: [
      "도시락을 새로운 재료와 조합으로 실험하는 당신! 다양한 조합을 시도하고, 새로운 맛을 탐구해요.",
      "도시락을 싸는 것도 실험의 장으로 만들고, 어떤 조합이 가장 맛있는지 탐구해요.",
      "사람들과 함께 있을 때는 새로운 조합을 제안하며, 모두가 즐거워하는 모습을 만들어요.",
    ],
    traits: ["실험적 조합", "다양한 시도", "탐구 정신"],
    picks: ["새로운 재료", "다양한 조합", "실험적 구성"],
    tips: ["영양 균형", "시간 관리", "재료 정리"],
    match: "ISFJ, ISTJ",
    emoji: "💡",
  },
  INTP: {
    label: "효율 분석형",
    summary: "효율을 분석하여 최적의 구성을 만드는 분석가형",
    description: [
      "도시락을 효율적으로 분석하여 구성하는 당신! 영양, 시간, 비용을 고려하며 선택해요.",
      "혼자 조용히 도시락을 싸며, 효율적으로 영양을 섭취하는 것을 좋아해요.",
      "최적의 구성을 찾아서, 효율적으로 준비하는 것을 목표로 해요.",
    ],
    traits: ["효율 분석", "최적 구성", "논리적 판단"],
    picks: ["효율적 재료", "최적의 조합", "간단한 포장"],
    tips: ["영양 균형", "시간 관리", "재료 정리"],
    match: "ENFJ, ESFJ",
    emoji: "🔬",
  },
  ENTJ: {
    label: "전략 구성형",
    summary: "전략적으로 계획하여 목표에 맞게 구성하는 리더형",
    description: [
      "도시락을 전략적으로 계획하여 구성하는 당신! 목적에 맞는 구성을 미리 정해두고 준비해요.",
      "도시락을 싸는 것도 체계적으로 관리하고, 효율적으로 영양을 섭취해요.",
      "사람들과 함께 있을 때는 모두가 만족할 수 있도록 구성을 조율하고, 목표를 달성해요.",
    ],
    traits: ["전략적 구성", "목표 달성", "효율적 관리"],
    picks: ["목적에 맞는 구성", "전략적 조합", "체계적 포장"],
    tips: ["영양 균형", "시간 관리", "재료 정리"],
    match: "ISFP, INFP",
    emoji: "🎯",
  },
  INTJ: {
    label: "완벽 구성형",
    summary: "완벽한 구성을 만들어 최적의 경험을 만드는 큐레이터형",
    description: [
      "도시락을 완벽한 구성으로 만드는 당신! 모든 요소를 고려하여 최적의 구성을 만들어요.",
      "혼자 조용히 도시락을 싸며, 완벽한 조합을 찾아서 실행해요.",
      "완벽한 구성을 만들어서, 최고의 경험을 만드는 것을 목표로 해요.",
    ],
    traits: ["완벽 구성", "최적 조합", "품질 중시"],
    picks: ["완벽한 재료", "최적의 조합", "예쁜 포장"],
    tips: ["영양 균형", "시간 관리", "재료 정리"],
    match: "ESFP, ENFP",
    emoji: "📐",
  },
  ESFJ: {
    label: "따뜻한 구성형",
    summary: "따뜻하게 구성하여 모두가 즐거워하는 배려형",
    description: [
      "도시락을 따뜻하게 구성하는 당신! 모두가 즐거워할 수 있는 구성을 골라요.",
      "도시락을 싸는 것도 따뜻한 마음으로 준비하고, 사진을 찍어서 공유하는 것을 좋아해요.",
      "모두가 만족할 수 있는 구성으로, 배려심 있게 준비해요.",
    ],
    traits: ["따뜻한 구성", "모두가 즐거워", "배려 중시"],
    picks: ["따뜻한 재료", "즐거운 구성", "예쁜 포장"],
    tips: ["영양 균형", "시간 관리", "재료 정리"],
    match: "INTP, ISTP",
    emoji: "😊",
  },
  ISFJ: {
    label: "안정 구성형",
    summary: "안정적인 구성으로 루틴을 유지하는 수호자형",
    description: [
      "도시락을 안정적인 구성으로 만드는 당신! 항상 같은 구성으로 루틴을 유지해요.",
      "혼자 조용히 도시락을 싸며, 안정적인 느낌을 즐겨요.",
      "도시락을 예쁘게 포장하고, 그 순간의 평온함을 느끼는 것을 소중히 여겨요.",
    ],
    traits: ["안정적 구성", "루틴 유지", "일관성"],
    picks: ["안정적인 재료", "정해진 구성", "예쁜 포장"],
    tips: ["영양 균형", "시간 관리", "재료 정리"],
    match: "ENTP, ENFP",
    emoji: "🧸",
  },
  ESFP: {
    label: "즉흥 즐거움형",
    summary: "즉흥적으로 즐거운 구성을 만드는 에너지형",
    description: [
      "도시락을 즉흥적으로 즐거운 구성으로 만드는 당신! 그때그때 재료를 고르고, 즐거운 조합을 만들어요.",
      "도시락을 싸는 것도 즐거운 시간으로 만들고, 사진을 찍어서 공유하는 것을 좋아해요.",
      "사람들과 함께 있을 때는 모두가 즐거워하는 모습을 만들어요.",
    ],
    traits: ["즉흥적 구성", "즐거운 조합", "에너지 넘침"],
    picks: ["즐거운 재료", "즐거운 구성", "예쁜 포장"],
    tips: ["영양 균형", "시간 관리", "재료 정리"],
    match: "INTJ, INFJ",
    emoji: "🎉",
  },
  ISFP: {
    label: "조용한 취향형",
    summary: "조용히 나만의 취향으로 구성하는 미니멀형",
    description: [
      "도시락을 조용히 나만의 취향으로 구성하는 당신! 특별한 의미가 있는 재료, 감성적인 조합을 좋아해요.",
      "혼자 조용히 도시락을 싸며, 그 순간을 즐기고 감성적으로 느껴요.",
      "도시락을 심플하게 포장하고, 그 순간의 평온함을 느끼는 것을 좋아해요.",
    ],
    traits: ["조용한 구성", "나만의 취향", "감성 몰입"],
    picks: ["감성적인 재료", "심플한 구성", "깔끔한 포장"],
    tips: ["영양 균형", "시간 관리", "재료 정리"],
    match: "ENTJ, ESTJ",
    emoji: "🌿",
  },
  ESTJ: {
    label: "계획 효율형",
    summary: "계획적으로 효율적인 구성을 만드는 매니저형",
    description: [
      "도시락을 계획적으로 효율적인 구성으로 만드는 당신! 목적에 맞는 구성을 미리 정해두고 준비해요.",
      "도시락을 싸는 것도 체계적으로 관리하고, 효율적으로 영양을 섭취해요.",
      "사람들과 함께 있을 때는 모두가 만족할 수 있도록 구성을 조율하고, 효율적으로 처리해요.",
    ],
    traits: ["계획적 구성", "효율적 관리", "목표 달성"],
    picks: ["효율적 재료", "계획된 구성", "체계적 포장"],
    tips: ["영양 균형", "시간 관리", "재료 정리"],
    match: "INFP, ISFP",
    emoji: "📋",
  },
  ISTJ: {
    label: "루틴 수호형",
    summary: "정해진 루틴으로 안정적인 구성을 유지하는 수호자형",
    description: [
      "도시락을 정해진 루틴으로 안정적인 구성으로 만드는 당신! 항상 같은 구성으로 루틴을 유지해요.",
      "혼자 조용히 도시락을 싸며, 안정적인 느낌을 즐겨요.",
      "도시락을 예쁘게 포장하고, 그 순간의 평온함을 느끼는 것을 소중히 여겨요.",
    ],
    traits: ["정해진 루틴", "안정적 구성", "일관성"],
    picks: ["안정적인 재료", "정해진 구성", "예쁜 포장"],
    tips: ["영양 균형", "시간 관리", "재료 정리"],
    match: "ENFP, ESFP",
    emoji: "📦",
  },
  ESTP: {
    label: "즉흥 효율형",
    summary: "즉흥적으로 빠르게 구성하여 효율적으로 즐기는 액션형",
    description: [
      "도시락을 즉흥적으로 빠르게 구성하는 당신! 그때그때 재료를 고르고, 빠르게 준비해요.",
      "도시락을 싸는 것도 효율적으로 처리하고, 빠르게 즐기는 것을 좋아해요.",
      "사람들과 함께 있을 때는 분위기를 띄우며, 모두가 즐거워하는 모습을 만들어요.",
    ],
    traits: ["즉흥적 구성", "빠른 처리", "효율적 즐김"],
    picks: ["즉흥적 재료", "빠른 구성", "간단한 포장"],
    tips: ["영양 균형", "시간 관리", "재료 정리"],
    match: "INFJ, INTP",
    emoji: "⚡",
  },
  ISTP: {
    label: "실용 구성형",
    summary: "실용적으로 필요한 재료만 사용하여 효율적으로 구성하는 실용가형",
    description: [
      "도시락을 실용적으로 필요한 재료만 사용하여 구성하는 당신! 효율적으로 영양을 섭취하는 것을 좋아해요.",
      "혼자 조용히 도시락을 싸며, 효율적으로 처리하는 것을 목표로 해요.",
      "도시락을 간단하게 포장하고, 실용적으로 즐기는 것을 좋아해요.",
    ],
    traits: ["실용적 구성", "효율적 처리", "목적 지향"],
    picks: ["실용적 재료", "간단한 구성", "효율적 포장"],
    tips: ["영양 균형", "시간 관리", "재료 정리"],
    match: "ESFJ, ENFJ",
    emoji: "🛠",
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const mbtiType = (searchParams.get("type") as keyof typeof lunchboxTypes) || "ENFP"
  const resultId = searchParams.get("id") || undefined
  const character = lunchboxTypes[mbtiType]
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
                  className="mb-4 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                >
                  {mbtiType}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{character.label}</h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium">"{character.summary}"</p>
              </div>

              <div className="flex flex-col items-center space-y-4">
                <ShareButtons
                  testId="lunchbox-style"
                  testPath="/tests/lunchbox-style/test"
                  resultType={mbtiType}
                  resultId={loadedResult?.id || resultId}
                  title={`나는 🍱 ${character.label}(${mbtiType})! 너는 어떤 도시락러야?`}
                  description={character.summary}
                />
                <Button variant="outline" size="lg" asChild>
                  <Link href="/tests/lunchbox-style/test">
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
              <span>🍱</span>
              <span>당신의 도시락 스타일</span>
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
              <span>🥢</span>
              <span>당신의 구성 특징</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.traits.map((trait, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 rounded-lg"
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
              <span>추천 구성 스타일</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.picks.map((pick, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 rounded-lg"
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
              <span>도시락 팁</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3">
              {character.tips.map((tip, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="text-amber-500 font-bold">{index + 1}.</span>
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
              <Sparkles className="h-6 w-6 text-amber-500" />
              <span>다른 재미있는 테스트도 해보세요!</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  slug: "soup-vs-bibim",
                  title: "국물 vs 비빔 스타일",
                  emoji: "🍜",
                  description: "국물파 vs 비빔파로 알아보는 성격",
                  participants: "0",
                },
                {
                  slug: "karaoke-song",
                  title: "노래방 곡 선택",
                  emoji: "🎤",
                  description: "노래방 곡 선택으로 알아보는 성격",
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
              className="border-2 border-amber-300 hover:bg-amber-50 font-medium py-6 px-8 bg-transparent"
            >
              다른 테스트하기
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default function LunchboxStyleResult() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  )
}

