"use client"

import { MBTIResultPage } from "@/components/mbti-result-page"

const RESULTS = {
  ISTJ: {
    mbti: "ISTJ",
    name: "루틴 수호형",
    summary: "잠버릇 자세 성향 테스트에서 드러난 루틴 수호형 성향입니다.",
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
    name: "포근 케어형",
    summary: "잠버릇 자세 성향 테스트에서 드러난 포근 케어형 성향입니다.",
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
    name: "감각 통찰형",
    summary: "잠버릇 자세 성향 테스트에서 드러난 감각 통찰형 성향입니다.",
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
    name: "수면 최적화형",
    summary: "잠버릇 자세 성향 테스트에서 드러난 수면 최적화형 성향입니다.",
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
    name: "즉시 회복형",
    summary: "잠버릇 자세 성향 테스트에서 드러난 즉시 회복형 성향입니다.",
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
    name: "감성 포근형",
    summary: "잠버릇 자세 성향 테스트에서 드러난 감성 포근형 성향입니다.",
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
    name: "몽상 힐링형",
    summary: "잠버릇 자세 성향 테스트에서 드러난 몽상 힐링형 성향입니다.",
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
    name: "패턴 분석형",
    summary: "잠버릇 자세 성향 테스트에서 드러난 패턴 분석형 성향입니다.",
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
    name: "파워냅 액션형",
    summary: "잠버릇 자세 성향 테스트에서 드러난 파워냅 액션형 성향입니다.",
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
    name: "기분 전환형",
    summary: "잠버릇 자세 성향 테스트에서 드러난 기분 전환형 성향입니다.",
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
    name: "리듬 탐험형",
    summary: "잠버릇 자세 성향 테스트에서 드러난 리듬 탐험형 성향입니다.",
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
    name: "실험 개척형",
    summary: "잠버릇 자세 성향 테스트에서 드러난 실험 개척형 성향입니다.",
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
    name: "시간 관리형",
    summary: "잠버릇 자세 성향 테스트에서 드러난 시간 관리형 성향입니다.",
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
    name: "함께 숙면형",
    summary: "잠버릇 자세 성향 테스트에서 드러난 함께 숙면형 성향입니다.",
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
    name: "컨디션 코치형",
    summary: "잠버릇 자세 성향 테스트에서 드러난 컨디션 코치형 성향입니다.",
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
    name: "성과 회복형",
    summary: "잠버릇 자세 성향 테스트에서 드러난 성과 회복형 성향입니다.",
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

export default function SleepPositionStyleResultPage() {
  return (
    <MBTIResultPage
      testId="sleep-position-style"
      title="잠버릇 자세 성향 테스트"
      results={RESULTS}
      accentClass="text-blue-600"
      gradientClass="from-blue-50 to-white"
    />
  )
}
