import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "친구 간 거리 조절 스타일 테스트 진행 - 무료 성격 테스트 | 테몬",
  description:
    "친구 간 거리 조절 스타일 테스트를 시작하세요! 12문항으로 알아보는 우정 유형.",
  keywords: "친구 거리, 우정 MBTI, 인간관계 테스트, 무료 테스트",
  alternates: { canonical: "/tests/friend-distance/test" },
  openGraph: {
    title: "친구 간 거리 조절 스타일 테스트 진행",
    description: "12문항으로 알아보는 우정 캐릭터.",
    type: "website",
    url: "https://temon.kr/tests/friend-distance/test",
  },
  robots: { index: false, follow: true },
};

export default function TestLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
