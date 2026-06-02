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
import { Clock, Coffee, Sparkles, Users } from "lucide-react"

const quizTitle = "아침 커피 마시는 방식 테스트"
const shortDescription = "아침 커피 마시는 방식 테스트로 루틴형·즉흥형 커피 습관을 확인하세요."
const fullDescription =
  "아침 커피 마시는 방식 테스트로 커피를 바로 마시는지, 식혀 마시는지, 정해진 루틴으로 준비하는지 확인하세요. 12문항으로 16가지 아침 커피 유형을 무료로 제공합니다."
const keywords =
  "아침 커피 마시는 방식 테스트, 아침 커피 테스트, 커피 습관 테스트, 모닝커피 테스트, 커피 루틴 테스트, 성격 테스트, 무료 테스트"

export const metadata: Metadata = generateQuizMetadata({
  quizId: "morning-coffee",
  title: quizTitle,
  shortDescription,
  fullDescription,
  keywords,
  canonical: "/tests/morning-coffee",
  questionCount: 12,
  duration: "PT3M",
})

const faqs = [...getTopicQuizFAQs(quizTitle)]

const gscGuides = [
  {
    title: "아침 커피 테스트 검색",
    description:
      "아침에 커피를 바로 마시는지, 조금 식힌 뒤 마시는지, 하루 시작 습관을 기준으로 봅니다.",
  },
  {
    title: "커피 루틴 성향",
    description:
      "정해진 시간과 방식으로 준비하는지, 그날 기분에 따라 바꾸는지 모닝커피 루틴을 비교합니다.",
  },
  {
    title: "모닝 루틴 참고",
    description:
      "결과는 카페인 섭취 조언이 아니라 아침을 시작하는 선택 습관을 이해하기 위한 참고용입니다.",
  },
]

const questionCards = [
  ["1. 아침에 커피를 마실 때", "바로 마신다 vs 조금 식혀서 마신다"],
  ["2. 커피가 식었을 때", "다시 데워 마신다 vs 그대로 마신다"],
  ["3. 커피를 만들 때", "정해진 방식대로 만든다 vs 그때그때 다르게 만든다"],
  ["4. 커피를 마시는 장소", "집에서 마신다 vs 카페에서 마신다"],
  ["5. 커피를 마시는 시간", "정해진 시간에 마신다 vs 필요할 때 마신다"],
  ["6. 커피를 마시면서 하는 일", "일을 시작한다 vs 여유롭게 즐긴다"],
]

const coffeeTypes = [
  { name: "즉흥형", type: "ENFP" },
  { name: "감성형", type: "INFP" },
  { name: "루틴형", type: "ENFJ" },
  { name: "몰입형", type: "INFJ" },
  { name: "실험형", type: "ENTP" },
  { name: "분석형", type: "INTP" },
  { name: "효율형", type: "ENTJ" },
  { name: "계획형", type: "INTJ" },
]

const featureCards = [
  ["정확한 분석", "12문항으로 커피 습관을 4축으로 정량화해 유형화"],
  ["맞춤 팁", "당신의 유형에 맞는 커피 루틴과 아침 시작 팁 제공"],
  ["쉬운 공유", "결과를 친구들과 쉽게 공유하고 비교해보세요"],
]

