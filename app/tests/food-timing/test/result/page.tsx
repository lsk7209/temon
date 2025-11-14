"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShareButtons } from "@/components/share-buttons"
import { Timer, Heart, Lightbulb, Users, ArrowRight, Sparkles } from "lucide-react"
import { getTestResult } from "@/lib/api-client"

const timingTypes = {
  ENFP: {
    label: "즉흥 시간 탐험가",
    summary: "즉흥적으로 식사 시간을 선택하며 유연하게 즐기는 타입",
    description: [
      "즉흥적으로 식사 시간을 선택하는 당신! 그때그때 기분에 따라 결정하고, 유연하게 대응하며, 새로운 시간대를 시도해요.",
      "식사 시간을 즐겁게 공유하고, 사람들과 함께 즐겨요. 시간 선택에 감성을 담고, 그 순간의 기분에 따라 창의적으로 표현해요.",
      "식사 시간을 통해 즐거움을 느끼고, 모두가 행복해하는 것을 좋아해요.",
    ],
    traits: ["즉흥적 선택", "유연한 대응", "적극적 공유"],
    picks: ["유연한 시간", "즉시 결정", "즐거운 경험"],
    tips: ["시간 계획", "규칙적 시간", "천천히 즐기기"],
    match: "ISTJ, INTJ",
    emoji: "✨",
  },
  ENFJ: {
    label: "감성 시간 큐레이터",
    summary: "계획적으로 식사 시간을 관리하며 사람들과 즐거움을 나누는 타입",
    description: [
      "계획적으로 식사 시간을 관리하는 당신! 미리 계획하고, 규칙적인 시간을 선호하며, 감성적으로 즐겨요.",
      "식사 시간을 즐겁게 공유하고, 사람들과 함께 즐겨요. 모두가 만족할 수 있는 시간을 찾고, 즐거운 시간을 만들어요.",
      "시간 선택에 의미를 부여하고, 특별한 순간을 만드는 것을 좋아해요.",
    ],
    traits: ["계획적 관리", "감성 선택", "적극적 공유"],
    picks: ["규칙적 시간", "즉시 공유", "즐거운 경험"],
    tips: ["유연한 시간", "실용적 접근", "조용한 시간"],
    match: "ISTP, INTP",
    emoji: "💖",
  },
  ENTP: {
    label: "실험 시간 혁신가",
    summary: "즉흥적으로 식사 시간을 실험하며 논리적으로 접근하는 타입",
    description: [
      "즉흥적으로 식사 시간을 선택하는 당신! 그때그때 기분에 따라 결정하고, 논리적으로 접근하며, 효율적으로 즐겨요.",
      "새로운 시간대를 시도하고, 사람들과 식사 시간 경험을 공유해요. 시간 선택에 논리적 이유를 찾고, 최적의 시간을 탐구해요.",
      "식사 시간을 통해 실험하고, 새로운 가능성을 찾는 것을 좋아해요.",
    ],
    traits: ["실험적 접근", "논리적 선택", "적극적 탐구"],
    picks: ["유연한 시간", "즉시 결정", "효율적 선택"],
    tips: ["시간 계획", "감성 접근", "천천히 즐기기"],
    match: "ISFJ, ISTJ",
    emoji: "🔬",
  },
  ENTJ: {
    label: "전략 시간 마스터",
    summary: "계획적이고 논리적으로 식사 시간을 관리하며 효율을 추구하는 타입",
    description: [
      "계획적이고 논리적으로 식사 시간을 관리하는 당신! 미리 계획하고, 규칙적인 시간을 선호하며, 효율적으로 즐겨요.",
      "시간 선택에 논리적 이유를 찾고, 최적의 시간을 만들어요. 사람들과 식사 시간 경험을 공유하고, 효율적인 시스템을 구축해요.",
      "식사 시간을 통해 효율성을 높이고, 완벽한 경험을 만드는 것을 좋아해요.",
    ],
    traits: ["계획적 관리", "논리적 접근", "효율적 실행"],
    picks: ["규칙적 시간", "즉시 공유", "효율적 시간"],
    tips: ["감성 접근", "유연한 시간", "조용한 시간"],
    match: "ISFP, INFP",
    emoji: "⚡",
  },
  INFP: {
    label: "감성 시간 예술가",
    summary: "즉흥적으로 식사 시간을 선택하며 조용히 감성을 즐기는 타입",
    description: [
      "즉흥적으로 식사 시간을 선택하는 당신! 그때그때 기분에 따라 결정하고, 감성적으로 즐기며, 조용히 즐겨요.",
      "유연한 시간을 선호하고, 천천히 여유롭게 즐겨요. 시간 선택에 감성을 담고, 그 순간의 의미를 생각해요.",
      "식사 시간을 통해 자신을 표현하고, 평온한 시간을 보내는 것을 좋아해요.",
    ],
    traits: ["감성 선택", "조용한 즐김", "즉흥적 변화"],
    picks: ["유연한 시간", "천천히 즐기기", "의미 있는 시간"],
    tips: ["시간 계획", "적극적 공유", "논리적 접근"],
    match: "ESTJ, ENTJ",
    emoji: "🌸",
  },
  INFJ: {
    label: "완벽 시간 큐레이터",
    summary: "계획적이고 감성적으로 식사 시간을 관리하며 의미를 찾는 타입",
    description: [
      "계획적이고 감성적으로 식사 시간을 관리하는 당신! 미리 계획하고, 규칙적인 시간을 선호하며, 감성적으로 즐겨요.",
      "천천히 여유롭게 즐기고, 그 순간의 의미를 생각해요. 시간 선택에 깊은 의미를 부여하고, 완벽한 경험을 만들어요.",
      "식사 시간을 통해 특별한 순간을 만들고, 소중한 기억을 남기는 것을 좋아해요.",
    ],
    traits: ["계획적 관리", "감성 선택", "완벽한 경험"],
    picks: ["규칙적 시간", "천천히 즐기기", "의미 있는 시간"],
    tips: ["유연한 시간", "적극적 공유", "논리적 접근"],
    match: "ESTP, ESFP",
    emoji: "🌙",
  },
  INTP: {
    label: "분석 시간 연구가",
    summary: "즉흥적으로 식사 시간을 분석하며 논리적으로 즐기는 타입",
    description: [
      "즉흥적으로 식사 시간을 선택하는 당신! 그때그때 기분에 따라 결정하고, 논리적으로 접근하며, 조용히 즐겨요.",
      "유연한 시간을 선호하고, 천천히 여유롭게 즐겨요. 시간 선택에 논리적 이유를 찾고, 최적의 방법을 고민해요.",
      "식사 시간을 통해 실험하고, 분석하는 것을 좋아해요.",
    ],
    traits: ["논리적 분석", "조용한 탐구", "효율적 선택"],
    picks: ["유연한 시간", "천천히 즐기기", "논리적 시간"],
    tips: ["시간 계획", "감성 접근", "적극적 공유"],
    match: "ESFJ, ENFJ",
    emoji: "🧪",
  },
  INTJ: {
    label: "전략 완벽 시간가",
    summary: "계획적이고 논리적으로 식사 시간을 관리하며 완벽을 추구하는 타입",
    description: [
      "계획적이고 논리적으로 식사 시간을 관리하는 당신! 미리 계획하고, 규칙적인 시간을 선호하며, 효율적으로 즐겨요.",
      "천천히 여유롭게 즐기고, 그 순간의 효율성을 생각해요. 시간 선택에 논리적 이유를 찾고, 완벽한 시스템을 만들어요.",
      "식사 시간을 통해 효율성을 높이고, 최적의 경험을 만드는 것을 좋아해요.",
    ],
    traits: ["계획적 관리", "논리적 접근", "완벽한 시스템"],
    picks: ["규칙적 시간", "천천히 즐기기", "효율적 시간"],
    tips: ["감성 접근", "유연한 시간", "적극적 공유"],
    match: "ESFP, ENFP",
    emoji: "🎯",
  },
  ESFP: {
    label: "즉흥 즐거움 시간가",
    summary: "즉흥적으로 식사 시간을 선택하며 사람들과 행복을 나누는 타입",
    description: [
      "즉흥적으로 식사 시간을 선택하는 당신! 익숙한 시간대를 선호하고, 감성적으로 즐기며, 즉시 결정해요.",
      "그때그때 기분에 따라 결정하고, 사람들과 식사 시간을 적극적으로 공유해요. 시간을 통해 즐거움을 나누고, 모두가 행복해하는 것을 좋아해요.",
      "시간 선택에 감성을 담고, 그 순간을 즐기는 것을 좋아해요.",
    ],
    traits: ["즉흥적 선택", "감성 선택", "적극적 공유"],
    picks: ["익숙한 시간", "즉시 결정", "즐거운 경험"],
    tips: ["시간 계획", "논리적 접근", "천천히 즐기기"],
    match: "INTJ, ISTJ",
    emoji: "🎉",
  },
  ESFJ: {
    label: "전통 배려 시간가",
    summary: "계획적이고 감성적으로 식사 시간을 관리하며 모두를 챙기는 타입",
    description: [
      "계획적이고 감성적으로 식사 시간을 관리하는 당신! 미리 계획하고, 규칙적인 시간을 선호하며, 감성적으로 즐겨요.",
      "익숙한 시간대를 선호하고, 사람들과 식사 시간을 적극적으로 공유해요. 모두가 만족할 수 있는 시간을 찾고, 즐거운 시간을 만들어요.",
      "식사 시간을 통해 사람들을 챙기고, 행복을 나누는 것을 좋아해요.",
    ],
    traits: ["계획적 관리", "감성 선택", "모두 배려"],
    picks: ["규칙적 시간", "즉시 공유", "즐거운 경험"],
    tips: ["유연한 시간", "논리적 방식", "조용한 시간"],
    match: "INTP, ISTP",
    emoji: "🤝",
  },
  ESTP: {
    label: "즉흥 실용 시간가",
    summary: "즉흥적으로 식사 시간을 선택하며 빠르게 즐기는 타입",
    description: [
      "즉흥적으로 식사 시간을 선택하는 당신! 익숙한 시간대를 선호하고, 논리적으로 즐기며, 즉시 결정해요.",
      "그때그때 기분에 따라 결정하고, 사람들과 식사 시간을 공유해요. 시간 선택에 실용적 이유를 찾고, 빠르게 결정해요.",
      "식사 시간을 통해 즐거움을 느끼고, 실용적인 경험을 만드는 것을 좋아해요.",
    ],
    traits: ["즉흥적 선택", "실용적 접근", "빠른 결정"],
    picks: ["익숙한 시간", "즉시 결정", "효율적 선택"],
    tips: ["시간 계획", "감성 접근", "천천히 즐기기"],
    match: "INFJ, ISFJ",
    emoji: "⚡",
  },
  ESTJ: {
    label: "체계 완벽 시간가",
    summary: "계획적이고 논리적으로 식사 시간을 체계적으로 관리하는 타입",
    description: [
      "계획적이고 논리적으로 식사 시간을 관리하는 당신! 미리 계획하고, 규칙적인 시간을 선호하며, 효율적으로 즐겨요.",
      "익숙한 시간대를 선호하고, 즉시 체계적으로 정리해요. 시간 선택에 논리적 이유를 찾고, 체계적으로 관리해요.",
      "식사 시간을 통해 효율성을 높이고, 완벽한 시스템을 만드는 것을 좋아해요.",
    ],
    traits: ["계획적 관리", "논리적 접근", "체계적 관리"],
    picks: ["규칙적 시간", "즉시 공유", "효율적 시간"],
    tips: ["감성 접근", "유연한 시간", "조용한 시간"],
    match: "INFP, INTP",
    emoji: "📋",
  },
  ISFP: {
    label: "감성 시간 예술가",
    summary: "즉흥적으로 식사 시간을 선택하며 조용히 감성을 즐기는 타입",
    description: [
      "즉흥적으로 식사 시간을 선택하는 당신! 익숙한 시간대를 선호하고, 감성적으로 즐기며, 조용히 즐겨요.",
      "그때그때 기분에 따라 결정하고, 천천히 여유롭게 즐겨요. 시간 선택에 감성을 담고, 자신만의 스타일을 만들어요.",
      "식사 시간을 통해 감성을 표현하고, 아름다운 순간을 만드는 것을 좋아해요.",
    ],
    traits: ["감성 선택", "조용한 즐김", "즉흥적 변화"],
    picks: ["익숙한 시간", "천천히 즐기기", "감성적 시간"],
    tips: ["시간 계획", "논리적 접근", "적극적 공유"],
    match: "ENTJ, ESTJ",
    emoji: "🎨",
  },
  ISFJ: {
    label: "정성 규칙 시간가",
    summary: "계획적이고 감성적으로 식사 시간을 관리하며 정성을 담는 타입",
    description: [
      "계획적이고 감성적으로 식사 시간을 관리하는 당신! 미리 계획하고, 규칙적인 시간을 선호하며, 감성적으로 즐겨요.",
      "익숙한 시간대를 선호하고, 천천히 여유롭게 즐겨요. 시간 선택에 정성을 담고, 소중한 사람들을 위해 완성해요.",
      "식사 시간을 통해 사랑을 표현하고, 따뜻한 마음을 전달하는 것을 좋아해요.",
    ],
    traits: ["계획적 관리", "정성 선택", "조용한 배려"],
    picks: ["규칙적 시간", "천천히 즐기기", "감성적 시간"],
    tips: ["유연한 시간", "논리적 방식", "적극적 공유"],
    match: "ENTP, ESTP",
    emoji: "💝",
  },
  ISTP: {
    label: "실용 시간 기술자",
    summary: "즉흥적으로 식사 시간을 선택하며 실용적으로 즐기는 타입",
    description: [
      "즉흥적으로 식사 시간을 선택하는 당신! 익숙한 시간대를 선호하고, 논리적으로 즐기며, 조용히 즐겨요.",
      "그때그때 기분에 따라 결정하고, 천천히 여유롭게 즐겨요. 시간 선택에 실용적 이유를 찾고, 최소한의 노력으로 최대 효과를 내요.",
      "식사 시간을 통해 실용성을 추구하고, 합리적인 선택을 하는 것을 좋아해요.",
    ],
    traits: ["즉흥적 선택", "실용적 접근", "효율적 즐김"],
    picks: ["익숙한 시간", "천천히 즐기기", "효율적 시간"],
    tips: ["시간 계획", "감성 접근", "적극적 공유"],
    match: "ENFJ, ESFJ",
    emoji: "🔧",
  },
  ISTJ: {
    label: "원칙 규칙 시간가",
    summary: "계획적이고 논리적으로 식사 시간을 원칙에 따라 관리하는 타입",
    description: [
      "계획적이고 논리적으로 식사 시간을 관리하는 당신! 미리 계획하고, 규칙적인 시간을 선호하며, 효율적으로 즐겨요.",
      "익숙한 시간대를 선호하고, 천천히 여유롭게 즐겨요. 시간 선택에 논리적 이유를 찾고, 원칙에 따라 관리해요.",
      "식사 시간을 통해 안정감을 느끼고, 신뢰할 수 있는 경험을 만드는 것을 좋아해요.",
    ],
    traits: ["계획적 관리", "원칙 준수", "논리적 선택"],
    picks: ["규칙적 시간", "천천히 즐기기", "효율적 시간"],
    tips: ["감성 접근", "유연한 시간", "적극적 공유"],
    match: "ENFP, ESFP",
    emoji: "📐",
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const mbtiType = (searchParams.get("type") as keyof typeof timingTypes) || "ENFP"
  const resultId = searchParams.get("id")
  const character = timingTypes[mbtiType]
  const [result, setResult] = useState<any>(null)

  useEffect(() => {
    if (resultId) {
      getTestResult(resultId)
        .then((data) => setResult(data))
        .catch((err) => console.error("결과 조회 실패:", err))
    }
  }, [resultId])

  const shareTitle = `나의 식사 시간대 스타일은 "${character.label}" ${character.emoji}`
  const shareDescription = `${character.summary}\n\n나도 식사 시간대 테스트 하러 가기 ⏰`

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
                <ShareButtons
                  testId="food-timing"
                  testPath="/tests/food-timing/test/result"
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
                <Timer className="h-6 w-6 text-white" />
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
              <h2 className="text-2xl font-bold">추천 시간대 스타일</h2>
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
              <p className="text-lg mb-2 text-muted-foreground">최고의 시간대 파트너</p>
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
                  <Link href="/tests/food-combination"><div className="text-left w-full"><div className="text-2xl mb-1">🍽️</div><div className="font-semibold">음식 조합 스타일</div></div><ArrowRight className="ml-auto h-5 w-5" /></Link>
                </Button>
                <Button size="lg" variant="secondary" className="h-auto py-4 bg-white/20 hover:bg-white/30 text-white border-white/30" asChild>
                  <Link href="/tests/food-waste"><div className="text-left w-full"><div className="text-2xl mb-1">♻️</div><div className="font-semibold">음식 낭비 대처</div></div><ArrowRight className="ml-auto h-5 w-5" /></Link>
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

export default function FoodTimingResult() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-center space-y-4"><div className="text-4xl animate-bounce">⏰</div><p className="text-muted-foreground">결과 로딩 중...</p></div></div>}>
      <ResultContent />
    </Suspense>
  )
}

