/**
 * 스마트폰 사용 스타일 테스트 결과 페이지
 */

"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RotateCcw } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { ShareButtons } from "@/components/share-buttons"
import { PHONE_USAGE_RESULTS } from "@/lib/data/phone-usage-results"
import type { ResultType } from "@/lib/data/phone-usage-results"

function ResultContent() {
  const searchParams = useSearchParams()
  const type = searchParams.get("type") || ""
  const resultId = searchParams.get("id")

  const [result, setResult] = useState<ResultType | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (type && PHONE_USAGE_RESULTS[type]) {
      setResult(PHONE_USAGE_RESULTS[type])
      setLoading(false)
    } else {
      setLoading(false)
    }
  }, [type])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">결과를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">결과를 찾을 수 없습니다.</p>
          <Link href="/tests/phone-usage/test">
            <Button>다시 테스트하기</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white">{result.name}</h1>
          </div>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-2">{result.summary}</p>
          <Badge variant="outline" className="text-lg px-4 py-2">
            {result.mbti}
          </Badge>
        </div>

        {/* 공유 버튼 */}
        <div className="mb-8 flex justify-center">
          <ShareButtons
            testId="phone-usage"
            testPath="/tests/phone-usage/test"
            resultType={result.mbti}
            resultId={resultId || undefined}
            title={`내 스마트폰 사용 스타일은 '${result.name}(${result.mbti})' 타입`}
            description="너는 뭐야? 테스트 해보자!"
          />
        </div>

        {/* 사용 성향 요약 */}
        <Card className="mb-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl">✨ 사용 성향 요약</CardTitle>
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

        {/* 추천 설정값 */}
        <Card className="mb-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl">⚙️ 추천 설정값</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                🔔 알림 프로필
              </h3>
              <ul className="space-y-1">
                {result.settings.notify.map((item, index) => (
                  <li key={index} className="flex items-start text-gray-700 dark:text-gray-300">
                    <span className="mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                🏠 홈화면 구조
              </h3>
              <ul className="space-y-1">
                {result.settings.home.map((item, index) => (
                  <li key={index} className="flex items-start text-gray-700 dark:text-gray-300">
                    <span className="mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                🤖 자동화
              </h3>
              <ul className="space-y-1">
                {result.settings.auto.map((item, index) => (
                  <li key={index} className="flex items-start text-gray-700 dark:text-gray-300">
                    <span className="mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* 생산성 팁과 리스크 관리 */}
        <Card className="mb-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl">⚠️ 생산성 팁과 리스크 관리</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result.risks.map((risk, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span className="text-gray-700 dark:text-gray-300">{risk}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* 7일 실천 체크리스트 */}
        <Card className="mb-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl">✅ 7일 실천 체크리스트</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3 list-decimal list-inside">
              {result.checklist.map((item, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300">
                  {item}
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card className="mb-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl">❓ 자주 묻는 질문</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                알림을 최소화하려면 무엇부터 정리해야 하나요?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                우선순위가 낮은 앱의 알림부터 차단하고, 중요 알림만 허용하는 것이 좋습니다. 테스트 결과에서 각 유형별 알림 관리 가이드를 참고하세요.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                집중 모드 자동화 기본 원칙은 무엇인가요?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                일정이나 위치에 따라 자동으로 집중 모드가 켜지도록 설정하는 것이 효과적입니다. 테스트 결과에서 추천하는 자동화 설정을 확인하세요.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                사진·파일 정리를 주기적으로 유지하는 팁은?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                수시로 정리하거나 주기적으로 대청소하는 방식 중 자신에게 맞는 방법을 선택하세요. 테스트 결과에서 각 유형별 정리 방법을 확인할 수 있습니다.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* CTA 버튼 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link href="/tests/phone-usage/test">
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

export default function PhoneUsageResult() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">로딩 중...</p>
          </div>
        </div>
      }
    >
      <ResultContent />
    </Suspense>
  )
}

