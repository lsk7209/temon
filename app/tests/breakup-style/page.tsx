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

const shortDescription = "이별 후유증 유형 테스트로 감정 정리와 이별 극복 스타일을 16유형으로 확인하세요."
const fullDescription = "이별 후유증 유형 테스트로 이별 뒤 감정 처리, 미련, 회복 속도, 연락 충동을 12문항으로 확인하세요. 16가지 이별 극복 스타일과 마음 정리 팁을 무료로 제공합니다."

export const metadata: Metadata = generateQuizMetadata({
  quizId: "breakup-style",
  title: "이별 후유증 유형 테스트",
  shortDescription,
  fullDescription,
  keywords: "이별 후유증 유형 테스트, 이별 극복 테스트, 이별 테스트, 연애 테스트, 감정 정리, 미련 테스트, 무료 테스트",
  canonical: "/tests/breakup-style",
  questionCount: 12,
  duration: "PT3M",
})

const faqs = [
  ...getTopicQuizFAQs("이별 후유증 유형 테스트"),
]

const gscGuides = [
  {
    title: "이별 후유증 유형 검색",
    description:
      "이별 뒤 감정이 오래 남는지, 빠르게 정리하는지, 연락 충동을 어떻게 다루는지 유형으로 정리합니다.",
  },
  {
    title: "이별 극복 스타일 확인",
    description:
      "쿨하게 넘기는 편인지, 추억을 곱씹는 편인지 12개 상황 선택으로 가볍게 확인할 수 있습니다.",
  },
  {
    title: "마음 정리 팁 연결",
    description:
      "결과는 진단명이 아니라 현재 반응 패턴을 이해하고 회복 루틴을 고르는 참고용입니다.",
  },
]

export default function BreakupStyleIntro() {
  const schemas = generateQuizSchemas({
    quizId: "breakup-style",
    title: "이별 후유증 유형 테스트",
    shortDescription,
    fullDescription,
    keywords: "이별 후유증 유형 테스트, 이별 극복 테스트, 이별 테스트, 연애 테스트, 감정 정리, 미련 테스트, 무료 테스트",
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
              <GscLandingBoost
                title="이별 후유증 유형 테스트로 보는 마음 정리 패턴"
                summary="이별 후유증 유형 테스트는 이별 뒤 감정 정리, 미련, 회복 속도, 연락하고 싶은 마음을 알고 싶은 검색 의도에 맞춘 무료 성향 테스트입니다. 12문항으로 현재 반응을 16가지 이별 극복 스타일로 나누어 보여줍니다."
                guides={gscGuides}
                relatedLinks={[
                  { href: "/tests/kdrama-mbti", label: "K-드라마 클리셰 테스트" },
                  { href: "/tests/meeting-villain", label: "모임 빌런 테스트" },
                  { href: "/tests/snowwhite-mbti", label: "백설공주 에겐테토 테스트" },
                ]}
                tone="pink"
              />
            </div>

            <div className="mt-12">
              <AnswerEngineSection quizTitle="Breakup Style Test" />
            </div>

            <div className="mt-12">
              <LandingConversionSection quizTitle="Breakup Style Test" />
            </div>

            <div className="mt-12">
              <RelatedTestsSection testId="breakup-style" />
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
