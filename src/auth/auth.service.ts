import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { UsersService } from "../users/users.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { Response, Request } from "express";
import { User } from "../users/entities/user.entity";
import { randomBytes } from "crypto";
import { MailService } from "../mail/mail.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService
  ) {}

  /** REGISTER */
  async register(dto: CreateUserDto, currentUser: User, res: Response) {
    const savedUser = await this.usersService.createAndReturnFullUser(
      dto,
      currentUser
    );

    const tokens = await this.generateTokens(savedUser);
    await this.saveRefreshToken(savedUser.id, tokens.refresh_token);
    this.setCookie(res, tokens.refresh_token);

    return { id: savedUser.id, access_token: tokens.access_token };
  }

  /** LOGIN */
  async login(email: string, password: string, res: Response) {
    const user = await this.usersService.findByEmailWithSensitive(email);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException("Invalid credentials");

    const tokens = await this.generateTokens(user);
    await this.saveRefreshToken(user.id, tokens.refresh_token);
    this.setCookie(res, tokens.refresh_token);

    return { access_token: tokens.access_token };
  }

  /** LOGOUT */
  async logout(userId: number, res: Response) {
    await this.saveRefreshToken(userId, "");
    res.clearCookie("refresh_token");
    return { message: "Successfully logged out" };
  }

  /** REFRESH TOKEN */
  async refresh(req: Request, res: Response) {
    const token = req.cookies?.refresh_token;
    if (!token) throw new ForbiddenException("Refresh token missing");

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      const user = await this.usersService.findByIdWithSensitive(payload.sub);

      if (!user || user.refresh_token !== token) {
        throw new ForbiddenException("Invalid refresh token");
      }

      const tokens = await this.generateTokens(user);
      await this.saveRefreshToken(user.id, tokens.refresh_token);
      this.setCookie(res, tokens.refresh_token);

      return { access_token: tokens.access_token };
    } catch {
      throw new ForbiddenException("Invalid or expired refresh token");
    }
  }

  /** CHANGE PASSWORD */
  async changePassword(
    userId: number,
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
  ) {
    const user = await this.usersService.findByIdWithSensitive(userId);

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) throw new BadRequestException("Old password incorrect");

    if (oldPassword === newPassword)
      throw new BadRequestException("Old password can't be set as a new");

    if (newPassword !== confirmPassword) {
      throw new BadRequestException("Passwords do not match");
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await this.usersService.saveUser(user);

    return { message: "Password updated successfully" };
  }

  /** FORGOT PASSWORD */
  async forgotPassword(email: string) {
    const user = await this.usersService.findByEmailWithSensitive(email);
    const resetToken = randomBytes(32).toString("hex");

    user.reset_token = resetToken;
    await this.usersService.saveUser(user);

    await this.mailService.sendResetEmail(email, resetToken);
    return { message: "Reset link sent to email" };
  }

  /** RESET PASSWORD */
  async setNewPassword(
    token: string,
    newPassword: string,
    confirmPassword: string
  ) {
    const user = await this.usersService.findByResetToken(token);
    if (!user) throw new BadRequestException("Invalid or expired token");

    if (newPassword !== confirmPassword) {
      throw new BadRequestException("Passwords do not match");
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.reset_token = "";
    await this.usersService.saveUser(user);

    return { message: "Password reset successful" };
  }

  /** PRIVATE HELPERS */
  private async generateTokens(user: Pick<User, "id" | "email" | "role">) {
    const payload = { sub: user.id, email: user.email, role: user.role.name };

    const access_token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: "15m",
    });

    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: "7d",
    });

    return { access_token, refresh_token };
  }

  private async saveRefreshToken(userId: number, token: string) {
    const user = await this.usersService.findByIdWithSensitive(userId);
    user.refresh_token = token;
    await this.usersService.saveUser(user);
  }

  private setCookie(res: Response, token: string) {
    res.cookie("refresh_token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }
}
