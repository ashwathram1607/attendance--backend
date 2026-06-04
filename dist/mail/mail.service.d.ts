import { ConfigService } from '@nestjs/config';
export declare class MailService {
    private configService;
    constructor(configService: ConfigService);
    private transporter;
    sendResetPasswordEmail(to: string, token: string): Promise<void>;
}
