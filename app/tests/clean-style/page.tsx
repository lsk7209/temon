import type { Metadata } from "next"
import Link from "next/link"
import { AnswerEngineSection } from "@/components/answer-engine-section"
import { FAQSection } from "@/components/faq-section"
import { GscLandingBoost } from "@/components/gsc-landing-boost"
import { JsonLd } from "@/components/json-ld"
import { LandingConversionSection } from "@/components/landing-conversion-section"
import { RelatedTestsSection } from "@/components/related-tests-section"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { generateQuizMetadata, generateQuizSchemas } from "@/lib/quiz-seo-utils"
import { getTopicQuizFAQs } from "@/lib/quiz-topic-copy"
import { Clock, Sparkles, SprayCan, Users } from "lucide-react"

const quizTitle = "방청소 성격 테스트"
const shortDescription = "방청소 성격 테스트로 정리형·즉흥형 청소 습관을 16유형으로 확인하세요."
const fullDescription =
  "방청소 성격 테스트로 청소를 계획하고 시작하는지, 일단 손부터 움직이는지 확인하세요. 12문항으로 16가지 청소 스타일과 정리 습관 유형을 무료로 제공합니다."
const keywords =
  "방청소 성격 테스트, 청소 테스트, 방정리 MBTI, 청소 습관 테스트, 정리 스타일 테스트, 청소 스타일, 무료 테스트"

export const metadata: Metadata = generateQuizMetadata({
  quizId: "clean-style",
  title: quizTitle,
  shortDescription,
  fullDescription,
  keywords,
  canonical: "/tests/clean-style",
  questionCount: 12,
  duration: "PT3M",
})

const faqs = [...getTopicQuizFAQs(quizTitle)]

const gscGuides = [
  {
    title: "청소 테스트 검색",
    description: "방 청소를 시작하는 방식, 먼지를 보는 반응, 물건을 버리는 기준을 함께 봅니다.",
  },
  {
    title: "정리형과 즉흥형 비교",
    description: "계획형 정리인지 즉흥형 청소인지, 음악과 공간 재배치 선호까지 기준을 나눕니다.",
  },
  {
    title: "방정리 습관 참고",
    description: "결과는 청결 평가가 아니라 방을 정리할 때 드러나는 선택 습관을 이해하기 위한 참고용입니다.",
  },
]

const questionCards = [
  ["1. 청소를 시작할 때", "계획부터 세운다 vs 일단 눈에 보이는 것부터 치운다"],
  ["2. 책상 위 먼지를 보면", "바로 닦는다 vs 나중에 한 번에 치운다"],
  ["3. 청소 중 음악은", "없으면 심심하다 vs 조용해야 집중된다"],
  ["4. 버릴지 말지 고민될 때", "과감히 버린다 vs 추억을 생각해 보관한다"],
  ["5. 방 구조가 바뀌면", "새 배치를 시도한다 vs 원래 위치가 편하다"],
  ["6. 먼지가 예상보다 많을 때", "계획을 다시 세운다 vs 가능한 만큼만 끝낸다"],
]

const cleanTypes = [
  ["감성 정리형", "ENFP"],
  ["배려 정리형", "ENFJ"],
  ["전략 청소형", "ENTJ"],
  ["실험 배치형", "ENTP"],
  ["따뜻한 관리형", "ESFJ"],
  ["감각 청소형", "ESFP"],
  ["효율 정리형", "ESTJ"],
  ["스피드 청소형", "ESTP"],
]

const featureCards = [
  ["정확한 분석", "12문항으로 청소 습관을 4축으로 나눠 유형화합니다."],
  ["맞춤 팁", "유형에 맞는 정리 방식과 방청소 시작 팁을 제공합니다."],
  ["쉬운 공유", "결과를 친구들과 공유하고 청소 스타일을 비교할 수 있습니다."],
]

