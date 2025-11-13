/**
 * 퀴즈 일괄 생성 스크립트
 * 
 * 사용법: node scripts/generate-quiz-batch.js
 * 
 * 우선순위가 높은 퀴즈부터 순차적으로 생성합니다.
 * 각 퀴즈마다 인트로, 테스트, 결과 페이지를 생성합니다.
 */

const fs = require('fs');
const path = require('path');

// 퀴즈 목록 (우선순위 순)
const quizList = [
  { id: 'pizza-topping', title: '피자 토핑 선택', emoji: '🍕', category: '음식', color: 'from-red-500 to-orange-500' },
  { id: 'instagram-story', title: '인스타그램 스토리 스타일', emoji: '📸', category: '엔터테인먼트', color: 'from-pink-500 to-purple-500' },
  { id: 'shower-habit', title: '샤워 습관', emoji: '🚿', category: '생활', color: 'from-blue-500 to-cyan-500' },
  { id: 'gift-wrapping', title: '포장지 뜯는 스타일', emoji: '🎁', category: '생활', color: 'from-yellow-500 to-orange-500' },
  { id: 'karaoke-song', title: '노래방 곡 선택', emoji: '🎤', category: '엔터테인먼트', color: 'from-pink-500 to-red-500' },
  // ... 나머지 25개
];

console.log('퀴즈 일괄 생성 스크립트 준비 완료');
console.log(`총 ${quizList.length}개 퀴즈 생성 예정`);

