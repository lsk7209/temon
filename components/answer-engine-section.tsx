"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type AnswerContent = {
  summary: string;
  bestFor: string;
  usefulSignal: string;
  nextClicks: string[];
};

function getAnswerContent(quizTitle: string): AnswerContent {
  const lowerTitle = quizTitle.toLowerCase();

  if (lowerTitle.includes("drama") || lowerTitle.includes("드라마")) {
    return {
      summary: `${quizTitle}는 K-드라마 클리셰 상황에서 나의 선택을 분석해 드라마 속 캐릭터 유형을 알려주는 테스트예요. 긴장감·애정 표현·페이스 조절 방식을 바탕으로 나만의 캐릭터 아키타입을 찾아줍니다.`,
      bestFor:
        "친구, 파트너와 비교하거나 좋아하는 드라마 캐릭터와 나를 대조해보고 싶은 분",
      usefulSignal:
        "갈등 대응 방식, 감정 표현 페이스, 사회적 에너지의 표출 방식",
      nextClicks: [
        "가벼운 라이프스타일 테스트와 비교해보기",
        "결과를 공유해서 그룹 케미 확인하기",
        "평일 루틴을 기준으로 다시 테스트해보기",
      ],
    };
  }

  if (
    lowerTitle.includes("idol") ||
    lowerTitle.includes("k-pop") ||
    lowerTitle.includes("아이돌")
  ) {
    return {
      summary: `${quizTitle}는 아이돌 그룹 상황에서 나의 포지션을 찾아주는 테스트예요. 팬덤 지식이 아닌 실제 팀 내 행동 방식을 분석해 리더십·분위기·서포트 역할 중 나의 자연스러운 포지션을 알려줍니다.`,
      bestFor: "팀·채팅방·친구 모임에서 나의 역할이 궁금한 분",
      usefulSignal:
        "리더십 선호도, 감정 표현 방식, 주목받는 것에 대한 편안함, 그룹 조율 스타일",
      nextClicks: [
        "드라마 캐릭터 테스트와 비교해보기",
        "결과 페이지에서 실제 팀 행동과 매칭해보기",
        "관심 있는 다른 엔터테인먼트 테스트 이어서 보기",
      ],
    };
  }

  if (lowerTitle.includes("pet") || lowerTitle.includes("반려동물")) {
    return {
      summary: `${quizTitle}는 라이프스타일 선택을 통해 나에게 잘 맞는 반려동물 유형을 찾아주는 테스트예요. 애착 방식·생활 리듬·자극 선호도를 분석해 나의 성격과 찰떡인 펫을 추천해줍니다.`,
      bestFor: "거창한 이론 없이 따뜻하고 직관적인 성격 결과를 원하는 분",
      usefulSignal: "집 안 루틴, 감수성, 친밀감 욕구, 사회적 배터리 패턴",
      nextClicks: [
        "음식·공부 테스트와 비교해보기",
        "결과를 활용해 일상 루틴 설명해보기",
        "친구와 공유해서 차이점 확인하기",
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
      summary: `${quizTitle}는 익숙한 음식 선택을 통해 루틴·편안함·호기심·결정 스타일을 파악하는 테스트예요. 일상 속 선택이 반영된 결과라 공감도와 공유 욕구가 높아요.`,
      bestFor: "가볍게 시작했다가 결과가 너무 정확해서 빠져드는 분",
      usefulSignal:
        "컴포트존, 새로운 것에 대한 수용도, 반복 행동 패턴, 편의 선호도",
      nextClicks: [
        "다른 음식 주제 테스트 이어보기",
        "결과를 실제 주문 습관과 비교해보기",
        "관련 테스트로 세션 이어가기",
      ],
    };
  }

  if (lowerTitle.includes("study") || lowerTitle.includes("공부")) {
    return {
      summary: `${quizTitle}는 집중력·반복 학습·계획 수립·마감 대응 방식을 분석해 나만의 공부 유형을 알려주는 테스트예요. 단순 판단이 아니라 실제로 활용할 수 있는 패턴을 찾아줍니다.`,
      bestFor: "복습 리듬·노트 필기·시험 준비 방식을 개선하고 싶은 분",
      usefulSignal: "집중 스타일, 압박 상황 반응, 복습 리듬, 구조 수용 방식",
      nextClicks: [
        "결과를 바탕으로 습관 하나 바꿔보기",
        "시험 기간 후 다시 테스트해보기",
        "아침 루틴·폰 습관 테스트와 비교해보기",
      ],
    };
  }

  if (lowerTitle.includes("alarm") || lowerTitle.includes("알람")) {
    return {
      summary: `${quizTitle}는 아침 루틴 설계를 위한 테스트예요. 단순히 부지런함을 측정하는 게 아니라 기상 저항의 원인 패턴을 분석해 나만의 모닝 루틴 해결책을 찾아줍니다.`,
      bestFor: "좋은 의도에도 아침이 계속 흔들리는 이유가 궁금한 분",
      usefulSignal:
        "알람 반응 패턴, 첫 행동 모멘텀, 회복 속도, 아침 시스템 약점",
      nextClicks: [
        "결과 페이지를 하나의 변화 액션플랜으로 활용하기",
        "평일과 주말 행동 비교해보기",
        "다른 습관 테스트로 패턴 겹침 확인하기",
      ],
    };
  }

  return {
    summary: `${quizTitle}는 짧은 선택지를 통해 나만의 습관·성격 패턴을 빠르게 파악하는 테스트예요.`,
    bestFor:
      "빠르고 가볍게 결과를 확인하고 관련 테스트를 이어서 즐기고 싶은 분",
    usefulSignal: "기본 선호도, 에너지 방향, 반복적인 결정 패턴",
    nextClicks: [
      "테스트 빠르게 완료하기",
      "결과 페이지 가이드 확인하기",
      "관련 테스트 바로 열어보기",
    ],
  };
}

export function AnswerEngineSection({ quizTitle }: { quizTitle: string }) {
  const content = getAnswerContent(quizTitle);

  return (
    <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
      <CardContent className="p-8 md:p-12">
        <div className="space-y-6">
          <div className="space-y-3">
            <Badge variant="secondary">테스트 안내</Badge>
            <h2 className="text-2xl font-bold text-gray-900">
              이 테스트, 이런 분께 딱 맞아요
            </h2>
            <p className="text-gray-600 leading-relaxed">{content.summary}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">추천 대상</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {content.bestFor}
              </p>
            </div>
            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">분석 포인트</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {content.usefulSignal}
              </p>
            </div>
            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">다음 추천</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                {content.nextClicks.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
