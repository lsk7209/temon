import { MBTIResultPage } from "@/components/mbti-result-page"
import { ZOMBIE_SURVIVAL_RESULTS } from "@/lib/data/zombie-survival-results"

export default function ZombieSurvivalResultPage() {
  return <MBTIResultPage testId="zombie-survival" title="좀비 아포칼립스 생존 유형" results={ZOMBIE_SURVIVAL_RESULTS} accentClass="text-red-600" />
}
