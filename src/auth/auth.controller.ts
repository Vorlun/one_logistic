import {
  Controller,
  Post,
  Body,
  Res,
  Req,
  UseGuards,
  HttpCode,
  HttpStatus,
  Param,
  Get,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { Response, Request } from "express";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiCookieAuth,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { SetNewPasswordDto } from "../users/dto/reset-password.dto";
import { SelfGuard } from "../common/guards/self.guard";
import { User } from "../users/entities/user.entity";

class LoginDto {
  email: string;
  password: string;
}

class ChangePasswordDto {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @UseGuards(JwtAuthGuard)
  @Post("register")
  @ApiOperation({ summary: "Register a new user" })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: "User registered successfully",
    type: User,
  })
  @ApiResponse({ status: 400, description: "Validation failed" })
  @ApiResponse({ status: 409, description: "User already exists" })
  async register(
    @Body() dto: CreateUserDto,
    @CurrentUser() currentUser: any,
    @Res({ passthrough: true }) res: Response
  ) {
    const caller =
      currentUser ??
      ({
        role: { id: 0, name: "guest", level: 0 },
      } as any);

    return this.authService.register(dto, caller, res);
  }

  @UseGuards(JwtAuthGuard)
  @Post("register-admin")
  @ApiOperation({ summary: "Register a new admin user" })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: "Admin user registered successfully",
    type: User,
  })
  @ApiResponse({ status: 400, description: "Validation failed" })
  @ApiResponse({ status: 409, description: "User already exists" })
  async registerAdmin(
    @Body() dto: CreateUserDto,
    @CurrentUser() currentUser: any,
    @Res({ passthrough: true }) res: Response
  ) {
    const caller =
      currentUser ??
      ({
        role: { id: 0, name: "guest", level: 0 },
      } as any);

    return this.authService.register(dto, caller, res);
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Login user and get tokens" })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: "Access token returned" })
  @ApiResponse({ status: 401, description: "Invalid credentials" })
  async login(
    @Body("email") email: string,
    @Body("password") password: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.login(email, password, res);
  }

  @Post("logout")
  @UseGuards(JwtAuthGuard, SelfGuard)
  @ApiCookieAuth()
  @ApiOperation({ summary: "Logout user and clear refresh token" })
  @ApiResponse({ status: 200, description: "Successfully logged out" })
  async logout(
    @CurrentUser() currentUser: any,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.logout(currentUser.id, res);
  }

  @Post("refresh")
  @ApiCookieAuth()
  @ApiOperation({ summary: "Get new access token using refresh token" })
  @ApiResponse({ status: 200, description: "New access token returned" })
  @ApiResponse({ status: 401, description: "Invalid or expired refresh token" })
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refresh(req, res);
  }

  @Post("change-password")
  @UseGuards(JwtAuthGuard, SelfGuard)
  @ApiCookieAuth()
  @ApiOperation({ summary: "Change password (old + new)" })
  @ApiBody({ type: ChangePasswordDto })
  @ApiResponse({ status: 200, description: "Password updated successfully" })
  @ApiResponse({ status: 400, description: "Validation failed" })
  async changePassword(
    @CurrentUser() currentUser: any,
    @Body("oldPassword") oldPassword: string,
    @Body("newPassword") newPassword: string,
    @Body("confirmPassword") confirmPassword: string
  ) {
    return this.authService.changePassword(
      currentUser.id,
      oldPassword,
      newPassword,
      confirmPassword
    );
  }

  @Post("forgot-password")
  @ApiOperation({ summary: "Request password reset email" })
  @ApiBody({ schema: { example: { email: "user@example.com" } } })
  @ApiResponse({ status: 200, description: "Reset link sent to email" })
  @ApiResponse({ status: 404, description: "Email not found" })
  async forgotPassword(@Body("email") email: string) {
    return this.authService.forgotPassword(email);
  }

  @Post("reset-password/:token")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Set new password" })
  @ApiParam({
    name: "token",
    required: true,
    description: "Reset token from email",
  })
  @ApiBody({ type: SetNewPasswordDto })
  @ApiResponse({ status: 200, description: "Password reset successful" })
  @ApiResponse({ status: 400, description: "Invalid or expired token" })
  async setNewPassword(
    @Param("token") token: string,
    @Body() body: SetNewPasswordDto
  ) {
    return this.authService.setNewPassword(
      token,
      body.newPassword,
      body.confirmPassword
    );
  }

  @Get("activate/:token")
  @ApiOperation({ summary: "Activate user account" })
  @ApiParam({
    name: "token",
    required: true,
    description: "Activation token from email",
  })
  @ApiResponse({ status: 200, description: "Account activated successfully" })
  @ApiResponse({
    status: 400,
    description: "Invalid or expired activation token",
  })
  async activateAccount(@Param("token") token: string) {
    return this.authService.activateAccount(token);
  }
}
