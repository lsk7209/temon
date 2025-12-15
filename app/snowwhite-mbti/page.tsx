import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { JsonLd } from "@/components/json-ld"
import { FAQSection } from "@/components/faq-section"
import { generateQuizMetadata, generateQuizSchemas, getDefaultQuizFAQs } from "@/lib/quiz-seo-utils"

// Naver-optimized description (under 80 chars)
const shortDescription = "백설공주 에겐테토 테스트. 감정파 에겐 vs 효율파 테토!"
// Full description for Google/AI
const fullDescription = "백설공주 에겐테토 테스트로 알아보는 나의 성향! 백설공주와 일곱 난장이 이야기로 감정파 에겐일까? 효율파 테토일까? 4가지 유형: 백설 에겐공주, 에겐왕자, 테토여왕, 난장이 테토남. 병맛 넘치는 재미있는 질문과 결과! 지금 바로 무료로 시작해보세요."

export const metadata: Metadata = generateQuizMetadata({
  quizId: "snowwhite-mbti",
  title: "백설공주 에겐테토 테스트",
  shortDescription,
  fullDescription,
  keywords: "백설공주, 에겐테토, 성격 테스트, MBTI, 병맛 테스트, 심리테스트, 무료 테스트",
  canonical: "/snowwhite-mbti",
  questionCount: 10,
  duration: "PT2M",
})

const faqs = [
  ...getDefaultQuizFAQs("백설공주 에겐테토 테스트"),
  {
    question: "에겐과 테토가 무엇인가요?",
    answer: "에겐은 감정을 중시하는 성향을, 테토는 효율과 논리를 중시하는 성향을 나타냅니다. 이 테스트는 백설공주 동화 속 상황을 통해 당신이 에겐 성향인지 테토 성향인지 알아보는 재미있는 테스트입니다.",
  },
  {
    question: "어떤 유형들이 나오나요?",
    answer: "백설 에겐공주, 에겐왕자, 테토여왕, 난장이 테토남 등 4가지 유형이 있습니다. 각 유형은 백설공주 동화 속 캐릭터와 매칭되어 있어요.",
  },
]

export default function SnowWhiteMBTI() {
  const schemas = generateQuizSchemas({
    quizId: "snowwhite-mbti",
    title: "백설공주 에겐테토 테스트",
    shortDescription,
    fullDescription,
    keywords: "백설공주, 에겐테토",
    canonical: "/snowwhite-mbti",
    questionCount: 10,
    duration: "PT2M",
    faqs,
  })

  return (
    <>
      {/* Structured Data for SEO/GEO */}
      <JsonLd id="snowwhite-mbti-quiz-schema" data={schemas.quiz} />
      <JsonLd id="snowwhite-mbti-breadcrumb-schema" data={schemas.breadcrumb} />
      {schemas.faq && <JsonLd id="snowwhite-mbti-faq-schema" data={schemas.faq} />}

      <article className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">🍎 백설공주와 일곱 난장이</h1>
            <p className="text-xl text-gray-600 mb-8">나는 감정파 에겐일까? 효율파 테토일까? 🍎⚡</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="space-y-6">
              <div className="text-left">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">🎯 테스트 소개</h2>
                <div className="space-y-3 text-gray-600">
                  <p>• 백설공주 동화 속 상황으로 알아보는 나의 성향</p>
                  <p>• 감정파 에겐 vs 효율파 테토, 나는 어디에?</p>
                  <p>• 4가지 유형: 백설 에겐공주, 에겐왕자, 테토여왕, 난장이 테토남</p>
                  <p>• 병맛 넘치는 재미있는 질문과 결과!</p>
                </div>
              </div>

              <div className="border-t pt-6">
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                  <div className="text-center">
                    <div className="font-semibold text-pink-600">소요시간</div>
                    <div>약 2분</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-pink-600">문항수</div>
                    <div>10문항</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Link href="/snowwhite-mbti/test">
            <Button
              size="lg"
              className="w-full md:w-auto px-12 py-4 text-lg font-semibold bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
            >
              테스트 시작하기 🚀
            </Button>
          </Link>

          <div className="mt-8 text-sm text-gray-500">
            <p>💡 솔직하게 답변하면 더 재미있어요!</p>
          </div>
        </div>

        {/* FAQ Section for AI Bot Optimization */}
        <section className="mt-12 max-w-2xl mx-auto">
          <FAQSection faqs={faqs} title="백설공주 에겐테토 테스트 자주 묻는 질문" />
        </section>
      </div>
    </article>
    </>
  )
}
