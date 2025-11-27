import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "K-드라마 클리셰 테스트 - 나는 어떤 드라마 캐릭터? | 테몬",
  description:
    "K-드라마 클리셰 테스트로 알아보는 나의 캐릭터! 재벌남/여부터 국밥 조연까지, 10개의 드라마 클리셰 상황에서 당신의 선택은? 재미있는 드라마 캐릭터 테스트를 지금 시작해보세요.",
  keywords: "K-드라마 테스트, 드라마 캐릭터 테스트, 클리셰 테스트, 성격 테스트, MBTI, 심리테스트",
  alternates: {
    canonical: "/kdrama-mbti",
  },
  openGraph: {
    title: "K-드라마 클리셰 테스트 - 나는 어떤 드라마 캐릭터?",
    description: "재벌남/여부터 국밥 조연까지, 10개의 드라마 클리셰 상황에서 당신의 선택은?",
    type: "website",
    url: "https://www.temon.kr/kdrama-mbti",
  },
}

export default function KDramaMBTILayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

