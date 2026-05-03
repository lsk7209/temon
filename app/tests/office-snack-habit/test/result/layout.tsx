import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "사무실 간식 습관 테스트 결과 - 나의 직장 캐릭터 | 테몬",
  description:
    "사무실 간식 습관 테스트 결과! 간식 취향이 드러내는 16유형 중 나의 직장 캐릭터를 확인해보세요.",
  keywords: "사무실 간식 결과, 직장인 성격, 간식 MBTI 결과, 성격 테스트",
  alternates: {
    canonical: "/tests/office-snack-habit/test/result",
  },
  openGraph: {
    title: "사무실 간식 습관 테스트 결과 - 나의 직장 캐릭터",
    description: "간식 습관이 드러내는 나의 직장 성격 유형을 확인해보세요.",
    type: "website",
    url: "https://temon.kr/tests/office-snack-habit/test/result",
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
