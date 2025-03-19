import {
  pgTable,
  uuid,
  pgEnum,
  varchar,
  numeric,
  jsonb,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { timestamps } from "../core/timestamps";
import { uuidPrimaryKey } from "../core/uuid";
import { transactionDefaults } from "../core/defaults";
import { relations } from "drizzle-orm";
import { users } from "../auth/users";
import { battles } from "../game/battles";
import { z } from "zod";

/**
 * Enum for transaction types
 */
export const transactionTypeEnum = pgEnum("transaction_type", [
  "deposit",
  "withdrawal",
  "stake",
  "winnings",
  "reward",
  "airdrop",
  "fee",
  "nft_purchase",
  "nft_rental",
]);

/**
 * Enum for transaction status
 */
export const transactionStatusEnum = pgEnum("transaction_status", [
  "pending",
  "completed",
  "failed",
  "cancelled",
]);

/**
 * Zod schemas for JSON fields
 */
export const transactionDetailsSchema = z.object({
  feeAmount: z.number().optional(),
  originalAmount: z.number().optional(),
  paymentMethod: z.string().optional(),
  processorName: z.string().optional(),
});

export type TransactionDetails = z.infer<typeof transactionDetailsSchema>;

/**
 * Transactions table schema definition
 * Records financial transactions in the platform
 */
export const transactions = pgTable("transactions", {
  /** Primary key identifier for the transaction */
  id: uuidPrimaryKey(),
  /** Foreign key reference to the user associated with this transaction */
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "restrict" }),
  /** Transaction amount */
  amount: numeric("amount", { precision: 18, scale: 8 }).notNull(),
  /** Type of transaction */
  type: transactionTypeEnum("type").notNull(),
  /** Optional reference to a battle if the transaction is related to one */
  battleId: uuid("battle_id").references(() => battles.id, {
    onDelete: "set null",
  }),
  /** Status of the transaction */
  status: transactionStatusEnum("status")
    .notNull()
    .default(transactionDefaults.status),
  /** External transaction hash for blockchain transactions */
  txHash: varchar("tx_hash", { length: 66 }),
  /** Network chain ID for blockchain transactions */
  networkChainId: varchar("network_chain_id", { length: 10 }),
  /** Description or notes about the transaction */
  description: varchar("description", { length: 255 }),
  /** External reference ID (e.g., for payment processor) */
  externalReference: varchar("external_reference", { length: 100 }),
  /** Additional transaction details stored as JSON */
  details: jsonb("details")
    .$type<TransactionDetails>()
    .default(transactionDefaults.details),
  /** Common timestamp fields */
  ...timestamps,
});

/**
 * Relations for the transactions table
 */
export const transactionsRelations = relations(transactions, ({ one }) => ({
  /** Each transaction belongs to one user */
  user: one(users, {
    fields: [transactions.userId],
    references: [users.id],
  }),
  /** Each transaction can be related to one battle */
  battle: one(battles, {
    fields: [transactions.battleId],
    references: [battles.id],
  }),
}));

// Schema validation
export const insertTransactionSchema = createInsertSchema(transactions, {
  type: z.enum(transactionTypeEnum.enumValues),
  status: z.enum(transactionStatusEnum.enumValues),
  details: transactionDetailsSchema,
});
export const selectTransactionSchema = createSelectSchema(transactions);

// TypeScript types
export type Transaction = z.infer<typeof selectTransactionSchema>;
export type NewTransaction = z.infer<typeof insertTransactionSchema>;
