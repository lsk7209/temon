"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, ShoppingBag, Sparkles } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { ShareButtons } from "@/components/share-buttons"
import { getTestResult } from "@/lib/api-client"

const shoppingCharacters = {
  ENFP: {
    name: "즉흥 소비러",
    emoji: "🎈",
    summary: "오늘만 산다! 감정 따라 지름",
    description: [
      "세일 문구를 보면 일단 클릭! 디자인과 감성을 우선시하며, 느낌이 오면 바로 구매하는 당신은 즉흥 소비러예요.",
      "쇼핑몰 추천 상품을 보면 설레서 클릭하고, 할인 알림이 오면 바로 들어가봐요. 예상 밖 발견이 즐거운 스타일이에요.",
      "충동적이지만 긍정적이고, 트렌디한 아이템을 좋아하는 당신의 쇼핑 스타일이에요.",
    ],
    recommendedShopping: ["SNS 쇼핑", "한정판"],
    recommendedAction: "오늘의 기분에 맞춰 쇼핑하되, 가끔은 계획적인 구매도 고려해보세요!",
    compatibleTypes: ["INFJ", "INTJ", "ENFJ"],
    shareText: "나는 💳 즉흥 소비러(ENFP)! 너는 어떤 쇼핑러야?",
  },
  ENFJ: {
    name: "배려 구매러",
    emoji: "🤝",
    summary: "선물용 쇼핑에 진심인 타입",
    description: [
      "친구가 \"이거 어때?\" 물으면 \"너랑 잘 어울려!\"라고 말하며 배려하는 당신은 배려 구매러예요.",
      "쇼핑몰 추천 상품을 보면 설레서 클릭하고, 할인 알림이 오면 바로 들어가봐요. 충분히 비교 후 결정하지만, 상대를 배려하는 스타일이에요.",
      "공감형이고 관계 중심이며, 선물용 쇼핑에 진심인 따뜻한 스타일이에요.",
    ],
    recommendedShopping: ["기프트샵", "맞춤형"],
    recommendedAction: "상대를 배려하되, 자신의 취향도 잊지 마세요.",
    compatibleTypes: ["INFP", "ISFP", "ENFP"],
    shareText: "나는 💳 배려 구매러(ENFJ)! 너는 어떤 쇼핑러야?",
  },
  ENTJ: {
    name: "전략 구매러",
    emoji: "🧱",
    summary: "가격·품질 모두 계산형",
    description: [
      "계획에 없으면 패스하고, 충분히 비교 후 결정하며, 전부 계산해본 후 장바구니에 담는 당신은 전략 구매러예요.",
      "신뢰도가 중요한 브랜드를 선호하며, 할인·적립을 계산 중인 효율적인 스타일이에요.",
      "가격과질을 모두 계산하며, 효율과 계획을 중시하는 리더십 있는 스타일이에요.",
    ],
    recommendedShopping: ["하이엔드", "세트 구성"],
    recommendedAction: "전략적인 구매는 좋지만, 가끔은 즉흥적으로 즐기는 것도 좋아요.",
    compatibleTypes: ["INFP", "ISFP", "INTP"],
    shareText: "나는 💳 전략 구매러(ENTJ)! 너는 어떤 쇼핑러야?",
  },
  ENTP: {
    name: "실험 쇼퍼",
    emoji: "🧪",
    summary: "신제품·이색템 탐험가",
    description: [
      "세일 문구를 보면 일단 클릭! 디자인과 감성을 우선시하며, 새로운 브랜드 도전을 즐기는 당신은 실험 쇼퍼예요.",
      "쇼핑몰 추천 상품을 보면 설레서 클릭하고, 예상 밖 발견이 즐거운 호기심 많은 스타일이에요.",
      "신제품과 이색템을 탐험하는 것을 좋아하며, 도전과 유머를 즐기는 스타일이에요.",
    ],
    recommendedShopping: ["펀샵", "신기템"],
    recommendedAction: "새로운 걸 시도하되, 가끔은 검증된 제품도 좋아요.",
    compatibleTypes: ["INFJ", "INTJ", "ISFJ"],
    shareText: "나는 💳 실험 쇼퍼(ENTP)! 너는 어떤 쇼핑러야?",
  },
  ESFJ: {
    name: "공유 쇼퍼",
    emoji: "😊",
    summary: "친구와 쇼핑하는 게 즐거움",
    description: [
      "친구가 \"이거 어때?\" 물으면 \"너랑 잘 어울려!\"라고 말하며, 쇼핑몰 추천 상품을 보면 설레서 클릭하는 당신은 공유 쇼퍼예요.",
      "할인 알림이 오면 바로 들어가봐요. 충분히 비교 후 결정하지만, 함께 쇼핑하는 것을 좋아하는 사교적인 스타일이에요.",
      "따뜻하고 사교적이며, 친구와 함께 쇼핑하는 게 즐거운 스타일이에요.",
    ],
    recommendedShopping: ["오프라인 매장"],
    recommendedAction: "친구들과 함께 쇼핑하며 즐거운 시간을 보내세요!",
    compatibleTypes: ["ISFP", "ISTP", "ISFJ"],
    shareText: "나는 💳 공유 쇼퍼(ESFJ)! 너는 어떤 쇼핑러야?",
  },
  ESFP: {
    name: "감성 쇼퍼",
    emoji: "📸",
    summary: "분위기와 감정이 먼저",
    description: [
      "세일 문구를 보면 일단 클릭! 디자인과 감성을 우선시하며, 느낌이 오면 바로 구매하는 당신은 감성 쇼퍼예요.",
      "쇼핑몰 추천 상품을 보면 설레서 클릭하고, 할인 알림이 오면 바로 들어가봐요. 예상 밖 발견이 즐거운 즉흥적인 스타일이에요.",
      "분위기와 감정이 먼저이며, 트렌디하고 감각적인 스타일이에요.",
    ],
    recommendedShopping: ["인플루언서샵", "패션 브랜드"],
    recommendedAction: "감성으로 쇼핑하되, 가끔은 실용성도 고려해보세요.",
    compatibleTypes: ["ISFJ", "ISTJ", "ISFP"],
    shareText: "나는 💳 감성 쇼퍼(ESFP)! 너는 어떤 쇼핑러야?",
  },
  ESTJ: {
    name: "실속 쇼퍼",
    emoji: "📋",
    summary: "가성비·기능 중시형",
    description: [
      "계획에 없으면 패스하고, 품질과 후기를 우선시하며, 충분히 비교 후 결정하는 당신은 실속 쇼퍼예요.",
      "신뢰도가 중요한 브랜드를 선호하며, 전부 계산해본 후 장바구니에 담아요. 주기적으로 옷장을 정리하는 체계적인 스타일이에요.",
      "가성비와 기능을 중시하며, 합리적이고 현실적인 스타일이에요.",
    ],
    recommendedShopping: ["아웃렛", "쿠폰활용"],
    recommendedAction: "실속 있는 쇼핑은 좋지만, 가끔은 감성 쇼핑도 즐겨보세요.",
    compatibleTypes: ["ISFP", "INFP", "ISTP"],
    shareText: "나는 💳 실속 쇼퍼(ESTJ)! 너는 어떤 쇼핑러야?",
  },
  ESTP: {
    name: "빠른 결제러",
    emoji: "⚡",
    summary: "보고 괜찮으면 바로 결제",
    description: [
      "세일 문구를 보면 일단 클릭! 느낌이 오면 바로 구매하며, 그냥 담고 기분 봐서 결정하는 당신은 빠른 결제러예요.",
      "쇼핑몰 추천 상품을 보면 설레서 클릭하고, 할인 알림이 오면 바로 들어가봐요. '몰라 그냥 사자!'라고 생각하는 속전속결 스타일이에요.",
      "직관적이고 실행력이 강하며, 보고 괜찮으면 바로 결제하는 스타일이에요.",
    ],
    recommendedShopping: ["스트릿 브랜드"],
    recommendedAction: "빠른 결정은 좋지만, 가끔은 신중하게 고민해보세요.",
    compatibleTypes: ["ISFJ", "ISTJ", "INFJ"],
    shareText: "나는 💳 빠른 결제러(ESTP)! 너는 어떤 쇼핑러야?",
  },
  INFP: {
    name: "감성 수집러",
    emoji: "🌙",
    summary: "의미와 감정이 담긴 소비",
    description: [
      "디자인과 감성을 우선시하며, 느낌이 오면 바로 구매하는 당신은 감성 수집러예요.",
      "쇼핑몰 추천 상품은 참고만 하고, 할인 알림은 무시하거나 저장해요. 예상 밖 발견이 즐거운 감정형 스타일이에요.",
      "의미와 감정이 담긴 소비를 좋아하며, 낭만적이고 내향적인 스타일이에요.",
    ],
    recommendedShopping: ["독립 브랜드"],
    recommendedAction: "감성으로 쇼핑하되, 가끔은 실용성도 고려해보세요.",
    compatibleTypes: ["ENFJ", "ENTJ", "INFJ"],
    shareText: "나는 💳 감성 수집러(INFP)! 너는 어떤 쇼핑러야?",
  },
  INFJ: {
    name: "사색 쇼퍼",
    emoji: "📖",
    summary: "신중하지만 감성적",
    description: [
      "디자인과 감성을 우선시하며, 충분히 비교 후 결정하는 당신은 사색 쇼퍼예요.",
      "새로운 브랜드 도전을 즐기지만, 쇼핑몰 추천 상품은 참고만 하고, 할인 알림은 무시하거나 저장해요.",
      "신중하지만 감성적이며, 분석적이고 이상을 추구하는 스타일이에요.",
    ],
    recommendedShopping: ["친환경 브랜드"],
    recommendedAction: "신중한 구매는 좋지만, 가끔은 즉흥적으로 즐겨보세요.",
    compatibleTypes: ["ENFP", "ENTP", "INFP"],
    shareText: "나는 💳 사색 쇼퍼(INFJ)! 너는 어떤 쇼핑러야?",
  },
  INTJ: {
    name: "계획 쇼퍼",
    emoji: "📐",
    summary: "목표형 소비, 계획적",
    description: [
      "계획에 없으면 패스하고, 품질과 후기를 우선시하며, 충분히 비교 후 결정하는 당신은 계획 쇼퍼예요.",
      "전부 계산해본 후 장바구니에 담고, 신뢰도가 중요한 브랜드를 선호해요. 주기적으로 옷장을 정리하며, 할인·적립을 계산 중인 완벽주의 스타일이에요.",
      "목표형 소비를 하며, 계획적이고 분석적인 스타일이에요.",
    ],
    recommendedShopping: ["테크·고품질 브랜드"],
    recommendedAction: "계획적인 쇼핑은 좋지만, 가끔은 감성 쇼핑도 즐겨보세요.",
    compatibleTypes: ["ENFP", "ENTP", "ENTJ"],
    shareText: "나는 💳 계획 쇼퍼(INTJ)! 너는 어떤 쇼핑러야?",
  },
  INTP: {
    name: "비교 연구러",
    emoji: "🔬",
    summary: "리뷰·가격·스펙 분석러",
    description: [
      "품질과 후기를 우선시하며, 충분히 비교 후 결정하는 당신은 비교 연구러예요.",
      "전부 계산해본 후 장바구니에 담고, 냉정하게 판단해요. 쇼핑몰 추천 상품은 참고만 하고, 할인 알림은 무시하거나 저장해요.",
      "리뷰와 가격, 스펙을 분석하며, 탐구적이고 논리적인 스타일이에요.",
    ],
    recommendedShopping: ["전자제품", "데이터 기반"],
    recommendedAction: "분석적인 쇼핑은 좋지만, 가끔은 감으로 선택해보세요.",
    compatibleTypes: ["ENFJ", "ENTJ", "ENTP"],
    shareText: "나는 💳 비교 연구러(INTP)! 너는 어떤 쇼핑러야?",
  },
  ISFJ: {
    name: "챙김 쇼퍼",
    emoji: "🧸",
    summary: "가족·연인 위한 구매형",
    description: [
      "품질과 후기를 우선시하며, 충분히 비교 후 결정하는 당신은 챙김 쇼퍼예요.",
      "친구가 \"이거 어때?\" 물으면 \"너랑 잘 어울려!\"라고 말하며, 주기적으로 옷장을 정리해요. 할인 알림은 무시하거나 저장하는 따뜻한 스타일이에요.",
      "가족과 연인을 위한 구매를 하며, 따뜻하고 세심한 스타일이에요.",
    ],
    recommendedShopping: ["홈쇼핑", "생활용품"],
    recommendedAction: "가족을 챙기되, 자신도 챙기는 것을 잊지 마세요.",
    compatibleTypes: ["ESFP", "ESTP", "ESFJ"],
    shareText: "나는 💳 챙김 쇼퍼(ISFJ)! 너는 어떤 쇼핑러야?",
  },
  ISFP: {
    name: "감각적 쇼퍼",
    emoji: "🌿",
    summary: "스타일·색감 중심",
    description: [
      "디자인과 감성을 우선시하며, 느낌이 오면 바로 구매하는 당신은 감각적 쇼퍼예요.",
      "그냥 담고 기분 봐서 결정하고, 친구가 \"이거 어때?\" 물으면 \"너랑 잘 어울려!\"라고 말해요. 입고 싶은 것만 남기는 창의적인 스타일이에요.",
      "스타일과 색감을 중심으로 하며, 창의적이고 내향적인 스타일이에요.",
    ],
    recommendedShopping: ["라이프스타일 브랜드"],
    recommendedAction: "감각적인 쇼핑은 좋지만, 가끔은 실용성도 고려해보세요.",
    compatibleTypes: ["ENFJ", "ESFJ", "ESTJ"],
    shareText: "나는 💳 감각적 쇼퍼(ISFP)! 너는 어떤 쇼핑러야?",
  },
  ISTJ: {
    name: "정석 쇼퍼",
    emoji: "📦",
    summary: "익숙한 브랜드 선호",
    description: [
      "계획에 없으면 패스하고, 품질과 후기를 우선시하며, 충분히 비교 후 결정하는 당신은 정석 쇼퍼예요.",
      "신뢰도가 중요한 브랜드를 선호하며, 전부 계산해본 후 장바구니에 담아요. 주기적으로 옷장을 정리하고, 할인·적립을 계산 중인 루틴형 스타일이에요.",
      "익숙한 브랜드를 선호하며, 루틴과 신뢰를 중시하는 스타일이에요.",
    ],
    recommendedShopping: ["전통 브랜드", "기본템"],
    recommendedAction: "안정적인 쇼핑은 좋지만, 가끔은 새로운 브랜드도 시도해보세요.",
    compatibleTypes: ["ESFP", "ENFP", "ESTP"],
    shareText: "나는 💳 정석 쇼퍼(ISTJ)! 너는 어떤 쇼핑러야?",
  },
  ISTP: {
    name: "실용 쇼퍼",
    emoji: "🛠",
    summary: "필요하면 사고 끝",
    description: [
      "계획에 없으면 패스하고, 품질과 후기를 우선시하며, 느낌이 오면 바로 구매하는 당신은 실용 쇼퍼예요.",
      "전부 계산해본 후 장바구니에 담고, 냉정하게 판단해요. 쇼핑몰 추천 상품은 참고만 하고, 할인 알림은 무시하거나 저장하는 실용적인 스타일이에요.",
      "필요하면 사고 끝이며, 실용적이고 냉정한 스타일이에요.",
    ],
    recommendedShopping: ["공구", "테크 용품"],
    recommendedAction: "실용적인 쇼핑은 좋지만, 가끔은 감성 쇼핑도 즐겨보세요.",
    compatibleTypes: ["ESFJ", "ENFJ", "ESTP"],
    shareText: "나는 💳 실용 쇼퍼(ISTP)! 너는 어떤 쇼핑러야?",
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const mbtiType = (searchParams.get("type") as keyof typeof shoppingCharacters) || "ENFP"
  const resultId = searchParams.get("id") || undefined
  const character = shoppingCharacters[mbtiType]
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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-50 dark:from-pink-950 dark:via-rose-950 dark:to-fuchsia-950">
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
                  className="mb-4 bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200"
                >
                  {mbtiType}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{character.name}</h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium">"{character.summary}"</p>
              </div>

              {/* Share Buttons */}
              <div className="flex flex-col items-center space-y-4">
                <ShareButtons
                  testId="shopping-style"
                  testPath="/tests/shopping-style/test"
                  resultType={mbtiType}
                  resultId={loadedResult?.id || resultId}
                  title={character.shareText}
                  description={character.summary}
                />
                <Button variant="outline" size="lg" asChild>
                  <Link href="/tests/shopping-style/test">
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
              <span>🛍️</span>
              <span>당신의 쇼핑 스타일</span>
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

        {/* Recommended Shopping & Action Tip */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <span>💳</span>
              <span>추천 쇼핑 스타일 & 꿀팁</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg leading-relaxed text-muted-foreground">
              <strong>추천 쇼핑 스타일:</strong> {character.recommendedShopping.join(", ")}
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              <strong>쇼핑 꿀팁:</strong> {character.recommendedAction}
            </p>
          </CardContent>
        </Card>

        {/* Compatible Types */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <span>❤️</span>
              <span>잘 맞는 쇼핑 친구들</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.compatibleTypes.map((type) => {
                const compatibleChar = shoppingCharacters[type as keyof typeof shoppingCharacters]
                return (
                  <div
                    key={type}
                    className="p-4 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950 dark:to-rose-950 rounded-lg text-center"
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
              <Sparkles className="h-6 w-6 text-rose-500" />
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
                  slug: "ramen-mbti",
                  title: "라면 MBTI",
                  emoji: "🍜",
                  description: "라면 조리법으로 알아보는 성격",
                  participants: "10.2K",
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

export default function ShoppingStyleResult() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  )
}

