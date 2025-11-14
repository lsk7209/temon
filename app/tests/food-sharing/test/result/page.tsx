"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShareButtons } from "@/components/share-buttons"
import { Share2, Heart, Lightbulb, Users, ArrowRight, Sparkles } from "lucide-react"
import { getTestResult } from "@/lib/api-client"

const sharingTypes = {
  ENFP: {
    label: "즉흥 나눔 천사",
    summary: "즉흥적이고 창의적으로 모두와 나누며 즐거움을 주는 타입",
    description: [
      "즉흥적이고 창의적으로 나누는 당신! 모두에게 골고루 나누며, 새로운 방식으로 즐겁게 나눠요.",
      "활발하게 소통하며 나누고, 여유있게 넉넉히 주는 것을 좋아해요. 나눔 자체를 즐기고, 사람들의 행복한 표정을 보는 것을 좋아해요.",
      "나눔을 통해 감성을 나누고, 모두가 즐거워하는 순간을 만들어요.",
    ],
    traits: ["즉흥 나눔", "창의적 방식", "모두와 공유"],
    picks: ["넉넉한 양", "새로운 방식", "활발한 분위기"],
    tips: ["나눔 계획", "균등 배분", "정리 습관"],
    match: "ISTJ, INTJ",
    emoji: "✨",
  },
  ENFJ: {
    label: "계획 나눔 리더",
    summary: "계획적이고 감성적으로 모두를 배려하며 나누는 타입",
    description: [
      "계획적이고 감성적으로 나누는 당신! 미리 준비하고, 모두에게 골고루 나누며, 활발하게 소통해요.",
      "창의적인 방식으로 나누고, 감성을 담아 전달해요. 나눔을 통해 사람들을 하나로 모으고, 즐거운 시간을 만들어요.",
      "나눔 후에는 체계적으로 정리하고, 모두가 만족하는지 확인해요.",
    ],
    traits: ["계획적 나눔", "모두 배려", "활발한 소통"],
    picks: ["창의적 방식", "균등 배분", "체계적 정리"],
    tips: ["즉흥적 나눔", "유연한 변경", "개인 시간"],
    match: "ISTP, INTP",
    emoji: "💖",
  },
  ENTP: {
    label: "실험 나눔 혁신가",
    summary: "즉흥적이고 창의적으로 논리적으로 나누는 타입",
    description: [
      "즉흥적이고 창의적으로 나누는 당신! 새로운 방식을 시도하고, 논리적으로 배분하며, 모두에게 나눠요.",
      "활발하게 소통하고, 여유있게 넉넉히 주며, 나눔을 실험처럼 즐겨요. 효율적인 방법을 찾고, 최적의 배분을 고민해요.",
      "나눔을 통해 새로운 가능성을 탐구하고, 사람들과 소통해요.",
    ],
    traits: ["실험적 나눔", "논리적 배분", "창의적 방식"],
    picks: ["새로운 방식", "넉넉한 양", "활발한 소통"],
    tips: ["나눔 계획", "균등 배분", "정리 습관"],
    match: "ISFJ, ISTJ",
    emoji: "🔬",
  },
  ENTJ: {
    label: "전략 나눔 리더",
    summary: "계획적이고 논리적으로 효율적으로 나누는 타입",
    description: [
      "계획적이고 논리적으로 나누는 당신! 미리 준비하고, 효율적으로 배분하며, 모두에게 공정하게 나눠요.",
      "창의적인 방식으로 시도하고, 활발하게 소통하며, 체계적으로 정리해요. 나눔을 목표 달성처럼 완벽하게 실행해요.",
      "나눔을 통해 효율성을 높이고, 모두가 만족하는 결과를 만들어요.",
    ],
    traits: ["계획적 나눔", "논리적 배분", "효율적 실행"],
    picks: ["창의적 방식", "체계적 정리", "공정한 배분"],
    tips: ["감성 담기", "여유 시간", "유연한 변경"],
    match: "ISFP, INFP",
    emoji: "⚡",
  },
  INFP: {
    label: "감성 나눔 예술가",
    summary: "즉흥적이고 감성적으로 조용히 나누는 타입",
    description: [
      "즉흥적이고 감성적으로 나누는 당신! 가까운 사람 중심으로, 조용히 나누며, 창의적인 방식을 시도해요.",
      "여유있게 넉넉히 주고, 감성을 담아 전달하며, 자연스럽게 마무리해요. 나눔에 의미를 부여하고, 특별한 순간을 만들어요.",
      "나눔을 통해 자신의 마음을 표현하고, 소중한 사람들에게 사랑을 전달해요.",
    ],
    traits: ["감성 나눔", "조용한 배려", "창의적 방식"],
    picks: ["넉넉한 양", "의미 있는 나눔", "자연스러운 마무리"],
    tips: ["계획적 준비", "모두에게 나눔", "정리 습관"],
    match: "ESTJ, ENTJ",
    emoji: "🌸",
  },
  INFJ: {
    label: "완벽 나눔 배려자",
    summary: "계획적이고 감성적으로 의미있게 나누는 타입",
    description: [
      "계획적이고 감성적으로 나누는 당신! 미리 준비하고, 가까운 사람 중심으로, 조용히 나누며, 창의적인 방식을 시도해요.",
      "감성을 담아 전달하고, 체계적으로 정리하며, 나눔에 깊은 의미를 부여해요. 모두가 행복해하는 것을 보며 뿌듯함을 느껴요.",
      "나눔을 통해 특별한 순간을 만들고, 소중한 사람들에게 사랑을 전달해요.",
    ],
    traits: ["계획적 나눔", "의미 있는 배려", "조용한 전달"],
    picks: ["창의적 방식", "감성 담기", "체계적 정리"],
    tips: ["즉흥적 나눔", "모두에게 나눔", "유연한 변경"],
    match: "ESTP, ESFP",
    emoji: "🌙",
  },
  INTP: {
    label: "분석 나눔 전략가",
    summary: "즉흥적이고 논리적으로 효율적으로 나누는 타입",
    description: [
      "즉흥적이고 논리적으로 나누는 당신! 가까운 사람 중심으로, 조용히 나누며, 창의적인 방식을 시도해요.",
      "효율적으로 배분하고, 여유있게 넉넉히 주며, 자연스럽게 마무리해요. 나눔을 논리적으로 접근하고, 최적의 방법을 찾아요.",
      "나눔을 통해 효율성을 추구하고, 합리적인 배분을 고민해요.",
    ],
    traits: ["논리적 나눔", "효율적 배분", "창의적 방식"],
    picks: ["넉넉한 양", "합리적 방법", "자연스러운 마무리"],
    tips: ["감성 담기", "모두에게 나눔", "정리 습관"],
    match: "ESFJ, ENFJ",
    emoji: "🧪",
  },
  INTJ: {
    label: "전략 나눔 마스터",
    summary: "계획적이고 논리적으로 완벽하게 나누는 타입",
    description: [
      "계획적이고 논리적으로 나누는 당신! 미리 준비하고, 가까운 사람 중심으로, 조용히 나누며, 창의적인 방식을 시도해요.",
      "효율적으로 배분하고, 체계적으로 정리하며, 나눔을 완벽하게 실행해요. 목표 지향적으로 접근하고, 최적의 결과를 만들어요.",
      "나눔을 통해 완벽함을 추구하고, 모두가 만족하는 배분을 실현해요.",
    ],
    traits: ["계획적 나눔", "논리적 배분", "완벽한 실행"],
    picks: ["창의적 방식", "효율적 배분", "체계적 정리"],
    tips: ["감성 담기", "모두에게 나눔", "유연한 변경"],
    match: "ESFP, ENFP",
    emoji: "🎯",
  },
  ESFP: {
    label: "즉흥 감성 나눔러",
    summary: "즉흥적이고 감성적으로 모두와 즐겁게 나누는 타입",
    description: [
      "즉흥적이고 감성적으로 나누는 당신! 모두에게 골고루 나누고, 활발하게 소통하며, 전통적인 방식을 선호해요.",
      "정확히 균등하게 배분하고, 감성을 담아 전달하며, 자연스럽게 마무리해요. 나눔을 통해 즐거움을 나누고, 모두가 행복해하는 것을 좋아해요.",
      "나눔 후에는 함께 즐기고, 활발하게 소통해요.",
    ],
    traits: ["즉흥 나눔", "감성 전달", "모두와 공유"],
    picks: ["전통 방식", "균등 배분", "활발한 소통"],
    tips: ["계획적 준비", "정리 습관", "시간 관리"],
    match: "INTJ, ISTJ",
    emoji: "🎉",
  },
  ESFJ: {
    label: "전통 나눔 봉사자",
    summary: "계획적이고 감성적으로 모두를 챙기며 나누는 타입",
    description: [
      "계획적이고 감성적으로 나누는 당신! 미리 준비하고, 모두에게 골고루 나누며, 활발하게 소통해요.",
      "전통적인 방식으로 나누고, 정확히 균등하게 배분하며, 체계적으로 정리해요. 나눔을 통해 사람들을 챙기고, 모두가 만족하는 것을 확인해요.",
      "나눔 후에는 함께 즐기고, 모두가 행복해하는 것을 보며 뿌듯함을 느껴요.",
    ],
    traits: ["계획적 나눔", "균등 배분", "모두 챙기기"],
    picks: ["전통 방식", "체계적 정리", "활발한 소통"],
    tips: ["창의적 시도", "유연한 변경", "개인 시간"],
    match: "INTP, ISTP",
    emoji: "🤝",
  },
  ESTP: {
    label: "즉흥 활력 나눔러",
    summary: "즉흥적이고 논리적으로 빠르게 나누는 타입",
    description: [
      "즉흥적이고 논리적으로 나누는 당신! 모두에게 골고루 나누고, 활발하게 소통하며, 전통적인 방식을 선호해요.",
      "정확히 균등하게 배분하고, 효율적으로 나누며, 자연스럽게 마무리해요. 나눔을 빠르게 실행하고, 모두가 만족하는 결과를 만들어요.",
      "나눔 후에는 함께 즐기고, 활발하게 소통해요.",
    ],
    traits: ["즉흥 나눔", "빠른 실행", "모두와 공유"],
    picks: ["전통 방식", "균등 배분", "활발한 소통"],
    tips: ["계획적 준비", "감성 담기", "정리 습관"],
    match: "INFJ, ISFJ",
    emoji: "⚡",
  },
  ESTJ: {
    label: "체계 나눔 관리자",
    summary: "계획적이고 논리적으로 체계적으로 나누는 타입",
    description: [
      "계획적이고 논리적으로 나누는 당신! 미리 준비하고, 모두에게 골고루 나누며, 활발하게 소통해요.",
      "전통적인 방식으로 나누고, 정확히 균등하게 배분하며, 체계적으로 정리해요. 나눔을 완벽하게 실행하고, 공정하게 관리해요.",
      "나눔 후에는 모두가 만족하는지 확인하고, 체계적으로 마무리해요.",
    ],
    traits: ["계획적 나눔", "공정한 배분", "체계적 관리"],
    picks: ["전통 방식", "균등 배분", "체계적 정리"],
    tips: ["창의적 시도", "감성 담기", "유연한 변경"],
    match: "INFP, INTP",
    emoji: "📋",
  },
  ISFP: {
    label: "감각 나눔 예술가",
    summary: "즉흥적이고 감성적으로 조용히 배려하며 나누는 타입",
    description: [
      "즉흥적이고 감성적으로 나누는 당신! 가까운 사람 중심으로, 조용히 나누며, 전통적인 방식을 선호해요.",
      "정확히 균등하게 배분하고, 감성을 담아 전달하며, 자연스럽게 마무리해요. 나눔을 예술처럼 접근하고, 아름답게 완성해요.",
      "나눔을 통해 자신만의 스타일을 만들고, 소중한 사람들에게 사랑을 전달해요.",
    ],
    traits: ["감성 나눔", "조용한 배려", "전통 방식"],
    picks: ["균등 배분", "감성 담기", "자연스러운 마무리"],
    tips: ["계획적 준비", "모두에게 나눔", "정리 습관"],
    match: "ENTJ, ESTJ",
    emoji: "🎨",
  },
  ISFJ: {
    label: "정성 나눔 수호자",
    summary: "계획적이고 감성적으로 정성스럽게 나누는 타입",
    description: [
      "계획적이고 감성적으로 나누는 당신! 미리 준비하고, 가까운 사람 중심으로, 조용히 나누며, 전통적인 방식을 따라요.",
      "정확히 균등하게 배분하고, 감성을 담아 전달하며, 체계적으로 정리해요. 나눔에 정성을 담고, 소중한 사람들을 위해 완성해요.",
      "나눔을 통해 사랑을 표현하고, 따뜻한 마음을 전달해요.",
    ],
    traits: ["계획적 나눔", "정성 담기", "조용한 배려"],
    picks: ["전통 방식", "균등 배분", "체계적 정리"],
    tips: ["창의적 시도", "모두에게 나눔", "유연한 변경"],
    match: "ENTP, ESTP",
    emoji: "💝",
  },
  ISTP: {
    label: "실용 나눔 기술자",
    summary: "즉흥적이고 논리적으로 실용적으로 나누는 타입",
    description: [
      "즉흥적이고 논리적으로 나누는 당신! 가까운 사람 중심으로, 조용히 나누며, 전통적인 방식을 선호해요.",
      "정확히 균등하게 배분하고, 효율적으로 나누며, 자연스럽게 마무리해요. 나눔을 실용적으로 접근하고, 최소한의 노력으로 최대 효과를 내요.",
      "나눔을 통해 효율성을 추구하고, 합리적인 배분을 실현해요.",
    ],
    traits: ["즉흥 나눔", "실용적 배분", "효율적 실행"],
    picks: ["전통 방식", "균등 배분", "자연스러운 마무리"],
    tips: ["계획적 준비", "감성 담기", "정리 습관"],
    match: "ENFJ, ESFJ",
    emoji: "🔧",
  },
  ISTJ: {
    label: "원칙 나눔 수호자",
    summary: "계획적이고 논리적으로 원칙에 따라 나누는 타입",
    description: [
      "계획적이고 논리적으로 나누는 당신! 미리 준비하고, 가까운 사람 중심으로, 조용히 나누며, 전통적인 방식을 정확히 따라요.",
      "정확히 균등하게 배분하고, 효율적으로 나누며, 체계적으로 정리해요. 나눔을 원칙에 따라 완성하고, 완벽하게 마무리해요.",
      "나눔을 통해 안정감을 느끼고, 신뢰할 수 있는 결과를 만들어요.",
    ],
    traits: ["계획적 나눔", "원칙 준수", "체계적 실행"],
    picks: ["전통 방식", "균등 배분", "체계적 정리"],
    tips: ["창의적 시도", "감성 담기", "유연한 변경"],
    match: "ENFP, ESFP",
    emoji: "📐",
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const mbtiType = (searchParams.get("type") as keyof typeof sharingTypes) || "ENFP"
  const resultId = searchParams.get("id")
  const character = sharingTypes[mbtiType]
  const [result, setResult] = useState<any>(null)

  useEffect(() => {
    if (resultId) {
      getTestResult(resultId)
        .then((data) => setResult(data))
        .catch((err) => console.error("결과 조회 실패:", err))
    }
  }, [resultId])

  const currentUrl = typeof window !== "undefined" ? window.location.href : ""
  const shareTitle = `나의 음식 나눔 스타일은 "${character.label}" ${character.emoji}`
  const shareText = `${character.summary}\n\n나도 음식 나눔 스타일 테스트 하러 가기 🤝`

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <main className="container max-w-4xl mx-auto px-4 py-8 space-y-8">
        <Card className="border-0 shadow-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur">
          <CardContent className="p-8 md:p-12">
            <div className="text-center space-y-6">
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                {mbtiType}
              </Badge>

              <div>
                <div className="text-6xl mb-4">{character.emoji}</div>
                <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
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
              <div className="p-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl">
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
              <div className="p-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl">
                <Share2 className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold">주요 특징</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.traits.map((trait, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-xl text-center font-medium"
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
              <div className="p-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold">추천 나눔 스타일</h2>
            </div>
            <div className="space-y-3">
              {character.picks.map((pick, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                  <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" />
                  <span className="text-lg">{pick}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur">
          <CardContent className="p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl">
                <Lightbulb className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold">성장 포인트</h2>
            </div>
            <div className="space-y-3">
              {character.tips.map((tip, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                  <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" />
                  <span className="text-lg">{tip}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur">
          <CardContent className="p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold">궁합</h2>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-xl">
              <p className="text-lg mb-2 text-muted-foreground">최고의 나눔 파트너</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">{character.match}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-gradient-to-br from-green-500 to-emerald-500">
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
                  <Link href="/tests/cooking-style">
                    <div className="text-left w-full">
                      <div className="text-2xl mb-1">👨‍🍳</div>
                      <div className="font-semibold">요리 스타일</div>
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
                  <Link href="/tests/taste-preference">
                    <div className="text-left w-full">
                      <div className="text-2xl mb-1">😋</div>
                      <div className="font-semibold">맛 선호도</div>
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

export default function FoodSharingResult() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="text-4xl animate-bounce">🤝</div>
            <p className="text-muted-foreground">결과 로딩 중...</p>
          </div>
        </div>
      }
    >
      <ResultContent />
    </Suspense>
  )
}

