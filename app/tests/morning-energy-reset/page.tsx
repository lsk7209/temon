import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock3, Sparkles, Sun } from "lucide-react"

export const metadata: Metadata = {
  title: "🌅 아침 에너지 리셋 테스트 | 테몬",
  description: "기상 직후 루틴으로 보는 하루 시동 성향. 12문항, 3분 완성.",
  alternates: { canonical: "/tests/morning-energy-reset" },
  openGraph: { title: "🌅 아침 에너지 리셋 테스트", description: "기상 직후 루틴으로 보는 하루 시동 성향", type: "website", url: "https://temon.kr/tests/morning-energy-reset" },
}

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950">
      <main className="container max-w-4xl mx-auto px-4 py-10 text-center space-y-8">
        <Badge variant="secondary">TRENDING</Badge>
        <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg"><Sun className="h-12 w-12 text-white" /></div>
        <h1 className="text-4xl md:text-5xl font-bold">🌅 아침 에너지 리셋 테스트</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">기상 직후 루틴으로 보는 하루 시동 성향</p>
        <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
          <Card><CardContent className="py-4"><div className="font-bold">12문항</div><div className="text-sm text-muted-foreground">빠른 진단</div></CardContent></Card>
          <Card><CardContent className="py-4"><div className="font-bold flex items-center justify-center gap-1"><Clock3 className="h-4 w-4" />3분</div><div className="text-sm text-muted-foreground">짧은 소요</div></CardContent></Card>
          <Card><CardContent className="py-4"><div className="font-bold">16유형</div><div className="text-sm text-muted-foreground">결과 분석</div></CardContent></Card>
        </div>
        <Button asChild size="lg" className="h-14 px-10 text-lg"><Link href="/tests/morning-energy-reset/test"><Sparkles className="h-5 w-5 mr-2" /> 테스트 시작하기</Link></Button>
      </main>
    </div>
  )
}
