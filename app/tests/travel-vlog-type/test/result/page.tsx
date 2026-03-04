"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ShareButtons } from "@/components/share-buttons"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RotateCcw } from "lucide-react"

const LABEL_BY_TYPE: Record<string, string> = { ENFP:"감성 여행 스토리러", ENFJ:"공감 가이드형", ENTJ:"기획형 여행 디렉터", ENTP:"실험형 여행 크리에이터", ESFP:"현장 몰입 브이로거", ESFJ:"친화력 여행 리포터", ESTJ:"구조화 여행 편집자", ESTP:"스피드 여행 액터", INFP:"무드 기록 아티스트", INFJ:"맥락형 여행 서사자", INTJ:"시스템형 브이로그 설계자", INTP:"분석형 여행 편집러", ISFP:"감각형 로컬 탐험가", ISFJ:"안정형 여행 아카이버", ISTJ:"정밀형 여행 기록자", ISTP:"실전형 장면 포착가" }

function ResultContent(){
  const searchParams=useSearchParams(); const type=(searchParams.get("type")||"ENFP").toUpperCase(); const resultId=searchParams.get("id")||undefined; const label=LABEL_BY_TYPE[type]||"여행 기록 탐험가"
  return <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950 py-8"><main className="container max-w-4xl mx-auto px-4"><Card className="border-0 shadow-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur"><CardContent className="p-8 text-center space-y-6"><h1 className="text-3xl md:text-4xl font-bold">{label} ({type})</h1><p className="text-muted-foreground">여행의 핵심 순간을 자신만의 방식으로 기록하는 타입입니다.</p><div className="grid md:grid-cols-2 gap-4 text-left"><div className="rounded-xl bg-gray-50 dark:bg-gray-900 p-4">✅ 장면 선별 감각이 뛰어남</div><div className="rounded-xl bg-gray-50 dark:bg-gray-900 p-4">✅ 스토리 흐름 구성 능력</div><div className="rounded-xl bg-gray-50 dark:bg-gray-900 p-4">✅ 분위기/정보 균형 조절</div><div className="rounded-xl bg-gray-50 dark:bg-gray-900 p-4">✅ 공유 가능한 결과물 완성</div></div><div className="flex flex-col md:flex-row gap-3 justify-center"><ShareButtons testId="travel-vlog-type" testPath="/tests/travel-vlog-type/test" resultType={type} resultId={resultId} title={`내 여행 브이로그 유형은 ${label}`} description="12문항으로 알아보는 여행 기록 성향" /><Button variant="outline" asChild><Link href="/tests/travel-vlog-type/test"><RotateCcw className="h-4 w-4 mr-2" /> 다시 테스트</Link></Button></div></CardContent></Card></main></div>
}

export default function Page(){ return <Suspense fallback={<div className="p-8 text-center">결과를 불러오는 중...</div>}><ResultContent/></Suspense> }
