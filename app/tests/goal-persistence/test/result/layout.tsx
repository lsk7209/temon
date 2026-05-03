import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "목표 지속력 테스트 결과 - 나의 자기계발 캐릭터 | 테몬",
  description: "목표 지속력 테스트 결과! 16유형 중 나의 자기계발 캐릭터를 확인해보세요.",
  keywords: "목표 지속력, 자기계발 MBTI, 동기부여 테스트, 성격 테스트, 무료 테스트",
  alternates: { canonical: "/tests/goal-persistence/test/result" },
  openGraph: { title: "목표 지속력 테스트 결과", description: "목표 추진력과 지속력으로 알아보는 16가지 자기계발 유형", type: "website",
    url: "https://temon.kr/tests/goal-persistence/test/result" },
  robots: { index: false, follow: true },
};
export default function ResultLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
