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

const shortDescription = "이별 후 나의 행동과 감정 처리를 통해 알아보는 16가지 이별 후유증 유형 분석."
const fullDescription = "이별 후유증 유형 테스트로 알아보는 나의 이별 극복 스타일! 쿨내 진동형일까, 미련 뚝뚝형일까? 12개의 질문으로 16가지 이별 후유증 유형 중 당신은 어떤 유형인지 확인해보세요. 내 마음을 위로하고 정리하는 데 도움을 주는 맞춤형 극복 팁도 함께 제공합니다."

export const metadata: Metadata = generateQuizMetadata({
  quizId: "breakup-style",
  title: "이별 후유증 유형 테스트",
  shortDescription,
  fullDescription,
  keywords: "이별, 연애, 후유증, 이별 극복, 성향 테스트, MBTI, 무료 테스트",
  canonical: "/tests/breakup-style",
  questionCount: 12,
  duration: "PT3M",
})

const faqs = [
  ...getTopicQuizFAQs("이별 후유증 유형 테스트"),
]

export default function BreakupStyleIntro() {
  const schemas = generateQuizSchemas({
    quizId: "breakup-style",
    title: "이별 후유증 유형 테스트",
    shortDescription,
    fullDescription,
    keywords: "이별, 연애, 후유증, 이별 극복, 성향 테스트, MBTI, 무료 테스트",
    canonical: "/tests/breakup-style",
    questionCount: 12,
    duration: "PT3M",
    faqs,
  })

  return (
    <>
      <JsonLd id="breakup-style-quiz-schema" data={schemas.quiz} />
      <JsonLd id="breakup-style-breadcrumb-schema" data={schemas.breadcrumb} />
      {schemas.faq && <JsonLd id="breakup-style-faq-schema" data={schemas.faq} />}

      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950 dark:to-pink-950">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                💔 이별 후유증 유형 테스트
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                이별 후 나는 어떤 모습일까? 나만의 이별 극복 스타일 알아보기
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
              <div className="space-y-6">
                <div className="text-left">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                    🎯 테스트 소개
                  </h2>
                  <div className="space-y-3 text-gray-600 dark:text-gray-300">
                    <p>• 12개 질문으로 알아보는 나의 이별 대처법</p>
                    <p>• 나는 쿨내 진동형일까, 미련 뚝뚝형일까?</p>
                    <p>• 내 마음을 위로하고 정리하는 데 도움을 주는 테스트</p>
                    <p>• 나의 현재 상태 진단과 맞춤형 극복 팁 제공</p>
                  </div>
                </div>

                <div className="border-t dark:border-gray-700 pt-6">
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="text-center">
                      <div className="font-semibold text-rose-600 dark:text-rose-400">소요시간</div>
                      <div>약 3분</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-rose-600 dark:text-rose-400">문항수</div>
                      <div>12문항</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Link href="/tests/breakup-style/test">
              <Button
                size="lg"
                className="w-full md:w-auto px-12 py-4 text-lg font-semibold bg-rose-600 hover:bg-rose-700 dark:bg-rose-700 dark:hover:bg-rose-800"
              >
                테스트 시작하기 🩹
              </Button>
            </Link>

            <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
              <p>💡 솔직하게 답변할수록 더 정확한 위로와 조언을 얻을 수 있어요.</p>
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="mt-12">
              <AnswerEngineSection quizTitle="Breakup Style Test" />
            </div>

            <div className="mt-12">
              <LandingConversionSection quizTitle="Breakup Style Test" />
            </div>

            <div className="mt-12">
              <RelatedTestsSection testId="breakup-style" title="Next Quizzes Search Visitors Usually Click" />
            </div>

            <section className="mt-12 mb-8">
              <FAQSection faqs={faqs} title="이별 후유증 유형 테스트 자주 묻는 질문" />
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
