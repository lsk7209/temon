"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShareButtons } from "@/components/share-buttons"
import { ChefHat, Heart, Lightbulb, Users, ArrowRight, Sparkles } from "lucide-react"
import { getTestResult } from "@/lib/api-client"

const cookingTypes = {
  ENFP: {
    label: "즉흥 창작 셰프",
    summary: "즉흥적이고 창의적인 요리로 즐거움을 나누는 타입",
    description: [
      "즉흥적이고 창의적으로 요리하는 당신! 새로운 레시피를 시도하고, 응용하며, 다양한 스타일을 탐구해요.",
      "사람들과 함께 요리하며, 즐거운 시간을 만들어요. 실험적인 요리를 좋아하고, 빠르게 완성하는 것을 좋아해요.",
      "요리 후기도 공유하고, 경험을 나누며, 모두가 행복해하는 것을 좋아해요.",
    ],
    traits: ["즉흥 요리", "창의적 조합", "함께 즐기기"],
    picks: ["유연한 레시피", "새로운 재료", "빠른 완성"],
    tips: ["요리 계획", "기본 레시피", "정리 루틴"],
    match: "ISTJ, INTJ",
    emoji: "✨",
  },
  ENFJ: {
    label: "감성 공유 셰프",
    summary: "사람들과 함께 감성적으로 요리하며 즐거움을 나누는 타입",
    description: [
      "사람들과 감성적으로 요리하는 당신! 함께 요리하며, 맛있는 음식으로 행복을 전달해요.",
      "계획적으로 준비하고, 새로운 레시피를 시도하며, 여유롭게 즐겨요. 요리 후에는 즉시 정리하고, 깔끔한 환경을 유지해요.",
      "요리를 통해 소통하고, 모두가 즐거워하는 것을 좋아해요.",
    ],
    traits: ["감성 요리", "계획적 준비", "함께 나누기"],
    picks: ["정갈한 플레이팅", "응용 레시피", "여유로운 시간"],
    tips: ["빠른 실행", "실용적 접근", "유연한 계획"],
    match: "ISTP, INTP",
    emoji: "💖",
  },
  ENTP: {
    label: "실험 혁신 셰프",
    summary: "빠르고 실험적으로 요리하며 새로운 것을 시도하는 타입",
    description: [
      "빠르고 실험적으로 요리하는 당신! 새로운 조합을 시도하고, 창의적인 레시피를 만들어요.",
      "효율적으로 준비하고, 빠르게 완성하며, 즉흥적으로 변형해요. 사람들과 공유하고, 피드백을 받는 것을 좋아해요.",
      "요리를 통해 실험하고, 새로운 가능성을 탐구하는 것을 즐겨요.",
    ],
    traits: ["실험적 요리", "빠른 실행", "창의적 변형"],
    picks: ["새로운 재료", "효율적 도구", "즉흥 레시피"],
    tips: ["요리 계획", "기본 완성", "정리 습관"],
    match: "ISFJ, ISTJ",
    emoji: "🔬",
  },
  ENTJ: {
    label: "효율 마스터 셰프",
    summary: "계획적이고 효율적으로 요리하며 빠르게 완성하는 타입",
    description: [
      "계획적이고 효율적으로 요리하는 당신! 미리 준비하고, 빠르게 실행하며, 체계적으로 정리해요.",
      "새로운 레시피를 응용하고, 효율적인 방법을 찾으며, 사람들과 공유해요. 요리 후에는 즉시 정리하고, 완벽하게 마무리해요.",
      "요리를 통해 목표를 달성하고, 효율성을 높이는 것을 좋아해요.",
    ],
    traits: ["계획적 준비", "효율적 실행", "빠른 완성"],
    picks: ["체계적 레시피", "효율 도구", "즉시 정리"],
    tips: ["여유 시간", "감성 요리", "유연한 변형"],
    match: "ISFP, INFP",
    emoji: "⚡",
  },
  INFP: {
    label: "감성 창작 셰프",
    summary: "감성적이고 창의적으로 요리하며 조용히 즐기는 타입",
    description: [
      "감성적이고 창의적으로 요리하는 당신! 혼자 조용히 요리하며, 여유롭게 즐기고, 새로운 레시피를 시도해요.",
      "즉흥적으로 변형하고, 감성을 담으며, 나중에 정리해요. 요리 자체를 즐기고, 평온한 시간을 보내요.",
      "요리를 통해 자신을 표현하고, 특별한 순간을 만드는 것을 좋아해요.",
    ],
    traits: ["감성 요리", "창의적 변형", "조용히 즐기기"],
    picks: ["새로운 재료", "여유로운 시간", "즉흥 레시피"],
    tips: ["요리 계획", "빠른 실행", "정리 루틴"],
    match: "ESTJ, ENTJ",
    emoji: "🌸",
  },
  INFJ: {
    label: "완벽 감성 셰프",
    summary: "계획적이고 감성적으로 요리하며 의미를 담는 타입",
    description: [
      "계획적이고 감성적으로 요리하는 당신! 미리 준비하고, 여유롭게 즐기며, 창의적으로 응용해요.",
      "혼자 조용히 요리하며, 감성을 담고, 즉시 정리해요. 요리에 의미를 부여하고, 완벽하게 완성하는 것을 좋아해요.",
      "요리를 통해 특별한 순간을 만들고, 소중한 사람들을 대접해요.",
    ],
    traits: ["계획적 준비", "감성 담기", "조용히 완성"],
    picks: ["응용 레시피", "여유로운 시간", "즉시 정리"],
    tips: ["빠른 실행", "유연한 변형", "함께 즐기기"],
    match: "ESTP, ESFP",
    emoji: "🌙",
  },
  INTP: {
    label: "분석 실험 셰프",
    summary: "효율적이고 실험적으로 요리하며 혼자 탐구하는 타입",
    description: [
      "효율적이고 실험적으로 요리하는 당신! 혼자 조용히 요리하며, 새로운 조합을 시도하고, 빠르게 완성해요.",
      "즉흥적으로 변형하고, 효율을 추구하며, 나중에 정리해요. 요리를 통해 실험하고, 분석하는 것을 좋아해요.",
      "요리를 과학적으로 접근하고, 최적의 방법을 찾는 것을 즐겨요.",
    ],
    traits: ["실험적 요리", "효율적 실행", "혼자 탐구"],
    picks: ["새로운 재료", "빠른 완성", "즉흥 변형"],
    tips: ["요리 계획", "감성 담기", "정리 습관"],
    match: "ESFJ, ENFJ",
    emoji: "🧪",
  },
  INTJ: {
    label: "전략 완벽 셰프",
    summary: "계획적이고 효율적으로 요리하며 완벽을 추구하는 타입",
    description: [
      "계획적이고 효율적으로 요리하는 당신! 미리 준비하고, 빠르게 실행하며, 창의적으로 응용해요.",
      "혼자 조용히 요리하며, 효율을 추구하고, 즉시 정리해요. 요리를 체계적으로 접근하고, 완벽하게 완성하는 것을 좋아해요.",
      "요리를 통해 목표를 달성하고, 최적의 결과를 만드는 것을 즐겨요.",
    ],
    traits: ["계획적 준비", "효율적 실행", "완벽한 완성"],
    picks: ["응용 레시피", "빠른 완성", "즉시 정리"],
    tips: ["여유 시간", "감성 담기", "함께 즐기기"],
    match: "ESFP, ENFP",
    emoji: "🎯",
  },
  ESFP: {
    label: "즉흥 감성 셰프",
    summary: "즉흥적이고 감성적으로 요리하며 사람들과 즐기는 타입",
    description: [
      "즉흥적이고 감성적으로 요리하는 당신! 사람들과 함께 요리하며, 여유롭게 즐기고, 전통적인 레시피를 선호해요.",
      "즉흥적으로 준비하고, 감성을 담으며, 나중에 정리해요. 요리를 통해 즐거움을 나누고, 행복한 시간을 만들어요.",
      "요리 후에는 사람들과 공유하고, 모두가 즐거워하는 것을 좋아해요.",
    ],
    traits: ["즉흥 요리", "감성 담기", "함께 즐기기"],
    picks: ["전통 레시피", "여유로운 시간", "유연한 계획"],
    tips: ["요리 계획", "빠른 실행", "정리 루틴"],
    match: "INTJ, ISTJ",
    emoji: "🎉",
  },
  ESFJ: {
    label: "전통 나눔 셰프",
    summary: "계획적이고 감성적으로 요리하며 사람들을 대접하는 타입",
    description: [
      "계획적이고 감성적으로 요리하는 당신! 미리 준비하고, 여유롭게 요리하며, 전통적인 레시피를 따라요.",
      "사람들과 함께 요리하고, 감성을 담으며, 즉시 정리해요. 요리를 통해 사랑을 전달하고, 소중한 사람들을 대접해요.",
      "요리 후에는 모두가 행복해하는 것을 보며 뿌듯함을 느껴요.",
    ],
    traits: ["계획적 준비", "전통 레시피", "사람들 대접"],
    picks: ["정갈한 플레이팅", "여유로운 시간", "즉시 정리"],
    tips: ["새로운 시도", "빠른 실행", "유연한 계획"],
    match: "INTP, ISTP",
    emoji: "🤝",
  },
  ESTP: {
    label: "즉흥 효율 셰프",
    summary: "즉흥적이고 효율적으로 요리하며 빠르게 완성하는 타입",
    description: [
      "즉흥적이고 효율적으로 요리하는 당신! 빠르게 준비하고, 효율적으로 실행하며, 전통적인 레시피를 선호해요.",
      "사람들과 함께 요리하고, 실용적으로 접근하며, 나중에 정리해요. 요리를 통해 즐거움을 나누고, 빠르게 완성해요.",
      "요리 후에는 사람들과 공유하고, 활발하게 소통해요.",
    ],
    traits: ["즉흥 요리", "효율적 실행", "빠른 완성"],
    picks: ["전통 레시피", "빠른 도구", "유연한 계획"],
    tips: ["요리 계획", "창의적 변형", "정리 루틴"],
    match: "INFJ, ISFJ",
    emoji: "⚡",
  },
  ESTJ: {
    label: "체계 전통 셰프",
    summary: "계획적이고 효율적으로 요리하며 체계적으로 완성하는 타입",
    description: [
      "계획적이고 효율적으로 요리하는 당신! 미리 준비하고, 빠르게 실행하며, 전통적인 레시피를 정확히 따라요.",
      "사람들과 함께 요리하고, 실용적으로 접근하며, 즉시 정리해요. 요리를 체계적으로 완성하고, 완벽하게 마무리해요.",
      "요리 후에는 모두가 만족하는 것을 보며 성취감을 느껴요.",
    ],
    traits: ["계획적 준비", "체계적 실행", "즉시 정리"],
    picks: ["전통 레시피", "효율 도구", "체계적 순서"],
    tips: ["창의적 변형", "여유 시간", "유연한 계획"],
    match: "INFP, INTP",
    emoji: "📋",
  },
  ISFP: {
    label: "감각 예술 셰프",
    summary: "즉흥적이고 감성적으로 요리하며 조용히 창작하는 타입",
    description: [
      "즉흥적이고 감성적으로 요리하는 당신! 혼자 조용히 요리하며, 여유롭게 즐기고, 전통적인 레시피를 선호해요.",
      "즉흥적으로 준비하고, 감성을 담으며, 나중에 정리해요. 요리를 예술처럼 접근하고, 아름답게 완성하는 것을 좋아해요.",
      "요리를 통해 자신만의 스타일을 만들고, 특별한 순간을 즐겨요.",
    ],
    traits: ["즉흥 요리", "감성 담기", "조용히 창작"],
    picks: ["전통 재료", "여유로운 시간", "유연한 방식"],
    tips: ["요리 계획", "빠른 실행", "정리 습관"],
    match: "ENTJ, ESTJ",
    emoji: "🎨",
  },
  ISFJ: {
    label: "정성 전통 셰프",
    summary: "계획적이고 감성적으로 요리하며 정성스럽게 완성하는 타입",
    description: [
      "계획적이고 감성적으로 요리하는 당신! 미리 준비하고, 여유롭게 요리하며, 전통적인 레시피를 정확히 따라요.",
      "혼자 조용히 요리하고, 감성을 담으며, 즉시 정리해요. 요리에 정성을 담고, 소중한 사람들을 위해 완성해요.",
      "요리를 통해 사랑을 표현하고, 따뜻한 마음을 전달해요.",
    ],
    traits: ["계획적 준비", "정성 담기", "전통 레시피"],
    picks: ["익숙한 재료", "여유로운 시간", "즉시 정리"],
    tips: ["새로운 시도", "빠른 실행", "함께 즐기기"],
    match: "ENTP, ESTP",
    emoji: "💝",
  },
  ISTP: {
    label: "실용 기술 셰프",
    summary: "즉흥적이고 효율적으로 요리하며 기술적으로 완성하는 타입",
    description: [
      "즉흥적이고 효율적으로 요리하는 당신! 혼자 조용히 요리하며, 빠르게 완성하고, 전통적인 레시피를 선호해요.",
      "즉흥적으로 준비하고, 실용적으로 접근하며, 나중에 정리해요. 요리를 기술적으로 접근하고, 효율적으로 완성해요.",
      "요리를 통해 실용성을 추구하고, 최소한의 노력으로 최대 효과를 내요.",
    ],
    traits: ["즉흥 요리", "효율적 실행", "기술적 완성"],
    picks: ["전통 레시피", "빠른 도구", "유연한 방식"],
    tips: ["요리 계획", "감성 담기", "정리 습관"],
    match: "ENFJ, ESFJ",
    emoji: "🔧",
  },
  ISTJ: {
    label: "원칙 정확 셰프",
    summary: "계획적이고 체계적으로 요리하며 정확하게 완성하는 타입",
    description: [
      "계획적이고 체계적으로 요리하는 당신! 미리 준비하고, 빠르게 실행하며, 전통적인 레시피를 정확히 따라요.",
      "혼자 조용히 요리하고, 실용적으로 접근하며, 즉시 정리해요. 요리를 원칙에 따라 완성하고, 완벽하게 마무리해요.",
      "요리를 통해 안정감을 느끼고, 신뢰할 수 있는 결과를 만들어요.",
    ],
    traits: ["계획적 준비", "정확한 실행", "즉시 정리"],
    picks: ["전통 레시피", "익숙한 재료", "체계적 순서"],
    tips: ["창의적 변형", "여유 시간", "함께 즐기기"],
    match: "ENFP, ESFP",
    emoji: "📐",
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const mbtiType = (searchParams.get("type") as keyof typeof cookingTypes) || "ENFP"
  const resultId = searchParams.get("id")
  const character = cookingTypes[mbtiType]
  const [result, setResult] = useState<any>(null)

  useEffect(() => {
    if (resultId) {
      getTestResult(resultId)
        .then((data) => setResult(data))
        .catch((err) => console.error("결과 조회 실패:", err))
    }
  }, [resultId])

  const currentUrl = typeof window !== "undefined" ? window.location.href : ""
  const shareTitle = `나의 요리 스타일은 "${character.label}" ${character.emoji}`
  const shareText = `${character.summary}\n\n나도 요리 스타일 테스트 하러 가기 👨‍🍳`

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <main className="container max-w-4xl mx-auto px-4 py-8 space-y-8">
        <Card className="border-0 shadow-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur">
          <CardContent className="p-8 md:p-12">
            <div className="text-center space-y-6">
              <Badge variant="secondary" className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                {mbtiType}
              </Badge>

              <div>
                <div className="text-6xl mb-4">{character.emoji}</div>
                <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  {character.label}
                </h1>
                <p className="text-xl text-muted-foreground">{character.summary}</p>
              </div>

              <div className="pt-6">
                <ShareButtons title={shareTitle} text={shareText} url={currentUrl} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur">
          <CardContent className="p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold">상세 분석</h2>
            </div>
            <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
              {character.description.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur">
          <CardContent className="p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl">
                <ChefHat className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold">주요 특징</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.traits.map((trait, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 rounded-xl text-center font-medium"
                >
                  {trait}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur">
          <CardContent className="p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold">추천 요리 스타일</h2>
            </div>
            <div className="space-y-3">
              {character.picks.map((pick, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                  <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full" />
                  <span className="text-lg">{pick}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur">
          <CardContent className="p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl">
                <Lightbulb className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold">성장 포인트</h2>
            </div>
            <div className="space-y-3">
              {character.tips.map((tip, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                  <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full" />
                  <span className="text-lg">{tip}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur">
          <CardContent className="p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold">궁합</h2>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 rounded-xl">
              <p className="text-lg mb-2 text-muted-foreground">최고의 요리 파트너</p>
              <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{character.match}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-gradient-to-br from-orange-500 to-red-500">
          <CardContent className="p-8">
            <div className="text-center space-y-6 text-white">
              <h2 className="text-2xl font-bold">다른 테스트도 해보세요!</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  size="lg"
                  variant="secondary"
                  className="h-auto py-4 bg-white/20 hover:bg-white/30 text-white border-white/30"
                  asChild
                >
                  <Link href="/tests/breakfast-style">
                    <div className="text-left w-full">
                      <div className="text-2xl mb-1">🥐</div>
                      <div className="font-semibold">아침식사 스타일</div>
                    </div>
                    <ArrowRight className="ml-auto h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  className="h-auto py-4 bg-white/20 hover:bg-white/30 text-white border-white/30"
                  asChild
                >
                  <Link href="/tests/meal-prep">
                    <div className="text-left w-full">
                      <div className="text-2xl mb-1">🍱</div>
                      <div className="font-semibold">밀프렙 스타일</div>
                    </div>
                    <ArrowRight className="ml-auto h-5 w-5" />
                  </Link>
                </Button>
              </div>
              <Button
                size="lg"
                variant="secondary"
                className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30"
                asChild
              >
                <Link href="/">전체 테스트 보기</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default function CookingStyleResult() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="text-4xl animate-bounce">👨‍🍳</div>
            <p className="text-muted-foreground">결과 로딩 중...</p>
          </div>
        </div>
      }
    >
      <ResultContent />
    </Suspense>
  )
}

