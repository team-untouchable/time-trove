import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthConfigService } from '@src/config';
import { UsersService } from '@src/users';
import * as bcrypt from 'bcrypt';
import type { LoginDto } from './dto';
import type { JwtAccessPayload, JwtRefreshPayload } from './types';

@Injectable()
export class AuthService {
  constructor(
    private authConfigService: AuthConfigService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ email, password }: LoginDto) {
    const user = await this.usersService.findOneWithPassword(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return null;
    }
    return user;
  }

  async login(user: JwtAccessPayload) {
    const accessPayload: JwtAccessPayload = {
      uid: user.uid,
      email: user.email,
      username: user.username,
    };
    const refreshPayload: JwtRefreshPayload = {
      uid: user.uid,
    };

    const accessToken = this.jwtService.sign(accessPayload);
    const refreshToken = this.jwtService.sign(refreshPayload, {
      secret: this.authConfigService.jwt_refresh_secret,
      expiresIn: this.authConfigService.jwt_refresh_expiration_time,
    });

    await this.usersService.updateSession({
      id: user.uid,
      token: refreshToken,
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
