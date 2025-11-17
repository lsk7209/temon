"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, Bell, Sparkles } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { ShareButtons } from "@/components/share-buttons"
import { getTestResult } from "@/lib/api-client"

const notificationTypes = {
  ENFP: {
    label: "즉흥 알림러",
    summary: "알림이 오면 즉시 확인하는 활발한 타입",
    description:
      "당신은 알림이 올 때 즉시 확인하는 스타일입니다. 알림 소리에 반응하며 바로 확인하고, 읽지 않은 알림이 쌓이는 것을 좋아하지 않습니다. 다양한 앱의 알림을 활발하게 확인하며, 주변 사람들과 알림 내용을 공유하는 것을 즐깁니다.",
    traits: [
      "알림이 오면 즉시 확인한다",
      "읽지 않은 알림이 쌓이는 것을 싫어한다",
      "다양한 앱의 알림을 활발하게 확인한다",
      "주변 사람들과 알림 내용을 공유한다",
      "알림 소리에 민감하게 반응한다",
    ],
    picks: ["즉시 확인", "알림 공유", "활발한 알림 체크"],
    tips: [
      "중요한 알림만 즉시 확인하도록 설정하세요",
      "불필요한 알림은 끄고 중요한 알림만 받으세요",
      "알림 확인 시간을 정해두는 것도 좋습니다",
    ],
    compatibility: {
      best: ["ISTJ", "ISFJ"],
      good: ["ESTJ", "ESFJ"],
      avoid: ["INTJ"],
    },
    emoji: "🌅",
  },
  INFP: {
    label: "여유 알림러",
    summary: "알림을 나중에 확인하는 조용한 타입",
    description:
      "당신은 알림이 와도 즉시 확인하지 않고 나중에 확인하는 스타일입니다. 알림 소리에 방해받지 않고 집중할 수 있도록 조용한 모드를 자주 사용합니다. 읽지 않은 알림이 쌓여도 불편하지 않으며, 자신만의 시간에 여유롭게 확인합니다.",
    traits: [
      "알림이 와도 즉시 확인하지 않는다",
      "조용한 모드를 자주 사용한다",
      "읽지 않은 알림이 쌓여도 불편하지 않다",
      "자신만의 시간에 여유롭게 확인한다",
      "알림 소리에 방해받지 않는다",
    ],
    picks: ["조용한 모드", "나중에 확인", "여유로운 알림 체크"],
    tips: [
      "중요한 알림만 켜두고 나머지는 끄세요",
      "알림 확인 시간을 정해두는 것도 좋습니다",
      "방해 금지 모드를 적극 활용하세요",
    ],
    compatibility: {
      best: ["ENTJ", "ESTJ"],
      good: ["ENFJ", "ESFJ"],
      avoid: ["ESTP"],
    },
    emoji: "😴",
  },
  ENFJ: {
    label: "시간관리 알림러",
    summary: "정해진 시간에 알림을 확인하는 계획적인 타입",
    description:
      "당신은 알림을 정해진 시간에 확인하는 스타일입니다. 알림 확인 시간을 정해두고 그 시간에만 확인하며, 중요한 알림과 불필요한 알림을 구분합니다. 주변 사람들의 알림도 챙기며, 함께 효율적으로 알림을 관리합니다.",
    traits: [
      "정해진 시간에 알림을 확인한다",
      "알림 확인 시간을 정해둔다",
      "중요한 알림과 불필요한 알림을 구분한다",
      "주변 사람들의 알림도 챙긴다",
      "효율적으로 알림을 관리한다",
    ],
    picks: ["정해진 시간 확인", "알림 분류", "효율적인 알림 관리"],
    tips: [
      "알림 확인 시간을 정해두세요",
      "중요한 알림만 켜두고 나머지는 끄세요",
      "알림을 카테고리별로 분류하세요",
    ],
    compatibility: {
      best: ["INTP", "ISTP"],
      good: ["ISFP", "INFP"],
      avoid: ["ISTJ"],
    },
    emoji: "⏰",
  },
  INFJ: {
    label: "명상 알림러",
    summary: "알림을 최소화하고 집중하는 전략가",
    description:
      "당신은 알림을 최소화하고 집중하는 스타일입니다. 불필요한 알림은 모두 끄고, 정말 중요한 알림만 받습니다. 알림 소리에 방해받지 않고 깊이 있게 집중하며, 자신만의 시간을 소중히 여깁니다.",
    traits: [
      "불필요한 알림은 모두 끈다",
      "정말 중요한 알림만 받는다",
      "알림 소리에 방해받지 않는다",
      "깊이 있게 집중한다",
      "자신만의 시간을 소중히 여긴다",
    ],
    picks: ["알림 최소화", "집중 모드", "중요 알림만"],
    tips: [
      "불필요한 앱의 알림은 모두 끄세요",
      "방해 금지 모드를 적극 활용하세요",
      "정말 중요한 알림만 켜두세요",
    ],
    compatibility: {
      best: ["ENFP", "ESFP"],
      good: ["ENTP", "ESTP"],
      avoid: ["ESTJ"],
    },
    emoji: "🧘",
  },
  ENTP: {
    label: "혁신 알림러",
    summary: "알림 설정을 자주 바꾸며 실험하는 혁신가",
    description:
      "당신은 알림 설정을 자주 바꾸며 실험하는 스타일입니다. 새로운 알림 기능을 시도하고, 다양한 알림 앱을 사용하며, 최적의 알림 방식을 찾기 위해 계속 실험합니다. 효율성과 재미를 동시에 추구합니다.",
    traits: [
      "알림 설정을 자주 바꾼다",
      "새로운 알림 기능을 시도한다",
      "다양한 알림 앱을 사용한다",
      "최적의 알림 방식을 찾기 위해 실험한다",
      "효율성과 재미를 동시에 추구한다",
    ],
    picks: ["알림 실험", "새로운 기능", "알림 앱 활용"],
    tips: [
      "새로운 알림 기능을 시도해보세요",
      "효과적인 알림 방식을 기록해두세요",
      "알림 앱을 활용해 효율적으로 관리하세요",
    ],
    compatibility: {
      best: ["ISFJ", "ISTJ"],
      good: ["ESFJ", "ESTJ"],
      avoid: ["ISFP"],
    },
    emoji: "📱",
  },
  INTP: {
    label: "분석 알림러",
    summary: "알림을 체계적으로 분석하고 최적화하는 분석가",
    description:
      "당신은 알림을 체계적으로 분석하고 최적화하는 스타일입니다. 어떤 알림이 중요한지, 어떤 알림이 불필요한지 논리적으로 분석하며, 자신에게 가장 효과적인 알림 방식을 찾습니다. 알림 데이터를 분석하고 효율성을 중시합니다.",
    traits: [
      "알림을 체계적으로 분석한다",
      "논리적으로 알림을 분류한다",
      "효과적인 알림 방식을 찾는다",
      "알림 데이터를 분석한다",
      "효율성을 중시한다",
    ],
    picks: ["알림 분석", "논리적 분류", "효율적 최적화"],
    tips: [
      "알림을 카테고리별로 분류하세요",
      "불필요한 알림은 끄고 중요한 알림만 받으세요",
      "알림 확인 패턴을 분석해 최적화하세요",
    ],
    compatibility: {
      best: ["ENFJ", "ESFJ"],
      good: ["ENTJ", "ESTJ"],
      avoid: ["ESFP"],
    },
    emoji: "🎵",
  },
  ENTJ: {
    label: "효율 알림러",
    summary: "알림을 즉시 처리하고 효율적으로 관리하는 지도자",
    description:
      "당신은 알림을 즉시 처리하고 효율적으로 관리하는 스타일입니다. 알림이 오면 바로 확인하고 처리하며, 읽지 않은 알림이 쌓이는 것을 싫어합니다. 중요한 알림과 불필요한 알림을 명확히 구분하며, 효율적인 알림 관리 시스템을 만듭니다.",
    traits: [
      "알림이 오면 바로 확인하고 처리한다",
      "읽지 않은 알림이 쌓이는 것을 싫어한다",
      "중요한 알림과 불필요한 알림을 명확히 구분한다",
      "효율적인 알림 관리 시스템을 만든다",
      "알림을 즉시 처리한다",
    ],
    picks: ["즉시 처리", "효율적 관리", "명확한 구분"],
    tips: [
      "중요한 알림만 켜두고 나머지는 끄세요",
      "알림을 즉시 처리하는 습관을 기르세요",
      "알림 확인 시간을 정해두는 것도 좋습니다",
    ],
    compatibility: {
      best: ["ISFP", "INFP"],
      good: ["ISFJ", "ISTJ"],
      avoid: ["INTP"],
    },
    emoji: "💪",
  },
  INTJ: {
    label: "야행성 알림러",
    summary: "자신만의 시간대에 알림을 확인하는 전략적 사고가",
    description:
      "당신은 자신만의 시간대에 알림을 확인하는 스타일입니다. 집중할 때는 알림을 모두 끄고, 자신만의 시간에 알림을 확인합니다. 불필요한 알림은 모두 끄고, 정말 중요한 알림만 받으며, 깊이 있게 집중합니다.",
    traits: [
      "집중할 때는 알림을 모두 끈다",
      "자신만의 시간에 알림을 확인한다",
      "불필요한 알림은 모두 끈다",
      "정말 중요한 알림만 받는다",
      "깊이 있게 집중한다",
    ],
    picks: ["집중 모드", "야행성 확인", "중요 알림만"],
    tips: [
      "집중할 때는 방해 금지 모드를 사용하세요",
      "불필요한 앱의 알림은 모두 끄세요",
      "정말 중요한 알림만 켜두세요",
    ],
    compatibility: {
      best: ["ESFP", "ENFP"],
      good: ["ESTP", "ENTP"],
      avoid: ["ESFJ"],
    },
    emoji: "🌙",
  },
  ESFJ: {
    label: "따뜻한 알림러",
    summary: "주변 사람들의 알림도 챙기며 함께 관리하는 배려심 많은 타입",
    description:
      "당신은 주변 사람들의 알림도 챙기며 함께 관리하는 스타일입니다. 가족이나 친구들의 알림을 도와주며, 함께 효율적으로 알림을 관리합니다. 중요한 알림을 놓치지 않도록 주의하며, 주변 사람들의 기분을 고려합니다.",
    traits: [
      "주변 사람들의 알림을 챙긴다",
      "가족이나 친구들의 알림을 도와준다",
      "함께 효율적으로 알림을 관리한다",
      "중요한 알림을 놓치지 않도록 주의한다",
      "주변 사람들의 기분을 고려한다",
    ],
    picks: ["함께 관리", "따뜻한 알림", "중요 알림 챙기기"],
    tips: [
      "중요한 알림만 켜두고 나머지는 끄세요",
      "주변 사람들과 알림 관리 팁을 나눠보세요",
      "알림 확인 시간을 정해두는 것도 좋습니다",
    ],
    compatibility: {
      best: ["INTP", "ISTP"],
      good: ["ENTP", "ESTP"],
      avoid: ["INTJ"],
    },
    emoji: "😊",
  },
  ISFJ: {
    label: "안정 알림러",
    summary: "규칙적으로 알림을 확인하며 안정적으로 관리하는 수호자",
    description:
      "당신은 규칙적으로 알림을 확인하며 안정적으로 관리하는 스타일입니다. 같은 시간에 같은 방식으로 알림을 확인하며, 정해진 루틴을 따릅니다. 중요한 알림을 놓치지 않도록 주의하며, 안정적인 알림 관리 방식을 선호합니다.",
    traits: [
      "같은 시간에 같은 방식으로 알림을 확인한다",
      "정해진 루틴을 따른다",
      "안정적인 알림 관리 방식을 선호한다",
      "중요한 알림을 놓치지 않도록 주의한다",
      "규칙적인 알림 확인 습관이 있다",
    ],
    picks: ["규칙적 확인", "안정적 관리", "정해진 루틴"],
    tips: [
      "알림 확인 시간을 정해두세요",
      "중요한 알림만 켜두고 나머지는 끄세요",
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
    label: "즉흥 알림러",
    summary: "알림이 오면 즉시 확인하며 활발하게 반응하는 활발한 타입",
    description:
      "당신은 알림이 오면 즉시 확인하며 활발하게 반응하는 스타일입니다. 알림 소리에 민감하게 반응하며, 바로 확인하고 처리합니다. 다양한 앱의 알림을 활발하게 확인하며, 주변 사람들과 알림 내용을 공유하는 것을 즐깁니다.",
    traits: [
      "알림이 오면 즉시 확인한다",
      "알림 소리에 민감하게 반응한다",
      "바로 확인하고 처리한다",
      "다양한 앱의 알림을 활발하게 확인한다",
      "주변 사람들과 알림 내용을 공유한다",
    ],
    picks: ["즉시 확인", "활발한 반응", "알림 공유"],
    tips: [
      "중요한 알림만 즉시 확인하도록 설정하세요",
      "불필요한 알림은 끄고 중요한 알림만 받으세요",
      "알림 확인 시간을 정해두는 것도 좋습니다",
    ],
    compatibility: {
      best: ["INTJ", "INFJ"],
      good: ["ISTJ", "ISFJ"],
      avoid: ["INTP"],
    },
    emoji: "🎉",
  },
  ISFP: {
    label: "조용한 알림러",
    summary: "알림을 최소화하고 조용히 확인하는 예술가",
    description:
      "당신은 알림을 최소화하고 조용히 확인하는 스타일입니다. 알림 소리에 방해받지 않고 집중할 수 있도록 조용한 모드를 자주 사용하며, 자신만의 시간에 여유롭게 확인합니다. 불필요한 알림은 모두 끄고, 정말 중요한 알림만 받습니다.",
    traits: [
      "알림을 최소화한다",
      "조용한 모드를 자주 사용한다",
      "자신만의 시간에 여유롭게 확인한다",
      "불필요한 알림은 모두 끈다",
      "정말 중요한 알림만 받는다",
    ],
    picks: ["알림 최소화", "조용한 모드", "여유로운 확인"],
    tips: [
      "불필요한 앱의 알림은 모두 끄세요",
      "방해 금지 모드를 적극 활용하세요",
      "정말 중요한 알림만 켜두세요",
    ],
    compatibility: {
      best: ["ENTJ", "ESTJ"],
      good: ["ENFJ", "ESFJ"],
      avoid: ["ENTP"],
    },
    emoji: "🌿",
  },
  ESTJ: {
    label: "규칙 알림러",
    summary: "계획대로 정확하게 알림을 확인하며 효율적으로 관리하는 관리자",
    description:
      "당신은 계획대로 정확하게 알림을 확인하며 효율적으로 관리하는 스타일입니다. 정확한 시간에 정확한 방식으로 알림을 확인하며, 정해진 루틴을 체계적으로 따릅니다. 중요한 알림과 불필요한 알림을 명확히 구분하며, 효율적인 알림 관리 시스템을 만듭니다.",
    traits: [
      "정확한 시간에 정확한 방식으로 알림을 확인한다",
      "정해진 루틴을 체계적으로 따른다",
      "효율적인 알림 관리 시스템을 만든다",
      "중요한 알림과 불필요한 알림을 명확히 구분한다",
      "계획과 실행을 중시한다",
    ],
    picks: ["정확한 확인", "체계적 관리", "효율적 시스템"],
    tips: [
      "알림 확인 시간을 정해두세요",
      "중요한 알림만 켜두고 나머지는 끄세요",
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
    label: "정석 알림러",
    summary: "늘 같은 방식으로 규칙적으로 알림을 확인하는 신뢰할 수 있는 타입",
    description:
      "당신은 늘 같은 방식으로 규칙적으로 알림을 확인하는 스타일입니다. 같은 시간, 같은 방식으로 알림을 확인하며, 정해진 루틴을 꾸준히 따릅니다. 안정적인 알림 관리 방식을 선호하며, 신뢰할 수 있는 알림 확인 습관을 만듭니다.",
    traits: [
      "늘 같은 방식으로 알림을 확인한다",
      "규칙적인 알림 확인 시간을 유지한다",
      "정해진 루틴을 꾸준히 따른다",
      "안정적인 알림 관리 방식을 선호한다",
      "신뢰할 수 있는 알림 확인 습관을 만든다",
    ],
    picks: ["규칙적 확인", "안정적 관리", "정석 루틴"],
    tips: [
      "알림 확인 시간을 정해두세요",
      "중요한 알림만 켜두고 나머지는 끄세요",
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
    label: "즉응 알림러",
    summary: "알림이 오면 즉시 반응해서 처리하는 실용주의자",
    description:
      "당신은 알림이 오면 즉시 반응해서 처리하는 스타일입니다. 알림 소리에 민감하게 반응하며, 바로 확인하고 처리합니다. 생각보다는 행동을 중시하며, 효율적이고 실용적인 알림 관리 방식을 선호합니다.",
    traits: [
      "알림이 오면 즉시 반응한다",
      "알림 소리에 민감하게 반응한다",
      "바로 확인하고 처리한다",
      "행동을 중시한다",
      "실용적인 알림 관리 방식을 선호한다",
    ],
    picks: ["즉시 반응", "실용적 관리", "빠른 처리"],
    tips: [
      "중요한 알림만 즉시 확인하도록 설정하세요",
      "불필요한 알림은 끄고 중요한 알림만 받으세요",
      "알림 확인 시간을 정해두는 것도 좋습니다",
    ],
    compatibility: {
      best: ["INFJ", "INTP"],
      good: ["ENFJ", "ENTP"],
      avoid: ["ISFJ"],
    },
    emoji: "⚡",
  },
  ISTP: {
    label: "실용 알림러",
    summary: "필요할 때만 알림을 확인하며 효율적으로 처리하는 기술자",
    description:
      "당신은 필요할 때만 알림을 확인하며 효율적으로 처리하는 스타일입니다. 불필요한 알림은 모두 끄고, 정말 중요한 알림만 받습니다. 알림 소리에 방해받지 않고 집중하며, 효율적이고 실용적인 알림 관리 방식을 선호합니다.",
    traits: [
      "필요할 때만 알림을 확인한다",
      "불필요한 알림은 모두 끈다",
      "정말 중요한 알림만 받는다",
      "알림 소리에 방해받지 않는다",
      "효율적이고 실용적인 방식을 선호한다",
    ],
    picks: ["필요시 확인", "효율적 관리", "실용적 방식"],
    tips: [
      "불필요한 앱의 알림은 모두 끄세요",
      "방해 금지 모드를 적극 활용하세요",
      "정말 중요한 알림만 켜두세요",
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
  const mbtiType = (searchParams.get("type") as keyof typeof notificationTypes) || "ENFP"
  const resultId = searchParams.get("id") || undefined
  const character = notificationTypes[mbtiType]
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
                  className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
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
                  testId="phone-notification"
                  testPath="/tests/phone-notification/test"
                  resultType={mbtiType}
                  resultId={loadedResult?.id || resultId}
                  title={`나는 🔔 ${character.label}(${mbtiType})! 너는 어떤 알림러야?`}
                  description={character.summary}
                />
                <Button variant="outline" size="lg" asChild>
                  <Link href="/tests/phone-notification/test">
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
              <span>🔔</span>
              <span>당신의 알림 특징</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.traits.map((trait, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 rounded-lg"
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
              <span>📱</span>
              <span>추천 알림 스타일</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.picks.map((pick, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 rounded-lg"
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
              <span>알림 팁</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3">
              {character.tips.map((tip, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="text-blue-500 font-bold">{index + 1}.</span>
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
              <Sparkles className="h-6 w-6 text-cyan-500" />
              <span>다른 재미있는 테스트도 해보세요!</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
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
                {
                  slug: "weekend-food",
                  title: "주말 음식",
                  emoji: "🍕",
                  description: "주말 음식 선택으로 알아보는 성격",
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
              className="border-2 border-blue-300 hover:bg-blue-50 font-medium py-6 px-8 bg-transparent"
            >
              다른 테스트하기
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default function PhoneNotificationResult() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  )
}


