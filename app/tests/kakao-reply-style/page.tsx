import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, MessageSquare, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "카톡 답장 스타일 테스트 | 답장 습관으로 보는 16유형 | 테몬",
  description:
    "12문항으로 답장 속도·길이·톤을 분석하여 16가지 의사소통 유형을 제시합니다. 실전 대화 팁과 궁합 유형 제공.",
  keywords:
    "카톡 답장 스타일, 메신저 성격 테스트, 카카오톡 답장 습관, 소통 스타일 MBTI, 읽씹 습관, 답장 속도, 메시지 스타일, MBTI, 심리테스트, 무료 테스트",
  alternates: {
    canonical: "/tests/kakao-reply-style",
  },
  openGraph: {
    title: "카톡 답장 스타일 테스트 | 답장 속도·말투·읽씹 습관으로 보는 소통 성향",
    description: "12문항으로 답장 속도·길이·톤을 분석하여 16가지 의사소통 유형을 제시합니다. 실전 대화 팁과 궁합 유형 제공.",
    type: "website",
    url: "https://www.temon.kr/tests/kakao-reply-style",
  },
}

export default function KakaoReplyStyleIntro() {
  return (
    <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950">
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="text-center space-y-8">
          {/* Animated Message Elements */}
          <div className="relative mx-auto w-32 h-32 mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full animate-pulse" />
            <div className="absolute inset-2 bg-gradient-to-br from-blue-200 to-indigo-300 rounded-full flex items-center justify-center">
              <span className="text-4xl animate-bounce">💬</span>
            </div>
            {/* Floating message elements */}
            <div className="absolute -top-6 -left-6 text-lg animate-bounce" style={{ animationDelay: "0.5s" }}>
              📱
            </div>
            <div className="absolute -top-4 -right-8 text-lg animate-bounce" style={{ animationDelay: "1s" }}>
              ✉️
            </div>
            <div className="absolute -bottom-6 -left-8 text-lg animate-bounce" style={{ animationDelay: "1.5s" }}>
              💭
            </div>
            <div className="absolute -bottom-4 -right-6 text-lg animate-bounce" style={{ animationDelay: "2s" }}>
              🗨️
            </div>
          </div>

          <div className="space-y-6">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              💬 NEW 테스트
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                카톡 답장 스타일,
              </span>
              <br />
              <span className="text-foreground">당신의 소통 패턴은 💬</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              답장 속도, 길이, 톤은 성향을 드러냅니다. 12문항으로 나의 메시지 습관을 진단해 보세요.
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
                className="h-16 px-12 text-xl bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link href="/tests/kakao-reply-style/test">
                  <span className="text-2xl mr-3">💬</span>
                  테스트 시작하기
                </Link>
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                무료 • 회원가입 불필요 • 16가지 소통 스타일 분석
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
                  <MessageSquare className="h-6 w-6 text-blue-500" />
                  <span>이런 질문들이 나와요!</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <p className="font-medium">1. 새 메시지가 오면 가장 먼저 하는 행동은?</p>
                      <p className="text-sm text-muted-foreground mt-1">바로 열어보고 답장한다 vs 상황 정리 후 천천히 답장한다</p>
                    </div>
                    <div className="p-4 bg-indigo-50 dark:bg-indigo-950 rounded-lg">
                      <p className="font-medium">2. 답장 길이는 보통?</p>
                      <p className="text-sm text-muted-foreground mt-1">핵심만 짧게 vs 맥락과 느낌까지 자세히</p>
                    </div>
                    <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <p className="font-medium">3. 의견이 다를 때의 톤은?</p>
                      <p className="text-sm text-muted-foreground mt-1">논리로 설득한다 vs 상대 감정 먼저 배려</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-indigo-50 dark:bg-indigo-950 rounded-lg">
                      <p className="font-medium">4. 읽씹 논란이 생기지 않으려면?</p>
                      <p className="text-sm text-muted-foreground mt-1">읽으면 반드시 답한다 vs 상황에 따라 유연하게</p>
                    </div>
                    <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <p className="font-medium">5. 단체방에서의 태도는?</p>
                      <p className="text-sm text-muted-foreground mt-1">적극적으로 주제 던지고 정리 vs 필요할 때만 말한다</p>
                    </div>
                    <div className="p-4 bg-indigo-50 dark:bg-indigo-950 rounded-lg">
                      <p className="font-medium">6. 새 이모티콘·밈 사용에 대해</p>
                      <p className="text-sm text-muted-foreground mt-1">검증된 것만 쓴다 vs 새로운 걸 먼저 시도</p>
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
                <h2 className="text-2xl font-bold">💬 16가지 소통 스타일</h2>
                <p className="text-muted-foreground">당신은 어떤 답장러일까요?</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { emoji: "⚡", name: "분위기 전파자", type: "ENFP" },
                    { emoji: "🌙", name: "감성 큐레이터", type: "INFP" },
                    { emoji: "🤝", name: "조율 리더", type: "ENFJ" },
                    { emoji: "📖", name: "맥락 설계자", type: "INFJ" },
                    { emoji: "💡", name: "아이디어 스파크", type: "ENTP" },
                    { emoji: "🔬", name: "분석 답장가", type: "INTP" },
                    { emoji: "🎯", name: "드라이브 추진자", type: "ENTJ" },
                    { emoji: "📐", name: "전략 컴파일러", type: "INTJ" },
                  ].map((character) => (
                    <div
                      key={character.type}
                      className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-lg text-center"
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
                    <div className="w-12 h-12 mx-auto bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <h3 className="font-semibold">정확한 분석</h3>
                    <p className="text-sm text-muted-foreground">12문항으로 메시지 습관을 4축으로 정량화해 유형화</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">💡</span>
                    </div>
                    <h3 className="font-semibold">맞춤 팁</h3>
                    <p className="text-sm text-muted-foreground">당신의 유형에 맞는 대화 스타일, 소통 팁 제공</p>
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

