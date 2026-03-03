import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Flame, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "매운맛 선호도 테스트 | 매운맛으로 보는 16유형 | 테몬",
  description:
    "매운맛 선호도와 대처 방식으로 16유형 성향을 분석합니다. 매운맛 한 번에 내 성격이. 12문항, 결과 공유 이미지 자동 생성.",
  keywords:
    "매운맛 테스트, 매운맛 선호도, 맛 테스트, 성향 테스트, 심리테스트, 무료 테스트",
  alternates: {
    canonical: "/tests/spice-tolerance",
  },
  openGraph: {
    title: "매운맛 선호도 테스트 | 매운맛으로 보는 16유형",
    description: "매운맛 선호도와 대처 방식으로 16유형 성향을 분석합니다. 12문항, 결과 공유 이미지 자동 생성.",
    type: "website",
    url: "https://www.temon.kr/tests/spice-tolerance",
  },
}

export default function SpiceToleranceIntro() {
  return (
    <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950">
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="text-center space-y-8">
          <div className="relative mx-auto w-32 h-32 mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-orange-500 rounded-full animate-pulse" />
            <div className="absolute inset-2 bg-gradient-to-br from-red-200 to-orange-300 rounded-full flex items-center justify-center">
              <span className="text-4xl animate-bounce">🌶️</span>
            </div>
            <div className="absolute -top-6 -left-6 text-lg animate-bounce" style={{ animationDelay: "0.5s" }}>
              🔥
            </div>
            <div className="absolute -top-4 -right-8 text-lg animate-bounce" style={{ animationDelay: "1s" }}>
              💧
            </div>
            <div className="absolute -bottom-6 -left-8 text-lg animate-bounce" style={{ animationDelay: "1.5s" }}>
              🥵
            </div>
            <div className="absolute -bottom-4 -right-6 text-lg animate-bounce" style={{ animationDelay: "2s" }}>
              🌶
            </div>
          </div>

          <div className="space-y-6">
            <Badge variant="secondary" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
              🌶️ NEW 테스트
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                매운맛 선호도로 보는
              </span>
              <br />
              <span className="text-foreground">나의 선택 패턴 🌶️</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              매운맛 선호도와 대처 방식으로 16유형 분석. 12문항, 약 3분 소요.
            </p>

            <div className="flex justify-center items-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>실시간 참여중</span>
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
                className="h-16 px-12 text-xl bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link href="/tests/spice-tolerance/test">
                  <span className="text-2xl mr-3">🌶️</span>
                  테스트 시작하기
                </Link>
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                무료 • 회원가입 불필요 • 16가지 매운맛 스타일 분석
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 space-y-12">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold flex items-center justify-center space-x-2">
                  <Flame className="h-6 w-6 text-red-500" />
                  <span>이런 질문들이 나와요!</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-4">
                    <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg">
                      <p className="font-medium">1. 매운맛 선호도는?</p>
                      <p className="text-sm text-muted-foreground mt-1">강하게 vs 약하게</p>
                    </div>
                    <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                      <p className="font-medium">2. 매운맛 대처는?</p>
                      <p className="text-sm text-muted-foreground mt-1">즉시 vs 참고 견디기</p>
                    </div>
                    <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg">
                      <p className="font-medium">3. 매운맛 선택은?</p>
                      <p className="text-sm text-muted-foreground mt-1">계획적으로 vs 즉흥적으로</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                      <p className="font-medium">4. 매운맛 이유는?</p>
                      <p className="text-sm text-muted-foreground mt-1">감성 vs 실용</p>
                    </div>
                    <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg">
                      <p className="font-medium">5. 매운맛 공유는?</p>
                      <p className="text-sm text-muted-foreground mt-1">함께 vs 혼자</p>
                    </div>
                    <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                      <p className="font-medium">6. 매운맛 후 느낌은?</p>
                      <p className="text-sm text-muted-foreground mt-1">즐거움 vs 만족감</p>
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

