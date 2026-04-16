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
import { Clock, Users, Search, Sparkles } from "lucide-react"

// Naver-optimized description (under 80 chars)
const shortDescription = "phone search로 알아보는 나의 성격 유형 테스트"
// Full description for Google/AI
const fullDescription = "phone search로 알아보는 나의 성격! 12개의 질문으로 16가지 유형 중 당신은 어떤 유형일까요? 재미있는 phone search를 지금 바로 무료로 시작해보세요."

export const metadata: Metadata = generateQuizMetadata({
  quizId: "phone-search",
  title: "phone search",
  shortDescription,
  fullDescription,
  keywords: "검색, 스마트폰, 검색 습관, 디지털 테스트, 성격 테스트, MBTI, 심리테스트, 무료 테스트",
  canonical: "/tests/phone-search",
  questionCount: 12,
  duration: "PT3M",
})

const faqs = [
  ...getTopicQuizFAQs("phone search"),
]

export default function PhoneSearchIntro() {
  const schemas = generateQuizSchemas({
    quizId: "phone-search",
    title: "phone search",
    shortDescription,
    fullDescription,
    keywords: "검색, 스마트폰, 검색 습관, 디지털 테스트, 성격 테스트, MBTI, 심리테스트, 무료 테스트",
    canonical: "/tests/phone-search",
    questionCount: 12,
    duration: "PT3M",
    faqs,
  })

  return (
    <>
      {/* Structured Data for SEO/GEO */}
      <JsonLd id="phone-search-quiz-schema" data={schemas.quiz} />
      <JsonLd id="phone-search-breadcrumb-schema" data={schemas.breadcrumb} />
      {schemas.faq && <JsonLd id="phone-search-faq-schema" data={schemas.faq} />}

      <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950">
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="text-center space-y-8">
          <div className="relative mx-auto w-32 h-32 mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full animate-pulse" />
            <div className="absolute inset-2 bg-gradient-to-br from-amber-200 to-orange-300 rounded-full flex items-center justify-center">
              <span className="text-4xl animate-bounce">🔍</span>
            </div>
            <div className="absolute -top-6 -left-6 text-lg animate-bounce" style={{ animationDelay: "0.5s" }}>
              💡
            </div>
            <div className="absolute -top-4 -right-8 text-lg animate-bounce" style={{ animationDelay: "1s" }}>
              📚
            </div>
            <div className="absolute -bottom-6 -left-8 text-lg animate-bounce" style={{ animationDelay: "1.5s" }}>
              🌐
            </div>
            <div className="absolute -bottom-4 -right-6 text-lg animate-bounce" style={{ animationDelay: "2s" }}>
              ✨
            </div>
          </div>

          <div className="space-y-6">
            <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
              🔍 NEW 테스트
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                검색 습관으로 보는
              </span>
              <br />
              <span className="text-foreground">나의 성격 유형 🔍</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              궁금한 것이 생겼을 때, 검색 결과를 볼 때 등 구체적인 상황으로 16유형 분석. 12문항, 약 3분 소요.
            </p>

            <div className="flex justify-center items-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>17,908명 참여</span>
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
                <Link href="/tests/phone-search/test">
                  <span className="text-2xl mr-3">🔍</span>
                  테스트 시작하기
                </Link>
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                무료 • 회원가입 불필요 • 16가지 검색 습관 스타일 분석
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 space-y-12">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold flex items-center justify-center space-x-2">
                  <Search className="h-6 w-6 text-amber-500" />
                  <span>이런 질문들이 나와요!</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-4">
                    <div className="p-4 bg-amber-50 dark:bg-amber-950 rounded-lg">
                      <p className="font-medium">1. 궁금한 것이 생겼을 때</p>
                      <p className="text-sm text-muted-foreground mt-1">즉시 검색한다 vs 나중에 검색한다</p>
                    </div>
                    <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                      <p className="font-medium">2. 검색 결과를 볼 때</p>
                      <p className="text-sm text-muted-foreground mt-1">빠르게 스크롤한다 vs 하나씩 자세히 본다</p>
                    </div>
                    <div className="p-4 bg-amber-50 dark:bg-amber-950 rounded-lg">
                      <p className="font-medium">3. 검색을 하는 방식</p>
                      <p className="text-sm text-muted-foreground mt-1">혼자 조용히 검색한다 vs 사람들과 함께 검색한다</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                      <p className="font-medium">4. 검색을 하는 시간</p>
                      <p className="text-sm text-muted-foreground mt-1">정해진 시간에 검색한다 vs 그때그때 검색한다</p>
                    </div>
                    <div className="p-4 bg-amber-50 dark:bg-amber-950 rounded-lg">
                      <p className="font-medium">5. 검색을 하는 이유</p>
                      <p className="text-sm text-muted-foreground mt-1">목표와 효율을 위해 vs 기분과 컨디션을 위해</p>
                    </div>
                    <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                      <p className="font-medium">6. 검색 결과를 선택하는 기준</p>
                      <p className="text-sm text-muted-foreground mt-1">효율성과 목표를 위해 vs 기분과 컨디션을 위해</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold">🔍 16가지 검색 습관 스타일</h2>
                <p className="text-muted-foreground">당신은 어떤 검색러일까요?</p>

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
                      className="p-3 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 rounded-lg text-center"
                    >
                      <div className="text-2xl mb-1">{character.emoji}</div>
                      <div className="text-xs font-medium">{character.name}</div>
                      <div className="text-xs text-muted-foreground">{character.type}</div>
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
                  <Sparkles className="h-6 w-6 text-orange-500" />
                  <span>특별한 기능</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <h3 className="font-semibold">정확한 분석</h3>
                    <p className="text-sm text-muted-foreground">12문항으로 검색 습관을 4축으로 정량화해 유형화</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">💡</span>
                    </div>
                    <h3 className="font-semibold">맞춤 팁</h3>
                    <p className="text-sm text-muted-foreground">당신의 유형에 맞는 검색 습관 스타일 및 팁 제공</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🔗</span>
                    </div>
                    <h3 className="font-semibold">쉬운 공유</h3>
                    <p className="text-sm text-muted-foreground">결과를 친구들과 쉽게 공유하고 비교해보세요</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      
        <div className="mt-12">
          <AnswerEngineSection quizTitle="Phone Search Test" />
        </div>

        <div className="mt-12">
          <LandingConversionSection quizTitle="Phone Search Test" />
        </div>

        <div className="mt-12">
          <RelatedTestsSection testId="phone-search" />
        </div>

        {/* FAQ Section for AI Bot Optimization */}
        <section className="mt-12 mb-8">
          <FAQSection faqs={faqs} title="phone search 자주 묻는 질문" />
        </section>
</main>
    </div>
    </>
  )
}
