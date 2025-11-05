import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, UtensilsCrossed, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "배달 음식 스타일 테스트 | 당신은 어떤 타입의 주문러? | 테몬",
  description:
    "12문항으로 알아보는 나의 배달 습관! 즉흥형 vs 계획형, 도전자 vs 안정형 🍔 배달 앱을 켜는 순간, 당신의 성격이 드러납니다.",
  keywords: "배달 음식 스타일, 배달 성격 테스트, 음식 취향 테스트, 배달앱 유형, 배달의민족, 쿠팡이츠, 요기요, 배달 메뉴, MBTI, 심리테스트, 무료 테스트",
  alternates: {
    canonical: "/tests/food-delivery",
  },
  openGraph: {
    title: "배달 음식 스타일 테스트 | 당신은 어떤 타입의 주문러?",
    description: "12문항으로 알아보는 나의 배달 습관! 즉흥형 vs 계획형, 도전자 vs 안정형 🍔",
    type: "website",
    url: "https://www.temon.kr/tests/food-delivery",
  },
}

export default function FoodDeliveryIntro() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-red-950 dark:via-orange-950 dark:to-yellow-950">
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="text-center space-y-8">
          {/* Animated Food Elements */}
          <div className="relative mx-auto w-32 h-32 mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-orange-500 rounded-full animate-pulse" />
            <div className="absolute inset-2 bg-gradient-to-br from-red-200 to-orange-300 rounded-full flex items-center justify-center">
              <span className="text-4xl animate-bounce">🍕</span>
            </div>
            {/* Floating food elements */}
            <div className="absolute -top-6 -left-6 text-lg animate-bounce" style={{ animationDelay: "0.5s" }}>
              🍗
            </div>
            <div className="absolute -top-4 -right-8 text-lg animate-bounce" style={{ animationDelay: "1s" }}>
              🍜
            </div>
            <div className="absolute -bottom-6 -left-8 text-lg animate-bounce" style={{ animationDelay: "1.5s" }}>
              🛵
            </div>
            <div className="absolute -bottom-4 -right-6 text-lg animate-bounce" style={{ animationDelay: "2s" }}>
              🍔
            </div>
          </div>

          <div className="space-y-6">
            <Badge variant="secondary" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
              🍕 NEW 테스트
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                배달 앱을 켜는 순간,
              </span>
              <br />
              <span className="text-foreground">당신의 성격이 드러난다 🍴</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              한식파? 신메뉴 도전자?
              <br />
              당신의 배달 음식 선택 습관으로 알아보는 진짜 성격 테스트!
            </p>

            {/* Stats */}
            <div className="flex justify-center items-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Coming Soon</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>3분 소요</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>12문항</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="space-y-4">
              <Button
                size="lg"
                className="h-16 px-12 text-xl bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 shadow-lg hover:shadow-xl transition-all duration-300 group"
                asChild
              >
                <Link href="/tests/food-delivery/test">
                  <span className="text-2xl mr-3 group-hover:animate-bounce">🍕</span>
                  테스트 시작하기
                </Link>
              </Button>

              <p className="text-sm text-center text-muted-foreground">무료 • 회원가입 불필요 • 16가지 배달 유형 분석</p>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="mt-20 space-y-12">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold flex items-center justify-center space-x-2">
                  <UtensilsCrossed className="h-6 w-6 text-red-500" />
                  <span>이런 질문들이 나와요!</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-4">
                    <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg">
                      <p className="font-medium">🍕 배달 앱을 켤 때</p>
                      <p className="text-sm text-muted-foreground mt-1">먼저 카테고리부터 정함 vs 추천 메뉴부터 봄</p>
                    </div>
                    <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                      <p className="font-medium">🍗 음식 고를 때</p>
                      <p className="text-sm text-muted-foreground mt-1">익숙한 메뉴 위주 vs 새롭고 특이한 메뉴 도전</p>
                    </div>
                    <div className="p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                      <p className="font-medium">⭐ 리뷰를 볼 때</p>
                      <p className="text-sm text-muted-foreground mt-1">별점·사진 꼼꼼히 확인 vs 평점보다 감정 리뷰 중심</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg">
                      <p className="font-medium">🍽️ 친구와 함께 주문 시</p>
                      <p className="text-sm text-muted-foreground mt-1">다수 의견에 맞춤 vs 내가 먹고 싶은 거 주장</p>
                    </div>
                    <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                      <p className="font-medium">💰 배달비가 비쌀 때</p>
                      <p className="text-sm text-muted-foreground mt-1">묶음 주문으로 조정 vs 그냥 시켜! 맛이 중요</p>
                    </div>
                    <div className="p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                      <p className="font-medium">⏰ 배달 기다리는 시간</p>
                      <p className="text-sm text-muted-foreground mt-1">방송·영상으로 시간 채움 vs 조용히 기다림</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Character Preview */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold">🎭 16가지 배달 유형</h2>
                <p className="text-muted-foreground">당신은 어떤 주문러일까요?</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { emoji: "🎈", name: "즉흥 도전러", type: "ENFP" },
                    { emoji: "🌙", name: "감성 배달러", type: "INFP" },
                    { emoji: "🤝", name: "함께 주문러", type: "ENFJ" },
                    { emoji: "📖", name: "생각 많은 주문러", type: "INFJ" },
                    { emoji: "🧪", name: "창의 미식러", type: "ENTP" },
                    { emoji: "🔬", name: "분석 먹방러", type: "INTP" },
                    { emoji: "🧱", name: "전략 주문러", type: "ENTJ" },
                    { emoji: "📐", name: "전략 미식러", type: "INTJ" },
                  ].map((character) => (
                    <div
                      key={character.type}
                      className="p-3 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950 rounded-lg text-center"
                    >
                      <div className="text-2xl mb-1">{character.emoji}</div>
                      <div className="text-xs font-medium">{character.name}</div>
                      <div className="text-xs text-muted-foreground">{character.type}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold flex items-center justify-center space-x-2">
                  <Sparkles className="h-6 w-6 text-orange-500" />
                  <span>특별한 기능</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <h3 className="font-semibold">정확한 분석</h3>
                    <p className="text-sm text-muted-foreground">12가지 배달 습관으로 MBTI 4축을 정확하게 분석</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">💡</span>
                    </div>
                    <h3 className="font-semibold">맞춤 추천</h3>
                    <p className="text-sm text-muted-foreground">당신의 유형에 맞는 추천 음식과 주문 습관 팁</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🔗</span>
                    </div>
                    <h3 className="font-semibold">쉬운 공유</h3>
                    <p className="text-sm text-muted-foreground">결과를 친구들과 쉽게 공유하고 비교해보세요</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

