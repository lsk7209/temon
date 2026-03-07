"use client"

import { MbtiResultPage } from "@/components/quiz/mbti-result-page"
import { HOTEL_BREAKFAST_RESULTS } from "@/lib/data/hotel-breakfast-results"

export default function HotelBreakfastResultPage() {
  return (
    <MbtiResultPage
      testId="hotel-breakfast"
      testPath="/tests/hotel-breakfast/test"
      results={HOTEL_BREAKFAST_RESULTS}
      theme={{
        page: "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950",
        accent: "from-amber-500 to-orange-500",
        spinner: "border-amber-600",
      }}
    />
  )
}
