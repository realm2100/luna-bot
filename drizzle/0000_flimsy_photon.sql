CREATE TABLE `guild_configs` (
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`guild_id` text PRIMARY KEY NOT NULL,
	`updated_at` integer DEFAULT (unixepoch() * 1000) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `user_configs` (
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`locale` text DEFAULT 'en-US' NOT NULL,
	`updated_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`user_id` text PRIMARY KEY NOT NULL
);
