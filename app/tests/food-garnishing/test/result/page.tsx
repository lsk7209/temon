"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShareButtons } from "@/components/share-buttons"
import { Sprout, Heart, Lightbulb, Users, ArrowRight, Sparkles } from "lucide-react"
import { getTestResult } from "@/lib/api-client"

const garnishingTypes = {
  ENFP: {
    label: "즉흥 장식 탐험가",
    summary: "즉흥적으로 장식하며 새로운 스타일을 시도하는 타입",
    description: [
      "즉흥적으로 음식을 장식하는 당신! 꾸미기를 좋아하고 화려하게 즐겨요. 즉흥적으로 자유롭게 장식하고, 새로운 스타일을 창의적으로 시도해요.",
      "그때그때 즉흥적으로 장식하고, 빠르게 효율적으로 장식해요. 사진을 찍어 공유하고, 자주 장식하며 적극적으로 즐겨요.",
      "장식을 통해 새로운 스타일을 발견하고, 다양한 장식 방법을 탐구하는 것을 즐겨요.",
    ],
    traits: ["즉흥적 장식", "새로운 스타일", "적극적 공유"],
    picks: ["화려한 장식", "즉흥 조합", "퓨전 장식"],
    tips: ["심플 장식", "계획적 장식", "신중한 장식"],
    match: "ISTJ, INTJ",
    emoji: "✨",
  },
  ENFJ: {
    label: "배려 장식 큐레이터",
    summary: "계획적으로 장식하며 모두를 위한 아름다움을 만드는 타입",
    description: [
      "계획적으로 음식을 장식하는 당신! 꾸미기를 좋아하고 화려하게 즐겨요. 계획적으로 체계적으로 장식하고, 미리 준비하고 계획해요.",
      "충분히 시간을 들이고, 보기 좋음과 감성에 따라 선택해요. 사진을 찍어 공유하고, 모두가 만족할 수 있는 장식을 만들어요.",
      "장식을 통해 모두를 위한 아름다움을 만들고, 소중한 사람들을 위한 장식을 하는 것을 좋아해요.",
    ],
    traits: ["계획적 장식", "감성 선택", "배려심"],
    picks: ["화려한 장식", "계획적 준비", "감성 장식"],
    tips: ["즉흥 장식", "심플 장식", "실용적 접근"],
    match: "ISTP, INTP",
    emoji: "💖",
  },
  ENTP: {
    label: "혁신 장식 실험가",
    summary: "즉흥적으로 장식하며 효율적인 스타일을 실험하는 타입",
    description: [
      "즉흥적으로 음식을 장식하는 당신! 심플을 선호하고 간단하게 즐겨요. 즉흥적으로 자유롭게 장식하고, 새로운 스타일을 창의적으로 시도해요.",
      "빠르게 효율적으로 장식하고, 실용과 효율에 따라 선택해요. 사진을 찍어 공유하고, 효율적인 장식 방법을 실험해요.",
      "장식을 통해 효율적인 스타일을 실험하고, 최적의 장식 방법을 찾는 것을 좋아해요.",
    ],
    traits: ["즉흥적 장식", "효율적 접근", "실험적 스타일"],
    picks: ["심플 장식", "즉흥 조합", "퓨전 장식"],
    tips: ["화려한 장식", "계획적 장식", "감성 접근"],
    match: "ISFJ, ISTJ",
    emoji: "🔬",
  },
  ENTJ: {
    label: "전략 장식 마스터",
    summary: "계획적이고 효율적으로 장식하며 완벽한 시스템을 만드는 타입",
    description: [
      "계획적이고 효율적으로 음식을 장식하는 당신! 심플을 선호하고 간단하게 즐겨요. 계획적으로 체계적으로 장식하고, 미리 준비하고 계획해요.",
      "빠르게 효율적으로 장식하고, 실용과 효율에 따라 선택해요. 효율적인 장식 시스템을 만들고, 완벽한 장식 방법을 찾아요.",
      "장식을 통해 효율적인 시스템을 만들고, 최적의 장식 방법을 만드는 것을 좋아해요.",
    ],
    traits: ["계획적 장식", "효율적 시스템", "완벽한 장식"],
    picks: ["심플 장식", "계획적 준비", "효율적 장식"],
    tips: ["감성 접근", "즉흥 장식", "화려한 장식"],
    match: "ISFP, INFP",
    emoji: "⚡",
  },
  INFP: {
    label: "감성 장식 예술가",
    summary: "즉흥적으로 장식하며 조용히 감성을 즐기는 타입",
    description: [
      "즉흥적으로 음식을 장식하는 당신! 꾸미기를 좋아하고 화려하게 즐겨요. 즉흥적으로 자유롭게 장식하고, 새로운 스타일을 창의적으로 시도해요.",
      "충분히 시간을 들이고, 보기 좋음과 감성에 따라 선택해요. 그냥 먹고 조용히 즐기며, 가끔 장식하고 신중하게 즐겨요.",
      "장식을 통해 자신만의 스타일을 만들고, 아름다운 장식 경험을 만드는 것을 즐겨요.",
    ],
    traits: ["감성 장식", "조용한 즐김", "즉흥적 스타일"],
    picks: ["화려한 장식", "즉흥 조합", "감성 장식"],
    tips: ["계획적 장식", "적극적 공유", "효율적 접근"],
    match: "ESTJ, ENTJ",
    emoji: "🌸",
  },
  INFJ: {
    label: "완벽 장식 큐레이터",
    summary: "계획적이고 감성적으로 장식하며 의미를 찾는 타입",
    description: [
      "계획적이고 감성적으로 음식을 장식하는 당신! 꾸미기를 좋아하고 화려하게 즐겨요. 계획적으로 체계적으로 장식하고, 미리 준비하고 계획해요.",
      "충분히 시간을 들이고, 보기 좋음과 감성에 따라 선택해요. 신중하게 고민 후 장식하고, 완벽한 장식 경험을 만들어요.",
      "장식을 통해 완벽한 아름다움을 만들고, 의미 있는 장식 경험을 만드는 것을 좋아해요.",
    ],
    traits: ["계획적 장식", "감성 선택", "완벽한 장식"],
    picks: ["화려한 장식", "계획적 준비", "감성 장식"],
    tips: ["즉흥 장식", "적극적 공유", "효율적 접근"],
    match: "ESTP, ESFP",
    emoji: "🌙",
  },
  INTP: {
    label: "분석 장식 연구가",
    summary: "즉흥적으로 장식하며 논리적으로 분석하는 타입",
    description: [
      "즉흥적으로 음식을 장식하는 당신! 심플을 선호하고 간단하게 즐겨요. 즉흥적으로 자유롭게 장식하고, 새로운 스타일을 창의적으로 시도해요.",
      "충분히 시간을 들이고, 실용과 효율에 따라 선택해요. 그냥 먹고 조용히 즐기며, 가끔 장식하고 신중하게 분석해요.",
      "장식을 통해 논리적인 스타일을 찾고, 최적의 장식 방법을 연구하는 것을 즐겨요.",
    ],
    traits: ["논리적 분석", "조용한 즐김", "효율적 장식"],
    picks: ["심플 장식", "즉흥 조합", "퓨전 장식"],
    tips: ["화려한 장식", "감성 접근", "적극적 공유"],
    match: "ESFJ, ENFJ",
    emoji: "🧪",
  },
  INTJ: {
    label: "전략 장식 설계자",
    summary: "계획적이고 논리적으로 장식하며 완벽을 추구하는 타입",
    description: [
      "계획적이고 논리적으로 음식을 장식하는 당신! 심플을 선호하고 간단하게 즐겨요. 계획적으로 체계적으로 장식하고, 미리 준비하고 계획해요.",
      "빠르게 효율적으로 장식하고, 실용과 효율에 따라 선택해요. 신중하게 고민 후 장식하고, 완벽한 장식 시스템을 만들어요.",
      "장식을 통해 완벽한 시스템을 설계하고, 최적의 장식 방법을 만드는 것을 좋아해요.",
    ],
    traits: ["계획적 설계", "논리적 장식", "완벽한 시스템"],
    picks: ["심플 장식", "계획적 준비", "효율적 장식"],
    tips: ["감성 접근", "즉흥 장식", "적극적 공유"],
    match: "ESFP, ENFP",
    emoji: "🎯",
  },
  ESFP: {
    label: "즉흥 장식 즐거움러",
    summary: "즉흥적으로 장식하며 사람들과 행복을 나누는 타입",
    description: [
      "즉흥적으로 음식을 장식하는 당신! 꾸미기를 좋아하고 화려하게 즐겨요. 즉흥적으로 자유롭게 장식하고, 익숙한 스타일을 기본으로 사용해요.",
      "빠르게 효율적으로 장식하고, 보기 좋음과 감성에 따라 선택해요. 사진을 찍어 공유하고, 자주 장식하며 적극적으로 즐겨요.",
      "장식을 통해 즐거움을 나누고, 모두가 행복해하는 장식을 만드는 것을 좋아해요.",
    ],
    traits: ["즉흥적 장식", "감성 선택", "적극적 공유"],
    picks: ["화려한 장식", "즉흥 조합", "전통 장식"],
    tips: ["심플 장식", "효율적 접근", "신중한 장식"],
    match: "INTJ, ISTJ",
    emoji: "🎉",
  },
  ESFJ: {
    label: "전통 장식 배려자",
    summary: "계획적이고 감성적으로 장식하며 모두를 챙기는 타입",
    description: [
      "계획적이고 감성적으로 음식을 장식하는 당신! 꾸미기를 좋아하고 화려하게 즐겨요. 계획적으로 체계적으로 장식하고, 미리 준비하고 계획해요.",
      "충분히 시간을 들이고, 보기 좋음과 감성에 따라 선택해요. 사진을 찍어 공유하고, 모두가 만족할 수 있는 장식을 만들어요.",
      "장식을 통해 사람들을 챙기고, 행복을 나누는 것을 좋아해요.",
    ],
    traits: ["계획적 장식", "감성 선택", "모두 배려"],
    picks: ["화려한 장식", "계획적 준비", "전통 장식"],
    tips: ["즉흥 장식", "효율적 접근", "심플 장식"],
    match: "INTP, ISTP",
    emoji: "🤝",
  },
  ESTP: {
    label: "즉흥 장식 실용러",
    summary: "즉흥적으로 장식하며 빠르게 즐기는 타입",
    description: [
      "즉흥적으로 음식을 장식하는 당신! 심플을 선호하고 간단하게 즐겨요. 즉흥적으로 자유롭게 장식하고, 익숙한 스타일을 기본으로 사용해요.",
      "빠르게 효율적으로 장식하고, 실용과 효율에 따라 선택해요. 사진을 찍어 공유하고, 자주 장식하며 빠르게 즐겨요.",
      "장식을 통해 실용적인 스타일을 찾고, 효율적인 장식을 하는 것을 좋아해요.",
    ],
    traits: ["즉흥적 장식", "실용적 접근", "빠른 장식"],
    picks: ["심플 장식", "즉흥 조합", "전통 장식"],
    tips: ["화려한 장식", "감성 접근", "신중한 장식"],
    match: "INFJ, ISFJ",
    emoji: "⚡",
  },
  ESTJ: {
    label: "체계 장식 관리자",
    summary: "계획적이고 논리적으로 장식하며 체계적으로 관리하는 타입",
    description: [
      "계획적이고 논리적으로 음식을 장식하는 당신! 심플을 선호하고 간단하게 즐겨요. 계획적으로 체계적으로 장식하고, 미리 준비하고 계획해요.",
      "빠르게 효율적으로 장식하고, 실용과 효율에 따라 선택해요. 효율적인 장식 시스템을 만들고, 완벽한 장식 방법을 만들어요.",
      "장식을 통해 효율적인 시스템을 만들고, 체계적인 장식 방법을 만드는 것을 좋아해요.",
    ],
    traits: ["계획적 장식", "논리적 선택", "체계적 시스템"],
    picks: ["심플 장식", "계획적 준비", "전통 장식"],
    tips: ["감성 접근", "즉흥 장식", "화려한 장식"],
    match: "INFP, INTP",
    emoji: "📋",
  },
  ISFP: {
    label: "감성 장식 예술가",
    summary: "즉흥적으로 장식하며 조용히 감성을 즐기는 타입",
    description: [
      "즉흥적으로 음식을 장식하는 당신! 꾸미기를 좋아하고 화려하게 즐겨요. 즉흥적으로 자유롭게 장식하고, 익숙한 스타일을 기본으로 사용해요.",
      "충분히 시간을 들이고, 보기 좋음과 감성에 따라 선택해요. 그냥 먹고 조용히 즐기며, 가끔 장식하고 신중하게 즐겨요.",
      "장식을 통해 자신만의 스타일을 만들고, 아름다운 장식 경험을 만드는 것을 즐겨요.",
    ],
    traits: ["감성 장식", "조용한 즐김", "예술적 접근"],
    picks: ["화려한 장식", "즉흥 조합", "전통 장식"],
    tips: ["계획적 장식", "효율적 접근", "적극적 공유"],
    match: "ENTJ, ESTJ",
    emoji: "🎨",
  },
  ISFJ: {
    label: "정성 장식 수호자",
    summary: "계획적이고 감성적으로 장식하며 정성을 담는 타입",
    description: [
      "계획적이고 감성적으로 음식을 장식하는 당신! 꾸미기를 좋아하고 화려하게 즐겨요. 계획적으로 체계적으로 장식하고, 미리 준비하고 계획해요.",
      "충분히 시간을 들이고, 보기 좋음과 감성에 따라 선택해요. 신중하게 고민 후 장식하고, 소중한 사람들을 위한 장식을 만들어요.",
      "장식을 통해 정성을 담고, 소중한 사람들을 위한 장식을 하는 것을 좋아해요.",
    ],
    traits: ["계획적 장식", "정성 담기", "조용한 배려"],
    picks: ["화려한 장식", "계획적 준비", "전통 장식"],
    tips: ["즉흥 장식", "효율적 접근", "적극적 공유"],
    match: "ENTP, ESTP",
    emoji: "💝",
  },
  ISTP: {
    label: "실용 장식 기술자",
    summary: "즉흥적으로 장식하며 실용적으로 즐기는 타입",
    description: [
      "즉흥적으로 음식을 장식하는 당신! 심플을 선호하고 간단하게 즐겨요. 즉흥적으로 자유롭게 장식하고, 익숙한 스타일을 기본으로 사용해요.",
      "충분히 시간을 들이고, 실용과 효율에 따라 선택해요. 그냥 먹고 조용히 즐기며, 가끔 장식하고 신중하게 분석해요.",
      "장식을 통해 실용성을 추구하고, 합리적인 장식을 하는 것을 즐겨요.",
    ],
    traits: ["즉흥적 장식", "실용적 접근", "효율적 장식"],
    picks: ["심플 장식", "즉흥 조합", "전통 장식"],
    tips: ["화려한 장식", "감성 접근", "적극적 공유"],
    match: "ENFJ, ESFJ",
    emoji: "🔧",
  },
  ISTJ: {
    label: "원칙 장식 수호자",
    summary: "계획적이고 논리적으로 장식하며 원칙에 따라 관리하는 타입",
    description: [
      "계획적이고 논리적으로 음식을 장식하는 당신! 심플을 선호하고 간단하게 즐겨요. 계획적으로 체계적으로 장식하고, 미리 준비하고 계획해요.",
      "빠르게 효율적으로 장식하고, 실용과 효율에 따라 선택해요. 신중하게 고민 후 장식하고, 원칙에 따라 장식하는 시스템을 만들어요.",
      "장식을 통해 안정감을 느끼고, 신뢰할 수 있는 장식 시스템을 만드는 것을 좋아해요.",
    ],
    traits: ["계획적 장식", "원칙 준수", "논리적 장식"],
    picks: ["심플 장식", "계획적 준비", "전통 장식"],
    tips: ["감성 접근", "즉흥 장식", "적극적 공유"],
    match: "ENFP, ESFP",
    emoji: "📐",
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const mbtiType = (searchParams.get("type") as keyof typeof garnishingTypes) || "ENFP"
  const resultId = searchParams.get("id")
  const character = garnishingTypes[mbtiType]
  const [result, setResult] = useState<any>(null)

  useEffect(() => {
    if (resultId) {
      getTestResult(resultId)
        .then((data) => setResult(data))
        .catch((err) => console.error("결과 조회 실패:", err))
    }
  }, [resultId])

  const shareTitle = `나의 음식 장식 스타일은 "${character.label}" ${character.emoji}`
  const shareDescription = `${character.summary}\n\n나도 음식 장식 스타일 테스트 하러 가기 🌿`

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
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
                <ShareButtons
                  testId="food-garnishing"
                  testPath="/tests/food-garnishing/test/result"
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
                <Sprout className="h-6 w-6 text-white" />
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
              <h2 className="text-2xl font-bold">추천 장식 스타일</h2>
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
              <p className="text-lg mb-2 text-muted-foreground">최고의 장식 파트너</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">{character.match}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-gradient-to-br from-green-500 to-emerald-500">
          <CardContent className="p-8">
            <div className="text-center space-y-6 text-white">
              <h2 className="text-2xl font-bold">다른 테스트도 해보세요!</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button size="lg" variant="secondary" className="h-auto py-4 bg-white/20 hover:bg-white/30 text-white border-white/30" asChild>
                  <Link href="/tests/food-ordering"><div className="text-left w-full"><div className="text-2xl mb-1">📱</div><div className="font-semibold">주문 방식</div></div><ArrowRight className="ml-auto h-5 w-5" /></Link>
                </Button>
                <Button size="lg" variant="secondary" className="h-auto py-4 bg-white/20 hover:bg-white/30 text-white border-white/30" asChild>
                  <Link href="/tests/food-review"><div className="text-left w-full"><div className="text-2xl mb-1">⭐</div><div className="font-semibold">음식 리뷰 작성 스타일</div></div><ArrowRight className="ml-auto h-5 w-5" /></Link>
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

export default function FoodGarnishingResult() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-center space-y-4"><div className="text-4xl animate-bounce">🌿</div><p className="text-muted-foreground">결과 로딩 중...</p></div></div>}>
      <ResultContent />
    </Suspense>
  )
}

