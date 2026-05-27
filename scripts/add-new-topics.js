/**
 * 신규 테스트 50개 토픽 대기열 등록
 *
 * 사용법: node scripts/add-new-topics.js
 *
 * 기존 180+ 정적 테스트 및 generate-quiz-batch.js 50개와 중복 없는 새 주제
 * SEO/GEO/AEO 최적화 고려 — 네이버·다음·구글 노출 타겟
 */

const { createClient } = require("@libsql/client");
const dotenv = require("dotenv");
const path = require("path");
const { nanoid } = require("nanoid");

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

if (!process.env.TURSO_DATABASE_URL) {
  console.error("TURSO_DATABASE_URL missing");
  process.exit(1);
}

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

// 기존 정적 테스트·배치 50개와 중복되지 않는 신규 50개 주제
// 카테고리: 직장/학교, 연애/관계, 소비/라이프, 엔터, SNS, 심리, 계절, MZ트렌드, 일상재발견
const newTopics = [
  // 직장·사무실 (6)
  "회의 중 내 행동 스타일 테스트",
  "회식 자리 유형 테스트",
  "업무 마감일 대처 스타일 테스트",
  "직장 동료와 소통 스타일 테스트",
  "재택근무 루틴 스타일 테스트",
  "점심 혼밥 vs 같이 먹기 스타일 테스트",

  // 학교·공부 (4)
  "시험 전날 대처 스타일 테스트",
  "수업 시간 필기 스타일 테스트",
  "조별과제 참여 스타일 테스트",
  "발표 준비 스타일 테스트",

  // 연애·관계 (6)
  "첫 데이트 장소 선택 스타일 테스트",
  "커플 여행 계획 스타일 테스트",
  "사랑 표현 방식 테스트",
  "친구 관계 유지 스타일 테스트",
  "SNS 연인 공개 스타일 테스트",
  "썸 탈 때 연락 스타일 테스트",

  // 소비·라이프스타일 (6)
  "중고마켓 이용 스타일 테스트",
  "구독 서비스 선택 스타일 테스트",
  "전자기기 구매 스타일 테스트",
  "세일 기간 쇼핑 스타일 테스트",
  "인테리어·방 꾸미기 스타일 테스트",
  "지갑 속 영수증 처리 스타일 테스트",

  // 집·일상 (5)
  "냉장고 정리 스타일 테스트",
  "물건 버리는 스타일 테스트",
  "이사 짐 싸는 스타일 테스트",
  "충전기 관리 스타일 테스트",
  "택배 받는 스타일 테스트",

  // 엔터테인먼트 (5)
  "웹툰 읽는 스타일 테스트",
  "스포츠 경기 관람 스타일 테스트",
  "콘서트·공연 관람 스타일 테스트",
  "전시회·박물관 관람 스타일 테스트",
  "보드게임·오락 스타일 테스트",

  // SNS·디지털 (5)
  "유튜브 댓글 달기 스타일 테스트",
  "카카오톡 단체방 행동 스타일 테스트",
  "트위터·X 사용 스타일 테스트",
  "블로그·브런치 글쓰기 스타일 테스트",
  "온라인 쇼핑 리뷰 작성 스타일 테스트",

  // 심리·성격 (4)
  "갈등 상황 대처 스타일 테스트",
  "스트레스 해소 방법 테스트",
  "칭찬과 비판 반응 스타일 테스트",
  "낯선 환경 적응 스타일 테스트",

  // 계절·날씨 (4)
  "비 오는 날 기분 스타일 테스트",
  "여름 더위 대처 스타일 테스트",
  "겨울 난방 스타일 테스트",
  "봄 꽃구경 스타일 테스트",

  // MZ 트렌드 (5)
  "갓생 루틴 유형 테스트",
  "미니멀 라이프 실천 스타일 테스트",
  "디지털 디톡스 스타일 테스트",
  "무지출 챌린지 대처 스타일 테스트",
  "FIRE족 성향 테스트",
];

async function main() {
  console.log(`\n총 ${newTopics.length}개 신규 토픽 처리 시작...\n`);

  let addedCount = 0;
  let skippedCount = 0;

  for (const topic of newTopics) {
    try {
      // 1. tests 테이블 중복 확인
      const rsTests = await client.execute({
        sql: "SELECT id FROM tests WHERE title LIKE ?",
        args: [`%${topic}%`],
      });

      if (rsTests.rows.length > 0) {
        console.log(`[SKIP-DB] ${topic}`);
        skippedCount++;
        continue;
      }

      // 2. test_queue 중복 확인
      const rsQueue = await client.execute({
        sql: "SELECT id FROM test_queue WHERE keyword = ?",
        args: [topic],
      });

      if (rsQueue.rows.length > 0) {
        console.log(`[SKIP-Q] ${topic}`);
        skippedCount++;
        continue;
      }

      // 3. 대기열 등록
      await client.execute({
        sql: "INSERT INTO test_queue (id, keyword, status, created_at) VALUES (?, ?, ?, ?)",
        args: [nanoid(), topic, "pending", Date.now()],
      });

      console.log(`[ADD] ${topic}`);
      addedCount++;
    } catch (e) {
      console.error(`[ERROR] ${topic}:`, e.message);
    }
  }

  console.log(`\n────────────────────────────`);
  console.log(`추가: ${addedCount}개`);
  console.log(`스킵: ${skippedCount}개`);
  console.log(`────────────────────────────`);
  console.log(`\n✅ 완료! 대기열에 ${addedCount}개 등록됨.`);
  console.log(`   크론(매시간) → 생성 / 하루 2회(08:00, 20:00) → 공개`);
  console.log(`   50개 기준: 약 50시간 생성 → 25일치 콘텐츠 확보\n`);

  process.exit(0);
}

main();
