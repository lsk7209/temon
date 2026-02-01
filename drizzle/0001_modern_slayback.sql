CREATE TABLE `test_queue` (
	`id` text PRIMARY KEY NOT NULL,
	`keyword` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`processed_at` integer,
	`logs` text
);
--> statement-breakpoint
ALTER TABLE `tests` ADD `published_at` integer;