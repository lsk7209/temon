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
import { Clock, Users, Palette, Sparkles } from "lucide-react"

// Naver-optimized description (under 80 chars)
const shortDescription = "음식 모양과 배치 선호로 16유형 성향을 분석합니다. 플레이팅 한 번에 내 성격이. 12문항, 결과 공유 이미지 자동 생성."
// Full description for Google/AI
const fullDescription = "음식 모양과 배치 선호로 16유형 성향을 분석합니다. 플레이팅 한 번에 내 성격이. 12문항, 결과 공유 이미지 자동 생성."

export const metadata: Metadata = generateQuizMetadata({
  quizId: "food-presentation",
  title: "음식 플레이팅 선호도 테스트",
  shortDescription,
  fullDescription,
  keywords: "음식 플레이팅 테스트, 플레이팅, 음식 예술, 시각적, 선호도, 성향 테스트, 심리테스트, 무료 테스트",
  canonical: "/tests/food-presentation",
  questionCount: 12,
  duration: "PT3M",
})

const faqs = [
  ...getTopicQuizFAQs("음식 플레이팅 선호도 테스트"),
]

export default function FoodPresentationIntro() {
  const schemas = generateQuizSchemas({
    quizId: "food-presentation",
    title: "음식 플레이팅 선호도 테스트",
    shortDescription,
    fullDescription,
    keywords: "음식 플레이팅 테스트, 플레이팅, 음식 예술, 시각적, 선호도, 성향 테스트, 심리테스트, 무료 테스트",
    canonical: "/tests/food-presentation",
    questionCount: 12,
    duration: "PT3M",
    faqs,
  })

  return (
    <>
      {/* Structured Data for SEO/GEO */}
      <JsonLd id="food-presentation-quiz-schema" data={schemas.quiz} />
      <JsonLd id="food-presentation-breadcrumb-schema" data={schemas.breadcrumb} />
      {schemas.faq && <JsonLd id="food-presentation-faq-schema" data={schemas.faq} />}

      <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950">
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="text-center space-y-8">
          <div className="relative mx-auto w-32 h-32 mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full animate-pulse" />
            <div className="absolute inset-2 bg-gradient-to-br from-indigo-200 to-purple-300 rounded-full flex items-center justify-center">
              <span className="text-4xl animate-bounce">🎨</span>
            </div>
            <div className="absolute -top-6 -left-6 text-lg animate-bounce" style={{ animationDelay: "0.5s" }}>
              🍽️
            </div>
            <div className="absolute -top-4 -right-8 text-lg animate-bounce" style={{ animationDelay: "1s" }}>
              ✨
            </div>
            <div className="absolute -bottom-6 -left-8 text-lg animate-bounce" style={{ animationDelay: "1.5s" }}>
              🎭
            </div>
            <div className="absolute -bottom-4 -right-6 text-lg animate-bounce" style={{ animationDelay: "2s" }}>
              🌈
            </div>
          </div>

          <div className="space-y-6">
            <Badge variant="secondary" className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
              🎨 NEW 테스트
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                음식 플레이팅 선호도로 보는
              </span>
              <br />
              <span className="text-foreground">나의 선택 패턴 🎨</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              음식 모양과 배치 선호로 16유형 분석. 12문항, 약 3분 소요.
            </p>

            <div className="flex justify-center items-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>5,214명 참여</span>
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
                className="h-16 px-12 text-xl bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link href="/tests/food-presentation/test">
                  <span className="text-2xl mr-3">🎨</span>
                  테스트 시작하기
                </Link>
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                무료 • 회원가입 불필요 • 16가지 플레이팅 스타일 분석
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 space-y-12">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold flex items-center justify-center space-x-2">
                  <Palette className="h-6 w-6 text-indigo-500" />
                  <span>이런 질문들이 나와요!</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-4">
                    <div className="p-4 bg-indigo-50 dark:bg-indigo-950 rounded-lg">
                      <p className="font-medium">1. 플레이팅 선호는?</p>
                      <p className="text-sm text-muted-foreground mt-1">예쁘게 vs 간단하게</p>
                    </div>
                    <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                      <p className="font-medium">2. 음식 배치는?</p>
                      <p className="text-sm text-muted-foreground mt-1">계획적으로 vs 자연스럽게</p>
                    </div>
                    <div className="p-4 bg-indigo-50 dark:bg-indigo-950 rounded-lg">
                      <p className="font-medium">3. 플레이팅 이유는?</p>
                      <p className="text-sm text-muted-foreground mt-1">감성 vs 실용</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                      <p className="font-medium">4. 플레이팅 공유는?</p>
                      <p className="text-sm text-muted-foreground mt-1">적극적으로 vs 조용히</p>
                    </div>
                    <div className="p-4 bg-indigo-50 dark:bg-indigo-950 rounded-lg">
                      <p className="font-medium">5. 플레이팅 스타일은?</p>
                      <p className="text-sm text-muted-foreground mt-1">전통적 vs 창의적</p>
                    </div>
                    <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                      <p className="font-medium">6. 플레이팅 후 느낌은?</p>
                      <p className="text-sm text-muted-foreground mt-1">즐거움 vs 만족감</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      
        <div className="mt-12">
          <AnswerEngineSection quizTitle="Food Presentation Test" />
        </div>

        <div className="mt-12">
          <LandingConversionSection quizTitle="Food Presentation Test" />
        </div>

        <div className="mt-12">
          <RelatedTestsSection testId="food-presentation" />
        </div>

        {/* FAQ Section for AI Bot Optimization */}
        <section className="mt-12 mb-8">
          <FAQSection faqs={faqs} title="음식 플레이팅 선호도 테스트 자주 묻는 질문" />
        </section>
</main>
    </div>
    </>
  )
}
