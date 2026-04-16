
/**
 * 퀴즈 일괄 생성 스크립트
 * 
 * 사용법: node scripts/generate-quiz-batch.js
 * 
 * 정해진 50개 주제 리스트를 확인하고,
 * 아직 DB(test_queue, tests)에 없는 주제를 대기열에 등록합니다.
 */

const { createClient } = require('@libsql/client');
const dotenv = require('dotenv');
const path = require('path');
const { nanoid } = require('nanoid');

// Load env
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

if (!process.env.TURSO_DATABASE_URL) {
  console.error('TURSO_DATABASE_URL missing');
  process.exit(1);
}

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

// 50 Viral Quiz Topics
const viralTopics = [
  // 음식 & 식습관
  "햄버거 조합 스타일 테스트",
  "피자 토핑 선택 테스트",
  "국물 vs 비빔 스타일 테스트",
  "도시락 싸는 스타일 테스트",
  "찜닭 vs 치킨 선택 테스트",
  "케이크 자르는 스타일 테스트",
  "김밥 재료 선택 테스트",
  "찌개 vs 국물 스타일 테스트",
  "샐러드 드레싱 선택 테스트",
  "고기 굽는 스타일 테스트",

  // 일상생활 & 습관
  "샤워 습관 테스트",
  "침대 정리 스타일 테스트",
  "문 닫는 스타일 테스트",
  "화장실 사용 습관 테스트",
  "양말 신는 스타일 테스트",
  "옷 입는 순서 테스트",
  "지하철 vs 버스 선택 테스트",
  "가방 정리 스타일 테스트",
  "세탁 습관 테스트",
  "의자 앉는 스타일 테스트",
  "물 마시는 습관 테스트",
  "거울 보는 습관 테스트",

  // 디지털 & SNS
  "인스타그램 스토리 스타일 테스트",
  "게임 플레이 스타일 테스트",
  "알림 설정 스타일 테스트",
  "배경화면 선택 테스트",
  "메모 앱 사용 스타일 테스트",
  "플레이리스트 만들기 스타일 테스트",
  "사진 찍는 스타일 테스트",
  "채팅방 이름 짓기 스타일 테스트",

  // 관계 & 소통
  "선물 고르는 스타일 테스트",
  "생일 케이크 불 끄는 스타일 테스트",
  "포장지 뜯는 스타일 테스트",
  "악수 vs 인사 스타일 테스트",
  "노래방 곡 선택 스타일 테스트",
  "영화 고르는 스타일 테스트",
  "놀이공원 놀이기구 선택 테스트",
  "그림 그리는 스타일 테스트",

  // 취미 & 관심사
  "책 읽는 스타일 테스트",
  "취미 선택 스타일 테스트",
  "운동 스타일 테스트",
  "목표 설정 스타일 테스트",
  "페스티벌 가는 스타일 테스트",
  "취미방 꾸미기 스타일 테스트",
  "버킷리스트 작성 스타일 테스트",

  // 트렌드 & 밈
  "밈 반응 스타일 테스트",
  "챌린지 참여 스타일 테스트",
  "필터 선택 스타일 테스트",
  "해시태그 사용 스타일 테스트",
  "이모지 사용 스타일 테스트"
];

async function main() {
  console.log(`Checking ${viralTopics.length} topics against database...`);

  let addedCount = 0;
  let skippedCount = 0;

  for (const topic of viralTopics) {
    try {
      // 1. Check if exists in Tests (already generated)
      // Use LIKE for partial match as titles might slightly vary during generation
      const rsTests = await client.execute({
        sql: "SELECT id FROM tests WHERE title LIKE ?",
        args: [`%${topic}%`]
      });

      if (rsTests.rows.length > 0) {
        console.log(`[SKIP] Already in Tests: ${topic}`);
        skippedCount++;
        continue;
      }

      // 2. Check if exists in Queue (pending/processing/completed)
      const rsQueue = await client.execute({
        sql: "SELECT id FROM test_queue WHERE keyword = ?",
        args: [topic]
      });

      if (rsQueue.rows.length > 0) {
        console.log(`[SKIP] Already in Queue: ${topic}`);
        skippedCount++;
        continue;
      }

      // 3. Add to Queue
      await client.execute({
        sql: "INSERT INTO test_queue (id, keyword, status, created_at) VALUES (?, ?, ?, ?)",
        args: [nanoid(), topic, 'pending', Date.now()]
      });

      console.log(`[ADD] Added to Queue: ${topic}`);
      addedCount++;

    } catch (e) {
      console.error(`Error processing topic '${topic}':`, e);
    }
  }

  console.log(`\nSummary:`);
  console.log(`- Added: ${addedCount}`);
  console.log(`- Skipped: ${skippedCount}`);
  console.log(`- Total Checked: ${viralTopics.length}`);
}

main();
