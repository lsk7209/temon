"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShareButtons } from "@/components/share-buttons"
import { CheckCircle2, Copy, Home, RotateCcw } from "lucide-react"

interface ResultShape {
  mbti: string
  name: string
  summary: string
  traits: string[]
  presets: Record<string, string[]>
  pitfalls: string[]
  recommend: string[]
}

interface MBTIResultPageProps {
  testId: string
  title: string
  results: Record<string, ResultShape>
  accentClass?: string
  gradientClass?: string
}

function toKoreanLabel(key: string): string {
  const labels: Record<string, string> = {
    role: "역할",
    item: "필수 아이템",
    fate: "예상 결말",
    plate: "플레이트 스타일",
    mustEat: "필수 메뉴",
    habit: "습관",
    style: "스타일",
    tip: "실행 팁",
    symbol: "상징 키워드",
    skill: "주요 스킬",
    weakness: "약점",
    status: "현재 상태",
    recovery: "회복 루틴",
    warning: "주의 포인트",
  }

  return labels[key] || key
}

function MBTIResultContent({
  testId,
  title,
  results,
  accentClass = "text-indigo-600",
  gradientClass = "from-indigo-50 to-purple-50",
}: MBTIResultPageProps) {
  const searchParams = useSearchParams()
  const [copied, setCopied] = useState(false)

  const type = searchParams.get("type") || ""
  const resultId = searchParams.get("id") || undefined

  const selectedType = useMemo(
    () => (results[type] ? type : Object.keys(results)[0]),
    [results, type],
  )
  const result = results[selectedType]

  const shareUrl = useMemo(() => {
    if (typeof window !== "undefined") return window.location.href
    return `https://www.temon.kr/tests/${testId}/test/result?type=${selectedType}${resultId ? `&id=${resultId}` : ""}`
  }, [testId, selectedType, resultId])

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // noop
    }
  }

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div>
          <p className="text-lg text-muted-foreground mb-4">결과 데이터를 불러오지 못했어요.</p>
          <Link href={`/tests/${testId}`}>
            <Button>테스트로 돌아가기</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${gradientClass} py-8`}>
      <div className="container mx-auto px-4 max-w-5xl space-y-6">
        <Card className="rounded-2xl shadow-xl border-0">
          <CardHeader className="text-center space-y-3">
            <Badge variant="secondary" className="mx-auto text-sm">
              {result.mbti}
            </Badge>
            <CardTitle className="text-3xl md:text-4xl">{result.name}</CardTitle>
            <p className={`text-lg md:text-xl font-medium ${accentClass}`}>{result.summary}</p>
            <p className="text-sm text-muted-foreground">{title} 결과</p>

            <div className="flex flex-wrap gap-3 justify-center pt-2">
              <Link href={`/tests/${testId}/test`}>
                <Button variant="outline" size="sm">
                  <RotateCcw className="h-4 w-4 mr-1" />
                  다시 테스트
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={handleCopyLink}>
                {copied ? <CheckCircle2 className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                {copied ? "복사됨" : "링크 복사"}
              </Button>
              <Link href="/">
                <Button size="sm">
                  <Home className="h-4 w-4 mr-1" />
                  다른 테스트
                </Button>
              </Link>
            </div>
          </CardHeader>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="rounded-2xl shadow-lg">
            <CardHeader>
              <CardTitle>✨ 핵심 특징</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {result.traits.map((trait) => (
                <Badge key={trait} variant="outline">
                  {trait}
                </Badge>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-lg">
            <CardHeader>
              <CardTitle>🤝 궁합 가이드</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-semibold mb-2">추천 궁합</p>
                <div className="flex flex-wrap gap-2">
                  {result.recommend.map((t) => (
                    <Badge key={t} className="bg-emerald-600">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold mb-2">주의 궁합</p>
                <div className="flex flex-wrap gap-2">
                  {result.pitfalls.map((t) => (
                    <Badge key={t} variant="destructive">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="rounded-2xl shadow-lg">
          <CardHeader>
            <CardTitle>📋 유형별 상세 가이드</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
            {Object.entries(result.presets).map(([key, values]) => (
              <div key={key}>
                <h3 className="font-semibold mb-2">{toKoreanLabel(key)}</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                  {values.map((v) => (
                    <li key={v}>{v}</li>
                  ))}
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-lg">
          <CardHeader>
            <CardTitle>📢 결과 공유하기</CardTitle>
          </CardHeader>
          <CardContent>
            <ShareButtons
              testId={testId}
              testPath={testId}
              resultType={selectedType}
              resultId={resultId}
              title={`${title} - ${result.name}`}
              description={result.summary}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export function MBTIResultPage(props: MBTIResultPageProps) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">결과 불러오는 중...</div>}>
      <MBTIResultContent {...props} />
    </Suspense>
  )
}
