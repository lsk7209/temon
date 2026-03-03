import { MbtiResultPage } from "@/components/quiz/mbti-result-page"
import { MEETING_VILLAIN_RESULTS } from "@/lib/data/meeting-villain-results"

export default function MeetingVillainResultPage() {
  return (
    <MbtiResultPage
      testId="meeting-villain"
      title="회의 빌런 테스트"
      results={MEETING_VILLAIN_RESULTS}
      gradientClass="bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-950 dark:to-gray-900"
    />
  )
}
