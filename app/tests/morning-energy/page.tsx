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
import { Clock, Sparkles, Sun, Users } from "lucide-react"

const quizTitle = "아침 에너지 관리 테스트"
const shortDescription = "아침 에너지 테스트로 활동형·충전형 아침 컨디션 관리 습관을 16유형으로 확인하세요."
const fullDescription =
  "아침 에너지 관리 테스트로 피곤할 때 어떻게 충전하는지, 에너지가 넘칠 때 바로 움직이는지 확인하세요. 12문항으로 16가지 아침 에너지 유형을 무료로 제공합니다."
const keywords =
  "아침 에너지 테스트, 아침 컨디션 테스트, 에너지 관리 테스트, 모닝 루틴 테스트, 아침 루틴 테스트, 성격 테스트, 무료 테스트"

export const metadata: Metadata = generateQuizMetadata({
  quizId: "morning-energy",
  title: quizTitle,
  shortDescription,
  fullDescription,
  keywords,
  canonical: "/tests/morning-energy",
  questionCount: 12,
  duration: "PT3M",
})

const faqs = [...getTopicQuizFAQs(quizTitle)]

const gscGuides = [
  {
    title: "아침 에너지 테스트 검색",
    description: "아침에 피곤할 때 쉬는지 움직이는지, 에너지가 넘칠 때 어떻게 쓰는지 봅니다.",
  },
  {
    title: "컨디션 관리 성향",
    description: "운동, 휴식, 효율, 기분 중 무엇을 우선하는지 아침 에너지 기준을 나눕니다.",
  },
  {
    title: "모닝 루틴 참고",
    description: "결과는 건강 진단이 아니라 아침 컨디션을 다루는 선택 습관을 이해하기 위한 참고용입니다.",
  },
]

const questionCards = [
  ["1. 아침에 피곤할 때", "에너지를 충전할 행동을 한다 vs 일단 천천히 움직인다"],
  ["2. 아침 에너지가 넘칠 때", "바로 할 일을 시작한다 vs 여유롭게 즐긴다"],
  ["3. 컨디션을 관리할 때", "정해진 방법으로 관리한다 vs 그때그때 다르게 관리한다"],
  ["4. 에너지를 충전할 때", "운동이나 활동을 한다 vs 휴식이나 명상을 한다"],
  ["5. 에너지를 사용할 때", "효율적으로 쓴다 vs 자유롭게 쓴다"],
  ["6. 에너지를 관리하는 이유", "생산성을 위해서 vs 기분과 컨디션을 위해서"],
]

const energyTypes = [
  ["즉흥 활동형", "ENFP"],
  ["감성 충전형", "INFP"],
  ["루틴 관리형", "ENFJ"],
  ["조용한 회복형", "INFJ"],
  ["아이디어 점화형", "ENTP"],
  ["컨디션 분석형", "INTP"],
  ["효율 추진형", "ENTJ"],
  ["계획 에너지형", "INTJ"],
]

const featureCards = [
  ["정확한 분석", "12문항으로 에너지 관리 습관을 4축으로 나눠 유형화합니다."],
  ["맞춤 팁", "유형에 맞는 아침 컨디션 관리와 모닝 루틴 팁을 제공합니다."],
  ["쉬운 공유", "결과를 친구들과 공유하고 아침 에너지 스타일을 비교할 수 있습니다."],
]

