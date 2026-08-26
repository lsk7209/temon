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
import { PHONE_STYLE_RESULTS } from "@/lib/data/phone-style-results"
import type { ResultType } from "@/lib/data/phone-style-results"

function ResultContent() {
  const searchParams = useSearchParams()
  const type = searchParams.get("type") || ""
  const resultId = searchParams.get("id")

  const [result, setResult] = useState<ResultType | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (type && PHONE_STYLE_RESULTS[type]) {
      setResult(PHONE_STYLE_RESULTS[type])
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
          <Link href="/tests/phone-style/test">
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
            testId="phone-style"
            testPath="/tests/phone-style/test"
            resultType={result.mbti}
            resultId={resultId || undefined}
            title={`내 스마트폰 사용 스타일은 '${result.name}(${result.mbti})' 타입`}
            description="너는 뭐야? 테스트 해보자!"
          />
        </div>

        {/* 사용 습관 특징 */}
        <Card className="mb-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl">✨ 사용 습관 특징</CardTitle>
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

        {/* 추천 설정 프리셋 */}
        <Card className="mb-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl">⚙️ 추천 설정 프리셋</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                🔔 알림
              </h3>
              <ul className="space-y-1">
                {result.presets.notifications.map((item, index) => (
                  <li key={index} className="flex items-start text-gray-700 dark:text-gray-300">
                    <span className="mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                🏠 홈화면
              </h3>
              <ul className="space-y-1">
                {result.presets.homescreen.map((item, index) => (
                  <li key={index} className="flex items-start text-gray-700 dark:text-gray-300">
                    <span className="mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                🔋 배터리
              </h3>
              <ul className="space-y-1">
                {result.presets.battery.map((item, index) => (
                  <li key={index} className="flex items-start text-gray-700 dark:text-gray-300">
                    <span className="mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            {result.presets.security && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  🔒 보안
                </h3>
                <ul className="space-y-1">
                  {result.presets.security.map((item, index) => (
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

        {/* 피해야 할 함정 */}
        <Card className="mb-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl">⚠️ 피해야 할 함정/오해</CardTitle>
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

        {/* 추천 앱 카테고리 */}
        <Card className="mb-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl">💡 추천 앱 카테고리</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {result.recommend.map((item, index) => (
                <Badge key={index} variant="secondary" className="text-sm px-3 py-1">
                  {item}
                </Badge>
              ))}
            </div>
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
                알림 피로도를 줄이려면 무엇부터 조정해야 하나요?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                중요하지 않은 앱의 알림을 먼저 끄고, 요약 알림 기능을 활용하세요. 테스트 결과에서 제시하는 각 유형별 알림 설정 가이드를 참고할 수 있습니다.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                배터리 수명에 영향을 주는 핵심 설정은 무엇인가요?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                백그라운드 앱 새로고침, 위치 서비스, 화면 밝기 자동 조절 등이 주요 요인입니다. 테스트 결과에서 추천하는 배터리 최적화 설정을 확인하세요.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                홈 화면을 효율적으로 구성하는 간단한 기준이 있나요?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                자주 사용하는 앱을 첫 페이지에 배치하고, 카테고리별로 폴더를 만들어 정리하는 것이 좋습니다. 테스트 결과에서 각 유형별 홈화면 구성 가이드를 참고하세요.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* CTA 버튼 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link href="/tests/phone-style/test">
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

export default function PhoneStyleResult() {
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
