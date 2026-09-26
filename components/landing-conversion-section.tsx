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
        "재미있는 아키타입이 실제 연애 패턴과 어떻게 연결되는지 함께 확인하면 결과가 더 와닿아요.",
        "엔터테인먼트·관계 테스트로 자연스럽게 이어져서 궁금한 결과를 계속 확인해볼 수 있어요.",
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
        "포지션별 차이를 미리 보면 내 결과가 왜 그렇게 나왔는지 더 쉽게 이해할 수 있어요.",
        "그룹 안에서의 내 포지션을 친구와 비교해보는 재미가 있어요.",
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
        "결과가 애착 방식과 생활 리듬을 함께 짚어줘서 나를 더 잘 이해하는 데 도움이 돼요.",
        "비슷한 감정 분석 테스트로 이어서 해보면 나에 대해 더 다양하게 알아갈 수 있어요.",
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
        "음식 선택이 결정 스타일과 어떻게 연결되는지 알아가는 재미가 있어요.",
        "결과 페이지에서 음식·라이프스타일 테스트로 자연스럽게 이어져서 계속 둘러보기 좋아요.",
      ],
    };
  }

  return {
    comparePoints: [
      "단순한 주제도 실제 행동 패턴과 연결되면 공감도가 높아져요.",
      "관련 테스트와 바로 비교해보면 내 성향을 더 입체적으로 알 수 있어요.",
      "다음에 볼만한 테스트를 바로 안내해줘서 헤매지 않고 이어서 즐길 수 있어요.",
    ],
    stayReasons: [
      "시작 전에 어떤 결과를 얻을 수 있는지 미리 알 수 있어서 편하게 시작할 수 있어요.",
      "관련 테스트로 자연스럽게 이어지니 궁금한 만큼 계속 둘러볼 수 있어요.",
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
