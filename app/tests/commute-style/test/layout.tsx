import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "출퇴근 스타일 테스트 진행 - 무료 성격 테스트 | 테몬",
  description:
    "출퇴근 스타일 테스트를 시작하세요! 12문항으로 알아보는 나의 출퇴근 캐릭터. 일상 속 통근 선택으로 성격 유형을 무료로 확인해보세요.",
  keywords:
    "출퇴근 테스트, 통근 스타일, MBTI, 성격 테스트, 직장인 테스트, 무료 테스트",
  alternates: {
    canonical: "/tests/commute-style/test",
  },
  openGraph: {
    title: "출퇴근 스타일 테스트 진행 - 무료 성격 테스트",
    description: "출퇴근 스타일 테스트! 12문항으로 알아보는 통근 캐릭터.",
    type: "website",
    url: "https://temon.kr/tests/commute-style/test",
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
