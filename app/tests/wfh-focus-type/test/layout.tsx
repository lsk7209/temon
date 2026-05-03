import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "재택근무 집중 유형 테스트 진행 - 무료 성격 테스트 | 테몬",
  description:
    "재택근무 집중 유형 테스트를 시작하세요! 12문항으로 알아보는 원격 업무 성격 유형.",
  keywords:
    "재택근무, 원격근무 테스트, WFH 성격, 성격 테스트, 무료 테스트",
  alternates: {
    canonical: "/tests/wfh-focus-type/test",
  },
  openGraph: {
    title: "재택근무 집중 유형 테스트 진행 - 무료 성격 테스트",
    description: "재택근무 집중 유형 테스트! 12문항으로 알아보는 재택 캐릭터.",
    type: "website",
    url: "https://temon.kr/tests/wfh-focus-type/test",
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
