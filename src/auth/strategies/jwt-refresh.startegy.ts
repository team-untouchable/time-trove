import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthConfigService } from '@src/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { JwtRefreshPayload } from '../types';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(authConfigService: AuthConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refresh_token'),
      secretOrKey: authConfigService.jwt_refresh_secret,
    });
  }

  async validate(payload: JwtRefreshPayload) {
    return { uid: payload.uid };
  }
}
