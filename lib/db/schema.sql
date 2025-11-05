-- 테몬 MBTI 플랫폼 데이터베이스 스키마
-- Cloudflare D1 (SQLite) 호환

-- 테스트 결과 테이블
CREATE TABLE IF NOT EXISTS test_results (
  id TEXT PRIMARY KEY,
  test_id TEXT NOT NULL,
  result_type TEXT NOT NULL,
  answers TEXT NOT NULL, -- JSON 문자열
  user_agent TEXT,
  ip_address TEXT,
  created_at INTEGER NOT NULL DEFAULT (unixepoch())
);

-- 테스트 통계 테이블 (일일 집계)
CREATE TABLE IF NOT EXISTS test_stats (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  test_id TEXT NOT NULL,
  date TEXT NOT NULL, -- YYYY-MM-DD 형식
  started_count INTEGER DEFAULT 0,
  completed_count INTEGER DEFAULT 0,
  result_counts TEXT, -- JSON 문자열: {"ENFP": 10, "INFP": 5, ...}
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  updated_at INTEGER NOT NULL DEFAULT (unixepoch()),
  UNIQUE(test_id, date)
);

-- 페이지 방문 로그
CREATE TABLE IF NOT EXISTS page_visits (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  pathname TEXT NOT NULL,
  user_agent TEXT,
  referrer TEXT,
  ip_address TEXT,
  visited_at INTEGER NOT NULL DEFAULT (unixepoch())
);

-- 테스트 시작 로그
CREATE TABLE IF NOT EXISTS test_starts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  test_id TEXT NOT NULL,
  session_id TEXT,
  started_at INTEGER NOT NULL DEFAULT (unixepoch())
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_test_results_test_id ON test_results(test_id);
CREATE INDEX IF NOT EXISTS idx_test_results_created_at ON test_results(created_at);
CREATE INDEX IF NOT EXISTS idx_test_stats_test_id_date ON test_stats(test_id, date);
CREATE INDEX IF NOT EXISTS idx_page_visits_pathname ON page_visits(pathname);
CREATE INDEX IF NOT EXISTS idx_page_visits_visited_at ON page_visits(visited_at);
CREATE INDEX IF NOT EXISTS idx_test_starts_test_id ON test_starts(test_id);
CREATE INDEX IF NOT EXISTS idx_test_starts_started_at ON test_starts(started_at);

