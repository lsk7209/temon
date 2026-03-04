import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock3, Clapperboard, Sparkles, Zap } from "lucide-react"

export const metadata: Metadata = {
  title: "숏폼 3초 후킹 스타일 테스트 | 첫 장면 선택 성향 | 테몬",
  description:
    "릴스·쇼츠에서 첫 3초를 어떻게 설계하는지로 알아보는 콘텐츠 후킹 성향 테스트. 12문항, 3분 완성.",
  keywords: "숏폼 테스트, 릴스 테스트, 쇼츠 테스트, 후킹 문장, 콘텐츠 성향",
  alternates: {
    canonical: "/tests/shortform-hook-style",
  },
  openGraph: {
    title: "숏폼 3초 후킹 스타일 테스트",
    description: "첫 장면, 자막, 썸네일 선택으로 알아보는 나의 숏폼 후킹 성향",
    type: "website",
    url: "https://temon.kr/tests/shortform-hook-style",
  },
}

export default function ShortformHookStyleIntro() {
  return (
    <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950">
      <main className="container max-w-4xl mx-auto px-4 py-10">
        <div className="text-center space-y-8">
          <Badge variant="secondary" className="bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-100">
            🎬 CREATOR TREND
          </Badge>

          <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center shadow-lg">
            <Clapperboard className="h-12 w-12 text-white" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">숏폼 3초 후킹 스타일 테스트</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            첫 3초 장면 선택, 자막 리듬, 썸네일 기준으로 보는 나의 콘텐츠 후킹 성향
          </p>

          <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <Card><CardContent className="py-4"><div className="font-bold text-rose-600">12문항</div><div className="text-sm text-muted-foreground">빠른 진단</div></CardContent></Card>
            <Card><CardContent className="py-4"><div className="font-bold text-orange-600 flex items-center justify-center gap-1"><Clock3 className="h-4 w-4" />3분</div><div className="text-sm text-muted-foreground">짧은 소요</div></CardContent></Card>
            <Card><CardContent className="py-4"><div className="font-bold text-pink-600 flex items-center justify-center gap-1"><Zap className="h-4 w-4" />16유형</div><div className="text-sm text-muted-foreground">결과 분석</div></CardContent></Card>
          </div>

          <Button asChild size="lg" className="h-14 px-10 text-lg bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-700 hover:to-orange-700">
            <Link href="/tests/shortform-hook-style/test">
              <Sparkles className="h-5 w-5 mr-2" /> 테스트 시작하기
            </Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
