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

const cookingSharedTypes = {
  ENFP: {
    label: "즉흥 공동 요리 탐험가",
    summary: "즉흥적으로 다양한 공동 요리 방식을 선택하며 새로운 방식을 탐구하는 타입",
    description: [
      "즉흥적으로 공동 요리를 선택하는 당신! 항상 함께 요리하고, 새로운 공동 요리 방식을 시도해요. 즉흥적으로 협력하며 감각과 직감을 추구해요.",
      "빠르게 참여하고, 자주 역할을 변경하며, 적극적으로 소통해요. 감각과 직감으로 선택하고, 그때그때 새로운 공동 요리 방식을 시도하는 유연한 스타일이에요.",
      "공동 요리를 통해 새로운 경험을 하고, 다양한 협력 방식을 탐구하는 것을 즐겨요.",
    ],
    traits: ["즉흥적 협력", "새로운 방식", "적극적 소통"],
    picks: ["새로운 공동 요리", "즉시 참여", "함께 즐기기"],
    tips: ["익숙한 방식", "계획적 협력", "혼자 요리하기"],
    match: "ISTJ, INTJ",
    emoji: "👥",
  },
  ENFJ: {
    label: "배려 공동 요리 큐레이터",
    summary: "계획적으로 공동 요리 방식을 선택하며 모두를 위한 방식을 찾는 타입",
    description: [
      "계획적으로 공동 요리를 선택하는 당신! 항상 함께 요리하고, 익숙한 공동 요리 방식을 선호해요. 계획적으로 협력하며 감각과 직감을 중시해요.",
      "신중하게 참여하고, 고정된 역할을 유지하며, 적극적으로 소통해요. 감각과 직감으로 선택하고, 미리 계획하는 체계적인 스타일로, 모두가 만족할 수 있는 공동 요리 방식을 찾아요.",
      "공동 요리를 통해 행복한 협력을 하고, 소중한 사람들과 함께 요리하는 것을 좋아해요.",
    ],
    traits: ["계획적 협력", "익숙한 방식", "배려심"],
    picks: ["균형 잡힌 역할", "신중한 참여", "함께 즐기기"],
    tips: ["즉흥적 협력", "새로운 방식", "혼자 요리하기"],
    match: "ISTP, INTP",
    emoji: "💝",
  },
  ENTP: {
    label: "분석 공동 요리 혁신가",
    summary: "즉흥적으로 공동 요리 방식을 선택하며 논리적으로 선택하는 타입",
    description: [
      "즉흥적으로 공동 요리를 선택하는 당신! 항상 함께 요리하고, 새로운 공동 요리 방식을 시도해요. 즉흥적으로 협력하며 논리와 정보를 중시해요.",
      "빠르게 참여하고, 자주 역할을 변경하며, 적극적으로 소통해요. 논리와 정보로 선택하고, 그때그때 새로운 공동 요리 방식을 시도하는 효율적인 스타일이에요.",
      "공동 요리를 통해 최적의 협력을 하고, 효율적인 경험을 하는 것을 좋아해요.",
    ],
    traits: ["즉흥적 분석", "논리적 협력", "효율적 소통"],
    picks: ["새로운 방식", "빠른 역할 변경", "정보 공유"],
    tips: ["익숙한 방식", "느린 변경", "혼자 요리하기"],
    match: "ISFJ, INFJ",
    emoji: "💡",
  },
  ENTJ: {
    label: "전략 공동 요리 리더",
    summary: "계획적으로 공동 요리 방식을 선택하며 목표 달성을 위한 방식을 선택하는 타입",
    description: [
      "계획적으로 공동 요리를 선택하는 당신! 항상 함께 요리하고, 익숙한 공동 요리 방식을 선호해요. 계획적으로 협력하며 논리와 정보를 중시해요.",
      "신중하게 참여하고, 고정된 역할을 유지하며, 적극적으로 소통해요. 논리와 정보로 선택하고, 미리 계획하는 체계적인 스타일로, 목표 달성을 위한 공동 요리 방식을 찾아요.",
      "공동 요리를 통해 최적의 협력을 하고, 효율적인 경험을 하는 것을 좋아해요.",
    ],
    traits: ["계획적 분석", "전략적 협력", "목표 지향"],
    picks: ["균형 잡힌 역할", "신중한 결정", "정보 공유"],
    tips: ["즉흥적 협력", "새로운 방식", "혼자 요리하기"],
    match: "ISFP, INFP",
    emoji: "👑",
  },
  INFP: {
    label: "이상주의 공동 요리 몽상가",
    summary: "즉흥적으로 공동 요리 방식을 선택하며 개인적인 의미를 찾는 타입",
    description: [
      "즉흥적으로 공동 요리를 선택하는 당신! 가끔 함께 요리하고, 새로운 공동 요리 방식을 시도해요. 즉흥적으로 협력하며 개인적인 의미와 감성을 추구해요.",
      "즉시 참여하고, 자주 역할을 변경하며, 필요할 때만 소통해요. 감각과 직감으로 선택하고, 그때그때 새로운 공동 요리 방식을 시도하는 유연한 스타일이에요.",
      "공동 요리를 통해 개인적인 경험을 하고, 깊은 감성을 탐구하는 것을 즐겨요.",
    ],
    traits: ["즉흥적 협력", "개인적 의미", "감성적 탐구"],
    picks: ["독특한 방식", "자유로운 역할", "혼자 요리하기"],
    tips: ["대중적인 방식", "계획적 협력", "함께 요리하기"],
    match: "ENTJ, ESTJ",
    emoji: "✨",
  },
  INFJ: {
    label: "통찰력 공동 요리 조언가",
    summary: "계획적으로 공동 요리 방식을 선택하며 깊은 통찰을 얻는 타입",
    description: [
      "계획적으로 공동 요리를 선택하는 당신! 가끔 함께 요리하고, 익숙한 공동 요리 방식을 선호해요. 계획적으로 협력하며 깊은 통찰과 의미를 중시해요.",
      "신중하게 참여하고, 고정된 역할을 유지하며, 필요할 때만 소통해요. 감각과 직감으로 선택하고, 미리 계획하는 체계적인 스타일로, 깊은 통찰을 얻어요.",
      "공동 요리를 통해 깊은 의미를 찾고, 내면의 성장을 추구하는 것을 좋아해요.",
    ],
    traits: ["계획적 협력", "깊은 통찰", "내면의 성장"],
    picks: ["의미 있는 협력", "신중한 결정", "혼자 요리하기"],
    tips: ["즉흥적 협력", "새로운 방식", "함께 요리하기"],
    match: "ENTP, ESTP",
    emoji: "🔮",
  },
  INTP: {
    label: "논리적 공동 요리 탐구자",
    summary: "즉흥적으로 공동 요리 방식을 선택하며 논리적인 탐구를 즐기는 타입",
    description: [
      "즉흥적으로 공동 요리를 선택하는 당신! 가끔 함께 요리하고, 새로운 공동 요리 방식을 시도해요. 즉흥적으로 협력하며 논리적인 탐구와 분석을 중시해요.",
      "즉시 참여하고, 자주 역할을 변경하며, 필요할 때만 소통해요. 논리와 정보로 선택하고, 그때그때 새로운 공동 요리 방식을 시도하는 효율적인 스타일이에요.",
      "공동 요리를 통해 논리적인 분석을 하고, 새로운 지식을 탐구하는 것을 좋아해요.",
    ],
    traits: ["즉흥적 분석", "논리적 탐구", "지식 추구"],
    picks: ["새로운 방식", "빠른 분석", "정보 탐색"],
    tips: ["익숙한 방식", "느린 분석", "함께 요리하기"],
    match: "ENFJ, ESFJ",
    emoji: "🧠",
  },
  INTJ: {
    label: "전략적 공동 요리 설계자",
    summary: "계획적으로 공동 요리 방식을 선택하며 완벽한 방식을 설계하는 타입",
    description: [
      "계획적으로 공동 요리를 선택하는 당신! 가끔 함께 요리하고, 익숙한 공동 요리 방식을 선호해요. 계획적으로 협력하며 완벽한 공동 요리 방식을 설계하는 것을 중시해요.",
      "신중하게 참여하고, 고정된 역할을 유지하며, 필요할 때만 소통해요. 논리와 정보로 선택하고, 미리 계획하는 체계적인 스타일로, 완벽한 공동 요리 방식을 설계해요.",
      "공동 요리를 통해 완벽한 경험을 하고, 효율적인 시스템을 구축하는 것을 좋아해요.",
    ],
    traits: ["계획적 분석", "완벽 추구", "시스템 구축"],
    picks: ["균형 잡힌 역할", "신중한 분석", "효율적 설계"],
    tips: ["즉흥적 협력", "새로운 방식", "함께 요리하기"],
    match: "ENFP, ESFP",
    emoji: "⚙️",
  },
  ESFP: {
    label: "자유로운 공동 요리 즐거움 추구자",
    summary: "즉흥적으로 공동 요리 방식을 선택하며 즐거움을 추구하는 타입",
    description: [
      "즉흥적으로 공동 요리를 선택하는 당신! 항상 함께 요리하고, 새로운 공동 요리 방식을 시도해요. 즉흥적으로 협력하며 즐거움과 재미를 추구해요.",
      "즉시 참여하고, 자주 역할을 변경하며, 적극적으로 소통해요. 감각과 직감으로 선택하고, 그때그때 새로운 공동 요리 방식을 시도하는 유연한 스타일이에요.",
      "공동 요리를 통해 즐거운 경험을 하고, 사람들과 함께 행복을 나누는 것을 즐겨요.",
    ],
    traits: ["즉흥적 협력", "즐거움 추구", "사교적"],
    picks: ["새로운 방식", "빠른 역할 변경", "함께 즐기기"],
    tips: ["익숙한 방식", "계획적 협력", "혼자 요리하기"],
    match: "INTJ, ISTJ",
    emoji: "🎉",
  },
  ESFJ: {
    label: "친화적 공동 요리 조화 추구자",
    summary: "계획적으로 공동 요리 방식을 선택하며 조화로운 경험을 만드는 타입",
    description: [
      "계획적으로 공동 요리를 선택하는 당신! 항상 함께 요리하고, 익숙한 공동 요리 방식을 선호해요. 계획적으로 협력하며 조화로운 경험과 관계를 중시해요.",
      "신중하게 참여하고, 고정된 역할을 유지하며, 적극적으로 소통해요. 감각과 직감으로 선택하고, 미리 계획하는 체계적인 스타일로, 모두가 만족할 수 있는 조화로운 공동 요리 방식을 만들어요.",
      "공동 요리를 통해 행복한 경험을 하고, 사람들과의 관계를 돈독히 하는 것을 좋아해요.",
    ],
    traits: ["계획적 협력", "조화 추구", "친화적"],
    picks: ["균형 잡힌 역할", "신중한 결정", "함께 즐기기"],
    tips: ["즉흥적 협력", "새로운 방식", "혼자 요리하기"],
    match: "INTP, ISTP",
    emoji: "🤝",
  },
  ESTP: {
    label: "현실적 공동 요리 모험가",
    summary: "즉흥적으로 공동 요리 방식을 선택하며 현실적인 모험을 즐기는 타입",
    description: [
      "즉흥적으로 공동 요리를 선택하는 당신! 항상 함께 요리하고, 새로운 공동 요리 방식을 시도해요. 즉흥적으로 협력하며 현실적인 모험과 도전을 추구해요.",
      "즉시 참여하고, 자주 역할을 변경하며, 적극적으로 소통해요. 논리와 정보로 선택하고, 그때그때 새로운 공동 요리 방식을 시도하는 효율적인 스타일이에요.",
      "공동 요리를 통해 현실적인 경험을 하고, 새로운 도전을 즐기는 것을 좋아해요.",
    ],
    traits: ["즉흥적 협력", "현실적 모험", "도전적"],
    picks: ["새로운 방식", "빠른 역할 변경", "정보 공유"],
    tips: ["익숙한 방식", "느린 변경", "혼자 요리하기"],
    match: "INFJ, ISFJ",
    emoji: "🚀",
  },
  ESTJ: {
    label: "실용적 공동 요리 관리자",
    summary: "계획적으로 공동 요리 방식을 선택하며 실용적인 관리를 중시하는 타입",
    description: [
      "계획적으로 공동 요리를 선택하는 당신! 항상 함께 요리하고, 익숙한 공동 요리 방식을 선호해요. 계획적으로 협력하며 실용적인 관리와 효율을 중시해요.",
      "신중하게 참여하고, 고정된 역할을 유지하며, 적극적으로 소통해요. 논리와 정보로 선택하고, 미리 계획하는 체계적인 스타일로, 실용적인 관리를 해요.",
      "공동 요리를 통해 효율적인 경험을 하고, 실용적인 지식을 얻는 것을 좋아해요.",
    ],
    traits: ["계획적 협력", "실용적 관리", "효율적"],
    picks: ["균형 잡힌 역할", "신중한 결정", "정보 공유"],
    tips: ["즉흥적 협력", "새로운 방식", "혼자 요리하기"],
    match: "INFP, ISFP",
    emoji: "📊",
  },
  ISFP: {
    label: "감성적 공동 요리 예술가",
    summary: "즉흥적으로 공동 요리 방식을 선택하며 감성적인 경험을 추구하는 타입",
    description: [
      "즉흥적으로 공동 요리를 선택하는 당신! 가끔 함께 요리하고, 새로운 공동 요리 방식을 시도해요. 즉흥적으로 협력하며 감성적인 경험과 아름다움을 추구해요.",
      "즉시 참여하고, 자주 역할을 변경하며, 필요할 때만 소통해요. 감각과 직감으로 선택하고, 그때그때 새로운 공동 요리 방식을 시도하는 유연한 스타일이에요.",
      "공동 요리를 통해 감성적인 경험을 하고, 아름다움을 탐구하는 것을 즐겨요.",
    ],
    traits: ["즉흥적 협력", "감성적 경험", "아름다움 추구"],
    picks: ["독특한 방식", "자유로운 역할", "혼자 요리하기"],
    tips: ["대중적인 방식", "계획적 협력", "함께 요리하기"],
    match: "ENTJ, ESTJ",
    emoji: "🎨",
  },
  ISFJ: {
    label: "세심한 공동 요리 보호자",
    summary: "계획적으로 공동 요리 방식을 선택하며 세심한 배려를 하는 타입",
    description: [
      "계획적으로 공동 요리를 선택하는 당신! 가끔 함께 요리하고, 익숙한 공동 요리 방식을 선호해요. 계획적으로 협력하며 세심한 배려와 안정성을 중시해요.",
      "신중하게 참여하고, 고정된 역할을 유지하며, 필요할 때만 소통해요. 감각과 직감으로 선택하고, 미리 계획하는 체계적인 스타일로, 세심한 배려를 해요.",
      "공동 요리를 통해 안정적인 경험을 하고, 소중한 사람들을 보호하는 것을 좋아해요.",
    ],
    traits: ["계획적 협력", "세심한 배려", "안정성 추구"],
    picks: ["균형 잡힌 역할", "신중한 결정", "혼자 요리하기"],
    tips: ["즉흥적 협력", "새로운 방식", "함께 요리하기"],
    match: "ENTP, ESTP",
    emoji: "🛡️",
  },
  ISTP: {
    label: "분석적 공동 요리 장인",
    summary: "즉흥적으로 공동 요리 방식을 선택하며 실용적인 해결책을 찾는 타입",
    description: [
      "즉흥적으로 공동 요리를 선택하는 당신! 가끔 함께 요리하고, 새로운 공동 요리 방식을 시도해요. 즉흥적으로 협력하며 실용적인 해결책과 효율을 중시해요.",
      "즉시 참여하고, 자주 역할을 변경하며, 필요할 때만 소통해요. 논리와 정보로 선택하고, 그때그때 새로운 공동 요리 방식을 시도하는 효율적인 스타일이에요.",
      "공동 요리를 통해 실용적인 해결책을 찾고, 효율적인 경험을 하는 것을 좋아해요.",
    ],
    traits: ["즉흥적 분석", "실용적 해결", "효율 추구"],
    picks: ["새로운 방식", "빠른 분석", "정보 탐색"],
    tips: ["익숙한 방식", "느린 분석", "함께 요리하기"],
    match: "ENFJ, ESFJ",
    emoji: "🛠️",
  },
  ISTJ: {
    label: "원칙주의 공동 요리 감별사",
    summary: "계획적으로 공동 요리 방식을 선택하며 원칙에 따라 감별하는 타입",
    description: [
      "계획적으로 공동 요리를 선택하는 당신! 가끔 함께 요리하고, 익숙한 공동 요리 방식을 선호해요. 계획적으로 협력하며 원칙과 정확성을 중시해요.",
      "신중하게 참여하고, 고정된 역할을 유지하며, 필요할 때만 소통해요. 논리와 정보로 선택하고, 미리 계획하는 체계적인 스타일로, 원칙에 따라 감별해요.",
      "공동 요리를 통해 정확한 정보를 얻고, 원칙적인 경험을 하는 것을 좋아해요.",
    ],
    traits: ["계획적 분석", "원칙 준수", "정확성 추구"],
    picks: ["균형 잡힌 역할", "신중한 분석", "효율적 감별"],
    tips: ["즉흥적 협력", "새로운 방식", "함께 요리하기"],
    match: "ENFP, ESFP",
    emoji: "📜",
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const mbtiType = (searchParams.get("type") as keyof typeof cookingSharedTypes) || "ENFP"
  const resultId = searchParams.get("id")
  const character = cookingSharedTypes[mbtiType]
  const [result, setResult] = useState<any>(null)

  useEffect(() => {
    if (resultId) {
      getTestResult(resultId)
        .then((data) => setResult(data))
        .catch((err) => console.error("결과 조회 실패:", err))
    }
  }, [resultId])

  const shareTitle = `나의 공동 요리 스타일은 "${character.label}" ${character.emoji}`
  const shareDescription = `${character.summary}\n\n나도 공동 요리 스타일 테스트 하러 가기 👥`

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <main className="container max-w-4xl mx-auto px-4 py-8 space-y-8">
        <Card className="border-0 shadow-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur">
          <CardContent className="p-8 md:p-12">
            <div className="text-center space-y-6">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {mbtiType}
              </Badge>

              <div>
                <div className="text-6xl mb-4">{character.emoji}</div>
                <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                  {character.label}
                </h1>
                <p className="text-xl text-muted-foreground">{character.summary}</p>
              </div>

              <div className="pt-6">
                <ShareButtons
                  testId="cooking-shared"
                  testPath="/tests/cooking-shared/test/result"
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
                <div className="p-3 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl">
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
                <div className="p-3 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl">
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
                <div className="p-3 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold">추천 공동 요리 스타일</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {character.picks.map((pick, idx) => (
                  <div key={idx} className="p-4 bg-cyan-50 dark:bg-cyan-950 rounded-lg">
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
                <div className="p-3 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl">
                  <Lightbulb className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold">개선 팁</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {character.tips.map((tip, idx) => (
                  <div key={idx} className="p-4 bg-teal-50 dark:bg-teal-950 rounded-lg">
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
                <div className="p-3 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold">잘 맞는 타입</h2>
              </div>
              <p className="text-muted-foreground">
                {character.match} 타입과 공동 요리 취향이 잘 맞아요! 함께 요리하면 더욱 즐거울 거예요.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center space-x-4 pb-8">
          <Button variant="outline" size="lg" asChild>
            <Link href="/tests/cooking-shared/test">
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

export default function CookingSharedResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <p className="text-xl text-gray-700 dark:text-gray-300">결과를 불러오는 중...</p>
      </div>
    }>
      <ResultContent />
    </Suspense>
  )
}

