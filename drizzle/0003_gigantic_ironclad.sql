PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_bot_config` (
	`id` integer PRIMARY KEY DEFAULT 1 NOT NULL,
	`log_channel_id` text NOT NULL,
	CONSTRAINT "bot_config" CHECK("__new_bot_config"."id" = 1)
);
--> statement-breakpoint
INSERT INTO `__new_bot_config`("id", "log_channel_id") SELECT "id", "log_channel_id" FROM `bot_config`;--> statement-breakpoint
DROP TABLE `bot_config`;--> statement-breakpoint
ALTER TABLE `__new_bot_config` RENAME TO `bot_config`;--> statement-breakpoint
PRAGMA foreign_keys=ON;