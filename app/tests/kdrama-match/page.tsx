import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Clapperboard, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "K-드라마 인물 매칭 테스트 | 상황 선택으로 보는 16가지 캐릭터 유형 | 테몬",
  description:
    "드라마 속 선택을 바탕으로 16가지 캐릭터 유형을 매칭합니다. 12문항, 3분, 결과 공유 이미지 자동 생성.",
  keywords:
    "K드라마 테스트, 캐릭터 유형, 드라마 성향, 성격 테스트, 드라마 인물 MBTI, MBTI, 심리테스트, 무료 테스트",
  alternates: {
    canonical: "/tests/kdrama-match",
  },
  openGraph: {
    title: "K-드라마 인물 매칭 테스트 | 상황 선택으로 보는 16가지 캐릭터 유형",
    description: "드라마 속 선택을 바탕으로 16가지 캐릭터 유형을 매칭합니다. 12문항, 3분, 결과 공유 이미지 자동 생성.",
    type: "website",
    url: "https://www.temon.kr/tests/kdrama-match",
  },
  other: {
    "schema:Quiz": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Quiz",
      name: "K-드라마 인물 매칭 테스트",
      description: "드라마 속 상황 선택으로 16가지 캐릭터 유형을 매칭합니다.",
      inLanguage: "ko",
      url: "https://www.temon.kr/tests/kdrama-match",
      publisher: { "@type": "Organization", name: "Temon" },
    }),
  },
}

export default function KdramaMatchIntro() {
  return (
    <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950">
      <main className="container max-w-[720px] mx-auto px-4 py-8">
        <div className="text-center space-y-8">
          {/* Animated Drama Elements */}
          <div className="relative mx-auto w-32 h-32 mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full animate-pulse" />
            <div className="absolute inset-2 bg-gradient-to-br from-pink-200 to-purple-300 rounded-full flex items-center justify-center">
              <span className="text-4xl animate-bounce">🎬</span>
            </div>
            {/* Floating drama elements */}
            <div className="absolute -top-6 -left-6 text-lg animate-bounce" style={{ animationDelay: "0.5s" }}>
              🎭
            </div>
            <div className="absolute -top-4 -right-8 text-lg animate-bounce" style={{ animationDelay: "1s" }}>
              📺
            </div>
            <div className="absolute -bottom-6 -left-8 text-lg animate-bounce" style={{ animationDelay: "1.5s" }}>
              ✨
            </div>
            <div className="absolute -bottom-4 -right-6 text-lg animate-bounce" style={{ animationDelay: "2s" }}>
              💫
            </div>
          </div>

          <div className="space-y-6">
            <Badge variant="secondary" className="bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200">
              🎬 NEW 테스트
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                K-드라마 인물 매칭 테스트
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              드라마 속 상황 선택으로 당신과 닮은 캐릭터 유형을 매칭합니다. 12문항, 약 3분 소요.
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
                className="h-16 px-12 text-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link href="/tests/kdrama-match/test">
                  <span className="text-2xl mr-3">🎬</span>
                  테스트 시작하기
                </Link>
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                무료 • 회원가입 불필요 • 16가지 캐릭터 유형 분석 • 결과 공유 이미지 자동 생성
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
                  <Clapperboard className="h-6 w-6 text-pink-500" />
                  <span>이런 질문들이 나와요!</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-4">
                    <div className="p-4 bg-pink-50 dark:bg-pink-950 rounded-lg">
                      <p className="font-medium">1. 첫 회에서 주인공이 갑자기 문제에 휘말렸다. 당신의 선택은?</p>
                      <p className="text-sm text-muted-foreground mt-1">사람들을 모아 같이 해결한다 vs 조용히 상황을 파악하고 움직인다</p>
                    </div>
                    <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                      <p className="font-medium">2. 단서가 모호할 때 당신의 접근은?</p>
                      <p className="text-sm text-muted-foreground mt-1">보이는 사실부터 차근차근 확인 vs 가능한 시나리오를 가설로 세움</p>
                    </div>
                    <div className="p-4 bg-pink-50 dark:bg-pink-950 rounded-lg">
                      <p className="font-medium">3. 팀 내 갈등이 생겼다. 어떻게 중재할까?</p>
                      <p className="text-sm text-muted-foreground mt-1">원칙과 기준으로 정리 vs 감정과 관계를 먼저 다독임</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                      <p className="font-medium">4. 반전이 이어지는 전개에서 당신은?</p>
                      <p className="text-sm text-muted-foreground mt-1">계획을 재정비하고 체크리스트를 만든다 vs 상황에 맞춰 유연하게 대응</p>
                    </div>
                    <div className="p-4 bg-pink-50 dark:bg-pink-950 rounded-lg">
                      <p className="font-medium">5. 첫 만남에서의 대사 톤은?</p>
                      <p className="text-sm text-muted-foreground mt-1">직설적이고 핵심만 전달 vs 상대가 편한 분위기를 만든다</p>
                    </div>
                    <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                      <p className="font-medium">6. 힌트를 찾으러 장소를 고른다면?</p>
                      <p className="text-sm text-muted-foreground mt-1">실제 사건 현장, 기록 보관소 vs 상징적인 장소, 의미 있는 연결고리</p>
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
                <h2 className="text-2xl font-bold">🎬 16가지 캐릭터 유형</h2>
                <p className="text-muted-foreground">당신은 어떤 드라마 캐릭터일까요?</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { emoji: "⚡", name: "즉흥 로맨티스트", type: "ENFP" },
                    { emoji: "🌙", name: "내면 서사형", type: "INFP" },
                    { emoji: "🤝", name: "관계 조율자", type: "ENFJ" },
                    { emoji: "📖", name: "운명 설계자", type: "INFJ" },
                    { emoji: "💡", name: "설정 파괴자", type: "ENTP" },
                    { emoji: "🔬", name: "논리 탐정", type: "INTP" },
                    { emoji: "🎯", name: "전략 프로듀서", type: "ENTJ" },
                    { emoji: "📐", name: "마스터 플래너", type: "INTJ" },
                  ].map((character) => (
                    <div
                      key={character.type}
                      className="p-3 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-950 dark:to-purple-950 rounded-lg text-center"
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
                  <Sparkles className="h-6 w-6 text-purple-500" />
                  <span>특별한 기능</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <h3 className="font-semibold">정확한 매칭</h3>
                    <p className="text-sm text-muted-foreground">12문항으로 드라마 속 선택을 4축으로 정량화해 유형화</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">💡</span>
                    </div>
                    <h3 className="font-semibold">캐릭터 분석</h3>
                    <p className="text-sm text-muted-foreground">당신의 유형에 맞는 대표 장면, 케미 파트너, 전략 팁 제공</p>
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

