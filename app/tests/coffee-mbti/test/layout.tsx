import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "커피 MBTI 테스트 진행 - 무료 성격 테스트 | 테몬",
  description:
    "커피 MBTI 테스트를 시작하세요! 12문항으로 알아보는 나의 커피 성격 유형. 커피 취향으로 알아보는 재미있는 MBTI 테스트를 무료로 진행해보세요.",
  keywords: "커피 MBTI, 커피 테스트, 성격 테스트, MBTI, 커피 유형, 심리테스트, 무료 테스트",
  alternates: {
    canonical: "/tests/coffee-mbti/test",
  },
  openGraph: {
    title: "커피 MBTI 테스트 진행 - 무료 성격 테스트",
    description: "커피 MBTI 테스트를 시작하세요! 12문항으로 알아보는 나의 커피 성격 유형.",
    type: "website",
    url: "https://www.temon.kr/tests/coffee-mbti/test",
  },
  robots: {
    index: false, // 테스트 진행 페이지는 인덱싱 제외
    follow: true,
  },
}

export default function TestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

