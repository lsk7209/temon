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
import { Clock, Moon, Sparkles, Users } from "lucide-react"

const quizTitle = "주말 충전 방식 테스트"
const shortDescription = "주말 충전 방식 테스트로 집콕형·활동형 휴식 성향을 16유형으로 확인하세요."
const fullDescription =
  "주말 충전 방식 테스트로 혼자 쉬는지 사람들과 에너지를 채우는지, 계획형 휴식인지 즉흥형 휴식인지 확인하세요. 12문항으로 16가지 주말 충전 유형을 무료로 제공합니다."
const keywords =
  "주말 충전 방식 테스트, 주말 휴식 테스트, 집콕 테스트, 에너지 충전 테스트, 주말 성향 테스트, 휴식 성향, 무료 테스트"

export const metadata: Metadata = generateQuizMetadata({
  quizId: "weekend-rest",
  title: quizTitle,
  shortDescription,
  fullDescription,
  keywords,
  canonical: "/tests/weekend-rest",
  questionCount: 12,
  duration: "PT3M",
})

const faqs = [...getTopicQuizFAQs(quizTitle)]

const gscGuides = [
  {
    title: "주말 휴식 테스트 검색",
    description:
      "주말을 집에서 조용히 보내는지, 밖에서 활동하며 충전하는지 기본 휴식 방향을 확인합니다.",
  },
  {
    title: "집콕형과 활동형 비교",
    description:
      "혼자 쉬는 시간, 사람들과 보내는 시간, 계획과 즉흥의 비중을 기준으로 충전 방식을 나눕니다.",
  },
  {
    title: "충전 루틴 참고",
    description:
      "결과는 생활 습관을 평가하지 않고 나에게 맞는 주말 에너지 회복 방식을 이해하기 위한 참고용입니다.",
  },
]

const questionCards = [
  ["1. 주말에 에너지를 충전할 때", "미리 계획을 세운다 vs 그때그때 결정한다"],
  ["2. 완전히 쉬고 싶을 때", "계획대로 쉰다 vs 상황에 따라 조정한다"],
  ["3. 주말 충전 방식", "혼자 조용히 쉰다 vs 사람들과 함께 쉰다"],
  ["4. 충전하는 시간", "정해진 시간에 쉰다 vs 필요할 때 쉰다"],
  ["5. 충전하는 이유", "목표와 계획을 위해 vs 기분과 컨디션을 위해"],
  ["6. 충전 방식 선택 기준", "효율과 회복 속도 vs 마음 편한 느낌"],
]

const restTypes = [
  { name: "즉흥형", type: "ENFP" },
  { name: "감성형", type: "INFP" },
  { name: "조율형", type: "ENFJ" },
  { name: "몰입형", type: "INFJ" },
  { name: "활동형", type: "ENTP" },
  { name: "분석형", type: "INTP" },
  { name: "효율형", type: "ENTJ" },
  { name: "계획형", type: "INTJ" },
]

const featureCards = [
  ["정확한 분석", "12문항으로 충전 습관을 4축으로 정량화해 유형화"],
  ["맞춤 팁", "당신의 유형에 맞는 휴식 방식과 주말 루틴 팁 제공"],
  ["쉬운 공유", "결과를 친구들과 쉽게 공유하고 비교해보세요"],
]

