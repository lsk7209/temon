import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { JsonLd } from "@/components/json-ld"
import { FAQSection } from "@/components/faq-section"
import { GscLandingBoost } from "@/components/gsc-landing-boost"
import { AnswerEngineSection } from "@/components/answer-engine-section"
import { LandingConversionSection } from "@/components/landing-conversion-section"
import { RelatedTestsSection } from "@/components/related-tests-section"
import { generateQuizMetadata, generateQuizSchemas } from "@/lib/quiz-seo-utils"
import { getTopicQuizFAQs } from "@/lib/quiz-topic-copy"
import { Card, CardContent } from "@/components/ui/card"
import { Building2 } from "lucide-react"

// Naver-optimized description (under 80 chars)
const shortDescription = "매장 선택 스타일로 알아보는 나의 성격 유형 테스트"
// Full description for Google/AI
const fullDescription = "매장 선택 스타일 테스트로 알아보는 나의 성격! 12개의 질문으로 16가지 유형 중 당신은 어떤 유형일까요? 재미있는 매장 선택 스타일 테스트를 지금 바로 무료로 시작해보세요."

export const metadata: Metadata = generateQuizMetadata({
  quizId: "store-choice",
  title: "매장 선택 스타일 테스트",
  shortDescription,
  fullDescription,
  keywords: "매장 선택 스타일 테스트, 성격 테스트, MBTI, 심리테스트, 무료 테스트",
  canonical: "/tests/store-choice",
  questionCount: 12,
  duration: "PT3M",
})

const faqs = [
  ...getTopicQuizFAQs("매장 선택 스타일 테스트"),
]

export default function StoreChoicePage() {
  const schemas = generateQuizSchemas({
    quizId: "store-choice",
    title: "매장 선택 스타일 테스트",
    shortDescription,
    fullDescription,
    keywords: "매장 선택 스타일 테스트, 성격 테스트, MBTI, 심리테스트, 무료 테스트",
    canonical: "/tests/store-choice",
    questionCount: 12,
    duration: "PT3M",
    faqs,
  })

  return (
    <>
      {/* Structured Data for SEO/GEO */}
      <JsonLd id="store-choice-quiz-schema" data={schemas.quiz} />
      <JsonLd id="store-choice-breadcrumb-schema" data={schemas.breadcrumb} />
      {schemas.faq && <JsonLd id="store-choice-faq-schema" data={schemas.faq} />}

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <main className="container max-w-4xl mx-auto px-4 py-16">
        <Card className="border-0 shadow-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur">
          <CardContent className="p-8 md:p-12 text-center space-y-8">
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-rose-400 flex items-center justify-center shadow-lg">
                <Building2 className="h-12 w-12 text-white" />
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
                🏬 매장 선택 스타일 테스트
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                매장 선택 스타일로 알아보는 나의 성격 유형
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 py-8">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-purple-600">12문항</div>
                <div className="text-sm text-muted-foreground">간단한 질문</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-pink-600">약 3분</div>
                <div className="text-sm text-muted-foreground">소요 시간</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-rose-600">16유형</div>
                <div className="text-sm text-muted-foreground">결과 분석</div>
              </div>
            </div>

            <div className="pt-8">
              <Button asChild size="lg" className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 hover:from-purple-600 hover:via-pink-600 hover:to-rose-600 text-white text-lg px-8 py-6">
                <Link href="/tests/store-choice/test">테스트 시작하기</Link>
              </Button>
            </div>

            <div className="pt-8 text-left space-y-4">
              <h2 className="text-2xl font-bold">이 테스트는?</h2>
              <p className="text-muted-foreground leading-relaxed">
                매장 선택 스타일과 선택 방식을 선택하는 패턴, 매장을 즐기는 스타일을 통해 당신의 성격 유형을 분석합니다. 
                매장 선택 스타일은 외향성, 내향성, 감성, 논리성 등 다양한 성격 특성을 반영합니다.
              </p>
            </div>
          </CardContent>
        </Card>
      
        <div className="mt-12">
          <GscLandingBoost
            title="매장 선택 테스트로 보는 선택 기준"
            summary="매장 선택 테스트는 어디서 사고 먹고 머무를지 고르는 기준을 통해 소비 성향과 결정 방식을 확인하는 무료 성격 테스트입니다. 익숙한 매장을 고르는지, 분위기와 동선을 보는지, 가격과 효율을 우선하는지에 따라 나의 선택 패턴을 정리합니다."
            guides={[
              {
                title: "선택 기준 파악",
                description:
                  "가격, 위치, 분위기, 익숙함 중 어떤 요소를 먼저 보는지 확인합니다.",
              },
              {
                title: "소비 성향 비교",
                description:
                  "실용적인 선택과 감각적인 선택의 비중을 결과 유형으로 비교할 수 있습니다.",
              },
              {
                title: "일상 의사결정 참고",
                description:
                  "매장 선택처럼 자주 반복되는 선택에서 나오는 습관을 가볍게 점검합니다.",
              },
            ]}
            relatedLinks={[
              { href: "/tests/restaurant-choice", label: "식당 선택 테스트" },
              { href: "/tests/cafe-style", label: "카페 취향 테스트" },
              { href: "/tests/convenience-snack", label: "편의점 간식 테스트" },
            ]}
            tone="pink"
          />
        </div>

        <div className="mt-12">
          <AnswerEngineSection quizTitle="Store Choice Test" />
        </div>

        <div className="mt-12">
          <LandingConversionSection quizTitle="Store Choice Test" />
        </div>

        <div className="mt-12">
          <RelatedTestsSection testId="store-choice" />
        </div>

        {/* FAQ Section for AI Bot Optimization */}
        <section className="mt-12 mb-8">
          <FAQSection faqs={faqs} title="매장 선택 스타일 테스트 자주 묻는 질문" />
        </section>
</main>
    </div>
    </>
  )
}
