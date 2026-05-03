import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "친구 간 거리 조절 스타일 테스트 결과 - 나의 우정 캐릭터 | 테몬",
  description:
    "친구 간 거리 조절 스타일 테스트 결과! 16유형 중 나의 우정 캐릭터를 확인해보세요.",
  keywords: "친구 거리 결과, 우정 유형, 친구 MBTI 결과, 성격 테스트",
  alternates: { canonical: "/tests/friend-distance/test/result" },
  openGraph: {
    title: "친구 간 거리 조절 스타일 테스트 결과",
    description: "친구와의 거리감으로 알아보는 나의 우정 유형.",
    type: "website",
    url: "https://temon.kr/tests/friend-distance/test/result",
  },
  robots: { index: false, follow: true },
};

export default function ResultLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
