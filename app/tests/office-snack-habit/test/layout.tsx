import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "사무실 간식 습관 테스트 진행 - 무료 성격 테스트 | 테몬",
  description:
    "사무실 간식 습관 테스트를 시작하세요! 12문항으로 알아보는 직장 성격 유형.",
  keywords:
    "사무실 간식, 직장인 테스트, 간식 성격, 성격 테스트, 무료 테스트",
  alternates: {
    canonical: "/tests/office-snack-habit/test",
  },
  openGraph: {
    title: "사무실 간식 습관 테스트 진행 - 무료 성격 테스트",
    description: "사무실 간식 습관 테스트! 12문항으로 알아보는 직장 캐릭터.",
    type: "website",
    url: "https://temon.kr/tests/office-snack-habit/test",
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
