import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "온라인 강의 완주율 테스트 진행 - 무료 성격 테스트 | 테몬",
  description: "온라인 강의 완주율 테스트를 시작하세요! 12문항으로 알아보는 학습 캐릭터.",
  keywords: "온라인 강의, 인강 MBTI, 학습 스타일 테스트, 자기계발, 성격 테스트, 무료 테스트",
  alternates: { canonical: "/tests/course-completion/test" },
  openGraph: {
    title: "온라인 강의 완주율 테스트 진행", description: "12문항으로 알아보는 학습 캐릭터.",
    type: "website", url: "https://temon.kr/tests/course-completion/test",
  },
  robots: { index: false, follow: true },
};
export default function TestLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
