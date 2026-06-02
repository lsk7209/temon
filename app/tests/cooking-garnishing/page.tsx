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
import { Sparkles } from "lucide-react"

// Naver-optimized description (under 80 chars)
const shortDescription = "음식 장식 스타일 테스트로 플레이팅·꾸미기 취향과 성격 유형을 확인하세요."
// Full description for Google/AI
const fullDescription = "음식 장식 스타일 테스트로 플레이팅, 데코, 색감, 마무리 장식 취향을 통해 나의 성격 유형을 확인하세요. 12문항으로 16가지 음식 장식 스타일을 무료로 제공합니다."

export const metadata: Metadata = generateQuizMetadata({
  quizId: "cooking-garnishing",
  title: "음식 장식 스타일 테스트",
  shortDescription,
  fullDescription,
  keywords: "음식 장식 스타일 테스트, 플레이팅 테스트, 음식 꾸미기 테스트, 데코 취향 테스트, 요리 장식, 성격 테스트, 무료 테스트",
  canonical: "/tests/cooking-garnishing",
  questionCount: 12,
  duration: "PT3M",
})

const faqs = [
  ...getTopicQuizFAQs("음식 장식 스타일 테스트"),
]

const gscGuides = [
  {
    title: "음식 장식 스타일 검색",
    description:
      "플레이팅을 깔끔하게 하는지, 색감과 장식을 더하는지, 마무리 취향을 선택형 질문으로 봅니다.",
  },
  {
    title: "요리 꾸미기 취향 확인",
    description:
      "맛 중심인지, 보기 좋은 완성도를 중요하게 보는지, 사진 공유까지 생각하는지 함께 확인합니다.",
  },
  {
    title: "가벼운 성향 분석",
    description:
      "결과는 요리 실력 평가가 아니라 음식 표현 방식과 취향을 설명하기 위한 무료 테스트입니다.",
  },
]

export default function CookingGarnishingPage() {
  const schemas = generateQuizSchemas({
    quizId: "cooking-garnishing",
    title: "음식 장식 스타일 테스트",
    shortDescription,
    fullDescription,
    keywords: "음식 장식 스타일 테스트, 플레이팅 테스트, 음식 꾸미기 테스트, 데코 취향 테스트, 요리 장식, 성격 테스트, 무료 테스트",
    canonical: "/tests/cooking-garnishing",
    questionCount: 12,
    duration: "PT3M",
    faqs,
  })

  return (
    <>
      {/* Structured Data for SEO/GEO */}
      <JsonLd id="cooking-garnishing-quiz-schema" data={schemas.quiz} />
      <JsonLd id="cooking-garnishing-breadcrumb-schema" data={schemas.breadcrumb} />
      {schemas.faq && <JsonLd id="cooking-garnishing-faq-schema" data={schemas.faq} />}

      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <main className="container max-w-4xl mx-auto px-4 py-16">
        <Card className="border-0 shadow-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur">
          <CardContent className="p-8 md:p-12 text-center space-y-8">
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center shadow-lg">
                <Sparkles className="h-12 w-12 text-white" />
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                ✨ 음식 장식 스타일 테스트
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                음식 장식 스타일로 알아보는 나의 성격 유형
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 py-8">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-pink-600">12문항</div>
                <div className="text-sm text-muted-foreground">간단한 질문</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-rose-600">약 3분</div>
                <div className="text-sm text-muted-foreground">소요 시간</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-fuchsia-600">16유형</div>
                <div className="text-sm text-muted-foreground">결과 분석</div>
              </div>
            </div>

            <div className="pt-8">
              <Button asChild size="lg" className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white text-lg px-8 py-6">
                <Link href="/tests/cooking-garnishing/test">테스트 시작하기</Link>
              </Button>
            </div>

            <div className="pt-8 text-left space-y-4">
              <h2 className="text-2xl font-bold">이 테스트는?</h2>
              <p className="text-muted-foreground leading-relaxed">
                음식 장식 스타일과 장식을 선택하는 패턴, 장식을 즐기는 스타일을 통해 당신의 성격 유형을 분석합니다. 
                음식 장식 스타일은 외향성, 내향성, 감성, 논리성 등 다양한 성격 특성을 반영합니다.
              </p>
            </div>
          </CardContent>
        </Card>
      
        <div className="mt-12">
          <GscLandingBoost
            title="음식 장식 스타일 테스트로 보는 플레이팅 취향"
            summary="음식 장식 스타일 테스트는 플레이팅 테스트, 음식 꾸미기 테스트, 데코 취향 테스트를 찾는 검색 의도에 맞춘 무료 성향 테스트입니다. 색감, 마무리 장식, 사진 공유, 맛과 보기 좋은 완성도의 균형을 바탕으로 16가지 장식 스타일을 보여줍니다."
            guides={gscGuides}
            relatedLinks={[
              { href: "/tests/cooking-presentation", label: "요리 플레이팅 테스트" },
              { href: "/tests/cooking-method", label: "요리 방식 테스트" },
              { href: "/tests/dessert-style", label: "디저트 취향 테스트" },
            ]}
            tone="pink"
          />
        </div>

        <div className="mt-12">
          <AnswerEngineSection quizTitle="Cooking Garnishing Test" />
        </div>

        <div className="mt-12">
          <LandingConversionSection quizTitle="Cooking Garnishing Test" />
        </div>

        <div className="mt-12">
          <RelatedTestsSection testId="cooking-garnishing" />
        </div>

        {/* FAQ Section for AI Bot Optimization */}
        <section className="mt-12 mb-8">
          <FAQSection faqs={faqs} title="음식 장식 스타일 테스트 자주 묻는 질문" />
        </section>
</main>
    </div>
    </>
  )
}
