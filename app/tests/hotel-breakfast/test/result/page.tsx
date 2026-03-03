import { MbtiResultPage } from "@/components/quiz/mbti-result-page"
import { HOTEL_BREAKFAST_RESULTS } from "@/lib/data/hotel-breakfast-results"

export default function HotelBreakfastResultPage() {
  return (
    <MbtiResultPage
      testId="hotel-breakfast"
      title="호텔 조식 선택 스타일 테스트"
      results={HOTEL_BREAKFAST_RESULTS}
      gradientClass="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950"
    />
  )
}
