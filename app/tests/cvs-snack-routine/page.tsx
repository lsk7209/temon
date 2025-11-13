import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Store, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "편의점 간식 루틴 테스트 | 간식 선택으로 보는 16유형 | 테몬",
  description:
    "12문항으로 알아보는 나의 편의점 간식 루틴! 행사부터 한정판까지. 작은 간식 루틴이 당신의 의사결정 패턴을 말합니다.",
  keywords:
    "편의점 간식 테스트, 간식 성향, 한정판 스낵, 간식 루틴, 편의점 간식 선택, 간식 의사결정, MBTI, 심리테스트, 무료 테스트",
  alternates: {
    canonical: "/tests/cvs-snack-routine",
  },
  openGraph: {
    title: "편의점 간식 루틴 테스트 | 간식 선택으로 보는 16유형",
    description: "12문항으로 알아보는 나의 편의점 간식 루틴! 행사부터 한정판까지. 작은 간식 루틴이 당신의 의사결정 패턴을 말합니다.",
    type: "website",
    url: "https://www.temon.kr/tests/cvs-snack-routine",
  },
}

export default function CvsSnackRoutineIntro() {
  return (
    <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950">
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="text-center space-y-8">
          {/* Animated Convenience Store Snack Elements */}
          <div className="relative mx-auto w-32 h-32 mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full animate-pulse" />
            <div className="absolute inset-2 bg-gradient-to-br from-purple-200 to-pink-300 rounded-full flex items-center justify-center">
              <span className="text-4xl animate-bounce">🏪</span>
            </div>
            {/* Floating snack elements */}
            <div className="absolute -top-6 -left-6 text-lg animate-bounce" style={{ animationDelay: "0.5s" }}>
              🍪
            </div>
            <div className="absolute -top-4 -right-8 text-lg animate-bounce" style={{ animationDelay: "1s" }}>
              🍫
            </div>
            <div className="absolute -bottom-6 -left-8 text-lg animate-bounce" style={{ animationDelay: "1.5s" }}>
              🥤
            </div>
            <div className="absolute -bottom-4 -right-6 text-lg animate-bounce" style={{ animationDelay: "2s" }}>
              🍬
            </div>
          </div>

          <div className="space-y-6">
            <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
              🏪 NEW 테스트
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                편의점 간식 루틴,
              </span>
              <br />
              <span className="text-foreground">당신의 선택 스타일은 🏪</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              행사부터 한정판까지. 작은 간식 루틴이 당신의 의사결정 패턴을 말합니다.
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
                className="h-16 px-12 text-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link href="/tests/cvs-snack-routine/test">
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
                  <Store className="h-6 w-6 text-purple-500" />
                  <span>이런 질문들이 나와요!</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-4">
                    <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                      <p className="font-medium">1. 편의점에 들어가기 전 당신은?</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        행사 품목과 가격을 미리 확인한다 vs 그때 끌리는 대로 고른다
                      </p>
                    </div>
                    <div className="p-4 bg-pink-50 dark:bg-pink-950 rounded-lg">
                      <p className="font-medium">2. 새로운 한정판 스낵을 봤다. 선택은?</p>
                      <p className="text-sm text-muted-foreground mt-1">성분표와 후기를 보고 결정한다 vs 호기심에 바로 시도한다</p>
                    </div>
                    <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                      <p className="font-medium">3. 간식 추천을 받을 때의 태도는?</p>
                      <p className="text-sm text-muted-foreground mt-1">직원이나 동행에게 먼저 물어본다 vs 조용히 비교하고 혼자 결정한다</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-pink-50 dark:bg-pink-950 rounded-lg">
                      <p className="font-medium">4. 간식 선택의 1순위 기준은?</p>
                      <p className="text-sm text-muted-foreground mt-1">칼로리·영양·가성비 vs 오늘 기분과 위로</p>
                    </div>
                    <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                      <p className="font-medium">5. 원하는 상품이 품절이다. 어떻게 할까?</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        대체 리스트에서 가장 비슷한 걸 고른다 vs 전혀 다른 간식으로 방향을 바꾼다
                      </p>
                    </div>
                    <div className="p-4 bg-pink-50 dark:bg-pink-950 rounded-lg">
                      <p className="font-medium">6. 신상품 코너를 볼 때 당신은?</p>
                      <p className="text-sm text-muted-foreground mt-1">포장 정보와 원재료를 꼼꼼히 본다 vs 컨셉과 조합 가능성을 상상한다</p>
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
                <p className="text-muted-foreground">당신은 어떤 간식러일까요?</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { emoji: "🔍", name: "신상 탐험가", type: "ENFP" },
                    { emoji: "🌙", name: "감성 테이스터", type: "INFP" },
                    { emoji: "🤝", name: "케어 셀렉터", type: "ENFJ" },
                    { emoji: "📖", name: "의미 큐레이터", type: "INFJ" },
                    { emoji: "🧪", name: "실험 조합가", type: "ENTP" },
                    { emoji: "🔬", name: "분석 설계자", type: "INTP" },
                    { emoji: "🎯", name: "드라이브 운영자", type: "ENTJ" },
                    { emoji: "📐", name: "전략 큐레이터", type: "INTJ" },
                  ].map((character) => (
                    <div
                      key={character.type}
                      className="p-3 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 rounded-lg text-center"
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
                  <Sparkles className="h-6 w-6 text-pink-500" />
                  <span>특별한 기능</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <h3 className="font-semibold">정확한 분석</h3>
                    <p className="text-sm text-muted-foreground">12가지 간식 패턴으로 MBTI 4축을 정확하게 분석</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">💡</span>
                    </div>
                    <h3 className="font-semibold">맞춤 팁</h3>
                    <p className="text-sm text-muted-foreground">당신의 유형에 맞는 간식 스타일, 한정판 대응 팁 제공</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
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

