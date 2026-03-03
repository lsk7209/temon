import { MbtiResultPage } from "@/components/quiz/mbti-result-page"
import { buildGenericMbtiResults } from "@/lib/utils/mbti-generic-results"

const SPICE_TOLERANCE_RESULTS = buildGenericMbtiResults("매운맛 선호")

export default function SpiceToleranceResultPage() {
  return (
    <MbtiResultPage
      testId="spice-tolerance"
      title="매운맛 선호도 테스트"
      results={SPICE_TOLERANCE_RESULTS}
      gradientClass="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950"
    />
  )
}
