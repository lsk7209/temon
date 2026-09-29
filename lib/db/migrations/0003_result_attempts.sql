-- 0003: result save idempotency (additive only, no existing row changes)
-- Apply to production only with separate approval. Rollback: DROP TABLE result_attempts;
-- The application falls back to legacy non-idempotent saves while this table is absent.
CREATE TABLE IF NOT EXISTS result_attempts (
  attempt_id TEXT PRIMARY KEY NOT NULL,
  payload_digest TEXT NOT NULL,
  result_id TEXT NOT NULL REFERENCES test_results(id) ON DELETE CASCADE,
  created_at INTEGER NOT NULL DEFAULT (unixepoch())
);
CREATE INDEX IF NOT EXISTS idx_result_attempts_result_id ON result_attempts(result_id);
