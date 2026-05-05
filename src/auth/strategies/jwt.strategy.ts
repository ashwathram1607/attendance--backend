// src/auth/strategies/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'my-secret-key', // ❗replace with env variable in production
    });
  }

  async validate(payload: any) {
    // payload = { email, sub, role }
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}
