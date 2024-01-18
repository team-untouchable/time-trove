import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthConfigService } from '@src/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { JwtAccessPayload } from '../types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(authConfigService: AuthConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: authConfigService.jwt_access_secret,
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtAccessPayload) {
    return { uid: payload.uid, email: payload.email, username: payload.email };
  }
}
