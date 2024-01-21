/* eslint-disable import/no-cycle */
import {
  Inject,
  Injectable,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import type { JwtAccessPayload } from '../types';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(forwardRef(() => AuthService)) private authService: AuthService,
  ) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<JwtAccessPayload> {
    const user = await this.authService.validateUser({ email, password });
    if (!user) {
      throw new UnauthorizedException();
    }
    return { uid: user.id, email: user.email, username: user.username };
  }
}
