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

const restaurantTypes = {
  ENFP: {
    label: "즉흥 탐험형",
    summary: "즉흥적으로 다양한 식당을 탐험하는 활발한 타입",
    description: [
      "즉흥적으로 다양한 식당을 탐험하는 당신! 새로운 식당, 특별한 메뉴를 시도하고, 다양한 스타일을 탐구해요.",
      "사람들과 함께 식당을 선택하며, 즐거운 시간을 만들어요. 자연스러운 선택을 좋아하고, 풍부한 경험을 선호해요.",
      "식당 경험 후에도 에너지가 넘치고, 활기차게 공유하는 것을 좋아해요.",
    ],
    traits: ["즉흥적 선택", "다양한 시도", "함께 즐기기"],
    picks: ["새로운 식당", "특별한 메뉴", "풍부한 경험"],
    tips: ["식당 선택 계획", "메뉴 선택 방법", "함께 즐기기"],
    match: "ISTJ, INTJ",
    emoji: "✨",
  },
  INFP: {
    label: "감성 특별형",
    summary: "의미 있는 식당으로 감성적으로 즐기는 감성형",
    description: [
      "의미 있는 식당으로 즐거움을 느끼는 당신! 특별한 의미가 있는 식당, 감성적인 선택을 좋아해요.",
      "혼자 조용히 식당을 선택하며, 그 순간의 의미를 생각하고 감성적으로 느껴요.",
      "여유롭게 천천히 선택하고, 그 순간을 소중히 여기며, 평온하게 즐기는 것을 좋아해요.",
    ],
    traits: ["의미 있는 선택", "조용히 즐기기", "감성 중시"],
    picks: ["감성적인 식당", "특별한 의미", "평온한 분위기"],
    tips: ["식당 선택 계획", "메뉴 선택 방법", "혼자 즐기기"],
    match: "ENTJ, ESTJ",
    emoji: "🌙",
  },
  ENFJ: {
    label: "배려 조화형",
    summary: "모두가 좋아하는 식당으로 조화롭게 즐기는 리더형",
    description: [
      "모두가 좋아하는 식당으로 즐거움을 나누는 당신! 함께 가는 사람들이 만족할 수 있도록 식당을 선택해요.",
      "사람들과 함께 식당을 선택할 때는 체계적으로 준비하고 모두가 함께 즐거워하는 모습을 만들어요.",
      "정돈된 식당 선택을 좋아하고, 모두가 행복해하는 것을 좋아해요.",
    ],
    traits: ["배려 중시", "모두가 즐거워", "조화로운 경험"],
    picks: ["균형 잡힌 식당", "즐거운 분위기", "정돈된 선택"],
    tips: ["식당 선택 계획", "메뉴 선택 방법", "함께 즐기기"],
    match: "INTP, ISTP",
    emoji: "🤝",
  },
  INFJ: {
    label: "완벽 의미형",
    summary: "완벽한 식당으로 의미 있게 즐기는 큐레이터형",
    description: [
      "완벽한 식당으로 즐거움을 느끼는 당신! 단순히 먹는 것이 아니라, 그 식당의 의미를 중요하게 생각해요.",
      "혼자 조용히 식당을 선택하며, 완벽한 조합을 찾아서 실행해요.",
      "정돈된 식당 선택을 좋아하고, 그 순간을 소중히 여기며, 최고의 경험을 만드는 것을 목표로 해요.",
    ],
    traits: ["완벽한 선택", "깊이 있는 즐김", "의미 전달"],
    picks: ["완벽한 조합", "의미 있는 식당", "감성적인 경험"],
    tips: ["식당 선택 계획", "메뉴 선택 방법", "혼자 즐기기"],
    match: "ENFP, ESFP",
    emoji: "📖",
  },
  ENTP: {
    label: "실험 조합형",
    summary: "다양한 식당을 실험적으로 시도하는 탐구형",
    description: [
      "다양한 식당을 실험적으로 시도하는 당신! 새로운 식당과 메뉴를 시도하고, 다양한 스타일을 탐구해요.",
      "사람들과 함께 식당을 선택할 때는 새로운 식당을 제안하며, 모두가 즐거워하는 모습을 만들어요.",
      "자연스러운 선택을 좋아하고, 실험적으로 즐기는 것을 좋아해요.",
    ],
    traits: ["실험적 시도", "다양한 조합", "탐구 정신"],
    picks: ["새로운 식당", "특이한 메뉴", "실험적 방식"],
    tips: ["식당 선택 계획", "메뉴 선택 방법", "함께 즐기기"],
    match: "ISFJ, ISTJ",
    emoji: "💡",
  },
  INTP: {
    label: "분석 효율형",
    summary: "분석하여 효율적인 식당을 선택하는 분석가형",
    description: [
      "분석하여 효율적인 식당을 선택하는 당신! 리뷰와 정보를 고려하며 선택해요.",
      "혼자 조용히 식당을 선택하며, 논리적으로 분석하고 효율적으로 결정해요.",
      "빠르게 선택하고, 효율적으로 즐기며, 실용적인 선택을 좋아해요.",
    ],
    traits: ["분석적 선택", "효율 중시", "논리적 판단"],
    picks: ["효율적인 식당", "실용적 선택", "간단한 방식"],
    tips: ["식당 선택 계획", "메뉴 선택 방법", "혼자 즐기기"],
    match: "ENFJ, ESFJ",
    emoji: "🔬",
  },
  ENTJ: {
    label: "전략 선택형",
    summary: "전략적으로 계획하여 효율적으로 선택하는 리더형",
    description: [
      "전략적으로 계획하여 식당을 선택하는 당신! 목적에 맞는 식당을 미리 정해두고 실행해요.",
      "사람들과 함께 식당을 선택할 때는 체계적으로 관리하고, 효율적으로 결정해요.",
      "정돈된 식당 선택을 좋아하고, 목표를 달성하는 것을 좋아해요.",
    ],
    traits: ["전략적 선택", "효율적 관리", "목표 달성"],
    picks: ["전략적 식당", "효율적 선택", "목표 방식"],
    tips: ["식당 선택 계획", "메뉴 선택 방법", "함께 즐기기"],
    match: "ISFP, INFP",
    emoji: "🎯",
  },
  INTJ: {
    label: "완벽 전략형",
    summary: "완벽하게 조합하여 최적의 식당을 만드는 큐레이터형",
    description: [
      "완벽하게 조합하여 식당을 선택하는 당신! 모든 요소를 고려하여 최적의 식당을 만들어요.",
      "혼자 조용히 식당을 선택하며, 완벽한 조합을 찾아서 실행해요.",
      "완벽한 식당을 선택해서, 최고의 경험을 만드는 것을 목표로 해요.",
    ],
    traits: ["완벽 선택", "최적 조합", "품질 중시"],
    picks: ["완벽한 식당", "최적의 조합", "품질 있는 선택"],
    tips: ["식당 선택 계획", "메뉴 선택 방법", "혼자 즐기기"],
    match: "ESFP, ENFP",
    emoji: "📐",
  },
  ESFJ: {
    label: "따뜻한 선택형",
    summary: "따뜻하게 준비하여 모두가 즐거워하는 배려형",
    description: [
      "따뜻하게 준비하여 모두가 즐거워하는 당신! 함께 가는 사람들이 만족할 수 있도록 식당을 선택해요.",
      "사람들과 함께 식당을 선택할 때는 따뜻한 마음으로 준비하고 모두가 함께 즐거워하는 모습을 만들어요.",
      "정돈된 식당 선택을 좋아하고, 모두가 행복해하는 것을 좋아해요.",
    ],
    traits: ["따뜻한 준비", "모두가 즐거워", "배려 중시"],
    picks: ["따뜻한 식당", "즐거운 분위기", "정돈된 선택"],
    tips: ["식당 선택 계획", "메뉴 선택 방법", "함께 즐기기"],
    match: "INTP, ISTP",
    emoji: "😊",
  },
  ISFJ: {
    label: "안정 루틴형",
    summary: "안정적으로 루틴을 유지하는 수호자형",
    description: [
      "안정적으로 루틴을 유지하여 식당을 선택하는 당신! 항상 같은 방식으로 루틴을 유지해요.",
      "혼자 조용히 식당을 선택하며, 안정적인 느낌을 즐겨요.",
      "정해진 식당으로 가고, 그 순간의 평온함을 느끼는 것을 소중히 여겨요.",
    ],
    traits: ["안정적 선택", "루틴 유지", "일관성"],
    picks: ["기본 식당", "고정된 선택", "안정적인 방식"],
    tips: ["식당 선택 계획", "메뉴 선택 방법", "혼자 즐기기"],
    match: "ENTP, ENFP",
    emoji: "🧸",
  },
  ESFP: {
    label: "즉흥 즐거움형",
    summary: "즉흥적으로 즐거운 식당으로 분위기를 띄우는 에너지형",
    description: [
      "즉흥적으로 즐거운 식당으로 즐거움을 느끼는 당신! 그때그때 마음에 드는 식당을 선택하고, 즐거운 시간을 만들어요.",
      "사람들과 함께 식당을 선택할 때는 즐거운 시간으로 만들고 모두가 즐거워하는 모습을 만들어요.",
      "자연스러운 선택을 좋아하고, 풍부하게 즐기는 것을 좋아해요.",
    ],
    traits: ["즉흥적 선택", "즐거운 방법", "에너지 넘침"],
    picks: ["즐거운 식당", "풍부한 선택", "자연스러운 방식"],
    tips: ["식당 선택 계획", "메뉴 선택 방법", "함께 즐기기"],
    match: "INTJ, INFJ",
    emoji: "🎉",
  },
  ISFP: {
    label: "조용한 취향형",
    summary: "조용히 나만의 취향으로 감성적인 식당을 선택하는 미니멀형",
    description: [
      "조용히 나만의 취향으로 감성적인 식당을 선택하는 당신! 특별한 의미가 있는 식당, 감성적인 선택을 좋아해요.",
      "혼자 조용히 식당을 선택하며, 그 순간을 즐기고 감성적으로 느껴요.",
      "천천히 선택하고, 그 순간의 평온함을 느끼는 것을 좋아해요.",
    ],
    traits: ["조용한 선택", "나만의 취향", "감성 몰입"],
    picks: ["감성적인 식당", "심플한 선택", "깔끔한 방식"],
    tips: ["식당 선택 계획", "메뉴 선택 방법", "혼자 즐기기"],
    match: "ENTJ, ESTJ",
    emoji: "🌿",
  },
  ESTJ: {
    label: "계획 효율형",
    summary: "계획적으로 효율적인 식당을 선택하는 매니저형",
    description: [
      "계획적으로 효율적인 식당을 선택하는 당신! 목적에 맞는 식당을 미리 정해두고 실행해요.",
      "사람들과 함께 식당을 선택할 때는 체계적으로 관리하고, 효율적으로 결정해요.",
      "정돈된 식당 선택을 좋아하고, 효율적으로 처리하는 것을 좋아해요.",
    ],
    traits: ["계획적 선택", "효율적 관리", "목표 달성"],
    picks: ["효율적인 식당", "계획된 선택", "목표 방식"],
    tips: ["식당 선택 계획", "메뉴 선택 방법", "함께 즐기기"],
    match: "INFP, ISFP",
    emoji: "📋",
  },
  ISTJ: {
    label: "루틴 전통형",
    summary: "정해진 루틴으로 전통 방식을 유지하는 수호자형",
    description: [
      "정해진 루틴으로 전통 방식으로 식당을 선택하는 당신! 항상 같은 방식으로 루틴을 유지해요.",
      "혼자 조용히 식당을 선택하며, 안정적인 느낌을 즐겨요.",
      "정해진 식당으로 가고, 그 순간의 평온함을 느끼는 것을 소중히 여겨요.",
    ],
    traits: ["정해진 루틴", "안정적 선택", "일관성"],
    picks: ["기본 식당", "고정된 선택", "안정적인 방식"],
    tips: ["식당 선택 계획", "메뉴 선택 방법", "혼자 즐기기"],
    match: "ENFP, ESFP",
    emoji: "📦",
  },
  ESTP: {
    label: "즉흥 효율형",
    summary: "즉흥적으로 빠르게 선택하여 효율적으로 즐기는 액션형",
    description: [
      "즉흥적으로 빠르게 식당을 선택하는 당신! 그때그때 마음에 드는 식당을 선택하고, 빠르게 처리해요.",
      "사람들과 함께 식당을 선택할 때는 분위기를 띄우며, 모두가 즐거워하는 모습을 만들어요.",
      "자연스러운 선택을 좋아하고, 효율적으로 즐기는 것을 좋아해요.",
    ],
    traits: ["즉흥적 선택", "빠른 처리", "효율적 즐김"],
    picks: ["즉흥적 식당", "빠른 선택", "자연스러운 방식"],
    tips: ["식당 선택 계획", "메뉴 선택 방법", "함께 즐기기"],
    match: "INFJ, INTP",
    emoji: "⚡",
  },
  ISTP: {
    label: "실용 효율형",
    summary: "실용적으로 필요한 만큼만 선택하여 효율적으로 즐기는 실용가형",
    description: [
      "실용적으로 필요한 만큼만 식당을 선택하는 당신! 효율적으로 즐기는 것을 좋아해요.",
      "혼자 조용히 식당을 선택하며, 효율적으로 처리하는 것을 목표로 해요.",
      "빠르게 선택하고, 실용적으로 즐기며, 간단한 선택을 좋아해요.",
    ],
    traits: ["실용적 선택", "효율적 처리", "목적 지향"],
    picks: ["실용적인 식당", "효율적인 선택", "간단한 방식"],
    tips: ["식당 선택 계획", "메뉴 선택 방법", "혼자 즐기기"],
    match: "ESFJ, ENFJ",
    emoji: "🛠",
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const mbtiType = (searchParams.get("type") as keyof typeof restaurantTypes) || "ENFP"
  const resultId = searchParams.get("id") || undefined
  const character = restaurantTypes[mbtiType]
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
                  className="mb-4 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                >
                  {mbtiType}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{character.label}</h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium">"{character.summary}"</p>
              </div>

              <div className="flex flex-col items-center space-y-4">
                <ShareButtons
                  testId="restaurant-choice"
                  testPath="/tests/restaurant-choice/test"
                  resultType={mbtiType}
                  resultId={loadedResult?.id || resultId}
                  title={`나는 🍽️ ${character.label}(${mbtiType})! 너는 어떤 식당러야?`}
                  description={character.summary}
                />
                <Button variant="outline" size="lg" asChild>
                  <Link href="/tests/restaurant-choice/test">
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
              <span>🍽️</span>
              <span>당신의 식당 선택 스타일</span>
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
              <span>🍴</span>
              <span>당신의 선택 특징</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.traits.map((trait, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950 dark:to-pink-950 rounded-lg"
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
              <span>🥢</span>
              <span>추천 식당 선택 스타일</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.picks.map((pick, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950 dark:to-pink-950 rounded-lg"
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
              <span>식당 선택 팁</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3">
              {character.tips.map((tip, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="text-red-500 font-bold">{index + 1}.</span>
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
              <Sparkles className="h-6 w-6 text-red-500" />
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
              className="border-2 border-red-300 hover:bg-red-50 font-medium py-6 px-8 bg-transparent"
            >
              다른 테스트하기
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default function RestaurantChoiceResult() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  )
}

