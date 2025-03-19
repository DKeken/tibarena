import {
  pgTable,
  varchar,
  uniqueIndex,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { timestamps } from "../core/timestamps";
import { uuidPrimaryKey } from "../core/uuid";
import { relations } from "drizzle-orm";

/**
 * Users table schema definition
 * Stores basic user information and authentication data
 */
export const users = pgTable(
  "users",
  {
    /** Primary key identifier for the user */
    id: uuidPrimaryKey(),
    /** Unique username for the user */
    username: varchar("username", { length: 50 }).notNull(),
    /** User's email address */
    email: varchar("email", { length: 100 }).notNull(),
    /** Hashed password for authentication */
    passwordHash: varchar("password_hash", { length: 255 }).notNull(),
    /** Optional wallet address for blockchain integration */
    walletAddress: varchar("wallet_address", { length: 42 }).unique(),
    /** Authentication nonce used for wallet signature verification */
    authNonce: varchar("auth_nonce", { length: 255 }),
    /** Common timestamp fields */
    ...timestamps,
  },
  (table) => [
    /** Index on username for faster lookups */
    uniqueIndex("username_idx").on(table.username),
    /** Index on email for faster lookups */
    uniqueIndex("email_idx").on(table.email),
  ]
);

/**
 * Sessions table schema definition
 * Tracks user authentication sessions
 */
export const sessions = pgTable("sessions", {
  /** Primary key identifier for the session (UUID) */
  id: varchar("id", { length: 255 }).primaryKey().notNull(),
  /** Foreign key reference to the user who owns this session */
  userId: varchar("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  /** Timestamp when this session expires */
  expiresAt: timestamp("expires_at").notNull(),
  /** Cryptographic signature provided during authentication */
  authSignature: varchar("auth_signature", { length: 512 }),
  /** The message that was signed by the user's wallet */
  signedMessage: varchar("signed_message", { length: 512 }),
  /** Indicates if the session is currently active */
  isActive: boolean("is_active").default(true),
  /** Chain ID of the blockchain network used for authentication */
  networkChainId: varchar("network_chain_id", { length: 10 }),
  /** Common timestamp fields */
  ...timestamps,
});

/**
 * Relations for the users table
 */
export const usersRelations = relations(users, ({ many }) => ({
  /** One user can have many sessions */
  sessions: many(sessions),
}));

/**
 * Relations for the sessions table
 */
export const sessionsRelations = relations(sessions, ({ one }) => ({
  /** Each session belongs to one user */
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

// Schema validation for user creation
export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);

// Schema validation for session creation
export const insertSessionSchema = createInsertSchema(sessions);
export const selectSessionSchema = createSelectSchema(sessions);

// Typescript types
export type User = z.infer<typeof selectUserSchema>;
export type NewUser = z.infer<typeof insertUserSchema>;
export type Session = z.infer<typeof selectSessionSchema>;
export type NewSession = z.infer<typeof insertSessionSchema>;
