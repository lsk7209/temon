import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Store, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "편의점 간식 루틴 테스트 | 신상·행사·조합으로 보는 성향 | 테몬",
  description:
    "12문항으로 알아보는 나의 편의점 간식 루틴! 방문 이유부터 조합 습관까지. 사소한 선택이 당신의 성향을 말합니다.",
  keywords:
    "편의점 간식 테스트, 편의점 루틴, 편의점 신상품, 편의점 행사, 간식 선택 테스트, 편의점 조합, 간식 성향 MBTI, MBTI, 심리테스트, 무료 테스트",
  alternates: {
    canonical: "/tests/convenience-snack",
  },
  openGraph: {
    title: "편의점 간식 루틴 테스트 | 신상·행사·조합으로 보는 성향",
    description: "12문항으로 알아보는 나의 편의점 간식 루틴! 방문 이유부터 조합 습관까지. 사소한 선택이 당신의 성향을 말합니다.",
    type: "website",
    url: "https://www.temon.kr/tests/convenience-snack",
  },
}

export default function ConvenienceSnackIntro() {
  return (
    <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950">
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="text-center space-y-8">
          {/* Animated Convenience Store Elements */}
          <div className="relative mx-auto w-32 h-32 mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full animate-pulse" />
            <div className="absolute inset-2 bg-gradient-to-br from-green-200 to-emerald-300 rounded-full flex items-center justify-center">
              <span className="text-4xl animate-bounce">🏪</span>
            </div>
            {/* Floating convenience store elements */}
            <div className="absolute -top-6 -left-6 text-lg animate-bounce" style={{ animationDelay: "0.5s" }}>
              🍪
            </div>
            <div className="absolute -top-4 -right-8 text-lg animate-bounce" style={{ animationDelay: "1s" }}>
              🥤
            </div>
            <div className="absolute -bottom-6 -left-8 text-lg animate-bounce" style={{ animationDelay: "1.5s" }}>
              🍫
            </div>
            <div className="absolute -bottom-4 -right-6 text-lg animate-bounce" style={{ animationDelay: "2s" }}>
              🍞
            </div>
          </div>

          <div className="space-y-6">
            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              🏪 NEW 테스트
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                편의점 간식으로 보는
              </span>
              <br />
              <span className="text-foreground">나의 루틴 성향 🏪</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              방문 이유부터 조합 습관까지. 사소한 선택이 당신의 성향을 말합니다.
            </p>

            {/* Stats */}
            <div className="flex justify-center items-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Coming Soon</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>2분 소요</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>12문항</span>
              </div>
            </div>

            <div className="space-y-4">
              <Button
                size="lg"
                className="h-16 px-12 text-xl bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link href="/tests/convenience-snack/test">
                  <span className="text-2xl mr-3">🏪</span>
                  테스트 시작하기
                </Link>
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                무료 • 회원가입 불필요 • 16가지 간식 스타일 분석
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
                  <Store className="h-6 w-6 text-green-500" />
                  <span>이런 질문들이 나와요!</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                      <p className="font-medium">1. 편의점에 가는 가장 큰 이유는?</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        필요한 것만 빠르게 사기 vs 새로운 조합 찾고 기분 전환
                      </p>
                    </div>
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-950 rounded-lg">
                      <p className="font-medium">2. 신상품을 봤을 때의 선택은?</p>
                      <p className="text-sm text-muted-foreground mt-1">후기·행사 여부 보고 결정 vs 바로 한 번 시도해 본다</p>
                    </div>
                    <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                      <p className="font-medium">3. 둘이 갈 때 메뉴 고르는 법은?</p>
                      <p className="text-sm text-muted-foreground mt-1">상대 취향 묻고 투표로 정함 vs 조용히 추천 몇 개만 던짐</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-950 rounded-lg">
                      <p className="font-medium">4. 1+1 또는 2+1 행사에 대한 태도는?</p>
                      <p className="text-sm text-muted-foreground mt-1">실속·단가 계산 후 선택 vs 오늘 즐거움이면 충분</p>
                    </div>
                    <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                      <p className="font-medium">5. 대표 간식 루틴은?</p>
                      <p className="text-sm text-muted-foreground mt-1">늘 먹던 빵·우유 등 고정 vs 상황 따라 즉흥 조합</p>
                    </div>
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-950 rounded-lg">
                      <p className="font-medium">6. 전자레인지·핫바를 고를 때 기준은?</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        성분·중량·가격 등을 먼저 본다 vs 향·식감 상상과 그때의 욕구
                      </p>
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
                <h2 className="text-2xl font-bold">🏪 16가지 간식 스타일</h2>
                <p className="text-muted-foreground">당신은 어떤 편의점러일까요?</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { emoji: "🔍", name: "즉흥 큐레이터", type: "ENFP" },
                    { emoji: "🌙", name: "감성 미식가", type: "INFP" },
                    { emoji: "🤝", name: "케어 리더", type: "ENFJ" },
                    { emoji: "📖", name: "의미 큐레이터", type: "INFJ" },
                    { emoji: "🧪", name: "실험 조합러", type: "ENTP" },
                    { emoji: "🔬", name: "분석 테이스터", type: "INTP" },
                    { emoji: "🎯", name: "드라이브 결정가", type: "ENTJ" },
                    { emoji: "📐", name: "전략 큐레이터", type: "INTJ" },
                  ].map((character) => (
                    <div
                      key={character.type}
                      className="p-3 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-lg text-center"
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
                  <Sparkles className="h-6 w-6 text-emerald-500" />
                  <span>특별한 기능</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <h3 className="font-semibold">정확한 분석</h3>
                    <p className="text-sm text-muted-foreground">12가지 간식 패턴으로 MBTI 4축을 정확하게 분석</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">💡</span>
                    </div>
                    <h3 className="font-semibold">맞춤 팁</h3>
                    <p className="text-sm text-muted-foreground">당신의 유형에 맞는 간식 스타일, 추천 팁 제공</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
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

