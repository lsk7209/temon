import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "커피 MBTI 테스트 결과 - 무료 성격 테스트 | 테몬",
  description:
    "커피 MBTI 테스트 결과를 확인하세요! 당신의 커피 성격 유형과 특징을 알아보고, 추천 커피와 호환되는 유형을 확인해보세요.",
  keywords: "커피 MBTI 결과, 커피 테스트 결과, 성격 테스트 결과, MBTI 결과, 커피 유형, 심리테스트 결과",
  alternates: {
    canonical: "/tests/coffee-mbti/test/result",
  },
  openGraph: {
    title: "커피 MBTI 테스트 결과 - 무료 성격 테스트",
    description: "커피 MBTI 테스트 결과를 확인하세요! 당신의 커피 성격 유형과 특징을 알아보세요.",
    type: "website",
    url: "https://www.temon.kr/tests/coffee-mbti/test/result",
  },
  robots: {
    index: false, // 결과 페이지는 개인화된 내용이므로 인덱싱 제외
    follow: true,
  },
}

export default function ResultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

