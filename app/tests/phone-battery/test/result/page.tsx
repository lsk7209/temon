"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, Zap, Sparkles } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { ShareButtons } from "@/components/share-buttons"
import { getTestResult } from "@/lib/api-client"

const batteryTypes = {
  ENFP: {
    label: "즉흥 배터리러",
    summary: "배터리가 떨어지면 즉시 충전하는 활발한 타입",
    description:
      "당신은 배터리가 떨어지면 즉시 충전하는 스타일입니다. 배터리가 20% 이하로 떨어지면 바로 충전하며, 배터리가 다 떨어지는 것을 좋아하지 않습니다. 항상 충전기를 챙기며, 배터리 관리를 활발하게 합니다.",
    traits: [
      "배터리가 떨어지면 즉시 충전한다",
      "배터리가 20% 이하로 떨어지면 바로 충전한다",
      "배터리가 다 떨어지는 것을 싫어한다",
      "항상 충전기를 챙긴다",
      "배터리 관리를 활발하게 한다",
    ],
    picks: ["즉시 충전", "충전기 챙기기", "활발한 배터리 관리"],
    tips: [
      "배터리가 20% 이하로 떨어지기 전에 충전하세요",
      "외출 시 충전기를 항상 챙기세요",
      "배터리 절전 모드를 활용하세요",
    ],
    compatibility: {
      best: ["ISTJ", "ISFJ"],
      good: ["ESTJ", "ESFJ"],
      avoid: ["INTJ"],
    },
    emoji: "🌅",
  },
  INFP: {
    label: "여유 배터리러",
    summary: "배터리를 나중에 충전하는 조용한 타입",
    description:
      "당신은 배터리가 떨어져도 즉시 충전하지 않고 나중에 충전하는 스타일입니다. 배터리가 다 떨어져도 불편하지 않으며, 자신만의 시간에 여유롭게 충전합니다. 배터리 절전 모드를 자주 사용하며, 배터리 관리를 조용히 합니다.",
    traits: [
      "배터리가 떨어져도 즉시 충전하지 않는다",
      "배터리가 다 떨어져도 불편하지 않다",
      "자신만의 시간에 여유롭게 충전한다",
      "배터리 절전 모드를 자주 사용한다",
      "배터리 관리를 조용히 한다",
    ],
    picks: ["나중에 충전", "절전 모드", "여유로운 배터리 관리"],
    tips: [
      "배터리 절전 모드를 적극 활용하세요",
      "불필요한 앱을 종료해 배터리를 절약하세요",
      "충전 시간을 정해두는 것도 좋습니다",
    ],
    compatibility: {
      best: ["ENTJ", "ESTJ"],
      good: ["ENFJ", "ESFJ"],
      avoid: ["ESTP"],
    },
    emoji: "😴",
  },
  ENFJ: {
    label: "시간관리 배터리러",
    summary: "정해진 시간에 배터리를 충전하는 계획적인 타입",
    description:
      "당신은 배터리를 정해진 시간에 충전하는 스타일입니다. 배터리 충전 시간을 정해두고 그 시간에만 충전하며, 배터리 관리를 계획적으로 합니다. 주변 사람들의 배터리도 챙기며, 함께 효율적으로 배터리를 관리합니다.",
    traits: [
      "정해진 시간에 배터리를 충전한다",
      "배터리 충전 시간을 정해둔다",
      "배터리 관리를 계획적으로 한다",
      "주변 사람들의 배터리도 챙긴다",
      "효율적으로 배터리를 관리한다",
    ],
    picks: ["정해진 시간 충전", "계획적 관리", "효율적인 배터리 관리"],
    tips: [
      "배터리 충전 시간을 정해두세요",
      "배터리가 20% 이하로 떨어지기 전에 충전하세요",
      "배터리 절전 모드를 활용하세요",
    ],
    compatibility: {
      best: ["INTP", "ISTP"],
      good: ["ISFP", "INFP"],
      avoid: ["ISTJ"],
    },
    emoji: "⏰",
  },
  INFJ: {
    label: "명상 배터리러",
    summary: "배터리를 최소화하고 절전하는 전략가",
    description:
      "당신은 배터리를 최소화하고 절전하는 스타일입니다. 배터리 절전 모드를 자주 사용하며, 불필요한 앱을 종료해 배터리를 절약합니다. 배터리가 다 떨어져도 불편하지 않으며, 자신만의 시간을 소중히 여깁니다.",
    traits: [
      "배터리 절전 모드를 자주 사용한다",
      "불필요한 앱을 종료해 배터리를 절약한다",
      "배터리가 다 떨어져도 불편하지 않다",
      "배터리를 최소화한다",
      "자신만의 시간을 소중히 여긴다",
    ],
    picks: ["절전 모드", "배터리 최소화", "효율적 절약"],
    tips: [
      "배터리 절전 모드를 적극 활용하세요",
      "불필요한 앱을 종료해 배터리를 절약하세요",
      "배터리 사용량을 모니터링하세요",
    ],
    compatibility: {
      best: ["ENFP", "ESFP"],
      good: ["ENTP", "ESTP"],
      avoid: ["ESTJ"],
    },
    emoji: "🧘",
  },
  ENTP: {
    label: "혁신 배터리러",
    summary: "배터리 관리 방법을 자주 바꾸며 실험하는 혁신가",
    description:
      "당신은 배터리 관리 방법을 자주 바꾸며 실험하는 스타일입니다. 새로운 배터리 관리 앱을 시도하고, 다양한 충전 방법을 사용하며, 최적의 배터리 관리를 찾기 위해 계속 실험합니다. 효율성과 재미를 동시에 추구합니다.",
    traits: [
      "배터리 관리 방법을 자주 바꾼다",
      "새로운 배터리 관리 앱을 시도한다",
      "다양한 충전 방법을 사용한다",
      "최적의 배터리 관리를 찾기 위해 실험한다",
      "효율성과 재미를 동시에 추구한다",
    ],
    picks: ["배터리 실험", "새로운 앱", "다양한 충전 방법"],
    tips: [
      "새로운 배터리 관리 앱을 시도해보세요",
      "효과적인 배터리 관리 방법을 기록해두세요",
      "배터리 사용량을 모니터링하세요",
    ],
    compatibility: {
      best: ["ISFJ", "ISTJ"],
      good: ["ESFJ", "ESTJ"],
      avoid: ["ISFP"],
    },
    emoji: "📱",
  },
  INTP: {
    label: "분석 배터리러",
    summary: "배터리를 체계적으로 분석하고 최적화하는 분석가",
    description:
      "당신은 배터리를 체계적으로 분석하고 최적화하는 스타일입니다. 배터리 사용량을 분석하며, 어떤 앱이 배터리를 많이 사용하는지 논리적으로 파악합니다. 자신에게 가장 효과적인 배터리 관리 방법을 찾으며, 효율성을 중시합니다.",
    traits: [
      "배터리 사용량을 분석한다",
      "어떤 앱이 배터리를 많이 사용하는지 파악한다",
      "효과적인 배터리 관리 방법을 찾는다",
      "배터리를 체계적으로 최적화한다",
      "효율성을 중시한다",
    ],
    picks: ["배터리 분석", "사용량 모니터링", "효율적 최적화"],
    tips: [
      "배터리 사용량을 모니터링하세요",
      "배터리를 많이 사용하는 앱을 확인하세요",
      "효과적인 배터리 관리 방법을 기록하세요",
    ],
    compatibility: {
      best: ["ENFJ", "ESFJ"],
      good: ["ENTJ", "ESTJ"],
      avoid: ["ESFP"],
    },
    emoji: "🎵",
  },
  ENTJ: {
    label: "효율 배터리러",
    summary: "배터리를 즉시 충전하고 효율적으로 관리하는 지도자",
    description:
      "당신은 배터리를 즉시 충전하고 효율적으로 관리하는 스타일입니다. 배터리가 떨어지면 바로 충전하며, 배터리가 다 떨어지는 것을 싫어합니다. 배터리 관리를 계획적으로 하며, 효율적인 배터리 관리 시스템을 만듭니다.",
    traits: [
      "배터리가 떨어지면 바로 충전한다",
      "배터리가 다 떨어지는 것을 싫어한다",
      "배터리 관리를 계획적으로 한다",
      "효율적인 배터리 관리 시스템을 만든다",
      "배터리를 즉시 충전한다",
    ],
    picks: ["즉시 충전", "효율적 관리", "계획적 시스템"],
    tips: [
      "배터리가 20% 이하로 떨어지기 전에 충전하세요",
      "외출 시 충전기를 항상 챙기세요",
      "배터리 절전 모드를 활용하세요",
    ],
    compatibility: {
      best: ["ISFP", "INFP"],
      good: ["ISFJ", "ISTJ"],
      avoid: ["INTP"],
    },
    emoji: "💪",
  },
  INTJ: {
    label: "야행성 배터리러",
    summary: "자신만의 시간대에 배터리를 충전하는 전략적 사고가",
    description:
      "당신은 자신만의 시간대에 배터리를 충전하는 스타일입니다. 집중할 때는 배터리 절전 모드를 사용하며, 자신만의 시간에 충전합니다. 배터리 사용량을 분석하며, 효율적인 배터리 관리 방법을 찾습니다.",
    traits: [
      "집중할 때는 배터리 절전 모드를 사용한다",
      "자신만의 시간에 충전한다",
      "배터리 사용량을 분석한다",
      "효율적인 배터리 관리 방법을 찾는다",
      "깊이 있게 배터리를 관리한다",
    ],
    picks: ["야행성 충전", "절전 모드", "효율적 분석"],
    tips: [
      "배터리 절전 모드를 적극 활용하세요",
      "배터리 사용량을 모니터링하세요",
      "효과적인 배터리 관리 방법을 기록하세요",
    ],
    compatibility: {
      best: ["ESFP", "ENFP"],
      good: ["ESTP", "ENTP"],
      avoid: ["ESFJ"],
    },
    emoji: "🌙",
  },
  ESFJ: {
    label: "따뜻한 배터리러",
    summary: "주변 사람들의 배터리도 챙기며 함께 관리하는 배려심 많은 타입",
    description:
      "당신은 주변 사람들의 배터리도 챙기며 함께 관리하는 스타일입니다. 가족이나 친구들의 배터리를 도와주며, 함께 효율적으로 배터리를 관리합니다. 배터리가 다 떨어지지 않도록 주의하며, 주변 사람들의 기분을 고려합니다.",
    traits: [
      "주변 사람들의 배터리를 챙긴다",
      "가족이나 친구들의 배터리를 도와준다",
      "함께 효율적으로 배터리를 관리한다",
      "배터리가 다 떨어지지 않도록 주의한다",
      "주변 사람들의 기분을 고려한다",
    ],
    picks: ["함께 관리", "따뜻한 배터리", "배터리 챙기기"],
    tips: [
      "배터리가 20% 이하로 떨어지기 전에 충전하세요",
      "주변 사람들과 배터리 관리 팁을 나눠보세요",
      "외출 시 충전기를 항상 챙기세요",
    ],
    compatibility: {
      best: ["INTP", "ISTP"],
      good: ["ENTP", "ESTP"],
      avoid: ["INTJ"],
    },
    emoji: "😊",
  },
  ISFJ: {
    label: "안정 배터리러",
    summary: "규칙적으로 배터리를 충전하며 안정적으로 관리하는 수호자",
    description:
      "당신은 규칙적으로 배터리를 충전하며 안정적으로 관리하는 스타일입니다. 같은 시간에 같은 방식으로 배터리를 충전하며, 정해진 루틴을 따릅니다. 배터리가 다 떨어지지 않도록 주의하며, 안정적인 배터리 관리 방식을 선호합니다.",
    traits: [
      "같은 시간에 같은 방식으로 배터리를 충전한다",
      "정해진 루틴을 따른다",
      "안정적인 배터리 관리 방식을 선호한다",
      "배터리가 다 떨어지지 않도록 주의한다",
      "규칙적인 배터리 충전 습관이 있다",
    ],
    picks: ["규칙적 충전", "안정적 관리", "정해진 루틴"],
    tips: [
      "배터리 충전 시간을 정해두세요",
      "배터리가 20% 이하로 떨어지기 전에 충전하세요",
      "정해진 루틴을 따르세요",
    ],
    compatibility: {
      best: ["ENTP", "ENFP"],
      good: ["ESTP", "ESFP"],
      avoid: ["ENTJ"],
    },
    emoji: "🧸",
  },
  ESFP: {
    label: "즉흥 배터리러",
    summary: "배터리가 떨어지면 즉시 충전하며 활발하게 반응하는 활발한 타입",
    description:
      "당신은 배터리가 떨어지면 즉시 충전하며 활발하게 반응하는 스타일입니다. 배터리가 20% 이하로 떨어지면 바로 충전하며, 배터리가 다 떨어지는 것을 좋아하지 않습니다. 항상 충전기를 챙기며, 배터리 관리를 활발하게 합니다.",
    traits: [
      "배터리가 떨어지면 즉시 충전한다",
      "배터리가 20% 이하로 떨어지면 바로 충전한다",
      "배터리가 다 떨어지는 것을 좋아하지 않는다",
      "항상 충전기를 챙긴다",
      "배터리 관리를 활발하게 한다",
    ],
    picks: ["즉시 충전", "활발한 반응", "충전기 챙기기"],
    tips: [
      "배터리가 20% 이하로 떨어지기 전에 충전하세요",
      "외출 시 충전기를 항상 챙기세요",
      "배터리 절전 모드를 활용하세요",
    ],
    compatibility: {
      best: ["INTJ", "INFJ"],
      good: ["ISTJ", "ISFJ"],
      avoid: ["INTP"],
    },
    emoji: "🎉",
  },
  ISFP: {
    label: "조용한 배터리러",
    summary: "배터리를 최소화하고 조용히 관리하는 예술가",
    description:
      "당신은 배터리를 최소화하고 조용히 관리하는 스타일입니다. 배터리 절전 모드를 자주 사용하며, 불필요한 앱을 종료해 배터리를 절약합니다. 자신만의 시간에 여유롭게 충전하며, 배터리 관리를 조용히 합니다.",
    traits: [
      "배터리 절전 모드를 자주 사용한다",
      "불필요한 앱을 종료해 배터리를 절약한다",
      "자신만의 시간에 여유롭게 충전한다",
      "배터리를 최소화한다",
      "배터리 관리를 조용히 한다",
    ],
    picks: ["절전 모드", "배터리 최소화", "여유로운 관리"],
    tips: [
      "배터리 절전 모드를 적극 활용하세요",
      "불필요한 앱을 종료해 배터리를 절약하세요",
      "배터리 사용량을 모니터링하세요",
    ],
    compatibility: {
      best: ["ENTJ", "ESTJ"],
      good: ["ENFJ", "ESFJ"],
      avoid: ["ENTP"],
    },
    emoji: "🌿",
  },
  ESTJ: {
    label: "규칙 배터리러",
    summary: "계획대로 정확하게 배터리를 충전하며 효율적으로 관리하는 관리자",
    description:
      "당신은 계획대로 정확하게 배터리를 충전하며 효율적으로 관리하는 스타일입니다. 정확한 시간에 정확한 방식으로 배터리를 충전하며, 정해진 루틴을 체계적으로 따릅니다. 배터리 관리를 계획적으로 하며, 효율적인 배터리 관리 시스템을 만듭니다.",
    traits: [
      "정확한 시간에 정확한 방식으로 배터리를 충전한다",
      "정해진 루틴을 체계적으로 따른다",
      "효율적인 배터리 관리 시스템을 만든다",
      "배터리 관리를 계획적으로 한다",
      "계획과 실행을 중시한다",
    ],
    picks: ["정확한 충전", "체계적 관리", "효율적 시스템"],
    tips: [
      "배터리 충전 시간을 정해두세요",
      "배터리가 20% 이하로 떨어지기 전에 충전하세요",
      "정해진 루틴을 체계적으로 따르세요",
    ],
    compatibility: {
      best: ["INFP", "ISFP"],
      good: ["ENFP", "ESFP"],
      avoid: ["INTP"],
    },
    emoji: "📋",
  },
  ISTJ: {
    label: "정석 배터리러",
    summary: "늘 같은 방식으로 규칙적으로 배터리를 충전하는 신뢰할 수 있는 타입",
    description:
      "당신은 늘 같은 방식으로 규칙적으로 배터리를 충전하는 스타일입니다. 같은 시간, 같은 방식으로 배터리를 충전하며, 정해진 루틴을 꾸준히 따릅니다. 안정적인 배터리 관리 방식을 선호하며, 신뢰할 수 있는 배터리 충전 습관을 만듭니다.",
    traits: [
      "늘 같은 방식으로 배터리를 충전한다",
      "규칙적인 배터리 충전 시간을 유지한다",
      "정해진 루틴을 꾸준히 따른다",
      "안정적인 배터리 관리 방식을 선호한다",
      "신뢰할 수 있는 배터리 충전 습관을 만든다",
    ],
    picks: ["규칙적 충전", "안정적 관리", "정석 루틴"],
    tips: [
      "배터리 충전 시간을 정해두세요",
      "배터리가 20% 이하로 떨어지기 전에 충전하세요",
      "정해진 루틴을 꾸준히 따르세요",
    ],
    compatibility: {
      best: ["ENFP", "ESFP"],
      good: ["ENTP", "ESTP"],
      avoid: ["ENFJ"],
    },
    emoji: "📦",
  },
  ESTP: {
    label: "즉응 배터리러",
    summary: "배터리가 떨어지면 즉시 반응해서 충전하는 실용주의자",
    description:
      "당신은 배터리가 떨어지면 즉시 반응해서 충전하는 스타일입니다. 배터리가 20% 이하로 떨어지면 바로 충전하며, 배터리가 다 떨어지는 것을 좋아하지 않습니다. 생각보다는 행동을 중시하며, 효율적이고 실용적인 배터리 관리 방식을 선호합니다.",
    traits: [
      "배터리가 떨어지면 즉시 반응한다",
      "배터리가 20% 이하로 떨어지면 바로 충전한다",
      "배터리가 다 떨어지는 것을 좋아하지 않는다",
      "행동을 중시한다",
      "실용적인 배터리 관리 방식을 선호한다",
    ],
    picks: ["즉시 반응", "실용적 관리", "빠른 충전"],
    tips: [
      "배터리가 20% 이하로 떨어지기 전에 충전하세요",
      "외출 시 충전기를 항상 챙기세요",
      "배터리 절전 모드를 활용하세요",
    ],
    compatibility: {
      best: ["INFJ", "INTP"],
      good: ["ENFJ", "ENTP"],
      avoid: ["ISFJ"],
    },
    emoji: "⚡",
  },
  ISTP: {
    label: "실용 배터리러",
    summary: "필요할 때만 배터리를 충전하며 효율적으로 처리하는 기술자",
    description:
      "당신은 필요할 때만 배터리를 충전하며 효율적으로 처리하는 스타일입니다. 배터리 절전 모드를 자주 사용하며, 불필요한 앱을 종료해 배터리를 절약합니다. 효율적이고 실용적인 배터리 관리 방식을 선호하며, 배터리 사용량을 분석합니다.",
    traits: [
      "필요할 때만 배터리를 충전한다",
      "배터리 절전 모드를 자주 사용한다",
      "불필요한 앱을 종료해 배터리를 절약한다",
      "효율적이고 실용적인 방식을 선호한다",
      "배터리 사용량을 분석한다",
    ],
    picks: ["필요시 충전", "효율적 관리", "실용적 방식"],
    tips: [
      "배터리 절전 모드를 적극 활용하세요",
      "불필요한 앱을 종료해 배터리를 절약하세요",
      "배터리 사용량을 모니터링하세요",
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
  const mbtiType = (searchParams.get("type") as keyof typeof batteryTypes) || "ENFP"
  const resultId = searchParams.get("id") || undefined
  const character = batteryTypes[mbtiType]
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
                  className="mb-4 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
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
                  testId="phone-battery"
                  testPath="/tests/phone-battery/test"
                  resultType={mbtiType}
                  resultId={loadedResult?.id || resultId}
                  title={`나는 🔋 ${character.label}(${mbtiType})! 너는 어떤 배터리러야?`}
                  description={character.summary}
                />
                <Button variant="outline" size="lg" asChild>
                  <Link href="/tests/phone-battery/test">
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
              <span>🔋</span>
              <span>당신의 배터리 특징</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.traits.map((trait, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950 rounded-lg"
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
              <span>⚡</span>
              <span>추천 배터리 스타일</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.picks.map((pick, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950 rounded-lg"
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
              <span>배터리 팁</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3">
              {character.tips.map((tip, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="text-yellow-500 font-bold">{index + 1}.</span>
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
              <Sparkles className="h-6 w-6 text-orange-500" />
              <span>다른 재미있는 테스트도 해보세요!</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  slug: "phone-notification",
                  title: "알림 대하는 방식",
                  emoji: "🔔",
                  description: "알림 대하는 방식으로 알아보는 성격",
                  participants: "0",
                },
                {
                  slug: "weekend-balance",
                  title: "주말 균형",
                  emoji: "⚖️",
                  description: "주말 균형잡기로 알아보는 성격",
                  participants: "0",
                },
                {
                  slug: "weekend-rest",
                  title: "주말 충전",
                  emoji: "🌙",
                  description: "주말 충전 방식으로 알아보는 성격",
                  participants: "0",
                },
                {
                  slug: "weekend-travel",
                  title: "주말 여행",
                  emoji: "✈️",
                  description: "주말 여행 스타일로 알아보는 성격",
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
              className="border-2 border-yellow-300 hover:bg-yellow-50 font-medium py-6 px-8 bg-transparent"
            >
              다른 테스트하기
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default function PhoneBatteryResult() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  )
}


