import { TestIntro } from "@/components/test-intro"

export default function SubscriptionManagementStyleIntro() {
  return (
    <TestIntro
      id="subscription-management-style"
      title="💳 구독 서비스 관리 성향 테스트"
      description="구독 유지/해지 패턴으로 보는 관리 성향"
      questionCount={12}
      avgMinutes={3}
      resultCount={16}
      theme="purple"
    />
  )
}
