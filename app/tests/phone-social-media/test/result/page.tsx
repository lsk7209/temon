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

const socialMediaTypes = {
  ENFP: {
    label: "즉흥 SNS러",
    summary: "SNS에 올릴 사진을 즉시 선택하는 활발한 타입",
    description:
      "당신은 SNS에 올릴 사진을 즉시 선택하는 스타일입니다. 인스타에 올릴 사진을 고를 때 바로 선택하고, 빠르게 스크롤하며 피드를 본다. 친구들과 함께 SNS를 보며 이야기하는 것을 좋아하며, 다양한 게시물을 활발하게 공유합니다.",
    traits: [
      "SNS에 올릴 사진을 즉시 선택한다",
      "빠르게 스크롤하며 피드를 본다",
      "친구들과 함께 SNS를 본다",
      "다양한 게시물을 활발하게 공유한다",
      "SNS를 활발하게 사용한다",
    ],
    picks: ["즉시 선택", "활발한 공유", "다양한 게시물"],
    tips: [
      "SNS 사용 시간을 조절해보세요",
      "중요한 게시물은 저장해두세요",
      "과도한 사용을 피하세요",
    ],
    compatibility: {
      best: ["ISTJ", "ISFJ"],
      good: ["ESTJ", "ESFJ"],
      avoid: ["INTJ"],
    },
    emoji: "🌅",
  },
  INFP: {
    label: "여유 SNS러",
    summary: "SNS를 신중하게 사용하는 조용한 타입",
    description:
      "당신은 SNS를 신중하게 사용하는 스타일입니다. 인스타에 올릴 사진을 고를 때 신중하게 선택하고, 하나씩 자세히 보며 피드를 본다. 혼자 조용히 SNS를 보는 것을 좋아하며, 자신만의 감각으로 게시물을 선택합니다.",
    traits: [
      "SNS에 올릴 사진을 신중하게 선택한다",
      "하나씩 자세히 보며 피드를 본다",
      "혼자 조용히 SNS를 본다",
      "자신만의 감각으로 게시물을 선택한다",
      "SNS를 여유롭게 사용한다",
    ],
    picks: ["신중한 선택", "여유로운 사용", "조용한 관람"],
    tips: [
      "SNS 사용 시간을 조절해보세요",
      "중요한 게시물은 저장해두세요",
      "과도한 사용을 피하세요",
    ],
    compatibility: {
      best: ["ENTJ", "ESTJ"],
      good: ["ENFJ", "ESFJ"],
      avoid: ["ESTP"],
    },
    emoji: "😴",
  },
  ENFJ: {
    label: "시간관리 SNS러",
    summary: "정해진 시간에 SNS를 사용하는 계획적인 타입",
    description:
      "당신은 정해진 시간에 SNS를 사용하는 스타일입니다. 정해진 시간에 SNS를 확인하고, 목표에 맞게 게시물을 올립니다. 친구들과 함께 SNS를 보며 이야기하는 것을 좋아하며, 효율적으로 SNS를 사용합니다.",
    traits: [
      "정해진 시간에 SNS를 확인한다",
      "목표에 맞게 게시물을 올린다",
      "친구들과 함께 SNS를 본다",
      "효율적으로 SNS를 사용한다",
      "계획적으로 SNS를 관리한다",
    ],
    picks: ["정해진 시간 사용", "계획적 관리", "효율적인 사용"],
    tips: [
      "SNS 사용 시간을 정해두세요",
      "중요한 게시물은 저장해두세요",
      "과도한 사용을 피하세요",
    ],
    compatibility: {
      best: ["INTP", "ISTP"],
      good: ["ISFP", "INFP"],
      avoid: ["ISTJ"],
    },
    emoji: "⏰",
  },
  INFJ: {
    label: "명상 SNS러",
    summary: "SNS를 최소화하고 깔끔하게 사용하는 전략가",
    description:
      "당신은 SNS를 최소화하고 깔끔하게 사용하는 스타일입니다. 불필요한 게시물은 보지 않으며, 정말 필요한 정보만 확인합니다. 혼자 조용히 SNS를 보며, 자신만의 감각으로 게시물을 선택합니다.",
    traits: [
      "불필요한 게시물은 보지 않는다",
      "정말 필요한 정보만 확인한다",
      "혼자 조용히 SNS를 본다",
      "자신만의 감각으로 게시물을 선택한다",
      "SNS를 최소화한다",
    ],
    picks: ["최소화 사용", "깔끔한 관리", "필요한 정보만"],
    tips: [
      "SNS 사용 시간을 조절해보세요",
      "중요한 게시물은 저장해두세요",
      "과도한 사용을 피하세요",
    ],
    compatibility: {
      best: ["ENFP", "ESFP"],
      good: ["ENTP", "ESTP"],
      avoid: ["ESTJ"],
    },
    emoji: "🧘",
  },
  ENTP: {
    label: "혁신 SNS러",
    summary: "SNS 사용 방법을 자주 바꾸며 실험하는 혁신가",
    description:
      "당신은 SNS 사용 방법을 자주 바꾸며 실험하는 스타일입니다. 새로운 SNS 기능을 발견하면 바로 시도하고, 다양한 앱과 기능을 실험합니다. 효율성과 재미를 동시에 추구하며, 최적의 SNS 사용 방법을 찾기 위해 계속 실험합니다.",
    traits: [
      "SNS 사용 방법을 자주 바꾼다",
      "새로운 SNS 기능을 발견하면 바로 시도한다",
      "다양한 앱과 기능을 실험한다",
      "최적의 SNS 사용 방법을 찾기 위해 실험한다",
      "효율성과 재미를 동시에 추구한다",
    ],
    picks: ["SNS 실험", "새로운 기능", "다양한 앱"],
    tips: [
      "새로운 SNS 기능을 시도해보세요",
      "효과적인 SNS 사용 방법을 기록해두세요",
      "과도한 사용을 피하세요",
    ],
    compatibility: {
      best: ["ISFJ", "ISTJ"],
      good: ["ESFJ", "ESTJ"],
      avoid: ["ISFP"],
    },
    emoji: "📱",
  },
  INTP: {
    label: "분석 SNS러",
    summary: "SNS를 체계적으로 분석하고 최적화하는 분석가",
    description:
      "당신은 SNS를 체계적으로 분석하고 최적화하는 스타일입니다. 새로운 SNS 기능을 발견하면 리뷰를 보고 신중하게 시도하며, 어떤 기능이 좋은지 논리적으로 파악합니다. 자신에게 가장 효과적인 SNS 사용 방법을 찾으며, 효율성을 중시합니다.",
    traits: [
      "새로운 기능을 발견하면 리뷰를 본다",
      "어떤 기능이 좋은지 파악한다",
      "효과적인 SNS 사용 방법을 찾는다",
      "SNS를 체계적으로 최적화한다",
      "효율성을 중시한다",
    ],
    picks: ["SNS 분석", "리뷰 확인", "효율적 최적화"],
    tips: [
      "SNS 사용 시간을 조절해보세요",
      "효과적인 SNS 사용 방법을 기록하세요",
      "과도한 사용을 피하세요",
    ],
    compatibility: {
      best: ["ENFJ", "ESFJ"],
      good: ["ENTJ", "ESTJ"],
      avoid: ["ESFP"],
    },
    emoji: "🎵",
  },
  ENTJ: {
    label: "효율 SNS러",
    summary: "SNS를 즉시 사용하고 효율적으로 관리하는 지도자",
    description:
      "당신은 SNS를 즉시 사용하고 효율적으로 관리하는 스타일입니다. 인스타에 올릴 사진을 고를 때 즉시 선택하고, 효율적으로 빠르게 좋아요를 누릅니다. SNS 사용을 계획적으로 하며, 효율적인 SNS 관리 시스템을 만듭니다.",
    traits: [
      "SNS에 올릴 사진을 즉시 선택한다",
      "효율적으로 빠르게 좋아요를 누른다",
      "SNS 사용을 계획적으로 한다",
      "효율적인 SNS 관리 시스템을 만든다",
      "SNS를 즉시 사용한다",
    ],
    picks: ["즉시 사용", "효율적 관리", "계획적 시스템"],
    tips: [
      "SNS 사용 시간을 정해두세요",
      "중요한 게시물은 저장해두세요",
      "과도한 사용을 피하세요",
    ],
    compatibility: {
      best: ["ISFP", "INFP"],
      good: ["ISFJ", "ISTJ"],
      avoid: ["INTP"],
    },
    emoji: "💪",
  },
  INTJ: {
    label: "야행성 SNS러",
    summary: "자신만의 시간대에 SNS를 사용하는 전략적 사고가",
    description:
      "당신은 자신만의 시간대에 SNS를 사용하는 스타일입니다. 집중할 때는 SNS를 보지 않고, 자신만의 시간에 확인합니다. 새로운 SNS 기능을 발견하면 리뷰를 보고 신중하게 시도하며, 효율적인 SNS 사용 방법을 찾습니다.",
    traits: [
      "집중할 때는 SNS를 보지 않는다",
      "자신만의 시간에 확인한다",
      "새로운 기능을 발견하면 리뷰를 본다",
      "효율적인 SNS 사용 방법을 찾는다",
      "깊이 있게 SNS를 사용한다",
    ],
    picks: ["야행성 사용", "효율적 분석", "전략적 사용"],
    tips: [
      "SNS 사용 시간을 조절해보세요",
      "효과적인 SNS 사용 방법을 기록하세요",
      "과도한 사용을 피하세요",
    ],
    compatibility: {
      best: ["ESFP", "ENFP"],
      good: ["ESTP", "ENTP"],
      avoid: ["ESFJ"],
    },
    emoji: "🌙",
  },
  ESFJ: {
    label: "따뜻한 SNS러",
    summary: "주변 사람들과 함께 SNS를 보며 즐기는 배려심 많은 타입",
    description:
      "당신은 주변 사람들과 함께 SNS를 보며 즐기는 스타일입니다. 친구들과 함께 SNS를 보며 이야기하고, 재미있게 하나씩 좋아요를 누릅니다. 댓글을 재미있게 달며, 사진을 통해 추억을 남깁니다.",
    traits: [
      "친구들과 함께 SNS를 본다",
      "재미있게 하나씩 좋아요를 누른다",
      "댓글을 재미있게 단다",
      "사진을 통해 추억을 남긴다",
      "주변 사람들의 기분을 고려한다",
    ],
    picks: ["함께 사용", "따뜻한 소통", "추억 남기기"],
    tips: [
      "SNS 사용 시간을 조절해보세요",
      "중요한 게시물은 저장해두세요",
      "과도한 사용을 피하세요",
    ],
    compatibility: {
      best: ["INTP", "ISTP"],
      good: ["ENTP", "ESTP"],
      avoid: ["INTJ"],
    },
    emoji: "😊",
  },
  ISFJ: {
    label: "안정 SNS러",
    summary: "규칙적으로 SNS를 사용하며 안정적으로 관리하는 수호자",
    description:
      "당신은 규칙적으로 SNS를 사용하며 안정적으로 관리하는 스타일입니다. 같은 시간에 같은 방식으로 SNS를 확인하며, 정해진 루틴을 따릅니다. 안정적인 SNS 사용 방식을 선호하며, 신뢰할 수 있는 SNS 사용 습관을 만듭니다.",
    traits: [
      "같은 시간에 같은 방식으로 SNS를 확인한다",
      "정해진 루틴을 따른다",
      "안정적인 SNS 사용 방식을 선호한다",
      "신뢰할 수 있는 SNS 사용 습관을 만든다",
      "규칙적인 SNS 사용 습관이 있다",
    ],
    picks: ["규칙적 사용", "안정적 관리", "정해진 루틴"],
    tips: [
      "SNS 사용 시간을 정해두세요",
      "정해진 루틴을 따르세요",
      "과도한 사용을 피하세요",
    ],
    compatibility: {
      best: ["ENTP", "ENFP"],
      good: ["ESTP", "ESFP"],
      avoid: ["ENTJ"],
    },
    emoji: "🧸",
  },
  ESFP: {
    label: "즉흥 SNS러",
    summary: "SNS에 올릴 사진을 즉시 반응해서 선택하는 활발한 타입",
    description:
      "당신은 SNS에 올릴 사진을 즉시 반응해서 선택하는 스타일입니다. 인스타에 올릴 사진을 고를 때 바로 선택하고, 빠르게 스크롤하며 피드를 본다. 친구들과 함께 SNS를 보며 이야기하는 것을 좋아하며, 다양한 게시물을 활발하게 공유합니다.",
    traits: [
      "SNS에 올릴 사진을 즉시 반응한다",
      "빠르게 스크롤하며 피드를 본다",
      "친구들과 함께 SNS를 본다",
      "다양한 게시물을 활발하게 공유한다",
      "SNS를 활발하게 사용한다",
    ],
    picks: ["즉시 반응", "활발한 공유", "다양한 게시물"],
    tips: [
      "SNS 사용 시간을 조절해보세요",
      "중요한 게시물은 저장해두세요",
      "과도한 사용을 피하세요",
    ],
    compatibility: {
      best: ["INTJ", "INFJ"],
      good: ["ISTJ", "ISFJ"],
      avoid: ["INTP"],
    },
    emoji: "🎉",
  },
  ISFP: {
    label: "조용한 SNS러",
    summary: "SNS를 최소화하고 조용히 사용하는 예술가",
    description:
      "당신은 SNS를 최소화하고 조용히 사용하는 스타일입니다. 불필요한 게시물은 보지 않으며, 정말 필요한 정보만 확인합니다. 자신만의 시간에 여유롭게 확인하며, 자신만의 감각으로 게시물을 선택합니다.",
    traits: [
      "불필요한 게시물은 보지 않는다",
      "정말 필요한 정보만 확인한다",
      "자신만의 시간에 여유롭게 확인한다",
      "SNS를 최소화한다",
      "자신만의 감각으로 게시물을 선택한다",
    ],
    picks: ["SNS 최소화", "조용한 사용", "여유로운 확인"],
    tips: [
      "SNS 사용 시간을 조절해보세요",
      "중요한 게시물은 저장해두세요",
      "과도한 사용을 피하세요",
    ],
    compatibility: {
      best: ["ENTJ", "ESTJ"],
      good: ["ENFJ", "ESFJ"],
      avoid: ["ENTP"],
    },
    emoji: "🌿",
  },
  ESTJ: {
    label: "규칙 SNS러",
    summary: "계획대로 정확하게 SNS를 사용하며 효율적으로 관리하는 관리자",
    description:
      "당신은 계획대로 정확하게 SNS를 사용하며 효율적으로 관리하는 스타일입니다. 정확한 시간에 정확한 방식으로 SNS를 확인하며, 정해진 루틴을 체계적으로 따릅니다. SNS 사용을 계획적으로 하며, 효율적인 SNS 관리 시스템을 만듭니다.",
    traits: [
      "정확한 시간에 정확한 방식으로 SNS를 확인한다",
      "정해진 루틴을 체계적으로 따른다",
      "효율적인 SNS 관리 시스템을 만든다",
      "SNS 사용을 계획적으로 한다",
      "계획과 실행을 중시한다",
    ],
    picks: ["정확한 사용", "체계적 관리", "효율적 시스템"],
    tips: [
      "SNS 사용 시간을 정해두세요",
      "정해진 루틴을 체계적으로 따르세요",
      "과도한 사용을 피하세요",
    ],
    compatibility: {
      best: ["INFP", "ISFP"],
      good: ["ENFP", "ESFP"],
      avoid: ["INTP"],
    },
    emoji: "📋",
  },
  ISTJ: {
    label: "정석 SNS러",
    summary: "늘 같은 방식으로 규칙적으로 SNS를 사용하는 신뢰할 수 있는 타입",
    description:
      "당신은 늘 같은 방식으로 규칙적으로 SNS를 사용하는 스타일입니다. 같은 시간, 같은 방식으로 SNS를 확인하며, 정해진 루틴을 꾸준히 따릅니다. 안정적인 SNS 사용 방식을 선호하며, 신뢰할 수 있는 SNS 사용 습관을 만듭니다.",
    traits: [
      "늘 같은 방식으로 SNS를 확인한다",
      "규칙적인 SNS 사용 시간을 유지한다",
      "정해진 루틴을 꾸준히 따른다",
      "안정적인 SNS 사용 방식을 선호한다",
      "신뢰할 수 있는 SNS 사용 습관을 만든다",
    ],
    picks: ["규칙적 사용", "안정적 관리", "정석 루틴"],
    tips: [
      "SNS 사용 시간을 정해두세요",
      "정해진 루틴을 꾸준히 따르세요",
      "과도한 사용을 피하세요",
    ],
    compatibility: {
      best: ["ENFP", "ESFP"],
      good: ["ENTP", "ESTP"],
      avoid: ["ENFJ"],
    },
    emoji: "📦",
  },
  ESTP: {
    label: "즉응 SNS러",
    summary: "SNS에 올릴 사진을 즉시 반응해서 선택하는 실용주의자",
    description:
      "당신은 SNS에 올릴 사진을 즉시 반응해서 선택하는 스타일입니다. 인스타에 올릴 사진을 고를 때 바로 선택하고, 빠르게 스크롤하며 피드를 본다. 생각보다는 행동을 중시하며, 효율적이고 실용적인 SNS 사용 방식을 선호합니다.",
    traits: [
      "SNS에 올릴 사진을 즉시 반응한다",
      "빠르게 스크롤하며 피드를 본다",
      "바로 게시물을 올린다",
      "행동을 중시한다",
      "실용적인 SNS 사용 방식을 선호한다",
    ],
    picks: ["즉시 반응", "실용적 사용", "빠른 선택"],
    tips: [
      "SNS 사용 시간을 조절해보세요",
      "중요한 게시물은 저장해두세요",
      "과도한 사용을 피하세요",
    ],
    compatibility: {
      best: ["INFJ", "INTP"],
      good: ["ENFJ", "ENTP"],
      avoid: ["ISFJ"],
    },
    emoji: "⚡",
  },
  ISTP: {
    label: "실용 SNS러",
    summary: "필요할 때만 SNS를 사용하며 효율적으로 처리하는 기술자",
    description:
      "당신은 필요할 때만 SNS를 사용하며 효율적으로 처리하는 스타일입니다. 불필요한 게시물은 보지 않으며, 정말 필요한 정보만 확인합니다. 효율적이고 실용적인 SNS 사용 방식을 선호하며, 새로운 기능을 발견하면 리뷰를 확인합니다.",
    traits: [
      "필요할 때만 SNS를 확인한다",
      "불필요한 게시물은 보지 않는다",
      "정말 필요한 정보만 확인한다",
      "효율적이고 실용적인 방식을 선호한다",
      "새로운 기능을 발견하면 리뷰를 확인한다",
    ],
    picks: ["필요시 사용", "효율적 관리", "실용적 방식"],
    tips: [
      "SNS 사용 시간을 조절해보세요",
      "효과적인 SNS 사용 방법을 기록하세요",
      "과도한 사용을 피하세요",
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
  const mbtiType = (searchParams.get("type") as keyof typeof socialMediaTypes) || "ENFP"
  const resultId = searchParams.get("id") || undefined
  const character = socialMediaTypes[mbtiType]
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
                  testId="phone-social-media"
                  testPath="/tests/phone-social-media/test"
                  resultType={mbtiType}
                  resultId={loadedResult?.id || resultId}
                  title={`나는 📱 ${character.label}(${mbtiType})! 너는 어떤 SNS러야?`}
                  description={character.summary}
                />
                <Button variant="outline" size="lg" asChild>
                  <Link href="/tests/phone-social-media/test">
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
              <span>📱</span>
              <span>당신의 SNS 사용 특징</span>
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
              <span>💬</span>
              <span>추천 SNS 스타일</span>
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
              <span>SNS 팁</span>
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
                {
                  slug: "phone-battery",
                  title: "배터리 관리",
                  emoji: "🔋",
                  description: "배터리 관리로 알아보는 성격",
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

export default function PhoneSocialMediaResult() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  )
}


