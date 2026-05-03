import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "부모와 소통 방식 테스트 결과 - 나의 가족 캐릭터 | 테몬",
  description: "부모와 소통 방식 테스트 결과! 16유형 중 나의 가족 캐릭터를 확인해보세요.",
  keywords: "부모 소통, 가족 관계 MBTI, 부모자식 테스트, 성격 테스트, 무료 테스트",
  alternates: { canonical: "/tests/parent-comm-style/test/result" },
  openGraph: {
    title: "부모와 소통 방식 테스트 결과",
    description: "부모님과 소통 방식으로 알아보는 16가지 가족 관계 유형",
    type: "website",
    url: "https://temon.kr/tests/parent-comm-style/test/result",
  },
  robots: { index: false, follow: true },
};

export default function ResultLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
