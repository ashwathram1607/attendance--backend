import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { MailService } from 'src/mail/mail.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
  ) {}

  // ================= SIGNUP =================
  async signup(data: any) {
    const existingUser = await this.userService.findByEmail(data.email);

    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.userService.createUser({
      ...data,
      password: hashedPassword,
    });

    return { message: 'Signup successful', user };
  }

  // ================= LOGIN =================
  async login(data: any) {
    const user = await this.userService.findByEmail(data.email);

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(data.password, user.password);

    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const payload = { email: user.email, sub: user.id, role: user.role };

    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
      user,
    };
  }

  // ================= FORGOT PASSWORD =================
  async forgotPassword(email: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      return { message: 'If the email exists, a reset link has been sent' };
    }

    const token = await this.jwtService.signAsync(
      { sub: user.id, email: user.email, type: 'reset' },
      {
        secret: this.configService.get<string>('JWT_RESET_SECRET'),
        expiresIn: '15m',
      },
    );

    await this.mailService.sendResetPasswordEmail(user.email, token);

    return { message: 'Reset password email sent' };
  }

  // ================= RESET PASSWORD =================
  async resetPassword(token: string, password: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_RESET_SECRET'),
      });

      console.log('PAYLOAD:', payload); // ✅ MUST PRINT

      const user = await this.userService.findById(payload.sub);

      console.log('USER:', user); // ✅ MUST PRINT

      const hashedPassword = await bcrypt.hash(password, 10);

      const updated = await this.userService.updateUser({
        id: user.id,
        password: hashedPassword,
      });

      console.log('UPDATED:', updated); // ✅ MUST PRINT

      return { message: 'Password reset successful' };
    } catch (err) {
      console.error(err); // 🔥 IMPORTANT
      throw new BadRequestException('Invalid or expired token');
    }
  }
}
