CREATE TYPE "public"."transaction_status" AS ENUM('pending', 'completed', 'failed', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."transaction_type" AS ENUM('deposit', 'withdrawal', 'stake', 'winnings', 'reward', 'airdrop', 'fee', 'nft_purchase', 'nft_rental');--> statement-breakpoint
CREATE TYPE "public"."benefit_type" AS ENUM('commission_reduction', 'exclusive_access', 'customization', 'battle_bonus', 'daily_reward');--> statement-breakpoint
CREATE TYPE "public"."rarity_tier" AS ENUM('common', 'uncommon', 'rare', 'epic', 'legendary');--> statement-breakpoint
CREATE TYPE "public"."battle_action" AS ENUM('fierce_attack', 'defensive_stance', 'precise_thrust');--> statement-breakpoint
CREATE TYPE "public"."battle_status" AS ENUM('scheduled', 'in_progress', 'completed', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."reward_status" AS ENUM('available', 'claimed', 'expired');--> statement-breakpoint
CREATE TYPE "public"."reward_type" AS ENUM('daily_login', 'battle_participation', 'battle_victory', 'streak_bonus', 'mission_completion', 'special_event');--> statement-breakpoint
CREATE TYPE "public"."armor_type" AS ENUM('light', 'medium', 'heavy', 'gladiator', 'champion');--> statement-breakpoint
CREATE TYPE "public"."weapon_type" AS ENUM('sword', 'axe', 'spear', 'mace', 'dagger');--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"expires_at" timestamp NOT NULL,
	"auth_signature" varchar(512),
	"signed_message" varchar(512),
	"is_active" boolean DEFAULT true,
	"network_chain_id" varchar(10),
	"refresh_token" varchar(512),
	"refresh_token_expires_at" timestamp,
	"is_refresh_token_revoked" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"user_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" varchar(50) NOT NULL,
	"email" varchar(100) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"role" varchar(20) DEFAULT 'user' NOT NULL,
	"wallet_address" varchar(42),
	"auth_nonce" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "users_wallet_address_unique" UNIQUE("wallet_address")
);
--> statement-breakpoint
CREATE TABLE "transactions" (
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
);
--> statement-breakpoint
CREATE TABLE "arena_master_keys" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"token_id" varchar(100) NOT NULL,
	"owner_id" uuid NOT NULL,
	"is_rented" boolean DEFAULT false NOT NULL,
	"renter_id" uuid,
	"rental_end_date" timestamp,
	"rental_price_per_day" numeric(18, 8),
	"rarity_tier" "rarity_tier" DEFAULT 'common' NOT NULL,
	"metadata" jsonb DEFAULT '{"name":"","description":"","attributes":[]}'::jsonb NOT NULL,
	"image_url" varchar(255),
	"network_chain_id" varchar(10) NOT NULL,
	"contract_address" varchar(42) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "nft_benefits" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nft_id" uuid NOT NULL,
	"beneficiary_id" uuid NOT NULL,
	"benefit_type" "benefit_type" NOT NULL,
	"amount" numeric(18, 8),
	"description" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "battle_rounds" (
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
);
--> statement-breakpoint
CREATE TABLE "battles" (
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
);
--> statement-breakpoint
CREATE TABLE "daily_missions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(100) NOT NULL,
	"description" varchar(255) NOT NULL,
	"mission_type" varchar(50) NOT NULL,
	"target_count" integer DEFAULT 1 NOT NULL,
	"reward_data" jsonb NOT NULL,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "login_streaks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"login_date" date NOT NULL,
	"current_streak" integer DEFAULT 1 NOT NULL,
	"max_streak" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "player_mission_progress" (
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
);
--> statement-breakpoint
CREATE TABLE "player_rewards" (
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
);
--> statement-breakpoint
CREATE TABLE "gladiators" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"owner_id" uuid NOT NULL,
	"name" varchar(50) NOT NULL,
	"avatar_url" varchar(255),
	"equipment" jsonb DEFAULT '{"weapon":{"type":"sword","name":null},"armor":{"type":"light","name":null}}'::jsonb NOT NULL,
	"attributes" jsonb DEFAULT '{"strength":10,"agility":10,"vitality":10}'::jsonb NOT NULL,
	"progress" jsonb DEFAULT '{"experience":0,"level":1,"wins":0,"losses":0}'::jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_battle_id_battles_id_fk" FOREIGN KEY ("battle_id") REFERENCES "public"."battles"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "arena_master_keys" ADD CONSTRAINT "arena_master_keys_owner_id_users_user_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("user_id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "arena_master_keys" ADD CONSTRAINT "arena_master_keys_renter_id_users_user_id_fk" FOREIGN KEY ("renter_id") REFERENCES "public"."users"("user_id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nft_benefits" ADD CONSTRAINT "nft_benefits_nft_id_arena_master_keys_id_fk" FOREIGN KEY ("nft_id") REFERENCES "public"."arena_master_keys"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nft_benefits" ADD CONSTRAINT "nft_benefits_beneficiary_id_users_user_id_fk" FOREIGN KEY ("beneficiary_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "battle_rounds" ADD CONSTRAINT "battle_rounds_battle_id_battles_id_fk" FOREIGN KEY ("battle_id") REFERENCES "public"."battles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "battles" ADD CONSTRAINT "battles_gladiator1_id_gladiators_id_fk" FOREIGN KEY ("gladiator1_id") REFERENCES "public"."gladiators"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "battles" ADD CONSTRAINT "battles_gladiator2_id_gladiators_id_fk" FOREIGN KEY ("gladiator2_id") REFERENCES "public"."gladiators"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "battles" ADD CONSTRAINT "battles_winner_id_gladiators_id_fk" FOREIGN KEY ("winner_id") REFERENCES "public"."gladiators"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "login_streaks" ADD CONSTRAINT "login_streaks_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "player_mission_progress" ADD CONSTRAINT "player_mission_progress_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "player_mission_progress" ADD CONSTRAINT "player_mission_progress_mission_id_daily_missions_id_fk" FOREIGN KEY ("mission_id") REFERENCES "public"."daily_missions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "player_rewards" ADD CONSTRAINT "player_rewards_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gladiators" ADD CONSTRAINT "gladiators_owner_id_users_user_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "username_idx" ON "users" USING btree ("username");--> statement-breakpoint
CREATE UNIQUE INDEX "email_idx" ON "users" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "token_id_idx" ON "arena_master_keys" USING btree ("token_id");