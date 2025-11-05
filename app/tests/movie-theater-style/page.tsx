import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Film, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "영화관 관람 스타일 테스트 - 무료 성격 테스트 | 테몬",
  description:
    "영화관 관람 스타일 테스트로 알아보는 나의 관람 성향! 예매, 좌석, 팝콘, 엔딩크레딧까지—당신의 영화관 루틴으로 보는 관람 성향 테스트를 무료로 시작해보세요.",
  keywords: "영화관, 관람 스타일, 영화관 테스트, 성격 테스트, MBTI, 심리테스트, 무료 테스트",
  alternates: {
    canonical: "/tests/movie-theater-style",
  },
  openGraph: {
    title: "영화관 관람 스타일 테스트 - 무료 성격 테스트",
    description: "영화관 관람 스타일 테스트로 알아보는 나의 관람 성향! 예매, 좌석, 팝콘, 엔딩크레딧까지—당신의 영화관 루틴으로 보는 관람 성향 테스트를 무료로 시작해보세요.",
    type: "website",
    url: "https://www.temon.kr/tests/movie-theater-style",
  },
}

export default function MovieTheaterStyleIntro() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950 dark:via-purple-950 dark:to-pink-950">
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="text-center space-y-8">
          {/* Animated Movie Elements */}
          <div className="relative mx-auto w-32 h-32 mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full animate-pulse" />
            <div className="absolute inset-2 bg-gradient-to-br from-indigo-200 to-purple-300 rounded-full flex items-center justify-center">
              <span className="text-4xl animate-bounce">🎬</span>
            </div>
            {/* Floating movie elements */}
            <div className="absolute -top-6 -left-6 text-lg animate-bounce" style={{ animationDelay: "0.5s" }}>
              🎟️
            </div>
            <div className="absolute -top-4 -right-8 text-lg animate-bounce" style={{ animationDelay: "1s" }}>
              🍿
            </div>
            <div className="absolute -bottom-6 -left-8 text-lg animate-bounce" style={{ animationDelay: "1.5s" }}>
              🎥
            </div>
            <div className="absolute -bottom-4 -right-6 text-lg animate-bounce" style={{ animationDelay: "2s" }}>
              🎭
            </div>
          </div>

          <div className="space-y-6">
            <Badge variant="secondary" className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
              🎬 NEW 테스트
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                영화관에서도
              </span>
              <br />
              <span className="text-foreground">성격이 보인다고? 🎬</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              예매, 좌석, 팝콘, 엔딩크레딧까지—당신의 영화관 루틴으로 보는 관람 성향 테스트
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
                className="h-16 px-12 text-xl bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 shadow-lg hover:shadow-xl transition-all duration-300 group"
                asChild
              >
                <Link href="/tests/movie-theater-style/test">
                  <span className="text-2xl mr-3 group-hover:animate-bounce">🎟️</span>
                  테스트 시작하기
                </Link>
              </Button>

              <p className="text-sm text-center text-muted-foreground">무료 • 회원가입 불필요 • 16가지 관람 유형 분석</p>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="mt-20 space-y-12">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold flex items-center justify-center space-x-2">
                  <Film className="h-6 w-6 text-indigo-500" />
                  <span>이런 질문들이 나와요!</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-4">
                    <div className="p-4 bg-indigo-50 dark:bg-indigo-950 rounded-lg">
                      <p className="font-medium">🎫 예매할 때 선호는?</p>
                      <p className="text-sm text-muted-foreground mt-1">개봉 전 미리 예매 vs 당일/즉흥 예매</p>
                    </div>
                    <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                      <p className="font-medium">🪑 좌석을 고를 때?</p>
                      <p className="text-sm text-muted-foreground mt-1">가운데·황금좌석 규칙대로 vs 화면/사운드 감으로 선택</p>
                    </div>
                    <div className="p-4 bg-pink-50 dark:bg-pink-950 rounded-lg">
                      <p className="font-medium">🍿 팝콘 사이즈 논쟁!</p>
                      <p className="text-sm text-muted-foreground mt-1">데이터: 가성비 계산 후 결정 vs 취향: 맛/기분이 먼저</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-indigo-50 dark:bg-indigo-950 rounded-lg">
                      <p className="font-medium">🎬 트레일러(예고편) 시간은?</p>
                      <p className="text-sm text-muted-foreground mt-1">제시간 맞춰 예고편 포함 vs 시작 직전에 들어감</p>
                    </div>
                    <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                      <p className="font-medium">📽️ 신작 선택 기준은?</p>
                      <p className="text-sm text-muted-foreground mt-1">평점/리뷰/수상 여부 vs 감독·장르 실험/신선함</p>
                    </div>
                    <div className="p-4 bg-pink-50 dark:bg-pink-950 rounded-lg">
                      <p className="font-medium">🎞️ 엔딩크레딧은?</p>
                      <p className="text-sm text-muted-foreground mt-1">쿠키·크레딧 확인 후 퇴장 vs 분위기 따라 바로 나감</p>
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
                <h2 className="text-2xl font-bold">🎭 16가지 관람 유형</h2>
                <p className="text-muted-foreground">당신은 어떤 관람 스타일일까요?</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { emoji: "🎈", name: "감정폭주 러", type: "ENFP" },
                    { emoji: "🌙", name: "서정 몰입러", type: "INFP" },
                    { emoji: "🤝", name: "무드 메이커", type: "ENFJ" },
                    { emoji: "📖", name: "의미 수집가", type: "INFJ" },
                    { emoji: "🧪", name: "실험 상영러", type: "ENTP" },
                    { emoji: "🔬", name: "분석 관람러", type: "INTP" },
                    { emoji: "🧱", name: "프로젝트 매니저", type: "ENTJ" },
                    { emoji: "📐", name: "최적화 설계자", type: "INTJ" },
                  ].map((character) => (
                    <div
                      key={character.type}
                      className="p-3 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 rounded-lg text-center"
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
                  <Sparkles className="h-6 w-6 text-purple-500" />
                  <span>특별한 기능</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <h3 className="font-semibold">정확한 분석</h3>
                    <p className="text-sm text-muted-foreground">12가지 관람 습관으로 MBTI 4축을 정확하게 분석</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">💡</span>
                    </div>
                    <h3 className="font-semibold">맞춤 추천</h3>
                    <p className="text-sm text-muted-foreground">당신의 유형에 맞는 좌석, 상영 포맷, 시간대 추천</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center">
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

