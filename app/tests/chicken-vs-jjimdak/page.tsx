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
const shortDescription = "찜닭 vs 치킨 선택 테스트로 음식 취향과 선택 성향을 16유형으로 확인하세요."
// Full description for Google/AI
const fullDescription = "찜닭 vs 치킨 선택 테스트로 찜닭파인지 치킨파인지, 국물·바삭함·매운맛·함께 먹는 방식을 기준으로 음식 선택 성향을 확인하세요. 12문항 무료 테스트입니다."

export const metadata: Metadata = generateQuizMetadata({
  quizId: "chicken-vs-jjimdak",
  title: "찜닭 vs 치킨 선택 테스트",
  shortDescription,
  fullDescription,
  keywords: "찜닭 vs 치킨 테스트, 찜닭 테스트, 치킨 테스트, 찜닭파, 치킨파, 음식 취향 테스트, 무료 테스트",
  canonical: "/tests/chicken-vs-jjimdak",
  questionCount: 12,
  duration: "PT3M",
})

const faqs = [
  ...getTopicQuizFAQs("찜닭 vs 치킨 선택 테스트"),
]

const gscGuides = [
  {
    title: "찜닭 vs 치킨 테스트 검색",
    description:
      "찜닭파인지 치킨파인지 단순 선호를 넘어 국물, 바삭함, 매운맛, 사이드 선택 기준을 봅니다.",
  },
  {
    title: "음식 취향 성향 분석",
    description:
      "혼자 먹을 때와 같이 먹을 때 선택이 달라지는지, 안정적인 메뉴와 즉흥 메뉴 중 어디에 가까운지 확인합니다.",
  },
  {
    title: "가벼운 밈형 결과",
    description:
      "정밀 진단보다 친구와 공유하기 좋은 음식 취향 테스트로 16가지 선택 스타일을 보여줍니다.",
  },
]

export default function ChickenVsJjimdakIntro() {
  const schemas = generateQuizSchemas({
    quizId: "chicken-vs-jjimdak",
    title: "찜닭 vs 치킨 선택 테스트",
    shortDescription,
    fullDescription,
    keywords: "찜닭 vs 치킨 테스트, 찜닭 테스트, 치킨 테스트, 찜닭파, 치킨파, 음식 취향 테스트, 무료 테스트",
    canonical: "/tests/chicken-vs-jjimdak",
    questionCount: 12,
    duration: "PT3M",
    faqs,
  })

  return (
    <>
      {/* Structured Data for SEO/GEO */}
      <JsonLd id="chicken-vs-jjimdak-quiz-schema" data={schemas.quiz} />
      <JsonLd id="chicken-vs-jjimdak-breadcrumb-schema" data={schemas.breadcrumb} />
      {schemas.faq && <JsonLd id="chicken-vs-jjimdak-faq-schema" data={schemas.faq} />}

      <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950">
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="text-center space-y-8">
          <div className="relative mx-auto w-32 h-32 mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-500 rounded-full animate-pulse" />
            <div className="absolute inset-2 bg-gradient-to-br from-orange-200 to-red-300 rounded-full flex items-center justify-center">
              <span className="text-4xl animate-bounce">🍗</span>
            </div>
            <div className="absolute -top-6 -left-6 text-lg animate-bounce" style={{ animationDelay: "0.5s" }}>
              🥘
            </div>
            <div className="absolute -top-4 -right-8 text-lg animate-bounce" style={{ animationDelay: "1s" }}>
              🍖
            </div>
            <div className="absolute -bottom-6 -left-8 text-lg animate-bounce" style={{ animationDelay: "1.5s" }}>
              🌶️
            </div>
            <div className="absolute -bottom-4 -right-6 text-lg animate-bounce" style={{ animationDelay: "2s" }}>
              🔥
            </div>
          </div>

          <div className="space-y-6">
            <Badge variant="secondary" className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
              🍗 NEW 테스트
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                찜닭파 vs 치킨파
              </span>
              <br />
              <span className="text-foreground">당신은 어느 쪽? 🍗</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              찜닭과 치킨 중 선택 기준으로 16유형 분석. 12문항, 약 3분 소요.
            </p>

            <div className="flex justify-center items-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>8,308명 참여</span>
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
                <Link href="/tests/chicken-vs-jjimdak/test">
                  <span className="text-2xl mr-3">🍗</span>
                  테스트 시작하기
                </Link>
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                무료 • 회원가입 불필요 • 16가지 선호 스타일 분석
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
                      <p className="font-medium">1. 찜닭 vs 치킨 선택 기준은?</p>
                      <p className="text-sm text-slate-700 dark:text-slate-200 mt-1">찜닭 선호 vs 치킨 선호</p>
                    </div>
                    <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg">
                      <p className="font-medium">2. 먹는 방식은?</p>
                      <p className="text-sm text-slate-700 dark:text-slate-200 mt-1">국물과 함께 vs 바삭하게</p>
                    </div>
                    <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                      <p className="font-medium">3. 선택 이유는?</p>
                      <p className="text-sm text-slate-700 dark:text-slate-200 mt-1">따뜻함 vs 바삭함</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg">
                      <p className="font-medium">4. 함께 먹는 음식은?</p>
                      <p className="text-sm text-slate-700 dark:text-slate-200 mt-1">밥과 함께 vs 맥주와 함께</p>
                    </div>
                    <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                      <p className="font-medium">5. 매운 정도는?</p>
                      <p className="text-sm text-slate-700 dark:text-slate-200 mt-1">매운맛 선호 vs 순한맛 선호</p>
                    </div>
                    <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg">
                      <p className="font-medium">6. 먹는 감정은?</p>
                      <p className="text-sm text-slate-700 dark:text-slate-200 mt-1">따뜻함 vs 상쾌함</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      
        <div className="mt-12">
          <GscLandingBoost
            title="찜닭 vs 치킨 선택 테스트로 보는 음식 취향"
            summary="찜닭 vs 치킨 선택 테스트는 찜닭파, 치킨파, 음식 취향 테스트를 찾는 검색 의도에 맞춘 무료 성향 테스트입니다. 국물과 바삭함, 매운맛, 같이 먹는 방식의 선택을 바탕으로 16가지 음식 선택 스타일을 보여줍니다."
            guides={gscGuides}
            relatedLinks={[
              { href: "/tests/food-spiciness", label: "매운맛 취향 테스트" },
              { href: "/tests/food-ordering", label: "주문 방식 테스트" },
              { href: "/tests/ramen-mbti", label: "라면 MBTI 테스트" },
            ]}
            tone="orange"
          />
        </div>

        <div className="mt-12">
          <AnswerEngineSection quizTitle="Chicken Vs Jjimdak Test" />
        </div>

        <div className="mt-12">
          <LandingConversionSection quizTitle="Chicken Vs Jjimdak Test" />
        </div>

        <div className="mt-12">
          <RelatedTestsSection testId="chicken-vs-jjimdak" />
        </div>

        {/* FAQ Section for AI Bot Optimization */}
        <section className="mt-12 mb-8">
          <FAQSection faqs={faqs} title="찜닭 vs 치킨 선택 테스트 자주 묻는 질문" />
        </section>
</main>
    </div>
    </>
  )
}
