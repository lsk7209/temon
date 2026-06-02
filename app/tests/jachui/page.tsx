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
import { ChefHat, Clock, Sparkles, Users } from "lucide-react"

const quizTitle = "자취 밥상 스타일 테스트"
const shortDescription = "자취 밥상 스타일 테스트로 요리형·배달형·절약형 식사 습관을 16유형으로 확인하세요."
const fullDescription =
  "자취 밥상 스타일 테스트로 혼밥을 준비하는 방식, 배달앱을 쓰는 기준, 냉장고 정리 습관을 확인하세요. 12문항으로 16가지 자취생 식사 유형을 무료로 제공합니다."
const keywords =
  "자취 밥상 스타일 테스트, 자취생 테스트, 자취 밥상 테스트, 혼밥 테스트, 배달앱 테스트, 자취 요리 테스트, 무료 테스트"

export const metadata: Metadata = generateQuizMetadata({
  quizId: "jachui",
  title: quizTitle,
  shortDescription,
  fullDescription,
  keywords,
  canonical: "/tests/jachui",
  questionCount: 12,
  duration: "PT3M",
})

const faqs = [...getTopicQuizFAQs(quizTitle)]

const gscGuides = [
  {
    title: "자취생 테스트 검색",
    description: "혼밥을 직접 해 먹는지, 배달앱을 켜는지, 냉장고 재료를 어떻게 쓰는지 확인합니다.",
  },
  {
    title: "밥상 습관 분석",
    description: "요리, 배달, 장보기, 식사 시간, 정리 습관을 기준으로 자취 밥상 리듬을 나눕니다.",
  },
  {
    title: "혼밥 루틴 참고",
    description: "결과는 식습관 평가가 아니라 혼자 사는 생활에서 드러나는 선택 기준을 이해하기 위한 참고용입니다.",
  },
]

const questionCards = [
  ["1. 냉장고를 열었을 때", "재료가 정리되어 있다 vs 배달 쿠폰이 먼저 보인다"],
  ["2. 밥 먹기 전 고민은", "반찬 구성과 영양 vs 오늘 끌리는 맛과 기분"],
  ["3. 식사 시간은", "일정하게 맞춘다 vs 배고플 때 먹는다"],
  ["4. 배달앱을 켰을 때", "평점과 후기를 본다 vs 사진이 끌리는 메뉴를 고른다"],
  ["5. 친구가 집에 온다면", "직접 한상 차린다 vs 같이 배달을 고른다"],
  ["6. 남은 김치가 있다면", "김치볶음밥을 만든다 vs 컵라면에 곁들인다"],
]

const typeCards = [
  ["즉흥 요리러", "ENFP"],
  ["감성 혼밥러", "INFP"],
  ["공유밥상 리더", "ENFJ"],
  ["철학적 미식가", "INFJ"],
  ["창의 조리왕", "ENTP"],
  ["레시피 분석러", "INTP"],
  ["식단 관리자", "ENTJ"],
  ["효율 요리 설계자", "INTJ"],
]

const featureCards = [
  ["정확한 분석", "12문항으로 자취 밥상 습관을 4축으로 나눠 유형화합니다."],
  ["맞춤 추천", "유형에 맞는 메뉴 선택과 장보기 루틴 팁을 제공합니다."],
  ["쉬운 공유", "결과를 친구들과 공유하고 자취 밥상 스타일을 비교할 수 있습니다."],
]

