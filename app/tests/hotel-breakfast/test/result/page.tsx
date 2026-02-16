"use client"

import { MbtiResultTemplate } from "@/components/quiz/mbti-result-template"
import { HOTEL_BREAKFAST_RESULTS } from "@/lib/data/hotel-breakfast-results"

export default function HotelBreakfastResultPage() {
  return (
    <MbtiResultTemplate
      testId="hotel-breakfast"
      testPath="/tests/hotel-breakfast/test"
      heading="호텔 조식"
      gradientClass="bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-950 dark:to-amber-950"
      badgeGradientClass="bg-gradient-to-r from-orange-600 to-amber-700"
      spinnerBorderClass="border-orange-600"
      results={HOTEL_BREAKFAST_RESULTS}
      shareTitleBuilder={(result) => `내 호텔 조식 스타일은 '${result.name}(${result.mbti})' 타입`}
      presetsTitle="조식 공략 포인트"
    />
  )
}
