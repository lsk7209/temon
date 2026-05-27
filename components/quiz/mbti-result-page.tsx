"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { RotateCcw } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShareButtons } from "@/components/share-buttons"
import { ContentToc } from "@/components/content-toc"
import { useResolvedResultType } from "@/hooks/use-resolved-result-type"
import { JsonLd, createFAQSchema } from "@/components/json-ld"
import { getTopicResultFAQs, getTopicResultUseCases } from "@/lib/quiz-topic-copy"
import { RelatedTestsSection } from "@/components/related-tests-section"

export interface MbtiResultRecord {
  mbti: string
  name: string
  summary: string
  traits: string[]
  presets?: Record<string, string[]>
  pitfalls?: string[]
  recommend?: string[]
}

interface MbtiResultPageProps {
  testId: string
  quizTitle?: string
  testPath: string
  results: Record<string, MbtiResultRecord>
  theme: {
    page: string
    accent: string
    spinner: string
  }
}

function formatSectionTitle(key: string) {
  return key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[-_]/g, " ")
    .replace(/^./, (value) => value.toUpperCase())
}

function buildPracticalTips(result: MbtiResultRecord) {
  return [
    `${result.name} 유형은 즉흥적으로 반응하기보다 한 가지 판단 기준을 정해두면 결과를 더 잘 활용할 수 있습니다.`,
    `${result.mbti} 결과가 나왔다면 최근 세 번의 선택을 떠올리고 반복되는 기준이 무엇인지 비교해보세요.`,
    "이 결과는 고정된 성격표가 아니라 지금의 선호와 습관을 읽는 지도처럼 사용하는 것이 좋습니다.",
  ]
}

const tocItems = [
  { id: "result-main", label: "결과 요약" },
  { id: "result-traits", label: "핵심 특징" },
  { id: "result-interpretation", label: "결과 해석" },
  { id: "result-faq", label: "자주 묻는 질문" },
  { id: "result-related", label: "추천 테스트" },
]

function buildInterpretationParagraphs(result: MbtiResultRecord) {
  const firstTrait = result.traits[0] || `${result.name} tends to show a stable preference pattern`
  const secondTrait = result.traits[1] || "This result usually appears when your choices are consistent across the quiz"
  const firstPitfall = result.pitfalls?.[0] || "The main blind spot is usually overusing the same strength in every situation"

  return [
    `${result.name} is best understood as a practical tendency profile. The core signal in this result is simple: ${firstTrait.toLowerCase()}. That pattern usually means you rely on familiar priorities when making quick choices.`,
    `A second reading comes from the consistency of your answers. ${secondTrait}. In other words, this result is not random. It usually appears when your preference stays stable across several different situations.`,
    `The most useful next step is to combine the strengths of ${result.name} with situational awareness. ${firstPitfall}. When you know where the pattern helps and where it can become rigid, the result becomes much more actionable.`,
  ]
}

function buildComparisonSignals(result: MbtiResultRecord) {
  const firstPresetEntry = result.presets ? Object.entries(result.presets)[0] : null
  const firstPresetLabel = firstPresetEntry ? formatSectionTitle(firstPresetEntry[0]) : "decision style"
  const firstPresetItem = firstPresetEntry?.[1]?.[0] || "a repeatable preference in everyday choices"
  const recommendation = result.recommend?.[0] || "a different type can complement your weak spots"

  return [
    `${result.name} often stands out through ${firstPresetLabel.toLowerCase()} rather than one dramatic trait.`,
    `A good clue is whether you repeatedly choose ${firstPresetItem.toLowerCase()}. If yes, this result likely matches your default habit pattern.`,
    `When comparing with nearby types, the biggest separator is usually whether ${recommendation.toLowerCase()}. That is where your result becomes more specific than a generic mood test.`,
  ]
}

function buildFaqItems(quizTitle: string, result: MbtiResultRecord) {
  return getTopicResultFAQs(quizTitle, result.name)
}

