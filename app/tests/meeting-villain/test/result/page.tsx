import { MBTIResultPage } from "@/components/mbti-result-page"
import { MEETING_VILLAIN_RESULTS } from "@/lib/data/meeting-villain-results"

export default function MeetingVillainResultPage() {
  return <MBTIResultPage testId="meeting-villain" title="회의 빌런 유형" results={MEETING_VILLAIN_RESULTS} accentClass="text-slate-600"  gradientClass="from-slate-50 to-zinc-100" />
}
