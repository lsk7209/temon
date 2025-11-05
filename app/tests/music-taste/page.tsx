import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Music, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "음악 취향 성격 테스트 | 내 플레이리스트로 보는 MBTI 유형 | 테몬",
  description:
    "12문항으로 알아보는 당신의 음악 습관! 감성형? 분석형? 오늘의 나를 닮은 음악 유형 테스트 🎧 플레이리스트로 보는 성격 분석을 무료로 시작해보세요.",
  keywords: "음악 취향, 음악 성격 테스트, 플레이리스트, MBTI, 음악 테스트, 멜론, 스포티파이, 유튜브뮤직, 심리테스트, 무료 테스트",
  alternates: {
    canonical: "/tests/music-taste",
  },
  openGraph: {
    title: "음악 취향 성격 테스트 | 내 플레이리스트로 보는 MBTI 유형",
    description: "12문항으로 알아보는 당신의 음악 습관! 감성형? 분석형? 오늘의 나를 닮은 음악 유형 테스트 🎧",
    type: "website",
    url: "https://www.temon.kr/tests/music-taste",
  },
}

export default function MusicTasteIntro() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-purple-950 dark:via-pink-950 dark:to-blue-950">
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="text-center space-y-8">
          {/* Animated Music Elements */}
          <div className="relative mx-auto w-32 h-32 mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full animate-pulse" />
            <div className="absolute inset-2 bg-gradient-to-br from-purple-200 to-pink-300 rounded-full flex items-center justify-center">
              <span className="text-4xl animate-bounce">🎧</span>
            </div>
            {/* Floating music elements */}
            <div className="absolute -top-6 -left-6 text-lg animate-bounce" style={{ animationDelay: "0.5s" }}>
              🎵
            </div>
            <div className="absolute -top-4 -right-8 text-lg animate-bounce" style={{ animationDelay: "1s" }}>
              🎶
            </div>
            <div className="absolute -bottom-6 -left-8 text-lg animate-bounce" style={{ animationDelay: "1.5s" }}>
              🎼
            </div>
            <div className="absolute -bottom-4 -right-6 text-lg animate-bounce" style={{ animationDelay: "2s" }}>
              🔊
            </div>
          </div>

          <div className="space-y-6">
            <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
              🎧 NEW 테스트
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                내 플레이리스트 속 성격,
              </span>
              <br />
              <span className="text-foreground">당신은 어떤 음악 타입?</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              당신의 음악 선택 습관으로 성격을 분석합니다.
              <br />
              장르, 재생 타이밍, 감정 몰입까지 총 12문항으로 진단!
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
                className="h-16 px-12 text-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all duration-300 group"
                asChild
              >
                <Link href="/tests/music-taste/test">
                  <span className="text-2xl mr-3 group-hover:animate-bounce">🎵</span>
                  테스트 시작하기
                </Link>
              </Button>

              <p className="text-sm text-center text-muted-foreground">무료 • 회원가입 불필요 • 16가지 음악 유형 분석</p>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="mt-20 space-y-12">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold flex items-center justify-center space-x-2">
                  <Music className="h-6 w-6 text-purple-500" />
                  <span>이런 질문들이 나와요!</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-4">
                    <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                      <p className="font-medium">🎵 새로운 음악을 발견할 때</p>
                      <p className="text-sm text-muted-foreground mt-1">친구 추천을 믿는다 vs 혼자 찾아 듣는다</p>
                    </div>
                    <div className="p-4 bg-pink-50 dark:bg-pink-950 rounded-lg">
                      <p className="font-medium">🎶 음악 재생은 언제?</p>
                      <p className="text-sm text-muted-foreground mt-1">이동 중/출퇴근길 vs 잠들기 전/감정 정리 시간</p>
                    </div>
                    <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <p className="font-medium">🎼 플레이리스트를 정리할 때</p>
                      <p className="text-sm text-muted-foreground mt-1">테마별로 체계적으로 정리 vs 듣고 싶은 대로 즉흥 추가</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                      <p className="font-medium">🎧 노래를 듣는 이유는</p>
                      <p className="text-sm text-muted-foreground mt-1">집중력 향상/작업용 vs 위로/감정 해소</p>
                    </div>
                    <div className="p-4 bg-pink-50 dark:bg-pink-950 rounded-lg">
                      <p className="font-medium">🎤 콘서트 갈 때</p>
                      <p className="text-sm text-muted-foreground mt-1">사람들과 어울리는 게 즐겁다 vs 공연 자체에 몰입한다</p>
                    </div>
                    <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <p className="font-medium">🎹 슬플 때 듣는 노래는</p>
                      <p className="text-sm text-muted-foreground mt-1">분위기를 전환시키는 밝은 곡 vs 감정을 더 깊게 공감하는 곡</p>
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
                <h2 className="text-2xl font-bold">🎭 16가지 음악 유형</h2>
                <p className="text-muted-foreground">당신은 어떤 음악 취향을 가지고 있을까요?</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { emoji: "🎈", name: "감정폭발 플레이리스트러", type: "ENFP" },
                    { emoji: "🌙", name: "감정선 뮤지션", type: "INFP" },
                    { emoji: "🤝", name: "감성공유 DJ", type: "ENFJ" },
                    { emoji: "📖", name: "감정분석 리스너", type: "INFJ" },
                    { emoji: "🧪", name: "실험적 믹서", type: "ENTP" },
                    { emoji: "🔬", name: "사운드 엔지니어", type: "INTP" },
                    { emoji: "🧱", name: "전략적 큐레이터", type: "ENTJ" },
                    { emoji: "📐", name: "플레이리스트 설계자", type: "INTJ" },
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

          {/* Features */}
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
                    <p className="text-sm text-muted-foreground">12가지 음악 습관으로 MBTI 4축을 정확하게 분석</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">💡</span>
                    </div>
                    <h3 className="font-semibold">맞춤 추천</h3>
                    <p className="text-sm text-muted-foreground">당신의 유형에 맞는 추천 플레이리스트와 음악 행동</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
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

