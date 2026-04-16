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
import { Card } from "@/components/ui/card"
import { Sparkles } from "lucide-react"

// Naver-optimized description (under 80 chars)
const shortDescription = "K-팝 아이돌 포지션 테스트로 알아보는 나의 포지션! 카리스마 리더부터 4차원 막내까지, 아이돌 그룹에서 내 포지션을 무료로 확인해보세요."
// Full description for Google/AI
const fullDescription = "K-팝 아이돌 포지션 테스트로 알아보는 나의 포지션! 카리스마 리더부터 4차원 막내까지, 아이돌 그룹에서 내 포지션을 무료로 확인해보세요."

export const metadata: Metadata = generateQuizMetadata({
  quizId: "kpop-idol",
  title: "K-팝 아이돌 포지션 테스트 - 무료 성격 테스트",
  shortDescription,
  fullDescription,
  keywords: "K-팝, 아이돌 테스트, 포지션 테스트, 성격 테스트, MBTI, 심리테스트, 무료 테스트",
  canonical: "/tests/kpop-idol",
  questionCount: 8,
  duration: "PT2M",
})

const faqs = [
  ...getTopicQuizFAQs("K-팝 아이돌 포지션 테스트 - 무료 성격 테스트"),
]

export default function KpopIdolIntro() {
  const schemas = generateQuizSchemas({
    quizId: "kpop-idol",
    title: "K-팝 아이돌 포지션 테스트 - 무료 성격 테스트",
    shortDescription,
    fullDescription,
    keywords: "K-팝, 아이돌 테스트, 포지션 테스트, 성격 테스트, MBTI, 심리테스트, 무료 테스트",
    canonical: "/tests/kpop-idol",
    questionCount: 8,
    duration: "PT2M",
    faqs,
  })

  return (
    <>
      {/* Structured Data for SEO/GEO */}
      <JsonLd id="kpop-idol-quiz-schema" data={schemas.quiz} />
      <JsonLd id="kpop-idol-breadcrumb-schema" data={schemas.breadcrumb} />
      {schemas.faq && <JsonLd id="kpop-idol-faq-schema" data={schemas.faq} />}

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <Card className="p-8 md:p-12 text-center shadow-xl border-2 border-purple-200 bg-white/90 backdrop-blur">
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="text-7xl animate-bounce">🎤</div>
              <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-purple-500 animate-pulse" />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            K-팝 아이돌 포지션 테스트
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 mb-6 font-medium">아이돌 그룹에서 내 포지션은?</p>

          <div className="space-y-4 mb-8 text-left bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
            <p className="text-gray-700 leading-relaxed">
              <span className="font-bold text-purple-600">🫡 카리스마 리더</span>부터{" "}
              <span className="font-bold text-pink-600">🐣 4차원 막내</span>까지!
            </p>
            <p className="text-gray-700 leading-relaxed">당신은 팀을 책임지는 리더일까, 모두의 사랑받는 막내일까?</p>
            <p className="text-gray-700 leading-relaxed">8개의 아이돌 상황에서 당신의 선택으로 포지션을 찾아보세요!</p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center mb-8">
            <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium border border-purple-300">
              🫡 리더
            </span>
            <span className="px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-sm font-medium border border-pink-300">
              🎤 메인보컬
            </span>
            <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium border border-blue-300">
              🕺 메인댄서
            </span>
            <span className="px-4 py-2 bg-rose-100 text-rose-700 rounded-full text-sm font-medium border border-rose-300">
              ✨ 비주얼
            </span>
            <span className="px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-medium border border-amber-300">
              🐣 막내
            </span>
          </div>

          <Link href="/tests/kpop-idol/test">
            <Button
              size="lg"
              className="w-full md:w-auto px-12 py-6 text-lg font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              데뷔하기 🎤
            </Button>
          </Link>

          <p className="mt-6 text-sm text-gray-500">소요 시간: 약 2분 | 총 8문항</p>
        </Card>
      
        <div className="mt-12">
          <AnswerEngineSection quizTitle="Kpop Idol Test" />
        </div>

        <div className="mt-12">
          <LandingConversionSection quizTitle="Kpop Idol Test" />
        </div>

        <div className="mt-12">
          <RelatedTestsSection testId="kpop-idol" />
        </div>

        {/* FAQ Section for AI Bot Optimization */}
        <section className="mt-12 mb-8">
          <FAQSection faqs={faqs} title="K-팝 아이돌 포지션 테스트 - 무료 성격 테스트 자주 묻는 질문" />
        </section>
</div>
    </div>
    </>
  )
}
