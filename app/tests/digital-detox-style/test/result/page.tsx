"use client"

import { MBTIResultPage } from "@/components/mbti-result-page"

const RESULTS = {
  ISTJ: {
    mbti: "ISTJ",
    name: "규칙 실천형",
    summary: "디지털 디톡스 성향 테스트에서 드러난 규칙 실천형 성향입니다.",
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
    name: "균형 돌봄형",
    summary: "디지털 디톡스 성향 테스트에서 드러난 균형 돌봄형 성향입니다.",
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
    name: "내면 정리형",
    summary: "디지털 디톡스 성향 테스트에서 드러난 내면 정리형 성향입니다.",
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
    name: "시스템 차단형",
    summary: "디지털 디톡스 성향 테스트에서 드러난 시스템 차단형 성향입니다.",
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
    name: "기능 최소형",
    summary: "디지털 디톡스 성향 테스트에서 드러난 기능 최소형 성향입니다.",
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
    name: "감성 회복형",
    summary: "디지털 디톡스 성향 테스트에서 드러난 감성 회복형 성향입니다.",
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
    name: "의미 전환형",
    summary: "디지털 디톡스 성향 테스트에서 드러난 의미 전환형 성향입니다.",
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
    summary: "디지털 디톡스 성향 테스트에서 드러난 패턴 분석형 성향입니다.",
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
    name: "행동 전환형",
    summary: "디지털 디톡스 성향 테스트에서 드러난 행동 전환형 성향입니다.",
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
    name: "관계 재충전형",
    summary: "디지털 디톡스 성향 테스트에서 드러난 관계 재충전형 성향입니다.",
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
    name: "루틴 재설계형",
    summary: "디지털 디톡스 성향 테스트에서 드러난 루틴 재설계형 성향입니다.",
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
    name: "실험 디톡스형",
    summary: "디지털 디톡스 성향 테스트에서 드러난 실험 디톡스형 성향입니다.",
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
    name: "목표 통제형",
    summary: "디지털 디톡스 성향 테스트에서 드러난 목표 통제형 성향입니다.",
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
    name: "함께 실천형",
    summary: "디지털 디톡스 성향 테스트에서 드러난 함께 실천형 성향입니다.",
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
    name: "동기 확산형",
    summary: "디지털 디톡스 성향 테스트에서 드러난 동기 확산형 성향입니다.",
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
    name: "성과 최적형",
    summary: "디지털 디톡스 성향 테스트에서 드러난 성과 최적형 성향입니다.",
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

export default function DigitalDetoxStyleResultPage() {
  return (
    <MBTIResultPage
      testId="digital-detox-style"
      title="디지털 디톡스 성향 테스트"
      results={RESULTS}
      accentClass="text-green-600"
      gradientClass="from-green-50 to-white"
    />
  )
}
