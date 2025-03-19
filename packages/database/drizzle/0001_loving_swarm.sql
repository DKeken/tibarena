-- Add new enum types
CREATE TYPE "public"."benefit_type" AS ENUM('commission_reduction', 'exclusive_access', 'customization', 'battle_bonus', 'daily_reward');--> statement-breakpoint
CREATE TYPE "public"."rarity_tier" AS ENUM('common', 'uncommon', 'rare', 'epic', 'legendary');--> statement-breakpoint

-- Create UUID extension if it doesn't exist
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";--> statement-breakpoint

-- Create new users table with UUID as primary key
CREATE TABLE "users_new" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "username" varchar(50) NOT NULL,
  "email" varchar(100) NOT NULL,
  "password_hash" varchar(255) NOT NULL,
  "wallet_address" varchar(42),
  "auth_nonce" varchar(255),
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp NOT NULL,
  CONSTRAINT "users_new_wallet_address_unique" UNIQUE("wallet_address")
);--> statement-breakpoint

-- Create new sessions table with correct references
CREATE TABLE "sessions_new" (
  "id" varchar(255) PRIMARY KEY NOT NULL,
  "user_id" uuid NOT NULL,
  "expires_at" timestamp NOT NULL,
  "auth_signature" varchar(512),
  "signed_message" varchar(512),
  "is_active" boolean DEFAULT true,
  "network_chain_id" varchar(10),
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp NOT NULL
);--> statement-breakpoint

-- Create other new tables with updated schema
CREATE TABLE "transactions_new" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" uuid NOT NULL,
  "amount" numeric(18, 8) NOT NULL,
  "type" "transaction_type" NOT NULL,
  "battle_id" uuid,
  "status" "transaction_status" DEFAULT 'pending' NOT NULL,
  "tx_hash" varchar(66),
  "network_chain_id" varchar(10),
  "description" varchar(255),
  "external_reference" varchar(100),
  "details" jsonb DEFAULT '{}'::jsonb,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp NOT NULL
);--> statement-breakpoint

CREATE TABLE "arena_master_keys_new" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "token_id" varchar(100) NOT NULL,
  "owner_id" uuid NOT NULL,
  "is_rented" boolean DEFAULT false NOT NULL,
  "renter_id" uuid,
  "rental_end_date" timestamp,
  "rental_price_per_day" numeric(18, 8),
  "rarity_tier" rarity_tier DEFAULT 'common' NOT NULL,
  "metadata" jsonb DEFAULT '{"name":"","description":"","attributes":[]}'::jsonb NOT NULL,
  "image_url" varchar(255),
  "network_chain_id" varchar(10) NOT NULL,
  "contract_address" varchar(42) NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp NOT NULL
);--> statement-breakpoint

CREATE TABLE "nft_benefits_new" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "nft_id" uuid NOT NULL,
  "beneficiary_id" uuid NOT NULL,
  "benefit_type" benefit_type NOT NULL,
  "amount" numeric(18, 8),
  "description" varchar(255),
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp NOT NULL
);--> statement-breakpoint

CREATE TABLE "battle_rounds_new" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "battle_id" uuid NOT NULL,
  "round_number" integer NOT NULL,
  "gladiator1_action" "battle_action",
  "gladiator2_action" "battle_action",
  "gladiator1_damage" integer DEFAULT 0,
  "gladiator2_damage" integer DEFAULT 0,
  "round_description" text,
  "random_value" varchar(64),
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp NOT NULL
);--> statement-breakpoint

CREATE TABLE "battles_new" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "gladiator1_id" uuid NOT NULL,
  "gladiator2_id" uuid NOT NULL,
  "winner_id" uuid,
  "stake_amount" numeric(10, 2) NOT NULL,
  "status" "battle_status" DEFAULT 'scheduled' NOT NULL,
  "fairness_seed" varchar(64),
  "battle_log" jsonb,
  "rounds_completed" integer DEFAULT 0,
  "completed_at" timestamp,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp NOT NULL
);--> statement-breakpoint

CREATE TABLE "daily_missions_new" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "title" varchar(100) NOT NULL,
  "description" varchar(255) NOT NULL,
  "mission_type" varchar(50) NOT NULL,
  "target_count" integer DEFAULT 1 NOT NULL,
  "reward_data" jsonb NOT NULL,
  "is_active" boolean DEFAULT true,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp NOT NULL
);--> statement-breakpoint

