/**
 * 소비 성향 테스트 결과 페이지
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
import { SPEND_STYLE_RESULTS } from "@/lib/data/spend-style-results"
import type { ResultType } from "@/lib/data/spend-style-results"

function ResultContent() {
  const searchParams = useSearchParams()
  const type = searchParams.get("type") || ""
  const resultId = searchParams.get("id")

  const [result, setResult] = useState<ResultType | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (type && SPEND_STYLE_RESULTS[type]) {
      setResult(SPEND_STYLE_RESULTS[type])
      setLoading(false)
    } else {
      setLoading(false)
    }
  }, [type])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">결과를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">결과를 찾을 수 없습니다.</p>
          <Link href="/tests/spend-style/test">
            <Button>다시 테스트하기</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-4">
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
            testId="spend-style"
            testPath="/tests/spend-style/test"
            resultType={result.mbti}
            resultId={resultId || undefined}
            title={`내 소비 성향은 '${result.name}(${result.mbti})' 타입`}
            description="너는 뭐야? 테스트 해보자!"
          />
        </div>

        {/* 소비 습관 특징 */}
        <Card className="mb-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl">✨ 소비 습관 특징</CardTitle>
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

        {/* 추천 소비 전략 */}
        <Card className="mb-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl">⚙️ 추천 소비 전략</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                💰 예산
              </h3>
              <ul className="space-y-1">
                {result.strategies.budget.map((item, index) => (
                  <li key={index} className="flex items-start text-gray-700 dark:text-gray-300">
                    <span className="mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                🔍 비교
              </h3>
              <ul className="space-y-1">
                {result.strategies.compare.map((item, index) => (
                  <li key={index} className="flex items-start text-gray-700 dark:text-gray-300">
                    <span className="mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                🔄 환불
              </h3>
              <ul className="space-y-1">
                {result.strategies.refund.map((item, index) => (
                  <li key={index} className="flex items-start text-gray-700 dark:text-gray-300">
                    <span className="mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            {result.strategies.subscription && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  📱 구독
                </h3>
                <ul className="space-y-1">
                  {result.strategies.subscription.map((item, index) => (
                    <li key={index} className="flex items-start text-gray-700 dark:text-gray-300">
                      <span className="mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 유의할 함정/오해 */}
        <Card className="mb-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl">⚠️ 유의할 함정/오해</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result.pitfalls.map((pitfall, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span className="text-gray-700 dark:text-gray-300">{pitfall}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* 추천 체크리스트 */}
        <Card className="mb-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl">✅ 추천 체크리스트 (구매 전 3단계)</CardTitle>
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
                충동구매를 줄이려면 무엇부터 시작해야 하나요?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                장바구니에 담고 24시간 후에 다시 확인하는 룰을 만들어보세요. 테스트 결과에서 제시하는 각 유형별 충동구매 방지 전략을 참고할 수 있습니다.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                구독 서비스를 합리적으로 관리하는 간단한 기준이 있나요?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                월별 사용률을 체크하고, 3개월 이상 사용하지 않은 구독은 해지하는 것이 좋습니다. 테스트 결과에서 추천하는 구독 관리 전략을 확인하세요.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                가격과 가치를 함께 비교하는 빠른 방법이 있나요?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                단순 가격 비교보다는 총 소유 비용(TCO)과 사용 기간을 고려하는 것이 좋습니다. 테스트 결과에서 각 유형별 가격/가치 비교 전략을 참고하세요.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* CTA 버튼 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link href="/tests/spend-style/test">
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

export default function SpendStyleResult() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">로딩 중...</p>
          </div>
        </div>
      }
    >
      <ResultContent />
    </Suspense>
  )
}

