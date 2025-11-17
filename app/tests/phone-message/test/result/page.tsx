"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, MessageSquare, Sparkles } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { ShareButtons } from "@/components/share-buttons"
import { getTestResult } from "@/lib/api-client"

const messageTypes = {
  ENFP: {
    label: "즉흥 답장러",
    summary: "메시지가 오면 즉시 답장하는 활발한 타입",
    description:
      "당신은 메시지가 오면 즉시 답장하는 스타일입니다. 친구가 메시지를 보내면 바로 답장하고, 길게 답장하며 소통합니다. 여러 메시지가 쌓여도 하나씩 재미있게 답장하며, 활발하게 메시지를 주고받습니다.",
    traits: [
      "메시지가 오면 즉시 답장한다",
      "길게 답장하며 소통한다",
      "하나씩 재미있게 답장한다",
      "활발하게 메시지를 주고받는다",
      "즉흥적으로 답장한다",
    ],
    picks: ["즉시 답장", "활발한 소통", "길게 답장"],
    tips: [
      "중요한 메시지는 확인 후 답장하세요",
      "답장 시간을 조절해보세요",
      "과도한 답장을 피하세요",
    ],
    compatibility: {
      best: ["ISTJ", "ISFJ"],
      good: ["ESTJ", "ESFJ"],
      avoid: ["INTJ"],
    },
    emoji: "🌅",
  },
  INFP: {
    label: "여유 답장러",
    summary: "메시지를 나중에 답장하는 조용한 타입",
    description:
      "당신은 메시지를 나중에 답장하는 스타일입니다. 친구가 메시지를 보내도 즉시 답장하지 않고, 자신만의 시간에 답장합니다. 읽씹을 당해도 신경 쓰이지 않으며, 짧게 답장하며 여유롭게 소통합니다.",
    traits: [
      "메시지를 나중에 답장한다",
      "읽씹을 당해도 신경 쓰이지 않는다",
      "짧게 답장한다",
      "자신만의 시간에 답장한다",
      "여유롭게 소통한다",
    ],
    picks: ["나중에 답장", "여유로운 소통", "짧게 답장"],
    tips: [
      "중요한 메시지는 확인 후 답장하세요",
      "답장 시간을 조절해보세요",
      "과도한 답장을 피하세요",
    ],
    compatibility: {
      best: ["ENTJ", "ESTJ"],
      good: ["ENFJ", "ESFJ"],
      avoid: ["ESTP"],
    },
    emoji: "😴",
  },
  ENFJ: {
    label: "시간관리 답장러",
    summary: "정해진 시간에 메시지를 답장하는 계획적인 타입",
    description:
      "당신은 정해진 시간에 메시지를 답장하는 스타일입니다. 정해진 시간에 메시지를 확인하고, 목표에 맞게 답장합니다. 친구들과 함께 메시지를 보며 이야기하는 것을 좋아하며, 효율적으로 메시지를 주고받습니다.",
    traits: [
      "정해진 시간에 메시지를 확인한다",
      "목표에 맞게 답장한다",
      "친구들과 함께 메시지를 본다",
      "효율적으로 메시지를 주고받는다",
      "계획적으로 답장한다",
    ],
    picks: ["정해진 시간 답장", "계획적 소통", "효율적인 답장"],
    tips: [
      "메시지 답장 시간을 정해두세요",
      "중요한 메시지는 확인 후 답장하세요",
      "과도한 답장을 피하세요",
    ],
    compatibility: {
      best: ["INTP", "ISTP"],
      good: ["ISFP", "INFP"],
      avoid: ["ISTJ"],
    },
    emoji: "⏰",
  },
  INFJ: {
    label: "명상 답장러",
    summary: "메시지를 최소화하고 깔끔하게 답장하는 전략가",
    description:
      "당신은 메시지를 최소화하고 깔끔하게 답장하는 스타일입니다. 불필요한 메시지는 답장하지 않으며, 정말 필요한 메시지만 답장합니다. 혼자 조용히 메시지를 확인하며, 자신만의 감각으로 답장합니다.",
    traits: [
      "불필요한 메시지는 답장하지 않는다",
      "정말 필요한 메시지만 답장한다",
      "혼자 조용히 메시지를 확인한다",
      "자신만의 감각으로 답장한다",
      "메시지를 최소화한다",
    ],
    picks: ["최소화 답장", "깔끔한 소통", "필요한 메시지만"],
    tips: [
      "중요한 메시지는 확인 후 답장하세요",
      "답장 시간을 조절해보세요",
      "과도한 답장을 피하세요",
    ],
    compatibility: {
      best: ["ENFP", "ESFP"],
      good: ["ENTP", "ESTP"],
      avoid: ["ESTJ"],
    },
    emoji: "🧘",
  },
  ENTP: {
    label: "혁신 답장러",
    summary: "메시지 답장 방법을 자주 바꾸며 실험하는 혁신가",
    description:
      "당신은 메시지 답장 방법을 자주 바꾸며 실험하는 스타일입니다. 새로운 메시지 앱을 발견하면 바로 시도하고, 다양한 이모지와 스티커를 사용합니다. 효율성과 재미를 동시에 추구하며, 최적의 메시지 답장 방법을 찾기 위해 계속 실험합니다.",
    traits: [
      "메시지 답장 방법을 자주 바꾼다",
      "새로운 메시지 앱을 발견하면 바로 시도한다",
      "다양한 이모지와 스티커를 사용한다",
      "최적의 메시지 답장 방법을 찾기 위해 실험한다",
      "효율성과 재미를 동시에 추구한다",
    ],
    picks: ["메시지 실험", "새로운 앱", "다양한 이모지"],
    tips: [
      "새로운 메시지 앱을 시도해보세요",
      "효과적인 메시지 답장 방법을 기록해두세요",
      "과도한 답장을 피하세요",
    ],
    compatibility: {
      best: ["ISFJ", "ISTJ"],
      good: ["ESFJ", "ESTJ"],
      avoid: ["ISFP"],
    },
    emoji: "📱",
  },
  INTP: {
    label: "분석 답장러",
    summary: "메시지를 체계적으로 분석하고 최적화하는 분석가",
    description:
      "당신은 메시지를 체계적으로 분석하고 최적화하는 스타일입니다. 새로운 메시지 앱을 사용할 때 리뷰를 보고 신중하게 시도하며, 어떤 답장 방법이 좋은지 논리적으로 파악합니다. 자신에게 가장 효과적인 메시지 답장 방법을 찾으며, 효율성을 중시합니다.",
    traits: [
      "새로운 앱을 사용할 때 리뷰를 본다",
      "어떤 답장 방법이 좋은지 파악한다",
      "효과적인 메시지 답장 방법을 찾는다",
      "메시지를 체계적으로 최적화한다",
      "효율성을 중시한다",
    ],
    picks: ["메시지 분석", "리뷰 확인", "효율적 최적화"],
    tips: [
      "메시지 답장 시간을 조절해보세요",
      "효과적인 메시지 답장 방법을 기록하세요",
      "과도한 답장을 피하세요",
    ],
    compatibility: {
      best: ["ENFJ", "ESFJ"],
      good: ["ENTJ", "ESTJ"],
      avoid: ["ESFP"],
    },
    emoji: "🎵",
  },
  ENTJ: {
    label: "효율 답장러",
    summary: "메시지를 즉시 답장하고 효율적으로 관리하는 지도자",
    description:
      "당신은 메시지를 즉시 답장하고 효율적으로 관리하는 스타일입니다. 친구가 메시지를 보내면 바로 답장하고, 효율적으로 빠르게 답장합니다. 메시지 답장을 계획적으로 하며, 효율적인 메시지 관리 시스템을 만듭니다.",
    traits: [
      "메시지를 즉시 답장한다",
      "효율적으로 빠르게 답장한다",
      "메시지 답장을 계획적으로 한다",
      "효율적인 메시지 관리 시스템을 만든다",
      "체계적으로 짧게 답장한다",
    ],
    picks: ["즉시 답장", "효율적 관리", "계획적 시스템"],
    tips: [
      "메시지 답장 시간을 정해두세요",
      "중요한 메시지는 확인 후 답장하세요",
      "과도한 답장을 피하세요",
    ],
    compatibility: {
      best: ["ISFP", "INFP"],
      good: ["ISFJ", "ISTJ"],
      avoid: ["INTP"],
    },
    emoji: "💪",
  },
  INTJ: {
    label: "야행성 답장러",
    summary: "자신만의 시간대에 메시지를 답장하는 전략적 사고가",
    description:
      "당신은 자신만의 시간대에 메시지를 답장하는 스타일입니다. 집중할 때는 메시지를 보지 않고, 자신만의 시간에 확인합니다. 새로운 메시지 앱을 사용할 때 리뷰를 보고 신중하게 시도하며, 효율적인 메시지 답장 방법을 찾습니다.",
    traits: [
      "집중할 때는 메시지를 보지 않는다",
      "자신만의 시간에 확인한다",
      "새로운 앱을 사용할 때 리뷰를 본다",
      "효율적인 메시지 답장 방법을 찾는다",
      "깊이 있게 메시지를 답장한다",
    ],
    picks: ["야행성 답장", "효율적 분석", "전략적 답장"],
    tips: [
      "메시지 답장 시간을 조절해보세요",
      "효과적인 메시지 답장 방법을 기록하세요",
      "과도한 답장을 피하세요",
    ],
    compatibility: {
      best: ["ESFP", "ENFP"],
      good: ["ESTP", "ENTP"],
      avoid: ["ESFJ"],
    },
    emoji: "🌙",
  },
  ESFJ: {
    label: "따뜻한 답장러",
    summary: "주변 사람들과 함께 메시지를 보며 즐기는 배려심 많은 타입",
    description:
      "당신은 주변 사람들과 함께 메시지를 보며 즐기는 스타일입니다. 친구들과 함께 메시지를 보며 이야기하고, 하나씩 자세히 답장합니다. 읽씹을 당하면 신경 쓰이며, 메시지를 통해 추억을 남깁니다.",
    traits: [
      "친구들과 함께 메시지를 본다",
      "하나씩 자세히 답장한다",
      "읽씹을 당하면 신경 쓰인다",
      "메시지를 통해 추억을 남긴다",
      "주변 사람들의 기분을 고려한다",
    ],
    picks: ["함께 소통", "따뜻한 답장", "추억 남기기"],
    tips: [
      "메시지 답장 시간을 조절해보세요",
      "중요한 메시지는 확인 후 답장하세요",
      "과도한 답장을 피하세요",
    ],
    compatibility: {
      best: ["INTP", "ISTP"],
      good: ["ENTP", "ESTP"],
      avoid: ["INTJ"],
    },
    emoji: "😊",
  },
  ISFJ: {
    label: "안정 답장러",
    summary: "규칙적으로 메시지를 답장하며 안정적으로 관리하는 수호자",
    description:
      "당신은 규칙적으로 메시지를 답장하며 안정적으로 관리하는 스타일입니다. 같은 시간에 같은 방식으로 메시지를 확인하며, 정해진 루틴을 따릅니다. 안정적인 메시지 답장 방식을 선호하며, 신뢰할 수 있는 메시지 답장 습관을 만듭니다.",
    traits: [
      "같은 시간에 같은 방식으로 메시지를 확인한다",
      "정해진 루틴을 따른다",
      "안정적인 메시지 답장 방식을 선호한다",
      "신뢰할 수 있는 메시지 답장 습관을 만든다",
      "규칙적인 메시지 답장 습관이 있다",
    ],
    picks: ["규칙적 답장", "안정적 관리", "정해진 루틴"],
    tips: [
      "메시지 답장 시간을 정해두세요",
      "정해진 루틴을 따르세요",
      "과도한 답장을 피하세요",
    ],
    compatibility: {
      best: ["ENTP", "ENFP"],
      good: ["ESTP", "ESFP"],
      avoid: ["ENTJ"],
    },
    emoji: "🧸",
  },
  ESFP: {
    label: "즉흥 답장러",
    summary: "메시지가 오면 즉시 반응해서 답장하는 활발한 타입",
    description:
      "당신은 메시지가 오면 즉시 반응해서 답장하는 스타일입니다. 친구가 메시지를 보내면 바로 답장하고, 길게 답장하며 소통합니다. 여러 메시지가 쌓여도 하나씩 재미있게 답장하며, 활발하게 메시지를 주고받습니다.",
    traits: [
      "메시지가 오면 즉시 반응한다",
      "길게 답장하며 소통한다",
      "하나씩 재미있게 답장한다",
      "활발하게 메시지를 주고받는다",
      "즉흥적으로 답장한다",
    ],
    picks: ["즉시 반응", "활발한 소통", "재미있는 답장"],
    tips: [
      "중요한 메시지는 확인 후 답장하세요",
      "답장 시간을 조절해보세요",
      "과도한 답장을 피하세요",
    ],
    compatibility: {
      best: ["INTJ", "INFJ"],
      good: ["ISTJ", "ISFJ"],
      avoid: ["INTP"],
    },
    emoji: "🎉",
  },
  ISFP: {
    label: "조용한 답장러",
    summary: "메시지를 최소화하고 조용히 답장하는 예술가",
    description:
      "당신은 메시지를 최소화하고 조용히 답장하는 스타일입니다. 불필요한 메시지는 답장하지 않으며, 정말 필요한 메시지만 답장합니다. 자신만의 시간에 여유롭게 확인하며, 짧게 답장하며 자신만의 감각으로 소통합니다.",
    traits: [
      "불필요한 메시지는 답장하지 않는다",
      "정말 필요한 메시지만 답장한다",
      "자신만의 시간에 여유롭게 확인한다",
      "메시지를 최소화한다",
      "짧게 답장하며 자신만의 감각으로 소통한다",
    ],
    picks: ["메시지 최소화", "조용한 답장", "여유로운 소통"],
    tips: [
      "중요한 메시지는 확인 후 답장하세요",
      "답장 시간을 조절해보세요",
      "과도한 답장을 피하세요",
    ],
    compatibility: {
      best: ["ENTJ", "ESTJ"],
      good: ["ENFJ", "ESFJ"],
      avoid: ["ENTP"],
    },
    emoji: "🌿",
  },
  ESTJ: {
    label: "규칙 답장러",
    summary: "계획대로 정확하게 메시지를 답장하며 효율적으로 관리하는 관리자",
    description:
      "당신은 계획대로 정확하게 메시지를 답장하며 효율적으로 관리하는 스타일입니다. 정확한 시간에 정확한 방식으로 메시지를 확인하며, 정해진 루틴을 체계적으로 따릅니다. 메시지 답장을 계획적으로 하며, 효율적인 메시지 관리 시스템을 만듭니다.",
    traits: [
      "정확한 시간에 정확한 방식으로 메시지를 확인한다",
      "정해진 루틴을 체계적으로 따른다",
      "효율적인 메시지 관리 시스템을 만든다",
      "메시지 답장을 계획적으로 한다",
      "계획과 실행을 중시한다",
    ],
    picks: ["정확한 답장", "체계적 관리", "효율적 시스템"],
    tips: [
      "메시지 답장 시간을 정해두세요",
      "정해진 루틴을 체계적으로 따르세요",
      "과도한 답장을 피하세요",
    ],
    compatibility: {
      best: ["INFP", "ISFP"],
      good: ["ENFP", "ESFP"],
      avoid: ["INTP"],
    },
    emoji: "📋",
  },
  ISTJ: {
    label: "정석 답장러",
    summary: "늘 같은 방식으로 규칙적으로 메시지를 답장하는 신뢰할 수 있는 타입",
    description:
      "당신은 늘 같은 방식으로 규칙적으로 메시지를 답장하는 스타일입니다. 같은 시간, 같은 방식으로 메시지를 확인하며, 정해진 루틴을 꾸준히 따릅니다. 안정적인 메시지 답장 방식을 선호하며, 신뢰할 수 있는 메시지 답장 습관을 만듭니다.",
    traits: [
      "늘 같은 방식으로 메시지를 확인한다",
      "규칙적인 메시지 답장 시간을 유지한다",
      "정해진 루틴을 꾸준히 따른다",
      "안정적인 메시지 답장 방식을 선호한다",
      "신뢰할 수 있는 메시지 답장 습관을 만든다",
    ],
    picks: ["규칙적 답장", "안정적 관리", "정석 루틴"],
    tips: [
      "메시지 답장 시간을 정해두세요",
      "정해진 루틴을 꾸준히 따르세요",
      "과도한 답장을 피하세요",
    ],
    compatibility: {
      best: ["ENFP", "ESFP"],
      good: ["ENTP", "ESTP"],
      avoid: ["ENFJ"],
    },
    emoji: "📦",
  },
  ESTP: {
    label: "즉응 답장러",
    summary: "메시지가 오면 즉시 반응해서 답장하는 실용주의자",
    description:
      "당신은 메시지가 오면 즉시 반응해서 답장하는 스타일입니다. 친구가 메시지를 보내면 바로 답장하고, 효율적으로 빠르게 답장합니다. 생각보다는 행동을 중시하며, 효율적이고 실용적인 메시지 답장 방식을 선호합니다.",
    traits: [
      "메시지가 오면 즉시 반응한다",
      "효율적으로 빠르게 답장한다",
      "바로 답장한다",
      "행동을 중시한다",
      "실용적인 메시지 답장 방식을 선호한다",
    ],
    picks: ["즉시 반응", "실용적 답장", "빠른 답장"],
    tips: [
      "중요한 메시지는 확인 후 답장하세요",
      "답장 시간을 조절해보세요",
      "과도한 답장을 피하세요",
    ],
    compatibility: {
      best: ["INFJ", "INTP"],
      good: ["ENFJ", "ENTP"],
      avoid: ["ISFJ"],
    },
    emoji: "⚡",
  },
  ISTP: {
    label: "실용 답장러",
    summary: "필요할 때만 메시지를 답장하며 효율적으로 처리하는 기술자",
    description:
      "당신은 필요할 때만 메시지를 답장하며 효율적으로 처리하는 스타일입니다. 불필요한 메시지는 답장하지 않으며, 정말 필요한 메시지만 답장합니다. 효율적이고 실용적인 메시지 답장 방식을 선호하며, 새로운 앱을 사용할 때 리뷰를 확인합니다.",
    traits: [
      "필요할 때만 메시지를 확인한다",
      "불필요한 메시지는 답장하지 않는다",
      "정말 필요한 메시지만 답장한다",
      "효율적이고 실용적인 방식을 선호한다",
      "새로운 앱을 사용할 때 리뷰를 확인한다",
    ],
    picks: ["필요시 답장", "효율적 관리", "실용적 방식"],
    tips: [
      "중요한 메시지는 확인 후 답장하세요",
      "효과적인 메시지 답장 방법을 기록하세요",
      "과도한 답장을 피하세요",
    ],
    compatibility: {
      best: ["ESFJ", "ENFJ"],
      good: ["ESTJ", "ENTJ"],
      avoid: ["ENFP"],
    },
    emoji: "🛠",
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const mbtiType = (searchParams.get("type") as keyof typeof messageTypes) || "ENFP"
  const resultId = searchParams.get("id") || undefined
  const character = messageTypes[mbtiType]
  const [loadedResult, setLoadedResult] = useState<{ id: string; testId: string } | null>(null)

  useEffect(() => {
    if (resultId) {
      getTestResult(resultId)
        .then((result) => {
          setLoadedResult({ id: result.id, testId: result.testId })
        })
        .catch((error) => {
          console.error("결과 로드 실패:", error)
        })
    }
  }, [resultId])

  return (
    <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950">
      <main className="container max-w-[720px] mx-auto px-4 py-8">
        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur mb-8">
          <CardContent className="p-8 text-center">
            <div className="space-y-6">
              <div className="text-8xl mb-4">{character.emoji}</div>

              <div>
                <Badge
                  variant="secondary"
                  className="mb-4 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                >
                  {mbtiType}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{character.label}</h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium mb-4">"{character.summary}"</p>
                <p className="text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto">
                  {character.description}
                </p>
              </div>

              <div className="flex flex-col items-center space-y-4">
                <ShareButtons
                  testId="phone-message"
                  testPath="/tests/phone-message/test"
                  resultType={mbtiType}
                  resultId={loadedResult?.id || resultId}
                  title={`나는 💬 ${character.label}(${mbtiType})! 너는 어떤 답장러야?`}
                  description={character.summary}
                />
                <Button variant="outline" size="lg" asChild>
                  <Link href="/tests/phone-message/test">
                    <RotateCcw className="h-5 w-5 mr-2" />
                    다시 테스트
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <span>💬</span>
              <span>당신의 메시지 답장 특징</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.traits.map((trait, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 rounded-lg"
                >
                  <p className="font-medium text-center">{trait}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <span>📨</span>
              <span>추천 메시지 스타일</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.picks.map((pick, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 rounded-lg"
                >
                  <p className="font-medium text-center">{pick}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <span>💡</span>
              <span>메시지 팁</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3">
              {character.tips.map((tip, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="text-purple-500 font-bold">{index + 1}.</span>
                  <p className="text-lg leading-relaxed text-muted-foreground flex-1">{tip}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <span>❤️</span>
              <span>잘 맞는 궁합</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="font-semibold mb-2">최고의 궁합</p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {character.compatibility.best.join(", ")}
                </p>
              </div>
              <div>
                <p className="font-semibold mb-2">좋은 궁합</p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {character.compatibility.good.join(", ")}
                </p>
              </div>
              {character.compatibility.avoid && (
                <div>
                  <p className="font-semibold mb-2">주의할 궁합</p>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    {character.compatibility.avoid.join(", ")}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-pink-500" />
              <span>다른 재미있는 테스트도 해보세요!</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  slug: "phone-social-media",
                  title: "SNS 사용 습관",
                  emoji: "📱",
                  description: "SNS 사용 습관으로 알아보는 성격",
                  participants: "0",
                },
                {
                  slug: "phone-photo",
                  title: "사진 찍는 습관",
                  emoji: "📸",
                  description: "사진 찍는 습관으로 알아보는 성격",
                  participants: "0",
                },
                {
                  slug: "phone-app-organization",
                  title: "앱 정리 방식",
                  emoji: "📱",
                  description: "앱 정리 방식으로 알아보는 성격",
                  participants: "0",
                },
                {
                  slug: "phone-storage",
                  title: "저장공간 관리",
                  emoji: "💾",
                  description: "저장공간 관리로 알아보는 성격",
                  participants: "0",
                },
              ].map((test) => (
                <Card key={test.slug} className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{test.emoji}</div>
                    <h3 className="font-bold mb-2">{test.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{test.description}</p>
                    <p className="text-xs text-muted-foreground mb-4">{test.participants}명 참여</p>
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/tests/${test.slug}`}>테스트 하기</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Link href="/tests">
            <Button
              variant="outline"
              className="border-2 border-purple-300 hover:bg-purple-50 font-medium py-6 px-8 bg-transparent"
            >
              다른 테스트하기
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default function PhoneMessageResult() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  )
}


