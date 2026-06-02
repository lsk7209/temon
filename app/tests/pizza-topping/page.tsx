import type { Metadata } from "next"
import Link from "next/link"
import { Clock, Pizza, Sparkles, Users } from "lucide-react"
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

const quizTitle = "피자 토핑 선택 테스트"
const shortDescription = "피자 토핑 선택 테스트로 치즈형·페퍼로니형·도전형 음식 성향을 16유형으로 확인하세요."
const fullDescription =
  "피자 토핑 선택 테스트로 토핑을 고르는 기준, 치즈와 야채 선호, 익숙한 메뉴와 새로운 메뉴 중 무엇을 택하는지 확인하세요. 12문항으로 16가지 피자 취향 유형을 무료로 제공합니다."
const keywords =
  "피자 토핑 선택 테스트, 피자 테스트, 피자 토핑 테스트, 피자 MBTI, 음식 성향 테스트, 토핑 선택 테스트, 무료 테스트"

export const metadata: Metadata = generateQuizMetadata({
  quizId: "pizza-topping",
  title: quizTitle,
  shortDescription,
  fullDescription,
  keywords,
  canonical: "/tests/pizza-topping",
  questionCount: 12,
  duration: "PT3M",
})

const faqs = [...getTopicQuizFAQs(quizTitle)]

const gscGuides = [
  {
    title: "피자 테스트 검색",
    description: "페퍼로니, 치즈, 야채, 새로운 토핑 중 무엇을 고르는지 선택 기준을 확인합니다.",
  },
  {
    title: "토핑 선택 성향",
    description: "익숙한 맛, 풍성함, 균형, 도전 성향을 기준으로 피자 취향을 나눕니다.",
  },
  {
    title: "음식 성향 참고",
    description: "결과는 입맛 평가가 아니라 메뉴를 고를 때 드러나는 선택 습관을 이해하기 위한 참고용입니다.",
  },
]

const questionCards = [
  ["1. 토핑을 고를 때", "항상 페퍼로니를 고른다 vs 그때그때 새로운 토핑을 고른다"],
  ["2. 치즈는", "더블 치즈가 좋다 vs 기본 치즈면 충분하다"],
  ["3. 야채 토핑은", "빼고 싶다 vs 가득 올리고 싶다"],
  ["4. 주문할 때", "미리 정해둔 메뉴를 고른다 vs 화면을 보며 결정한다"],
  ["5. 피자 조각은", "가장 큰 조각을 고른다 vs 토핑이 많은 조각을 고른다"],
  ["6. 가장자리 빵은", "끝까지 먹는다 vs 토핑 있는 부분에 집중한다"],
]

const typeCards = [
  ["클래식 페퍼로니형", "ISTJ"],
  ["치즈 몰입형", "INFP"],
  ["균형 토핑형", "ENFJ"],
  ["야채 조화형", "ISFJ"],
  ["신메뉴 도전형", "ENTP"],
  ["토핑 분석형", "INTP"],
  ["효율 주문형", "ENTJ"],
  ["취향 설계형", "INTJ"],
]

const featureCards = [
  ["정확한 분석", "12문항으로 피자 토핑 선택 습관을 유형화합니다."],
  ["맞춤 팁", "유형에 맞는 피자 조합과 함께 먹기 좋은 메뉴 힌트를 제공합니다."],
  ["쉬운 공유", "결과를 친구들과 공유하고 피자 취향을 비교할 수 있습니다."],
]

