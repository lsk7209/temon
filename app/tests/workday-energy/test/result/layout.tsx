import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "업무 에너지 테스트 결과 - 나의 직장 캐릭터 | 테몬",
  description:
    "업무 에너지 테스트 결과! 일터에서 드러나는 16유형 중 당신의 캐릭터와 찰떡인 협업 스타일을 확인해보세요.",
  keywords: "업무 에너지 결과, 일터 성격, MBTI 결과, 직장인 테스트 결과",
  alternates: {
    canonical: "/tests/workday-energy/test/result",
  },
  openGraph: {
    title: "업무 에너지 테스트 결과 - 나의 직장 캐릭터",
    description: "일터에서 드러나는 나의 에너지 사용 유형을 확인해보세요.",
    type: "website",
    url: "https://temon.kr/tests/workday-energy/test/result",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function ResultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
