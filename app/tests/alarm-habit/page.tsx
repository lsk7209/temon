import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Users, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "알람 습관 MBTI 테스트 - 무료 성격 테스트 | 테몬",
  description:
    "알람 습관 MBTI 테스트로 알아보는 나의 성격! 스누즈파 vs 칼기상파, 당신은 어떤 타입일까요? 재미있는 알람 습관 테스트를 무료로 시작해보세요.",
  keywords: "알람 습관, 기상 패턴, 성격 테스트, MBTI, 알람 테스트, 심리테스트, 무료 테스트",
  alternates: {
    canonical: "/tests/alarm-habit",
  },
  openGraph: {
    title: "알람 습관 MBTI 테스트 - 무료 성격 테스트",
    description: "알람 습관 MBTI 테스트로 알아보는 나의 성격! 스누즈파 vs 칼기상파, 당신은 어떤 타입일까요?",
    type: "website",
    url: "https://www.temon.kr/tests/alarm-habit",
  },
}

export default function AlarmHabitIntro() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 dark:from-blue-950 dark:via-purple-950 dark:to-indigo-950">
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="text-center space-y-8">
          {/* Animated Alarm Clock */}
          <div className="relative mx-auto w-32 h-32 mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full animate-pulse" />
            <div className="absolute inset-2 bg-gradient-to-br from-blue-200 to-purple-300 rounded-full flex items-center justify-center">
              <span className="text-4xl animate-bounce">⏰</span>
            </div>
            {/* Floating alarm elements */}
            <div className="absolute -top-6 -left-6 text-lg animate-bounce" style={{ animationDelay: "0.5s" }}>
              🔔
            </div>
            <div className="absolute -top-4 -right-8 text-lg animate-bounce" style={{ animationDelay: "1s" }}>
              😴
            </div>
            <div className="absolute -bottom-6 -left-8 text-lg animate-bounce" style={{ animationDelay: "1.5s" }}>
              ☀️
            </div>
            <div className="absolute -bottom-4 -right-6 text-lg animate-bounce" style={{ animationDelay: "2s" }}>
              🌙
            </div>
          </div>

          <div className="space-y-6">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              ⏰ 기상 패턴 분석
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                알람 습관에도
              </span>
              <br />
              <span className="text-foreground">MBTI가 있다면?</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              스누즈파부터 칼기상파까지, 1분 만에 내 기상 DNA 확인하기
            </p>

            {/* Stats */}
            <div className="flex justify-center items-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>8,947명 참여</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>1분 소요</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>8문항</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="space-y-4">
              <Button
                size="lg"
                className="h-16 px-12 text-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link href="/tests/alarm-habit/test">
                  <span className="text-2xl mr-3">⏰</span>
                  테스트 시작하기
                </Link>
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                무료 • 회원가입 불필요 • 16가지 기상 캐릭터로 분석
              </p>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="mt-20 space-y-12">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold flex items-center justify-center space-x-2">
                  <Clock className="h-6 w-6 text-blue-500" />
                  <span>이런 질문들이 나와요!</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <p className="font-medium">⏰ 알람이 울리면 가장 먼저?</p>
                      <p className="text-sm text-muted-foreground mt-1">바로 일어남 vs 스누즈 버튼 연타</p>
                    </div>
                    <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                      <p className="font-medium">🌅 이상적인 기상 시간은?</p>
                      <p className="text-sm text-muted-foreground mt-1">새벽 5시 vs 오전 10시</p>
                    </div>
                    <div className="p-4 bg-indigo-50 dark:bg-indigo-950 rounded-lg">
                      <p className="font-medium">📱 알람 소리 설정은?</p>
                      <p className="text-sm text-muted-foreground mt-1">잔잔한 멜로디 vs 시끄러운 벨소리</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <p className="font-medium">🛏️ 잠자리에서 일어나는 방식</p>
                      <p className="text-sm text-muted-foreground mt-1">단숨에 벌떡 vs 서서히 몸을 깨움</p>
                    </div>
                    <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                      <p className="font-medium">☕ 기상 후 첫 번째 행동</p>
                      <p className="text-sm text-muted-foreground mt-1">물 마시기 vs 핸드폰 확인</p>
                    </div>
                    <div className="p-4 bg-indigo-50 dark:bg-indigo-950 rounded-lg">
                      <p className="font-medium">🌙 잠들기 전 준비</p>
                      <p className="text-sm text-muted-foreground mt-1">알람 여러 개 설정 vs 하나만 설정</p>
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
                <h2 className="text-2xl font-bold">🎭 16가지 기상 캐릭터</h2>
                <p className="text-muted-foreground">당신은 어떤 기상 스타일일까요?</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { emoji: "🌅", name: "새벽 러너", type: "ENFP" },
                    { emoji: "😴", name: "꿈속 여행자", type: "INFP" },
                    { emoji: "⏰", name: "시간 관리자", type: "ENFJ" },
                    { emoji: "🧘", name: "명상 기상러", type: "INFJ" },
                    { emoji: "📱", name: "알람 해커", type: "ENTP" },
                    { emoji: "🎵", name: "멜로디 기상러", type: "INTP" },
                    { emoji: "💪", name: "칼기상 전사", type: "ENTJ" },
                    { emoji: "🌙", name: "야행성 인간", type: "INTJ" },
                  ].map((character) => (
                    <div
                      key={character.type}
                      className="p-3 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg text-center"
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
                    <div className="w-12 h-12 mx-auto bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <h3 className="font-semibold">정확한 분석</h3>
                    <p className="text-sm text-muted-foreground">8가지 기상 습관으로 MBTI 4축을 정확하게 분석</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">💡</span>
                    </div>
                    <h3 className="font-semibold">맞춤 기상법</h3>
                    <p className="text-sm text-muted-foreground">당신의 유형에 맞는 효과적인 기상 방법 제안</p>
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
