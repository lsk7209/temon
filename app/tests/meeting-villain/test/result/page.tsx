"use client"

import { MbtiResultPage } from "@/components/quiz/mbti-result-page"
import { MEETING_VILLAIN_RESULTS } from "@/lib/data/meeting-villain-results"

export default function MeetingVillainResultPage() {
  return (
    <MbtiResultPage
      testId="meeting-villain"
      testPath="/tests/meeting-villain/test"
      results={MEETING_VILLAIN_RESULTS}
      theme={{
        page: "bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-950 dark:to-gray-950",
        accent: "from-slate-500 to-gray-600",
        spinner: "border-slate-600",
      }}
    />
  )
}
