import { MBTIResultPage } from "@/components/mbti-result-page"
import { BREAKUP_STYLE_RESULTS } from "@/lib/data/breakup-style-results"

export default function BreakupStyleResultPage() {
  return <MBTIResultPage testId="breakup-style" title="이별 후유증 유형" results={BREAKUP_STYLE_RESULTS} accentClass="text-rose-600"  gradientClass="from-rose-50 to-pink-100" />
}
