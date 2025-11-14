"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShareButtons } from "@/components/share-buttons"
import { Smartphone, Heart, Lightbulb, Users, ArrowRight, Sparkles } from "lucide-react"
import { getTestResult } from "@/lib/api-client"

const orderingTypes = {
  ENFP: {
    label: "즉흥 주문 탐험가",
    summary: "즉흥적으로 주문하며 새로운 방식을 시도하는 타입",
    description: [
      "즉흥적으로 주문하는 당신! 앱 주문을 선호하고 편리하게 즐겨요. 그때그때 즉흥적으로 주문하고, 새로운 방법을 실험하며, 즉시 결정하고 주문해요.",
      "다른 사람과 함께 주문하고, 효율성과 실용에 따라 선택해요. 빠르게 효율적으로 주문하며, 자주 주문하고 적극적으로 즐겨요.",
      "주문을 통해 새로운 경험을 발견하고, 다양한 주문 방법을 탐구하는 것을 즐겨요.",
    ],
    traits: ["즉흥적 주문", "새로운 방법", "적극적 공유"],
    picks: ["앱 주문", "즉시 결정", "새로운 방식"],
    tips: ["신중한 주문", "직접 주문", "계획적 주문"],
    match: "ISTJ, INTJ",
    emoji: "✨",
  },
  ENFJ: {
    label: "배려 주문 큐레이터",
    summary: "계획적으로 주문하며 모두를 위한 주문을 만드는 타입",
    description: [
      "계획적으로 주문하는 당신! 직접 주문을 선호하고 소통하며 즐겨요. 미리 준비하고 계획하며, 신중하게 고민 후 주문해요.",
      "다른 사람과 함께 주문하고, 감성과 분위기에 따라 선택해요. 여유롭게 천천히 주문하며, 모두가 만족할 수 있는 주문을 만들어요.",
      "주문을 통해 모두를 위한 경험을 만들고, 소중한 사람들을 위한 주문을 하는 것을 좋아해요.",
    ],
    traits: ["계획적 주문", "소통 중시", "배려심"],
    picks: ["직접 주문", "신중한 결정", "감성 선택"],
    tips: ["빠른 주문", "앱 주문", "효율적 접근"],
    match: "ISTP, INTP",
    emoji: "💖",
  },
  ENTP: {
    label: "혁신 주문 실험가",
    summary: "즉흥적으로 주문하며 효율적인 방식을 실험하는 타입",
    description: [
      "즉흥적으로 주문하는 당신! 앱 주문을 선호하고 편리하게 즐겨요. 그때그때 즉흥적으로 주문하고, 새로운 방법을 실험하며, 즉시 결정하고 주문해요.",
      "다른 사람과 함께 주문하고, 효율성과 실용에 따라 선택해요. 빠르게 효율적으로 주문하며, 효율적인 주문 방법을 실험해요.",
      "주문을 통해 효율적인 방식을 실험하고, 최적의 주문 방법을 찾는 것을 좋아해요.",
    ],
    traits: ["즉흥적 주문", "효율적 접근", "실험적 방식"],
    picks: ["앱 주문", "즉시 결정", "새로운 방식"],
    tips: ["신중한 주문", "감성 접근", "직접 주문"],
    match: "ISFJ, ISTJ",
    emoji: "🔬",
  },
  ENTJ: {
    label: "전략 주문 마스터",
    summary: "계획적이고 효율적으로 주문하며 완벽한 시스템을 만드는 타입",
    description: [
      "계획적이고 효율적으로 주문하는 당신! 앱 주문을 선호하고 편리하게 즐겨요. 미리 준비하고 계획하며, 빠르게 효율적으로 주문해요.",
      "효율성과 실용에 따라 선택하며, 효율적인 주문 시스템을 만들어요. 완벽한 주문 방법을 찾고, 최적의 주문 시스템을 만드는 것을 좋아해요.",
      "주문을 통해 효율적인 시스템을 만들고, 완벽한 주문 방법을 만드는 것을 좋아해요.",
    ],
    traits: ["계획적 주문", "효율적 시스템", "완벽한 주문"],
    picks: ["앱 주문", "계획적 준비", "효율적 주문"],
    tips: ["감성 접근", "직접 주문", "여유로운 주문"],
    match: "ISFP, INFP",
    emoji: "⚡",
  },
  INFP: {
    label: "감성 주문 예술가",
    summary: "즉흥적으로 주문하며 조용히 감성을 즐기는 타입",
    description: [
      "즉흥적으로 주문하는 당신! 직접 주문을 선호하고 소통하며 즐겨요. 그때그때 즉흥적으로 주문하고, 신중하게 고민 후 주문해요.",
      "혼자만 주문하고, 감성과 분위기에 따라 선택해요. 여유롭게 천천히 주문하며, 자신만의 주문 경험을 만들어요.",
      "주문을 통해 자신만의 스타일을 만들고, 아름다운 주문 경험을 만드는 것을 즐겨요.",
    ],
    traits: ["감성 주문", "조용한 주문", "즉흥적 방식"],
    picks: ["직접 주문", "신중한 결정", "감성 선택"],
    tips: ["계획적 주문", "적극적 공유", "효율적 접근"],
    match: "ESTJ, ENTJ",
    emoji: "🌸",
  },
  INFJ: {
    label: "완벽 주문 큐레이터",
    summary: "계획적이고 감성적으로 주문하며 의미를 찾는 타입",
    description: [
      "계획적이고 감성적으로 주문하는 당신! 직접 주문을 선호하고 소통하며 즐겨요. 미리 준비하고 계획하며, 신중하게 고민 후 주문해요.",
      "혼자만 주문하고, 감성과 분위기에 따라 선택해요. 여유롭게 천천히 주문하며, 완벽한 주문 경험을 만들어요.",
      "주문을 통해 완벽한 경험을 만들고, 의미 있는 주문 경험을 만드는 것을 좋아해요.",
    ],
    traits: ["계획적 주문", "감성 선택", "완벽한 주문"],
    picks: ["직접 주문", "계획적 준비", "감성 선택"],
    tips: ["즉흥 주문", "적극적 공유", "효율적 접근"],
    match: "ESTP, ESFP",
    emoji: "🌙",
  },
  INTP: {
    label: "분석 주문 연구가",
    summary: "즉흥적으로 주문하며 논리적으로 분석하는 타입",
    description: [
      "즉흥적으로 주문하는 당신! 앱 주문을 선호하고 편리하게 즐겨요. 그때그때 즉흥적으로 주문하고, 새로운 방법을 실험하며, 신중하게 고민 후 주문해요.",
      "혼자만 주문하고, 효율성과 실용에 따라 선택해요. 빠르게 효율적으로 주문하며, 논리적인 주문 방법을 연구해요.",
      "주문을 통해 논리적인 방식을 찾고, 최적의 주문 방법을 연구하는 것을 즐겨요.",
    ],
    traits: ["논리적 분석", "조용한 주문", "효율적 주문"],
    picks: ["앱 주문", "신중한 결정", "새로운 방식"],
    tips: ["감성 접근", "직접 주문", "적극적 공유"],
    match: "ESFJ, ENFJ",
    emoji: "🧪",
  },
  INTJ: {
    label: "전략 주문 설계자",
    summary: "계획적이고 논리적으로 주문하며 완벽을 추구하는 타입",
    description: [
      "계획적이고 논리적으로 주문하는 당신! 앱 주문을 선호하고 편리하게 즐겨요. 미리 준비하고 계획하며, 신중하게 고민 후 주문해요.",
      "효율성과 실용에 따라 선택하며, 빠르게 효율적으로 주문해요. 완벽한 주문 시스템을 설계하고, 최적의 주문 방법을 만들어요.",
      "주문을 통해 완벽한 시스템을 설계하고, 최적의 주문 방법을 만드는 것을 좋아해요.",
    ],
    traits: ["계획적 설계", "논리적 주문", "완벽한 시스템"],
    picks: ["앱 주문", "계획적 준비", "효율적 주문"],
    tips: ["감성 접근", "직접 주문", "적극적 공유"],
    match: "ESFP, ENFP",
    emoji: "🎯",
  },
  ESFP: {
    label: "즉흥 주문 즐거움러",
    summary: "즉흥적으로 주문하며 사람들과 행복을 나누는 타입",
    description: [
      "즉흥적으로 주문하는 당신! 직접 주문을 선호하고 소통하며 즐겨요. 그때그때 즉흥적으로 주문하고, 익숙한 방법을 기본으로 사용하며, 즉시 결정하고 주문해요.",
      "다른 사람과 함께 주문하고, 감성과 분위기에 따라 선택해요. 빠르게 효율적으로 주문하며, 자주 주문하고 적극적으로 즐겨요.",
      "주문을 통해 즐거움을 나누고, 모두가 행복해하는 주문을 만드는 것을 좋아해요.",
    ],
    traits: ["즉흥적 주문", "감성 선택", "적극적 공유"],
    picks: ["직접 주문", "즉시 결정", "전통 방식"],
    tips: ["신중한 주문", "앱 주문", "효율적 접근"],
    match: "INTJ, ISTJ",
    emoji: "🎉",
  },
  ESFJ: {
    label: "전통 주문 배려자",
    summary: "계획적이고 감성적으로 주문하며 모두를 챙기는 타입",
    description: [
      "계획적이고 감성적으로 주문하는 당신! 직접 주문을 선호하고 소통하며 즐겨요. 미리 준비하고 계획하며, 즉시 결정하고 주문해요.",
      "다른 사람과 함께 주문하고, 감성과 분위기에 따라 선택해요. 여유롭게 천천히 주문하며, 모두가 만족할 수 있는 주문을 만들어요.",
      "주문을 통해 사람들을 챙기고, 행복을 나누는 것을 좋아해요.",
    ],
    traits: ["계획적 주문", "감성 선택", "모두 배려"],
    picks: ["직접 주문", "즉시 결정", "전통 방식"],
    tips: ["즉흥 주문", "앱 주문", "효율적 접근"],
    match: "INTP, ISTP",
    emoji: "🤝",
  },
  ESTP: {
    label: "즉흥 주문 실용러",
    summary: "즉흥적으로 주문하며 빠르게 즐기는 타입",
    description: [
      "즉흥적으로 주문하는 당신! 앱 주문을 선호하고 편리하게 즐겨요. 그때그때 즉흥적으로 주문하고, 익숙한 방법을 기본으로 사용하며, 즉시 결정하고 주문해요.",
      "다른 사람과 함께 주문하고, 효율성과 실용에 따라 선택해요. 빠르게 효율적으로 주문하며, 자주 주문하고 빠르게 즐겨요.",
      "주문을 통해 실용적인 방식을 찾고, 효율적인 주문을 하는 것을 좋아해요.",
    ],
    traits: ["즉흥적 주문", "실용적 접근", "빠른 주문"],
    picks: ["앱 주문", "즉시 결정", "전통 방식"],
    tips: ["신중한 주문", "감성 접근", "직접 주문"],
    match: "INFJ, ISFJ",
    emoji: "⚡",
  },
  ESTJ: {
    label: "체계 주문 관리자",
    summary: "계획적이고 논리적으로 주문하며 체계적으로 관리하는 타입",
    description: [
      "계획적이고 논리적으로 주문하는 당신! 앱 주문을 선호하고 편리하게 즐겨요. 미리 준비하고 계획하며, 즉시 결정하고 주문해요.",
      "효율성과 실용에 따라 선택하며, 빠르게 효율적으로 주문해요. 효율적인 주문 시스템을 만들고, 완벽한 주문 방법을 만들어요.",
      "주문을 통해 효율적인 시스템을 만들고, 체계적인 주문 방법을 만드는 것을 좋아해요.",
    ],
    traits: ["계획적 주문", "논리적 선택", "체계적 시스템"],
    picks: ["앱 주문", "즉시 결정", "전통 방식"],
    tips: ["감성 접근", "직접 주문", "여유로운 주문"],
    match: "INFP, INTP",
    emoji: "📋",
  },
  ISFP: {
    label: "감성 주문 예술가",
    summary: "즉흥적으로 주문하며 조용히 감성을 즐기는 타입",
    description: [
      "즉흥적으로 주문하는 당신! 직접 주문을 선호하고 소통하며 즐겨요. 그때그때 즉흥적으로 주문하고, 익숙한 방법을 기본으로 사용하며, 신중하게 고민 후 주문해요.",
      "혼자만 주문하고, 감성과 분위기에 따라 선택해요. 여유롭게 천천히 주문하며, 자신만의 주문 경험을 만들어요.",
      "주문을 통해 자신만의 스타일을 만들고, 아름다운 주문 경험을 만드는 것을 즐겨요.",
    ],
    traits: ["감성 주문", "조용한 주문", "예술적 접근"],
    picks: ["직접 주문", "신중한 결정", "전통 방식"],
    tips: ["계획적 주문", "효율적 접근", "적극적 공유"],
    match: "ENTJ, ESTJ",
    emoji: "🎨",
  },
  ISFJ: {
    label: "정성 주문 수호자",
    summary: "계획적이고 감성적으로 주문하며 정성을 담는 타입",
    description: [
      "계획적이고 감성적으로 주문하는 당신! 직접 주문을 선호하고 소통하며 즐겨요. 미리 준비하고 계획하며, 신중하게 고민 후 주문해요.",
      "혼자만 주문하고, 감성과 분위기에 따라 선택해요. 여유롭게 천천히 주문하며, 소중한 사람들을 위한 주문을 만들어요.",
      "주문을 통해 정성을 담고, 소중한 사람들을 위한 주문을 하는 것을 좋아해요.",
    ],
    traits: ["계획적 주문", "정성 담기", "조용한 배려"],
    picks: ["직접 주문", "계획적 준비", "전통 방식"],
    tips: ["즉흥 주문", "효율적 접근", "적극적 공유"],
    match: "ENTP, ESTP",
    emoji: "💝",
  },
  ISTP: {
    label: "실용 주문 기술자",
    summary: "즉흥적으로 주문하며 실용적으로 즐기는 타입",
    description: [
      "즉흥적으로 주문하는 당신! 앱 주문을 선호하고 편리하게 즐겨요. 그때그때 즉흥적으로 주문하고, 익숙한 방법을 기본으로 사용하며, 신중하게 고민 후 주문해요.",
      "혼자만 주문하고, 효율성과 실용에 따라 선택해요. 빠르게 효율적으로 주문하며, 실용적인 주문 방법을 찾아요.",
      "주문을 통해 실용성을 추구하고, 합리적인 주문을 하는 것을 즐겨요.",
    ],
    traits: ["즉흥적 주문", "실용적 접근", "효율적 주문"],
    picks: ["앱 주문", "신중한 결정", "전통 방식"],
    tips: ["감성 접근", "직접 주문", "적극적 공유"],
    match: "ENFJ, ESFJ",
    emoji: "🔧",
  },
  ISTJ: {
    label: "원칙 주문 수호자",
    summary: "계획적이고 논리적으로 주문하며 원칙에 따라 관리하는 타입",
    description: [
      "계획적이고 논리적으로 주문하는 당신! 앱 주문을 선호하고 편리하게 즐겨요. 미리 준비하고 계획하며, 신중하게 고민 후 주문해요.",
      "효율성과 실용에 따라 선택하며, 빠르게 효율적으로 주문해요. 원칙에 따라 주문하는 시스템을 만들고, 신뢰할 수 있는 주문 방법을 만들어요.",
      "주문을 통해 안정감을 느끼고, 신뢰할 수 있는 주문 시스템을 만드는 것을 좋아해요.",
    ],
    traits: ["계획적 주문", "원칙 준수", "논리적 주문"],
    picks: ["앱 주문", "계획적 준비", "전통 방식"],
    tips: ["감성 접근", "직접 주문", "적극적 공유"],
    match: "ENFP, ESFP",
    emoji: "📐",
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const mbtiType = (searchParams.get("type") as keyof typeof orderingTypes) || "ENFP"
  const resultId = searchParams.get("id")
  const character = orderingTypes[mbtiType]
  const [result, setResult] = useState<any>(null)

  useEffect(() => {
    if (resultId) {
      getTestResult(resultId)
        .then((data) => setResult(data))
        .catch((err) => console.error("결과 조회 실패:", err))
    }
  }, [resultId])

  const shareTitle = `나의 주문 방식은 "${character.label}" ${character.emoji}`
  const shareDescription = `${character.summary}\n\n나도 주문 방식 테스트 하러 가기 📱`

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <main className="container max-w-4xl mx-auto px-4 py-8 space-y-8">
        <Card className="border-0 shadow-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur">
          <CardContent className="p-8 md:p-12">
            <div className="text-center space-y-6">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {mbtiType}
              </Badge>

              <div>
                <div className="text-6xl mb-4">{character.emoji}</div>
                <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                  {character.label}
                </h1>
                <p className="text-xl text-muted-foreground">{character.summary}</p>
              </div>

              <div className="pt-6">
                <ShareButtons
                  testId="food-ordering"
                  testPath="/tests/food-ordering/test/result"
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
              <div className="p-3 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl">
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
              <div className="p-3 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl">
                <Smartphone className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold">주요 특징</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.traits.map((trait, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-xl text-center font-medium"
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
              <div className="p-3 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold">추천 주문 스타일</h2>
            </div>
            <div className="space-y-3">
              {character.picks.map((pick, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
                  <span className="text-lg">{pick}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur">
          <CardContent className="p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl">
                <Lightbulb className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold">성장 포인트</h2>
            </div>
            <div className="space-y-3">
              {character.tips.map((tip, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
                  <span className="text-lg">{tip}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur">
          <CardContent className="p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold">궁합</h2>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-xl">
              <p className="text-lg mb-2 text-muted-foreground">최고의 주문 파트너</p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{character.match}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-500 to-indigo-500">
          <CardContent className="p-8">
            <div className="text-center space-y-6 text-white">
              <h2 className="text-2xl font-bold">다른 테스트도 해보세요!</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button size="lg" variant="secondary" className="h-auto py-4 bg-white/20 hover:bg-white/30 text-white border-white/30" asChild>
                  <Link href="/tests/food-review"><div className="text-left w-full"><div className="text-2xl mb-1">⭐</div><div className="font-semibold">음식 리뷰 작성 스타일</div></div><ArrowRight className="ml-auto h-5 w-5" /></Link>
                </Button>
                <Button size="lg" variant="secondary" className="h-auto py-4 bg-white/20 hover:bg-white/30 text-white border-white/30" asChild>
                  <Link href="/tests/food-recipe"><div className="text-left w-full"><div className="text-2xl mb-1">📖</div><div className="font-semibold">레시피 활용 스타일</div></div><ArrowRight className="ml-auto h-5 w-5" /></Link>
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

export default function FoodOrderingResult() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-center space-y-4"><div className="text-4xl animate-bounce">📱</div><p className="text-muted-foreground">결과 로딩 중...</p></div></div>}>
      <ResultContent />
    </Suspense>
  )
}

