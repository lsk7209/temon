import type { Metadata } from "next"
import type { ReactNode } from "react"
import { generateGenericResultMetadata } from "@/lib/quiz-seo-utils"

export const metadata: Metadata = generateGenericResultMetadata({
  quizTitle: "NTRP 테니스 실력 테스트",
  title: "나의 NTRP 레벨 확인",
  description:
    "15개 질문으로 나의 테니스 실력을 자기평가하고, NTRP 참고 레벨과 레벨별 훈련 가이드를 확인하세요. 공식 USTA 등급이 아닌 자기보고식 참고 결과입니다.",
  canonical: "/results/ntrp-test",
})

export default function NtrpTestResultLayout({ children }: { children: ReactNode }) {
  return children
}
