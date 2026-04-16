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
import { Users } from "lucide-react"

// Naver-optimized description (under 80 chars)
const shortDescription = "음식 공유 스타일로 알아보는 나의 성격 유형 테스트"
// Full description for Google/AI
const fullDescription = "음식 공유 스타일 테스트로 알아보는 나의 성격! 12개의 질문으로 16가지 유형 중 당신은 어떤 유형일까요? 재미있는 음식 공유 스타일 테스트를 지금 바로 무료로 시작해보세요."

export const metadata: Metadata = generateQuizMetadata({
  quizId: "meal-sharing",
  title: "음식 공유 스타일 테스트",
  shortDescription,
  fullDescription,
  keywords: "음식 공유 스타일 테스트, 성격 테스트, MBTI, 심리테스트, 무료 테스트",
  canonical: "/tests/meal-sharing",
  questionCount: 12,
  duration: "PT3M",
})

const faqs = [
  ...getTopicQuizFAQs("음식 공유 스타일 테스트"),
]

export default function MealSharingPage() {
  const schemas = generateQuizSchemas({
    quizId: "meal-sharing",
    title: "음식 공유 스타일 테스트",
    shortDescription,
    fullDescription,
    keywords: "음식 공유 스타일 테스트, 성격 테스트, MBTI, 심리테스트, 무료 테스트",
    canonical: "/tests/meal-sharing",
    questionCount: 12,
    duration: "PT3M",
    faqs,
  })

  return (
    <>
      {/* Structured Data for SEO/GEO */}
      <JsonLd id="meal-sharing-quiz-schema" data={schemas.quiz} />
      <JsonLd id="meal-sharing-breadcrumb-schema" data={schemas.breadcrumb} />
      {schemas.faq && <JsonLd id="meal-sharing-faq-schema" data={schemas.faq} />}

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <main className="container max-w-4xl mx-auto px-4 py-16">
        <Card className="border-0 shadow-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur">
          <CardContent className="p-8 md:p-12 text-center space-y-8">
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 via-emerald-400 to-teal-400 flex items-center justify-center shadow-lg">
                <Users className="h-12 w-12 text-white" />
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                🤝 음식 공유 스타일 테스트
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                음식 공유 스타일로 알아보는 나의 성격 유형
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 py-8">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-green-600">12문항</div>
                <div className="text-sm text-muted-foreground">간단한 질문</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-emerald-600">약 3분</div>
                <div className="text-sm text-muted-foreground">소요 시간</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-teal-600">16유형</div>
                <div className="text-sm text-muted-foreground">결과 분석</div>
              </div>
            </div>

            <div className="pt-8">
              <Button asChild size="lg" className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white text-lg px-8 py-6">
                <Link href="/tests/meal-sharing/test">테스트 시작하기</Link>
              </Button>
            </div>

            <div className="pt-8 text-left space-y-4">
              <h2 className="text-2xl font-bold">이 테스트는?</h2>
              <p className="text-muted-foreground leading-relaxed">
                음식 공유 스타일과 패턴을 통해 당신의 성격 유형을 분석합니다. 
                음식 공유 스타일은 계획성, 즉흥성, 규칙성, 유연성 등 다양한 성격 특성을 반영합니다.
              </p>
            </div>
          </CardContent>
        </Card>
      
        <div className="mt-12">
          <AnswerEngineSection quizTitle="Meal Sharing Test" />
        </div>

        <div className="mt-12">
          <LandingConversionSection quizTitle="Meal Sharing Test" />
        </div>

        <div className="mt-12">
          <RelatedTestsSection testId="meal-sharing" />
        </div>

        {/* FAQ Section for AI Bot Optimization */}
        <section className="mt-12 mb-8">
          <FAQSection faqs={faqs} title="음식 공유 스타일 테스트 자주 묻는 질문" />
        </section>
</main>
    </div>
    </>
  )
}
