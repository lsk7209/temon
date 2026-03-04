import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Clock3, Sparkles, Wand2 } from "lucide-react"

export const metadata: Metadata = {
  title: "AI 프롬프트 스타일 테스트 | 질문 방식으로 보는 16유형 | 테몬",
  description:
    "AI에게 질문하는 방식, 맥락 제공 습관, 답변 다듬기 패턴으로 알아보는 프롬프트 성향 테스트. 12문항, 약 3분.",
  keywords: "AI 테스트, 프롬프트 테스트, 챗GPT 성향, 생산성 테스트, 성격 테스트",
  alternates: {
    canonical: "/tests/ai-prompt-style",
  },
  openGraph: {
    title: "AI 프롬프트 스타일 테스트 | 질문 방식으로 보는 16유형",
    description: "AI 질문 습관으로 알아보는 나의 프롬프트 성향. 12문항, 3분 완성.",
    type: "website",
    url: "https://temon.kr/tests/ai-prompt-style",
  },
}

export default function AiPromptStyleIntro() {
  return (
    <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950">
      <main className="container max-w-4xl mx-auto px-4 py-10">
        <div className="text-center space-y-8">
          <Badge variant="secondary" className="bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-100">
            🤖 TRENDING
          </Badge>

          <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center shadow-lg">
            <Wand2 className="h-12 w-12 text-white" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">AI 프롬프트 스타일 테스트</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            질문 구조, 맥락 설명, 수정 요청 방식으로 알아보는 나의 AI 협업 성향
          </p>

          <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <Card><CardContent className="py-4"><div className="font-bold text-violet-600">12문항</div><div className="text-sm text-muted-foreground">빠른 진단</div></CardContent></Card>
            <Card><CardContent className="py-4"><div className="font-bold text-indigo-600 flex items-center justify-center gap-1"><Clock3 className="h-4 w-4" />3분</div><div className="text-sm text-muted-foreground">짧은 소요</div></CardContent></Card>
            <Card><CardContent className="py-4"><div className="font-bold text-fuchsia-600 flex items-center justify-center gap-1"><Brain className="h-4 w-4" />16유형</div><div className="text-sm text-muted-foreground">결과 분석</div></CardContent></Card>
          </div>

          <Button asChild size="lg" className="h-14 px-10 text-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700">
            <Link href="/tests/ai-prompt-style/test">
              <Sparkles className="h-5 w-5 mr-2" /> 테스트 시작하기
            </Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
