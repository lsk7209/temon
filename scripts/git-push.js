#!/usr/bin/env node

/**
 * Git 자동 커밋 및 푸시 스크립트
 * 개발 완료 후 변경사항을 자동으로 GitHub에 업로드합니다.
 */

const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

function execCommand(command, options = {}) {
  try {
    const output = execSync(command, { 
      encoding: 'utf8',
      stdio: 'inherit',
      ...options 
    });
    return { success: true, output };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function main() {
  console.log('🚀 GitHub 자동 업로드 시작...\n');

  // 1. Git 상태 확인
  console.log('📋 변경사항 확인 중...');
  const statusResult = execCommand('git status --porcelain');
  
  if (statusResult.success && !statusResult.output) {
    console.log('✅ 커밋할 변경사항이 없습니다.');
    rl.close();
    return;
  }

  // 2. 변경된 파일 표시
  console.log('\n📝 변경된 파일:');
  execCommand('git status -s');

  // 3. 커밋 메시지 입력
  console.log('\n');
  const commitMessage = await question('💬 커밋 메시지를 입력하세요 (기본: "개발 완료"): ') || '개발 완료';

  // 4. 모든 변경사항 추가
  console.log('\n📦 변경사항 스테이징 중...');
  const addResult = execCommand('git add .');
  if (!addResult.success) {
    console.error('❌ git add 실패');
    rl.close();
    process.exit(1);
  }

  // 5. 커밋
  console.log('💾 커밋 중...');
  const commitResult = execCommand(`git commit -m "${commitMessage}"`);
  if (!commitResult.success) {
    console.error('❌ 커밋 실패');
    rl.close();
    process.exit(1);
  }

  // 6. 현재 브랜치 확인
  const branchResult = execCommand('git branch --show-current', { encoding: 'utf8' });
  const currentBranch = branchResult.output?.trim() || 'main';

  // 7. 푸시
  console.log(`\n📤 ${currentBranch} 브랜치로 푸시 중...`);
  const pushResult = execCommand(`git push origin ${currentBranch}`);
  if (!pushResult.success) {
    console.error('❌ 푸시 실패');
    rl.close();
    process.exit(1);
  }

  console.log('\n✅ GitHub 업로드 완료!');
  console.log(`🔗 https://github.com/lsk7209/temon`);
  
  rl.close();
}

main().catch(error => {
  console.error('❌ 오류 발생:', error);
  rl.close();
  process.exit(1);
});

