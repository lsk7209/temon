import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Heart, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "연애 상황 반응 테스트 | 연락·갈등·데이트 운영 16유형 | 테몬",
  description:
    "연애 중 연락 속도, 갈등 해결, 데이트 운영, 감정 표현 습관으로 16유형을 분석합니다. 12문항, 3분, 결과 공유 이미지 자동 생성.",
  keywords:
    "연애 테스트, 연애 유형, 연락 성향, 데이트 스타일, 갈등 해결, 성격 유형 테스트, MBTI, 심리테스트, 무료 테스트",
  alternates: {
    canonical: "/tests/love-reaction",
  },
  openGraph: {
    title: "연애 상황 반응 테스트 | 연락·갈등·데이트 운영 16유형",
    description: "연애 중 연락 속도, 갈등 해결, 데이트 운영, 감정 표현 습관으로 16유형을 분석합니다. 12문항, 3분, 결과 공유 이미지 자동 생성.",
    type: "website",
    url: "https://www.temon.kr/tests/love-reaction",
  },
  other: {
    "schema:Quiz": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Quiz",
      name: "연애 상황 반응 테스트",
      description: "연애 습관으로 16유형 분석",
      inLanguage: "ko",
      url: "https://www.temon.kr/tests/love-reaction",
      publisher: { "@type": "Organization", name: "Temon" },
    }),
  },
}

export default function LoveReactionIntro() {
  return (
    <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950">
      <main className="container max-w-[720px] mx-auto px-4 py-8">
        <div className="text-center space-y-8">
          {/* Animated Love Elements */}
          <div className="relative mx-auto w-32 h-32 mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full animate-pulse" />
            <div className="absolute inset-2 bg-gradient-to-br from-pink-200 to-rose-300 rounded-full flex items-center justify-center">
              <span className="text-4xl animate-bounce">💕</span>
            </div>
            {/* Floating love elements */}
            <div className="absolute -top-6 -left-6 text-lg animate-bounce" style={{ animationDelay: "0.5s" }}>
              💌
            </div>
            <div className="absolute -top-4 -right-8 text-lg animate-bounce" style={{ animationDelay: "1s" }}>
              🌹
            </div>
            <div className="absolute -bottom-6 -left-8 text-lg animate-bounce" style={{ animationDelay: "1.5s" }}>
              💑
            </div>
            <div className="absolute -bottom-4 -right-6 text-lg animate-bounce" style={{ animationDelay: "2s" }}>
              ✨
            </div>
          </div>

          <div className="space-y-6">
            <Badge variant="secondary" className="bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200">
              💕 NEW 테스트
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                연애 상황 반응으로 보는
              </span>
              <br />
              <span className="text-foreground">나의 유형 💕</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              연락 습관, 갈등 해결, 데이트 운영, 감정 표현을 기준으로 16유형 분석. 12문항, 약 3분 소요.
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
                className="h-16 px-12 text-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link href="/tests/love-reaction/test">
                  <span className="text-2xl mr-3">💕</span>
                  테스트 시작하기
                </Link>
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                무료 • 회원가입 불필요 • 16가지 연애 유형 분석 • 결과 공유 이미지 자동 생성
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
                  <Heart className="h-6 w-6 text-pink-500" />
                  <span>이런 질문들이 나와요!</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-4">
                    <div className="p-4 bg-pink-50 dark:bg-pink-950 rounded-lg">
                      <p className="font-medium">1. 썸이 시작됐을 때 연락은?</p>
                      <p className="text-sm text-muted-foreground mt-1">먼저 톡하고 리드한다 vs 상대 기류를 보며 기다린다</p>
                    </div>
                    <div className="p-4 bg-rose-50 dark:bg-rose-950 rounded-lg">
                      <p className="font-medium">2. 첫 데이트 장소를 고를 때?</p>
                      <p className="text-sm text-muted-foreground mt-1">후기·동선·가격을 비교해 예약 vs 분위기·감으로 즉석 결정</p>
                    </div>
                    <div className="p-4 bg-pink-50 dark:bg-pink-950 rounded-lg">
                      <p className="font-medium">3. 대화의 톤은?</p>
                      <p className="text-sm text-muted-foreground mt-1">직설적이고 핵심 위주 vs 공감하며 감정 위주</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-rose-50 dark:bg-rose-950 rounded-lg">
                      <p className="font-medium">4. 답장 속도가 늦어지면?</p>
                      <p className="text-sm text-muted-foreground mt-1">이유를 묻고 기준을 합의 vs 상대 상황을 배려하며 기다림</p>
                    </div>
                    <div className="p-4 bg-pink-50 dark:bg-pink-950 rounded-lg">
                      <p className="font-medium">5. 기념일은?</p>
                      <p className="text-sm text-muted-foreground mt-1">캘린더로 챙기며 미리 준비 vs 그날의 기분에 맞춰 유연하게</p>
                    </div>
                    <div className="p-4 bg-rose-50 dark:bg-rose-950 rounded-lg">
                      <p className="font-medium">6. 갈등이 생기면?</p>
                      <p className="text-sm text-muted-foreground mt-1">사실·원인·해결책 순서로 정리 vs 마음 먼저 다독이고 대화</p>
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
                <h2 className="text-2xl font-bold">💕 16가지 연애 유형</h2>
                <p className="text-muted-foreground">당신은 어떤 연애 스타일일까요?</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { emoji: "⚡", name: "분위기 메이커형", type: "ENFP" },
                    { emoji: "🌙", name: "서정 공감형", type: "INFP" },
                    { emoji: "🤝", name: "큐레이션 리더형", type: "ENFJ" },
                    { emoji: "📖", name: "의미 탐구형", type: "INFJ" },
                    { emoji: "💡", name: "아이디어 스파크형", type: "ENTP" },
                    { emoji: "🔬", name: "논리 탐색형", type: "INTP" },
                    { emoji: "🎯", name: "결정 추진형", type: "ENTJ" },
                    { emoji: "📐", name: "전략 설계형", type: "INTJ" },
                  ].map((character) => (
                    <div
                      key={character.type}
                      className="p-3 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950 dark:to-rose-950 rounded-lg text-center"
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
                  <Sparkles className="h-6 w-6 text-rose-500" />
                  <span>특별한 기능</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <h3 className="font-semibold">정확한 분석</h3>
                    <p className="text-sm text-muted-foreground">12문항으로 연애 습관을 4축으로 정량화해 유형화</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-rose-100 dark:bg-rose-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">💡</span>
                    </div>
                    <h3 className="font-semibold">맞춤 팁</h3>
                    <p className="text-sm text-muted-foreground">당신의 유형에 맞는 데이트 추천, 관계 팁 제공</p>
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

