"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShareButtons } from "@/components/share-buttons"

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
    symbol: "상징 키워드",
    skill: "주요 스킬",
    weakness: "약점",
    status: "현재 상태",
    recovery: "회복 루틴",
    warning: "주의 포인트",
  }

  return labels[key] || key
}

function MBTIResultContent({ testId, title, results, accentClass = "text-indigo-600" }: MBTIResultPageProps) {
  const searchParams = useSearchParams()
  const type = searchParams.get("type") || ""
  const resultId = searchParams.get("id") || undefined

  const selectedType = results[type] ? type : Object.keys(results)[0]
  const result = results[selectedType]

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
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <Card>
          <CardHeader className="text-center space-y-3">
            <Badge variant="secondary" className="mx-auto">{result.mbti}</Badge>
            <CardTitle className="text-3xl">{result.name}</CardTitle>
            <p className={`text-lg font-medium ${accentClass}`}>{result.summary}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">핵심 특징</h3>
              <div className="flex flex-wrap gap-2">
                {result.traits.map((trait) => (
                  <Badge key={trait} variant="outline">{trait}</Badge>
                ))}
              </div>
            </div>

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

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">조심해야 할 유형</h3>
                <div className="flex flex-wrap gap-2">
                  {result.pitfalls.map((t) => (
                    <Badge key={t} variant="destructive">{t}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">추천 궁합</h3>
                <div className="flex flex-wrap gap-2">
                  {result.recommend.map((t) => (
                    <Badge key={t} className="bg-emerald-600">{t}</Badge>
                  ))}
                </div>
              </div>
            </div>

            <ShareButtons
              testId={testId}
              testPath={testId}
              resultType={selectedType}
              resultId={resultId}
              title={`${title} - ${result.name}`}
              description={result.summary}
            />

            <div className="grid grid-cols-2 gap-3 pt-2">
              <Link href={`/tests/${testId}`}>
                <Button variant="outline" className="w-full">다시 테스트</Button>
              </Link>
              <Link href="/">
                <Button className="w-full">다른 테스트</Button>
              </Link>
            </div>
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
