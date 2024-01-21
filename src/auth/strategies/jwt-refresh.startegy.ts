/* eslint-disable import/no-cycle */
import {
  Inject,
  Injectable,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthConfigService } from '@src/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import type { JwtRefreshPayload, RequestWithRefreshToken } from '../types';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    authConfigService: AuthConfigService,
    @Inject(forwardRef(() => AuthService)) private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refresh_token'),
      secretOrKey: authConfigService.jwt_refresh_secret,
      ignoreExpiration: false,
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
