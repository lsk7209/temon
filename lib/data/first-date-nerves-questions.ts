/**
 * 첫 데이트 긴장 테스트 질문 데이터.
 * 12문항, MBTI E/I · S/N · T/F · J/P 축 각 3문항.
 */

export type OptionTag = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";

export interface Question {
  id: number;
  text: string;
  options: { label: string; tag: OptionTag }[];
}

export const FIRST_DATE_NERVES_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "약속 장소에 도착해 상대를 기다릴 때",
    options: [
      { label: "주변 사람·풍경 구경하면서 기다림", tag: "E" },
      { label: "폰 보면서 들키지 않게 호흡 정리", tag: "I" },
    ],
  },
  {
    id: 2,
    text: "처음 마주친 순간 첫 마디는?",
    options: [
      { label: "오시느라 안 막혔어요? 자연스럽게 먼저", tag: "E" },
      { label: "어색한 미소만, 상대가 말 걸 때까지 대기", tag: "I" },
    ],
  },
  {
    id: 3,
    text: "대화가 잠시 끊겼을 때 내 반응?",
    options: [
      { label: "뭐라도 던져서 흐름 다시 살림", tag: "E" },
      { label: "잠깐의 침묵을 그냥 두고 음식·메뉴로 시선", tag: "I" },
    ],
  },
  {
    id: 4,
    text: "데이트 장소를 제안받았을 때 가장 먼저 확인하는 것?",
    options: [
      { label: "위치·메뉴·예산 같은 구체 정보", tag: "S" },
      { label: "이 장소가 우리 분위기에 맞을지 상상", tag: "N" },
    ],
  },
  {
    id: 5,
    text: "전날 밤 옷 고를 때 기준?",
    options: [
      { label: "날씨·이동 거리 고려한 실용 조합", tag: "S" },
      { label: "오늘 보이고 싶은 이미지 컨셉부터", tag: "N" },
    ],
  },
  {
    id: 6,
    text: "데이트 중 상대가 말한 어떤 디테일이 머릿속에 남나?",
    options: [
      { label: "구체적 일화·취미·요즘 본 것", tag: "S" },
      { label: "말투·표정 뒤에 보이는 가치관·성향", tag: "N" },
    ],
  },
  {
    id: 7,
    text: "상대가 약속 시간에 늦었다고 사과하면?",
    options: [
      { label: "괜찮은지 사실 확인 → 다음 일정 조정", tag: "T" },
      { label: "마음 쓰여서 미리 사과해주는 게 고마움", tag: "F" },
    ],
  },
  {
    id: 8,
    text: "취향이 안 맞는 메뉴를 상대가 골랐을 때",
    options: [
      { label: "가볍게 다른 옵션 제안, 합리적 절충", tag: "T" },
      { label: "분위기 깨질까봐 일단 맞춰서 먹음", tag: "F" },
    ],
  },
  {
    id: 9,
    text: "상대가 자신의 힘들었던 일을 털어놓으면",
    options: [
      { label: "원인·해결 방향 함께 정리해줌", tag: "T" },
      { label: "마음이 어땠을지 공감 먼저 표현", tag: "F" },
    ],
  },
  {
    id: 10,
    text: "데이트 코스 결정은 누가?",
    options: [
      { label: "내가 동선·예약·플랜 B까지 다 짜둠", tag: "J" },
      { label: "당일 분위기 보고 즉흥으로 정함", tag: "P" },
    ],
  },
  {
    id: 11,
    text: "헤어진 직후 다음 만남 약속은?",
    options: [
      { label: "그 자리에서 날짜·장소까지 잡음", tag: "J" },
      { label: "일단 톡으로 이어가다 자연스럽게", tag: "P" },
    ],
  },
  {
    id: 12,
    text: "데이트 끝나고 돌아오는 길 머릿속은?",
    options: [
      { label: "오늘 좋았던 점·다음에 보완할 점 정리", tag: "J" },
      { label: "그냥 좋았던 장면들 흐릿하게 회상", tag: "P" },
    ],
  },
];
