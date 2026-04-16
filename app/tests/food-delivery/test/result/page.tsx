"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RotateCcw } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { ShareButtons } from "@/components/share-buttons"
import { getTestResult } from "@/lib/api-client"

const foodCharacters = {
  ENFP: {
    name: "즉흥 도전러",
    emoji: "🎈",
    summary: "오늘은 뭐 먹지? 그때그때 느낌대로!",
    description: [
      "오늘은 뭐 먹지? 그때그때 느낌대로 주문하는 당신! 추천 메뉴부터 보고, 새롭고 특이한 메뉴를 도전하는 신메뉴 탐험러예요.",
      "한참 고민하다가 그냥 시켜! 맛이 중요하다고 생각하며, 매번 다른 곳을 탐험하는 즐거운 혼밥러예요.",
      "시켜놓고 뭐 시켰는지도 몰라 😂 즉흥적으로 즐기는 스타일이에요.",
    ],
    recommendedFood: ["신상 햄버거", "한식 퓨전"],
    recommendedAction: "오늘은 신상 떡볶이 어때요? 새로운 메뉴로 하루를 즐겨보세요 🍜",
    compatibleTypes: ["INFJ", "INTJ", "ENFJ"],
  },
  INFP: {
    name: "감성 배달러",
    emoji: "🌙",
    summary: "그날의 기분에 따라 메뉴 선택",
    description: [
      "그날의 기분에 따라 메뉴를 선택하는 당신! 추천 메뉴부터 보고, 평점보다 감정 리뷰를 중심으로 선택하는 감정형 배달러예요.",
      "내가 먹고 싶은 거를 주장하며, 그냥 시켜! 맛이 중요하다고 생각하는 여유로운 스타일이에요.",
      "조용히 기다리며, 그날의 기분에 따라 메뉴를 선택하는 감성적인 스타일이에요.",
    ],
    recommendedFood: ["파스타", "카페 음식"],
    recommendedAction: "그날의 기분에 따라 메뉴를 선택하되, 가끔은 새로운 메뉴도 시도해보세요.",
    compatibleTypes: ["ENFJ", "ENTJ", "INFJ"],
  },
  ENFJ: {
    name: "함께 주문러",
    emoji: "🤝",
    summary: "주변인 먼저 챙기며 주문 조율",
    description: [
      "주변인을 먼저 챙기며 주문을 조율하는 당신! 먼저 카테고리부터 정하고, 다수 의견에 맞춰 주문하는 협동형 배달러예요.",
      "빠르게 결정하고, 묶음 주문으로 조정하며, 방송·영상으로 시간을 채우는 배려심 많은 스타일이에요.",
      "모두를 챙기며 함께 주문하는 따뜻한 스타일이에요.",
    ],
    recommendedFood: ["치킨 세트", "단체 도시락"],
    recommendedAction: "모두를 챙기되, 자신의 취향도 잊지 마세요.",
    compatibleTypes: ["INFP", "ISFP", "ENFP"],
  },
  INFJ: {
    name: "생각 많은 주문러",
    emoji: "📖",
    summary: "메뉴 결정에 진심, 의미부여형",
    description: [
      "메뉴 결정에 진심인 당신! 먼저 카테고리부터 정하지만, 새롭고 특이한 메뉴를 도전하는 분석적인 스타일이에요.",
      "내가 먹고 싶은 거를 주장하며, 평점보다 감정 리뷰를 중심으로 선택하는 깊이 있는 배달러예요.",
      "조용히 기다리며, 메뉴 결정에 의미를 부여하는 스타일이에요.",
    ],
    recommendedFood: ["오마카세", "샐러드"],
    recommendedAction: "의미 있는 메뉴를 선택하되, 가끔은 즉흥적으로 즐겨보세요.",
    compatibleTypes: ["ENFP", "ENTP", "INFP"],
  },
  ENTP: {
    name: "창의 미식러",
    emoji: "🧪",
    summary: "새로운 조합과 실험 즐기는 타입",
    description: [
      "새로운 조합과 실험을 즐기는 당신! 추천 메뉴부터 보고, 새롭고 특이한 메뉴를 도전하는 호기심 많은 스타일이에요.",
      "한참 고민하다가 그냥 눌러서 적용하고, 매번 다른 곳을 탐험하는 유머러스한 배달러예요.",
      "즉흥적으로 즐기며, 새로운 조합을 시도하는 스타일이에요.",
    ],
    recommendedFood: ["퓨전 피자", "이색 음식"],
    recommendedAction: "새로운 조합을 시도하되, 가끔은 익숙한 메뉴도 즐겨보세요.",
    compatibleTypes: ["INFJ", "INTJ", "ISFJ"],
  },
  INTP: {
    name: "분석 먹방러",
    emoji: "🔬",
    summary: "리뷰 데이터로 메뉴 선택",
    description: [
      "리뷰 데이터로 메뉴를 선택하는 당신! 먼저 카테고리부터 정하고, 별점·사진을 꼼꼼히 확인하는 탐구형 배달러예요.",
      "내가 먹고 싶은 거를 주장하며, 리뷰에 피드백을 남기는 분석적인 스타일이에요.",
      "조용히 기다리며, 리뷰 데이터를 분석하는 스타일이에요.",
    ],
    recommendedFood: ["신상 분식", "수제버거"],
    recommendedAction: "리뷰를 분석하되, 가끔은 감으로 선택해보세요.",
    compatibleTypes: ["ENFJ", "ENTJ", "ENTP"],
  },
  ENTJ: {
    name: "전략 주문러",
    emoji: "🧱",
    summary: "배달비·시간·평점까지 완벽 통제",
    description: [
      "배달비·시간·평점까지 완벽하게 통제하는 당신! 먼저 카테고리부터 정하고, 빠르게 결정하는 계획적인 스타일이에요.",
      "별점·사진을 꼼꼼히 확인하고, 묶음 주문으로 조정하며, 전략적으로 쿠폰을 조합하는 효율적인 배달러예요.",
      "모든 것을 전략적으로 관리하는 스타일이에요.",
    ],
    recommendedFood: ["스테이크", "프리미엄 도시락"],
    recommendedAction: "전략적으로 주문하되, 가끔은 즉흥적으로 즐겨보세요.",
    compatibleTypes: ["INFP", "ISFP", "INTP"],
  },
  INTJ: {
    name: "전략 미식러",
    emoji: "📐",
    summary: "맛·가격·시간의 균형을 계산",
    description: [
      "맛·가격·시간의 균형을 계산하는 당신! 먼저 카테고리부터 정하고, 별점·사진을 꼼꼼히 확인하는 계획적인 스타일이에요.",
      "내가 먹고 싶은 거를 주장하며, 리뷰에 피드백을 남기는 통찰력 있는 배달러예요.",
      "모든 것을 전략적으로 계산하는 스타일이에요.",
    ],
    recommendedFood: ["스테이크", "브런치"],
    recommendedAction: "균형을 계산하되, 가끔은 감으로 선택해보세요.",
    compatibleTypes: ["ENFP", "ENTP", "ENTJ"],
  },
  ESFJ: {
    name: "따뜻한 나눔러",
    emoji: "😊",
    summary: "다 같이 나눠먹는 행복 우선",
    description: [
      "다 같이 나눠먹는 행복을 우선하는 당신! 먼저 카테고리부터 정하고, 다수 의견에 맞춰 주문하는 사교적인 스타일이에요.",
      "익숙한 메뉴 위주로 선택하며, 단골 위주로 주문하는 따뜻한 배달러예요.",
      "모두와 함께 나눠먹는 것을 즐기는 스타일이에요.",
    ],
    recommendedFood: ["치킨", "보쌈"],
    recommendedAction: "모두와 함께 나눠먹되, 자신의 취향도 잊지 마세요.",
    compatibleTypes: ["ISFP", "ISTP", "ISFJ"],
  },
  ESFP: {
    name: "감성 먹방러",
    emoji: "📸",
    summary: "사진 찍고 올리기 필수, 즉흥형",
    description: [
      "사진 찍고 올리기 필수인 당신! 추천 메뉴부터 보고, 평점보다 감정 리뷰를 중심으로 선택하는 표현력 있는 스타일이에요.",
      "다수 의견에 맞추지만, 그냥 시켜! 맛이 중요하다고 생각하며, 바로 먹는 감성적인 배달러예요.",
      "즉흥적으로 즐기며, 사진을 찍어 올리는 스타일이에요.",
    ],
    recommendedFood: ["디저트", "샐러드볼"],
    recommendedAction: "사진을 찍어 올리되, 맛도 제대로 즐겨보세요.",
    compatibleTypes: ["ISFJ", "ISTJ", "ISFP"],
  },
  ESTJ: {
    name: "계획 주문러",
    emoji: "📋",
    summary: "쿠폰·시간·가격 모두 고려",
    description: [
      "쿠폰·시간·가격을 모두 고려하는 당신! 먼저 카테고리부터 정하고, 빠르게 결정하는 체계적인 스타일이에요.",
      "익숙한 메뉴 위주로 선택하며, 묶음 주문으로 조정하고, 전략적으로 쿠폰을 조합하는 실속형 배달러예요.",
      "모든 것을 계획적으로 관리하는 스타일이에요.",
    ],
    recommendedFood: ["도시락", "한식 정식"],
    recommendedAction: "계획적으로 주문하되, 가끔은 새로운 메뉴도 시도해보세요.",
    compatibleTypes: ["ISFP", "INFP", "ISTP"],
  },
  ESTP: {
    name: "빠른 결정러",
    emoji: "⚡",
    summary: "메뉴 고르고 바로 결제!",
    description: [
      "메뉴를 고르고 바로 결제하는 당신! 추천 메뉴부터 보고, 빠르게 결정하는 직관적인 스타일이에요.",
      "다수 의견에 맞추지만, 그냥 시켜! 맛이 중요하다고 생각하며, 바로 먹는 실행력 있는 배달러예요.",
      "즉시 행동하며, 실행력을 중시하는 스타일이에요.",
    ],
    recommendedFood: ["버거", "분식"],
    recommendedAction: "빠르게 결정하되, 가끔은 신중하게 선택해보세요.",
    compatibleTypes: ["ISFJ", "ISTJ", "INFJ"],
  },
  ISFJ: {
    name: "정성 주문러",
    emoji: "🧸",
    summary: "가족·연인 챙기는 따뜻한 타입",
    description: [
      "가족·연인을 챙기는 따뜻한 타입인 당신! 먼저 카테고리부터 정하고, 다수 의견에 맞춰 주문하는 배려심 많은 스타일이에요.",
      "익숙한 메뉴 위주로 선택하며, 단골 위주로 주문하고, 포장을 먼저 정리하는 꼼꼼한 배달러예요.",
      "모두를 챙기며 정성스럽게 주문하는 스타일이에요.",
    ],
    recommendedFood: ["한식", "죽", "덮밥"],
    recommendedAction: "모두를 챙기되, 자신의 취향도 잊지 마세요.",
    compatibleTypes: ["ESFP", "ESTP", "ENTP"],
  },
  ISFP: {
    name: "감성 힐링러",
    emoji: "🌿",
    summary: "맛보다 분위기, 비주얼 중요",
    description: [
      "맛보다 분위기와 비주얼을 중요하게 생각하는 당신! 추천 메뉴부터 보고, 평점보다 감정 리뷰를 중심으로 선택하는 감각적인 스타일이에요.",
      "내가 먹고 싶은 거를 주장하며, 그냥 시켜! 맛이 중요하다고 생각하는 내향적인 배달러예요.",
      "조용히 기다리며, 감성에 따라 메뉴를 선택하는 스타일이에요.",
    ],
    recommendedFood: ["카페 디저트", "샌드위치"],
    recommendedAction: "감성에 따라 선택하되, 가끔은 맛있는 메뉴도 즐겨보세요.",
    compatibleTypes: ["ENFJ", "ESFJ", "ESFP"],
  },
  ISTJ: {
    name: "정석 주문러",
    emoji: "📦",
    summary: "늘 먹는 메뉴로 안정 선택",
    description: [
      "늘 먹는 메뉴로 안정적으로 선택하는 당신! 먼저 카테고리부터 정하고, 익숙한 메뉴 위주로 선택하는 루틴형 배달러예요.",
      "별점·사진을 꼼꼼히 확인하고, 단골 위주로 주문하며, 포장을 먼저 정리하는 신중한 스타일이에요.",
      "늘 먹는 메뉴지만, 그것이 진리. 안정감이 최고의 맛이죠 🍱",
    ],
    recommendedFood: ["짜장면", "돈까스"],
    recommendedAction: "늘 먹는 메뉴지만, 그것이 진리. 안정감이 최고의 맛이죠 🍱",
    compatibleTypes: ["ESFP", "ENFP", "ESTJ"],
  },
  ISTP: {
    name: "실용 배달러",
    emoji: "🛠",
    summary: "최소 비용·최대 만족형",
    description: [
      "최소 비용으로 최대 만족을 추구하는 당신! 먼저 카테고리부터 정하지만, 익숙한 메뉴 위주로 선택하는 실용적인 스타일이에요.",
      "별점·사진을 꼼꼼히 확인하고, 묶음 주문으로 조정하며, 전략적으로 쿠폰을 조합하는 효율적인 배달러예요.",
      "실용적이고 효율적인 스타일이에요.",
    ],
    recommendedFood: ["편의점 도시락", "김밥"],
    recommendedAction: "실용적으로 주문하되, 가끔은 특별한 메뉴도 즐겨보세요.",
    compatibleTypes: ["ESFJ", "ENFJ", "ESTP"],
  },
}

