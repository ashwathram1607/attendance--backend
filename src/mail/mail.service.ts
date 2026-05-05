import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(private configService: ConfigService) {}

  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  async sendResetPasswordEmail(to: string, token: string) {
    const resetLink = `${this.configService.get(
      'FRONTEND_URL',
    )}/reset-password?token=${token}`;

    await this.transporter.sendMail({
      from: `"Support" <${this.configService.get('EMAIL_USER')}>`,
      to,
      subject: 'Reset Your Password',
      html: `
        <h2>Password Reset</h2>
        <p>Click below to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>This link expires in 15 minutes.</p>
      `,
    });
  }
}
