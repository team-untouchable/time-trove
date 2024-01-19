import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthConfigService } from '@src/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { JwtRefreshPayload, RequestWithRefreshToken } from '../types';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    authConfigService: AuthConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refresh_token'),
      secretOrKey: authConfigService.jwt_refresh_secret,
      passReqToCallback: true,
    });
  }

  async validate(req: RequestWithRefreshToken, payload: JwtRefreshPayload) {
    const isValid = await this.authService.validateRefreshToken(
      payload,
      req.body.refresh_token,
    );
    if (!isValid) {
      throw new UnauthorizedException();
    }
    return { uid: payload.uid };
  }
}
