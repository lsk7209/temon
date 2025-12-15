import type { Metadata } from "next"
import { JsonLd } from "@/components/json-ld"
import { FAQSection } from "@/components/faq-section"
import { generateQuizMetadata, generateQuizSchemas, getDefaultQuizFAQs } from "@/lib/quiz-seo-utils"
import KDramaClient from "./kdrama-client"

// Naver-optimized description (under 80 chars)
const shortDescription = "K-드라마 클리셰로 알아보는 캐릭터 테스트. 나는 어떤 드라마 주인공?"
// Full description for Google/AI
const fullDescription = "K-드라마 클리셰 테스트로 알아보는 나의 드라마 캐릭터! 재벌남/여부터 국밥 조연까지, 10개의 드라마 클리셰 상황에서 당신의 선택은? 눈물 쏙 빼는 멜로부터 웃긴 로코까지, 당신의 드라마 캐릭터 유형을 찾아보세요. 재미있는 K-드라마 테스트를 지금 시작해보세요."

export const metadata: Metadata = generateQuizMetadata({
  quizId: "kdrama-mbti",
  title: "K-드라마 클리셰 테스트",
  shortDescription,
  fullDescription,
  keywords: "K-드라마, 드라마 테스트, 캐릭터 테스트, 클리셰, 성격 테스트, MBTI, 심리테스트, 무료 테스트",
  canonical: "/kdrama-mbti",
  questionCount: 10,
  duration: "PT2M",
})

const faqs = [
  ...getDefaultQuizFAQs("K-드라마 클리셰 테스트"),
  {
    question: "드라마를 잘 모르는데 테스트할 수 있나요?",
    answer: "네, 가능합니다. 테스트는 일반적인 상황에서의 선택을 바탕으로 하므로, 드라마를 잘 모르시더라도 솔직하게 답변하시면 됩니다.",
  },
  {
    question: "어떤 드라마 캐릭터 유형들이 나오나요?",
    answer: "재벌남/여, 국밥 조연, 순정 멜로 주인공, 코믹 로코 캐릭터 등 다양한 드라마 클리셰 유형이 있습니다. 각 유형은 MBTI 16가지 성격 유형과 매칭되어 있어요.",
  },
]

export default function KDramaMBTIIntro() {
  const schemas = generateQuizSchemas({
    quizId: "kdrama-mbti",
    title: "K-드라마 클리셰 테스트",
    shortDescription,
    fullDescription,
    keywords: "K-드라마, 드라마 테스트",
    canonical: "/kdrama-mbti",
    questionCount: 10,
    duration: "PT2M",
    faqs,
  })

  return (
    <>
      {/* Structured Data for SEO/GEO */}
      <JsonLd id="kdrama-mbti-quiz-schema" data={schemas.quiz} />
      <JsonLd id="kdrama-mbti-breadcrumb-schema" data={schemas.breadcrumb} />
      {schemas.faq && <JsonLd id="kdrama-mbti-faq-schema" data={schemas.faq} />}

      <article>
        <KDramaClient />
        
        {/* FAQ Section for AI Bot Optimization */}
        <section className="container mx-auto px-4 py-12 max-w-2xl">
          <FAQSection faqs={faqs} title="K-드라마 클리셰 테스트 자주 묻는 질문" />
        </section>
      </article>
    </>
  )
}
