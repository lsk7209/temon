import type { Metadata } from "next"
import Link from "next/link"
import { Clock, Salad, Sparkles, Users } from "lucide-react"
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

const quizTitle = "샐러드 드레싱 선택 테스트"
const shortDescription = "샐러드 드레싱 선택 테스트로 건강형·맛집중형·균형형 음식 성향을 16유형으로 확인하세요."
const fullDescription =
  "샐러드 드레싱 선택 테스트로 드레싱 종류와 양, 맛과 건강 중 무엇을 우선하는지 확인하세요. 12문항으로 16가지 샐러드 취향 유형을 무료로 제공합니다."
const keywords =
  "샐러드 드레싱 선택 테스트, 샐러드 테스트, 드레싱 테스트, 샐러드 드레싱 테스트, 음식 성향 테스트, 건강 취향 테스트, 무료 테스트"

export const metadata: Metadata = generateQuizMetadata({
  quizId: "salad-dressing",
  title: quizTitle,
  shortDescription,
  fullDescription,
  keywords,
  canonical: "/tests/salad-dressing",
  questionCount: 12,
  duration: "PT3M",
})

const faqs = [...getTopicQuizFAQs(quizTitle)]

const gscGuides = [
  {
    title: "샐러드 테스트 검색",
    description: "드레싱 종류, 드레싱 양, 재료 조합, 맛과 건강 중 무엇을 우선하는지 확인합니다.",
  },
  {
    title: "드레싱 선택 성향",
    description: "상큼함, 고소함, 건강함, 익숙함을 기준으로 샐러드 취향의 우선순위를 나눕니다.",
  },
  {
    title: "음식 성향 참고",
    description: "결과는 식단 평가가 아니라 가벼운 메뉴를 고를 때 드러나는 선택 습관을 이해하기 위한 참고용입니다.",
  },
]

const questionCards = [
  ["1. 드레싱 종류는", "올리브오일처럼 가볍게 vs 시저처럼 진하게"],
  ["2. 드레싱 양은", "넉넉하게 뿌린다 vs 조금만 곁들인다"],
  ["3. 선택 기준은", "맛이 먼저다 vs 건강함이 먼저다"],
  ["4. 샐러드 재료는", "익숙한 기본 재료 vs 새로운 재료 조합"],
  ["5. 먹는 순서는", "섞어서 한입씩 먹는다 vs 재료별로 골라 먹는다"],
  ["6. 나눠 먹을 때", "함께 덜어 먹는다 vs 각자 취향대로 먹는다"],
]

const typeCards = [
  ["상큼 오일형", "ENFP"],
  ["담백 건강형", "ISFJ"],
  ["균형 조합형", "ENFJ"],
  ["미니멀 드레싱형", "INTJ"],
  ["신맛 도전형", "ENTP"],
  ["영양 분석형", "INTP"],
  ["루틴 식단형", "ESTJ"],
  ["고소한 만족형", "ISFP"],
]

const featureCards = [
  ["정확한 분석", "12문항으로 드레싱 선택과 샐러드 취향을 유형화합니다."],
  ["맞춤 팁", "유형에 맞는 드레싱 조합과 메뉴 선택 힌트를 제공합니다."],
  ["쉬운 공유", "결과를 친구들과 공유하고 샐러드 취향을 비교할 수 있습니다."],
]

