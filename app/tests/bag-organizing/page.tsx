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
import { Clock, Users, ShoppingBag, Sparkles } from "lucide-react"

// Naver-optimized description (under 80 chars)
const shortDescription = "bag organizing로 알아보는 나의 성격 유형 테스트"
// Full description for Google/AI
const fullDescription = "bag organizing로 알아보는 나의 성격! 12개의 질문으로 16가지 유형 중 당신은 어떤 유형일까요? 재미있는 bag organizing를 지금 바로 무료로 시작해보세요."

export const metadata: Metadata = generateQuizMetadata({
  quizId: "bag-organizing",
  title: "bag organizing",
  shortDescription,
  fullDescription,
  keywords: "가방 테스트, 가방 정리, 정리 스타일, 성향 테스트, 심리테스트, 무료 테스트",
  canonical: "/tests/bag-organizing",
  questionCount: 12,
  duration: "PT3M",
})

const faqs = [
  ...getTopicQuizFAQs("bag organizing"),
]

export default function BagOrganizingIntro() {
  const schemas = generateQuizSchemas({
    quizId: "bag-organizing",
    title: "bag organizing",
    shortDescription,
    fullDescription,
    keywords: "가방 테스트, 가방 정리, 정리 스타일, 성향 테스트, 심리테스트, 무료 테스트",
    canonical: "/tests/bag-organizing",
    questionCount: 12,
    duration: "PT3M",
    faqs,
  })

  return (
    <>
      {/* Structured Data for SEO/GEO */}
      <JsonLd id="bag-organizing-quiz-schema" data={schemas.quiz} />
      <JsonLd id="bag-organizing-breadcrumb-schema" data={schemas.breadcrumb} />
      {schemas.faq && <JsonLd id="bag-organizing-faq-schema" data={schemas.faq} />}

      <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950">
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="text-center space-y-8">
          <div className="relative mx-auto w-32 h-32 mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full animate-pulse" />
            <div className="absolute inset-2 bg-gradient-to-br from-amber-200 to-orange-300 rounded-full flex items-center justify-center">
              <span className="text-4xl animate-bounce">🎒</span>
            </div>
            <div className="absolute -top-6 -left-6 text-lg animate-bounce" style={{ animationDelay: "0.5s" }}>
              👜
            </div>
            <div className="absolute -top-4 -right-8 text-lg animate-bounce" style={{ animationDelay: "1s" }}>
              💼
            </div>
            <div className="absolute -bottom-6 -left-8 text-lg animate-bounce" style={{ animationDelay: "1.5s" }}>
              🧳
            </div>
            <div className="absolute -bottom-4 -right-6 text-lg animate-bounce" style={{ animationDelay: "2s" }}>
              📦
            </div>
          </div>

          <div className="space-y-6">
            <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
              🎒 NEW 테스트
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                가방 정리 스타일로 보는
              </span>
              <br />
              <span className="text-foreground">나의 선택 패턴 🎒</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              가방 정리 방식, 스타일로 16유형 분석. 12문항, 약 3분 소요.
            </p>

            <div className="flex justify-center items-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>17,342명 참여</span>
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
                className="h-16 px-12 text-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link href="/tests/bag-organizing/test">
                  <span className="text-2xl mr-3">🎒</span>
                  테스트 시작하기
                </Link>
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                무료 • 회원가입 불필요 • 16가지 가방 정리 스타일 분석
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 space-y-12">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold flex items-center justify-center space-x-2">
                  <ShoppingBag className="h-6 w-6 text-amber-500" />
                  <span>이런 질문들이 나와요!</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-4">
                    <div className="p-4 bg-amber-50 dark:bg-amber-950 rounded-lg">
                      <h3 className="font-medium">1. 가방 정리 방식은?</h3>
                      <p className="text-sm text-muted-foreground mt-1">정해진 위치 vs 그때그때</p>
                    </div>
                    <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                      <h3 className="font-medium">2. 정리 기준은?</h3>
                      <p className="text-sm text-muted-foreground mt-1">체계적 vs 자연스럽게</p>
                    </div>
                    <div className="p-4 bg-amber-50 dark:bg-amber-950 rounded-lg">
                      <h3 className="font-medium">3. 정리 속도는?</h3>
                      <p className="text-sm text-muted-foreground mt-1">천천히 vs 빠르게</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                      <h3 className="font-medium">4. 정리 계획은?</h3>
                      <p className="text-sm text-muted-foreground mt-1">미리 계획 vs 그때그때</p>
                    </div>
                    <div className="p-4 bg-amber-50 dark:bg-amber-950 rounded-lg">
                      <h3 className="font-medium">5. 정리 후기는?</h3>
                      <p className="text-sm text-muted-foreground mt-1">확인하기 vs 그냥 가기</p>
                    </div>
                    <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                      <h3 className="font-medium">6. 정리 이유는?</h3>
                      <p className="text-sm text-muted-foreground mt-1">실용성 vs 감성</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      
        <div className="mt-12">
          <AnswerEngineSection quizTitle="Bag Organizing Test" />
        </div>

        <div className="mt-12">
          <LandingConversionSection quizTitle="Bag Organizing Test" />
        </div>

        <div className="mt-12">
          <RelatedTestsSection testId="bag-organizing" />
        </div>

        {/* FAQ Section for AI Bot Optimization */}
        <section className="mt-12 mb-8">
          <FAQSection faqs={faqs} title="bag organizing 자주 묻는 질문" />
        </section>
</main>
    </div>
    </>
  )
}
