import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "외국어 학습 스타일 테스트 진행 - 무료 성격 테스트 | 테몬",
  description: "외국어 학습 스타일 테스트를 시작하세요! 12문항으로 알아보는 어학 캐릭터.",
  keywords: "외국어 학습, 어학 MBTI, 영어 공부 테스트, 학습 스타일, 성격 테스트, 무료 테스트",
  alternates: { canonical: "/tests/language-learner-type/test" },
  openGraph: {
    title: "외국어 학습 스타일 테스트 진행", description: "12문항으로 알아보는 어학 캐릭터.",
    type: "website", url: "https://temon.kr/tests/language-learner-type/test",
  },
  robots: { index: false, follow: true },
};
export default function TestLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