function ResultPageContent({ testId, quizTitle, testPath, results, theme }: MbtiResultPageProps) {
  const searchParams = useSearchParams()
  const type = searchParams.get("type")
  const resultId = searchParams.get("id")
  const { resolvedType, loading } = useResolvedResultType(Object.keys(results), type, resultId)
  const result = resolvedType ? results[resolvedType] : null
  const resolvedQuizTitle = quizTitle || testId
  const practicalTips = result ? buildPracticalTips(result) : []
  const interpretationParagraphs = result ? buildInterpretationParagraphs(result) : []
  const comparisonSignals = result ? buildComparisonSignals(result) : []
  const faqItems = result ? buildFaqItems(resolvedQuizTitle, result) : []
  const resultUseCases = result ? getTopicResultUseCases(resolvedQuizTitle, result.name) : []
  const resultFaqSchema = result ? createFAQSchema(getTopicResultFAQs(resolvedQuizTitle, result.name)) : null

  if (loading) {
    return (
      <div className={`min-h-screen ${theme.page} flex items-center justify-center`}>
        <div className="text-center">
          <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${theme.spinner} mx-auto mb-4`} />
          <p className="text-gray-600 dark:text-gray-400">결과 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (!result) {
    return (
      <div className={`min-h-screen ${theme.page} flex items-center justify-center`}>
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">결과를 찾을 수 없습니다.</p>
          <Link href={testPath}>
            <Button>다시 시도하기</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${theme.page}`}>
      {resultFaqSchema && <JsonLd id={`${testId}-result-faq-schema`} data={resultFaqSchema} />}
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <div id="result-main" className="text-center mb-8 scroll-mt-24">
          <div className={`inline-block px-6 py-3 bg-gradient-to-r ${theme.accent} rounded-full mb-4`}>
            <h1 className="text-3xl md:text-4xl font-bold text-white">{result.name}</h1>
          </div>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-2">{result.summary}</p>
          <Badge variant="outline" className="text-lg px-4 py-2">
            {result.mbti}
          </Badge>
        </div>

        <ContentToc items={tocItems} className="mb-8" />

        <div className="mb-8 flex justify-center">
          <ShareButtons
            testId={testId}
            testPath={testPath}
            resultType={result.mbti}
            resultId={resultId || undefined}
            title={`${result.name} (${result.mbti})`}
            description={result.summary}
          />
        </div>

        <Card id="result-traits" className="mb-6 scroll-mt-24 bg-white/90 dark:bg-gray-800/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl">핵심 특징</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result.traits.map((trait, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">-</span>
                  <span className="text-gray-700 dark:text-gray-300">{trait}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card id="result-interpretation" className="mb-6 scroll-mt-24 bg-white/90 dark:bg-gray-800/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl">실용적 해석</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {interpretationParagraphs.map((paragraph) => (
              <p key={paragraph} className="leading-relaxed text-gray-700 dark:text-gray-300">
                {paragraph}
              </p>
            ))}
          </CardContent>
        </Card>

        {result.presets &&
          Object.entries(result.presets).map(([key, items]) => (
            <Card key={key} className="mb-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-2xl">{formatSectionTitle(key)}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {items.map((item, index) => (
                    <li key={index} className="flex items-start text-gray-700 dark:text-gray-300">
                      <span className="mr-2">-</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}

        {result.pitfalls && (
          <Card className="mb-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-2xl">주의할 점</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.pitfalls.map((item, index) => (
                  <li key={index} className="flex items-start text-gray-700 dark:text-gray-300">
                    <span className="mr-2">-</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {result.recommend && (
          <Card className="mb-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-2xl">최고의 궁합</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.recommend.map((item, index) => (
                  <li key={index} className="flex items-start text-gray-700 dark:text-gray-300">
                    <span className="mr-2">-</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        <Card id="result-faq" className="mb-6 scroll-mt-24 bg-white/90 dark:bg-gray-800/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl">결과 활용법</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {practicalTips.map((item, index) => (
                <li key={index} className="flex items-start text-gray-700 dark:text-gray-300">
                  <span className="mr-2">-</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl">이 결과가 나타나는 방식</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {comparisonSignals.map((item, index) => (
                <li key={index} className="flex items-start text-gray-700 dark:text-gray-300">
                  <span className="mr-2">-</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl">이 결과가 유용한 순간</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {resultUseCases.map((item, index) => (
                <li key={index} className="flex items-start text-gray-700 dark:text-gray-300">
                  <span className="mr-2">-</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl">자주 묻는 질문</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {faqItems.map((item) => (
              <div key={item.question}>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{item.question}</h3>
                <p className="text-gray-700 dark:text-gray-300">{item.answer}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="mb-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl">더 알아보기</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-3">
            <Link href={testPath} className="flex-1">
              <Button variant="outline" className="w-full">
                <RotateCcw className="mr-2 h-4 w-4" />
                다시 테스트하기
              </Button>
            </Link>
            <Link href="/tests" className="flex-1">
              <Button variant="outline" className="w-full">
                다른 테스트 보기
              </Button>
            </Link>
          </CardContent>
        </Card>

        <div id="result-related" className="scroll-mt-24">
          <RelatedTestsSection testId={testId} title="비슷한 주제의 테스트" />
        </div>
      </div>
    </div>
  )
}

export function MbtiResultPage(props: MbtiResultPageProps) {
  return (
    <Suspense
      fallback={
        <div className={`min-h-screen ${props.theme.page} flex items-center justify-center`}>
          <div className="text-center">
            <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${props.theme.spinner} mx-auto mb-4`} />
            <p className="text-gray-600 dark:text-gray-400">불러오는 중...</p>
          </div>
        </div>
      }
    >
      <ResultPageContent {...props} />
    </Suspense>
  )
}
