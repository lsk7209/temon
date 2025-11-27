import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "K-팝 아이돌 포지션 테스트 - 아이돌 그룹에서 내 포지션은? | 테몬",
  description:
    "K-팝 아이돌 포지션 테스트로 알아보는 나의 포지션! 카리스마 리더부터 4차원 막내까지, 8개의 아이돌 상황에서 당신의 선택으로 포지션을 찾아보세요. 재미있는 아이돌 테스트를 지금 시작해보세요.",
  keywords: "K-팝 테스트, 아이돌 테스트, 포지션 테스트, 성격 테스트, MBTI, 심리테스트",
  alternates: {
    canonical: "/kpop-idol",
  },
  openGraph: {
    title: "K-팝 아이돌 포지션 테스트 - 아이돌 그룹에서 내 포지션은?",
    description: "카리스마 리더부터 4차원 막내까지, 8개의 아이돌 상황에서 당신의 선택으로 포지션을 찾아보세요.",
    type: "website",
    url: "https://www.temon.kr/kpop-idol",
  },
}

export default function KpopIdolLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

