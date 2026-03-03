import { MbtiResultPage } from "@/components/quiz/mbti-result-page"
import { INVESTMENT_STYLE_RESULTS } from "@/lib/data/investment-style-results"

export default function InvestmentStyleResultPage() {
  return (
    <MbtiResultPage
      testId="investment-style"
      title="투자 스타일 테스트"
      results={INVESTMENT_STYLE_RESULTS}
      gradientClass="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950 dark:to-green-950"
    />
  )
}
