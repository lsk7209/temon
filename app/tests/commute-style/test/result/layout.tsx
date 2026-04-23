import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "출퇴근 스타일 테스트 결과 - 나의 통근 캐릭터 | 테몬",
  description:
    "출퇴근 스타일 테스트 결과! 출근길·퇴근길에서 드러나는 16가지 성격 유형 중 당신의 캐릭터와 찰떡인 통근 동료를 확인해보세요.",
  keywords: "출퇴근 테스트 결과, 통근 성격, MBTI 결과, 직장인 테스트 결과",
  alternates: {
    canonical: "/tests/commute-style/test/result",
  },
  openGraph: {
    title: "출퇴근 스타일 테스트 결과 - 나의 통근 캐릭터",
    description: "출퇴근길에서 드러나는 나의 성격 유형을 확인해보세요.",
    type: "website",
    url: "https://temon.kr/tests/commute-style/test/result",
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
