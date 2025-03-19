import {
  pgTable,
  varchar,
  integer,
  pgEnum,
  jsonb,
  uuid,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { timestamps } from "../core/timestamps";
import { uuidPrimaryKey } from "../core/uuid";
import { gladiatorDefaults } from "../core/defaults";
import { relations } from "drizzle-orm";
import { users } from "../auth/users";
import { z } from "zod";

/**
 * Enum for weapon types
 */
export const weaponTypeEnum = pgEnum("weapon_type", [
  "sword",
  "axe",
  "spear",
  "mace",
  "dagger",
]);

/**
 * Enum for armor types
 */
export const armorTypeEnum = pgEnum("armor_type", [
  "light",
  "medium",
  "heavy",
  "gladiator",
  "champion",
]);

/**
 * Zod schemas for JSON fields
 */
export const equipmentSchema = z.object({
  weapon: z.object({
    type: z.enum(weaponTypeEnum.enumValues),
    name: z.string().nullable(),
  }),
  armor: z.object({
    type: z.enum(armorTypeEnum.enumValues),
    name: z.string().nullable(),
  }),
});

export const attributesSchema = z.object({
  strength: z.number().int().min(1),
  agility: z.number().int().min(1),
  vitality: z.number().int().min(1),
});

export const progressSchema = z.object({
  experience: z.number().int().min(0),
  level: z.number().int().min(1),
  wins: z.number().int().min(0),
  losses: z.number().int().min(0),
});

/**
 * Type definitions from Zod schemas
 */
export type GladiatorEquipment = z.infer<typeof equipmentSchema>;
export type GladiatorAttributes = z.infer<typeof attributesSchema>;
export type GladiatorProgress = z.infer<typeof progressSchema>;

/**
 * Gladiators table schema definition
 * Represents player-owned gladiator characters
 */
export const gladiators = pgTable("gladiators", {
  /** Primary key identifier for the gladiator */
  id: uuidPrimaryKey(),
  /** Foreign key reference to the user who owns this gladiator */
  ownerId: uuid("owner_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  /** Name of the gladiator */
  name: varchar("name", { length: 50 }).notNull(),
  /** URL or path to the gladiator's avatar image */
  avatarUrl: varchar("avatar_url", { length: 255 }),

  /** Equipment data stored as JSON */
  equipment: jsonb("equipment")
    .$type<GladiatorEquipment>()
    .notNull()
    .default(gladiatorDefaults.equipment),

  /** Attributes stored as JSON */
  attributes: jsonb("attributes")
    .$type<GladiatorAttributes>()
    .notNull()
    .default(gladiatorDefaults.attributes),

  /** Progress data stored as JSON */
  progress: jsonb("progress")
    .$type<GladiatorProgress>()
    .notNull()
    .default(gladiatorDefaults.progress),

  /** Common timestamp fields */
  ...timestamps,
});

/**
 * Relations for the gladiators table
 */
export const gladiatorsRelations = relations(gladiators, ({ one }) => ({
  /** Each gladiator belongs to one user */
  owner: one(users, {
    fields: [gladiators.ownerId],
    references: [users.id],
  }),
}));

// Schema validation with custom types for JSON fields
export const insertGladiatorSchema = createInsertSchema(gladiators, {
  equipment: equipmentSchema,
  attributes: attributesSchema,
  progress: progressSchema,
});

export const selectGladiatorSchema = createSelectSchema(gladiators);

// TypeScript types
export type Gladiator = z.infer<typeof selectGladiatorSchema>;
export type NewGladiator = z.infer<typeof insertGladiatorSchema>;