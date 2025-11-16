import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart } from "lucide-react"

export const metadata: Metadata = {
  title: "💗 쫄깃함 선호도 테스트 | 테몬",
  description: "쫄깃함을 좋아하는 정도와 방식으로 알아보는 나의 성격 유형 테스트",
  openGraph: {
    title: "💗 쫄깃함 선호도 테스트",
    description: "쫄깃함을 좋아하는 정도와 방식으로 알아보는 나의 성격 유형 테스트",
    type: "website",
  },
}

export default function FoodChewyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <main className="container max-w-4xl mx-auto px-4 py-16">
        <Card className="border-0 shadow-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur">
          <CardContent className="p-8 md:p-12 text-center space-y-8">
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-400 to-red-500 flex items-center justify-center shadow-lg">
                <Heart className="h-12 w-12 text-white" />
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">
                💗 쫄깃함 선호도 테스트
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                쫄깃함을 좋아하는 정도와 방식으로 알아보는 나의 성격 유형
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 py-8">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-pink-600">12문항</div>
                <div className="text-sm text-muted-foreground">간단한 질문</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-red-600">약 3분</div>
                <div className="text-sm text-muted-foreground">소요 시간</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-rose-600">16유형</div>
                <div className="text-sm text-muted-foreground">결과 분석</div>
              </div>
            </div>

            <div className="pt-8">
              <Button asChild size="lg" className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white text-lg px-8 py-6">
                <Link href="/tests/food-chewy/test">테스트 시작하기</Link>
              </Button>
            </div>

            <div className="pt-8 text-left space-y-4">
              <h2 className="text-2xl font-bold">이 테스트는?</h2>
              <p className="text-muted-foreground leading-relaxed">
                쫄깃함을 좋아하는 정도와 쫄깃한 음식을 선택하는 방식, 쫄깃함을 즐기는 패턴을 통해 당신의 성격 유형을 분석합니다. 
                쫄깃함에 대한 선호도는 인내심, 만족감, 감각 추구, 논리적 선택 등 다양한 성격 특성을 반영합니다.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

