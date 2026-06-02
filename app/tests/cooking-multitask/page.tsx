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
import { Card, CardContent } from "@/components/ui/card"
import { Layers } from "lucide-react"
import { GscLandingBoost } from "@/components/gsc-landing-boost"

// Naver-optimized description (under 80 chars)
const shortDescription = "멀티태스킹 테스트로 집중 전환, 우선순위, 동시에 처리하는 습관을 확인하세요."
// Full description for Google/AI
const fullDescription = "멀티태스킹 테스트로 요리 중 여러 일을 동시에 처리하는 방식, 집중 전환 속도, 우선순위 판단을 12문항으로 확인하세요. 16가지 유형으로 나의 처리 습관을 무료로 정리합니다."

export const metadata: Metadata = generateQuizMetadata({
  quizId: "cooking-multitask",
  title: "멀티태스킹 테스트",
  shortDescription,
  fullDescription,
  keywords: "멀티태스킹 테스트, 요리 멀티태스킹, 집중 전환 테스트, 우선순위 테스트, 성격 테스트, 무료 테스트",
  canonical: "/tests/cooking-multitask",
  questionCount: 12,
  duration: "PT3M",
})

const faqs = [
  ...getTopicQuizFAQs("멀티태스킹 테스트"),
]

const gscGuides = [
  {
    title: "멀티태스킹 테스트 검색",
    description:
      "동시에 여러 일을 시작할 때 집중이 분산되는지, 오히려 리듬이 생기는지 확인합니다.",
  },
  {
    title: "우선순위 판단",
    description:
      "요리처럼 타이밍이 겹치는 상황에서 먼저 처리하는 기준과 전환 속도를 봅니다.",
  },
  {
    title: "결과 활용법",
    description:
      "결과는 업무 능력 평가가 아니라 일상에서 편한 처리 순서를 찾기 위한 참고 자료입니다.",
  },
]

export default function CookingMultitaskPage() {
  const schemas = generateQuizSchemas({
    quizId: "cooking-multitask",
    title: "멀티태스킹 테스트",
    shortDescription,
    fullDescription,
    keywords: "멀티태스킹 테스트, 요리 멀티태스킹, 집중 전환 테스트, 우선순위 테스트, 성격 테스트, 무료 테스트",
    canonical: "/tests/cooking-multitask",
    questionCount: 12,
    duration: "PT3M",
    faqs,
  })

  return (
    <>
      {/* Structured Data for SEO/GEO */}
      <JsonLd id="cooking-multitask-quiz-schema" data={schemas.quiz} />
      <JsonLd id="cooking-multitask-breadcrumb-schema" data={schemas.breadcrumb} />
      {schemas.faq && <JsonLd id="cooking-multitask-faq-schema" data={schemas.faq} />}

      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <main className="container max-w-4xl mx-auto px-4 py-16">
        <Card className="border-0 shadow-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur">
          <CardContent className="p-8 md:p-12 text-center space-y-8">
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 via-blue-400 to-indigo-400 flex items-center justify-center shadow-lg">
                <Layers className="h-12 w-12 text-white" />
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                🔄 멀티태스킹 테스트
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                동시에 처리할 때의 집중 전환, 우선순위, 타이밍 감각을 확인하세요.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 py-8">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-cyan-600">12문항</div>
                <div className="text-sm text-muted-foreground">간단한 질문</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-blue-600">약 3분</div>
                <div className="text-sm text-muted-foreground">소요 시간</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-indigo-600">16유형</div>
                <div className="text-sm text-muted-foreground">결과 분석</div>
              </div>
            </div>

            <div className="pt-8">
              <Button asChild size="lg" className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 hover:from-cyan-600 hover:via-blue-600 hover:to-indigo-600 text-white text-lg px-8 py-6">
                <Link href="/tests/cooking-multitask/test">테스트 시작하기</Link>
              </Button>
            </div>

            <div className="pt-8 text-left space-y-4">
              <h2 className="text-2xl font-bold">이 테스트는?</h2>
              <p className="text-muted-foreground leading-relaxed">
                멀티태스킹 테스트는 여러 일을 동시에 처리하는 패턴, 우선순위를 바꾸는 속도,
                한 가지 일에 다시 집중하는 방식을 통해 나에게 맞는 처리 리듬을 보여줍니다.
                요리 상황처럼 타이밍이 겹치는 장면을 기준으로 하기 때문에 처음 방문한 사람도 쉽게 답할 수 있습니다.
              </p>
            </div>
          </CardContent>
        </Card>

        <GscLandingBoost
          title="멀티태스킹 테스트로 확인할 수 있는 것"
          summary="멀티태스킹 테스트는 여러 일을 동시에 처리할 때 내가 빨리 전환하는 편인지, 하나씩 끝내야 안정되는 편인지 알고 싶은 검색 의도에 맞춘 무료 성격 테스트입니다. 요리 중 타이밍이 겹치는 장면을 통해 집중 전환과 우선순위 기준을 가볍게 확인합니다."
          guides={gscGuides}
          relatedLinks={[
            { href: "/tests/cooking-timing", label: "요리 타이밍 테스트" },
            { href: "/tests/cooking-recipe", label: "요리 레시피 테스트" },
            { href: "/tests/phone-usage", label: "폰 사용 습관 테스트" },
          ]}
          tone="blue"
        />
      
        <div className="mt-12">
          <AnswerEngineSection quizTitle="Cooking Multitask Test" />
        </div>

        <div className="mt-12">
          <LandingConversionSection quizTitle="Cooking Multitask Test" />
        </div>

        <div className="mt-12">
          <RelatedTestsSection testId="cooking-multitask" />
        </div>

        {/* FAQ Section for AI Bot Optimization */}
        <section className="mt-12 mb-8">
          <FAQSection faqs={faqs} title="멀티태스킹 테스트 자주 묻는 질문" />
        </section>
</main>
    </div>
    </>
  )
}
