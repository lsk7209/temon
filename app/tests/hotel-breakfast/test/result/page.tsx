import { MBTIResultPage } from "@/components/mbti-result-page"
import { HOTEL_BREAKFAST_RESULTS } from "@/lib/data/hotel-breakfast-results"

export default function HotelBreakfastResultPage() {
  return <MBTIResultPage testId="hotel-breakfast" title="호텔 조식 공략법" results={HOTEL_BREAKFAST_RESULTS} accentClass="text-orange-600" />
}