export default function CleanStyleIntro() {
  const schemas = generateQuizSchemas({
    quizId: "clean-style",
    title: quizTitle,
    shortDescription,
    fullDescription,
    keywords,
    canonical: "/tests/clean-style",
    questionCount: 12,
    duration: "PT3M",
    faqs,
  })

  return (
    <>
      <JsonLd id="clean-style-quiz-schema" data={schemas.quiz} />
      <JsonLd id="clean-style-breadcrumb-schema" data={schemas.breadcrumb} />
      {schemas.faq && <JsonLd id="clean-style-faq-schema" data={schemas.faq} />}

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 dark:from-blue-950 dark:via-cyan-950 dark:to-teal-950">
        <main className="container mx-auto max-w-4xl px-4 py-8">
          <section className="space-y-8 text-center">
            <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-blue-200 to-cyan-300 shadow-lg">
              <SprayCan className="h-14 w-14 text-blue-900" aria-hidden="true" />
            </div>
            <div className="space-y-6">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                NEW 테스트
              </Badge>
              <h1 className="text-4xl font-bold leading-tight md:text-6xl">
                <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                  방청소 습관으로 보는
                </span>
                <br />
                <span className="text-foreground">나의 정리 스타일</span>
              </h1>
              <p className="mx-auto max-w-2xl text-xl leading-relaxed text-slate-700 dark:text-slate-200 md:text-2xl">
                청소를 계획하는지, 보이는 것부터 치우는지, 물건을 버리는 기준까지 12문항으로 확인합니다.
              </p>
              <div className="flex items-center justify-center gap-6 text-sm text-slate-700 dark:text-slate-200">
                <span className="flex items-center gap-2"><Users className="h-4 w-4" />5,986명 참여</span>
                <span className="flex items-center gap-2"><Clock className="h-4 w-4" />3분 소요</span>
                <span>12문항</span>
              </div>
              <Button size="lg" className="h-16 px-12 text-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600" asChild>
                <Link href="/tests/clean-style/test">테스트 시작하기</Link>
              </Button>
            </div>
          </section>

          <section className="mt-20 space-y-12" aria-label="테스트 소개">
            <Card className="border-0 bg-white/80 shadow-xl backdrop-blur">
              <CardContent className="p-8">
                <h2 className="mb-6 flex items-center justify-center gap-2 text-2xl font-bold">
                  <SprayCan className="h-6 w-6 text-blue-500" /> 이런 질문들이 있어요
                </h2>
                <div className="grid grid-cols-1 gap-4 text-left md:grid-cols-2">
                  {questionCards.map(([title, description], index) => (
                    <div key={title} className={`rounded-lg p-4 ${index % 2 === 0 ? "bg-blue-50 dark:bg-blue-950" : "bg-cyan-50 dark:bg-cyan-950"}`}>
                      <p className="font-medium">{title}</p>
                      <p className="mt-1 text-sm text-slate-700 dark:text-slate-200">{description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/80 shadow-xl backdrop-blur">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold">16가지 청소 스타일</h2>
                <p className="mt-2 text-slate-700 dark:text-slate-200">당신은 어떤 방정리 타입일까요?</p>
                <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                  {cleanTypes.map(([name, type]) => (
                    <div key={type} className="rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 p-3 text-center dark:from-blue-950 dark:to-cyan-950">
                      <div className="text-xs font-medium">{name}</div>
                      <div className="text-xs text-slate-700 dark:text-slate-200">{type}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/80 shadow-xl backdrop-blur">
              <CardContent className="p-8 text-center">
                <h2 className="mb-6 flex items-center justify-center gap-2 text-2xl font-bold">
                  <Sparkles className="h-6 w-6 text-cyan-500" /> 특별한 기능
                </h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  {featureCards.map(([title, description]) => (
                    <div key={title} className="space-y-2">
                      <h3 className="font-semibold">{title}</h3>
                      <p className="text-sm text-slate-700 dark:text-slate-200">{description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          <div className="mt-12">
            <GscLandingBoost
              title="방청소 성격 테스트로 보는 정리 습관"
              summary="방청소 성격 테스트는 청소 테스트, 방정리 MBTI, 청소 습관 테스트를 찾는 검색 의도에 맞춘 무료 성향 테스트입니다. 청소 시작 방식, 물건을 버리는 기준, 공간 재배치 선호를 바탕으로 16가지 청소 스타일을 보여줍니다."
              guides={gscGuides}
              relatedLinks={[
                { href: "/tests/bed-making", label: "침대 정리 테스트" },
                { href: "/tests/cooking-cleanup", label: "요리 후 정리 테스트" },
                { href: "/tests/morning-outfit", label: "아침 옷 고르기 테스트" },
              ]}
              tone="blue"
            />
          </div>

          <div className="mt-12"><AnswerEngineSection quizTitle="Clean Style Test" /></div>
          <div className="mt-12"><LandingConversionSection quizTitle="Clean Style Test" /></div>
          <div className="mt-12"><RelatedTestsSection testId="clean-style" /></div>
          <section className="mb-8 mt-12">
            <FAQSection faqs={faqs} title="방청소 성격 테스트 자주 묻는 질문" />
          </section>
        </main>
      </div>
    </>
  )
}
