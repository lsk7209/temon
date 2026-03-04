"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ShareButtons } from "@/components/share-buttons"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RotateCcw } from "lucide-react"

const LABEL_BY_TYPE: Record<string, string> = { ENFP:"유연 회복형", ENFJ:"균형 조율형", ENTJ:"시스템 제어형", ENTP:"실험 디톡서", ESFP:"즉시 전환형", ESFJ:"관계 배려형", ESTJ:"규칙 실행형", ESTP:"속도 조정형", INFP:"감성 회복형", INFJ:"맥락 설계형", INTJ:"전략 최적화형", INTP:"분석 절제형", ISFP:"무드 케어형", ISFJ:"안정 루틴형", ISTJ:"정밀 관리형", ISTP:"실전 개선형" }

function ResultContent(){
  const searchParams=useSearchParams(); const type=(searchParams.get("type")||"ENFP").toUpperCase(); const resultId=searchParams.get("id")||undefined; const label=LABEL_BY_TYPE[type]||"디톡스 탐험형"
  return <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950 py-8"><main className="container max-w-4xl mx-auto px-4"><Card className="border-0 shadow-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur"><CardContent className="p-8 text-center space-y-6"><h1 className="text-3xl md:text-4xl font-bold">{label} ({type})</h1><p className="text-muted-foreground">디지털 사용과 회복 루틴의 균형을 잘 맞추는 유형입니다.</p><div className="grid md:grid-cols-2 gap-4 text-left"><div className="rounded-xl bg-gray-50 dark:bg-gray-900 p-4">✅ 알림/집중 전환에 강함</div><div className="rounded-xl bg-gray-50 dark:bg-gray-900 p-4">✅ 회복 루틴 재설계 역량</div><div className="rounded-xl bg-gray-50 dark:bg-gray-900 p-4">✅ 상황별 사용량 조절</div><div className="rounded-xl bg-gray-50 dark:bg-gray-900 p-4">✅ 지속 가능한 습관 형성</div></div><div className="flex flex-col md:flex-row gap-3 justify-center"><ShareButtons testId="digital-detox-type" testPath="/tests/digital-detox-type/test" resultType={type} resultId={resultId} title={`내 디지털 디톡스 유형은 ${label}`} description="12문항으로 알아보는 디지털 회복 성향" /><Button variant="outline" asChild><Link href="/tests/digital-detox-type/test"><RotateCcw className="h-4 w-4 mr-2" /> 다시 테스트</Link></Button></div></CardContent></Card></main></div>
}

export default function Page(){ return <Suspense fallback={<div className="p-8 text-center">결과를 불러오는 중...</div>}><ResultContent/></Suspense> }
