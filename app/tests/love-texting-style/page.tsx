import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Heart, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "연애 연락 텐션 테스트 | 썸·연애 연락 습관으로 보는 16유형 | 테몬",
  description:
    "연락 속도·길이·톤을 분석해 16가지 연애 커뮤니케이션 유형을 제시합니다. 실전 데이트 합의 팁과 궁합 유형 제공.",
  keywords:
    "연애 연락 테스트, 썸 연락, 연애 텐션, 커뮤니케이션 유형, 연락 스타일, 연애 MBTI, 심리테스트, 무료 테스트",
  alternates: {
    canonical: "/tests/love-texting-style",
  },
  openGraph: {
    title: "연애 연락 텐션 테스트 | 썸·연애 연락 습관으로 보는 16유형",
    description: "연락 속도·길이·톤을 분석해 16가지 연애 커뮤니케이션 유형을 제시합니다. 실전 데이트 합의 팁과 궁합 유형 제공.",
    type: "website",
    url: "https://www.temon.kr/tests/love-texting-style",
  },
}

export default function LoveTextingStyleIntro() {
  return (
    <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950">
      <main className="container max-w-4xl mx-auto px-4 py-8">
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
              💖
            </div>
            <div className="absolute -bottom-6 -left-8 text-lg animate-bounce" style={{ animationDelay: "1.5s" }}>
              💝
            </div>
            <div className="absolute -bottom-4 -right-6 text-lg animate-bounce" style={{ animationDelay: "2s" }}>
              💗
            </div>
          </div>

          <div className="space-y-6">
            <Badge variant="secondary" className="bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200">
              💕 NEW 테스트
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                연애 연락 텐션,
              </span>
              <br />
              <span className="text-foreground">당신의 패턴은 💕</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              썸에서 연애까지, 연락 습관에는 성향이 드러납니다. 12문항으로 나의 텐션을 진단해 보세요.
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
                <Link href="/tests/love-texting-style/test">
                  <span className="text-2xl mr-3">💕</span>
                  테스트 시작하기
                </Link>
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                무료 • 회원가입 불필요 • 16가지 연락 스타일 분석
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
                      <p className="font-medium">1. 호감 있는 사람에게 첫 연락 주기?</p>
                      <p className="text-sm text-muted-foreground mt-1">먼저 건넨다 vs 상대 반응을 보고 움직인다</p>
                    </div>
                    <div className="p-4 bg-rose-50 dark:bg-rose-950 rounded-lg">
                      <p className="font-medium">2. 답장 길이 스타일은?</p>
                      <p className="text-sm text-muted-foreground mt-1">핵심만 짧게 vs 감정과 맥락까지 자세히</p>
                    </div>
                    <div className="p-4 bg-pink-50 dark:bg-pink-950 rounded-lg">
                      <p className="font-medium">3. 데이트 일정 정할 때?</p>
                      <p className="text-sm text-muted-foreground mt-1">날짜·시간·장소를 먼저 제안 vs 서로 아이디어를 주고받으며 정함</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-rose-50 dark:bg-rose-950 rounded-lg">
                      <p className="font-medium">4. 애매한 메시지 톤을 느끼면?</p>
                      <p className="text-sm text-muted-foreground mt-1">사실관계를 확인해본다 vs 기분이 상하지 않았는지 묻는다</p>
                    </div>
                    <div className="p-4 bg-pink-50 dark:bg-pink-950 rounded-lg">
                      <p className="font-medium">5. 하루 연락 빈도는?</p>
                      <p className="text-sm text-muted-foreground mt-1">정해진 타이밍에 꾸준히 vs 상황·기분 따라 유동적</p>
                    </div>
                    <div className="p-4 bg-rose-50 dark:bg-rose-950 rounded-lg">
                      <p className="font-medium">6. 대화 소재 선택은?</p>
                      <p className="text-sm text-muted-foreground mt-1">오늘 있었던 구체적 일상 vs 앞날·상상·취향 토크</p>
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
                <h2 className="text-2xl font-bold">💕 16가지 연락 스타일</h2>
                <p className="text-muted-foreground">당신은 어떤 연락러일까요?</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { emoji: "💕", name: "분위기 메이커", type: "ENFP" },
                    { emoji: "🌙", name: "감성 스토리텔러", type: "INFP" },
                    { emoji: "🤝", name: "따뜻한 조율가", type: "ENFJ" },
                    { emoji: "📖", name: "맥락 설계자", type: "INFJ" },
                    { emoji: "💡", name: "스파크 플래너", type: "ENTP" },
                    { emoji: "🔬", name: "분석 컨시어지", type: "INTP" },
                    { emoji: "🎯", name: "드라이브 캡틴", type: "ENTJ" },
                    { emoji: "📐", name: "전략 오케스트라", type: "INTJ" },
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
                    <p className="text-sm text-muted-foreground">12문항으로 연락 습관을 4축으로 정량화해 유형화</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-rose-100 dark:bg-rose-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">💡</span>
                    </div>
                    <h3 className="font-semibold">맞춤 팁</h3>
                    <p className="text-sm text-muted-foreground">당신의 유형에 맞는 연락 스타일, 데이트 합의 팁 제공</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🔗</span>
                    </div>
                    <h3 className="font-semibold">쉬운 공유</h3>
                    <p className="text-sm text-muted-foreground">결과를 파트너와 쉽게 공유하고 비교해보세요</p>
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

