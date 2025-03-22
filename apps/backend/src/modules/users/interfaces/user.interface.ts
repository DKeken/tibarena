import { User as DbUser } from "@repo/database/schema";

export interface User extends DbUser {
  id: string;
  username: string;
  email: string | null;
  passwordHash: string | null;
  walletAddress: string | null;
  authNonce: string | null;
  createdAt: Date;
  updatedAt: Date;
}