export default function SaladDressingIntro() {
  const schemas = generateQuizSchemas({
    quizId: "salad-dressing",
    title: quizTitle,
    shortDescription,
    fullDescription,
    keywords,
    canonical: "/tests/salad-dressing",
    questionCount: 12,
    duration: "PT3M",
    faqs,
  })

  return (
    <>
      <JsonLd id="salad-dressing-quiz-schema" data={schemas.quiz} />
      <JsonLd id="salad-dressing-breadcrumb-schema" data={schemas.breadcrumb} />
      {schemas.faq && <JsonLd id="salad-dressing-faq-schema" data={schemas.faq} />}

      <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950">
        <main className="container mx-auto max-w-4xl px-4 py-8">
          <section className="space-y-8 text-center">
            <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-green-200 to-lime-300 shadow-lg">
              <Salad className="h-14 w-14 text-green-900" aria-hidden="true" />
            </div>
            <div className="space-y-6">
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">NEW 테스트</Badge>
              <h1 className="text-4xl font-bold leading-tight md:text-6xl">
                <span className="bg-gradient-to-r from-green-500 to-lime-500 bg-clip-text text-transparent">샐러드 드레싱 선택으로 보는</span>
                <br />
                <span className="text-foreground">나의 음식 성향 유형</span>
              </h1>
              <p className="mx-auto max-w-2xl text-xl leading-relaxed text-slate-700 dark:text-slate-200 md:text-2xl">
                드레싱 종류와 양, 맛과 건강 사이의 기준, 재료 조합 취향을 12문항으로 확인합니다.
              </p>
              <div className="flex items-center justify-center gap-6 text-sm text-slate-700 dark:text-slate-200">
                <span className="flex items-center gap-2"><Users className="h-4 w-4" />15,950명 참여</span>
                <span className="flex items-center gap-2"><Clock className="h-4 w-4" />3분 소요</span>
                <span>12문항</span>
              </div>
              <Button size="lg" className="h-16 px-12 text-xl bg-gradient-to-r from-green-500 to-lime-500 hover:from-green-600 hover:to-lime-600" asChild>
                <Link href="/tests/salad-dressing/test">테스트 시작하기</Link>
              </Button>
            </div>
          </section>

          <section className="mt-20 space-y-12" aria-label="테스트 소개">
            <Card className="border-0 bg-white/80 shadow-xl backdrop-blur">
              <CardContent className="p-8">
                <h2 className="mb-6 flex items-center justify-center gap-2 text-2xl font-bold">
                  <Salad className="h-6 w-6 text-green-500" /> 이런 질문들이 있어요
                </h2>
                <div className="grid grid-cols-1 gap-4 text-left md:grid-cols-2">
                  {questionCards.map(([title, description], index) => (
                    <div key={title} className={`rounded-lg p-4 ${index % 2 === 0 ? "bg-green-50 dark:bg-green-950" : "bg-lime-50 dark:bg-lime-950"}`}>
                      <p className="font-medium">{title}</p>
                      <p className="mt-1 text-sm text-slate-700 dark:text-slate-200">{description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/80 shadow-xl backdrop-blur">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold">16가지 드레싱 선택 유형</h2>
                <p className="mt-2 text-slate-700 dark:text-slate-200">당신은 어떤 샐러드 취향 타입일까요?</p>
                <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                  {typeCards.map(([name, type]) => (
                    <div key={type} className="rounded-lg bg-gradient-to-br from-green-50 to-lime-50 p-3 text-center dark:from-green-950 dark:to-lime-950">
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
                  <Sparkles className="h-6 w-6 text-lime-500" /> 특별한 기능
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
              title="샐러드 드레싱 선택 테스트로 보는 음식 성향"
              summary="샐러드 드레싱 선택 테스트는 샐러드 테스트, 드레싱 테스트, 샐러드 드레싱 테스트를 찾는 검색 의도에 맞춘 무료 성향 테스트입니다. 드레싱 종류와 양, 맛과 건강의 우선순위, 재료 조합 기준을 바탕으로 16가지 샐러드 취향 유형을 보여줍니다."
              guides={gscGuides}
              relatedLinks={[
                { href: "/tests/taste-preference", label: "입맛 취향 테스트" },
                { href: "/tests/food-ordering", label: "음식 주문 스타일 테스트" },
                { href: "/tests/dessert-style", label: "디저트 취향 테스트" },
              ]}
              tone="green"
            />
          </div>

          <div className="mt-12"><AnswerEngineSection quizTitle="Salad Dressing Test" /></div>
          <div className="mt-12"><LandingConversionSection quizTitle="Salad Dressing Test" /></div>
          <div className="mt-12"><RelatedTestsSection testId="salad-dressing" /></div>
          <section className="mb-8 mt-12">
            <FAQSection faqs={faqs} title="샐러드 드레싱 선택 테스트 자주 묻는 질문" />
          </section>
        </main>
      </div>
    </>
  )
}
