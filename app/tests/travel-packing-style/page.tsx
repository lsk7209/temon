import { TestIntro } from "@/components/test-intro"

export default function TravelPackingStyleIntro() {
  return (
    <TestIntro
      id="travel-packing-style"
      title="🧳 여행 짐싸기 스타일 테스트"
      description="짐싸기 방식으로 알아보는 여행 성향"
      questionCount={12}
      avgMinutes={3}
      resultCount={16}
      theme="pink"
    />
  )
}
