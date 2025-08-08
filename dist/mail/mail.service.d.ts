import { ConfigService } from "@nestjs/config";
export declare class MailService {
    private readonly configService;
    private transporter;
    constructor(configService: ConfigService);
    sendResetEmail(to: string, token: string): Promise<void>;
}
