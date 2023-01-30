import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AdminStrategy extends PassportStrategy(Strategy, 'admin') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('token'),
      secretOrKey: 'super-secret',
    });
  }

  async validate(payload: any) {
    const { profile } = payload;

    if (profile === 'ADMIN') {
      return {
        userId: payload.userId,
        username: payload.username,
        email: payload.email,
      };
    }
    throw new UnauthorizedException('Usuário não tem permissão');
  }
}
