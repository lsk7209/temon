import type { Metadata } from "next"
import { JsonLd } from "@/components/json-ld"
import { FAQSection } from "@/components/faq-section"
import { generateQuizMetadata, generateQuizSchemas, getDefaultQuizFAQs } from "@/lib/quiz-seo-utils"
import KpopClient from "./kpop-client"

// Naver-optimized description (under 80 chars)
const shortDescription = "K-팝 아이돌 포지션 테스트. 아이돌 그룹에서 내 포지션은?"
// Full description for Google/AI
const fullDescription = "K-팝 아이돌 포지션 테스트로 알아보는 나의 포지션! 카리스마 리더부터 4차원 막내까지, 아이돌 그룹에서 당신은 어떤 포지션일까요? 8개의 아이돌 상황에서 당신의 선택으로 포지션을 찾아보세요. 재미있는 K-팝 테스트를 지금 시작해보세요."

export const metadata: Metadata = generateQuizMetadata({
  quizId: "kpop-idol",
  title: "K-팝 아이돌 포지션 테스트",
  shortDescription,
  fullDescription,
  keywords: "K-팝, 아이돌 테스트, 포지션 테스트, 리더, 메인보컬, 성격 테스트, MBTI, 심리테스트, 무료 테스트",
  canonical: "/kpop-idol",
  questionCount: 8,
  duration: "PT2M",
})

const faqs = [
  ...getDefaultQuizFAQs("K-팝 아이돌 포지션 테스트"),
  {
    question: "K-팝을 잘 모르는데 테스트할 수 있나요?",
    answer: "네, 가능합니다. 테스트는 일반적인 팀 상황에서의 선택을 바탕으로 하므로, K-팝을 잘 모르시더라도 솔직하게 답변하시면 됩니다.",
  },
  {
    question: "어떤 포지션 유형들이 나오나요?",
    answer: "리더, 메인보컬, 메인댄서, 비주얼, 막내 등 다양한 아이돌 포지션 유형이 있습니다. 각 유형은 MBTI 16가지 성격 유형과 매칭되어 있어요.",
  },
]

export default function KpopIdolIntro() {
  const schemas = generateQuizSchemas({
    quizId: "kpop-idol",
    title: "K-팝 아이돌 포지션 테스트",
    shortDescription,
    fullDescription,
    keywords: "K-팝, 아이돌 테스트",
    canonical: "/kpop-idol",
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

      <article>
        <KpopClient />
        
        {/* FAQ Section for AI Bot Optimization */}
        <section className="container mx-auto px-4 py-12 max-w-2xl">
          <FAQSection faqs={faqs} title="K-팝 아이돌 포지션 테스트 자주 묻는 질문" />
        </section>
      </article>
    </>
  )
}
