"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShareButtons } from "@/components/share-buttons"
import { Snowflake, Heart, Lightbulb, Users, ArrowRight, Sparkles } from "lucide-react"
import { getTestResult } from "@/lib/api-client"

const storageTypes = {
  ENFP: {
    label: "즉흥 보관 탐험가",
    summary: "즉흥적으로 보관하며 새로운 방식을 시도하는 타입",
    description: [
      "즉흥적으로 음식을 보관하는 당신! 필요할 때만 정리하고, 사용 빈도에 따라 직관적으로 배치해요. 보관 방식을 다른 사람들과 공유하고, 즐거운 경험을 만들어요.",
      "그때그때 보관하고, 자연스럽게 보관하는 것을 좋아해요. 감성과 보기 좋음에 따라 선택하며, 유연한 보관 스타일이에요.",
      "보관을 통해 새로운 방식을 발견하고, 다양한 보관 방법을 탐구하는 것을 즐겨요.",
    ],
    traits: ["즉흥적 보관", "직관적 배치", "적극적 공유"],
    picks: ["사용 빈도 배치", "자연스러운 보관", "정보 공유"],
    tips: ["정기적 정리", "체계적 보관", "계획적 관리"],
    match: "ISTJ, INTJ",
    emoji: "✨",
  },
  ENFJ: {
    label: "배려 보관 큐레이터",
    summary: "계획적으로 보관하며 모두를 위한 정리를 하는 타입",
    description: [
      "계획적으로 음식을 보관하는 당신! 정기적으로 체계적으로 정리하고, 카테고리별로 체계적으로 배치해요. 보관 방식을 다른 사람들과 공유하고, 모두가 만족할 수 있는 정리를 만들어요.",
      "용기를 사용하고 정리 정돈하며, 정확히 유통기한을 확인하고 관리해요. 미리 계획하고 보관하는 체계적인 스타일로, 감성과 보기 좋음에 따라 선택해요.",
      "보관을 통해 모두를 위한 정리를 하고, 소중한 사람들을 위한 보관 시스템을 만드는 것을 좋아해요.",
    ],
    traits: ["계획적 보관", "체계적 정리", "배려심"],
    picks: ["카테고리별 배치", "용기 사용", "정확한 관리"],
    tips: ["유연한 보관", "효율적 접근", "조용한 정리"],
    match: "ISTP, INTP",
    emoji: "💖",
  },
  ENTP: {
    label: "혁신 보관 실험가",
    summary: "즉흥적으로 보관하며 효율적인 방식을 실험하는 타입",
    description: [
      "즉흥적으로 음식을 보관하는 당신! 필요할 때만 정리하고, 사용 빈도에 따라 직관적으로 배치해요. 실용성과 효율성을 중시하며, 최대한 공간을 활용해요.",
      "그때그때 보관하고, 효율적으로 접근해요. 보관 방식을 다른 사람들과 공유하고, 새로운 가능성을 탐구해요.",
      "보관을 통해 효율적인 방식을 실험하고, 최적의 보관 시스템을 찾는 것을 좋아해요.",
    ],
    traits: ["즉흥적 보관", "효율적 접근", "실험적 방식"],
    picks: ["사용 빈도 배치", "효율적 보관", "최대 활용"],
    tips: ["정기적 정리", "감성 접근", "계획적 관리"],
    match: "ISFJ, ISTJ",
    emoji: "🔬",
  },
  ENTJ: {
    label: "전략 보관 마스터",
    summary: "계획적이고 효율적으로 보관하며 완벽한 시스템을 만드는 타입",
    description: [
      "계획적이고 효율적으로 음식을 보관하는 당신! 정기적으로 체계적으로 정리하고, 카테고리별로 체계적으로 배치해요. 실용성과 효율성을 중시하며, 최대한 공간을 활용해요.",
      "용기를 사용하고 정리 정돈하며, 정확히 유통기한을 확인하고 관리해요. 미리 계획하고 보관하는 체계적인 스타일로, 효율적인 보관 시스템을 만들어요.",
      "보관을 통해 완벽한 시스템을 만들고, 최적의 보관 방법을 찾는 것을 좋아해요.",
    ],
    traits: ["계획적 보관", "효율적 시스템", "완벽한 정리"],
    picks: ["카테고리별 배치", "용기 사용", "최대 활용"],
    tips: ["감성 접근", "유연한 보관", "조용한 정리"],
    match: "ISFP, INFP",
    emoji: "⚡",
  },
  INFP: {
    label: "감성 보관 예술가",
    summary: "즉흥적으로 보관하며 조용히 감성을 즐기는 타입",
    description: [
      "즉흥적으로 음식을 보관하는 당신! 필요할 때만 정리하고, 사용 빈도에 따라 직관적으로 배치해요. 감성과 보기 좋음에 따라 선택하며, 조용히 보관하는 것을 좋아해요.",
      "그때그때 보관하고, 자연스럽게 보관해요. 혼자만 관리하고, 평온한 시간을 보내요.",
      "보관을 통해 자신만의 스타일을 만들고, 아름다운 보관 공간을 만드는 것을 즐겨요.",
    ],
    traits: ["감성 보관", "조용한 정리", "즉흥적 방식"],
    picks: ["감성적 배치", "자연스러운 보관", "개인적 관리"],
    tips: ["정기적 정리", "적극적 공유", "효율적 접근"],
    match: "ESTJ, ENTJ",
    emoji: "🌸",
  },
  INFJ: {
    label: "완벽 보관 큐레이터",
    summary: "계획적이고 감성적으로 보관하며 의미를 찾는 타입",
    description: [
      "계획적이고 감성적으로 음식을 보관하는 당신! 정기적으로 체계적으로 정리하고, 카테고리별로 체계적으로 배치해요. 감성과 보기 좋음에 따라 선택하며, 조용히 보관하는 것을 좋아해요.",
      "용기를 사용하고 정리 정돈하며, 정확히 유통기한을 확인하고 관리해요. 미리 계획하고 보관하는 체계적인 스타일로, 신중하게 고민 후 정리해요.",
      "보관을 통해 완벽한 공간을 만들고, 의미 있는 보관 시스템을 만드는 것을 좋아해요.",
    ],
    traits: ["계획적 보관", "감성 선택", "완벽한 정리"],
    picks: ["카테고리별 배치", "용기 사용", "의미 있는 보관"],
    tips: ["유연한 보관", "적극적 공유", "효율적 접근"],
    match: "ESTP, ESFP",
    emoji: "🌙",
  },
  INTP: {
    label: "분석 보관 연구가",
    summary: "즉흥적으로 보관하며 논리적으로 분석하는 타입",
    description: [
      "즉흥적으로 음식을 보관하는 당신! 필요할 때만 정리하고, 사용 빈도에 따라 직관적으로 배치해요. 실용성과 효율성을 중시하며, 대략적으로 유통기한을 관리해요.",
      "그때그때 보관하고, 효율적으로 접근해요. 혼자만 관리하고, 분석하는 것을 좋아해요.",
      "보관을 통해 논리적인 방식을 찾고, 최적의 보관 방법을 연구하는 것을 즐겨요.",
    ],
    traits: ["논리적 분석", "조용한 정리", "효율적 보관"],
    picks: ["사용 빈도 배치", "효율적 보관", "개인적 분석"],
    tips: ["정기적 정리", "감성 접근", "적극적 공유"],
    match: "ESFJ, ENFJ",
    emoji: "🧪",
  },
  INTJ: {
    label: "전략 보관 설계자",
    summary: "계획적이고 논리적으로 보관하며 완벽을 추구하는 타입",
    description: [
      "계획적이고 논리적으로 음식을 보관하는 당신! 정기적으로 체계적으로 정리하고, 카테고리별로 체계적으로 배치해요. 실용성과 효율성을 중시하며, 정확히 유통기한을 확인하고 관리해요.",
      "용기를 사용하고 정리 정돈하며, 최대한 공간을 활용해요. 미리 계획하고 보관하는 체계적인 스타일로, 신중하게 고민 후 정리해요.",
      "보관을 통해 완벽한 시스템을 설계하고, 최적의 보관 방법을 만드는 것을 좋아해요.",
    ],
    traits: ["계획적 설계", "논리적 보관", "완벽한 시스템"],
    picks: ["카테고리별 배치", "용기 사용", "최대 활용"],
    tips: ["감성 접근", "유연한 보관", "적극적 공유"],
    match: "ESFP, ENFP",
    emoji: "🎯",
  },
  ESFP: {
    label: "즉흥 보관 즐거움러",
    summary: "즉흥적으로 보관하며 사람들과 행복을 나누는 타입",
    description: [
      "즉흥적으로 음식을 보관하는 당신! 필요할 때만 정리하고, 사용 빈도에 따라 직관적으로 배치해요. 감성과 보기 좋음에 따라 선택하며, 즉시 정리하는 것을 좋아해요.",
      "그때그때 보관하고, 자연스럽게 보관해요. 보관 방식을 다른 사람들과 공유하고, 즐거운 시간을 만들어요.",
      "보관을 통해 즐거움을 나누고, 모두가 행복해하는 보관 공간을 만드는 것을 좋아해요.",
    ],
    traits: ["즉흥적 보관", "감성 선택", "적극적 공유"],
    picks: ["사용 빈도 배치", "즉시 정리", "정보 공유"],
    tips: ["정기적 정리", "효율적 접근", "계획적 관리"],
    match: "INTJ, ISTJ",
    emoji: "🎉",
  },
  ESFJ: {
    label: "전통 보관 배려자",
    summary: "계획적이고 감성적으로 보관하며 모두를 챙기는 타입",
    description: [
      "계획적이고 감성적으로 음식을 보관하는 당신! 정기적으로 체계적으로 정리하고, 카테고리별로 체계적으로 배치해요. 감성과 보기 좋음에 따라 선택하며, 즉시 정리하는 것을 좋아해요.",
      "용기를 사용하고 정리 정돈하며, 정확히 유통기한을 확인하고 관리해요. 미리 계획하고 보관하는 체계적인 스타일로, 보관 방식을 다른 사람들과 공유해요.",
      "보관을 통해 사람들을 챙기고, 행복을 나누는 것을 좋아해요.",
    ],
    traits: ["계획적 보관", "감성 선택", "모두 배려"],
    picks: ["카테고리별 배치", "즉시 정리", "정보 공유"],
    tips: ["유연한 보관", "효율적 접근", "조용한 정리"],
    match: "INTP, ISTP",
    emoji: "🤝",
  },
  ESTP: {
    label: "즉흥 보관 실용러",
    summary: "즉흥적으로 보관하며 빠르게 즐기는 타입",
    description: [
      "즉흥적으로 음식을 보관하는 당신! 필요할 때만 정리하고, 사용 빈도에 따라 직관적으로 배치해요. 실용성과 효율성을 중시하며, 최대한 공간을 활용해요.",
      "그때그때 보관하고, 효율적으로 접근해요. 보관 방식을 다른 사람들과 공유하고, 빠르게 정리해요.",
      "보관을 통해 실용적인 방식을 찾고, 효율적인 보관을 하는 것을 좋아해요.",
    ],
    traits: ["즉흥적 보관", "실용적 접근", "빠른 정리"],
    picks: ["사용 빈도 배치", "즉시 정리", "최대 활용"],
    tips: ["정기적 정리", "감성 접근", "계획적 관리"],
    match: "INFJ, ISFJ",
    emoji: "⚡",
  },
  ESTJ: {
    label: "체계 보관 관리자",
    summary: "계획적이고 논리적으로 보관하며 체계적으로 관리하는 타입",
    description: [
      "계획적이고 논리적으로 음식을 보관하는 당신! 정기적으로 체계적으로 정리하고, 카테고리별로 체계적으로 배치해요. 실용성과 효율성을 중시하며, 정확히 유통기한을 확인하고 관리해요.",
      "용기를 사용하고 정리 정돈하며, 최대한 공간을 활용해요. 미리 계획하고 보관하는 체계적인 스타일로, 즉시 정리하는 것을 좋아해요.",
      "보관을 통해 효율적인 시스템을 만들고, 완벽한 보관 방법을 만드는 것을 좋아해요.",
    ],
    traits: ["계획적 보관", "논리적 선택", "체계적 시스템"],
    picks: ["카테고리별 배치", "즉시 정리", "최대 활용"],
    tips: ["감성 접근", "유연한 보관", "조용한 정리"],
    match: "INFP, INTP",
    emoji: "📋",
  },
  ISFP: {
    label: "감성 보관 예술가",
    summary: "즉흥적으로 보관하며 조용히 감성을 즐기는 타입",
    description: [
      "즉흥적으로 음식을 보관하는 당신! 필요할 때만 정리하고, 사용 빈도에 따라 직관적으로 배치해요. 감성과 보기 좋음에 따라 선택하며, 조용히 보관하는 것을 좋아해요.",
      "그때그때 보관하고, 자연스럽게 보관해요. 혼자만 관리하고, 평온한 시간을 보내요.",
      "보관을 통해 자신만의 스타일을 만들고, 아름다운 보관 공간을 만드는 것을 즐겨요.",
    ],
    traits: ["감성 보관", "조용한 정리", "예술적 접근"],
    picks: ["감성적 배치", "자연스러운 보관", "개인적 관리"],
    tips: ["정기적 정리", "효율적 접근", "적극적 공유"],
    match: "ENTJ, ESTJ",
    emoji: "🎨",
  },
  ISFJ: {
    label: "정성 보관 수호자",
    summary: "계획적이고 감성적으로 보관하며 정성을 담는 타입",
    description: [
      "계획적이고 감성적으로 음식을 보관하는 당신! 정기적으로 체계적으로 정리하고, 카테고리별로 체계적으로 배치해요. 감성과 보기 좋음에 따라 선택하며, 조용히 보관하는 것을 좋아해요.",
      "용기를 사용하고 정리 정돈하며, 정확히 유통기한을 확인하고 관리해요. 미리 계획하고 보관하는 체계적인 스타일로, 신중하게 고민 후 정리해요.",
      "보관을 통해 정성을 담고, 소중한 사람들을 위한 보관 공간을 만드는 것을 좋아해요.",
    ],
    traits: ["계획적 보관", "정성 담기", "조용한 배려"],
    picks: ["카테고리별 배치", "용기 사용", "의미 있는 보관"],
    tips: ["유연한 보관", "효율적 접근", "적극적 공유"],
    match: "ENTP, ESTP",
    emoji: "💝",
  },
  ISTP: {
    label: "실용 보관 기술자",
    summary: "즉흥적으로 보관하며 실용적으로 즐기는 타입",
    description: [
      "즉흥적으로 음식을 보관하는 당신! 필요할 때만 정리하고, 사용 빈도에 따라 직관적으로 배치해요. 실용성과 효율성을 중시하며, 대략적으로 유통기한을 관리해요.",
      "그때그때 보관하고, 효율적으로 접근해요. 혼자만 관리하고, 실용적인 방식을 찾아요.",
      "보관을 통해 실용성을 추구하고, 합리적인 보관을 하는 것을 즐겨요.",
    ],
    traits: ["즉흥적 보관", "실용적 접근", "효율적 보관"],
    picks: ["사용 빈도 배치", "효율적 보관", "개인적 분석"],
    tips: ["정기적 정리", "감성 접근", "적극적 공유"],
    match: "ENFJ, ESFJ",
    emoji: "🔧",
  },
  ISTJ: {
    label: "원칙 보관 수호자",
    summary: "계획적이고 논리적으로 보관하며 원칙에 따라 관리하는 타입",
    description: [
      "계획적이고 논리적으로 음식을 보관하는 당신! 정기적으로 체계적으로 정리하고, 카테고리별로 체계적으로 배치해요. 실용성과 효율성을 중시하며, 정확히 유통기한을 확인하고 관리해요.",
      "용기를 사용하고 정리 정돈하며, 최대한 공간을 활용해요. 미리 계획하고 보관하는 체계적인 스타일로, 신중하게 고민 후 정리해요.",
      "보관을 통해 안정감을 느끼고, 신뢰할 수 있는 보관 시스템을 만드는 것을 좋아해요.",
    ],
    traits: ["계획적 보관", "원칙 준수", "논리적 보관"],
    picks: ["카테고리별 배치", "용기 사용", "최대 활용"],
    tips: ["감성 접근", "유연한 보관", "적극적 공유"],
    match: "ENFP, ESFP",
    emoji: "📐",
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const mbtiType = (searchParams.get("type") as keyof typeof storageTypes) || "ENFP"
  const resultId = searchParams.get("id")
  const character = storageTypes[mbtiType]
  const [result, setResult] = useState<any>(null)

  useEffect(() => {
    if (resultId) {
      getTestResult(resultId)
        .then((data) => setResult(data))
        .catch((err) => console.error("결과 조회 실패:", err))
    }
  }, [resultId])

  const shareTitle = `나의 음식 보관 스타일은 "${character.label}" ${character.emoji}`
  const shareDescription = `${character.summary}\n\n나도 음식 보관 스타일 테스트 하러 가기 🧊`

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <main className="container max-w-4xl mx-auto px-4 py-8 space-y-8">
        <Card className="border-0 shadow-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur">
          <CardContent className="p-8 md:p-12">
            <div className="text-center space-y-6">
              <Badge variant="secondary" className="bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200">
                {mbtiType}
              </Badge>

              <div>
                <div className="text-6xl mb-4">{character.emoji}</div>
                <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                  {character.label}
                </h1>
                <p className="text-xl text-muted-foreground">{character.summary}</p>
              </div>

              <div className="pt-6">
                <ShareButtons
                  testId="food-storage"
                  testPath="/tests/food-storage/test/result"
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
              <div className="p-3 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl">
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
              <div className="p-3 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl">
                <Snowflake className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold">주요 특징</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.traits.map((trait, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950 dark:to-blue-950 rounded-xl text-center font-medium"
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
              <div className="p-3 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold">추천 보관 스타일</h2>
            </div>
            <div className="space-y-3">
              {character.picks.map((pick, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 bg-cyan-50 dark:bg-cyan-950 rounded-lg">
                  <div className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
                  <span className="text-lg">{pick}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur">
          <CardContent className="p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl">
                <Lightbulb className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold">성장 포인트</h2>
            </div>
            <div className="space-y-3">
              {character.tips.map((tip, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 bg-cyan-50 dark:bg-cyan-950 rounded-lg">
                  <div className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
                  <span className="text-lg">{tip}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur">
          <CardContent className="p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold">궁합</h2>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950 dark:to-blue-950 rounded-xl">
              <p className="text-lg mb-2 text-muted-foreground">최고의 보관 파트너</p>
              <p className="text-3xl font-bold text-cyan-600 dark:text-cyan-400">{character.match}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-gradient-to-br from-cyan-500 to-blue-500">
          <CardContent className="p-8">
            <div className="text-center space-y-6 text-white">
              <h2 className="text-2xl font-bold">다른 테스트도 해보세요!</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button size="lg" variant="secondary" className="h-auto py-4 bg-white/20 hover:bg-white/30 text-white border-white/30" asChild>
                  <Link href="/tests/food-reheating"><div className="text-left w-full"><div className="text-2xl mb-1">🔥</div><div className="font-semibold">음식 재가열 스타일</div></div><ArrowRight className="ml-auto h-5 w-5" /></Link>
                </Button>
                <Button size="lg" variant="secondary" className="h-auto py-4 bg-white/20 hover:bg-white/30 text-white border-white/30" asChild>
                  <Link href="/tests/food-seasoning"><div className="text-left w-full"><div className="text-2xl mb-1">🧂</div><div className="font-semibold">양념 사용 스타일</div></div><ArrowRight className="ml-auto h-5 w-5" /></Link>
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

export default function FoodStorageResult() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-center space-y-4"><div className="text-4xl animate-bounce">🧊</div><p className="text-muted-foreground">결과 로딩 중...</p></div></div>}>
      <ResultContent />
    </Suspense>
  )
}

