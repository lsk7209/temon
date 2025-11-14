"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShareButtons } from "@/components/share-buttons"
import { Star, Heart, Lightbulb, Users, ArrowRight, Sparkles } from "lucide-react"
import { getTestResult } from "@/lib/api-client"

const reviewTypes = {
  ENFP: {
    label: "즉흥 리뷰 탐험가",
    summary: "즉흥적으로 리뷰를 작성하며 새로운 스타일을 시도하는 타입",
    description: [
      "즉흥적으로 리뷰를 작성하는 당신! 자주 작성하고 적극적으로 즐겨요. 간단히 핵심만 작성하고, 주관적이고 감성 중심으로 작성해요.",
      "즉시 작성하고 바로 공유하며, 그때그때 즉흥적으로 작성해요. 새로운 스타일을 창의적으로 시도하고, 다른 사람들과 리뷰 경험을 공유해요.",
      "리뷰를 통해 새로운 경험을 발견하고, 다양한 리뷰 방법을 탐구하는 것을 즐겨요.",
    ],
    traits: ["즉흥적 작성", "새로운 스타일", "적극적 공유"],
    picks: ["간단한 리뷰", "즉시 작성", "감성 중심"],
    tips: ["자세한 리뷰", "신중한 작성", "객관적 접근"],
    match: "ISTJ, INTJ",
    emoji: "✨",
  },
  ENFJ: {
    label: "배려 리뷰 큐레이터",
    summary: "계획적으로 리뷰를 작성하며 모두를 위한 정보를 제공하는 타입",
    description: [
      "계획적으로 리뷰를 작성하는 당신! 자주 작성하고 적극적으로 즐겨요. 자세히 상세하게 작성하고, 주관적이지만 감성 중심으로 작성해요.",
      "즉시 작성하고 바로 공유하며, 미리 준비하고 계획해요. 모두가 도움을 받을 수 있는 리뷰를 만들고, 소중한 사람들을 위한 정보를 제공해요.",
      "리뷰를 통해 모두를 위한 정보를 제공하고, 소중한 사람들을 위한 리뷰를 하는 것을 좋아해요.",
    ],
    traits: ["계획적 작성", "감성 중심", "배려심"],
    picks: ["자세한 리뷰", "즉시 작성", "공유 중시"],
    tips: ["간단한 리뷰", "객관적 접근", "조용한 작성"],
    match: "ISTP, INTP",
    emoji: "💖",
  },
  ENTP: {
    label: "혁신 리뷰 실험가",
    summary: "즉흥적으로 리뷰를 작성하며 효율적인 스타일을 실험하는 타입",
    description: [
      "즉흥적으로 리뷰를 작성하는 당신! 자주 작성하고 적극적으로 즐겨요. 간단히 핵심만 작성하고, 객관적이고 사실 중심으로 작성해요.",
      "즉시 작성하고 바로 공유하며, 그때그때 즉흥적으로 작성해요. 새로운 스타일을 창의적으로 시도하고, 효율적인 리뷰 방법을 실험해요.",
      "리뷰를 통해 효율적인 스타일을 실험하고, 최적의 리뷰 방법을 찾는 것을 좋아해요.",
    ],
    traits: ["즉흥적 작성", "효율적 접근", "실험적 스타일"],
    picks: ["간단한 리뷰", "즉시 작성", "객관적 중심"],
    tips: ["자세한 리뷰", "감성 접근", "신중한 작성"],
    match: "ISFJ, ISTJ",
    emoji: "🔬",
  },
  ENTJ: {
    label: "전략 리뷰 마스터",
    summary: "계획적이고 효율적으로 리뷰를 작성하며 완벽한 시스템을 만드는 타입",
    description: [
      "계획적이고 효율적으로 리뷰를 작성하는 당신! 자주 작성하고 적극적으로 즐겨요. 자세히 상세하게 작성하고, 객관적이고 사실 중심으로 작성해요.",
      "즉시 작성하고 바로 공유하며, 미리 준비하고 계획해요. 효율적인 리뷰 시스템을 만들고, 완벽한 리뷰 방법을 찾아요.",
      "리뷰를 통해 효율적인 시스템을 만들고, 최적의 리뷰 방법을 만드는 것을 좋아해요.",
    ],
    traits: ["계획적 작성", "효율적 시스템", "완벽한 리뷰"],
    picks: ["자세한 리뷰", "즉시 작성", "객관적 중심"],
    tips: ["감성 접근", "간단한 리뷰", "조용한 작성"],
    match: "ISFP, INFP",
    emoji: "⚡",
  },
  INFP: {
    label: "감성 리뷰 예술가",
    summary: "즉흥적으로 리뷰를 작성하며 조용히 감성을 즐기는 타입",
    description: [
      "즉흥적으로 리뷰를 작성하는 당신! 가끔 작성하고 신중하게 즐겨요. 간단히 핵심만 작성하고, 주관적이고 감성 중심으로 작성해요.",
      "나중에 작성하고 신중하게 작성하며, 그때그때 즉흥적으로 작성해요. 새로운 스타일을 창의적으로 시도하고, 혼자만 작성하며 조용히 즐겨요.",
      "리뷰를 통해 자신만의 스타일을 만들고, 아름다운 리뷰 경험을 만드는 것을 즐겨요.",
    ],
    traits: ["감성 작성", "조용한 작성", "즉흥적 스타일"],
    picks: ["간단한 리뷰", "신중한 작성", "감성 중심"],
    tips: ["자세한 리뷰", "적극적 공유", "객관적 접근"],
    match: "ESTJ, ENTJ",
    emoji: "🌸",
  },
  INFJ: {
    label: "완벽 리뷰 큐레이터",
    summary: "계획적이고 감성적으로 리뷰를 작성하며 의미를 찾는 타입",
    description: [
      "계획적이고 감성적으로 리뷰를 작성하는 당신! 가끔 작성하고 신중하게 즐겨요. 자세히 상세하게 작성하고, 주관적이지만 감성 중심으로 작성해요.",
      "나중에 작성하고 신중하게 작성하며, 미리 준비하고 계획해요. 완벽한 리뷰 경험을 만들고, 의미 있는 리뷰를 작성해요.",
      "리뷰를 통해 완벽한 정보를 제공하고, 의미 있는 리뷰 경험을 만드는 것을 좋아해요.",
    ],
    traits: ["계획적 작성", "감성 선택", "완벽한 리뷰"],
    picks: ["자세한 리뷰", "신중한 작성", "감성 중심"],
    tips: ["간단한 리뷰", "적극적 공유", "객관적 접근"],
    match: "ESTP, ESFP",
    emoji: "🌙",
  },
  INTP: {
    label: "분석 리뷰 연구가",
    summary: "즉흥적으로 리뷰를 작성하며 논리적으로 분석하는 타입",
    description: [
      "즉흥적으로 리뷰를 작성하는 당신! 가끔 작성하고 신중하게 즐겨요. 간단히 핵심만 작성하고, 객관적이고 사실 중심으로 작성해요.",
      "나중에 작성하고 신중하게 작성하며, 그때그때 즉흥적으로 작성해요. 새로운 스타일을 창의적으로 시도하고, 혼자만 작성하며 논리적으로 분석해요.",
      "리뷰를 통해 논리적인 스타일을 찾고, 최적의 리뷰 방법을 연구하는 것을 즐겨요.",
    ],
    traits: ["논리적 분석", "조용한 작성", "효율적 리뷰"],
    picks: ["간단한 리뷰", "신중한 작성", "객관적 중심"],
    tips: ["자세한 리뷰", "감성 접근", "적극적 공유"],
    match: "ESFJ, ENFJ",
    emoji: "🧪",
  },
  INTJ: {
    label: "전략 리뷰 설계자",
    summary: "계획적이고 논리적으로 리뷰를 작성하며 완벽을 추구하는 타입",
    description: [
      "계획적이고 논리적으로 리뷰를 작성하는 당신! 가끔 작성하고 신중하게 즐겨요. 자세히 상세하게 작성하고, 객관적이고 사실 중심으로 작성해요.",
      "나중에 작성하고 신중하게 작성하며, 미리 준비하고 계획해요. 완벽한 리뷰 시스템을 설계하고, 최적의 리뷰 방법을 만들어요.",
      "리뷰를 통해 완벽한 시스템을 설계하고, 최적의 리뷰 방법을 만드는 것을 좋아해요.",
    ],
    traits: ["계획적 설계", "논리적 작성", "완벽한 시스템"],
    picks: ["자세한 리뷰", "신중한 작성", "객관적 중심"],
    tips: ["감성 접근", "간단한 리뷰", "적극적 공유"],
    match: "ESFP, ENFP",
    emoji: "🎯",
  },
  ESFP: {
    label: "즉흥 리뷰 즐거움러",
    summary: "즉흥적으로 리뷰를 작성하며 사람들과 행복을 나누는 타입",
    description: [
      "즉흥적으로 리뷰를 작성하는 당신! 자주 작성하고 적극적으로 즐겨요. 간단히 핵심만 작성하고, 주관적이고 감성 중심으로 작성해요.",
      "즉시 작성하고 바로 공유하며, 그때그때 즉흥적으로 작성해요. 익숙한 스타일을 기본으로 사용하고, 다른 사람들과 리뷰 경험을 공유해요.",
      "리뷰를 통해 즐거움을 나누고, 모두가 행복해하는 리뷰를 만드는 것을 좋아해요.",
    ],
    traits: ["즉흥적 작성", "감성 선택", "적극적 공유"],
    picks: ["간단한 리뷰", "즉시 작성", "전통 방식"],
    tips: ["자세한 리뷰", "객관적 접근", "신중한 작성"],
    match: "INTJ, ISTJ",
    emoji: "🎉",
  },
  ESFJ: {
    label: "전통 리뷰 배려자",
    summary: "계획적이고 감성적으로 리뷰를 작성하며 모두를 챙기는 타입",
    description: [
      "계획적이고 감성적으로 리뷰를 작성하는 당신! 자주 작성하고 적극적으로 즐겨요. 자세히 상세하게 작성하고, 주관적이지만 감성 중심으로 작성해요.",
      "즉시 작성하고 바로 공유하며, 미리 준비하고 계획해요. 모두가 도움을 받을 수 있는 리뷰를 만들고, 행복을 나누는 것을 좋아해요.",
      "리뷰를 통해 사람들을 챙기고, 행복을 나누는 것을 좋아해요.",
    ],
    traits: ["계획적 작성", "감성 선택", "모두 배려"],
    picks: ["자세한 리뷰", "즉시 작성", "전통 방식"],
    tips: ["간단한 리뷰", "객관적 접근", "조용한 작성"],
    match: "INTP, ISTP",
    emoji: "🤝",
  },
  ESTP: {
    label: "즉흥 리뷰 실용러",
    summary: "즉흥적으로 리뷰를 작성하며 빠르게 즐기는 타입",
    description: [
      "즉흥적으로 리뷰를 작성하는 당신! 자주 작성하고 적극적으로 즐겨요. 간단히 핵심만 작성하고, 객관적이고 사실 중심으로 작성해요.",
      "즉시 작성하고 바로 공유하며, 그때그때 즉흥적으로 작성해요. 익숙한 스타일을 기본으로 사용하고, 효율적인 리뷰를 작성해요.",
      "리뷰를 통해 실용적인 정보를 제공하고, 효율적인 리뷰를 하는 것을 좋아해요.",
    ],
    traits: ["즉흥적 작성", "실용적 접근", "빠른 작성"],
    picks: ["간단한 리뷰", "즉시 작성", "전통 방식"],
    tips: ["자세한 리뷰", "감성 접근", "신중한 작성"],
    match: "INFJ, ISFJ",
    emoji: "⚡",
  },
  ESTJ: {
    label: "체계 리뷰 관리자",
    summary: "계획적이고 논리적으로 리뷰를 작성하며 체계적으로 관리하는 타입",
    description: [
      "계획적이고 논리적으로 리뷰를 작성하는 당신! 자주 작성하고 적극적으로 즐겨요. 자세히 상세하게 작성하고, 객관적이고 사실 중심으로 작성해요.",
      "즉시 작성하고 바로 공유하며, 미리 준비하고 계획해요. 효율적인 리뷰 시스템을 만들고, 완벽한 리뷰 방법을 만들어요.",
      "리뷰를 통해 효율적인 시스템을 만들고, 체계적인 리뷰 방법을 만드는 것을 좋아해요.",
    ],
    traits: ["계획적 작성", "논리적 선택", "체계적 시스템"],
    picks: ["자세한 리뷰", "즉시 작성", "전통 방식"],
    tips: ["감성 접근", "간단한 리뷰", "조용한 작성"],
    match: "INFP, INTP",
    emoji: "📋",
  },
  ISFP: {
    label: "감성 리뷰 예술가",
    summary: "즉흥적으로 리뷰를 작성하며 조용히 감성을 즐기는 타입",
    description: [
      "즉흥적으로 리뷰를 작성하는 당신! 가끔 작성하고 신중하게 즐겨요. 간단히 핵심만 작성하고, 주관적이고 감성 중심으로 작성해요.",
      "나중에 작성하고 신중하게 작성하며, 그때그때 즉흥적으로 작성해요. 익숙한 스타일을 기본으로 사용하고, 혼자만 작성하며 조용히 즐겨요.",
      "리뷰를 통해 자신만의 스타일을 만들고, 아름다운 리뷰 경험을 만드는 것을 즐겨요.",
    ],
    traits: ["감성 작성", "조용한 작성", "예술적 접근"],
    picks: ["간단한 리뷰", "신중한 작성", "전통 방식"],
    tips: ["자세한 리뷰", "객관적 접근", "적극적 공유"],
    match: "ENTJ, ESTJ",
    emoji: "🎨",
  },
  ISFJ: {
    label: "정성 리뷰 수호자",
    summary: "계획적이고 감성적으로 리뷰를 작성하며 정성을 담는 타입",
    description: [
      "계획적이고 감성적으로 리뷰를 작성하는 당신! 가끔 작성하고 신중하게 즐겨요. 자세히 상세하게 작성하고, 주관적이지만 감성 중심으로 작성해요.",
      "나중에 작성하고 신중하게 작성하며, 미리 준비하고 계획해요. 소중한 사람들을 위한 리뷰를 만들고, 정성을 담아 작성해요.",
      "리뷰를 통해 정성을 담고, 소중한 사람들을 위한 리뷰를 하는 것을 좋아해요.",
    ],
    traits: ["계획적 작성", "정성 담기", "조용한 배려"],
    picks: ["자세한 리뷰", "신중한 작성", "전통 방식"],
    tips: ["간단한 리뷰", "객관적 접근", "적극적 공유"],
    match: "ENTP, ESTP",
    emoji: "💝",
  },
  ISTP: {
    label: "실용 리뷰 기술자",
    summary: "즉흥적으로 리뷰를 작성하며 실용적으로 즐기는 타입",
    description: [
      "즉흥적으로 리뷰를 작성하는 당신! 가끔 작성하고 신중하게 즐겨요. 간단히 핵심만 작성하고, 객관적이고 사실 중심으로 작성해요.",
      "나중에 작성하고 신중하게 작성하며, 그때그때 즉흥적으로 작성해요. 익숙한 스타일을 기본으로 사용하고, 혼자만 작성하며 실용적인 정보를 제공해요.",
      "리뷰를 통해 실용성을 추구하고, 합리적인 리뷰를 하는 것을 즐겨요.",
    ],
    traits: ["즉흥적 작성", "실용적 접근", "효율적 리뷰"],
    picks: ["간단한 리뷰", "신중한 작성", "전통 방식"],
    tips: ["자세한 리뷰", "감성 접근", "적극적 공유"],
    match: "ENFJ, ESFJ",
    emoji: "🔧",
  },
  ISTJ: {
    label: "원칙 리뷰 수호자",
    summary: "계획적이고 논리적으로 리뷰를 작성하며 원칙에 따라 관리하는 타입",
    description: [
      "계획적이고 논리적으로 리뷰를 작성하는 당신! 가끔 작성하고 신중하게 즐겨요. 자세히 상세하게 작성하고, 객관적이고 사실 중심으로 작성해요.",
      "나중에 작성하고 신중하게 작성하며, 미리 준비하고 계획해요. 원칙에 따라 리뷰하는 시스템을 만들고, 신뢰할 수 있는 리뷰 방법을 만들어요.",
      "리뷰를 통해 안정감을 느끼고, 신뢰할 수 있는 리뷰 시스템을 만드는 것을 좋아해요.",
    ],
    traits: ["계획적 작성", "원칙 준수", "논리적 작성"],
    picks: ["자세한 리뷰", "신중한 작성", "전통 방식"],
    tips: ["감성 접근", "간단한 리뷰", "적극적 공유"],
    match: "ENFP, ESFP",
    emoji: "📐",
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const mbtiType = (searchParams.get("type") as keyof typeof reviewTypes) || "ENFP"
  const resultId = searchParams.get("id")
  const character = reviewTypes[mbtiType]
  const [result, setResult] = useState<any>(null)

  useEffect(() => {
    if (resultId) {
      getTestResult(resultId)
        .then((data) => setResult(data))
        .catch((err) => console.error("결과 조회 실패:", err))
    }
  }, [resultId])

  const shareTitle = `나의 음식 리뷰 작성 스타일은 "${character.label}" ${character.emoji}`
  const shareDescription = `${character.summary}\n\n나도 음식 리뷰 작성 스타일 테스트 하러 가기 ⭐`

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
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
                <ShareButtons
                  testId="food-review"
                  testPath="/tests/food-review/test/result"
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
                <Star className="h-6 w-6 text-white" />
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
              <h2 className="text-2xl font-bold">추천 리뷰 스타일</h2>
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
              <p className="text-lg mb-2 text-muted-foreground">최고의 리뷰 파트너</p>
              <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">{character.match}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-gradient-to-br from-amber-500 to-yellow-500">
          <CardContent className="p-8">
            <div className="text-center space-y-6 text-white">
              <h2 className="text-2xl font-bold">다른 테스트도 해보세요!</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button size="lg" variant="secondary" className="h-auto py-4 bg-white/20 hover:bg-white/30 text-white border-white/30" asChild>
                  <Link href="/tests/food-recipe"><div className="text-left w-full"><div className="text-2xl mb-1">📖</div><div className="font-semibold">레시피 활용 스타일</div></div><ArrowRight className="ml-auto h-5 w-5" /></Link>
                </Button>
                <Button size="lg" variant="secondary" className="h-auto py-4 bg-white/20 hover:bg-white/30 text-white border-white/30" asChild>
                  <Link href="/tests/food-subscription"><div className="text-left w-full"><div className="text-2xl mb-1">📦</div><div className="font-semibold">식품 구독 서비스</div></div><ArrowRight className="ml-auto h-5 w-5" /></Link>
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

export default function FoodReviewResult() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-center space-y-4"><div className="text-4xl animate-bounce">⭐</div><p className="text-muted-foreground">결과 로딩 중...</p></div></div>}>
      <ResultContent />
    </Suspense>
  )
}

