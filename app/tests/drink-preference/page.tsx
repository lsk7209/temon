import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { JsonLd } from "@/components/json-ld"
import { FAQSection } from "@/components/faq-section"
import { AnswerEngineSection } from "@/components/answer-engine-section"
import { LandingConversionSection } from "@/components/landing-conversion-section"
import { RelatedTestsSection } from "@/components/related-tests-section"
import { generateQuizMetadata, generateQuizSchemas } from "@/lib/quiz-seo-utils"
import { getTopicQuizFAQs } from "@/lib/quiz-topic-copy"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Coffee, Sparkles } from "lucide-react"

// Naver-optimized description (under 80 chars)
const shortDescription = "음료 고르는 기준과 선호도로 16유형 성향을 분석합니다. 음료 한 잔에 내 성격이. 12문항, 결과 공유 이미지 자동 생성."
// Full description for Google/AI
const fullDescription = "음료 고르는 기준과 선호도로 16유형 성향을 분석합니다. 음료 한 잔에 내 성격이. 12문항, 결과 공유 이미지 자동 생성."

export const metadata: Metadata = generateQuizMetadata({
  quizId: "drink-preference",
  title: "음료 선택 스타일 테스트",
  shortDescription,
  fullDescription,
  keywords: "음료 테스트, 음료 취향, 선택, 성향 테스트, 심리테스트, 무료 테스트",
  canonical: "/tests/drink-preference",
  questionCount: 12,
  duration: "PT3M",
})

const faqs = [
  ...getTopicQuizFAQs("음료 선택 스타일 테스트"),
]

export default function DrinkPreferenceIntro() {
  const schemas = generateQuizSchemas({
    quizId: "drink-preference",
    title: "음료 선택 스타일 테스트",
    shortDescription,
    fullDescription,
    keywords: "음료 테스트, 음료 취향, 선택, 성향 테스트, 심리테스트, 무료 테스트",
    canonical: "/tests/drink-preference",
    questionCount: 12,
    duration: "PT3M",
    faqs,
  })

  return (
    <>
      {/* Structured Data for SEO/GEO */}
      <JsonLd id="drink-preference-quiz-schema" data={schemas.quiz} />
      <JsonLd id="drink-preference-breadcrumb-schema" data={schemas.breadcrumb} />
      {schemas.faq && <JsonLd id="drink-preference-faq-schema" data={schemas.faq} />}

      <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950">
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="text-center space-y-8">
          <div className="relative mx-auto w-32 h-32 mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full animate-pulse" />
            <div className="absolute inset-2 bg-gradient-to-br from-blue-200 to-cyan-300 rounded-full flex items-center justify-center">
              <span className="text-4xl animate-bounce">🥤</span>
            </div>
            <div className="absolute -top-6 -left-6 text-lg animate-bounce" style={{ animationDelay: "0.5s" }}>
              ☕
            </div>
            <div className="absolute -top-4 -right-8 text-lg animate-bounce" style={{ animationDelay: "1s" }}>
              🍹
            </div>
            <div className="absolute -bottom-6 -left-8 text-lg animate-bounce" style={{ animationDelay: "1.5s" }}>
              🥛
            </div>
            <div className="absolute -bottom-4 -right-6 text-lg animate-bounce" style={{ animationDelay: "2s" }}>
              🧃
            </div>
          </div>

          <div className="space-y-6">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              🥤 NEW 테스트
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                음료 선택 스타일로 보는
              </span>
              <br />
              <span className="text-foreground">나의 선택 패턴 🥤</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              음료 고르는 기준과 선호도로 16유형 분석. 12문항, 약 3분 소요.
            </p>

            <div className="flex justify-center items-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>8,478명 참여</span>
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
                className="h-16 px-12 text-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link href="/tests/drink-preference/test">
                  <span className="text-2xl mr-3">🥤</span>
                  테스트 시작하기
                </Link>
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                무료 • 회원가입 불필요 • 16가지 음료 선택 스타일 분석
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 space-y-12">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold flex items-center justify-center space-x-2">
                  <Coffee className="h-6 w-6 text-blue-500" />
                  <span>이런 질문들이 나와요!</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <p className="font-medium">1. 음료 선택 방식은?</p>
                      <p className="text-sm text-muted-foreground mt-1">미리 정하기 vs 그때그때</p>
                    </div>
                    <div className="p-4 bg-cyan-50 dark:bg-cyan-950 rounded-lg">
                      <p className="font-medium">2. 음료 선택 기준은?</p>
                      <p className="text-sm text-muted-foreground mt-1">익숙한 음료 vs 새로운 음료</p>
                    </div>
                    <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <p className="font-medium">3. 음료 선택 시간은?</p>
                      <p className="text-sm text-muted-foreground mt-1">여유롭게 vs 빠르게</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-cyan-50 dark:bg-cyan-950 rounded-lg">
                      <p className="font-medium">4. 음료 선택 분위기는?</p>
                      <p className="text-sm text-muted-foreground mt-1">혼자 vs 함께</p>
                    </div>
                    <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <p className="font-medium">5. 음료 선택 이유는?</p>
                      <p className="text-sm text-muted-foreground mt-1">감성 vs 실용</p>
                    </div>
                    <div className="p-4 bg-cyan-50 dark:bg-cyan-950 rounded-lg">
                      <p className="font-medium">6. 음료 마시는 방식은?</p>
                      <p className="text-sm text-muted-foreground mt-1">천천히 vs 빠르게</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      
        <div className="mt-12">
          <AnswerEngineSection quizTitle="Drink Preference Test" />
        </div>

        <div className="mt-12">
          <LandingConversionSection quizTitle="Drink Preference Test" />
        </div>

        <div className="mt-12">
          <RelatedTestsSection testId="drink-preference" title="Next Quizzes Search Visitors Usually Click" />
        </div>

        {/* FAQ Section for AI Bot Optimization */}
        <section className="mt-12 mb-8">
          <FAQSection faqs={faqs} title="음료 선택 스타일 테스트 자주 묻는 질문" />
        </section>
</main>
    </div>
    </>
  )
}
