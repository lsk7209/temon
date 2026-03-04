"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ShareButtons } from "@/components/share-buttons"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RotateCcw } from "lucide-react"

const LABEL_BY_TYPE: Record<string, string> = { ENFP:"유연 탐색형", ENFJ:"조율 리더형", ENTJ:"목표 집행형", ENTP:"실험 추진형", ESFP:"순발 실행형", ESFJ:"협업 배려형", ESTJ:"체계 운영형", ESTP:"속도 돌파형", INFP:"감성 기획형", INFJ:"전략 통찰형", INTJ:"시스템 설계형", INTP:"분석 최적화형", ISFP:"직관 연출형", ISFJ:"안정 루틴형", ISTJ:"정밀 관리형", ISTP:"실전 개선형" }

function ResultContent() {
  const searchParams=useSearchParams(); const type=(searchParams.get("type")||"ENFP").toUpperCase(); const resultId=searchParams.get("id")||undefined; const label=LABEL_BY_TYPE[type]||"성장 탐험형"
  return <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950 py-8"><main className="container max-w-4xl mx-auto px-4"><Card className="border-0 shadow-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur"><CardContent className="p-8 text-center space-y-6"><h1 className="text-3xl md:text-4xl font-bold">{label} ({type})</h1><p className="text-muted-foreground">카페인 마감 시간과 수면 우선순위로 보는 에너지 관리 성향에서 강점을 보이는 유형입니다.</p><div className="grid md:grid-cols-2 gap-4 text-left"><div className="rounded-xl bg-gray-50 dark:bg-gray-900 p-4">✅ 상황 판단과 우선순위 설정</div><div className="rounded-xl bg-gray-50 dark:bg-gray-900 p-4">✅ 실행 후 반복 개선 능력</div><div className="rounded-xl bg-gray-50 dark:bg-gray-900 p-4">✅ 협업 맥락 반영 역량</div><div className="rounded-xl bg-gray-50 dark:bg-gray-900 p-4">✅ 결과물 완성도 관리</div></div><div className="flex flex-col md:flex-row gap-3 justify-center"><ShareButtons testId="caffeine-cutoff-type" testPath="/tests/caffeine-cutoff-type/test" resultType={type} resultId={resultId} title={`내 결과는 ${label} (${type})`} description="12문항으로 알아보는 성향 테스트" /><Button variant="outline" asChild><Link href="/tests/caffeine-cutoff-type/test"><RotateCcw className="h-4 w-4 mr-2" /> 다시 테스트</Link></Button></div></CardContent></Card></main></div>
}

export default function Page() { return <Suspense fallback={<div className="p-8 text-center">결과를 불러오는 중...</div>}><ResultContent /></Suspense> }
