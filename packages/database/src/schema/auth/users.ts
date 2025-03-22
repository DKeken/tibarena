import {
  pgTable,
  varchar,
  uniqueIndex,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { timestamps } from "../core/timestamps";
import { relations } from "drizzle-orm";

/**
 * Auth message status enum
 */
export enum AuthMessageStatus {
  PENDING = "pending",
  USED = "used",
  EXPIRED = "expired",
}

/**
 * Users table schema definition
 * Stores basic user information
 */
export const users = pgTable(
  "users",
  {
    /** Primary key identifier for the user */
    id: uuid("user_id").defaultRandom().primaryKey().notNull(),
    /** User's wallet address */
    walletAddress: varchar("wallet_address", { length: 42 }).notNull(),
    /** Optional username for the user */
    username: varchar("username", { length: 50 }),
    /** Optional profile image URL */
    imageUrl: varchar("image_url", { length: 255 }),
    /** Common timestamp fields */
    ...timestamps,
  },
  (table) => [
    /** Index on username for faster lookups */
    uniqueIndex("username_idx").on(table.username),
    /** Index on wallet address for faster lookups */
    uniqueIndex("wallet_address_idx").on(table.walletAddress),
  ]
);

/**
 * Auth messages table schema definition
 * Tracks authentication message statuses
 */
export const authMessages = pgTable("auth_messages", {
  /** Primary key identifier for the auth message */
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  /** Wallet address associated with this auth message */
  walletAddress: varchar("wallet_address", { length: 42 }).notNull(),
  /** Status of the auth message */
  status: varchar("status", { length: 20 })
    .default(AuthMessageStatus.PENDING)
    .notNull(),
  /** Common timestamp fields */
  ...timestamps,
});

/**
 * Relations for the users table
 */
export const usersRelations = relations(users, ({}) => ({}));

// Schema validation for user operations
export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);

// Schema validation for auth messages
export const insertAuthMessageSchema = createInsertSchema(authMessages);
export const selectAuthMessageSchema = createSelectSchema(authMessages);

// Typescript types
export type User = z.infer<typeof selectUserSchema>;
export type NewUser = z.infer<typeof insertUserSchema>;
export type AuthMessage = z.infer<typeof selectAuthMessageSchema>;
export type NewAuthMessage = z.infer<typeof insertAuthMessageSchema>;
