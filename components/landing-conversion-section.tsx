"use client";

import { Card, CardContent } from "@/components/ui/card";

type LandingConversionContent = {
  comparePoints: string[];
  stayReasons: string[];
};

function getLandingConversionContent(
  quizTitle: string,
): LandingConversionContent {
  const lowerTitle = quizTitle.toLowerCase();

  if (lowerTitle.includes("drama") || lowerTitle.includes("드라마")) {
    return {
      comparePoints: [
        "드라마 클리셰 상황은 연애 페이스·갈등 에너지를 일반적인 성격 레이블보다 더 생생하게 보여줘요.",
        "결과를 파트너·친한 친구·좋아하는 드라마 캐릭터와 비교하는 분들이 많아요.",
        "캐릭터 유형이 직관적으로 와닿아서 공유 욕구가 높아요.",
      ],
      stayReasons: [
        "재미있는 아키타입이 실제 사회적 행동과 어떻게 연결되는지 설명할 때 이탈률이 낮아져요.",
        "엔터테인먼트·관계 테스트로 자연스럽게 연결되면 완료율이 높아져요.",
      ],
    };
  }

  if (
    lowerTitle.includes("idol") ||
    lowerTitle.includes("k-pop") ||
    lowerTitle.includes("아이돌")
  ) {
    return {
      comparePoints: [
        "리더·분위기 메이커·센터·서포트 중 내 포지션을 바로 파악할 수 있어요.",
        "팬덤 지식이 아닌 실제 그룹 내 행동 방식을 기반으로 해서 공감도가 높아요.",
        "다른 엔터테인먼트 테스트와 비교하면 사회적 역할 패턴을 더 넓게 볼 수 있어요.",
      ],
      stayReasons: [
        "테스트 시작 전에 포지션 차이를 명확히 보여줄수록 완료율이 높아져요.",
        "그룹 비교 도구로 프레이밍하면 결과 공유와 추가 클릭이 늘어나요.",
      ],
    };
  }

  if (lowerTitle.includes("pet") || lowerTitle.includes("반려동물")) {
    return {
      comparePoints: [
        "동물 메타포는 딱딱한 성격 레이블보다 감정 스타일을 훨씬 쉽게 설명해줘요.",
        "반려동물을 키우지 않아도 유용한 결과를 얻을 수 있어요.",
        "음식·루틴·라이프스타일 테스트로 자연스럽게 이어지는 주제예요.",
      ],
      stayReasons: [
        "결과가 애착 방식과 생활 리듬에 관한 것임을 안내하면 이탈률이 낮아져요.",
        "같은 감정 자기 분석 패턴의 관련 테스트로 이어지면 세션 깊이가 깊어져요.",
      ],
    };
  }

  if (
    lowerTitle.includes("ramen") ||
    lowerTitle.includes("라면") ||
    lowerTitle.includes("coffee") ||
    lowerTitle.includes("커피")
  ) {
    return {
      comparePoints: [
        "음식 선택은 가볍게 시작하지만 결과가 의외로 정확해서 공유 욕구가 높아요.",
        "라면·커피 선택은 컴포트존·호기심·반복 행동을 빠르게 드러내줘요.",
        "비슷한 음식·습관 테스트로 이어서 즐기기 좋은 주제예요.",
      ],
      stayReasons: [
        "음식 선택이 결정 스타일과 어떻게 연결되는지 보여줄 때 페이지 체류 시간이 늘어요.",
        "결과 페이지에서 음식·라이프스타일 테스트로 자연스럽게 연결되면 세션이 깊어져요.",
      ],
    };
  }

  return {
    comparePoints: [
      "단순한 주제도 실제 행동 패턴과 연결되면 공감도가 높아져요.",
      "관련 테스트와 즉시 비교할 수 있을 때 전환율이 좋아요.",
      "다음 클릭을 명확하게 안내하는 테스트일수록 완료율이 높아요.",
    ],
    stayReasons: [
      "시작 전에 결과의 가치를 미리 설명해주면 이탈률이 낮아져요.",
      "관련 테스트 경로를 제시하면 페이지뷰와 완료 깊이가 늘어나요.",
    ],
  };
}

export function LandingConversionSection({ quizTitle }: { quizTitle: string }) {
  const content = getLandingConversionContent(quizTitle);

  return (
    <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
      <CardContent className="p-8 md:p-12">
        <div className="space-y-8">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-gray-900">
              이 테스트가 특별한 이유
            </h2>
            <p className="text-gray-600 leading-relaxed">
              재미있으면서도 나를 정확히 설명하는 결과. 친구들과 비교하고
              공유하기까지 좋아요.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">비교 포인트</h3>
              <div className="space-y-3">
                {content.comparePoints.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
                  >
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">
                계속 보고 싶어지는 이유
              </h3>
              <div className="space-y-3">
                {content.stayReasons.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
                  >
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
