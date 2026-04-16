"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShareButtons } from "@/components/share-buttons"
import { FileText, Heart, Lightbulb, Users, ArrowRight, Sparkles, RotateCcw } from "lucide-react"
import { getTestResult } from "@/lib/api-client"

const labelTypes = {
  ENFP: {
    label: "즉흥 라벨 탐험가",
    summary: "즉흥적으로 라벨을 확인하며 새로운 정보를 탐구하는 타입",
    description: [
      "즉흥적으로 라벨을 확인하는 당신! 필요할 때만 확인하고, 핵심 정보만 빠르게 스캔해요. 라벨 정보를 다른 사람들과 공유하고, 즐거운 경험을 만들어요.",
      "라벨 확인 후 즉시 결정하고 구매하는 것을 좋아해요. 감성과 직감에 따라 선택하며, 그때그때 확인하는 유연한 스타일이에요.",
      "라벨을 통해 새로운 정보를 발견하고, 다양한 제품을 탐구하는 것을 즐겨요.",
    ],
    traits: ["즉흥적 확인", "빠른 스캔", "적극적 공유"],
    picks: ["핵심 정보 확인", "즉시 결정", "정보 공유"],
    tips: ["꼼꼼한 확인", "전체 정보 읽기", "신중한 결정"],
    match: "ISTJ, INTJ",
    emoji: "✨",
  },
  ENFJ: {
    label: "배려 라벨 큐레이터",
    summary: "계획적으로 라벨을 확인하며 모두를 위한 정보를 찾는 타입",
    description: [
      "계획적으로 라벨을 확인하는 당신! 항상 꼼꼼히 확인하고, 전체 정보를 모두 확인해요. 건강과 영양 정보에 관심이 많고, 다른 사람들과 정보를 공유해요.",
      "라벨 확인에 충분한 시간을 들이고, 신중하게 고민 후 결정해요. 미리 계획하고 확인하는 체계적인 스타일로, 모두가 만족할 수 있는 제품을 찾아요.",
      "라벨을 통해 건강한 선택을 하고, 소중한 사람들을 위한 정보를 제공하는 것을 좋아해요.",
    ],
    traits: ["계획적 확인", "전체 정보", "배려심"],
    picks: ["건강 정보 확인", "신중한 결정", "정보 공유"],
    tips: ["빠른 확인", "핵심만 보기", "즉시 결정"],
    match: "ISTP, INTP",
    emoji: "💖",
  },
  ENTP: {
    label: "분석 라벨 혁신가",
    summary: "즉흥적으로 라벨을 분석하며 논리적으로 선택하는 타입",
    description: [
      "즉흥적으로 라벨을 분석하는 당신! 필요할 때만 확인하고, 핵심 정보만 빠르게 스캔해요. 유통기한과 가격 같은 실용적 정보에 관심이 많아요.",
      "라벨 정보를 신뢰하지만, 필요시 추가로 검증하기도 해요. 빠르게 확인하고 즉시 결정하는 효율적인 스타일로, 논리적 이유로 선택해요.",
      "라벨을 통해 최적의 선택을 하고, 효율적인 구매를 하는 것을 좋아해요.",
    ],
    traits: ["즉흥적 분석", "논리적 선택", "효율적 확인"],
    picks: ["실용 정보 확인", "빠른 결정", "효율적 확인"],
    tips: ["꼼꼼한 확인", "감성 접근", "신중한 결정"],
    match: "ISFJ, ISTJ",
    emoji: "🔬",
  },
  ENTJ: {
    label: "전략 라벨 마스터",
    summary: "계획적이고 논리적으로 라벨을 확인하며 효율을 추구하는 타입",
    description: [
      "계획적이고 논리적으로 라벨을 확인하는 당신! 항상 꼼꼼히 확인하고, 전체 정보를 모두 확인해요. 유통기한과 가격 같은 실용적 정보를 중시해요.",
      "라벨 확인에 충분한 시간을 들이지만, 빠르게 결정하고 구매해요. 미리 계획하고 확인하는 체계적인 스타일로, 논리적 이유로 선택해요.",
      "라벨을 통해 효율적인 선택을 하고, 최적의 제품을 찾는 것을 좋아해요.",
    ],
    traits: ["계획적 확인", "논리적 선택", "효율적 실행"],
    picks: ["전체 정보 확인", "빠른 결정", "체계적 확인"],
    tips: ["감성 접근", "유연한 확인", "조용한 확인"],
    match: "ISFP, INFP",
    emoji: "⚡",
  },
  INFP: {
    label: "감성 라벨 예술가",
    summary: "즉흥적으로 라벨을 확인하며 조용히 감성을 즐기는 타입",
    description: [
      "즉흥적으로 라벨을 확인하는 당신! 필요할 때만 확인하고, 핵심 정보만 빠르게 스캔해요. 건강과 영양 정보에 관심이 많지만, 감성과 직감에 따라 선택해요.",
      "라벨 확인 후 고민하고 신중하게 결정해요. 그때그때 확인하는 유연한 스타일로, 혼자만 확인하고 결정하는 것을 좋아해요.",
      "라벨을 통해 자신만의 선택을 하고, 의미 있는 제품을 찾는 것을 즐겨요.",
    ],
    traits: ["감성 선택", "조용한 확인", "즉흥적 확인"],
    picks: ["건강 정보 확인", "신중한 결정", "개인적 확인"],
    tips: ["꼼꼼한 확인", "적극적 공유", "논리적 접근"],
    match: "ESTJ, ENTJ",
    emoji: "🌸",
  },
  INFJ: {
    label: "완벽 라벨 큐레이터",
    summary: "계획적이고 감성적으로 라벨을 확인하며 의미를 찾는 타입",
    description: [
      "계획적이고 감성적으로 라벨을 확인하는 당신! 항상 꼼꼼히 확인하고, 전체 정보를 모두 확인해요. 건강과 영양 정보에 깊은 관심을 가지고 있어요.",
      "라벨 확인에 충분한 시간을 들이고, 자세히 꼼꼼히 읽어요. 미리 계획하고 확인하는 체계적인 스타일로, 신중하게 고민 후 결정해요.",
      "라벨을 통해 완벽한 선택을 하고, 의미 있는 제품을 찾는 것을 좋아해요.",
    ],
    traits: ["계획적 확인", "감성 선택", "완벽한 확인"],
    picks: ["전체 정보 확인", "신중한 결정", "의미 있는 선택"],
    tips: ["빠른 확인", "적극적 공유", "논리적 접근"],
    match: "ESTP, ESFP",
    emoji: "🌙",
  },
  INTP: {
    label: "분석 라벨 연구가",
    summary: "즉흥적으로 라벨을 분석하며 논리적으로 즐기는 타입",
    description: [
      "즉흥적으로 라벨을 분석하는 당신! 필요할 때만 확인하고, 핵심 정보만 빠르게 스캔해요. 유통기한과 가격 같은 실용적 정보를 중시하지만, 추가로 검증하기도 해요.",
      "라벨 확인 후 고민하고 신중하게 결정해요. 그때그때 확인하는 유연한 스타일로, 혼자만 확인하고 분석하는 것을 좋아해요.",
      "라벨을 통해 논리적 선택을 하고, 최적의 방법을 찾는 것을 즐겨요.",
    ],
    traits: ["논리적 분석", "조용한 확인", "효율적 선택"],
    picks: ["실용 정보 확인", "신중한 결정", "개인적 분석"],
    tips: ["꼼꼼한 확인", "감성 접근", "적극적 공유"],
    match: "ESFJ, ENFJ",
    emoji: "🧪",
  },
  INTJ: {
    label: "전략 라벨 설계자",
    summary: "계획적이고 논리적으로 라벨을 확인하며 완벽을 추구하는 타입",
    description: [
      "계획적이고 논리적으로 라벨을 확인하는 당신! 항상 꼼꼼히 확인하고, 전체 정보를 모두 확인해요. 유통기한과 가격 같은 실용적 정보를 중시하며, 추가로 검증하기도 해요.",
      "라벨 확인에 충분한 시간을 들이고, 자세히 꼼꼼히 읽어요. 미리 계획하고 확인하는 체계적인 스타일로, 신중하게 고민 후 결정해요.",
      "라벨을 통해 완벽한 선택을 하고, 최적의 시스템을 만드는 것을 좋아해요.",
    ],
    traits: ["계획적 설계", "논리적 선택", "완벽한 시스템"],
    picks: ["전체 정보 확인", "신중한 결정", "체계적 확인"],
    tips: ["감성 접근", "유연한 확인", "적극적 공유"],
    match: "ESFP, ENFP",
    emoji: "🎯",
  },
  ESFP: {
    label: "즉흥 라벨 즐거움러",
    summary: "즉흥적으로 라벨을 확인하며 사람들과 행복을 나누는 타입",
    description: [
      "즉흥적으로 라벨을 확인하는 당신! 필요할 때만 확인하고, 핵심 정보만 빠르게 스캔해요. 건강과 영양 정보에 관심이 있지만, 감성과 직감에 따라 선택해요.",
      "라벨 확인 후 즉시 결정하고 구매하는 것을 좋아해요. 그때그때 확인하는 유연한 스타일로, 다른 사람들과 정보를 공유하고 즐거운 경험을 만들어요.",
      "라벨을 통해 즐거움을 나누고, 모두가 행복해하는 제품을 찾는 것을 좋아해요.",
    ],
    traits: ["즉흥적 확인", "감성 선택", "적극적 공유"],
    picks: ["핵심 정보 확인", "즉시 결정", "정보 공유"],
    tips: ["꼼꼼한 확인", "논리적 접근", "신중한 결정"],
    match: "INTJ, ISTJ",
    emoji: "🎉",
  },
  ESFJ: {
    label: "전통 라벨 배려자",
    summary: "계획적이고 감성적으로 라벨을 확인하며 모두를 챙기는 타입",
    description: [
      "계획적이고 감성적으로 라벨을 확인하는 당신! 항상 꼼꼼히 확인하고, 전체 정보를 모두 확인해요. 건강과 영양 정보에 깊은 관심을 가지고 있어요.",
      "라벨 확인에 충분한 시간을 들이고, 빠르게 결정하고 구매해요. 미리 계획하고 확인하는 체계적인 스타일로, 다른 사람들과 정보를 공유해요.",
      "라벨을 통해 사람들을 챙기고, 행복을 나누는 것을 좋아해요.",
    ],
    traits: ["계획적 확인", "감성 선택", "모두 배려"],
    picks: ["건강 정보 확인", "빠른 결정", "정보 공유"],
    tips: ["유연한 확인", "논리적 접근", "조용한 확인"],
    match: "INTP, ISTP",
    emoji: "🤝",
  },
  ESTP: {
    label: "즉흥 라벨 실용러",
    summary: "즉흥적으로 라벨을 확인하며 빠르게 즐기는 타입",
    description: [
      "즉흥적으로 라벨을 확인하는 당신! 필요할 때만 확인하고, 핵심 정보만 빠르게 스캔해요. 유통기한과 가격 같은 실용적 정보에 관심이 많아요.",
      "라벨 확인 후 즉시 결정하고 구매하는 것을 좋아해요. 그때그때 확인하는 유연한 스타일로, 다른 사람들과 정보를 공유하고 빠르게 즐겨요.",
      "라벨을 통해 실용적인 선택을 하고, 효율적인 구매를 하는 것을 좋아해요.",
    ],
    traits: ["즉흥적 확인", "실용적 접근", "빠른 결정"],
    picks: ["실용 정보 확인", "즉시 결정", "정보 공유"],
    tips: ["꼼꼼한 확인", "감성 접근", "신중한 결정"],
    match: "INFJ, ISFJ",
    emoji: "⚡",
  },
  ESTJ: {
    label: "체계 라벨 관리자",
    summary: "계획적이고 논리적으로 라벨을 체계적으로 확인하는 타입",
    description: [
      "계획적이고 논리적으로 라벨을 확인하는 당신! 항상 꼼꼼히 확인하고, 전체 정보를 모두 확인해요. 유통기한과 가격 같은 실용적 정보를 중시해요.",
      "라벨 확인에 충분한 시간을 들이고, 빠르게 결정하고 구매해요. 미리 계획하고 확인하는 체계적인 스타일로, 논리적 이유로 선택해요.",
      "라벨을 통해 효율적인 선택을 하고, 완벽한 시스템을 만드는 것을 좋아해요.",
    ],
    traits: ["계획적 확인", "논리적 선택", "체계적 시스템"],
    picks: ["전체 정보 확인", "빠른 결정", "체계적 확인"],
    tips: ["감성 접근", "유연한 확인", "조용한 확인"],
    match: "INFP, INTP",
    emoji: "📋",
  },
  ISFP: {
    label: "감성 라벨 예술가",
    summary: "즉흥적으로 라벨을 확인하며 조용히 감성을 즐기는 타입",
    description: [
      "즉흥적으로 라벨을 확인하는 당신! 필요할 때만 확인하고, 핵심 정보만 빠르게 스캔해요. 건강과 영양 정보에 관심이 있지만, 감성과 직감에 따라 선택해요.",
      "라벨 확인 후 고민하고 신중하게 결정해요. 그때그때 확인하는 유연한 스타일로, 혼자만 확인하고 결정하는 것을 좋아해요.",
      "라벨을 통해 자신만의 스타일을 만들고, 아름다운 선택을 하는 것을 즐겨요.",
    ],
    traits: ["감성 선택", "조용한 확인", "예술적 접근"],
    picks: ["건강 정보 확인", "신중한 결정", "개인적 확인"],
    tips: ["꼼꼼한 확인", "논리적 접근", "적극적 공유"],
    match: "ENTJ, ESTJ",
    emoji: "🎨",
  },
  ISFJ: {
    label: "정성 라벨 수호자",
    summary: "계획적이고 감성적으로 라벨을 확인하며 정성을 담는 타입",
    description: [
      "계획적이고 감성적으로 라벨을 확인하는 당신! 항상 꼼꼼히 확인하고, 전체 정보를 모두 확인해요. 건강과 영양 정보에 깊은 관심을 가지고 있어요.",
      "라벨 확인에 충분한 시간을 들이고, 자세히 꼼꼼히 읽어요. 미리 계획하고 확인하는 체계적인 스타일로, 신중하게 고민 후 결정해요.",
      "라벨을 통해 정성을 담고, 소중한 사람들을 위한 선택을 하는 것을 좋아해요.",
    ],
    traits: ["계획적 확인", "정성 담기", "조용한 배려"],
    picks: ["건강 정보 확인", "신중한 결정", "의미 있는 선택"],
    tips: ["유연한 확인", "논리적 접근", "적극적 공유"],
    match: "ENTP, ESTP",
    emoji: "💝",
  },
  ISTP: {
    label: "실용 라벨 기술자",
    summary: "즉흥적으로 라벨을 확인하며 실용적으로 즐기는 타입",
    description: [
      "즉흥적으로 라벨을 확인하는 당신! 필요할 때만 확인하고, 핵심 정보만 빠르게 스캔해요. 유통기한과 가격 같은 실용적 정보에 관심이 많아요.",
      "라벨 확인 후 고민하고 신중하게 결정해요. 그때그때 확인하는 유연한 스타일로, 혼자만 확인하고 분석하는 것을 좋아해요.",
      "라벨을 통해 실용성을 추구하고, 합리적인 선택을 하는 것을 즐겨요.",
    ],
    traits: ["즉흥적 확인", "실용적 접근", "효율적 확인"],
    picks: ["실용 정보 확인", "신중한 결정", "개인적 분석"],
    tips: ["꼼꼼한 확인", "감성 접근", "적극적 공유"],
    match: "ENFJ, ESFJ",
    emoji: "🔧",
  },
  ISTJ: {
    label: "원칙 라벨 수호자",
    summary: "계획적이고 논리적으로 라벨을 원칙에 따라 확인하는 타입",
    description: [
      "계획적이고 논리적으로 라벨을 확인하는 당신! 항상 꼼꼼히 확인하고, 전체 정보를 모두 확인해요. 유통기한과 가격 같은 실용적 정보를 중시하며, 라벨 정보를 신뢰해요.",
      "라벨 확인에 충분한 시간을 들이고, 자세히 꼼꼼히 읽어요. 미리 계획하고 확인하는 체계적인 스타일로, 신중하게 고민 후 결정해요.",
      "라벨을 통해 안정감을 느끼고, 신뢰할 수 있는 선택을 하는 것을 좋아해요.",
    ],
    traits: ["계획적 확인", "원칙 준수", "논리적 선택"],
    picks: ["전체 정보 확인", "신중한 결정", "체계적 확인"],
    tips: ["감성 접근", "유연한 확인", "적극적 공유"],
    match: "ENFP, ESFP",
    emoji: "📐",
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const mbtiType = (searchParams.get("type") as keyof typeof labelTypes) || "ENFP"
  const resultId = searchParams.get("id")
  const character = labelTypes[mbtiType]
  const [result, setResult] = useState<any>(null)

  useEffect(() => {
    if (resultId) {
      getTestResult(resultId)
        .then((data) => setResult(data))
        .catch((err) => console.error("결과 조회 실패:", err))
    }
  }, [resultId])

  const shareTitle = `나의 식품 라벨 확인 스타일은 "${character.label}" ${character.emoji}`
  const shareDescription = `${character.summary}\n\n나도 식품 라벨 확인 스타일 테스트 하러 가기 📋`

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <main className="container max-w-4xl mx-auto px-4 py-8 space-y-8">
        <Card className="border-0 shadow-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur">
          <CardContent className="p-8 md:p-12">
            <div className="text-center space-y-6">
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                {mbtiType}
              </Badge>

              <div>
                <div className="text-6xl mb-4">{character.emoji}</div>
                <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                  {character.label}
                </h1>
                <p className="text-xl text-muted-foreground">{character.summary}</p>
              </div>

              <div className="pt-6">
                <ShareButtons
                  testId="food-label"
                  testPath="/tests/food-label/test/result"
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
              <div className="p-3 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl">
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
              <div className="p-3 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold">주요 특징</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.traits.map((trait, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 rounded-xl text-center font-medium"
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
              <div className="p-3 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold">추천 라벨 확인 스타일</h2>
            </div>
            <div className="space-y-3">
              {character.picks.map((pick, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                  <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full" />
                  <span className="text-lg">{pick}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur">
          <CardContent className="p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl">
                <Lightbulb className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold">성장 포인트</h2>
            </div>
            <div className="space-y-3">
              {character.tips.map((tip, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                  <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full" />
                  <span className="text-lg">{tip}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur">
          <CardContent className="p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold">궁합</h2>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 rounded-xl">
              <p className="text-lg mb-2 text-muted-foreground">최고의 라벨 파트너</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">{character.match}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-gradient-to-br from-green-500 to-blue-500">
          <CardContent className="p-8">
            <div className="text-center space-y-6 text-white">

        <div className="text-center">
          <Button size="lg" variant="outline" className="gap-2" asChild>
            <Link href="/tests/food-label/test">
              <RotateCcw className="h-4 w-4" />
              다시 테스트하기
            </Link>
          </Button>
        </div>
              <h2 className="text-2xl font-bold">다른 테스트도 해보세요!</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button size="lg" variant="secondary" className="h-auto py-4 bg-white/20 hover:bg-white/30 text-white border-white/30" asChild>
                  <Link href="/tests/food-storage"><div className="text-left w-full"><div className="text-2xl mb-1">🧊</div><div className="font-semibold">음식 보관 스타일</div></div><ArrowRight className="ml-auto h-5 w-5" /></Link>
                </Button>
                <Button size="lg" variant="secondary" className="h-auto py-4 bg-white/20 hover:bg-white/30 text-white border-white/30" asChild>
                  <Link href="/tests/food-reheating"><div className="text-left w-full"><div className="text-2xl mb-1">🔥</div><div className="font-semibold">음식 재가열 스타일</div></div><ArrowRight className="ml-auto h-5 w-5" /></Link>
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

export default function FoodLabelResult() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-center space-y-4"><div className="text-4xl animate-bounce">📋</div><p className="text-muted-foreground">결과 로딩 중...</p></div></div>}>
      <ResultContent />
    </Suspense>
  )
}

