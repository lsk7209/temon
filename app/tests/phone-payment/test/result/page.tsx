"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, CreditCard, Sparkles } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { ShareButtons } from "@/components/share-buttons"
import { getTestResult } from "@/lib/api-client"

const paymentTypes = {
  ENFP: {
    label: "즉흥 결제러",
    summary: "결제할 때 즉시 결제 수단을 선택하는 활발한 타입",
    description:
      "당신은 결제할 때 즉시 결제 수단을 선택하는 스타일입니다. 카페에서 결제할 때 바로 선택하고, 결제 오류가 나면 빠르게 다시 시도합니다. 친구들과 함께 결제하며 이야기하는 것을 좋아하며, 다양한 결제 수단을 활발하게 사용합니다.",
    traits: [
      "결제할 때 즉시 결제 수단을 선택한다",
      "결제 오류가 나면 빠르게 다시 시도한다",
      "친구들과 함께 결제한다",
      "다양한 결제 수단을 활발하게 사용한다",
      "즉흥적으로 결제한다",
    ],
    picks: ["즉시 선택", "활발한 결제", "다양한 수단"],
    tips: [
      "결제 전에 금액을 확인하세요",
      "결제 수단을 안전하게 관리하세요",
      "과도한 결제를 피하세요",
    ],
    compatibility: {
      best: ["ISTJ", "ISFJ"],
      good: ["ESTJ", "ESFJ"],
      avoid: ["INTJ"],
    },
    emoji: "🌅",
  },
  INFP: {
    label: "여유 결제러",
    summary: "결제를 신중하게 하는 조용한 타입",
    description:
      "당신은 결제를 신중하게 하는 스타일입니다. 카페에서 결제할 때 신중하게 선택하고, 결제 오류가 나면 신중하게 확인합니다. 혼자 조용히 결제하는 것을 좋아하며, 자신만의 감각으로 결제 수단을 선택합니다.",
    traits: [
      "결제를 신중하게 한다",
      "결제 오류가 나면 신중하게 확인한다",
      "혼자 조용히 결제한다",
      "자신만의 감각으로 결제 수단을 선택한다",
      "여유롭게 결제한다",
    ],
    picks: ["신중한 선택", "여유로운 결제", "조용한 결제"],
    tips: [
      "결제 전에 금액을 확인하세요",
      "결제 수단을 안전하게 관리하세요",
      "과도한 결제를 피하세요",
    ],
    compatibility: {
      best: ["ENTJ", "ESTJ"],
      good: ["ENFJ", "ESFJ"],
      avoid: ["ESTP"],
    },
    emoji: "😴",
  },
  ENFJ: {
    label: "시간관리 결제러",
    summary: "정해진 시간에 결제하는 계획적인 타입",
    description:
      "당신은 정해진 시간에 결제하는 스타일입니다. 정해진 시간에 결제하고, 목표에 맞게 결제 수단을 선택합니다. 친구들과 함께 결제하며 이야기하는 것을 좋아하며, 효율적으로 결제합니다.",
    traits: [
      "정해진 시간에 결제한다",
      "목표에 맞게 결제 수단을 선택한다",
      "친구들과 함께 결제한다",
      "효율적으로 결제한다",
      "계획적으로 결제한다",
    ],
    picks: ["정해진 시간 결제", "계획적 결제", "효율적인 결제"],
    tips: [
      "결제 시간을 정해두세요",
      "결제 전에 금액을 확인하세요",
      "과도한 결제를 피하세요",
    ],
    compatibility: {
      best: ["INTP", "ISTP"],
      good: ["ISFP", "INFP"],
      avoid: ["ISTJ"],
    },
    emoji: "⏰",
  },
  INFJ: {
    label: "명상 결제러",
    summary: "결제를 최소화하고 깔끔하게 하는 전략가",
    description:
      "당신은 결제를 최소화하고 깔끔하게 하는 스타일입니다. 불필요한 결제는 하지 않으며, 정말 필요한 것만 결제합니다. 혼자 조용히 결제하며, 자신만의 감각으로 결제 수단을 선택합니다.",
    traits: [
      "불필요한 결제는 하지 않는다",
      "정말 필요한 것만 결제한다",
      "혼자 조용히 결제한다",
      "자신만의 감각으로 결제 수단을 선택한다",
      "결제를 최소화한다",
    ],
    picks: ["최소화 결제", "깔끔한 결제", "필요한 것만"],
    tips: [
      "결제 전에 금액을 확인하세요",
      "결제 수단을 안전하게 관리하세요",
      "과도한 결제를 피하세요",
    ],
    compatibility: {
      best: ["ENFP", "ESFP"],
      good: ["ENTP", "ESTP"],
      avoid: ["ESTJ"],
    },
    emoji: "🧘",
  },
  ENTP: {
    label: "혁신 결제러",
    summary: "결제 방법을 자주 바꾸며 실험하는 혁신가",
    description:
      "당신은 결제 방법을 자주 바꾸며 실험하는 스타일입니다. 새로운 결제 앱을 발견하면 바로 시도하고, 다양한 결제 수단을 사용합니다. 효율성과 재미를 동시에 추구하며, 최적의 결제 방법을 찾기 위해 계속 실험합니다.",
    traits: [
      "결제 방법을 자주 바꾼다",
      "새로운 결제 앱을 발견하면 바로 시도한다",
      "다양한 결제 수단을 사용한다",
      "최적의 결제 방법을 찾기 위해 실험한다",
      "효율성과 재미를 동시에 추구한다",
    ],
    picks: ["결제 실험", "새로운 앱", "다양한 수단"],
    tips: [
      "새로운 결제 앱을 시도해보세요",
      "효과적인 결제 방법을 기록해두세요",
      "과도한 결제를 피하세요",
    ],
    compatibility: {
      best: ["ISFJ", "ISTJ"],
      good: ["ESFJ", "ESTJ"],
      avoid: ["ISFP"],
    },
    emoji: "📱",
  },
  INTP: {
    label: "분석 결제러",
    summary: "결제를 체계적으로 분석하고 최적화하는 분석가",
    description:
      "당신은 결제를 체계적으로 분석하고 최적화하는 스타일입니다. 새로운 결제 앱을 사용할 때 리뷰를 보고 신중하게 시도하며, 어떤 결제 방법이 좋은지 논리적으로 파악합니다. 자신에게 가장 효과적인 결제 방법을 찾으며, 효율성을 중시합니다.",
    traits: [
      "새로운 앱을 사용할 때 리뷰를 본다",
      "어떤 결제 방법이 좋은지 파악한다",
      "효과적인 결제 방법을 찾는다",
      "결제를 체계적으로 최적화한다",
      "효율성을 중시한다",
    ],
    picks: ["결제 분석", "리뷰 확인", "효율적 최적화"],
    tips: [
      "결제 시간을 조절해보세요",
      "효과적인 결제 방법을 기록하세요",
      "과도한 결제를 피하세요",
    ],
    compatibility: {
      best: ["ENFJ", "ESFJ"],
      good: ["ENTJ", "ESTJ"],
      avoid: ["ESFP"],
    },
    emoji: "🎵",
  },
  ENTJ: {
    label: "효율 결제러",
    summary: "결제를 즉시 하고 효율적으로 관리하는 지도자",
    description:
      "당신은 결제를 즉시 하고 효율적으로 관리하는 스타일입니다. 카페에서 결제할 때 바로 선택하고, 효율적으로 빠르게 결제합니다. 결제를 계획적으로 하며, 효율적인 결제 관리 시스템을 만듭니다.",
    traits: [
      "결제를 즉시 한다",
      "효율적으로 빠르게 결제한다",
      "결제를 계획적으로 한다",
      "효율적인 결제 관리 시스템을 만든다",
      "체계적으로 빠르게 결제한다",
    ],
    picks: ["즉시 결제", "효율적 관리", "계획적 시스템"],
    tips: [
      "결제 시간을 정해두세요",
      "결제 전에 금액을 확인하세요",
      "과도한 결제를 피하세요",
    ],
    compatibility: {
      best: ["ISFP", "INFP"],
      good: ["ISFJ", "ISTJ"],
      avoid: ["INTP"],
    },
    emoji: "💪",
  },
  INTJ: {
    label: "야행성 결제러",
    summary: "자신만의 시간대에 결제하는 전략적 사고가",
    description:
      "당신은 자신만의 시간대에 결제하는 스타일입니다. 집중할 때는 결제하지 않고, 자신만의 시간에 결제합니다. 새로운 결제 앱을 사용할 때 리뷰를 보고 신중하게 시도하며, 효율적인 결제 방법을 찾습니다.",
    traits: [
      "집중할 때는 결제하지 않는다",
      "자신만의 시간에 결제한다",
      "새로운 앱을 사용할 때 리뷰를 본다",
      "효율적인 결제 방법을 찾는다",
      "깊이 있게 결제한다",
    ],
    picks: ["야행성 결제", "효율적 분석", "전략적 결제"],
    tips: [
      "결제 시간을 조절해보세요",
      "효과적인 결제 방법을 기록하세요",
      "과도한 결제를 피하세요",
    ],
    compatibility: {
      best: ["ESFP", "ENFP"],
      good: ["ESTP", "ENTP"],
      avoid: ["ESFJ"],
    },
    emoji: "🌙",
  },
  ESFJ: {
    label: "따뜻한 결제러",
    summary: "주변 사람들과 함께 결제하며 즐기는 배려심 많은 타입",
    description:
      "당신은 주변 사람들과 함께 결제하며 즐기는 스타일입니다. 친구들과 함께 결제하며 이야기하고, 하나씩 재미있게 결제 수단을 비교합니다. 결제를 통해 추억을 남기며, 주변 사람들의 기분을 고려합니다.",
    traits: [
      "친구들과 함께 결제한다",
      "하나씩 재미있게 결제 수단을 비교한다",
      "결제를 통해 추억을 남긴다",
      "주변 사람들의 기분을 고려한다",
      "따뜻하게 결제한다",
    ],
    picks: ["함께 결제", "따뜻한 결제", "추억 남기기"],
    tips: [
      "결제 시간을 조절해보세요",
      "결제 전에 금액을 확인하세요",
      "과도한 결제를 피하세요",
    ],
    compatibility: {
      best: ["INTP", "ISTP"],
      good: ["ENTP", "ESTP"],
      avoid: ["INTJ"],
    },
    emoji: "😊",
  },
  ISFJ: {
    label: "안정 결제러",
    summary: "규칙적으로 결제하며 안정적으로 관리하는 수호자",
    description:
      "당신은 규칙적으로 결제하며 안정적으로 관리하는 스타일입니다. 같은 시간에 같은 방식으로 결제하며, 정해진 루틴을 따릅니다. 안정적인 결제 방식을 선호하며, 신뢰할 수 있는 결제 습관을 만듭니다.",
    traits: [
      "같은 시간에 같은 방식으로 결제한다",
      "정해진 루틴을 따른다",
      "안정적인 결제 방식을 선호한다",
      "신뢰할 수 있는 결제 습관을 만든다",
      "규칙적인 결제 습관이 있다",
    ],
    picks: ["규칙적 결제", "안정적 관리", "정해진 루틴"],
    tips: [
      "결제 시간을 정해두세요",
      "정해진 루틴을 따르세요",
      "과도한 결제를 피하세요",
    ],
    compatibility: {
      best: ["ENTP", "ENFP"],
      good: ["ESTP", "ESFP"],
      avoid: ["ENTJ"],
    },
    emoji: "🧸",
  },
  ESFP: {
    label: "즉흥 결제러",
    summary: "결제할 때 즉시 반응해서 선택하는 활발한 타입",
    description:
      "당신은 결제할 때 즉시 반응해서 선택하는 스타일입니다. 카페에서 결제할 때 바로 선택하고, 결제 오류가 나면 빠르게 다시 시도합니다. 친구들과 함께 결제하며 이야기하는 것을 좋아하며, 다양한 결제 수단을 활발하게 사용합니다.",
    traits: [
      "결제할 때 즉시 반응한다",
      "결제 오류가 나면 빠르게 다시 시도한다",
      "친구들과 함께 결제한다",
      "다양한 결제 수단을 활발하게 사용한다",
      "즉흥적으로 결제한다",
    ],
    picks: ["즉시 반응", "활발한 결제", "재미있는 결제"],
    tips: [
      "결제 전에 금액을 확인하세요",
      "결제 수단을 안전하게 관리하세요",
      "과도한 결제를 피하세요",
    ],
    compatibility: {
      best: ["INTJ", "INFJ"],
      good: ["ISTJ", "ISFJ"],
      avoid: ["INTP"],
    },
    emoji: "🎉",
  },
  ISFP: {
    label: "조용한 결제러",
    summary: "결제를 최소화하고 조용히 하는 예술가",
    description:
      "당신은 결제를 최소화하고 조용히 하는 스타일입니다. 불필요한 결제는 하지 않으며, 정말 필요한 것만 결제합니다. 자신만의 시간에 여유롭게 결제하며, 자신만의 감각으로 결제 수단을 선택합니다.",
    traits: [
      "불필요한 결제는 하지 않는다",
      "정말 필요한 것만 결제한다",
      "자신만의 시간에 여유롭게 결제한다",
      "결제를 최소화한다",
      "자신만의 감각으로 결제 수단을 선택한다",
    ],
    picks: ["결제 최소화", "조용한 결제", "여유로운 결제"],
    tips: [
      "결제 전에 금액을 확인하세요",
      "결제 수단을 안전하게 관리하세요",
      "과도한 결제를 피하세요",
    ],
    compatibility: {
      best: ["ENTJ", "ESTJ"],
      good: ["ENFJ", "ESFJ"],
      avoid: ["ENTP"],
    },
    emoji: "🌿",
  },
  ESTJ: {
    label: "규칙 결제러",
    summary: "계획대로 정확하게 결제하며 효율적으로 관리하는 관리자",
    description:
      "당신은 계획대로 정확하게 결제하며 효율적으로 관리하는 스타일입니다. 정확한 시간에 정확한 방식으로 결제하며, 정해진 루틴을 체계적으로 따릅니다. 결제를 계획적으로 하며, 효율적인 결제 관리 시스템을 만듭니다.",
    traits: [
      "정확한 시간에 정확한 방식으로 결제한다",
      "정해진 루틴을 체계적으로 따른다",
      "효율적인 결제 관리 시스템을 만든다",
      "결제를 계획적으로 한다",
      "계획과 실행을 중시한다",
    ],
    picks: ["정확한 결제", "체계적 관리", "효율적 시스템"],
    tips: [
      "결제 시간을 정해두세요",
      "정해진 루틴을 체계적으로 따르세요",
      "과도한 결제를 피하세요",
    ],
    compatibility: {
      best: ["INFP", "ISFP"],
      good: ["ENFP", "ESFP"],
      avoid: ["INTP"],
    },
    emoji: "📋",
  },
  ISTJ: {
    label: "정석 결제러",
    summary: "늘 같은 방식으로 규칙적으로 결제하는 신뢰할 수 있는 타입",
    description:
      "당신은 늘 같은 방식으로 규칙적으로 결제하는 스타일입니다. 같은 시간, 같은 방식으로 결제하며, 정해진 루틴을 꾸준히 따릅니다. 안정적인 결제 방식을 선호하며, 신뢰할 수 있는 결제 습관을 만듭니다.",
    traits: [
      "늘 같은 방식으로 결제한다",
      "규칙적인 결제 시간을 유지한다",
      "정해진 루틴을 꾸준히 따른다",
      "안정적인 결제 방식을 선호한다",
      "신뢰할 수 있는 결제 습관을 만든다",
    ],
    picks: ["규칙적 결제", "안정적 관리", "정석 루틴"],
    tips: [
      "결제 시간을 정해두세요",
      "정해진 루틴을 꾸준히 따르세요",
      "과도한 결제를 피하세요",
    ],
    compatibility: {
      best: ["ENFP", "ESFP"],
      good: ["ENTP", "ESTP"],
      avoid: ["ENFJ"],
    },
    emoji: "📦",
  },
  ESTP: {
    label: "즉응 결제러",
    summary: "결제할 때 즉시 반응해서 선택하는 실용주의자",
    description:
      "당신은 결제할 때 즉시 반응해서 선택하는 스타일입니다. 카페에서 결제할 때 바로 선택하고, 효율적으로 빠르게 결제합니다. 생각보다는 행동을 중시하며, 효율적이고 실용적인 결제 방식을 선호합니다.",
    traits: [
      "결제할 때 즉시 반응한다",
      "효율적으로 빠르게 결제한다",
      "바로 결제한다",
      "행동을 중시한다",
      "실용적인 결제 방식을 선호한다",
    ],
    picks: ["즉시 반응", "실용적 결제", "빠른 결제"],
    tips: [
      "결제 전에 금액을 확인하세요",
      "결제 수단을 안전하게 관리하세요",
      "과도한 결제를 피하세요",
    ],
    compatibility: {
      best: ["INFJ", "INTP"],
      good: ["ENFJ", "ENTP"],
      avoid: ["ISFJ"],
    },
    emoji: "⚡",
  },
  ISTP: {
    label: "실용 결제러",
    summary: "필요할 때만 결제하며 효율적으로 처리하는 기술자",
    description:
      "당신은 필요할 때만 결제하며 효율적으로 처리하는 스타일입니다. 불필요한 결제는 하지 않으며, 정말 필요한 것만 결제합니다. 효율적이고 실용적인 결제 방식을 선호하며, 새로운 결제 앱을 사용할 때 리뷰를 확인합니다.",
    traits: [
      "필요할 때만 결제한다",
      "불필요한 결제는 하지 않는다",
      "정말 필요한 것만 결제한다",
      "효율적이고 실용적인 방식을 선호한다",
      "새로운 앱을 사용할 때 리뷰를 확인한다",
    ],
    picks: ["필요시 결제", "효율적 관리", "실용적 방식"],
    tips: [
      "결제 전에 금액을 확인하세요",
      "효과적인 결제 방법을 기록하세요",
      "과도한 결제를 피하세요",
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
  const mbtiType = (searchParams.get("type") as keyof typeof paymentTypes) || "ENFP"
  const resultId = searchParams.get("id") || undefined
  const character = paymentTypes[mbtiType]
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
                  className="mb-4 bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
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
                  testId="phone-payment"
                  testPath="/tests/phone-payment/test"
                  resultType={mbtiType}
                  resultId={loadedResult?.id || resultId}
                  title={`나는 💳 ${character.label}(${mbtiType})! 너는 어떤 결제러야?`}
                  description={character.summary}
                />
                <Button variant="outline" size="lg" asChild>
                  <Link href="/tests/phone-payment/test">
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
              <span>💳</span>
              <span>당신의 모바일 결제 특징</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.traits.map((trait, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 rounded-lg"
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
              <span>💰</span>
              <span>추천 결제 스타일</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.picks.map((pick, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 rounded-lg"
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
              <span>결제 팁</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3">
              {character.tips.map((tip, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="text-emerald-500 font-bold">{index + 1}.</span>
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
              <Sparkles className="h-6 w-6 text-teal-500" />
              <span>다른 재미있는 테스트도 해보세요!</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  slug: "phone-search",
                  title: "검색 습관",
                  emoji: "🔍",
                  description: "검색 습관으로 알아보는 성격",
                  participants: "0",
                },
                {
                  slug: "phone-message",
                  title: "메시지 답장 스타일",
                  emoji: "💬",
                  description: "메시지 답장 스타일로 알아보는 성격",
                  participants: "0",
                },
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
              className="border-2 border-emerald-300 hover:bg-emerald-50 font-medium py-6 px-8 bg-transparent"
            >
              다른 테스트하기
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default function PhonePaymentResult() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  )
}


