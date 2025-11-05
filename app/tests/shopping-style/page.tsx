import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, ShoppingBag, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "쇼핑 스타일 성격 테스트 | 나의 구매 스타일로 보는 MBTI | 테몬",
  description:
    "12문항으로 알아보는 나의 쇼핑 스타일! 계획형 vs 즉흥형, 실속형 vs 감성형 💳 쇼핑할 때마다 드러나는 진짜 나의 성격을 알아보세요.",
  keywords: "쇼핑 성격 테스트, 소비 스타일 MBTI, 쇼핑 습관 테스트, 구매 스타일, 쇼핑 습관, 무신사, 지그재그, 쿠팡, 롯데온, MBTI, 심리테스트, 무료 테스트",
  alternates: {
    canonical: "/tests/shopping-style",
  },
  openGraph: {
    title: "쇼핑 스타일 성격 테스트 | 나의 구매 스타일로 보는 MBTI",
    description: "12문항으로 알아보는 나의 쇼핑 스타일! 계획형 vs 즉흥형, 실속형 vs 감성형 💳",
    type: "website",
    url: "https://www.temon.kr/tests/shopping-style",
  },
}

export default function ShoppingStyleIntro() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-50 dark:from-pink-950 dark:via-rose-950 dark:to-fuchsia-950">
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="text-center space-y-8">
          {/* Animated Shopping Elements */}
          <div className="relative mx-auto w-32 h-32 mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full animate-pulse" />
            <div className="absolute inset-2 bg-gradient-to-br from-pink-200 to-rose-300 rounded-full flex items-center justify-center">
              <span className="text-4xl animate-bounce">🛍️</span>
            </div>
            {/* Floating shopping elements */}
            <div className="absolute -top-6 -left-6 text-lg animate-bounce" style={{ animationDelay: "0.5s" }}>
              💳
            </div>
            <div className="absolute -top-4 -right-8 text-lg animate-bounce" style={{ animationDelay: "1s" }}>
              👗
            </div>
            <div className="absolute -bottom-6 -left-8 text-lg animate-bounce" style={{ animationDelay: "1.5s" }}>
              🛒
            </div>
            <div className="absolute -bottom-4 -right-6 text-lg animate-bounce" style={{ animationDelay: "2s" }}>
              🎁
            </div>
          </div>

          <div className="space-y-6">
            <Badge variant="secondary" className="bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200">
              🛍️ NEW 테스트
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                쇼핑할 때마다 드러나는
              </span>
              <br />
              <span className="text-foreground">진짜 나의 성격 🛍️</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              당신은 비교 분석형? 즉흥 구매형? 쇼핑 습관 속 숨은 성격을 알아보세요!
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
                className="h-16 px-12 text-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link href="/tests/shopping-style/test">
                  <span className="text-2xl mr-3">🛒</span>
                  테스트 시작하기
                </Link>
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                무료 • 회원가입 불필요 • 16가지 쇼핑 스타일 분석
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
                  <ShoppingBag className="h-6 w-6 text-pink-500" />
                  <span>이런 질문들이 나와요!</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-4">
                    <div className="p-4 bg-pink-50 dark:bg-pink-950 rounded-lg">
                      <p className="font-medium">1. 세일 문구를 보면?</p>
                      <p className="text-sm text-muted-foreground mt-1">일단 클릭! vs 계획에 없으면 패스</p>
                    </div>
                    <div className="p-4 bg-rose-50 dark:bg-rose-950 rounded-lg">
                      <p className="font-medium">2. 쇼핑할 때 우선순위는?</p>
                      <p className="text-sm text-muted-foreground mt-1">품질, 후기 vs 디자인, 감성</p>
                    </div>
                    <div className="p-4 bg-fuchsia-50 dark:bg-fuchsia-950 rounded-lg">
                      <p className="font-medium">3. 구매 전 고민 시간은?</p>
                      <p className="text-sm text-muted-foreground mt-1">충분히 비교 후 결정 vs 느낌 오면 바로 구매</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-pink-50 dark:bg-pink-950 rounded-lg">
                      <p className="font-medium">4. 장바구니에 물건을 담을 때</p>
                      <p className="text-sm text-muted-foreground mt-1">전부 계산해본다 vs 그냥 담고 기분 봐서 결정</p>
                    </div>
                    <div className="p-4 bg-rose-50 dark:bg-rose-950 rounded-lg">
                      <p className="font-medium">5. 친구가 "이거 어때?" 물을 때</p>
                      <p className="text-sm text-muted-foreground mt-1">냉정하게 판단 vs "너랑 잘 어울려!"</p>
                    </div>
                    <div className="p-4 bg-fuchsia-50 dark:bg-fuchsia-950 rounded-lg">
                      <p className="font-medium">6. 브랜드 고를 때</p>
                      <p className="text-sm text-muted-foreground mt-1">신뢰도 중요 vs 새로운 브랜드 도전</p>
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
                <h2 className="text-2xl font-bold">🛍️ 16가지 쇼핑 스타일</h2>
                <p className="text-muted-foreground">당신은 어떤 쇼핑러일까요?</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { emoji: "🎈", name: "즉흥 소비러", type: "ENFP" },
                    { emoji: "🤝", name: "배려 구매러", type: "ENFJ" },
                    { emoji: "🧱", name: "전략 구매러", type: "ENTJ" },
                    { emoji: "🧪", name: "실험 쇼퍼", type: "ENTP" },
                    { emoji: "😊", name: "공유 쇼퍼", type: "ESFJ" },
                    { emoji: "📸", name: "감성 쇼퍼", type: "ESFP" },
                    { emoji: "📋", name: "실속 쇼퍼", type: "ESTJ" },
                    { emoji: "⚡", name: "빠른 결제러", type: "ESTP" },
                  ].map((character) => (
                    <div
                      key={character.type}
                      className="p-3 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950 dark:to-rose-950 rounded-lg text-center"
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
                  <Sparkles className="h-6 w-6 text-rose-500" />
                  <span>특별한 기능</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <h3 className="font-semibold">정확한 분석</h3>
                    <p className="text-sm text-muted-foreground">12가지 쇼핑 루틴으로 MBTI 4축을 정확하게 분석</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-rose-100 dark:bg-rose-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">💡</span>
                    </div>
                    <h3 className="font-semibold">맞춤 추천</h3>
                    <p className="text-sm text-muted-foreground">당신의 유형에 맞는 쇼핑 스타일, 브랜드 추천</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-fuchsia-100 dark:bg-fuchsia-900 rounded-full flex items-center justify-center">
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

