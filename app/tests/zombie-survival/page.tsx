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

const shortDescription = "좀비 아포칼립스 테스트로 생존 전략, 팀 역할, 위기 판단을 16유형으로 확인하세요."
const fullDescription = "좀비 아포칼립스 테스트로 도망, 수색, 방어, 팀플 선택을 고르고 나의 생존 유형을 확인하세요. 12개 상황 질문으로 생존 전략과 팀 안의 역할을 무료로 비교할 수 있습니다."

export const metadata: Metadata = generateQuizMetadata({
  quizId: "zombie-survival",
  title: "좀비 아포칼립스 테스트",
  shortDescription,
  fullDescription,
  keywords: "좀비 아포칼립스 테스트, 좀비 테스트, 생존 테스트, 생존 유형, 상황형 테스트, 무료 테스트",
  canonical: "/tests/zombie-survival",
  questionCount: 12,
  duration: "PT3M",
})

const faqs = [
  ...getTopicQuizFAQs("좀비 아포칼립스 생존 유형 테스트"),
]

const gscGuides = [
  {
    title: "좀비 테스트 검색",
    description:
      "위기 상황에서 도망, 협상, 수색, 방어 중 어떤 선택을 하는지로 생존 성향을 확인합니다.",
  },
  {
    title: "친구와 역할 비교",
    description:
      "리더, 정찰, 방어, 치료처럼 팀 안에서 맡을 법한 역할을 결과로 비교하기 좋습니다.",
  },
  {
    title: "재밌는 상황형 테스트",
    description:
      "실제 생존 가이드가 아니라 상상 상황을 통해 선택 패턴을 보는 오락용 성향 테스트입니다.",
  },
]

export default function ZombieSurvivalIntro() {
  const schemas = generateQuizSchemas({
    quizId: "zombie-survival",
    title: "좀비 아포칼립스 테스트",
    shortDescription,
    fullDescription,
    keywords: "좀비 아포칼립스 테스트, 좀비 테스트, 생존 테스트, 생존 유형, 상황형 테스트, 무료 테스트",
    canonical: "/tests/zombie-survival",
    questionCount: 12,
    duration: "PT3M",
    faqs,
  })

  return (
    <>
      <JsonLd id="zombie-survival-quiz-schema" data={schemas.quiz} />
      <JsonLd id="zombie-survival-breadcrumb-schema" data={schemas.breadcrumb} />
      {schemas.faq && <JsonLd id="zombie-survival-faq-schema" data={schemas.faq} />}

      <div className="min-h-screen bg-gradient-to-br from-red-900 to-gray-900">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                🧟‍♂️ 좀비 아포칼립스 생존 유형
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                좀비 아포칼립스 테스트로 위기 순간의 생존 전략과 팀 안의 역할을 확인하세요.
              </p>
            </div>

            <div className="bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 border border-gray-700">
              <div className="space-y-6">
                <div className="text-left">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    🎯 테스트 소개
                  </h2>
                  <div className="space-y-3 text-gray-300">
                    <p>• 12개 질문으로 알아보는 나의 포스트 아포칼립스 생존법</p>
                    <p>• 나는 좀비 헌터일까, 아니면 최초 감염자일까?</p>
                    <p>• 극한 상황에서의 나의 본모습을 확인해보세요</p>
                    <p>• 생존 확률을 높여줄 꿀팁과 아이템 추천</p>
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-6">
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
                    <div className="text-center">
                      <div className="font-semibold text-red-500">소요시간</div>
                      <div>약 3분</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-red-500">문항수</div>
                      <div>12문항</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Link href="/tests/zombie-survival/test">
              <Button
                size="lg"
                className="w-full md:w-auto px-12 py-4 text-lg font-semibold bg-red-600 hover:bg-red-700 text-white border-none"
              >
                생존 테스트 시작 🔫
              </Button>
            </Link>

            <div className="mt-8 text-sm text-gray-500">
              <p>💡 주의: 실제 좀비 사태 발생 시 도움이 안 될 수도 있습니다.</p>
            </div>

            <GscLandingBoost
              title="좀비 아포칼립스 테스트, 무엇을 보나요?"
              summary="좀비 아포칼립스 테스트는 극한 상황에서 내가 어떤 판단을 먼저 하는지 알고 싶은 검색 의도에 맞춘 상황형 성격 테스트입니다. 위험을 피하는 방식, 팀을 대하는 태도, 자원을 쓰는 기준을 가볍게 비교할 수 있습니다."
              guides={gscGuides}
              relatedLinks={[
                { href: "/tests/breakup-style", label: "이별 후유증 테스트" },
                { href: "/tests/meeting-villain", label: "회의 빌런 테스트" },
                { href: "/tests/kpop-idol", label: "아이돌 포지션 테스트" },
              ]}
              tone="red"
            />
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="mt-12">
              <AnswerEngineSection quizTitle="Zombie Survival Test" />
            </div>

            <div className="mt-12">
              <LandingConversionSection quizTitle="Zombie Survival Test" />
            </div>

            <div className="mt-12">
              <RelatedTestsSection testId="zombie-survival" />
            </div>

            <section className="mt-12 mb-8">
              <FAQSection faqs={faqs} title="좀비 아포칼립스 생존 유형 테스트 자주 묻는 질문" />
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
