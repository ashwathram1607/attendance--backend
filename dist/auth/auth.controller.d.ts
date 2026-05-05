import { AuthService } from './auth.service';
import { SignupDto } from '../auth/dto/signup.dto';
import { LoginDto } from '../auth/dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(signupDto: SignupDto): Promise<{
        message: string;
        user: import("../user/user.entity").User;
    }>;
    login(loginDto: LoginDto): Promise<{
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
