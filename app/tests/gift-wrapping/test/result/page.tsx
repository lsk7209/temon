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

const wrappingTypes = {
  ENFP: {
    label: "즉흥 찢기형",
    summary: "한 번에 빠르게 찢어서 내용물 확인하는 활발한 타입",
    description: [
      "포장지를 보는 순간 바로 찢어버리는 당신! 기다림을 못 참고, 한 번에 빠르게 뜯어서 내용물을 확인해요.",
      "포장지 상태는 신경 쓰지 않고, 내용물이 궁금해서 빠르게 뜯는 것을 좋아해요.",
      "사람들과 함께 있을 때는 분위기를 띄우며, 모두가 즐거워하는 모습을 만들어요.",
    ],
    traits: ["빠르게 찢기", "내용물 중심", "분위기 띄우기"],
    picks: ["한 번에 찢기", "즉흥적 방법", "함께 즐기기"],
    tips: ["포장지 재활용", "정리 습관", "조금만 천천히"],
    match: "ISTJ, INTJ",
    emoji: "✨",
  },
  INFP: {
    label: "조용한 보존형",
    summary: "조심스럽게 뜯어서 포장지도 보존하는 감성형",
    description: [
      "포장지를 조심스럽게 뜯는 당신! 포장지도 예쁘고, 그것을 보존하는 것을 좋아해요.",
      "혼자 조용히 포장지를 뜯으며, 그 순간을 즐기고 감성적으로 느껴요.",
      "포장지를 깔끔하게 접어서 보관하거나, 추억으로 남기는 것을 좋아해요.",
    ],
    traits: ["조심스럽게 뜯기", "포장지 보존", "감성적 즐김"],
    picks: ["천천히 뜯기", "포장지 보관", "조용한 환경"],
    tips: ["시간 관리", "효율성 고려", "재활용 습관"],
    match: "ENTJ, ESTJ",
    emoji: "🌙",
  },
  ENFJ: {
    label: "체계적 정리형",
    summary: "체계적으로 뜯어서 깔끔하게 정리하는 리더형",
    description: [
      "포장지를 체계적으로 뜯는 당신! 한 곳에서 시작해서 순서대로 뜯어요.",
      "포장지를 뜯은 후에도 깔끔하게 정리하고, 재활용을 고려하며, 효율적으로 처리해요.",
      "사람들과 함께 있을 때는 모두가 즐거워할 수 있도록 분위기를 만들어요.",
    ],
    traits: ["체계적 뜯기", "깔끔한 정리", "재활용 고려"],
    picks: ["순서대로 뜯기", "정리 습관", "재활용"],
    tips: ["시간 관리", "효율성 고려", "즐거움도 중요"],
    match: "INTP, ISTP",
    emoji: "🤝",
  },
  INFJ: {
    label: "의미 있는 보존형",
    summary: "포장지의 의미를 생각하며 조심스럽게 뜯는 큐레이터형",
    description: [
      "포장지의 의미를 생각하며 조심스럽게 뜯는 당신! 포장지도 선물의 일부라고 생각해요.",
      "혼자 조용히 포장지를 뜯으며, 그 순간의 의미를 생각하고 감성적으로 느껴요.",
      "포장지를 보관하거나, 사진으로 남겨서 추억으로 남기는 것을 좋아해요.",
    ],
    traits: ["의미 있는 뜯기", "포장지 보존", "추억 남기기"],
    picks: ["조심스럽게 뜯기", "포장지 보관", "사진 남기기"],
    tips: ["시간 관리", "효율성 고려", "재활용 습관"],
    match: "ENFP, ESFP",
    emoji: "📖",
  },
  ENTP: {
    label: "실험적 찢기형",
    summary: "다양한 방법으로 실험하며 뜯는 탐구형",
    description: [
      "포장지를 다양한 방법으로 실험하며 뜯는 당신! 가위, 칼, 손 등 다양한 도구를 시도해요.",
      "새로운 방법을 시도하고, 어떤 방법이 가장 효율적인지 탐구하는 것을 좋아해요.",
      "사람들과 함께 있을 때는 재미있는 방법을 제안하며, 모두가 즐거워하는 모습을 만들어요.",
    ],
    traits: ["다양한 시도", "실험 정신", "효율 탐구"],
    picks: ["다양한 도구", "새로운 방법", "실험적 접근"],
    tips: ["안전 주의", "정리 습관", "재활용 고려"],
    match: "ISFJ, ISTJ",
    emoji: "💡",
  },
  INTP: {
    label: "효율 분석형",
    summary: "가장 효율적인 방법을 분석하여 뜯는 분석가형",
    description: [
      "포장지를 뜯는 가장 효율적인 방법을 분석하는 당신! 시간과 노력을 고려하며 최적의 방법을 찾아요.",
      "혼자 조용히 포장지를 뜯으며, 어떤 방법이 가장 효율적인지 생각해요.",
      "포장지를 뜯은 후에도 효율적으로 정리하고, 재활용을 고려하며, 논리적으로 처리해요.",
    ],
    traits: ["효율 분석", "최적 방법", "논리적 처리"],
    picks: ["효율적 도구", "최적의 방법", "체계적 정리"],
    tips: ["시간 관리", "즐거움도 중요", "재활용 습관"],
    match: "ENFJ, ESFJ",
    emoji: "🔬",
  },
  ENTJ: {
    label: "전략적 뜯기형",
    summary: "전략적으로 계획하여 효율적으로 뜯는 리더형",
    description: [
      "포장지를 뜯는 것도 전략적으로 계획하는 당신! 미리 계획하고, 효율적으로 뜯어요.",
      "사람들과 함께 있을 때는 모두가 즐거워할 수 있도록 분위기를 만들고, 효율적으로 처리해요.",
      "포장지를 뜯은 후에도 체계적으로 정리하고, 재활용을 고려하며, 목적에 맞게 처리해요.",
    ],
    traits: ["전략적 계획", "효율적 처리", "체계적 정리"],
    picks: ["계획적 뜯기", "효율적 방법", "체계적 정리"],
    tips: ["즐거움도 중요", "시간 관리", "재활용 습관"],
    match: "ISFP, INFP",
    emoji: "🎯",
  },
  INTJ: {
    label: "완벽 보존형",
    summary: "완벽하게 뜯어서 포장지도 보존하는 큐레이터형",
    description: [
      "포장지를 완벽하게 뜯는 당신! 조심스럽게 뜯어서 포장지도 보존하고, 내용물도 확인해요.",
      "혼자 조용히 포장지를 뜯으며, 완벽한 방법을 찾아서 실행해요.",
      "포장지를 보관하거나, 사진으로 남겨서 기록으로 남기는 것을 좋아해요.",
    ],
    traits: ["완벽한 뜯기", "포장지 보존", "기록 남기기"],
    picks: ["조심스럽게 뜯기", "완벽한 방법", "보관 습관"],
    tips: ["시간 관리", "효율성 고려", "재활용 습관"],
    match: "ESFP, ENFP",
    emoji: "📐",
  },
  ESFJ: {
    label: "따뜻한 정리형",
    summary: "따뜻하게 뜯어서 깔끔하게 정리하는 배려형",
    description: [
      "포장지를 따뜻하게 뜯는 당신! 사람들과 함께 있을 때는 모두가 즐거워할 수 있도록 분위기를 만들어요.",
      "포장지를 뜯은 후에도 깔끔하게 정리하고, 재활용을 고려하며, 배려심 있게 처리해요.",
      "포장지도 예쁘다고 생각하며, 그것을 보존하거나 재활용하는 것을 좋아해요.",
    ],
    traits: ["따뜻한 뜯기", "깔끔한 정리", "재활용 고려"],
    picks: ["함께 즐기기", "정리 습관", "재활용"],
    tips: ["시간 관리", "효율성 고려", "즐거움 유지"],
    match: "INTP, ISTP",
    emoji: "😊",
  },
  ISFJ: {
    label: "안정 보존형",
    summary: "안정적으로 뜯어서 포장지도 보존하는 수호자형",
    description: [
      "포장지를 안정적으로 뜯는 당신! 정해진 방법으로 조심스럽게 뜯어요.",
      "혼자 조용히 포장지를 뜯으며, 포장지도 보존하고, 내용물도 확인해요.",
      "포장지를 보관하거나, 재활용하는 것을 좋아하며, 안정적인 루틴을 만들어요.",
    ],
    traits: ["안정적 뜯기", "포장지 보존", "재활용 습관"],
    picks: ["조심스럽게 뜯기", "보관 습관", "재활용"],
    tips: ["시간 관리", "효율성 고려", "즐거움도 중요"],
    match: "ENTP, ENFP",
    emoji: "🧸",
  },
  ESFP: {
    label: "즉흥 즐거움형",
    summary: "즉흥적으로 찢어서 즐거움을 만드는 에너지형",
    description: [
      "포장지를 즉흥적으로 찢는 당신! 기다림을 못 참고, 빠르게 찢어서 내용물을 확인해요.",
      "사람들과 함께 있을 때는 분위기를 띄우며, 모두가 즐거워하는 모습을 만들어요.",
      "포장지 상태는 신경 쓰지 않고, 내용물이 궁금해서 빠르게 뜯는 것을 좋아해요.",
    ],
    traits: ["즉흥적 찢기", "빠른 확인", "분위기 띄우기"],
    picks: ["한 번에 찢기", "즉흥적 방법", "함께 즐기기"],
    tips: ["정리 습관", "재활용 고려", "조금만 천천히"],
    match: "INTJ, INFJ",
    emoji: "🎉",
  },
  ISFP: {
    label: "조용한 보존형",
    summary: "조용히 조심스럽게 뜯어서 보존하는 미니멀형",
    description: [
      "포장지를 조용히 조심스럽게 뜯는 당신! 혼자 조용히 포장지를 뜯으며, 포장지도 보존해요.",
      "포장지를 깔끔하게 접어서 보관하거나, 재활용하는 것을 좋아해요.",
      "포장지 상태는 신경 쓰지 않고, 내용물을 확인하는 것에 집중해요.",
    ],
    traits: ["조용한 뜯기", "포장지 보존", "심플한 처리"],
    picks: ["조심스럽게 뜯기", "보관 습관", "재활용"],
    tips: ["시간 관리", "효율성 고려", "즐거움도 중요"],
    match: "ENTJ, ESTJ",
    emoji: "🌿",
  },
  ESTJ: {
    label: "효율 정리형",
    summary: "효율적으로 뜯어서 깔끔하게 정리하는 매니저형",
    description: [
      "포장지를 효율적으로 뜯는 당신! 시간과 노력을 고려하며, 최적의 방법으로 뜯어요.",
      "포장지를 뜯은 후에도 깔끔하게 정리하고, 재활용을 고려하며, 체계적으로 처리해요.",
      "사람들과 함께 있을 때는 모두가 즐거워할 수 있도록 분위기를 만들고, 효율적으로 처리해요.",
    ],
    traits: ["효율적 뜯기", "깔끔한 정리", "체계적 처리"],
    picks: ["효율적 방법", "정리 습관", "재활용"],
    tips: ["즐거움도 중요", "시간 관리", "재활용 습관"],
    match: "INFP, ISFP",
    emoji: "📋",
  },
  ISTJ: {
    label: "루틴 보존형",
    summary: "정해진 루틴으로 안정적으로 뜯어서 보존하는 수호자형",
    description: [
      "포장지를 정해진 루틴으로 안정적으로 뜯는 당신! 항상 같은 방법으로 조심스럽게 뜯어요.",
      "혼자 조용히 포장지를 뜯으며, 포장지도 보존하고, 내용물도 확인해요.",
      "포장지를 보관하거나, 재활용하는 것을 좋아하며, 안정적인 루틴을 유지해요.",
    ],
    traits: ["정해진 루틴", "안정적 뜯기", "포장지 보존"],
    picks: ["조심스럽게 뜯기", "보관 습관", "재활용"],
    tips: ["시간 관리", "효율성 고려", "즐거움도 중요"],
    match: "ENFP, ESFP",
    emoji: "📦",
  },
  ESTP: {
    label: "즉흥 효율형",
    summary: "즉흥적으로 빠르게 뜯어서 효율적으로 처리하는 액션형",
    description: [
      "포장지를 즉흥적으로 빠르게 뜯는 당신! 기다림을 못 참고, 빠르게 뜯어서 내용물을 확인해요.",
      "포장지 상태는 신경 쓰지 않고, 내용물이 궁금해서 빠르게 뜯는 것을 좋아해요.",
      "포장지를 뜯은 후에도 효율적으로 정리하고, 재활용을 고려하며, 빠르게 처리해요.",
    ],
    traits: ["즉흥적 뜯기", "빠른 처리", "효율적 정리"],
    picks: ["빠르게 뜯기", "효율적 방법", "재활용"],
    tips: ["정리 습관", "시간 관리", "재활용 습관"],
    match: "INFJ, INTP",
    emoji: "⚡",
  },
  ISTP: {
    label: "실용 처리형",
    summary: "실용적으로 뜯어서 효율적으로 처리하는 실용가형",
    description: [
      "포장지를 실용적으로 뜯는 당신! 필요한 것만 사용하며, 효율적으로 뜯어요.",
      "혼자 조용히 포장지를 뜯으며, 가장 효율적인 방법을 찾아서 실행해요.",
      "포장지를 뜯은 후에도 효율적으로 정리하고, 재활용을 고려하며, 실용적으로 처리해요.",
    ],
    traits: ["실용적 뜯기", "효율적 처리", "간단한 정리"],
    picks: ["효율적 방법", "간단한 정리", "재활용"],
    tips: ["시간 관리", "즐거움도 중요", "재활용 습관"],
    match: "ESFJ, ENFJ",
    emoji: "🛠",
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const mbtiType = (searchParams.get("type") as keyof typeof wrappingTypes) || "ENFP"
  const resultId = searchParams.get("id") || undefined
  const character = wrappingTypes[mbtiType]
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
                  className="mb-4 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                >
                  {mbtiType}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{character.label}</h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium">"{character.summary}"</p>
              </div>

              <div className="flex flex-col items-center space-y-4">
                <ShareButtons
                  testId="gift-wrapping"
                  testPath="/tests/gift-wrapping/test"
                  resultType={mbtiType}
                  resultId={loadedResult?.id || resultId}
                  title={`나는 🎁 ${character.label}(${mbtiType})! 너는 어떤 포장지러야?`}
                  description={character.summary}
                />
                <Button variant="outline" size="lg" asChild>
                  <Link href="/tests/gift-wrapping/test">
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
              <span>🎁</span>
              <span>당신의 포장지 스타일</span>
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
              <span>✂️</span>
              <span>당신의 뜯기 특징</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.traits.map((trait, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950 rounded-lg"
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
              <span>추천 뜯기 방법</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.picks.map((pick, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950 rounded-lg"
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
              <span>포장지 팁</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3">
              {character.tips.map((tip, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="text-yellow-500 font-bold">{index + 1}.</span>
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
              <Sparkles className="h-6 w-6 text-yellow-500" />
              <span>다른 재미있는 테스트도 해보세요!</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  slug: "shower-habit",
                  title: "샤워 습관",
                  emoji: "🚿",
                  description: "샤워 습관으로 알아보는 성격",
                  participants: "0",
                },
                {
                  slug: "instagram-story",
                  title: "인스타그램 스토리 스타일",
                  emoji: "📸",
                  description: "스토리 올리는 방식으로 알아보는 성격",
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
              className="border-2 border-yellow-300 hover:bg-yellow-50 font-medium py-6 px-8 bg-transparent"
            >
              다른 테스트하기
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default function GiftWrappingResult() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  )
}

