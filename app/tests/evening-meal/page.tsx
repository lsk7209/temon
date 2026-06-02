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
import { Clock, Users, UtensilsCrossed, Sparkles } from "lucide-react"

// Naver-optimized description (under 80 chars)
const shortDescription = "저녁 식사 스타일 테스트로 메뉴 선택·혼밥·외식 성향을 16유형으로 확인하세요."
// Full description for Google/AI
const fullDescription = "저녁 식사 스타일 테스트로 저녁 메뉴를 미리 정하는지 즉흥적으로 고르는지, 혼밥과 외식 중 무엇을 선호하는지 확인하세요. 12문항으로 16가지 저녁 식사 유형을 무료로 제공합니다."

export const metadata: Metadata = generateQuizMetadata({
  quizId: "evening-meal",
  title: "저녁 식사 스타일 테스트",
  shortDescription,
  fullDescription,
  keywords: "저녁 식사 스타일 테스트, 저녁 메뉴 테스트, 저녁 뭐 먹지 테스트, 식사 스타일 테스트, 혼밥 테스트, 외식 테스트, 무료 테스트",
  canonical: "/tests/evening-meal",
  questionCount: 12,
  duration: "PT3M",
})

const faqs = [
  ...getTopicQuizFAQs("저녁 식사 스타일 테스트"),
]

const gscGuides = [
  {
    title: "저녁 메뉴 테스트 검색",
    description:
      "저녁을 미리 정하는지, 그때그때 고르는지, 디저트까지 고려하는지 선택 습관을 봅니다.",
  },
  {
    title: "혼밥과 외식 성향",
    description:
      "집에서 편하게 먹는지, 사람들과 밖에서 먹는지, 저녁 식사의 소통 기준을 함께 확인합니다.",
  },
  {
    title: "저녁 루틴 참고",
    description:
      "결과는 식습관 평가가 아니라 하루를 마무리하는 저녁 선택 기준을 이해하기 위한 참고용입니다.",
  },
]

