import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, UtensilsCrossed, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "회사 점심 뭐 먹지 테스트 | 직장인 점심 의사결정 16유형 | 테몬",
  description:
    "12문항으로 알아보는 나의 회사 점심 의사결정 스타일! 후보 정리부터 대기줄, 결제 방식까지. 작은 선택이 업무 리듬을 말합니다.",
  keywords:
    "회사 점심, 점심 메뉴 결정, 직장인 점심 테스트, 점심 성향, 팀밥, 혼밥, 점심 의사결정, MBTI, 심리테스트, 무료 테스트",
  alternates: {
    canonical: "/tests/lunch-decider",
  },
  openGraph: {
    title: "회사 점심 뭐 먹지 테스트 | 직장인 점심 의사결정 16유형",
    description: "12문항으로 알아보는 나의 회사 점심 의사결정 스타일! 후보 정리부터 대기줄, 결제 방식까지. 작은 선택이 업무 리듬을 말합니다.",
    type: "website",
    url: "https://www.temon.kr/tests/lunch-decider",
  },
}

export default function LunchDeciderIntro() {
  return (
    <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950">
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="text-center space-y-8">
          {/* Animated Lunch Elements */}
          <div className="relative mx-auto w-32 h-32 mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full animate-pulse" />
            <div className="absolute inset-2 bg-gradient-to-br from-amber-200 to-orange-300 rounded-full flex items-center justify-center">
              <span className="text-4xl animate-bounce">🍱</span>
            </div>
            {/* Floating lunch elements */}
            <div className="absolute -top-6 -left-6 text-lg animate-bounce" style={{ animationDelay: "0.5s" }}>
              🍜
            </div>
            <div className="absolute -top-4 -right-8 text-lg animate-bounce" style={{ animationDelay: "1s" }}>
              🍛
            </div>
            <div className="absolute -bottom-6 -left-8 text-lg animate-bounce" style={{ animationDelay: "1.5s" }}>
              🥘
            </div>
            <div className="absolute -bottom-4 -right-6 text-lg animate-bounce" style={{ animationDelay: "2s" }}>
              🍲
            </div>
          </div>

          <div className="space-y-6">
            <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
              🍱 NEW 테스트
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                회사 점심 뭐 먹지,
              </span>
              <br />
              <span className="text-foreground">당신의 결정 스타일은 🍱</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              후보 정리부터 대기줄, 결제 방식까지. 작은 선택이 업무 리듬을 말합니다.
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
                className="h-16 px-12 text-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link href="/tests/lunch-decider/test">
                  <span className="text-2xl mr-3">🍱</span>
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
                  <UtensilsCrossed className="h-6 w-6 text-amber-500" />
                  <span>이런 질문들이 나와요!</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-4">
                    <div className="p-4 bg-amber-50 dark:bg-amber-950 rounded-lg">
                      <p className="font-medium">1. 점심 30분 전, 당신의 준비는?</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        동료 일정 확인하고 후보를 미리 정리한다 vs 그때 상황 보고 즉흥적으로 정한다
                      </p>
                    </div>
                    <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                      <p className="font-medium">2. 회사 근처에 새 식당이 생겼다. 오늘 선택은?</p>
                      <p className="text-sm text-muted-foreground mt-1">검증된 단골집으로 간다 vs 신규 식당을 먼저 시도한다</p>
                    </div>
                    <div className="p-4 bg-amber-50 dark:bg-amber-950 rounded-lg">
                      <p className="font-medium">3. 점심 멤버를 정할 때의 태도는?</p>
                      <p className="text-sm text-muted-foreground mt-1">누가 갈지 먼저 물어보고 맞춘다 vs 혼밥도 괜찮고 조용히 움직인다</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                      <p className="font-medium">4. 메뉴 선택의 1순위 기준은?</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        가성비와 영양, 업무 집중에 도움 vs 오늘 기분과 위로, 만족감
                      </p>
                    </div>
                    <div className="p-4 bg-amber-50 dark:bg-amber-950 rounded-lg">
                      <p className="font-medium">5. 줄이 길다. 어떻게 할까?</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        대기 허용 시간을 정하고 안 되면 다른 곳 vs 메뉴 바꾸거나 포장으로 유연 대응
                      </p>
                    </div>
                    <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                      <p className="font-medium">6. 처음 보는 메뉴를 고를 때는?</p>
                      <p className="text-sm text-muted-foreground mt-1">후기·사진·성분을 확인한다 vs 조합을 상상하며 새롭게 시도한다</p>
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
                    { emoji: "🔍", name: "분위기 탐험가", type: "ENFP" },
                    { emoji: "🌙", name: "감성 테이스터", type: "INFP" },
                    { emoji: "🤝", name: "케어 플래너", type: "ENFJ" },
                    { emoji: "📖", name: "의미 큐레이터", type: "INFJ" },
                    { emoji: "🧪", name: "실험 조합가", type: "ENTP" },
                    { emoji: "🔬", name: "분석 의사결정가", type: "INTP" },
                    { emoji: "🎯", name: "드라이브 리더", type: "ENTJ" },
                    { emoji: "📐", name: "전략 설계자", type: "INTJ" },
                  ].map((character) => (
                    <div
                      key={character.type}
                      className="p-3 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 rounded-lg text-center"
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
                    <div className="w-12 h-12 mx-auto bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <h3 className="font-semibold">정확한 분석</h3>
                    <p className="text-sm text-muted-foreground">12가지 점심 패턴으로 MBTI 4축을 정확하게 분석</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">💡</span>
                    </div>
                    <h3 className="font-semibold">맞춤 팁</h3>
                    <p className="text-sm text-muted-foreground">당신의 유형에 맞는 점심 스타일, 팀밥·혼밥 팁 제공</p>
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

