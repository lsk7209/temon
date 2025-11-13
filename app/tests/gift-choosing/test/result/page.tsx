"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, Gift, Sparkles } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { ShareButtons } from "@/components/share-buttons"
import { getTestResult } from "@/lib/api-client"

const giftTypes = {
  ENFP: {
    label: "즉흥 감성형",
    summary: "즉흥적으로 감성적인 선물을 고르는 활발한 타입",
    description: [
      "즉흥적으로 감성적인 선물을 고르는 당신! 그때그때 마음에 드는 선물을 선택하고, 예쁘게 포장해요.",
      "선물을 고를 때도 기대감이 넘치고, 받는 사람이 좋아할 모습을 상상하며 즐거워해요.",
      "사람들과 함께 선물을 고르며, 모두가 즐거워하는 모습을 만들어요.",
    ],
    traits: ["즉흥적 선택", "감성 중시", "예쁜 포장"],
    picks: ["감성적인 선물", "특별한 의미", "예쁜 포장"],
    tips: ["예산 관리", "실용성 고려", "시간 관리"],
    match: "ISTJ, INTJ",
    emoji: "✨",
  },
  INFP: {
    label: "의미 깊은 선택형",
    summary: "의미 깊은 선물을 조용히 고르는 감성형",
    description: [
      "의미 깊은 선물을 조용히 고르는 당신! 특별한 의미가 있는 선물, 감성적인 선물을 좋아해요.",
      "혼자 조용히 선물을 고르며, 그 순간의 의미를 생각하고 감성적으로 느껴요.",
      "선물을 예쁘게 포장하고, 그 순간을 소중히 여기는 것을 좋아해요.",
    ],
    traits: ["의미 깊은 선택", "조용히 고르기", "감성 중시"],
    picks: ["의미 있는 선물", "감성적인 선물", "예쁜 포장"],
    tips: ["예산 관리", "실용성 고려", "시간 관리"],
    match: "ENTJ, ESTJ",
    emoji: "🌙",
  },
  ENFJ: {
    label: "따뜻한 배려형",
    summary: "따뜻하게 배려하여 모두가 즐거워하는 리더형",
    description: [
      "따뜻하게 배려하여 선물을 고르는 당신! 모두가 즐거워할 수 있는 선물을 골라요.",
      "선물을 고를 때도 따뜻한 마음으로 준비하고, 예쁘게 포장해요.",
      "사람들과 함께 선물을 고르며, 모두가 행복해하는 것을 좋아해요.",
    ],
    traits: ["따뜻한 배려", "모두가 즐거워", "예쁜 포장"],
    picks: ["배려하는 선물", "즐거운 선물", "예쁜 포장"],
    tips: ["예산 관리", "실용성 고려", "시간 관리"],
    match: "INTP, ISTP",
    emoji: "🤝",
  },
  INFJ: {
    label: "완벽한 의미형",
    summary: "완벽한 의미를 가진 선물을 선택하는 큐레이터형",
    description: [
      "완벽한 의미를 가진 선물을 선택하는 당신! 단순히 선물이 아니라, 그 선물의 의미를 중요하게 생각해요.",
      "혼자 조용히 선물을 고르며, 그 순간의 의미를 생각하고 감성적으로 느껴요.",
      "선물을 예쁘게 포장하고, 그 순간을 소중히 여기는 것을 좋아해요.",
    ],
    traits: ["완벽한 의미", "깊이 있는 선택", "감성 전달"],
    picks: ["완벽한 선물", "의미 있는 선물", "예쁜 포장"],
    tips: ["예산 관리", "실용성 고려", "시간 관리"],
    match: "ENFP, ESFP",
    emoji: "📖",
  },
  ENTP: {
    label: "실험적 선택형",
    summary: "새로운 선물 아이디어를 실험하는 탐구형",
    description: [
      "새로운 선물 아이디어를 실험하는 당신! 다양한 선물을 시도하고, 독특한 선물을 탐구해요.",
      "선물을 고를 때도 다양한 옵션을 시도하며, 어떤 선물이 가장 좋은지 탐구해요.",
      "사람들과 함께 선물을 고르며, 새로운 아이디어를 제안하는 것을 좋아해요.",
    ],
    traits: ["실험적 선택", "다양한 시도", "탐구 정신"],
    picks: ["새로운 선물", "독특한 선물", "실험적 아이디어"],
    tips: ["예산 관리", "실용성 고려", "시간 관리"],
    match: "ISFJ, ISTJ",
    emoji: "💡",
  },
  INTP: {
    label: "분석 실용형",
    summary: "분석하여 실용적인 선물을 선택하는 분석가형",
    description: [
      "분석하여 실용적인 선물을 선택하는 당신! 필요성과 효율성을 고려하며 선택해요.",
      "혼자 조용히 선물을 고르며, 논리적으로 분석하고 효율적으로 선택해요.",
      "선물을 간단하게 포장하고, 실용적으로 처리하는 것을 좋아해요.",
    ],
    traits: ["분석적 선택", "실용 중시", "효율적 포장"],
    picks: ["실용적인 선물", "효율적인 선물", "간단한 포장"],
    tips: ["예산 관리", "감성 고려", "시간 관리"],
    match: "ENFJ, ESFJ",
    emoji: "🔬",
  },
  ENTJ: {
    label: "전략 효율형",
    summary: "전략적으로 계획하여 효율적인 선물을 선택하는 리더형",
    description: [
      "전략적으로 계획하여 선물을 선택하는 당신! 목적에 맞는 선물을 미리 정해두고 선택해요.",
      "선물을 고를 때도 효율적으로 관리하고, 목표를 달성하는 것을 좋아해요.",
      "사람들과 함께 선물을 고르며, 모두가 만족할 수 있도록 조율하고, 효율적으로 처리해요.",
    ],
    traits: ["전략적 선택", "효율적 관리", "목표 달성"],
    picks: ["효율적인 선물", "목적에 맞는 선물", "체계적 포장"],
    tips: ["예산 관리", "감성 고려", "시간 관리"],
    match: "ISFP, INFP",
    emoji: "🎯",
  },
  INTJ: {
    label: "완벽 분석형",
    summary: "완벽하게 분석하여 최적의 선물을 선택하는 큐레이터형",
    description: [
      "완벽하게 분석하여 최적의 선물을 선택하는 당신! 모든 요소를 고려하여 최적의 선택을 해요.",
      "혼자 조용히 선물을 고르며, 완벽한 선물을 찾아서 실행해요.",
      "선물을 예쁘게 포장하고, 완벽한 경험을 만드는 것을 목표로 해요.",
    ],
    traits: ["완벽 분석", "최적 선택", "품질 중시"],
    picks: ["완벽한 선물", "최적의 선택", "예쁜 포장"],
    tips: ["예산 관리", "실용성 고려", "시간 관리"],
    match: "ESFP, ENFP",
    emoji: "📐",
  },
  ESFJ: {
    label: "따뜻한 배려형",
    summary: "따뜻하게 배려하여 모두가 즐거워하는 배려형",
    description: [
      "따뜻하게 배려하여 선물을 고르는 당신! 모두가 즐거워할 수 있는 선물을 골라요.",
      "선물을 고를 때도 따뜻한 마음으로 준비하고, 예쁘게 포장해요.",
      "사람들과 함께 선물을 고르며, 모두가 행복해하는 것을 좋아해요.",
    ],
    traits: ["따뜻한 배려", "모두가 즐거워", "예쁜 포장"],
    picks: ["배려하는 선물", "즐거운 선물", "예쁜 포장"],
    tips: ["예산 관리", "실용성 고려", "시간 관리"],
    match: "INTP, ISTP",
    emoji: "😊",
  },
  ISFJ: {
    label: "안정 배려형",
    summary: "안정적으로 배려하여 루틴을 유지하는 수호자형",
    description: [
      "안정적으로 배려하여 선물을 고르는 당신! 항상 같은 스타일로 루틴을 유지해요.",
      "혼자 조용히 선물을 고르며, 안정적인 느낌을 즐겨요.",
      "선물을 예쁘게 포장하고, 그 순간의 평온함을 느끼는 것을 소중히 여겨요.",
    ],
    traits: ["안정적 선택", "배려 중시", "루틴 유지"],
    picks: ["안정적인 선물", "배려하는 선물", "예쁜 포장"],
    tips: ["예산 관리", "실용성 고려", "시간 관리"],
    match: "ENTP, ENFP",
    emoji: "🧸",
  },
  ESFP: {
    label: "즉흥 즐거움형",
    summary: "즉흥적으로 즐거운 선물로 분위기를 띄우는 에너지형",
    description: [
      "즉흥적으로 즐거운 선물을 고르는 당신! 그때그때 마음에 드는 선물을 선택하고, 즐거운 시간을 만들어요.",
      "선물을 고를 때도 즐거운 시간으로 만들고, 사람들과 함께 즐거워하는 모습을 만들어요.",
      "사람들과 함께 선물을 고르며, 모두가 즐거워하는 모습을 만들어요.",
    ],
    traits: ["즉흥적 선택", "즐거운 선물", "에너지 넘침"],
    picks: ["즐거운 선물", "인기 선물", "예쁜 포장"],
    tips: ["예산 관리", "실용성 고려", "시간 관리"],
    match: "INTJ, INFJ",
    emoji: "🎉",
  },
  ISFP: {
    label: "조용한 감성형",
    summary: "조용히 나만의 취향으로 감성적인 선물을 고르는 미니멀형",
    description: [
      "조용히 나만의 취향으로 감성적인 선물을 고르는 당신! 특별한 의미가 있는 선물, 감성적인 선물을 좋아해요.",
      "혼자 조용히 선물을 고르며, 그 순간을 즐기고 감성적으로 느껴요.",
      "선물을 심플하게 포장하고, 그 순간의 평온함을 느끼는 것을 좋아해요.",
    ],
    traits: ["조용한 선택", "나만의 취향", "감성 몰입"],
    picks: ["감성적인 선물", "심플한 선물", "깔끔한 포장"],
    tips: ["예산 관리", "실용성 고려", "시간 관리"],
    match: "ENTJ, ESTJ",
    emoji: "🌿",
  },
  ESTJ: {
    label: "계획 실용형",
    summary: "계획적으로 실용적인 선물을 선택하는 매니저형",
    description: [
      "계획적으로 실용적인 선물을 선택하는 당신! 목적에 맞는 선물을 미리 정해두고 선택해요.",
      "선물을 고를 때도 체계적으로 관리하고, 효율적으로 처리해요.",
      "사람들과 함께 선물을 고르며, 모두가 만족할 수 있도록 조율하고, 효율적으로 처리해요.",
    ],
    traits: ["계획적 선택", "실용 중시", "효율적 관리"],
    picks: ["실용적인 선물", "계획된 선물", "효율적 포장"],
    tips: ["예산 관리", "감성 고려", "시간 관리"],
    match: "INFP, ISFP",
    emoji: "📋",
  },
  ISTJ: {
    label: "루틴 실용형",
    summary: "정해진 루틴으로 안정적인 실용 선물을 선택하는 수호자형",
    description: [
      "정해진 루틴으로 안정적인 실용 선물을 선택하는 당신! 항상 같은 스타일로 루틴을 유지해요.",
      "혼자 조용히 선물을 고르며, 안정적인 느낌을 즐겨요.",
      "선물을 간단하게 포장하고, 그 순간의 평온함을 느끼는 것을 소중히 여겨요.",
    ],
    traits: ["정해진 루틴", "안정적 선택", "일관성"],
    picks: ["안정적인 선물", "실용적인 선물", "간단한 포장"],
    tips: ["예산 관리", "감성 고려", "시간 관리"],
    match: "ENFP, ESFP",
    emoji: "📦",
  },
  ESTP: {
    label: "즉흥 실용형",
    summary: "즉흥적으로 빠르게 실용적인 선물을 선택하는 액션형",
    description: [
      "즉흥적으로 빠르게 실용적인 선물을 선택하는 당신! 그때그때 마음에 드는 선물을 선택하고, 빠르게 처리해요.",
      "선물을 고를 때도 빠르게 처리하고, 효율적으로 즐기는 것을 좋아해요.",
      "사람들과 함께 선물을 고르며, 분위기를 띄우는 것을 좋아해요.",
    ],
    traits: ["즉흥적 선택", "빠른 처리", "효율적 즐김"],
    picks: ["즉흥적 선물", "빠른 선택", "간단한 포장"],
    tips: ["예산 관리", "감성 고려", "시간 관리"],
    match: "INFJ, INTP",
    emoji: "⚡",
  },
  ISTP: {
    label: "실용 효율형",
    summary: "실용적으로 필요한 선물만 선택하여 효율적으로 처리하는 실용가형",
    description: [
      "실용적으로 필요한 선물만 선택하는 당신! 효율적으로 선택하는 것을 좋아해요.",
      "혼자 조용히 선물을 고르며, 효율적으로 처리하는 것을 목표로 해요.",
      "선물을 간단하게 포장하고, 실용적으로 즐기는 것을 좋아해요.",
    ],
    traits: ["실용적 선택", "효율적 처리", "목적 지향"],
    picks: ["실용적인 선물", "효율적인 선물", "간단한 포장"],
    tips: ["예산 관리", "감성 고려", "시간 관리"],
    match: "ESFJ, ENFJ",
    emoji: "🛠",
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const mbtiType = (searchParams.get("type") as keyof typeof giftTypes) || "ENFP"
  const resultId = searchParams.get("id") || undefined
  const character = giftTypes[mbtiType]
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
                  className="mb-4 bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200"
                >
                  {mbtiType}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{character.label}</h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium">"{character.summary}"</p>
              </div>

              <div className="flex flex-col items-center space-y-4">
                <ShareButtons
                  testId="gift-choosing"
                  testPath="/tests/gift-choosing/test"
                  resultType={mbtiType}
                  resultId={loadedResult?.id || resultId}
                  title={`나는 💝 ${character.label}(${mbtiType})! 너는 어떤 선물러야?`}
                  description={character.summary}
                />
                <Button variant="outline" size="lg" asChild>
                  <Link href="/tests/gift-choosing/test">
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
              <span>💝</span>
              <span>당신의 선물 스타일</span>
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
              <span>🎁</span>
              <span>당신의 선택 특징</span>
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

        {/* Picks */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <span>🎀</span>
              <span>추천 선물 스타일</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.picks.map((pick, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950 dark:to-rose-950 rounded-lg"
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
              <span>선물 팁</span>
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
              <Sparkles className="h-6 w-6 text-pink-500" />
              <span>다른 재미있는 테스트도 해보세요!</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  slug: "game-play-style",
                  title: "게임 플레이 스타일",
                  emoji: "🎮",
                  description: "게임 플레이로 알아보는 성격",
                  participants: "0",
                },
                {
                  slug: "lunchbox-style",
                  title: "도시락 싸는 스타일",
                  emoji: "🍱",
                  description: "도시락 구성으로 알아보는 성격",
                  participants: "0",
                },
                {
                  slug: "soup-vs-bibim",
                  title: "국물 vs 비빔 스타일",
                  emoji: "🍜",
                  description: "국물파 vs 비빔파로 알아보는 성격",
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

export default function GiftChoosingResult() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  )
}

