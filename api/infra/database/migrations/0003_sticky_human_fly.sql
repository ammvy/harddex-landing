ALTER TABLE "users" ALTER COLUMN "style" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "style" SET DEFAULT 'BASIC'::text;--> statement-breakpoint
DROP TYPE "public"."user_style_enum";--> statement-breakpoint
CREATE TYPE "public"."user_style_enum" AS ENUM('BASIC', 'INTERMEDIATE', 'ADVANCED', 'GAMER', 'PROFESSIONAL', 'REMOTE WORK', 'FILE / MEDIA', 'MOBILITY', 'LIGHT TRAVEL');--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "style" SET DEFAULT 'BASIC'::"public"."user_style_enum";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "style" SET DATA TYPE "public"."user_style_enum" USING "style"::"public"."user_style_enum";