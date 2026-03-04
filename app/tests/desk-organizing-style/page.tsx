import { TestIntro } from "@/components/test-intro"

export default function DeskOrganizingStyleIntro() {
  return (
    <TestIntro
      id="desk-organizing-style"
      title="🗂️ 책상 정리 성향 테스트"
      description="책상 배치 습관으로 보는 나의 생산성 성향"
      questionCount={12}
      avgMinutes={3}
      resultCount={16}
      theme="green"
    />
  )
}
