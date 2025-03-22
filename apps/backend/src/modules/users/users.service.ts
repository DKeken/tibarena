import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Observable, catchError, map, throwError, switchMap, of } from "rxjs";
import { UsersRepository } from "./repositories/users.repository";
import { User } from "./interfaces/user.interface";
import * as bcrypt from "bcrypt";

/**
 * Users Service
 * Handles business logic for user operations
 */
@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  /**
   * Create a new user
   * @param createUserDto User creation data
   * @returns Observable with the created user
   */
  create(createUserDto: CreateUserDto): Observable<User> {
    return this.usersRepository.create(createUserDto);
  }

  /**
   * Get all users
   * @returns Observable with array of all users
   */
  findAll(): Observable<User[]> {
    return this.usersRepository.findAll();
  }

  /**
   * Find a user by ID
   * @param id User ID
   * @returns Observable with the found user
   * @throws NotFoundException if user not found
   */
  findOne(id: string): Observable<User> {
    return this.usersRepository.findOne(id).pipe(
      map((user) => {
        if (!user) {
          throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
      }),
    );
  }

  /**
   * Find a user by email
   * @param email User email
   * @returns Observable with the found user
   * @throws NotFoundException if user not found
   */
  findByEmail(email: string): Observable<User> {
    return this.usersRepository.findByEmail(email).pipe(
      map((user) => {
        if (!user) {
          throw new NotFoundException(`User with email ${email} not found`);
        }
        return user;
      }),
    );
  }

  /**
   * Find a user by username
   * @param username Username
   * @returns Observable with the found user
   * @throws NotFoundException if user not found
   */
  findByUsername(username: string): Observable<User> {
    return this.usersRepository.findByUsername(username).pipe(
      map((user) => {
        if (!user) {
          throw new NotFoundException(
            `User with username ${username} not found`,
          );
        }
        return user;
      }),
    );
  }

  /**
   * Find a user by wallet address or create a new one if not exists
   * @param walletAddress Ethereum wallet address
   * @returns Observable with the existing or newly created user
   */
  findOrCreateByWalletAddress(walletAddress: string): Observable<User> {
    return this.usersRepository.findByWalletAddress(walletAddress).pipe(
      switchMap((user) => {
        if (user) {
          return of(user);
        }

        // Create a random username based on wallet address
        const username = `user_${walletAddress.substring(2, 8)}`;

        // Create a new user with the wallet address
        return this.create({
          username,
          email: `${username}@placeholder.eth`, // Add a placeholder email
          walletAddress,
          passwordHash: bcrypt.hashSync(walletAddress, 10), // Use wallet address as password hash for wallet-based users
        });
      }),
    );
  }

  /**
   * Update a user
   * @param id User ID
   * @param updateUserDto Update data
   * @returns Observable with the updated user
   * @throws NotFoundException if user not found
   */
  update(id: string, updateUserDto: UpdateUserDto): Observable<User> {
    return this.usersRepository.update(id, updateUserDto).pipe(
      catchError((error) => {
        if (error.message.includes("not found")) {
          return throwError(
            () => new NotFoundException(`User with ID ${id} not found`),
          );
        }
        return throwError(() => error);
      }),
    );
  }

  /**
   * Delete a user
   * @param id User ID
   * @returns Observable with the deleted user
   * @throws NotFoundException if user not found
   */
  remove(id: string): Observable<User> {
    return this.usersRepository.remove(id).pipe(
      catchError((error) => {
        if (error.message.includes("not found")) {
          return throwError(
            () => new NotFoundException(`User with ID ${id} not found`),
          );
        }
        return throwError(() => error);
      }),
    );
  }
}
