"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShareButtons } from "@/components/share-buttons"
import { Package, Heart, Lightbulb, Users, ArrowRight, Sparkles } from "lucide-react"
import { getTestResult } from "@/lib/api-client"

const leftoverTypes = {
  ENFP: {
    label: "즉흥 창의 활용러",
    summary: "즉흥적이고 창의적으로 남은 음식을 변형하며 나누는 타입",
    description: [
      "즉흥적이고 창의적으로 처리하는 당신! 남은 음식을 새로운 요리로 변형하고, 사람들과 나누며, 아까운 마음으로 챙겨요.",
      "편하게 보관하고, 그때그때 처리하며, 실험적인 방법을 시도해요. 남은 음식도 특별한 재료가 되어, 새로운 맛을 만들어요.",
      "처리를 통해 즐거움을 느끼고, 모두가 행복해하는 순간을 만들어요.",
    ],
    traits: ["즉흥 처리", "창의적 변형", "적극적 나눔"],
    picks: ["새로운 레시피", "편한 보관", "즉흥 활용"],
    tips: ["계획적 보관", "라벨 표시", "정리 습관"],
    match: "ISTJ, INTJ",
    emoji: "✨",
  },
  ENFJ: {
    label: "계획 나눔 활용러",
    summary: "계획적으로 남은 음식을 관리하며 사람들과 나누는 타입",
    description: [
      "계획적이고 감성적으로 처리하는 당신! 남은 음식을 체계적으로 보관하고, 즉시 정리하며, 사람들과 나눠요.",
      "창의적으로 변형하고, 아까운 마음으로 챙기며, 적극적으로 공유해요. 남은 음식을 통해 사람들을 배려하고, 행복을 나눠요.",
      "처리를 통해 뿌듯함을 느끼고, 모두가 만족하는 결과를 만들어요.",
    ],
    traits: ["계획적 관리", "감성 처리", "적극적 나눔"],
    picks: ["체계적 보관", "즉시 정리", "창의적 변형"],
    tips: ["유연한 처리", "즉흥 활용", "최소 정리"],
    match: "ISTP, INTP",
    emoji: "💖",
  },
  ENTP: {
    label: "실험 혁신 활용러",
    summary: "즉흥적이고 논리적으로 남은 음식을 실험하는 타입",
    description: [
      "즉흥적이고 논리적으로 처리하는 당신! 남은 음식을 창의적으로 변형하고, 효율적으로 활용하며, 사람들과 나눠요.",
      "편하게 보관하고, 그때그때 처리하며, 새로운 방법을 시도해요. 남은 음식을 실험 재료로 보고, 최적의 활용을 고민해요.",
      "처리를 통해 새로운 가능성을 탐구하고, 효율성을 높여요.",
    ],
    traits: ["실험적 처리", "논리적 활용", "적극적 공유"],
    picks: ["창의적 변형", "효율적 보관", "즉흥 처리"],
    tips: ["계획적 관리", "전통 방식", "정리 습관"],
    match: "ISFJ, ISTJ",
    emoji: "🔬",
  },
  ENTJ: {
    label: "전략 효율 활용러",
    summary: "계획적이고 논리적으로 남은 음식을 효율적으로 관리하는 타입",
    description: [
      "계획적이고 논리적으로 처리하는 당신! 남은 음식을 체계적으로 보관하고, 즉시 정리하며, 효율적으로 활용해요.",
      "창의적으로 변형하고, 합리적으로 판단하며, 사람들과 공유해요. 남은 음식을 자원으로 보고, 최적의 관리를 실현해요.",
      "처리를 통해 효율성을 높이고, 완벽한 결과를 만들어요.",
    ],
    traits: ["계획적 관리", "효율적 활용", "체계적 보관"],
    picks: ["즉시 정리", "창의적 변형", "논리적 판단"],
    tips: ["감성 담기", "유연한 처리", "최소 정리"],
    match: "ISFP, INFP",
    emoji: "⚡",
  },
  INFP: {
    label: "감성 창의 보관러",
    summary: "즉흥적이고 감성적으로 남은 음식을 조용히 챙기는 타입",
    description: [
      "즉흥적이고 감성적으로 처리하는 당신! 남은 음식을 아까운 마음으로 챙기고, 창의적으로 변형하며, 조용히 보관해요.",
      "편하게 보관하고, 나중에 여유있게 처리하며, 특별한 의미를 부여해요. 남은 음식도 소중한 자원으로 보고, 마음을 담아요.",
      "처리를 통해 평온함을 느끼고, 자신만의 방식을 만들어요.",
    ],
    traits: ["감성 처리", "창의적 변형", "조용한 보관"],
    picks: ["편한 보관", "여유로운 처리", "의미 부여"],
    tips: ["계획적 관리", "즉시 정리", "적극적 나눔"],
    match: "ESTJ, ENTJ",
    emoji: "🌸",
  },
  INFJ: {
    label: "완벽 감성 보관러",
    summary: "계획적이고 감성적으로 남은 음식을 의미있게 관리하는 타입",
    description: [
      "계획적이고 감성적으로 처리하는 당신! 남은 음식을 체계적으로 보관하고, 즉시 정리하며, 창의적으로 변형해요.",
      "아까운 마음으로 챙기고, 조용히 처리하며, 특별한 의미를 부여해요. 남은 음식을 소중히 여기고, 완벽하게 관리해요.",
      "처리를 통해 뿌듯함을 느끼고, 의미있는 순간을 만들어요.",
    ],
    traits: ["계획적 관리", "감성 담기", "완벽한 보관"],
    picks: ["체계적 보관", "즉시 정리", "창의적 변형"],
    tips: ["유연한 처리", "즉흥 활용", "적극적 나눔"],
    match: "ESTP, ESFP",
    emoji: "🌙",
  },
  INTP: {
    label: "분석 효율 보관러",
    summary: "즉흥적이고 논리적으로 남은 음식을 효율적으로 처리하는 타입",
    description: [
      "즉흥적이고 논리적으로 처리하는 당신! 남은 음식을 편하게 보관하고, 창의적으로 변형하며, 효율적으로 활용해요.",
      "그때그때 처리하고, 조용히 관리하며, 합리적으로 판단해요. 남은 음식을 자원으로 보고, 최적의 활용을 고민해요.",
      "처리를 통해 효율성을 추구하고, 논리적인 방법을 찾아요.",
    ],
    traits: ["논리적 처리", "효율적 활용", "조용한 관리"],
    picks: ["편한 보관", "창의적 변형", "즉흥 활용"],
    tips: ["계획적 관리", "감성 담기", "정리 습관"],
    match: "ESFJ, ENFJ",
    emoji: "🧪",
  },
  INTJ: {
    label: "전략 완벽 보관러",
    summary: "계획적이고 논리적으로 남은 음식을 완벽하게 관리하는 타입",
    description: [
      "계획적이고 논리적으로 처리하는 당신! 남은 음식을 체계적으로 보관하고, 즉시 정리하며, 창의적으로 변형해요.",
      "효율적으로 활용하고, 조용히 관리하며, 완벽하게 처리해요. 남은 음식을 자원으로 보고, 최적의 관리를 실현해요.",
      "처리를 통해 완벽함을 추구하고, 효율적인 시스템을 만들어요.",
    ],
    traits: ["계획적 관리", "완벽한 보관", "효율적 활용"],
    picks: ["체계적 보관", "즉시 정리", "창의적 변형"],
    tips: ["감성 담기", "유연한 처리", "적극적 나눔"],
    match: "ESFP, ENFP",
    emoji: "🎯",
  },
  ESFP: {
    label: "즉흥 감성 활용러",
    summary: "즉흥적이고 감성적으로 남은 음식을 즐겁게 활용하는 타입",
    description: [
      "즉흥적이고 감성적으로 처리하는 당신! 남은 음식을 그대로 먹거나, 간단히 활용하고, 사람들과 나눠요.",
      "정확히 보관하고, 아까운 마음으로 챙기며, 적극적으로 공유해요. 남은 음식을 통해 즐거움을 나누고, 행복한 시간을 만들어요.",
      "처리를 통해 뿌듯함을 느끼고, 모두가 만족하는 순간을 만들어요.",
    ],
    traits: ["즉흥 처리", "감성 담기", "적극적 나눔"],
    picks: ["전통 방식", "간단 활용", "즉시 공유"],
    tips: ["계획적 관리", "창의적 변형", "정리 습관"],
    match: "INTJ, ISTJ",
    emoji: "🎉",
  },
  ESFJ: {
    label: "전통 나눔 보관러",
    summary: "계획적이고 감성적으로 남은 음식을 정성스럽게 관리하는 타입",
    description: [
      "계획적이고 감성적으로 처리하는 당신! 남은 음식을 정확히 보관하고, 즉시 정리하며, 사람들과 나눠요.",
      "그대로 먹거나 전통 방식으로 활용하고, 아까운 마음으로 챙기며, 적극적으로 공유해요. 남은 음식을 통해 사람들을 챙기고, 행복을 나눠요.",
      "처리를 통해 뿌듯함을 느끼고, 모두가 만족하는 결과를 만들어요.",
    ],
    traits: ["계획적 관리", "정성 담기", "적극적 나눔"],
    picks: ["정확한 보관", "즉시 정리", "전통 활용"],
    tips: ["창의적 변형", "유연한 처리", "최소 정리"],
    match: "INTP, ISTP",
    emoji: "🤝",
  },
  ESTP: {
    label: "즉흥 빠른 활용러",
    summary: "즉흥적이고 논리적으로 남은 음식을 빠르게 처리하는 타입",
    description: [
      "즉흥적이고 논리적으로 처리하는 당신! 남은 음식을 그대로 먹거나, 빠르게 활용하고, 사람들과 나눠요.",
      "정확히 보관하고, 효율적으로 처리하며, 적극적으로 공유해요. 남은 음식을 실용적으로 활용하고, 빠르게 해결해요.",
      "처리를 통해 효율성을 느끼고, 모두가 만족하는 결과를 만들어요.",
    ],
    traits: ["즉흥 처리", "빠른 활용", "적극적 공유"],
    picks: ["전통 방식", "간단 활용", "즉시 공유"],
    tips: ["계획적 관리", "창의적 변형", "정리 습관"],
    match: "INFJ, ISFJ",
    emoji: "⚡",
  },
  ESTJ: {
    label: "체계 전통 보관러",
    summary: "계획적이고 논리적으로 남은 음식을 체계적으로 관리하는 타입",
    description: [
      "계획적이고 논리적으로 처리하는 당신! 남은 음식을 정확히 보관하고, 즉시 정리하며, 전통 방식으로 활용해요.",
      "효율적으로 처리하고, 사람들과 나누며, 체계적으로 관리해요. 남은 음식을 자원으로 보고, 완벽하게 관리해요.",
      "처리를 통해 효율성을 높이고, 체계적인 시스템을 만들어요.",
    ],
    traits: ["계획적 관리", "체계적 보관", "효율적 활용"],
    picks: ["정확한 보관", "즉시 정리", "전통 활용"],
    tips: ["창의적 변형", "감성 담기", "유연한 처리"],
    match: "INFP, INTP",
    emoji: "📋",
  },
  ISFP: {
    label: "감각 예술 보관러",
    summary: "즉흥적이고 감성적으로 남은 음식을 조용히 챙기는 타입",
    description: [
      "즉흥적이고 감성적으로 처리하는 당신! 남은 음식을 정확히 보관하고, 아까운 마음으로 챙기며, 조용히 처리해요.",
      "그대로 먹거나 간단히 활용하고, 나중에 여유있게 처리해요. 남은 음식을 예술처럼 접근하고, 아름답게 보관해요.",
      "처리를 통해 평온함을 느끼고, 자신만의 스타일을 만들어요.",
    ],
    traits: ["감성 처리", "조용한 보관", "전통 활용"],
    picks: ["정확한 보관", "여유로운 처리", "감성 담기"],
    tips: ["계획적 관리", "창의적 변형", "적극적 나눔"],
    match: "ENTJ, ESTJ",
    emoji: "🎨",
  },
  ISFJ: {
    label: "정성 전통 보관러",
    summary: "계획적이고 감성적으로 남은 음식을 정성스럽게 보관하는 타입",
    description: [
      "계획적이고 감성적으로 처리하는 당신! 남은 음식을 정확히 보관하고, 즉시 정리하며, 전통 방식으로 활용해요.",
      "아까운 마음으로 챙기고, 조용히 처리하며, 정성을 담아요. 남은 음식을 소중히 여기고, 완벽하게 보관해요.",
      "처리를 통해 뿌듯함을 느끼고, 소중한 사람들을 위해 챙겨요.",
    ],
    traits: ["계획적 관리", "정성 담기", "전통 활용"],
    picks: ["정확한 보관", "즉시 정리", "감성 담기"],
    tips: ["창의적 변형", "유연한 처리", "적극적 나눔"],
    match: "ENTP, ESTP",
    emoji: "💝",
  },
  ISTP: {
    label: "실용 기술 보관러",
    summary: "즉흥적이고 논리적으로 남은 음식을 실용적으로 처리하는 타입",
    description: [
      "즉흥적이고 논리적으로 처리하는 당신! 남은 음식을 정확히 보관하고, 그대로 먹거나 간단히 활용하며, 조용히 처리해요.",
      "효율적으로 관리하고, 나중에 여유있게 처리하며, 실용적으로 접근해요. 남은 음식을 최소한의 노력으로 최대 효과를 내요.",
      "처리를 통해 효율성을 추구하고, 합리적인 방법을 찾아요.",
    ],
    traits: ["즉흥 처리", "실용적 활용", "조용한 관리"],
    picks: ["정확한 보관", "간단 활용", "최소 정리"],
    tips: ["계획적 관리", "창의적 변형", "적극적 나눔"],
    match: "ENFJ, ESFJ",
    emoji: "🔧",
  },
  ISTJ: {
    label: "원칙 정확 보관러",
    summary: "계획적이고 논리적으로 남은 음식을 원칙에 따라 관리하는 타입",
    description: [
      "계획적이고 논리적으로 처리하는 당신! 남은 음식을 정확히 보관하고, 즉시 정리하며, 전통 방식으로 활용해요.",
      "효율적으로 처리하고, 조용히 관리하며, 체계적으로 보관해요. 남은 음식을 원칙에 따라 관리하고, 완벽하게 처리해요.",
      "처리를 통해 안정감을 느끼고, 신뢰할 수 있는 시스템을 만들어요.",
    ],
    traits: ["계획적 관리", "원칙 준수", "체계적 보관"],
    picks: ["정확한 보관", "즉시 정리", "전통 활용"],
    tips: ["창의적 변형", "감성 담기", "유연한 처리"],
    match: "ENFP, ESFP",
    emoji: "📐",
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const mbtiType = (searchParams.get("type") as keyof typeof leftoverTypes) || "ENFP"
  const resultId = searchParams.get("id")
  const character = leftoverTypes[mbtiType]
  const [result, setResult] = useState<any>(null)

  useEffect(() => {
    if (resultId) {
      getTestResult(resultId)
        .then((data) => setResult(data))
        .catch((err) => console.error("결과 조회 실패:", err))
    }
  }, [resultId])

  const currentUrl = typeof window !== "undefined" ? window.location.href : ""
  const shareTitle = `나의 남은 음식 처리 스타일은 "${character.label}" ${character.emoji}`
  const shareText = `${character.summary}\n\n나도 남은 음식 처리 스타일 테스트 하러 가기 📦`

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <main className="container max-w-4xl mx-auto px-4 py-8 space-y-8">
        <Card className="border-0 shadow-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur">
          <CardContent className="p-8 md:p-12">
            <div className="text-center space-y-6">
              <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                {mbtiType}
              </Badge>

              <div>
                <div className="text-6xl mb-4">{character.emoji}</div>
                <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent">
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
              <div className="p-3 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl">
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
              <div className="p-3 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl">
                <Package className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold">주요 특징</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.traits.map((trait, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950 dark:to-yellow-950 rounded-xl text-center font-medium"
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
              <div className="p-3 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold">추천 처리 스타일</h2>
            </div>
            <div className="space-y-3">
              {character.picks.map((pick, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 bg-amber-50 dark:bg-amber-950 rounded-lg">
                  <div className="w-2 h-2 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full" />
                  <span className="text-lg">{pick}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur">
          <CardContent className="p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl">
                <Lightbulb className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold">성장 포인트</h2>
            </div>
            <div className="space-y-3">
              {character.tips.map((tip, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 bg-amber-50 dark:bg-amber-950 rounded-lg">
                  <div className="w-2 h-2 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full" />
                  <span className="text-lg">{tip}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur">
          <CardContent className="p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold">궁합</h2>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950 dark:to-yellow-950 rounded-xl">
              <p className="text-lg mb-2 text-muted-foreground">최고의 처리 파트너</p>
              <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">{character.match}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-gradient-to-br from-amber-500 to-yellow-500">
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
                  <Link href="/tests/food-sharing">
                    <div className="text-left w-full">
                      <div className="text-2xl mb-1">🤝</div>
                      <div className="font-semibold">음식 나눔 스타일</div>
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
                  <Link href="/tests/cooking-style">
                    <div className="text-left w-full">
                      <div className="text-2xl mb-1">👨‍🍳</div>
                      <div className="font-semibold">요리 스타일</div>
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

export default function LeftoverHandlingResult() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="text-4xl animate-bounce">📦</div>
            <p className="text-muted-foreground">결과 로딩 중...</p>
          </div>
        </div>
      }
    >
      <ResultContent />
    </Suspense>
  )
}

