import type { Metadata } from "next"
import type { ReactNode } from "react"
import { generateGenericResultMetadata } from "@/lib/quiz-seo-utils"

export const metadata: Metadata = generateGenericResultMetadata({
  quizTitle: "공부 MBTI 테스트",
  title: "공부 스타일과 추천 공부법",
  description:
    "나의 공부 스타일과 학습 습관을 확인하고, 집중력과 기억 유지에 도움이 되는 추천 공부법과 유형별 궁합을 살펴보세요.",
  canonical: "/results/study-mbti",
})

export default function StudyResultLayout({ children }: { children: ReactNode }) {
  return children
}
