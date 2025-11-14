import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, ChefHat, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "양념 사용 스타일 테스트 | 양념으로 보는 16유형 | 테몬",
  description:
    "양념 사용량과 방식으로 16유형 성향을 분석합니다. 양념 한 번에 내 성격이. 12문항, 결과 공유 이미지 자동 생성.",
  keywords:
    "양념 테스트, 조미료, 양념 사용, 취향, 성향 테스트, 심리테스트, 무료 테스트",
  alternates: {
    canonical: "/tests/food-seasoning",
  },
  openGraph: {
    title: "양념 사용 스타일 테스트 | 양념으로 보는 16유형",
    description: "양념 사용량과 방식으로 16유형 성향을 분석합니다. 12문항, 결과 공유 이미지 자동 생성.",
    type: "website",
    url: "https://www.temon.kr/tests/food-seasoning",
  },
}

export default function FoodSeasoningIntro() {
  return (
    <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950">
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="text-center space-y-8">
          <div className="relative mx-auto w-32 h-32 mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse" />
            <div className="absolute inset-2 bg-gradient-to-br from-yellow-200 to-orange-300 rounded-full flex items-center justify-center">
              <span className="text-4xl animate-bounce">🧂</span>
            </div>
            <div className="absolute -top-6 -left-6 text-lg animate-bounce" style={{ animationDelay: "0.5s" }}>
              🌶️
            </div>
            <div className="absolute -top-4 -right-8 text-lg animate-bounce" style={{ animationDelay: "1s" }}>
              🍯
            </div>
            <div className="absolute -bottom-6 -left-8 text-lg animate-bounce" style={{ animationDelay: "1.5s" }}>
              🧄
            </div>
            <div className="absolute -bottom-4 -right-6 text-lg animate-bounce" style={{ animationDelay: "2s" }}>
              🫒
            </div>
          </div>

          <div className="space-y-6">
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
              🧂 NEW 테스트
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                양념 사용 스타일로 보는
              </span>
              <br />
              <span className="text-foreground">나의 선택 패턴 🧂</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              양념 사용량과 방식으로 16유형 분석. 12문항, 약 3분 소요.
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
                className="h-16 px-12 text-xl bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link href="/tests/food-seasoning/test">
                  <span className="text-2xl mr-3">🧂</span>
                  테스트 시작하기
                </Link>
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                무료 • 회원가입 불필요 • 16가지 양념 스타일 분석
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 space-y-12">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold flex items-center justify-center space-x-2">
                  <ChefHat className="h-6 w-6 text-yellow-500" />
                  <span>이런 질문들이 나와요!</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-4">
                    <div className="p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                      <p className="font-medium">1. 양념 사용량은?</p>
                      <p className="text-sm text-muted-foreground mt-1">적게 vs 많이</p>
                    </div>
                    <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                      <p className="font-medium">2. 양념 선택 기준은?</p>
                      <p className="text-sm text-muted-foreground mt-1">레시피 따라 vs 감으로</p>
                    </div>
                    <div className="p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                      <p className="font-medium">3. 양념 시도는?</p>
                      <p className="text-sm text-muted-foreground mt-1">익숙한 양념 vs 새로운 양념</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                      <p className="font-medium">4. 양념 준비는?</p>
                      <p className="text-sm text-muted-foreground mt-1">미리 준비 vs 그때그때</p>
                    </div>
                    <div className="p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                      <p className="font-medium">5. 양념 조합은?</p>
                      <p className="text-sm text-muted-foreground mt-1">정해진 조합 vs 즉흥 조합</p>
                    </div>
                    <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                      <p className="font-medium">6. 양념 이유는?</p>
                      <p className="text-sm text-muted-foreground mt-1">맛 vs 건강</p>
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

