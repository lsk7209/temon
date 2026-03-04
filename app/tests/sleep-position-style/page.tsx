import { TestIntro } from "@/components/test-intro"

export default function SleepPositionStyleIntro() {
  return (
    <TestIntro
      id="sleep-position-style"
      title="😴 잠버릇 자세 성향 테스트"
      description="잠드는 자세와 뒤척임 습관으로 알아보는 나의 수면 성향"
      questionCount={12}
      avgMinutes={3}
      resultCount={16}
      theme="blue"
    />
  )
}
