"use client"

import { MBTIResultPage } from "@/components/mbti-result-page"

const RESULTS = {
  ISTJ: {
    mbti: "ISTJ",
    name: "루틴 플레이형",
    summary: "집중 음악 취향 테스트에서 드러난 루틴 플레이형 성향입니다.",
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
    name: "안정 리듬형",
    summary: "집중 음악 취향 테스트에서 드러난 안정 리듬형 성향입니다.",
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
    name: "감정 정렬형",
    summary: "집중 음악 취향 테스트에서 드러난 감정 정렬형 성향입니다.",
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
    name: "몰입 최적형",
    summary: "집중 음악 취향 테스트에서 드러난 몰입 최적형 성향입니다.",
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
    name: "저자극 실용형",
    summary: "집중 음악 취향 테스트에서 드러난 저자극 실용형 성향입니다.",
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
    name: "감성 몰입형",
    summary: "집중 음악 취향 테스트에서 드러난 감성 몰입형 성향입니다.",
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
    name: "서사 공감형",
    summary: "집중 음악 취향 테스트에서 드러난 서사 공감형 성향입니다.",
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
    name: "구조 집중형",
    summary: "집중 음악 취향 테스트에서 드러난 구조 집중형 성향입니다.",
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
    name: "비트 추진형",
    summary: "집중 음악 취향 테스트에서 드러난 비트 추진형 성향입니다.",
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
    name: "에너지 환기형",
    summary: "집중 음악 취향 테스트에서 드러난 에너지 환기형 성향입니다.",
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
    name: "무드 확장형",
    summary: "집중 음악 취향 테스트에서 드러난 무드 확장형 성향입니다.",
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
    name: "장르 실험형",
    summary: "집중 음악 취향 테스트에서 드러난 장르 실험형 성향입니다.",
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
    name: "성과 동기형",
    summary: "집중 음악 취향 테스트에서 드러난 성과 동기형 성향입니다.",
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
    name: "함께 집중형",
    summary: "집중 음악 취향 테스트에서 드러난 함께 집중형 성향입니다.",
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
    name: "분위기 리더형",
    summary: "집중 음악 취향 테스트에서 드러난 분위기 리더형 성향입니다.",
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
    name: "목표 가속형",
    summary: "집중 음악 취향 테스트에서 드러난 목표 가속형 성향입니다.",
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

export default function FocusMusicStyleResultPage() {
  return (
    <MBTIResultPage
      testId="focus-music-style"
      title="집중 음악 취향 테스트"
      results={RESULTS}
      accentClass="text-blue-600"
      gradientClass="from-blue-50 to-white"
    />
  )
}
