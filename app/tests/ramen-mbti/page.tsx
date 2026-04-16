import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { JsonLd } from "@/components/json-ld"
import { FAQSection } from "@/components/faq-section"
import { AnswerEngineSection } from "@/components/answer-engine-section"
import { LandingConversionSection } from "@/components/landing-conversion-section"
import { RelatedTestsSection } from "@/components/related-tests-section"
import { generateQuizMetadata, generateQuizSchemas, getDefaultQuizFAQs } from "@/lib/quiz-seo-utils"
import { ExternalLink } from "lucide-react"

// Naver-optimized description (under 80 chars)
const shortDescription = "라면 취향으로 알아보는 성격 유형 테스트. 16가지 라면 MBTI 유형 발견!"
// Full description for Google/AI
const fullDescription = "라면 MBTI 테스트로 알아보는 나의 성격! 좋아하는 라면으로 16가지 라면 유형 중 당신은 어떤 라면일까요? 라면 끓이는 방법, 토핑 선택, 먹는 습관 등으로 알아보는 나의 성격 특성. 재미있는 라면 MBTI 테스트를 지금 시작해보세요."

export const metadata: Metadata = generateQuizMetadata({
  quizId: "ramen-mbti",
  title: "라면 MBTI 테스트",
  shortDescription,
  fullDescription,
  keywords: "라면 MBTI, 라면 테스트, 성격 테스트, MBTI, 라면 유형, 심리테스트, 무료 테스트",
  canonical: "/tests/ramen-mbti",
  questionCount: 12,
  duration: "PT3M",
})

const faqs = [
  ...getDefaultQuizFAQs("라면 MBTI 테스트"),
  {
    question: "라면 취향으로 성격을 알 수 있나요?",
    answer: "라면을 끓이고 먹는 방식(꼬들면 vs 푹익면, 계란 유무 등)은 개인의 선호와 습관을 반영하며, 이를 MBTI 성향과 연결하여 재미있게 분석했습니다. 과학적 근거보다는 재미로 즐겨주세요!",
  },
  {
    question: "어떤 라면 유형이 있나요?",
    answer: "신라면, 진라면, 불닭볶음면, 짜파게티 등 16가지 다양한 라면 유형으로 당신의 성격을 표현해드립니다. 각 라면의 특징과 당신의 성격이 얼마나 일치하는지 확인해보세요.",
  },
]

export default function RamenMBTI() {
  const schemas = generateQuizSchemas({
    quizId: "ramen-mbti",
    title: "라면 MBTI 테스트",
    shortDescription,
    fullDescription,
    keywords: "라면 MBTI, 라면 테스트",
    canonical: "/tests/ramen-mbti",
    questionCount: 12,
    duration: "PT3M",
    faqs,
  })

  return (
    <>
      {/* Structured Data for SEO/GEO */}
      <JsonLd id="ramen-mbti-quiz-schema" data={schemas.quiz} />
      <JsonLd id="ramen-mbti-breadcrumb-schema" data={schemas.breadcrumb} />
      {schemas.faq && <JsonLd id="ramen-mbti-faq-schema" data={schemas.faq} />}

      <article className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto">
            {/* Header Section */}
            <header className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">🍜 라면 MBTI</h1>
              <p className="text-xl text-gray-600 mb-8">당신의 라면 취향으로 알아보는 성격 유형</p>
            </header>

            {/* Main Content Section */}
            <section className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="space-y-6">
                <div className="text-left">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">🎯 테스트 소개</h2>
                  <div className="space-y-3 text-gray-600">
                    <p>• 좋아하는 라면으로 알아보는 나의 성격</p>
                    <p>• 16가지 라면 유형 중 당신의 유형은?</p>
                    <p>• 라면 취향에 숨겨진 성격 특성 발견</p>
                    <p>• 친구들과 함께 즐기는 재미있는 테스트</p>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                    <div className="text-center">
                      <div className="font-semibold text-orange-600">소요시간</div>
                      <div>약 3분</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-orange-600">문항수</div>
                      <div>12문항</div>
                    </div>
                  </div>
                </div>

                {/* Outlink for Trust (E-E-A-T) */}
                <div className="text-left border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">관련 정보</h3>
                  <a
                    href="https://ko.wikipedia.org/wiki/%EB%9D%BC%EB%A9%B4"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-orange-600 hover:text-orange-700 hover:underline"
                  >
                    라면의 역사와 종류 알아보기 <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="text-center mb-8">
              <Link href="/tests/ramen-mbti/test">
                <Button
                  size="lg"
                  className="w-full md:w-auto px-12 py-4 text-lg font-semibold bg-orange-600 hover:bg-orange-700"
                >
                  테스트 시작하기 🚀
                </Button>
              </Link>
              <div className="mt-8 text-sm text-gray-500">
                <p>💡 정확한 결과를 위해 솔직하게 답변해주세요!</p>
              </div>
            </section>

            <AnswerEngineSection quizTitle="Ramen MBTI" />

            <LandingConversionSection quizTitle="Ramen MBTI" />

            <RelatedTestsSection testId="ramen-mbti" />

            {/* FAQ Section for AI Bot Optimization */}
            <section className="mt-12">
              <FAQSection faqs={faqs} title="라면 MBTI 테스트 자주 묻는 질문" />
            </section>
          </div>
        </div>
      </article>
    </>
  )
}
