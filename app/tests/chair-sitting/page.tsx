import type { Metadata } from "next"
import Link from "next/link"
import { Armchair, Clock, Sparkles, Users } from "lucide-react"
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

const quizTitle = "의자 앉는 스타일 테스트"
const shortDescription = "의자 앉는 스타일 테스트로 자세형·편안형·자리선택형 성향을 16유형으로 확인하세요."
const fullDescription =
  "의자 앉는 스타일 테스트로 자리를 고르는 기준, 앉는 자세, 오래 앉을 때의 습관을 확인하세요. 12문항으로 16가지 앉는 방식 성향을 무료로 제공합니다."
const keywords =
  "의자 앉는 스타일 테스트, 의자 테스트, 앉는 자세 테스트, 자리 선택 테스트, 앉는 방식 테스트, 성향 테스트, 무료 테스트"

export const metadata: Metadata = generateQuizMetadata({
  quizId: "chair-sitting",
  title: quizTitle,
  shortDescription,
  fullDescription,
  keywords,
  canonical: "/tests/chair-sitting",
  questionCount: 12,
  duration: "PT3M",
})

const faqs = [...getTopicQuizFAQs(quizTitle)]

const gscGuides = [
  {
    title: "의자 테스트 검색",
    description: "어떤 자리를 고르는지, 등받이를 쓰는지, 오래 앉을 때 자세가 어떻게 바뀌는지 확인합니다.",
  },
  {
    title: "앉는 자세 성향",
    description: "바른 자세, 편안함, 집중도, 주변 시야를 기준으로 앉는 방식의 우선순위를 나눕니다.",
  },
  {
    title: "자리 선택 참고",
    description: "결과는 자세 교정이 아니라 의자와 자리를 고를 때 드러나는 선택 습관을 이해하기 위한 참고용입니다.",
  },
]

const questionCards = [
  ["1. 의자를 고를 때", "등받이가 편한지 본다 vs 위치와 분위기를 먼저 본다"],
  ["2. 앉는 자세는", "똑바로 유지한다 vs 편한 자세로 자주 바꾼다"],
  ["3. 회의실 자리는", "앞쪽이나 중앙을 고른다 vs 가장 편한 가장자리를 고른다"],
  ["4. 오래 앉아 있을 때", "자세를 의식한다 vs 집중하면 자세를 잊는다"],
  ["5. 카페에서 앉을 때", "콘센트와 책상을 본다 vs 창가와 분위기를 본다"],
  ["6. 자리가 불편하면", "바로 옮긴다 vs 어느 정도 적응한다"],
]

const typeCards = [
  ["바른 자세형", "ESTJ"],
  ["편안 우선형", "ISFP"],
  ["집중 몰입형", "INTJ"],
  ["분위기 선택형", "ENFP"],
  ["시야 확보형", "ENTJ"],
  ["조용한 관찰형", "INFJ"],
  ["효율 자리형", "ISTJ"],
  ["자유 자세형", "ENTP"],
]

const featureCards = [
  ["정확한 분석", "12문항으로 앉는 자세와 자리 선택 습관을 유형화합니다."],
  ["맞춤 팁", "유형에 맞는 집중 자리와 휴식 방식 힌트를 제공합니다."],
  ["쉬운 공유", "결과를 친구들과 공유하고 앉는 스타일을 비교할 수 있습니다."],
]

