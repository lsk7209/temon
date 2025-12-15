import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { JsonLd } from "@/components/json-ld"
import { FAQSection } from "@/components/faq-section"
import { generateQuizMetadata, generateQuizSchemas, getDefaultQuizFAQs } from "@/lib/quiz-seo-utils"
import { ExternalLink } from "lucide-react"

// Naver-optimized description (under 80 chars)
const shortDescription = "커피 취향으로 알아보는 성격 유형 테스트. 16가지 커피 MBTI 유형 발견!"
// Full description for Google/AI
const fullDescription = "커피 MBTI 테스트로 알아보는 나의 성격! 좋아하는 커피로 16가지 커피 유형 중 당신은 어떤 커피일까요? 커피 취향에 숨겨진 성격 특성을 발견하고, 나에게 맞는 완벽한 커피를 추천받아보세요. 재미있는 커피 MBTI 테스트를 지금 시작해보세요."

export const metadata: Metadata = generateQuizMetadata({
  quizId: "coffee-mbti",
  title: "커피 MBTI 테스트",
  shortDescription,
  fullDescription,
  keywords: "커피 MBTI, 커피 테스트, 성격 테스트, MBTI, 커피 유형, 심리테스트, 무료 테스트",
  canonical: "/tests/coffee-mbti",
  questionCount: 12,
  duration: "PT3M",
})

const faqs = [
  ...getDefaultQuizFAQs("커피 MBTI 테스트"),
  {
    question: "이 테스트는 어떤 원리로 작동하나요?",
    answer: "MBTI 성격 유형 이론을 바탕으로 커피 취향과 성격의 연관성을 분석하여 제작되었습니다. 12개의 질문을 통해 당신의 성향을 파악합니다.",
  },
  {
    question: "커피를 좋아하지 않아도 테스트할 수 있나요?",
    answer: "네, 가능합니다. 테스트는 커피 취향을 통해 성격을 알아보는 것이지만, 커피를 자주 마시지 않으시더라도 일반적인 선호도를 바탕으로 답변하시면 됩니다.",
  },
]

export default function CoffeeMBTI() {
  const schemas = generateQuizSchemas({
    quizId: "coffee-mbti",
    title: "커피 MBTI 테스트",
    shortDescription,
    fullDescription,
    keywords: "커피 MBTI, 커피 테스트",
    canonical: "/tests/coffee-mbti",
    questionCount: 12,
    duration: "PT3M",
    faqs,
  })

  return (
    <>
      {/* Structured Data for SEO/GEO */}
      <JsonLd id="coffee-mbti-quiz-schema" data={schemas.quiz} />
      <JsonLd id="coffee-mbti-breadcrumb-schema" data={schemas.breadcrumb} />
      {schemas.faq && <JsonLd id="coffee-mbti-faq-schema" data={schemas.faq} />}

      <article className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto">
            {/* Header Section */}
            <header className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">☕ 커피 MBTI</h1>
              <p className="text-xl text-gray-600 mb-8">당신의 커피 취향으로 알아보는 성격 유형</p>
            </header>

            {/* Main Content Section */}
            <section className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="space-y-8">
                <div className="text-left">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">🎯 테스트 소개</h2>
                  <div className="space-y-3 text-gray-600">
                    <p>• 좋아하는 커피로 알아보는 나의 성격</p>
                    <p>• 16가지 커피 유형 중 당신의 유형은?</p>
                    <p>• 커피 취향에 숨겨진 성격 특성 발견</p>
                    <p>• 나에게 맞는 완벽한 커피 추천</p>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                    <div className="text-center">
                      <div className="font-semibold text-amber-600">소요시간</div>
                      <div>약 3분</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-amber-600">문항수</div>
                      <div>12문항</div>
                    </div>
                  </div>
                </div>

                {/* Outlink for Trust (E-E-A-T) */}
                <div className="text-left border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">참고 자료</h3>
                  <a 
                    href="https://ko.wikipedia.org/wiki/MBTI" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-amber-600 hover:text-amber-700 hover:underline"
                  >
                    MBTI 성격 유형 검사란? <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>
            </section>

            <Link href="/tests/coffee-mbti/test">
              <Button
                size="lg"
                className="w-full md:w-auto px-12 py-4 text-lg font-semibold bg-amber-600 hover:bg-amber-700 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                테스트 시작하기 🚀
              </Button>
            </Link>

            {/* CTA Section */}
            <section className="text-center mb-8">
              <Link href="/tests/coffee-mbti/test">
                <Button
                  size="lg"
                  className="w-full md:w-auto px-12 py-4 text-lg font-semibold bg-amber-600 hover:bg-amber-700 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                  테스트 시작하기 🚀
                </Button>
              </Link>
              <div className="mt-8 text-sm text-gray-500">
                <p>💡 정확한 결과를 위해 솔직하게 답변해주세요!</p>
              </div>
            </section>

            {/* FAQ Section for AI Bot Optimization */}
            <section className="mt-12">
              <FAQSection faqs={faqs} title="커피 MBTI 테스트 자주 묻는 질문" />
            </section>
          </div>
        </div>
      </article>
    </>
  )
}
