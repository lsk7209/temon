-- Add page_visits table
CREATE TABLE IF NOT EXISTS `page_visits` (
  `id` text PRIMARY KEY NOT NULL,
  `path` text NOT NULL,
  `referrer` text,
  `search_keyword` text,
  `ip_address` text,
  `user_agent` text,
  `device_type` text,
  `browser` text,
  `os` text,
  `created_at` integer DEFAULT (unixepoch()) NOT NULL
);

-- Add test_starts table
CREATE TABLE IF NOT EXISTS `test_starts` (
  `id` text PRIMARY KEY NOT NULL,
  `test_id` text NOT NULL REFERENCES `tests`(`id`),
  `created_at` integer DEFAULT (unixepoch()) NOT NULL
);
