import {
  pgTable,
  uuid,
  integer,
  pgEnum,
  varchar,
  date,
  boolean,
  jsonb,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { timestamps } from "../core/timestamps";
import { uuidPrimaryKey } from "../core/uuid";
import {
  rewardDefaults,
  streakDefaults,
  playerRewardDefaults,
  missionDefaults,
  missionProgressDefaults,
} from "../core/defaults";
import { relations } from "drizzle-orm";
import { users } from "../auth/users";
import { z } from "zod";

/**
 * Enum for reward types
 */
export const rewardTypeEnum = pgEnum("reward_type", [
  "daily_login",
  "battle_participation",
  "battle_victory",
  "streak_bonus",
  "mission_completion",
  "special_event",
]);

/**
 * Enum for reward status
 */
export const rewardStatusEnum = pgEnum("reward_status", [
  "available",
  "claimed",
  "expired",
]);

/**
 * Zod schemas for JSON fields
 */
export const rewardDataSchema = z.object({
  coins: z.number().int().min(0).optional(),
  experience: z.number().int().min(0).optional(),
  items: z.array(z.string()).optional(),
});

export type RewardData = z.infer<typeof rewardDataSchema>;

/**
 * Daily login records table
 * Tracks user login activity for streak calculation
 */
export const loginStreaks = pgTable("login_streaks", {
  /** Primary key identifier */
  id: uuidPrimaryKey(),
  /** User who logged in */
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  /** Date of login */
  loginDate: date("login_date").notNull(),
  /** Current streak count */
  currentStreak: integer("current_streak")
    .notNull()
    .default(streakDefaults.currentStreak),
  /** Highest streak achieved */
  maxStreak: integer("max_streak").notNull().default(streakDefaults.maxStreak),
  /** Common timestamp fields */
  ...timestamps,
});

/**
 * Player rewards table
 * Tracks rewards given to players
 */
export const playerRewards = pgTable("player_rewards", {
  /** Primary key identifier */
  id: uuidPrimaryKey(),
  /** User receiving the reward */
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  /** Type of reward */
  rewardType: rewardTypeEnum("reward_type").notNull(),
  /** Reward status */
  status: rewardStatusEnum("status")
    .notNull()
    .default(playerRewardDefaults.status),
  /** Reward description */
  description: varchar("description", { length: 255 }),
  /** Reward details as JSON */
  rewardData: jsonb("reward_data")
    .$type<RewardData>()
    .notNull()
    .default(rewardDefaults.rewardData),
  /** Expiration date for the reward */
  expiresAt: date("expires_at"),
  /** Whether free battles are included in this reward */
  includesFreeBattles: boolean("includes_free_battles").default(
    playerRewardDefaults.includesFreeBattles
  ),
  /** Number of free battles included */
  freeBattlesCount: integer("free_battles_count").default(
    playerRewardDefaults.freeBattlesCount
  ),
  /** Whether reward is a streak bonus */
  isStreakBonus: boolean("is_streak_bonus").default(
    playerRewardDefaults.isStreakBonus
  ),
  /** Streak day number (if applicable) */
  streakDay: integer("streak_day"),
  /** Common timestamp fields */
  ...timestamps,
});

/**
 * Daily missions table
 * Configurable missions for players to complete
 */
export const dailyMissions = pgTable("daily_missions", {
  /** Primary key identifier */
  id: uuidPrimaryKey(),
  /** Mission title */
  title: varchar("title", { length: 100 }).notNull(),
  /** Mission description */
  description: varchar("description", { length: 255 }).notNull(),
  /** Type of mission (participate, win, etc.) */
  missionType: varchar("mission_type", { length: 50 }).notNull(),
  /** Target count to complete the mission */
  targetCount: integer("target_count")
    .notNull()
    .default(missionDefaults.targetCount),
  /** Reward data */
  rewardData: jsonb("reward_data").$type<RewardData>().notNull(),
  /** Whether mission is currently active */
  isActive: boolean("is_active").default(missionDefaults.isActive),
  /** Common timestamp fields */
  ...timestamps,
});

/**
 * Player mission progress table
 * Tracks player progress on missions
 */
export const playerMissionProgress = pgTable("player_mission_progress", {
  /** Primary key identifier */
  id: uuidPrimaryKey(),
  /** User undertaking the mission */
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  /** Mission being undertaken */
  missionId: uuid("mission_id")
    .notNull()
    .references(() => dailyMissions.id, { onDelete: "cascade" }),
  /** Current progress count */
  currentCount: integer("current_count")
    .notNull()
    .default(missionProgressDefaults.currentCount),
  /** Whether mission is completed */
  isCompleted: boolean("is_completed").default(
    missionProgressDefaults.isCompleted
  ),
  /** Whether reward has been claimed */
  rewardClaimed: boolean("reward_claimed").default(
    missionProgressDefaults.rewardClaimed
  ),
  /** Date when mission was assigned */
  assignedDate: date("assigned_date").notNull(),
  /** Date when mission expires */
  expiryDate: date("expiry_date").notNull(),
  /** Common timestamp fields */
  ...timestamps,
});

/**
 * Relations for the login streaks table
 */
export const loginStreaksRelations = relations(loginStreaks, ({ one }) => ({
  /** Each login streak belongs to one user */
  user: one(users, {
    fields: [loginStreaks.userId],
    references: [users.id],
  }),
}));

/**
 * Relations for the player rewards table
 */
export const playerRewardsRelations = relations(playerRewards, ({ one }) => ({
  /** Each reward belongs to one user */
  user: one(users, {
    fields: [playerRewards.userId],
    references: [users.id],
  }),
}));

/**
 * Relations for player mission progress
 */
export const playerMissionProgressRelations = relations(
  playerMissionProgress,
  ({ one }) => ({
    /** Each progress record belongs to one user */
    user: one(users, {
      fields: [playerMissionProgress.userId],
      references: [users.id],
    }),
    /** Each progress record is for one mission */
    mission: one(dailyMissions, {
      fields: [playerMissionProgress.missionId],
      references: [dailyMissions.id],
    }),
  })
);

// Add relation fields to users
export const extendUsersRelationsWithRewards = relations(users, ({ many }) => ({
  /** One user can have many login streaks */
  loginStreaks: many(loginStreaks),
  /** One user can have many rewards */
  rewards: many(playerRewards),
  /** One user can have many mission progress records */
  missionProgress: many(playerMissionProgress),
}));

// Schema validation
export const insertLoginStreakSchema = createInsertSchema(loginStreaks);
export const selectLoginStreakSchema = createSelectSchema(loginStreaks);

export const insertPlayerRewardSchema = createInsertSchema(playerRewards, {
  rewardType: z.enum(rewardTypeEnum.enumValues),
  status: z.enum(rewardStatusEnum.enumValues),
  rewardData: rewardDataSchema,
});
export const selectPlayerRewardSchema = createSelectSchema(playerRewards);

export const insertDailyMissionSchema = createInsertSchema(dailyMissions, {
  rewardData: rewardDataSchema,
});
export const selectDailyMissionSchema = createSelectSchema(dailyMissions);

export const insertPlayerMissionProgressSchema = createInsertSchema(
  playerMissionProgress
);
export const selectPlayerMissionProgressSchema = createSelectSchema(
  playerMissionProgress
);

// TypeScript types
export type LoginStreak = z.infer<typeof selectLoginStreakSchema>;
export type NewLoginStreak = z.infer<typeof insertLoginStreakSchema>;
export type PlayerReward = z.infer<typeof selectPlayerRewardSchema>;
export type NewPlayerReward = z.infer<typeof insertPlayerRewardSchema>;
export type DailyMission = z.infer<typeof selectDailyMissionSchema>;
export type NewDailyMission = z.infer<typeof insertDailyMissionSchema>;
export type PlayerMissionProgress = z.infer<
  typeof selectPlayerMissionProgressSchema
>;
export type NewPlayerMissionProgress = z.infer<
  typeof insertPlayerMissionProgressSchema
>;
