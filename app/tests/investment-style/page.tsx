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

const shortDescription = "나는 야수의 심장일까, 소심한 개미일까? 투자 습관으로 알아보는 16가지 투자 유형."
const fullDescription = "주식 투자 스타일 테스트로 알아보는 나의 투자 DNA! 존버가 답일까, 단타가 답일까? 12개의 질문으로 나의 실전 투자 성향과 장단점을 분석하고, 성공 투자를 위한 맞춤형 조언을 받아보세요."

export const metadata: Metadata = generateQuizMetadata({
  quizId: "investment-style",
  title: "주식 투자 스타일 테스트",
  shortDescription,
  fullDescription,
  keywords: "주식, 투자, 재테크, 투자 스타일, 성향 테스트, MBTI, 무료 테스트",
  canonical: "/tests/investment-style",
  questionCount: 12,
  duration: "PT3M",
})

const faqs = [
  ...getTopicQuizFAQs("주식 투자 스타일 테스트"),
]

export default function InvestmentStyleIntro() {
  const schemas = generateQuizSchemas({
    quizId: "investment-style",
    title: "주식 투자 스타일 테스트",
    shortDescription,
    fullDescription,
    keywords: "주식, 투자, 재테크, 투자 스타일, 성향 테스트, MBTI, 무료 테스트",
    canonical: "/tests/investment-style",
    questionCount: 12,
    duration: "PT3M",
    faqs,
  })

  return (
    <>
      <JsonLd id="investment-style-quiz-schema" data={schemas.quiz} />
      <JsonLd id="investment-style-breadcrumb-schema" data={schemas.breadcrumb} />
      {schemas.faq && <JsonLd id="investment-style-faq-schema" data={schemas.faq} />}

      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                📈 주식 투자 스타일 테스트
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                내 돈은 소중하니까! 나의 투자 DNA 확인하기
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
              <div className="space-y-6">
                <div className="text-left">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                    🎯 테스트 소개
                  </h2>
                  <div className="space-y-3 text-gray-600 dark:text-gray-300">
                    <p>• 12개 질문으로 알아보는 나의 실전 투자 성향</p>
                    <p>• 존버가 답일까? 단타가 답일까?</p>
                    <p>• 나의 투자 장단점 완벽 분석</p>
                    <p>• 성공 투자를 위한 맞춤형 조언 제공</p>
                  </div>
                </div>

                <div className="border-t dark:border-gray-700 pt-6">
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="text-center">
                      <div className="font-semibold text-green-600 dark:text-green-400">소요시간</div>
                      <div>약 3분</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-green-600 dark:text-green-400">문항수</div>
                      <div>12문항</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Link href="/tests/investment-style/test">
              <Button
                size="lg"
                className="w-full md:w-auto px-12 py-4 text-lg font-semibold bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-800"
              >
                테스트 시작하기 💰
              </Button>
            </Link>

            <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
              <p>💡 투자의 책임은 본인에게 있습니다... (농담)</p>
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="mt-12">
              <AnswerEngineSection quizTitle="Investment Style Test" />
            </div>

            <div className="mt-12">
              <LandingConversionSection quizTitle="Investment Style Test" />
            </div>

            <div className="mt-12">
              <RelatedTestsSection testId="investment-style" />
            </div>

            <section className="mt-12 mb-8">
              <FAQSection faqs={faqs} title="주식 투자 스타일 테스트 자주 묻는 질문" />
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
