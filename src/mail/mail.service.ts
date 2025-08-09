import { Injectable, InternalServerErrorException } from "@nestjs/common";
import * as nodemailer from "nodemailer";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get("MAIL_HOST"),
      port: this.configService.get<number>("MAIL_PORT"),
      secure: false,
      auth: {
        user: this.configService.get("MAIL_USERNAME"),
        pass: this.configService.get("MAIL_PASSWORD"),
      },
    });
  }

  async sendResetEmail(to: string, token: string): Promise<void> {
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
    } catch (err) {
      console.error("Email sending error:", err);
      throw new InternalServerErrorException("Failed to send email");
    }
  }

  async sendActivationEmail(to: string, activationLink: string): Promise<void> {
    const url = `${this.configService.get("URL")}:${this.configService.get("PORT")}/api/auth/activate/${activationLink}`;

    const mailOptions = {
      from: `"ONE Logistic" <${this.configService.get("MAIL_USERNAME")}>`,
      to,
      subject: "Account Activation",
      html: `
      <h2>Welcome!</h2>
      <p>Please click the link below to activate your account:</p>
      <a href="${url}">${url}</a>
    `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (err) {
      console.error("Activation email sending error:", err);
      throw new InternalServerErrorException("Failed to send activation email");
    }
  }
}
