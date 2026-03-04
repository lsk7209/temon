"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ShareButtons } from "@/components/share-buttons"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RotateCcw, Sparkles } from "lucide-react"

type AxisInfo = { title: string; left: string; right: string }

const AXIS: Record<string, AxisInfo> = {
  EI: { title: "소통 에너지", left: "내부 숙고형", right: "빠른 상호작용형" },
  SN: { title: "정보 처리", left: "현실 근거형", right: "가능성 탐색형" },
  TF: { title: "결정 기준", left: "논리 최적화형", right: "맥락 배려형" },
  JP: { title: "실행 방식", left: "구조 설계형", right: "유연 실험형" },
}

const LABEL_BY_TYPE: Record<string, string> = {
  ENFP: "아이디어 폭발 프롬프터",
  ENFJ: "맥락 설계 디렉터",
  ENTJ: "효율 집행 아키텍트",
  ENTP: "실험형 자동화 메이커",
  ESFP: "즉시 실행 크리에이터",
  ESFJ: "협업 친화 코디네이터",
  ESTJ: "프로세스 관리자",
  ESTP: "속도 돌파 오퍼레이터",
  INFP: "감성 큐레이션 에디터",
  INFJ: "전략형 내러티브 설계자",
  INTJ: "시스템 사고 설계자",
  INTP: "분석형 프롬프트 엔지니어",
  ISFP: "직관형 결과 연출가",
  ISFJ: "안정형 품질 수호자",
  ISTJ: "정밀 검수 관리자",
  ISTP: "실전 최적화 장인",
}

function summarizeByType(type: string) {
  const t = (type || "ENFP").toUpperCase()
  const [e, s, f, j] = t.split("")

  return {
    label: LABEL_BY_TYPE[t] || "맞춤형 프롬프트 탐험가",
    strengths: [
      e === "E" ? "짧은 반복 실험으로 빠르게 결과를 낸다" : "요청 목적과 배경을 정리해 품질을 높인다",
      s === "S" ? "현실 제약을 반영한 실무형 답변을 잘 끌어낸다" : "새로운 관점과 아이디어를 잘 확장한다",
      f === "T" ? "조건·기준을 명확히 제시해 정밀한 결과를 만든다" : "톤·독자 맥락을 반영한 결과물을 잘 만든다",
      j === "J" ? "재사용 템플릿과 체크리스트로 안정성을 확보한다" : "상황 변화에 맞춰 프롬프트를 유연하게 진화시킨다",
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-100 text-sm font-medium">
                <Sparkles className="h-4 w-4" /> AI Prompt Type: {type}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">{summary.label}</h1>
              <p className="text-muted-foreground">당신은 AI를 다룰 때 {type} 성향을 기반으로 결과 품질을 끌어올리는 타입입니다.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {summary.strengths.map((s) => (
                <div key={s} className="rounded-xl bg-violet-50 dark:bg-violet-950/40 p-4 text-sm md:text-base">
                  ✅ {s}
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(AXIS).map(([k, v]) => (
                <div key={k} className="rounded-xl border bg-white dark:bg-gray-900 p-4">
                  <div className="text-xs text-muted-foreground mb-1">{v.title}</div>
                  <div className="font-semibold">{k[0]} ↔ {k[1]}</div>
                  <div className="text-sm text-muted-foreground mt-2">{v.left} / {v.right}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col md:flex-row gap-3 justify-center pt-2">
              <ShareButtons
                testId="ai-prompt-style"
                testPath="/tests/ai-prompt-style/test"
                resultType={type}
                resultId={resultId}
                title={`내 AI 프롬프트 스타일은 ${summary.label}`}
                description="12문항으로 알아보는 AI 협업 성향 테스트"
              />
              <Button variant="outline" asChild>
                <Link href="/tests/ai-prompt-style/test">
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

export default function AiPromptStyleResultPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">결과를 불러오는 중...</div>}>
      <ResultContent />
    </Suspense>
  )
}
