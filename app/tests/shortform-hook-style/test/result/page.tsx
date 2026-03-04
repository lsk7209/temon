"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ShareButtons } from "@/components/share-buttons"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RotateCcw, Sparkles } from "lucide-react"

const LABEL_BY_TYPE: Record<string, string> = {
  ENFP: "밈파도 스토리텔러",
  ENFJ: "공감형 오프너 디렉터",
  ENTJ: "성과형 후킹 전략가",
  ENTP: "실험형 바이럴 메이커",
  ESFP: "하이라이트 킬러컷 장인",
  ESFJ: "커뮤니티 친화 큐레이터",
  ESTJ: "포맷 운영 매니저",
  ESTP: "순발력 돌파 크리에이터",
  INFP: "감성 카피 에디터",
  INFJ: "맥락 설계형 내러티브러",
  INTJ: "시스템형 성장 설계자",
  INTP: "분석형 CTR 연구가",
  ISFP: "무드 연출 아티스트",
  ISFJ: "안정형 브랜드 키퍼",
  ISTJ: "정밀 검수 퍼블리셔",
  ISTP: "실전형 편집 테크니션",
}

function summarizeByType(type: string) {
  const t = (type || "ENFP").toUpperCase()
  const [e, s, f, j] = t.split("")

  return {
    label: LABEL_BY_TYPE[t] || "후킹 탐험가",
    strengths: [
      e === "E" ? "트렌드 변화를 빠르게 반영해 실행한다" : "콘텐츠 톤과 맥락을 정교하게 설계한다",
      s === "S" ? "검증된 포맷을 안정적으로 재현한다" : "새로운 콘셉트와 관점을 지속 실험한다",
      f === "T" ? "데이터 중심으로 후킹 지점을 최적화한다" : "감정선 중심으로 공감도를 끌어올린다",
      j === "J" ? "체계적인 운영으로 업로드 품질을 유지한다" : "상황에 맞게 유연하게 연출을 바꾼다",
    ],
  }
}

function ResultContent() {
  const searchParams = useSearchParams()
  const type = (searchParams.get("type") || "ENFP").toUpperCase()
  const resultId = searchParams.get("id") || undefined
  const summary = summarizeByType(type)

  return (
    <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950 py-8">
      <main className="container max-w-4xl mx-auto px-4 space-y-6">
        <Card className="border-0 shadow-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur">
          <CardContent className="p-8 space-y-6">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-100 text-sm font-medium">
                <Sparkles className="h-4 w-4" /> Hook Style: {type}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">{summary.label}</h1>
              <p className="text-muted-foreground">당신은 숏폼의 첫 3초를 {type} 성향으로 설계하는 크리에이터 타입입니다.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {summary.strengths.map((s) => (
                <div key={s} className="rounded-xl bg-rose-50 dark:bg-rose-950/40 p-4 text-sm md:text-base">
                  ✅ {s}
                </div>
              ))}
            </div>

            <div className="flex flex-col md:flex-row gap-3 justify-center pt-2">
              <ShareButtons
                testId="shortform-hook-style"
                testPath="/tests/shortform-hook-style/test"
                resultType={type}
                resultId={resultId}
                title={`내 숏폼 후킹 스타일은 ${summary.label}`}
                description="12문항으로 알아보는 나의 숏폼 3초 설계 성향"
              />
              <Button variant="outline" asChild>
                <Link href="/tests/shortform-hook-style/test">
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

export default function ShortformHookStyleResultPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">결과를 불러오는 중...</div>}>
      <ResultContent />
    </Suspense>
  )
}
