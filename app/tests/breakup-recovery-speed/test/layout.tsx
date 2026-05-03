import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이별 회복 속도 테스트 진행 - 무료 성격 테스트 | 테몬",
  description: "이별 회복 속도 테스트를 시작하세요! 12문항으로 알아보는 회복 캐릭터.",
  keywords: "이별 회복, 연애 MBTI, 이별 후유증, 헤어짐 테스트, 성격 테스트, 무료 테스트",
  alternates: { canonical: "/tests/breakup-recovery-speed/test" },
  openGraph: {
    title: "이별 회복 속도 테스트 진행",
    description: "12문항으로 알아보는 회복 캐릭터.",
    type: "website",
    url: "https://temon.kr/tests/breakup-recovery-speed/test",
  },
  robots: { index: false, follow: true },
};

export default function TestLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
