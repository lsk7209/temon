import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "업무 에너지 테스트 진행 - 무료 성격 테스트 | 테몬",
  description:
    "업무 에너지 테스트를 시작하세요! 12문항으로 알아보는 일터에서의 에너지 사용·회복 패턴.",
  keywords:
    "업무 에너지, 일터 MBTI, 직장인 테스트, 성격 테스트, 무료 테스트",
  alternates: {
    canonical: "/tests/workday-energy/test",
  },
  openGraph: {
    title: "업무 에너지 테스트 진행 - 무료 성격 테스트",
    description: "업무 에너지 테스트! 12문항으로 알아보는 직장 캐릭터.",
    type: "website",
    url: "https://temon.kr/tests/workday-energy/test",
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
