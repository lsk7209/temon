import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "첫 데이트 긴장 테스트 진행 - 무료 성격 테스트 | 테몬",
  description:
    "첫 데이트 긴장 테스트를 시작하세요! 12문항으로 알아보는 첫 만남의 긴장 관리 패턴.",
  keywords: "첫 데이트, 데이트 긴장, 연애 MBTI, 성격 테스트, 무료 테스트",
  alternates: {
    canonical: "/tests/first-date-nerves/test",
  },
  openGraph: {
    title: "첫 데이트 긴장 테스트 진행 - 무료 성격 테스트",
    description: "첫 데이트 긴장 테스트! 12문항으로 알아보는 데이트 캐릭터.",
    type: "website",
    url: "https://temon.kr/tests/first-date-nerves/test",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function TestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
