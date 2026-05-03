import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "첫 데이트 긴장 테스트 결과 - 나의 데이트 캐릭터 | 테몬",
  description:
    "첫 데이트 긴장 테스트 결과! 첫 만남에서 드러나는 16유형 중 당신의 캐릭터와 찰떡인 연애 스타일을 확인해보세요.",
  keywords: "첫 데이트 결과, 데이트 성격, 연애 MBTI 결과, 데이트 테스트",
  alternates: {
    canonical: "/tests/first-date-nerves/test/result",
  },
  openGraph: {
    title: "첫 데이트 긴장 테스트 결과 - 나의 데이트 캐릭터",
    description: "첫 만남에서 드러나는 나의 연애 유형을 확인해보세요.",
    type: "website",
    url: "https://temon.kr/tests/first-date-nerves/test/result",
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
