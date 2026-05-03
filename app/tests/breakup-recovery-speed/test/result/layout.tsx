import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이별 회복 속도 테스트 결과 - 나의 회복 캐릭터 | 테몬",
  description: "이별 회복 속도 테스트 결과! 16유형 중 나의 회복 캐릭터를 확인해보세요.",
  keywords: "이별 회복, 연애 MBTI, 이별 후유증, 헤어짐 테스트, 성격 테스트, 무료 테스트",
  alternates: { canonical: "/tests/breakup-recovery-speed/test/result" },
  openGraph: {
    title: "이별 회복 속도 테스트 결과",
    description: "이별 후 회복 패턴으로 알아보는 16가지 연애 회복 유형",
    type: "website",
    url: "https://temon.kr/tests/breakup-recovery-speed/test/result",
  },
  robots: { index: false, follow: true },
};

export default function ResultLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
