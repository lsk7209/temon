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
import { Clock, Users, Croissant, Sparkles } from "lucide-react"

// Naver-optimized description (under 80 chars)
const shortDescription = "아침식사 선택과 준비 방식으로 16유형 성향을 분석합니다. 아침 한 끼에 내 성격이. 12문항, 결과 공유 이미지 자동 생성."
// Full description for Google/AI
const fullDescription = "아침식사 선택과 준비 방식으로 16유형 성향을 분석합니다. 아침 한 끼에 내 성격이. 12문항, 결과 공유 이미지 자동 생성."

export const metadata: Metadata = generateQuizMetadata({
  quizId: "breakfast-style",
  title: "아침식사 스타일 테스트",
  shortDescription,
  fullDescription,
  keywords: "아침식사 테스트, 브런치, 아침 루틴, 식습관, 성향 테스트, 심리테스트, 무료 테스트",
  canonical: "/tests/breakfast-style",
  questionCount: 12,
  duration: "PT3M",
})

const faqs = [
  ...getTopicQuizFAQs("아침식사 스타일 테스트"),
]

export default function BreakfastStyleIntro() {
  const schemas = generateQuizSchemas({
    quizId: "breakfast-style",
    title: "아침식사 스타일 테스트",
    shortDescription,
    fullDescription,
    keywords: "아침식사 테스트, 브런치, 아침 루틴, 식습관, 성향 테스트, 심리테스트, 무료 테스트",
    canonical: "/tests/breakfast-style",
    questionCount: 12,
    duration: "PT3M",
    faqs,
  })

  return (
    <>
      {/* Structured Data for SEO/GEO */}
      <JsonLd id="breakfast-style-quiz-schema" data={schemas.quiz} />
      <JsonLd id="breakfast-style-breadcrumb-schema" data={schemas.breadcrumb} />
      {schemas.faq && <JsonLd id="breakfast-style-faq-schema" data={schemas.faq} />}

      <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950">
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="text-center space-y-8">
          <div className="relative mx-auto w-32 h-32 mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full animate-pulse" />
            <div className="absolute inset-2 bg-gradient-to-br from-orange-200 to-amber-300 rounded-full flex items-center justify-center">
              <span className="text-4xl animate-bounce">🥐</span>
            </div>
            <div className="absolute -top-6 -left-6 text-lg animate-bounce" style={{ animationDelay: "0.5s" }}>
              🍳
            </div>
            <div className="absolute -top-4 -right-8 text-lg animate-bounce" style={{ animationDelay: "1s" }}>
              🥞
            </div>
            <div className="absolute -bottom-6 -left-8 text-lg animate-bounce" style={{ animationDelay: "1.5s" }}>
              🥓
            </div>
            <div className="absolute -bottom-4 -right-6 text-lg animate-bounce" style={{ animationDelay: "2s" }}>
              ☕
            </div>
          </div>

          <div className="space-y-6">
            <Badge variant="secondary" className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
              🥐 NEW 테스트
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                아침식사 스타일로 보는
              </span>
              <br />
              <span className="text-foreground">나의 선택 패턴 🥐</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              아침식사 선택과 준비 방식으로 16유형 분석. 12문항, 약 3분 소요.
            </p>

            <div className="flex justify-center items-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>9,617명 참여</span>
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
                className="h-16 px-12 text-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link href="/tests/breakfast-style/test">
                  <span className="text-2xl mr-3">🥐</span>
                  테스트 시작하기
                </Link>
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                무료 • 회원가입 불필요 • 16가지 아침식사 스타일 분석
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 space-y-12">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold flex items-center justify-center space-x-2">
                  <Croissant className="h-6 w-6 text-orange-500" />
                  <span>이런 질문들이 나와요!</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-4">
                    <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                      <p className="font-medium">1. 아침식사 준비 방식은?</p>
                      <p className="text-sm text-muted-foreground mt-1">직접 요리 vs 외부 구매</p>
                    </div>
                    <div className="p-4 bg-amber-50 dark:bg-amber-950 rounded-lg">
                      <p className="font-medium">2. 아침식사 시간은?</p>
                      <p className="text-sm text-muted-foreground mt-1">정해진 시간 vs 그때그때</p>
                    </div>
                    <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                      <p className="font-medium">3. 아침식사 메뉴 선택은?</p>
                      <p className="text-sm text-muted-foreground mt-1">계획적으로 vs 즉흥적으로</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-amber-50 dark:bg-amber-950 rounded-lg">
                      <p className="font-medium">4. 아침식사 양은?</p>
                      <p className="text-sm text-muted-foreground mt-1">풍부하게 vs 간단하게</p>
                    </div>
                    <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                      <p className="font-medium">5. 아침식사 분위기는?</p>
                      <p className="text-sm text-muted-foreground mt-1">혼자 vs 함께</p>
                    </div>
                    <div className="p-4 bg-amber-50 dark:bg-amber-950 rounded-lg">
                      <p className="font-medium">6. 아침식사 후 활동은?</p>
                      <p className="text-sm text-muted-foreground mt-1">계획 세우기 vs 자연스럽게</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      
        <GscLandingBoost
          title="아침식사 스타일로 보는 하루 시작 성향"
          summary="아침식사를 준비하고 고르는 방식은 계획성, 속도, 컨디션 관리 방식과 이어집니다. 이 테스트는 식단의 좋고 나쁨이 아니라 아침을 어떻게 시작해야 편한 사람인지 보여줍니다."
          guides={[
            {
              title: "준비 방식 확인",
              description:
                "미리 준비한 메뉴를 먹는지, 그날 기분에 맞춰 고르는지로 계획형과 즉흥형 단서를 확인합니다.",
            },
            {
              title: "아침 컨디션 기준",
              description:
                "든든함, 가벼움, 빠른 준비, 맛 중 어떤 기준을 우선하는지에 따라 결과 해석이 달라집니다.",
            },
            {
              title: "루틴 테스트로 확장",
              description:
                "아침식사 스타일은 알람 습관, 아침 샤워, 출근 준비 테스트와 함께 보면 더 입체적으로 읽힙니다.",
            },
          ]}
          relatedLinks={[
            { href: "/tests/alarm-habit", label: "알람 습관 테스트" },
            { href: "/tests/morning-shower", label: "아침 샤워 테스트" },
            { href: "/tests/morning-rush", label: "아침 준비 테스트" },
          ]}
          tone="orange"
        />

        <div className="mt-12">
          <AnswerEngineSection quizTitle="Breakfast Style Test" />
        </div>

        <div className="mt-12">
          <LandingConversionSection quizTitle="Breakfast Style Test" />
        </div>

        <div className="mt-12">
          <RelatedTestsSection testId="breakfast-style" />
        </div>

        {/* FAQ Section for AI Bot Optimization */}
        <section className="mt-12 mb-8">
          <FAQSection faqs={faqs} title="아침식사 스타일 테스트 자주 묻는 질문" />
        </section>
</main>
    </div>
    </>
  )
}
