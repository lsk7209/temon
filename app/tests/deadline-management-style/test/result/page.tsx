"use client"

import { MBTIResultPage } from "@/components/mbti-result-page"

const RESULTS = {
  ISTJ: {
    mbti: "ISTJ",
    name: "일정 준수형",
    summary: "마감 관리 성향 테스트에서 드러난 일정 준수형 성향입니다.",
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
    name: "안정 지원형",
    summary: "마감 관리 성향 테스트에서 드러난 안정 지원형 성향입니다.",
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
    name: "흐름 조율형",
    summary: "마감 관리 성향 테스트에서 드러난 흐름 조율형 성향입니다.",
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
    name: "전략 설계형",
    summary: "마감 관리 성향 테스트에서 드러난 전략 설계형 성향입니다.",
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
    name: "문제 해결형",
    summary: "마감 관리 성향 테스트에서 드러난 문제 해결형 성향입니다.",
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
    name: "몰입 완성형",
    summary: "마감 관리 성향 테스트에서 드러난 몰입 완성형 성향입니다.",
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
    name: "의미 추진형",
    summary: "마감 관리 성향 테스트에서 드러난 의미 추진형 성향입니다.",
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
    name: "구조 개선형",
    summary: "마감 관리 성향 테스트에서 드러난 구조 개선형 성향입니다.",
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
    name: "스퍼트 실행형",
    summary: "마감 관리 성향 테스트에서 드러난 스퍼트 실행형 성향입니다.",
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
    summary: "마감 관리 성향 테스트에서 드러난 에너지 환기형 성향입니다.",
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
    name: "아이디어 가속형",
    summary: "마감 관리 성향 테스트에서 드러난 아이디어 가속형 성향입니다.",
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
    name: "대안 전환형",
    summary: "마감 관리 성향 테스트에서 드러난 대안 전환형 성향입니다.",
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
    name: "통제 리더형",
    summary: "마감 관리 성향 테스트에서 드러난 통제 리더형 성향입니다.",
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
    name: "커뮤니케이션형",
    summary: "마감 관리 성향 테스트에서 드러난 커뮤니케이션형 성향입니다.",
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
    name: "동기 부여형",
    summary: "마감 관리 성향 테스트에서 드러난 동기 부여형 성향입니다.",
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
    name: "결과 지휘형",
    summary: "마감 관리 성향 테스트에서 드러난 결과 지휘형 성향입니다.",
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

export default function DeadlineManagementStyleResultPage() {
  return (
    <MBTIResultPage
      testId="deadline-management-style"
      title="마감 관리 성향 테스트"
      results={RESULTS}
      accentClass="text-green-600"
      gradientClass="from-green-50 to-white"
    />
  )
}
