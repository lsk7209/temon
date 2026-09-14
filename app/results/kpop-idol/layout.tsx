import type { Metadata } from "next"
import type { ReactNode } from "react"
import { generateGenericResultMetadata } from "@/lib/quiz-seo-utils"

export const metadata: Metadata = generateGenericResultMetadata({
  quizTitle: "아이돌 포지션 테스트",
  title: "K-팝 아이돌 포지션",
  description:
    "나에게 어울리는 K-POP 아이돌 포지션을 확인하고, 무대 성향과 강점, 멤버 궁합, 이미지 활용 팁을 살펴보세요.",
  canonical: "/results/kpop-idol",
})

export default function KPopIdolResultLayout({ children }: { children: ReactNode }) {
  return children
}
