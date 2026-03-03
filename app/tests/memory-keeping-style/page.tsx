import { TestIntro } from "@/components/test-intro"

export default function MemoryKeepingStyleIntro() {
  return (
    <TestIntro
      id="memory-keeping-style"
      title="📸 추억 보관 스타일 테스트"
      description="기록 습관으로 알아보는 감정/정리 성향"
      questionCount={12}
      avgMinutes={3}
      resultCount={16}
      theme="pink"
    />
  )
}
