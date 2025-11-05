import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, ChefHat, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "자취 밥상 스타일 테스트 | 오늘도 혼밥하는 당신의 성격은? | 테몬",
  description:
    "12문항으로 알아보는 나의 자취 밥상 습관. 요리·배달·정리 루틴까지 성격으로 분석합니다. 자취 밥상 스타일 테스트로 알아보는 나의 성격 유형을 무료로 시작해보세요.",
  keywords: "자취, 밥상, 자취 밥상, 자취생, 원룸, 자취촌, 배달앱, 요리, 배달, 성격 테스트, MBTI, 심리테스트, 무료 테스트",
  alternates: {
    canonical: "/tests/jachui",
  },
  openGraph: {
    title: "자취 밥상 스타일 테스트 | 오늘도 혼밥하는 당신의 성격은?",
    description: "12문항으로 알아보는 나의 자취 밥상 습관. 요리·배달·정리 루틴까지 성격으로 분석합니다.",
    type: "website",
    url: "https://www.temon.kr/tests/jachui",
  },
}

export default function JachuiIntro() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-orange-950 dark:via-amber-950 dark:to-yellow-950">
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="text-center space-y-8">
          {/* Animated Cooking Elements */}
          <div className="relative mx-auto w-32 h-32 mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full animate-pulse" />
            <div className="absolute inset-2 bg-gradient-to-br from-orange-200 to-amber-300 rounded-full flex items-center justify-center">
              <span className="text-4xl animate-bounce">🍳</span>
            </div>
            {/* Floating cooking elements */}
            <div className="absolute -top-6 -left-6 text-lg animate-bounce" style={{ animationDelay: "0.5s" }}>
              🍚
            </div>
            <div className="absolute -top-4 -right-8 text-lg animate-bounce" style={{ animationDelay: "1s" }}>
              🥘
            </div>
            <div className="absolute -bottom-6 -left-8 text-lg animate-bounce" style={{ animationDelay: "1.5s" }}>
              🍜
            </div>
            <div className="absolute -bottom-4 -right-6 text-lg animate-bounce" style={{ animationDelay: "2s" }}>
              🥗
            </div>
          </div>

          <div className="space-y-6">
            <Badge variant="secondary" className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
              🍳 NEW 테스트
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                오늘도 자취생의 밥상은
              </span>
              <br />
              <span className="text-foreground">드라마다 🎬🍳</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              요리? 귀찮음? 배달? 당신의 자취 밥상 습관으로 보는 성격 유형 테스트
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
                className="h-16 px-12 text-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg hover:shadow-xl transition-all duration-300 group"
                asChild
              >
                <Link href="/tests/jachui/test">
                  <span className="text-2xl mr-3 group-hover:animate-bounce">🍚</span>
                  테스트 시작하기
                </Link>
              </Button>

              <p className="text-sm text-center text-muted-foreground">무료 • 회원가입 불필요 • 16가지 밥상 유형 분석</p>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="mt-20 space-y-12">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold flex items-center justify-center space-x-2">
                  <ChefHat className="h-6 w-6 text-orange-500" />
                  <span>이런 질문들이 나와요!</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-4">
                    <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                      <p className="font-medium">🧊 냉장고를 열었을 때</p>
                      <p className="text-sm text-muted-foreground mt-1">재료가 정리되어 있다 vs 반쯤 비어있고 배달 쿠폰만</p>
                    </div>
                    <div className="p-4 bg-amber-50 dark:bg-amber-950 rounded-lg">
                      <p className="font-medium">🍽️ 밥 먹기 전 고민은</p>
                      <p className="text-sm text-muted-foreground mt-1">반찬 구성과 영양 vs 메뉴 맛과 기분</p>
                    </div>
                    <div className="p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                      <p className="font-medium">⏰ 식사 시간은</p>
                      <p className="text-sm text-muted-foreground mt-1">일정하게 맞춘다 vs 배고프면 먹는다</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                      <p className="font-medium">🍳 배달앱을 켰을 때</p>
                      <p className="text-sm text-muted-foreground mt-1">평점/후기부터 본다 vs 썸네일/사진 맛집부터 본다</p>
                    </div>
                    <div className="p-4 bg-amber-50 dark:bg-amber-950 rounded-lg">
                      <p className="font-medium">👥 친구가 집에 온다면</p>
                      <p className="text-sm text-muted-foreground mt-1">한상 차림 준비! vs 배달 시키자고 제안</p>
                    </div>
                    <div className="p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                      <p className="font-medium">🍲 냉장고에 남은 김치로</p>
                      <p className="text-sm text-muted-foreground mt-1">김치볶음밥 만든다 vs 그냥 컵라면 먹는다</p>
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
                <h2 className="text-2xl font-bold">🎭 16가지 밥상 유형</h2>
                <p className="text-muted-foreground">당신은 어떤 자취 밥상 스타일일까요?</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { emoji: "🎈", name: "즉흥 요리러", type: "ENFP" },
                    { emoji: "🌙", name: "감성 혼밥러", type: "INFP" },
                    { emoji: "🤝", name: "공유밥상 리더", type: "ENFJ" },
                    { emoji: "📖", name: "철학적 미식가", type: "INFJ" },
                    { emoji: "🧪", name: "창의 조리왕", type: "ENTP" },
                    { emoji: "🔬", name: "레시피 분석러", type: "INTP" },
                    { emoji: "🧱", name: "식단 관리자", type: "ENTJ" },
                    { emoji: "📐", name: "효율 요리 설계자", type: "INTJ" },
                  ].map((character) => (
                    <div
                      key={character.type}
                      className="p-3 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950 rounded-lg text-center"
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
                  <Sparkles className="h-6 w-6 text-amber-500" />
                  <span>특별한 기능</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <h3 className="font-semibold">정확한 분석</h3>
                    <p className="text-sm text-muted-foreground">12가지 자취 밥상 습관으로 MBTI 4축을 정확하게 분석</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">💡</span>
                    </div>
                    <h3 className="font-semibold">맞춤 추천</h3>
                    <p className="text-sm text-muted-foreground">당신의 유형에 맞는 추천 메뉴와 장보기 꿀템</p>
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

