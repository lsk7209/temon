import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Play, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "유튜브 시청 습관 테스트 | 추천·배속·플리 관리로 보는 16유형 | 테몬",
  description:
    "유튜브 시청 습관으로 16유형 성향을 분석합니다. 12문항, 3분, 결과 공유 이미지 자동 생성.",
  keywords:
    "유튜브 테스트, 시청 습관, 유튜브 유형, 영상 배속, 플레이리스트, 유튜브 MBTI, 심리테스트, 무료 테스트",
  alternates: {
    canonical: "/tests/youtube-habit",
  },
  openGraph: {
    title: "유튜브 시청 습관 테스트 | 추천·배속·플리 관리로 보는 16유형",
    description: "유튜브 시청 습관으로 16유형 성향을 분석합니다. 12문항, 3분, 결과 공유 이미지 자동 생성.",
    type: "website",
    url: "https://www.temon.kr/tests/youtube-habit",
  },
}

export default function YoutubeHabitIntro() {
  return (
    <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950">
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="text-center space-y-8">
          {/* Animated YouTube Elements */}
          <div className="relative mx-auto w-32 h-32 mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-red-600 rounded-full animate-pulse" />
            <div className="absolute inset-2 bg-gradient-to-br from-red-200 to-red-400 rounded-full flex items-center justify-center">
              <span className="text-4xl animate-bounce">▶️</span>
            </div>
            {/* Floating YouTube elements */}
            <div className="absolute -top-6 -left-6 text-lg animate-bounce" style={{ animationDelay: "0.5s" }}>
              📺
            </div>
            <div className="absolute -top-4 -right-8 text-lg animate-bounce" style={{ animationDelay: "1s" }}>
              🎬
            </div>
            <div className="absolute -bottom-6 -left-8 text-lg animate-bounce" style={{ animationDelay: "1.5s" }}>
              📱
            </div>
            <div className="absolute -bottom-4 -right-6 text-lg animate-bounce" style={{ animationDelay: "2s" }}>
              ⏯️
            </div>
          </div>

          <div className="space-y-6">
            <Badge variant="secondary" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
              ▶️ NEW 테스트
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                유튜브 시청 습관으로 보는
              </span>
              <br />
              <span className="text-foreground">나의 유형 ▶️</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              추천 알고리즘 신뢰도, 재생 속도, 플레이리스트 관리 습관을 기준으로 16유형 분석. 12문항, 약 3분 소요.
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
                className="h-16 px-12 text-xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link href="/tests/youtube-habit/test">
                  <span className="text-2xl mr-3">▶️</span>
                  테스트 시작하기
                </Link>
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                무료 • 회원가입 불필요 • 16가지 시청 스타일 분석
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
                  <Play className="h-6 w-6 text-red-500" />
                  <span>이런 질문들이 나와요!</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-4">
                    <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg">
                      <p className="font-medium">1. 홈 화면에 떴다. 첫 행동은?</p>
                      <p className="text-sm text-muted-foreground mt-1">검색으로 정확히 찾는다 vs 눈에 띄는 것부터 눌러본다</p>
                    </div>
                    <div className="p-4 bg-red-100 dark:bg-red-900 rounded-lg">
                      <p className="font-medium">2. 구독 채널 관리는?</p>
                      <p className="text-sm text-muted-foreground mt-1">폴더·알림 설정까지 체계 관리 vs 대충 보다가 정리하려고 생각만 함</p>
                    </div>
                    <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg">
                      <p className="font-medium">3. 시청 중 댓글은?</p>
                      <p className="text-sm text-muted-foreground mt-1">정보·타임스탬프 위주로 확인 vs 공감 댓글에 반응·대화 참여</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-red-100 dark:bg-red-900 rounded-lg">
                      <p className="font-medium">4. 영상 길이 선호는?</p>
                      <p className="text-sm text-muted-foreground mt-1">10분 내외 핵심 요약 vs 길어도 깊게 보는 편</p>
                    </div>
                    <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg">
                      <p className="font-medium">5. 재생 속도 습관은?</p>
                      <p className="text-sm text-muted-foreground mt-1">1.25~2배로 효율 시청 vs 기분 따라 속도 조절</p>
                    </div>
                    <div className="p-4 bg-red-100 dark:bg-red-900 rounded-lg">
                      <p className="font-medium">6. 추천 알고리즘을 믿는 편인가?</p>
                      <p className="text-sm text-muted-foreground mt-1">데이터가 나를 잘 안다 vs 결국 내가 선별해야 한다</p>
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
                <h2 className="text-2xl font-bold">▶️ 16가지 시청 스타일</h2>
                <p className="text-muted-foreground">당신은 어떤 유튜버 시청자일까요?</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { emoji: "💡", name: "영감 확산형", type: "ENFP" },
                    { emoji: "🌙", name: "몰입 감상형", type: "INFP" },
                    { emoji: "🤝", name: "큐레이션 리더형", type: "ENFJ" },
                    { emoji: "📖", name: "의미 선별형", type: "INFJ" },
                    { emoji: "💬", name: "실험 토론형", type: "ENTP" },
                    { emoji: "🔬", name: "지식 최적화형", type: "INTP" },
                    { emoji: "🎯", name: "목표 지향형", type: "ENTJ" },
                    { emoji: "📐", name: "전략 큐레이터형", type: "INTJ" },
                  ].map((character) => (
                    <div
                      key={character.type}
                      className="p-3 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 rounded-lg text-center"
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
                  <Sparkles className="h-6 w-6 text-red-500" />
                  <span>특별한 기능</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <h3 className="font-semibold">정확한 분석</h3>
                    <p className="text-sm text-muted-foreground">12문항으로 시청 습관을 4축으로 정량화해 유형화</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">💡</span>
                    </div>
                    <h3 className="font-semibold">맞춤 팁</h3>
                    <p className="text-sm text-muted-foreground">당신의 유형에 맞는 시청 스타일, 채널 추천 제공</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
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

