import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, MessageSquare, Sparkles } from "lucide-react"

import { generateUniqueTestMetadata } from "@/lib/quiz-seo-utils"

export const metadata: Metadata = generateUniqueTestMetadata({
  testName: "SNS 사용 습관 테스트",
  testCategory: "소셜미디어 사용",
  testDescription: "SNS를 사용하는 습관으로 알아보는 나의 성격 유형. SNS에 올릴 사진을 고를 때, SNS 피드를 볼 때 등 구체적인 상황으로 분석합니다.",
  keywords: "SNS, 소셜미디어, SNS 습관, 디지털 테스트, 성격 테스트, MBTI, 심리테스트, 무료 테스트",
  canonical: "/tests/phone-social-media",
})

export default function PhoneSocialMediaIntro() {
  return (
    <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950">
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="text-center space-y-8">
          <div className="relative mx-auto w-32 h-32 mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full animate-pulse" />
            <div className="absolute inset-2 bg-gradient-to-br from-blue-200 to-cyan-300 rounded-full flex items-center justify-center">
              <span className="text-4xl animate-bounce">📱</span>
            </div>
            <div className="absolute -top-6 -left-6 text-lg animate-bounce" style={{ animationDelay: "0.5s" }}>
              💬
            </div>
            <div className="absolute -top-4 -right-8 text-lg animate-bounce" style={{ animationDelay: "1s" }}>
              ❤️
            </div>
            <div className="absolute -bottom-6 -left-8 text-lg animate-bounce" style={{ animationDelay: "1.5s" }}>
              🔄
            </div>
            <div className="absolute -bottom-4 -right-6 text-lg animate-bounce" style={{ animationDelay: "2s" }}>
              ✨
            </div>
          </div>

          <div className="space-y-6">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              📱 NEW 테스트
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                SNS 사용 습관으로 보는
              </span>
              <br />
              <span className="text-foreground">나의 성격 유형 📱</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              SNS에 올릴 사진을 고를 때, SNS 피드를 볼 때 등 구체적인 상황으로 16유형 분석. 12문항, 약 3분 소요.
            </p>

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
                className="h-16 px-12 text-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link href="/tests/phone-social-media/test">
                  <span className="text-2xl mr-3">📱</span>
                  테스트 시작하기
                </Link>
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                무료 • 회원가입 불필요 • 16가지 SNS 사용 스타일 분석
              </p>
            </div>
          </div>
        </div>

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
                      <p className="font-medium">1. SNS에 올릴 사진을 고를 때</p>
                      <p className="text-sm text-muted-foreground mt-1">즉시 선택한다 vs 신중하게 선택한다</p>
                    </div>
                    <div className="p-4 bg-cyan-50 dark:bg-cyan-950 rounded-lg">
                      <p className="font-medium">2. SNS 피드를 볼 때</p>
                      <p className="text-sm text-muted-foreground mt-1">빠르게 스크롤한다 vs 하나씩 자세히 본다</p>
                    </div>
                    <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <p className="font-medium">3. SNS를 사용하는 방식</p>
                      <p className="text-sm text-muted-foreground mt-1">혼자 조용히 본다 vs 사람들과 함께 본다</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-cyan-50 dark:bg-cyan-950 rounded-lg">
                      <p className="font-medium">4. SNS를 사용하는 시간</p>
                      <p className="text-sm text-muted-foreground mt-1">정해진 시간에 본다 vs 그때그때 본다</p>
                    </div>
                    <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <p className="font-medium">5. SNS를 사용하는 이유</p>
                      <p className="text-sm text-muted-foreground mt-1">목표와 효율을 위해 vs 기분과 컨디션을 위해</p>
                    </div>
                    <div className="p-4 bg-cyan-50 dark:bg-cyan-950 rounded-lg">
                      <p className="font-medium">6. SNS 게시물을 선택하는 기준</p>
                      <p className="text-sm text-muted-foreground mt-1">효율성과 목표를 위해 vs 기분과 컨디션을 위해</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold">📱 16가지 SNS 사용 스타일</h2>
                <p className="text-muted-foreground">당신은 어떤 SNS러일까요?</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { emoji: "🌅", name: "즉흥형", type: "ENFP" },
                    { emoji: "😴", name: "여유형", type: "INFP" },
                    { emoji: "⏰", name: "시간관리형", type: "ENFJ" },
                    { emoji: "🧘", name: "명상형", type: "INFJ" },
                    { emoji: "📱", name: "혁신형", type: "ENTP" },
                    { emoji: "🎵", name: "분석형", type: "INTP" },
                    { emoji: "💪", name: "효율형", type: "ENTJ" },
                    { emoji: "🌙", name: "야행성형", type: "INTJ" },
                  ].map((character) => (
                    <div
                      key={character.type}
                      className="p-3 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 rounded-lg text-center"
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

          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold flex items-center justify-center space-x-2">
                  <Sparkles className="h-6 w-6 text-cyan-500" />
                  <span>특별한 기능</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <h3 className="font-semibold">정확한 분석</h3>
                    <p className="text-sm text-muted-foreground">12문항으로 SNS 사용 습관을 4축으로 정량화해 유형화</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-cyan-100 dark:bg-cyan-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">💡</span>
                    </div>
                    <h3 className="font-semibold">맞춤 팁</h3>
                    <p className="text-sm text-muted-foreground">당신의 유형에 맞는 SNS 사용 스타일 및 관리 팁 제공</p>
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