CREATE TABLE "login_streaks_new" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" uuid NOT NULL,
  "login_date" date NOT NULL,
  "current_streak" integer DEFAULT 1 NOT NULL,
  "max_streak" integer DEFAULT 1 NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp NOT NULL
);--> statement-breakpoint

CREATE TABLE "player_mission_progress_new" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" uuid NOT NULL,
  "mission_id" uuid NOT NULL,
  "current_count" integer DEFAULT 0 NOT NULL,
  "is_completed" boolean DEFAULT false,
  "reward_claimed" boolean DEFAULT false,
  "assigned_date" date NOT NULL,
  "expiry_date" date NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp NOT NULL
);--> statement-breakpoint

CREATE TABLE "player_rewards_new" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" uuid NOT NULL,
  "reward_type" "reward_type" NOT NULL,
  "status" "reward_status" DEFAULT 'available' NOT NULL,
  "description" varchar(255),
  "reward_data" jsonb DEFAULT '{"coins":0,"experience":0,"items":[]}'::jsonb NOT NULL,
  "expires_at" date,
  "includes_free_battles" boolean DEFAULT false,
  "free_battles_count" integer DEFAULT 0,
  "is_streak_bonus" boolean DEFAULT false,
  "streak_day" integer,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp NOT NULL
);--> statement-breakpoint

CREATE TABLE "gladiators_new" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "owner_id" uuid NOT NULL,
  "name" varchar(50) NOT NULL,
  "avatar_url" varchar(255),
  "equipment" jsonb DEFAULT '{"weapon":{"type":"sword","name":null},"armor":{"type":"light","name":null}}'::jsonb NOT NULL,
  "attributes" jsonb DEFAULT '{"strength":10,"agility":10,"vitality":10}'::jsonb NOT NULL,
  "progress" jsonb DEFAULT '{"experience":0,"level":1,"wins":0,"losses":0}'::jsonb NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp NOT NULL
);--> statement-breakpoint