export default function PizzaToppingIntro() {
  const schemas = generateQuizSchemas({
    quizId: "pizza-topping",
    title: quizTitle,
    shortDescription,
    fullDescription,
    keywords,
    canonical: "/tests/pizza-topping",
    questionCount: 12,
    duration: "PT3M",
    faqs,
  })

  return (
    <>
      <JsonLd id="pizza-topping-quiz-schema" data={schemas.quiz} />
      <JsonLd id="pizza-topping-breadcrumb-schema" data={schemas.breadcrumb} />
      {schemas.faq && <JsonLd id="pizza-topping-faq-schema" data={schemas.faq} />}

      <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950">
        <main className="container mx-auto max-w-4xl px-4 py-8">
          <section className="space-y-8 text-center">
            <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-red-200 to-orange-300 shadow-lg">
              <Pizza className="h-14 w-14 text-red-900" aria-hidden="true" />
            </div>
            <div className="space-y-6">
              <Badge variant="secondary" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">NEW 테스트</Badge>
              <h1 className="text-4xl font-bold leading-tight md:text-6xl">
                <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">피자 토핑 선택으로 보는</span>
                <br />
                <span className="text-foreground">나의 음식 취향 유형</span>
              </h1>
              <p className="mx-auto max-w-2xl text-xl leading-relaxed text-slate-700 dark:text-slate-200 md:text-2xl">
                치즈, 페퍼로니, 야채, 신메뉴까지 피자를 고르는 기준을 12문항으로 확인합니다.
              </p>
              <div className="flex items-center justify-center gap-6 text-sm text-slate-700 dark:text-slate-200">
                <span className="flex items-center gap-2"><Users className="h-4 w-4" />10,087명 참여</span>
                <span className="flex items-center gap-2"><Clock className="h-4 w-4" />3분 소요</span>
                <span>12문항</span>
              </div>
              <Button size="lg" className="h-16 px-12 text-xl bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600" asChild>
                <Link href="/tests/pizza-topping/test">테스트 시작하기</Link>
              </Button>
            </div>
          </section>

          <section className="mt-20 space-y-12" aria-label="테스트 소개">
            <Card className="border-0 bg-white/80 shadow-xl backdrop-blur">
              <CardContent className="p-8">
                <h2 className="mb-6 flex items-center justify-center gap-2 text-2xl font-bold">
                  <Pizza className="h-6 w-6 text-red-500" /> 이런 질문들이 있어요
                </h2>
                <div className="grid grid-cols-1 gap-4 text-left md:grid-cols-2">
                  {questionCards.map(([title, description], index) => (
                    <div key={title} className={`rounded-lg p-4 ${index % 2 === 0 ? "bg-red-50 dark:bg-red-950" : "bg-orange-50 dark:bg-orange-950"}`}>
                      <p className="font-medium">{title}</p>
                      <p className="mt-1 text-sm text-slate-700 dark:text-slate-200">{description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/80 shadow-xl backdrop-blur">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold">16가지 피자 토핑 유형</h2>
                <p className="mt-2 text-slate-700 dark:text-slate-200">당신은 어떤 토핑 선택 타입일까요?</p>
                <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                  {typeCards.map(([name, type]) => (
                    <div key={type} className="rounded-lg bg-gradient-to-br from-red-50 to-orange-50 p-3 text-center dark:from-red-950 dark:to-orange-950">
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
              title="피자 토핑 선택 테스트로 보는 음식 성향"
              summary="피자 토핑 선택 테스트는 피자 테스트, 피자 토핑 테스트, 피자 MBTI를 찾는 검색 의도에 맞춘 무료 성향 테스트입니다. 치즈와 페퍼로니 선호, 야채 토핑, 새로운 메뉴 도전 기준을 바탕으로 16가지 피자 취향 유형을 보여줍니다."
              guides={gscGuides}
              relatedLinks={[
                { href: "/tests/food-ordering", label: "음식 주문 스타일 테스트" },
                { href: "/tests/chicken-style", label: "치킨 취향 테스트" },
                { href: "/tests/dessert-style", label: "디저트 취향 테스트" },
              ]}
              tone="red"
            />
          </div>

          <div className="mt-12"><AnswerEngineSection quizTitle="Pizza Topping Test" /></div>
          <div className="mt-12"><LandingConversionSection quizTitle="Pizza Topping Test" /></div>
          <div className="mt-12"><RelatedTestsSection testId="pizza-topping" /></div>
          <section className="mb-8 mt-12">
            <FAQSection faqs={faqs} title="피자 토핑 선택 테스트 자주 묻는 질문" />
          </section>
        </main>
      </div>
    </>
  )
}
