"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
const users_service_1 = require("../users/users.service");
const crypto_1 = require("crypto");
const mail_service_1 = require("../mail/mail.service");
let AuthService = class AuthService {
    usersService;
    jwtService;
    mailService;
    constructor(usersService, jwtService, mailService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.mailService = mailService;
    }
    async register(dto, currentUser, res) {
        const savedUser = await this.usersService.createAndReturnFullUser(dto, currentUser);
        const tokens = await this.generateTokens(savedUser);
        await this.saveRefreshToken(savedUser.id, tokens.refresh_token);
        this.setCookie(res, tokens.refresh_token);
        return { id: savedUser.id, access_token: tokens.access_token };
    }
    async login(email, password, res) {
        const user = await this.usersService.findByEmailWithSensitive(email);
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            throw new common_1.UnauthorizedException("Invalid credentials");
        const tokens = await this.generateTokens(user);
        await this.saveRefreshToken(user.id, tokens.refresh_token);
        this.setCookie(res, tokens.refresh_token);
        return { access_token: tokens.access_token };
    }
    async logout(userId, res) {
        await this.saveRefreshToken(userId, "");
        res.clearCookie("refresh_token");
        return { message: "Successfully logged out" };
    }
    async refresh(req, res) {
        const token = req.cookies?.refresh_token;
        if (!token)
            throw new common_1.ForbiddenException("Refresh token missing");
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_REFRESH_SECRET,
            });
            const user = await this.usersService.findByIdWithSensitive(payload.sub);
            if (!user || user.refresh_token !== token) {
                throw new common_1.ForbiddenException("Invalid refresh token");
            }
            const tokens = await this.generateTokens(user);
            await this.saveRefreshToken(user.id, tokens.refresh_token);
            this.setCookie(res, tokens.refresh_token);
            return { access_token: tokens.access_token };
        }
        catch {
            throw new common_1.ForbiddenException("Invalid or expired refresh token");
        }
    }
    async changePassword(userId, oldPassword, newPassword, confirmPassword) {
        const user = await this.usersService.findByIdWithSensitive(userId);
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch)
            throw new common_1.BadRequestException("Old password incorrect");
        if (oldPassword === newPassword)
            throw new common_1.BadRequestException("Old password can't be set as a new");
        if (newPassword !== confirmPassword) {
            throw new common_1.BadRequestException("Passwords do not match");
        }
        user.password = await bcrypt.hash(newPassword, 10);
        await this.usersService.saveUser(user);
        return { message: "Password updated successfully" };
    }
    async forgotPassword(email) {
        const user = await this.usersService.findByEmailWithSensitive(email);
        const resetToken = (0, crypto_1.randomBytes)(32).toString("hex");
        user.reset_token = resetToken;
        await this.usersService.saveUser(user);
        await this.mailService.sendResetEmail(email, resetToken);
        return { message: "Reset link sent to email" };
    }
    async setNewPassword(token, newPassword, confirmPassword) {
        const user = await this.usersService.findByResetToken(token);
        if (!user)
            throw new common_1.BadRequestException("Invalid or expired token");
        if (newPassword !== confirmPassword) {
            throw new common_1.BadRequestException("Passwords do not match");
        }
        user.password = await bcrypt.hash(newPassword, 10);
        user.reset_token = "";
        await this.usersService.saveUser(user);
        return { message: "Password reset successful" };
    }
    async generateTokens(user) {
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
    async saveRefreshToken(userId, token) {
        const user = await this.usersService.findByIdWithSensitive(userId);
        user.refresh_token = token;
        await this.usersService.saveUser(user);
    }
    setCookie(res, token) {
        res.cookie("refresh_token", token, {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
    }
    async activateAccount(token) {
        const user = await this.usersService.findByActivationLink(token);
        console.log("Activation token:", token);
        if (!user) {
            throw new common_1.BadRequestException("Invalid or expired activation link");
        }
        if (user.is_verified) {
            throw new common_1.BadRequestException("Account already activated");
        }
        user.is_verified = true;
        user.activation_link = null;
        await this.usersService.saveUser(user);
        return { message: "Account activated successfully" };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        mail_service_1.MailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map