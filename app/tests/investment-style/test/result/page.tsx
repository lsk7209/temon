import { MBTIResultPage } from "@/components/mbti-result-page"
import { INVESTMENT_STYLE_RESULTS } from "@/lib/data/investment-style-results"

export default function InvestmentStyleResultPage() {
  return <MBTIResultPage testId="investment-style" title="주식 투자 스타일" results={INVESTMENT_STYLE_RESULTS} accentClass="text-green-600" />
}
