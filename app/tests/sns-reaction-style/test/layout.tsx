import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SNS 반응 스타일 테스트 진행 - 무료 성격 테스트 | 테몬",
  description: "SNS 반응 스타일 테스트를 시작하세요! 12문항으로 알아보는 디지털 캐릭터.",
  keywords: "SNS 반응, 인스타 MBTI, 디지털 소통, 성격 테스트, 무료 테스트",
  alternates: { canonical: "/tests/sns-reaction-style/test" },
  openGraph: {
    title: "SNS 반응 스타일 테스트 진행",
    description: "12문항으로 알아보는 디지털 캐릭터.",
    type: "website",
    url: "https://temon.kr/tests/sns-reaction-style/test",
  },
  robots: { index: false, follow: true },
};

export default function TestLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
