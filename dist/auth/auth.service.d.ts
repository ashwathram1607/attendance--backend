import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { MailService } from 'src/mail/mail.service';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    private readonly mailService;
    private readonly configService;
    constructor(userService: UserService, jwtService: JwtService, mailService: MailService, configService: ConfigService);
    signup(data: any): Promise<{
        message: string;
        user: import("../user/user.entity").User;
    }>;
    login(data: any): Promise<{
        access_token: string;
        user: import("../user/user.entity").User;
    }>;
    forgotPassword(email: string): Promise<{
        message: string;
    }>;
    resetPassword(token: string, password: string): Promise<{
        message: string;
    }>;
}
