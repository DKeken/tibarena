# Database Package

This package provides a structured database schema for the Crypto Gladiators Arena platform using DrizzleORM with PostgreSQL. The schema is optimized for modularity, relational integrity, and follows best practices for database design.

## Architecture

The database schema is organized into logical domains:

- **Auth**: User accounts and authentication
- **Game**: Gladiators, battles, and game mechanics
- **Economy**: Transactions and financial records
- **Core**: Shared utilities and common patterns

## Usage

### Basic Query Examples

```typescript
import { db } from "@app/database";
import { users, gladiators, battles } from "@app/database/schema";
import { eq } from "drizzle-orm";

// Get all users
const allUsers = await db.query.users.findMany();

// Get a specific user by ID
const user = await db.query.users.findFirst({
  where: eq(users.id, userId),
  with: {
    gladiators: true, // Include related gladiators
  },
});

// Get battles for a specific gladiator
const gladiatorBattles = await db.query.battles.findMany({
  where: (battles) =>
    eq(battles.gladiator1Id, gladiatorId) ||
    eq(battles.gladiator2Id, gladiatorId),
});
```

### Using with Zod Validation

The schema includes Zod validation schemas for all tables:

```typescript
import { insertUserSchema, db, users } from "@app/database";

// Validate data with Zod before insertion
const userData = {
  username: "warrior123",
  email: "warrior@example.com",
  passwordHash: hashedPassword,
};

// This will validate the data according to the schema
const validatedData = insertUserSchema.parse(userData);

// Now it's safe to insert
await db.insert(users).values(validatedData);
```

## Database Migrations

To manage database schema changes:

```bash
# Generate migrations from schema changes
npm run db:generate

# Apply migrations to database
npm run db:migrate

# Start Drizzle Studio for database management
npm run db:studio
```

## Schema Overview

### Auth Domain

- **Users**: User accounts with authentication data
- **Sessions**: User login sessions

### Game Domain

- **Gladiators**: Player-owned gladiator characters
- **Battles**: Records of battles between gladiators
- **BattleRounds**: Individual rounds within battles

### Economy Domain

- **Transactions**: Financial transactions in the platform
- **ArenaMasterKeys**: NFTs that provide platform benefits
- **NftBenefits**: Benefits accrued from NFT ownership

## Best Practices

1. **Use relation helpers** for type-safe relationship navigation
2. **Leverage Zod validation** for data integrity
3. **Use transactions** for operations that modify multiple tables
4. **Prefer query builders** over raw SQL for type safety

## Reference

- [DrizzleORM Documentation](https://orm.drizzle.team/docs/overview)
- [Drizzle Zod Integration](https://orm.drizzle.team/docs/zod)
