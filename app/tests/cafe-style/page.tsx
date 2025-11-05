import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Coffee, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "카페 스타일 성격 테스트 | 당신은 어떤 카공족? | 테몬",
  description:
    "12문항으로 보는 나의 카페 라이프 스타일! 메뉴 선택부터 자리까지, 당신의 성격이 드러납니다. 카페에서의 나 스타일 테스트를 무료로 시작해보세요.",
  keywords: "카페 스타일, 카페 성격 테스트, 카공족, 카페 유형, 커피 취향, 카페 테스트, 서울 카공족, 동네 카페, 테이크아웃, MBTI, 심리테스트, 무료 테스트",
  alternates: {
    canonical: "/tests/cafe-style",
  },
  openGraph: {
    title: "카페 스타일 성격 테스트 | 당신은 어떤 카공족?",
    description: "12문항으로 보는 나의 카페 라이프 스타일! 메뉴 선택부터 자리까지, 당신의 성격이 드러납니다.",
    type: "website",
    url: "https://www.temon.kr/tests/cafe-style",
  },
}

export default function CafeStyleIntro() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-brown-50 dark:from-amber-950 dark:via-orange-950 dark:to-brown-950">
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="text-center space-y-8">
          {/* Animated Coffee Elements */}
          <div className="relative mx-auto w-32 h-32 mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-brown-500 rounded-full animate-pulse" />
            <div className="absolute inset-2 bg-gradient-to-br from-amber-200 to-brown-300 rounded-full flex items-center justify-center">
              <span className="text-4xl animate-bounce">☕</span>
            </div>
            {/* Floating coffee elements */}
            <div className="absolute -top-6 -left-6 text-lg animate-bounce" style={{ animationDelay: "0.5s" }}>
              🍰
            </div>
            <div className="absolute -top-4 -right-8 text-lg animate-bounce" style={{ animationDelay: "1s" }}>
              📚
            </div>
            <div className="absolute -bottom-6 -left-8 text-lg animate-bounce" style={{ animationDelay: "1.5s" }}>
              💻
            </div>
            <div className="absolute -bottom-4 -right-6 text-lg animate-bounce" style={{ animationDelay: "2s" }}>
              🎵
            </div>
          </div>

          <div className="space-y-6">
            <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
              ☕ NEW 테스트
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-amber-500 to-brown-500 bg-clip-text text-transparent">
                카페에 가면
              </span>
              <br />
              <span className="text-foreground">드러나는 당신의 성격 ☕</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              커피 주문, 좌석 선택, 대화 스타일까지 —
              <br />
              당신의 카페 습관으로 알아보는 성격 유형 테스트!
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
                className="h-16 px-12 text-xl bg-gradient-to-r from-amber-500 to-brown-500 hover:from-amber-600 hover:to-brown-600 shadow-lg hover:shadow-xl transition-all duration-300 group"
                asChild
              >
                <Link href="/tests/cafe-style/test">
                  <span className="text-2xl mr-3 group-hover:animate-bounce">☕</span>
                  테스트 시작하기
                </Link>
              </Button>

              <p className="text-sm text-center text-muted-foreground">무료 • 회원가입 불필요 • 16가지 카페 유형 분석</p>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="mt-20 space-y-12">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold flex items-center justify-center space-x-2">
                  <Coffee className="h-6 w-6 text-amber-500" />
                  <span>이런 질문들이 나와요!</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-4">
                    <div className="p-4 bg-amber-50 dark:bg-amber-950 rounded-lg">
                      <p className="font-medium">☕ 카페에 가면 먼저 하는 일은?</p>
                      <p className="text-sm text-muted-foreground mt-1">자리를 찾는다 vs 메뉴판부터 본다</p>
                    </div>
                    <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                      <p className="font-medium">☕ 커피 메뉴 고를 때</p>
                      <p className="text-sm text-muted-foreground mt-1">늘 마시는 고정 메뉴 vs 새로운 시그니처 시도</p>
                    </div>
                    <div className="p-4 bg-brown-50 dark:bg-brown-950 rounded-lg">
                      <p className="font-medium">☕ 카페 분위기는?</p>
                      <p className="text-sm text-muted-foreground mt-1">조용하고 집중 가능한 곳 vs 북적북적 활기찬 곳</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-amber-50 dark:bg-amber-950 rounded-lg">
                      <p className="font-medium">☕ 자리에 앉았을 때</p>
                      <p className="text-sm text-muted-foreground mt-1">노트북·책 꺼내 준비 vs 일단 커피 향 즐김</p>
                    </div>
                    <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                      <p className="font-medium">☕ 카페 사진을 찍을 때</p>
                      <p className="text-sm text-muted-foreground mt-1">음식·메뉴 중심 vs 감성·분위기 중심</p>
                    </div>
                    <div className="p-4 bg-brown-50 dark:bg-brown-950 rounded-lg">
                      <p className="font-medium">☕ 혼자 카페에 있을 때</p>
                      <p className="text-sm text-muted-foreground mt-1">집중 모드 ON vs 사람 구경하며 힐링</p>
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
                <h2 className="text-2xl font-bold">🎭 16가지 카페 유형</h2>
                <p className="text-muted-foreground">당신은 어떤 카페러일까요?</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { emoji: "🎈", name: "감성 탐험러", type: "ENFP" },
                    { emoji: "🌙", name: "혼자 힐링러", type: "INFP" },
                    { emoji: "🤝", name: "대화 마스터", type: "ENFJ" },
                    { emoji: "📖", name: "사색적 관찰자", type: "INFJ" },
                    { emoji: "🧪", name: "실험적 크리에이터", type: "ENTP" },
                    { emoji: "🔬", name: "아이디어 연구러", type: "INTP" },
                    { emoji: "🧱", name: "목표 달성러", type: "ENTJ" },
                    { emoji: "📐", name: "계획형 카공러", type: "INTJ" },
                  ].map((character) => (
                    <div
                      key={character.type}
                      className="p-3 bg-gradient-to-br from-amber-50 to-brown-50 dark:from-amber-950 dark:to-brown-950 rounded-lg text-center"
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
                  <Sparkles className="h-6 w-6 text-brown-500" />
                  <span>특별한 기능</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <h3 className="font-semibold">정확한 분석</h3>
                    <p className="text-sm text-muted-foreground">12가지 카페 습관으로 MBTI 4축을 정확하게 분석</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">💡</span>
                    </div>
                    <h3 className="font-semibold">맞춤 추천</h3>
                    <p className="text-sm text-muted-foreground">당신의 유형에 맞는 추천 메뉴와 카페 활동</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-brown-100 dark:bg-brown-900 rounded-full flex items-center justify-center">
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