export default function WeekendRestIntro() {
  const schemas = generateQuizSchemas({
    quizId: "weekend-rest",
    title: quizTitle,
    shortDescription,
    fullDescription,
    keywords,
    canonical: "/tests/weekend-rest",
    questionCount: 12,
    duration: "PT3M",
    faqs,
  })

  return (
    <>
      <JsonLd id="weekend-rest-quiz-schema" data={schemas.quiz} />
      <JsonLd id="weekend-rest-breadcrumb-schema" data={schemas.breadcrumb} />
      {schemas.faq && <JsonLd id="weekend-rest-faq-schema" data={schemas.faq} />}

      <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950">
        <main className="container mx-auto max-w-4xl px-4 py-8">
          <section className="text-center space-y-8">
            <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-indigo-200 to-violet-300 shadow-lg">
              <Moon className="h-14 w-14 text-indigo-900" aria-hidden="true" />
            </div>

            <div className="space-y-6">
              <Badge variant="secondary" className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                NEW 테스트
              </Badge>
              <h1 className="text-4xl font-bold leading-tight md:text-6xl">
                <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
                  주말 충전 방식으로 보는
                </span>
                <br />
                <span className="text-foreground">나의 휴식 성향 유형</span>
              </h1>
              <p className="mx-auto max-w-2xl text-xl leading-relaxed text-slate-700 dark:text-slate-200 md:text-2xl">
                혼자 쉬는지, 사람들과 에너지를 채우는지, 계획형 휴식인지 즉흥형 휴식인지 확인합니다.
              </p>
              <div className="flex items-center justify-center gap-6 text-sm text-slate-700 dark:text-slate-200">
                <span className="flex items-center gap-2"><Users className="h-4 w-4" />7,349명 참여</span>
                <span className="flex items-center gap-2"><Clock className="h-4 w-4" />3분 소요</span>
                <span>12문항</span>
              </div>
              <Button size="lg" className="h-16 px-12 text-xl bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600" asChild>
                <Link href="/tests/weekend-rest/test">테스트 시작하기</Link>
              </Button>
            </div>
          </section>

          <section className="mt-20 space-y-12" aria-label="테스트 소개">
            <Card className="border-0 bg-white/80 shadow-xl backdrop-blur">
              <CardContent className="p-8">
                <h2 className="mb-6 flex items-center justify-center gap-2 text-2xl font-bold">
                  <Moon className="h-6 w-6 text-indigo-500" /> 이런 질문들이 있어요
                </h2>
                <div className="grid grid-cols-1 gap-4 text-left md:grid-cols-2">
                  {questionCards.map(([title, description], index) => (
                    <div key={title} className={`rounded-lg p-4 ${index % 2 === 0 ? "bg-indigo-50 dark:bg-indigo-950" : "bg-violet-50 dark:bg-violet-950"}`}>
                      <p className="font-medium">{title}</p>
                      <p className="mt-1 text-sm text-slate-700 dark:text-slate-200">{description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/80 shadow-xl backdrop-blur">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold">16가지 주말 충전 유형</h2>
                <p className="mt-2 text-slate-700 dark:text-slate-200">당신은 어떤 휴식 스타일일까요?</p>
                <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                  {restTypes.map((item) => (
                    <div key={item.type} className="rounded-lg bg-gradient-to-br from-indigo-50 to-violet-50 p-3 text-center dark:from-indigo-950 dark:to-violet-950">
                      <div className="text-xs font-medium">{item.name}</div>
                      <div className="text-xs text-slate-700 dark:text-slate-200">{item.type}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/80 shadow-xl backdrop-blur">
              <CardContent className="p-8 text-center">
                <h2 className="mb-6 flex items-center justify-center gap-2 text-2xl font-bold">
                  <Sparkles className="h-6 w-6 text-violet-500" /> 특별한 기능
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
              title="주말 충전 방식 테스트로 보는 휴식 성향"
              summary="주말 충전 방식 테스트는 주말 휴식 테스트, 집콕 테스트, 에너지 충전 테스트를 찾는 검색 의도에 맞춘 무료 성향 테스트입니다. 혼자 쉬는 방식, 사람들과 보내는 방식, 계획과 즉흥의 비중을 바탕으로 16가지 주말 충전 유형을 보여줍니다."
              guides={gscGuides}
              relatedLinks={[
                { href: "/tests/weekend-balance", label: "주말 균형 테스트" },
                { href: "/tests/weekend-lazy", label: "주말 게으름 테스트" },
                { href: "/tests/weekend-planning", label: "주말 계획 테스트" },
              ]}
              tone="indigo"
            />
          </div>

          <div className="mt-12"><AnswerEngineSection quizTitle="Weekend Rest Test" /></div>
          <div className="mt-12"><LandingConversionSection quizTitle="Weekend Rest Test" /></div>
          <div className="mt-12"><RelatedTestsSection testId="weekend-rest" /></div>
          <section className="mb-8 mt-12">
            <FAQSection faqs={faqs} title="주말 충전 방식 테스트 자주 묻는 질문" />
          </section>
        </main>
      </div>
    </>
  )
}
