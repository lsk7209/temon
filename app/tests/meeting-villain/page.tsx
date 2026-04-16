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

const shortDescription = "회의 시간, 당신의 역할과 행동 패턴으로 알아보는 16가지 회의 빌런 유형 분석."
const fullDescription = "회의 빌런 테스트로 알아보는 나의 회의 스타일! 나는 팩트 폭격기일까, 평화주의자일까? 12개의 질문으로 나의 회의 행동 패턴을 분석하고, 나의 강점과 주의할 점, 찰떡 파트너까지 추천받아보세요. 직장 동료와 함께 하면 더 재밌어요!"

export const metadata: Metadata = generateQuizMetadata({
  quizId: "meeting-villain",
  title: "회의 빌런 테스트",
  shortDescription,
  fullDescription,
  keywords: "회의, 직장인, 회의 스타일, 빌런, 성향 테스트, MBTI, 무료 테스트",
  canonical: "/tests/meeting-villain",
  questionCount: 12,
  duration: "PT3M",
})

const faqs = [
  ...getTopicQuizFAQs("회의 빌런 테스트"),
]

export default function MeetingVillainIntro() {
  const schemas = generateQuizSchemas({
    quizId: "meeting-villain",
    title: "회의 빌런 테스트",
    shortDescription,
    fullDescription,
    keywords: "회의, 직장인, 회의 스타일, 빌런, 성향 테스트, MBTI, 무료 테스트",
    canonical: "/tests/meeting-villain",
    questionCount: 12,
    duration: "PT3M",
    faqs,
  })

  return (
    <>
      <JsonLd id="meeting-villain-quiz-schema" data={schemas.quiz} />
      <JsonLd id="meeting-villain-breadcrumb-schema" data={schemas.breadcrumb} />
      {schemas.faq && <JsonLd id="meeting-villain-faq-schema" data={schemas.faq} />}

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100 dark:from-gray-900 dark:to-slate-800">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                😈 회의 빌런 테스트
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                나는 회의 때 어떤 사람일까? 나의 회의 스타일 전격 분석!
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
              <div className="space-y-6">
                <div className="text-left">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                    🎯 테스트 소개
                  </h2>
                  <div className="space-y-3 text-gray-600 dark:text-gray-300">
                    <p>• 12개 질문으로 알아보는 나의 회의 스타일</p>
                    <p>• 나는 팩트 폭격기일까, 평화주의자일까?</p>
                    <p>• 직장 동료와 함께 해보면 더 재밌는 테스트</p>
                    <p>• 나의 강점과 주의할 점, 찰떡 파트너 추천</p>
                  </div>
                </div>

                <div className="border-t dark:border-gray-700 pt-6">
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="text-center">
                      <div className="font-semibold text-blue-600 dark:text-blue-400">소요시간</div>
                      <div>약 3분</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-blue-600 dark:text-blue-400">문항수</div>
                      <div>12문항</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Link href="/tests/meeting-villain/test">
              <Button
                size="lg"
                className="w-full md:w-auto px-12 py-4 text-lg font-semibold bg-gray-900 hover:bg-gray-800 text-white dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                테스트 시작하기 📝
              </Button>
            </Link>

            <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
              <p>💡 너무 심각하게 받아들이지 마세요, 재미로 보는 테스트입니다!</p>
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="mt-12">
              <AnswerEngineSection quizTitle="Meeting Villain Test" />
            </div>

            <div className="mt-12">
              <LandingConversionSection quizTitle="Meeting Villain Test" />
            </div>

            <div className="mt-12">
              <RelatedTestsSection testId="meeting-villain" />
            </div>

            <section className="mt-12 mb-8">
              <FAQSection faqs={faqs} title="회의 빌런 테스트 자주 묻는 질문" />
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
