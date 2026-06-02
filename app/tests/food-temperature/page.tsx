import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { JsonLd } from "@/components/json-ld"
import { FAQSection } from "@/components/faq-section"
import { AnswerEngineSection } from "@/components/answer-engine-section"
import { LandingConversionSection } from "@/components/landing-conversion-section"
import { RelatedTestsSection } from "@/components/related-tests-section"
import { GscLandingBoost } from "@/components/gsc-landing-boost"
import { generateQuizMetadata, generateQuizSchemas } from "@/lib/quiz-seo-utils"
import { getTopicQuizFAQs } from "@/lib/quiz-topic-copy"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Thermometer } from "lucide-react"

// Naver-optimized description (under 80 chars)
const shortDescription = "음식 온도 선호도 테스트로 뜨거운 음식파·차가운 음식파 성향을 확인하세요."
// Full description for Google/AI
const fullDescription = "음식 온도 선호도 테스트로 뜨거운 음식과 차가운 음식 중 어떤 선택을 더 편하게 느끼는지 확인하세요. 12문항으로 16가지 음식 온도 취향 유형을 무료로 제공합니다."

export const metadata: Metadata = generateQuizMetadata({
  quizId: "food-temperature",
  title: "음식 온도 선호도 테스트",
  shortDescription,
  fullDescription,
  keywords: "음식 온도 선호도 테스트, 음식 온도 테스트, 뜨거운 음식 테스트, 차가운 음식 테스트, 음식 취향 테스트, 성향 테스트, 무료 테스트",
  canonical: "/tests/food-temperature",
  questionCount: 12,
  duration: "PT3M",
})

const faqs = [
  ...getTopicQuizFAQs("음식 온도 선호도 테스트"),
]

const gscGuides = [
  {
    title: "음식 온도 테스트 검색",
    description:
      "뜨거운 국물, 차가운 음료, 계절별 메뉴처럼 음식 온도를 고르는 기준을 확인합니다.",
  },
  {
    title: "뜨거운 음식파와 차가운 음식파",
    description:
      "따뜻함과 안정감을 선호하는지, 시원함과 산뜻함을 선호하는지 상황별 선택으로 나눕니다.",
  },
  {
    title: "음식 취향 유형 정리",
    description:
      "결과는 입맛을 평가하지 않고 온도 선택에서 반복되는 취향 패턴을 가볍게 설명합니다.",
  },
]

