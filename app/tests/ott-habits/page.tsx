import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Play, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "OTT 시청 습관 테스트 | 정주행·추천 활용·스포 대처 16유형 | 테몬",
  description:
    "OTT 정주행 방식, 추천 활용, 스포일러 대처, 감상 기록 습관으로 16유형을 분석합니다. 12문항, 3분, 결과 공유 이미지 자동 생성.",
  keywords:
    "OTT 테스트, 시청 습관, 정주행, 추천 알고리즘, 스포일러, 성격 테스트, MBTI, 심리테스트, 무료 테스트",
  alternates: {
    canonical: "/tests/ott-habits",
  },
  openGraph: {
    title: "OTT 시청 습관 테스트 | 정주행·추천 활용·스포 대처 16유형",
    description: "OTT 정주행 방식, 추천 활용, 스포일러 대처, 감상 기록 습관으로 16유형을 분석합니다. 12문항, 3분, 결과 공유 이미지 자동 생성.",
    type: "website",
    url: "https://www.temon.kr/tests/ott-habits",
  },
  other: {
    "schema:Quiz": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Quiz",
      name: "OTT 시청 습관 테스트",
      description: "OTT 시청 습관으로 16유형 분석",
      inLanguage: "ko",
      url: "https://www.temon.kr/tests/ott-habits",
      publisher: { "@type": "Organization", name: "Temon" },
    }),
  },
}

export default function OTTHabitsIntro() {
  return (
    <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950">
      <main className="container max-w-[720px] mx-auto px-4 py-8">
        <div className="text-center space-y-8">
          {/* Animated OTT Elements */}
          <div className="relative mx-auto w-32 h-32 mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full animate-pulse" />
            <div className="absolute inset-2 bg-gradient-to-br from-purple-200 to-indigo-300 rounded-full flex items-center justify-center">
              <span className="text-4xl animate-bounce">📺</span>
            </div>
            {/* Floating OTT elements */}
            <div className="absolute -top-6 -left-6 text-lg animate-bounce" style={{ animationDelay: "0.5s" }}>
              🎬
            </div>
            <div className="absolute -top-4 -right-8 text-lg animate-bounce" style={{ animationDelay: "1s" }}>
              🍿
            </div>
            <div className="absolute -bottom-6 -left-8 text-lg animate-bounce" style={{ animationDelay: "1.5s" }}>
              ⏯️
            </div>
            <div className="absolute -bottom-4 -right-6 text-lg animate-bounce" style={{ animationDelay: "2s" }}>
              ✨
            </div>
          </div>

          <div className="space-y-6">
            <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
              📺 NEW 테스트
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
                OTT 시청 습관으로 보는
              </span>
              <br />
              <span className="text-foreground">나의 유형 📺</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              정주행 방식, 추천 활용, 스포 대처, 감상 기록 습관으로 16유형 분석. 12문항, 약 3분 소요.
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
                className="h-16 px-12 text-xl bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link href="/tests/ott-habits/test">
                  <span className="text-2xl mr-3">📺</span>
                  테스트 시작하기
                </Link>
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                무료 • 회원가입 불필요 • 16가지 시청 유형 분석 • 결과 공유 이미지 자동 생성
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
                  <Play className="h-6 w-6 text-purple-500" />
                  <span>이런 질문들이 나와요!</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-4">
                    <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                      <p className="font-medium">1. 신작 공개 당일, 당신은?</p>
                      <p className="text-sm text-muted-foreground mt-1">친구들과 바로 얘기하며 본다 vs 혼자 조용히 감상한다</p>
                    </div>
                    <div className="p-4 bg-indigo-50 dark:bg-indigo-950 rounded-lg">
                      <p className="font-medium">2. 시청 리스트를 만들 때?</p>
                      <p className="text-sm text-muted-foreground mt-1">장르·평점·러닝타임을 정리 vs 느낌 오는 것 위주로 북마크</p>
                    </div>
                    <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                      <p className="font-medium">3. 재생 속도는?</p>
                      <p className="text-sm text-muted-foreground mt-1">기본 속도, 디테일을 놓치기 싫다 vs 상황 따라 가속, 리듬이 중요</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-indigo-50 dark:bg-indigo-950 rounded-lg">
                      <p className="font-medium">4. 추천 알고리즘이 낯선 작품을 권하면?</p>
                      <p className="text-sm text-muted-foreground mt-1">정보 검색으로 검증 후 시청 vs 먼저 틀어보고 느낌으로 판단</p>
                    </div>
                    <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                      <p className="font-medium">5. 드라마 정주행 방식은?</p>
                      <p className="text-sm text-muted-foreground mt-1">매일 같은 시간에 일정량씩 vs 주말 몰아보기로 한 번에</p>
                    </div>
                    <div className="p-4 bg-indigo-50 dark:bg-indigo-950 rounded-lg">
                      <p className="font-medium">6. 시청 중 메시지가 오면?</p>
                      <p className="text-sm text-muted-foreground mt-1">일시정지하고 답장 후 재생 vs 나중에 답장, 흐름을 중시</p>
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
                <h2 className="text-2xl font-bold">📺 16가지 시청 유형</h2>
                <p className="text-muted-foreground">당신은 어떤 OTT 시청러일까요?</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { emoji: "⚡", name: "분위기 전파형", type: "ENFP" },
                    { emoji: "🌙", name: "몰입 감성형", type: "INFP" },
                    { emoji: "🤝", name: "큐레이터 리더형", type: "ENFJ" },
                    { emoji: "📖", name: "의미 탐구형", type: "INFJ" },
                    { emoji: "💡", name: "아이디어 스파크형", type: "ENTP" },
                    { emoji: "🔬", name: "논리 탐색형", type: "INTP" },
                    { emoji: "🎯", name: "전략 최적화형", type: "ENTJ" },
                    { emoji: "📐", name: "설계 몰입형", type: "INTJ" },
                  ].map((character) => (
                    <div
                      key={character.type}
                      className="p-3 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950 dark:to-indigo-950 rounded-lg text-center"
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
                  <Sparkles className="h-6 w-6 text-indigo-500" />
                  <span>특별한 기능</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <h3 className="font-semibold">정확한 분석</h3>
                    <p className="text-sm text-muted-foreground">12문항으로 시청 습관을 4축으로 정량화해 유형화</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">💡</span>
                    </div>
                    <h3 className="font-semibold">맞춤 추천</h3>
                    <p className="text-sm text-muted-foreground">당신의 유형에 맞는 컨텐츠 추천, 시청 팁 제공</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
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

