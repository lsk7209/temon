import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Smartphone, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "스마트폰 습관 테스트 | 나의 폰 사용 스타일 MBTI | 테몬",
  description:
    "12문항으로 알아보는 나의 스마트폰 성격! 집중형 vs 즉흥형, 대화형 vs 탐구형 📲 스마트폰을 켜는 순간, 당신의 성격이 드러납니다.",
  keywords: "스마트폰 성격 테스트, 폰 습관 MBTI, 스마트폰 사용 성향 테스트, 아이폰, 갤럭시, 노션, 틱톡, 스마트폰 루틴, MBTI, 심리테스트, 무료 테스트",
  alternates: {
    canonical: "/tests/phone-style",
  },
  openGraph: {
    title: "스마트폰 습관 테스트 | 나의 폰 사용 스타일 MBTI",
    description: "12문항으로 알아보는 나의 스마트폰 성격! 집중형 vs 즉흥형, 대화형 vs 탐구형 📲",
    type: "website",
    url: "https://www.temon.kr/tests/phone-style",
  },
}

export default function PhoneStyleIntro() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 dark:from-violet-950 dark:via-purple-950 dark:to-fuchsia-950">
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="text-center space-y-8">
          {/* Animated Phone Elements */}
          <div className="relative mx-auto w-32 h-32 mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-400 to-fuchsia-500 rounded-full animate-pulse" />
            <div className="absolute inset-2 bg-gradient-to-br from-violet-200 to-fuchsia-300 rounded-full flex items-center justify-center">
              <span className="text-4xl animate-bounce">📱</span>
            </div>
            {/* Floating phone elements */}
            <div className="absolute -top-6 -left-6 text-lg animate-bounce" style={{ animationDelay: "0.5s" }}>
              🔔
            </div>
            <div className="absolute -top-4 -right-8 text-lg animate-bounce" style={{ animationDelay: "1s" }}>
              🔋
            </div>
            <div className="absolute -bottom-6 -left-8 text-lg animate-bounce" style={{ animationDelay: "1.5s" }}>
              📸
            </div>
            <div className="absolute -bottom-4 -right-6 text-lg animate-bounce" style={{ animationDelay: "2s" }}>
              💬
            </div>
          </div>

          <div className="space-y-6">
            <Badge variant="secondary" className="bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200">
              📱 NEW 테스트
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
                스마트폰을 켜는 순간,
              </span>
              <br />
              <span className="text-foreground">당신의 성격이 드러난다 📲</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              휴대폰 배터리보다 빠른 당신의 성격 분석!
              <br />
              스마트폰 사용 패턴으로 알아보는 나의 성격 유형 🔋
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
                className="h-16 px-12 text-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 shadow-lg hover:shadow-xl transition-all duration-300 group"
                asChild
              >
                <Link href="/tests/phone-style/test">
                  <span className="text-2xl mr-3 group-hover:animate-bounce">📱</span>
                  테스트 시작하기
                </Link>
              </Button>

              <p className="text-sm text-center text-muted-foreground">무료 • 회원가입 불필요 • 16가지 스마트폰 유형 분석</p>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="mt-20 space-y-12">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold flex items-center justify-center space-x-2">
                  <Smartphone className="h-6 w-6 text-violet-500" />
                  <span>이런 질문들이 나와요!</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-4">
                    <div className="p-4 bg-violet-50 dark:bg-violet-950 rounded-lg">
                      <p className="font-medium">1. 아침에 눈 뜨자마자 하는 일</p>
                      <p className="text-sm text-muted-foreground mt-1">폰 확인부터 vs 스트레칭이나 생각 정리</p>
                    </div>
                    <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                      <p className="font-medium">2. 배터리 10% 남았을 때</p>
                      <p className="text-sm text-muted-foreground mt-1">불안해서 바로 충전 vs 그냥 버틸 때까지 사용</p>
                    </div>
                    <div className="p-4 bg-fuchsia-50 dark:bg-fuchsia-950 rounded-lg">
                      <p className="font-medium">3. SNS 알림이 뜨면</p>
                      <p className="text-sm text-muted-foreground mt-1">바로 확인 vs 나중에 한꺼번에 봄</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-violet-50 dark:bg-violet-950 rounded-lg">
                      <p className="font-medium">4. 사진 정리할 때</p>
                      <p className="text-sm text-muted-foreground mt-1">주기적으로 삭제 vs 쌓여도 그대로 둠</p>
                    </div>
                    <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                      <p className="font-medium">5. 폰 배경화면</p>
                      <p className="text-sm text-muted-foreground mt-1">깔끔·심플 vs 감성·사진형</p>
                    </div>
                    <div className="p-4 bg-fuchsia-50 dark:bg-fuchsia-950 rounded-lg">
                      <p className="font-medium">6. 새로운 앱 설치</p>
                      <p className="text-sm text-muted-foreground mt-1">필요할 때만 vs 재밌어 보여서 시도</p>
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
                <h2 className="text-2xl font-bold">🎭 16가지 스마트폰 유형</h2>
                <p className="text-muted-foreground">당신은 어떤 스마트폰러일까요?</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { emoji: "🎈", name: "즉흥 탐험러", type: "ENFP" },
                    { emoji: "🤝", name: "공감 커뮤니케이터", type: "ENFJ" },
                    { emoji: "🧱", name: "전략 관리자", type: "ENTJ" },
                    { emoji: "🧪", name: "실험 기술러", type: "ENTP" },
                    { emoji: "😊", name: "따뜻한 소통러", type: "ESFJ" },
                    { emoji: "📸", name: "감성 트렌더", type: "ESFP" },
                    { emoji: "📋", name: "실속 관리자", type: "ESTJ" },
                    { emoji: "⚡", name: "속전속결러", type: "ESTP" },
                  ].map((character) => (
                    <div
                      key={character.type}
                      className="p-3 bg-gradient-to-br from-violet-50 to-fuchsia-50 dark:from-violet-950 dark:to-fuchsia-950 rounded-lg text-center"
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
                  <Sparkles className="h-6 w-6 text-fuchsia-500" />
                  <span>특별한 기능</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-violet-100 dark:bg-violet-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <h3 className="font-semibold">정확한 분석</h3>
                    <p className="text-sm text-muted-foreground">12가지 스마트폰 습관으로 MBTI 4축을 정확하게 분석</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">💡</span>
                    </div>
                    <h3 className="font-semibold">맞춤 추천</h3>
                    <p className="text-sm text-muted-foreground">당신의 유형에 맞는 추천 앱과 스마트폰 루틴 팁</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-fuchsia-100 dark:bg-fuchsia-900 rounded-full flex items-center justify-center">
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

