"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ShareButtons } from "@/components/share-buttons"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RotateCcw } from "lucide-react"

const LABEL_BY_TYPE: Record<string, string> = {
  ENFP: "유연 탐색형",
  ENFJ: "조율 리더형",
  ENTJ: "목표 집행형",
  ENTP: "실험 추진형",
  ESFP: "순발 실행형",
  ESFJ: "협업 배려형",
  ESTJ: "체계 운영형",
  ESTP: "속도 돌파형",
  INFP: "감성 기획형",
  INFJ: "전략 통찰형",
  INTJ: "시스템 설계형",
  INTP: "분석 최적화형",
  ISFP: "직관 연출형",
  ISFJ: "안정 루틴형",
  ISTJ: "정밀 관리형",
  ISTP: "실전 개선형",
}

function ResultContent() {
  const searchParams = useSearchParams()
  const type = (searchParams.get("type") || "ENFP").toUpperCase()
  const resultId = searchParams.get("id") || undefined
  const label = LABEL_BY_TYPE[type] || "성장 탐험형"

  return (
    <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950 py-8">
      <main className="container max-w-4xl mx-auto px-4">
        <Card className="border-0 shadow-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur">
          <CardContent className="p-8 text-center space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold">{label} ({type})</h1>
            <p className="text-muted-foreground">새 습관을 시작할 때를 포함한 패턴에서 강점이 드러나는 유형입니다.</p>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div className="rounded-xl bg-gray-50 dark:bg-gray-900 p-4">✅ 작은 실행 단위를 설계하는 능력</div>
              <div className="rounded-xl bg-gray-50 dark:bg-gray-900 p-4">✅ 실패 후 재시작 저항이 낮음</div>
              <div className="rounded-xl bg-gray-50 dark:bg-gray-900 p-4">✅ 루틴을 현실에 맞게 조정함</div>
              <div className="rounded-xl bg-gray-50 dark:bg-gray-900 p-4">✅ 장기 지속을 위한 시스템 감각</div>
            </div>
            <div className="flex flex-col md:flex-row gap-3 justify-center">
              <ShareButtons
                testId="micro-habit-streak-type"
                testPath="/tests/micro-habit-streak-type/test"
                resultType={type}
                resultId={resultId}
                title={`내 결과는 ${label} (${type})`}
                description="12문항으로 알아보는 성향 테스트"
              />
              <Button variant="outline" asChild>
                <Link href="/tests/micro-habit-streak-type/test">
                  <RotateCcw className="h-4 w-4 mr-2" /> 다시 테스트
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<div className="p-8 text-center">결과를 불러오는 중...</div>}>
      <ResultContent />
    </Suspense>
  )
}
