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

// Naver-optimized description (under 80 chars)
const shortDescription = "알림, 홈화면 정리, 배터리 관리 습관으로 16유형 분석. 결과 공유 가능"
// Full description for Google/AI
const fullDescription = "스마트폰 사용 스타일 테스트로 알아보는 나의 성격! 12개의 질문으로 16가지 유형 중 당신은 어떤 유형일까요? 재미있는 스마트폰 사용 스타일 테스트를 지금 바로 무료로 시작해보세요."

export const metadata: Metadata = generateQuizMetadata({
  quizId: "phone-style",
  title: "스마트폰 사용 스타일 테스트",
  shortDescription,
  fullDescription,
  keywords: "스마트폰, 사용 스타일, 앱, 습관, 성향 테스트, MBTI, 무료 테스트",
  canonical: "/tests/phone-style",
  questionCount: 12,
  duration: "PT2M",
})

const faqs = [
  ...getTopicQuizFAQs("스마트폰 사용 스타일 테스트"),
]

export default function PhoneStyleIntro() {
  const schemas = generateQuizSchemas({
    quizId: "phone-style",
    title: "스마트폰 사용 스타일 테스트",
    shortDescription,
    fullDescription,
    keywords: "스마트폰, 사용 스타일, 앱, 습관, 성향 테스트, MBTI, 무료 테스트",
    canonical: "/tests/phone-style",
    questionCount: 12,
    duration: "PT2M",
    faqs,
  })

  return (
    <>
      {/* Structured Data for SEO/GEO */}
      <JsonLd id="phone-style-quiz-schema" data={schemas.quiz} />
      <JsonLd id="phone-style-breadcrumb-schema" data={schemas.breadcrumb} />
      {schemas.faq && <JsonLd id="phone-style-faq-schema" data={schemas.faq} />}

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              📱 스마트폰 사용에도 성향이 있다면?
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              알림 설정부터 앱 정리까지, 습관으로 성향을 알아보세요. 2분 완성
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
            <div className="space-y-6">
              <div className="text-left">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  🎯 테스트 소개
                </h2>
                <div className="space-y-3 text-gray-600 dark:text-gray-300">
                  <p>• 스마트폰 사용 습관으로 알아보는 나의 성향</p>
                  <p>• 16가지 사용 스타일 유형 중 당신의 유형은?</p>
                  <p>• 알림부터 배터리까지, 나만의 사용 패턴 발견</p>
                  <p>• 나에게 맞는 완벽한 스마트폰 설정 가이드</p>
                </div>
              </div>

              <div className="border-t dark:border-gray-700 pt-6">
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="text-center">
                    <div className="font-semibold text-blue-600 dark:text-blue-400">소요시간</div>
                    <div>약 2분</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-blue-600 dark:text-blue-400">문항수</div>
                    <div>12문항</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Link href="/tests/phone-style/test">
            <Button
              size="lg"
              className="w-full md:w-auto px-12 py-4 text-lg font-semibold bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
            >
              테스트 시작하기 🚀
            </Button>
          </Link>

          <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
            <p>💡 정확한 결과를 위해 솔직하게 답변해주세요!</p>
          </div>

          {/* FAQ 섹션 */}
          <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-left">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              자주 묻는 질문
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  알림 피로도를 줄이려면 무엇부터 조정해야 하나요?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  중요하지 않은 앱의 알림을 먼저 끄고, 요약 알림 기능을 활용하세요. 테스트 결과에서 제시하는 각 유형별 알림 설정 가이드를 참고할 수 있습니다.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  배터리 수명에 영향을 주는 핵심 설정은 무엇인가요?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  백그라운드 앱 새로고침, 위치 서비스, 화면 밝기 자동 조절 등이 주요 요인입니다. 테스트 결과에서 추천하는 배터리 최적화 설정을 확인하세요.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  홈 화면을 효율적으로 구성하는 간단한 기준이 있나요?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  자주 사용하는 앱을 첫 페이지에 배치하고, 카테고리별로 폴더를 만들어 정리하는 것이 좋습니다. 테스트 결과에서 각 유형별 홈화면 구성 가이드를 참고하세요.
                </p>
              </div>
            </div>
          </div>
        </div>
      
        <div className="mt-12">
          <AnswerEngineSection quizTitle="Phone Style Test" />
        </div>

        <div className="mt-12">
          <LandingConversionSection quizTitle="Phone Style Test" />
        </div>

        <div className="mt-12">
          <RelatedTestsSection testId="phone-style" title="Next Quizzes Search Visitors Usually Click" />
        </div>

        {/* FAQ Section for AI Bot Optimization */}
        <section className="mt-12 mb-8">
          <FAQSection faqs={faqs} title="스마트폰 사용 스타일 테스트 자주 묻는 질문" />
        </section>
</div>
    </div>
    </>
  )
}