export default function FoodTemperatureIntro() {
  const schemas = generateQuizSchemas({
    quizId: "food-temperature",
    title: "음식 온도 선호도 테스트",
    shortDescription,
    fullDescription,
    keywords: "음식 온도 선호도 테스트, 음식 온도 테스트, 뜨거운 음식 테스트, 차가운 음식 테스트, 음식 취향 테스트, 성향 테스트, 무료 테스트",
    canonical: "/tests/food-temperature",
    questionCount: 12,
    duration: "PT3M",
    faqs,
  })

  return (
    <>
      {/* Structured Data for SEO/GEO */}
      <JsonLd id="food-temperature-quiz-schema" data={schemas.quiz} />
      <JsonLd id="food-temperature-breadcrumb-schema" data={schemas.breadcrumb} />
      {schemas.faq && <JsonLd id="food-temperature-faq-schema" data={schemas.faq} />}

      <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950">
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="text-center space-y-8">
          <div className="relative mx-auto w-32 h-32 mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-blue-500 rounded-full animate-pulse" />
            <div className="absolute inset-2 bg-gradient-to-br from-red-200 to-blue-300 rounded-full flex items-center justify-center">
              <span className="text-4xl animate-bounce">🌡️</span>
            </div>
            <div className="absolute -top-6 -left-6 text-lg animate-bounce" style={{ animationDelay: "0.5s" }}>
              🔥
            </div>
            <div className="absolute -top-4 -right-8 text-lg animate-bounce" style={{ animationDelay: "1s" }}>
              ❄️
            </div>
            <div className="absolute -bottom-6 -left-8 text-lg animate-bounce" style={{ animationDelay: "1.5s" }}>
              🍲
            </div>
            <div className="absolute -bottom-4 -right-6 text-lg animate-bounce" style={{ animationDelay: "2s" }}>
              🍧
            </div>
          </div>

          <div className="space-y-6">
            <Badge variant="secondary" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
              🌡️ NEW 테스트
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
                음식 온도 선호도로 보는
              </span>
              <br />
              <span className="text-foreground">나의 선택 패턴 🌡️</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              뜨거운 음식 vs 차가운 음식 선호로 16유형 분석. 12문항, 약 3분 소요.
            </p>

            <div className="flex justify-center items-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>9,651명 참여</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>3분 소요</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>12문항</span>
              </div>
            </div>

            <div className="space-y-4">
              <Button
                size="lg"
                className="h-16 px-12 text-xl bg-gradient-to-r from-red-500 to-blue-500 hover:from-red-600 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link href="/tests/food-temperature/test">
                  <span className="text-2xl mr-3">🌡️</span>
                  테스트 시작하기
                </Link>
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                무료 • 회원가입 불필요 • 16가지 온도 스타일 분석
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 space-y-12">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold flex items-center justify-center space-x-2">
                  <Thermometer className="h-6 w-6 text-red-500" />
                  <span>이런 질문들이 나와요!</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-4">
                    <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg">
                      <p className="font-medium">1. 국물 음식 선호는?</p>
                      <p className="text-sm text-slate-700 dark:text-slate-200 mt-1">뜨거운 국물 vs 차가운 국물</p>
                    </div>
                    <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <p className="font-medium">2. 음료 선택은?</p>
                      <p className="text-sm text-slate-700 dark:text-slate-200 mt-1">뜨거운 음료 vs 차가운 음료</p>
                    </div>
                    <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg">
                      <p className="font-medium">3. 계절별 선호는?</p>
                      <p className="text-sm text-slate-700 dark:text-slate-200 mt-1">계절 무관 vs 계절 따라</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <p className="font-medium">4. 식사 시작은?</p>
                      <p className="text-sm text-slate-700 dark:text-slate-200 mt-1">뜨거운 것부터 vs 차가운 것부터</p>
                    </div>
                    <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg">
                      <p className="font-medium">5. 온도 선택 이유는?</p>
                      <p className="text-sm text-slate-700 dark:text-slate-200 mt-1">감성 vs 실용</p>
                    </div>
                    <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <p className="font-medium">6. 온도 변화는?</p>
                      <p className="text-sm text-slate-700 dark:text-slate-200 mt-1">즉시 vs 천천히</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      
        <div className="mt-12">
          <GscLandingBoost
            title="음식 온도 선호도 테스트로 보는 입맛 기준"
            summary="음식 온도 선호도 테스트는 음식 온도 테스트, 뜨거운 음식 테스트, 차가운 음식 테스트를 찾는 검색 의도에 맞춘 무료 성향 테스트입니다. 국물, 음료, 계절 메뉴, 식사 시작 방식의 선택을 바탕으로 16가지 음식 온도 취향 유형을 보여줍니다."
            guides={gscGuides}
            relatedLinks={[
              { href: "/tests/food-timing", label: "식사 시간대 테스트" },
              { href: "/tests/soup-vs-bibim", label: "국물 vs 비빔 테스트" },
              { href: "/tests/food-spiciness", label: "매운맛 취향 테스트" },
            ]}
            tone="red"
          />
        </div>

        <div className="mt-12">
          <AnswerEngineSection quizTitle="Food Temperature Test" />
        </div>

        <div className="mt-12">
          <LandingConversionSection quizTitle="Food Temperature Test" />
        </div>

        <div className="mt-12">
          <RelatedTestsSection testId="food-temperature" />
        </div>

        {/* FAQ Section for AI Bot Optimization */}
        <section className="mt-12 mb-8">
          <FAQSection faqs={faqs} title="음식 온도 선호도 테스트 자주 묻는 질문" />
        </section>
</main>
    </div>
    </>
  )
}
