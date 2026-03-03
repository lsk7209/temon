import { MbtiResultPage } from "@/components/quiz/mbti-result-page"
import { ZOMBIE_SURVIVAL_RESULTS } from "@/lib/data/zombie-survival-results"

export default function ZombieSurvivalResultPage() {
  return (
    <MbtiResultPage
      testId="zombie-survival"
      title="좀비 아포칼립스 생존 테스트"
      results={ZOMBIE_SURVIVAL_RESULTS}
      gradientClass="bg-gradient-to-br from-red-50 to-zinc-100 dark:from-red-950 dark:to-zinc-900"
    />
  )
}
