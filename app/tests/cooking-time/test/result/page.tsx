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

const cookingTimeTypes = {
  ENFP: {
    label: "즉흥 조리 시간 탐험가",
    summary: "즉흥적으로 다양한 조리 시간을 선택하며 새로운 시간을 탐구하는 타입",
    description: [
      "즉흥적으로 조리 시간을 선택하는 당신! 항상 다양한 시간을 선택하고, 새로운 조리 시간을 시도해요. 즉흥적으로 선택하며 감각과 직감을 추구해요.",
      "빠르게 선택하고, 자주 변경하며, 다른 사람과 함께 조리를 즐겨요. 감각과 직감으로 선택하고, 그때그때 새로운 조리 시간을 시도하는 유연한 스타일이에요.",
      "조리 시간을 통해 새로운 경험을 하고, 다양한 조리 시간을 탐구하는 것을 즐겨요.",
    ],
    traits: ["즉흥적 선택", "새로운 시간", "적극적 공유"],
    picks: ["새로운 조리 시간", "즉시 선택", "함께 조리하기"],
    tips: ["익숙한 시간", "계획적 선택", "혼자 조리하기"],
    match: "ISTJ, INTJ",
    emoji: "⏱️",
  },
  ENFJ: {
    label: "배려 조리 시간 큐레이터",
    summary: "계획적으로 조리 시간을 선택하며 모두를 위한 시간을 찾는 타입",
    description: [
      "계획적으로 조리 시간을 선택하는 당신! 항상 다양한 시간을 선택하고, 익숙한 조리 시간을 선호해요. 계획적으로 선택하며 감각과 직감을 중시해요.",
      "신중하게 선택하고, 거의 변경하지 않으며, 다른 사람과 함께 조리를 즐겨요. 감각과 직감으로 선택하고, 미리 준비하는 체계적인 스타일로, 모두가 만족할 수 있는 조리 시간을 찾아요.",
      "조리 시간을 통해 행복한 선택을 하고, 소중한 사람들을 위한 조리 시간을 제공하는 것을 좋아해요.",
    ],
    traits: ["계획적 선택", "익숙한 시간", "배려심"],
    picks: ["균형 잡힌 시간", "신중한 선택", "함께 조리하기"],
    tips: ["즉흥적 선택", "새로운 시간", "혼자 조리하기"],
    match: "ISTP, INTP",
    emoji: "💝",
  },
  ENTP: {
    label: "분석 조리 시간 혁신가",
    summary: "즉흥적으로 조리 시간을 선택하며 논리적으로 선택하는 타입",
    description: [
      "즉흥적으로 조리 시간을 선택하는 당신! 항상 다양한 시간을 선택하고, 새로운 조리 시간을 시도해요. 즉흥적으로 선택하며 논리와 정보를 중시해요.",
      "빠르게 선택하고, 자주 변경하며, 다른 사람과 함께 조리를 즐겨요. 논리와 정보로 선택하고, 그때그때 새로운 조리 시간을 시도하는 효율적인 스타일이에요.",
      "조리 시간을 통해 최적의 선택을 하고, 효율적인 경험을 하는 것을 좋아해요.",
    ],
    traits: ["즉흥적 분석", "논리적 선택", "효율적 확인"],
    picks: ["새로운 시간", "빠른 변경", "정보 공유"],
    tips: ["익숙한 시간", "느린 변경", "혼자 조리하기"],
    match: "ISFJ, INFJ",
    emoji: "💡",
  },
  ENTJ: {
    label: "전략 조리 시간 리더",
    summary: "계획적으로 조리 시간을 선택하며 목표 달성을 위한 시간을 선택하는 타입",
    description: [
      "계획적으로 조리 시간을 선택하는 당신! 항상 다양한 시간을 선택하고, 익숙한 조리 시간을 선호해요. 계획적으로 선택하며 논리와 정보를 중시해요.",
      "신중하게 선택하고, 거의 변경하지 않으며, 다른 사람과 함께 조리를 즐겨요. 논리와 정보로 선택하고, 미리 준비하는 체계적인 스타일로, 목표 달성을 위한 조리 시간을 찾아요.",
      "조리 시간을 통해 최적의 선택을 하고, 효율적인 경험을 하는 것을 좋아해요.",
    ],
    traits: ["계획적 분석", "전략적 선택", "목표 지향"],
    picks: ["균형 잡힌 시간", "신중한 결정", "정보 공유"],
    tips: ["즉흥적 선택", "새로운 시간", "혼자 조리하기"],
    match: "ISFP, INFP",
    emoji: "👑",
  },
  INFP: {
    label: "이상주의 조리 시간 몽상가",
    summary: "즉흥적으로 조리 시간을 선택하며 개인적인 의미를 찾는 타입",
    description: [
      "즉흥적으로 조리 시간을 선택하는 당신! 가끔 시간을 변경하고, 새로운 조리 시간을 시도해요. 즉흥적으로 선택하며 개인적인 의미와 감성을 추구해요.",
      "즉시 선택하고, 자주 변경하며, 혼자 조용히 조리를 즐겨요. 감각과 직감으로 선택하고, 그때그때 새로운 조리 시간을 시도하는 유연한 스타일이에요.",
      "조리 시간을 통해 개인적인 경험을 하고, 깊은 감성을 탐구하는 것을 즐겨요.",
    ],
    traits: ["즉흥적 선택", "개인적 의미", "감성적 탐구"],
    picks: ["독특한 시간", "자유로운 결정", "혼자 조리하기"],
    tips: ["대중적인 시간", "계획적 선택", "함께 조리하기"],
    match: "ENTJ, ESTJ",
    emoji: "✨",
  },
  INFJ: {
    label: "통찰력 조리 시간 조언가",
    summary: "계획적으로 조리 시간을 선택하며 깊은 통찰을 얻는 타입",
    description: [
      "계획적으로 조리 시간을 선택하는 당신! 가끔 시간을 변경하고, 익숙한 조리 시간을 선호해요. 계획적으로 선택하며 깊은 통찰과 의미를 중시해요.",
      "신중하게 선택하고, 거의 변경하지 않으며, 혼자 조용히 조리를 즐겨요. 감각과 직감으로 선택하고, 미리 준비하는 체계적인 스타일로, 깊은 통찰을 얻어요.",
      "조리 시간을 통해 깊은 의미를 찾고, 내면의 성장을 추구하는 것을 좋아해요.",
    ],
    traits: ["계획적 선택", "깊은 통찰", "내면의 성장"],
    picks: ["의미 있는 시간", "신중한 결정", "혼자 조리하기"],
    tips: ["즉흥적 선택", "새로운 시간", "함께 조리하기"],
    match: "ENTP, ESTP",
    emoji: "🔮",
  },
  INTP: {
    label: "논리적 조리 시간 탐구자",
    summary: "즉흥적으로 조리 시간을 선택하며 논리적인 탐구를 즐기는 타입",
    description: [
      "즉흥적으로 조리 시간을 선택하는 당신! 가끔 시간을 변경하고, 새로운 조리 시간을 시도해요. 즉흥적으로 선택하며 논리적인 탐구와 분석을 중시해요.",
      "즉시 선택하고, 자주 변경하며, 혼자 조용히 조리를 즐겨요. 논리와 정보로 선택하고, 그때그때 새로운 조리 시간을 시도하는 효율적인 스타일이에요.",
      "조리 시간을 통해 논리적인 분석을 하고, 새로운 지식을 탐구하는 것을 좋아해요.",
    ],
    traits: ["즉흥적 분석", "논리적 탐구", "지식 추구"],
    picks: ["새로운 시간", "빠른 분석", "정보 탐색"],
    tips: ["익숙한 시간", "느린 분석", "함께 조리하기"],
    match: "ENFJ, ESFJ",
    emoji: "🧠",
  },
  INTJ: {
    label: "전략적 조리 시간 설계자",
    summary: "계획적으로 조리 시간을 선택하며 완벽한 시간을 설계하는 타입",
    description: [
      "계획적으로 조리 시간을 선택하는 당신! 가끔 시간을 변경하고, 익숙한 조리 시간을 선호해요. 계획적으로 선택하며 완벽한 조리 시간을 설계하는 것을 중시해요.",
      "신중하게 선택하고, 거의 변경하지 않으며, 혼자 조용히 조리를 즐겨요. 논리와 정보로 선택하고, 미리 준비하는 체계적인 스타일로, 완벽한 조리 시간을 설계해요.",
      "조리 시간을 통해 완벽한 경험을 하고, 효율적인 시스템을 구축하는 것을 좋아해요.",
    ],
    traits: ["계획적 분석", "완벽 추구", "시스템 구축"],
    picks: ["균형 잡힌 시간", "신중한 분석", "효율적 설계"],
    tips: ["즉흥적 선택", "새로운 시간", "함께 조리하기"],
    match: "ENFP, ESFP",
    emoji: "⚙️",
  },
  ESFP: {
    label: "자유로운 조리 시간 즐거움 추구자",
    summary: "즉흥적으로 조리 시간을 선택하며 즐거움을 추구하는 타입",
    description: [
      "즉흥적으로 조리 시간을 선택하는 당신! 항상 다양한 시간을 선택하고, 새로운 조리 시간을 시도해요. 즉흥적으로 선택하며 즐거움과 재미를 추구해요.",
      "즉시 선택하고, 자주 변경하며, 다른 사람과 함께 조리를 즐겨요. 감각과 직감으로 선택하고, 그때그때 새로운 조리 시간을 시도하는 유연한 스타일이에요.",
      "조리 시간을 통해 즐거운 경험을 하고, 사람들과 함께 행복을 나누는 것을 즐겨요.",
    ],
    traits: ["즉흥적 선택", "즐거움 추구", "사교적"],
    picks: ["새로운 시간", "빠른 변경", "함께 조리하기"],
    tips: ["익숙한 시간", "계획적 선택", "혼자 조리하기"],
    match: "INTJ, ISTJ",
    emoji: "🎉",
  },
  ESFJ: {
    label: "친화적 조리 시간 조화 추구자",
    summary: "계획적으로 조리 시간을 선택하며 조화로운 경험을 만드는 타입",
    description: [
      "계획적으로 조리 시간을 선택하는 당신! 항상 다양한 시간을 선택하고, 익숙한 조리 시간을 선호해요. 계획적으로 선택하며 조화로운 경험과 관계를 중시해요.",
      "신중하게 선택하고, 거의 변경하지 않으며, 다른 사람과 함께 조리를 즐겨요. 감각과 직감으로 선택하고, 미리 준비하는 체계적인 스타일로, 모두가 만족할 수 있는 조화로운 조리 시간을 만들어요.",
      "조리 시간을 통해 행복한 경험을 하고, 사람들과의 관계를 돈독히 하는 것을 좋아해요.",
    ],
    traits: ["계획적 선택", "조화 추구", "친화적"],
    picks: ["균형 잡힌 시간", "신중한 결정", "함께 조리하기"],
    tips: ["즉흥적 선택", "새로운 시간", "혼자 조리하기"],
    match: "INTP, ISTP",
    emoji: "🤝",
  },
  ESTP: {
    label: "현실적 조리 시간 모험가",
    summary: "즉흥적으로 조리 시간을 선택하며 현실적인 모험을 즐기는 타입",
    description: [
      "즉흥적으로 조리 시간을 선택하는 당신! 항상 다양한 시간을 선택하고, 새로운 조리 시간을 시도해요. 즉흥적으로 선택하며 현실적인 모험과 도전을 추구해요.",
      "즉시 선택하고, 자주 변경하며, 다른 사람과 함께 조리를 즐겨요. 논리와 정보로 선택하고, 그때그때 새로운 조리 시간을 시도하는 효율적인 스타일이에요.",
      "조리 시간을 통해 현실적인 경험을 하고, 새로운 도전을 즐기는 것을 좋아해요.",
    ],
    traits: ["즉흥적 선택", "현실적 모험", "도전적"],
    picks: ["새로운 시간", "빠른 변경", "정보 공유"],
    tips: ["익숙한 시간", "느린 변경", "혼자 조리하기"],
    match: "INFJ, ISFJ",
    emoji: "🚀",
  },
  ESTJ: {
    label: "실용적 조리 시간 관리자",
    summary: "계획적으로 조리 시간을 선택하며 실용적인 관리를 중시하는 타입",
    description: [
      "계획적으로 조리 시간을 선택하는 당신! 항상 다양한 시간을 선택하고, 익숙한 조리 시간을 선호해요. 계획적으로 선택하며 실용적인 관리와 효율을 중시해요.",
      "신중하게 선택하고, 거의 변경하지 않으며, 다른 사람과 함께 조리를 즐겨요. 논리와 정보로 선택하고, 미리 준비하는 체계적인 스타일로, 실용적인 관리를 해요.",
      "조리 시간을 통해 효율적인 경험을 하고, 실용적인 지식을 얻는 것을 좋아해요.",
    ],
    traits: ["계획적 선택", "실용적 관리", "효율적"],
    picks: ["균형 잡힌 시간", "신중한 결정", "정보 공유"],
    tips: ["즉흥적 선택", "새로운 시간", "혼자 조리하기"],
    match: "INFP, ISFP",
    emoji: "📊",
  },
  ISFP: {
    label: "감성적 조리 시간 예술가",
    summary: "즉흥적으로 조리 시간을 선택하며 감성적인 경험을 추구하는 타입",
    description: [
      "즉흥적으로 조리 시간을 선택하는 당신! 가끔 시간을 변경하고, 새로운 조리 시간을 시도해요. 즉흥적으로 선택하며 감성적인 경험과 아름다움을 추구해요.",
      "즉시 선택하고, 자주 변경하며, 혼자 조용히 조리를 즐겨요. 감각과 직감으로 선택하고, 그때그때 새로운 조리 시간을 시도하는 유연한 스타일이에요.",
      "조리 시간을 통해 감성적인 경험을 하고, 아름다움을 탐구하는 것을 즐겨요.",
    ],
    traits: ["즉흥적 선택", "감성적 경험", "아름다움 추구"],
    picks: ["독특한 시간", "자유로운 결정", "혼자 조리하기"],
    tips: ["대중적인 시간", "계획적 선택", "함께 조리하기"],
    match: "ENTJ, ESTJ",
    emoji: "🎨",
  },
  ISFJ: {
    label: "세심한 조리 시간 보호자",
    summary: "계획적으로 조리 시간을 선택하며 세심한 배려를 하는 타입",
    description: [
      "계획적으로 조리 시간을 선택하는 당신! 가끔 시간을 변경하고, 익숙한 조리 시간을 선호해요. 계획적으로 선택하며 세심한 배려와 안정성을 중시해요.",
      "신중하게 선택하고, 거의 변경하지 않으며, 혼자 조용히 조리를 즐겨요. 감각과 직감으로 선택하고, 미리 준비하는 체계적인 스타일로, 세심한 배려를 해요.",
      "조리 시간을 통해 안정적인 경험을 하고, 소중한 사람들을 보호하는 것을 좋아해요.",
    ],
    traits: ["계획적 선택", "세심한 배려", "안정성 추구"],
    picks: ["균형 잡힌 시간", "신중한 결정", "혼자 조리하기"],
    tips: ["즉흥적 선택", "새로운 시간", "함께 조리하기"],
    match: "ENTP, ESTP",
    emoji: "🛡️",
  },
  ISTP: {
    label: "분석적 조리 시간 장인",
    summary: "즉흥적으로 조리 시간을 선택하며 실용적인 해결책을 찾는 타입",
    description: [
      "즉흥적으로 조리 시간을 선택하는 당신! 가끔 시간을 변경하고, 새로운 조리 시간을 시도해요. 즉흥적으로 선택하며 실용적인 해결책과 효율을 중시해요.",
      "즉시 선택하고, 자주 변경하며, 혼자 조용히 조리를 즐겨요. 논리와 정보로 선택하고, 그때그때 새로운 조리 시간을 시도하는 효율적인 스타일이에요.",
      "조리 시간을 통해 실용적인 해결책을 찾고, 효율적인 경험을 하는 것을 좋아해요.",
    ],
    traits: ["즉흥적 분석", "실용적 해결", "효율 추구"],
    picks: ["새로운 시간", "빠른 분석", "정보 탐색"],
    tips: ["익숙한 시간", "느린 분석", "함께 조리하기"],
    match: "ENFJ, ESFJ",
    emoji: "🛠️",
  },
  ISTJ: {
    label: "원칙주의 조리 시간 감별사",
    summary: "계획적으로 조리 시간을 선택하며 원칙에 따라 감별하는 타입",
    description: [
      "계획적으로 조리 시간을 선택하는 당신! 가끔 시간을 변경하고, 익숙한 조리 시간을 선호해요. 계획적으로 선택하며 원칙과 정확성을 중시해요.",
      "신중하게 선택하고, 거의 변경하지 않으며, 혼자 조용히 조리를 즐겨요. 논리와 정보로 선택하고, 미리 준비하는 체계적인 스타일로, 원칙에 따라 감별해요.",
      "조리 시간을 통해 정확한 정보를 얻고, 원칙적인 경험을 하는 것을 좋아해요.",
    ],
    traits: ["계획적 분석", "원칙 준수", "정확성 추구"],
    picks: ["균형 잡힌 시간", "신중한 분석", "효율적 감별"],
    tips: ["즉흥적 선택", "새로운 시간", "함께 조리하기"],
    match: "ENFP, ESFP",
    emoji: "📜",
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const mbtiType = (searchParams.get("type") as keyof typeof cookingTimeTypes) || "ENFP"
  const resultId = searchParams.get("id")
  const character = cookingTimeTypes[mbtiType]
  const [result, setResult] = useState<any>(null)

  useEffect(() => {
    if (resultId) {
      getTestResult(resultId)
        .then((data) => setResult(data))
        .catch((err) => console.error("결과 조회 실패:", err))
    }
  }, [resultId])

  const shareTitle = `나의 조리 시간 선호도는 "${character.label}" ${character.emoji}`
  const shareDescription = `${character.summary}\n\n나도 조리 시간 선호도 테스트 하러 가기 ⏱️`

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
                  testId="cooking-time"
                  testPath="/tests/cooking-time/test/result"
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
                <div className="p-3 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl">
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
                <div className="p-3 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold">특징</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {character.traits.map((trait, idx) => (
                  <div key={idx} className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
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
                <div className="p-3 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold">추천 조리 시간</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {character.picks.map((pick, idx) => (
                  <div key={idx} className="p-4 bg-indigo-50 dark:bg-indigo-950 rounded-lg">
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
                <div className="p-3 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl">
                  <Lightbulb className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold">개선 팁</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {character.tips.map((tip, idx) => (
                  <div key={idx} className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
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
                <div className="p-3 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold">잘 맞는 타입</h2>
              </div>
              <p className="text-muted-foreground">
                {character.match} 타입과 조리 시간 취향이 잘 맞아요! 함께 조리하면 더욱 즐거울 거예요.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center space-x-4 pb-8">
          <Button variant="outline" size="lg" asChild>
            <Link href="/tests/cooking-time/test">
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

export default function CookingTimeResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <p className="text-xl text-gray-700 dark:text-gray-300">결과를 불러오는 중...</p>
      </div>
    }>
      <ResultContent />
    </Suspense>
  )
}

