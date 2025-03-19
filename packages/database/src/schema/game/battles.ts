import {
  pgTable,
  uuid,
  pgEnum,
  varchar,
  timestamp,
  numeric,
  text,
  jsonb,
  integer,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { timestamps } from "../core/timestamps";
import { uuidPrimaryKey } from "../core/uuid";
import { battleDefaults } from "../core/defaults";
import { relations } from "drizzle-orm";
import { gladiators } from "./gladiators";
import { z } from "zod";

/**
 * Enum for battle status
 */
export const battleStatusEnum = pgEnum("battle_status", [
  "scheduled",
  "in_progress",
  "completed",
  "cancelled",
]);

/**
 * Enum for battle actions
 */
export const battleActionEnum = pgEnum("battle_action", [
  "fierce_attack",
  "defensive_stance",
  "precise_thrust",
]);

/**
 * Zod schemas for JSON fields
 */
export const battleLogSchema = z.array(
  z.object({
    round: z.number().int(),
    actions: z.object({
      gladiator1: z.enum(battleActionEnum.enumValues).optional(),
      gladiator2: z.enum(battleActionEnum.enumValues).optional(),
    }),
    damage: z.object({
      gladiator1: z.number().int(),
      gladiator2: z.number().int(),
    }),
    description: z.string(),
  })
);

/**
 * Type definitions from Zod schemas
 */
export type BattleLog = z.infer<typeof battleLogSchema>;

/**
 * Battles table schema definition
 * Records battles between gladiators
 */
export const battles = pgTable("battles", {
  /** Primary key identifier for the battle */
  id: uuidPrimaryKey(),
  /** First gladiator participating in the battle */
  gladiator1Id: uuid("gladiator1_id")
    .notNull()
    .references(() => gladiators.id, { onDelete: "restrict" }),
  /** Second gladiator participating in the battle */
  gladiator2Id: uuid("gladiator2_id")
    .notNull()
    .references(() => gladiators.id, { onDelete: "restrict" }),
  /** The gladiator who won the battle (null if draw or not completed) */
  winnerId: uuid("winner_id").references(() => gladiators.id, {
    onDelete: "set null",
  }),
  /** Amount staked on this battle */
  stakeAmount: numeric("stake_amount", { precision: 10, scale: 2 }).notNull(),
  /** Status of the battle */
  status: battleStatusEnum("status").notNull().default(battleDefaults.status),
  /** Seed used for provably fair random number generation */
  fairnessSeed: varchar("fairness_seed", { length: 64 }),
  /** Battle log storing the sequence of events */
  battleLog: jsonb("battle_log").$type<BattleLog>(),
  /** Number of rounds completed */
  roundsCompleted: integer("rounds_completed").default(
    battleDefaults.roundsCompleted
  ),
  /** Timestamp when the battle was completed */
  completedAt: timestamp("completed_at"),
  /** Common timestamp fields */
  ...timestamps,
});

/**
 * Battle rounds table schema definition
 * Records individual rounds within battles
 */
export const battleRounds = pgTable("battle_rounds", {
  /** Primary key identifier for the round */
  id: uuidPrimaryKey(),
  /** Foreign key reference to the associated battle */
  battleId: uuid("battle_id")
    .notNull()
    .references(() => battles.id, { onDelete: "cascade" }),
  /** Round number within the battle */
  roundNumber: integer("round_number").notNull(),
  /** Action taken by gladiator 1 */
  gladiator1Action: battleActionEnum("gladiator1_action"),
  /** Action taken by gladiator 2 */
  gladiator2Action: battleActionEnum("gladiator2_action"),
  /** Damage dealt by gladiator 1 */
  gladiator1Damage: integer("gladiator1_damage").default(0),
  /** Damage dealt by gladiator 2 */
  gladiator2Damage: integer("gladiator2_damage").default(0),
  /** Description of round outcome */
  roundDescription: text("round_description"),
  /** Random value used for the round (for provably fair) */
  randomValue: varchar("random_value", { length: 64 }),
  /** Common timestamp fields */
  ...timestamps,
});

/**
 * Relations for the battles table
 */
export const battlesRelations = relations(battles, ({ one, many }) => ({
  /** Each battle has one gladiator as participant 1 */
  gladiator1: one(gladiators, {
    fields: [battles.gladiator1Id],
    references: [gladiators.id],
  }),
  /** Each battle has one gladiator as participant 2 */
  gladiator2: one(gladiators, {
    fields: [battles.gladiator2Id],
    references: [gladiators.id],
  }),
  /** Each battle can have one winner gladiator */
  winner: one(gladiators, {
    fields: [battles.winnerId],
    references: [gladiators.id],
  }),
  /** One battle can have many rounds */
  rounds: many(battleRounds),
}));

/**
 * Relations for the battle rounds table
 */
export const battleRoundsRelations = relations(battleRounds, ({ one }) => ({
  /** Each round belongs to one battle */
  battle: one(battles, {
    fields: [battleRounds.battleId],
    references: [battles.id],
  }),
}));

// Schema validation with custom types for JSON fields
export const insertBattleSchema = createInsertSchema(battles, {
  status: z.enum(battleStatusEnum.enumValues),
  battleLog: battleLogSchema.optional(),
});
export const selectBattleSchema = createSelectSchema(battles);

export const insertBattleRoundSchema = createInsertSchema(battleRounds, {
  gladiator1Action: z.enum(battleActionEnum.enumValues).optional(),
  gladiator2Action: z.enum(battleActionEnum.enumValues).optional(),
});
export const selectBattleRoundSchema = createSelectSchema(battleRounds);

// TypeScript types
export type Battle = z.infer<typeof selectBattleSchema>;
export type NewBattle = z.infer<typeof insertBattleSchema>;
export type BattleRound = z.infer<typeof selectBattleRoundSchema>;
export type NewBattleRound = z.infer<typeof insertBattleRoundSchema>;
