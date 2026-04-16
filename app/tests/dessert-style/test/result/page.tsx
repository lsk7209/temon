"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, Cake, Sparkles } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { ShareButtons } from "@/components/share-buttons"
import { getTestResult } from "@/lib/api-client"

const dessertCharacters = {
  ENFP: {
    name: "즉흥 스위트러",
    emoji: "🎈",
    summary: "오늘의 기분에 따라 선택!",
    description: [
      "오늘의 기분에 따라 디저트를 선택하는 당신은 즉흥 스위트러예요. 오늘은 새로운 메뉴를 시도하고, 감성 분위기 중심으로 사진을 찍어요.",
      "무스·티라미수 등 신메뉴를 좋아하며, 즉흥적으로 카페에 들어가요. 빠르게 흡입하며 즐기는 자유롭고 감각적인 스타일이에요.",
      "디저트 선택에 감성비를 중시하며, 오늘만 괜찮겠지?라고 생각하는 낭만적인 스타일이에요.",
    ],
    recommendedDessert: ["마카롱", "크로플"],
    recommendedAction: "오늘은 달콤한 모험이 필요해요! 새로운 디저트를 시도해보세요 🍬",
    compatibleTypes: ["INFJ", "INTJ", "ENFJ"],
    shareText: "나는 🍫 즉흥 스위트러(ENFP)! 너는 어떤 디저트러야?",
  },
  ENFJ: {
    name: "배려 디저트러",
    emoji: "🤝",
    summary: "친구 취향까지 챙기는 따뜻한 사람",
    description: [
      "친구 취향까지 챙기는 따뜻한 당신은 배려 디저트러예요. 달콤·진한 맛을 좋아하지만, 모두가 좋아할 맛을 선택해요.",
      "아무 자리나 상관없지만, 후기를 꼼꼼히 확인하며 천천히 음미해요. 친구가 고른 디저트가 더 맛있으면 나도 그걸 시킬 걸 후회하는 공감형 스타일이에요.",
      "생크림 케이크처럼 고전적이지만 따뜻한 디저트를 좋아하는 배려심 많은 스타일이에요.",
    ],
    recommendedDessert: ["생크림 케이크"],
    recommendedAction: "친구들과 함께 즐기되, 자신의 취향도 잊지 마세요.",
    compatibleTypes: ["INFP", "ISFP", "ENFP"],
    shareText: "나는 🍫 배려 디저트러(ENFJ)! 너는 어떤 디저트러야?",
  },
  ENTJ: {
    name: "완벽 디저트러",
    emoji: "🧱",
    summary: "맛, 가격, 브랜드 모두 분석",
    description: [
      "맛, 가격, 브랜드를 모두 분석하는 당신은 완벽 디저트러예요. 늘 먹는 메뉴를 선호하지만, 담백·깔끔한 맛을 좋아해요.",
      "음식 중심 구도로 사진을 찍고, 생크림 고전파이며, 후기를 꼼꼼히 확인해요. 초코칩 쿠키를 선택하며, 식사빵 위주로 고르는 효율적인 스타일이에요.",
      "가성비를 중시하며, 미련 없이 거절할 수 있는 완벽주의 스타일이에요.",
    ],
    recommendedDessert: ["치즈케이크"],
    recommendedAction: "완벽한 선택은 좋지만, 가끔은 즉흥적으로 즐기는 것도 좋아요.",
    compatibleTypes: ["INFP", "ISFP", "INTP"],
    shareText: "나는 🍫 완벽 디저트러(ENTJ)! 너는 어떤 디저트러야?",
  },
  ENTP: {
    name: "실험 디저트러",
    emoji: "🧪",
    summary: "신메뉴·이색 조합을 시도",
    description: [
      "신메뉴와 이색 조합을 시도하는 당신은 실험 디저트러예요. 오늘은 새로운 메뉴를 시도하고, 감성 분위기 중심으로 사진을 찍어요.",
      "무스·티라미수 등 신메뉴를 좋아하며, 즉흥적으로 카페에 들어가요. 말차 쿠키를 선택하며, 빠르게 흡입하는 호기심 많은 스타일이에요.",
      "감성비를 중시하며, 창의적이고 실험적인 스타일이에요.",
    ],
    recommendedDessert: ["수플레 팬케이크"],
    recommendedAction: "새로운 걸 시도하되, 가끔은 검증된 디저트도 좋아요.",
    compatibleTypes: ["INFJ", "INTJ", "ISFJ"],
    shareText: "나는 🍫 실험 디저트러(ENTP)! 너는 어떤 디저트러야?",
  },
  ESFJ: {
    name: "함께 먹는 디저트러",
    emoji: "😊",
    summary: "모두가 좋아할 맛을 선택",
    description: [
      "모두가 좋아할 맛을 선택하는 당신은 함께 먹는 디저트러예요. 달콤·진한 맛을 좋아하며, 아무 자리나 상관없어요.",
      "음식 중심 구도로 사진을 찍고, 생크림 고전파이며, 후기를 꼼꼼히 확인해요. 친구가 고른 디저트가 더 맛있으면 나도 그걸 시킬 걸 후회하는 사교적인 스타일이에요.",
      "빠르게 흡입하며, 오늘만 괜찮겠지?라고 생각하는 따뜻한 스타일이에요.",
    ],
    recommendedDessert: ["티라미수"],
    recommendedAction: "친구들과 함께 즐기며 즐거운 시간을 보내세요!",
    compatibleTypes: ["ISFP", "ISTP", "ISFJ"],
    shareText: "나는 🍫 함께 먹는 디저트러(ESFJ)! 너는 어떤 디저트러야?",
  },
  ESFP: {
    name: "감성 디저트러",
    emoji: "📸",
    summary: "맛보다 예쁜 게 먼저!",
    description: [
      "맛보다 예쁜 게 먼저인 당신은 감성 디저트러예요. 오늘은 새로운 메뉴를 시도하고, 감성 분위기 중심으로 사진을 찍어요.",
      "무스·티라미수 등 신메뉴를 좋아하며, 즉흥적으로 카페에 들어가요. 친구가 고른 디저트가 더 맛있으면 나도 그걸 시킬 걸 후회하는 감정형 스타일이에요.",
      "달달한 디저트빵 위주로 고르며, 빠르게 흡입하고, 감성비를 중시하는 트렌디한 스타일이에요.",
    ],
    recommendedDessert: ["딸기 쇼트케이크"],
    recommendedAction: "감성으로 선택하되, 가끔은 맛도 고려해보세요.",
    compatibleTypes: ["ISFJ", "ISTJ", "ISFP"],
    shareText: "나는 🍫 감성 디저트러(ESFP)! 너는 어떤 디저트러야?",
  },
  ESTJ: {
    name: "실속 디저트러",
    emoji: "📋",
    summary: "가격·양·만족도 기준",
    description: [
      "가격·양·만족도를 기준으로 선택하는 당신은 실속 디저트러예요. 늘 먹는 메뉴를 선호하며, 담백·깔끔한 맛을 좋아해요.",
      "음식 중심 구도로 사진을 찍고, 생크림 고전파이며, 후기를 꼼꼼히 확인해요. 초코칩 쿠키를 선택하며, 식사빵 위주로 고르는 현실적인 스타일이에요.",
      "가성비를 중시하며, 미련 없이 거절할 수 있는 실용적인 스타일이에요.",
    ],
    recommendedDessert: ["카스텔라"],
    recommendedAction: "실속 있는 선택은 좋지만, 가끔은 감성 쇼핑도 즐겨보세요.",
    compatibleTypes: ["ISFP", "INFP", "ISTP"],
    shareText: "나는 🍫 실속 디저트러(ESTJ)! 너는 어떤 디저트러야?",
  },
  ESTP: {
    name: "빠른 결정러",
    emoji: "⚡",
    summary: "보고 바로 주문!",
    description: [
      "보고 바로 주문하는 당신은 빠른 결정러예요. 오늘은 새로운 메뉴를 시도하고, 감성 분위기 중심으로 사진을 찍어요.",
      "무스·티라미수 등 신메뉴를 좋아하며, 즉흥적으로 카페에 들어가요. 그냥 참고 내 것 먹으며, 빠르게 흡입하는 직관적인 스타일이에요.",
      "달달한 디저트빵 위주로 고르며, 감성비를 중시하는 실행력 있는 스타일이에요.",
    ],
    recommendedDessert: ["도넛", "쿠키"],
    recommendedAction: "빠른 결정은 좋지만, 가끔은 신중하게 고민해보세요.",
    compatibleTypes: ["ISFJ", "ISTJ", "INFJ"],
    shareText: "나는 🍫 빠른 결정러(ESTP)! 너는 어떤 디저트러야?",
  },
  INFP: {
    name: "감성 초코러",
    emoji: "🌙",
    summary: "디저트에 감정을 담는 낭만파",
    description: [
      "디저트에 감정을 담는 낭만파인 당신은 감성 초코러예요. 오늘은 새로운 메뉴를 시도하고, 감성 분위기 중심으로 사진을 찍어요.",
      "무스·티라미수 등 신메뉴를 좋아하며, 창가 자리를 선호해요. 친구가 고른 디저트가 더 맛있으면 나도 그걸 시킬 걸 후회하며, 천천히 음미하는 내면형 스타일이에요.",
      "달달한 디저트빵 위주로 고르며, 감성비를 중시하는 예술감각 있는 스타일이에요.",
    ],
    recommendedDessert: ["다크초콜릿", "브라우니"],
    recommendedAction: "감성으로 선택하되, 가끔은 실용성도 고려해보세요.",
    compatibleTypes: ["ENFJ", "ENTJ", "INFJ"],
    shareText: "나는 🍫 감성 초코러(INFP)! 너는 어떤 디저트러야?",
  },
  INFJ: {
    name: "사색 디저트러",
    emoji: "📖",
    summary: "분위기와 의미를 중요시",
    description: [
      "분위기와 의미를 중요시하는 당신은 사색 디저트러예요. 오늘은 새로운 메뉴를 시도하지만, 담백·깔끔한 맛을 좋아해요.",
      "감성 분위기 중심으로 사진을 찍고, 창가 자리를 선호해요. 후기를 꼼꼼히 확인하며, 말차 쿠키를 선택하는 철학적인 스타일이에요.",
      "천천히 음미하며, 감성비를 중시하는 감정조절형 스타일이에요.",
    ],
    recommendedDessert: ["밀크티 케이크"],
    recommendedAction: "신중한 선택은 좋지만, 가끔은 즉흥적으로 즐겨보세요.",
    compatibleTypes: ["ENFP", "ENTP", "INFP"],
    shareText: "나는 🍫 사색 디저트러(INFJ)! 너는 어떤 디저트러야?",
  },
  INTJ: {
    name: "전략 디저트러",
    emoji: "📐",
    summary: "효율과 품질 중심 선택",
    description: [
      "효율과 품질을 중심으로 선택하는 당신은 전략 디저트러예요. 늘 먹는 메뉴를 선호하며, 담백·깔끔한 맛을 좋아해요.",
      "음식 중심 구도로 사진을 찍고, 생크림 고전파이며, 후기를 꼼꼼히 확인해요. 창가 자리를 선호하며, 초코칩 쿠키를 선택하는 계획적인 스타일이에요.",
      "식사빵 위주로 고르며, 가성비를 중시하고, 미련 없이 거절할 수 있는 냉정한 스타일이에요.",
    ],
    recommendedDessert: ["바스크 치즈케이크"],
    recommendedAction: "계획적인 선택은 좋지만, 가끔은 감성 쇼핑도 즐겨보세요.",
    compatibleTypes: ["ENFP", "ENTP", "ENTJ"],
    shareText: "나는 🍫 전략 디저트러(INTJ)! 너는 어떤 디저트러야?",
  },
  INTP: {
    name: "분석 디저트러",
    emoji: "🔬",
    summary: "원재료와 조합까지 분석",
    description: [
      "원재료와 조합까지 분석하는 당신은 분석 디저트러예요. 늘 먹는 메뉴를 선호하지만, 담백·깔끔한 맛을 좋아해요.",
      "음식 중심 구도로 사진을 찍고, 창가 자리를 선호해요. 후기를 꼼꼼히 확인하며, 말차 쿠키를 선택하는 탐구형 스타일이에요.",
      "식사빵 위주로 고르며, 그냥 참고 내 것 먹고, 가성비를 중시하는 논리적인 스타일이에요.",
    ],
    recommendedDessert: ["쿠키 & 크럼블"],
    recommendedAction: "분석적인 선택은 좋지만, 가끔은 감으로 선택해보세요.",
    compatibleTypes: ["ENFJ", "ENTJ", "ENTP"],
    shareText: "나는 🍫 분석 디저트러(INTP)! 너는 어떤 디저트러야?",
  },
  ISFJ: {
    name: "따뜻한 디저트러",
    emoji: "🧸",
    summary: "정 붙은 단골 디저트만 고수",
    description: [
      "정 붙은 단골 디저트만 고수하는 당신은 따뜻한 디저트러예요. 늘 먹는 메뉴를 선호하며, 달콤·진한 맛을 좋아해요.",
      "음식 중심 구도로 사진을 찍고, 생크림 고전파이며, 후기를 꼼꼼히 확인해요. 창가 자리를 선호하며, 친구가 고른 디저트가 더 맛있으면 나도 그걸 시킬 걸 후회하는 안정형 스타일이에요.",
      "초코칩 쿠키를 선택하며, 천천히 음미하고, 가성비를 중시하는 친화적인 스타일이에요.",
    ],
    recommendedDessert: ["크림빵", "카라멜 라떼"],
    recommendedAction: "단골 메뉴는 좋지만, 가끔은 새로운 디저트도 시도해보세요.",
    compatibleTypes: ["ESFP", "ESTP", "ESFJ"],
    shareText: "나는 🍫 따뜻한 디저트러(ISFJ)! 너는 어떤 디저트러야?",
  },
  ISFP: {
    name: "감각 힐링러",
    emoji: "🌷",
    summary: "디저트=위로와 쉼",
    description: [
      "디저트를 위로와 쉼으로 생각하는 당신은 감각 힐링러예요. 오늘은 새로운 메뉴를 시도하고, 감성 분위기 중심으로 사진을 찍어요.",
      "무스·티라미수 등 신메뉴를 좋아하며, 창가 자리를 선호해요. 친구가 고른 디저트가 더 맛있으면 나도 그걸 시킬 걸 후회하며, 천천히 음미하는 감성형 스타일이에요.",
      "말차 쿠키를 선택하며, 달달한 디저트빵 위주로 고르고, 감성비를 중시하는 예술적인 스타일이에요.",
    ],
    recommendedDessert: ["말차 케이크", "플로럴 티"],
    recommendedAction: "감성으로 선택하되, 가끔은 실용성도 고려해보세요.",
    compatibleTypes: ["ENFJ", "ESFJ", "ESTJ"],
    shareText: "나는 🍫 감각 힐링러(ISFP)! 너는 어떤 디저트러야?",
  },
  ISTJ: {
    name: "정석 디저트러",
    emoji: "📦",
    summary: "늘 같은 메뉴, 변함 없는 취향",
    description: [
      "늘 같은 메뉴, 변함 없는 취향인 당신은 정석 디저트러예요. 늘 먹는 메뉴를 선호하며, 담백·깔끔한 맛을 좋아해요.",
      "음식 중심 구도로 사진을 찍고, 생크림 고전파이며, 후기를 꼼꼼히 확인해요. 창가 자리를 선호하며, 초코칩 쿠키를 선택하는 규칙적인 스타일이에요.",
      "식사빵 위주로 고르며, 천천히 음미하고, 가성비를 중시하는 전통적인 스타일이에요.",
    ],
    recommendedDessert: ["카스텔라", "롤케이크"],
    recommendedAction: "안정적인 선택은 좋지만, 가끔은 새로운 디저트도 시도해보세요.",
    compatibleTypes: ["ESFP", "ENFP", "ESTP"],
    shareText: "나는 🍫 정석 디저트러(ISTJ)! 너는 어떤 디저트러야?",
  },
  ISTP: {
    name: "실용 디저트러",
    emoji: "🛠",
    summary: "빠르고 깔끔한 선택",
    description: [
      "빠르고 깔끔한 선택을 하는 당신은 실용 디저트러예요. 늘 먹는 메뉴를 선호하지만, 담백·깔끔한 맛을 좋아해요.",
      "음식 중심 구도로 사진을 찍고, 창가 자리를 선호해요. 즉흥적으로 카페에 들어가며, 그냥 참고 내 것 먹는 실용적인 스타일이에요.",
      "초코칩 쿠키를 선택하며, 식사빵 위주로 고르고, 가성비를 중시하는 직관형 스타일이에요.",
    ],
    recommendedDessert: ["쿠키샌드", "크로아상"],
    recommendedAction: "실용적인 선택은 좋지만, 가끔은 감성 쇼핑도 즐겨보세요.",
    compatibleTypes: ["ESFJ", "ENFJ", "ESTP"],
    shareText: "나는 🍫 실용 디저트러(ISTP)! 너는 어떤 디저트러야?",
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const mbtiType = (searchParams.get("type") as keyof typeof dessertCharacters) || "ENFP"
  const resultId = searchParams.get("id") || undefined
  const character = dessertCharacters[mbtiType]
  const [loadedResult, setLoadedResult] = useState<{ id: string; testId: string } | null>(null)

  // 결과 ID가 있으면 결과 정보 로드
  useEffect(() => {
    if (resultId) {
      getTestResult(resultId)
        .then((result) => {
          setLoadedResult({ id: result.id, testId: result.testId })
        })
        .catch((error) => {
          console.error('결과 로드 실패:', error)
        })
    }
  }, [resultId])

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-950 dark:via-orange-950 dark:to-yellow-950">
      {/* Main Result */}
      <main className="container max-w-4xl mx-auto px-4 py-8">
        {/* Character Card */}
        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur mb-8">
          <CardContent className="p-8 text-center">
            <div className="space-y-6">
              <div className="text-8xl mb-4">{character.emoji}</div>

              <div>
                <Badge
                  variant="secondary"
                  className="mb-4 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                >
                  {mbtiType}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{character.name}</h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium">"{character.summary}"</p>
              </div>

              {/* Share Buttons */}
              <div className="flex flex-col items-center space-y-4">
                <ShareButtons
                  testId="dessert-style"
                  testPath="/tests/dessert-style/test"
                  resultType={mbtiType}
                  resultId={loadedResult?.id || resultId}
                  title={character.shareText}
                  description={character.summary}
                />
                <Button variant="outline" size="lg" asChild>
                  <Link href="/tests/dessert-style/test">
                    <RotateCcw className="h-5 w-5 mr-2" />
                    다시 테스트
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <span>🍰</span>
              <span>당신의 디저트 취향</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {character.description.map((paragraph, index) => (
              <p key={index} className="text-lg leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </CardContent>
        </Card>

        {/* Recommended Dessert & Action Tip */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <span>🍮</span>
              <span>추천 디저트 & 꿀팁</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg leading-relaxed text-muted-foreground">
              <strong>추천 디저트:</strong> {character.recommendedDessert.join(", ")}
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              <strong>디저트 꿀팁:</strong> {character.recommendedAction}
            </p>
          </CardContent>
        </Card>

        {/* Compatible Types */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <span>❤️</span>
              <span>잘 맞는 디저트 친구들</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.compatibleTypes.map((type) => {
                const compatibleChar = dessertCharacters[type as keyof typeof dessertCharacters]
                return (
                  <div
                    key={type}
                    className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 rounded-lg text-center"
                  >
                    <div className="text-3xl mb-2">{compatibleChar.emoji}</div>
                    <div className="font-medium">{compatibleChar.name}</div>
                    <div className="text-sm text-muted-foreground">{type}</div>
                  </div>
                )
              })}
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  slug: "coffee-mbti",
                  title: "커피 MBTI",
                  emoji: "☕",
                  description: "커피 취향으로 알아보는 성격",
                  participants: "12.5K",
                },
                {
                  slug: "cafe-style",
                  title: "카페 스타일",
                  emoji: "☕",
                  description: "카페에서의 나 스타일",
                  participants: "0",
                },
                {
                  slug: "food-delivery",
                  title: "배달 음식 선택",
                  emoji: "🍕",
                  description: "배달 습관으로 알아보는 성격",
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
              className="border-2 border-cyan-300 hover:bg-cyan-50 font-medium py-6 px-8 bg-transparent"
            >
              다른 테스트하기
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default function DessertStyleResult() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  )
}

