PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_visa_applications` (
	`id` text PRIMARY KEY NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`email` text NOT NULL,
	`additional_details` text NOT NULL,
	`status_id` text NOT NULL,
	`citizenship_id` text,
	`resume_blob` blob NOT NULL,
	`resume_file_type` text NOT NULL,
	`resume_file_name` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`status_id`) REFERENCES `application_status`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`citizenship_id`) REFERENCES `country`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_visa_applications`("id", "first_name", "last_name", "email", "additional_details", "status_id", "citizenship_id", "resume_blob", "resume_file_type", "resume_file_name", "created_at", "updated_at") SELECT "id", "first_name", "last_name", "email", "additional_details", "status_id", "citizenship_id", "resume_blob", "resume_file_type", "resume_file_name", "created_at", "updated_at" FROM `visa_applications`;--> statement-breakpoint
DROP TABLE `visa_applications`;--> statement-breakpoint
ALTER TABLE `__new_visa_applications` RENAME TO `visa_applications`;--> statement-breakpoint
PRAGMA foreign_keys=ON;