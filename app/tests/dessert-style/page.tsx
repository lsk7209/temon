import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Cake, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "디저트 취향 성격 테스트 | 나의 달콤한 취향 MBTI 🍩 | 테몬",
  description:
    "12문항으로 알아보는 나의 디저트 취향! 달콤, 진지, 즉흥, 감성까지 🍰 디저트를 고르는 순간, 당신의 성격이 드러납니다.",
  keywords: "디저트 성격 테스트, 달콤한 취향 MBTI, 카페 취향 테스트, 디저트 취향, 카페 디저트, 마카롱, 케이크, 홍대 카페, 연남동 디저트, 제주 베이커리, MBTI, 심리테스트, 무료 테스트",
  alternates: {
    canonical: "/tests/dessert-style",
  },
  openGraph: {
    title: "디저트 취향 성격 테스트 | 나의 달콤한 취향 MBTI 🍩",
    description: "12문항으로 알아보는 나의 디저트 취향! 달콤, 진지, 즉흥, 감성까지 🍰",
    type: "website",
    url: "https://www.temon.kr/tests/dessert-style",
  },
}

export default function DessertStyleIntro() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-950 dark:via-orange-950 dark:to-yellow-950">
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="text-center space-y-8">
          {/* Animated Dessert Elements */}
          <div className="relative mx-auto w-32 h-32 mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full animate-pulse" />
            <div className="absolute inset-2 bg-gradient-to-br from-amber-200 to-orange-300 rounded-full flex items-center justify-center">
              <span className="text-4xl animate-bounce">🍰</span>
            </div>
            {/* Floating dessert elements */}
            <div className="absolute -top-6 -left-6 text-lg animate-bounce" style={{ animationDelay: "0.5s" }}>
              🍩
            </div>
            <div className="absolute -top-4 -right-8 text-lg animate-bounce" style={{ animationDelay: "1s" }}>
              ☕
            </div>
            <div className="absolute -bottom-6 -left-8 text-lg animate-bounce" style={{ animationDelay: "1.5s" }}>
              🍪
            </div>
            <div className="absolute -bottom-4 -right-6 text-lg animate-bounce" style={{ animationDelay: "2s" }}>
              🍫
            </div>
          </div>

          <div className="space-y-6">
            <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
              🍰 NEW 테스트
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                디저트를 고르는 순간,
              </span>
              <br />
              <span className="text-foreground">당신의 성격이 드러난다 🍩</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              달콤함 속에도 개성이 있다! 당신의 디저트 취향으로 알아보는 나의 성격 유형 🍰
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

            <div className="space-y-4">
              <Button
                size="lg"
                className="h-16 px-12 text-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link href="/tests/dessert-style/test">
                  <span className="text-2xl mr-3">🍮</span>
                  테스트 시작하기
                </Link>
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                무료 • 회원가입 불필요 • 16가지 디저트 취향 분석
              </p>
            </div>
          </div>
        </div>

        {/* Test Introduction */}
        <div className="mt-20 space-y-12">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold flex items-center justify-center space-x-2">
                  <Cake className="h-6 w-6 text-amber-500" />
                  <span>이런 질문들이 나와요!</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-4">
                    <div className="p-4 bg-amber-50 dark:bg-amber-950 rounded-lg">
                      <p className="font-medium">1. 카페에서 메뉴 고를 때</p>
                      <p className="text-sm text-muted-foreground mt-1">늘 먹는 메뉴 vs 오늘은 새로운 메뉴!</p>
                    </div>
                    <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                      <p className="font-medium">2. 디저트 취향</p>
                      <p className="text-sm text-muted-foreground mt-1">달콤·진한 맛 vs 담백·깔끔한 맛</p>
                    </div>
                    <div className="p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                      <p className="font-medium">3. 카페 자리를 고를 때</p>
                      <p className="text-sm text-muted-foreground mt-1">창가 자리 필수 vs 아무 자리나 상관없음</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-amber-50 dark:bg-amber-950 rounded-lg">
                      <p className="font-medium">4. 사진 찍을 때</p>
                      <p className="text-sm text-muted-foreground mt-1">음식 중심 구도 vs 감성 분위기 중심</p>
                    </div>
                    <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                      <p className="font-medium">5. 케이크 고를 때</p>
                      <p className="text-sm text-muted-foreground mt-1">생크림 고전파 vs 무스·티라미수 등 신메뉴</p>
                    </div>
                    <div className="p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                      <p className="font-medium">6. 친구가 고른 디저트가 더 맛있을 때</p>
                      <p className="text-sm text-muted-foreground mt-1">나도 그걸 시킬 걸 후회 vs 그냥 참고 내 것 먹음</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 16 Types Section */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold">🍰 16가지 디저트 취향</h2>
                <p className="text-muted-foreground">당신은 어떤 디저트러일까요?</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { emoji: "🎈", name: "즉흥 스위트러", type: "ENFP" },
                    { emoji: "🤝", name: "배려 디저트러", type: "ENFJ" },
                    { emoji: "🧱", name: "완벽 디저트러", type: "ENTJ" },
                    { emoji: "🧪", name: "실험 디저트러", type: "ENTP" },
                    { emoji: "😊", name: "함께 먹는 디저트러", type: "ESFJ" },
                    { emoji: "📸", name: "감성 디저트러", type: "ESFP" },
                    { emoji: "📋", name: "실속 디저트러", type: "ESTJ" },
                    { emoji: "⚡", name: "빠른 결정러", type: "ESTP" },
                  ].map((character) => (
                    <div
                      key={character.type}
                      className="p-3 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 rounded-lg text-center"
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

          {/* Special Features Section */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold flex items-center justify-center space-x-2">
                  <Sparkles className="h-6 w-6 text-orange-500" />
                  <span>특별한 기능</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <h3 className="font-semibold">정확한 분석</h3>
                    <p className="text-sm text-muted-foreground">12가지 디저트 루틴으로 MBTI 4축을 정확하게 분석</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">💡</span>
                    </div>
                    <h3 className="font-semibold">맞춤 추천</h3>
                    <p className="text-sm text-muted-foreground">당신의 유형에 맞는 디저트, 카페 추천</p>
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

