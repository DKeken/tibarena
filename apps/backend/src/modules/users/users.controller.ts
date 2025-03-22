import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  ParseUUIDPipe,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Observable } from "rxjs";
import { User } from "./interfaces/user.interface";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { handleDatabaseError } from "../../common/utils/rxjs-error-handlers";
import { ValidationException } from "../../common/exceptions";

@ApiTags("users")
@Controller("users")
@UsePipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }),
)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: "Create new user" })
  @ApiResponse({ status: 201, description: "User successfully created" })
  @ApiResponse({ status: 400, description: "Bad request" })
  create(@Body() createUserDto: CreateUserDto): Observable<User> {
    return this.usersService
      .create(createUserDto)
      .pipe(handleDatabaseError("create", "User"));
  }

  @Get()
  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({ status: 200, description: "Return all users" })
  findAll(): Observable<User[]> {
    return this.usersService
      .findAll()
      .pipe(handleDatabaseError("find", "User"));
  }

  @Get(":id")
  @ApiOperation({ summary: "Get user by id" })
  @ApiResponse({ status: 200, description: "Return user by id" })
  @ApiResponse({ status: 404, description: "User not found" })
  findOne(@Param("id", ParseUUIDPipe) id: string): Observable<User> {
    return this.usersService
      .findOne(id)
      .pipe(handleDatabaseError("find", "User"));
  }

  @Get("email/:email")
  @ApiOperation({ summary: "Get user by email" })
  @ApiResponse({ status: 200, description: "Return user by email" })
  @ApiResponse({ status: 404, description: "User not found" })
  findByEmail(@Param("email") email: string): Observable<User> {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new ValidationException({
        message: "Invalid email format",
        field: "email",
        value: email,
      });
    }
    return this.usersService
      .findByEmail(email)
      .pipe(handleDatabaseError("find", "User"));
  }

  @Get("username/:username")
  @ApiOperation({ summary: "Get user by username" })
  @ApiResponse({ status: 200, description: "Return user by username" })
  @ApiResponse({ status: 404, description: "User not found" })
  findByUsername(@Param("username") username: string): Observable<User> {
    if (!username || username.length < 3) {
      throw new ValidationException({
        message: "Username must be at least 3 characters",
        field: "username",
        value: username,
      });
    }
    return this.usersService
      .findByUsername(username)
      .pipe(handleDatabaseError("find", "User"));
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update user" })
  @ApiResponse({ status: 200, description: "User successfully updated" })
  @ApiResponse({ status: 404, description: "User not found" })
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Observable<User> {
    return this.usersService
      .update(id, updateUserDto)
      .pipe(handleDatabaseError("update", "User"));
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete user" })
  @ApiResponse({ status: 200, description: "User successfully deleted" })
  @ApiResponse({ status: 404, description: "User not found" })
  remove(@Param("id", ParseUUIDPipe) id: string): Observable<User> {
    return this.usersService
      .remove(id)
      .pipe(handleDatabaseError("delete", "User"));
  }
}
