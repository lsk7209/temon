import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Store, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "편의점 루틴 테스트 | 선택 습관으로 보는 16유형 | 테몬",
  description:
    "편의점 음료·간편식·행사상품 선택 루틴으로 성향을 분석합니다. 12문항, 결과 공유 이미지 자동 생성.",
  keywords:
    "편의점 테스트, 편의점 루틴, 간편식 성향, 원플러스원 선택, 장바구니 습관, 편의점 선택, 심리테스트, 무료 테스트",
  alternates: {
    canonical: "/tests/cstore-routine",
  },
  openGraph: {
    title: "편의점 루틴 테스트 | 선택 습관으로 보는 16유형",
    description: "편의점 음료·간편식·행사상품 선택 루틴으로 성향을 분석합니다. 12문항, 결과 공유 이미지 자동 생성.",
    type: "website",
    url: "https://www.temon.kr/tests/cstore-routine",
  },
}

export default function CstoreRoutineIntro() {
  return (
    <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950">
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="text-center space-y-8">
          {/* Animated Convenience Store Elements */}
          <div className="relative mx-auto w-32 h-32 mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full animate-pulse" />
            <div className="absolute inset-2 bg-gradient-to-br from-blue-200 to-cyan-300 rounded-full flex items-center justify-center">
              <span className="text-4xl animate-bounce">🏪</span>
            </div>
            {/* Floating convenience store elements */}
            <div className="absolute -top-6 -left-6 text-lg animate-bounce" style={{ animationDelay: "0.5s" }}>
              🥤
            </div>
            <div className="absolute -top-4 -right-8 text-lg animate-bounce" style={{ animationDelay: "1s" }}>
              🍱
            </div>
            <div className="absolute -bottom-6 -left-8 text-lg animate-bounce" style={{ animationDelay: "1.5s" }}>
              🍪
            </div>
            <div className="absolute -bottom-4 -right-6 text-lg animate-bounce" style={{ animationDelay: "2s" }}>
              ☕
            </div>
          </div>

          <div className="space-y-6">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              🏪 NEW 테스트
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                편의점에서 드러나는
              </span>
              <br />
              <span className="text-foreground">나의 선택 습관 🏪</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              음료, 간편식, 행사상품 선택 루틴으로 성향을 분석합니다. 12문항, 약 3분 소요.
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
                className="h-16 px-12 text-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link href="/tests/cstore-routine/test">
                  <span className="text-2xl mr-3">🏪</span>
                  테스트 시작하기
                </Link>
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                무료 • 회원가입 불필요 • 16가지 루틴 스타일 분석
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
                  <Store className="h-6 w-6 text-blue-500" />
                  <span>이런 질문들이 나와요!</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <p className="font-medium">1. 편의점에 들어가면 첫 동선은?</p>
                      <p className="text-sm text-muted-foreground mt-1">목표 코너로 직행 vs 한 바퀴 돌며 구경</p>
                    </div>
                    <div className="p-4 bg-cyan-50 dark:bg-cyan-950 rounded-lg">
                      <p className="font-medium">2. 음료 선택 기준은?</p>
                      <p className="text-sm text-muted-foreground mt-1">늘 마시는 고정 픽 vs 신제품 라벨이 보이면 시도</p>
                    </div>
                    <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <p className="font-medium">3. 함께 온 친구가 추천하면?</p>
                      <p className="text-sm text-muted-foreground mt-1">바로 시도해본다 vs 내 취향과 비교 후 결정</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-cyan-50 dark:bg-cyan-950 rounded-lg">
                      <p className="font-medium">4. 도시락 vs 간편식 고를 때?</p>
                      <p className="text-sm text-muted-foreground mt-1">영양성분·가격 먼저 확인 vs 맛 후기·기분을 우선</p>
                    </div>
                    <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <p className="font-medium">5. 결제 전에 장바구니를 보면?</p>
                      <p className="text-sm text-muted-foreground mt-1">불필요한 건 정리해 뺀다 vs 기분 따라 하나 더 담는다</p>
                    </div>
                    <div className="p-4 bg-cyan-50 dark:bg-cyan-950 rounded-lg">
                      <p className="font-medium">6. 원플러스원 딜을 만나면?</p>
                      <p className="text-sm text-muted-foreground mt-1">진짜 필요하면만 구매 vs 지금 즐거움이면 충분</p>
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
                <h2 className="text-2xl font-bold">🏪 16가지 루틴 스타일</h2>
                <p className="text-muted-foreground">당신은 어떤 편의점러일까요?</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { emoji: "🔍", name: "발견형 탐험가", type: "ENFP" },
                    { emoji: "🌙", name: "감성형 선택가", type: "INFP" },
                    { emoji: "🤝", name: "케어형 큐레이터", type: "ENFJ" },
                    { emoji: "📖", name: "맥락형 설계자", type: "INFJ" },
                    { emoji: "💡", name: "실험형 조합가", type: "ENTP" },
                    { emoji: "🔬", name: "분석형 합리가", type: "INTP" },
                    { emoji: "🎯", name: "오더형 매니저", type: "ENTJ" },
                    { emoji: "📐", name: "전략형 계획가", type: "INTJ" },
                  ].map((character) => (
                    <div
                      key={character.type}
                      className="p-3 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 rounded-lg text-center"
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
                  <Sparkles className="h-6 w-6 text-cyan-500" />
                  <span>특별한 기능</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <h3 className="font-semibold">정확한 분석</h3>
                    <p className="text-sm text-muted-foreground">12문항으로 선택 습관을 4축으로 정량화해 유형화</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-cyan-100 dark:bg-cyan-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">💡</span>
                    </div>
                    <h3 className="font-semibold">맞춤 팁</h3>
                    <p className="text-sm text-muted-foreground">당신의 유형에 맞는 편의점 루틴, 선택 팁 제공</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
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

