import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, ShoppingBag, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "편의점 조합 스타일 테스트 | 야식·혼스낵 루틴으로 보는 16유형 | 테몬",
  description:
    "편의점 선택 습관으로 16유형 성향을 분석합니다. 12문항, 3분, 결과 공유 이미지 자동 생성.",
  keywords:
    "편의점 테스트, 편의점 조합, 편의점 루틴, 야식 테스트, 간편식 테스트, 편의점 MBTI, 심리테스트, 무료 테스트",
  alternates: {
    canonical: "/tests/cvs-combo",
  },
  openGraph: {
    title: "편의점 조합 스타일 테스트 | 야식·혼스낵 루틴으로 보는 16유형",
    description: "편의점 선택 습관으로 16유형 성향을 분석합니다. 12문항, 3분, 결과 공유 이미지 자동 생성.",
    type: "website",
    url: "https://www.temon.kr/tests/cvs-combo",
  },
}

export default function CvsComboIntro() {
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
              🍙
            </div>
            <div className="absolute -top-4 -right-8 text-lg animate-bounce" style={{ animationDelay: "1s" }}>
              🥤
            </div>
            <div className="absolute -bottom-6 -left-8 text-lg animate-bounce" style={{ animationDelay: "1.5s" }}>
              🍜
            </div>
            <div className="absolute -bottom-4 -right-6 text-lg animate-bounce" style={{ animationDelay: "2s" }}>
              🍰
            </div>
          </div>

          <div className="space-y-6">
            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              🏪 NEW 테스트
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                편의점 조합으로 보는
              </span>
              <br />
              <span className="text-foreground">나의 선택 패턴 🏪</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              메뉴 고르기, 신상품 도전, 포인트·정산 습관을 기준으로 16유형 분석. 12문항, 약 3분 소요.
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
                className="h-16 px-12 text-xl bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link href="/tests/cvs-combo/test">
                  <span className="text-2xl mr-3">🏪</span>
                  테스트 시작하기
                </Link>
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                무료 • 회원가입 불필요 • 16가지 조합 스타일 분석
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
                  <ShoppingBag className="h-6 w-6 text-green-500" />
                  <span>이런 질문들이 나와요!</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                      <p className="font-medium">1. 편의점에 들어서자마자 당신은?</p>
                      <p className="text-sm text-muted-foreground mt-1">살 것만 빠르게 담고 계산 vs 한 바퀴 돌며 신상품부터 훑어봄</p>
                    </div>
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-950 rounded-lg">
                      <p className="font-medium">2. 시즌 한정 신상품을 보면?</p>
                      <p className="text-sm text-muted-foreground mt-1">기본 메뉴부터 확인 vs 바로 시도해봄</p>
                    </div>
                    <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                      <p className="font-medium">3. 동행과 함께라면?</p>
                      <p className="text-sm text-muted-foreground mt-1">대화하며 서로 추천·공유 vs 각자 조용히 장바구니 채움</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-950 rounded-lg">
                      <p className="font-medium">4. 결제·정산 스타일은?</p>
                      <p className="text-sm text-muted-foreground mt-1">정확한 금액·영수증 기준으로 계산 vs 상황 봐서 내가 조금 더 부담</p>
                    </div>
                    <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                      <p className="font-medium">5. 장바구니를 채우는 방식은?</p>
                      <p className="text-sm text-muted-foreground mt-1">리스트대로 차례대로 담음 vs 발견한 것들을 즉흥적으로 조합</p>
                    </div>
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-950 rounded-lg">
                      <p className="font-medium">6. 라벨을 볼 때 무엇을 중시하나?</p>
                      <p className="text-sm text-muted-foreground mt-1">원재료·칼로리·당류 같은 객관 정보 vs 브랜드 스토리·패키지 컨셉</p>
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
                <h2 className="text-2xl font-bold">🏪 16가지 조합 스타일</h2>
                <p className="text-muted-foreground">당신은 어떤 편의점러일까요?</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { emoji: "🎉", name: "즉흥 탐험형", type: "ENFP" },
                    { emoji: "🌙", name: "감성 힐링형", type: "INFP" },
                    { emoji: "🤝", name: "배려 큐레이터형", type: "ENFJ" },
                    { emoji: "📖", name: "의미 선별형", type: "INFJ" },
                    { emoji: "💡", name: "레시피 실험형", type: "ENTP" },
                    { emoji: "🔬", name: "데이터 최적화형", type: "INTP" },
                    { emoji: "🎯", name: "프로세스 리더형", type: "ENTJ" },
                    { emoji: "📐", name: "전략 큐레이터형", type: "INTJ" },
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
                    <p className="text-sm text-muted-foreground">12문항으로 선택 습관을 4축으로 정량화해 유형화</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">💡</span>
                    </div>
                    <h3 className="font-semibold">맞춤 팁</h3>
                    <p className="text-sm text-muted-foreground">당신의 유형에 맞는 편의점 조합, 쇼핑 팁 제공</p>
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

