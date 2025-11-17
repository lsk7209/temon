"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, Cookie, Sparkles } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { ShareButtons } from "@/components/share-buttons"
import { getTestResult } from "@/lib/api-client"

const snackTypes = {
  ENFP: {
    label: "즉흥 간식러",
    summary: "기분에 따라 다양한 간식을 즐기는 확산형",
    description:
      "당신은 저녁에 간식을 선택할 때 기분에 따라 다양한 간식을 선택하는 스타일입니다. 때로는 쿠키, 때로는 초콜릿, 때로는 과자를 즐기며 상황에 따라 유연하게 대처합니다. 계획보다는 그때그때의 기분과 컨디션을 중시하며, 주변 사람들과 함께 간식을 즐기는 것을 좋아합니다.",
    traits: [
      "간식 방식을 자주 바꾼다",
      "새로운 간식을 시도하는 것을 좋아한다",
      "기분에 따라 간식이 달라진다",
      "주변 사람들과 함께 즐긴다",
      "즉흥적으로 간식을 선택한다",
    ],
    picks: ["다양한 간식", "신간식 시도", "친구와 함께 간식"],
    tips: [
      "다양한 간식을 시도해보세요",
      "새로운 간식을 발견하면 기록해두세요",
      "주변 사람들과 간식 경험을 나눠보세요",
    ],
    compatibility: {
      best: ["ISTJ", "ISFJ"],
      good: ["ESTJ", "ESFJ"],
      avoid: ["INTJ"],
    },
    emoji: "🌅",
  },
  INFP: {
    label: "감성 간식러",
    summary: "조용히 자신만의 간식을 즐기는 힐링 지향",
    description:
      "당신은 저녁에 간식을 선택할 때 조용히 자신만의 간식을 즐기는 스타일입니다. 집에서 혼자 조용히 먹는 것을 선호하며, 간식을 먹으면서 여유롭게 쉬는 시간을 즐깁니다. 계획보다는 감정과 컨디션을 중시하며, 혼자만의 시간을 소중히 여깁니다.",
    traits: [
      "집에서 혼자 조용히 먹는다",
      "조용한 환경을 선호한다",
      "자신만의 간식 루틴이 있다",
      "혼자만의 시간을 중시한다",
      "감정에 따라 간식 방식이 달라진다",
    ],
    picks: ["집에서 먹는 간식", "조용한 간식 환경", "명상과 함께하는 간식"],
    tips: [
      "집에서 편안하게 간식을 즐기세요",
      "조용한 환경에서 간식을 먹으세요",
      "간식을 먹으면서 여유 시간을 확보하세요",
    ],
    compatibility: {
      best: ["ENTJ", "ESTJ"],
      good: ["ENFJ", "ESFJ"],
      avoid: ["ESTP"],
    },
    emoji: "😴",
  },
  ENFJ: {
    label: "시간관리 간식러",
    summary: "계획적으로 간식을 먹으며 하루를 마무리하는 리더",
    description:
      "당신은 저녁에 간식을 선택할 때 계획적으로 먹으며 하루를 마무리하는 스타일입니다. 정해진 시간에 정해진 간식을 먹는 것을 중요하게 생각하며, 간식을 먹으면서 하루 일정을 정리합니다. 주변 사람들의 간식도 챙기며, 함께 효율적으로 하루를 마무리하는 것을 좋아합니다.",
    traits: [
      "정해진 시간에 간식을 먹는다",
      "간식을 먹으면서 일정을 정리한다",
      "주변 사람들의 간식을 챙긴다",
      "효율적인 간식 루틴을 만든다",
      "하루 일정을 미리 정리한다",
    ],
    picks: ["정해진 시간의 간식", "간식과 함께하는 계획", "가족과 함께하는 간식"],
    tips: [
      "정해진 시간에 간식을 먹으세요",
      "간식을 먹으면서 하루 일정을 정리하세요",
      "주변 사람들과 함께 간식을 즐기세요",
    ],
    compatibility: {
      best: ["INTP", "ISTP"],
      good: ["ISFP", "INFP"],
      avoid: ["ISTJ"],
    },
    emoji: "⏰",
  },
  INFJ: {
    label: "여유 간식러",
    summary: "의미 있는 하루를 위해 여유롭게 간식을 먹는 전략가",
    description:
      "당신은 저녁에 간식을 선택할 때 여유롭게 먹으며 하루의 의미를 생각하는 스타일입니다. 간식을 먹으면서 하루의 목적과 비전을 생각하며, 간식 후에도 잠시 생각하는 시간을 가집니다. 계획보다는 비전과 가능성을 중시하며, 자신만의 깊이 있는 간식 루틴을 만듭니다.",
    traits: [
      "여유롭게 간식을 먹는다",
      "하루의 의미를 생각한다",
      "간식을 먹으면서 생각하는 시간을 가진다",
      "자신만의 깊이 있는 루틴이 있다",
      "비전과 가능성을 중시한다",
    ],
    picks: ["의미 있는 간식", "명상과 함께하는 간식", "독서와 함께하는 간식"],
    tips: [
      "여유롭게 간식을 먹으세요",
      "간식을 먹으면서 하루의 목적을 생각하세요",
      "깊이 있는 간식 시간을 가져보세요",
    ],
    compatibility: {
      best: ["ENFP", "ESFP"],
      good: ["ENTP", "ESTP"],
      avoid: ["ESTJ"],
    },
    emoji: "🧘",
  },
  ENTP: {
    label: "혁신 간식러",
    summary: "다양한 간식을 실험하며 최적의 방법을 찾는 혁신가",
    description:
      "당신은 저녁에 간식을 선택할 때 다양한 간식을 실험하며 최적의 방법을 찾는 스타일입니다. 같은 간식보다는 새로운 간식을 시도하는 것을 좋아하며, 간식 방법도 다양하게 실험합니다. 효율성과 재미를 동시에 추구하며, 주변 사람들에게 새로운 간식법을 추천합니다.",
    traits: [
      "다양한 간식을 실험한다",
      "새로운 간식 방식을 시도한다",
      "간식 앱과 도구를 적극 활용한다",
      "새로운 간식법을 추천한다",
      "효율성과 재미를 동시에 추구한다",
    ],
    picks: ["다양한 간식", "간식 실험", "간식 앱 활용"],
    tips: [
      "다양한 간식을 시도해보세요",
      "새로운 간식 방식을 실험해보세요",
      "효과적인 방법을 기록해두세요",
    ],
    compatibility: {
      best: ["ISFJ", "ISTJ"],
      good: ["ESFJ", "ESTJ"],
      avoid: ["ISFP"],
    },
    emoji: "📱",
  },
  INTP: {
    label: "분석 간식러",
    summary: "논리적으로 최적의 간식을 찾는 분석가",
    description:
      "당신은 저녁에 간식을 선택할 때 논리적으로 분석하며 최적의 간식을 찾는 스타일입니다. 간식의 영양, 맛, 효율 등을 체계적으로 연구하며, 자신에게 가장 효과적인 간식을 찾습니다. 계획보다는 원리와 효율성을 중시하며, 혼자만의 시간에 깊이 있게 생각합니다.",
    traits: [
      "간식을 체계적으로 연구한다",
      "논리적으로 최적의 방법을 찾는다",
      "효율성을 중시한다",
      "혼자만의 시간에 깊이 생각한다",
      "원리와 메커니즘을 이해하려 한다",
    ],
    picks: ["과학적 간식 분석", "최적의 간식 비율", "간식 데이터 분석"],
    tips: [
      "간식을 체계적으로 연구하세요",
      "효과적인 방법을 기록하고 분석하세요",
      "자신에게 맞는 간식을 찾으세요",
    ],
    compatibility: {
      best: ["ENFJ", "ESFJ"],
      good: ["ENTJ", "ESTJ"],
      avoid: ["ESFP"],
    },
    emoji: "🎵",
  },
  ENTJ: {
    label: "효율 간식러",
    summary: "간식하면 바로 목표를 향해 나아가는 지도자",
    description:
      "당신은 저녁에 간식을 선택할 때 즉시 먹으며 하루의 목표를 향해 나아가는 스타일입니다. 시간을 낭비하지 않고 효율적으로 간식을 먹으며, 간식 후 바로 할 일을 시작합니다. 계획과 실행을 중시하며, 주변 사람들에게도 효율적인 간식법을 제안합니다.",
    traits: [
      "즉시 간식을 먹는다",
      "시간을 낭비하지 않는다",
      "간식 후 바로 할 일을 시작한다",
      "계획과 실행을 중시한다",
      "효율적인 간식법을 제안한다",
    ],
    picks: ["즉시 먹는 간식", "효율적인 루틴", "목표 설정과 함께하는 간식"],
    tips: [
      "즉시 간식을 먹으세요",
      "간식 후 바로 할 일을 시작하세요",
      "효율적인 간식 루틴을 만드세요",
    ],
    compatibility: {
      best: ["ISFP", "INFP"],
      good: ["ISFJ", "ISTJ"],
      avoid: ["INTP"],
    },
    emoji: "💪",
  },
  INTJ: {
    label: "야행성 간식러",
    summary: "자신만의 시간대에 간식을 먹는 전략적 사고가",
    description:
      "당신은 저녁에 간식을 선택할 때 자신만의 시간대에 먹는 스타일입니다. 밤에 깊이 있게 생각하는 것을 좋아하며, 아침보다는 저녁에 집중력이 높습니다. 계획보다는 전략과 비전을 중시하며, 혼자만의 시간에 깊이 있게 사고합니다.",
    traits: [
      "자신만의 시간대에 간식을 먹는다",
      "밤에 깊이 있게 생각한다",
      "아침보다 저녁에 집중력이 높다",
      "전략과 비전을 중시한다",
      "혼자만의 시간을 소중히 여긴다",
    ],
    picks: ["유연한 간식 시간", "야행성 루틴", "깊이 있는 사고와 함께하는 간식"],
    tips: [
      "자신에게 맞는 시간대를 찾으세요",
      "야행성 루틴을 최적화하세요",
      "깊이 있는 사고 시간을 확보하세요",
    ],
    compatibility: {
      best: ["ESFP", "ENFP"],
      good: ["ESTP", "ENTP"],
      avoid: ["ESFJ"],
    },
    emoji: "🌙",
  },
  ESFJ: {
    label: "따뜻한 간식러",
    summary: "주변 사람들을 챙기며 함께 간식을 먹는 배려심 많은 타입",
    description:
      "당신은 저녁에 간식을 선택할 때 주변 사람들을 챙기며 함께 먹는 스타일입니다. 가족이나 동료들의 간식도 챙기며, 함께 효율적으로 하루를 마무리하는 것을 좋아합니다. 계획과 안정을 중시하며, 주변 사람들의 기분과 컨디션을 고려합니다.",
    traits: [
      "주변 사람들을 챙긴다",
      "함께 간식을 먹는 것을 좋아한다",
      "가족이나 동료의 간식을 도와준다",
      "안정적인 루틴을 만든다",
      "주변 사람들의 기분을 고려한다",
    ],
    picks: ["가족과 함께하는 간식", "따뜻한 간식", "함께하는 간식 루틴"],
    tips: [
      "주변 사람들과 함께 간식을 먹으세요",
      "따뜻한 간식을 사용하세요",
      "함께하는 간식 루틴을 만드세요",
    ],
    compatibility: {
      best: ["INTP", "ISTP"],
      good: ["ENTP", "ESTP"],
      avoid: ["INTJ"],
    },
    emoji: "😊",
  },
  ISFJ: {
    label: "안정 간식러",
    summary: "규칙적으로 간식을 먹으며 안정적인 하루를 만드는 수호자",
    description:
      "당신은 저녁에 간식을 선택할 때 규칙적으로 먹으며 안정적인 하루를 만드는 스타일입니다. 같은 시간에 같은 간식을 먹는 것을 중요하게 생각하며, 간식 후에도 정해진 루틴을 따릅니다. 계획과 안정을 중시하며, 주변 사람들을 배려합니다.",
    traits: [
      "같은 시간에 같은 간식을 먹는다",
      "정해진 루틴을 따른다",
      "안정적인 간식 방식을 선호한다",
      "주변 사람들을 배려한다",
      "규칙적인 생활을 중시한다",
    ],
    picks: ["규칙적인 간식 시간", "안정적인 간식", "정해진 간식 루틴"],
    tips: [
      "같은 시간에 간식을 먹도록 하세요",
      "정해진 루틴을 따르세요",
      "안정적인 간식 방식을 유지하세요",
    ],
    compatibility: {
      best: ["ENTP", "ENFP"],
      good: ["ESTP", "ESFP"],
      avoid: ["ENTJ"],
    },
    emoji: "🧸",
  },
  ESFP: {
    label: "즉흥 간식러",
    summary: "기분에 따라 유연하게 간식을 먹는 활발한 타입",
    description:
      "당신은 저녁에 간식을 선택할 때 기분에 따라 유연하게 먹는 스타일입니다. 때로는 쿠키, 때로는 초콜릿, 때로는 과자를 즐기며 상황에 따라 대처합니다. 계획보다는 현재의 기분과 컨디션을 중시하며, 주변 사람들과 함께 즐겁게 하루를 마무리합니다.",
    traits: [
      "기분에 따라 유연하게 간식을 먹는다",
      "다양한 간식을 시도한다",
      "주변 사람들과 함께 즐긴다",
      "현재의 기분을 중시한다",
      "즉흥적으로 대처한다",
    ],
    picks: ["즐거운 간식", "유연한 간식 시간", "함께하는 간식"],
    tips: [
      "기분에 따라 유연하게 대처하세요",
      "즐거운 간식을 먹으세요",
      "주변 사람들과 함께 간식을 즐기세요",
    ],
    compatibility: {
      best: ["INTJ", "INFJ"],
      good: ["ISTJ", "ISFJ"],
      avoid: ["INTP"],
    },
    emoji: "🎉",
  },
  ISFP: {
    label: "조용한 간식러",
    summary: "자신만의 페이스로 조용히 간식을 먹는 예술가",
    description:
      "당신은 저녁에 간식을 선택할 때 서두르지 않고 자신만의 페이스로 조용히 먹는 스타일입니다. 집에서 혼자 조용히 먹는 것을 선호하며, 간식 후에도 잠시 여유를 즐깁니다. 계획보다는 감정과 미적 감각을 중시하며, 혼자만의 시간을 소중히 여깁니다.",
    traits: [
      "집에서 혼자 조용히 먹는다",
      "자신만의 페이스로 간식을 먹는다",
      "간식 후 여유를 즐긴다",
      "감정과 미적 감각을 중시한다",
      "혼자만의 시간을 소중히 여긴다",
    ],
    picks: ["부드러운 간식", "자연스러운 간식", "예술적인 간식 루틴"],
    tips: [
      "집에서 편안하게 간식을 먹으세요",
      "자신만의 페이스로 먹으세요",
      "간식 후 여유 시간을 확보하세요",
    ],
    compatibility: {
      best: ["ENTJ", "ESTJ"],
      good: ["ENFJ", "ESFJ"],
      avoid: ["ENTP"],
    },
    emoji: "🌿",
  },
  ESTJ: {
    label: "규칙 간식러",
    summary: "계획대로 정확하게 간식을 먹으며 효율적으로 하루를 마무리하는 관리자",
    description:
      "당신은 저녁에 간식을 선택할 때 계획대로 정확하게 먹으며 효율적으로 하루를 마무리하는 스타일입니다. 정확한 시간에 정확한 간식을 먹는 것을 중요하게 생각하며, 간식 후에도 정해진 루틴을 체계적으로 따릅니다. 계획과 실행을 중시하며, 주변 사람들에게도 효율적인 간식법을 제안합니다.",
    traits: [
      "정확한 시간에 정확한 간식을 먹는다",
      "정해진 루틴을 체계적으로 따른다",
      "효율적인 간식 방식을 만든다",
      "계획과 실행을 중시한다",
      "주변 사람들에게 제안한다",
    ],
    picks: ["정확한 간식 시간", "체계적인 루틴", "효율적인 간식법"],
    tips: [
      "정확한 시간에 간식을 먹도록 하세요",
      "정해진 루틴을 체계적으로 따르세요",
      "효율적인 간식 방식을 만드세요",
    ],
    compatibility: {
      best: ["INFP", "ISFP"],
      good: ["ENFP", "ESFP"],
      avoid: ["INTP"],
    },
    emoji: "📋",
  },
  ISTJ: {
    label: "정석 간식러",
    summary: "늘 같은 방식으로 규칙적으로 간식을 먹는 신뢰할 수 있는 타입",
    description:
      "당신은 저녁에 간식을 선택할 때 늘 같은 방식으로 규칙적으로 먹는 스타일입니다. 같은 시간, 같은 간식, 같은 방식으로 간식을 먹는 것을 선호하며, 간식 후에도 정해진 루틴을 꾸준히 따릅니다. 계획과 안정을 중시하며, 신뢰할 수 있는 간식 방식을 만듭니다.",
    traits: [
      "늘 같은 방식으로 간식을 먹는다",
      "규칙적인 간식 시간을 유지한다",
      "정해진 루틴을 꾸준히 따른다",
      "안정적인 간식 방식을 선호한다",
      "신뢰할 수 있는 방식을 만든다",
    ],
    picks: ["규칙적인 간식 시간", "안정적인 간식", "정석 간식 루틴"],
    tips: [
      "늘 같은 방식으로 간식을 먹도록 하세요",
      "규칙적인 간식 시간을 유지하세요",
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
    label: "즉응 간식러",
    summary: "간식하면 즉시 반응해서 행동하는 실용주의자",
    description:
      "당신은 저녁에 간식을 선택할 때 즉시 먹으며 행동하는 스타일입니다. 생각보다는 행동을 중시하며, 간식 후 바로 할 일을 시작합니다. 계획보다는 현재 상황에 맞춰 대처하며, 효율적이고 실용적인 간식 방식을 선호합니다.",
    traits: [
      "간식하면 즉시 반응한다",
      "행동을 중시한다",
      "간식 후 바로 할 일을 시작한다",
      "현재 상황에 맞춰 대처한다",
      "실용적인 간식 방식을 선호한다",
    ],
    picks: ["즉시 반응 간식", "실용적인 루틴", "효율적인 간식법"],
    tips: [
      "간식하면 즉시 반응하세요",
      "간식 후 바로 할 일을 시작하세요",
      "실용적인 간식 방식을 만드세요",
    ],
    compatibility: {
      best: ["INFJ", "INTP"],
      good: ["ENFJ", "ENTP"],
      avoid: ["ISFJ"],
    },
    emoji: "⚡",
  },
  ISTP: {
    label: "실용 간식러",
    summary: "필요할 때만 간식을 먹으며 효율적으로 처리하는 기술자",
    description:
      "당신은 저녁에 간식을 선택할 때 필요할 때만 먹으며 효율적으로 처리하는 스타일입니다. 불필요한 시간을 낭비하지 않고, 간식 후에도 필요한 것만 처리합니다. 계획보다는 실용성과 효율성을 중시하며, 혼자만의 시간에 집중합니다.",
    traits: [
      "필요할 때만 간식을 먹는다",
      "불필요한 시간을 낭비하지 않는다",
      "간식 후 필요한 것만 처리한다",
      "실용성과 효율성을 중시한다",
      "혼자만의 시간에 집중한다",
    ],
    picks: ["필요한 간식만", "효율적인 루틴", "실용적인 간식법"],
    tips: [
      "필요할 때만 간식을 먹도록 하세요",
      "불필요한 시간을 낭비하지 마세요",
      "효율적인 간식 방식을 만드세요",
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
  const mbtiType = (searchParams.get("type") as keyof typeof snackTypes) || "ENFP"
  const resultId = searchParams.get("id") || undefined
  const character = snackTypes[mbtiType]
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
                  testId="evening-snack"
                  testPath="/tests/evening-snack/test"
                  resultType={mbtiType}
                  resultId={loadedResult?.id || resultId}
                  title={`나는 🍪 ${character.label}(${mbtiType})! 너는 어떤 간식러야?`}
                  description={character.summary}
                />
                <Button variant="outline" size="lg" asChild>
                  <Link href="/tests/evening-snack/test">
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
              <span>🍪</span>
              <span>당신의 간식 특징</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.traits.map((trait, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950 dark:to-amber-950 rounded-lg"
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
              <span>🍫</span>
              <span>추천 간식 스타일</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.picks.map((pick, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950 dark:to-amber-950 rounded-lg"
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
              <span>간식 팁</span>
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
              <Sparkles className="h-6 w-6 text-amber-500" />
              <span>다른 재미있는 테스트도 해보세요!</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  slug: "evening-exercise",
                  title: "저녁 운동",
                  emoji: "💪",
                  description: "저녁 운동 습관으로 알아보는 성격",
                  participants: "0",
                },
                {
                  slug: "evening-work",
                  title: "저녁 업무",
                  emoji: "💼",
                  description: "저녁 업무 처리로 알아보는 성격",
                  participants: "0",
                },
                {
                  slug: "evening-social",
                  title: "저녁 약속",
                  emoji: "💬",
                  description: "저녁 약속 대하는 방식으로 알아보는 성격",
                  participants: "0",
                },
                {
                  slug: "evening-entertainment",
                  title: "저녁 오락",
                  emoji: "📺",
                  description: "저녁 오락 선택으로 알아보는 성격",
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

export default function EveningSnackResult() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  )
}

