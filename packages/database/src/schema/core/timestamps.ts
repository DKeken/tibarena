import { timestamp } from "drizzle-orm/pg-core";

/**
 * Common timestamp fields used across multiple tables
 * These should be included in all database tables for consistent tracking
 */
export const timestamps = {
  /** Timestamp when the record was created */
  createdAt: timestamp("created_at").defaultNow().notNull(),
  /** Timestamp when the record was last updated */
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .notNull(),
};

/**
 * Extended timestamps with deletion tracking
 * Use these fields in tables that require soft delete functionality
 */
export const trackableTimestamps = {
  ...timestamps,
  /** Timestamp when the record was deleted (for soft delete) */
  deletedAt: timestamp("deleted_at"),
};
