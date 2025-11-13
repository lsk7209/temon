import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Drumstick, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "치킨 주문 스타일 테스트 | 후라이드·양념·반반으로 보는 16유형 | 테몬",
  description:
    "치킨 주문 습관으로 16유형 성향을 분석합니다. 12문항, 결과 공유 이미지 자동 생성.",
  keywords:
    "치킨 테스트, 치킨 성향, 치킨 반반, 치킨 주문 스타일, 배달 음식 테스트, 치킨 MBTI, 심리테스트, 무료 테스트",
  alternates: {
    canonical: "/tests/chicken-style",
  },
  openGraph: {
    title: "치킨 주문 스타일 테스트 | 후라이드·양념·반반으로 보는 16유형",
    description: "치킨 주문 습관으로 16유형 성향을 분석합니다. 12문항, 결과 공유 이미지 자동 생성.",
    type: "website",
    url: "https://www.temon.kr/tests/chicken-style",
  },
}

export default function ChickenStyleIntro() {
  return (
    <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950">
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="text-center space-y-8">
          {/* Animated Chicken Elements */}
          <div className="relative mx-auto w-32 h-32 mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse" />
            <div className="absolute inset-2 bg-gradient-to-br from-yellow-200 to-orange-300 rounded-full flex items-center justify-center">
              <span className="text-4xl animate-bounce">🍗</span>
            </div>
            {/* Floating chicken elements */}
            <div className="absolute -top-6 -left-6 text-lg animate-bounce" style={{ animationDelay: "0.5s" }}>
              🍖
            </div>
            <div className="absolute -top-4 -right-8 text-lg animate-bounce" style={{ animationDelay: "1s" }}>
              🥤
            </div>
            <div className="absolute -bottom-6 -left-8 text-lg animate-bounce" style={{ animationDelay: "1.5s" }}>
              🍺
            </div>
            <div className="absolute -bottom-4 -right-6 text-lg animate-bounce" style={{ animationDelay: "2s" }}>
              🍟
            </div>
          </div>

          <div className="space-y-6">
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
              🍗 NEW 테스트
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                치킨 주문 습관으로 보는
              </span>
              <br />
              <span className="text-foreground">나의 선택 패턴 🍗</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              메뉴 결정, 신메뉴 도전, 정산·공유 습관으로 16유형 분석. 12문항, 약 3분 소요.
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
                className="h-16 px-12 text-xl bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link href="/tests/chicken-style/test">
                  <span className="text-2xl mr-3">🍗</span>
                  테스트 시작하기
                </Link>
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                무료 • 회원가입 불필요 • 16가지 주문 스타일 분석
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
                  <Drumstick className="h-6 w-6 text-yellow-500" />
                  <span>이런 질문들이 나와요!</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-4">
                    <div className="p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                      <p className="font-medium">1. 치킨을 시키기 전 당신은?</p>
                      <p className="text-sm text-muted-foreground mt-1">항상 먹던 메뉴로 바로 결정 vs 앱 할인·리뷰 보며 그때그때 결정</p>
                    </div>
                    <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                      <p className="font-medium">2. 신메뉴가 나왔다면?</p>
                      <p className="text-sm text-muted-foreground mt-1">시그니처부터 확인 vs 신메뉴 먼저 도전</p>
                    </div>
                    <div className="p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                      <p className="font-medium">3. 주문 인원 모집 상황에서 당신은?</p>
                      <p className="text-sm text-muted-foreground mt-1">단톡에 먼저 모집 글 올림 vs 조용히 혼자 주문</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                      <p className="font-medium">4. 정산 방식에 대한 생각은?</p>
                      <p className="text-sm text-muted-foreground mt-1">원가 기준 정확히 N분의 1 vs 상황 보고 조금 더 내거나 배려</p>
                    </div>
                    <div className="p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                      <p className="font-medium">5. 배달 오기 전 무엇을 하나요?</p>
                      <p className="text-sm text-muted-foreground mt-1">소스·음료·접시 미리 세팅 vs 오면 그때 상황 보고 준비</p>
                    </div>
                    <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                      <p className="font-medium">6. 후라이드 vs 양념 선택 기준은?</p>
                      <p className="text-sm text-muted-foreground mt-1">기본의 맛과 식감 우선 vs 소스 조합과 변주 우선</p>
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
                <h2 className="text-2xl font-bold">🍗 16가지 주문 스타일</h2>
                <p className="text-muted-foreground">당신은 어떤 치킨러일까요?</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { emoji: "🎉", name: "즉흥 파티형", type: "ENFP" },
                    { emoji: "🌙", name: "감성 몰입형", type: "INFP" },
                    { emoji: "🤝", name: "나눔 리더형", type: "ENFJ" },
                    { emoji: "📖", name: "의미 선택형", type: "INFJ" },
                    { emoji: "💡", name: "조합 설계형", type: "ENTP" },
                    { emoji: "🔬", name: "데이터 최적화형", type: "INTP" },
                    { emoji: "🎯", name: "프로세스 리더형", type: "ENTJ" },
                    { emoji: "📐", name: "전략 큐레이터형", type: "INTJ" },
                  ].map((character) => (
                    <div
                      key={character.type}
                      className="p-3 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950 rounded-lg text-center"
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
                    <div className="w-12 h-12 mx-auto bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <h3 className="font-semibold">정확한 분석</h3>
                    <p className="text-sm text-muted-foreground">12문항으로 주문 습관을 4축으로 정량화해 유형화</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">💡</span>
                    </div>
                    <h3 className="font-semibold">맞춤 팁</h3>
                    <p className="text-sm text-muted-foreground">당신의 유형에 맞는 치킨 스타일, 주문 팁 제공</p>
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
