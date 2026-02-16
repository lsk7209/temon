"use client"

import { Suspense, useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { RotateCcw } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShareButtons } from "@/components/share-buttons"

export interface MbtiResultTemplateItem {
  mbti: string
  name: string
  summary: string
  traits: string[]
  presets?: Record<string, string[]>
  pitfalls?: string[]
  recommend?: string[]
}

interface MbtiResultTemplateProps {
  testId: string
  testPath: string
  heading: string
  gradientClass: string
  badgeGradientClass: string
  spinnerBorderClass: string
  results: Record<string, MbtiResultTemplateItem>
  shareTitleBuilder?: (result: MbtiResultTemplateItem) => string
  presetsTitle?: string
}

function toSectionTitle(key: string) {
  const dictionary: Record<string, string> = {
    role: "역할",
    item: "추천 아이템",
    fate: "예상 결말",
    status: "현재 상태",
    recovery: "회복 루틴",
    warning: "주의 포인트",
    style: "스타일",
    strategy: "전략",
    habit: "습관",
  }

  return dictionary[key] || key
}

function ResultInner({
  testId,
  testPath,
  heading,
  gradientClass,
  badgeGradientClass,
  spinnerBorderClass,
  results,
  shareTitleBuilder,
  presetsTitle = "유형별 가이드",
}: MbtiResultTemplateProps) {
  const searchParams = useSearchParams()
  const type = searchParams.get("type") || ""
  const resultId = searchParams.get("id") || undefined

  const [result, setResult] = useState<MbtiResultTemplateItem | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (type && results[type]) {
      setResult(results[type])
    }
    setLoading(false)
  }, [type, results])

  if (loading) {
    return (
      <div className={`min-h-screen ${gradientClass} flex items-center justify-center`}>
        <div className="text-center">
          <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${spinnerBorderClass} mx-auto mb-4`} />
          <p className="text-gray-600 dark:text-gray-400">결과를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (!result) {
    return (
      <div className={`min-h-screen ${gradientClass} flex items-center justify-center`}>
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">결과를 찾을 수 없습니다.</p>
          <Link href={testPath}>
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
          <div className={`inline-block px-6 py-3 ${badgeGradientClass} rounded-full mb-4`}>
            <h1 className="text-3xl md:text-4xl font-bold text-white">{result.name}</h1>
          </div>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-2">{result.summary}</p>
          <Badge variant="outline" className="text-lg px-4 py-2">
            {result.mbti}
          </Badge>
        </div>

        <div className="mb-8 flex justify-center">
          <ShareButtons
            testId={testId}
            testPath={testPath}
            resultType={result.mbti}
            resultId={resultId}
            title={shareTitleBuilder ? shareTitleBuilder(result) : `내 ${heading} 결과는 '${result.name}(${result.mbti})' 타입`}
            description="너는 뭐야? 테스트 해보자!"
          />
        </div>

        <Card className="mb-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl">✨ 핵심 성향</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result.traits.map((trait, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span className="text-gray-700 dark:text-gray-300">{trait}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {result.presets && (
          <Card className="mb-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-2xl">⚙️ {presetsTitle}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(result.presets).map(([key, values]) => (
                <div key={key}>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">{toSectionTitle(key)}</h3>
                  <ul className="space-y-1">
                    {values.map((item, index) => (
                      <li key={index} className="flex items-start text-gray-700 dark:text-gray-300">
                        <span className="mr-2">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {result.pitfalls && result.pitfalls.length > 0 && (
          <Card className="mb-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-2xl">⚠️ 주의할 유형</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {result.pitfalls.map((mbti) => (
                  <Badge key={mbti} variant="secondary">
                    {mbti}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {result.recommend && result.recommend.length > 0 && (
          <Card className="mb-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-2xl">🤝 잘 맞는 유형</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {result.recommend.map((mbti) => (
                  <Badge key={mbti}>{mbti}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link href={testPath}>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              <RotateCcw className="mr-2 h-4 w-4" />
              다시 테스트하기
            </Button>
          </Link>
          <Link href="/tests">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              다른 테스트 보기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export function MbtiResultTemplate(props: MbtiResultTemplateProps) {
  return (
    <Suspense
      fallback={
        <div className={`min-h-screen ${props.gradientClass} flex items-center justify-center`}>
          <div className="text-center">
            <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${props.spinnerBorderClass} mx-auto mb-4`} />
            <p className="text-gray-600 dark:text-gray-400">로딩 중...</p>
          </div>
        </div>
      }
    >
      <ResultInner {...props} />
    </Suspense>
  )
}
