ALTER TABLE `visa_application` RENAME TO `visa_applications`;--> statement-breakpoint
ALTER TABLE `visa_application_categories` RENAME TO `visa_applications_categories`;--> statement-breakpoint
CREATE TABLE `visa_category` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
DROP TABLE `visa_categories`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_visa_applications` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`request` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_visa_applications`("id", "user_id", "request", "created_at", "updated_at") SELECT "id", "user_id", "request", "created_at", "updated_at" FROM `visa_applications`;--> statement-breakpoint
DROP TABLE `visa_applications`;--> statement-breakpoint
ALTER TABLE `__new_visa_applications` RENAME TO `visa_applications`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_visa_applications_categories` (
	`id` text PRIMARY KEY NOT NULL,
	`visa_application_id` text NOT NULL,
	`visa_category_id` integer NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`visa_application_id`) REFERENCES `visa_applications`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`visa_category_id`) REFERENCES `visa_category`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_visa_applications_categories`("id", "visa_application_id", "visa_category_id", "created_at", "updated_at") SELECT "id", "visa_application_id", "visa_category_id", "created_at", "updated_at" FROM `visa_applications_categories`;--> statement-breakpoint
DROP TABLE `visa_applications_categories`;--> statement-breakpoint
ALTER TABLE `__new_visa_applications_categories` RENAME TO `visa_applications_categories`;