"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, AlarmClock, Sparkles } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { ShareButtons } from "@/components/share-buttons"
import { getTestResult } from "@/lib/api-client"

const alarmTypes = {
  ENFP: {
    label: "즉흥 기상형",
    summary: "분위기 타고 유연하게 일어나는 확산형 기상러",
    description:
      "당신은 알람이 울리면 상황에 따라 유연하게 대처하는 스타일입니다. 때로는 바로 일어나고, 때로는 스누즈를 누르며 기분에 따라 기상 방식을 바꿉니다. 계획보다는 그때그때의 컨디션과 기분을 중시하며, 주변 사람들과 함께 일어나는 것을 즐깁니다.",
    traits: [
      "알람 소리를 자주 바꾼다",
      "스누즈를 여러 번 누른다",
      "기분에 따라 기상 시간이 달라진다",
      "주변 사람들과 함께 일어나는 것을 좋아한다",
      "즉흥적으로 기상 방식을 바꾼다",
    ],
    picks: ["다양한 알람 소리", "스누즈 기능 활용", "친구와 함께 기상"],
    tips: [
      "알람 시간을 여유 있게 설정하세요",
      "스누즈 횟수를 미리 정해두세요",
      "기상 후 할 일을 간단히 정리하세요",
    ],
    compatibility: {
      best: ["ISTJ", "ISFJ"],
      good: ["ESTJ", "ESFJ"],
      avoid: ["INTJ"],
    },
    emoji: "🌅",
  },
  INFP: {
    label: "감성 기상형",
    summary: "조용히 자신만의 리듬으로 일어나는 힐링 지향",
    description:
      "당신은 알람이 울려도 서두르지 않고 자신만의 페이스로 일어나는 스타일입니다. 조용한 알람 소리를 선호하며, 일어난 후에도 잠시 멍하니 있는 시간을 즐깁니다. 계획보다는 감정과 컨디션을 중시하며, 혼자만의 시간을 소중히 여깁니다.",
    traits: [
      "조용한 알람 소리를 선호한다",
      "일어난 후 잠시 더 누워있다",
      "자신만의 기상 루틴이 있다",
      "혼자만의 시간을 중시한다",
      "감정에 따라 기상 방식이 달라진다",
    ],
    picks: ["부드러운 알람 소리", "자연스러운 기상", "명상 앱 활용"],
    tips: [
      "알람 소리를 부드럽게 설정하세요",
      "일어난 후 여유 시간을 확보하세요",
      "기상 후 할 일을 최소화하세요",
    ],
    compatibility: {
      best: ["ENTJ", "ESTJ"],
      good: ["ENFJ", "ESFJ"],
      avoid: ["ESTP"],
    },
    emoji: "😴",
  },
  ENFJ: {
    label: "시간관리형",
    summary: "계획적으로 일어나서 하루를 준비하는 리더",
    description:
      "당신은 알람이 울리면 바로 일어나서 하루 일정을 준비하는 스타일입니다. 정확한 시간에 일어나는 것을 중요하게 생각하며, 일어난 후 할 일을 미리 계획해둡니다. 주변 사람들의 기상도 챙기며, 함께 효율적으로 하루를 시작하는 것을 좋아합니다.",
    traits: [
      "정확한 시간에 일어난다",
      "일어난 후 할 일을 계획한다",
      "주변 사람들의 기상을 챙긴다",
      "효율적인 기상 루틴을 만든다",
      "하루 일정을 미리 정리한다",
    ],
    picks: ["정확한 알람 시간", "기상 루틴 체크리스트", "가족 알람 설정"],
    tips: [
      "알람 시간을 정확히 설정하세요",
      "기상 후 할 일을 미리 정리하세요",
      "주변 사람들과 함께 기상하세요",
    ],
    compatibility: {
      best: ["INTP", "ISTP"],
      good: ["ISFP", "INFP"],
      avoid: ["ISTJ"],
    },
    emoji: "⏰",
  },
  INFJ: {
    label: "여유기상형",
    summary: "의미 있는 하루를 위해 여유롭게 일어나는 전략가",
    description:
      "당신은 알람이 울려도 서두르지 않고 여유롭게 일어나는 스타일입니다. 하루의 의미와 목적을 생각하며 기상하며, 일어난 후에도 잠시 생각하는 시간을 가집니다. 계획보다는 비전과 가능성을 중시하며, 자신만의 깊이 있는 기상 루틴을 만듭니다.",
    traits: [
      "여유 있게 일어난다",
      "하루의 의미를 생각한다",
      "일어난 후 생각하는 시간을 가진다",
      "자신만의 깊이 있는 루틴이 있다",
      "비전과 가능성을 중시한다",
    ],
    picks: ["의미 있는 알람 메시지", "명상 시간", "독서 시간"],
    tips: [
      "알람 시간을 여유 있게 설정하세요",
      "일어난 후 생각하는 시간을 확보하세요",
      "하루의 목적을 미리 정해두세요",
    ],
    compatibility: {
      best: ["ENFP", "ESFP"],
      good: ["ENTP", "ESTP"],
      avoid: ["ESTJ"],
    },
    emoji: "🧘",
  },
  ENTP: {
    label: "알람마스터",
    summary: "다양한 알람 설정으로 실험하는 혁신가",
    description:
      "당신은 알람을 여러 개 맞추고 다양한 소리를 시도하며 최적의 기상 방식을 찾는 스타일입니다. 같은 방식보다는 새로운 방법을 시도하는 것을 좋아하며, 알람 앱의 다양한 기능을 활용합니다. 효율성과 재미를 동시에 추구하며, 주변 사람들에게 새로운 기상법을 추천합니다.",
    traits: [
      "알람을 여러 개 맞춘다",
      "다양한 알람 소리를 시도한다",
      "알람 앱 기능을 적극 활용한다",
      "새로운 기상법을 실험한다",
      "주변 사람들에게 추천한다",
    ],
    picks: ["스마트 알람 앱", "다양한 알람 소리", "기상 챌린지"],
    tips: [
      "다양한 알람 방식을 시도해보세요",
      "알람 앱의 기능을 적극 활용하세요",
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
    label: "멜로디형",
    summary: "논리적으로 최적의 알람 방식을 찾는 분석가",
    description:
      "당신은 알람이 울리면 논리적으로 분석하며 최적의 기상 방식을 찾는 스타일입니다. 알람 소리, 시간, 방법 등을 체계적으로 연구하며, 자신에게 가장 효과적인 방식을 찾습니다. 계획보다는 원리와 효율성을 중시하며, 혼자만의 시간에 깊이 있게 생각합니다.",
    traits: [
      "알람 방식을 체계적으로 연구한다",
      "논리적으로 최적의 방법을 찾는다",
      "효율성을 중시한다",
      "혼자만의 시간에 깊이 생각한다",
      "원리와 메커니즘을 이해하려 한다",
    ],
    picks: ["과학적 알람 앱", "최적의 알람 소리", "기상 데이터 분석"],
    tips: [
      "알람 방식을 체계적으로 연구하세요",
      "효과적인 방법을 기록하고 분석하세요",
      "자신에게 맞는 방식을 찾으세요",
    ],
    compatibility: {
      best: ["ENFJ", "ESFJ"],
      good: ["ENTJ", "ESTJ"],
      avoid: ["ESFP"],
    },
    emoji: "🎵",
  },
  ENTJ: {
    label: "즉시기상형",
    summary: "알람이 울리면 바로 일어나서 목표를 향해 나아가는 지도자",
    description:
      "당신은 알람이 울리면 즉시 일어나서 하루의 목표를 향해 나아가는 스타일입니다. 시간을 낭비하지 않고 효율적으로 기상하며, 일어난 후 바로 할 일을 시작합니다. 계획과 실행을 중시하며, 주변 사람들에게도 효율적인 기상법을 제안합니다.",
    traits: [
      "알람이 울리면 즉시 일어난다",
      "시간을 낭비하지 않는다",
      "일어난 후 바로 할 일을 시작한다",
      "계획과 실행을 중시한다",
      "효율적인 기상법을 제안한다",
    ],
    picks: ["즉시 기상 알람", "효율적인 루틴", "목표 설정 앱"],
    tips: [
      "알람 시간을 정확히 설정하세요",
      "일어난 후 바로 할 일을 시작하세요",
      "효율적인 기상 루틴을 만드세요",
    ],
    compatibility: {
      best: ["ISFP", "INFP"],
      good: ["ISFJ", "ISTJ"],
      avoid: ["INTP"],
    },
    emoji: "💪",
  },
  INTJ: {
    label: "야행성형",
    summary: "자신만의 시간대에 일어나는 전략적 사고가",
    description:
      "당신은 알람이 울려도 자신만의 시간대에 일어나는 스타일입니다. 밤에 깊이 있게 생각하는 것을 좋아하며, 아침보다는 저녁에 집중력이 높습니다. 계획보다는 전략과 비전을 중시하며, 혼자만의 시간에 깊이 있게 사고합니다.",
    traits: [
      "자신만의 시간대에 일어난다",
      "밤에 깊이 있게 생각한다",
      "아침보다 저녁에 집중력이 높다",
      "전략과 비전을 중시한다",
      "혼자만의 시간을 소중히 여긴다",
    ],
    picks: ["유연한 알람 시간", "야행성 루틴", "깊이 있는 사고 시간"],
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
    label: "따뜻한 챙김형",
    summary: "주변 사람들을 챙기며 함께 일어나는 배려심 많은 타입",
    description:
      "당신은 알람이 울리면 주변 사람들을 챙기며 함께 일어나는 스타일입니다. 가족이나 동료들의 기상을 도와주며, 함께 효율적으로 하루를 시작하는 것을 좋아합니다. 계획과 안정을 중시하며, 주변 사람들의 기분과 컨디션을 고려합니다.",
    traits: [
      "주변 사람들을 챙긴다",
      "함께 일어나는 것을 좋아한다",
      "가족이나 동료의 기상을 도와준다",
      "안정적인 루틴을 만든다",
      "주변 사람들의 기분을 고려한다",
    ],
    picks: ["가족 알람 설정", "따뜻한 알람 소리", "함께하는 기상 루틴"],
    tips: [
      "주변 사람들과 함께 기상하세요",
      "따뜻한 알람 소리를 사용하세요",
      "함께하는 기상 루틴을 만드세요",
    ],
    compatibility: {
      best: ["INTP", "ISTP"],
      good: ["ENTP", "ESTP"],
      avoid: ["INTJ"],
    },
    emoji: "😊",
  },
  ISFJ: {
    label: "안정 기상형",
    summary: "규칙적으로 일어나서 안정적인 하루를 만드는 수호자",
    description:
      "당신은 알람이 울리면 규칙적으로 일어나서 안정적인 하루를 만드는 스타일입니다. 같은 시간에 일어나는 것을 중요하게 생각하며, 일어난 후에도 정해진 루틴을 따릅니다. 계획과 안정을 중시하며, 주변 사람들을 배려합니다.",
    traits: [
      "같은 시간에 일어난다",
      "정해진 루틴을 따른다",
      "안정적인 기상 방식을 선호한다",
      "주변 사람들을 배려한다",
      "규칙적인 생활을 중시한다",
    ],
    picks: ["규칙적인 알람 시간", "안정적인 알람 소리", "정해진 기상 루틴"],
    tips: [
      "같은 시간에 일어나도록 하세요",
      "정해진 루틴을 따르세요",
      "안정적인 기상 방식을 유지하세요",
    ],
    compatibility: {
      best: ["ENTP", "ENFP"],
      good: ["ESTP", "ESFP"],
      avoid: ["ENTJ"],
    },
    emoji: "🧸",
  },
  ESFP: {
    label: "즉흥 기상형",
    summary: "기분에 따라 유연하게 일어나는 활발한 타입",
    description:
      "당신은 알람이 울려도 기분에 따라 유연하게 일어나는 스타일입니다. 때로는 바로 일어나고, 때로는 스누즈를 누르며 상황에 따라 대처합니다. 계획보다는 현재의 기분과 컨디션을 중시하며, 주변 사람들과 함께 즐겁게 하루를 시작합니다.",
    traits: [
      "기분에 따라 유연하게 일어난다",
      "스누즈를 자주 누른다",
      "주변 사람들과 함께 즐긴다",
      "현재의 기분을 중시한다",
      "즉흥적으로 대처한다",
    ],
    picks: ["즐거운 알람 소리", "유연한 알람 시간", "함께하는 기상"],
    tips: [
      "기분에 따라 유연하게 대처하세요",
      "즐거운 알람 소리를 사용하세요",
      "주변 사람들과 함께 기상하세요",
    ],
    compatibility: {
      best: ["INTJ", "INFJ"],
      good: ["ISTJ", "ISFJ"],
      avoid: ["INTP"],
    },
    emoji: "🎉",
  },
  ISFP: {
    label: "조용한 기상형",
    summary: "자신만의 페이스로 조용히 일어나는 예술가",
    description:
      "당신은 알람이 울려도 서두르지 않고 자신만의 페이스로 조용히 일어나는 스타일입니다. 조용한 알람 소리를 선호하며, 일어난 후에도 잠시 여유를 즐깁니다. 계획보다는 감정과 미적 감각을 중시하며, 혼자만의 시간을 소중히 여깁니다.",
    traits: [
      "조용한 알람 소리를 선호한다",
      "자신만의 페이스로 일어난다",
      "일어난 후 여유를 즐긴다",
      "감정과 미적 감각을 중시한다",
      "혼자만의 시간을 소중히 여긴다",
    ],
    picks: ["부드러운 알람 소리", "자연스러운 기상", "예술적인 루틴"],
    tips: [
      "조용한 알람 소리를 사용하세요",
      "자신만의 페이스로 일어나세요",
      "일어난 후 여유 시간을 확보하세요",
    ],
    compatibility: {
      best: ["ENTJ", "ESTJ"],
      good: ["ENFJ", "ESFJ"],
      avoid: ["ENTP"],
    },
    emoji: "🌿",
  },
  ESTJ: {
    label: "규칙 기상형",
    summary: "계획대로 정확하게 일어나서 효율적으로 하루를 시작하는 관리자",
    description:
      "당신은 알람이 울리면 계획대로 정확하게 일어나서 효율적으로 하루를 시작하는 스타일입니다. 정확한 시간에 일어나는 것을 중요하게 생각하며, 일어난 후에도 정해진 루틴을 체계적으로 따릅니다. 계획과 실행을 중시하며, 주변 사람들에게도 효율적인 기상법을 제안합니다.",
    traits: [
      "정확한 시간에 일어난다",
      "정해진 루틴을 체계적으로 따른다",
      "효율적인 기상 방식을 만든다",
      "계획과 실행을 중시한다",
      "주변 사람들에게 제안한다",
    ],
    picks: ["정확한 알람 시간", "체계적인 루틴", "효율적인 기상법"],
    tips: [
      "정확한 시간에 일어나도록 하세요",
      "정해진 루틴을 체계적으로 따르세요",
      "효율적인 기상 방식을 만드세요",
    ],
    compatibility: {
      best: ["INFP", "ISFP"],
      good: ["ENFP", "ESFP"],
      avoid: ["INTP"],
    },
    emoji: "📋",
  },
  ISTJ: {
    label: "정석 기상형",
    summary: "늘 같은 방식으로 규칙적으로 일어나는 신뢰할 수 있는 타입",
    description:
      "당신은 알람이 울리면 늘 같은 방식으로 규칙적으로 일어나는 스타일입니다. 같은 시간, 같은 소리, 같은 방식으로 일어나는 것을 선호하며, 일어난 후에도 정해진 루틴을 꾸준히 따릅니다. 계획과 안정을 중시하며, 신뢰할 수 있는 기상 방식을 만듭니다.",
    traits: [
      "늘 같은 방식으로 일어난다",
      "규칙적인 기상 시간을 유지한다",
      "정해진 루틴을 꾸준히 따른다",
      "안정적인 기상 방식을 선호한다",
      "신뢰할 수 있는 방식을 만든다",
    ],
    picks: ["규칙적인 알람 시간", "안정적인 알람 소리", "정석 기상 루틴"],
    tips: [
      "늘 같은 방식으로 일어나도록 하세요",
      "규칙적인 기상 시간을 유지하세요",
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
    label: "즉응 기상형",
    summary: "알람이 울리면 즉시 반응해서 행동하는 실용주의자",
    description:
      "당신은 알람이 울리면 즉시 반응해서 행동하는 스타일입니다. 생각보다는 행동을 중시하며, 일어난 후 바로 할 일을 시작합니다. 계획보다는 현재 상황에 맞춰 대처하며, 효율적이고 실용적인 기상 방식을 선호합니다.",
    traits: [
      "알람이 울리면 즉시 반응한다",
      "행동을 중시한다",
      "일어난 후 바로 할 일을 시작한다",
      "현재 상황에 맞춰 대처한다",
      "실용적인 기상 방식을 선호한다",
    ],
    picks: ["즉시 반응 알람", "실용적인 루틴", "효율적인 기상법"],
    tips: [
      "알람이 울리면 즉시 반응하세요",
      "일어난 후 바로 할 일을 시작하세요",
      "실용적인 기상 방식을 만드세요",
    ],
    compatibility: {
      best: ["INFJ", "INTP"],
      good: ["ENFJ", "ENTP"],
      avoid: ["ISFJ"],
    },
    emoji: "⚡",
  },
  ISTP: {
    label: "실용 기상형",
    summary: "필요할 때만 일어나서 효율적으로 처리하는 기술자",
    description:
      "당신은 알람이 울리면 필요할 때만 일어나서 효율적으로 처리하는 스타일입니다. 불필요한 시간을 낭비하지 않고, 일어난 후에도 필요한 것만 처리합니다. 계획보다는 실용성과 효율성을 중시하며, 혼자만의 시간에 집중합니다.",
    traits: [
      "필요할 때만 일어난다",
      "불필요한 시간을 낭비하지 않는다",
      "일어난 후 필요한 것만 처리한다",
      "실용성과 효율성을 중시한다",
      "혼자만의 시간에 집중한다",
    ],
    picks: ["필요한 알람만", "효율적인 루틴", "실용적인 기상법"],
    tips: [
      "필요할 때만 일어나도록 하세요",
      "불필요한 시간을 낭비하지 마세요",
      "효율적인 기상 방식을 만드세요",
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
  const mbtiType = (searchParams.get("type") as keyof typeof alarmTypes) || "ENFP"
  const resultId = searchParams.get("id") || undefined
  const character = alarmTypes[mbtiType]
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
        {/* Character Card */}
        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur mb-8">
          <CardContent className="p-8 text-center">
            <div className="space-y-6">
              <div className="text-8xl mb-4">{character.emoji}</div>

              <div>
                <Badge
                  variant="secondary"
                  className="mb-4 bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                >
                  {mbtiType}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{character.label}</h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium mb-4">"{character.summary}"</p>
                <p className="text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto">
                  {character.description}
                </p>
              </div>

              {/* Share Buttons */}
              <div className="flex flex-col items-center space-y-4">
                <ShareButtons
                  testId="morning-alarm"
                  testPath="/tests/morning-alarm/test"
                  resultType={mbtiType}
                  resultId={loadedResult?.id || resultId}
                  title={`나는 ⏰ ${character.label}(${mbtiType})! 너는 어떤 알람러야?`}
                  description={character.summary}
                />
                <Button variant="outline" size="lg" asChild>
                  <Link href="/tests/morning-alarm/test">
                    <RotateCcw className="h-5 w-5 mr-2" />
                    다시 테스트
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Traits */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <span>⏰</span>
              <span>당신의 알람 특징</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.traits.map((trait, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 rounded-lg"
                >
                  <p className="font-medium text-center">{trait}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Picks */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <span>🔔</span>
              <span>추천 알람 설정</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.picks.map((pick, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 rounded-lg"
                >
                  <p className="font-medium text-center">{pick}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <span>💡</span>
              <span>기상 팁</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3">
              {character.tips.map((tip, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="text-orange-500 font-bold">{index + 1}.</span>
                  <p className="text-lg leading-relaxed text-muted-foreground flex-1">{tip}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Compatibility */}
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

        {/* Other Tests */}
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
                  slug: "alarm-habit",
                  title: "알람 습관",
                  emoji: "⏰",
                  description: "알람 습관으로 알아보는 성격",
                  participants: "0",
                },
                {
                  slug: "morning-coffee",
                  title: "아침 커피",
                  emoji: "☕",
                  description: "아침 커피 습관으로 알아보는 성격",
                  participants: "0",
                },
                {
                  slug: "evening-routine",
                  title: "저녁 루틴",
                  emoji: "🌙",
                  description: "저녁 루틴으로 알아보는 성격",
                  participants: "0",
                },
                {
                  slug: "sleep-chronotype",
                  title: "수면 시간대",
                  emoji: "😴",
                  description: "수면 시간대로 알아보는 성격",
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

        {/* 다른 테스트하기 버튼 */}
        <div className="mt-8 text-center">
          <Link href="/tests">
            <Button
              variant="outline"
              className="border-2 border-orange-300 hover:bg-orange-50 font-medium py-6 px-8 bg-transparent"
            >
              다른 테스트하기
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default function MorningAlarmResult() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  )
}

