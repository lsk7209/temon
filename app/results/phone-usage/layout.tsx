import type { Metadata } from "next"
import type { ReactNode } from "react"
import { generateGenericResultMetadata } from "@/lib/quiz-seo-utils"

export const metadata: Metadata = generateGenericResultMetadata({
  quizTitle: "스마트폰 사용 스타일 테스트",
  title: "스마트폰 사용 습관과 관리 팁",
  description:
    "스마트폰 사용 습관과 특징을 확인하고, 나에게 맞는 설정 방법과 과도한 사용을 줄이는 관리 팁을 살펴보세요.",
  canonical: "/results/phone-usage",
})

export default function PhoneUsageResultLayout({ children }: { children: ReactNode }) {
  return children
}
