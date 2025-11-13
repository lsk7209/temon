import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Fish, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "붕어빵 취향 테스트 | 맛 선택·구매 방식·먹는 습관 16유형 | 테몬",
  description:
    "붕어빵 맛 선택, 구매 방식, 먹는 습관으로 16유형을 분석합니다. 12문항, 3분, 결과 공유 이미지 자동 생성.",
  keywords:
    "붕어빵 테스트, 겨울 간식, 팥 슈크림, 길거리 간식, 성향 테스트, MBTI, 심리테스트, 무료 테스트",
  alternates: {
    canonical: "/tests/bungeoppang",
  },
  openGraph: {
    title: "붕어빵 취향 테스트 | 맛 선택·구매 방식·먹는 습관 16유형",
    description: "붕어빵 맛 선택, 구매 방식, 먹는 습관으로 16유형을 분석합니다. 12문항, 3분, 결과 공유 이미지 자동 생성.",
    type: "website",
    url: "https://www.temon.kr/tests/bungeoppang",
  },
  other: {
    "schema:Quiz": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Quiz",
      name: "붕어빵 취향 테스트",
      description: "붕어빵 취향으로 16유형 분석",
      inLanguage: "ko",
      url: "https://www.temon.kr/tests/bungeoppang",
      publisher: { "@type": "Organization", name: "Temon" },
    }),
  },
}

export default function BungeoppangIntro() {
  return (
    <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950">
      <main className="container max-w-[720px] mx-auto px-4 py-8">
        <div className="text-center space-y-8">
          {/* Animated Bungeoppang Elements */}
          <div className="relative mx-auto w-32 h-32 mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-500 rounded-full animate-pulse" />
            <div className="absolute inset-2 bg-gradient-to-br from-orange-200 to-red-300 rounded-full flex items-center justify-center">
              <span className="text-4xl animate-bounce">🐟</span>
            </div>
            {/* Floating bungeoppang elements */}
            <div className="absolute -top-6 -left-6 text-lg animate-bounce" style={{ animationDelay: "0.5s" }}>
              🍞
            </div>
            <div className="absolute -top-4 -right-8 text-lg animate-bounce" style={{ animationDelay: "1s" }}>
              🔥
            </div>
            <div className="absolute -bottom-6 -left-8 text-lg animate-bounce" style={{ animationDelay: "1.5s" }}>
              ❄️
            </div>
            <div className="absolute -bottom-4 -right-6 text-lg animate-bounce" style={{ animationDelay: "2s" }}>
              ✨
            </div>
          </div>

          <div className="space-y-6">
            <Badge variant="secondary" className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
              🐟 NEW 테스트
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                붕어빵 취향으로 보는
              </span>
              <br />
              <span className="text-foreground">나의 유형 🐟</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              맛 선택, 구매 방식, 먹는 습관으로 16유형 분석. 12문항, 약 3분 소요.
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
                <Link href="/tests/bungeoppang/test">
                  <span className="text-2xl mr-3">🐟</span>
                  테스트 시작하기
                </Link>
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                무료 • 회원가입 불필요 • 16가지 붕어빵 유형 분석 • 결과 공유 이미지 자동 생성
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
                  <Fish className="h-6 w-6 text-orange-500" />
                  <span>이런 질문들이 나와요!</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-4">
                    <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                      <p className="font-medium">1. 가장 먼저 떠오르는 선택은?</p>
                      <p className="text-sm text-muted-foreground mt-1">늘 먹던 맛이 최고 vs 신메뉴부터 도전</p>
                    </div>
                    <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg">
                      <p className="font-medium">2. 몇 개 살지 정하는 방식은?</p>
                      <p className="text-sm text-muted-foreground mt-1">가다가도 수량을 미리 정한다 vs 가서 보고 즉흥 결정</p>
                    </div>
                    <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                      <p className="font-medium">3. 가게 앞 분위기에서 당신은?</p>
                      <p className="text-sm text-muted-foreground mt-1">사장님과 한두 마디 나눈다 vs 조용히 주문하고 기다린다</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg">
                      <p className="font-medium">4. 가격과 구성은 어떻게 보나?</p>
                      <p className="text-sm text-muted-foreground mt-1">가성비와 구성 먼저 체크 vs 지금 내 기분이 더 중요</p>
                    </div>
                    <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                      <p className="font-medium">5. 굽기와 식감의 기준은?</p>
                      <p className="text-sm text-muted-foreground mt-1">바삭도 일정해야 만족 vs 한 입마다 다른 느낌도 재미</p>
                    </div>
                    <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg">
                      <p className="font-medium">6. 막 구운 붕어빵을 받았다면?</p>
                      <p className="text-sm text-muted-foreground mt-1">살짝 식혀가며 먹는다 vs 뜨거워도 한 입부터</p>
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
                <h2 className="text-2xl font-bold">🐟 16가지 붕어빵 유형</h2>
                <p className="text-muted-foreground">당신은 어떤 붕어빵러일까요?</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { emoji: "⚡", name: "분위기 전파형", type: "ENFP" },
                    { emoji: "🌙", name: "감성 몰입형", type: "INFP" },
                    { emoji: "🤝", name: "케어 큐레이터형", type: "ENFJ" },
                    { emoji: "📖", name: "의미 탐구형", type: "INFJ" },
                    { emoji: "💡", name: "실험 도전자형", type: "ENTP" },
                    { emoji: "🔬", name: "논리 탐색형", type: "INTP" },
                    { emoji: "🎯", name: "전략 최적화형", type: "ENTJ" },
                    { emoji: "📐", name: "설계 몰입형", type: "INTJ" },
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
                    <p className="text-sm text-muted-foreground">12문항으로 붕어빵 취향을 4축으로 정량화해 유형화</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">💡</span>
                    </div>
                    <h3 className="font-semibold">맞춤 추천</h3>
                    <p className="text-sm text-muted-foreground">당신의 유형에 맞는 조합 추천, 구매 팁 제공</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
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

