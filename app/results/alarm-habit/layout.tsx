import type { Metadata } from "next"
import type { ReactNode } from "react"
import { generateGenericResultMetadata } from "@/lib/quiz-seo-utils"

export const metadata: Metadata = generateGenericResultMetadata({
  quizTitle: "알람 습관 MBTI 테스트",
  title: "아침 알람 습관",
  description:
    "아침 알람을 끄고 일어나는 습관과 기상 패턴을 확인하고, 하루를 더 규칙적으로 시작하는 데 도움이 되는 실용적인 팁을 살펴보세요.",
  canonical: "/results/alarm-habit",
})

export default function AlarmHabitResultLayout({ children }: { children: ReactNode }) {
  return children
}
