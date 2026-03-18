CREATE TABLE `anonymous_messages` (
	`author_id` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`message_id` text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
DROP TABLE `guild_configs`;--> statement-breakpoint
DROP TABLE `user_configs`;