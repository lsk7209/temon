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
const shortDescription = "소비성향 테스트로 충동구매, 할인 반응, 예산 습관을 16유형으로 확인하세요."
// Full description for Google/AI
const fullDescription = "소비성향 테스트로 계획 구매, 즉흥 지출, 할인 반응, 구독 관리, 예산 습관을 12문항으로 확인하세요. 16가지 소비 유형과 유형별 절약 팁을 무료로 제공합니다."

export const metadata: Metadata = generateQuizMetadata({
  quizId: "spending-style",
  title: "소비성향 테스트",
  shortDescription,
  fullDescription,
  keywords: "소비성향 테스트, 소비 성향 테스트, 충동구매 테스트, 구매 성향, 예산 습관, 절약 테스트, 무료 테스트",
  canonical: "/tests/spending-style",
  questionCount: 12,
  duration: "PT2M",
})

const faqs = [
  ...getTopicQuizFAQs("소비 성향 테스트"),
]

const gscGuides = [
  {
    title: "소비성향 테스트 검색",
    description:
      "계획 구매, 충동구매, 가격 비교, 구독 관리처럼 실제 소비 장면을 기준으로 성향을 확인합니다.",
  },
  {
    title: "절약 팁까지 확인",
    description:
      "결과 유형별로 돈을 쓰는 기준과 지출을 줄이는 첫 행동을 함께 볼 수 있습니다.",
  },
  {
    title: "가벼운 무료 진단",
    description:
      "전문 재무 진단이 아니라 일상 소비 습관을 돌아보는 무료 성향 테스트로 활용하세요.",
  },
]

export default function SpendingStyleIntro() {
  const schemas = generateQuizSchemas({
    quizId: "spending-style",
    title: "소비성향 테스트",
    shortDescription,
    fullDescription,
    keywords: "소비성향 테스트, 소비 성향 테스트, 충동구매 테스트, 구매 성향, 예산 습관, 절약 테스트, 무료 테스트",
    canonical: "/tests/spending-style",
    questionCount: 12,
    duration: "PT2M",
    faqs,
  })

  return (
    <>
      {/* Structured Data for SEO/GEO */}
      <JsonLd id="spending-style-quiz-schema" data={schemas.quiz} />
      <JsonLd id="spending-style-breadcrumb-schema" data={schemas.breadcrumb} />
      {schemas.faq && <JsonLd id="spending-style-faq-schema" data={schemas.faq} />}

      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              💰 소비 습관으로 보는 나의 성향
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              소비성향 테스트로 계획성, 즉흥성, 할인 반응, 비교 습관, 예산 관리 기준을 12문항으로 분석하여 16유형으로 매핑합니다.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
            <div className="space-y-6">
              <div className="text-left">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  🎯 테스트 소개
                </h2>
                <div className="space-y-3 text-gray-600 dark:text-gray-300">
                  <p>• 소비 습관으로 알아보는 나의 성향</p>
                  <p>• 16가지 소비 유형 중 당신의 유형은?</p>
                  <p>• 계획부터 즉흥까지, 나만의 소비 패턴 발견</p>
                  <p>• 나에게 맞는 완벽한 소비 전략 가이드</p>
                </div>
              </div>

              <div className="border-t dark:border-gray-700 pt-6">
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="text-center">
                    <div className="font-semibold text-green-600 dark:text-green-400">소요시간</div>
                    <div>약 2분</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-green-600 dark:text-green-400">문항수</div>
                    <div>12문항</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Link href="/tests/spending-style/test">
            <Button
              size="lg"
              className="w-full md:w-auto px-12 py-4 text-lg font-semibold bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
            >
              테스트 시작하기 🚀
            </Button>
          </Link>

          <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
            <p>💡 정확한 결과를 위해 솔직하게 답변해주세요!</p>
          </div>

          <GscLandingBoost
            title="소비성향 테스트, 이런 분에게 맞습니다"
            summary="소비성향 테스트는 내가 돈을 쓰기 전 어떤 기준으로 판단하는지 확인하려는 검색 의도에 맞춰 구성했습니다. 충동구매를 줄이고 싶거나, 구독·포인트·할인에 끌리는 패턴을 알고 싶을 때 먼저 풀어보기 좋습니다."
            guides={gscGuides}
            relatedLinks={[
              { href: "/tests/perfection-balance-1xQC", label: "완벽주의 테스트" },
              { href: "/tests/weekend-planning", label: "주말 계획 테스트" },
              { href: "/tests/shopping-style", label: "쇼핑 스타일 테스트" },
            ]}
            tone="green"
          />

          {/* FAQ 섹션 */}
          <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-left">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              자주 묻는 질문
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  충동구매를 줄이는 첫 단계는 무엇인가요?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  위시리스트에 담고 48시간 대기하는 룰을 적용하는 것이 좋습니다. 테스트 결과에서 각 유형별 충동구매 방지 가이드를 확인하세요.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  구독 정리를 자동화하는 방법이 있나요?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  분기별로 구독 서비스 사용량을 점검하고, 사용하지 않는 서비스는 자동으로 해지하는 루틴을 만드는 것이 좋습니다. 테스트 결과에서 추천하는 구독 관리 방법을 참고하세요.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  포인트·마일리지를 전략적으로 쓰는 기준은 무엇인가요?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  체계적으로 적립하고 소진하는 루틴을 만들거나, 이벤트 중심으로 즉시 사용하는 방식 중 자신에게 맞는 방법을 선택하세요. 테스트 결과에서 각 유형별 포인트 활용 가이드를 확인할 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      
        <div className="mt-12">
          <AnswerEngineSection quizTitle="Spending Style Test" />
        </div>

        <div className="mt-12">
          <LandingConversionSection quizTitle="Spending Style Test" />
        </div>

        <div className="mt-12">
          <RelatedTestsSection testId="spending-style" />
        </div>

        {/* FAQ Section for AI Bot Optimization */}
        <section className="mt-12 mb-8">
          <FAQSection faqs={faqs} title="소비 성향 테스트 자주 묻는 질문" />
        </section>
</div>
    </div>
    </>
  )
}
