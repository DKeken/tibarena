import { uuid, primaryKey } from "drizzle-orm/pg-core";

/**
 * UUID primary key configuration for all database tables
 * This should be used instead of serial IDs for better scalability and security
 */
export const uuidPrimaryKey = (name = "id") =>
  uuid(name).defaultRandom().primaryKey().notNull();
