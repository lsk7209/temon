import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "퇴근 후 회복 방식 테스트 진행 - 무료 성격 테스트 | 테몬",
  description:
    "퇴근 후 회복 방식 테스트를 시작하세요! 12문항으로 알아보는 나만의 저녁 유형.",
  keywords:
    "퇴근 후 회복, 저녁 루틴, 직장인 테스트, 성격 테스트, 무료 테스트",
  alternates: {
    canonical: "/tests/worknight-recovery/test",
  },
  openGraph: {
    title: "퇴근 후 회복 방식 테스트 진행 - 무료 성격 테스트",
    description: "퇴근 후 회복 방식 테스트! 12문항으로 알아보는 저녁 캐릭터.",
    type: "website",
    url: "https://temon.kr/tests/worknight-recovery/test",
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
