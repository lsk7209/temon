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
  const searchParams = useSearchParams(); const type=(searchParams.get("type")||"ENFP").toUpperCase(); const resultId=searchParams.get("id")||undefined; const label=LABEL_BY_TYPE[type]||"성장 탐험형"
  return <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950 py-8"><main className="container max-w-4xl mx-auto px-4"><Card className="border-0 shadow-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur"><CardContent className="p-8 text-center space-y-6"><h1 className="text-3xl md:text-4xl font-bold">{label} ({type})</h1><p className="text-muted-foreground">식재료 선택과 식사 루틴에서 드러나는 건강한 노화 관리 성향을 보여주는 유형입니다.</p><div className="grid md:grid-cols-2 gap-4 text-left"><div className="rounded-xl bg-gray-50 dark:bg-gray-900 p-4">✅ 영양 균형 설계</div><div className="rounded-xl bg-gray-50 dark:bg-gray-900 p-4">✅ 혈당·염분 관리</div><div className="rounded-xl bg-gray-50 dark:bg-gray-900 p-4">✅ 지속 가능한 식단 운영</div><div className="rounded-xl bg-gray-50 dark:bg-gray-900 p-4">✅ 생활 루틴 연동</div></div><div className="flex flex-col md:flex-row gap-3 justify-center"><ShareButtons testId="slow-aging-food-type" testPath="/tests/slow-aging-food-type/test" resultType={type} resultId={resultId} title={`내 결과는 ${label} (${type})`} description="12문항으로 알아보는 성향 테스트" /><Button variant="outline" asChild><Link href="/tests/slow-aging-food-type/test"><RotateCcw className="h-4 w-4 mr-2" /> 다시 테스트</Link></Button></div></CardContent></Card></main></div>
}

export default function Page() { return <Suspense fallback={<div className="p-8 text-center">결과를 불러오는 중...</div>}><ResultContent /></Suspense> }
