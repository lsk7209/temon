#!/usr/bin/env node

/**
 * Git 자동 커밋 및 푸시 스크립트 (자동 모드)
 * 커밋 메시지 없이 자동으로 업로드합니다.
 */

const { execSync } = require('child_process');

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

function main() {
  console.log('🚀 GitHub 자동 업로드 시작 (자동 모드)...\n');

  // 1. Git 상태 확인
  console.log('📋 변경사항 확인 중...');
  const statusOutput = execSync('git status --porcelain', { encoding: 'utf8' });
  
  if (!statusOutput.trim()) {
    console.log('✅ 커밋할 변경사항이 없습니다.');
    return;
  }

  // 2. 변경된 파일 표시
  console.log('\n📝 변경된 파일:');
  execCommand('git status -s');

  // 3. 자동 커밋 메시지 생성 (변경된 파일 기반)
  const timestamp = new Date().toLocaleString('ko-KR');
  
  // 변경된 파일 목록 가져오기
  const changedFiles = execSync('git diff --cached --name-only', { encoding: 'utf8' }).trim().split('\n').filter(Boolean);
  const changedFilesSummary = changedFiles.length > 0 
    ? `\n\n변경된 파일: ${changedFiles.length}개` 
    : '';
  
  const commitMessage = `SEO 개선 및 sitemap.xml 생성 완료 - ${timestamp}${changedFilesSummary}`;

  // 4. 모든 변경사항 추가
  console.log('\n📦 변경사항 스테이징 중...');
  const addResult = execCommand('git add .');
  if (!addResult.success) {
    console.error('❌ git add 실패');
    process.exit(1);
  }

  // 5. 커밋
  console.log('💾 커밋 중...');
  const commitResult = execCommand(`git commit -m "${commitMessage}"`);
  if (!commitResult.success) {
    console.error('❌ 커밋 실패');
    process.exit(1);
  }

  // 6. 현재 브랜치 확인
  const branchOutput = execSync('git branch --show-current', { encoding: 'utf8' });
  const currentBranch = branchOutput.trim() || 'main';

  // 7. 푸시
  console.log(`\n📤 ${currentBranch} 브랜치로 푸시 중...`);
  const pushResult = execCommand(`git push origin ${currentBranch}`);
  if (!pushResult.success) {
    console.error('❌ 푸시 실패');
    process.exit(1);
  }

  console.log('\n✅ GitHub 업로드 완료!');
  console.log(`🔗 https://github.com/lsk7209/temon`);
}

main();

