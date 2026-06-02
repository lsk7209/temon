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
import { Clock, Users, UtensilsCrossed } from "lucide-react"

// Naver-optimized description (under 80 chars)
const shortDescription = "김밥 재료 선택 테스트로 기본파·특별재료파 음식 취향을 16유형으로 확인하세요."
// Full description for Google/AI
const fullDescription = "김밥 재료 선택 테스트로 기본 김밥 재료를 선호하는지 특별한 재료와 조합을 시도하는지 확인하세요. 12문항으로 16가지 김밥 취향 유형을 무료로 제공합니다."

export const metadata: Metadata = generateQuizMetadata({
  quizId: "kimbap-ingredient",
  title: "김밥 재료 선택 테스트",
  shortDescription,
  fullDescription,
  keywords: "김밥 재료 선택 테스트, 김밥 테스트, 김밥 재료 테스트, 음식 취향 테스트, 재료 선택 테스트, 김밥파, 무료 테스트",
  canonical: "/tests/kimbap-ingredient",
  questionCount: 12,
  duration: "PT3M",
})

const faqs = [
  ...getTopicQuizFAQs("김밥 재료 선택 테스트"),
]

const gscGuides = [
  {
    title: "김밥 재료 테스트 검색",
    description:
      "단무지, 계란, 햄처럼 익숙한 재료를 고르는지 새로운 재료와 조합을 시도하는지 확인합니다.",
  },
  {
    title: "재료 조합 성향 분석",
    description:
      "정해진 조합을 좋아하는지, 매번 다르게 만드는지, 재료 양과 배치까지 선택 기준을 봅니다.",
  },
  {
    title: "음식 취향 공유용",
    description:
      "결과는 입맛을 단정하지 않고 김밥을 고르는 습관을 친구와 비교하기 쉬운 유형으로 정리합니다.",
  },
]

export default function KimbapIngredientIntro() {
  const schemas = generateQuizSchemas({
    quizId: "kimbap-ingredient",
    title: "김밥 재료 선택 테스트",
    shortDescription,
    fullDescription,
    keywords: "김밥 재료 선택 테스트, 김밥 테스트, 김밥 재료 테스트, 음식 취향 테스트, 재료 선택 테스트, 김밥파, 무료 테스트",
    canonical: "/tests/kimbap-ingredient",
    questionCount: 12,
    duration: "PT3M",
    faqs,
  })

  return (
    <>
      {/* Structured Data for SEO/GEO */}
      <JsonLd id="kimbap-ingredient-quiz-schema" data={schemas.quiz} />
      <JsonLd id="kimbap-ingredient-breadcrumb-schema" data={schemas.breadcrumb} />
      {schemas.faq && <JsonLd id="kimbap-ingredient-faq-schema" data={schemas.faq} />}

      <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950">
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="text-center space-y-8">
          <div className="relative mx-auto w-32 h-32 mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full animate-pulse" />
            <div className="absolute inset-2 bg-gradient-to-br from-green-200 to-emerald-300 rounded-full flex items-center justify-center">
              <span className="text-4xl animate-bounce">🍙</span>
            </div>
            <div className="absolute -top-6 -left-6 text-lg animate-bounce" style={{ animationDelay: "0.5s" }}>
              🥒
            </div>
            <div className="absolute -top-4 -right-8 text-lg animate-bounce" style={{ animationDelay: "1s" }}>
              🥕
            </div>
            <div className="absolute -bottom-6 -left-8 text-lg animate-bounce" style={{ animationDelay: "1.5s" }}>
              🥚
            </div>
            <div className="absolute -bottom-4 -right-6 text-lg animate-bounce" style={{ animationDelay: "2s" }}>
              🍖
            </div>
          </div>

          <div className="space-y-6">
            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              🍙 NEW 테스트
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                김밥 재료 선택으로 보는
              </span>
              <br />
              <span className="text-foreground">나의 선택 패턴 🍙</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              김밥 재료 선택으로 16유형 분석. 12문항, 약 3분 소요.
            </p>

            <div className="flex justify-center items-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>13,906명 참여</span>
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
                className="h-16 px-12 text-xl bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link href="/tests/kimbap-ingredient/test">
                  <span className="text-2xl mr-3">🍙</span>
                  테스트 시작하기
                </Link>
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                무료 • 회원가입 불필요 • 16가지 김밥 스타일 분석
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 space-y-12">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold flex items-center justify-center space-x-2">
                  <UtensilsCrossed className="h-6 w-6 text-green-500" />
                  <span>이런 질문들이 나와요!</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                      <p className="font-medium">1. 김밥 재료 선택 기준은?</p>
                      <p className="text-sm text-slate-700 dark:text-slate-200 mt-1">전통적인 재료 vs 특별한 재료</p>
                    </div>
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-950 rounded-lg">
                      <p className="font-medium">2. 재료 조합 방식은?</p>
                      <p className="text-sm text-slate-700 dark:text-slate-200 mt-1">고정된 조합 vs 매번 다르게</p>
                    </div>
                    <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                      <p className="font-medium">3. 재료 양은?</p>
                      <p className="text-sm text-slate-700 dark:text-slate-200 mt-1">적당히 vs 많이</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-950 rounded-lg">
                      <p className="font-medium">4. 재료 배치 방식은?</p>
                      <p className="text-sm text-slate-700 dark:text-slate-200 mt-1">정돈된 배치 vs 자연스럽게</p>
                    </div>
                    <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                      <p className="font-medium">5. 김밥 만드는 순서는?</p>
                      <p className="text-sm text-slate-700 dark:text-slate-200 mt-1">정해진 순서 vs 그때그때</p>
                    </div>
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-950 rounded-lg">
                      <p className="font-medium">6. 김밥 먹는 방식은?</p>
                      <p className="text-sm text-slate-700 dark:text-slate-200 mt-1">작게 자르기 vs 크게 자르기</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      
        <div className="mt-12">
          <GscLandingBoost
            title="김밥 재료 선택 테스트로 보는 음식 취향"
            summary="김밥 재료 선택 테스트는 김밥 재료 테스트, 음식 취향 테스트, 재료 선택 테스트를 찾는 검색 의도에 맞춘 무료 성향 테스트입니다. 기본 재료 선호, 특별 재료 시도, 재료 양과 배치 기준을 바탕으로 16가지 김밥 취향 유형을 보여줍니다."
            guides={gscGuides}
            relatedLinks={[
              { href: "/tests/food-ordering", label: "주문 방식 테스트" },
              { href: "/tests/restaurant-menu", label: "식당 메뉴 선택 테스트" },
              { href: "/tests/cvs-combo", label: "편의점 조합 테스트" },
            ]}
            tone="green"
          />
        </div>

        <div className="mt-12">
          <AnswerEngineSection quizTitle="Kimbap Ingredient Test" />
        </div>

        <div className="mt-12">
          <LandingConversionSection quizTitle="Kimbap Ingredient Test" />
        </div>

        <div className="mt-12">
          <RelatedTestsSection testId="kimbap-ingredient" />
        </div>

        {/* FAQ Section for AI Bot Optimization */}
        <section className="mt-12 mb-8">
          <FAQSection faqs={faqs} title="김밥 재료 선택 테스트 자주 묻는 질문" />
        </section>
</main>
    </div>
    </>
  )
}
