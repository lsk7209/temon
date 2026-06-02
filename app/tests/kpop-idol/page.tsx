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
import { Card } from "@/components/ui/card"
import { Sparkles } from "lucide-react"
import { GscLandingBoost } from "@/components/gsc-landing-boost"

// Naver-optimized description (under 80 chars)
const shortDescription = "아이돌 포지션 테스트로 리더, 보컬, 댄서, 비주얼, 막내 유형을 확인하세요."
// Full description for Google/AI
const fullDescription = "아이돌 포지션 테스트로 무대, 팀워크, 팬 소통 상황에서 나의 역할을 확인하세요. 리더, 메인보컬, 메인댄서, 비주얼, 막내 등 K-팝 그룹 안의 포지션을 무료로 비교할 수 있습니다."

export const metadata: Metadata = generateQuizMetadata({
  quizId: "kpop-idol",
  title: "아이돌 포지션 테스트",
  shortDescription,
  fullDescription,
  keywords: "아이돌 포지션 테스트, 포지션 테스트, 아이돌 테스트, KPOP 테스트, K-팝 테스트, 케이팝 테스트, 성격 테스트, 무료 테스트",
  canonical: "/tests/kpop-idol",
  questionCount: 8,
  duration: "PT2M",
})

const faqs = [
  ...getTopicQuizFAQs("아이돌 포지션 테스트"),
  {
    question: "아이돌 포지션 테스트는 무엇을 알려주나요?",
    answer:
      "팀 상황에서 내가 리더, 메인보컬, 메인댄서, 비주얼, 막내 중 어떤 역할에 가까운지 가볍게 보여주는 무료 성격 테스트입니다.",
  },
  {
    question: "KPOP을 잘 몰라도 포지션 테스트를 할 수 있나요?",
    answer:
      "네. 실제 아이돌 지식보다 팀워크, 표현 방식, 주목받는 상황, 팬 소통 같은 일반적인 선택을 바탕으로 결과를 계산합니다.",
  },
  {
    question: "친구와 같이 하면 어떻게 비교하면 좋나요?",
    answer:
      "각자 결과를 확인한 뒤 누가 리더형인지, 누가 분위기 담당인지, 누가 무대 체질인지 비교하면 모임 안 역할을 재미있게 볼 수 있습니다.",
  },
]

const gscGuides = [
  {
    title: "포지션 테스트 검색",
    description:
      "리더, 메인보컬, 메인댄서, 비주얼, 막내처럼 익숙한 역할명으로 결과를 바로 이해할 수 있습니다.",
  },
  {
    title: "K-팝 상황 선택",
    description:
      "무대 준비, 팀 회의, 팬 소통 같은 장면에서 내가 어떤 선택을 하는지 확인합니다.",
  },
  {
    title: "친구와 결과 비교",
    description:
      "같은 그룹이라면 누가 리더인지, 누가 분위기 담당인지 가볍게 비교하기 좋습니다.",
  },
]

export default function KpopIdolIntro() {
  const schemas = generateQuizSchemas({
    quizId: "kpop-idol",
    title: "아이돌 포지션 테스트",
    shortDescription,
    fullDescription,
    keywords: "아이돌 포지션 테스트, 포지션 테스트, 아이돌 테스트, KPOP 테스트, K-팝 테스트, 케이팝 테스트, 성격 테스트, 무료 테스트",
    canonical: "/tests/kpop-idol",
    questionCount: 8,
    duration: "PT2M",
    faqs,
  })

  return (
    <>
      {/* Structured Data for SEO/GEO */}
      <JsonLd id="kpop-idol-quiz-schema" data={schemas.quiz} />
      <JsonLd id="kpop-idol-breadcrumb-schema" data={schemas.breadcrumb} />
      {schemas.faq && <JsonLd id="kpop-idol-faq-schema" data={schemas.faq} />}

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <Card className="p-8 md:p-12 text-center shadow-xl border-2 border-purple-200 bg-white/90 backdrop-blur">
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="text-7xl animate-bounce">🎤</div>
              <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-purple-500 animate-pulse" />
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            K-팝 아이돌 포지션 테스트
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 mb-6 font-medium">아이돌 포지션 테스트로 그룹 안에서 내 역할을 확인하세요.</p>

          <div className="space-y-4 mb-8 text-left bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
            <p className="text-gray-700 leading-relaxed">
              <span className="font-bold text-purple-600">🫡 카리스마 리더</span>부터{" "}
              <span className="font-bold text-pink-600">🐣 4차원 막내</span>까지!
            </p>
            <p className="text-gray-700 leading-relaxed">당신은 팀을 책임지는 리더일까, 모두의 사랑받는 막내일까?</p>
            <p className="text-gray-700 leading-relaxed">8개의 아이돌 상황에서 당신의 선택으로 포지션을 찾아보세요!</p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center mb-8">
            <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium border border-purple-300">
              🫡 리더
            </span>
            <span className="px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-sm font-medium border border-pink-300">
              🎤 메인보컬
            </span>
            <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium border border-blue-300">
              🕺 메인댄서
            </span>
            <span className="px-4 py-2 bg-rose-100 text-rose-700 rounded-full text-sm font-medium border border-rose-300">
              ✨ 비주얼
            </span>
            <span className="px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-medium border border-amber-300">
              🐣 막내
            </span>
          </div>

          <Link href="/tests/kpop-idol/test">
            <Button
              size="lg"
              className="w-full md:w-auto px-12 py-6 text-lg font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              데뷔하기 🎤
            </Button>
          </Link>

          <p className="mt-6 text-sm text-gray-500">소요 시간: 약 2분 | 총 8문항</p>
        </Card>

        <GscLandingBoost
          title="아이돌 포지션 테스트, 무엇을 보나요?"
          summary="아이돌 포지션 테스트는 무대 위 실력보다 팀 안에서 어떤 역할을 맡기 쉬운지 알고 싶은 검색 의도에 맞춘 무료 성격 테스트입니다. 리더십, 표현력, 분위기 전환, 팬 소통 반응을 가볍게 비교합니다."
          guides={gscGuides}
          relatedLinks={[
            { href: "/tests/kdrama-mbti", label: "K드라마 MBTI 테스트" },
            { href: "/tests/music-taste", label: "음악 취향 테스트" },
            { href: "/tests/instagram-story", label: "인스타 스토리 테스트" },
          ]}
          tone="pink"
        />
      
        <div className="mt-12">
          <AnswerEngineSection quizTitle="Kpop Idol Test" />
        </div>

        <div className="mt-12">
          <LandingConversionSection quizTitle="Kpop Idol Test" />
        </div>

        <div className="mt-12">
          <RelatedTestsSection testId="kpop-idol" />
        </div>

        {/* FAQ Section for AI Bot Optimization */}
        <section className="mt-12 mb-8">
          <FAQSection faqs={faqs} title="아이돌 포지션 테스트 자주 묻는 질문" />
        </section>
</div>
    </div>
    </>
  )
}
