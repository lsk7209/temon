export type OptionTag = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";

export interface Question {
  id: number;
  text: string;
  options: { label: string; tag: OptionTag }[];
}

export const SNS_REACTION_STYLE_QUESTIONS: Question[] = [
  { id: 1, text: "친구의 인스타 스토리를 봤을 때?", options: [
    { label: "바로 댓글 달거나 답장 보냄", tag: "E" },
    { label: "조용히 보고 좋아요만 누름", tag: "I" } ] },
  { id: 2, text: "내 SNS 게시물 빈도는?", options: [
    { label: "주 2회 이상 일상 공유", tag: "E" },
    { label: "한 달에 1~2회, 의미 있을 때만", tag: "I" } ] },
  { id: 3, text: "DM이 오면?", options: [
    { label: "바로 확인하고 빠르게 답장", tag: "E" },
    { label: "여유 생길 때 천천히 답장", tag: "I" } ] },
  { id: 4, text: "사진 찍어서 올릴 때?", options: [
    { label: "있는 그대로 자연스럽게", tag: "S" },
    { label: "분위기·컨셉 잡아서 의미 부여", tag: "N" } ] },
  { id: 5, text: "팔로우하는 계정 유형은?", options: [
    { label: "친구·실생활 연결된 계정 위주", tag: "S" },
    { label: "관심 분야·영감 주는 계정 위주", tag: "N" } ] },
  { id: 6, text: "스토리 올릴 때?", options: [
    { label: "지금 뭐 하는지 그대로 공유", tag: "S" },
    { label: "감정·생각 담은 의미 있는 컨텐츠", tag: "N" } ] },
  { id: 7, text: "친구의 슬픈 게시물을 봤을 때?", options: [
    { label: "DM으로 상황 묻고 해결 도움 제안", tag: "T" },
    { label: "공감 메시지 먼저 보내서 위로", tag: "F" } ] },
  { id: 8, text: "악플이나 부정적 댓글을 봤을 때?", options: [
    { label: "논리적으로 반박하거나 무시", tag: "T" },
    { label: "기분 상해서 한참 영향 받음", tag: "F" } ] },
  { id: 9, text: "내 게시물에 좋아요가 적게 달릴 때?", options: [
    { label: "별 신경 안 씀, 객관적 콘텐츠 평가", tag: "T" },
    { label: "기분이 처지고 다음 게시물 망설여짐", tag: "F" } ] },
  { id: 10, text: "SNS 사용 시간은?", options: [
    { label: "하루 정해진 시간만 정기적으로", tag: "J" },
    { label: "심심할 때 즉흥적으로", tag: "P" } ] },
  { id: 11, text: "게시물 올리기 전 준비는?", options: [
    { label: "캡션·해시태그 미리 다 준비", tag: "J" },
    { label: "올리면서 즉흥적으로 작성", tag: "P" } ] },
  { id: 12, text: "프로필·테마 관리는?", options: [
    { label: "통일된 컨셉·색감 유지", tag: "J" },
    { label: "그때그때 자유롭게", tag: "P" } ] },
];
