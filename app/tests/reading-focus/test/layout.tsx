import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "독서 집중도 유형 테스트 진행 - 무료 성격 테스트 | 테몬",
  description: "독서 집중도 유형 테스트를 시작하세요! 12문항으로 알아보는 독서 캐릭터.",
  keywords: "독서 집중, 독서 MBTI, 책 읽기 테스트, 자기계발, 성격 테스트, 무료 테스트",
  alternates: { canonical: "/tests/reading-focus/test" },
  openGraph: {
    title: "독서 집중도 유형 테스트 진행", description: "12문항으로 알아보는 독서 캐릭터.",
    type: "website", url: "https://temon.kr/tests/reading-focus/test",
  },
  robots: { index: false, follow: true },
};
export default function TestLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
