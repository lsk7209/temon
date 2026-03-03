"use client"

import { MBTIResultPage } from "@/components/mbti-result-page"

const RESULTS = {
  ISTJ: {
    mbti: "ISTJ",
    name: "체크리스트 완성형",
    summary: "여행 짐싸기 스타일 테스트에서 드러난 체크리스트 완성형 성향입니다.",
    traits: ["상황 판단", "선택 패턴", "행동 선호"],
    presets: {
      style: ["기본 루틴", "선호 방식"],
      habit: ["자주 보이는 습관", "강점으로 연결되는 행동"],
      tip: ["과부하를 줄이는 방법", "더 잘 맞는 실행 전략"],
    },
    pitfalls: ["ISFJ"],
    recommend: ["INFJ"],
  },
  ISFJ: {
    mbti: "ISFJ",
    name: "돌봄 준비형",
    summary: "여행 짐싸기 스타일 테스트에서 드러난 돌봄 준비형 성향입니다.",
    traits: ["상황 판단", "선택 패턴", "행동 선호"],
    presets: {
      style: ["기본 루틴", "선호 방식"],
      habit: ["자주 보이는 습관", "강점으로 연결되는 행동"],
      tip: ["과부하를 줄이는 방법", "더 잘 맞는 실행 전략"],
    },
    pitfalls: ["INFJ"],
    recommend: ["INTJ"],
  },
  INFJ: {
    mbti: "INFJ",
    name: "의미 여행형",
    summary: "여행 짐싸기 스타일 테스트에서 드러난 의미 여행형 성향입니다.",
    traits: ["상황 판단", "선택 패턴", "행동 선호"],
    presets: {
      style: ["기본 루틴", "선호 방식"],
      habit: ["자주 보이는 습관", "강점으로 연결되는 행동"],
      tip: ["과부하를 줄이는 방법", "더 잘 맞는 실행 전략"],
    },
    pitfalls: ["INTJ"],
    recommend: ["ISTP"],
  },
  INTJ: {
    mbti: "INTJ",
    name: "최적 동선형",
    summary: "여행 짐싸기 스타일 테스트에서 드러난 최적 동선형 성향입니다.",
    traits: ["상황 판단", "선택 패턴", "행동 선호"],
    presets: {
      style: ["기본 루틴", "선호 방식"],
      habit: ["자주 보이는 습관", "강점으로 연결되는 행동"],
      tip: ["과부하를 줄이는 방법", "더 잘 맞는 실행 전략"],
    },
    pitfalls: ["ISTP"],
    recommend: ["ISFP"],
  },
  ISTP: {
    mbti: "ISTP",
    name: "경량 실전형",
    summary: "여행 짐싸기 스타일 테스트에서 드러난 경량 실전형 성향입니다.",
    traits: ["상황 판단", "선택 패턴", "행동 선호"],
    presets: {
      style: ["기본 루틴", "선호 방식"],
      habit: ["자주 보이는 습관", "강점으로 연결되는 행동"],
      tip: ["과부하를 줄이는 방법", "더 잘 맞는 실행 전략"],
    },
    pitfalls: ["ISFP"],
    recommend: ["INFP"],
  },
  ISFP: {
    mbti: "ISFP",
    name: "감성 소품형",
    summary: "여행 짐싸기 스타일 테스트에서 드러난 감성 소품형 성향입니다.",
    traits: ["상황 판단", "선택 패턴", "행동 선호"],
    presets: {
      style: ["기본 루틴", "선호 방식"],
      habit: ["자주 보이는 습관", "강점으로 연결되는 행동"],
      tip: ["과부하를 줄이는 방법", "더 잘 맞는 실행 전략"],
    },
    pitfalls: ["INFP"],
    recommend: ["INTP"],
  },
  INFP: {
    mbti: "INFP",
    name: "스토리 수집형",
    summary: "여행 짐싸기 스타일 테스트에서 드러난 스토리 수집형 성향입니다.",
    traits: ["상황 판단", "선택 패턴", "행동 선호"],
    presets: {
      style: ["기본 루틴", "선호 방식"],
      habit: ["자주 보이는 습관", "강점으로 연결되는 행동"],
      tip: ["과부하를 줄이는 방법", "더 잘 맞는 실행 전략"],
    },
    pitfalls: ["INTP"],
    recommend: ["ESTP"],
  },
  INTP: {
    mbti: "INTP",
    name: "상황 가설형",
    summary: "여행 짐싸기 스타일 테스트에서 드러난 상황 가설형 성향입니다.",
    traits: ["상황 판단", "선택 패턴", "행동 선호"],
    presets: {
      style: ["기본 루틴", "선호 방식"],
      habit: ["자주 보이는 습관", "강점으로 연결되는 행동"],
      tip: ["과부하를 줄이는 방법", "더 잘 맞는 실행 전략"],
    },
    pitfalls: ["ESTP"],
    recommend: ["ESFP"],
  },
  ESTP: {
    mbti: "ESTP",
    name: "현장 적응형",
    summary: "여행 짐싸기 스타일 테스트에서 드러난 현장 적응형 성향입니다.",
    traits: ["상황 판단", "선택 패턴", "행동 선호"],
    presets: {
      style: ["기본 루틴", "선호 방식"],
      habit: ["자주 보이는 습관", "강점으로 연결되는 행동"],
      tip: ["과부하를 줄이는 방법", "더 잘 맞는 실행 전략"],
    },
    pitfalls: ["ESFP"],
    recommend: ["ENFP"],
  },
  ESFP: {
    mbti: "ESFP",
    name: "무드 연출형",
    summary: "여행 짐싸기 스타일 테스트에서 드러난 무드 연출형 성향입니다.",
    traits: ["상황 판단", "선택 패턴", "행동 선호"],
    presets: {
      style: ["기본 루틴", "선호 방식"],
      habit: ["자주 보이는 습관", "강점으로 연결되는 행동"],
      tip: ["과부하를 줄이는 방법", "더 잘 맞는 실행 전략"],
    },
    pitfalls: ["ENFP"],
    recommend: ["ENTP"],
  },
  ENFP: {
    mbti: "ENFP",
    name: "모험 확장형",
    summary: "여행 짐싸기 스타일 테스트에서 드러난 모험 확장형 성향입니다.",
    traits: ["상황 판단", "선택 패턴", "행동 선호"],
    presets: {
      style: ["기본 루틴", "선호 방식"],
      habit: ["자주 보이는 습관", "강점으로 연결되는 행동"],
      tip: ["과부하를 줄이는 방법", "더 잘 맞는 실행 전략"],
    },
    pitfalls: ["ENTP"],
    recommend: ["ESTJ"],
  },
  ENTP: {
    mbti: "ENTP",
    name: "변수 실험형",
    summary: "여행 짐싸기 스타일 테스트에서 드러난 변수 실험형 성향입니다.",
    traits: ["상황 판단", "선택 패턴", "행동 선호"],
    presets: {
      style: ["기본 루틴", "선호 방식"],
      habit: ["자주 보이는 습관", "강점으로 연결되는 행동"],
      tip: ["과부하를 줄이는 방법", "더 잘 맞는 실행 전략"],
    },
    pitfalls: ["ESTJ"],
    recommend: ["ESFJ"],
  },
  ESTJ: {
    mbti: "ESTJ",
    name: "일정 통제형",
    summary: "여행 짐싸기 스타일 테스트에서 드러난 일정 통제형 성향입니다.",
    traits: ["상황 판단", "선택 패턴", "행동 선호"],
    presets: {
      style: ["기본 루틴", "선호 방식"],
      habit: ["자주 보이는 습관", "강점으로 연결되는 행동"],
      tip: ["과부하를 줄이는 방법", "더 잘 맞는 실행 전략"],
    },
    pitfalls: ["ESFJ"],
    recommend: ["ENFJ"],
  },
  ESFJ: {
    mbti: "ESFJ",
    name: "동행 케어형",
    summary: "여행 짐싸기 스타일 테스트에서 드러난 동행 케어형 성향입니다.",
    traits: ["상황 판단", "선택 패턴", "행동 선호"],
    presets: {
      style: ["기본 루틴", "선호 방식"],
      habit: ["자주 보이는 습관", "강점으로 연결되는 행동"],
      tip: ["과부하를 줄이는 방법", "더 잘 맞는 실행 전략"],
    },
    pitfalls: ["ENFJ"],
    recommend: ["ENTJ"],
  },
  ENFJ: {
    mbti: "ENFJ",
    name: "팀 분위기형",
    summary: "여행 짐싸기 스타일 테스트에서 드러난 팀 분위기형 성향입니다.",
    traits: ["상황 판단", "선택 패턴", "행동 선호"],
    presets: {
      style: ["기본 루틴", "선호 방식"],
      habit: ["자주 보이는 습관", "강점으로 연결되는 행동"],
      tip: ["과부하를 줄이는 방법", "더 잘 맞는 실행 전략"],
    },
    pitfalls: ["ENTJ"],
    recommend: ["ISTJ"],
  },
  ENTJ: {
    mbti: "ENTJ",
    name: "목표 달성형",
    summary: "여행 짐싸기 스타일 테스트에서 드러난 목표 달성형 성향입니다.",
    traits: ["상황 판단", "선택 패턴", "행동 선호"],
    presets: {
      style: ["기본 루틴", "선호 방식"],
      habit: ["자주 보이는 습관", "강점으로 연결되는 행동"],
      tip: ["과부하를 줄이는 방법", "더 잘 맞는 실행 전략"],
    },
    pitfalls: ["ISTJ"],
    recommend: ["ISFJ"],
  }
}

export default function TravelPackingStyleResultPage() {
  return (
    <MBTIResultPage
      testId="travel-packing-style"
      title="여행 짐싸기 스타일 테스트"
      results={RESULTS}
      accentClass="text-pink-600"
      gradientClass="from-pink-50 to-white"
    />
  )
}
