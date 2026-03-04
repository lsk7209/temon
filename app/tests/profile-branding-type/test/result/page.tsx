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
  return <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950 py-8"><main className="container max-w-4xl mx-auto px-4"><Card className="border-0 shadow-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur"><CardContent className="p-8 text-center space-y-6"><h1 className="text-3xl md:text-4xl font-bold">{label} ({type})</h1><p className="text-muted-foreground">자기소개/프로필 구성 습관으로 보는 퍼스널 브랜딩 성향에 강점이 있는 유형입니다.</p><div className="grid md:grid-cols-2 gap-4 text-left"><div className="rounded-xl bg-gray-50 dark:bg-gray-900 p-4">✅ 우선순위 설정 능력</div><div className="rounded-xl bg-gray-50 dark:bg-gray-900 p-4">✅ 실행 후 개선 역량</div><div className="rounded-xl bg-gray-50 dark:bg-gray-900 p-4">✅ 맥락 기반 커뮤니케이션</div><div className="rounded-xl bg-gray-50 dark:bg-gray-900 p-4">✅ 완성도 관리 습관</div></div><div className="flex flex-col md:flex-row gap-3 justify-center"><ShareButtons testId="profile-branding-type" testPath="/tests/profile-branding-type/test" resultType={type} resultId={resultId} title={`내 결과는 ${label} (${type})`} description="12문항으로 알아보는 성향 테스트" /><Button variant="outline" asChild><Link href="/tests/profile-branding-type/test"><RotateCcw className="h-4 w-4 mr-2" /> 다시 테스트</Link></Button></div></CardContent></Card></main></div>
}

export default function Page() { return <Suspense fallback={<div className="p-8 text-center">결과를 불러오는 중...</div>}><ResultContent /></Suspense> }
