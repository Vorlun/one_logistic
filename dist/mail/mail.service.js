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
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
const config_1 = require("@nestjs/config");
let MailService = class MailService {
    configService;
    transporter;
    constructor(configService) {
        this.configService = configService;
        this.transporter = nodemailer.createTransport({
            host: this.configService.get("MAIL_HOST"),
            port: this.configService.get("MAIL_PORT"),
            secure: false,
            auth: {
                user: this.configService.get("MAIL_USERNAME"),
                pass: this.configService.get("MAIL_PASSWORD"),
            },
        });
    }
    async sendResetEmail(to, token) {
        const resetUrl = `${this.configService.get("URL")}:${this.configService.get("PORT")}/api/auth/reset-password/${token}`;
        const mailOptions = {
            from: `"ONE Logistic" <${this.configService.get("MAIL_USERNAME")}>`,
            to,
            subject: "Password Reset Request",
            html: `
        <h2>Password Reset Request</h2>
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <a href="${resetUrl}">Reset Password</a>
        <p>If you did not request this, ignore this email.</p>
      `,
        };
        try {
            await this.transporter.sendMail(mailOptions);
        }
        catch (err) {
            console.error("Email sending error:", err);
            throw new common_1.InternalServerErrorException("Failed to send email");
        }
    }
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MailService);
//# sourceMappingURL=mail.service.js.map