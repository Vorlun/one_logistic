import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";

@ApiTags("Users")
@ApiBearerAuth()
@Controller("users")
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // CREATE USER — Hozir comment bo‘lib turibdi, lekin kerak bo‘lsa quyidagicha bo‘ladi:
  // @Post()
  // @ApiOperation({ summary: "Create a new user" })
  // @ApiBody({ type: CreateUserDto })
  // @ApiResponse({ status: 201, description: "User successfully created", type: User })
  // @ApiResponse({ status: 400, description: "Validation failed" })
  // create(@Body() createUserDto: CreateUserDto, @CurrentUser() currentUser: User) {
  //   return this.usersService.createAndReturnFullUser(createUserDto, currentUser);
  // }

  @Get()
  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({ status: 200, description: "List of all users", type: [User] })
  findAll(@CurrentUser() currentUser: User) {
    return this.usersService.findAll(currentUser);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get user by ID" })
  @ApiParam({ name: "id", type: Number, description: "User ID" })
  @ApiResponse({ status: 200, description: "User found", type: User })
  @ApiResponse({ status: 404, description: "User not found" })
  findOne(
    @Param("id", ParseIntPipe) id: number,
    @CurrentUser() currentUser: User
  ) {
    return this.usersService.findOne(id, currentUser);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update user by ID" })
  @ApiParam({ name: "id", type: Number, description: "User ID" })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    description: "User successfully updated",
    type: User,
  })
  @ApiResponse({ status: 404, description: "User not found" })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() currentUser: User
  ) {
    return this.usersService.update(id, updateUserDto, currentUser);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete user by ID" })
  @ApiParam({ name: "id", type: Number, description: "User ID" })
  @ApiResponse({
    status: 200,
    description: "User successfully deleted",
    schema: { example: true },
  })
  @ApiResponse({ status: 404, description: "User not found" })
  remove(
    @Param("id", ParseIntPipe) id: number,
    @CurrentUser() currentUser: User
  ) {
    return this.usersService.remove(id, currentUser);
  }
}
