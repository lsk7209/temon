"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, Play, Sparkles } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { ShareButtons } from "@/components/share-buttons"
import { getTestResult } from "@/lib/api-client"

const gameTypes = {
  ENFP: {
    label: "즉흥 탐험형",
    summary: "다양한 게임을 즉흥적으로 즐기는 활발한 타입",
    description: [
      "다양한 게임을 즉흥적으로 즐기는 당신! 트렌드 게임부터 독특한 게임까지, 새로운 경험을 즐겨요.",
      "게임을 플레이할 때도 즉흥적으로 즐기고, 사람들과 함께 플레이하는 것을 좋아해요.",
      "게임 후기도 공유하고, 경험을 나누며, 모두가 즐거워하는 모습을 만들어요.",
    ],
    traits: ["다양한 게임", "즉흥적 플레이", "함께 즐기기"],
    picks: ["트렌드 게임", "다양한 장르", "멀티플레이"],
    tips: ["시간 관리", "과도한 플레이 주의", "균형 잡기"],
    match: "ISTJ, INTJ",
    emoji: "✨",
  },
  INFP: {
    label: "감성 몰입형",
    summary: "나만의 취향 게임으로 조용히 몰입하는 감성형",
    description: [
      "나만의 취향 게임으로 조용히 몰입하는 당신! 특별한 의미가 있는 게임, 감성적인 스토리를 좋아해요.",
      "혼자 조용히 게임을 플레이하며, 그 순간에 몰입하는 것을 좋아해요.",
      "게임의 스토리와 감성을 느끼며, 그 순간을 소중히 여기는 것을 좋아해요.",
    ],
    traits: ["나만의 취향", "조용히 몰입", "감성 중시"],
    picks: ["스토리 게임", "감성적인 게임", "독특한 게임"],
    tips: ["시간 관리", "과도한 몰입 주의", "균형 잡기"],
    match: "ENTJ, ESTJ",
    emoji: "🌙",
  },
  ENFJ: {
    label: "소통 리더형",
    summary: "모두가 즐거워할 게임으로 소통하는 리더형",
    description: [
      "모두가 즐거워할 게임을 선택하는 당신! 분위기를 띄우고, 모두가 함께 즐길 수 있는 게임을 골라요.",
      "게임을 플레이할 때도 모두가 함께 즐거워하는 모습을 만들어요.",
      "게임 후기도 공유하고, 경험을 나누며, 모두가 행복해하는 것을 좋아해요.",
    ],
    traits: ["모두가 즐거워", "소통 중시", "함께 즐기기"],
    picks: ["멀티플레이 게임", "협동 게임", "인기 게임"],
    tips: ["시간 관리", "과도한 플레이 주의", "균형 잡기"],
    match: "INTP, ISTP",
    emoji: "🤝",
  },
  INFJ: {
    label: "의미 있는 선택형",
    summary: "의미 있는 게임을 선택하여 깊이 있게 즐기는 큐레이터형",
    description: [
      "의미 있는 게임을 선택하는 당신! 단순히 재미가 아니라, 그 게임의 의미를 중요하게 생각해요.",
      "혼자 조용히 게임을 플레이하며, 그 순간의 의미를 생각하고 감성적으로 느껴요.",
      "게임의 스토리와 의미를 깊이 있게 느끼며, 그 순간을 소중히 여기는 것을 좋아해요.",
    ],
    traits: ["의미 있는 선택", "깊이 있는 즐김", "감성 전달"],
    picks: ["의미 있는 게임", "깊이 있는 스토리", "특별한 게임"],
    tips: ["시간 관리", "과도한 몰입 주의", "균형 잡기"],
    match: "ENFP, ESFP",
    emoji: "📖",
  },
  ENTP: {
    label: "실험 탐구형",
    summary: "새로운 게임과 전략을 실험하는 탐구형",
    description: [
      "새로운 게임과 전략을 실험하는 당신! 다양한 게임을 시도하고, 새로운 방법을 탐구해요.",
      "게임을 플레이할 때도 다양한 전략을 시도하며, 어떤 방법이 가장 효과적인지 탐구해요.",
      "사람들과 함께 있을 때는 새로운 게임을 제안하며, 모두가 즐거워하는 모습을 만들어요.",
    ],
    traits: ["실험적 플레이", "다양한 시도", "탐구 정신"],
    picks: ["새로운 게임", "다양한 전략", "실험적 방법"],
    tips: ["시간 관리", "과도한 실험 주의", "균형 잡기"],
    match: "ISFJ, ISTJ",
    emoji: "💡",
  },
  INTP: {
    label: "전략 분석형",
    summary: "전략을 분석하여 최적의 플레이를 만드는 분석가형",
    description: [
      "전략을 분석하여 최적의 플레이를 만드는 당신! 게임의 메커니즘을 분석하고, 효율적인 방법을 찾아요.",
      "혼자 조용히 게임을 플레이하며, 전략을 분석하고 실력을 향상시키는 것을 좋아해요.",
      "게임의 시스템을 이해하고, 최적의 플레이를 만드는 것을 목표로 해요.",
    ],
    traits: ["전략 분석", "최적 플레이", "논리적 판단"],
    picks: ["전략 게임", "분석 게임", "최적화 게임"],
    tips: ["시간 관리", "과도한 분석 주의", "균형 잡기"],
    match: "ENFJ, ESFJ",
    emoji: "🔬",
  },
  ENTJ: {
    label: "전략 리더형",
    summary: "전략적으로 계획하여 목표를 달성하는 리더형",
    description: [
      "전략적으로 계획하여 게임을 플레이하는 당신! 목표를 정하고, 효율적으로 달성해요.",
      "게임을 플레이할 때도 전략적으로 계획하고, 목표를 달성하는 것을 좋아해요.",
      "사람들과 함께 있을 때는 모두가 만족할 수 있도록 게임을 조율하고, 목표를 달성해요.",
    ],
    traits: ["전략적 계획", "목표 달성", "효율적 플레이"],
    picks: ["전략 게임", "목표 게임", "효율적 게임"],
    tips: ["시간 관리", "과도한 목표 주의", "균형 잡기"],
    match: "ISFP, INFP",
    emoji: "🎯",
  },
  INTJ: {
    label: "완벽 전략형",
    summary: "완벽한 전략을 만들어 최적의 플레이를 만드는 큐레이터형",
    description: [
      "완벽한 전략을 만들어 최적의 플레이를 만드는 당신! 모든 요소를 고려하여 최적의 전략을 만들어요.",
      "혼자 조용히 게임을 플레이하며, 완벽한 전략을 찾아서 실행해요.",
      "완벽한 플레이를 만들어서, 최고의 성과를 만드는 것을 목표로 해요.",
    ],
    traits: ["완벽 전략", "최적 플레이", "품질 중시"],
    picks: ["완벽한 게임", "최적의 전략", "품질 게임"],
    tips: ["시간 관리", "과도한 완벽주의 주의", "균형 잡기"],
    match: "ESFP, ENFP",
    emoji: "📐",
  },
  ESFJ: {
    label: "따뜻한 소통형",
    summary: "따뜻하게 플레이하여 모두가 즐거워하는 배려형",
    description: [
      "따뜻하게 게임을 플레이하는 당신! 모두가 즐거워할 수 있는 게임을 골라요.",
      "게임을 플레이할 때도 따뜻한 마음으로 준비하고, 모두가 함께 즐거워하는 모습을 만들어요.",
      "게임 후기도 공유하고, 경험을 나누며, 모두가 행복해하는 것을 좋아해요.",
    ],
    traits: ["따뜻한 플레이", "모두가 즐거워", "배려 중시"],
    picks: ["협동 게임", "즐거운 게임", "함께 즐기기"],
    tips: ["시간 관리", "과도한 플레이 주의", "균형 잡기"],
    match: "INTP, ISTP",
    emoji: "😊",
  },
  ISFJ: {
    label: "안정 루틴형",
    summary: "안정적인 게임으로 루틴을 유지하는 수호자형",
    description: [
      "안정적인 게임으로 루틴을 유지하는 당신! 항상 같은 게임으로 루틴을 유지해요.",
      "혼자 조용히 게임을 플레이하며, 안정적인 느낌을 즐겨요.",
      "게임의 안정적인 루틴으로, 그 순간의 평온함을 느끼는 것을 소중히 여겨요.",
    ],
    traits: ["안정적 게임", "루틴 유지", "일관성"],
    picks: ["안정적인 게임", "정해진 게임", "편안한 게임"],
    tips: ["시간 관리", "과도한 루틴 주의", "균형 잡기"],
    match: "ENTP, ENFP",
    emoji: "🧸",
  },
  ESFP: {
    label: "즉흥 즐거움형",
    summary: "즉흥적으로 즐거운 게임으로 분위기를 띄우는 에너지형",
    description: [
      "즉흥적으로 즐거운 게임을 선택하는 당신! 그때그때 게임을 고르고, 즐거운 플레이를 만들어요.",
      "게임을 플레이할 때도 즐거운 시간으로 만들고, 사람들과 함께 즐거워하는 모습을 만들어요.",
      "사람들과 함께 있을 때는 모두가 즐거워하는 모습을 만들어요.",
    ],
    traits: ["즉흥적 선택", "즐거운 플레이", "에너지 넘침"],
    picks: ["즐거운 게임", "인기 게임", "분위기 게임"],
    tips: ["시간 관리", "과도한 플레이 주의", "균형 잡기"],
    match: "INTJ, INFJ",
    emoji: "🎉",
  },
  ISFP: {
    label: "조용한 취향형",
    summary: "조용히 나만의 취향 게임을 즐기는 미니멀형",
    description: [
      "조용히 나만의 취향 게임을 즐기는 당신! 특별한 의미가 있는 게임, 감성적인 게임을 좋아해요.",
      "혼자 조용히 게임을 플레이하며, 그 순간을 즐기고 감성적으로 느껴요.",
      "게임의 감성을 느끼며, 그 순간의 평온함을 느끼는 것을 좋아해요.",
    ],
    traits: ["조용한 플레이", "나만의 취향", "감성 몰입"],
    picks: ["감성적인 게임", "심플한 게임", "조용한 게임"],
    tips: ["시간 관리", "과도한 몰입 주의", "균형 잡기"],
    match: "ENTJ, ESTJ",
    emoji: "🌿",
  },
  ESTJ: {
    label: "계획 효율형",
    summary: "계획적으로 효율적인 플레이를 만드는 매니저형",
    description: [
      "계획적으로 효율적인 플레이를 만드는 당신! 목적에 맞는 게임을 미리 정해두고 플레이해요.",
      "게임을 플레이할 때도 체계적으로 관리하고, 효율적으로 목표를 달성해요.",
      "사람들과 함께 있을 때는 모두가 만족할 수 있도록 게임을 조율하고, 효율적으로 처리해요.",
    ],
    traits: ["계획적 플레이", "효율적 관리", "목표 달성"],
    picks: ["효율적 게임", "계획된 게임", "목표 게임"],
    tips: ["시간 관리", "과도한 계획 주의", "균형 잡기"],
    match: "INFP, ISFP",
    emoji: "📋",
  },
  ISTJ: {
    label: "루틴 수호형",
    summary: "정해진 루틴으로 안정적인 플레이를 유지하는 수호자형",
    description: [
      "정해진 루틴으로 안정적인 플레이를 유지하는 당신! 항상 같은 게임으로 루틴을 유지해요.",
      "혼자 조용히 게임을 플레이하며, 안정적인 느낌을 즐겨요.",
      "게임의 안정적인 루틴으로, 그 순간의 평온함을 느끼는 것을 소중히 여겨요.",
    ],
    traits: ["정해진 루틴", "안정적 플레이", "일관성"],
    picks: ["안정적인 게임", "정해진 게임", "편안한 게임"],
    tips: ["시간 관리", "과도한 루틴 주의", "균형 잡기"],
    match: "ENFP, ESFP",
    emoji: "📦",
  },
  ESTP: {
    label: "즉흥 액션형",
    summary: "즉흥적으로 빠르게 플레이하여 효율적으로 즐기는 액션형",
    description: [
      "즉흥적으로 빠르게 게임을 플레이하는 당신! 그때그때 게임을 고르고, 빠르게 즐겨요.",
      "게임을 플레이할 때도 빠르게 처리하고, 효율적으로 즐기는 것을 좋아해요.",
      "사람들과 함께 있을 때는 분위기를 띄우며, 모두가 즐거워하는 모습을 만들어요.",
    ],
    traits: ["즉흥적 플레이", "빠른 처리", "효율적 즐김"],
    picks: ["즉흥적 게임", "빠른 게임", "액션 게임"],
    tips: ["시간 관리", "과도한 플레이 주의", "균형 잡기"],
    match: "INFJ, INTP",
    emoji: "⚡",
  },
  ISTP: {
    label: "실용 플레이형",
    summary: "실용적으로 필요한 게임만 플레이하여 효율적으로 즐기는 실용가형",
    description: [
      "실용적으로 필요한 게임만 플레이하는 당신! 효율적으로 즐기는 것을 좋아해요.",
      "혼자 조용히 게임을 플레이하며, 효율적으로 처리하는 것을 목표로 해요.",
      "게임을 간단하게 즐기고, 실용적으로 즐기는 것을 좋아해요.",
    ],
    traits: ["실용적 플레이", "효율적 처리", "목적 지향"],
    picks: ["실용적 게임", "간단한 게임", "효율적 게임"],
    tips: ["시간 관리", "과도한 플레이 주의", "균형 잡기"],
    match: "ESFJ, ENFJ",
    emoji: "🛠",
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const mbtiType = (searchParams.get("type") as keyof typeof gameTypes) || "ENFP"
  const resultId = searchParams.get("id") || undefined
  const character = gameTypes[mbtiType]
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
                  className="mb-4 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                >
                  {mbtiType}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{character.label}</h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium">"{character.summary}"</p>
              </div>

              <div className="flex flex-col items-center space-y-4">
                <ShareButtons
                  testId="game-play-style"
                  testPath="/tests/game-play-style/test"
                  resultType={mbtiType}
                  resultId={loadedResult?.id || resultId}
                  title={`나는 🎮 ${character.label}(${mbtiType})! 너는 어떤 게이머야?`}
                  description={character.summary}
                />
                <Button variant="outline" size="lg" asChild>
                  <Link href="/tests/game-play-style/test">
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
              <span>🎮</span>
              <span>당신의 게임 스타일</span>
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
              <span>🕹️</span>
              <span>당신의 플레이 특징</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.traits.map((trait, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950 dark:to-indigo-950 rounded-lg"
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
              <span>🎯</span>
              <span>추천 게임 스타일</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.picks.map((pick, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950 dark:to-indigo-950 rounded-lg"
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
              <span>게임 팁</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3">
              {character.tips.map((tip, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="text-purple-500 font-bold">{index + 1}.</span>
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
              <Sparkles className="h-6 w-6 text-purple-500" />
              <span>다른 재미있는 테스트도 해보세요!</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
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
                  slug: "karaoke-song",
                  title: "노래방 곡 선택",
                  emoji: "🎤",
                  description: "노래방 곡 선택으로 알아보는 성격",
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
              className="border-2 border-purple-300 hover:bg-purple-50 font-medium py-6 px-8 bg-transparent"
            >
              다른 테스트하기
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default function GamePlayStyleResult() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  )
}

