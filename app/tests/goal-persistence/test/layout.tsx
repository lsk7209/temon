import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "목표 지속력 테스트 진행 - 무료 성격 테스트 | 테몬",
  description: "목표 지속력 테스트를 시작하세요! 12문항으로 알아보는 자기계발 캐릭터.",
  keywords: "목표 지속력, 자기계발 MBTI, 동기부여 테스트, 성격 테스트, 무료 테스트",
  alternates: { canonical: "/tests/goal-persistence/test" },
  openGraph: {
    title: "목표 지속력 테스트 진행", description: "12문항으로 알아보는 자기계발 캐릭터.",
    type: "website", url: "https://temon.kr/tests/goal-persistence/test",
  },
  robots: { index: false, follow: true },
};
export default function TestLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