export default function MorningEnergyIntro() {
  const schemas = generateQuizSchemas({
    quizId: "morning-energy",
    title: quizTitle,
    shortDescription,
    fullDescription,
    keywords,
    canonical: "/tests/morning-energy",
    questionCount: 12,
    duration: "PT3M",
    faqs,
  })

  return (
    <>
      <JsonLd id="morning-energy-quiz-schema" data={schemas.quiz} />
      <JsonLd id="morning-energy-breadcrumb-schema" data={schemas.breadcrumb} />
      {schemas.faq && <JsonLd id="morning-energy-faq-schema" data={schemas.faq} />}

      <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950">
        <main className="container mx-auto max-w-4xl px-4 py-8">
          <section className="space-y-8 text-center">
            <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-yellow-200 to-orange-300 shadow-lg">
              <Sun className="h-14 w-14 text-orange-900" aria-hidden="true" />
            </div>
            <div className="space-y-6">
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                NEW 테스트
              </Badge>
              <h1 className="text-4xl font-bold leading-tight md:text-6xl">
                <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                  아침 에너지 관리로 보는
                </span>
                <br />
                <span className="text-foreground">나의 컨디션 스타일</span>
              </h1>
              <p className="mx-auto max-w-2xl text-xl leading-relaxed text-slate-700 dark:text-slate-200 md:text-2xl">
                피곤할 때 어떻게 충전하는지, 에너지가 넘칠 때 어떻게 쓰는지 12문항으로 확인합니다.
              </p>
              <div className="flex items-center justify-center gap-6 text-sm text-slate-700 dark:text-slate-200">
                <span className="flex items-center gap-2"><Users className="h-4 w-4" />16,496명 참여</span>
                <span className="flex items-center gap-2"><Clock className="h-4 w-4" />3분 소요</span>
                <span>12문항</span>
              </div>
              <Button size="lg" className="h-16 px-12 text-xl bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600" asChild>
                <Link href="/tests/morning-energy/test">테스트 시작하기</Link>
              </Button>
            </div>
          </section>

          <section className="mt-20 space-y-12" aria-label="테스트 소개">
            <Card className="border-0 bg-white/80 shadow-xl backdrop-blur">
              <CardContent className="p-8">
                <h2 className="mb-6 flex items-center justify-center gap-2 text-2xl font-bold">
                  <Sun className="h-6 w-6 text-yellow-500" /> 이런 질문들이 있어요
                </h2>
                <div className="grid grid-cols-1 gap-4 text-left md:grid-cols-2">
                  {questionCards.map(([title, description], index) => (
                    <div key={title} className={`rounded-lg p-4 ${index % 2 === 0 ? "bg-yellow-50 dark:bg-yellow-950" : "bg-orange-50 dark:bg-orange-950"}`}>
                      <p className="font-medium">{title}</p>
                      <p className="mt-1 text-sm text-slate-700 dark:text-slate-200">{description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/80 shadow-xl backdrop-blur">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold">16가지 아침 에너지 유형</h2>
                <p className="mt-2 text-slate-700 dark:text-slate-200">당신은 어떤 컨디션 관리 타입일까요?</p>
                <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                  {energyTypes.map(([name, type]) => (
                    <div key={type} className="rounded-lg bg-gradient-to-br from-yellow-50 to-orange-50 p-3 text-center dark:from-yellow-950 dark:to-orange-950">
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
                  <Sparkles className="h-6 w-6 text-orange-500" /> 특별한 기능
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
              title="아침 에너지 테스트로 보는 컨디션 관리"
              summary="아침 에너지 테스트는 아침 컨디션 테스트, 에너지 관리 테스트, 모닝 루틴 테스트를 찾는 검색 의도에 맞춘 무료 성향 테스트입니다. 피곤할 때의 반응, 충전 방식, 아침 에너지 사용 기준을 바탕으로 16가지 컨디션 스타일을 보여줍니다."
              guides={gscGuides}
              relatedLinks={[
                { href: "/tests/morning-alarm", label: "아침 알람 테스트" },
                { href: "/tests/morning-coffee", label: "아침 커피 테스트" },
                { href: "/tests/morning-mood", label: "아침 기분 테스트" },
              ]}
              tone="orange"
            />
          </div>

          <div className="mt-12"><AnswerEngineSection quizTitle="Morning Energy Test" /></div>
          <div className="mt-12"><LandingConversionSection quizTitle="Morning Energy Test" /></div>
          <div className="mt-12"><RelatedTestsSection testId="morning-energy" /></div>
          <section className="mb-8 mt-12">
            <FAQSection faqs={faqs} title="아침 에너지 관리 테스트 자주 묻는 질문" />
          </section>
        </main>
      </div>
    </>
  )
}
