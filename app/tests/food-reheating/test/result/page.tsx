"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShareButtons } from "@/components/share-buttons"
import { Flame, Heart, Lightbulb, Users, ArrowRight, Sparkles } from "lucide-react"
import { getTestResult } from "@/lib/api-client"

const reheatingTypes = {
  ENFP: {
    label: "즉흥 재가열 탐험가",
    summary: "즉흥적으로 재가열하며 새로운 방식을 시도하는 타입",
    description: [
      "즉흥적으로 음식을 재가열하는 당신! 대략적으로 시간을 설정하고, 여러 번 나눠서 데워요. 새로운 방법을 실험하고, 다른 사람들과 재가열 경험을 공유해요.",
      "바로 데우고 즉시 먹는 것을 좋아해요. 감성과 맛에 따라 선택하며, 그때그때 즉흥적으로 재가열하는 유연한 스타일이에요.",
      "재가열을 통해 새로운 경험을 발견하고, 다양한 방법을 탐구하는 것을 즐겨요.",
    ],
    traits: ["즉흥적 재가열", "새로운 방법", "적극적 공유"],
    picks: ["대략적 시간", "여러 번 나누기", "즉시 먹기"],
    tips: ["정확한 시간", "한 번에 데우기", "신중한 확인"],
    match: "ISTJ, INTJ",
    emoji: "✨",
  },
  ENFJ: {
    label: "배려 재가열 큐레이터",
    summary: "계획적으로 재가열하며 모두를 위한 맛을 만드는 타입",
    description: [
      "계획적으로 음식을 재가열하는 당신! 정확히 시간을 측정하고, 한 번에 완벽하게 데워요. 가스레인지를 사용하고 맛을 중시하며, 다른 사람들과 재가열 경험을 공유해요.",
      "미리 준비하고 계획하며, 확인 후 먹는 것을 좋아해요. 감성과 맛에 따라 선택하며, 모두가 만족할 수 있는 재가열을 만들어요.",
      "재가열을 통해 모두를 위한 맛을 만들고, 소중한 사람들을 위한 재가열을 하는 것을 좋아해요.",
    ],
    traits: ["계획적 재가열", "맛 중시", "배려심"],
    picks: ["정확한 시간", "한 번에 데우기", "확인 후 먹기"],
    tips: ["빠른 재가열", "대략적 시간", "즉시 먹기"],
    match: "ISTP, INTP",
    emoji: "💖",
  },
  ENTP: {
    label: "혁신 재가열 실험가",
    summary: "즉흥적으로 재가열하며 효율적인 방식을 실험하는 타입",
    description: [
      "즉흥적으로 음식을 재가열하는 당신! 대략적으로 시간을 설정하고, 여러 번 나눠서 데워요. 전자레인지를 사용하고 효율성을 중시하며, 새로운 방법을 실험해요.",
      "바로 데우고 즉시 먹는 것을 좋아해요. 효율성과 시간 절약에 따라 선택하며, 실용적인 재가열을 해요.",
      "재가열을 통해 효율적인 방식을 실험하고, 최적의 재가열 방법을 찾는 것을 좋아해요.",
    ],
    traits: ["즉흥적 재가열", "효율적 접근", "실험적 방식"],
    picks: ["전자레인지", "효율적 재가열", "즉시 먹기"],
    tips: ["정확한 시간", "맛 중시", "신중한 확인"],
    match: "ISFJ, ISTJ",
    emoji: "🔬",
  },
  ENTJ: {
    label: "전략 재가열 마스터",
    summary: "계획적이고 효율적으로 재가열하며 완벽한 시스템을 만드는 타입",
    description: [
      "계획적이고 효율적으로 음식을 재가열하는 당신! 정확히 시간을 측정하고, 한 번에 완벽하게 데워요. 전자레인지를 사용하고 효율성을 중시하며, 정확한 온도를 설정해요.",
      "미리 준비하고 계획하며, 확인 후 먹는 것을 좋아해요. 효율성과 시간 절약에 따라 선택하며, 완벽한 재가열 시스템을 만들어요.",
      "재가열을 통해 효율적인 시스템을 만들고, 최적의 재가열 방법을 찾는 것을 좋아해요.",
    ],
    traits: ["계획적 재가열", "효율적 시스템", "완벽한 재가열"],
    picks: ["정확한 시간", "한 번에 데우기", "효율적 재가열"],
    tips: ["맛 중시", "유연한 재가열", "즉시 먹기"],
    match: "ISFP, INFP",
    emoji: "⚡",
  },
  INFP: {
    label: "감성 재가열 예술가",
    summary: "즉흥적으로 재가열하며 조용히 감성을 즐기는 타입",
    description: [
      "즉흥적으로 음식을 재가열하는 당신! 대략적으로 시간을 설정하고, 여러 번 나눠서 데워요. 가스레인지를 사용하고 맛을 중시하며, 조용히 재가열하는 것을 좋아해요.",
      "그때그때 즉흥적으로 재가열하고, 확인 후 먹는 것을 좋아해요. 감성과 맛에 따라 선택하며, 혼자만 재가열하는 스타일이에요.",
      "재가열을 통해 자신만의 맛을 만들고, 아름다운 재가열 경험을 만드는 것을 즐겨요.",
    ],
    traits: ["감성 재가열", "조용한 재가열", "즉흥적 방식"],
    picks: ["맛 중시", "대략적 시간", "확인 후 먹기"],
    tips: ["정확한 시간", "적극적 공유", "효율적 접근"],
    match: "ESTJ, ENTJ",
    emoji: "🌸",
  },
  INFJ: {
    label: "완벽 재가열 큐레이터",
    summary: "계획적이고 감성적으로 재가열하며 의미를 찾는 타입",
    description: [
      "계획적이고 감성적으로 음식을 재가열하는 당신! 정확히 시간을 측정하고, 한 번에 완벽하게 데워요. 가스레인지를 사용하고 맛을 중시하며, 정확한 온도를 설정해요.",
      "미리 준비하고 계획하며, 확인 후 먹는 것을 좋아해요. 감성과 맛에 따라 선택하며, 신중하게 고민 후 재가열해요.",
      "재가열을 통해 완벽한 맛을 만들고, 의미 있는 재가열 경험을 만드는 것을 좋아해요.",
    ],
    traits: ["계획적 재가열", "감성 선택", "완벽한 재가열"],
    picks: ["정확한 시간", "한 번에 데우기", "맛 중시"],
    tips: ["유연한 재가열", "적극적 공유", "효율적 접근"],
    match: "ESTP, ESFP",
    emoji: "🌙",
  },
  INTP: {
    label: "분석 재가열 연구가",
    summary: "즉흥적으로 재가열하며 논리적으로 분석하는 타입",
    description: [
      "즉흥적으로 음식을 재가열하는 당신! 대략적으로 시간을 설정하고, 여러 번 나눠서 데워요. 전자레인지를 사용하고 효율성을 중시하며, 대략적인 온도로 설정해요.",
      "그때그때 즉흥적으로 재가열하고, 확인 후 먹는 것을 좋아해요. 효율성과 시간 절약에 따라 선택하며, 혼자만 재가열하고 분석하는 스타일이에요.",
      "재가열을 통해 논리적인 방식을 찾고, 최적의 재가열 방법을 연구하는 것을 즐겨요.",
    ],
    traits: ["논리적 분석", "조용한 재가열", "효율적 재가열"],
    picks: ["효율적 재가열", "대략적 시간", "확인 후 먹기"],
    tips: ["정확한 시간", "맛 중시", "적극적 공유"],
    match: "ESFJ, ENFJ",
    emoji: "🧪",
  },
  INTJ: {
    label: "전략 재가열 설계자",
    summary: "계획적이고 논리적으로 재가열하며 완벽을 추구하는 타입",
    description: [
      "계획적이고 논리적으로 음식을 재가열하는 당신! 정확히 시간을 측정하고, 한 번에 완벽하게 데워요. 전자레인지를 사용하고 효율성을 중시하며, 정확한 온도를 설정해요.",
      "미리 준비하고 계획하며, 확인 후 먹는 것을 좋아해요. 효율성과 시간 절약에 따라 선택하며, 신중하게 고민 후 재가열해요.",
      "재가열을 통해 완벽한 시스템을 설계하고, 최적의 재가열 방법을 만드는 것을 좋아해요.",
    ],
    traits: ["계획적 설계", "논리적 재가열", "완벽한 시스템"],
    picks: ["정확한 시간", "한 번에 데우기", "효율적 재가열"],
    tips: ["맛 중시", "유연한 재가열", "적극적 공유"],
    match: "ESFP, ENFP",
    emoji: "🎯",
  },
  ESFP: {
    label: "즉흥 재가열 즐거움러",
    summary: "즉흥적으로 재가열하며 사람들과 행복을 나누는 타입",
    description: [
      "즉흥적으로 음식을 재가열하는 당신! 대략적으로 시간을 설정하고, 여러 번 나눠서 데워요. 가스레인지를 사용하고 맛을 중시하며, 즉시 먹는 것을 좋아해요.",
      "바로 데우고 즉시 먹는 것을 좋아해요. 감성과 맛에 따라 선택하며, 다른 사람들과 재가열 경험을 공유하고 즐거운 시간을 만들어요.",
      "재가열을 통해 즐거움을 나누고, 모두가 행복해하는 재가열을 만드는 것을 좋아해요.",
    ],
    traits: ["즉흥적 재가열", "맛 중시", "적극적 공유"],
    picks: ["대략적 시간", "즉시 먹기", "정보 공유"],
    tips: ["정확한 시간", "효율적 접근", "신중한 확인"],
    match: "INTJ, ISTJ",
    emoji: "🎉",
  },
  ESFJ: {
    label: "전통 재가열 배려자",
    summary: "계획적이고 감성적으로 재가열하며 모두를 챙기는 타입",
    description: [
      "계획적이고 감성적으로 음식을 재가열하는 당신! 정확히 시간을 측정하고, 한 번에 완벽하게 데워요. 가스레인지를 사용하고 맛을 중시하며, 즉시 먹는 것을 좋아해요.",
      "미리 준비하고 계획하며, 다른 사람들과 재가열 경험을 공유해요. 감성과 맛에 따라 선택하며, 모두가 만족할 수 있는 재가열을 만들어요.",
      "재가열을 통해 사람들을 챙기고, 행복을 나누는 것을 좋아해요.",
    ],
    traits: ["계획적 재가열", "맛 중시", "모두 배려"],
    picks: ["정확한 시간", "즉시 먹기", "정보 공유"],
    tips: ["유연한 재가열", "효율적 접근", "조용한 재가열"],
    match: "INTP, ISTP",
    emoji: "🤝",
  },
  ESTP: {
    label: "즉흥 재가열 실용러",
    summary: "즉흥적으로 재가열하며 빠르게 즐기는 타입",
    description: [
      "즉흥적으로 음식을 재가열하는 당신! 대략적으로 시간을 설정하고, 여러 번 나눠서 데워요. 전자레인지를 사용하고 효율성을 중시하며, 즉시 먹는 것을 좋아해요.",
      "바로 데우고 즉시 먹는 것을 좋아해요. 효율성과 시간 절약에 따라 선택하며, 다른 사람들과 재가열 경험을 공유하고 빠르게 즐겨요.",
      "재가열을 통해 실용적인 방식을 찾고, 효율적인 재가열을 하는 것을 좋아해요.",
    ],
    traits: ["즉흥적 재가열", "실용적 접근", "빠른 재가열"],
    picks: ["효율적 재가열", "즉시 먹기", "정보 공유"],
    tips: ["정확한 시간", "맛 중시", "신중한 확인"],
    match: "INFJ, ISFJ",
    emoji: "⚡",
  },
  ESTJ: {
    label: "체계 재가열 관리자",
    summary: "계획적이고 논리적으로 재가열하며 체계적으로 관리하는 타입",
    description: [
      "계획적이고 논리적으로 음식을 재가열하는 당신! 정확히 시간을 측정하고, 한 번에 완벽하게 데워요. 전자레인지를 사용하고 효율성을 중시하며, 정확한 온도를 설정해요.",
      "미리 준비하고 계획하며, 즉시 먹는 것을 좋아해요. 효율성과 시간 절약에 따라 선택하며, 체계적인 재가열 시스템을 만들어요.",
      "재가열을 통해 효율적인 시스템을 만들고, 완벽한 재가열 방법을 만드는 것을 좋아해요.",
    ],
    traits: ["계획적 재가열", "논리적 선택", "체계적 시스템"],
    picks: ["정확한 시간", "즉시 먹기", "효율적 재가열"],
    tips: ["맛 중시", "유연한 재가열", "조용한 재가열"],
    match: "INFP, INTP",
    emoji: "📋",
  },
  ISFP: {
    label: "감성 재가열 예술가",
    summary: "즉흥적으로 재가열하며 조용히 감성을 즐기는 타입",
    description: [
      "즉흥적으로 음식을 재가열하는 당신! 대략적으로 시간을 설정하고, 여러 번 나눠서 데워요. 가스레인지를 사용하고 맛을 중시하며, 조용히 재가열하는 것을 좋아해요.",
      "그때그때 즉흥적으로 재가열하고, 확인 후 먹는 것을 좋아해요. 감성과 맛에 따라 선택하며, 혼자만 재가열하는 스타일이에요.",
      "재가열을 통해 자신만의 스타일을 만들고, 아름다운 재가열 경험을 만드는 것을 즐겨요.",
    ],
    traits: ["감성 재가열", "조용한 재가열", "예술적 접근"],
    picks: ["맛 중시", "대략적 시간", "확인 후 먹기"],
    tips: ["정확한 시간", "효율적 접근", "적극적 공유"],
    match: "ENTJ, ESTJ",
    emoji: "🎨",
  },
  ISFJ: {
    label: "정성 재가열 수호자",
    summary: "계획적이고 감성적으로 재가열하며 정성을 담는 타입",
    description: [
      "계획적이고 감성적으로 음식을 재가열하는 당신! 정확히 시간을 측정하고, 한 번에 완벽하게 데워요. 가스레인지를 사용하고 맛을 중시하며, 정확한 온도를 설정해요.",
      "미리 준비하고 계획하며, 확인 후 먹는 것을 좋아해요. 감성과 맛에 따라 선택하며, 신중하게 고민 후 재가열해요.",
      "재가열을 통해 정성을 담고, 소중한 사람들을 위한 재가열을 하는 것을 좋아해요.",
    ],
    traits: ["계획적 재가열", "정성 담기", "조용한 배려"],
    picks: ["정확한 시간", "한 번에 데우기", "맛 중시"],
    tips: ["유연한 재가열", "효율적 접근", "적극적 공유"],
    match: "ENTP, ESTP",
    emoji: "💝",
  },
  ISTP: {
    label: "실용 재가열 기술자",
    summary: "즉흥적으로 재가열하며 실용적으로 즐기는 타입",
    description: [
      "즉흥적으로 음식을 재가열하는 당신! 대략적으로 시간을 설정하고, 여러 번 나눠서 데워요. 전자레인지를 사용하고 효율성을 중시하며, 대략적인 온도로 설정해요.",
      "그때그때 즉흥적으로 재가열하고, 확인 후 먹는 것을 좋아해요. 효율성과 시간 절약에 따라 선택하며, 혼자만 재가열하고 실용적인 방식을 찾아요.",
      "재가열을 통해 실용성을 추구하고, 합리적인 재가열을 하는 것을 즐겨요.",
    ],
    traits: ["즉흥적 재가열", "실용적 접근", "효율적 재가열"],
    picks: ["효율적 재가열", "대략적 시간", "확인 후 먹기"],
    tips: ["정확한 시간", "맛 중시", "적극적 공유"],
    match: "ENFJ, ESFJ",
    emoji: "🔧",
  },
  ISTJ: {
    label: "원칙 재가열 수호자",
    summary: "계획적이고 논리적으로 재가열하며 원칙에 따라 관리하는 타입",
    description: [
      "계획적이고 논리적으로 음식을 재가열하는 당신! 정확히 시간을 측정하고, 한 번에 완벽하게 데워요. 전자레인지를 사용하고 효율성을 중시하며, 정확한 온도를 설정해요.",
      "미리 준비하고 계획하며, 확인 후 먹는 것을 좋아해요. 효율성과 시간 절약에 따라 선택하며, 신중하게 고민 후 재가열해요.",
      "재가열을 통해 안정감을 느끼고, 신뢰할 수 있는 재가열 시스템을 만드는 것을 좋아해요.",
    ],
    traits: ["계획적 재가열", "원칙 준수", "논리적 재가열"],
    picks: ["정확한 시간", "한 번에 데우기", "효율적 재가열"],
    tips: ["맛 중시", "유연한 재가열", "적극적 공유"],
    match: "ENFP, ESFP",
    emoji: "📐",
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const mbtiType = (searchParams.get("type") as keyof typeof reheatingTypes) || "ENFP"
  const resultId = searchParams.get("id")
  const character = reheatingTypes[mbtiType]
  const [result, setResult] = useState<any>(null)

  useEffect(() => {
    if (resultId) {
      getTestResult(resultId)
        .then((data) => setResult(data))
        .catch((err) => console.error("결과 조회 실패:", err))
    }
  }, [resultId])

  const shareTitle = `나의 음식 재가열 스타일은 "${character.label}" ${character.emoji}`
  const shareDescription = `${character.summary}\n\n나도 음식 재가열 스타일 테스트 하러 가기 🔥`

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
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
                <ShareButtons
                  testId="food-reheating"
                  testPath="/tests/food-reheating/test/result"
                  resultType={mbtiType}
                  resultId={resultId || undefined}
                  title={shareTitle}
                  description={shareDescription}
                />
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
                <Flame className="h-6 w-6 text-white" />
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
              <h2 className="text-2xl font-bold">추천 재가열 스타일</h2>
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
              <p className="text-lg mb-2 text-muted-foreground">최고의 재가열 파트너</p>
              <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{character.match}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-gradient-to-br from-orange-500 to-red-500">
          <CardContent className="p-8">
            <div className="text-center space-y-6 text-white">
              <h2 className="text-2xl font-bold">다른 테스트도 해보세요!</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button size="lg" variant="secondary" className="h-auto py-4 bg-white/20 hover:bg-white/30 text-white border-white/30" asChild>
                  <Link href="/tests/food-seasoning"><div className="text-left w-full"><div className="text-2xl mb-1">🧂</div><div className="font-semibold">양념 사용 스타일</div></div><ArrowRight className="ml-auto h-5 w-5" /></Link>
                </Button>
                <Button size="lg" variant="secondary" className="h-auto py-4 bg-white/20 hover:bg-white/30 text-white border-white/30" asChild>
                  <Link href="/tests/food-garnishing"><div className="text-left w-full"><div className="text-2xl mb-1">🌿</div><div className="font-semibold">음식 장식 스타일</div></div><ArrowRight className="ml-auto h-5 w-5" /></Link>
                </Button>
              </div>
              <Button size="lg" variant="secondary" className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30" asChild>
                <Link href="/">전체 테스트 보기</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default function FoodReheatingResult() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-center space-y-4"><div className="text-4xl animate-bounce">🔥</div><p className="text-muted-foreground">결과 로딩 중...</p></div></div>}>
      <ResultContent />
    </Suspense>
  )
}

