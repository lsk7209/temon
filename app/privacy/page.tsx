import type { Metadata } from "next"
import { JsonLd, createBreadcrumbSchema } from "@/components/json-ld"

const baseUrl = "https://temon.kr"

export const metadata: Metadata = {
    title: "개인정보처리방침 | 테몬 MBTI",
    description: "테몬 MBTI 서비스의 개인정보처리방침입니다. 수집하는 정보, 이용 목적, 보관 기간 등을 안내합니다.",
    alternates: {
        canonical: "/privacy",
    },
}

export default function PrivacyPage() {
    const breadcrumbSchema = createBreadcrumbSchema([
        { name: "홈", url: baseUrl },
        { name: "개인정보처리방침", url: `${baseUrl}/privacy` },
    ])

    return (
        <>
            <JsonLd id="privacy-breadcrumb" data={breadcrumbSchema} />
            <div className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-cyan-50 py-12 px-4">
                <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                    <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
                        개인정보처리방침
                    </h1>

                    <div className="prose prose-gray max-w-none space-y-6">
                        <p className="text-muted-foreground">
                            시행일: 2024년 1월 1일 · 최종 개정일: 2026년 9월 29일
                        </p>

                        <section>
                            <h2 className="text-xl font-semibold mt-8 mb-4">1. 수집하는 개인정보 항목</h2>
                            <p>테몬 MBTI(이하 "서비스")는 다음과 같은 정보를 수집합니다:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>자동 수집 정보:</strong> 브라우저 종류(User-Agent), 접속 시간, 방문 페이지, 유입 경로. IP 주소는 원본을 저장하지 않습니다.</li>
                                <li><strong>테스트 결과:</strong> 테스트를 완료할 때 생성되는 결과 유형, 선택한 답변, 중복 저장 방지를 위한 무작위 시도 식별자. 이름·연락처 등 개인을 식별하는 정보는 받지 않습니다.</li>
                                <li><strong>쿠키 및 브라우저 저장소:</strong> 이용 분석·광고용 쿠키, 분석·맞춤형 광고 허용/거부 선택값(브라우저 localStorage)</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mt-8 mb-4">2. 개인정보의 이용 목적</h2>
                            <p>수집된 정보는 다음 목적으로 이용됩니다:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>서비스 제공 및 운영</li>
                                <li>통계 분석 및 서비스 개선</li>
                                <li>맞춤형 광고 제공 (Google AdSense)</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mt-8 mb-4">3. 개인정보 보관 기간</h2>
                            <p>
                                테스트 결과 데이터는 통계 목적으로 무기한 보관될 수 있으나,
                                개인을 식별할 수 있는 정보는 포함되지 않습니다.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mt-8 mb-4">4. 개인정보의 제3자 제공</h2>
                            <p>서비스는 다음과 같은 제3자 서비스를 이용합니다:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Google Analytics:</strong> 방문자 분석</li>
                                <li><strong>Google AdSense:</strong> 광고 제공</li>
                                <li><strong>Microsoft Clarity:</strong> 사용자 행동 분석</li>
                                <li><strong>Vercel Analytics / Speed Insights:</strong> 방문 통계 및 페이지 성능 측정</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mt-8 mb-4">5. 쿠키 정책</h2>
                            <p>
                                본 서비스는 사용자 경험 개선 및 광고 제공을 위해 쿠키를 사용합니다.
                                브라우저 설정에서 쿠키를 비활성화할 수 있으나, 일부 기능이 제한될 수 있습니다.
                            </p>
                            <p className="mt-3">
                                Google AdSense는 광고 제공, 광고 성과 측정, 부정 이용 방지를 위해 쿠키 또는 유사 기술을
                                사용할 수 있습니다. 사용자는 Google 광고 설정에서 맞춤형 광고를 관리할 수 있습니다.
                            </p>
                            <p className="mt-3">
                                Google의 광고 데이터 처리 방식은{" "}
                                <a
                                    href="https://policies.google.com/technologies/ads"
                                    className="text-violet-600 hover:underline"
                                >
                                    Google 광고 기술 안내
                                </a>
                                에서 확인할 수 있습니다.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mt-8 mb-4">6. 분석 수집 및 맞춤형 광고 거부</h2>
                            <p>
                                모든 페이지 하단의 <strong>"분석·맞춤형 광고 거부하기"</strong> 버튼으로 언제든 거부하거나
                                다시 허용할 수 있습니다. 거부하면 다음과 같이 적용됩니다:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Google Analytics, Microsoft Clarity, Vercel Analytics와 서비스 자체 방문 통계 전송을 중단합니다.</li>
                                <li>광고는 계속 표시되지만 Google AdSense에 맞춤형(관심 기반) 광고가 아닌 광고를 요청합니다.</li>
                                <li>테스트 이용과 결과 확인은 거부 여부와 관계없이 동일하게 가능합니다.</li>
                            </ul>
                            <p className="mt-3">
                                선택값은 이 브라우저에만 저장되므로 다른 기기나 브라우저에서는 다시 선택해야 합니다.
                                브라우저 저장소를 지우면 선택값도 초기화됩니다.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mt-8 mb-4">7. 이용자의 권리</h2>
                            <p>이용자는 다음과 같은 권리를 행사할 수 있습니다:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>분석 수집 및 맞춤형 광고 거부 (6항)</li>
                                <li>브라우저 설정에서 쿠키 비활성화</li>
                                <li>
                                    <a href="https://adssettings.google.com" className="text-violet-600 hover:underline">
                                        Google 광고 설정
                                    </a>
                                    에서 광고 맞춤설정 해제
                                </li>
                                <li>개인정보 관련 문의</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mt-8 mb-4">8. 문의처</h2>
                            <p>
                                개인정보 관련 문의사항은 <a href="mailto:contact@temon.kr" className="text-violet-600 hover:underline">contact@temon.kr</a>로
                                연락해 주시기 바랍니다.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}
