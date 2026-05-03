import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "부모와 소통 방식 테스트 진행 - 무료 성격 테스트 | 테몬",
  description: "부모와 소통 방식 테스트를 시작하세요! 12문항으로 알아보는 가족 캐릭터.",
  keywords: "부모 소통, 가족 관계 MBTI, 부모자식 테스트, 성격 테스트, 무료 테스트",
  alternates: { canonical: "/tests/parent-comm-style/test" },
  openGraph: {
    title: "부모와 소통 방식 테스트 진행",
    description: "12문항으로 알아보는 가족 캐릭터.",
    type: "website",
    url: "https://temon.kr/tests/parent-comm-style/test",
  },
  robots: { index: false, follow: true },
};

export default function TestLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
