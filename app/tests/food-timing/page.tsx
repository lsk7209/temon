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
import { Clock, Users, Timer } from "lucide-react"

// Naver-optimized description (under 80 chars)
const shortDescription = "식사 시간대 테스트로 규칙형·즉흥형 식사 루틴과 생활 패턴을 확인하세요."
// Full description for Google/AI
const fullDescription = "식사 시간대 테스트로 아침·점심·저녁을 규칙적으로 먹는지, 즉흥적으로 조절하는지 확인하세요. 12문항으로 16가지 식사 루틴 유형을 무료로 제공합니다."

export const metadata: Metadata = generateQuizMetadata({
  quizId: "food-timing",
  title: "식사 시간대 테스트",
  shortDescription,
  fullDescription,
  keywords: "식사 시간대 테스트, 식사 시간 테스트, 식사 루틴 테스트, 생활 패턴 테스트, 규칙형 테스트, 즉흥형 테스트, 무료 테스트",
  canonical: "/tests/food-timing",
  questionCount: 12,
  duration: "PT3M",
})

const faqs = [
  ...getTopicQuizFAQs("식사 시간대 테스트"),
]

const gscGuides = [
  {
    title: "식사 시간대 테스트 검색",
    description:
      "아침, 점심, 저녁을 정해진 시간에 먹는지 컨디션에 맞춰 바꾸는지 생활 패턴을 봅니다.",
  },
  {
    title: "규칙형과 즉흥형 비교",
    description:
      "일정, 배고픔, 약속, 업무 흐름 중 무엇이 식사 시간을 결정하는지 선택 질문으로 확인합니다.",
  },
  {
    title: "루틴 점검용 결과",
    description:
      "결과는 식습관 평가가 아니라 내 하루 리듬과 식사 타이밍 기준을 이해하기 위한 참고용입니다.",
  },
]

export default function FoodTimingIntro() {
  const schemas = generateQuizSchemas({
    quizId: "food-timing",
    title: "식사 시간대 테스트",
    shortDescription,
    fullDescription,
    keywords: "식사 시간대 테스트, 식사 시간 테스트, 식사 루틴 테스트, 생활 패턴 테스트, 규칙형 테스트, 즉흥형 테스트, 무료 테스트",
    canonical: "/tests/food-timing",
    questionCount: 12,
    duration: "PT3M",
    faqs,
  })

  return (
    <>
      {/* Structured Data for SEO/GEO */}
      <JsonLd id="food-timing-quiz-schema" data={schemas.quiz} />
      <JsonLd id="food-timing-breadcrumb-schema" data={schemas.breadcrumb} />
      {schemas.faq && <JsonLd id="food-timing-faq-schema" data={schemas.faq} />}

      <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950">
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="text-center space-y-8">
          <div className="relative mx-auto w-32 h-32 mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-500 rounded-full animate-pulse" />
            <div className="absolute inset-2 bg-gradient-to-br from-orange-200 to-red-300 rounded-full flex items-center justify-center">
              <span className="text-4xl animate-bounce">⏰</span>
            </div>
            <div className="absolute -top-6 -left-6 text-lg animate-bounce" style={{ animationDelay: "0.5s" }}>
              🍽️
            </div>
            <div className="absolute -top-4 -right-8 text-lg animate-bounce" style={{ animationDelay: "1s" }}>
              🕐
            </div>
            <div className="absolute -bottom-6 -left-8 text-lg animate-bounce" style={{ animationDelay: "1.5s" }}>
              📅
            </div>
            <div className="absolute -bottom-4 -right-6 text-lg animate-bounce" style={{ animationDelay: "2s" }}>
              ⏱️
            </div>
          </div>

          <div className="space-y-6">
            <Badge variant="secondary" className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
              ⏰ NEW 테스트
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                식사 시간대로 보는
              </span>
              <br />
              <span className="text-foreground">나의 선택 패턴 ⏰</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              식사 시간대와 규칙성으로 16유형 분석. 12문항, 약 3분 소요.
            </p>

            <div className="flex justify-center items-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>13,825명 참여</span>
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
                className="h-16 px-12 text-xl bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link href="/tests/food-timing/test">
                  <span className="text-2xl mr-3">⏰</span>
                  테스트 시작하기
                </Link>
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                무료 • 회원가입 불필요 • 16가지 시간대 스타일 분석
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 space-y-12">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold flex items-center justify-center space-x-2">
                  <Timer className="h-6 w-6 text-orange-500" />
                  <span>이런 질문들이 나와요!</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-4">
                    <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                      <p className="font-medium">1. 아침 식사 시간은?</p>
                      <p className="text-sm text-slate-700 dark:text-slate-200 mt-1">규칙적 vs 유연하게</p>
                    </div>
                    <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg">
                      <p className="font-medium">2. 점심 식사 시간은?</p>
                      <p className="text-sm text-slate-700 dark:text-slate-200 mt-1">정해진 시간 vs 그때그때</p>
                    </div>
                    <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                      <p className="font-medium">3. 저녁 식사 시간은?</p>
                      <p className="text-sm text-slate-700 dark:text-slate-200 mt-1">계획적 vs 즉흥적</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg">
                      <p className="font-medium">4. 식사 시간 선택 기준은?</p>
                      <p className="text-sm text-slate-700 dark:text-slate-200 mt-1">감성 vs 실용</p>
                    </div>
                    <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                      <p className="font-medium">5. 식사 시간 공유는?</p>
                      <p className="text-sm text-slate-700 dark:text-slate-200 mt-1">적극적으로 vs 조용히</p>
                    </div>
                    <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg">
                      <p className="font-medium">6. 식사 시간 변화 대처는?</p>
                      <p className="text-sm text-slate-700 dark:text-slate-200 mt-1">즉시 vs 유연하게</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      
        <div className="mt-12">
          <GscLandingBoost
            title="식사 시간대 테스트로 보는 하루 루틴"
            summary="식사 시간대 테스트는 식사 루틴 테스트, 생활 패턴 테스트, 규칙형 테스트를 찾는 검색 의도에 맞춘 무료 성향 테스트입니다. 아침·점심·저녁 타이밍과 일정 변경 반응을 바탕으로 16가지 식사 루틴 유형을 보여줍니다."
            guides={gscGuides}
            relatedLinks={[
              { href: "/tests/food-ordering", label: "주문 방식 테스트" },
              { href: "/tests/evening-meal", label: "저녁 식사 루틴 테스트" },
              { href: "/tests/breakfast-style", label: "아침 식사 스타일 테스트" },
            ]}
            tone="orange"
          />
        </div>

        <div className="mt-12">
          <AnswerEngineSection quizTitle="Food Timing Test" />
        </div>

        <div className="mt-12">
          <LandingConversionSection quizTitle="Food Timing Test" />
        </div>

        <div className="mt-12">
          <RelatedTestsSection testId="food-timing" />
        </div>

        {/* FAQ Section for AI Bot Optimization */}
        <section className="mt-12 mb-8">
          <FAQSection faqs={faqs} title="식사 시간대 테스트 자주 묻는 질문" />
        </section>
</main>
    </div>
    </>
  )
}