export default function EveningMealIntro() {
  const schemas = generateQuizSchemas({
    quizId: "evening-meal",
    title: "저녁 식사 스타일 테스트",
    shortDescription,
    fullDescription,
    keywords: "저녁 식사 스타일 테스트, 저녁 메뉴 테스트, 저녁 뭐 먹지 테스트, 식사 스타일 테스트, 혼밥 테스트, 외식 테스트, 무료 테스트",
    canonical: "/tests/evening-meal",
    questionCount: 12,
    duration: "PT3M",
    faqs,
  })

  return (
    <>
      {/* Structured Data for SEO/GEO */}
      <JsonLd id="evening-meal-quiz-schema" data={schemas.quiz} />
      <JsonLd id="evening-meal-breadcrumb-schema" data={schemas.breadcrumb} />
      {schemas.faq && <JsonLd id="evening-meal-faq-schema" data={schemas.faq} />}

      <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950">
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="text-center space-y-8">
          <div className="relative mx-auto w-32 h-32 mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-500 rounded-full animate-pulse" />
            <div className="absolute inset-2 bg-gradient-to-br from-orange-200 to-red-300 rounded-full flex items-center justify-center">
              <span className="text-4xl animate-bounce">🍽️</span>
            </div>
            <div className="absolute -top-6 -left-6 text-lg animate-bounce" style={{ animationDelay: "0.5s" }}>
              🍜
            </div>
            <div className="absolute -top-4 -right-8 text-lg animate-bounce" style={{ animationDelay: "1s" }}>
              🍱
            </div>
            <div className="absolute -bottom-6 -left-8 text-lg animate-bounce" style={{ animationDelay: "1.5s" }}>
              🍕
            </div>
            <div className="absolute -bottom-4 -right-6 text-lg animate-bounce" style={{ animationDelay: "2s" }}>
              🍰
            </div>
          </div>

          <div className="space-y-6">
            <Badge variant="secondary" className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
              🍽️ NEW 테스트
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                저녁 식사 스타일로 보는
              </span>
              <br />
              <span className="text-foreground">나의 성격 유형 🍽️</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              저녁에 뭐 먹을지 고민될 때, 저녁 식사 후 디저트를 고를 때 등 구체적인 상황으로 16유형 분석. 12문항, 약 3분 소요.
            </p>

            <div className="flex justify-center items-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>10,384명 참여</span>
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
                <Link href="/tests/evening-meal/test">
                  <span className="text-2xl mr-3">🍽️</span>
                  테스트 시작하기
                </Link>
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                무료 • 회원가입 불필요 • 16가지 식사 스타일 분석
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 space-y-12">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold flex items-center justify-center space-x-2">
                  <UtensilsCrossed className="h-6 w-6 text-orange-500" />
                  <span>이런 질문들이 나와요!</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-4">
                    <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                      <p className="font-medium">1. 저녁에 뭐 먹을지 고민될 때</p>
                      <p className="text-sm text-slate-700 dark:text-slate-200 mt-1">미리 정해둔 메뉴로 먹는다 vs 그때그때 선택한다</p>
                    </div>
                    <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg">
                      <p className="font-medium">2. 저녁 식사 후 디저트를 고를 때</p>
                      <p className="text-sm text-slate-700 dark:text-slate-200 mt-1">정해진 디저트를 선택한다 vs 새로운 디저트를 시도한다</p>
                    </div>
                    <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                      <p className="font-medium">3. 저녁 식사를 준비할 때</p>
                      <p className="text-sm text-slate-700 dark:text-slate-200 mt-1">정해진 레시피대로 준비한다 vs 자유롭게 준비한다</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg">
                      <p className="font-medium">4. 저녁 식사를 먹는 장소</p>
                      <p className="text-sm text-slate-700 dark:text-slate-200 mt-1">집에서 혼자 먹는다 vs 밖에서 사람들과 먹는다</p>
                    </div>
                    <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                      <p className="font-medium">5. 저녁 식사를 먹는 시간</p>
                      <p className="text-sm text-slate-700 dark:text-slate-200 mt-1">정해진 시간에 먹는다 vs 그때그때 먹는다</p>
                    </div>
                    <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg">
                      <p className="font-medium">6. 저녁 식사를 먹으면서 할 일</p>
                      <p className="text-sm text-slate-700 dark:text-slate-200 mt-1">일을 하거나 계획을 세운다 vs 여유롭게 즐긴다</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold">🍽️ 16가지 식사 스타일</h2>
                <p className="text-muted-foreground">당신은 어떤 식사러일까요?</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { emoji: "🌅", name: "즉흥형", type: "ENFP" },
                    { emoji: "😴", name: "여유형", type: "INFP" },
                    { emoji: "⏰", name: "시간관리형", type: "ENFJ" },
                    { emoji: "🧘", name: "명상형", type: "INFJ" },
                    { emoji: "📱", name: "혁신형", type: "ENTP" },
                    { emoji: "🎵", name: "분석형", type: "INTP" },
                    { emoji: "💪", name: "효율형", type: "ENTJ" },
                    { emoji: "🌙", name: "야행성형", type: "INTJ" },
                  ].map((character) => (
                    <div
                      key={character.type}
                      className="p-3 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 rounded-lg text-center"
                    >
                      <div className="text-2xl mb-1">{character.emoji}</div>
                      <div className="text-xs font-medium">{character.name}</div>
                      <div className="text-xs text-slate-700 dark:text-slate-200">{character.type}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold flex items-center justify-center space-x-2">
                  <Sparkles className="h-6 w-6 text-red-500" />
                  <span>특별한 기능</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <h3 className="font-semibold">정확한 분석</h3>
                    <p className="text-sm text-slate-700 dark:text-slate-200">12문항으로 식사 습관을 4축으로 정량화해 유형화</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">💡</span>
                    </div>
                    <h3 className="font-semibold">맞춤 팁</h3>
                    <p className="text-sm text-slate-700 dark:text-slate-200">당신의 유형에 맞는 식사 추천 및 건강 팁 제공</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🔗</span>
                    </div>
                    <h3 className="font-semibold">쉬운 공유</h3>
                    <p className="text-sm text-slate-700 dark:text-slate-200">결과를 친구들과 쉽게 공유하고 비교해보세요</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      
        <div className="mt-12">
          <GscLandingBoost
            title="저녁 식사 스타일 테스트로 보는 메뉴 선택"
            summary="저녁 식사 스타일 테스트는 저녁 메뉴 테스트, 저녁 뭐 먹지 테스트, 혼밥 테스트를 찾는 검색 의도에 맞춘 무료 성향 테스트입니다. 메뉴 결정 방식, 디저트 선택, 식사 장소와 시간을 바탕으로 16가지 저녁 식사 유형을 보여줍니다."
            guides={gscGuides}
            relatedLinks={[
              { href: "/tests/food-timing", label: "식사 시간대 테스트" },
              { href: "/tests/meal-solo", label: "혼밥 스타일 테스트" },
              { href: "/tests/dessert-style", label: "디저트 취향 테스트" },
            ]}
            tone="orange"
          />
        </div>

        <div className="mt-12">
          <AnswerEngineSection quizTitle="Evening Meal Test" />
        </div>

        <div className="mt-12">
          <LandingConversionSection quizTitle="Evening Meal Test" />
        </div>

        <div className="mt-12">
          <RelatedTestsSection testId="evening-meal" />
        </div>

        {/* FAQ Section for AI Bot Optimization */}
        <section className="mt-12 mb-8">
          <FAQSection faqs={faqs} title="저녁 식사 스타일 테스트 자주 묻는 질문" />
        </section>
</main>
    </div>
    </>
  )
}
