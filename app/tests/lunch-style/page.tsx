import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, UtensilsCrossed, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "회사 점심 성격 테스트 | 메뉴 고르는 습관으로 보는 유형 | 테몬",
  description:
    "12문항으로 알아보는 점심 선택 스타일! 즉흥·분석·배려·효율형까지 🍜 오늘 점심의 한 끼가 말해주는 나의 성향!",
  keywords: "점심메뉴 테스트, 회사 점심, 오늘 뭐먹지, 점심 성격, 메뉴 결정장애, 점심 테스트, 점심 추천, 회사 점심 추천, 점심 성격 테스트, MBTI, 심리테스트, 무료 테스트",
  alternates: {
    canonical: "/tests/lunch-style",
  },
  openGraph: {
    title: "회사 점심 성격 테스트 | 메뉴 고르는 습관으로 보는 유형",
    description: "12문항으로 알아보는 점심 선택 스타일! 즉흥·분석·배려·효율형까지 🍜",
    type: "website",
    url: "https://www.temon.kr/tests/lunch-style",
  },
}

export default function LunchStyleIntro() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-amber-50 dark:from-orange-950 dark:via-red-950 dark:to-amber-950">
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="text-center space-y-8">
          {/* Animated Lunch Elements */}
          <div className="relative mx-auto w-32 h-32 mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-500 rounded-full animate-pulse" />
            <div className="absolute inset-2 bg-gradient-to-br from-orange-200 to-red-300 rounded-full flex items-center justify-center">
              <span className="text-4xl animate-bounce">🍱</span>
            </div>
            {/* Floating lunch elements */}
            <div className="absolute -top-6 -left-6 text-lg animate-bounce" style={{ animationDelay: "0.5s" }}>
              🍜
            </div>
            <div className="absolute -top-4 -right-8 text-lg animate-bounce" style={{ animationDelay: "1s" }}>
              🥪
            </div>
            <div className="absolute -bottom-6 -left-8 text-lg animate-bounce" style={{ animationDelay: "1.5s" }}>
              🍛
            </div>
            <div className="absolute -bottom-4 -right-6 text-lg animate-bounce" style={{ animationDelay: "2s" }}>
              🍲
            </div>
          </div>

          <div className="space-y-6">
            <Badge variant="secondary" className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
              🍱 NEW 테스트
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                회사 점심 선택에도
              </span>
              <br />
              <span className="text-foreground">성격이 있다면? 🍜</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              오늘 점심의 한 끼가 말해주는 나의 성향! 메뉴 고르는 습관으로 알아보는 성격 유형 🍱
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
                className="h-16 px-12 text-xl bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link href="/tests/lunch-style/test">
                  <span className="text-2xl mr-3">🍴</span>
                  테스트 시작하기
                </Link>
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                무료 • 회원가입 불필요 • 16가지 점심 스타일 분석
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
                  <UtensilsCrossed className="h-6 w-6 text-orange-500" />
                  <span>이런 질문들이 나와요!</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-4">
                    <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                      <p className="font-medium">1. 12시 땡! 점심 결정은</p>
                      <p className="text-sm text-muted-foreground mt-1">미리 정해둔 곳으로 vs 그때 기분 따라</p>
                    </div>
                    <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg">
                      <p className="font-medium">2. 새로운 맛집 제안이 오면</p>
                      <p className="text-sm text-muted-foreground mt-1">일단 도전! vs 검증된 곳이 안전</p>
                    </div>
                    <div className="p-4 bg-amber-50 dark:bg-amber-950 rounded-lg">
                      <p className="font-medium">3. 동료가 "아무거나"라면</p>
                      <p className="text-sm text-muted-foreground mt-1">주도해서 정한다 vs 후보만 던지고 의견 묻기</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                      <p className="font-medium">4. 기다림 vs 거리</p>
                      <p className="text-sm text-muted-foreground mt-1">줄 길어도 맛있으면 감 vs 가까운 곳이 우선</p>
                    </div>
                    <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg">
                      <p className="font-medium">5. 메뉴 고르는 기준</p>
                      <p className="text-sm text-muted-foreground mt-1">영양/가성비 vs 오늘의 기분/감성</p>
                    </div>
                    <div className="p-4 bg-amber-50 dark:bg-amber-950 rounded-lg">
                      <p className="font-medium">6. 비 오는 날 점심</p>
                      <p className="text-sm text-muted-foreground mt-1">따끈한 국물 vs 분위기 좋은 카페식</p>
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
                <h2 className="text-2xl font-bold">🍱 16가지 점심 스타일</h2>
                <p className="text-muted-foreground">당신은 어떤 점심러일까요?</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { emoji: "🎈", name: "즉흥 미식러", type: "ENFP" },
                    { emoji: "🤝", name: "배려 캡틴", type: "ENFJ" },
                    { emoji: "🎯", name: "전략 결정러", type: "ENTJ" },
                    { emoji: "🧪", name: "실험가", type: "ENTP" },
                    { emoji: "😊", name: "케어 호스트", type: "ESFJ" },
                    { emoji: "📸", name: "트렌드 테이스터", type: "ESFP" },
                    { emoji: "📋", name: "효율 점심러", type: "ESTJ" },
                    { emoji: "⚡", name: "속전속결러", type: "ESTP" },
                  ].map((character) => (
                    <div
                      key={character.type}
                      className="p-3 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 rounded-lg text-center"
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
                  <Sparkles className="h-6 w-6 text-red-500" />
                  <span>특별한 기능</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <h3 className="font-semibold">정확한 분석</h3>
                    <p className="text-sm text-muted-foreground">12가지 점심 루틴으로 MBTI 4축을 정확하게 분석</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">💡</span>
                    </div>
                    <h3 className="font-semibold">맞춤 추천</h3>
                    <p className="text-sm text-muted-foreground">당신의 유형에 맞는 점심 메뉴, 동선 추천</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🔗</span>
                    </div>
                    <h3 className="font-semibold">쉬운 공유</h3>
                    <p className="text-sm text-muted-foreground">결과를 동료들과 쉽게 공유하고 비교해보세요</p>
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

