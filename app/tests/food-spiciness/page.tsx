import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { JsonLd } from "@/components/json-ld"
import { FAQSection } from "@/components/faq-section"
import { AnswerEngineSection } from "@/components/answer-engine-section"
import { GscLandingBoost } from "@/components/gsc-landing-boost"
import { LandingConversionSection } from "@/components/landing-conversion-section"
import { RelatedTestsSection } from "@/components/related-tests-section"
import { generateQuizMetadata, generateQuizSchemas } from "@/lib/quiz-seo-utils"
import { getTopicQuizFAQs } from "@/lib/quiz-topic-copy"
import { Card, CardContent } from "@/components/ui/card"
import { Flame } from "lucide-react"

// Naver-optimized description (under 80 chars)
const shortDescription = "매운맛 테스트로 매운 음식 취향과 음식 성격 유형을 확인하세요."
// Full description for Google/AI
const fullDescription = "매운맛 테스트로 매운 음식 취향, 도전 성향, 음식 선택 방식을 확인하세요. 12문항으로 나와 닮은 음식 성격 유형을 무료로 볼 수 있습니다."

export const metadata: Metadata = generateQuizMetadata({
  quizId: "food-spiciness",
  title: "매운맛 테스트",
  shortDescription,
  fullDescription,
  keywords: "매운맛 테스트, 매운맛 선호도 테스트, 음식 테스트, 매운 음식 테스트, 매운맛 MBTI, 성격 테스트, 심리테스트, 무료 테스트",
  canonical: "/tests/food-spiciness",
  questionCount: 12,
  duration: "PT3M",
})

const faqs = [
  ...getTopicQuizFAQs("매운맛 선호도 테스트"),
  {
    question: "매운맛 테스트는 무엇을 알려주나요?",
    answer:
      "매운 음식을 고르는 기준, 도전 강도, 스트레스를 푸는 방식 등을 바탕으로 음식 취향과 성격 유형을 가볍게 해석합니다.",
  },
  {
    question: "음식 테스트로 친구와 비교할 수 있나요?",
    answer:
      "네. 결과 유형은 공유하기 쉽게 구성되어 있어 친구의 라면 취향, 매운맛 단계, 음식 선택 스타일과 비교하기 좋습니다.",
  },
]

const gscGuides = [
  {
    title: "매운맛 테스트",
    description:
      "맵찔이부터 불닭 도전자까지 매운맛을 대하는 태도와 선택 기준을 12문항으로 확인합니다.",
  },
  {
    title: "음식 테스트",
    description:
      "매운 음식 취향을 통해 즉흥성, 도전 성향, 안정 추구 성향처럼 음식 선택에 드러나는 패턴을 살펴봅니다.",
  },
  {
    title: "매운맛 MBTI",
    description:
      "정식 MBTI 검사는 아니지만 매운맛을 즐기는 방식으로 친구와 비교하기 쉬운 음식 성격 유형을 제공합니다.",
  },
]

export default function FoodSpicinessPage() {
  const schemas = generateQuizSchemas({
    quizId: "food-spiciness",
    title: "매운맛 테스트",
    shortDescription,
    fullDescription,
    keywords: "매운맛 테스트, 매운맛 선호도 테스트, 음식 테스트, 매운 음식 테스트, 매운맛 MBTI, 성격 테스트, 심리테스트, 무료 테스트",
    canonical: "/tests/food-spiciness",
    questionCount: 12,
    duration: "PT3M",
    faqs,
  })

  return (
    <>
      {/* Structured Data for SEO/GEO */}
      <JsonLd id="food-spiciness-quiz-schema" data={schemas.quiz} />
      <JsonLd id="food-spiciness-breadcrumb-schema" data={schemas.breadcrumb} />
      {schemas.faq && <JsonLd id="food-spiciness-faq-schema" data={schemas.faq} />}

      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <main className="container max-w-4xl mx-auto px-4 py-16">
        <Card className="border-0 shadow-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur">
          <CardContent className="p-8 md:p-12 text-center space-y-8">
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-lg">
                <Flame className="h-12 w-12 text-white" />
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                🌶️ 매운맛 선호도 테스트
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                매운맛을 좋아하는 정도와 방식으로 알아보는 나의 성격 유형
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 py-8">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-red-600">12문항</div>
                <div className="text-sm text-muted-foreground">간단한 질문</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-orange-600">약 3분</div>
                <div className="text-sm text-muted-foreground">소요 시간</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-yellow-600">16유형</div>
                <div className="text-sm text-muted-foreground">결과 분석</div>
              </div>
            </div>

            <div className="pt-8">
              <Button asChild size="lg" className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white text-lg px-8 py-6">
                <Link href="/tests/food-spiciness/test">테스트 시작하기</Link>
              </Button>
            </div>

            <div className="pt-8 text-left space-y-4">
              <h2 className="text-2xl font-bold">이 테스트는?</h2>
              <p className="text-muted-foreground leading-relaxed">
                매운맛을 좋아하는 정도와 매운 음식을 선택하는 방식, 매운맛을 즐기는 패턴을 통해 당신의 성격 유형을 분석합니다. 
                매운맛에 대한 선호도는 계획성, 즉흥성, 감각 추구, 논리적 선택 등 다양한 성격 특성을 반영합니다.
              </p>
            </div>
          </CardContent>
        </Card>

        <GscLandingBoost
          title="매운맛 테스트로 보는 음식 취향"
          summary="이 페이지는 매운맛 테스트, 음식 테스트, 매운 음식 취향 테스트를 찾는 사용자를 위한 무료 테스트입니다. 매운맛 단계와 먹는 상황을 고르면 나의 음식 성격 유형을 빠르게 확인할 수 있습니다."
          guides={gscGuides}
          relatedLinks={[
            { href: "/tests/ramen-mbti", label: "라면 테스트" },
            { href: "/tests/taste-preference", label: "입맛 취향 테스트" },
            { href: "/tests/food-temperature", label: "음식 온도 취향 테스트" },
          ]}
          tone="orange"
        />
      
        <div className="mt-12">
          <AnswerEngineSection quizTitle="Food Spiciness Test" />
        </div>

        <div className="mt-12">
          <LandingConversionSection quizTitle="Food Spiciness Test" />
        </div>

        <div className="mt-12">
          <RelatedTestsSection testId="food-spiciness" />
        </div>

        {/* FAQ Section for AI Bot Optimization */}
        <section className="mt-12 mb-8">
          <FAQSection faqs={faqs} title="매운맛 선호도 테스트 자주 묻는 질문" />
        </section>
</main>
    </div>
    </>
  )
}
