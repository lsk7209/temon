import { TestIntro } from "@/components/test-intro"

export default function OnlineShoppingCartStyleIntro() {
  return (
    <TestIntro
      id="online-shopping-cart-style"
      title="🛒 장바구니 관리 성향 테스트"
      description="담기-비우기-결제 패턴으로 보는 쇼핑 성향"
      questionCount={12}
      avgMinutes={3}
      resultCount={16}
      theme="red"
    />
  )
}
