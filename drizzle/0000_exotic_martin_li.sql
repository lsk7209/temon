CREATE TABLE `page_visits` (
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
--> statement-breakpoint
CREATE TABLE `questions` (
	`id` text PRIMARY KEY NOT NULL,
	`test_id` text NOT NULL,
	`question_order` integer NOT NULL,
	`question_text` text NOT NULL,
	`choice_1_text` text NOT NULL,
	`choice_1_tags` text NOT NULL,
	`choice_2_text` text NOT NULL,
	`choice_2_tags` text NOT NULL,
	FOREIGN KEY (`test_id`) REFERENCES `tests`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `result_types` (
	`id` text PRIMARY KEY NOT NULL,
	`test_id` text NOT NULL,
	`type_code` text NOT NULL,
	`label` text NOT NULL,
	`summary` text,
	`traits` text,
	`picks` text,
	`tips` text,
	`match_types` text,
	`emoji` text,
	FOREIGN KEY (`test_id`) REFERENCES `tests`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `test_results` (
	`id` text PRIMARY KEY NOT NULL,
	`test_id` text NOT NULL,
	`result_type` text NOT NULL,
	`answers` text NOT NULL,
	`user_ip` text,
	`user_agent` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`test_id`) REFERENCES `tests`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `test_starts` (
	`id` text PRIMARY KEY NOT NULL,
	`test_id` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`test_id`) REFERENCES `tests`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `test_stats` (
	`test_id` text PRIMARY KEY NOT NULL,
	`total_completions` integer DEFAULT 0 NOT NULL,
	`type_distribution` text,
	`avg_completion_time` real,
	`last_updated` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`test_id`) REFERENCES `tests`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `tests` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`subtitle` text,
	`description` text,
	`category` text,
	`status` text DEFAULT 'draft' NOT NULL,
	`question_count` integer DEFAULT 12 NOT NULL,
	`avg_minutes` integer DEFAULT 3 NOT NULL,
	`result_type_count` integer DEFAULT 16 NOT NULL,
	`metadata` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `tests_slug_unique` ON `tests` (`slug`);