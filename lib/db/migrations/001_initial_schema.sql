-- Cloudflare D1 초기 스키마 마이그레이션
-- 실행: wrangler d1 execute temon-db --file=lib/db/migrations/001_initial_schema.sql

-- 테스트 메타데이터
CREATE TABLE IF NOT EXISTS tests (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  category TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  question_count INTEGER NOT NULL DEFAULT 12,
  avg_minutes INTEGER NOT NULL DEFAULT 3,
  result_type_count INTEGER NOT NULL DEFAULT 16,
  metadata TEXT, -- JSON
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  updated_at INTEGER NOT NULL DEFAULT (unixepoch())
);

-- 질문 데이터
CREATE TABLE IF NOT EXISTS questions (
  id TEXT PRIMARY KEY,
  test_id TEXT NOT NULL,
  question_order INTEGER NOT NULL,
  question_text TEXT NOT NULL,
  choice_1_text TEXT NOT NULL,
  choice_1_tags TEXT NOT NULL, -- JSON array
  choice_2_text TEXT NOT NULL,
  choice_2_tags TEXT NOT NULL, -- JSON array
  FOREIGN KEY (test_id) REFERENCES tests(id) ON DELETE CASCADE
);

-- 결과 타입 데이터
CREATE TABLE IF NOT EXISTS result_types (
  id TEXT PRIMARY KEY,
  test_id TEXT NOT NULL,
  type_code TEXT NOT NULL,
  label TEXT NOT NULL,
  summary TEXT,
  traits TEXT, -- JSON array
  picks TEXT, -- JSON array (optional)
  tips TEXT, -- JSON array
  match_types TEXT,
  emoji TEXT,
  FOREIGN KEY (test_id) REFERENCES tests(id) ON DELETE CASCADE,
  UNIQUE(test_id, type_code)
);

-- 테스트 결과 저장
CREATE TABLE IF NOT EXISTS test_results (
  id TEXT PRIMARY KEY,
  test_id TEXT NOT NULL,
  result_type TEXT NOT NULL,
  answers TEXT NOT NULL, -- JSON array
  user_ip TEXT,
  user_agent TEXT,
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  FOREIGN KEY (test_id) REFERENCES tests(id)
);

-- 통계 집계
CREATE TABLE IF NOT EXISTS test_stats (
  test_id TEXT PRIMARY KEY,
  total_completions INTEGER NOT NULL DEFAULT 0,
  type_distribution TEXT, -- JSON
  avg_completion_time REAL,
  last_updated INTEGER NOT NULL DEFAULT (unixepoch()),
  FOREIGN KEY (test_id) REFERENCES tests(id)
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_tests_slug ON tests(slug);
CREATE INDEX IF NOT EXISTS idx_tests_status ON tests(status);
CREATE INDEX IF NOT EXISTS idx_tests_category ON tests(category);
CREATE INDEX IF NOT EXISTS idx_questions_test_id ON questions(test_id);
CREATE INDEX IF NOT EXISTS idx_result_types_test_id ON result_types(test_id);
CREATE INDEX IF NOT EXISTS idx_result_types_type_code ON result_types(type_code);
CREATE INDEX IF NOT EXISTS idx_test_results_test_id ON test_results(test_id);
CREATE INDEX IF NOT EXISTS idx_test_results_created_at ON test_results(created_at);

