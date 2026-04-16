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

const sweetnessTypes = {
  ENFP: {
    label: "즉흥 단맛 탐험가",
    summary: "즉흥적으로 단 음식을 선택하며 새로운 달콤함을 탐구하는 타입",
    description: [
      "즉흥적으로 단 음식을 선택하는 당신! 항상 단 음식을 선택하고, 아주 달콤한 맛을 선호해요. 즉흥적으로 선택하며 기분 전환과 즐거움을 추구해요.",
      "빠르게 먹고, 즉시 즐기며, 다른 사람과 함께 단 음식을 즐겨요. 감각과 직감으로 선택하고, 그때그때 새로운 단 음식을 시도하는 유연한 스타일이에요.",
      "단맛을 통해 새로운 경험을 하고, 다양한 달콤함을 탐구하는 것을 즐겨요.",
    ],
    traits: ["즉흥적 선택", "강한 단맛", "적극적 공유"],
    picks: ["아주 달콤한 음식", "즉시 선택", "함께 즐기기"],
    tips: ["적당한 단맛", "계획적 선택", "혼자 즐기기"],
    match: "ISTJ, INTJ",
    emoji: "🍬",
  },
  ENFJ: {
    label: "배려 단맛 큐레이터",
    summary: "계획적으로 단 음식을 선택하며 모두를 위한 달콤함을 찾는 타입",
    description: [
      "계획적으로 단 음식을 선택하는 당신! 항상 단 음식을 선택하고, 적당한 단맛을 선호해요. 계획적으로 선택하며 기분 전환과 즐거움을 중시해요.",
      "천천히 즐기고, 미리 준비하며, 다른 사람과 함께 단 음식을 즐겨요. 논리와 정보로 선택하고, 미리 계획하는 체계적인 스타일로, 모두가 만족할 수 있는 단맛을 찾아요.",
      "단맛을 통해 행복한 선택을 하고, 소중한 사람들을 위한 정보를 제공하는 것을 좋아해요.",
    ],
    traits: ["계획적 선택", "적당한 단맛", "배려심"],
    picks: ["기분 전환 음식", "신중한 선택", "함께 즐기기"],
    tips: ["즉흥적 선택", "아주 달콤한 맛", "혼자 즐기기"],
    match: "ISTP, INTP",
    emoji: "💖",
  },
  ENTP: {
    label: "분석 단맛 혁신가",
    summary: "즉흥적으로 단 음식을 분석하며 논리적으로 선택하는 타입",
    description: [
      "즉흥적으로 단 음식을 분석하는 당신! 항상 단 음식을 선택하고, 아주 달콤한 맛을 선호해요. 즉흥적으로 선택하며 에너지와 효율을 중시해요.",
      "빠르게 먹고, 즉시 즐기며, 다른 사람과 함께 단 음식을 즐겨요. 논리와 정보로 선택하고, 그때그때 새로운 단 음식을 시도하는 효율적인 스타일이에요.",
      "단맛을 통해 최적의 선택을 하고, 효율적인 경험을 하는 것을 좋아해요.",
    ],
    traits: ["즉흥적 분석", "논리적 선택", "효율적 확인"],
    picks: ["에너지 음식", "빠른 선택", "효율적 확인"],
    tips: ["적당한 단맛", "감성 접근", "신중한 선택"],
    match: "ISFJ, ISTJ",
    emoji: "🔬",
  },
  ENTJ: {
    label: "전략 단맛 마스터",
    summary: "계획적이고 논리적으로 단 음식을 선택하며 효율을 추구하는 타입",
    description: [
      "계획적이고 논리적으로 단 음식을 선택하는 당신! 항상 단 음식을 선택하고, 적당한 단맛을 선호해요. 계획적으로 선택하며 에너지와 효율을 중시해요.",
      "빠르게 먹지만, 미리 준비하며, 다른 사람과 함께 단 음식을 즐겨요. 논리와 정보로 선택하고, 미리 계획하는 체계적인 스타일로, 효율적인 선택을 해요.",
      "단맛을 통해 효율적인 경험을 하고, 최적의 단 음식을 찾는 것을 좋아해요.",
    ],
    traits: ["계획적 선택", "논리적 선택", "효율적 실행"],
    picks: ["적당한 단맛", "빠른 선택", "체계적 확인"],
    tips: ["감성 접근", "유연한 선택", "조용한 즐기기"],
    match: "ISFP, INFP",
    emoji: "⚡",
  },
  INFP: {
    label: "감성 단맛 예술가",
    summary: "즉흥적으로 단 음식을 선택하며 조용히 감성을 즐기는 타입",
    description: [
      "즉흥적으로 단 음식을 선택하는 당신! 가끔 단 음식을 선택하고, 적당한 단맛을 선호해요. 즉흥적으로 선택하며 기분 전환과 즐거움을 추구해요.",
      "천천히 즐기고, 즉시 즐기며, 혼자만 단 음식을 즐겨요. 감각과 직감으로 선택하고, 그때그때 확인하는 유연한 스타일로, 자신만의 선택을 해요.",
      "단맛을 통해 자신만의 경험을 하고, 의미 있는 단 음식을 찾는 것을 즐겨요.",
    ],
    traits: ["감성 선택", "조용한 즐기기", "즉흥적 선택"],
    picks: ["적당한 단맛", "신중한 선택", "개인적 즐기기"],
    tips: ["꼼꼼한 확인", "적극적 공유", "논리적 접근"],
    match: "ESTJ, ENTJ",
    emoji: "🌸",
  },
  INFJ: {
    label: "완벽 단맛 큐레이터",
    summary: "계획적이고 감성적으로 단 음식을 선택하며 의미를 찾는 타입",
    description: [
      "계획적이고 감성적으로 단 음식을 선택하는 당신! 가끔 단 음식을 선택하고, 적당한 단맛을 선호해요. 계획적으로 선택하며 기분 전환과 즐거움을 추구해요.",
      "천천히 즐기고, 미리 준비하며, 혼자만 단 음식을 즐겨요. 감각과 직감으로 선택하고, 미리 계획하는 체계적인 스타일로, 신중하게 고민 후 선택해요.",
      "단맛을 통해 완벽한 경험을 하고, 의미 있는 단 음식을 찾는 것을 좋아해요.",
    ],
    traits: ["계획적 선택", "감성 선택", "완벽한 확인"],
    picks: ["적당한 단맛", "신중한 선택", "의미 있는 선택"],
    tips: ["빠른 선택", "적극적 공유", "논리적 접근"],
    match: "ESTP, ESFP",
    emoji: "🌙",
  },
  INTP: {
    label: "분석 단맛 연구가",
    summary: "즉흥적으로 단 음식을 분석하며 논리적으로 즐기는 타입",
    description: [
      "즉흥적으로 단 음식을 분석하는 당신! 가끔 단 음식을 선택하고, 아주 달콤한 맛을 선호해요. 즉흥적으로 선택하며 에너지와 효율을 중시해요.",
      "천천히 즐기고, 즉시 즐기며, 혼자만 단 음식을 즐겨요. 논리와 정보로 선택하고, 그때그때 확인하는 유연한 스타일로, 논리적 이유로 선택해요.",
      "단맛을 통해 분석적인 경험을 하고, 효율적인 단 음식을 찾는 것을 즐겨요.",
    ],
    traits: ["즉흥적 분석", "논리적 선택", "조용한 즐기기"],
    picks: ["아주 달콤한 음식", "신중한 선택", "개인적 즐기기"],
    tips: ["적당한 단맛", "감성 접근", "적극적 공유"],
    match: "ESFJ, ESTJ",
    emoji: "🔍",
  },
  INTJ: {
    label: "전략 단맛 설계가",
    summary: "계획적이고 논리적으로 단 음식을 선택하며 효율을 추구하는 타입",
    description: [
      "계획적이고 논리적으로 단 음식을 선택하는 당신! 가끔 단 음식을 선택하고, 적당한 단맛을 선호해요. 계획적으로 선택하며 에너지와 효율을 중시해요.",
      "천천히 즐기고, 미리 준비하며, 혼자만 단 음식을 즐겨요. 논리와 정보로 선택하고, 미리 계획하는 체계적인 스타일로, 논리적 이유로 선택해요.",
      "단맛을 통해 효율적인 경험을 하고, 최적의 단 음식을 찾는 것을 좋아해요.",
    ],
    traits: ["계획적 선택", "논리적 선택", "조용한 즐기기"],
    picks: ["적당한 단맛", "신중한 선택", "체계적 확인"],
    tips: ["즉흥적 선택", "감성 접근", "적극적 공유"],
    match: "ESFP, ESTP",
    emoji: "🎯",
  },
  ESFP: {
    label: "즉흥 단맛 파티플레이어",
    summary: "즉흥적으로 단 음식을 선택하며 즐거움을 추구하는 타입",
    description: [
      "즉흥적으로 단 음식을 선택하는 당신! 항상 단 음식을 선택하고, 적당한 단맛을 선호해요. 즉흥적으로 선택하며 기분 전환과 즐거움을 추구해요.",
      "빠르게 먹고, 즉시 즐기며, 다른 사람과 함께 단 음식을 즐겨요. 감각과 직감으로 선택하고, 그때그때 확인하는 유연한 스타일로, 즐거운 경험을 만들어요.",
      "단맛을 통해 즐거운 경험을 하고, 다양한 단 음식을 탐구하는 것을 좋아해요.",
    ],
    traits: ["즉흥적 선택", "적당한 단맛", "적극적 공유"],
    picks: ["즉시 선택", "함께 즐기기", "즐거운 경험"],
    tips: ["꼼꼼한 확인", "신중한 선택", "혼자 즐기기"],
    match: "INTJ, INFJ",
    emoji: "🎉",
  },
  ESFJ: {
    label: "배려 단맛 호스트",
    summary: "계획적으로 단 음식을 선택하며 모두를 배려하는 타입",
    description: [
      "계획적으로 단 음식을 선택하는 당신! 항상 단 음식을 선택하고, 적당한 단맛을 선호해요. 계획적으로 선택하며 기분 전환과 즐거움을 추구해요.",
      "천천히 즐기고, 미리 준비하며, 다른 사람과 함께 단 음식을 즐겨요. 감각과 직감으로 선택하고, 미리 계획하는 체계적인 스타일로, 모두가 만족할 수 있는 단맛을 찾아요.",
      "단맛을 통해 모두를 배려하고, 소중한 사람들과 함께 즐기는 것을 좋아해요.",
    ],
    traits: ["계획적 선택", "배려심", "함께 즐기기"],
    picks: ["적당한 단맛", "신중한 선택", "함께 즐기기"],
    tips: ["즉흥적 선택", "아주 달콤한 맛", "혼자 즐기기"],
    match: "INTP, ISTP",
    emoji: "🤝",
  },
  ESTP: {
    label: "즉흥 단맛 챌린저",
    summary: "즉흥적으로 단 음식을 선택하며 도전을 즐기는 타입",
    description: [
      "즉흥적으로 단 음식을 선택하는 당신! 항상 단 음식을 선택하고, 아주 달콤한 맛을 선호해요. 즉흥적으로 선택하며 에너지와 효율을 중시해요.",
      "빠르게 먹고, 즉시 즐기며, 다른 사람과 함께 단 음식을 즐겨요. 논리와 정보로 선택하고, 그때그때 확인하는 유연한 스타일로, 도전적인 경험을 만들어요.",
      "단맛을 통해 도전적인 경험을 하고, 강렬한 단 음식을 탐구하는 것을 좋아해요.",
    ],
    traits: ["즉흥적 선택", "강한 단맛", "도전적"],
    picks: ["아주 달콤한 음식", "즉시 선택", "도전적 경험"],
    tips: ["적당한 단맛", "신중한 선택", "조용한 즐기기"],
    match: "INFJ, INTJ",
    emoji: "💪",
  },
  ESTJ: {
    label: "전략 단맛 리더",
    summary: "계획적이고 논리적으로 단 음식을 선택하며 효율을 추구하는 타입",
    description: [
      "계획적이고 논리적으로 단 음식을 선택하는 당신! 항상 단 음식을 선택하고, 적당한 단맛을 선호해요. 계획적으로 선택하며 에너지와 효율을 중시해요.",
      "빠르게 먹고, 미리 준비하며, 다른 사람과 함께 단 음식을 즐겨요. 논리와 정보로 선택하고, 미리 계획하는 체계적인 스타일로, 효율적인 선택을 해요.",
      "단맛을 통해 효율적인 경험을 하고, 최적의 단 음식을 찾는 것을 좋아해요.",
    ],
    traits: ["계획적 선택", "논리적 선택", "효율적 실행"],
    picks: ["적당한 단맛", "빠른 선택", "체계적 확인"],
    tips: ["즉흥적 선택", "감성 접근", "조용한 즐기기"],
    match: "INFP, ISFP",
    emoji: "👑",
  },
  ISFP: {
    label: "감성 단맛 아티스트",
    summary: "즉흥적으로 단 음식을 선택하며 조용히 감성을 즐기는 타입",
    description: [
      "즉흥적으로 단 음식을 선택하는 당신! 가끔 단 음식을 선택하고, 적당한 단맛을 선호해요. 즉흥적으로 선택하며 기분 전환과 즐거움을 추구해요.",
      "천천히 즐기고, 즉시 즐기며, 혼자만 단 음식을 즐겨요. 감각과 직감으로 선택하고, 그때그때 확인하는 유연한 스타일로, 자신만의 선택을 해요.",
      "단맛을 통해 자신만의 경험을 하고, 아름다운 단 음식을 찾는 것을 즐겨요.",
    ],
    traits: ["감성 선택", "조용한 즐기기", "즉흥적 선택"],
    picks: ["적당한 단맛", "신중한 선택", "개인적 즐기기"],
    tips: ["꼼꼼한 확인", "적극적 공유", "논리적 접근"],
    match: "ESTJ, ENTJ",
    emoji: "🎨",
  },
  ISFJ: {
    label: "배려 단맛 케어기버",
    summary: "계획적으로 단 음식을 선택하며 조용히 배려하는 타입",
    description: [
      "계획적으로 단 음식을 선택하는 당신! 가끔 단 음식을 선택하고, 적당한 단맛을 선호해요. 계획적으로 선택하며 기분 전환과 즐거움을 추구해요.",
      "천천히 즐기고, 미리 준비하며, 혼자만 단 음식을 즐겨요. 감각과 직감으로 선택하고, 미리 계획하는 체계적인 스타일로, 신중하게 고민 후 선택해요.",
      "단맛을 통해 배려하는 경험을 하고, 소중한 사람들을 위한 단 음식을 찾는 것을 좋아해요.",
    ],
    traits: ["계획적 선택", "배려심", "조용한 즐기기"],
    picks: ["적당한 단맛", "신중한 선택", "의미 있는 선택"],
    tips: ["즉흥적 선택", "적극적 공유", "논리적 접근"],
    match: "ENTP, ESTP",
    emoji: "💝",
  },
  ISTP: {
    label: "분석 단맛 메커닉",
    summary: "즉흥적으로 단 음식을 분석하며 논리적으로 즐기는 타입",
    description: [
      "즉흥적으로 단 음식을 분석하는 당신! 가끔 단 음식을 선택하고, 아주 달콤한 맛을 선호해요. 즉흥적으로 선택하며 에너지와 효율을 중시해요.",
      "빠르게 먹고, 즉시 즐기며, 혼자만 단 음식을 즐겨요. 논리와 정보로 선택하고, 그때그때 확인하는 유연한 스타일로, 논리적 이유로 선택해요.",
      "단맛을 통해 분석적인 경험을 하고, 효율적인 단 음식을 찾는 것을 즐겨요.",
    ],
    traits: ["즉흥적 분석", "논리적 선택", "조용한 즐기기"],
    picks: ["아주 달콤한 음식", "빠른 선택", "개인적 즐기기"],
    tips: ["적당한 단맛", "감성 접근", "적극적 공유"],
    match: "ENFJ, ESFJ",
    emoji: "🔧",
  },
  ISTJ: {
    label: "전략 단맛 아키텍트",
    summary: "계획적이고 논리적으로 단 음식을 선택하며 체계를 추구하는 타입",
    description: [
      "계획적이고 논리적으로 단 음식을 선택하는 당신! 가끔 단 음식을 선택하고, 적당한 단맛을 선호해요. 계획적으로 선택하며 에너지와 효율을 중시해요.",
      "천천히 즐기고, 미리 준비하며, 혼자만 단 음식을 즐겨요. 논리와 정보로 선택하고, 미리 계획하는 체계적인 스타일로, 논리적 이유로 선택해요.",
      "단맛을 통해 체계적인 경험을 하고, 안정적인 단 음식을 찾는 것을 좋아해요.",
    ],
    traits: ["계획적 선택", "논리적 선택", "조용한 즐기기"],
    picks: ["적당한 단맛", "신중한 선택", "체계적 확인"],
    tips: ["즉흥적 선택", "감성 접근", "적극적 공유"],
    match: "ENFP, ESFP",
    emoji: "🏗️",
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const mbtiType = (searchParams.get("type") as keyof typeof sweetnessTypes) || "ENFP"
  const resultId = searchParams.get("id")
  const character = sweetnessTypes[mbtiType]
  const [result, setResult] = useState<any>(null)

  useEffect(() => {
    if (resultId) {
      getTestResult(resultId)
        .then((data) => setResult(data))
        .catch((err) => console.error("결과 조회 실패:", err))
    }
  }, [resultId])

  const shareTitle = `나의 단맛 선호도는 "${character.label}" ${character.emoji}`
  const shareDescription = `${character.summary}\n\n나도 단맛 선호도 테스트 하러 가기 🍬`

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <main className="container max-w-4xl mx-auto px-4 py-8 space-y-8">
        <Card className="border-0 shadow-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur">
          <CardContent className="p-8 md:p-12">
            <div className="text-center space-y-6">
              <Badge variant="secondary" className="bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200">
                {mbtiType}
              </Badge>

              <div>
                <div className="text-6xl mb-4">{character.emoji}</div>
                <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                  {character.label}
                </h1>
                <p className="text-xl text-muted-foreground">{character.summary}</p>
              </div>

              <div className="pt-6">
                <ShareButtons
                  testId="food-sweetness"
                  testPath="/tests/food-sweetness/test/result"
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
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-pink-400 to-purple-500 rounded-xl">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold">상세 설명</h2>
              </div>
              <div className="space-y-4">
                {character.description.map((desc, idx) => (
                  <p key={idx} className="text-muted-foreground leading-relaxed">
                    {desc}
                  </p>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur">
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-pink-400 to-purple-500 rounded-xl">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold">특징</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {character.traits.map((trait, idx) => (
                  <div key={idx} className="p-4 bg-pink-50 dark:bg-pink-950 rounded-lg">
                    <p className="font-medium">{trait}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur">
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-pink-400 to-purple-500 rounded-xl">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold">추천 단맛 스타일</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {character.picks.map((pick, idx) => (
                  <div key={idx} className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                    <p className="font-medium">{pick}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur">
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-pink-400 to-purple-500 rounded-xl">
                  <Lightbulb className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold">개선 팁</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {character.tips.map((tip, idx) => (
                  <div key={idx} className="p-4 bg-rose-50 dark:bg-rose-950 rounded-lg">
                    <p className="font-medium">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur">
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-pink-400 to-purple-500 rounded-xl">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold">잘 맞는 타입</h2>
              </div>
              <p className="text-muted-foreground">
                {character.match} 타입과 단맛 취향이 잘 맞아요! 함께 단 음식을 즐기면 더욱 즐거울 거예요.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center space-x-4 pb-8">
          <Button variant="outline" size="lg" asChild>
            <Link href="/tests/food-sweetness/test">
              <RotateCcw className="h-5 w-5 mr-2" />
              다시 테스트
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/tests">
              <ArrowRight className="h-5 w-5 mr-2" />
              다른 테스트 보기
            </Link>
          </Button>
        </div>
      </main>
    </div>
  )
}

export default function FoodSweetnessResultPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <ResultContent />
    </Suspense>
  )
}

