"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, Camera, Sparkles } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { ShareButtons } from "@/components/share-buttons"
import { getTestResult } from "@/lib/api-client"

const photoTypes = {
  ENFP: {
    label: "즉흥 사진러",
    summary: "예쁜 것을 보면 즉시 사진을 찍는 활발한 타입",
    description:
      "당신은 예쁜 것을 보면 즉시 사진을 찍는 스타일입니다. 카페에서 예쁜 음료를 받으면 바로 찍고, 맛집에서 음식을 받으면 즉시 사진을 남깁니다. 친구들과 함께 사진을 찍는 것을 좋아하며, 다양한 각도와 필터를 시도합니다.",
    traits: [
      "예쁜 것을 보면 즉시 사진을 찍는다",
      "카페 음료를 받으면 바로 찍는다",
      "친구들과 함께 사진을 찍는다",
      "다양한 각도와 필터를 시도한다",
      "사진을 활발하게 찍는다",
    ],
    picks: ["즉시 촬영", "활발한 사진", "다양한 필터"],
    tips: [
      "사진을 찍기 전에 구도를 생각해보세요",
      "여러 각도로 찍어보세요",
      "필터를 적절히 활용하세요",
    ],
    compatibility: {
      best: ["ISTJ", "ISFJ"],
      good: ["ESTJ", "ESFJ"],
      avoid: ["INTJ"],
    },
    emoji: "🌅",
  },
  INFP: {
    label: "여유 사진러",
    summary: "사진을 나중에 찍는 조용한 타입",
    description:
      "당신은 사진을 나중에 찍는 스타일입니다. 예쁜 것을 봐도 즉시 찍지 않고, 먹다가 나중에 찍거나 여유롭게 찍습니다. 혼자 조용히 사진을 찍는 것을 좋아하며, 자신만의 감각으로 사진을 남깁니다.",
    traits: [
      "예쁜 것을 봐도 즉시 찍지 않는다",
      "먹다가 나중에 찍는다",
      "혼자 조용히 사진을 찍는다",
      "자신만의 감각으로 사진을 남긴다",
      "사진을 여유롭게 찍는다",
    ],
    picks: ["나중에 촬영", "여유로운 사진", "조용한 촬영"],
    tips: [
      "사진을 찍기 전에 구도를 생각해보세요",
      "자신만의 스타일을 찾아보세요",
      "필터를 적절히 활용하세요",
    ],
    compatibility: {
      best: ["ENTJ", "ESTJ"],
      good: ["ENFJ", "ESFJ"],
      avoid: ["ESTP"],
    },
    emoji: "😴",
  },
  ENFJ: {
    label: "시간관리 사진러",
    summary: "정해진 시간에 사진을 찍는 계획적인 타입",
    description:
      "당신은 정해진 시간에 사진을 찍는 스타일입니다. 일출을 보러 갔을 때 정해진 시간에 찍고, 여행지에서 계획한 장소만 찍습니다. 친구들과 함께 사진을 찍으며, 효율적으로 사진을 남깁니다.",
    traits: [
      "정해진 시간에 사진을 찍는다",
      "일출을 보러 갔을 때 정해진 시간에 찍는다",
      "계획한 장소만 찍는다",
      "친구들과 함께 사진을 찍는다",
      "효율적으로 사진을 남긴다",
    ],
    picks: ["정해진 시간 촬영", "계획적 촬영", "효율적인 사진"],
    tips: [
      "사진 촬영 계획을 세워보세요",
      "여러 각도로 찍어보세요",
      "필터를 적절히 활용하세요",
    ],
    compatibility: {
      best: ["INTP", "ISTP"],
      good: ["ISFP", "INFP"],
      avoid: ["ISTJ"],
    },
    emoji: "⏰",
  },
  INFJ: {
    label: "명상 사진러",
    summary: "사진을 최소화하고 깔끔하게 찍는 전략가",
    description:
      "당신은 사진을 최소화하고 깔끔하게 찍는 스타일입니다. 불필요한 사진은 찍지 않으며, 정말 필요한 순간만 남깁니다. 혼자 조용히 사진을 찍으며, 자신만의 감각으로 사진을 남깁니다.",
    traits: [
      "불필요한 사진은 찍지 않는다",
      "정말 필요한 순간만 남긴다",
      "혼자 조용히 사진을 찍는다",
      "자신만의 감각으로 사진을 남긴다",
      "사진을 최소화한다",
    ],
    picks: ["최소화 촬영", "깔끔한 사진", "필요한 순간만"],
    tips: [
      "사진을 찍기 전에 구도를 생각해보세요",
      "자신만의 스타일을 찾아보세요",
      "필터를 적절히 활용하세요",
    ],
    compatibility: {
      best: ["ENFP", "ESFP"],
      good: ["ENTP", "ESTP"],
      avoid: ["ESTJ"],
    },
    emoji: "🧘",
  },
  ENTP: {
    label: "혁신 사진러",
    summary: "사진 찍는 방법을 자주 바꾸며 실험하는 혁신가",
    description:
      "당신은 사진 찍는 방법을 자주 바꾸며 실험하는 스타일입니다. 새로운 필터를 발견하면 바로 시도하고, 다양한 각도와 구도를 실험합니다. 효율성과 재미를 동시에 추구하며, 최적의 사진을 찾기 위해 계속 실험합니다.",
    traits: [
      "사진 찍는 방법을 자주 바꾼다",
      "새로운 필터를 발견하면 바로 시도한다",
      "다양한 각도와 구도를 실험한다",
      "최적의 사진을 찾기 위해 실험한다",
      "효율성과 재미를 동시에 추구한다",
    ],
    picks: ["사진 실험", "새로운 필터", "다양한 각도"],
    tips: [
      "새로운 사진 찍는 방법을 시도해보세요",
      "효과적인 사진 촬영 방법을 기록해두세요",
      "여러 각도로 찍어보세요",
    ],
    compatibility: {
      best: ["ISFJ", "ISTJ"],
      good: ["ESFJ", "ESTJ"],
      avoid: ["ISFP"],
    },
    emoji: "📱",
  },
  INTP: {
    label: "분석 사진러",
    summary: "사진을 체계적으로 분석하고 최적화하는 분석가",
    description:
      "당신은 사진을 체계적으로 분석하고 최적화하는 스타일입니다. 사진 촬영 전에 리뷰를 보고 신중하게 선택하며, 어떤 각도가 좋은지 논리적으로 파악합니다. 자신에게 가장 효과적인 사진 촬영 방법을 찾으며, 효율성을 중시합니다.",
    traits: [
      "사진 촬영 전에 리뷰를 본다",
      "어떤 각도가 좋은지 파악한다",
      "효과적인 사진 촬영 방법을 찾는다",
      "사진을 체계적으로 최적화한다",
      "효율성을 중시한다",
    ],
    picks: ["사진 분석", "리뷰 확인", "효율적 최적화"],
    tips: [
      "사진 촬영 전에 리뷰를 확인하세요",
      "효과적인 사진 촬영 방법을 기록하세요",
      "여러 각도로 찍어보세요",
    ],
    compatibility: {
      best: ["ENFJ", "ESFJ"],
      good: ["ENTJ", "ESTJ"],
      avoid: ["ESFP"],
    },
    emoji: "🎵",
  },
  ENTJ: {
    label: "효율 사진러",
    summary: "사진을 즉시 찍고 효율적으로 관리하는 지도자",
    description:
      "당신은 사진을 즉시 찍고 효율적으로 관리하는 스타일입니다. 예쁜 것을 보면 바로 찍고, 사진을 찍은 후 즉시 다음 장소로 이동합니다. 사진 촬영을 계획적으로 하며, 효율적인 사진 관리 시스템을 만듭니다.",
    traits: [
      "예쁜 것을 보면 바로 찍는다",
      "사진을 찍은 후 즉시 다음 장소로 이동한다",
      "사진 촬영을 계획적으로 한다",
      "효율적인 사진 관리 시스템을 만든다",
      "사진을 즉시 찍는다",
    ],
    picks: ["즉시 촬영", "효율적 관리", "계획적 시스템"],
    tips: [
      "사진 촬영 계획을 세워보세요",
      "여러 각도로 찍어보세요",
      "필터를 적절히 활용하세요",
    ],
    compatibility: {
      best: ["ISFP", "INFP"],
      good: ["ISFJ", "ISTJ"],
      avoid: ["INTP"],
    },
    emoji: "💪",
  },
  INTJ: {
    label: "야행성 사진러",
    summary: "자신만의 시간대에 사진을 찍는 전략적 사고가",
    description:
      "당신은 자신만의 시간대에 사진을 찍는 스타일입니다. 집중할 때는 사진을 찍지 않고, 자신만의 시간에 찍습니다. 사진 촬영 전에 리뷰를 보고 신중하게 선택하며, 효율적인 사진 촬영 방법을 찾습니다.",
    traits: [
      "집중할 때는 사진을 찍지 않는다",
      "자신만의 시간에 찍는다",
      "사진 촬영 전에 리뷰를 본다",
      "효율적인 사진 촬영 방법을 찾는다",
      "깊이 있게 사진을 찍는다",
    ],
    picks: ["야행성 촬영", "효율적 분석", "전략적 촬영"],
    tips: [
      "사진 촬영 전에 리뷰를 확인하세요",
      "효과적인 사진 촬영 방법을 기록하세요",
      "여러 각도로 찍어보세요",
    ],
    compatibility: {
      best: ["ESFP", "ENFP"],
      good: ["ESTP", "ENTP"],
      avoid: ["ESFJ"],
    },
    emoji: "🌙",
  },
  ESFJ: {
    label: "따뜻한 사진러",
    summary: "주변 사람들과 함께 사진을 찍으며 즐기는 배려심 많은 타입",
    description:
      "당신은 주변 사람들과 함께 사진을 찍으며 즐기는 스타일입니다. 친구들과 단체 사진을 찍을 때 재미있게 여러 장 찍고, 함께 사진을 공유합니다. 사진을 통해 추억을 남기며, 주변 사람들의 기분을 고려합니다.",
    traits: [
      "친구들과 함께 사진을 찍는다",
      "단체 사진을 재미있게 여러 장 찍는다",
      "함께 사진을 공유한다",
      "사진을 통해 추억을 남긴다",
      "주변 사람들의 기분을 고려한다",
    ],
    picks: ["함께 촬영", "따뜻한 사진", "추억 남기기"],
    tips: [
      "친구들과 함께 사진을 찍어보세요",
      "여러 각도로 찍어보세요",
      "필터를 적절히 활용하세요",
    ],
    compatibility: {
      best: ["INTP", "ISTP"],
      good: ["ENTP", "ESTP"],
      avoid: ["INTJ"],
    },
    emoji: "😊",
  },
  ISFJ: {
    label: "안정 사진러",
    summary: "규칙적으로 사진을 찍으며 안정적으로 관리하는 수호자",
    description:
      "당신은 규칙적으로 사진을 찍으며 안정적으로 관리하는 스타일입니다. 같은 시간에 같은 방식으로 사진을 찍으며, 정해진 루틴을 따릅니다. 사진을 찍기 전에 구도를 생각하며, 안정적인 사진 촬영 방식을 선호합니다.",
    traits: [
      "같은 시간에 같은 방식으로 사진을 찍는다",
      "정해진 루틴을 따른다",
      "안정적인 사진 촬영 방식을 선호한다",
      "사진을 찍기 전에 구도를 생각한다",
      "규칙적인 사진 촬영 습관이 있다",
    ],
    picks: ["규칙적 촬영", "안정적 관리", "정해진 루틴"],
    tips: [
      "사진 촬영 계획을 세워보세요",
      "정해진 루틴을 따르세요",
      "여러 각도로 찍어보세요",
    ],
    compatibility: {
      best: ["ENTP", "ENFP"],
      good: ["ESTP", "ESFP"],
      avoid: ["ENTJ"],
    },
    emoji: "🧸",
  },
  ESFP: {
    label: "즉흥 사진러",
    summary: "예쁜 것을 보면 즉시 반응해서 찍는 활발한 타입",
    description:
      "당신은 예쁜 것을 보면 즉시 반응해서 찍는 스타일입니다. 카페에서 예쁜 음료를 받으면 바로 찍고, 맛집에서 음식을 받으면 즉시 사진을 남깁니다. 친구들과 함께 사진을 찍으며, 다양한 각도와 필터를 시도합니다.",
    traits: [
      "예쁜 것을 보면 즉시 반응한다",
      "카페 음료를 받으면 바로 찍는다",
      "친구들과 함께 사진을 찍는다",
      "다양한 각도와 필터를 시도한다",
      "사진을 활발하게 찍는다",
    ],
    picks: ["즉시 반응", "활발한 촬영", "다양한 필터"],
    tips: [
      "사진을 찍기 전에 구도를 생각해보세요",
      "여러 각도로 찍어보세요",
      "필터를 적절히 활용하세요",
    ],
    compatibility: {
      best: ["INTJ", "INFJ"],
      good: ["ISTJ", "ISFJ"],
      avoid: ["INTP"],
    },
    emoji: "🎉",
  },
  ISFP: {
    label: "조용한 사진러",
    summary: "사진을 최소화하고 조용히 찍는 예술가",
    description:
      "당신은 사진을 최소화하고 조용히 찍는 스타일입니다. 불필요한 사진은 찍지 않으며, 정말 필요한 순간만 남깁니다. 자신만의 시간에 여유롭게 찍으며, 자신만의 감각으로 사진을 남깁니다.",
    traits: [
      "불필요한 사진은 찍지 않는다",
      "정말 필요한 순간만 남긴다",
      "자신만의 시간에 여유롭게 찍는다",
      "사진을 최소화한다",
      "자신만의 감각으로 사진을 남긴다",
    ],
    picks: ["사진 최소화", "조용한 촬영", "여유로운 촬영"],
    tips: [
      "사진을 찍기 전에 구도를 생각해보세요",
      "자신만의 스타일을 찾아보세요",
      "필터를 적절히 활용하세요",
    ],
    compatibility: {
      best: ["ENTJ", "ESTJ"],
      good: ["ENFJ", "ESFJ"],
      avoid: ["ENTP"],
    },
    emoji: "🌿",
  },
  ESTJ: {
    label: "규칙 사진러",
    summary: "계획대로 정확하게 사진을 찍으며 효율적으로 관리하는 관리자",
    description:
      "당신은 계획대로 정확하게 사진을 찍으며 효율적으로 관리하는 스타일입니다. 정확한 시간에 정확한 방식으로 사진을 찍으며, 정해진 루틴을 체계적으로 따릅니다. 사진 촬영을 계획적으로 하며, 효율적인 사진 관리 시스템을 만듭니다.",
    traits: [
      "정확한 시간에 정확한 방식으로 사진을 찍는다",
      "정해진 루틴을 체계적으로 따른다",
      "효율적인 사진 관리 시스템을 만든다",
      "사진 촬영을 계획적으로 한다",
      "계획과 실행을 중시한다",
    ],
    picks: ["정확한 촬영", "체계적 관리", "효율적 시스템"],
    tips: [
      "사진 촬영 계획을 세워보세요",
      "정해진 루틴을 체계적으로 따르세요",
      "여러 각도로 찍어보세요",
    ],
    compatibility: {
      best: ["INFP", "ISFP"],
      good: ["ENFP", "ESFP"],
      avoid: ["INTP"],
    },
    emoji: "📋",
  },
  ISTJ: {
    label: "정석 사진러",
    summary: "늘 같은 방식으로 규칙적으로 사진을 찍는 신뢰할 수 있는 타입",
    description:
      "당신은 늘 같은 방식으로 규칙적으로 사진을 찍는 스타일입니다. 같은 시간, 같은 방식으로 사진을 찍으며, 정해진 루틴을 꾸준히 따릅니다. 안정적인 사진 촬영 방식을 선호하며, 신뢰할 수 있는 사진 촬영 습관을 만듭니다.",
    traits: [
      "늘 같은 방식으로 사진을 찍는다",
      "규칙적인 사진 촬영 시간을 유지한다",
      "정해진 루틴을 꾸준히 따른다",
      "안정적인 사진 촬영 방식을 선호한다",
      "신뢰할 수 있는 사진 촬영 습관을 만든다",
    ],
    picks: ["규칙적 촬영", "안정적 관리", "정석 루틴"],
    tips: [
      "사진 촬영 계획을 세워보세요",
      "정해진 루틴을 꾸준히 따르세요",
      "여러 각도로 찍어보세요",
    ],
    compatibility: {
      best: ["ENFP", "ESFP"],
      good: ["ENTP", "ESTP"],
      avoid: ["ENFJ"],
    },
    emoji: "📦",
  },
  ESTP: {
    label: "즉응 사진러",
    summary: "예쁜 것을 보면 즉시 반응해서 찍는 실용주의자",
    description:
      "당신은 예쁜 것을 보면 즉시 반응해서 찍는 스타일입니다. 카페에서 예쁜 음료를 받으면 바로 찍고, 맛집에서 음식을 받으면 즉시 사진을 남깁니다. 생각보다는 행동을 중시하며, 효율적이고 실용적인 사진 촬영 방식을 선호합니다.",
    traits: [
      "예쁜 것을 보면 즉시 반응한다",
      "카페 음료를 받으면 바로 찍는다",
      "바로 사진을 남긴다",
      "행동을 중시한다",
      "실용적인 사진 촬영 방식을 선호한다",
    ],
    picks: ["즉시 반응", "실용적 촬영", "빠른 촬영"],
    tips: [
      "사진을 찍기 전에 구도를 생각해보세요",
      "여러 각도로 찍어보세요",
      "필터를 적절히 활용하세요",
    ],
    compatibility: {
      best: ["INFJ", "INTP"],
      good: ["ENFJ", "ENTP"],
      avoid: ["ISFJ"],
    },
    emoji: "⚡",
  },
  ISTP: {
    label: "실용 사진러",
    summary: "필요할 때만 사진을 찍으며 효율적으로 처리하는 기술자",
    description:
      "당신은 필요할 때만 사진을 찍으며 효율적으로 처리하는 스타일입니다. 불필요한 사진은 찍지 않으며, 정말 필요한 순간만 남깁니다. 효율적이고 실용적인 사진 촬영 방식을 선호하며, 사진 촬영 전에 리뷰를 확인합니다.",
    traits: [
      "필요할 때만 사진을 찍는다",
      "불필요한 사진은 찍지 않는다",
      "정말 필요한 순간만 남긴다",
      "효율적이고 실용적인 방식을 선호한다",
      "사진 촬영 전에 리뷰를 확인한다",
    ],
    picks: ["필요시 촬영", "효율적 관리", "실용적 방식"],
    tips: [
      "사진 촬영 전에 리뷰를 확인하세요",
      "효과적인 사진 촬영 방법을 기록하세요",
      "여러 각도로 찍어보세요",
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
  const mbtiType = (searchParams.get("type") as keyof typeof photoTypes) || "ENFP"
  const resultId = searchParams.get("id") || undefined
  const character = photoTypes[mbtiType]
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
                  className="mb-4 bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200"
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
                  testId="phone-photo"
                  testPath="/tests/phone-photo/test"
                  resultType={mbtiType}
                  resultId={loadedResult?.id || resultId}
                  title={`나는 📸 ${character.label}(${mbtiType})! 너는 어떤 사진러야?`}
                  description={character.summary}
                />
                <Button variant="outline" size="lg" asChild>
                  <Link href="/tests/phone-photo/test">
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
              <span>📸</span>
              <span>당신의 사진 습관 특징</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.traits.map((trait, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950 dark:to-rose-950 rounded-lg"
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
              <span>✨</span>
              <span>추천 사진 스타일</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.picks.map((pick, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950 dark:to-rose-950 rounded-lg"
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
              <span>사진 팁</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3">
              {character.tips.map((tip, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="text-pink-500 font-bold">{index + 1}.</span>
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
              <Sparkles className="h-6 w-6 text-rose-500" />
              <span>다른 재미있는 테스트도 해보세요!</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
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
                {
                  slug: "phone-battery",
                  title: "배터리 관리",
                  emoji: "🔋",
                  description: "배터리 관리로 알아보는 성격",
                  participants: "0",
                },
                {
                  slug: "phone-notification",
                  title: "알림 대하는 방식",
                  emoji: "🔔",
                  description: "알림 대하는 방식으로 알아보는 성격",
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
              className="border-2 border-pink-300 hover:bg-pink-50 font-medium py-6 px-8 bg-transparent"
            >
              다른 테스트하기
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default function PhonePhotoResult() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  )
}


