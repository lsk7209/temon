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
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Cake, Sparkles } from "lucide-react"

// Naver-optimized description (under 80 chars)
const shortDescription = "케이크 자르는 방식, 조각 선택으로 16유형 성향을 분석합니다. 케이크 자르는 습관으로 알아보는 나의 성격. 12문항, 결과 공유 이미지 ..."
// Full description for Google/AI
const fullDescription = "케이크 자르는 방식, 조각 선택으로 16유형 성향을 분석합니다. 케이크 자르는 습관으로 알아보는 나의 성격. 12문항, 결과 공유 이미지 자동 생성."

export const metadata: Metadata = generateQuizMetadata({
  quizId: "cake-cutting",
  title: "케이크 자르는 스타일 테스트",
  shortDescription,
  fullDescription,
  keywords: "케이크 테스트, 케이크 자르기, 조각 선택, 성향 테스트, 심리테스트, 무료 테스트",
  canonical: "/tests/cake-cutting",
  questionCount: 12,
  duration: "PT3M",
})

const faqs = [
  ...getTopicQuizFAQs("케이크 자르는 스타일 테스트"),
]

export default function CakeCuttingIntro() {
  const schemas = generateQuizSchemas({
    quizId: "cake-cutting",
    title: "케이크 자르는 스타일 테스트",
    shortDescription,
    fullDescription,
    keywords: "케이크 테스트, 케이크 자르기, 조각 선택, 성향 테스트, 심리테스트, 무료 테스트",
    canonical: "/tests/cake-cutting",
    questionCount: 12,
    duration: "PT3M",
    faqs,
  })

  return (
    <>
      {/* Structured Data for SEO/GEO */}
      <JsonLd id="cake-cutting-quiz-schema" data={schemas.quiz} />
      <JsonLd id="cake-cutting-breadcrumb-schema" data={schemas.breadcrumb} />
      {schemas.faq && <JsonLd id="cake-cutting-faq-schema" data={schemas.faq} />}

      <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950">
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="text-center space-y-8">
          <div className="relative mx-auto w-32 h-32 mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full animate-pulse" />
            <div className="absolute inset-2 bg-gradient-to-br from-pink-200 to-rose-300 rounded-full flex items-center justify-center">
              <span className="text-4xl animate-bounce">🍰</span>
            </div>
            <div className="absolute -top-6 -left-6 text-lg animate-bounce" style={{ animationDelay: "0.5s" }}>
              🎂
            </div>
            <div className="absolute -top-4 -right-8 text-lg animate-bounce" style={{ animationDelay: "1s" }}>
              🕯️
            </div>
            <div className="absolute -bottom-6 -left-8 text-lg animate-bounce" style={{ animationDelay: "1.5s" }}>
              🎁
            </div>
            <div className="absolute -bottom-4 -right-6 text-lg animate-bounce" style={{ animationDelay: "2s" }}>
              🎉
            </div>
          </div>

          <div className="space-y-6">
            <Badge variant="secondary" className="bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200">
              🍰 NEW 테스트
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                케이크 자르는 방식으로 보는
              </span>
              <br />
              <span className="text-foreground">나의 선택 패턴 🍰</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              케이크 자르는 방식, 조각 선택으로 16유형 분석. 12문항, 약 3분 소요.
            </p>

            <div className="flex justify-center items-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>11,366명 참여</span>
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
                className="h-16 px-12 text-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link href="/tests/cake-cutting/test">
                  <span className="text-2xl mr-3">🍰</span>
                  테스트 시작하기
                </Link>
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                무료 • 회원가입 불필요 • 16가지 케이크 스타일 분석
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 space-y-12">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold flex items-center justify-center space-x-2">
                  <Cake className="h-6 w-6 text-pink-500" />
                  <span>이런 질문들이 나와요!</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-4">
                    <div className="p-4 bg-pink-50 dark:bg-pink-950 rounded-lg">
                      <p className="font-medium">1. 케이크 자르는 방식은?</p>
                      <p className="text-sm text-muted-foreground mt-1">정확하게 균등하게 vs 대충 자르기</p>
                    </div>
                    <div className="p-4 bg-rose-50 dark:bg-rose-950 rounded-lg">
                      <p className="font-medium">2. 조각 선택은?</p>
                      <p className="text-sm text-muted-foreground mt-1">예쁜 조각 vs 큰 조각</p>
                    </div>
                    <div className="p-4 bg-pink-50 dark:bg-pink-950 rounded-lg">
                      <p className="font-medium">3. 케이크 자르는 순서는?</p>
                      <p className="text-sm text-muted-foreground mt-1">정해진 순서 vs 그때그때</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-rose-50 dark:bg-rose-950 rounded-lg">
                      <p className="font-medium">4. 케이크 장식은?</p>
                      <p className="text-sm text-muted-foreground mt-1">장식 보존 vs 맛 중심</p>
                    </div>
                    <div className="p-4 bg-pink-50 dark:bg-pink-950 rounded-lg">
                      <p className="font-medium">5. 케이크 나눠주는 방식은?</p>
                      <p className="text-sm text-muted-foreground mt-1">공평하게 vs 그때그때</p>
                    </div>
                    <div className="p-4 bg-rose-50 dark:bg-rose-950 rounded-lg">
                      <p className="font-medium">6. 케이크 먹는 순서는?</p>
                      <p className="text-sm text-muted-foreground mt-1">정해진 순서 vs 그때그때</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      
        <GscLandingBoost
          title="케이크 자르는 방식으로 보는 성향"
          summary="케이크를 어떻게 자르고 어떤 조각을 고르는지는 공평함, 디테일, 분위기 배려 같은 성향을 드러냅니다. 이 테스트는 행동을 맞고 틀리게 나누지 않고 함께 먹는 자리에서 내가 어떤 기준으로 움직이는지 보여줍니다."
          guides={[
            {
              title: "공평함 기준 보기",
              description:
                "조각 크기를 정확히 맞추려는지, 분위기를 우선해 자연스럽게 나누는지에 따라 결과가 달라집니다.",
            },
            {
              title: "선택 순서 해석",
              description:
                "먼저 고르는지, 남은 조각을 받는지, 다른 사람 취향을 먼저 묻는지 같은 선택이 성향 단서가 됩니다.",
            },
            {
              title: "파티·디저트 테스트와 연결",
              description:
                "케이크 결과는 디저트 취향, 카페 스타일, 모임 반응 테스트와 같이 보면 더 자연스럽게 읽힙니다.",
            },
          ]}
          relatedLinks={[
            { href: "/tests/dessert-style", label: "디저트 취향 테스트" },
            { href: "/tests/cafe-style", label: "카페 스타일 테스트" },
            { href: "/tests/weekend-social", label: "주말 모임 테스트" },
          ]}
          tone="pink"
        />

        <div className="mt-12">
          <AnswerEngineSection quizTitle="Cake Cutting Test" />
        </div>

        <div className="mt-12">
          <LandingConversionSection quizTitle="Cake Cutting Test" />
        </div>

        <div className="mt-12">
          <RelatedTestsSection testId="cake-cutting" />
        </div>

        {/* FAQ Section for AI Bot Optimization */}
        <section className="mt-12 mb-8">
          <FAQSection faqs={faqs} title="케이크 자르는 스타일 테스트 자주 묻는 질문" />
        </section>
</main>
    </div>
    </>
  )
}