-- Copy data (if there's any) - insert all rows with UUIDs
-- This will replace the integer IDs with UUIDs
INSERT INTO "users_new" ("id", "username", "email", "password_hash", "wallet_address", "auth_nonce", "created_at", "updated_at")
SELECT uuid_generate_v4(), "username", "email", "password_hash", "wallet_address", "auth_nonce", "created_at", "updated_at"
FROM "users";--> statement-breakpoint

-- Create index for lookups
CREATE UNIQUE INDEX "username_idx_new" ON "users_new" USING btree ("username");--> statement-breakpoint
CREATE UNIQUE INDEX "email_idx_new" ON "users_new" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "token_id_idx_new" ON "arena_master_keys_new" USING btree ("token_id");--> statement-breakpoint

-- Add foreign key constraints
ALTER TABLE "sessions_new" ADD CONSTRAINT "sessions_new_user_id_users_new_id_fk" 
FOREIGN KEY ("user_id") REFERENCES "users_new"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint

ALTER TABLE "transactions_new" ADD CONSTRAINT "transactions_new_user_id_users_new_id_fk" 
FOREIGN KEY ("user_id") REFERENCES "users_new"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint

ALTER TABLE "transactions_new" ADD CONSTRAINT "transactions_new_battle_id_battles_new_id_fk" 
FOREIGN KEY ("battle_id") REFERENCES "battles_new"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint

ALTER TABLE "arena_master_keys_new" ADD CONSTRAINT "arena_master_keys_new_owner_id_users_new_id_fk" 
FOREIGN KEY ("owner_id") REFERENCES "users_new"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint

ALTER TABLE "arena_master_keys_new" ADD CONSTRAINT "arena_master_keys_new_renter_id_users_new_id_fk" 
FOREIGN KEY ("renter_id") REFERENCES "users_new"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint

ALTER TABLE "nft_benefits_new" ADD CONSTRAINT "nft_benefits_new_nft_id_arena_master_keys_new_id_fk" 
FOREIGN KEY ("nft_id") REFERENCES "arena_master_keys_new"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint

ALTER TABLE "nft_benefits_new" ADD CONSTRAINT "nft_benefits_new_beneficiary_id_users_new_id_fk" 
FOREIGN KEY ("beneficiary_id") REFERENCES "users_new"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint

ALTER TABLE "battle_rounds_new" ADD CONSTRAINT "battle_rounds_new_battle_id_battles_new_id_fk" 
FOREIGN KEY ("battle_id") REFERENCES "battles_new"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint

ALTER TABLE "battles_new" ADD CONSTRAINT "battles_new_gladiator1_id_gladiators_new_id_fk" 
FOREIGN KEY ("gladiator1_id") REFERENCES "gladiators_new"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint

ALTER TABLE "battles_new" ADD CONSTRAINT "battles_new_gladiator2_id_gladiators_new_id_fk" 
FOREIGN KEY ("gladiator2_id") REFERENCES "gladiators_new"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint

ALTER TABLE "battles_new" ADD CONSTRAINT "battles_new_winner_id_gladiators_new_id_fk" 
FOREIGN KEY ("winner_id") REFERENCES "gladiators_new"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint

ALTER TABLE "login_streaks_new" ADD CONSTRAINT "login_streaks_new_user_id_users_new_id_fk" 
FOREIGN KEY ("user_id") REFERENCES "users_new"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint

ALTER TABLE "player_mission_progress_new" ADD CONSTRAINT "player_mission_progress_new_user_id_users_new_id_fk" 
FOREIGN KEY ("user_id") REFERENCES "users_new"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint

ALTER TABLE "player_mission_progress_new" ADD CONSTRAINT "player_mission_progress_new_mission_id_daily_missions_new_id_fk" 
FOREIGN KEY ("mission_id") REFERENCES "daily_missions_new"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint

ALTER TABLE "player_rewards_new" ADD CONSTRAINT "player_rewards_new_user_id_users_new_id_fk" 
FOREIGN KEY ("user_id") REFERENCES "users_new"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint

ALTER TABLE "gladiators_new" ADD CONSTRAINT "gladiators_new_owner_id_users_new_id_fk" 
FOREIGN KEY ("owner_id") REFERENCES "users_new"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint

-- Rename tables (drop old, rename new)
DROP TABLE IF EXISTS "sessions" CASCADE;--> statement-breakpoint
DROP TABLE IF EXISTS "transactions" CASCADE;--> statement-breakpoint
DROP TABLE IF EXISTS "arena_master_keys" CASCADE;--> statement-breakpoint
DROP TABLE IF EXISTS "nft_benefits" CASCADE;--> statement-breakpoint
DROP TABLE IF EXISTS "battle_rounds" CASCADE;--> statement-breakpoint
DROP TABLE IF EXISTS "battles" CASCADE;--> statement-breakpoint
DROP TABLE IF EXISTS "daily_missions" CASCADE;--> statement-breakpoint
DROP TABLE IF EXISTS "login_streaks" CASCADE;--> statement-breakpoint
DROP TABLE IF EXISTS "player_mission_progress" CASCADE;--> statement-breakpoint
DROP TABLE IF EXISTS "player_rewards" CASCADE;--> statement-breakpoint
DROP TABLE IF EXISTS "gladiators" CASCADE;--> statement-breakpoint
DROP TABLE IF EXISTS "users" CASCADE;--> statement-breakpoint

-- Rename new tables to original names
ALTER TABLE "users_new" RENAME TO "users";--> statement-breakpoint
ALTER TABLE "sessions_new" RENAME TO "sessions";--> statement-breakpoint
ALTER TABLE "transactions_new" RENAME TO "transactions";--> statement-breakpoint
ALTER TABLE "arena_master_keys_new" RENAME TO "arena_master_keys";--> statement-breakpoint
ALTER TABLE "nft_benefits_new" RENAME TO "nft_benefits";--> statement-breakpoint
ALTER TABLE "battle_rounds_new" RENAME TO "battle_rounds";--> statement-breakpoint
ALTER TABLE "battles_new" RENAME TO "battles";--> statement-breakpoint
ALTER TABLE "daily_missions_new" RENAME TO "daily_missions";--> statement-breakpoint
ALTER TABLE "login_streaks_new" RENAME TO "login_streaks";--> statement-breakpoint
ALTER TABLE "player_mission_progress_new" RENAME TO "player_mission_progress";--> statement-breakpoint
ALTER TABLE "player_rewards_new" RENAME TO "player_rewards";--> statement-breakpoint
ALTER TABLE "gladiators_new" RENAME TO "gladiators";--> statement-breakpoint

-- Rename constraints to original names
ALTER INDEX "username_idx_new" RENAME TO "username_idx";--> statement-breakpoint
ALTER INDEX "email_idx_new" RENAME TO "email_idx";--> statement-breakpoint
ALTER INDEX "token_id_idx_new" RENAME TO "token_id_idx";--> statement-breakpoint

-- Rename constraint names to original names
ALTER TABLE "users" RENAME CONSTRAINT "users_new_wallet_address_unique" TO "users_wallet_address_unique";--> statement-breakpoint
ALTER TABLE "sessions" RENAME CONSTRAINT "sessions_new_user_id_users_new_id_fk" TO "sessions_user_id_users_id_fk";--> statement-breakpoint
ALTER TABLE "transactions" RENAME CONSTRAINT "transactions_new_user_id_users_new_id_fk" TO "transactions_user_id_users_id_fk";--> statement-breakpoint
ALTER TABLE "transactions" RENAME CONSTRAINT "transactions_new_battle_id_battles_new_id_fk" TO "transactions_battle_id_battles_id_fk";--> statement-breakpoint
ALTER TABLE "arena_master_keys" RENAME CONSTRAINT "arena_master_keys_new_owner_id_users_new_id_fk" TO "arena_master_keys_owner_id_users_id_fk";--> statement-breakpoint
ALTER TABLE "arena_master_keys" RENAME CONSTRAINT "arena_master_keys_new_renter_id_users_new_id_fk" TO "arena_master_keys_renter_id_users_id_fk";--> statement-breakpoint
ALTER TABLE "nft_benefits" RENAME CONSTRAINT "nft_benefits_new_nft_id_arena_master_keys_new_id_fk" TO "nft_benefits_nft_id_arena_master_keys_id_fk";--> statement-breakpoint
ALTER TABLE "nft_benefits" RENAME CONSTRAINT "nft_benefits_new_beneficiary_id_users_new_id_fk" TO "nft_benefits_beneficiary_id_users_id_fk";--> statement-breakpoint
ALTER TABLE "battle_rounds" RENAME CONSTRAINT "battle_rounds_new_battle_id_battles_new_id_fk" TO "battle_rounds_battle_id_battles_id_fk";--> statement-breakpoint
ALTER TABLE "battles" RENAME CONSTRAINT "battles_new_gladiator1_id_gladiators_new_id_fk" TO "battles_gladiator1_id_gladiators_id_fk";--> statement-breakpoint
ALTER TABLE "battles" RENAME CONSTRAINT "battles_new_gladiator2_id_gladiators_new_id_fk" TO "battles_gladiator2_id_gladiators_id_fk";--> statement-breakpoint
ALTER TABLE "battles" RENAME CONSTRAINT "battles_new_winner_id_gladiators_new_id_fk" TO "battles_winner_id_gladiators_id_fk";--> statement-breakpoint
ALTER TABLE "login_streaks" RENAME CONSTRAINT "login_streaks_new_user_id_users_new_id_fk" TO "login_streaks_user_id_users_id_fk";--> statement-breakpoint
ALTER TABLE "player_mission_progress" RENAME CONSTRAINT "player_mission_progress_new_user_id_users_new_id_fk" TO "player_mission_progress_user_id_users_id_fk";--> statement-breakpoint
ALTER TABLE "player_mission_progress" RENAME CONSTRAINT "player_mission_progress_new_mission_id_daily_missions_new_id_fk" TO "player_mission_progress_mission_id_daily_missions_id_fk";--> statement-breakpoint
ALTER TABLE "player_rewards" RENAME CONSTRAINT "player_rewards_new_user_id_users_new_id_fk" TO "player_rewards_user_id_users_id_fk";--> statement-breakpoint
ALTER TABLE "gladiators" RENAME CONSTRAINT "gladiators_new_owner_id_users_new_id_fk" TO "gladiators_owner_id_users_id_fk";--> statement-breakpoint