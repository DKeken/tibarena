import { Injectable } from "@nestjs/common";
import { db } from "@repo/database/db";
import { users } from "@repo/database/schema";
import { eq } from "@repo/database";
import { from, Observable, map } from "rxjs";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { User } from "../interfaces/user.interface";
import * as bcrypt from "bcrypt";
import {
  DatabaseException,
  handleDatabaseError,
  EntityNotFoundException,
} from "@/common";

/**
 * Users Repository
 * Handles all database operations related to users
 */
@Injectable()
export class UsersRepository {
  /**
   * Create a new user
   * @param createUserDto User creation data
   * @returns Observable with the created user
   */
  create(createUserDto: CreateUserDto): Observable<User> {
    // If we have a password, hash it and set passwordHash
    if (createUserDto.password) {
      // Hash the password with bcrypt
      const salt = bcrypt.genSaltSync(10);
      const passwordHash = bcrypt.hashSync(createUserDto.password, salt);

      // Update the DTO with the hashed password
      createUserDto.passwordHash = passwordHash;

      // Remove the plain password from the DTO for security
      delete createUserDto.password;
    }

    // Now proceed with the database insertion
    return from(db.insert(users).values(createUserDto).returning()).pipe(
      map((results) => {
        if (!results.length) {
          throw new DatabaseException({
            entity: "user",
            operation: "create",
            message: "User creation failed",
          });
        }
        return results[0] as User;
      }),
      handleDatabaseError("create", "user"),
    );
  }

  /**
   * Get all users
   * @returns Observable with array of all users
   */
  findAll(): Observable<User[]> {
    return from(db.select().from(users)).pipe(
      map((results) => results as User[]),
      handleDatabaseError("find", "users"),
    );
  }

  /**
   * Find a user by ID
   * @param id User ID
   * @returns Observable with the found user or null
   */
  findOne(id: string): Observable<User | null> {
    return from(db.select().from(users).where(eq(users.id, id))).pipe(
      map((results) => (results.length ? (results[0] as User) : null)),
      handleDatabaseError("find", "user"),
    );
  }

  /**
   * Find a user by email
   * @param email User email
   * @returns Observable with the found user or null
   */
  findByEmail(email: string): Observable<User | null> {
    return from(db.select().from(users).where(eq(users.email, email))).pipe(
      map((results) => (results.length ? (results[0] as User) : null)),
      handleDatabaseError("find", "user"),
    );
  }

  /**
   * Find a user by username
   * @param username Username to search for
   * @returns Observable with the found user or null
   */
  findByUsername(username: string): Observable<User | null> {
    return from(
      db.query.users.findFirst({
        where: eq(users.username, username),
      }),
    ).pipe(
      map((user) => (user ? (user as User) : null)),
      handleDatabaseError("find", "user"),
    );
  }

  /**
   * Find a user by wallet address
   * @param walletAddress Ethereum wallet address
   * @returns Observable with the found user or null
   */
  findByWalletAddress(walletAddress: string): Observable<User | null> {
    return from(
      db.query.users.findFirst({
        where: eq(users.walletAddress, walletAddress),
      }),
    ).pipe(
      map((user) => (user ? (user as User) : null)),
      handleDatabaseError("find", "user"),
    );
  }

  /**
   * Update a user
   * @param id User ID
   * @param updateUserDto Update data
   * @returns Observable with the updated user
   */
  update(id: string, updateUserDto: UpdateUserDto): Observable<User> {
    return from(
      db.update(users).set(updateUserDto).where(eq(users.id, id)).returning(),
    ).pipe(
      map((results) => {
        if (!results.length) {
          throw new EntityNotFoundException({
            entity: "user",
            identifier: { field: "id", value: id },
          });
        }
        return results[0] as User;
      }),
      handleDatabaseError("update", "user"),
    );
  }

  /**
   * Delete a user
   * @param id User ID
   * @returns Observable with the deleted user
   */
  remove(id: string): Observable<User> {
    return from(db.delete(users).where(eq(users.id, id)).returning()).pipe(
      map((results) => {
        if (!results.length) {
          throw new EntityNotFoundException({
            entity: "user",
            identifier: { field: "id", value: id },
          });
        }
        return results[0] as User;
      }),
      handleDatabaseError("delete", "user"),
    );
  }
}
