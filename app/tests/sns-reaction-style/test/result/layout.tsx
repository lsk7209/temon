import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SNS 반응 스타일 테스트 결과 - 나의 디지털 캐릭터 | 테몬",
  description: "SNS 반응 스타일 테스트 결과! 16유형 중 나의 디지털 캐릭터를 확인해보세요.",
  keywords: "SNS 반응, 인스타 MBTI, 디지털 소통, 성격 테스트, 무료 테스트",
  alternates: { canonical: "/tests/sns-reaction-style/test/result" },
  openGraph: {
    title: "SNS 반응 스타일 테스트 결과",
    description: "SNS 반응 패턴으로 알아보는 16가지 디지털 소통 유형",
    type: "website",
    url: "https://temon.kr/tests/sns-reaction-style/test/result",
  },
  robots: { index: false, follow: true },
};

export default function ResultLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
