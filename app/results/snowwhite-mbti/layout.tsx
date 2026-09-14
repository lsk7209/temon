import type { Metadata } from "next"
import type { ReactNode } from "react"
import { generateGenericResultMetadata } from "@/lib/quiz-seo-utils"

export const metadata: Metadata = generateGenericResultMetadata({
  quizTitle: "백설공주 에겐테토 테스트",
  title: "나와 닮은 동화 캐릭터",
  description:
    "나와 닮은 백설공주 동화 캐릭터 유형을 확인하고, 성격 요약과 일상 특징, 성장 팁, 유형별 궁합을 살펴보세요.",
  canonical: "/results/snowwhite-mbti",
})

export default function SnowWhiteResultLayout({ children }: { children: ReactNode }) {
  return children
}
