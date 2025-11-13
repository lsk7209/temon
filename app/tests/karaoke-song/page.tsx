import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Music, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "노래방 곡 선택 테스트 | 노래방 곡 선택 방식으로 보는 16유형 | 테몬",
  description:
    "노래방 곡 선택 방식으로 16유형 성향을 분석합니다. 곡 선택 기준, 부르는 스타일로 알아보는 나의 성격. 12문항, 결과 공유 이미지 자동 생성.",
  keywords:
    "노래방 테스트, 노래방 곡 선택, 노래 스타일, 성향 테스트, 심리테스트, 무료 테스트",
  alternates: {
    canonical: "/tests/karaoke-song",
  },
  openGraph: {
    title: "노래방 곡 선택 테스트 | 노래방 곡 선택 방식으로 보는 16유형",
    description: "노래방 곡 선택 방식으로 16유형 성향을 분석합니다. 12문항, 결과 공유 이미지 자동 생성.",
    type: "website",
    url: "https://www.temon.kr/tests/karaoke-song",
  },
}

export default function KaraokeSongIntro() {
  return (
    <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950">
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="text-center space-y-8">
          <div className="relative mx-auto w-32 h-32 mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-red-500 rounded-full animate-pulse" />
            <div className="absolute inset-2 bg-gradient-to-br from-pink-200 to-red-300 rounded-full flex items-center justify-center">
              <span className="text-4xl animate-bounce">🎤</span>
            </div>
            <div className="absolute -top-6 -left-6 text-lg animate-bounce" style={{ animationDelay: "0.5s" }}>
              🎵
            </div>
            <div className="absolute -top-4 -right-8 text-lg animate-bounce" style={{ animationDelay: "1s" }}>
              🎶
            </div>
            <div className="absolute -bottom-6 -left-8 text-lg animate-bounce" style={{ animationDelay: "1.5s" }}>
              🎧
            </div>
            <div className="absolute -bottom-4 -right-6 text-lg animate-bounce" style={{ animationDelay: "2s" }}>
              🎼
            </div>
          </div>

          <div className="space-y-6">
            <Badge variant="secondary" className="bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200">
              🎤 NEW 테스트
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
                노래방 곡 선택으로 보는
              </span>
              <br />
              <span className="text-foreground">나의 선택 패턴 🎤</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              곡 선택 기준, 부르는 스타일로 16유형 분석. 12문항, 약 3분 소요.
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
                className="h-16 px-12 text-xl bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link href="/tests/karaoke-song/test">
                  <span className="text-2xl mr-3">🎤</span>
                  테스트 시작하기
                </Link>
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                무료 • 회원가입 불필요 • 16가지 노래방 스타일 분석
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 space-y-12">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold flex items-center justify-center space-x-2">
                  <Music className="h-6 w-6 text-pink-500" />
                  <span>이런 질문들이 나와요!</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-4">
                    <div className="p-4 bg-pink-50 dark:bg-pink-950 rounded-lg">
                      <p className="font-medium">1. 노래방 곡 선택 기준은?</p>
                      <p className="text-sm text-muted-foreground mt-1">항상 같은 곡 vs 그때그때 다른 곡</p>
                    </div>
                    <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg">
                      <p className="font-medium">2. 노래 부르는 스타일은?</p>
                      <p className="text-sm text-muted-foreground mt-1">열정적으로 vs 조용히</p>
                    </div>
                    <div className="p-4 bg-pink-50 dark:bg-pink-950 rounded-lg">
                      <p className="font-medium">3. 노래 선택은?</p>
                      <p className="text-sm text-muted-foreground mt-1">미리 정해둠 vs 그때그때 결정</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg">
                      <p className="font-medium">4. 노래 부르는 분위기는?</p>
                      <p className="text-sm text-muted-foreground mt-1">분위기 띄우기 vs 조용히 즐기기</p>
                    </div>
                    <div className="p-4 bg-pink-50 dark:bg-pink-950 rounded-lg">
                      <p className="font-medium">5. 노래 장르는?</p>
                      <p className="text-sm text-muted-foreground mt-1">항상 같은 장르 vs 다양한 장르</p>
                    </div>
                    <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg">
                      <p className="font-medium">6. 노래 부르는 후기는?</p>
                      <p className="text-sm text-muted-foreground mt-1">후기 공유 vs 조용히 즐기기</p>
                    </div>
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

