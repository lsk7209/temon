import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "퇴근 후 회복 방식 테스트 결과 - 나의 저녁 캐릭터 | 테몬",
  description:
    "퇴근 후 회복 방식 테스트 결과! 저녁 시간이 드러내는 16유형 중 나의 캐릭터와 맞춤 회복 팁을 확인해보세요.",
  keywords: "퇴근 후 회복 결과, 저녁 루틴 유형, 직장인 MBTI 결과, 성격 테스트",
  alternates: {
    canonical: "/tests/worknight-recovery/test/result",
  },
  openGraph: {
    title: "퇴근 후 회복 방식 테스트 결과 - 나의 저녁 캐릭터",
    description: "저녁 시간이 드러내는 나의 회복 유형을 확인해보세요.",
    type: "website",
    url: "https://temon.kr/tests/worknight-recovery/test/result",
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
