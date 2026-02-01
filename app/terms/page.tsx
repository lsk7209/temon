import type { Metadata } from "next"
import { JsonLd, createBreadcrumbSchema } from "@/components/json-ld"

const baseUrl = "https://temon.kr"

export const metadata: Metadata = {
    title: "이용약관 | 테몬 MBTI",
    description: "테몬 MBTI 서비스의 이용약관입니다. 서비스 이용에 관한 규정을 안내합니다.",
    alternates: {
        canonical: "/terms",
    },
}

export default function TermsPage() {
    const breadcrumbSchema = createBreadcrumbSchema([
        { name: "홈", url: baseUrl },
        { name: "이용약관", url: `${baseUrl}/terms` },
    ])

    return (
        <>
            <JsonLd id="terms-breadcrumb" data={breadcrumbSchema} />
            <div className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-cyan-50 py-12 px-4">
                <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                    <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
                        이용약관
                    </h1>

                    <div className="prose prose-gray max-w-none space-y-6">
                        <p className="text-muted-foreground">
                            시행일: 2024년 1월 1일
                        </p>

                        <section>
                            <h2 className="text-xl font-semibold mt-8 mb-4">제1조 (목적)</h2>
                            <p>
                                본 약관은 테몬 MBTI(이하 "서비스")가 제공하는 모든 서비스의 이용에 관한
                                조건 및 절차, 기타 필요한 사항을 규정함을 목적으로 합니다.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mt-8 mb-4">제2조 (서비스의 내용)</h2>
                            <p>서비스는 다음과 같은 콘텐츠를 제공합니다:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>MBTI 성격 테스트</li>
                                <li>테스트 결과 분석 및 공유</li>
                                <li>통계 정보 제공</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mt-8 mb-4">제3조 (서비스 이용)</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>서비스는 무료로 제공됩니다.</li>
                                <li>별도의 회원가입 없이 이용할 수 있습니다.</li>
                                <li>서비스 이용 중 광고가 표시될 수 있습니다.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mt-8 mb-4">제4조 (면책조항)</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>본 서비스의 테스트 결과는 재미와 참고 목적으로만 제공됩니다.</li>
                                <li>테스트 결과는 전문적인 심리 진단이 아니며, 의학적/심리학적 조언을 대체하지 않습니다.</li>
                                <li>서비스 이용으로 인한 어떠한 손해에 대해서도 책임지지 않습니다.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mt-8 mb-4">제5조 (저작권)</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>서비스의 모든 콘텐츠에 대한 저작권은 테몬 MBTI에 있습니다.</li>
                                <li>무단 복제, 배포, 수정은 금지됩니다.</li>
                                <li>테스트 결과의 개인적 공유는 허용됩니다.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mt-8 mb-4">제6조 (약관의 변경)</h2>
                            <p>
                                본 약관은 관련 법령이 변경되거나 서비스 정책이 변경될 경우 사전 고지 후
                                변경될 수 있습니다. 변경된 약관은 서비스 내에 공지함으로써 효력이 발생합니다.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mt-8 mb-4">제7조 (문의)</h2>
                            <p>
                                서비스 이용 관련 문의사항은 <a href="mailto:contact@temon.kr" className="text-violet-600 hover:underline">contact@temon.kr</a>로
                                연락해 주시기 바랍니다.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}
