"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, HardDrive, Sparkles } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { ShareButtons } from "@/components/share-buttons"
import { getTestResult } from "@/lib/api-client"

const storageTypes = {
  ENFP: {
    label: "즉흥 저장공간러",
    summary: "저장공간이 부족하면 즉시 정리하는 활발한 타입",
    description:
      "당신은 저장공간이 부족하면 즉시 정리하는 스타일입니다. 저장공간이 부족하다는 알림이 오면 바로 정리하며, 불필요한 파일을 삭제합니다. 사진과 파일을 활발하게 정리하며, 주변 사람들과 저장공간 관리 팁을 공유하는 것을 즐깁니다.",
    traits: [
      "저장공간이 부족하면 즉시 정리한다",
      "불필요한 파일을 삭제한다",
      "사진과 파일을 활발하게 정리한다",
      "주변 사람들과 저장공간 관리 팁을 공유한다",
      "저장공간 관리를 활발하게 한다",
    ],
    picks: ["즉시 정리", "활발한 관리", "파일 공유"],
    tips: [
      "저장공간이 부족하기 전에 미리 정리하세요",
      "불필요한 파일은 정기적으로 삭제하세요",
      "클라우드 저장소를 활용하세요",
    ],
    compatibility: {
      best: ["ISTJ", "ISFJ"],
      good: ["ESTJ", "ESFJ"],
      avoid: ["INTJ"],
    },
    emoji: "🌅",
  },
  INFP: {
    label: "여유 저장공간러",
    summary: "저장공간을 나중에 정리하는 조용한 타입",
    description:
      "당신은 저장공간이 부족해도 즉시 정리하지 않고 나중에 정리하는 스타일입니다. 저장공간이 부족해도 불편하지 않으며, 자신만의 시간에 여유롭게 정리합니다. 사진과 파일을 조용히 정리하며, 저장공간 관리를 여유롭게 합니다.",
    traits: [
      "저장공간이 부족해도 즉시 정리하지 않는다",
      "저장공간이 부족해도 불편하지 않다",
      "자신만의 시간에 여유롭게 정리한다",
      "사진과 파일을 조용히 정리한다",
      "저장공간 관리를 여유롭게 한다",
    ],
    picks: ["나중에 정리", "여유로운 관리", "조용한 정리"],
    tips: [
      "저장공간이 부족하기 전에 미리 정리하세요",
      "불필요한 파일은 정기적으로 삭제하세요",
      "클라우드 저장소를 활용하세요",
    ],
    compatibility: {
      best: ["ENTJ", "ESTJ"],
      good: ["ENFJ", "ESFJ"],
      avoid: ["ESTP"],
    },
    emoji: "😴",
  },
  ENFJ: {
    label: "시간관리 저장공간러",
    summary: "정해진 시간에 저장공간을 정리하는 계획적인 타입",
    description:
      "당신은 저장공간을 정해진 시간에 정리하는 스타일입니다. 저장공간 정리 시간을 정해두고 그 시간에만 정리하며, 저장공간 관리를 계획적으로 합니다. 주변 사람들의 저장공간도 챙기며, 함께 효율적으로 저장공간을 관리합니다.",
    traits: [
      "정해진 시간에 저장공간을 정리한다",
      "저장공간 정리 시간을 정해둔다",
      "저장공간 관리를 계획적으로 한다",
      "주변 사람들의 저장공간도 챙긴다",
      "효율적으로 저장공간을 관리한다",
    ],
    picks: ["정해진 시간 정리", "계획적 관리", "효율적인 저장공간 관리"],
    tips: [
      "저장공간 정리 시간을 정해두세요",
      "저장공간이 부족하기 전에 미리 정리하세요",
      "클라우드 저장소를 활용하세요",
    ],
    compatibility: {
      best: ["INTP", "ISTP"],
      good: ["ISFP", "INFP"],
      avoid: ["ISTJ"],
    },
    emoji: "⏰",
  },
  INFJ: {
    label: "명상 저장공간러",
    summary: "저장공간을 최소화하고 깔끔하게 관리하는 전략가",
    description:
      "당신은 저장공간을 최소화하고 깔끔하게 관리하는 스타일입니다. 불필요한 파일은 모두 삭제하며, 정말 필요한 파일만 보관합니다. 저장공간이 부족해도 불편하지 않으며, 자신만의 시간을 소중히 여깁니다.",
    traits: [
      "불필요한 파일은 모두 삭제한다",
      "정말 필요한 파일만 보관한다",
      "저장공간을 최소화한다",
      "저장공간이 부족해도 불편하지 않다",
      "자신만의 시간을 소중히 여긴다",
    ],
    picks: ["저장공간 최소화", "깔끔한 관리", "필요한 파일만"],
    tips: [
      "불필요한 파일은 정기적으로 삭제하세요",
      "클라우드 저장소를 활용하세요",
      "저장공간 사용량을 모니터링하세요",
    ],
    compatibility: {
      best: ["ENFP", "ESFP"],
      good: ["ENTP", "ESTP"],
      avoid: ["ESTJ"],
    },
    emoji: "🧘",
  },
  ENTP: {
    label: "혁신 저장공간러",
    summary: "저장공간 관리 방법을 자주 바꾸며 실험하는 혁신가",
    description:
      "당신은 저장공간 관리 방법을 자주 바꾸며 실험하는 스타일입니다. 새로운 저장공간 관리 앱을 시도하고, 다양한 클라우드 서비스를 사용하며, 최적의 저장공간 관리를 찾기 위해 계속 실험합니다. 효율성과 재미를 동시에 추구합니다.",
    traits: [
      "저장공간 관리 방법을 자주 바꾼다",
      "새로운 저장공간 관리 앱을 시도한다",
      "다양한 클라우드 서비스를 사용한다",
      "최적의 저장공간 관리를 찾기 위해 실험한다",
      "효율성과 재미를 동시에 추구한다",
    ],
    picks: ["저장공간 실험", "새로운 앱", "다양한 클라우드 서비스"],
    tips: [
      "새로운 저장공간 관리 앱을 시도해보세요",
      "효과적인 저장공간 관리 방법을 기록해두세요",
      "클라우드 저장소를 활용하세요",
    ],
    compatibility: {
      best: ["ISFJ", "ISTJ"],
      good: ["ESFJ", "ESTJ"],
      avoid: ["ISFP"],
    },
    emoji: "📱",
  },
  INTP: {
    label: "분석 저장공간러",
    summary: "저장공간을 체계적으로 분석하고 최적화하는 분석가",
    description:
      "당신은 저장공간을 체계적으로 분석하고 최적화하는 스타일입니다. 저장공간 사용량을 분석하며, 어떤 파일이 저장공간을 많이 사용하는지 논리적으로 파악합니다. 자신에게 가장 효과적인 저장공간 관리 방법을 찾으며, 효율성을 중시합니다.",
    traits: [
      "저장공간 사용량을 분석한다",
      "어떤 파일이 저장공간을 많이 사용하는지 파악한다",
      "효과적인 저장공간 관리 방법을 찾는다",
      "저장공간을 체계적으로 최적화한다",
      "효율성을 중시한다",
    ],
    picks: ["저장공간 분석", "사용량 모니터링", "효율적 최적화"],
    tips: [
      "저장공간 사용량을 모니터링하세요",
      "저장공간을 많이 사용하는 파일을 확인하세요",
      "효과적인 저장공간 관리 방법을 기록하세요",
    ],
    compatibility: {
      best: ["ENFJ", "ESFJ"],
      good: ["ENTJ", "ESTJ"],
      avoid: ["ESFP"],
    },
    emoji: "🎵",
  },
  ENTJ: {
    label: "효율 저장공간러",
    summary: "저장공간을 즉시 정리하고 효율적으로 관리하는 지도자",
    description:
      "당신은 저장공간을 즉시 정리하고 효율적으로 관리하는 스타일입니다. 저장공간이 부족하면 바로 정리하며, 불필요한 파일을 삭제합니다. 저장공간 관리를 계획적으로 하며, 효율적인 저장공간 관리 시스템을 만듭니다.",
    traits: [
      "저장공간이 부족하면 바로 정리한다",
      "불필요한 파일을 삭제한다",
      "저장공간 관리를 계획적으로 한다",
      "효율적인 저장공간 관리 시스템을 만든다",
      "저장공간을 즉시 정리한다",
    ],
    picks: ["즉시 정리", "효율적 관리", "계획적 시스템"],
    tips: [
      "저장공간이 부족하기 전에 미리 정리하세요",
      "불필요한 파일은 정기적으로 삭제하세요",
      "클라우드 저장소를 활용하세요",
    ],
    compatibility: {
      best: ["ISFP", "INFP"],
      good: ["ISFJ", "ISTJ"],
      avoid: ["INTP"],
    },
    emoji: "💪",
  },
  INTJ: {
    label: "야행성 저장공간러",
    summary: "자신만의 시간대에 저장공간을 정리하는 전략적 사고가",
    description:
      "당신은 자신만의 시간대에 저장공간을 정리하는 스타일입니다. 집중할 때는 저장공간 관리를 하지 않고, 자신만의 시간에 정리합니다. 저장공간 사용량을 분석하며, 효율적인 저장공간 관리 방법을 찾습니다.",
    traits: [
      "집중할 때는 저장공간 관리를 하지 않는다",
      "자신만의 시간에 정리한다",
      "저장공간 사용량을 분석한다",
      "효율적인 저장공간 관리 방법을 찾는다",
      "깊이 있게 저장공간을 관리한다",
    ],
    picks: ["야행성 정리", "효율적 분석", "전략적 관리"],
    tips: [
      "저장공간 사용량을 모니터링하세요",
      "효과적인 저장공간 관리 방법을 기록하세요",
      "클라우드 저장소를 활용하세요",
    ],
    compatibility: {
      best: ["ESFP", "ENFP"],
      good: ["ESTP", "ENTP"],
      avoid: ["ESFJ"],
    },
    emoji: "🌙",
  },
  ESFJ: {
    label: "따뜻한 저장공간러",
    summary: "주변 사람들의 저장공간도 챙기며 함께 관리하는 배려심 많은 타입",
    description:
      "당신은 주변 사람들의 저장공간도 챙기며 함께 관리하는 스타일입니다. 가족이나 친구들의 저장공간을 도와주며, 함께 효율적으로 저장공간을 관리합니다. 저장공간이 부족하지 않도록 주의하며, 주변 사람들의 기분을 고려합니다.",
    traits: [
      "주변 사람들의 저장공간을 챙긴다",
      "가족이나 친구들의 저장공간을 도와준다",
      "함께 효율적으로 저장공간을 관리한다",
      "저장공간이 부족하지 않도록 주의한다",
      "주변 사람들의 기분을 고려한다",
    ],
    picks: ["함께 관리", "따뜻한 저장공간", "저장공간 챙기기"],
    tips: [
      "저장공간이 부족하기 전에 미리 정리하세요",
      "주변 사람들과 저장공간 관리 팁을 나눠보세요",
      "클라우드 저장소를 활용하세요",
    ],
    compatibility: {
      best: ["INTP", "ISTP"],
      good: ["ENTP", "ESTP"],
      avoid: ["INTJ"],
    },
    emoji: "😊",
  },
  ISFJ: {
    label: "안정 저장공간러",
    summary: "규칙적으로 저장공간을 정리하며 안정적으로 관리하는 수호자",
    description:
      "당신은 규칙적으로 저장공간을 정리하며 안정적으로 관리하는 스타일입니다. 같은 시간에 같은 방식으로 저장공간을 정리하며, 정해진 루틴을 따릅니다. 저장공간이 부족하지 않도록 주의하며, 안정적인 저장공간 관리 방식을 선호합니다.",
    traits: [
      "같은 시간에 같은 방식으로 저장공간을 정리한다",
      "정해진 루틴을 따른다",
      "안정적인 저장공간 관리 방식을 선호한다",
      "저장공간이 부족하지 않도록 주의한다",
      "규칙적인 저장공간 정리 습관이 있다",
    ],
    picks: ["규칙적 정리", "안정적 관리", "정해진 루틴"],
    tips: [
      "저장공간 정리 시간을 정해두세요",
      "저장공간이 부족하기 전에 미리 정리하세요",
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
    label: "즉흥 저장공간러",
    summary: "저장공간이 부족하면 즉시 정리하며 활발하게 반응하는 활발한 타입",
    description:
      "당신은 저장공간이 부족하면 즉시 정리하며 활발하게 반응하는 스타일입니다. 저장공간이 부족하다는 알림이 오면 바로 정리하며, 불필요한 파일을 삭제합니다. 사진과 파일을 활발하게 정리하며, 주변 사람들과 저장공간 관리 팁을 공유하는 것을 즐깁니다.",
    traits: [
      "저장공간이 부족하면 즉시 정리한다",
      "불필요한 파일을 삭제한다",
      "사진과 파일을 활발하게 정리한다",
      "주변 사람들과 저장공간 관리 팁을 공유한다",
      "저장공간 관리를 활발하게 한다",
    ],
    picks: ["즉시 정리", "활발한 반응", "파일 공유"],
    tips: [
      "저장공간이 부족하기 전에 미리 정리하세요",
      "불필요한 파일은 정기적으로 삭제하세요",
      "클라우드 저장소를 활용하세요",
    ],
    compatibility: {
      best: ["INTJ", "INFJ"],
      good: ["ISTJ", "ISFJ"],
      avoid: ["INTP"],
    },
    emoji: "🎉",
  },
  ISFP: {
    label: "조용한 저장공간러",
    summary: "저장공간을 최소화하고 조용히 관리하는 예술가",
    description:
      "당신은 저장공간을 최소화하고 조용히 관리하는 스타일입니다. 불필요한 파일은 모두 삭제하며, 정말 필요한 파일만 보관합니다. 자신만의 시간에 여유롭게 정리하며, 저장공간 관리를 조용히 합니다.",
    traits: [
      "불필요한 파일은 모두 삭제한다",
      "정말 필요한 파일만 보관한다",
      "자신만의 시간에 여유롭게 정리한다",
      "저장공간을 최소화한다",
      "저장공간 관리를 조용히 한다",
    ],
    picks: ["저장공간 최소화", "조용한 관리", "여유로운 정리"],
    tips: [
      "불필요한 파일은 정기적으로 삭제하세요",
      "클라우드 저장소를 활용하세요",
      "저장공간 사용량을 모니터링하세요",
    ],
    compatibility: {
      best: ["ENTJ", "ESTJ"],
      good: ["ENFJ", "ESFJ"],
      avoid: ["ENTP"],
    },
    emoji: "🌿",
  },
  ESTJ: {
    label: "규칙 저장공간러",
    summary: "계획대로 정확하게 저장공간을 정리하며 효율적으로 관리하는 관리자",
    description:
      "당신은 계획대로 정확하게 저장공간을 정리하며 효율적으로 관리하는 스타일입니다. 정확한 시간에 정확한 방식으로 저장공간을 정리하며, 정해진 루틴을 체계적으로 따릅니다. 저장공간 관리를 계획적으로 하며, 효율적인 저장공간 관리 시스템을 만듭니다.",
    traits: [
      "정확한 시간에 정확한 방식으로 저장공간을 정리한다",
      "정해진 루틴을 체계적으로 따른다",
      "효율적인 저장공간 관리 시스템을 만든다",
      "저장공간 관리를 계획적으로 한다",
      "계획과 실행을 중시한다",
    ],
    picks: ["정확한 정리", "체계적 관리", "효율적 시스템"],
    tips: [
      "저장공간 정리 시간을 정해두세요",
      "저장공간이 부족하기 전에 미리 정리하세요",
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
    label: "정석 저장공간러",
    summary: "늘 같은 방식으로 규칙적으로 저장공간을 정리하는 신뢰할 수 있는 타입",
    description:
      "당신은 늘 같은 방식으로 규칙적으로 저장공간을 정리하는 스타일입니다. 같은 시간, 같은 방식으로 저장공간을 정리하며, 정해진 루틴을 꾸준히 따릅니다. 안정적인 저장공간 관리 방식을 선호하며, 신뢰할 수 있는 저장공간 정리 습관을 만듭니다.",
    traits: [
      "늘 같은 방식으로 저장공간을 정리한다",
      "규칙적인 저장공간 정리 시간을 유지한다",
      "정해진 루틴을 꾸준히 따른다",
      "안정적인 저장공간 관리 방식을 선호한다",
      "신뢰할 수 있는 저장공간 정리 습관을 만든다",
    ],
    picks: ["규칙적 정리", "안정적 관리", "정석 루틴"],
    tips: [
      "저장공간 정리 시간을 정해두세요",
      "저장공간이 부족하기 전에 미리 정리하세요",
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
    label: "즉응 저장공간러",
    summary: "저장공간이 부족하면 즉시 반응해서 정리하는 실용주의자",
    description:
      "당신은 저장공간이 부족하면 즉시 반응해서 정리하는 스타일입니다. 저장공간이 부족하다는 알림이 오면 바로 정리하며, 불필요한 파일을 삭제합니다. 생각보다는 행동을 중시하며, 효율적이고 실용적인 저장공간 관리 방식을 선호합니다.",
    traits: [
      "저장공간이 부족하면 즉시 반응한다",
      "불필요한 파일을 삭제한다",
      "바로 정리한다",
      "행동을 중시한다",
      "실용적인 저장공간 관리 방식을 선호한다",
    ],
    picks: ["즉시 반응", "실용적 관리", "빠른 정리"],
    tips: [
      "저장공간이 부족하기 전에 미리 정리하세요",
      "불필요한 파일은 정기적으로 삭제하세요",
      "클라우드 저장소를 활용하세요",
    ],
    compatibility: {
      best: ["INFJ", "INTP"],
      good: ["ENFJ", "ENTP"],
      avoid: ["ISFJ"],
    },
    emoji: "⚡",
  },
  ISTP: {
    label: "실용 저장공간러",
    summary: "필요할 때만 저장공간을 정리하며 효율적으로 처리하는 기술자",
    description:
      "당신은 필요할 때만 저장공간을 정리하며 효율적으로 처리하는 스타일입니다. 불필요한 파일은 모두 삭제하며, 정말 필요한 파일만 보관합니다. 효율적이고 실용적인 저장공간 관리 방식을 선호하며, 저장공간 사용량을 분석합니다.",
    traits: [
      "필요할 때만 저장공간을 정리한다",
      "불필요한 파일은 모두 삭제한다",
      "정말 필요한 파일만 보관한다",
      "효율적이고 실용적인 방식을 선호한다",
      "저장공간 사용량을 분석한다",
    ],
    picks: ["필요시 정리", "효율적 관리", "실용적 방식"],
    tips: [
      "불필요한 파일은 정기적으로 삭제하세요",
      "저장공간 사용량을 모니터링하세요",
      "클라우드 저장소를 활용하세요",
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
  const mbtiType = (searchParams.get("type") as keyof typeof storageTypes) || "ENFP"
  const resultId = searchParams.get("id") || undefined
  const character = storageTypes[mbtiType]
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
                  className="mb-4 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
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
                  testId="phone-storage"
                  testPath="/tests/phone-storage/test"
                  resultType={mbtiType}
                  resultId={loadedResult?.id || resultId}
                  title={`나는 💾 ${character.label}(${mbtiType})! 너는 어떤 저장공간러야?`}
                  description={character.summary}
                />
                <Button variant="outline" size="lg" asChild>
                  <Link href="/tests/phone-storage/test">
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
              <span>💾</span>
              <span>당신의 저장공간 특징</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.traits.map((trait, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-lg"
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
              <span>📸</span>
              <span>추천 저장공간 스타일</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.picks.map((pick, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-lg"
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
              <span>저장공간 팁</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3">
              {character.tips.map((tip, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="text-green-500 font-bold">{index + 1}.</span>
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
              <Sparkles className="h-6 w-6 text-emerald-500" />
              <span>다른 재미있는 테스트도 해보세요!</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
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
              className="border-2 border-green-300 hover:bg-green-50 font-medium py-6 px-8 bg-transparent"
            >
              다른 테스트하기
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default function PhoneStorageResult() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  )
}


