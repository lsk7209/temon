import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "온라인 강의 완주율 테스트 결과 - 나의 학습 캐릭터 | 테몬",
  description: "온라인 강의 완주율 테스트 결과! 16유형 중 나의 학습 캐릭터를 확인해보세요.",
  keywords: "온라인 강의, 인강 MBTI, 학습 스타일 테스트, 자기계발, 성격 테스트, 무료 테스트",
  alternates: { canonical: "/tests/course-completion/test/result" },
  openGraph: { title: "온라인 강의 완주율 테스트 결과", description: "온라인 강의 학습 패턴으로 알아보는 16가지 학습 유형", type: "website",
    url: "https://temon.kr/tests/course-completion/test/result" },
  robots: { index: false, follow: true },
};
export default function ResultLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
