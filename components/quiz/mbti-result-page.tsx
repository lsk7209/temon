"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { RotateCcw } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShareButtons } from "@/components/share-buttons"
import { useResolvedResultType } from "@/hooks/use-resolved-result-type"
import { JsonLd, createFAQSchema } from "@/components/json-ld"
import { getDefaultResultFAQs } from "@/lib/quiz-seo-utils"

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
    `${result.name} types do better when they keep one clear decision rule instead of reacting randomly.`,
    `If your result is ${result.mbti}, compare your last three choices and look for the repeat pattern.`,
    `Use this result as a preference map, not a fixed label. Your context still changes the outcome.`,
  ]
}

function buildFaqItems(result: MbtiResultRecord) {
  return [
    {
      question: `What does ${result.mbti} mean in this test?`,
      answer: `${result.mbti} summarizes the preference pattern this quiz detected from your choices. It reflects tendencies, not a strict identity label.`,
    },
    {
      question: "Can the result change if I retake the quiz?",
      answer: "Yes. If your mood, context, or decision criteria change, the result can also change. That is useful signal, not an error.",
    },
    {
      question: "How should I use this result?",
      answer: `Use ${result.name} as a quick guide for habits, strengths, and blind spots. The best use is to compare it with your real behavior over time.`,
    },
  ]
}

function ResultPageContent({ testId, testPath, results, theme }: MbtiResultPageProps) {
  const searchParams = useSearchParams()
  const type = searchParams.get("type")
  const resultId = searchParams.get("id")
  const { resolvedType, loading } = useResolvedResultType(Object.keys(results), type, resultId)
  const result = resolvedType ? results[resolvedType] : null
  const practicalTips = result ? buildPracticalTips(result) : []
  const faqItems = result ? buildFaqItems(result) : []
  const resultFaqSchema = result ? createFAQSchema(getDefaultResultFAQs(testId, result.name)) : null

  if (loading) {
    return (
      <div className={`min-h-screen ${theme.page} flex items-center justify-center`}>
        <div className="text-center">
          <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${theme.spinner} mx-auto mb-4`} />
          <p className="text-gray-600 dark:text-gray-400">Loading result...</p>
        </div>
      </div>
    )
  }

  if (!result) {
    return (
      <div className={`min-h-screen ${theme.page} flex items-center justify-center`}>
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">Result not found.</p>
          <Link href={testPath}>
            <Button>Try again</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${theme.page}`}>
      {resultFaqSchema && <JsonLd id={`${testId}-result-faq-schema`} data={resultFaqSchema} />}
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className={`inline-block px-6 py-3 bg-gradient-to-r ${theme.accent} rounded-full mb-4`}>
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
            resultId={resultId || undefined}
            title={`${result.name} (${result.mbti})`}
            description={result.summary}
          />
        </div>

        <Card className="mb-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl">Traits</CardTitle>
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
              <CardTitle className="text-2xl">Watchouts</CardTitle>
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
              <CardTitle className="text-2xl">Best Match</CardTitle>
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

        <Card className="mb-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl">How To Use This Result</CardTitle>
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
            <CardTitle className="text-2xl">FAQ</CardTitle>
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
            <CardTitle className="text-2xl">Keep Exploring</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-3">
            <Link href={testPath} className="flex-1">
              <Button variant="outline" className="w-full">
                Retake this quiz
              </Button>
            </Link>
            <Link href="/tests" className="flex-1">
              <Button variant="outline" className="w-full">
                Browse more tests
              </Button>
            </Link>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link href={testPath}>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              <RotateCcw className="mr-2 h-4 w-4" />
              Retry test
            </Button>
          </Link>
          <Link href="/tests">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              View other tests
            </Button>
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
        <div className={`min-h-screen ${props.theme.page} flex items-center justify-center`}>
          <div className="text-center">
            <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${props.theme.spinner} mx-auto mb-4`} />
            <p className="text-gray-600 dark:text-gray-400">Loading...</p>
          </div>
        </div>
      }
    >
      <ResultPageContent {...props} />
    </Suspense>
  )
}
