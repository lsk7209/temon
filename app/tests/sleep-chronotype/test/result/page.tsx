/**
 * 수면 크로노타입 테스트 결과 페이지
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
import { RelatedTestsSection } from "@/components/related-tests-section"
import { ResultFaqSchema } from "@/components/quiz/result-faq-schema"
import { SLEEP_CHRONOTYPE_RESULTS } from "@/lib/data/sleep-chronotype-results"
import { getTopicResultUseCases } from "@/lib/quiz-topic-copy"
import type { ResultType } from "@/lib/data/sleep-chronotype-results"

function ResultContent() {
  const searchParams = useSearchParams()
  const type = searchParams.get("type") || ""
  const resultId = searchParams.get("id")

  const [result, setResult] = useState<ResultType | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (type && SLEEP_CHRONOTYPE_RESULTS[type]) {
      setResult(SLEEP_CHRONOTYPE_RESULTS[type])
      setLoading(false)
    } else {
      setLoading(false)
    }
  }, [type])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">결과를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">결과를 찾을 수 없습니다.</p>
          <Link href="/tests/sleep-chronotype/test">
            <Button>다시 테스트하기</Button>
          </Link>
        </div>
      </div>
    )
  }

  const useCases = getTopicResultUseCases("Sleep Chronotype Test", result.name)

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950">
      <ResultFaqSchema quizTitle="Sleep Chronotype Test" resultName={result.name} />
      <div className="container max-w-4xl mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-4">
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
            testId="sleep-chronotype"
            testPath="/tests/sleep-chronotype/test"
            resultType={result.mbti}
            resultId={resultId || undefined}
            title={`내 수면 크로노타입은 '${result.name}(${result.mbti})' 타입`}
            description="너는 뭐야? 테스트 해보자!"
          />
        </div>

        {/* 수면 리듬 특징 */}
        <Card className="mb-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl">✨ 수면 리듬 특징</CardTitle>
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

        {/* 루틴 가이드 */}
        <Card className="mb-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl">⚙️ 루틴 가이드</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                🌅 아침
              </h3>
              <ul className="space-y-1">
                {result.routines.morning.map((item, index) => (
                  <li key={index} className="flex items-start text-gray-700 dark:text-gray-300">
                    <span className="mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                ☀️ 오후
              </h3>
              <ul className="space-y-1">
                {result.routines.afternoon.map((item, index) => (
                  <li key={index} className="flex items-start text-gray-700 dark:text-gray-300">
                    <span className="mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                🌙 저녁
              </h3>
              <ul className="space-y-1">
                {result.routines.evening.map((item, index) => (
                  <li key={index} className="flex items-start text-gray-700 dark:text-gray-300">
                    <span className="mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* 방해 요인과 대처 */}
        <Card className="mb-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl">⚠️ 방해 요인과 대처</CardTitle>
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

        {/* 7일 적용 체크리스트 */}
        <Card className="mb-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl">✅ 7일 적용 체크리스트</CardTitle>
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
                아침형·저녁형은 바꿀 수 있나요?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                완전히 바꾸기는 어렵지만, 점진적으로 조정할 수 있습니다. 테스트 결과에서 제시하는 각 유형별 루틴 가이드를 참고하여 천천히 변화를 시도해보세요.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                낮잠은 몇 분이 적당한가요?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                보통 10-20분이 적당하며, 30분을 넘기면 깊은 수면에 들어가 깨어나기 어려울 수 있습니다. 테스트 결과에서 추천하는 낮잠 시간을 확인하세요.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                카페인 컷오프는 언제가 좋나요?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                일반적으로 취침 6시간 전까지가 좋습니다. 테스트 결과에서 각 유형별 카페인 컷오프 시간을 참고하세요.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* CTA 버튼 */}
        <Card className="mb-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl">Where This Result Becomes Useful</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {useCases.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-indigo-500" />
                  <p className="text-gray-700 dark:text-gray-300">{item}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <div className="mb-8">
          <RelatedTestsSection testId="sleep-chronotype" title="More Routine Quizzes To Compare" />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link href="/tests/sleep-chronotype/test">
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

export default function SleepChronotypeResult() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">로딩 중...</p>
          </div>
        </div>
      }
    >
      <ResultContent />
    </Suspense>
  )
}

