import {
  pgTable,
  uuid,
  varchar,
  boolean,
  timestamp,
  numeric,
  jsonb,
  uniqueIndex,
  pgEnum,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { timestamps } from "../core/timestamps";
import { uuidPrimaryKey } from "../core/uuid";
import { nftDefaults } from "../core/defaults";
import { relations } from "drizzle-orm";
import { users } from "../auth/users";
import { z } from "zod";

/**
 * Enum for NFT rarity tiers
 */
export const rarityTierEnum = pgEnum("rarity_tier", [
  "common",
  "uncommon",
  "rare",
  "epic",
  "legendary",
]);

/**
 * Enum for NFT benefit types
 */
export const benefitTypeEnum = pgEnum("benefit_type", [
  "commission_reduction",
  "exclusive_access",
  "customization",
  "battle_bonus",
  "daily_reward",
]);

/**
 * Zod schema for NFT metadata
 */
export const nftMetadataSchema = z.object({
  name: z.string(),
  description: z.string(),
  attributes: z.array(
    z.object({
      trait_type: z.string(),
      value: z.union([z.string(), z.number(), z.boolean()]),
    })
  ),
  external_url: z.string().optional(),
  background_color: z.string().optional(),
});

export type NftMetadata = z.infer<typeof nftMetadataSchema>;

/**
 * Arena Master Keys (NFT) table schema definition
 * Represents ownership of special NFTs that provide platform benefits
 */
export const arenaMasterKeys = pgTable(
  "arena_master_keys",
  {
    /** Primary key identifier for the NFT */
    id: uuidPrimaryKey(),
    /** Unique token ID on the blockchain */
    tokenId: varchar("token_id", { length: 100 }).notNull(),
    /** Foreign key reference to the user who owns this NFT */
    ownerId: uuid("owner_id")
      .notNull()
      .references(() => users.id, { onDelete: "restrict" }),
    /** Indicates if the NFT is currently being rented to another user */
    isRented: boolean("is_rented").default(nftDefaults.isRented).notNull(),
    /** Foreign key reference to the user who is renting this NFT (if applicable) */
    renterId: uuid("renter_id").references(() => users.id, {
      onDelete: "set null",
    }),
    /** Timestamp when the rental period ends (if applicable) */
    rentalEndDate: timestamp("rental_end_date"),
    /** Rental price per day */
    rentalPricePerDay: numeric("rental_price_per_day", {
      precision: 18,
      scale: 8,
    }),
    /** Current rarity tier (affects benefits) */
    rarityTier: rarityTierEnum("rarity_tier")
      .notNull()
      .default(nftDefaults.rarityTier),
    /** Metadata containing NFT properties */
    metadata: jsonb("metadata")
      .$type<NftMetadata>()
      .notNull()
      .default(nftDefaults.metadata),
    /** Image URL for the NFT */
    imageUrl: varchar("image_url", { length: 255 }),
    /** Chain ID of the blockchain network */
    networkChainId: varchar("network_chain_id", { length: 10 }).notNull(),
    /** Token contract address */
    contractAddress: varchar("contract_address", { length: 42 }).notNull(),
    /** Common timestamp fields */
    ...timestamps,
  },
  (table) => [
    /** Index on tokenId for faster lookups */
    uniqueIndex("token_id_idx").on(table.tokenId),
  ]
);

/**
 * NFT Benefits table schema definition
 * Tracks accumulated benefits from owning or renting Arena Master Keys
 */
export const nftBenefits = pgTable("nft_benefits", {
  /** Primary key identifier for the benefit entry */
  id: uuidPrimaryKey(),
  /** Foreign key reference to the associated NFT */
  nftId: uuid("nft_id")
    .notNull()
    .references(() => arenaMasterKeys.id, { onDelete: "cascade" }),
  /** Foreign key reference to the user receiving the benefit */
  beneficiaryId: uuid("beneficiary_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  /** Type of benefit (commission, exclusive access, customization, etc.) */
  benefitType: benefitTypeEnum("benefit_type").notNull(),
  /** Benefit amount (if applicable) */
  amount: numeric("amount", { precision: 18, scale: 8 }),
  /** Description of the benefit */
  description: varchar("description", { length: 255 }),
  /** Common timestamp fields */
  ...timestamps,
});

/**
 * Relations for the Arena Master Keys table
 */
export const arenaMasterKeysRelations = relations(
  arenaMasterKeys,
  ({ one, many }) => ({
    /** Each arena master key has one owner */
    owner: one(users, {
      fields: [arenaMasterKeys.ownerId],
      references: [users.id],
      relationName: "owned_nfts",
    }),
    /** Each arena master key can have one renter */
    renter: one(users, {
      fields: [arenaMasterKeys.renterId],
      references: [users.id],
      relationName: "rented_nfts",
    }),
    /** Each NFT can have many benefits */
    benefits: many(nftBenefits),
  })
);

/**
 * Relations for the NFT Benefits table
 */
export const nftBenefitsRelations = relations(nftBenefits, ({ one }) => ({
  /** Each benefit is associated with one NFT */
  nft: one(arenaMasterKeys, {
    fields: [nftBenefits.nftId],
    references: [arenaMasterKeys.id],
  }),
  /** Each benefit is received by one user */
  beneficiary: one(users, {
    fields: [nftBenefits.beneficiaryId],
    references: [users.id],
  }),
}));

// Add relation fields to users for NFTs
export const extendUsersRelationsWithNFTs = relations(users, ({ many }) => ({
  /** One user can own many arena master keys */
  ownedNFTs: many(arenaMasterKeys, { relationName: "owned_nfts" }),
  /** One user can rent many arena master keys */
  rentedNFTs: many(arenaMasterKeys, { relationName: "rented_nfts" }),
  /** One user can receive many NFT benefits */
  nftBenefits: many(nftBenefits),
}));

// Schema validation
export const insertArenaMasterKeySchema = createInsertSchema(arenaMasterKeys, {
  metadata: nftMetadataSchema,
  rarityTier: z.enum(rarityTierEnum.enumValues),
});
export const selectArenaMasterKeySchema = createSelectSchema(arenaMasterKeys);

export const insertNftBenefitSchema = createInsertSchema(nftBenefits, {
  benefitType: z.enum(benefitTypeEnum.enumValues),
});
export const selectNftBenefitSchema = createSelectSchema(nftBenefits);

// TypeScript types
export type ArenaMasterKey = z.infer<typeof selectArenaMasterKeySchema>;
export type NewArenaMasterKey = z.infer<typeof insertArenaMasterKeySchema>;
export type NftBenefit = z.infer<typeof selectNftBenefitSchema>;
export type NewNftBenefit = z.infer<typeof insertNftBenefitSchema>;
