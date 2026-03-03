import { TestIntro } from "@/components/test-intro"

export default function EmailReplyStyleIntro() {
  return (
    <TestIntro
      id="email-reply-style"
      title="📧 이메일 답장 스타일 테스트"
      description="메일 답장 습관으로 알아보는 업무 커뮤니케이션 성향"
      questionCount={12}
      avgMinutes={3}
      resultCount={16}
      theme="purple"
    />
  )
}
