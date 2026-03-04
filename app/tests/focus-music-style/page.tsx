import { TestIntro } from "@/components/test-intro"

export default function FocusMusicStyleIntro() {
  return (
    <TestIntro
      id="focus-music-style"
      title="🎧 집중 음악 취향 테스트"
      description="집중할 때 듣는 사운드로 보는 몰입 성향"
      questionCount={12}
      avgMinutes={3}
      resultCount={16}
      theme="blue"
    />
  )
}
