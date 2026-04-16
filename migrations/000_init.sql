-- Cloudflare D1 Analytics 스키마 초기화
-- 실행: wrangler d1 migrations apply temon-analytics

CREATE TABLE IF NOT EXISTS session (
  session_id TEXT PRIMARY KEY,
  anonymous_id TEXT,
  started_at INTEGER NOT NULL,
  ended_at INTEGER,
  device TEXT,
  os TEXT,
  browser TEXT,
  browser_ver TEXT,
  viewport_w INTEGER,
  viewport_h INTEGER,
  country TEXT,
  region TEXT,
  city TEXT
);

CREATE TABLE IF NOT EXISTS page_view (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT NOT NULL,
  occurred_at INTEGER NOT NULL,
  path TEXT,
  referrer_host TEXT,
  referrer_path TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,
  FOREIGN KEY(session_id) REFERENCES session(session_id)
);

CREATE TABLE IF NOT EXISTS attempt (
  attempt_id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL,
  quiz_id TEXT,
  started_at INTEGER NOT NULL,
  completed_at INTEGER,
  abandoned_at INTEGER,
  abandon_reason TEXT,
  FOREIGN KEY(session_id) REFERENCES session(session_id)
);

CREATE TABLE IF NOT EXISTS attempt_section (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  attempt_id TEXT NOT NULL,
  section_index INTEGER NOT NULL,
  entered_at INTEGER NOT NULL,
  left_at INTEGER,
  FOREIGN KEY(attempt_id) REFERENCES attempt(attempt_id)
);

CREATE TABLE IF NOT EXISTS web_vitals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT,
  occurred_at INTEGER NOT NULL,
  lcp REAL,
  fid REAL,
  cls REAL,
  ttfb REAL
);

CREATE TABLE IF NOT EXISTS http_error (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  occurred_at INTEGER NOT NULL,
  path TEXT,
  status INTEGER,
  latency_ms INTEGER
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_pv_time ON page_view(occurred_at);
CREATE INDEX IF NOT EXISTS idx_attempt_started ON attempt(started_at);
CREATE INDEX IF NOT EXISTS idx_attempt_completed ON attempt(completed_at);
CREATE INDEX IF NOT EXISTS idx_attempt_abandoned ON attempt(abandoned_at);
CREATE INDEX IF NOT EXISTS idx_session_browser ON session(browser, browser_ver);
CREATE INDEX IF NOT EXISTS idx_pv_utm ON page_view(utm_source, utm_medium, utm_campaign);
CREATE INDEX IF NOT EXISTS idx_attempt_quiz ON attempt(quiz_id);
CREATE INDEX IF NOT EXISTS idx_session_country ON session(country);

