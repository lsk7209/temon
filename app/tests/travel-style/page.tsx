import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Plane, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "여행 짐 스타일 테스트 | 당신은 꼼꼼형 여행러? 즉흥형 여행러? | 테몬",
  description:
    "12문항으로 알아보는 나의 여행 짐 스타일! 계획형부터 즉흥형까지 성격 분석. 짐 싸는 습관 속에 숨은 나의 성격을 알아보세요.",
  keywords: "여행 짐 스타일, 여행 성격 테스트, 짐 싸는 MBTI, 여행 스타일, 여행 테스트, 제주도, 도쿄, 오사카, 여행러, MBTI, 심리테스트, 무료 테스트",
  alternates: {
    canonical: "/tests/travel-style",
  },
  openGraph: {
    title: "여행 짐 스타일 테스트 | 당신은 꼼꼼형 여행러? 즉흥형 여행러?",
    description: "12문항으로 알아보는 나의 여행 짐 스타일! 계획형부터 즉흥형까지 성격 분석.",
    type: "website",
    url: "https://www.temon.kr/tests/travel-style",
  },
}

export default function TravelStyleIntro() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 dark:from-cyan-950 dark:via-blue-950 dark:to-indigo-950">
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="text-center space-y-8">
          {/* Animated Travel Elements */}
          <div className="relative mx-auto w-32 h-32 mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-indigo-500 rounded-full animate-pulse" />
            <div className="absolute inset-2 bg-gradient-to-br from-cyan-200 to-indigo-300 rounded-full flex items-center justify-center">
              <span className="text-4xl animate-bounce">🧳</span>
            </div>
            {/* Floating travel elements */}
            <div className="absolute -top-6 -left-6 text-lg animate-bounce" style={{ animationDelay: "0.5s" }}>
              ✈️
            </div>
            <div className="absolute -top-4 -right-8 text-lg animate-bounce" style={{ animationDelay: "1s" }}>
              🗺️
            </div>
            <div className="absolute -bottom-6 -left-8 text-lg animate-bounce" style={{ animationDelay: "1.5s" }}>
              🎒
            </div>
            <div className="absolute -bottom-4 -right-6 text-lg animate-bounce" style={{ animationDelay: "2s" }}>
              🌍
            </div>
          </div>

          <div className="space-y-6">
            <Badge variant="secondary" className="bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200">
              🧳 NEW 테스트
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-cyan-500 to-indigo-500 bg-clip-text text-transparent">
                여행 떠나기 전,
              </span>
              <br />
              <span className="text-foreground">당신은 어떤 짐꾼인가요? 🧳</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              짐 싸는 습관 속에 숨은 나의 성격을 알아보세요.
              <br />
              꼼꼼형? 즉흥형? 여행에도 MBTI가 있다!
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
                className="h-16 px-12 text-xl bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-600 hover:to-indigo-600 shadow-lg hover:shadow-xl transition-all duration-300 group"
                asChild
              >
                <Link href="/tests/travel-style/test">
                  <span className="text-2xl mr-3 group-hover:animate-bounce">🧳</span>
                  테스트 시작하기
                </Link>
              </Button>

              <p className="text-sm text-center text-muted-foreground">무료 • 회원가입 불필요 • 16가지 여행 유형 분석</p>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="mt-20 space-y-12">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold flex items-center justify-center space-x-2">
                  <Plane className="h-6 w-6 text-cyan-500" />
                  <span>이런 질문들이 나와요!</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-4">
                    <div className="p-4 bg-cyan-50 dark:bg-cyan-950 rounded-lg">
                      <p className="font-medium">🧳 여행 준비를 시작할 때</p>
                      <p className="text-sm text-muted-foreground mt-1">리스트부터 만든다 vs 짐은 전날 감으로 챙긴다</p>
                    </div>
                    <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <p className="font-medium">👕 옷 고를 때</p>
                      <p className="text-sm text-muted-foreground mt-1">날짜별 코디를 미리 정한다 vs 가서 분위기에 맞춘다</p>
                    </div>
                    <div className="p-4 bg-indigo-50 dark:bg-indigo-950 rounded-lg">
                      <p className="font-medium">💊 비상약 챙기기</p>
                      <p className="text-sm text-muted-foreground mt-1">혹시 몰라 다 넣는다 vs 약국은 어디든 있지</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-cyan-50 dark:bg-cyan-950 rounded-lg">
                      <p className="font-medium">✈️ 공항 도착 시간</p>
                      <p className="text-sm text-muted-foreground mt-1">비행 2시간 전 도착 vs 딱 맞춰 가도 됨</p>
                    </div>
                    <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <p className="font-medium">🍽️ 여행지에서의 식사</p>
                      <p className="text-sm text-muted-foreground mt-1">맛집 예약 필수 vs 돌아다니다 끌리는 곳</p>
                    </div>
                    <div className="p-4 bg-indigo-50 dark:bg-indigo-950 rounded-lg">
                      <p className="font-medium">📸 사진 찍을 때</p>
                      <p className="text-sm text-muted-foreground mt-1">배경·구도 완벽하게 vs 순간 감성 우선</p>
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
                <h2 className="text-2xl font-bold">🎭 16가지 여행 유형</h2>
                <p className="text-muted-foreground">당신은 어떤 여행러일까요?</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { emoji: "🎈", name: "즉흥 여행러", type: "ENFP" },
                    { emoji: "🌙", name: "몽상 여행러", type: "INFP" },
                    { emoji: "🤝", name: "계획 리더러", type: "ENFJ" },
                    { emoji: "📖", name: "사색 여행러", type: "INFJ" },
                    { emoji: "🧪", name: "모험 여행러", type: "ENTP" },
                    { emoji: "🔬", name: "탐구 여행러", type: "INTP" },
                    { emoji: "🧱", name: "완벽 준비형", type: "ENTJ" },
                    { emoji: "📐", name: "전략 여행러", type: "INTJ" },
                  ].map((character) => (
                    <div
                      key={character.type}
                      className="p-3 bg-gradient-to-br from-cyan-50 to-indigo-50 dark:from-cyan-950 dark:to-indigo-950 rounded-lg text-center"
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
                  <Sparkles className="h-6 w-6 text-indigo-500" />
                  <span>특별한 기능</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-cyan-100 dark:bg-cyan-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <h3 className="font-semibold">정확한 분석</h3>
                    <p className="text-sm text-muted-foreground">12가지 여행 습관으로 MBTI 4축을 정확하게 분석</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">💡</span>
                    </div>
                    <h3 className="font-semibold">맞춤 추천</h3>
                    <p className="text-sm text-muted-foreground">당신의 유형에 맞는 추천 여행지와 짐싸기 꿀팁</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
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

