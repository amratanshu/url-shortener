CREATE TABLE IF NOT EXISTS "url_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"long_url" text NOT NULL,
	CONSTRAINT "url_table_long_url_unique" UNIQUE("long_url")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "long_url_index" ON "url_table" USING btree ("long_url");