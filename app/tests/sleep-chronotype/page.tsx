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
import { GscLandingBoost } from "@/components/gsc-landing-boost"

// Naver-optimized description (under 80 chars)
const shortDescription = "크로노타입 테스트로 아침형·저녁형, 집중 시간, 수면 루틴을 16유형으로 확인하세요."
// Full description for Google/AI
const fullDescription = "크로노타입 테스트로 아침형·저녁형, 집중 시간, 낮잠 습관, 카페인 타이밍을 12문항으로 확인하세요. 수면 리듬을 16가지 유형으로 정리해 무료로 제공합니다."

export const metadata: Metadata = generateQuizMetadata({
  quizId: "sleep-chronotype",
  title: "크로노타입 테스트",
  shortDescription,
  fullDescription,
  keywords: "크로노타입 테스트, 수면 크로노타입, 아침형 저녁형 테스트, 수면 리듬, 집중 시간, 무료 테스트",
  canonical: "/tests/sleep-chronotype",
  questionCount: 12,
  duration: "PT2M",
})

const faqs = [
  ...getTopicQuizFAQs("수면 크로노타입 테스트"),
]

const gscGuides = [
  {
    title: "크로노타입 테스트 검색",
    description:
      "아침형·저녁형 같은 하루 에너지 리듬을 더 쉽게 이해하고 싶은 분에게 맞춘 테스트입니다.",
  },
  {
    title: "수면 습관 점검",
    description:
      "기상 시간, 낮잠, 카페인, 집중 시간대를 함께 보며 내 루틴의 반복 패턴을 확인합니다.",
  },
  {
    title: "결과 활용법",
    description:
      "결과는 의학적 수면 진단이 아니라 일상 루틴을 조정하기 위한 성향 참고 자료입니다.",
  },
]

export default function SleepChronotypeIntro() {
  const schemas = generateQuizSchemas({
    quizId: "sleep-chronotype",
    title: "크로노타입 테스트",
    shortDescription,
    fullDescription,
    keywords: "크로노타입 테스트, 수면 크로노타입, 아침형 저녁형 테스트, 수면 리듬, 집중 시간, 무료 테스트",
    canonical: "/tests/sleep-chronotype",
    questionCount: 12,
    duration: "PT2M",
    faqs,
  })

  return (
    <>
      {/* Structured Data for SEO/GEO */}
      <JsonLd id="sleep-chronotype-quiz-schema" data={schemas.quiz} />
      <JsonLd id="sleep-chronotype-breadcrumb-schema" data={schemas.breadcrumb} />
      {schemas.faq && <JsonLd id="sleep-chronotype-faq-schema" data={schemas.faq} />}

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              🌙 수면 크로노타입으로 알아보는 나의 하루 리듬
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              크로노타입 테스트로 기상 시간, 낮잠 습관, 집중 타이밍, 밤 시간 에너지 변화를 12문항으로 분석해 16유형으로 매핑합니다.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
            <div className="space-y-6">
              <div className="text-left">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  🎯 테스트 소개
                </h2>
                <div className="space-y-3 text-gray-600 dark:text-gray-300">
                  <p>• 수면 리듬으로 알아보는 나의 성향</p>
                  <p>• 16가지 수면 크로노타입 중 당신의 유형은?</p>
                  <p>• 기상부터 취침까지, 나만의 하루 리듬 발견</p>
                  <p>• 나에게 맞는 완벽한 수면 루틴 가이드</p>
                </div>
              </div>

              <div className="border-t dark:border-gray-700 pt-6">
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="text-center">
                    <div className="font-semibold text-indigo-600 dark:text-indigo-400">소요시간</div>
                    <div>약 2분</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-indigo-600 dark:text-indigo-400">문항수</div>
                    <div>12문항</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Link href="/tests/sleep-chronotype/test">
            <Button
              size="lg"
              className="w-full md:w-auto px-12 py-4 text-lg font-semibold bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800"
            >
              테스트 시작하기 🚀
            </Button>
          </Link>

          <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
            <p>💡 정확한 결과를 위해 솔직하게 답변해주세요!</p>
          </div>

          <GscLandingBoost
            title="크로노타입 테스트로 확인할 수 있는 것"
            summary="크로노타입 테스트는 내가 언제 가장 집중하고 언제 쉽게 지치는지 알고 싶은 검색 의도에 맞춘 무료 성향 테스트입니다. 수면 시간 자체보다 하루 리듬, 집중 타이밍, 회복 습관을 함께 살펴봅니다."
            guides={gscGuides}
            relatedLinks={[
              { href: "/tests/alarm-habit", label: "알람 습관 테스트" },
              { href: "/tests/morning-mood", label: "아침 기분 테스트" },
              { href: "/tests/evening-routine", label: "저녁 루틴 테스트" },
            ]}
            tone="indigo"
          />

          {/* FAQ 섹션 */}
          <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-left">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              자주 묻는 질문
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  아침형·저녁형은 바꿀 수 있나요?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  완전히 바꾸기는 어렵지만, 점진적으로 조정할 수 있습니다. 테스트 결과에서 제시하는 각 유형별 루틴 가이드를 참고하여 천천히 변화를 시도해보세요.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  낮잠은 몇 분이 적당한가요?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  보통 10-20분이 적당하며, 30분을 넘기면 깊은 수면에 들어가 깨어나기 어려울 수 있습니다. 테스트 결과에서 추천하는 낮잠 시간을 확인하세요.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  카페인 컷오프는 언제가 좋나요?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  일반적으로 취침 6시간 전까지가 좋습니다. 테스트 결과에서 각 유형별 카페인 컷오프 시간을 참고하세요.
                </p>
              </div>
            </div>
          </div>
        </div>
      
        <div className="mt-12">
          <AnswerEngineSection quizTitle="Sleep Chronotype Test" />
        </div>

        <div className="mt-12">
          <LandingConversionSection quizTitle="Sleep Chronotype Test" />
        </div>

        <div className="mt-12">
          <RelatedTestsSection testId="sleep-chronotype" />
        </div>

        {/* FAQ Section for AI Bot Optimization */}
        <section className="mt-12 mb-8">
          <FAQSection faqs={faqs} title="수면 크로노타입 테스트 자주 묻는 질문" />
        </section>
</div>
    </div>
    </>
  )
}
