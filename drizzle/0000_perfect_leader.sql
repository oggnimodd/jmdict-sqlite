CREATE TABLE `kanji` (
	`id` integer PRIMARY KEY NOT NULL,
	`text` text,
	`wordId` integer,
	FOREIGN KEY (`wordId`) REFERENCES `words`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `words` (
	`id` integer PRIMARY KEY NOT NULL,
	`data` text NOT NULL,
	`hasNoKanji` integer
);