export default function ChairSittingIntro() {
  const schemas = generateQuizSchemas({
    quizId: "chair-sitting",
    title: quizTitle,
    shortDescription,
    fullDescription,
    keywords,
    canonical: "/tests/chair-sitting",
    questionCount: 12,
    duration: "PT3M",
    faqs,
  })

  return (
    <>
      <JsonLd id="chair-sitting-quiz-schema" data={schemas.quiz} />
      <JsonLd id="chair-sitting-breadcrumb-schema" data={schemas.breadcrumb} />
      {schemas.faq && <JsonLd id="chair-sitting-faq-schema" data={schemas.faq} />}

      <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950">
        <main className="container mx-auto max-w-4xl px-4 py-8">
          <section className="space-y-8 text-center">
            <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-emerald-200 to-teal-300 shadow-lg">
              <Armchair className="h-14 w-14 text-emerald-900" aria-hidden="true" />
            </div>
            <div className="space-y-6">
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">NEW 테스트</Badge>
              <h1 className="text-4xl font-bold leading-tight md:text-6xl">
                <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">의자 앉는 방식으로 보는</span>
                <br />
                <span className="text-foreground">나의 자리 선택 패턴</span>
              </h1>
              <p className="mx-auto max-w-2xl text-xl leading-relaxed text-slate-700 dark:text-slate-200 md:text-2xl">
                어떤 자리를 고르고, 어떤 자세로 앉고, 불편할 때 어떻게 반응하는지 12문항으로 확인합니다.
              </p>
              <div className="flex items-center justify-center gap-6 text-sm text-slate-700 dark:text-slate-200">
                <span className="flex items-center gap-2"><Users className="h-4 w-4" />11,074명 참여</span>
                <span className="flex items-center gap-2"><Clock className="h-4 w-4" />3분 소요</span>
                <span>12문항</span>
              </div>
              <Button size="lg" className="h-16 px-12 text-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600" asChild>
                <Link href="/tests/chair-sitting/test">테스트 시작하기</Link>
              </Button>
            </div>
          </section>

          <section className="mt-20 space-y-12" aria-label="테스트 소개">
            <Card className="border-0 bg-white/80 shadow-xl backdrop-blur">
              <CardContent className="p-8">
                <h2 className="mb-6 flex items-center justify-center gap-2 text-2xl font-bold">
                  <Armchair className="h-6 w-6 text-emerald-500" /> 이런 질문들이 있어요
                </h2>
                <div className="grid grid-cols-1 gap-4 text-left md:grid-cols-2">
                  {questionCards.map(([title, description], index) => (
                    <div key={title} className={`rounded-lg p-4 ${index % 2 === 0 ? "bg-emerald-50 dark:bg-emerald-950" : "bg-teal-50 dark:bg-teal-950"}`}>
                      <p className="font-medium">{title}</p>
                      <p className="mt-1 text-sm text-slate-700 dark:text-slate-200">{description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/80 shadow-xl backdrop-blur">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold">16가지 앉는 스타일</h2>
                <p className="mt-2 text-slate-700 dark:text-slate-200">당신은 어떤 자리 선택 타입일까요?</p>
                <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                  {typeCards.map(([name, type]) => (
                    <div key={type} className="rounded-lg bg-gradient-to-br from-emerald-50 to-teal-50 p-3 text-center dark:from-emerald-950 dark:to-teal-950">
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
                  <Sparkles className="h-6 w-6 text-teal-500" /> 특별한 기능
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
              title="의자 앉는 스타일 테스트로 보는 자리 선택"
              summary="의자 앉는 스타일 테스트는 의자 테스트, 앉는 자세 테스트, 자리 선택 테스트를 찾는 검색 의도에 맞춘 무료 성향 테스트입니다. 자세, 자리 위치, 편안함과 집중 기준을 바탕으로 16가지 앉는 방식 유형을 보여줍니다."
              guides={gscGuides}
              relatedLinks={[
                { href: "/tests/desk-organization", label: "책상 정리 테스트" },
                { href: "/tests/study-mbti", label: "공부 스타일 테스트" },
                { href: "/tests/commute-style", label: "출근길 스타일 테스트" },
              ]}
              tone="green"
            />
          </div>

          <div className="mt-12"><AnswerEngineSection quizTitle="Chair Sitting Test" /></div>
          <div className="mt-12"><LandingConversionSection quizTitle="Chair Sitting Test" /></div>
          <div className="mt-12"><RelatedTestsSection testId="chair-sitting" /></div>
          <section className="mb-8 mt-12">
            <FAQSection faqs={faqs} title="의자 앉는 스타일 테스트 자주 묻는 질문" />
          </section>
        </main>
      </div>
    </>
  )
}
