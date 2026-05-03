import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "독서 집중도 유형 테스트 결과 - 나의 독서 캐릭터 | 테몬",
  description: "독서 집중도 유형 테스트 결과! 16유형 중 나의 독서 캐릭터를 확인해보세요.",
  keywords: "독서 집중, 독서 MBTI, 책 읽기 테스트, 자기계발, 성격 테스트, 무료 테스트",
  alternates: { canonical: "/tests/reading-focus/test/result" },
  openGraph: { title: "독서 집중도 유형 테스트 결과", description: "독서 패턴과 집중 방식으로 알아보는 16가지 독서 유형", type: "website",
    url: "https://temon.kr/tests/reading-focus/test/result" },
  robots: { index: false, follow: true },
};
export default function ResultLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