export default function JachuiIntro() {
  const schemas = generateQuizSchemas({
    quizId: "jachui",
    title: quizTitle,
    shortDescription,
    fullDescription,
    keywords,
    canonical: "/tests/jachui",
    questionCount: 12,
    duration: "PT3M",
    faqs,
  })

  return (
    <>
      <JsonLd id="jachui-quiz-schema" data={schemas.quiz} />
      <JsonLd id="jachui-breadcrumb-schema" data={schemas.breadcrumb} />
      {schemas.faq && <JsonLd id="jachui-faq-schema" data={schemas.faq} />}

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-orange-950 dark:via-amber-950 dark:to-yellow-950">
        <main className="container mx-auto max-w-4xl px-4 py-8">
          <section className="space-y-8 text-center">
            <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-orange-200 to-amber-300 shadow-lg">
              <ChefHat className="h-14 w-14 text-orange-900" aria-hidden="true" />
            </div>
            <div className="space-y-6">
              <Badge variant="secondary" className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">NEW 테스트</Badge>
              <h1 className="text-4xl font-bold leading-tight md:text-6xl">
                <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">자취 밥상으로 보는</span>
                <br />
                <span className="text-foreground">나의 식사 루틴 유형</span>
              </h1>
              <p className="mx-auto max-w-2xl text-xl leading-relaxed text-slate-700 dark:text-slate-200 md:text-2xl">
                요리, 배달, 냉장고 정리, 혼밥 기준까지 자취 생활의 밥상 습관을 12문항으로 확인합니다.
              </p>
              <div className="flex items-center justify-center gap-6 text-sm text-slate-700 dark:text-slate-200">
                <span className="flex items-center gap-2"><Users className="h-4 w-4" />10,746명 참여</span>
                <span className="flex items-center gap-2"><Clock className="h-4 w-4" />3분 소요</span>
                <span>12문항</span>
              </div>
              <Button size="lg" className="h-16 px-12 text-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600" asChild>
                <Link href="/tests/jachui/test">테스트 시작하기</Link>
              </Button>
            </div>
          </section>

          <section className="mt-20 space-y-12" aria-label="테스트 소개">
            <Card className="border-0 bg-white/80 shadow-xl backdrop-blur">
              <CardContent className="p-8">
                <h2 className="mb-6 flex items-center justify-center gap-2 text-2xl font-bold">
                  <ChefHat className="h-6 w-6 text-orange-500" /> 이런 질문들이 있어요
                </h2>
                <div className="grid grid-cols-1 gap-4 text-left md:grid-cols-2">
                  {questionCards.map(([title, description], index) => (
                    <div key={title} className={`rounded-lg p-4 ${index % 2 === 0 ? "bg-orange-50 dark:bg-orange-950" : "bg-amber-50 dark:bg-amber-950"}`}>
                      <p className="font-medium">{title}</p>
                      <p className="mt-1 text-sm text-slate-700 dark:text-slate-200">{description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/80 shadow-xl backdrop-blur">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold">16가지 자취 밥상 유형</h2>
                <p className="mt-2 text-slate-700 dark:text-slate-200">당신은 어떤 자취 식사 스타일일까요?</p>
                <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                  {typeCards.map(([name, type]) => (
                    <div key={type} className="rounded-lg bg-gradient-to-br from-orange-50 to-amber-50 p-3 text-center dark:from-orange-950 dark:to-amber-950">
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
                  <Sparkles className="h-6 w-6 text-amber-500" /> 특별한 기능
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
              title="자취 밥상 스타일 테스트로 보는 혼밥 루틴"
              summary="자취 밥상 스타일 테스트는 자취생 테스트, 혼밥 테스트, 배달앱 테스트를 찾는 검색 의도에 맞춘 무료 성향 테스트입니다. 요리와 배달 선택, 냉장고 재료 활용, 식사 시간과 정리 습관을 바탕으로 16가지 자취 밥상 유형을 보여줍니다."
              guides={gscGuides}
              relatedLinks={[
                { href: "/tests/meal-solo", label: "혼밥 스타일 테스트" },
                { href: "/tests/cooking-style", label: "요리 스타일 테스트" },
                { href: "/tests/online-food", label: "배달 음식 선택 테스트" },
              ]}
              tone="orange"
            />
          </div>

          <div className="mt-12"><AnswerEngineSection quizTitle="Jachui Test" /></div>
          <div className="mt-12"><LandingConversionSection quizTitle="Jachui Test" /></div>
          <div className="mt-12"><RelatedTestsSection testId="jachui" /></div>
          <section className="mb-8 mt-12">
            <FAQSection faqs={faqs} title="자취 밥상 스타일 테스트 자주 묻는 질문" />
          </section>
        </main>
      </div>
    </>
  )
}
