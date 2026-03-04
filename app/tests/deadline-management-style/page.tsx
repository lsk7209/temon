import { TestIntro } from "@/components/test-intro"

export default function DeadlineManagementStyleIntro() {
  return (
    <TestIntro
      id="deadline-management-style"
      title="⏰ 마감 관리 성향 테스트"
      description="마감 압박 대응으로 알아보는 실행 성향"
      questionCount={12}
      avgMinutes={3}
      resultCount={16}
      theme="green"
    />
  )
}
