import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "외국어 학습 스타일 테스트 결과 - 나의 어학 캐릭터 | 테몬",
  description: "외국어 학습 스타일 테스트 결과! 16유형 중 나의 어학 캐릭터를 확인해보세요.",
  keywords: "외국어 학습, 어학 MBTI, 영어 공부 테스트, 학습 스타일, 성격 테스트, 무료 테스트",
  alternates: { canonical: "/tests/language-learner-type/test/result" },
  openGraph: { title: "외국어 학습 스타일 테스트 결과", description: "외국어 학습 방식으로 알아보는 16가지 어학 유형", type: "website",
    url: "https://temon.kr/tests/language-learner-type/test/result" },
  robots: { index: false, follow: true },
};
export default function ResultLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
