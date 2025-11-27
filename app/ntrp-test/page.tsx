import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Trophy, Users, Clock, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "NTRP 테스트 - 정확한 테니스 실력 레벨 측정 | 테몬",
  description:
    "NTRP 테스트로 당신의 테니스 실력을 정확하게 측정해보세요! NTRP 공식 기준으로 1.0부터 7.0까지 정확한 레벨을 알아보는 테스트입니다.",
  keywords: "NTRP, 테니스 실력, 테니스 레벨, 테니스 테스트, 스포츠 테스트",
  alternates: {
    canonical: "/ntrp-test",
  },
  openGraph: {
    title: "NTRP 테스트 - 정확한 테니스 실력 레벨 측정",
    description: "당신의 테니스 실력을 정확하게 측정해보세요! NTRP 공식 기준으로 정확한 레벨을 알아보는 테스트입니다.",
    type: "website",
    url: "https://www.temon.kr/ntrp-test",
  },
}

export default function NTRPTestIntro() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950 dark:via-emerald-950 dark:to-teal-950">
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="text-center space-y-8">
          {/* Animated Tennis Elements */}
          <div className="relative mx-auto w-32 h-32 mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full animate-pulse" />
            <div className="absolute inset-2 bg-gradient-to-br from-green-200 to-emerald-300 rounded-full flex items-center justify-center">
              <span className="text-4xl animate-bounce">🎾</span>
            </div>
            {/* Floating tennis elements */}
            <div className="absolute -top-6 -left-6 text-lg animate-bounce" style={{ animationDelay: "0.5s" }}>
              🏆
            </div>
            <div className="absolute -top-4 -right-8 text-lg animate-bounce" style={{ animationDelay: "1s" }}>
              🎯
            </div>
            <div className="absolute -bottom-6 -left-8 text-lg animate-bounce" style={{ animationDelay: "1.5s" }}>
              💪
            </div>
            <div className="absolute -bottom-4 -right-6 text-lg animate-bounce" style={{ animationDelay: "2s" }}>
              ⚡
            </div>
          </div>

          <div className="space-y-6">
            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              🎾 테니스 실력 측정
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                NTRP 테스트
              </span>
              <br />
              <span className="text-foreground">정확한 실력 측정</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              NTRP 공식 기준으로 측정하는 정확한 테니스 레벨 테스트
            </p>

            {/* Stats */}
            <div className="flex justify-center items-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>12,547명 참여</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>3분 소요</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>15문항</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="space-y-4">
              <Button
                size="lg"
                className="h-16 px-12 text-xl bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link href="/ntrp-test/test">
                  <span className="text-2xl mr-3">🎾</span>
                  테스트 시작하기
                </Link>
              </Button>

              <p className="text-sm text-center text-muted-foreground">무료 • 회원가입 불필요 • NTRP 공식 기준 적용</p>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="mt-20 space-y-12">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold flex items-center justify-center space-x-2">
                  <Trophy className="h-6 w-6 text-green-500" />
                  <span>이런 질문들이 나와요!</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                      <p className="font-medium">🎾 포핸드 스트로크 정확도</p>
                      <p className="text-sm text-muted-foreground mt-1">10번 중 몇 번 코트 안에 들어가나요?</p>
                    </div>
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-950 rounded-lg">
                      <p className="font-medium">🎯 서브 성공률</p>
                      <p className="text-sm text-muted-foreground mt-1">첫 서브와 세컨드 서브 성공률은?</p>
                    </div>
                    <div className="p-4 bg-teal-50 dark:bg-teal-950 rounded-lg">
                      <p className="font-medium">⚡ 발리 능력</p>
                      <p className="text-sm text-muted-foreground mt-1">네트 플레이 시 발리 성공률은?</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                      <p className="font-medium">🏃 코트 커버리지</p>
                      <p className="text-sm text-muted-foreground mt-1">코트 전체를 얼마나 잘 커버하나요?</p>
                    </div>
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-950 rounded-lg">
                      <p className="font-medium">🧠 전략적 사고</p>
                      <p className="text-sm text-muted-foreground mt-1">게임 상황에 따른 전략 수립 능력은?</p>
                    </div>
                    <div className="p-4 bg-teal-50 dark:bg-teal-950 rounded-lg">
                      <p className="font-medium">💪 체력과 지구력</p>
                      <p className="text-sm text-muted-foreground mt-1">긴 랠리에서도 일정한 플레이 유지?</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Level Preview */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold">🏆 NTRP 레벨 시스템</h2>
                <p className="text-muted-foreground">당신은 어떤 레벨일까요?</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { level: "1.0-2.0", name: "초급자", desc: "기본 스트로크 연습 중", emoji: "🌱" },
                    { level: "2.5-3.0", name: "초중급자", desc: "랠리 가능, 전략 학습", emoji: "🎯" },
                    { level: "3.5-4.0", name: "중급자", desc: "안정적 플레이, 다양한 샷", emoji: "⚡" },
                    { level: "4.5-5.0", name: "중상급자", desc: "전략적 플레이, 강한 샷", emoji: "🔥" },
                    { level: "5.5-6.0", name: "상급자", desc: "토너먼트 수준", emoji: "🏆" },
                    { level: "6.5-7.0", name: "전문가", desc: "프로 수준", emoji: "👑" },
                  ].map((level, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-lg text-center"
                    >
                      <div className="text-2xl mb-2">{level.emoji}</div>
                      <div className="font-semibold text-sm">{level.level}</div>
                      <div className="text-xs font-medium">{level.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">{level.desc}</div>
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
                  <Sparkles className="h-6 w-6 text-emerald-500" />
                  <span>특별한 기능</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <h3 className="font-semibold">정확한 측정</h3>
                    <p className="text-sm text-muted-foreground">NTRP 공식 기준을 적용한 정확한 실력 측정</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">💡</span>
                    </div>
                    <h3 className="font-semibold">맞춤 조언</h3>
                    <p className="text-sm text-muted-foreground">레벨에 맞는 훈련 방법과 개선점 제안</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🔗</span>
                    </div>
                    <h3 className="font-semibold">쉬운 공유</h3>
                    <p className="text-sm text-muted-foreground">결과를 테니스 파트너들과 쉽게 공유</p>
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
