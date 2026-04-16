import type { Metadata } from "next"
import type { ReactNode } from "react"
import { generateGenericResultMetadata } from "@/lib/quiz-seo-utils"

export const metadata: Metadata = generateGenericResultMetadata({
  quizTitle: "Alarm Habit Test",
  title: "Morning Alarm Habit Result",
  description:
    "See your morning alarm habit result, typical wake-up pattern, and practical tips for building a more consistent start to the day.",
  canonical: "/tests/alarm-habit/test/result",
})

export default function AlarmHabitResultLayout({ children }: { children: ReactNode }) {
  return children
}
