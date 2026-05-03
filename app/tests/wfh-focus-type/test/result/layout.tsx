import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "재택근무 집중 유형 테스트 결과 - 나의 재택 캐릭터 | 테몬",
  description:
    "재택근무 집중 유형 테스트 결과! 원격 업무 방식이 드러내는 16유형 중 나의 재택 캐릭터를 확인해보세요.",
  keywords: "재택근무 결과, 원격근무 유형, WFH MBTI 결과, 성격 테스트",
  alternates: {
    canonical: "/tests/wfh-focus-type/test/result",
  },
  openGraph: {
    title: "재택근무 집중 유형 테스트 결과 - 나의 재택 캐릭터",
    description: "원격 업무 방식이 드러내는 나의 집중 유형을 확인해보세요.",
    type: "website",
    url: "https://temon.kr/tests/wfh-focus-type/test/result",
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