export default function MorningCoffeeIntro() {
  const schemas = generateQuizSchemas({
    quizId: "morning-coffee",
    title: quizTitle,
    shortDescription,
    fullDescription,
    keywords,
    canonical: "/tests/morning-coffee",
    questionCount: 12,
    duration: "PT3M",
    faqs,
  })

  return (
    <>
      <JsonLd id="morning-coffee-quiz-schema" data={schemas.quiz} />
      <JsonLd id="morning-coffee-breadcrumb-schema" data={schemas.breadcrumb} />
      {schemas.faq && <JsonLd id="morning-coffee-faq-schema" data={schemas.faq} />}

      <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950">
        <main className="container mx-auto max-w-4xl px-4 py-8">
          <section className="text-center space-y-8">
            <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-amber-200 to-orange-300 shadow-lg">
              <Coffee className="h-14 w-14 text-amber-900" aria-hidden="true" />
            </div>

            <div className="space-y-6">
              <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                NEW 테스트
              </Badge>
              <h1 className="text-4xl font-bold leading-tight md:text-6xl">
                <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                  아침 커피 마시는 방식으로 보는
                </span>
                <br />
                <span className="text-foreground">나의 커피 루틴 유형</span>
              </h1>
              <p className="mx-auto max-w-2xl text-xl leading-relaxed text-slate-700 dark:text-slate-200 md:text-2xl">
                커피를 바로 마시는지, 식혀 마시는지, 정해진 방식으로 준비하는지 12문항으로 확인합니다.
              </p>
              <div className="flex items-center justify-center gap-6 text-sm text-slate-700 dark:text-slate-200">
                <span className="flex items-center gap-2"><Users className="h-4 w-4" />8,735명 참여</span>
                <span className="flex items-center gap-2"><Clock className="h-4 w-4" />3분 소요</span>
                <span>12문항</span>
              </div>
              <Button size="lg" className="h-16 px-12 text-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600" asChild>
                <Link href="/tests/morning-coffee/test">테스트 시작하기</Link>
              </Button>
            </div>
          </section>

          <section className="mt-20 space-y-12" aria-label="테스트 소개">
            <Card className="border-0 bg-white/80 shadow-xl backdrop-blur">
              <CardContent className="p-8">
                <h2 className="mb-6 flex items-center justify-center gap-2 text-2xl font-bold">
                  <Coffee className="h-6 w-6 text-amber-500" /> 이런 질문들이 있어요
                </h2>
                <div className="grid grid-cols-1 gap-4 text-left md:grid-cols-2">
                  {questionCards.map(([title, description], index) => (
                    <div key={title} className={`rounded-lg p-4 ${index % 2 === 0 ? "bg-amber-50 dark:bg-amber-950" : "bg-orange-50 dark:bg-orange-950"}`}>
                      <p className="font-medium">{title}</p>
                      <p className="mt-1 text-sm text-slate-700 dark:text-slate-200">{description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/80 shadow-xl backdrop-blur">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold">16가지 커피 루틴 유형</h2>
                <p className="mt-2 text-slate-700 dark:text-slate-200">당신은 어떤 모닝커피 스타일일까요?</p>
                <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                  {coffeeTypes.map((item) => (
                    <div key={item.type} className="rounded-lg bg-gradient-to-br from-amber-50 to-orange-50 p-3 text-center dark:from-amber-950 dark:to-orange-950">
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
              title="아침 커피 마시는 방식 테스트로 보는 모닝 루틴"
              summary="아침 커피 마시는 방식 테스트는 아침 커피 테스트, 커피 습관 테스트, 모닝커피 테스트를 찾는 검색 의도에 맞춘 무료 성향 테스트입니다. 커피 온도, 준비 방식, 마시는 시간과 장소를 바탕으로 16가지 커피 루틴 유형을 보여줍니다."
              guides={gscGuides}
              relatedLinks={[
                { href: "/tests/coffee-mbti", label: "커피 MBTI 테스트" },
                { href: "/tests/morning-mood", label: "아침 기분 테스트" },
                { href: "/tests/morning-rush", label: "아침 준비 속도 테스트" },
              ]}
              tone="orange"
            />
          </div>

          <div className="mt-12"><AnswerEngineSection quizTitle="Morning Coffee Test" /></div>
          <div className="mt-12"><LandingConversionSection quizTitle="Morning Coffee Test" /></div>
          <div className="mt-12"><RelatedTestsSection testId="morning-coffee" /></div>
          <section className="mb-8 mt-12">
            <FAQSection faqs={faqs} title="아침 커피 마시는 방식 테스트 자주 묻는 질문" />
          </section>
        </main>
      </div>
    </>
  )
}
