"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ShareButtons } from "@/components/share-buttons"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RotateCcw } from "lucide-react"

const LABEL_BY_TYPE: Record<string, string> = {
  ENFP: "아이디어 확장형", ENFJ: "맥락 조율형", ENTJ: "실행 리더형", ENTP: "실험 추진형",
  ESFP: "순발력 표현형", ESFJ: "관계 조정형", ESTJ: "체계 운영형", ESTP: "속도 돌파형",
  INFP: "감성 설계형", INFJ: "전략 통찰형", INTJ: "시스템 설계형", INTP: "분석 최적화형",
  ISFP: "직관 연출형", ISFJ: "안정 품질형", ISTJ: "정밀 검수형", ISTP: "실전 개선형",
}

function ResultContent() {
  const searchParams = useSearchParams()
  const type = (searchParams.get("type") || "ENFP").toUpperCase()
  const resultId = searchParams.get("id") || undefined
  const label = LABEL_BY_TYPE[type] || "유연 탐색형"

  return (
    <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950 py-8">
      <main className="container max-w-4xl mx-auto px-4 space-y-6">
        <Card className="border-0 shadow-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur">
          <CardContent className="p-8 space-y-6 text-center">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">🚀 사이드프로젝트 추진력 테스트 결과</div>
              <h1 className="text-3xl md:text-4xl font-bold">{label} ({type})</h1>
              <p className="text-muted-foreground">아이디어 실행·협업 방식으로 보는 프로젝트 추진 성향에 강점이 있는 유형입니다.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div className="rounded-xl bg-gray-50 dark:bg-gray-900 p-4">✅ 강점 1: 빠른 상황 판단과 실행</div>
              <div className="rounded-xl bg-gray-50 dark:bg-gray-900 p-4">✅ 강점 2: 반복 개선을 통한 성능 향상</div>
              <div className="rounded-xl bg-gray-50 dark:bg-gray-900 p-4">✅ 강점 3: 협업/소통 맥락 반영 능력</div>
              <div className="rounded-xl bg-gray-50 dark:bg-gray-900 p-4">✅ 강점 4: 목표 중심의 결과 최적화</div>
            </div>

            <div className="flex flex-col md:flex-row gap-3 justify-center">
              <ShareButtons
                testId="sideproject-drive-type"
                testPath="/tests/sideproject-drive-type/test"
                resultType={type}
                resultId={resultId}
                title={`내 결과는 ${label} (${type})`}
                description="12문항으로 알아보는 성향 테스트"
              />
              <Button variant="outline" asChild>
                <Link href="/tests/sideproject-drive-type/test"><RotateCcw className="h-4 w-4 mr-2" /> 다시 테스트</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default function ResultPage() {
  return <Suspense fallback={<div className="p-8 text-center">결과를 불러오는 중...</div>}><ResultContent /></Suspense>
}
