"use client"

import Link from "next/link"

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container py-8 md:py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">T</span>
                            </div>
                            <span className="font-bold text-lg">테몬 MBTI</span>
                        </Link>
                        <p className="text-sm text-muted-foreground max-w-xs">
                            재미있는 MBTI 성격 테스트로 나를 더 잘 알아가는 시간!
                            다양한 주제의 무료 테스트를 즐겨보세요.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-sm">바로가기</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link
                                    href="/tests"
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    전체 테스트
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/tests/coffee-mbti"
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    ☕ 커피 MBTI
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/tests/ramen-mbti"
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    🍜 라면 MBTI
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-sm">법적 고지</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link
                                    href="/privacy"
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    개인정보처리방침
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/terms"
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    이용약관
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="mailto:contact@temon.kr"
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    문의하기
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t my-8" />

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <p>© {currentYear} 테몬 MBTI. All rights reserved.</p>
                    <p className="text-xs">
                        본 사이트의 테스트 결과는 재미를 위한 것이며, 전문적인 심리 진단이 아닙니다.
                    </p>
                </div>
            </div>
        </footer>
    )
}
