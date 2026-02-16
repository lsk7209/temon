"use client"

import { MbtiResultTemplate } from "@/components/quiz/mbti-result-template"
import { MEETING_VILLAIN_RESULTS } from "@/lib/data/meeting-villain-results"

export default function MeetingVillainResultPage() {
  return (
    <MbtiResultTemplate
      testId="meeting-villain"
      testPath="/tests/meeting-villain/test"
      heading="회의 빌런"
      gradientClass="bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-950 dark:to-gray-950"
      badgeGradientClass="bg-gradient-to-r from-slate-600 to-gray-700"
      spinnerBorderClass="border-slate-600"
      results={MEETING_VILLAIN_RESULTS}
      shareTitleBuilder={(result) => `내 회의 캐릭터는 '${result.name}(${result.mbti})' 타입`}
      presetsTitle="회의 행동 패턴"
    />
  )
}
