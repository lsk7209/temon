"use client"

import Link from "next/link"
import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShareButtons } from "@/components/share-buttons"

export interface MbtiResultData {
  mbti: string
  name: string
  summary: string
  traits: string[]
  presets: Record<string, string[]>
  pitfalls: string[]
  recommend: string[]
}

interface MbtiResultPageProps {
  testId: string
  title: string
  results: Record<string, MbtiResultData>
  gradientClass: string
}

function PresetSection({ presets }: { presets: Record<string, string[]> }) {
  return (
    <div className="space-y-4">
      {Object.entries(presets).map(([key, values]) => (
        <div key={key}>
          <h3 className="text-lg font-semibold mb-2">{key}</h3>
          <ul className="space-y-1">
            {values.map((value, index) => (
              <li key={index} className="flex items-start text-gray-700 dark:text-gray-300">
                <span className="mr-2">•</span>
                <span>{value}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

function ResultContent({ testId, title, results, gradientClass }: MbtiResultPageProps) {
  const searchParams = useSearchParams()
  const type = (searchParams.get("type") || "").toUpperCase()
  const resultId = searchParams.get("id")

  const [result, setResult] = useState<MbtiResultData | null>(null)

  useEffect(() => {
    if (type && results[type]) {
      setResult(results[type])
      return
    }

    setResult(null)
  }, [results, type])

  if (!result) {
    return (
      <div className={`min-h-screen ${gradientClass} flex items-center justify-center`}>
        <div className="text-center">
          <p className="text-gray-700 dark:text-gray-300 mb-4">결과를 찾을 수 없습니다.</p>
          <Link href={`/tests/${testId}/test`}>
            <Button>다시 테스트하기</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${gradientClass}`}>
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{result.name}</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">{result.summary}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">유형: {result.mbti}</p>
        </div>

        <div className="mb-8 flex justify-center">
          <ShareButtons
            testId={testId}
            testPath={`/tests/${testId}/test`}
            resultType={result.mbti}
            resultId={resultId || undefined}
            title={`${title} 결과: ${result.name} (${result.mbti})`}
            description="너의 결과도 확인해보자!"
          />
        </div>

        <Card className="mb-6 bg-white/90 dark:bg-gray-800/90">
          <CardHeader>
            <CardTitle>✨ 주요 특징</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result.traits.map((trait, index) => (
                <li key={index} className="flex items-start text-gray-700 dark:text-gray-300">
                  <span className="mr-2">•</span>
                  <span>{trait}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6 bg-white/90 dark:bg-gray-800/90">
          <CardHeader>
            <CardTitle>🧩 세부 분석</CardTitle>
          </CardHeader>
          <CardContent>
            <PresetSection presets={result.presets} />
          </CardContent>
        </Card>

        <Card className="mb-8 bg-white/90 dark:bg-gray-800/90">
          <CardHeader>
            <CardTitle>🤝 궁합 및 주의 유형</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-1">잘 맞는 유형</h3>
              <p className="text-gray-700 dark:text-gray-300">{result.recommend.join(", ") || "-"}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">주의할 유형</h3>
              <p className="text-gray-700 dark:text-gray-300">{result.pitfalls.join(", ") || "-"}</p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center space-x-3">
          <Link href={`/tests/${testId}/test`}>
            <Button variant="outline">
              <RotateCcw className="h-4 w-4 mr-2" />
              다시 테스트하기
            </Button>
          </Link>
          <Link href={`/tests/${testId}`}>
            <Button>인트로로 돌아가기</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export function MbtiResultPage(props: MbtiResultPageProps) {
  return (
    <Suspense
      fallback={
        <div className={`min-h-screen ${props.gradientClass} flex items-center justify-center`}>
          <div className="text-center text-gray-600 dark:text-gray-400">결과를 불러오는 중...</div>
        </div>
      }
    >
      <ResultContent {...props} />
    </Suspense>
  )
}