function ResultContent() {
  const searchParams = useSearchParams()
  const mbtiType = (searchParams.get("type") as keyof typeof foodCharacters) || "ENFP"
  const resultId = searchParams.get("id") || undefined
  const character = foodCharacters[mbtiType]
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
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-red-950 dark:via-orange-950 dark:to-yellow-950">
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
                  className="mb-4 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                >
                  {mbtiType}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{character.name}</h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium">"{character.summary}"</p>
              </div>

              {/* Share Buttons */}
              <div className="flex flex-col items-center space-y-4">
                <ShareButtons
                  testId="food-delivery"
                  testPath="/tests/food-delivery/test"
                  resultType={mbtiType}
                  resultId={loadedResult?.id || resultId}
                  title={`나는 ${character.emoji} ${character.name} (${mbtiType})!`}
                  description={character.summary}
                />
                <Button variant="outline" size="lg" asChild>
                  <Link href="/tests/food-delivery/test">
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
              <span>🍕</span>
              <span>당신의 배달 습관</span>
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

        {/* Recommended Food & Action */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <span>🍴</span>
              <span>추천 음식 & 주문 팁</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950 rounded-lg">
                  <div className="font-semibold text-lg mb-2">🍔 추천 음식</div>
                  <div className="flex flex-wrap gap-2">
                    {character.recommendedFood.map((food, index) => (
                      <Badge key={index} variant="secondary" className="text-sm">
                        {food}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-950 dark:to-yellow-950 rounded-lg">
                  <div className="font-semibold text-lg mb-2">💡 주문 팁</div>
                  <div className="text-muted-foreground">{character.recommendedAction}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Compatible Types */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <span>💕</span>
              <span>잘 맞는 주문 파트너</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {character.compatibleTypes.map((type) => {
                const compatibleChar = foodCharacters[type as keyof typeof foodCharacters]
                return (
                  <div
                    key={type}
                    className="p-4 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950 rounded-lg text-center"
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
              <span>🎯</span>
              <span>다른 테스트도 해보세요!</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  slug: "phone-style",
                  title: "스마트폰 사용 습관",
                  emoji: "📱",
                  description: "스마트폰 습관으로 알아보는 성격",
                  participants: "0",
                },
                {
                  slug: "travel-style",
                  title: "여행 짐 스타일",
                  emoji: "🧳",
                  description: "여행 짐 습관으로 알아보는 성격",
                  participants: "0",
                },
                {
                  slug: "jachui",
                  title: "자취 밥상 스타일",
                  emoji: "🍳",
                  description: "자취 밥상 습관으로 알아보는 성격",
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

export default function FoodDeliveryResult() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  )
}

